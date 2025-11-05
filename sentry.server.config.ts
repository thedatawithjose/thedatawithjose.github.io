import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Performance monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Environment configuration
  environment: process.env.NODE_ENV,
  
  // Release tracking
  release: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  
  // Error filtering for server-side
  beforeSend(event, hint) {
    // Log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Sentry Server Event:', event);
    }
    
    // Filter out known non-critical server errors
    const error = hint.originalException;
    if (error instanceof Error) {
      // Skip ECONNRESET errors (common network issues)
      if (error.message.includes('ECONNRESET') || 
          error.message.includes('EPIPE')) {
        return null;
      }
    }
    
    return event;
  },
  
  // Server-specific configuration
  initialScope: {
    tags: {
      component: 'server',
    },
  },
});