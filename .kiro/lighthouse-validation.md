# Lighthouse Validation Guide

## Cómo Ejecutar Lighthouse Audit

### Opción 1: Chrome DevTools (Recomendado)

1. **Abrir el sitio en Chrome**
   ```
   http://localhost:3000
   ```

2. **Abrir DevTools**
   - Windows/Linux: `F12` o `Ctrl + Shift + I`
   - Mac: `Cmd + Option + I`

3. **Ir a la pestaña Lighthouse**
   - Si no la ves, haz clic en `>>` y selecciona "Lighthouse"

4. **Configurar el audit**
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
   - Device: Desktop y Mobile (ejecutar ambos)

5. **Ejecutar**
   - Click en "Analyze page load"
   - Esperar 30-60 segundos

### Opción 2: Lighthouse CLI

```bash
# Instalar Lighthouse globalmente
npm install -g lighthouse

# Ejecutar audit
lighthouse http://localhost:3000 --view --output html --output-path ./lighthouse-report.html

# Con opciones específicas
lighthouse http://localhost:3000 \
  --only-categories=performance,accessibility,seo \
  --view \
  --output html \
  --output-path ./lighthouse-report.html
```

### Opción 3: PageSpeed Insights (Producción)

1. Ir a https://pagespeed.web.dev/
2. Ingresar: `https://datawithjose.tech`
3. Analizar

---

## Métricas Objetivo

### Performance
- **First Contentful Paint (FCP):** < 1.8s ✅
- **Largest Contentful Paint (LCP):** < 2.5s ✅
- **Total Blocking Time (TBT):** < 200ms ✅
- **Cumulative Layout Shift (CLS):** < 0.1 ✅
- **Speed Index:** < 3.4s ✅
- **Score Total:** > 90 🎯

### Accessibility
- **Contraste de colores:** WCAG AA (4.5:1) ✅
- **ARIA attributes:** Válidos ✅
- **Labels en formularios:** Presentes ✅
- **Alt text en imágenes:** Descriptivos ✅
- **Navegación por teclado:** Funcional ✅
- **Score Total:** > 95 🎯

### Best Practices
- **HTTPS:** Activo ✅
- **Console errors:** Ninguno ✅
- **Deprecated APIs:** Ninguno ✅
- **Score Total:** > 95 🎯

### SEO
- **Meta description:** Presente ✅
- **Title:** Optimizado ✅
- **Canonical:** Correcto ✅
- **Robots.txt:** Válido ✅
- **Sitemap:** Presente ✅
- **Score Total:** > 95 🎯

---

## Checklist de Validación

### ✅ Cambios Implementados a Validar

#### 1. Preloader Eliminado
**Validar:**
- [ ] FCP mejoró (debería ser < 1.8s)
- [ ] LCP mejoró (debería ser < 2.5s)
- [ ] No hay flash de contenido blanco
- [ ] La página carga suavemente

**Cómo validar:**
1. Abrir DevTools > Network
2. Throttle a "Fast 3G"
3. Recargar página
4. Verificar que el contenido aparece inmediatamente

#### 2. Responsive Móvil
**Validar:**
- [ ] No hay scroll horizontal en 320px
- [ ] Padding apropiado en todos los breakpoints
- [ ] Tarjetas se apilan correctamente
- [ ] Border radius se adapta

**Cómo validar:**
1. DevTools > Toggle device toolbar (Ctrl+Shift+M)
2. Probar en:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad Mini (768px)
   - iPad Pro (1024px)
3. Verificar que no hay overflow horizontal

#### 3. Contraste del Hero
**Validar:**
- [ ] Texto blanco sobre video tiene contraste > 4.5:1
- [ ] Lighthouse Accessibility no reporta errores de contraste
- [ ] Texto es legible en todos los slides

**Cómo validar:**
1. Lighthouse > Accessibility
2. Buscar "Background and foreground colors do not have a sufficient contrast ratio"
3. No debería haber errores en el hero

#### 4. CTAs Unificados
**Validar:**
- [ ] "Hire for Project" aparece en header
- [ ] "Apply for Full-Time" aparece en hero
- [ ] Links tienen query parameters correctos
- [ ] No hay confusión entre acciones

**Cómo validar:**
1. Inspeccionar elementos
2. Verificar href="/contact?type=consulting"
3. Probar clicks y verificar navegación

#### 5. Privacy Policy Link
**Validar:**
- [ ] Link aparece en formulario de contacto
- [ ] Link funciona y abre /privacy-policy
- [ ] Estilo es consistente (color teal, underline)
- [ ] Accesible por teclado

**Cómo validar:**
1. Ir a /contact
2. Scroll al formulario
3. Verificar link "View Privacy Policy"
4. Click y verificar que abre la página

---

## Problemas Comunes y Soluciones

### Performance

#### Problema: LCP > 2.5s
**Solución:**
- Preload hero image/video poster
- Optimize video compression
- Use lazy loading for below-fold content

#### Problema: CLS > 0.1
**Solución:**
- Add explicit width/height to images
- Reserve space for dynamic content
- Avoid inserting content above existing content

### Accessibility

#### Problema: Contraste insuficiente
**Solución:**
- Aumentar opacidad del overlay (ya hecho: bg-black/15)
- Usar text-shadow para mejorar legibilidad
- Cambiar color de texto a más oscuro

#### Problema: Missing form labels
**Solución:**
- Ya implementado: todos los inputs tienen labels
- Verificar que htmlFor coincide con id

### SEO

#### Problema: Missing meta description
**Solución:**
- Ya implementado en lib/seo.ts
- Verificar que se genera correctamente

#### Problema: Canonical duplicado
**Solución:**
- Ya verificado: NO existe en código actual
- Si aparece en HTML, revisar Next.js metadata API

---

## Resultados Esperados

### Antes de las Mejoras (Estimado)
- Performance: 75-80
- Accessibility: 85-90
- Best Practices: 90-95
- SEO: 90-95

### Después de las Mejoras (Objetivo)
- Performance: 90-95 ✅ (+15 puntos)
- Accessibility: 95-100 ✅ (+10 puntos)
- Best Practices: 95-100 ✅ (+5 puntos)
- SEO: 95-100 ✅ (+5 puntos)

---

## Comandos Útiles

### Ejecutar servidor de desarrollo
```bash
npm run dev
```

### Build de producción
```bash
npm run build
npm run start
```

### Lighthouse en producción
```bash
lighthouse https://datawithjose.tech --view
```

### Lighthouse con throttling
```bash
lighthouse http://localhost:3000 \
  --throttling-method=devtools \
  --throttling.cpuSlowdownMultiplier=4 \
  --view
```

---

## Próximos Pasos

1. ✅ Ejecutar Lighthouse en localhost
2. ✅ Verificar scores de Performance y Accessibility
3. ✅ Corregir cualquier issue reportado
4. ✅ Ejecutar Lighthouse en producción
5. ✅ Comparar resultados antes/después
6. ✅ Documentar mejoras en GitHub/Notion

---

## Recursos

- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [Web Vitals](https://web.dev/vitals/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
