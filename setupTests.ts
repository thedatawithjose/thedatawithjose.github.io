import '@testing-library/jest-dom';
import React from 'react';

// Mock Next.js router
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: (props: any) => {
    const { src, alt, ...otherProps } = props;
    return React.createElement('img', { src, alt, ...otherProps });
  },
}));

// Mock motion elements without leaking animation props into the DOM.
vi.mock('framer-motion', () => {
  const components = new Map<string, React.ComponentType<any>>();
  const motion = new Proxy({}, { get: (_, tag: string) => {
    if (!components.has(tag)) {
      components.set(tag, React.forwardRef((props: any, ref: any) => {
        const { children, initial, animate, exit, transition, whileHover, whileTap, whileInView, viewport, variants, layout, layoutId, ...rest } = props;
        return React.createElement(tag, { ...rest, ref }, children);
      }));
    }
    return components.get(tag);
  }});
  return { m: motion, motion, AnimatePresence: ({children}: any) => children, LazyMotion: ({children}: any) => children, domAnimation: {} };
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock fetch
global.fetch = vi.fn();

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
};