# Design Document

## Overview

This design implements a content reorganization strategy for the portfolio section by swapping project data between the hero card and supporting cards. The approach prioritizes Data Engineering expertise while maintaining the existing component architecture, visual design, and user experience.

**Key Design Principle:** Content-only modification through data layer changes, zero component modifications.

## Architecture

### Current State
```
lib/data/projects.ts
├── heroProject (Trading Data Infrastructure)
└── supportingProjects[]
    ├── [0] SEC Financial Data Platform
    └── [1] Data Architecture Principles
```

### Target State
```
lib/data/projects.ts
├── heroProject (SEC Financial Data Platform - EXPANDED)
└── supportingProjects[]
    ├── [0] Data Architecture Principles (NO CHANGE)
    └── [1] Trading Data Infrastructure - CONDENSED
```

### Component Layer (No Changes)
```
components/WhatIBuildSection/
├── index.tsx (orchestration - unchanged)
├── HeroProjectCard.tsx (hero display - unchanged)
├── SupportingProjectCard.tsx (supporting display - unchanged)
└── types.ts (type definitions - unchanged)
```

## Components and Interfaces

### Data Structure Mapping

#### HeroProjectCardProps (for SEC Financial Data Platform)
```typescript
{
  id: string;                    // 'sec-parser'
  title: string;                 // 'SEC Financial Data Platform'
  subtitle: string;              // 'PRODUCTION-GRADE PARSER | 16.5 MB/s THROUGHPUT'
  badge: Badge;                  // { text: '16.5 MB/s', color: 'teal' }
  icon: string;                  // 'fa-bolt'
  gradient: Gradient;            // { from: '#00BFA5', to: '#42A5F5' }
  description: string;           // Expanded description
  architecture: ArchitectureDetail[];  // 4 detailed points
  techStack: string[];           // 6-8 technologies
  features: string[];            // 2-3 key features
  link?: string;                 // '/portfolio#sec-parser'
}
```

#### SupportingProjectCardProps (for Trading Infrastructure)
```typescript
{
  id: string;                    // 'trading-infrastructure'
  title: string;                 // 'Trading Data Infrastructure'
  subtitle: string;              // 'REAL-TIME SYSTEMS | 4 YEARS PRODUCTION'
  badge: Badge;                  // { text: 'High-Availability', color: 'blue' }
  icon: string;                  // 'fa-stream'
  gradient: Gradient;            // { from: '#005A9C', to: '#00BFA5' }
  primaryMetric?: {              // { value: '17.89% CAGR', label: '4-Year Performance' }
    value: string;
    label: string;
  };
  description: string;           // Condensed description
  features: string[];            // 3 key features (condensed)
  techStack?: string[];          // Optional: 4-5 core technologies
}
```

### Content Transformation Strategy

#### SEC Financial Data Platform (Current Supporting → New Hero)

**Expansion Requirements:**
- **Description**: Expand from 2 sentences to 3-4 sentences with business context
- **Architecture**: Create 4 detailed architecture points (currently has 0)
- **Tech Stack**: Expand from 3 items to 6-8 items with full stack details
- **Features**: Maintain 2-3 features but with more detail
- **Badge**: Keep '16.5 MB/s' metric (strong technical indicator)

**Content Focus:**
- Emphasize production-grade reliability and fault tolerance
- Highlight parsing complexity and data quality validation
- Include business impact (financial data accuracy requirements)
- Showcase technical depth (3 parsing engines, automatic recovery)

#### Trading Infrastructure (Current Hero → New Supporting)

