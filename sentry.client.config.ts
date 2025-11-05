// Conditional Sentry loading - only in production with DSN
if (typeof window !== 'undefined' && 
    process.env.NODE_ENV === 'production' && 
    process.env.NEXT_PUBLIC_SENTRY_DSN) {
  
  // Lazy load Sentry to reduce initial bundle
  const loadSentry = async () => {
    const Sentry = await import('@sentry/nextjs');
    Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Performance monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Session replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // Environment configuration
  environment: process.env.NODE_ENV,
  
  // Release tracking
  release: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  
  // Error filtering
  beforeSend(event, hint) {
    // Filter out development errors
    if (process.env.NODE_ENV === 'development') {
      console.log('Sentry Event:', event);
    }
    
    // Filter out known non-critical errors
    const error = hint.originalException;
    if (error instanceof Error) {
      // Skip network errors that are not actionable
      if (error.message.includes('NetworkError') || 
          error.message.includes('Failed to fetch')) {
        return null;
      }
      
      // Skip ResizeObserver errors (common browser quirk)
      if (error.message.includes('ResizeObserver')) {
        return null;
      }
    }
    
    return event;
  },
  
  // Performance configuration
  beforeSendTransaction(event) {
    // Sample transactions based on environment
    if (process.env.NODE_ENV === 'development') {
      return event;
    }
    
    // Reduce sampling for static assets
    if (event.transaction?.includes('/_next/static/')) {
      return Math.random() < 0.01 ? event : null;
    }
    
    return event;
  },
  
  // Additional configuration
  integrations: [
    // Replay integration would be configured here if available
  ],
  
  // Tags for better organization
  initialScope: {
    tags: {
      component: 'client',
    },
  },
    });
  };
  
  // Load Sentry after page load to not block initial render
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSentry);
  } else {
    setTimeout(loadSentry, 100);
  }
}