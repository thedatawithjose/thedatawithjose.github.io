# Implementation Plan

- [x] 1. Create project data structure and TypeScript interfaces


  - Create `lib/data/projects.ts` file with hero project and supporting projects data
  - Define TypeScript interfaces in `components/WhatIBuildSection/types.ts` for `HeroProjectCardProps`, `SupportingProjectCardProps`, `TechnicalMetric`, `ArchitectureDetail`
  - Export `heroProject` object with Trading Infrastructure data including architecture array, tech stack, and features
  - Export `supportingProjects` array with SEC Parser and Architecture Principles data
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 5.2, 5.3, 5.4_



- [ ] 2. Create animation configuration module
  - Create `components/WhatIBuildSection/animations.ts` file
  - Define Framer Motion variants for hero card hover animation (scale: 1.02, y: -12, rotateY: 1)
  - Define variants for supporting card hover animation (scale: 1.03, y: -8)
  - Define entrance animation variants with stagger delays


  - Add prefers-reduced-motion detection and conditional animation config
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.8, 6.6_

- [ ] 3. Build SectionHeader component
  - Create `components/WhatIBuildSection/SectionHeader.tsx` component
  - Implement h2 title with gradient text effect using `bg-gradient-to-r from-[#005A9C] to-[#00BFA5] bg-clip-text text-transparent`


  - Add subtitle paragraph with "Data infrastructure engineered for real-world conditions..." text
  - Wrap in motion.div with fade-in and slide-up entrance animation
  - Make responsive with text size classes `text-2xl sm:text-3xl md:text-4xl lg:text-5xl`
  - _Requirements: 5.5, 6.1_

- [ ] 4. Build HeroProjectCard component
  - Create `components/WhatIBuildSection/HeroProjectCard.tsx` component
  - Implement glassmorphism styling with `bg-white/80 backdrop-blur-xl` and gradient overlay
  - Add card header with gradient icon container, status indicator, and badge
  - Display title "Trading Data Infrastructure" and description
  - Create architecture section listing 4 architecture details with bullet points
  - Add tech stack pills grid displaying Python, SQL, Kafka, TimescaleDB, PostgreSQL, Airflow

  - Add features grid with checkmark icons

  - Implement hover animations using Framer Motion (scale, translate, rotateY)
  - Set minimum height `min-h-[600px]` on desktop, `min-h-[500px]` on tablet/mobile
  - Make card span 2 columns in 3-column grid on desktop (`col-span-2`)
  - Add data-testid="hero-project-card" for testing
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 4.5, 4.8, 5.2_

- [ ] 5. Build SupportingProjectCard component
  - Create `components/WhatIBuildSection/SupportingProjectCard.tsx` component
  - Implement same glassmorphism base styling as hero card
  - Add card header with gradient icon and badge
  - Display title, primary metric (if provided), and description


  - Add features list with checkmark icons
  - Add optional tech stack display
  - Implement hover animations (slightly less dramatic than hero: scale 1.03, y: -8)
  - Set minimum height `min-h-[500px]`
  - Make card span 1 column in grid
  - Add data-testid with project id for testing
  - Accept gradient colors as props for project-specific styling
  - _Requirements: 3.5, 3.6, 3.7, 3.8, 4.1, 4.2, 4.3, 5.3, 5.4_



- [ ] 6. Build main WhatIBuildSection component
  - Create `components/WhatIBuildSection/index.tsx` as main section component
  - Import and render SectionHeader component
  - Create responsive grid layout: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10`
  - Render HeroProjectCard with data from `heroProject`
  - Map over `supportingProjects` array and render SupportingProjectCard for each with staggered entrance animations (delay: index * 0.15)
  - Keep existing ValueProposition component below project grid

  - Keep existing CTA section with links to /services and contact
  - Wrap section in semantic HTML with proper section tag and data-section="what-i-build" attribute
  - _Requirements: 1.3, 4.4, 4.7, 5.1, 5.6, 5.7, 6.1_

- [ ] 7. Update homepage to use new consolidated section
  - Open `app/page.tsx` file
  - Import new `WhatIBuildSection` component
  - Replace existing "What I Build" services preview section (around line 240) with new `<WhatIBuildSection />` component

  - Remove duplicate "What I've Built" section from "Results & Impact Section" (around line 650)
  - Keep "Results & Impact Section" wrapper but remove the case studies grid (Construction, Trading Bot, SEC Parser cards)
  - Verify section ordering: Hero → WhatIBuildSection → About Preview → Results & Impact (without case studies) → LazyLoadedSections
  - _Requirements: 1.1, 1.2, 1.4, 5.8_

- [ ] 8. Add accessibility attributes and ARIA labels
  - Add proper ARIA labels to all interactive card elements in HeroProjectCard and SupportingProjectCard
  - Add aria-label to icon containers describing the project type


  - Ensure all cards are keyboard focusable with tabIndex={0}
  - Add visible focus indicators with `focus:ring-2 focus:ring-[#005A9C] focus:outline-none`
  - Add role="article" to project cards for screen reader context
  - Verify heading hierarchy (h2 for section, h3 for project titles, h4 for subsections)
  - _Requirements: 6.1, 6.2, 6.5_

- [ ] 9. Implement performance optimizations
  - Add `will-change: transform` CSS property to animated card elements
  - Add `transform: translateZ(0)` for GPU acceleration
  - Implement lazy loading for any project images using Next.js Image component with loading="lazy"
  - Add priority loading for hero card image if present
  - Use blur placeholders for images with blurDataURL
  - Verify no layout shift occurs during card entrance animations (set explicit heights)
  - _Requirements: 6.3, 6.7_

- [ ] 10. Clean up old components and unused code
  - Remove or comment out old service cards code from original "What I Build" section if not reused
  - Remove old case study cards code from "What I've Built" section
  - Clean up any unused imports in `app/page.tsx`
  - Verify no broken links or references to removed sections
  - Update any internal navigation links that pointed to old section IDs
  - _Requirements: 1.1, 1.2, 1.4_

- [ ] 11. Create visual regression tests
  - Create `e2e/what-i-build-section.spec.ts` test file
  - Write test for desktop layout (1920x1080) verifying hero card is larger than supporting cards
  - Write test for tablet layout (768x1024) verifying responsive grid
  - Write test for mobile layout (375x667) verifying stacked cards
  - Write test for hover animation verifying card moves up on hover
  - Capture baseline screenshots for visual comparison
  - _Requirements: 4.1, 4.2, 4.3, 4.7_

- [ ] 12. Create accessibility tests
  - Create `e2e/accessibility.spec.ts` test file or add to existing
  - Write test using @axe-core/playwright to scan section for WCAG violations
  - Write test for keyboard navigation through all project cards
  - Write test verifying prefers-reduced-motion is respected (animations disabled)
  - Write test for screen reader announcements using aria-label verification
  - Write test for focus indicators visibility
  - _Requirements: 6.1, 6.2, 6.5, 6.6_

- [ ] 13. Create performance tests
  - Add performance test to `e2e/performance.spec.ts` or create new file
  - Write test measuring Largest Contentful Paint (LCP) for section, verify < 2.5s
  - Write test measuring animation frame rate during hover, verify > 55fps
  - Write test measuring Cumulative Layout Shift (CLS) during entrance animations, verify < 0.1
  - Run Lighthouse audit on homepage and verify performance score > 90
  - _Requirements: 6.4, 6.7_
