'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface ToastProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  isVisible: boolean;
  onClose: () => void;
  autoHideDelay?: number;
}

const toastConfig = {
  success: {
    icon: 'fas fa-check-circle',
    bgColor: 'bg-green-500',
    borderColor: 'border-green-600',
    textColor: 'text-white'
  },
  error: {
    icon: 'fas fa-exclamation-circle',
    bgColor: 'bg-red-500',
    borderColor: 'border-red-600',
    textColor: 'text-white'
  },
  warning: {
    icon: 'fas fa-exclamation-triangle',
    bgColor: 'bg-yellow-500',
    borderColor: 'border-yellow-600',
    textColor: 'text-white'
  },
  info: {
    icon: 'fas fa-info-circle',
    bgColor: 'bg-blue-500',
    borderColor: 'border-blue-600',
    textColor: 'text-white'
  }
};

export default function Toast({ 
  type, 
  message, 
  isVisible, 
  onClose, 
  autoHideDelay = 5000 
}: ToastProps) {
  const config = toastConfig[type];

  useEffect(() => {
    if (isVisible && autoHideDelay > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHideDelay, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-4 right-4 z-50 max-w-sm w-full"
        >
          <div
            className={`${config.bgColor} ${config.borderColor} ${config.textColor} 
              border-l-4 p-4 rounded-lg shadow-lg backdrop-blur-sm`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <i className={`${config.icon} text-lg`}></i>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium leading-5">
                  {message}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={onClose}
                  className="inline-flex text-white hover:text-gray-200 focus:outline-none focus:text-gray-200 transition-colors duration-200"
                  aria-label="Cerrar notificación"
                >
                  <i className="fas fa-times text-sm"></i>
                </button>
              </div>
            </div>
            
            {/* Progress bar para mostrar tiempo restante */}
            {autoHideDelay > 0 && (
              <m.div
                className="mt-2 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: autoHideDelay / 1000, ease: 'linear' }}
              />
            )}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

// Provider de contexto para manejar múltiples toasts
import { createContext, useContext, useState, ReactNode } from 'react';

interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  autoHideDelay?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
  showSuccess: (message: string, autoHideDelay?: number) => void;
  showError: (message: string, autoHideDelay?: number) => void;
  showInfo: (message: string, autoHideDelay?: number) => void;
  showWarning: (message: string, autoHideDelay?: number) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

  const showToast = (toast: Omit<ToastItem, 'id'>) => {
    const id = generateId();
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);
  };

  const showSuccess = (message: string, autoHideDelay = 5000) => {
    showToast({ type: 'success', message, autoHideDelay });
  };

  const showError = (message: string, autoHideDelay = 5000) => {
    showToast({ type: 'error', message, autoHideDelay });
  };

  const showInfo = (message: string, autoHideDelay = 5000) => {
    showToast({ type: 'info', message, autoHideDelay });
  };

  const showWarning = (message: string, autoHideDelay = 5000) => {
    showToast({ type: 'warning', message, autoHideDelay });
  };

  const hideToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{
      showToast,
      showSuccess,
      showError,
      showInfo,
      showWarning,
      hideToast
    }}>
      {children}
      
      {/* Renderizar todos los toasts */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
        {toasts.map((toast, index) => (
          <m.div
            key={toast.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Toast
              type={toast.type}
              message={toast.message}
              isVisible={true}
              onClose={() => hideToast(toast.id)}
              autoHideDelay={toast.autoHideDelay}
            />
          </m.div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}