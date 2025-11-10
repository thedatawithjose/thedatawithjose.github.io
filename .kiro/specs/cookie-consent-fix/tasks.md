# Implementation Plan - Cookie Consent System Fix

- [x] 1. Create ConsentManager component with context


  - Create `components/ConsentManager.tsx` with ConsentContext provider
  - Implement Google Consent Mode v2 initialization (denied by default)
  - Implement localStorage read/write for `cookie-preferences` key
  - Add migration logic to convert old `analytics_consent` and `cookie-consent` keys
  - Implement dynamic Google Analytics loading based on consent
  - Add error handling for localStorage failures and corrupted data
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 4.1, 4.2, 4.3, 4.4_



- [ ] 2. Refactor CookieConsentBanner component
  - Update `components/CookieConsent.tsx` to use ConsentContext instead of direct localStorage
  - Remove direct gtag calls (moved to ConsentManager)
  - Update accept/reject handlers to call `updateConsent()` from context
  - Ensure banner shows/hides based on context state


  - Fix accessibility issues (add button types and aria-labels)
  - _Requirements: 2.1, 2.2, 3.1, 3.2, 5.1, 5.2, 5.3, 5.4_

- [x] 3. Refactor CookieSettings component


  - Update `components/CookieSettings.tsx` to use ConsentContext
  - Replace localStorage manipulation with `showConsentBanner()` from context
  - Ensure it properly triggers the consent modal
  - _Requirements: 3.1, 3.2_



- [ ] 4. Update GoogleAnalytics component to be conditional
  - Modify `components/GoogleAnalytics.tsx` to accept a `hasConsent` prop
  - Only render scripts when consent is granted
  - Keep `strategy="afterInteractive"` for performance
  - Remove duplicate gtag initialization (handled by ConsentManager)


  - _Requirements: 1.1, 1.2, 1.3, 4.4_

- [ ] 5. Update layout.tsx to use new consent system
  - Replace `AnalyticsProvider` with `ConsentManager` in `app/layout.tsx`


  - Move `GoogleAnalytics` component inside `ConsentManager` (conditional rendering)
  - Remove direct GA loading from `<head>` section
  - Ensure `CookieConsent` is rendered within `ConsentManager` context
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 4.1_



- [ ] 6. Remove AnalyticsProvider component
  - Delete `components/AnalyticsProvider.tsx` (functionality moved to ConsentManager)
  - Remove any imports of AnalyticsProvider from other files
  - Verify no broken references remain
  - _Requirements: 2.4_



- [ ] 7. Update analytics utility functions
  - Update `lib/analytics.ts` to work with new consent system
  - Ensure `privacyAnalytics` functions use `cookie-preferences` key
  - Update `initGA()` to be called by ConsentManager only
  - Add helper to check consent from new storage format
  - _Requirements: 2.1, 2.2, 2.3, 3.3, 3.4_



- [ ] 8. Add unit tests for ConsentManager
  - Test Consent Mode initialization with denied defaults
  - Test localStorage read with valid, invalid, and missing data
  - Test migration from old storage keys
  - Test consent update and GA loading trigger
  - Test error handling for localStorage failures
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 4.1, 4.2_

- [ ] 9. Add E2E tests for cookie consent flow
  - Test first visit: banner shows, no GA loaded
  - Test accept all: banner closes, GA loads, preferences saved
  - Test reject all: banner closes, no GA loaded, preferences saved
  - Test custom preferences: toggles work, saved correctly
  - Test return visit: no banner, GA loads if previously accepted
  - Test settings change: can reopen modal and change preferences
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.3, 3.1, 3.2, 3.3, 3.4, 5.1, 5.2_

- [ ] 10. Verify and test complete implementation
  - Clear localStorage and test first visit flow
  - Test accept/reject/custom preferences flows
  - Verify GA only loads after consent
  - Test cookie settings button in footer
  - Verify migration from old storage keys works
  - Check browser console for errors
  - Verify Consent Mode signals in GA DebugView
  - _Requirements: All_
