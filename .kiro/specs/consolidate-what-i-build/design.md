# Design Document

## Overview

This design consolidates two competing homepage sections into a single, visually striking "What I Build" section that positions the portfolio owner as a Data Engineer through clear visual hierarchy, modern animations, and technical content focus. The design eliminates the current 50/50 split between duplicate sections and replaces it with a 70/20/10 visual hierarchy that emphasizes data engineering infrastructure over business outcomes.

### Design Goals

1. **Single Source of Truth**: One section that definitively answers "What does this Data Engineer build?"
2. **Technical Credibility**: Showcase infrastructure, architecture, and production systems—not just outcomes
3. **Visual Impact**: Modern glassmorphism, 3D effects, and smooth animations that feel premium
4. **Clear Hierarchy**: Hero project dominates, supporting projects reinforce, context minimized
5. **Performance**: Maintain fast load times despite rich animations

## Architecture

### Component Structure

```
WhatIBuildSection (New Component)
├── SectionHeader
│   ├── Title: "What I Build"
│   └── Subtitle: "Data infrastructure engineered for real-world conditions..."
├── ProjectGrid
│   ├── HeroProjectCard (Trading Data Infrastructure)
│   │   ├── CardHeader (Icon, Badge, Title)
│   │   ├── MetricsDisplay (Technical metrics)
│   │   ├── ArchitectureDetails (System components)
│   │   ├── TechStack (Technologies used)
│   │   └── ImpactStatement (Business results)
│   ├── SupportingProjectCard (SEC Parser)
│   │   ├── CardHeader
│   │   ├── TechnicalMetric (16.5 MB/s)
│   │   ├── Description
│   │   └── TechStack
│   └── SupportingProjectCard (Architecture Principles)
│       ├── CardHeader
│       ├── PrinciplesDescription
│       └── ModernStackBadges
├── ValueProposition (Existing component - keep as is)
└── CTASection (Existing component - keep as is)
```

### Layout Strategy

**Desktop (≥1024px):**
```
┌─────────────────────────────────────────────────────────────┐
│                     Section Header                          │
│                  (Title + Subtitle)                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────┬───────────────────────┐
│                                     │   SEC Parser          │
│                                     │   (Supporting)        │
│     Hero Project Card               ├───────────────────────┤
│   (Trading Infrastructure)          │   Architecture        │
│         70% width                   │   Principles          │
│                                     │   (Supporting)        │
│                                     │                       │
└─────────────────────────────────────┴───────────────────────┘
         30% width (split 2 cards)

┌─────────────────────────────────────────────────────────────┐
│              Value Proposition (existing)                   │
└─────────────────────────────────────────────────────────────┘
```

**Tablet (768px - 1023px):**
```
┌─────────────────────────────────────────────────────────────┐
│                  Hero Project Card                          │
│              (Full width, reduced height)                   │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────┬──────────────────────────────┐
│    SEC Parser                │   Architecture Principles    │
│    (50% width)               │   (50% width)                │
└──────────────────────────────┴──────────────────────────────┘
```

**Mobile (<768px):**
```
┌─────────────────────────────────────────────────────────────┐
│              Hero Project Card                              │
│              (Full width, stacked)                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              SEC Parser (Full width)                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│         Architecture Principles (Full width)                │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. HeroProjectCard Component

**Purpose**: Showcase the Trading Data Infrastructure as the primary technical achievement

**Props Interface**:
```typescript
interface HeroProjectCardProps {
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  metrics: TechnicalMetric[];
  architecture: ArchitectureDetail[];
  techStack: string[];
  impact: ImpactStatement;
  link?: string;
}

interface TechnicalMetric {
  label: string;
  value: string;
  icon?: string;
}

interface ArchitectureDetail {
  component: string;
  description: string;
}

