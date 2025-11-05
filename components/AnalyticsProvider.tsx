'use client';

import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { initGA, trackPageView, privacyAnalytics } from '../lib/analytics';

interface AnalyticsContextType {
  hasConsent: boolean;
  setConsent: (consent: boolean) => void;
  isLoaded: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
};

interface AnalyticsProviderProps {
  children: ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [hasConsent, setHasConsent] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showConsentBanner, setShowConsentBanner] = useState(false);
  const pathname = usePathname();

  // Check for existing consent on mount
  useEffect(() => {
    const existingConsent = privacyAnalytics.hasConsent();
    setHasConsent(existingConsent);
    setIsLoaded(true);

    // Show consent banner if no previous choice
    if (typeof window !== 'undefined') {
      const hasChoiceMade = localStorage.getItem('analytics_consent') !== null;
      if (!hasChoiceMade) {
        setTimeout(() => setShowConsentBanner(true), 2000); // Show after 2 seconds
      }
    }

    // Initialize GA if consent exists
    if (existingConsent) {
      initGA();
    }
  }, []);

  // Track page views when pathname changes
  useEffect(() => {
    if (hasConsent && isLoaded) {
      trackPageView(pathname);
    }
  }, [pathname, hasConsent, isLoaded]);

  const handleConsent = (consent: boolean) => {
    setHasConsent(consent);
    privacyAnalytics.setConsent(consent);
    privacyAnalytics.trackConsentChoice(consent);
    setShowConsentBanner(false);

    if (consent) {
      // Track current page view after consent
      trackPageView(pathname);
    }
  };

  return (
    <AnalyticsContext.Provider value={{ hasConsent, setConsent: handleConsent, isLoaded }}>
      {children}
      
      {/* Privacy Consent Banner */}
      <AnimatePresence>
        {showConsentBanner && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
          >
            <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <i className="fas fa-chart-line text-blue-500 text-xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Analytics & Performance
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    I use analytics to improve your experience and understand how to better serve potential clients. 
                    Your privacy is important - no personal data is collected.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleConsent(true)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                      Accept Analytics
                    </button>
                    <button
                      onClick={() => handleConsent(false)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    You can change this preference anytime in the footer.
                  </p>
                </div>
                <button
                  onClick={() => setShowConsentBanner(false)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close banner"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnalyticsContext.Provider>
  );
}