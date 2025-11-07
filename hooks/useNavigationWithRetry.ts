'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

interface NavigationOptions {
  maxRetries?: number;
  retryDelay?: number;
  onError?: (error: Error) => void;
}

export function useNavigationWithRetry(options: NavigationOptions = {}) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const { maxRetries = 3, retryDelay = 1000, onError } = options;

  const navigateWithRetry = useCallback(
    async (path: string, retries = maxRetries): Promise<void> => {
      setIsNavigating(true);

      try {
        // Try to navigate
        router.push(path);
        
        // Wait a bit to see if navigation succeeds
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setIsNavigating(false);
      } catch (error) {
        console.error(`Navigation failed (${maxRetries - retries + 1}/${maxRetries}):`, error);

        if (retries > 0) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          
          // Retry navigation
          return navigateWithRetry(path, retries - 1);
        } else {
          // All retries exhausted
          setIsNavigating(false);
          
          if (onError && error instanceof Error) {
            onError(error);
          }
          
          // Fallback: use window.location as last resort
          console.log('Using fallback navigation method');
          window.location.href = path;
        }
      }
    },
    [router, maxRetries, retryDelay, onError]
  );

  return {
    navigate: navigateWithRetry,
    isNavigating,
  };
}
