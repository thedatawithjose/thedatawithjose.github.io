'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Article } from '@/lib/articles';

interface BlogClientFeaturesProps {
  allArticles: Article[];
  children: React.ReactNode;
}

export default function BlogClientFeatures({ allArticles, children }: BlogClientFeaturesProps) {
  // Pull-to-refresh state
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  
  // Swipe navigation state
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const articlesPerPage = 6;
  const totalPages = Math.ceil(allArticles.length / articlesPerPage);
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const articlesGridRef = useRef<HTMLDivElement>(null);
  
  // Get current articles for pagination
  const getCurrentArticles = () => {
    const start = currentPage * articlesPerPage;
    const end = start + articlesPerPage;
    return allArticles.slice(start, end);
  };

  // Pull-to-refresh handlers
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
      setIsPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isPulling || window.scrollY > 0) return;
    
    const currentY = e.touches[0].clientY;
    const distance = Math.max(0, currentY - startY);
    
    if (distance > 0) {
      e.preventDefault();
      setPullDistance(Math.min(distance * 0.5, 100)); // Max 100px pull
    }
  }, [isPulling, startY]);

  const handleTouchEnd = useCallback(() => {
    if (pullDistance > 60) {
      // Trigger refresh
      setIsRefreshing(true);
      
      // Simulate refresh (in real app, you'd fetch new data)
      setTimeout(() => {
        setIsRefreshing(false);
        setPullDistance(0);
        setIsPulling(false);
        
        // Show success message
        const message = document.createElement('div');
        message.textContent = '✨ Blog refreshed!';
        message.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg z-50 animate-bounce';
        document.body.appendChild(message);
        setTimeout(() => document.body.removeChild(message), 2000);
      }, 1500);
    } else {
      // Reset pull
      setPullDistance(0);
      setIsPulling(false);
    }
  }, [pullDistance]);

  // Swipe navigation handlers
  const handleSwipeStart = useCallback((e: TouchEvent) => {
    if (isTransitioning) return;
    setStartY(e.touches[0].clientX);
  }, [isTransitioning]);

  const handleSwipeMove = useCallback((e: TouchEvent) => {
    // Prevent default to avoid scrolling issues
    if (Math.abs(e.touches[0].clientX - startY) > 50) {
      e.preventDefault();
    }
  }, [startY]);

  const handleSwipeEnd = useCallback((e: TouchEvent) => {
    if (isTransitioning) return;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = startY - endX;
    const threshold = 100;

    if (Math.abs(diffX) > threshold) {
      setIsTransitioning(true);
      
      if (diffX > 0 && currentPage < totalPages - 1) {
        // Swipe left - next page
        setCurrentPage(prev => prev + 1);
      } else if (diffX < 0 && currentPage > 0) {
        // Swipe right - previous page
        setCurrentPage(prev => prev - 1);
      }
      
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [startY, currentPage, totalPages, isTransitioning]);

  // Setup touch event listeners
  useEffect(() => {
    const container = containerRef.current;
    const articlesGrid = articlesGridRef.current;
    
    if (container) {
      // Pull-to-refresh events
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);
    }
    
    if (articlesGrid) {
      // Swipe navigation events
      articlesGrid.addEventListener('touchstart', handleSwipeStart);
      articlesGrid.addEventListener('touchmove', handleSwipeMove, { passive: false });
      articlesGrid.addEventListener('touchend', handleSwipeEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
      if (articlesGrid) {
        articlesGrid.removeEventListener('touchstart', handleSwipeStart);
        articlesGrid.removeEventListener('touchmove', handleSwipeMove);
        articlesGrid.removeEventListener('touchend', handleSwipeEnd);
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, handleSwipeStart, handleSwipeMove, handleSwipeEnd]);

  // Add metadata to head
  useEffect(() => {
    document.title = 'Technical Blog | Jose Acosta - Quantitative Developer';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Insights on algorithmic trading systems, backtesting and validation, and automated execution by Jose Acosta.');
    }
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Pull-to-Refresh Indicator */}
      {(isPulling || isRefreshing) && (
        <div 
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 text-white transition-all duration-300"
          style={{ 
            height: `${Math.max(pullDistance, isRefreshing ? 60 : 0)}px`,
            transform: `translateY(${isRefreshing ? 0 : -60 + pullDistance}px)`
          }}
        >
          <div className="flex items-center space-x-2">
            {isRefreshing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span className="text-sm font-medium">Refreshing...</span>
              </>
            ) : (
              <>
                <i className={`fas fa-arrow-down transition-transform duration-200 ${pullDistance > 60 ? 'rotate-180' : ''}`}></i>
                <span className="text-sm font-medium">
                  {pullDistance > 60 ? 'Release to refresh' : 'Pull to refresh'}
                </span>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Swipe Navigation */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mb-8 space-x-4">
          <button
            onClick={() => currentPage > 0 && setCurrentPage(prev => prev - 1)}
            disabled={currentPage === 0}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all button-tactile"
            aria-label="Previous page"
          >
            <i className="fas fa-chevron-left text-gray-600"></i>
          </button>
          
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentPage 
                    ? 'bg-[#00BFA5] scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={() => currentPage < totalPages - 1 && setCurrentPage(prev => prev + 1)}
            disabled={currentPage === totalPages - 1}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all button-tactile"
            aria-label="Next page"
          >
            <i className="fas fa-chevron-right text-gray-600"></i>
          </button>
        </div>
      )}
      
      {/* Swipe Instructions for Mobile */}
      <div className="md:hidden text-center mb-6">
        <p className="text-sm text-gray-500 flex items-center justify-center">
          <i className="fas fa-hand-paper mr-2"></i>
          Swipe left/right to navigate articles
        </p>
      </div>
      
      <div 
        ref={articlesGridRef}
        className={`transition-all duration-300 ${
          isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {children}
      </div>
    </div>
  );
}