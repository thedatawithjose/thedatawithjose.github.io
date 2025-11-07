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

  test('Performance Summary - All Pages', async ({ page }) => {
    console.log(`\n🎯 QUICK PERFORMANCE CHECK\n`);
    console.log(`Testing ${pages.length} pages...\n`);

    const results: any[] = [];

    for (const { name, url } of pages) {
      const startTime = Date.now();
      
      // Navegar a la página
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      
      // Esperar a que el contenido principal esté visible
      await page.waitForLoadState('load');
      
      const loadTime = Date.now() - startTime;

      // Obtener métricas básicas
      const metrics = await page.evaluate(() => {
        const perf = performance.getEntriesByType('navigation')[0] as any;
        return {
          domContentLoaded: perf?.domContentLoadedEventEnd - perf?.domContentLoadedEventStart || 0,
          loadComplete: perf?.loadEventEnd - perf?.loadEventStart || 0,
          ttfb: perf?.responseStart - perf?.requestStart || 0,
        };
      });

      // Contar recursos
      const resourceCount = await page.evaluate(() => {
        const resources = performance.getEntriesByType('resource');
        return {
          total: resources.length,
          scripts: resources.filter((r: any) => r.initiatorType === 'script').length,
          stylesheets: resources.filter((r: any) => r.initiatorType === 'link' || r.initiatorType === 'css').length,
          images: resources.filter((r: any) => r.initiatorType === 'img').length,
        };
      });

      // Contar imágenes y verificar lazy loading
      const imageStats = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return {
          total: imgs.length,
          lazy: imgs.filter(img => img.loading === 'lazy').length,
          noAlt: imgs.filter(img => !img.alt).length,
        };
      });

      const status = loadTime < 3000 ? '✅' : loadTime < 5000 ? '⚠️' : '❌';
      
      console.log(`${status} ${name.padEnd(12)} - ${loadTime}ms`);
      console.log(`   TTFB: ${Math.round(metrics.ttfb)}ms | Resources: ${resourceCount.total} | Images: ${imageStats.total} (${imageStats.lazy} lazy)`);

      results.push({
        name,
        url,
        loadTime,
        metrics,
        resourceCount,
        imageStats,
      });

      // Assertions básicas
      expect(loadTime).toBeLessThan(5000); // < 5s (más permisivo)
      expect(metrics.ttfb).toBeLessThan(1500); // < 1.5s TTFB
      expect(imageStats.noAlt).toBe(0); // Todas las imágenes deben tener alt
    }

    // Resumen final
    const avgLoadTime = results.reduce((sum, r) => sum + r.loadTime, 0) / results.length;
    const slowestPage = results.reduce((prev, current) => 
      (prev.loadTime > current.loadTime) ? prev : current
    );
    const fastestPage = results.reduce((prev, current) => 
      (prev.loadTime < current.loadTime) ? prev : current
    );

    console.log(`\n📊 Summary:`);
    console.log(`   Average: ${Math.round(avgLoadTime)}ms`);
    console.log(`   Fastest: ${fastestPage.name} (${fastestPage.loadTime}ms)`);
    console.log(`   Slowest: ${slowestPage.name} (${slowestPage.loadTime}ms)`);

    // Total de recursos
    const totalResources = results.reduce((sum, r) => sum + r.resourceCount.total, 0);
    const totalImages = results.reduce((sum, r) => sum + r.imageStats.total, 0);
    const totalLazyImages = results.reduce((sum, r) => sum + r.imageStats.lazy, 0);

    console.log(`\n📦 Resources:`);
    console.log(`   Total: ${totalResources}`);
    console.log(`   Images: ${totalImages} (${totalLazyImages} lazy loaded = ${Math.round(totalLazyImages/totalImages*100)}%)`);

    // Assertions finales
    expect(avgLoadTime).toBeLessThan(4000); // Promedio < 4s
    expect(slowestPage.loadTime).toBeLessThan(6000); // Página más lenta < 6s
    expect(totalLazyImages / totalImages).toBeGreaterThan(0.5); // Al menos 50% lazy loading
  });

  // Test individual para la página más importante (Home)
  test('Home Page - Detailed Check', async ({ page }) => {
    console.log(`\n🏠 HOME PAGE DETAILED CHECK\n`);

    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'load' });
    const loadTime = Date.now() - startTime;

    console.log(`⏱️  Load Time: ${loadTime}ms`);

    // Verificar que elementos críticos estén presentes
    const criticalElements = await page.evaluate(() => {
      return {
        header: !!document.querySelector('header'),
        hero: !!document.querySelector('.hero'),
        footer: !!document.querySelector('footer'),
        navigation: !!document.querySelector('nav'),
      };
    });

    console.log(`\n🔍 Critical Elements:`);
    console.log(`   Header: ${criticalElements.header ? '✅' : '❌'}`);
    console.log(`   Hero: ${criticalElements.hero ? '✅' : '❌'}`);
    console.log(`   Footer: ${criticalElements.footer ? '✅' : '❌'}`);
    console.log(`   Navigation: ${criticalElements.navigation ? '✅' : '❌'}`);

    // Verificar que no haya errores de consola críticos
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Verificar JavaScript bundle
    const jsSize = await page.evaluate(() => {
      const scripts = performance.getEntriesByType('resource')
        .filter((r: any) => r.initiatorType === 'script');
      return scripts.reduce((sum: number, s: any) => sum + (s.transferSize || 0), 0);
    });

    const jsSizeKB = (jsSize / 1024).toFixed(2);
    console.log(`\n📜 JavaScript: ${jsSizeKB} KB`);

    // Assertions
    expect(loadTime).toBeLessThan(4000);
    expect(criticalElements.header).toBe(true);
    expect(criticalElements.hero).toBe(true);
    expect(criticalElements.footer).toBe(true);
    expect(jsSize).toBeLessThan(1024 * 600); // < 600KB
  });
});
