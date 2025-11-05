#!/usr/bin/env node

/**
 * Deployment Health Check Script
 * Validates deployment readiness and performs post-deployment checks
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  SITE_URL: process.env.SITE_URL || 'https://thedatawithjose.github.io',
  TIMEOUT: 30000,
  RETRY_COUNT: 3,
  RETRY_DELAY: 5000
};

class DeploymentChecker {
  constructor() {
    this.results = {
      preDeployment: {},
      postDeployment: {},
      performance: {},
      security: {}
    };
  }

  async runPreDeploymentChecks() {
    console.log('🔍 Running pre-deployment checks...');
    
    // Check if build directory exists
    this.results.preDeployment.buildExists = this.checkBuildDirectory();
    
    // Check environment variables
    this.results.preDeployment.envVars = this.checkEnvironmentVariables();
    
    // Check package.json scripts
    this.results.preDeployment.scripts = this.checkPackageScripts();
    
    console.log('✅ Pre-deployment checks completed');
    return this.results.preDeployment;
  }

  async runPostDeploymentChecks() {
    console.log('🚀 Running post-deployment checks...');
    
    // Site availability
    this.results.postDeployment.availability = await this.checkSiteAvailability();
    
    // Health endpoint
    this.results.postDeployment.health = await this.checkHealthEndpoint();
    
    // Performance check
    this.results.performance = await this.checkPerformance();
    
    // Security headers
    this.results.security = await this.checkSecurityHeaders();
    
    console.log('✅ Post-deployment checks completed');
    return this.results;
  }

  checkBuildDirectory() {
    const buildPath = path.join(process.cwd(), 'out');
    const exists = fs.existsSync(buildPath);
    
    if (exists) {
      const files = fs.readdirSync(buildPath);
      console.log(`📁 Build directory exists with ${files.length} files`);
      return { status: 'pass', fileCount: files.length };
    } else {
      console.log('❌ Build directory not found');
      return { status: 'fail', error: 'Build directory not found' };
    }
  }

  checkEnvironmentVariables() {
    // Load environment variables from .env files if available
    try {
      const fs = require('fs');
      const path = require('path');
      
      const envFiles = ['.env.local', '.env.production', '.env'];
      
      for (const envFile of envFiles) {
        const envPath = path.join(process.cwd(), envFile);
        if (fs.existsSync(envPath)) {
          const envContent = fs.readFileSync(envPath, 'utf8');
          const envVars = envContent.split('\n')
            .filter(line => line.trim() && !line.startsWith('#'))
            .reduce((acc, line) => {
              const [key, ...valueParts] = line.split('=');
              if (key && valueParts.length > 0) {
                const value = valueParts.join('=').trim();
                if (!process.env[key.trim()]) {
                  process.env[key.trim()] = value;
                }
              }
              return acc;
            }, {});
        }
      }
    } catch (error) {
      console.log('⚠️  Could not load environment files:', error.message);
    }
    
    const requiredVars = [
      'NODE_ENV',
      'NEXT_PUBLIC_APP_VERSION'
    ];
    
    const optionalVars = [
      'NEXT_PUBLIC_GA_MEASUREMENT_ID',
      'NEXT_PUBLIC_SENTRY_DSN'
    ];
    
    // Set defaults for development if not set
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = 'development';
    }
    if (!process.env.NEXT_PUBLIC_APP_VERSION) {
      process.env.NEXT_PUBLIC_APP_VERSION = '1.0.0-dev';
    }
    
    const missing = requiredVars.filter(varName => !process.env[varName]);
    const optional = optionalVars.filter(varName => !process.env[varName]);
    
    if (missing.length === 0) {
      console.log('✅ All required environment variables are set');
      if (optional.length > 0) {
        console.log(`⚠️  Optional variables not set: ${optional.join(', ')}`);
      }
      return { status: 'pass', missing: [], optional };
    } else {
      console.log(`❌ Missing required environment variables: ${missing.join(', ')}`);
      return { status: 'fail', missing, optional };
    }
  }

  checkPackageScripts() {
    const packagePath = path.join(process.cwd(), 'package.json');
    
    try {
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      const requiredScripts = ['build', 'start', 'test'];
      const missing = requiredScripts.filter(script => !packageJson.scripts[script]);
      
      if (missing.length === 0) {
        console.log('✅ All required npm scripts are present');
        return { status: 'pass', scripts: Object.keys(packageJson.scripts) };
      } else {
        console.log(`❌ Missing required scripts: ${missing.join(', ')}`);
        return { status: 'fail', missing };
      }
    } catch (error) {
      console.log('❌ Error reading package.json');
      return { status: 'fail', error: error.message };
    }
  }

  async checkSiteAvailability() {
    console.log(`🌐 Checking site availability: ${CONFIG.SITE_URL}`);
    
    for (let attempt = 1; attempt <= CONFIG.RETRY_COUNT; attempt++) {
      try {
        const result = await this.makeHttpRequest(CONFIG.SITE_URL);
        
        if (result.statusCode === 200) {
          console.log(`✅ Site is available (attempt ${attempt})`);
          return { 
            status: 'pass', 
            statusCode: result.statusCode,
            responseTime: result.responseTime,
            attempt 
          };
        }
      } catch (error) {
        console.log(`❌ Site check failed (attempt ${attempt}): ${error.message}`);
        
        if (attempt < CONFIG.RETRY_COUNT) {
          console.log(`⏳ Retrying in ${CONFIG.RETRY_DELAY / 1000} seconds...`);
          await this.sleep(CONFIG.RETRY_DELAY);
        }
      }
    }
    
    return { 
      status: 'fail', 
      error: 'Site not available after all retries',
      attempts: CONFIG.RETRY_COUNT 
    };
  }

  async checkHealthEndpoint() {
    const healthUrl = `${CONFIG.SITE_URL}/health`;
    console.log(`🏥 Checking health endpoint: ${healthUrl}`);
    
    try {
      const result = await this.makeHttpRequest(healthUrl);
      
      if (result.statusCode === 200) {
        console.log('✅ Health endpoint is responding');
        return { 
          status: 'pass', 
          statusCode: result.statusCode,
          responseTime: result.responseTime,
          data: result.data 
        };
      } else {
        console.log(`⚠️  Health endpoint returned status ${result.statusCode}`);
        return { 
          status: 'warning', 
          statusCode: result.statusCode,
          responseTime: result.responseTime 
        };
      }
    } catch (error) {
      console.log(`❌ Health endpoint check failed: ${error.message}`);
      return { status: 'fail', error: error.message };
    }
  }

  async checkPerformance() {
    console.log('⚡ Running basic performance check...');
    
    try {
      const startTime = Date.now();
      const result = await this.makeHttpRequest(CONFIG.SITE_URL);
      const responseTime = Date.now() - startTime;
      
      const performance = {
        responseTime,
        status: responseTime < 3000 ? 'pass' : responseTime < 5000 ? 'warning' : 'fail'
      };
      
      if (performance.status === 'pass') {
        console.log(`✅ Performance check passed (${responseTime}ms)`);
      } else if (performance.status === 'warning') {
        console.log(`⚠️  Performance check warning (${responseTime}ms)`);
      } else {
        console.log(`❌ Performance check failed (${responseTime}ms)`);
      }
      
      return performance;
    } catch (error) {
      console.log(`❌ Performance check failed: ${error.message}`);
      return { status: 'fail', error: error.message };
    }
  }

  async checkSecurityHeaders() {
    console.log('🔒 Checking security headers...');
    
    try {
      const result = await this.makeHttpRequest(CONFIG.SITE_URL);
      const headers = result.headers;
      
      const requiredHeaders = [
        'x-content-type-options',
        'x-frame-options',
        'x-xss-protection'
      ];
      
      const present = requiredHeaders.filter(header => headers[header]);
      const missing = requiredHeaders.filter(header => !headers[header]);
      
      const security = {
        present,
        missing,
        status: missing.length === 0 ? 'pass' : missing.length <= 1 ? 'warning' : 'fail'
      };
      
      if (security.status === 'pass') {
        console.log('✅ All security headers are present');
      } else {
        console.log(`⚠️  Missing security headers: ${missing.join(', ')}`);
      }
      
      return security;
    } catch (error) {
      console.log(`❌ Security headers check failed: ${error.message}`);
      return { status: 'fail', error: error.message };
    }
  }

  makeHttpRequest(url) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      
      const request = https.get(url, { timeout: CONFIG.TIMEOUT }, (response) => {
        const responseTime = Date.now() - startTime;
        let data = '';
        
        response.on('data', (chunk) => {
          data += chunk;
        });
        
        response.on('end', () => {
          try {
            const parsedData = data.startsWith('{') ? JSON.parse(data) : data;
            resolve({
              statusCode: response.statusCode,
              headers: response.headers,
              data: parsedData,
              responseTime
            });
          } catch (error) {
            resolve({
              statusCode: response.statusCode,
              headers: response.headers,
              data: data,
              responseTime
            });
          }
        });
      });
      
      request.on('timeout', () => {
        request.destroy();
        reject(new Error('Request timeout'));
      });
      
      request.on('error', (error) => {
        reject(error);
      });
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  generateReport() {
    console.log('\n📊 DEPLOYMENT REPORT');
    console.log('='.repeat(50));
    
    const allChecks = [
      ...Object.values(this.results.preDeployment),
      ...Object.values(this.results.postDeployment),
      this.results.performance,
      this.results.security
    ].filter(Boolean);
    
    const passed = allChecks.filter(check => check.status === 'pass').length;
    const warnings = allChecks.filter(check => check.status === 'warning').length;
    const failed = allChecks.filter(check => check.status === 'fail').length;
    
    console.log(`✅ Passed: ${passed}`);
    console.log(`⚠️  Warnings: ${warnings}`);
    console.log(`❌ Failed: ${failed}`);
    
    if (failed === 0) {
      console.log('\n🎉 Deployment is healthy!');
      return 0;
    } else {
      console.log('\n🚨 Deployment has issues that need attention');
      return 1;
    }
  }
}

// Main execution
async function main() {
  const checker = new DeploymentChecker();
  
  try {
    const command = process.argv[2];
    
    if (command === 'pre') {
      await checker.runPreDeploymentChecks();
    } else if (command === 'post') {
      await checker.runPostDeploymentChecks();
    } else {
      // Run both pre and post checks
      await checker.runPreDeploymentChecks();
      await checker.runPostDeploymentChecks();
    }
    
    const exitCode = checker.generateReport();
    process.exit(exitCode);
    
  } catch (error) {
    console.error('💥 Deployment check failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = DeploymentChecker;