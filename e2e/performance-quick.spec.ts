import { test, expect } from '@playwright/test';

test.describe('Quick Performance Check', () => {
  test.setTimeout(30000); // 30 segundos por test

  const pages = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Services', url: '/services' },
    { name: 'Portfolio', url: '/portfolio' },
    { name: 'Blog', url: '/blog' },
    { name: 'Contact', url: '/contact' },
  ];

  test('Complete Site Performance Summary', async ({ page }) => {
    console.log(`\n🎯 PERFORMANCE SUMMARY - All Pages\n`);
    console.log(`${'Page'.padEnd(15)} | ${'Load Time'.padEnd(12)} | ${'Status'}`);
    console.log(`${'-'.repeat(50)}`);

    const results: any[] = [];

    for (const { name, url } of pages) {
      const startTime = Date.now();
      
      try {
        await page.goto(url, { 
          waitUntil: 'domcontentloaded',
          timeout: 10000 
        });
        
        const loadTime = Date.now() - startTime;
        
        // Obtener métricas básicas
        const metrics = await page.evaluate(() => {
          const nav = performance.getEntriesByType('navigation')[0] as any;
          return {
            ttfb: nav ? Math.round(nav.responseStart - nav.requestStart) : 0,
            domLoad: nav ? Math.round(nav.domContentLoadedEventEnd - nav.fetchStart) : 0,
          };
        });

        const status = loadTime < 3000 ? '✅ Good' : loadTime < 5000 ? '⚠️  OK' : '❌ Slow';
        
        results.push({ 
          name, 
          url, 
          loadTime,
          ttfb: metrics.ttfb,
          status 
        });

        console.log(`${name.padEnd(15)} | ${(loadTime + 'ms').padEnd(12)} | ${status}`);
        
      } catch (error) {
        console.log(`${name.padEnd(15)} | ${'ERROR'.padEnd(12)} | ❌ Failed`);
        results.push({ name, url, loadTime: 0, ttfb: 0, status: '❌ Error' });
      }
    }

    // Estadísticas
    const successfulResults = results.filter(r => r.loadTime > 0);
    const avgLoadTime = successfulResults.reduce((sum, r) => sum + r.loadTime, 0) / successfulResults.length;
    const avgTTFB = successfulResults.reduce((sum, r) => sum + r.ttfb, 0) / successfulResults.length;
    const slowPages = results.filter(r => r.loadTime > 3000);

    console.log(`\n📊 Statistics:`);
    console.log(`  Average Load Time: ${Math.round(avgLoadTime)}ms`);
    console.log(`  Average TTFB: ${Math.round(avgTTFB)}ms`);
    console.log(`  Pages > 3s: ${slowPages.length}/${results.length}`);
    
    if (slowPages.length > 0) {
      console.log(`\n⚠️  Slow Pages:`);
      slowPages.forEach(p => {
        console.log(`    - ${p.name}: ${p.loadTime}ms`);
      });
    }

    // Assertions
    expect(avgLoadTime).toBeLessThan(4000); // Promedio < 4s
    expect(slowPages.length).toBeLessThan(3); // Máximo 2 páginas lentas
  });

  test('Resource Analysis', async ({ page }) => {
    console.log(`\n📦 RESOURCE ANALYSIS\n`);

    const resources: any[] = [];

    page.on('response', (response) => {
      const request = response.request();
      resources.push({
        url: request.url(),
        type: request.resourceType(),
        status: response.status(),
      });
    });

    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(2000); // Esperar recursos adicionales

    // Analizar por tipo
    const byType = resources.reduce((acc: any, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    }, {});

    console.log(`Resource Count by Type:`);
    Object.entries(byType).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });

    // Verificar errores
    const errors = resources.filter(r => r.status >= 400);
    if (errors.length > 0) {
      console.log(`\n❌ Failed Resources:`);
      errors.forEach(e => {
        console.log(`  ${e.status} - ${e.url.substring(0, 80)}`);
      });
    } else {
      console.log(`\n✅ No failed resources`);
    }

    // Assertions
    expect(errors.length).toBe(0);
    expect(resources.length).toBeLessThan(100); // No más de 100 recursos
  });

  test('Images Check', async ({ page }) => {
    console.log(`\n🖼️  IMAGE OPTIMIZATION CHECK\n`);

    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 10000 });

    const imageStats = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return {
        total: imgs.length,
        withAlt: imgs.filter(img => img.alt).length,
        withLazyLoading: imgs.filter(img => img.loading === 'lazy').length,
      };
    });

    console.log(`Total Images: ${imageStats.total}`);
    console.log(`With Alt Text: ${imageStats.withAlt}/${imageStats.total}`);
    console.log(`Lazy Loaded: ${imageStats.withLazyLoading}/${imageStats.total}`);

    const altPercentage = (imageStats.withAlt / imageStats.total) * 100;
    const lazyPercentage = (imageStats.withLazyLoading / imageStats.total) * 100;

    if (altPercentage === 100) {
      console.log(`✅ All images have alt text`);
    } else {
      console.log(`⚠️  ${imageStats.total - imageStats.withAlt} images missing alt text`);
    }

    if (lazyPercentage > 70) {
      console.log(`✅ Good lazy loading coverage (${Math.round(lazyPercentage)}%)`);
    } else {
      console.log(`⚠️  Consider more lazy loading (${Math.round(lazyPercentage)}%)`);
    }

    // Assertions
    expect(imageStats.withAlt).toBe(imageStats.total); // Todas con alt
  });

  test('Bundle Size Estimate', async ({ page }) => {
    console.log(`\n📦 BUNDLE SIZE ESTIMATE\n`);

    const scripts: any[] = [];
    const stylesheets: any[] = [];

    page.on('response', async (response) => {
      const request = response.request();
      const contentLength = response.headers()['content-length'];
      const size = contentLength ? parseInt(contentLength) : 0;

      if (request.resourceType() === 'script') {
        scripts.push({ url: request.url(), size });
      } else if (request.resourceType() === 'stylesheet') {
        stylesheets.push({ url: request.url(), size });
      }
    });

    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(2000);

    const totalJS = scripts.reduce((sum, s) => sum + s.size, 0);
    const totalCSS = stylesheets.reduce((sum, s) => sum + s.size, 0);

    console.log(`JavaScript:`);
    console.log(`  Files: ${scripts.length}`);
    console.log(`  Total Size: ${(totalJS / 1024).toFixed(2)} KB`);

    console.log(`\nCSS:`);
    console.log(`  Files: ${stylesheets.length}`);
    console.log(`  Total Size: ${(totalCSS / 1024).toFixed(2)} KB`);

    console.log(`\nTotal Assets: ${((totalJS + totalCSS) / 1024).toFixed(2)} KB`);

    // Assertions
    expect(totalJS).toBeLessThan(1024 * 600); // JS < 600KB
    expect(totalCSS).toBeLessThan(1024 * 150); // CSS < 150KB
  });
});
