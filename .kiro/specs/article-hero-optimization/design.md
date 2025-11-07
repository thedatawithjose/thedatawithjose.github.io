# Design Document

## Overview

This design optimizes the article hero typography by reducing oversized title text while maintaining visual impact and hierarchy. The solution addresses two different article implementations: the BlogPostTemplate component and the blog slug page, both currently using excessive text sizing that overwhelms the reading experience.

## Architecture

### Current Implementation Analysis

The project has two article title implementations:

1. **BlogPostTemplate Component** (`components/BlogPostTemplate.tsx`)
   - Uses: `text-3xl sm:text-4xl md:text-5xl`
   - Context: Clean, minimal article layout
   - Color: `text-gray-900` (dark text on light background)

2. **Blog Slug Page** (`app/blog/[slug]/page.tsx`)
   - Uses: `text-3xl sm:text-4xl md:text-5xl lg:text-7xl`
   - Context: Hero section with gradient background
   - Color: Gradient text with `bg-clip-text text-transparent`

### Design Strategy

The optimization will implement a more balanced typography scale that maintains visual hierarchy while improving readability:

- **Mobile (default)**: `text-xl` - Comfortable reading on small screens
- **Small tablets (sm)**: `text-2xl` - Appropriate scaling for medium screens  
- **Large tablets/Desktop (md)**: `text-3xl` - Balanced size for larger screens
- **Large desktop (lg)**: `text-4xl` - Maximum size for very large screens (only where needed)

## Components and Interfaces

### BlogPostTemplate Component

**Current Structure:**
```tsx
<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
  {title}
</h1>
```

**Optimized Structure:**
```tsx
<h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
  {title}
</h1>
```

### Blog Slug Page Component

**Current Structure:**
```tsx
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-10 leading-[1.05] tracking-[-0.02em] font-display">
  <span className="bg-gradient-to-br from-white via-gray-50 via-[#E0F2FE] to-[#00BFA5] bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
    {articleData.title}
  </span>
</h1>
```

**Optimized Structure:**
```tsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-10 leading-[1.05] tracking-[-0.02em] font-display">
  <span className="bg-gradient-to-br from-white via-gray-50 via-[#E0F2FE] to-[#00BFA5] bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
    {articleData.title}
  </span>
</h1>
```

## Data Models

### Typography Scale Mapping

| Screen Size | Current Size | Optimized Size | Reduction |
|-------------|--------------|----------------|-----------|
| Mobile      | text-3xl (30px) | text-xl (20px) | -33% |
| Small       | text-4xl (36px) | text-2xl (24px) | -33% |
| Medium      | text-5xl (48px) | text-3xl (30px) | -37% |
| Large       | text-7xl (72px) | text-4xl (36px) | -50% |

### Component Props Interface

No changes required to component interfaces. The optimization only affects CSS classes, maintaining:

```tsx
interface BlogPostTemplateProps {
  title: string;
  excerpt: string;
  content: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  image?: string;
  url: string;
}
```

## Error Handling

### Responsive Behavior Validation

- **Viewport Testing**: Ensure titles remain readable across all device sizes
- **Content Overflow**: Verify long titles don't break layout on smaller screens
- **Animation Compatibility**: Confirm existing Framer Motion animations work with new sizing

### Fallback Considerations

- **Font Loading**: Maintain existing font-display behavior for web fonts
- **CSS Support**: Tailwind classes provide automatic fallbacks
- **Accessibility**: Preserve semantic HTML structure and ARIA compliance

## Testing Strategy

### Visual Regression Testing

1. **Screenshot Comparison**: Before/after images at key breakpoints
2. **Cross-Device Testing**: Mobile, tablet, desktop viewport validation
3. **Content Variation Testing**: Short, medium, and long title scenarios

### Accessibility Testing

1. **Screen Reader Compatibility**: Verify semantic structure remains intact
2. **Zoom Testing**: Ensure readability at 200% browser zoom
3. **Color Contrast**: Maintain existing contrast ratios

### Performance Impact

1. **Bundle Size**: No impact (only CSS class changes)
2. **Rendering Performance**: No impact on existing animations
3. **Layout Shift**: Verify no CLS issues with size changes

### Implementation Validation

1. **Component Isolation**: Test BlogPostTemplate independently
2. **Page Integration**: Verify blog slug page functionality
3. **Responsive Behavior**: Validate smooth transitions between breakpoints

## Implementation Notes

### Preservation Requirements

- **Animation Effects**: Keep all existing Framer Motion animations
- **Color Schemes**: Maintain current text colors and gradients  
- **Spacing**: Preserve existing margins and padding
- **Font Weights**: Keep bold font weight for emphasis
- **Line Height**: Maintain `leading-tight` and `leading-[1.05]` as appropriate

### Consistency Considerations

- **Design System Alignment**: Ensure changes align with overall typography scale
- **Future Maintenance**: Document the new sizing rationale for future updates
- **Cross-Component Impact**: Verify no unintended effects on other components