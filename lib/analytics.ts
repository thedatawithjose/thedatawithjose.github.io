'use client';

// Google Analytics 4 Configuration
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    // Load gtag script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title || document.title,
    });
  }
};

// Track custom events
export const trackEvent = (
  eventName: string,
  parameters: {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: any;
  } = {}
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: parameters.event_category || 'engagement',
      event_label: parameters.event_label,
      value: parameters.value,
      ...parameters,
    });
  }
};

// Portfolio-specific tracking events
export const portfolioAnalytics = {
  // Track project views
  trackProjectView: (projectName: string, projectCategory: string) => {
    trackEvent('project_view', {
      event_category: 'portfolio',
      event_label: projectName,
      project_category: projectCategory,
      custom_parameter_1: 'project_engagement'
    });
  },

  // Track contact form interactions
  trackFormStart: (formName: string) => {
    trackEvent('form_start', {
      event_category: 'form',
      event_label: formName,
      form_type: 'contact'
    });
  },

  trackFormSubmit: (formName: string, success: boolean, errorMessage?: string) => {
    trackEvent('form_submit', {
      event_category: 'form',
      event_label: formName,
      success: success,
      error_message: errorMessage || null,
      form_type: 'contact'
    });
  },

  trackFormFieldInteraction: (fieldName: string, action: string) => {
    trackEvent('form_field_interaction', {
      event_category: 'form',
      event_label: `${fieldName}_${action}`,
      field_name: fieldName,
      action: action
    });
  },

  // Track service interest
  trackServiceInterest: (serviceName: string, source: string) => {
    trackEvent('service_interest', {
      event_category: 'services',
      event_label: serviceName,
      source: source,
      interest_level: 'high'
    });
  },

  // Track download/external links
  trackDownload: (fileName: string, fileType: string) => {
    trackEvent('file_download', {
      event_category: 'downloads',
      event_label: fileName,
      file_type: fileType
    });
  },

  trackExternalLink: (url: string, linkText: string) => {
    trackEvent('click', {
      event_category: 'external_link',
      event_label: linkText,
      link_url: url,
      outbound: true
    });
  },

  // Track user engagement
  trackScrollDepth: (percentage: number, page: string) => {
    trackEvent('scroll', {
      event_category: 'engagement',
      event_label: `${percentage}%`,
      page: page,
      scroll_depth: percentage
    });
  },

  trackTimeOnPage: (seconds: number, page: string) => {
    trackEvent('timing_complete', {
      event_category: 'engagement',
      event_label: page,
      name: 'page_view_time',
      value: seconds
    });
  },

  // Track business goals
  trackLeadGeneration: (source: string, quality: 'high' | 'medium' | 'low') => {
    trackEvent('generate_lead', {
      event_category: 'business',
      event_label: source,
      lead_quality: quality,
      currency: 'USD',
      value: quality === 'high' ? 1000 : quality === 'medium' ? 500 : 100
    });
  },

  trackConsultationRequest: (serviceType: string, budget?: string) => {
    trackEvent('request_consultation', {
      event_category: 'business',
      event_label: serviceType,
      service_type: serviceType,
      budget_range: budget,
      currency: 'USD',
      value: 2000 // Estimated consultation value
    });
  }
};

// Enhanced ecommerce tracking for portfolio
export const ecommerceAnalytics = {
  // Track "purchase" of services (when someone submits contact form)
  trackServiceInquiry: (serviceName: string, estimatedValue: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: `inquiry_${Date.now()}`,
        value: estimatedValue,
        currency: 'USD',
        items: [{
          item_id: serviceName.toLowerCase().replace(/\s+/g, '_'),
          item_name: serviceName,
          category: 'data_engineering_service',
          quantity: 1,
          price: estimatedValue
        }]
      });
    }
  },

  // Track service page views as "product views"
  trackServiceView: (serviceName: string, serviceCategory: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'USD',
        value: 1000, // Estimated service value
        items: [{
          item_id: serviceName.toLowerCase().replace(/\s+/g, '_'),
          item_name: serviceName,
          category: serviceCategory,
          quantity: 1,
          price: 1000
        }]
      });
    }
  }
};

// User journey tracking
export const journeyAnalytics = {
  trackUserJourney: (step: string, funnel: string) => {
    trackEvent('user_journey', {
      event_category: 'funnel',
      event_label: `${funnel}_${step}`,
      funnel_name: funnel,
      step_name: step,
      step_number: getStepNumber(funnel, step)
    });
  }
};

// Helper function to get step numbers for funnel analysis
const getStepNumber = (funnel: string, step: string): number => {
  const funnelSteps: Record<string, Record<string, number>> = {
    'contact_funnel': {
      'landing': 1,
      'portfolio_view': 2,
      'service_interest': 3,
      'contact_page': 4,
      'form_start': 5,
      'form_submit': 6
    },
    'project_funnel': {
      'homepage': 1,
      'portfolio_page': 2,
      'project_view': 3,
      'project_details': 4,
      'contact_interest': 5
    }
  };

  return funnelSteps[funnel]?.[step] || 0;
};

// Privacy-compliant analytics
export const privacyAnalytics = {
  // Check if user has consented to analytics
  hasConsent: (): boolean => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('cookie-preferences');
        if (stored) {
          const prefs = JSON.parse(stored);
          return prefs.analytics === true;
        }
      } catch (error) {
        console.error('[privacyAnalytics] Error reading consent:', error);
      }
    }
    return false;
  },

  // Set analytics consent - DEPRECATED: Use ConsentManager instead
  setConsent: (consent: boolean) => {
    console.warn('[privacyAnalytics] setConsent is deprecated. Use ConsentManager.updateConsent instead.');
    if (typeof window !== 'undefined') {
      try {
        const prefs = {
          necessary: true,
          analytics: consent,
          marketing: false,
          timestamp: new Date().toISOString(),
          version: '1.0'
        };
        localStorage.setItem('cookie-preferences', JSON.stringify(prefs));
        
        if (consent) {
          initGA();
        } else {
          // Disable analytics
          window.gtag?.('consent', 'update', {
            analytics_storage: 'denied'
          });
        }
      } catch (error) {
        console.error('[privacyAnalytics] Error setting consent:', error);
      }
    }
  },

  // Track consent choice
  trackConsentChoice: (choice: boolean) => {
    trackEvent('consent_choice', {
      event_category: 'privacy',
      event_label: choice ? 'accepted' : 'declined',
      consent_type: 'analytics'
    });
  }
};

// Declare global gtag interface
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}