'use client';

import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';

interface FloatingActionButtonProps {
  className?: string;
}

export default function FloatingActionButton({ className = '' }: FloatingActionButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show FAB after scrolling past hero section (approximately 100vh)
      if (window.pageYOffset > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const quickActions = [
    {
      icon: 'fas fa-envelope',
      label: 'Email',
      href: 'mailto:datawithjose@outlook.com',
      color: 'bg-[#00BFA5] hover:bg-[#00D4B4]'
    },
    {
      icon: 'fas fa-comments',
      label: 'Let\'s Talk',
      href: 'mailto:datawithjose@outlook.com?subject=Quantitative Development Project&body=Hi Jose, I\'d like to discuss...',
      color: 'bg-[#42A5F5] hover:bg-[#2196F3]'
    },
    {
      icon: 'fab fa-linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/datawithjose/',
      color: 'bg-[#005A9C] hover:bg-[#0066CC]'
    }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
          {/* Quick Actions Menu */}
          <AnimatePresence>
            {isExpanded && (
              <m.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="mb-4 space-y-3"
              >
                {quickActions.map((action, index) => (
                  <m.div
                    key={action.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={action.href}
                      target={action.href.startsWith('http') ? '_blank' : undefined}
                      rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`flex items-center ${action.color} text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group min-w-[140px]`}
                      onClick={() => setIsExpanded(false)}
                    >
                      <div className="w-8 h-8 flex items-center justify-center mr-3">
                        <i className={`${action.icon} text-sm`}></i>
                      </div>
                      <span className="font-medium text-sm">{action.label}</span>
                    </a>
                  </m.div>
                ))}
              </m.div>
            )}
          </AnimatePresence>

          {/* Main FAB Button */}
          <m.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-14 h-14 bg-gradient-to-r from-[#00BFA5] to-[#42A5F5] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            aria-label="Quick contact options"
          >
            <m.i
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className={`fas ${isExpanded ? 'fa-times' : 'fa-comments'} text-xl`}
            ></m.i>
          </m.button>

          {/* Tooltip for first-time users */}
          {!isExpanded && (
            <m.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
            >
              Quick Contact
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
            </m.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}