#!/usr/bin/env node

/**
 * Performance Monitoring Script
 * Monitors bundle size and performance metrics over time
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Performance budgets
const BUDGETS = {
  totalJS: 244 * 1024,   // 244KB
  totalCSS: 50 * 1024,   // 50KB
  firstLoad: 128 * 1024, // 128KB
  total: 300 * 1024,     // 300KB
};

class PerformanceMonitor {
  constructor() {
    this.metricsFile = path.join(process.cwd(), '.next', 'performance-metrics.json');
    this.alertsFile = path.join(process.cwd(), '.next', 'performance-alerts.json');
  }

  async monitor() {
    log('🔍 Performance Monitor Starting...', 'cyan');
    log('', 'reset');

    const metrics = await this.collectMetrics();
    if (!metrics) {
      log('❌ No build found. Run "npm run build" first.', 'red');
      return;
    }

    await this.saveMetrics(metrics);
    await this.checkBudgets(metrics);
    await this.generateReport(metrics);
    
    log('✅ Performance monitoring complete!', 'green');
  }

  async collectMetrics() {
    const buildDir = path.join(process.cwd(), '.next');
    
    if (!fs.existsSync(buildDir)) {
      return null;
    }

    const metrics = {
      timestamp: new Date().toISOString(),
      totalSize: 0,
      jsSize: 0,
      cssSize: 0,
      imageSize: 0,
      firstLoadJS: 0,
      chunks: [],
      budgetViolations: [],
    };

    try {
      // Analyze static files
      const staticDir = path.join(buildDir, 'static');
      if (fs.existsSync(staticDir)) {
        await this.analyzeStaticFiles(staticDir, metrics);
      }

      return metrics;
    } catch (error) {
      log(`❌ Error collecting metrics: ${error.message}`, 'red');
      return null;
    }
  }

  async analyzeStaticFiles(staticDir, metrics) {
    const chunksDir = path.join(staticDir, 'chunks');
    if (fs.existsSync(chunksDir)) {
      const chunkFiles = fs.readdirSync(chunksDir);
      
      chunkFiles.forEach(file => {
        const filePath = path.join(chunksDir, file);
        const stats = fs.statSync(filePath);
        const size = stats.size;
        
        metrics.totalSize += size;
        
        if (file.endsWith('.js')) {
          metrics.jsSize += size;
          metrics.chunks.push({ name: file, size, type: 'js' });
          
          // Estimate first load JS
          if (file.includes('main') || file.includes('framework') || file.includes('webpack')) {
            metrics.firstLoadJS += size;
          }
        } else if (file.endsWith('.css')) {
          metrics.cssSize += size;
          metrics.chunks.push({ name: file, size, type: 'css' });
        }
      });
    }

    // Analyze media files
    const mediaDir = path.join(staticDir, 'media');
    if (fs.existsSync(mediaDir)) {
      const mediaFiles = fs.readdirSync(mediaDir);
      mediaFiles.forEach(file => {
        const filePath = path.join(mediaDir, file);
        const stats = fs.statSync(filePath);
        metrics.imageSize += stats.size;
        metrics.totalSize += stats.size;
      });
    }
  }

  async saveMetrics(metrics) {
    try {
      let history = [];
      
      // Load existing metrics
      if (fs.existsSync(this.metricsFile)) {
        const data = fs.readFileSync(this.metricsFile, 'utf8');
        history = JSON.parse(data);
      }
      
      // Add current metrics
      history.push(metrics);
      
      // Keep only last 30 entries
      if (history.length > 30) {
        history = history.slice(-30);
      }
      
      // Save updated history
      fs.writeFileSync(this.metricsFile, JSON.stringify(history, null, 2));
      
      log(`📊 Metrics saved (${history.length} entries)`, 'blue');
    } catch (error) {
      log(`⚠️  Failed to save metrics: ${error.message}`, 'yellow');
    }
  }

  async checkBudgets(metrics) {
    log('📊 Budget Analysis:', 'bright');
    log('', 'reset');

    const violations = [];

    // Check JS budget
    if (metrics.jsSize > BUDGETS.totalJS) {
      const excess = metrics.jsSize - BUDGETS.totalJS;
      violations.push({
        type: 'JavaScript',
        current: metrics.jsSize,
        budget: BUDGETS.totalJS,
        excess,
        severity: excess > BUDGETS.totalJS * 0.2 ? 'high' : 'medium'
      });
      log(`  ❌ JavaScript: ${formatBytes(metrics.jsSize)} (${formatBytes(excess)} over budget)`, 'red');
    } else {
      log(`  ✅ JavaScript: ${formatBytes(metrics.jsSize)} (within budget)`, 'green');
    }

    // Check CSS budget
    if (metrics.cssSize > BUDGETS.totalCSS) {
      const excess = metrics.cssSize - BUDGETS.totalCSS;
      violations.push({
        type: 'CSS',
        current: metrics.cssSize,
        budget: BUDGETS.totalCSS,
        excess,
        severity: 'medium'
      });
      log(`  ❌ CSS: ${formatBytes(metrics.cssSize)} (${formatBytes(excess)} over budget)`, 'red');
    } else {
      log(`  ✅ CSS: ${formatBytes(metrics.cssSize)} (within budget)`, 'green');
    }

    // Check first load JS
    if (metrics.firstLoadJS > BUDGETS.firstLoad) {
      const excess = metrics.firstLoadJS - BUDGETS.firstLoad;
      violations.push({
        type: 'First Load JS',
        current: metrics.firstLoadJS,
        budget: BUDGETS.firstLoad,
        excess,
        severity: 'high'
      });
      log(`  ❌ First Load JS: ${formatBytes(metrics.firstLoadJS)} (${formatBytes(excess)} over budget)`, 'red');
    } else {
      log(`  ✅ First Load JS: ${formatBytes(metrics.firstLoadJS)} (within budget)`, 'green');
    }

    // Check total size
    if (metrics.totalSize > BUDGETS.total) {
      const excess = metrics.totalSize - BUDGETS.total;
      violations.push({
        type: 'Total Bundle',
        current: metrics.totalSize,
        budget: BUDGETS.total,
        excess,
        severity: 'medium'
      });
      log(`  ❌ Total: ${formatBytes(metrics.totalSize)} (${formatBytes(excess)} over budget)`, 'red');
    } else {
      log(`  ✅ Total: ${formatBytes(metrics.totalSize)} (within budget)`, 'green');
    }

    metrics.budgetViolations = violations;

    if (violations.length > 0) {
      await this.saveAlerts(violations);
    }
  }

  async saveAlerts(violations) {
    try {
      const alert = {
        timestamp: new Date().toISOString(),
        violations,
        severity: violations.some(v => v.severity === 'high') ? 'high' : 'medium',
      };

      let alerts = [];
      if (fs.existsSync(this.alertsFile)) {
        const data = fs.readFileSync(this.alertsFile, 'utf8');
        alerts = JSON.parse(data);
      }

      alerts.push(alert);
      
      // Keep only last 10 alerts
      if (alerts.length > 10) {
        alerts = alerts.slice(-10);
      }

      fs.writeFileSync(this.alertsFile, JSON.stringify(alerts, null, 2));
      
      log('', 'reset');
      log('🚨 Performance alerts saved', 'yellow');
    } catch (error) {
      log(`⚠️  Failed to save alerts: ${error.message}`, 'yellow');
    }
  }

  async generateReport(metrics) {
    log('', 'reset');
    log('📈 Performance Report:', 'bright');
    log('', 'reset');

    // Show largest chunks
    const largestChunks = metrics.chunks
      .sort((a, b) => b.size - a.size)
      .slice(0, 5);

    if (largestChunks.length > 0) {
      log('  📦 Largest Chunks:', 'cyan');
      largestChunks.forEach((chunk, index) => {
        const icon = chunk.size > 50 * 1024 ? '⚠️ ' : '  ';
        log(`    ${icon}${index + 1}. ${chunk.name} (${formatBytes(chunk.size)})`, 
            chunk.size > 50 * 1024 ? 'yellow' : 'reset');
      });
    }

    // Recommendations
    log('', 'reset');
    log('  💡 Recommendations:', 'cyan');
    
    if (metrics.budgetViolations.length === 0) {
      log('    • Bundle sizes are within recommended limits', 'green');
      log('    • Consider implementing progressive loading', 'green');
    } else {
      log('    • Review and optimize large chunks', 'yellow');
      log('    • Implement code splitting for better performance', 'yellow');
      log('    • Use dynamic imports for non-critical components', 'yellow');
    }

    log('    • Run "npm run analyze" for detailed bundle analysis', 'blue');
  }

  async watchMode() {
    log('👀 Starting performance watch mode...', 'cyan');
    log('Press Ctrl+C to stop', 'gray');
    
    const interval = setInterval(async () => {
      await this.monitor();
      log('', 'reset');
      log('⏰ Next check in 5 minutes...', 'gray');
    }, 5 * 60 * 1000); // Check every 5 minutes

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      clearInterval(interval);
      log('', 'reset');
      log('👋 Performance monitoring stopped', 'cyan');
      process.exit(0);
    });
  }
}

// CLI interface
if (require.main === module) {
  const monitor = new PerformanceMonitor();
  
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'watch':
      monitor.watchMode();
      break;
    case 'report':
      monitor.monitor();
      break;
    default:
      monitor.monitor();
  }
}

module.exports = PerformanceMonitor;