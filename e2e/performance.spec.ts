import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('should meet Core Web Vitals thresholds', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    
    // Measure Core Web Vitals
    const webVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals: any = {};
        
        // Measure LCP
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          vitals.lcp = lastEntry.startTime;
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Measure CLS
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          vitals.cls = clsValue;
        }).observe({ entryTypes: ['layout-shift'] });
        
        // Measure FCP
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const firstEntry = entries[0];
          vitals.fcp = firstEntry.startTime;
        }).observe({ entryTypes: ['paint'] });
        
        // Return results after a short delay
        setTimeout(() => {
          resolve(vitals);
        }, 3000);
      });
    });
    
    // Validate Core Web Vitals thresholds
    if (webVitals.lcp) {
      expect(webVitals.lcp).toBeLessThan(2500); // LCP should be < 2.5s
    }
    
    if (webVitals.cls !== undefined) {
      expect(webVitals.cls).toBeLessThan(0.1); // CLS should be < 0.1
    }
    
    if (webVitals.fcp) {
      expect(webVitals.fcp).toBeLessThan(1800); // FCP should be < 1.8s
    }
  });

  test('should load critical resources quickly', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    
    // Wait for critical content to be visible
    await expect(page.getByRole('heading', { name: /building/i })).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should have optimized images', async ({ page }) => {
    await page.goto('/');
    
    // Check that images use Next.js Image component (should have specific attributes)
    const images = await page.locator('img').all();
    
    for (const img of images) {
      // Images should have alt attributes
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
      
      // Images should have width and height for layout stability
      const width = await img.getAttribute('width');
      const height = await img.getAttribute('height');
      
      if (width && height) {
        expect(parseInt(width)).toBeGreaterThan(0);
        expect(parseInt(height)).toBeGreaterThan(0);
      }
    }
  });

  test('should not have layout shifts', async ({ page }) => {
    await page.goto('/');
    
    // Measure layout shifts
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0;
        
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
        }).observe({ entryTypes: ['layout-shift'] });
        
        // Wait and return CLS value
        setTimeout(() => {
          resolve(clsValue);
        }, 5000);
      });
    });
    
    // CLS should be minimal
    expect(cls).toBeLessThan(0.1);
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1920, height: 1080, name: 'Desktop' },
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      
      // Check that main content is visible
      await expect(page.getByRole('heading', { name: /building/i })).toBeVisible();
      
      // Check that navigation is accessible
      if (viewport.width < 768) {
        // Mobile: hamburger menu should be visible
        await expect(page.getByRole('button', { name: /toggle menu/i })).toBeVisible();
      } else {
        // Desktop/Tablet: navigation links should be visible
        await expect(page.getByRole('link', { name: /about me/i })).toBeVisible();
      }
    }
  });
});