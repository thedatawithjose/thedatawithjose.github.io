import { useEffect, useCallback, useRef } from 'react';
import { useWebVitals } from '../components/WebVitalsTracker';

interface PerformanceOptions {
  trackComponentMount?: boolean;
  trackInteractions?: boolean;
  componentName?: string;
}

export function usePerformance(options: PerformanceOptions = {}) {
  const { trackCustomMetric } = useWebVitals();
  const mountTimeRef = useRef<number | undefined>(undefined);
  const interactionCountRef = useRef(0);

  const {
    trackComponentMount = false,
    trackInteractions = false,
    componentName = 'Unknown Component',
  } = options;

  // Track component mount time
  useEffect(() => {
    if (trackComponentMount) {
      mountTimeRef.current = performance.now();
      
      return () => {
        if (mountTimeRef.current) {
          const mountDuration = performance.now() - mountTimeRef.current;
          trackCustomMetric('Component Mount Time', mountDuration, {
            componentName,
            type: 'mount',
          });
        }
      };
    }
  }, [trackComponentMount, componentName, trackCustomMetric]);

  // Track user interactions
  const trackInteraction = useCallback((interactionType: string, additionalData?: any) => {
    if (trackInteractions) {
      interactionCountRef.current += 1;
      trackCustomMetric('User Interaction', performance.now(), {
        componentName,
        interactionType,
        interactionCount: interactionCountRef.current,
        ...additionalData,
      });
    }
  }, [trackInteractions, componentName, trackCustomMetric]);

  // Measure function execution time
  const measureFunction = useCallback(<T extends any[], R>(
    fn: (...args: T) => R,
    functionName: string
  ) => {
    return (...args: T): R => {
      const startTime = performance.now();
      const result = fn(...args);
      const duration = performance.now() - startTime;
      
      trackCustomMetric('Function Execution Time', duration, {
        componentName,
        functionName,
        type: 'function',
      });
      
      return result;
    };
  }, [componentName, trackCustomMetric]);

  // Measure async function execution time
  const measureAsyncFunction = useCallback(<T extends any[], R>(
    fn: (...args: T) => Promise<R>,
    functionName: string
  ) => {
    return async (...args: T): Promise<R> => {
      const startTime = performance.now();
      try {
        const result = await fn(...args);
        const duration = performance.now() - startTime;
        
        trackCustomMetric('Async Function Execution Time', duration, {
          componentName,
          functionName,
          type: 'async-function',
          status: 'success',
        });
        
        return result;
      } catch (error) {
        const duration = performance.now() - startTime;
        
        trackCustomMetric('Async Function Execution Time', duration, {
          componentName,
          functionName,
          type: 'async-function',
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        
        throw error;
      }
    };
  }, [componentName, trackCustomMetric]);

  // Track render performance
  const trackRender = useCallback((renderType: 'initial' | 'update' = 'update') => {
    const renderTime = performance.now();
    trackCustomMetric('Component Render', renderTime, {
      componentName,
      renderType,
      type: 'render',
    });
  }, [componentName, trackCustomMetric]);

  return {
    trackInteraction,
    measureFunction,
    measureAsyncFunction,
    trackRender,
  };
}

// Hook for tracking page performance
export function usePagePerformance(pageName: string) {
  const { trackCustomMetric } = useWebVitals();

  useEffect(() => {
    // Track page load time
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigationEntry) {
      const pageLoadTime = navigationEntry.loadEventEnd - navigationEntry.fetchStart;
      const domContentLoaded = navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart;
      
      trackCustomMetric('Page Load Time', pageLoadTime, {
        pageName,
        type: 'page-load',
      });
      
      trackCustomMetric('DOM Content Loaded', domContentLoaded, {
        pageName,
        type: 'dom-ready',
      });
    }

    // Track time to interactive (approximate)
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'measure' && entry.name === 'time-to-interactive') {
          trackCustomMetric('Time to Interactive', entry.duration, {
            pageName,
            type: 'tti',
          });
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['measure'] });
    } catch (error) {
      console.warn('Performance observer not supported:', error);
    }

    return () => {
      observer.disconnect();
    };
  }, [pageName, trackCustomMetric]);

  // Track page visibility changes
  useEffect(() => {
    let visibilityStartTime = performance.now();
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const visibilityDuration = performance.now() - visibilityStartTime;
        trackCustomMetric('Page Visibility Duration', visibilityDuration, {
          pageName,
          type: 'visibility',
          state: 'hidden',
        });
      } else {
        visibilityStartTime = performance.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pageName, trackCustomMetric]);
}

// Hook for tracking form performance
export function useFormPerformance(formName: string) {
  const { trackCustomMetric } = useWebVitals();
  const formStartTimeRef = useRef<number | undefined>(undefined);

  const trackFormStart = useCallback(() => {
    formStartTimeRef.current = performance.now();
    trackCustomMetric('Form Interaction Start', performance.now(), {
      formName,
      type: 'form-start',
    });
  }, [formName, trackCustomMetric]);

  const trackFormSubmit = useCallback((success: boolean, errorMessage?: string) => {
    if (formStartTimeRef.current) {
      const formDuration = performance.now() - formStartTimeRef.current;
      trackCustomMetric('Form Completion Time', formDuration, {
        formName,
        type: 'form-submit',
        success,
        errorMessage,
      });
    }
  }, [formName, trackCustomMetric]);

  const trackFieldInteraction = useCallback((fieldName: string, interactionType: 'focus' | 'blur' | 'change') => {
    trackCustomMetric('Form Field Interaction', performance.now(), {
      formName,
      fieldName,
      interactionType,
      type: 'form-field',
    });
  }, [formName, trackCustomMetric]);

  return {
    trackFormStart,
    trackFormSubmit,
    trackFieldInteraction,
  };
}