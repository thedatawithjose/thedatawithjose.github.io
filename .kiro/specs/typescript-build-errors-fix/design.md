# Design Document

## Overview

Este documento describe el diseño de la solución para corregir los errores de compilación de TypeScript en `app/services/page.tsx`. El problema principal es que la propiedad `savings` solo existe en el paquete `complete`, pero el código intenta acceder a ella sin verificación de tipo, causando que TypeScript falle la compilación.

La solución implementará tipos explícitos con propiedades opcionales y usará verificaciones de tipo seguras en el código de renderizado.

## Architecture

### Problema Actual

El objeto `packages` contiene tres tipos de paquetes:
- `strategy`: No tiene propiedad `savings`
- `implementation`: No tiene propiedad `savings` pero tiene `addOns`
- `complete`: Tiene propiedad `savings` y `addOns`

TypeScript infiere un tipo de unión para estos objetos, pero cuando se accede a `pkg.savings` en la línea 540, el compilador detecta que esta propiedad no existe en todos los tipos de la unión.

### Solución Propuesta

1. **Definir una interfaz TypeScript explícita** que capture todas las propiedades posibles de un paquete
2. **Marcar propiedades opcionales** usando el modificador `?` para `savings` y `addOns`
3. **Usar verificaciones de tipo seguras** en el código de renderizado con el operador de encadenamiento opcional (`?.`)

## Components and Interfaces

### Interface: ServicePackage

```typescript
interface AddOn {
  name: string;
  price: string;
  description: string;
}

interface ServicePackage {
  name: string;
  price: string;
  duration: string;
  description: string;
  subtitle: string;
  features: string[];
  note: string;
  popular: boolean;
  guarantees: string[];
  paymentOptions: string[];
  notIncluded: string[];
  savings?: string;  // Opcional - solo en 'complete'
  addOns?: AddOn[];  // Opcional - en 'implementation' y 'complete'
}
```

### Type: PackagesCollection

```typescript
type PackagesCollection = {
  strategy: ServicePackage;
  implementation: ServicePackage;
  complete: ServicePackage;
};
```

## Data Models

### Packages Object

El objeto `packages` será tipado explícitamente:

```typescript
const packages: PackagesCollection = {
  strategy: {
    // ... propiedades existentes
    // NO incluye savings ni addOns
  },
  implementation: {
    // ... propiedades existentes
    addOns: [...]  // Incluye addOns
    // NO incluye savings
  },
  complete: {
    // ... propiedades existentes
    savings: 'Best Value',  // Incluye savings
    addOns: [...]  // Incluye addOns
  }
};
```

## Error Handling

### Acceso Seguro a Propiedades Opcionales

**Ubicación del Error (Línea 540):**
```typescript
// ❌ ANTES (causa error)
pkg.popular || pkg.savings ? 'pt-16' : 'pt-8'

// ✅ DESPUÉS (tipo seguro)
pkg.popular || pkg.savings ? 'pt-16' : 'pt-8'
// TypeScript ahora sabe que savings es opcional
```

**Ubicación del Renderizado Condicional (Línea 638):**
```typescript
// ✅ Ya está correcto - usa verificación condicional
{pkg.savings && (
  <div className="...">
    <span>⭐ {pkg.savings}</span>
  </div>
)}
```

### Verificación de addOns

Si hay código que accede a `addOns`, también debe usar verificación condicional:

```typescript
// ✅ Acceso seguro
{pkg.addOns && pkg.addOns.length > 0 && (
  <div>
    {pkg.addOns.map(addon => ...)}
  </div>
)}
```

## Testing Strategy

### 1. Verificación de Compilación TypeScript

```bash
npm run build
```

**Criterio de Éxito:** El comando debe completarse sin errores de TypeScript.

### 2. Verificación de Diagnósticos

Usar la herramienta `getDiagnostics` para verificar que no hay errores en el archivo:

```typescript
getDiagnostics({ paths: ['app/services/page.tsx'] })
```

**Criterio de Éxito:** Cero errores reportados.

### 3. Verificación Visual

Después de la corrección, verificar que:
- El paquete "Complete Data Solution" muestra el badge "⭐ Best Value"
- Los paquetes "Strategy" e "Implementation" NO muestran el badge
- Los add-ons se renderizan correctamente donde corresponde

## Implementation Notes

### Cambios Mínimos Requeridos

1. **Agregar definiciones de tipos** al inicio del archivo (después de los imports)
2. **Tipar el objeto packages** con el tipo `PackagesCollection`
3. **Verificar que todas las referencias a propiedades opcionales** usen verificación condicional

### Ubicaciones de Código

- **Línea ~15-20**: Agregar interfaces `AddOn` y `ServicePackage`
- **Línea ~107**: Tipar el objeto `packages`
- **Línea ~540**: Ya funciona correctamente con el tipo opcional
- **Línea ~638**: Ya funciona correctamente con verificación condicional

### Compatibilidad

Esta solución:
- ✅ No rompe funcionalidad existente
- ✅ Es compatible con TypeScript strict mode
- ✅ Mejora la seguridad de tipos
- ✅ Facilita mantenimiento futuro
- ✅ No requiere cambios en la lógica de negocio

## Alternative Approaches Considered

### Alternativa 1: Type Guards
Usar funciones de type guard para verificar el tipo específico del paquete:

```typescript
function hasAddOns(pkg: ServicePackage): pkg is ServicePackage & { addOns: AddOn[] } {
  return 'addOns' in pkg;
}
```

**Descartado:** Más complejo de lo necesario para este caso.

### Alternativa 2: Tipos Discriminados
Usar una propiedad discriminante para diferenciar tipos:

```typescript
type StrategyPackage = ServicePackage & { type: 'strategy' };
type ImplementationPackage = ServicePackage & { type: 'implementation', addOns: AddOn[] };
type CompletePackage = ServicePackage & { type: 'complete', savings: string, addOns: AddOn[] };
```

**Descartado:** Requiere cambios más extensos en el código existente.

### Alternativa 3: Propiedades Opcionales (SELECCIONADA)
Usar propiedades opcionales con el modificador `?`:

```typescript
interface ServicePackage {
  // ... propiedades comunes
  savings?: string;
  addOns?: AddOn[];
}
```

**Seleccionado:** Solución más simple y directa que requiere cambios mínimos.
