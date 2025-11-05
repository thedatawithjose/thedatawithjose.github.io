'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { portfolioAnalytics, journeyAnalytics, trackEvent } from '../lib/analytics';

// Hook for automatic scroll depth tracking
export const useScrollTracking = (page: string) => {
  const scrollDepthRef = useRef<Set<number>>(new Set());
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      // Track scroll milestones
      const milestones = [25, 50, 75, 90, 100];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollDepthRef.current.has(milestone)) {
          scrollDepthRef.current.add(milestone);
          portfolioAnalytics.trackScrollDepth(milestone, page);
        }
      });
    };

    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (timeSpent > 10) { // Only track if user spent more than 10 seconds
        portfolioAnalytics.trackTimeOnPage(timeSpent, page);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [page]);
};

// Hook for tracking user journey through the site
export const useJourneyTracking = () => {
  const pathname = usePathname();
  const previousPageRef = useRef<string>('');

  useEffect(() => {
    // Determine funnel and step based on current page
    let funnel = 'general';
    let step = 'page_view';

    if (pathname === '/') {
      funnel = 'contact_funnel';
      step = 'landing';
    } else if (pathname === '/portfolio') {
      funnel = 'contact_funnel';
      step = 'portfolio_view';
    } else if (pathname === '/services') {
      funnel = 'contact_funnel';
      step = 'service_interest';
    } else if (pathname === '/contact') {
      funnel = 'contact_funnel';
      step = 'contact_page';
    } else if (pathname.startsWith('/portfolio/')) {
      funnel = 'project_funnel';
      step = 'project_view';
    }

    // Track the journey step
    journeyAnalytics.trackUserJourney(step, funnel);

    // Update previous page reference
    previousPageRef.current = pathname;
  }, [pathname]);

  return {
    currentPage: pathname,
    previousPage: previousPageRef.current
  };
};

// Hook for tracking form interactions
export const useFormTracking = (formName: string) => {
  const formStartedRef = useRef(false);

  const trackFormStart = () => {
    if (!formStartedRef.current) {
      portfolioAnalytics.trackFormStart(formName);
      journeyAnalytics.trackUserJourney('form_start', 'contact_funnel');
      formStartedRef.current = true;
    }
  };

  const trackFormSubmit = (success: boolean, errorMessage?: string) => {
    portfolioAnalytics.trackFormSubmit(formName, success, errorMessage);
    
    if (success) {
      journeyAnalytics.trackUserJourney('form_submit', 'contact_funnel');
      // Track as lead generation
      portfolioAnalytics.trackLeadGeneration('contact_form', 'high');
    }
  };

  const trackFieldInteraction = (fieldName: string, action: 'focus' | 'blur' | 'change') => {
    portfolioAnalytics.trackFormFieldInteraction(fieldName, action);
  };

  return {
    trackFormStart,
    trackFormSubmit,
    trackFieldInteraction
  };
};

// Hook for tracking project/portfolio interactions
export const useProjectTracking = () => {
  const trackProjectView = (projectName: string, category: string) => {
    portfolioAnalytics.trackProjectView(projectName, category);
    journeyAnalytics.trackUserJourney('project_details', 'project_funnel');
  };

  const trackProjectInterest = (projectName: string, action: 'demo_click' | 'github_click' | 'contact_interest') => {
    trackEvent('project_interaction', {
      event_category: 'portfolio',
      event_label: `${projectName}_${action}`,
      project_name: projectName,
      interaction_type: action
    });

    if (action === 'contact_interest') {
      journeyAnalytics.trackUserJourney('contact_interest', 'project_funnel');
    }
  };

  return {
    trackProjectView,
    trackProjectInterest
  };
};

// Hook for tracking service interest
export const useServiceTracking = () => {
  const trackServiceView = (serviceName: string, category: string) => {
    trackEvent('service_view', {
      event_category: 'services',
      event_label: serviceName,
      service_category: category
    });
  };

  const trackServiceInterest = (serviceName: string, source: string) => {
    portfolioAnalytics.trackServiceInterest(serviceName, source);
    journeyAnalytics.trackUserJourney('service_interest', 'contact_funnel');
  };

  const trackConsultationRequest = (serviceType: string, budget?: string) => {
    portfolioAnalytics.trackConsultationRequest(serviceType, budget);
    portfolioAnalytics.trackLeadGeneration('service_page', 'high');
  };

  return {
    trackServiceView,
    trackServiceInterest,
    trackConsultationRequest
  };
};

// Hook for tracking external links and downloads
export const useExternalTracking = () => {
  const trackExternalLink = (url: string, linkText: string) => {
    portfolioAnalytics.trackExternalLink(url, linkText);
  };

  const trackDownload = (fileName: string, fileType: string) => {
    portfolioAnalytics.trackDownload(fileName, fileType);
  };

  const trackSocialClick = (platform: string, action: string) => {
    trackEvent('social_interaction', {
      event_category: 'social',
      event_label: `${platform}_${action}`,
      social_platform: platform,
      action_type: action
    });
  };

  return {
    trackExternalLink,
    trackDownload,
    trackSocialClick
  };
};

// Hook for business metrics tracking
export const useBusinessTracking = () => {
  const trackLeadQuality = (source: string, indicators: {
    hasEmail: boolean;
    hasPhone: boolean;
    hasBudget: boolean;
    hasTimeline: boolean;
    messageLength: number;
  }) => {
    // Calculate lead quality score
    let qualityScore = 0;
    if (indicators.hasEmail) qualityScore += 20;
    if (indicators.hasPhone) qualityScore += 15;
    if (indicators.hasBudget) qualityScore += 25;
    if (indicators.hasTimeline) qualityScore += 20;
    if (indicators.messageLength > 100) qualityScore += 20;

    const quality: 'high' | 'medium' | 'low' = 
      qualityScore >= 70 ? 'high' : 
      qualityScore >= 40 ? 'medium' : 'low';

    portfolioAnalytics.trackLeadGeneration(source, quality);

    // Track detailed lead scoring
    trackEvent('lead_scoring', {
      event_category: 'business',
      event_label: source,
      quality_score: qualityScore,
      quality_level: quality,
      has_email: indicators.hasEmail,
      has_phone: indicators.hasPhone,
      has_budget: indicators.hasBudget,
      has_timeline: indicators.hasTimeline,
      message_length: indicators.messageLength
    });
  };

  return {
    trackLeadQuality
  };
};