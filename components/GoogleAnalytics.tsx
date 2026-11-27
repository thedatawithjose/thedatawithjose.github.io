'use client';

import Script from 'next/script';
import { trackEvent, trackPageView } from '../lib/analytics';

interface GoogleAnalyticsProps {
  measurementId: string;
  hasConsent?: boolean;
}

/**
 * GoogleAnalytics component - DEPRECATED
 * 
 * This component is no longer used as GA loading is now handled by ConsentManager.
 * ConsentManager loads GA dynamically only after user consent is obtained.
 * 
 * Keeping this file for backward compatibility but it should not be used in new code.
 */
export default function GoogleAnalytics({ measurementId, hasConsent = false }: GoogleAnalyticsProps) {
  // Don't load if no consent
  if (!hasConsent || !measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

// Hook para tracking de eventos personalizados
export function useGoogleAnalytics() {
  return { trackEvent, trackPageView };
}

// Declaración de tipos para gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}