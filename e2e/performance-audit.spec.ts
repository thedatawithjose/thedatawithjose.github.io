import { test, expect } from '@playwright/test';

test.describe('Performance Audit - Complete Site', () => {
  // Configuración de timeouts más largos para performance testing
  test.setTimeout(120000);

  const pages = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Services', url: '/services' },
    { name: 'Portfolio', url: '/portfolio' },
    { name: 'Blog', url: '/blog' },
    { name: 'Contact', url: '/contact' },
  ];

  // Test de Core Web Vitals para cada página
  pages.forEach(({ name, url }) => {
    test(`${name} - Core Web Vitals`, async ({ page }) => {
      const startTime = Date.now();
      
      // Navegar a la página
      await page.goto(url, { waitUntil: 'networkidle' });
      
      const loadTime = Date.now() - startTime;
      console.log(`\n📊 ${name} Page Performance:`);
      console.log(`⏱️  Total Load Time: ${loadTime}ms`);

      // Medir Web Vitals usando Performance API
      const webVitals = await page.evaluate(() => {
        return new Promise((resolve) => {
          const vitals: any = {
            FCP: 0,
            LCP: 0,
            CLS: 0,
            FID: 0,
            TTFB: 0,
          };

          // First Contentful Paint (FCP)
          const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
          if (fcpEntry) {
            vitals.FCP = fcpEntry.startTime;
          }

          // Largest Contentful Paint (LCP)
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            vitals.LCP = lastEntry.renderTime || lastEntry.loadTime;
          });
          observer.observe({ entryTypes: ['largest-contentful-paint'] });

          // Time to First Byte (TTFB)
          const navigationEntry = performance.getEntriesByType('navigation')[0] as any;
          if (navigationEntry) {
            vitals.TTFB = navigationEntry.responseStart - navigationEntry.requestStart;
          }

          // Cumulative Layout Shift (CLS)
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as any[]) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            }
            vitals.CLS = clsValue;
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });

          // Esperar un poco para que se capturen las métricas
          setTimeout(() => {
            observer.disconnect();
            clsObserver.disconnect();
            resolve(vitals);
          }, 3000);
        });
      });

      console.log(`🎨 First Contentful Paint (FCP): ${Math.round(webVitals.FCP)}ms`);
      console.log(`🖼️  Largest Contentful Paint (LCP): ${Math.round(webVitals.LCP)}ms`);
      console.log(`📐 Cumulative Layout Shift (CLS): ${webVitals.CLS.toFixed(3)}`);
      console.log(`⚡ Time to First Byte (TTFB): ${Math.round(webVitals.TTFB)}ms`);

      // Assertions basadas en los estándares de Google
      expect(loadTime).toBeLessThan(3000); // Carga total < 3s
      expect(webVitals.FCP).toBeLessThan(1800); // FCP < 1.8s (Good)
      expect(webVitals.LCP).toBeLessThan(2500); // LCP < 2.5s (Good)
      expect(webVitals.CLS).toBeLessThan(0.1); // CLS < 0.1 (Good)
      expect(webVitals.TTFB).toBeLessThan(800); // TTFB < 800ms (Good)
    });

    test(`${name} - Resource Loading Performance`, async ({ page }) => {
      const resources: any[] = [];

      // Capturar todas las requests
      page.on('response', (response) => {
        const request = response.request();
        const timing = response.timing();
        
        resources.push({
          url: request.url(),
          type: request.resourceType(),
          status: response.status(),
          size: response.headers()['content-length'] || 0,
          duration: timing ? timing.responseEnd : 0,
        });
      });

      await page.goto(url, { waitUntil: 'networkidle' });

      // Esperar a que todos los recursos carguen
      await page.waitForTimeout(2000);

      console.log(`\n📦 ${name} - Resource Analysis:`);

      // Analizar por tipo de recurso
      const resourcesByType = resources.reduce((acc: any, resource) => {
        if (!acc[resource.type]) {
          acc[resource.type] = [];
        }
        acc[resource.type].push(resource);
        return acc;
      }, {});

      Object.keys(resourcesByType).forEach((type) => {
        const items = resourcesByType[type];
        const avgDuration = items.reduce((sum: number, item: any) => sum + item.duration, 0) / items.length;
        console.log(`  ${type}: ${items.length} files, avg ${Math.round(avgDuration)}ms`);
      });

      // Identificar recursos lentos (> 1s)
      const slowResources = resources.filter((r) => r.duration > 1000);
      if (slowResources.length > 0) {
        console.log(`\n⚠️  Slow Resources (>1s):`);
        slowResources.forEach((r) => {
          console.log(`  - ${r.type}: ${r.url.substring(0, 80)}... (${Math.round(r.duration)}ms)`);
        });
      }

      // Assertions
      expect(slowResources.length).toBeLessThan(3); // Máximo 2 recursos lentos
      expect(resources.filter(r => r.status >= 400).length).toBe(0); // Sin errores
    });

    test(`${name} - Images Optimization`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'networkidle' });

      const images = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.map((img) => ({
          src: img.src,
          width: img.naturalWidth,
          height: img.naturalHeight,
          displayWidth: img.width,
          displayHeight: img.height,
          loading: img.loading,
          alt: img.alt,
        }));
      });

      console.log(`\n🖼️  ${name} - Images Analysis:`);
      console.log(`  Total images: ${images.length}`);

      // Verificar lazy loading
      const lazyImages = images.filter((img) => img.loading === 'lazy');
      console.log(`  Lazy loaded: ${lazyImages.length}/${images.length}`);

      // Verificar imágenes sin alt
      const noAltImages = images.filter((img) => !img.alt);
      if (noAltImages.length > 0) {
        console.log(`  ⚠️  Images without alt: ${noAltImages.length}`);
      }

      // Verificar imágenes oversized (más grandes que su display)
      const oversizedImages = images.filter((img) => {
        const widthRatio = img.width / img.displayWidth;
        const heightRatio = img.height / img.displayHeight;
        return widthRatio > 2 || heightRatio > 2;
      });

      if (oversizedImages.length > 0) {
        console.log(`  ⚠️  Oversized images: ${oversizedImages.length}`);
      }

      // Assertions
      expect(noAltImages.length).toBe(0); // Todas las imágenes deben tener alt
      expect(oversizedImages.length).toBeLessThan(2); // Máximo 1 imagen oversized
    });

    test(`${name} - JavaScript Bundle Size`, async ({ page }) => {
      const scripts: any[] = [];

      page.on('response', async (response) => {
        const request = response.request();
        if (request.resourceType() === 'script') {
          const contentLength = response.headers()['content-length'];
          scripts.push({
            url: request.url(),
            size: contentLength ? parseInt(contentLength) : 0,
          });
        }
      });

      await page.goto(url, { waitUntil: 'networkidle' });

      const totalJSSize = scripts.reduce((sum, script) => sum + script.size, 0);
      const totalJSSizeKB = (totalJSSize / 1024).toFixed(2);

      console.log(`\n📜 ${name} - JavaScript Analysis:`);
      console.log(`  Total JS files: ${scripts.length}`);
      console.log(`  Total JS size: ${totalJSSizeKB} KB`);

      // Listar los scripts más grandes
      const largeScripts = scripts
        .filter((s) => s.size > 50000)
        .sort((a, b) => b.size - a.size)
        .slice(0, 5);

      if (largeScripts.length > 0) {
        console.log(`  Largest scripts:`);
        largeScripts.forEach((script) => {
          const sizeKB = (script.size / 1024).toFixed(2);
          const filename = script.url.split('/').pop()?.substring(0, 50);
          console.log(`    - ${filename}: ${sizeKB} KB`);
        });
      }

      // Assertions
      expect(totalJSSize).toBeLessThan(1024 * 500); // Total JS < 500KB
    });

    test(`${name} - CSS Performance`, async ({ page }) => {
      const stylesheets: any[] = [];

      page.on('response', async (response) => {
        const request = response.request();
        if (request.resourceType() === 'stylesheet') {
          const contentLength = response.headers()['content-length'];
          stylesheets.push({
            url: request.url(),
            size: contentLength ? parseInt(contentLength) : 0,
          });
        }
      });

      await page.goto(url, { waitUntil: 'networkidle' });

      const totalCSSSize = stylesheets.reduce((sum, css) => sum + css.size, 0);
      const totalCSSSizeKB = (totalCSSSize / 1024).toFixed(2);

      console.log(`\n🎨 ${name} - CSS Analysis:`);
      console.log(`  Total CSS files: ${stylesheets.length}`);
      console.log(`  Total CSS size: ${totalCSSSizeKB} KB`);

      // Assertions
      expect(totalCSSSize).toBeLessThan(1024 * 100); // Total CSS < 100KB
    });
  });

  // Test de performance general del sitio
  test('Overall Site Performance Summary', async ({ page }) => {
    console.log(`\n\n🎯 OVERALL SITE PERFORMANCE SUMMARY\n`);
    console.log(`Testing ${pages.length} pages...\n`);

    const results: any[] = [];

    for (const { name, url } of pages) {
      const startTime = Date.now();
      await page.goto(url, { waitUntil: 'networkidle' });
      const loadTime = Date.now() - startTime;

      results.push({ name, url, loadTime });
      console.log(`✅ ${name.padEnd(15)} - ${loadTime}ms`);
    }

    const avgLoadTime = results.reduce((sum, r) => sum + r.loadTime, 0) / results.length;
    const slowestPage = results.reduce((prev, current) => 
      (prev.loadTime > current.loadTime) ? prev : current
    );

    console.log(`\n📊 Statistics:`);
    console.log(`  Average load time: ${Math.round(avgLoadTime)}ms`);
    console.log(`  Slowest page: ${slowestPage.name} (${slowestPage.loadTime}ms)`);

    // Assertions
    expect(avgLoadTime).toBeLessThan(2500); // Promedio < 2.5s
    expect(slowestPage.loadTime).toBeLessThan(4000); // Página más lenta < 4s
  });
});
