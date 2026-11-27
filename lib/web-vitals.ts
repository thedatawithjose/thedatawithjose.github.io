import { trackEvent } from './analytics';
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
  if (['lcp', 'cls', 'inp', 'fcp', 'ttfb'].includes(metricName)) {
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
  if (metricsStore.lcp !== undefined && metricsStore.cls !== undefined && metricsStore.inp !== undefined) {
    sendCompleteReport();
  }
}

function sendToAnalytics(metric: WebVitalsMetric) {
  trackEvent('web_vital', { metric_name: metric.name, metric_rating: metric.rating, value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value) });
}
function sendCompleteReport() { metricsStore = {}; }

let initialized = false;
export function initWebVitals() {
  if (typeof window === 'undefined' || initialized) return;
  initialized = true;

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