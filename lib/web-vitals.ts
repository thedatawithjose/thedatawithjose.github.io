import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

export interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  entries: PerformanceEntry[];
}

export interface WebVitalsReport {
  lcp?: number;
  fid?: number;
  cls?: number;
  inp?: number;
  fcp?: number;
  ttfb?: number;
  timestamp: number;
  url: string;
  userAgent: string;
}

// Thresholds based on Core Web Vitals recommendations
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  CLS: { good: 0.1, poor: 0.25 },
  INP: { good: 200, poor: 500 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
};

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

// Store metrics for reporting
let metricsStore: Partial<WebVitalsReport> = {};

function handleMetric(metric: WebVitalsMetric) {
  // Store the metric
  const metricName = metric.name.toLowerCase() as keyof WebVitalsReport;
  if (metricName in metricsStore) {
    (metricsStore as any)[metricName] = metric.value;
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }

  // Emit custom event for dashboard
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('web-vitals', { detail: metric }));
  }

  // Send to analytics
  sendToAnalytics(metric);
  
  // Check if we have all core metrics to send a complete report
  if (metricsStore.lcp && metricsStore.cls && metricsStore.inp) {
    sendCompleteReport();
  }
}

function sendToAnalytics(metric: WebVitalsMetric) {
  // Send to Vercel Analytics if available
  if (typeof window !== 'undefined' && 'va' in window) {
    (window as any).va('event', {
      name: 'Web Vitals',
      data: {
        metric: metric.name,
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
      },
    });
  }

  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }

  // Send to custom analytics endpoint
  if (typeof window !== 'undefined') {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
      }),
    }).catch((error) => {
      console.warn('Failed to send web vitals to analytics:', error);
    });
  }
}

function sendCompleteReport() {
  const report: WebVitalsReport = {
    ...metricsStore,
    timestamp: Date.now(),
    url: typeof window !== 'undefined' ? window.location.href : '',
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals] Complete Report:', report);
  }

  // Send complete report to analytics
  if (typeof window !== 'undefined') {
    fetch('/api/analytics/web-vitals-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    }).catch((error) => {
      console.warn('Failed to send complete web vitals report:', error);
    });
  }

  // Reset store for next page
  metricsStore = {};
}

export function initWebVitals() {
  if (typeof window === 'undefined') return;

  try {
    // Get Core Web Vitals
    onCLS(handleMetric);
    onLCP(handleMetric);
    onINP(handleMetric); // INP replaces FID in modern web-vitals
    
    // Get additional metrics
    onFCP(handleMetric);
    onTTFB(handleMetric);
  } catch (error) {
    console.warn('Failed to initialize web vitals:', error);
  }
}

// Export individual metric listeners for manual tracking
export {
  onCLS,
  onFCP,
  onLCP,
  onTTFB,
  onINP,
};