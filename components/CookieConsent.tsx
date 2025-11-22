'use client';

import { m, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useConsent } from './ConsentManager';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsent() {
  const { shouldShowBanner, updateConsent } = useConsent();
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  });

  const acceptAll = () => {
    updateConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const acceptSelected = () => {
    updateConsent(preferences);
  };

  const rejectAll = () => {
    updateConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  if (!shouldShowBanner) return null;

  return (
    <AnimatePresence>
      <m.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <m.div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          initial={{ y: 100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-cookie-bite text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Cookie Preferences</h3>
                  <p className="text-sm text-gray-600">We value your privacy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-700 mb-6 leading-relaxed">
              We use cookies to enhance your browsing experience, provide personalized content,
              and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>

            {/* Cookie Categories */}
            <div className="space-y-4 mb-6">
              {/* Necessary Cookies */}
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="font-semibold text-gray-900">Necessary Cookies</h4>
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      Always Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Essential for the website to function properly. These cannot be disabled.
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Help us understand how visitors interact with our website by collecting anonymous information.
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    type="button"
                    onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                    className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 ${preferences.analytics ? 'bg-blue-500 justify-end' : 'bg-gray-300 justify-start'
                      }`}
                    aria-label={`Toggle analytics cookies ${preferences.analytics ? 'off' : 'on'}`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full mx-1 transition-transform duration-300"></div>
                  </button>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">Marketing Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Used to track visitors across websites to display relevant advertisements.
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    type="button"
                    onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                    className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 ${preferences.marketing ? 'bg-blue-500 justify-end' : 'bg-gray-300 justify-start'
                      }`}
                    aria-label={`Toggle marketing cookies ${preferences.marketing ? 'off' : 'on'}`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full mx-1 transition-transform duration-300"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Privacy Policy Link */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <i className="fas fa-info-circle mr-2"></i>
                For more information about how we handle your data, please read our{' '}
                <Link href="/privacy-policy" className="underline hover:no-underline font-medium">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={acceptAll}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center"
              >
                <i className="fas fa-check mr-2"></i>
                Accept All
              </button>
              <button
                type="button"
                onClick={acceptSelected}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center"
              >
                <i className="fas fa-cog mr-2"></i>
                Save Preferences
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center"
              >
                <i className="fas fa-times mr-2"></i>
                Reject All
              </button>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                You can change your preferences at any time by clicking the cookie settings in the footer.
              </p>
            </div>
          </div>
        </m.div>
      </m.div>
    </AnimatePresence>
  );
}