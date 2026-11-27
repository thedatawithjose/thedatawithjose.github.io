'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useConsent } from './ConsentManager';
import { trackEvent, trackPageView } from '../lib/analytics';

export default function CommercialTracking() {
  const pathname = usePathname();
  const { hasConsent } = useConsent();
  const consent = hasConsent('analytics');
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (consent && lastPath.current !== pathname) trackPageView(pathname);
    lastPath.current = pathname;
  }, [pathname, consent]);
  useEffect(() => {
    if (!consent) return;
    const listener = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const a = e.target.closest('a[href]');
      if (!(a instanceof HTMLAnchorElement)) return;
      const url = new URL(a.href, window.location.href);
      if (url.hostname === 'calendly.com') trackEvent('booking_click', { page_path: window.location.pathname });
      else if (url.pathname.endsWith('/quant_cv.pdf')) trackEvent('cv_download_click', { page_path: window.location.pathname });
      else if (url.protocol === 'mailto:') trackEvent('email_click', { page_path: window.location.pathname });
      else if (url.hostname === 'github.com') trackEvent('github_click', { page_path: window.location.pathname });
      else if (url.hostname === 'www.linkedin.com') trackEvent('linkedin_click', { page_path: window.location.pathname });
    };
    document.addEventListener('click', listener, true);
    return () => document.removeEventListener('click', listener, true);
  }, [consent]);
  return null;
}