**Condensation Requirements:**
- **Description**: Condense from 4 sentences to 2 sentences, keep key impact
- **Architecture**: Remove (supporting cards don't have architecture section)
- **Tech Stack**: Optional, reduce to 4-5 core technologies if included
- **Features**: Condense from detailed list to 3 key bullet points
- **Primary Metric**: Add '17.89% CAGR' or '2.34 Sharpe' as primaryMetric

**Content Focus:**
- Keep the "real money, real consequences" narrative hook
- Maintain production results (CAGR, Sharpe ratio)
- Condense technical details to high-level capabilities
- Preserve credibility without dominating the narrative

#### Data Architecture Principles (No Change)

**Rationale:** Already positioned correctly as supporting card with Data Engineering focus. Content is appropriate for the format and complements the new hero project.

## Data Models

### New Hero Project Data Structure

```typescript
export const heroProject: HeroProjectCardProps = {
  id: 'sec-parser',
  title: 'SEC Financial Data Platform',
  subtitle: 'PRODUCTION-GRADE PARSER | 16.5 MB/s THROUGHPUT',
  badge: {
    text: '16.5 MB/s',
    color: 'teal'
  },
  icon: 'fa-bolt',
  gradient: {
    from: '#00BFA5',
    to: '#42A5F5'
  },
  description: `[3-4 sentences about production-grade SEC filing parser, 
                 business context, technical challenges, reliability focus]`,
  architecture: [
    { component: '[Component 1]', details: '[Technical details]' },
    { component: '[Component 2]', details: '[Technical details]' },
    { component: '[Component 3]', details: '[Technical details]' },
    { component: '[Component 4]', details: '[Business impact]' }
  ],
  techStack: [
    'Python', 'PostgreSQL', '[Engine 1]', '[Engine 2]', 
    '[Engine 3]', '[Additional tech]', '[Additional tech]', '[Additional tech]'
  ],
  features: [
    '[Feature 1 with detail]',
    '[Feature 2 with detail]'
  ],
  link: '/portfolio#sec-parser'
};
```

### New Supporting Projects Array

```typescript
export const supportingProjects: SupportingProjectCardProps[] = [
  {
    // Data Architecture Principles - NO CHANGE
    id: 'architecture-principles',
    title: 'Data Architecture Principles',
    // ... existing content unchanged
  },
  {
    // Trading Infrastructure - CONDENSED
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
    primaryMetric: {
      value: '17.89% CAGR',
      label: '4-Year Performance'
    },
    description: `[2 sentences: real-time trading platform, 
                   real money consequences, reliability focus]`,
    features: [
      '[Condensed feature 1]',
      '[Condensed feature 2]',
      '[Condensed feature 3]'
    ],
    techStack: [
      'Python', 'Kafka', 'TimescaleDB', 'PostgreSQL', 'Airflow'
    ],
    link: '/portfolio#trading-bot'
  }
];
```

## Error Handling

### Type Safety
- **Validation**: All data changes must conform to existing TypeScript interfaces
- **Compile-time checks**: TypeScript compiler will catch any structural mismatches
- **No runtime errors**: Since component logic is unchanged, no new runtime error paths

### Content Validation
- **Link integrity**: Verify all links point to valid anchors or routes
- **Badge colors**: Ensure badge.color values match allowed types ('blue' | 'teal' | 'purple')
- **Gradient colors**: Maintain valid hex color format for gradient values
- **Icon classes**: Verify FontAwesome icon classes are valid

### Fallback Strategy
- **Git rollback**: Single file change allows instant rollback if issues arise
- **No component changes**: Zero risk of breaking component rendering logic
- **Isolated change**: Data-only modification limits blast radius

## Testing Strategy

### Visual Regression Testing
1. **Desktop viewport (1920x1080)**
   - Verify hero card displays SEC platform with expanded content
   - Verify supporting cards show correct order and content
   - Check all animations and hover effects work correctly

2. **Tablet viewport (768x1024)**
   - Verify responsive grid layout maintains integrity
   - Check text truncation and wrapping behavior

3. **Mobile viewport (375x667)**
   - Verify single-column layout displays correctly
   - Check touch interactions and card spacing

### Content Verification
1. **Text content**
   - Verify all titles, subtitles, and descriptions display correctly
   - Check for typos and grammatical errors
   - Ensure technical terminology is accurate

2. **Links and navigation**
   - Test hero card link to /portfolio#sec-parser
   - Test supporting card link to /services#data-architecture
   - Test supporting card link to /portfolio#trading-bot

3. **Visual elements**
   - Verify badge colors and text
   - Check icon rendering (fa-bolt, fa-cogs, fa-stream)
   - Verify gradient colors display correctly

### Functional Testing
1. **Component rendering**
   - Verify HeroProjectCard receives correct props
   - Verify SupportingProjectCard components receive correct props
   - Check array mapping and key assignment

2. **Accessibility**
   - Verify aria-labels update correctly
   - Check keyboard navigation still works
   - Ensure screen reader compatibility

### Performance Testing
1. **Build verification**
   - Ensure Next.js build completes without errors
   - Verify no TypeScript compilation errors
   - Check bundle size remains unchanged

2. **Runtime performance**
   - Verify page load time is unaffected
   - Check animation performance (60fps)
   - Ensure no console errors or warnings

## Implementation Notes

### Single File Modification
- **File**: `lib/data/projects.ts`
- **Lines affected**: Approximately 80-100 lines (full file rewrite)
- **Risk level**: Low (data-only change, type-safe)

### Content Writing Guidelines
1. **Hero project description**: 3-4 sentences, business context + technical depth
2. **Architecture points**: 4 items, mix of technical details and business impact
3. **Supporting project description**: 2 sentences, concise but impactful
4. **Features**: Action-oriented, specific, measurable where possible

### Deployment Strategy
1. Make changes in `lib/data/projects.ts`
2. Run TypeScript compiler to verify type safety
3. Test locally in development mode
4. Visual verification across viewports
5. Deploy to production (single file change, low risk)

## Design Decisions and Rationales

### Why Content-Only Approach?
- **Minimal risk**: No component logic changes means no new bugs
- **Fast implementation**: Single file modification, ~15 minutes
- **Easy rollback**: Git revert on single file if needed
- **Type safety**: TypeScript ensures structural integrity

### Why SEC Platform as Hero?
- **Service alignment**: Primary offering is Data Engineering, not trading
- **Technical showcase**: 16.5 MB/s throughput is impressive, measurable metric
- **Business relevance**: Financial data parsing is more relatable to potential clients
- **Narrative focus**: Positions trading as experience, not primary service

### Why Keep Data Architecture Principles?
- **Complementary content**: Supports Data Engineering narrative
- **Unique value prop**: Construction → Cloud story is differentiating
- **Appropriate format**: Content fits supporting card format well
- **No redundancy**: Doesn't overlap with hero project content

### Badge and Metric Strategy
- **Hero badge**: '16.5 MB/s' - Technical performance metric
- **Supporting badge 1**: 'Cost-Optimized' - Business value focus
- **Supporting badge 2**: 'High-Availability' - Reliability focus
- **Primary metric**: '17.89% CAGR' - Concrete business result

This creates a balanced narrative: technical performance (hero) + business value (supporting) + reliability (supporting).
