'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      id,
      duration: 5000,
      ...toast,
    };

    setToasts(prev => [...prev, newToast]);

    // Auto remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Haptic feedback for mobile
  const triggerHaptic = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  useEffect(() => {
    if (toasts.length > 0) {
      triggerHaptic();
    }
  }, [toasts.length]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast, index) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            index={index}
            onRemove={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  index: number;
  onRemove: () => void;
}

function ToastItem({ toast, index, onRemove }: ToastItemProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - (100 / (toast.duration! / 100));
          if (newProgress <= 0) {
            clearInterval(interval);
            return 0;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [toast.duration]);

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-green-50 border-green-200',
          icon: 'fas fa-check-circle text-green-500',
          progress: 'bg-green-500'
        };
      case 'error':
        return {
          bg: 'bg-red-50 border-red-200',
          icon: 'fas fa-exclamation-circle text-red-500',
          progress: 'bg-red-500'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          icon: 'fas fa-exclamation-triangle text-yellow-500',
          progress: 'bg-yellow-500'
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-50 border-blue-200',
          icon: 'fas fa-info-circle text-blue-500',
          progress: 'bg-blue-500'
        };
    }
  };

  const styles = getToastStyles();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        scale: 1,
        y: index * -8 // Slight stacking effect
      }}
      exit={{ 
        opacity: 0, 
        x: 300, 
        scale: 0.8,
        transition: { duration: 0.2 }
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
      className={`relative overflow-hidden rounded-lg border shadow-lg backdrop-blur-sm ${styles.bg}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Progress bar */}
      {toast.duration && toast.duration > 0 && (
        <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full">
          <motion.div
            className={`h-full ${styles.progress}`}
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <i className={`${styles.icon} text-xl`} aria-hidden="true"></i>
          </div>
          
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-semibold text-gray-900">
              {toast.title}
            </h3>
            {toast.message && (
              <p className="mt-1 text-sm text-gray-600">
                {toast.message}
              </p>
            )}
            
            {toast.action && (
              <div className="mt-3">
                <button
                  onClick={toast.action.onClick}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  {toast.action.label}
                </button>
              </div>
            )}
          </div>

          <div className="ml-4 flex-shrink-0">
            <button
              onClick={onRemove}
              className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-full p-1 transition-colors"
              aria-label="Close notification"
            >
              <i className="fas fa-times text-sm" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Convenience hooks for different toast types
export const useSuccessToast = () => {
  const { showToast } = useToast();
  return (title: string, message?: string) => 
    showToast({ type: 'success', title, message });
};

export const useErrorToast = () => {
  const { showToast } = useToast();
  return (title: string, message?: string) => 
    showToast({ type: 'error', title, message });
};

export const useInfoToast = () => {
  const { showToast } = useToast();
  return (title: string, message?: string) => 
    showToast({ type: 'info', title, message });
};

export const useWarningToast = () => {
  const { showToast } = useToast();
  return (title: string, message?: string) => 
    showToast({ type: 'warning', title, message });
};