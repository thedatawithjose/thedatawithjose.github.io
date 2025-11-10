# Design Document - Cookie Consent System Fix

## Overview

Rediseñar el sistema de consentimiento de cookies para cumplir con GDPR/CCPA, implementando Google Consent Mode v2 y asegurando que Google Analytics solo se cargue después del consentimiento explícito del usuario. La solución unificará los sistemas de almacenamiento duplicados y proporcionará una experiencia de usuario coherente.

## Architecture

### Current Architecture (Problematic)

```
layout.tsx
  ├─ GoogleAnalytics (loads immediately in <head>)
  ├─ AnalyticsProvider (uses analytics_consent)
  └─ CookieConsent (uses cookie-consent)
```

**Problemas:**
- GA se carga sin verificar consentimiento
- Dos sistemas de storage desincronizados
- No implementa Consent Mode correctamente

### New Architecture (Solution)

```
layout.tsx
  └─ ConsentManager (unified consent system)
      ├─ Initializes Consent Mode (denied by default)
      ├─ Checks localStorage for existing consent
      ├─ Conditionally loads GA based on consent
      └─ Provides consent context to app
```

**Mejoras:**
- Un solo punto de control para consentimiento
- Consent Mode v2 implementado correctamente
- GA se carga condicionalmente
- Storage unificado

## Components and Interfaces

### 1. ConsentManager Component (New)

**Responsabilidad:** Gestionar todo el ciclo de vida del consentimiento de cookies.

```typescript
interface CookiePreferences {
  necessary: boolean;      // Always true
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

interface ConsentContextType {
  preferences: CookiePreferences | null;
  hasConsent: (type: 'analytics' | 'marketing') => boolean;
  updateConsent: (preferences: CookiePreferences) => void;
  showConsentBanner: () => void;
}
```

**Funcionalidad:**
1. Inicializa Google Consent Mode con valores denied
2. Lee preferencias de localStorage al montar
3. Carga GA dinámicamente si hay consentimiento
4. Proporciona contexto React para el resto de la app
5. Gestiona el banner de consentimiento

### 2. CookieConsentBanner Component (Refactored)

**Responsabilidad:** UI para capturar preferencias del usuario.

**Cambios:**
- Usar el ConsentContext en lugar de localStorage directo
- Llamar a `updateConsent()` del contexto
- Simplificar lógica de gtag (movida a ConsentManager)

### 3. CookieSettings Component (Refactored)

**Responsabilidad:** Botón en footer para reabrir configuración.

**Cambios:**
- Usar `showConsentBanner()` del ConsentContext
- Eliminar manipulación directa de localStorage

### 4. GoogleAnalytics Component (Refactored)

**Responsabilidad:** Cargar scripts de GA solo cuando hay consentimiento.

**Cambios:**
- Convertir en componente condicional
- Solo renderizar si `hasConsent('analytics')` es true
- Mantener la carga con `strategy="afterInteractive"`

### 5. Remove AnalyticsProvider

**Acción:** Eliminar componente duplicado y migrar funcionalidad a ConsentManager.

## Data Models

### LocalStorage Schema

**Key:** `cookie-preferences`

```json
{
  "necessary": true,
  "analytics": boolean,
  "marketing": boolean,
  "timestamp": "2024-11-09T10:30:00.000Z",
  "version": "1.0"
}
```

**Migración:** Si existe `analytics_consent` o `cookie-consent`, migrar a nuevo formato.

### Google Consent Mode Configuration

```javascript
// Initial state (before user choice)
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'wait_for_update': 500
});

// After user accepts
gtag('consent', 'update', {
  'analytics_storage': 'granted',
  'ad_storage': 'granted'
});
```

## Error Handling

### Scenarios

1. **localStorage no disponible (navegación privada)**
   - Fallback: Mostrar banner en cada visita
   - No persistir preferencias
   - Funcionalidad básica mantiene

2. **GA script falla al cargar**
   - Catch error silenciosamente
   - Log en consola (dev mode)
   - No bloquear la app

3. **Preferencias corruptas en localStorage**
   - Limpiar storage
   - Mostrar banner como primera visita
   - Log warning

### Implementation

