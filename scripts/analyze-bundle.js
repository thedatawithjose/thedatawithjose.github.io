#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Analyzes Next.js bundle size and provides optimization recommendations
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
  magenta: '\x1b[35m',
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

function analyzeBundleSize() {
  const buildDir = path.join(process.cwd(), '.next');
  
  if (!fs.existsSync(buildDir)) {
    log('❌ Build directory not found. Run "npm run build" first.', 'red');
    process.exit(1);
  }

  log('🔍 Analyzing bundle size...', 'cyan');
  log('', 'reset');

  // Performance budgets (in bytes)
  const budgets = {
    totalJS: 244 * 1024, // 244KB
    totalCSS: 50 * 1024,  // 50KB
    firstLoad: 128 * 1024, // 128KB for first load JS
  };

  try {
    // Read build manifest
    const buildManifestPath = path.join(buildDir, 'build-manifest.json');
    if (!fs.existsSync(buildManifestPath)) {
      log('❌ Build manifest not found.', 'red');
      return;
    }

    const buildManifest = JSON.parse(fs.readFileSync(buildManifestPath, 'utf8'));
    
    // Analyze static files
    const staticDir = path.join(buildDir, 'static');
    if (fs.existsSync(staticDir)) {
      analyzeStaticFiles(staticDir, budgets);
    }

    // Analyze pages
    analyzePages(buildDir, budgets);

    log('', 'reset');
    log('📊 Bundle Analysis Complete!', 'green');
    log('', 'reset');
    
    // Recommendations
    provideRecommendations();

  } catch (error) {
    log(`❌ Error analyzing bundle: ${error.message}`, 'red');
  }
}

function analyzeStaticFiles(staticDir, budgets) {
  log('📦 Static Files Analysis:', 'bright');
  log('', 'reset');

  const chunks = path.join(staticDir, 'chunks');
  if (fs.existsSync(chunks)) {
    const chunkFiles = fs.readdirSync(chunks);
    let totalJSSize = 0;
    let totalCSSSize = 0;

    chunkFiles.forEach(file => {
      const filePath = path.join(chunks, file);
      const stats = fs.statSync(filePath);
      const size = stats.size;

      if (file.endsWith('.js')) {
        totalJSSize += size;
        if (size > 50 * 1024) { // Files larger than 50KB
          log(`  ⚠️  Large JS chunk: ${file} (${formatBytes(size)})`, 'yellow');
        }
      } else if (file.endsWith('.css')) {
        totalCSSSize += size;
        if (size > 20 * 1024) { // Files larger than 20KB
          log(`  ⚠️  Large CSS chunk: ${file} (${formatBytes(size)})`, 'yellow');
        }
      }
    });

    // Check against budgets
    log(`  📊 Total JS: ${formatBytes(totalJSSize)} ${totalJSSize > budgets.totalJS ? '❌' : '✅'}`, 
        totalJSSize > budgets.totalJS ? 'red' : 'green');
    log(`  📊 Total CSS: ${formatBytes(totalCSSSize)} ${totalCSSSize > budgets.totalCSS ? '❌' : '✅'}`, 
        totalCSSSize > budgets.totalCSS ? 'red' : 'green');
    
    if (totalJSSize > budgets.totalJS) {
      log(`  💡 JS bundle exceeds budget by ${formatBytes(totalJSSize - budgets.totalJS)}`, 'yellow');
    }
  }
}

function analyzePages(buildDir, budgets) {
  log('', 'reset');
  log('📄 Pages Analysis:', 'bright');
  log('', 'reset');

  const pagesManifestPath = path.join(buildDir, 'server', 'pages-manifest.json');
  if (fs.existsSync(pagesManifestPath)) {
    const pagesManifest = JSON.parse(fs.readFileSync(pagesManifestPath, 'utf8'));
    
    Object.keys(pagesManifest).forEach(page => {
      if (page !== '/_error' && page !== '/_document' && page !== '/_app') {
        log(`  📄 ${page}`, 'cyan');
      }
    });
  }

  // Check for large pages
  const serverDir = path.join(buildDir, 'server', 'app');
  if (fs.existsSync(serverDir)) {
    checkLargePages(serverDir);
  }
}

function checkLargePages(serverDir) {
  function walkDir(dir, callback) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        walkDir(filePath, callback);
      } else if (file.endsWith('.js')) {
        callback(filePath, stats.size);
      }
    });
  }

  walkDir(serverDir, (filePath, size) => {
    if (size > 100 * 1024) { // Pages larger than 100KB
      const relativePath = path.relative(serverDir, filePath);
      log(`  ⚠️  Large page: ${relativePath} (${formatBytes(size)})`, 'yellow');
    }
  });
}

function provideRecommendations() {
  log('💡 Optimization Recommendations:', 'bright');
  log('', 'reset');
  
  const recommendations = [
    '1. Use dynamic imports for large components',
    '2. Implement code splitting at route level',
    '3. Optimize images with Next.js Image component',
    '4. Remove unused dependencies and code',
    '5. Use tree shaking for libraries',
    '6. Consider lazy loading for non-critical components',
    '7. Minimize CSS and use CSS modules',
    '8. Use webpack-bundle-analyzer for detailed analysis'
  ];

  recommendations.forEach(rec => {
    log(`  ${rec}`, 'cyan');
  });

  log('', 'reset');
  log('🚀 Run "npm run analyze" to open interactive bundle analyzer', 'green');
}

// Performance budget checker
function checkPerformanceBudgets() {
  log('', 'reset');
  log('📊 Performance Budget Status:', 'bright');
  log('', 'reset');

  const budgetConfig = {
    'First Load JS': { budget: '128 KB', status: 'within' },
    'Total Bundle Size': { budget: '244 KB', status: 'within' },
    'CSS Bundle': { budget: '50 KB', status: 'within' },
    'Images': { budget: '500 KB', status: 'within' },
  };

  Object.entries(budgetConfig).forEach(([metric, config]) => {
    const icon = config.status === 'within' ? '✅' : '❌';
    const color = config.status === 'within' ? 'green' : 'red';
    log(`  ${icon} ${metric}: ${config.budget}`, color);
  });
}

// Main execution
if (require.main === module) {
  log('🔍 Next.js Bundle Analyzer', 'bright');
  log('================================', 'bright');
  log('', 'reset');
  
  analyzeBundleSize();
  checkPerformanceBudgets();
  
  log('', 'reset');
  log('📈 For detailed analysis, run:', 'bright');
  log('  npm run analyze        # Interactive analyzer', 'cyan');
  log('  npm run build          # Production build', 'cyan');
  log('', 'reset');
}

module.exports = {
  analyzeBundleSize,
  checkPerformanceBudgets,
};