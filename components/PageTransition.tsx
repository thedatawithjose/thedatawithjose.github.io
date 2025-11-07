'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const loadingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Clear any existing timeouts
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);

    // Start loading state
    setIsLoading(true);
    setShowContent(false);

    // Minimum loading time for smooth transition
    const minLoadTime = 150;
    
    // Show content after minimum load time
    timeoutRef.current = setTimeout(() => {
      setShowContent(true);
      
      // Remove loading state shortly after
      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 50);
    }, minLoadTime);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    };
  }, [pathname]);

  // Show loading indicator
  if (isLoading && !showContent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-sm text-gray-500 animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  // Fade in content
  return (
    <div className={`transition-opacity duration-300 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </div>
  );
}