interface ImpactStatement {
  primary: string;
  secondary?: string;
}
```

**Visual Design**:
- **Size**: 
  - Desktop: `col-span-2` in 3-column grid (66% width)
  - Tablet: Full width
  - Mobile: Full width
- **Height**: `min-h-[600px]` on desktop, `min-h-[500px]` on tablet/mobile
- **Background**: 
  - Base: `bg-white/80 backdrop-blur-xl`
  - Gradient overlay: `bg-gradient-to-br from-[#005A9C]/5 via-transparent to-[#00BFA5]/5`
  - Hover: Gradient opacity increases to 100%
- **Border**: `border border-white/20` with `rounded-3xl`
- **Shadow**: `shadow-xl` base, `hover:shadow-2xl` with blue tint `shadow-[#005A9C]/10`

**Animation States**:
```typescript
// Hover animation
whileHover={{
  scale: 1.02,
  y: -12,
  rotateY: 1,
  transition: { duration: 0.4, ease: "easeOut" }
}}

// Initial entrance
initial={{ opacity: 0, y: 40, scale: 0.95 }}
whileInView={{ opacity: 1, y: 0, scale: 1 }}
transition={{ duration: 0.7, ease: "easeOut" }}
```

**Content Structure**:
```tsx
<HeroProjectCard>
  {/* Header Section */}
  <CardHeader>
    <IconContainer>
      {/* 3D rotating icon with gradient background */}
      <GradientIcon gradient="from-[#005A9C] to-[#00BFA5]" />
      <StatusIndicator status="production" />
    </IconContainer>
    <Badge text="REAL-TIME SYSTEMS | 4 YEARS PRODUCTION" />
  </CardHeader>

  {/* Title & Description */}
  <Title>Trading Data Infrastructure</Title>
  <Description>
    Built end-to-end data platform powering algorithmic trading with
    real capital. When your pipeline fails at market open, you lose
    money every second—taught me to build systems that stay up.
  </Description>

  {/* Architecture Section */}
  <ArchitectureSection>
    <SectionTitle>Architecture & Impact:</SectionTitle>
    <ArchitectureList>
      - Real-time ingestion: WebSocket → Kafka → TimescaleDB
        (sub-second latency for tick data)
      - Backtesting infrastructure: 5x throughput improvement
        (weeks → hours through parallelization)
      - Fault-tolerant design: Automatic failover, health checks,
        retry logic with dead letter queues
      - Production results: 17.89% CAGR, 2.34 Sharpe ratio over 4 years
    </ArchitectureList>
  </ArchitectureSection>

  {/* Tech Stack Pills */}
  <TechStackGrid>
    <TechPill>Python</TechPill>
    <TechPill>SQL</TechPill>
    <TechPill>Kafka</TechPill>
    <TechPill>TimescaleDB</TechPill>
    <TechPill>PostgreSQL</TechPill>
    <TechPill>Airflow</TechPill>
  </TechStackGrid>

  {/* Key Features */}
  <FeatureGrid>
    <Feature icon="✓">High-frequency data processing</Feature>
    <Feature icon="✓">Anomaly detection</Feature>
    <Feature icon="✓">Comprehensive monitoring</Feature>
    <Feature icon="✓">SLA-aware alerting</Feature>
  </FeatureGrid>
</HeroProjectCard>
```

### 2. SupportingProjectCard Component

**Purpose**: Display SEC Parser and Architecture Principles as reinforcing technical evidence

**Props Interface**:
```typescript
interface SupportingProjectCardProps {
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  primaryMetric?: {
    value: string;
    label: string;
  };
  description: string;
  features: string[];
  techStack?: string[];
  gradient: {
    from: string;
    to: string;
  };
}
```

**Visual Design**:
- **Size**: 
  - Desktop: `col-span-1` in 3-column grid (33% width each)
  - Tablet: `col-span-1` in 2-column grid (50% width each)
  - Mobile: Full width, stacked
- **Height**: `min-h-[500px]` to match hero card proportionally
- **Background**: Same glassmorphism as hero but with project-specific gradient
- **Border & Shadow**: Consistent with hero card

**Animation States**:
```typescript
// Hover animation (slightly less dramatic than hero)
whileHover={{
  scale: 1.03,
  y: -8,
  transition: { duration: 0.3, ease: "easeOut" }
}}

// Staggered entrance
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ 
  duration: 0.6, 
  delay: index * 0.15, // Stagger by 150ms
  ease: "easeOut" 
}}
```

**Content Structure for SEC Parser**:
```tsx
<SupportingProjectCard gradient={{ from: "#00BFA5", to: "#42A5F5" }}>
  <CardHeader>
    <IconContainer>
      <GradientIcon gradient="from-[#00BFA5] to-[#42A5F5]" />
    </IconContainer>
    <Badge text="16.5 MB/s PEAK THROUGHPUT" />
  </CardHeader>

  <Title>SEC Financial Data Platform</Title>
  
  <Description>
    Production-grade parser processing SEC filings with automatic 
    recovery when parsing fails mid-document. In financial data, 
    partial results are worse than no results.
  </Description>

  <FeatureList>
    <Feature>✓ Python, PostgreSQL, 3 engines</Feature>
    <Feature>✓ Fault-tolerant parsing</Feature>
    <Feature>✓ Data quality validation</Feature>
  </FeatureList>
</SupportingProjectCard>
```

**Content Structure for Architecture Principles**:
```tsx
<SupportingProjectCard gradient={{ from: "#005A9C", to: "#1976D2" }}>
  <CardHeader>
    <IconContainer>
      <GradientIcon gradient="from-[#005A9C] to-[#1976D2]" />
    </IconContainer>
    <Badge text="FROM CONSTRUCTION TO CLOUD" />
  </CardHeader>

  <Title>Data Architecture Principles</Title>
  
  <Description>
    Four years managing construction projects taught me: bad 
    architecture is expensive to fix later. I design data systems 
    the same way—thinking about failure modes, maintenance costs, 
    and what happens at 3x scale.
  </Description>

  <FeatureList>
    <Feature>✓ Modern stack (dbt, Snowflake)</Feature>
    <Feature>✓ Cost-optimization strategies</Feature>
    <Feature>✓ Reliability by design</Feature>
  </FeatureList>
</SupportingProjectCard>
```

### 3. Section Header Component

**Purpose**: Introduce the consolidated section with clear messaging

**Design**:
```tsx
<SectionHeader>
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 
                   bg-gradient-to-r from-[#005A9C] to-[#00BFA5] 
                   bg-clip-text text-transparent leading-tight py-2">
      What I Build
    </h2>
    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
      Data infrastructure engineered for real-world conditions—not just 
      the happy path. I specialize in building systems that handle failures 
      gracefully, recover automatically, and provide the observability 
      needed to debug issues when they inevitably occur.
    </p>
  </motion.div>
</SectionHeader>
```

## Data Models

### Project Data Structure

```typescript
// projects.ts
export const heroProject = {
  id: 'trading-infrastructure',
  title: 'Trading Data Infrastructure',
  subtitle: 'REAL-TIME SYSTEMS | 4 YEARS PRODUCTION',
  badge: {
    text: 'High-Availability',
    color: 'blue'
  },
  icon: 'fa-stream',
  gradient: {
    from: '#005A9C',
    to: '#00BFA5'
  },
  description: `Built end-to-end data platform powering algorithmic trading with 
    real capital. When your pipeline fails at market open, you lose money every 
    second—taught me to build systems that stay up.`,
  architecture: [
    {
      component: 'Real-time ingestion',
      details: 'WebSocket → Kafka → TimescaleDB (sub-second latency for tick data)'
    },
    {
      component: 'Backtesting infrastructure',
      details: '5x throughput improvement (weeks → hours through parallelization)'
    },
    {
      component: 'Fault-tolerant design',
      details: 'Automatic failover, health checks, retry logic with dead letter queues'
    },
    {
      component: 'Production results',
      details: '17.89% CAGR, 2.34 Sharpe ratio over 4 years'
    }
  ],
  techStack: [
    'Python',
    'SQL',
    'Kafka',
    'TimescaleDB',
    'PostgreSQL',
    'Airflow'
  ],
  features: [
    'High-frequency data processing & anomaly detection',
    'Comprehensive monitoring, SLA-aware alerting'
  ]
};

export const supportingProjects = [
  {
    id: 'sec-parser',
    title: 'SEC Financial Data Platform',
    subtitle: '16.5 MB/s PEAK THROUGHPUT',
    badge: {
      text: '16.5 MB/s',
      color: 'teal'
    },
    icon: 'fa-bolt',
    gradient: {
      from: '#00BFA5',
      to: '#42A5F5'
    },
    description: `Production-grade parser processing SEC filings with automatic 
      recovery when parsing fails mid-document. In financial data, partial 
      results are worse than no results.`,
    features: [
      'Python, PostgreSQL, 3 engines',
      'Fault-tolerant parsing',
      'Data quality validation'
    ]
  },
  {
    id: 'architecture-principles',
    title: 'Data Architecture Principles',
    subtitle: 'FROM CONSTRUCTION TO CLOUD',
    badge: {
      text: 'Cost-Optimized',
      color: 'blue'
    },
    icon: 'fa-cogs',
    gradient: {
      from: '#005A9C',
      to: '#1976D2'
    },
    description: `Four years managing construction projects taught me: bad 
      architecture is expensive to fix later. I design data systems the same 
      way—thinking about failure modes, maintenance costs, and what happens 
      at 3x scale.`,
    features: [
      'Modern stack (dbt, Snowflake)',
      'Cost-optimization strategies',
      'Reliability by design'
    ]
  }
];
```

## Error Handling

### Animation Performance

**Problem**: Complex animations can cause jank on lower-end devices

**Solution**:
```typescript
// Use will-change CSS property for animated elements
const cardStyles = {
  willChange: 'transform, opacity',
  transform: 'translateZ(0)', // Force GPU acceleration
};

// Respect user preferences
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const animationConfig = prefersReducedMotion
  ? { duration: 0 } // Instant transitions
  : { duration: 0.4, ease: 'easeOut' };
```

### Image Loading

**Problem**: Large project images can delay initial render

**Solution**:
```tsx
// Use Next.js Image with priority for hero card
<Image
  src="/images/trading-infrastructure.jpg"
  alt="Trading Data Infrastructure"
  width={800}
  height={600}
  priority={true} // Load immediately
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // Low-quality placeholder
/>

// Lazy load supporting card images
<Image
  src="/images/sec-parser.jpg"
  alt="SEC Parser"
  width={400}
  height={300}
  loading="lazy"
  placeholder="blur"
/>
```

### Responsive Breakpoints

**Problem**: Layout needs to adapt gracefully across all screen sizes

**Solution**:
```typescript
// Tailwind breakpoints
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large
};

// Grid configuration
const gridClasses = `
  grid 
  grid-cols-1           // Mobile: stack all
  md:grid-cols-2        // Tablet: 2 columns
  lg:grid-cols-3        // Desktop: 3 columns (hero spans 2)
  gap-6 md:gap-8 lg:gap-10
`;
```

## Testing Strategy

### Visual Regression Testing

**Approach**: Capture screenshots at key breakpoints and compare against baseline

**Tools**: Playwright with screenshot comparison

**Test Cases**:
1. Desktop layout (1920x1080)
2. Tablet layout (768x1024)
3. Mobile layout (375x667)
4. Hover states on all cards
5. Animation entrance states
6. Dark mode compatibility (if applicable)

**Implementation**:
```typescript
// e2e/what-i-build-section.spec.ts
import { test, expect } from '@playwright/test';

test.describe('What I Build Section', () => {
  test('should render hero card with correct layout on desktop', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    const heroCard = page.locator('[data-testid="hero-project-card"]');
    await expect(heroCard).toBeVisible();
    
    // Check visual hierarchy
    const heroBox = await heroCard.boundingBox();
    const supportingCard = page.locator('[data-testid="supporting-card-0"]');
    const supportingBox = await supportingCard.boundingBox();
    
    // Hero should be significantly larger
    expect(heroBox.width).toBeGreaterThan(supportingBox.width * 1.8);
    
    // Screenshot comparison
    await expect(page).toHaveScreenshot('what-i-build-desktop.png');
  });

  test('should animate on hover', async ({ page }) => {
    await page.goto('/');
    
    const heroCard = page.locator('[data-testid="hero-project-card"]');
    const initialBox = await heroCard.boundingBox();
    
    await heroCard.hover();
    await page.waitForTimeout(500); // Wait for animation
    
    const hoverBox = await heroCard.boundingBox();
    
    // Card should move up (y decreases)
    expect(hoverBox.y).toBeLessThan(initialBox.y);
  });

  test('should stack correctly on mobile', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 375, height: 667 });
    
    const cards = page.locator('[data-testid^="project-card"]');
    const count = await cards.count();
    
    expect(count).toBe(3);
    
    // All cards should be full width
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const box = await card.boundingBox();
      expect(box.width).toBeGreaterThan(300); // Near full width
    }
    
    await expect(page).toHaveScreenshot('what-i-build-mobile.png');
  });
});
```

### Accessibility Testing

**Approach**: Automated and manual testing for WCAG 2.1 AA compliance

**Test Cases**:
1. Keyboard navigation through all cards
2. Screen reader announcements
3. Focus indicators visibility
4. Color contrast ratios
5. Motion preferences respected

**Implementation**:
```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('What I Build Section - Accessibility', () => {
  test('should not have accessibility violations', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('[data-section="what-i-build"]')
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    // Tab through cards
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    const focusedElement = await page.evaluate(() => 
      document.activeElement?.getAttribute('data-testid')
    );
    
    expect(focusedElement).toContain('project-card');
  });

  test('should respect prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    
    const heroCard = page.locator('[data-testid="hero-project-card"]');
    
    // Animations should be instant (duration: 0)
    const animationDuration = await heroCard.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return computed.transitionDuration;
    });
    
    expect(animationDuration).toBe('0s');
  });
});
```

### Performance Testing

**Approach**: Measure load time, animation frame rate, and Lighthouse scores

**Metrics**:
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- Time to Interactive (TTI) < 3.5s
- Animation frame rate > 55fps

**Implementation**:
```typescript
// e2e/performance.spec.ts
import { test, expect } from '@playwright/test';

test.describe('What I Build Section - Performance', () => {
  test('should meet Core Web Vitals', async ({ page }) => {
    await page.goto('/');
    
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcp = entries.find(e => e.entryType === 'largest-contentful-paint');
          resolve({ lcp: lcp?.startTime });
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      });
    });
    
    expect(metrics.lcp).toBeLessThan(2500); // 2.5s threshold
  });

  test('should maintain 60fps during animations', async ({ page }) => {
    await page.goto('/');
    
    const heroCard = page.locator('[data-testid="hero-project-card"]');
    
    // Start performance monitoring
    await page.evaluate(() => {
      (window as any).frameCount = 0;
      (window as any).startTime = performance.now();
      
      function countFrame() {
        (window as any).frameCount++;
        requestAnimationFrame(countFrame);
      }
      requestAnimationFrame(countFrame);
    });
    
    // Trigger hover animation
    await heroCard.hover();
    await page.waitForTimeout(1000);
    
    const fps = await page.evaluate(() => {
      const elapsed = performance.now() - (window as any).startTime;
      return ((window as any).frameCount / elapsed) * 1000;
    });
    
    expect(fps).toBeGreaterThan(55); // Allow some margin below 60fps
  });
});
```

## Implementation Notes

### Code Organization

```
components/
├── WhatIBuildSection/
│   ├── index.tsx                 // Main section component
│   ├── HeroProjectCard.tsx       // Hero card component
│   ├── SupportingProjectCard.tsx // Supporting card component
│   ├── SectionHeader.tsx         // Header component
│   ├── types.ts                  // TypeScript interfaces
│   └── animations.ts             // Framer Motion variants
├── data/
│   └── projects.ts               // Project data
└── __tests__/
    └── WhatIBuildSection.test.tsx
```

### Migration Strategy

1. **Phase 1**: Create new `WhatIBuildSection` component alongside existing code
2. **Phase 2**: Update `app/page.tsx` to use new component
3. **Phase 3**: Remove old "What I've Built" section from "Results & Impact Section"
4. **Phase 4**: Clean up unused components and styles
5. **Phase 5**: Run visual regression tests and adjust as needed

### Backward Compatibility

- Keep existing "Value Proposition" and "CTA Section" components unchanged
- Maintain existing color palette and design tokens
- Preserve existing analytics tracking hooks
- Keep existing responsive breakpoints

## Design Decisions and Rationales

### Why 70/20/10 Visual Hierarchy?

**Decision**: Hero card at 70%, two supporting cards at 15% each

**Rationale**: 
- Eye-tracking studies show users spend 80% of time on the largest element
- 70% gives hero card dominance without overwhelming the page
- 15% each for supporting cards provides context without competition
- Follows the "rule of thirds" in visual design

### Why Glassmorphism Over Flat Design?

**Decision**: Use backdrop-blur and semi-transparent backgrounds

**Rationale**:
- Modern aesthetic that signals current design trends (2024-2025)
- Creates depth and visual interest without heavy graphics
- Performs well with GPU acceleration
- Differentiates from competitor portfolios using flat Material Design

### Why Framer Motion Over CSS Animations?

**Decision**: Use Framer Motion for all animations

**Rationale**:
- Declarative API is easier to maintain
- Built-in viewport detection for scroll animations
- Better performance with automatic optimization
- Gesture support for future mobile interactions
- Already used elsewhere in the codebase (consistency)

### Why Consolidate Instead of Redesign Both?

**Decision**: Remove "What I've Built" entirely rather than keep both

**Rationale**:
- Cognitive load: Users shouldn't have to reconcile two similar sections
- SEO: Duplicate content dilutes keyword focus
- Maintenance: One section is easier to update
- Clarity: Single source of truth for "what this person builds"
- Conversion: Focused message converts better than scattered information