```typescript
const loadGoogleAnalytics = () => {
  try {
    // Load GA script
  } catch (error) {
    console.error('[ConsentManager] Failed to load GA:', error);
    // Don't throw - fail gracefully
  }
};

const getStoredPreferences = (): CookiePreferences | null => {
  try {
    const stored = localStorage.getItem('cookie-preferences');
    if (!stored) return null;
    
    const parsed = JSON.parse(stored);
    // Validate structure
    if (!isValidPreferences(parsed)) {
      throw new Error('Invalid preferences structure');
    }
    
    return parsed;
  } catch (error) {
    console.warn('[ConsentManager] Invalid stored preferences:', error);
    localStorage.removeItem('cookie-preferences');
    return null;
  }
};
```

## Testing Strategy

### Unit Tests

1. **ConsentManager**
   - ✓ Initializes with denied consent mode
   - ✓ Reads stored preferences correctly
   - ✓ Handles corrupted localStorage data
   - ✓ Updates consent and triggers GA load
   - ✓ Migrates old storage formats

2. **CookieConsentBanner**
   - ✓ Renders with correct initial state
   - ✓ Toggles preferences correctly
   - ✓ Calls updateConsent with correct data
   - ✓ Closes after user choice

### Integration Tests

1. **First Visit Flow**
   - User visits → Banner shows → No GA loaded
   - User accepts → Banner closes → GA loads
   - User refreshes → No banner → GA loads

2. **Preference Change Flow**
   - User has accepted → GA running
   - User opens settings → Disables analytics
   - GA stops tracking → Consent mode updated

3. **Migration Flow**
   - Old `analytics_consent` exists
   - New system reads and migrates
   - Old key removed

### E2E Tests (Playwright)

```typescript
test('Cookie consent blocks GA until accepted', async ({ page }) => {
  // Intercept GA requests
  const gaRequests = [];
  page.on('request', req => {
    if (req.url().includes('google-analytics')) {
      gaRequests.push(req);
    }
  });
  
  await page.goto('/');
  
  // Should not load GA initially
  expect(gaRequests.length).toBe(0);
  
  // Accept cookies
  await page.click('text=Accept All');
  
  // Wait for GA to load
  await page.waitForTimeout(1000);
  
  // Should have loaded GA
  expect(gaRequests.length).toBeGreaterThan(0);
});
```

## Implementation Plan

### Phase 1: Create ConsentManager
1. Create new ConsentManager component with context
2. Implement Consent Mode initialization
3. Implement localStorage read/write
4. Implement GA dynamic loading

### Phase 2: Refactor Existing Components
1. Update CookieConsentBanner to use ConsentContext
2. Update CookieSettings to use ConsentContext
3. Update GoogleAnalytics to be conditional
4. Remove AnalyticsProvider

### Phase 3: Update Layout
1. Replace AnalyticsProvider with ConsentManager
2. Move GoogleAnalytics inside ConsentManager
3. Remove direct GA loading from head

### Phase 4: Migration & Cleanup
1. Add migration logic for old storage keys
2. Test migration with existing users
3. Remove old storage keys after migration
4. Update documentation

## Security Considerations

1. **XSS Protection**
   - Sanitize any user input (though none expected)
   - Use React's built-in XSS protection
   - Don't use dangerouslySetInnerHTML for user data

2. **localStorage Security**
   - Only store boolean preferences (no sensitive data)
   - Validate data structure on read
   - Clear corrupted data immediately

3. **Third-party Scripts**
   - Load GA from official Google CDN only
   - Use SRI (Subresource Integrity) if possible
   - Implement CSP headers for script sources

## Performance Considerations

1. **Initial Load**
   - Consent Mode initialization: ~5ms
   - localStorage read: ~1ms
   - No GA load until consent: Saves ~50KB initial bundle

2. **After Consent**
   - GA script load: ~50KB (async)
   - No blocking of main thread
   - Uses `afterInteractive` strategy

3. **Banner Animation**
   - Use Framer Motion (already loaded)
   - GPU-accelerated transforms
   - No layout shift (fixed positioning)

## Compliance

### GDPR Requirements
- ✓ No tracking before consent
- ✓ Clear opt-in mechanism
- ✓ Easy to withdraw consent
- ✓ Granular control (analytics vs marketing)
- ✓ Privacy policy linked

### CCPA Requirements
- ✓ Clear disclosure of data collection
- ✓ Opt-out mechanism available
- ✓ No sale of personal information

### Google Consent Mode v2
- ✓ Implements all required consent types
- ✓ Default denied state
- ✓ Update mechanism on user choice
- ✓ Compatible with GA4
