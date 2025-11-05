# Bundle Analysis & Performance Budgets

This document explains how to use the bundle analysis and performance monitoring system implemented in the project.

## Overview

The bundle analysis system provides:
- **Real-time bundle size monitoring**
- **Performance budget enforcement**
- **Automated alerts for budget violations**
- **Interactive dashboard for metrics visualization**
- **CLI tools for detailed analysis**

## Performance Budgets

The following performance budgets are enforced:

| Metric | Budget | Purpose |
|--------|--------|---------|
| JavaScript Bundle | 244 KB | Ensure fast initial load |
| CSS Bundle | 50 KB | Minimize render-blocking resources |
| First Load JS | 128 KB | Critical path optimization |
| Total Bundle | 300 KB | Overall performance target |

## CLI Commands

### Bundle Analysis
```bash
# Analyze current bundle size
npm run analyze:bundle

# Check performance budgets
npm run analyze:budget

# Open interactive bundle analyzer
npm run analyze

# Start continuous monitoring
npm run monitor:watch
```

### Build Analysis
```bash
# Production build with analysis
npm run build

# Build with interactive analyzer
npm run analyze
```

## Components

### BundleAnalyzer Component
Real-time bundle metrics display with:
- Total bundle size breakdown
- Budget status indicators
- Performance recommendations
- Refresh functionality

```tsx
import BundleAnalyzer from '@/components/BundleAnalyzer';

<BundleAnalyzer className="my-4" />
```

### PerformanceDashboard Component
Comprehensive performance monitoring dashboard:
- Bundle analysis integration
- Performance alerts history
- Quick action buttons
- Optimization tips

```tsx
import PerformanceDashboard from '@/components/PerformanceDashboard';

<PerformanceDashboard />
```

## API Endpoints

### GET /api/bundle-metrics
Returns current bundle metrics:
```json
{
  "totalSize": 180000,
  "jsSize": 140000,
  "cssSize": 25000,
  "imageSize": 15000,
  "firstLoadJS": 95000,
  "budgetStatus": {
    "js": "within",
    "css": "within", 
    "total": "within"
  },
  "chunks": [...],
  "recommendations": [...]
}
```

## Scripts

### analyze-bundle.js
Analyzes bundle size and provides optimization recommendations:
- Identifies large chunks
- Checks against performance budgets
- Provides actionable recommendations

### performance-monitor.js
Continuous performance monitoring:
- Tracks metrics over time
- Generates alerts for budget violations
- Maintains performance history

## Configuration

### Next.js Config
Bundle analyzer is configured in `next.config.ts`:
```typescript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Performance budgets in webpack config
config.optimization.splitChunks = {
  chunks: 'all',
  cacheGroups: {
    vendor: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendors',
      chunks: 'all',
      maxSize: 244000, // 244KB
    },
  },
};
```

### Package.json Scripts
```json
{
  "scripts": {
    "analyze": "ANALYZE=true npm run build",
    "analyze:bundle": "node scripts/analyze-bundle.js",
    "analyze:budget": "node scripts/analyze-bundle.js && node scripts/performance-monitor.js",
    "monitor:performance": "node scripts/performance-monitor.js",
    "monitor:watch": "node scripts/performance-monitor.js watch"
  }
}
```

## Usage Examples

### Basic Bundle Analysis
```bash
# Check current bundle status
npm run analyze:bundle
```

Output:
```
🔍 Next.js Bundle Analyzer
================================

📦 Static Files Analysis:
  ✅ Total JS: 140 KB (within budget)
  ✅ Total CSS: 25 KB (within budget)

💡 Optimization Recommendations:
  1. Bundle sizes are within recommended limits
  2. Consider implementing progressive loading
```

### Performance Monitoring
```bash
# Start continuous monitoring
npm run monitor:watch
```

Features:
- Checks bundle size every 5 minutes
- Generates alerts for budget violations
- Maintains performance history
- Provides optimization recommendations

### Interactive Analysis
```bash
# Open interactive bundle analyzer
npm run analyze
```

Opens webpack-bundle-analyzer in browser showing:
- Visual representation of bundle composition
- Chunk size breakdown
- Module dependencies
- Optimization opportunities

## Optimization Strategies

### Code Splitting
```typescript
// Dynamic imports for large components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>
});

// Route-based splitting
const LazyPage = lazy(() => import('./LazyPage'));
```

### Bundle Optimization
```typescript
// Tree shaking optimization
import { specificFunction } from 'large-library';

// Instead of
import * as library from 'large-library';
```

### Performance Budgets
Monitor and enforce budgets:
- Set up CI/CD checks
- Automated alerts
- Regular performance reviews

## Troubleshooting

### Large Bundle Size
1. Run `npm run analyze` to identify large chunks
2. Check for duplicate dependencies
3. Implement code splitting
4. Remove unused code

### Budget Violations
1. Review performance alerts
2. Analyze largest chunks
3. Implement optimization strategies
4. Monitor improvements

### Build Errors
1. Ensure all dependencies are installed
2. Check Next.js configuration
3. Verify API routes configuration
4. Review TypeScript errors

## Best Practices

1. **Regular Monitoring**: Run bundle analysis after major changes
2. **Budget Enforcement**: Set up CI/CD checks for budget violations
3. **Code Splitting**: Implement at route and component levels
4. **Dependency Management**: Regularly audit and update dependencies
5. **Performance Reviews**: Schedule regular performance assessments

## Integration with CI/CD

Add to your CI/CD pipeline:
```yaml
- name: Bundle Analysis
  run: |
    npm run build
    npm run analyze:budget
    
- name: Performance Budget Check
  run: |
    npm run monitor:performance
    # Fail build if critical violations found
```

This ensures performance budgets are enforced automatically and prevents performance regressions.