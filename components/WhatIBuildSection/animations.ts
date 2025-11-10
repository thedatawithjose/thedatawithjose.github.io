import { Variants } from 'framer-motion';

// Detect if user prefers reduced motion
export const prefersReducedMotion = 
  typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

// Hero card hover animation
export const heroCardHover = {
  scale: prefersReducedMotion ? 1 : 1.02,
  y: prefersReducedMotion ? 0 : -12,
  rotateY: prefersReducedMotion ? 0 : 1,
  transition: { 
    duration: prefersReducedMotion ? 0 : 0.4, 
    ease: 'easeOut' 
  }
};

// Supporting card hover animation
export const supportingCardHover = {
  scale: prefersReducedMotion ? 1 : 1.03,
  y: prefersReducedMotion ? 0 : -8,
  transition: { 
    duration: prefersReducedMotion ? 0 : 0.3, 
    ease: 'easeOut' 
  }
};

// Card entrance animation variants
export const cardEntranceVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: prefersReducedMotion ? 0 : 40, 
    scale: prefersReducedMotion ? 1 : 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: prefersReducedMotion ? 0 : 0.7, 
      ease: 'easeOut' 
    }
  }
};

// Hero card entrance animation
export const heroEntranceVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: prefersReducedMotion ? 0 : 40, 
    scale: prefersReducedMotion ? 1 : 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: prefersReducedMotion ? 0 : 0.7, 
      ease: 'easeOut',
      delay: 0.1
    }
  }
};

// Supporting card entrance with stagger
export const supportingEntranceVariants = (index: number): Variants => ({
  hidden: { 
    opacity: 0, 
    y: prefersReducedMotion ? 0 : 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: prefersReducedMotion ? 0 : 0.6, 
      delay: prefersReducedMotion ? 0 : (0.2 + index * 0.15),
      ease: 'easeOut' 
    }
  }
});

// Section header animation
export const headerVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: prefersReducedMotion ? 0 : 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: prefersReducedMotion ? 0 : 0.6,
      ease: 'easeOut'
    }
  }
};

// Gradient overlay animation on hover
export const gradientOverlayVariants: Variants = {
  initial: { opacity: 0 },
  hover: { 
    opacity: 1,
    transition: { 
      duration: prefersReducedMotion ? 0 : 0.5 
    }
  }
};
