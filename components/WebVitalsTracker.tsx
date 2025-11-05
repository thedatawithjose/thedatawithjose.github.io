'use client';

import { useEffect } from 'react';
import { initWebVitals } from '../lib/web-vitals';

interface WebVitalsTrackerProps {
  debug?: boolean;
}

export default function WebVitalsTracker({ debug = false }: WebVitalsTrackerProps) {
  useEffect(() => {
    // Delay web vitals initialization to not block initial render
    const timer = setTimeout(() => {
      initWebVitals();
    }, 100);

    // Optional: Add performance observer for additional metrics
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        // Track navigation timing
        const navObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (debug) {
              console.log('[Performance] Navigation:', entry);
            }
          });
        });
        navObserver.observe({ entryTypes: ['navigation'] });

        // Track resource timing for large resources
        const resourceObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            // Cast to PerformanceResourceTiming to access transferSize
            const resourceEntry = entry as PerformanceResourceTiming;
            
            // Only log large resources (>100KB) or slow resources (>1s)
            if ((resourceEntry.transferSize && resourceEntry.transferSize > 100000) || entry.duration > 1000) {
              if (debug) {
                console.log('[Performance] Large/Slow Resource:', {
                  name: entry.name,
                  size: resourceEntry.transferSize || 0,
                  duration: entry.duration,
                });
              }
              
              // Send to analytics
              if (typeof window !== 'undefined') {
                fetch('/api/analytics/resource-timing', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name: entry.name,
                    size: resourceEntry.transferSize || 0,
                    duration: entry.duration,
                    type: resourceEntry.initiatorType || 'unknown',
                    url: window.location.href,
                    timestamp: Date.now(),
                  }),
                }).catch(() => {
                  // Silently fail for analytics
                });
              }
            }
          });
        });
        resourceObserver.observe({ entryTypes: ['resource'] });

        // Cleanup observers on unmount
        return () => {
          clearTimeout(timer);
          navObserver.disconnect();
          resourceObserver.disconnect();
        };
      } catch (error) {
        console.warn('Failed to set up performance observers:', error);
      }
    }
  }, [debug]);

  // This component doesn't render anything
  return null;
}

// Hook for manual web vitals tracking in components
export function useWebVitals() {
  useEffect(() => {
    initWebVitals();
  }, []);

  const trackCustomMetric = (name: string, value: number, additionalData?: any) => {
    if (typeof window !== 'undefined') {
      // Send to Vercel Analytics
      if ('va' in window) {
        (window as any).va('event', {
          name: 'Custom Metric',
          data: {
            metric: name,
            value,
            ...additionalData,
          },
        });
      }

      // Send to custom analytics
      fetch('/api/analytics/custom-metric', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          value,
          additionalData,
          url: window.location.href,
          timestamp: Date.now(),
        }),
      }).catch(() => {
        // Silently fail for analytics
      });
    }
  };

  return { trackCustomMetric };
}