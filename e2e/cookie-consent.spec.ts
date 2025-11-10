import { test, expect } from '@playwright/test';

test.describe('Cookie Consent System', () => {
  test.beforeEach(async ({ context }) => {
    // Clear all cookies and localStorage before each test
    await context.clearCookies();
    await context.addInitScript(() => {
      localStorage.clear();
    });
  });

  test('first visit: banner shows and no GA loaded', async ({ page }) => {
    // Track network requests
    const gaRequests: string[] = [];
    page.on('request', req => {
      const url = req.url();
      if (url.includes('google-analytics') || url.includes('googletagmanager')) {
        gaRequests.push(url);
      }
    });

    await page.goto('/');

    // Wait for banner to appear
    await expect(page.locator('text=Cookie Preferences')).toBeVisible({ timeout: 3000 });

    // Should not have loaded GA yet
    expect(gaRequests.length).toBe(0);

    // Check console for consent mode initialization
    const logs: string[] = [];
    page.on('console', msg => {
      if (msg.text().includes('ConsentManager')) {
        logs.push(msg.text());
      }
    });

    // Should see consent mode initialized with denied
    await page.waitForTimeout(500);
    const hasConsentInit = logs.some(log => 
      log.includes('Consent Mode initialized with denied defaults')
    );
    expect(hasConsentInit).toBeTruthy();
  });

  test('accept all: banner closes, GA loads, preferences saved', async ({ page }) => {
    const gaRequests: string[] = [];
    page.on('request', req => {
      const url = req.url();
      if (url.includes('google-analytics') || url.includes('googletagmanager')) {
        gaRequests.push(url);
      }
    });

    await page.goto('/');

    // Wait for banner
    await expect(page.locator('text=Cookie Preferences')).toBeVisible({ timeout: 3000 });

    // Click Accept All
    await page.click('text=Accept All');

    // Banner should close
    await expect(page.locator('text=Cookie Preferences')).not.toBeVisible({ timeout: 2000 });

    // GA should start loading
    await page.waitForTimeout(1000);
    expect(gaRequests.length).toBeGreaterThan(0);

    // Check localStorage
    const preferences = await page.evaluate(() => {
      const stored = localStorage.getItem('cookie-preferences');
      return stored ? JSON.parse(stored) : null;
    });

    expect(preferences).not.toBeNull();
    expect(preferences.analytics).toBe(true);
    expect(preferences.marketing).toBe(true);
    expect(preferences.necessary).toBe(true);
  });

  test('reject all: banner closes, no GA loaded, preferences saved', async ({ page }) => {
    const gaRequests: string[] = [];
    page.on('request', req => {
      const url = req.url();
      if (url.includes('google-analytics') || url.includes('googletagmanager')) {
        gaRequests.push(url);
      }
    });

    await page.goto('/');

    // Wait for banner
    await expect(page.locator('text=Cookie Preferences')).toBeVisible({ timeout: 3000 });

    // Click Reject All
    await page.click('text=Reject All');

    // Banner should close
    await expect(page.locator('text=Cookie Preferences')).not.toBeVisible({ timeout: 2000 });

    // Wait a bit to ensure GA doesn't load
    await page.waitForTimeout(2000);
    expect(gaRequests.length).toBe(0);

    // Check localStorage
    const preferences = await page.evaluate(() => {
      const stored = localStorage.getItem('cookie-preferences');
      return stored ? JSON.parse(stored) : null;
    });

    expect(preferences).not.toBeNull();
    expect(preferences.analytics).toBe(false);
    expect(preferences.marketing).toBe(false);
    expect(preferences.necessary).toBe(true);
  });

  test('custom preferences: toggles work and saved correctly', async ({ page }) => {
    await page.goto('/');

    // Wait for banner
    await expect(page.locator('text=Cookie Preferences')).toBeVisible({ timeout: 3000 });

    // Find and click analytics toggle
    const analyticsToggle = page.locator('button[aria-label*="analytics"]').first();
    await analyticsToggle.click();

    // Click Save Preferences
    await page.click('text=Save Preferences');

    // Banner should close
    await expect(page.locator('text=Cookie Preferences')).not.toBeVisible({ timeout: 2000 });

    // Check localStorage
    const preferences = await page.evaluate(() => {
      const stored = localStorage.getItem('cookie-preferences');
      return stored ? JSON.parse(stored) : null;
    });

    expect(preferences).not.toBeNull();
    expect(preferences.analytics).toBe(true);
    expect(preferences.marketing).toBe(false);
  });

  test('return visit: no banner shown if previously accepted', async ({ page, context }) => {
    // Set preferences in localStorage before visiting
    await context.addInitScript(() => {
      const prefs = {
        necessary: true,
        analytics: true,
        marketing: false,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };
      localStorage.setItem('cookie-preferences', JSON.stringify(prefs));
    });

    const gaRequests: string[] = [];
    page.on('request', req => {
      const url = req.url();
      if (url.includes('google-analytics') || url.includes('googletagmanager')) {
        gaRequests.push(url);
      }
    });

    await page.goto('/');

    // Wait a bit to ensure banner doesn't appear
    await page.waitForTimeout(2000);

    // Banner should NOT be visible
    await expect(page.locator('text=Cookie Preferences')).not.toBeVisible();

    // GA should load automatically
    await page.waitForTimeout(1000);
    expect(gaRequests.length).toBeGreaterThan(0);
  });

  test('return visit: no banner and no GA if previously rejected', async ({ page, context }) => {
    // Set preferences in localStorage before visiting
    await context.addInitScript(() => {
      const prefs = {
        necessary: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };
      localStorage.setItem('cookie-preferences', JSON.stringify(prefs));
    });

    const gaRequests: string[] = [];
    page.on('request', req => {
      const url = req.url();
      if (url.includes('google-analytics') || url.includes('googletagmanager')) {
        gaRequests.push(url);
      }
    });

    await page.goto('/');

    // Wait a bit
    await page.waitForTimeout(2000);

    // Banner should NOT be visible
    await expect(page.locator('text=Cookie Preferences')).not.toBeVisible();

    // GA should NOT load
    expect(gaRequests.length).toBe(0);
  });

  test('cookie settings: can reopen modal and change preferences', async ({ page, context }) => {
    // Set initial preferences
    await context.addInitScript(() => {
      const prefs = {
        necessary: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };
      localStorage.setItem('cookie-preferences', JSON.stringify(prefs));
    });

    await page.goto('/');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Click Cookie Settings button in footer
    await page.click('text=Cookie Settings');

    // Banner should appear
    await expect(page.locator('text=Cookie Preferences')).toBeVisible({ timeout: 2000 });

    // Accept all this time
    await page.click('text=Accept All');

    // Check updated preferences
    const preferences = await page.evaluate(() => {
      const stored = localStorage.getItem('cookie-preferences');
      return stored ? JSON.parse(stored) : null;
    });

    expect(preferences).not.toBeNull();
    expect(preferences.analytics).toBe(true);
    expect(preferences.marketing).toBe(true);
  });

  test('migration: old analytics_consent key is migrated', async ({ page, context }) => {
    // Set old format
    await context.addInitScript(() => {
      localStorage.setItem('analytics_consent', 'true');
    });

    await page.goto('/');

    // Wait for migration
    await page.waitForTimeout(1000);

    // Check new format exists
    const preferences = await page.evaluate(() => {
      const stored = localStorage.getItem('cookie-preferences');
      return stored ? JSON.parse(stored) : null;
    });

    expect(preferences).not.toBeNull();
    expect(preferences.analytics).toBe(true);
    expect(preferences.version).toBe('1.0');

    // Old key should be removed
    const oldKey = await page.evaluate(() => {
      return localStorage.getItem('analytics_consent');
    });

    expect(oldKey).toBeNull();
  });

  test('migration: old cookie-consent key is migrated', async ({ page, context }) => {
    // Set old format
    await context.addInitScript(() => {
      const oldPrefs = {
        necessary: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('cookie-consent', JSON.stringify(oldPrefs));
    });

    await page.goto('/');

    // Wait for migration
    await page.waitForTimeout(1000);

    // Check new format exists
    const preferences = await page.evaluate(() => {
      const stored = localStorage.getItem('cookie-preferences');
      return stored ? JSON.parse(stored) : null;
    });

    expect(preferences).not.toBeNull();
    expect(preferences.analytics).toBe(true);
    expect(preferences.marketing).toBe(true);
    expect(preferences.version).toBe('1.0');

    // Old key should be removed
    const oldKey = await page.evaluate(() => {
      return localStorage.getItem('cookie-consent');
    });

    expect(oldKey).toBeNull();
  });
});
