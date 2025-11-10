# Requirements Document

## Introduction

El sistema de consentimiento de cookies actual no funciona correctamente. Google Analytics se carga automáticamente sin verificar el consentimiento del usuario, y existen dos sistemas de almacenamiento de preferencias que no están sincronizados (`cookie-consent` y `analytics_consent`). Esto viola las regulaciones de privacidad (GDPR/CCPA) y la confianza del usuario.

## Glossary

- **Cookie Consent System**: El sistema que gestiona las preferencias de cookies del usuario
- **Google Analytics (GA)**: Servicio de análisis web de Google que requiere consentimiento del usuario
- **localStorage**: Almacenamiento local del navegador para persistir preferencias
- **gtag**: API de Google para gestionar el consentimiento y tracking
- **Consent Mode**: Modo de consentimiento de Google que permite cargar GA sin cookies hasta obtener consentimiento

## Requirements

### Requirement 1

**User Story:** Como usuario del sitio web, quiero que Google Analytics NO se cargue hasta que yo dé mi consentimiento explícito, para que mi privacidad sea respetada.

#### Acceptance Criteria

1. WHEN the user visits the website for the first time, THE Cookie Consent System SHALL NOT load Google Analytics scripts
2. WHEN the user accepts analytics cookies, THE Cookie Consent System SHALL load Google Analytics scripts
3. WHEN the user rejects analytics cookies, THE Cookie Consent System SHALL NOT load Google Analytics scripts
4. WHEN the user has previously given consent, THE Cookie Consent System SHALL load Google Analytics on subsequent visits

### Requirement 2

**User Story:** Como usuario, quiero que mis preferencias de cookies se guarden de forma consistente, para que no tenga que configurarlas cada vez que visito el sitio.

#### Acceptance Criteria

1. THE Cookie Consent System SHALL use a single localStorage key for storing all cookie preferences
2. WHEN the user makes a cookie choice, THE Cookie Consent System SHALL persist the choice in localStorage with a timestamp
3. WHEN the user returns to the site, THE Cookie Consent System SHALL read the stored preferences and apply them
4. THE Cookie Consent System SHALL NOT use multiple conflicting storage keys (cookie-consent vs analytics_consent)

### Requirement 3

**User Story:** Como usuario, quiero poder cambiar mis preferencias de cookies en cualquier momento, para tener control sobre mi privacidad.

#### Acceptance Criteria

1. WHEN the user clicks "Cookie Settings" in the footer, THE Cookie Consent System SHALL display the cookie preferences modal
2. WHEN the user changes preferences and saves, THE Cookie Consent System SHALL update the stored preferences
3. WHEN the user enables analytics after previously disabling, THE Cookie Consent System SHALL load Google Analytics dynamically
4. WHEN the user disables analytics after previously enabling, THE Cookie Consent System SHALL stop Google Analytics tracking

### Requirement 4

**User Story:** Como desarrollador, quiero implementar Google Consent Mode v2, para cumplir con las regulaciones de privacidad mientras mantengo capacidades de medición.

#### Acceptance Criteria

1. THE Cookie Consent System SHALL initialize Google Consent Mode with denied defaults before any scripts load
2. WHEN the user accepts cookies, THE Cookie Consent System SHALL update consent mode to granted
3. THE Cookie Consent System SHALL support analytics_storage and ad_storage consent types
4. THE Cookie Consent System SHALL load gtag.js with Consent Mode enabled

### Requirement 5

**User Story:** Como usuario, quiero que el banner de cookies sea claro y fácil de usar, para poder tomar una decisión informada rápidamente.

#### Acceptance Criteria

1. WHEN the user visits without prior consent, THE Cookie Consent System SHALL display the consent banner within 2 seconds
2. THE Cookie Consent System SHALL provide three clear options: Accept All, Save Preferences, and Reject All
3. THE Cookie Consent System SHALL show toggle switches for analytics and marketing cookies
4. THE Cookie Consent System SHALL include a link to the Privacy Policy
