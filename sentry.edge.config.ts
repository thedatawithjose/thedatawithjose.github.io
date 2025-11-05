import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Minimal configuration for edge runtime
  tracesSampleRate: 0.1,
  
  // Environment configuration
  environment: process.env.NODE_ENV,
  
  // Release tracking
  release: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  
  // Edge-specific configuration
  initialScope: {
    tags: {
      component: 'edge',
    },
  },
});