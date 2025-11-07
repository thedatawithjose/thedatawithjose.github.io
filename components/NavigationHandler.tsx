'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function NavigationHandler() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Preload critical pages in the background
    const criticalPages = ['/about/', '/services/', '/portfolio/', '/blog/', '/contact/'];
    
    const preloadPages = async () => {
      // Wait a bit before preloading to not interfere with initial page load
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      for (const page of criticalPages) {
        if (page !== pathname) {
          try {
            // Prefetch the page
            router.prefetch(page);
          } catch (error) {
            console.log(`Failed to prefetch ${page}:`, error);
          }
        }
      }
    };

    // Only preload on idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => preloadPages());
    } else {
      setTimeout(preloadPages, 3000);
    }
  }, [pathname, router]);

  useEffect(() => {
    // Handle navigation errors
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('Failed to fetch') || event.message.includes('NetworkError')) {
        console.log('Navigation error detected, attempting recovery...');
        
        // Try to reload the current page
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    };

    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
