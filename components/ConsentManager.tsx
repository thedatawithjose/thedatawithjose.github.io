'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version?: string;
}

interface ConsentContextType {
  preferences: CookiePreferences | null;
  hasConsent: (type: 'analytics' | 'marketing') => boolean;
  updateConsent: (preferences: Omit<CookiePreferences, 'timestamp' | 'version'>) => void;
  showConsentBanner: () => void;
  hideConsentBanner: () => void;
  shouldShowBanner: boolean;
  isLoading: boolean;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within ConsentManager');
  }
  return context;
};

const STORAGE_KEY = 'cookie-preferences';
const OLD_KEYS = ['analytics_consent', 'cookie-consent'];

interface ConsentManagerProps {
  children: ReactNode;
}

export default function ConsentManager({ children }: ConsentManagerProps) {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gaLoaded, setGaLoaded] = useState(false);

  // Initialize Google Consent Mode with denied defaults
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;

      // Set default consent to denied
      gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'wait_for_update': 500
      });

      console.log('[ConsentManager] Consent Mode initialized with denied defaults');
    }
  }, []);

  // Load stored preferences and migrate old formats
  useEffect(() => {
    const loadPreferences = () => {
      try {
        // Try to load from new storage key
        const stored = localStorage.getItem(STORAGE_KEY);
        
        if (stored) {
          const parsed = JSON.parse(stored) as CookiePreferences;
          
          // Validate structure
          if (isValidPreferences(parsed)) {
            console.log('[ConsentManager] Loaded preferences:', parsed);
            setPreferences(parsed);
            
            // Update consent mode based on stored preferences
            updateConsentMode(parsed);
            
            // Load GA if analytics consent was given
            if (parsed.analytics && !gaLoaded) {
              loadGoogleAnalytics();
            }
            
            setIsLoading(false);
            return;
          } else {
            console.warn('[ConsentManager] Invalid preferences structure, clearing');
            localStorage.removeItem(STORAGE_KEY);
          }
        }

        // Try to migrate from old storage keys
        const migrated = migrateOldPreferences();
        if (migrated) {
          console.log('[ConsentManager] Migrated old preferences:', migrated);
          setPreferences(migrated);
          updateConsentMode(migrated);
          
          if (migrated.analytics && !gaLoaded) {
            loadGoogleAnalytics();
          }
          
          setIsLoading(false);
          return;
        }

        // No existing preferences, show banner
        console.log('[ConsentManager] No existing preferences, will show banner');
        setIsLoading(false);
        setTimeout(() => setShowBanner(true), 1000);
        
      } catch (error) {
        console.error('[ConsentManager] Error loading preferences:', error);
        localStorage.removeItem(STORAGE_KEY);
        setIsLoading(false);
        setTimeout(() => setShowBanner(true), 1000);
      }
    };

    loadPreferences();
  }, [gaLoaded]);

  const isValidPreferences = (prefs: any): prefs is CookiePreferences => {
    return (
      typeof prefs === 'object' &&
      prefs !== null &&
      typeof prefs.necessary === 'boolean' &&
      typeof prefs.analytics === 'boolean' &&
      typeof prefs.marketing === 'boolean' &&
      typeof prefs.timestamp === 'string'
    );
  };

  const migrateOldPreferences = (): CookiePreferences | null => {
    try {
      // Check for old analytics_consent key
      const analyticsConsent = localStorage.getItem('analytics_consent');
      if (analyticsConsent !== null) {
        const newPrefs: CookiePreferences = {
          necessary: true,
          analytics: analyticsConsent === 'true',
          marketing: false,
          timestamp: new Date().toISOString(),
          version: '1.0'
        };
        
        // Save in new format
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
        
        // Remove old key
        localStorage.removeItem('analytics_consent');
        
        return newPrefs;
      }

      // Check for old cookie-consent key
      const cookieConsent = localStorage.getItem('cookie-consent');
      if (cookieConsent) {
        const parsed = JSON.parse(cookieConsent);
        const newPrefs: CookiePreferences = {
          necessary: true,
          analytics: parsed.analytics || false,
          marketing: parsed.marketing || false,
          timestamp: parsed.timestamp || new Date().toISOString(),
          version: '1.0'
        };
        
        // Save in new format
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
        
        // Remove old key
        localStorage.removeItem('cookie-consent');
        
        return newPrefs;
      }

      return null;
    } catch (error) {
      console.error('[ConsentManager] Error migrating old preferences:', error);
      // Clean up any corrupted old keys
      OLD_KEYS.forEach(key => {
        try {
          localStorage.removeItem(key);
        } catch (e) {
          // Ignore
        }
      });
      return null;
    }
  };

  const updateConsentMode = (prefs: CookiePreferences) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': prefs.analytics ? 'granted' : 'denied',
        'ad_storage': prefs.marketing ? 'granted' : 'denied',
        'ad_user_data': prefs.marketing ? 'granted' : 'denied',
        'ad_personalization': prefs.marketing ? 'granted' : 'denied'
      });
      
      console.log('[ConsentManager] Consent mode updated:', {
        analytics: prefs.analytics ? 'granted' : 'denied',
        marketing: prefs.marketing ? 'granted' : 'denied'
      });
    }
  };

  const loadGoogleAnalytics = () => {
    if (gaLoaded) {
      console.log('[ConsentManager] GA already loaded');
      return;
    }

    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    
    if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
      console.warn('[ConsentManager] No valid GA measurement ID');
      return;
    }

    try {
      console.log('[ConsentManager] Loading Google Analytics...');
      
      // Load gtag script
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize gtag
      script.onload = () => {
        if (window.gtag) {
          window.gtag('js', new Date());
          window.gtag('config', measurementId, {
            page_title: document.title,
            page_location: window.location.href,
          });
          
          console.log('[ConsentManager] Google Analytics loaded successfully');
        }
      };

      setGaLoaded(true);
    } catch (error) {
      console.error('[ConsentManager] Failed to load Google Analytics:', error);
    }
  };

  const hasConsent = (type: 'analytics' | 'marketing'): boolean => {
    if (!preferences) return false;
    return preferences[type];
  };

  const updateConsent = (newPrefs: Omit<CookiePreferences, 'timestamp' | 'version'>) => {
    const fullPrefs: CookiePreferences = {
      ...newPrefs,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };

    try {
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fullPrefs));
      
      // Update state
      setPreferences(fullPrefs);
      
      // Update consent mode
      updateConsentMode(fullPrefs);
      
      // Load GA if analytics was just enabled
      if (fullPrefs.analytics && !gaLoaded) {
        loadGoogleAnalytics();
      }
      
      // Hide banner
      setShowBanner(false);
      
      console.log('[ConsentManager] Consent updated:', fullPrefs);
    } catch (error) {
      console.error('[ConsentManager] Failed to save preferences:', error);
    }
  };

  const showConsentBanner = () => {
    setShowBanner(true);
  };

  const hideConsentBanner = () => {
    setShowBanner(false);
  };

  const contextValue: ConsentContextType = {
    preferences,
    hasConsent,
    updateConsent,
    showConsentBanner,
    hideConsentBanner,
    shouldShowBanner: showBanner,
    isLoading
  };

  return (
    <ConsentContext.Provider value={contextValue}>
      {children}
    </ConsentContext.Provider>
  );
}

// Declare global gtag interface
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
