import { render, screen, waitFor, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import ConsentManager, { useConsent } from '../ConsentManager';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock gtag
const gtagMock = vi.fn();
Object.defineProperty(window, 'gtag', {
  value: gtagMock,
  writable: true
});

Object.defineProperty(window, 'dataLayer', {
  value: [],
  writable: true
});

describe('ConsentManager', () => {
  beforeEach(() => {
    localStorageMock.clear();
    gtagMock.mockClear();
    window.dataLayer = [];
  });

  it('initializes Consent Mode with denied defaults', async () => {
    render(
      <ConsentManager>
        <div>Test</div>
      </ConsentManager>
    );

    await waitFor(() => {
      expect(gtagMock).toHaveBeenCalledWith('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'wait_for_update': 500
      });
    });
  });

  it('reads valid stored preferences correctly', async () => {
    const validPrefs = {
      necessary: true,
      analytics: true,
      marketing: false,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };

    localStorageMock.setItem('cookie-preferences', JSON.stringify(validPrefs));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ConsentManager>{children}</ConsentManager>
    );

    const { result } = renderHook(() => useConsent(), { wrapper });

    await waitFor(() => {
      expect(result.current.preferences).toEqual(validPrefs);
      expect(result.current.hasConsent('analytics')).toBe(true);
      expect(result.current.hasConsent('marketing')).toBe(false);
    });
  });

  it('handles corrupted localStorage data', async () => {
    localStorageMock.setItem('cookie-preferences', 'invalid-json');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ConsentManager>{children}</ConsentManager>
    );

    const { result } = renderHook(() => useConsent(), { wrapper });

    await waitFor(() => {
      expect(result.current.preferences).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });

    // Should have cleared the corrupted data
    expect(localStorageMock.getItem('cookie-preferences')).toBeNull();
  });

  it('migrates old analytics_consent key', async () => {
    localStorageMock.setItem('analytics_consent', 'true');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ConsentManager>{children}</ConsentManager>
    );

    const { result } = renderHook(() => useConsent(), { wrapper });

    await waitFor(() => {
      expect(result.current.preferences).not.toBeNull();
      expect(result.current.hasConsent('analytics')).toBe(true);
    });

    // Should have migrated to new format
    const stored = localStorageMock.getItem('cookie-preferences');
    expect(stored).not.toBeNull();
    
    const parsed = JSON.parse(stored!);
    expect(parsed.analytics).toBe(true);
    expect(parsed.version).toBe('1.0');

    // Should have removed old key
    expect(localStorageMock.getItem('analytics_consent')).toBeNull();
  });

  it('migrates old cookie-consent key', async () => {
    const oldConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };

    localStorageMock.setItem('cookie-consent', JSON.stringify(oldConsent));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ConsentManager>{children}</ConsentManager>
    );

    const { result } = renderHook(() => useConsent(), { wrapper });

    await waitFor(() => {
      expect(result.current.preferences).not.toBeNull();
      expect(result.current.hasConsent('analytics')).toBe(true);
      expect(result.current.hasConsent('marketing')).toBe(true);
    });

    // Should have migrated to new format
    const stored = localStorageMock.getItem('cookie-preferences');
    expect(stored).not.toBeNull();

    // Should have removed old key
    expect(localStorageMock.getItem('cookie-consent')).toBeNull();
  });

  it('updates consent and triggers consent mode update', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ConsentManager>{children}</ConsentManager>
    );

    const { result } = renderHook(() => useConsent(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.updateConsent({
        necessary: true,
        analytics: true,
        marketing: false
      });
    });

    await waitFor(() => {
      expect(result.current.preferences).not.toBeNull();
      expect(result.current.hasConsent('analytics')).toBe(true);
    });

    // Should have updated consent mode
    expect(gtagMock).toHaveBeenCalledWith('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied'
    });

    // Should have saved to localStorage
    const stored = localStorageMock.getItem('cookie-preferences');
    expect(stored).not.toBeNull();
    
    const parsed = JSON.parse(stored!);
    expect(parsed.analytics).toBe(true);
    expect(parsed.marketing).toBe(false);
  });

  it('handles localStorage failures gracefully', async () => {
    // Mock localStorage to throw error
    const originalSetItem = localStorageMock.setItem;
    localStorageMock.setItem = vi.fn(() => {
      throw new Error('Storage quota exceeded');
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ConsentManager>{children}</ConsentManager>
    );

    const { result } = renderHook(() => useConsent(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Should not throw when trying to update consent
    expect(() => {
      act(() => {
        result.current.updateConsent({
          necessary: true,
          analytics: true,
          marketing: false
        });
      });
    }).not.toThrow();

    // Restore original
    localStorageMock.setItem = originalSetItem;
  });

  it('shows and hides consent banner correctly', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ConsentManager>{children}</ConsentManager>
    );

    const { result } = renderHook(() => useConsent(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Initially should show banner (no stored preferences)
    await waitFor(() => {
      expect(result.current.shouldShowBanner).toBe(true);
    }, { timeout: 2000 });

    // Can manually show banner
    act(() => {
      result.current.showConsentBanner();
    });

    expect(result.current.shouldShowBanner).toBe(true);

    // Can manually hide banner
    act(() => {
      result.current.hideConsentBanner();
    });

    expect(result.current.shouldShowBanner).toBe(false);
  });
});
