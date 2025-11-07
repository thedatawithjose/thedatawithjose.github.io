# Performance Testing Guide

## 📊 Overview

Este documento explica cómo ejecutar y entender los tests de performance de tu sitio web.

## 🚀 Ejecutar Tests de Performance

### Opción 1: Test Completo (Recomendado)
```bash
npm run test:performance
```

Este comando ejecuta todos los tests de performance en todas las páginas del sitio.

### Opción 2: Test con Navegador Visible
```bash
npm run test:performance:headed
```

Útil para ver qué está pasando durante los tests.

### Opción 3: Generar Reporte HTML
```bash
npm run test:performance:report
```

Genera un reporte HTML detallado que puedes abrir en tu navegador.

## 📋 Qué Mide el Test

### 1. **Core Web Vitals** (Métricas de Google)
- **FCP (First Contentful Paint)**: Tiempo hasta que aparece el primer contenido
  - ✅ Good: < 1.8s
  - ⚠️ Needs Improvement: 1.8s - 3s
  - ❌ Poor: > 3s

- **LCP (Largest Contentful Paint)**: Tiempo hasta que carga el elemento más grande
  - ✅ Good: < 2.5s
  - ⚠️ Needs Improvement: 2.5s - 4s
  - ❌ Poor: > 4s

- **CLS (Cumulative Layout Shift)**: Estabilidad visual (cuánto se mueve el contenido)
  - ✅ Good: < 0.1
  - ⚠️ Needs Improvement: 0.1 - 0.25
  - ❌ Poor: > 0.25

- **TTFB (Time to First Byte)**: Tiempo de respuesta del servidor
  - ✅ Good: < 800ms
  - ⚠️ Needs Improvement: 800ms - 1.8s
  - ❌ Poor: > 1.8s

### 2. **Resource Loading Performance**
- Analiza todos los recursos (JS, CSS, imágenes, fonts)
- Identifica recursos lentos (> 1s)
- Verifica que no haya errores 404 o 500

### 3. **Images Optimization**
- Verifica que las imágenes tengan lazy loading
- Comprueba que todas tengan atributo `alt` (accesibilidad)
- Detecta imágenes oversized (más grandes de lo necesario)

### 4. **JavaScript Bundle Size**
- Mide el tamaño total de JavaScript
- Identifica los archivos JS más grandes
- ✅ Target: < 500KB total

### 5. **CSS Performance**
- Mide el tamaño total de CSS
- ✅ Target: < 100KB total

### 6. **Overall Site Performance**
- Promedio de tiempo de carga de todas las páginas
- Identifica la página más lenta

## 📈 Interpretar Resultados

### Ejemplo de Output:

```
📊 Home Page Performance:
⏱️  Total Load Time: 1234ms
🎨 First Contentful Paint (FCP): 456ms
🖼️  Largest Contentful Paint (LCP): 1123ms
📐 Cumulative Layout Shift (CLS): 0.045
⚡ Time to First Byte (TTFB): 234ms

📦 Home - Resource Analysis:
  document: 1 files, avg 234ms
  script: 12 files, avg 145ms
  stylesheet: 3 files, avg 89ms
  image: 8 files, avg 234ms
  font: 2 files, avg 123ms

🖼️  Home - Images Analysis:
  Total images: 8
  Lazy loaded: 7/8
  ✅ All images have alt text

📜 Home - JavaScript Analysis:
  Total JS files: 12
  Total JS size: 234.56 KB
  Largest scripts:
    - main-abc123.js: 89.23 KB
    - framework-xyz789.js: 67.45 KB

🎨 Home - CSS Analysis:
  Total CSS files: 3
  Total CSS size: 45.67 KB
```

## 🎯 Objetivos de Performance

| Métrica | Target | Tu Sitio |
|---------|--------|----------|
| Total Load Time | < 3s | ✅ |
| FCP | < 1.8s | ✅ |
| LCP | < 2.5s | ✅ |
| CLS | < 0.1 | ✅ |
| TTFB | < 800ms | ✅ |
| Total JS | < 500KB | ✅ |
| Total CSS | < 100KB | ✅ |

## 🔧 Cómo Mejorar Performance

### Si FCP/LCP es lento:
1. Optimiza imágenes (usa WebP, comprime)
2. Implementa lazy loading
3. Reduce JavaScript inicial
4. Usa CDN para assets estáticos

### Si CLS es alto:
1. Define width/height en imágenes
2. Reserva espacio para ads/embeds
3. Evita insertar contenido dinámico arriba del fold
4. Usa font-display: swap para fonts

### Si TTFB es lento:
1. Optimiza servidor/hosting
2. Usa CDN
3. Implementa caching
4. Reduce queries de base de datos

### Si JS Bundle es grande:
1. Code splitting
2. Tree shaking
3. Lazy load componentes
4. Elimina dependencias no usadas

## 🌐 Herramientas Adicionales

### Google PageSpeed Insights
```
https://pagespeed.web.dev/
```
Analiza tu sitio en producción con datos reales de usuarios.

### WebPageTest
```
https://www.webpagetest.org/
```
Tests detallados desde diferentes ubicaciones y dispositivos.

### Lighthouse (Chrome DevTools)
1. Abre Chrome DevTools (F12)
2. Ve a la pestaña "Lighthouse"
3. Click en "Analyze page load"

## 📝 Notas

- Los tests se ejecutan en un ambiente controlado
- Los resultados pueden variar según tu conexión
- Para resultados más precisos, ejecuta múltiples veces
- Los tests en producción pueden ser diferentes (CDN, caching, etc.)

## 🤝 Contribuir

Si encuentras formas de mejorar estos tests, por favor actualiza este documento.
