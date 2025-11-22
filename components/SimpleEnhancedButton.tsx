'use client';

import { m } from 'framer-motion';
import { ReactNode, MouseEvent } from 'react';

interface SimpleEnhancedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
}

export default function SimpleEnhancedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  href,
  type = 'button',
  icon,
}: SimpleEnhancedButtonProps) {

  // Haptic feedback
  const triggerHaptic = () => {
    if (navigator.vibrate && !disabled) {
      navigator.vibrate(50);
    }
  };

  const handleClick = () => {
    triggerHaptic();
    if (onClick && !disabled && !loading) {
      onClick();
    }
  };

  // Variant styles
  const getVariantStyles = () => {
    const baseStyles = "relative overflow-hidden font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg";
    
    switch (variant) {
      case 'primary':
        return `${baseStyles} bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 focus:ring-green-500 shadow-lg hover:shadow-xl`;
      case 'secondary':
        return `${baseStyles} bg-white text-gray-700 border-2 border-gray-300 hover:border-green-500 hover:text-green-600 focus:ring-green-500 shadow-md hover:shadow-lg`;
      case 'ghost':
        return `${baseStyles} bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500`;
      case 'danger':
        return `${baseStyles} bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 focus:ring-red-500 shadow-lg hover:shadow-xl`;
      default:
        return baseStyles;
    }
  };

  // Size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      case 'md':
      default:
        return 'px-6 py-3 text-base';
    }
  };

  // Disabled styles
  const getDisabledStyles = () => {
    if (disabled || loading) {
      return 'opacity-50 cursor-not-allowed pointer-events-none';
    }
    return 'cursor-pointer';
  };

  const buttonClasses = `${getVariantStyles()} ${getSizeStyles()} ${getDisabledStyles()} ${className}`;

  // Content with icon
  const renderContent = () => (
    <span className="relative z-10 flex items-center justify-center">
      {loading ? (
        <>
          <m.div
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          Loading...
        </>
      ) : (
        <>
          {icon && (
            <i className={`${icon} mr-2`} aria-hidden="true"></i>
          )}
          {children}
        </>
      )}
    </span>
  );

  if (href) {
    return (
      <m.a
        href={href}
        className={buttonClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
      >
        {renderContent()}
      </m.a>
    );
  }

  return (
    <m.button
      type={type}
      className={buttonClasses}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {renderContent()}
    </m.button>
  );
}

// Specialized button variants
export const PrimaryButton = (props: Omit<SimpleEnhancedButtonProps, 'variant'>) => (
  <SimpleEnhancedButton {...props} variant="primary" />
);

export const SecondaryButton = (props: Omit<SimpleEnhancedButtonProps, 'variant'>) => (
  <SimpleEnhancedButton {...props} variant="secondary" />
);

export const GhostButton = (props: Omit<SimpleEnhancedButtonProps, 'variant'>) => (
  <SimpleEnhancedButton {...props} variant="ghost" />
);