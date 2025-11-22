'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import { m, useMotionValue, useTransform, PanInfo, AnimatePresence } from 'framer-motion';

// Hook para detectar gestos de swipe
export function useSwipeGesture(
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  onSwipeUp?: () => void,
  onSwipeDown?: () => void,
  threshold: number = 50
) {
  const [isGestureActive, setIsGestureActive] = useState(false);

  const handlePanEnd = (event: any, info: PanInfo) => {
    const { offset, velocity } = info;

    // Determinar dirección del swipe basado en offset y velocidad
    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      // Swipe horizontal
      if (offset.x > threshold && velocity.x > 0) {
        onSwipeRight?.();
      } else if (offset.x < -threshold && velocity.x < 0) {
        onSwipeLeft?.();
      }
    } else {
      // Swipe vertical
      if (offset.y > threshold && velocity.y > 0) {
        onSwipeDown?.();
      } else if (offset.y < -threshold && velocity.y < 0) {
        onSwipeUp?.();
      }
    }

    setIsGestureActive(false);
  };

  return {
    onPanStart: () => setIsGestureActive(true),
    onPanEnd: handlePanEnd,
    isGestureActive
  };
}

// Componente para navegación por swipe en carruseles
interface SwipeableCarouselProps {
  children: ReactNode[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  className?: string;
}

export function SwipeableCarousel({
  children,
  currentIndex,
  onIndexChange,
  className = ''
}: SwipeableCarouselProps) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const swipeGesture = useSwipeGesture(
    () => {
      // Swipe left - next item
      if (currentIndex < children.length - 1) {
        onIndexChange(currentIndex + 1);
      }
    },
    () => {
      // Swipe right - previous item
      if (currentIndex > 0) {
        onIndexChange(currentIndex - 1);
      }
    }
  );

  return (
    <div className={`overflow-hidden ${className}`} ref={containerRef}>
      <m.div
        className="flex"
        style={{ x }}
        animate={{ x: -currentIndex * 100 + '%' }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        {...swipeGesture}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </m.div>

      {/* Indicadores de swipe */}
      <div className="flex justify-center mt-4 gap-2">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => onIndexChange(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-green-500 w-6' : 'bg-gray-300'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Componente para pull-to-refresh
interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: ReactNode;
  threshold?: number;
}

export function PullToRefresh({
  onRefresh,
  children,
  threshold = 80
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const y = useMotionValue(0);

  const opacity = useTransform(y, [0, threshold], [0, 1]);
  const scale = useTransform(y, [0, threshold], [0.8, 1]);

  const handlePanEnd = async (event: any, info: PanInfo) => {
    if (info.offset.y > threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        y.set(0);
        setPullDistance(0);
      }
    } else {
      y.set(0);
      setPullDistance(0);
    }
  };

  const handlePan = (event: any, info: PanInfo) => {
    if (info.offset.y > 0 && window.scrollY === 0) {
      const distance = Math.min(info.offset.y, threshold * 1.5);
      y.set(distance);
      setPullDistance(distance);
    }
  };

  return (
    <m.div style={{ y }}>
      {/* Pull indicator */}
      <m.div
        className="flex justify-center py-4"
        style={{ opacity, scale }}
      >
        <div className="flex items-center gap-2 text-gray-500">
          {isRefreshing ? (
            <>
              <m.div
                className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>Refreshing...</span>
            </>
          ) : (
            <>
              <m.i
                className="fas fa-arrow-down"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span>Pull to refresh</span>
            </>
          )}
        </div>
      </m.div>

      <m.div
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      >
        {children}
      </m.div>
    </m.div>
  );
}

// Hook para detectar orientación del dispositivo
export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };

    handleOrientationChange();
    window.addEventListener('resize', handleOrientationChange);

    return () => window.removeEventListener('resize', handleOrientationChange);
  }, []);

  return orientation;
}

// Componente para navegación táctil mejorada
interface TouchNavigationProps {
  items: Array<{ id: string; label: string; href: string; icon?: string }>;
  activeId: string;
  onItemSelect: (id: string) => void;
}

export function TouchNavigation({ items, activeId, onItemSelect }: TouchNavigationProps) {
  const [pressedItem, setPressedItem] = useState<string | null>(null);

  const handleTouchStart = (id: string) => {
    setPressedItem(id);
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  const handleTouchEnd = () => {
    setPressedItem(null);
  };

  return (
    <div className="flex justify-around bg-white border-t border-gray-200 py-2 px-4 safe-area-pb">
      {items.map((item) => (
        <m.button
          key={item.id}
          onClick={() => onItemSelect(item.id)}
          onTouchStart={() => handleTouchStart(item.id)}
          onTouchEnd={handleTouchEnd}
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors min-w-0 flex-1 ${activeId === item.id
              ? 'text-green-500 bg-green-50'
              : 'text-gray-600 hover:text-green-500'
            }`}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: pressedItem === item.id ? 0.95 : 1,
            backgroundColor: pressedItem === item.id ? 'rgba(34, 197, 94, 0.1)' : 'transparent'
          }}
          transition={{ duration: 0.1 }}
        >
          {item.icon && (
            <i className={`${item.icon} text-lg mb-1`} aria-hidden="true" />
          )}
          <span className="text-xs font-medium truncate w-full text-center">
            {item.label}
          </span>

          {/* Active indicator */}
          {activeId === item.id && (
            <m.div
              className="absolute bottom-0 left-1/2 w-1 h-1 bg-green-500 rounded-full"
              layoutId="activeIndicator"
              style={{ x: '-50%' }}
            />
          )}
        </m.button>
      ))}
    </div>
  );
}

// Hook para detectar si es dispositivo móvil
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}

// Componente para mejorar la experiencia táctil en formularios
interface TouchOptimizedInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export function TouchOptimizedInput({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false
}: TouchOptimizedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  return (
    <div className="relative">
      <m.div
        className={`relative border-2 rounded-lg transition-all duration-200 ${error ? 'border-red-500' :
            isFocused ? 'border-green-500' :
              'border-gray-300'
          }`}
        whileTap={{ scale: 0.995 }}
      >
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            setIsTouched(true);
          }}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-4 text-lg bg-transparent focus:outline-none ${value ? 'pt-6 pb-2' : 'py-4'
            }`}
        />

        {/* Floating label */}
        <m.label
          className={`absolute left-4 pointer-events-none transition-all duration-200 ${isFocused || value ? 'text-xs top-2 text-green-500' : 'text-lg top-4 text-gray-500'
            }`}
          animate={{
            fontSize: isFocused || value ? '0.75rem' : '1rem',
            y: isFocused || value ? -8 : 0,
          }}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </m.label>
      </m.div>

      {/* Error message */}
      <AnimatePresence>
        {error && isTouched && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-1 text-sm text-red-500 flex items-center"
          >
            <i className="fas fa-exclamation-triangle mr-1" />
            {error}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}