# Implementation Plan - SIMPLIFIED (Personal Website)

## Overview

Versión pragmática y realista para un sitio web personal. Enfocada en cambios de contenido y mejoras simples, sin sobre-ingeniería.

**Timeline realista:** 1-2 semanas de trabajo part-time

---

## Phase 1: Clarificar Disponibilidad (CRÍTICO)

- [ ] 1. Agregar banner de disponibilidad en homepage
  - Editar `app/page.tsx` directamente
  - Agregar sección simple arriba del hero con:
    - "Currently: Seeking full-time Data Engineering roles"
    - "Also available: Select consulting projects (10-15 hrs/week)"
    - "Location: Miami, FL | Remote-friendly"
    - "Availability: Immediate start"
  - Usar el mismo estilo de los banners existentes (gradient blue)
  - _Requirements: 1.1, 3.1, 6.1_

- [ ] 2. Agregar misma info en About page
  - Editar `app/about/page.tsx`
  - Copiar el mismo banner o agregar card en hero section
  - Mantener consistencia visual
  - _Requirements: 1.2, 6.1_

- [ ] 3. Actualizar disclaimer en Services page
  - Editar el disclaimer existente en `app/services/page.tsx`
  - Clarificar: "Primary focus: Full-time roles | Secondary: Consulting"
  - Agregar: "Consulting availability: 10-15 hours/week"
  - _Requirements: 3.1, 3.2, 3.3_

---

## Phase 2: Separar Experiencia Profesional vs Personal (IMPORTANTE)

- [ ] 4. Reorganizar About page con dos secciones claras
  - Editar `app/about/page.tsx`
  - Crear sección "Professional Experience" con:
    - TheTraderDaddy (Contract, 2023-Present)
    - Quantitative Trading (Self-employed, 2019-2023)
    - Construction PM (2015-2019)
  - Crear sección "Personal Projects" con:
    - SEC Parser (Personal project)
    - Trading Bot (Side project)
  - Usar el mismo diseño de cards/timeline que ya existe
  - _Requirements: 2.1, 2.2, 2.3_

- [ ] 5. Agregar badges "Professional" vs "Personal" en Portfolio
  - Editar portfolio page
  - Agregar badge visual en cada proyecto
  - Verde para profesional, gris para personal
  - _Requirements: 2.3_

---

## Phase 3: Agregar Información Faltante (RÁPIDO)

- [ ] 6. Expandir About page con info de equipo y skills
  - Agregar sección simple "Technical Skills" con:
    - Expert: Python, SQL, PostgreSQL
    - Advanced: AWS, Kafka, Docker, Snowflake
    - Intermediate: Kubernetes, Spark
  - Agregar sección "Team Experience":
    - "Worked in teams of 3-10 engineers"
    - "Agile/Scrum methodology"
    - "Code reviews and pair programming"
  - Usar listas simples con checkmarks, no componentes complejos
  - _Requirements: 5.1, 5.2_

---

## Phase 4: Mejorar Services Page (VALOR PARA CLIENTES)

- [ ] 7. Agregar "How We Work" timeline simple
  - Editar `app/services/page.tsx`
  - Agregar dentro de cada paquete una sección colapsable:
    - Week 1: Discovery
    - Weeks 2-8: Development
    - Week 9: Delivery
  - Usar accordion simple (ya tienes el patrón en el sitio)
  - _Requirements: 4.1, 4.2_

- [ ] 8. Agregar "Ideal Client" section
  - Agregar antes de pricing:
    - Company size: 10-500 employees
    - Budget: $5K-50K
    - Industries: Fintech, SaaS, E-commerce
  - Agregar 3 ejemplos de proyectos comunes con timeline y budget
  - Diseño simple, no componente complejo
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 9. Agregar FAQ section
  - Agregar después de pricing
  - 6-8 preguntas en accordion:
    - "What if scope changes?"
    - "Do you work with our team?"
    - "What about maintenance?"
    - "Can you work in our timezone?"
  - Usar el mismo accordion que ya tienes en el sitio
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

---

## Phase 5: Mejorar Testimonials (OPCIONAL PERO RÁPIDO)

- [ ] 10. Reorganizar testimonials por categoría
  - Editar testimonials existentes
  - Agregar tabs simples: "Real-time Pipelines" | "Analytics" | "ML Systems"
  - Agregar a cada testimonial:
    - Challenge (1 línea)
    - Solution (1 línea)
    - Result (métricas)
  - No crear componente nuevo, usar tabs existentes del sitio
  - _Requirements: 10.1, 10.2, 10.3_

---

## Phase 6: SEO Básico (RÁPIDO)

- [ ] 11. Actualizar meta tags
  - Actualizar `metadata` en cada page:
    - Homepage: agregar "Miami, FL", "open to full-time"
    - About: agregar "Data Engineer | Miami | Available"
    - Services: agregar "consulting" y "full-time"
  - 5 minutos por página
  - _Requirements: 1.1, 6.1_

---

## Phase 7: Testing Manual (SIN AUTOMATIZACIÓN)

- [ ] 12. Probar manualmente en diferentes dispositivos
  - Abrir en Chrome, Firefox, Safari
  - Probar en mobile (Chrome DevTools)
  - Verificar que todo se ve bien
  - Verificar que links funcionan
  - NO escribir tests automatizados (overkill para sitio personal)
  - _Requirements: All_

- [ ] 13. Pedir feedback a 2-3 personas
  - Enviar a un recruiter amigo
  - Enviar a un manager conocido
  - Enviar a un cliente potencial
  - Hacer ajustes basados en feedback
  - _Requirements: All_

---

## Phase 8: Deploy

- [ ] 14. Deploy a producción
  - Push a GitHub
  - Vercel/Netlify auto-deploy
  - Verificar que todo funciona
  - _Requirements: All_

---

## Resumen

**Total: 14 tareas simples** (vs 46 tareas sobre-ingenierizadas)

**Timeline realista:**
- Phase 1-3: 3-4 días (lo crítico)
- Phase 4-5: 2-3 días (mejoras de valor)
- Phase 6-8: 1 día (polish y deploy)

**Total: 1-2 semanas part-time** (vs 6-8 semanas full-time)

**Lo que NO vamos a hacer** (porque es overkill):
- ❌ Crear 9 componentes nuevos con TypeScript interfaces
- ❌ Zod validation schemas
- ❌ Error boundaries para todo
- ❌ Unit tests automatizados
- ❌ Integration tests
- ❌ Visual regression tests
- ❌ Playwright/Chromatic setup
- ❌ Config files separados para todo
- ❌ Code splitting avanzado

**Lo que SÍ vamos a hacer** (pragmático):
- ✅ Editar páginas existentes directamente
- ✅ Agregar contenido nuevo en secciones simples
- ✅ Usar componentes y estilos que ya existen
- ✅ Testing manual básico
- ✅ Deploy y iterar basado en feedback real

**Filosofía:** 
- Sitio personal = Editar contenido, no crear framework
- 80% del valor en 20% del esfuerzo
- Ship fast, iterate based on real feedback
- No sobre-ingeniería
