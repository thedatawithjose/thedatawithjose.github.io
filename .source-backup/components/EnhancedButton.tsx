'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef, MouseEvent } from 'react';

interface EnhancedButtonProps {
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
  iconPosition?: 'left' | 'right';
  haptic?: boolean;
}

export default function EnhancedButton({
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
  iconPosition = 'left',
  haptic = true,
}: EnhancedButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  
  // Motion values for advanced interactions
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  
  // Spring animations for smooth interactions
  const springConfig = { stiffness: 300, damping: 30 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Handle mouse move for 3D effect
  const handleMouseMove = (event: MouseEvent) => {
    if (!ref.current || disabled) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((event.clientX - centerX) / 5);
    y.set((event.clientY - centerY) / 5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Haptic feedback
  const triggerHaptic = () => {
    if (haptic && navigator.vibrate && !disabled) {
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

  // Animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
    },
    tap: { 
      scale: 0.98,
    }
  };

  // Ripple effect
  const createRipple = (event: MouseEvent) => {
    if (!ref.current || disabled) return;
    
    const button = ref.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  // Content with icon
  const renderContent = () => (
    <span className="relative z-10 flex items-center justify-center">
      {loading ? (
        <>
          <motion.div
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          Loading...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <i className={`${icon} mr-2`} aria-hidden="true"></i>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <i className={`${icon} ml-2`} aria-hidden="true"></i>
          )}
        </>
      )}
    </span>
  );

  // CSS for ripple animation
  const rippleStyles = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;

  if (href) {
    return (
      <>
        <style>{rippleStyles}</style>
        <motion.a
          ref={ref as any}
          href={href}
          className={buttonClasses}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseDown={createRipple}
          onClick={handleClick}
        >
          {renderContent()}
        </motion.a>
      </>
    );
  }

  return (
    <>
      <style>{rippleStyles}</style>
      <motion.button
        ref={ref as any}
        type={type}
        className={buttonClasses}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={createRipple}
        onClick={handleClick}
        disabled={disabled || loading}
      >
        {renderContent()}
      </motion.button>
    </>
  );
}

// Specialized button variants
export const PrimaryButton = (props: Omit<EnhancedButtonProps, 'variant'>) => (
  <EnhancedButton {...props} variant="primary" />
);

export const SecondaryButton = (props: Omit<EnhancedButtonProps, 'variant'>) => (
  <EnhancedButton {...props} variant="secondary" />
);

export const GhostButton = (props: Omit<EnhancedButtonProps, 'variant'>) => (
  <EnhancedButton {...props} variant="ghost" />
);

export const DangerButton = (props: Omit<EnhancedButtonProps, 'variant'>) => (
  <EnhancedButton {...props} variant="danger" />
);