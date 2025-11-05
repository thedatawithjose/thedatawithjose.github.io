import { describe, it, expect, vi, beforeEach } from 'vitest';
import { pageview, event, trackEngagement, trackFormInteraction, trackError } from '../analytics';

// Mock window.gtag
const mockGtag = vi.fn();

describe('Analytics Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup window.gtag mock
    Object.defineProperty(window, 'gtag', {
      value: mockGtag,
      writable: true,
    });
  });

  describe('pageview', () => {
    it('calls gtag with correct parameters', () => {
      const url = 'https://example.com/page';
      const title = 'Test Page';
      
      pageview(url, title);
      
      expect(mockGtag).toHaveBeenCalledWith('config', expect.any(String), {
        page_title: title,
        page_location: url,
      });
    });

    it('works without title', () => {
      const url = 'https://example.com/page';
      
      pageview(url);
      
      expect(mockGtag).toHaveBeenCalledWith('config', expect.any(String), {
        page_title: undefined,
        page_location: url,
      });
    });

    it('does not call gtag when window.gtag is not available', () => {
      (window as any).gtag = undefined;
      
      pageview('https://example.com/page');
      
      expect(mockGtag).not.toHaveBeenCalled();
    });
  });

  describe('event', () => {
    it('calls gtag with correct event parameters', () => {
      const eventData = {
        action: 'click',
        category: 'button',
        label: 'header-cta',
        value: 1,
        custom_parameters: { page: '/home' },
      };
      
      event(eventData);
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'click', {
        event_category: 'button',
        event_label: 'header-cta',
        value: 1,
        page: '/home',
      });
    });

    it('works with minimal parameters', () => {
      const eventData = {
        action: 'view',
        category: 'page',
      };
      
      event(eventData);
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'view', {
        event_category: 'page',
        event_label: undefined,
        value: undefined,
      });
    });
  });

  describe('trackEngagement', () => {
    it('tracks engagement events correctly', () => {
      trackEngagement('scroll_depth', { depth: 50 });
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'engagement', {
        event_category: 'User Interaction',
        event_label: 'scroll_depth',
        engagement_type: 'scroll_depth',
        timestamp: expect.any(Number),
        depth: 50,
      });
    });
  });

  describe('trackFormInteraction', () => {
    it('tracks form start events', () => {
      trackFormInteraction('contact-form', 'start');
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'form_start', {
        event_category: 'Form Interaction',
        event_label: 'contact-form',
        form_name: 'contact-form',
        form_action: 'start',
        timestamp: expect.any(Number),
      });
    });

    it('tracks form submit events with details', () => {
      trackFormInteraction('contact-form', 'submit', { success: true });
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'form_submit', {
        event_category: 'Form Interaction',
        event_label: 'contact-form',
        form_name: 'contact-form',
        form_action: 'submit',
        timestamp: expect.any(Number),
        success: true,
      });
    });

    it('tracks form abandon events', () => {
      trackFormInteraction('contact-form', 'abandon', { field: 'email' });
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'form_abandon', {
        event_category: 'Form Interaction',
        event_label: 'contact-form',
        form_name: 'contact-form',
        form_action: 'abandon',
        timestamp: expect.any(Number),
        field: 'email',
      });
    });
  });

  describe('trackError', () => {
    beforeEach(() => {
      // Mock window.location and navigator
      Object.defineProperty(window, 'location', {
        value: { pathname: '/test-page' },
        writable: true,
      });
      
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 Test Browser',
        writable: true,
      });
    });

    it('tracks error events with context', () => {
      trackError('JavaScript Error', 'Uncaught TypeError', { line: 42 });
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'error', {
        event_category: 'Error',
        event_label: 'JavaScript Error',
        error_type: 'JavaScript Error',
        error_message: 'Uncaught TypeError',
        page: '/test-page',
        user_agent: 'Mozilla/5.0 Test Browser',
        timestamp: expect.any(Number),
        line: 42,
      });
    });
  });

  describe('server-side behavior', () => {
    beforeEach(() => {
      // Simulate server-side environment
      (window as any).gtag = undefined;
    });

    it('does not throw errors when window is undefined', () => {
      expect(() => {
        pageview('https://example.com');
        event({ action: 'test', category: 'test' });
        trackEngagement('test');
        trackFormInteraction('test', 'start');
        trackError('test', 'test');
      }).not.toThrow();
    });
  });
});