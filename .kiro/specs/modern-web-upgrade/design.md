# Design Document - Modern Web Upgrade 2025

## Overview

This design document outlines the technical architecture and implementation strategy for upgrading Jose Acosta's portfolio website to align with 2025 modern web development standards. The upgrade focuses on performance optimization, comprehensive testing, security enhancements, and modern development workflows while maintaining the existing design aesthetic and user experience.

## Architecture

### Current State Analysis
- **Strengths**: Modern Next.js 16 with App Router, React 19, TypeScript 5, Tailwind CSS 4
- **Gaps**: Missing comprehensive testing, limited performance monitoring, basic security implementation, minimal CI/CD

### Target Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                           │
├─────────────────────────────────────────────────────────────┤
│ Next.js 16 + React 19 + TypeScript 5                      │
│ • App Router with RSC (React Server Components)            │
│ • Streaming SSR for improved performance                   │
│ • Edge Runtime where applicable                            │
│ • Advanced caching strategies                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  Component Layer                            │
├─────────────────────────────────────────────────────────────┤
│ • Radix UI + shadcn/ui for accessible components          │
│ • Framer Motion for advanced animations                   │
│ • Compound component patterns                              │
│ • Atomic design methodology                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   State Management                          │
├─────────────────────────────────────────────────────────────┤
│ • Zustand for global state (already implemented)          │
│ • TanStack Query for server state management              │
│ • React Hook Form + Zod (already implemented)             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  Performance Layer                          │
├─────────────────────────────────────────────────────────────┤
│ • Core Web Vitals monitoring                              │
│ • Bundle analysis and optimization                        │
│ • Image optimization (already implemented)                │
│ • Code splitting and lazy loading                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   Security Layer                           │
├─────────────────────────────────────────────────────────────┤
│ • Content Security Policy (CSP)                           │
│ • Input validation with Zod                               │
│ • XSS protection                                          │
│ • Dependency vulnerability scanning                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   Testing Layer                            │
├─────────────────────────────────────────────────────────────┤
│ • Vitest for unit testing (already configured)            │
│ • React Testing Library for component testing             │
│ • Playwright for E2E testing                              │
│ • Storybook for component documentation                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                 Monitoring & Analytics                      │
├─────────────────────────────────────────────────────────────┤
│ • Vercel Analytics for performance                        │
│ • Sentry for error tracking                               │
│ • Google Analytics 4 for user behavior                   │
│ • Custom performance monitoring                           │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Performance Monitoring System

**Core Web Vitals Tracker**
```typescript
interface WebVitalsMetrics {
  lcp: number;
  fid: number;
  cls: number;
  inp: number;
  ttfb: number;
}

interface PerformanceMonitor {
  trackMetrics(): void;
  reportToAnalytics(metrics: WebVitalsMetrics): void;
  alertOnThresholds(thresholds: PerformanceThresholds): void;
}
```

**Bundle Analyzer Integration**
- Webpack Bundle Analyzer for production builds
- Automated bundle size monitoring in CI/CD
- Performance budget enforcement

### 2. Enhanced Testing Infrastructure

**Testing Strategy Layers**
```typescript
// Unit Tests - Vitest
interface UnitTestConfig {
  coverage: {
    threshold: 80;
    include: ['src/**/*.{ts,tsx}'];
    exclude: ['**/*.test.{ts,tsx}', '**/*.stories.{ts,tsx}'];
  };
}

// Component Tests - React Testing Library
interface ComponentTestUtils {
  renderWithProviders(component: ReactElement): RenderResult;
  mockNextRouter(): void;
  mockIntersectionObserver(): void;
}

// E2E Tests - Playwright
interface E2ETestConfig {
  browsers: ['chromium', 'firefox', 'webkit'];
  baseURL: string;
  testDir: './e2e';
  retries: 2;
}
```

**Visual Regression Testing**
- Playwright screenshots for critical pages
- Automated visual diff detection
- Cross-browser compatibility testing

### 3. Security Enhancements

**Content Security Policy Implementation**
```typescript
interface CSPConfig {
  defaultSrc: ["'self'"];
  scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"];
  styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"];
  imgSrc: ["'self'", "data:", "https:"];
  fontSrc: ["'self'", "https://fonts.gstatic.com"];
  connectSrc: ["'self'", "https://formsubmit.co"];
}
```

**Input Validation Layer**
```typescript
// Enhanced Zod schemas for all forms
const ContactFormSchema = z.object({
  name: z.string().min(2).max(100).regex(/^[a-zA-Z\s]+$/),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
  honeypot: z.string().max(0), // Bot detection
});

interface SecurityValidator {
  sanitizeInput(input: string): string;
  validateCSRF(token: string): boolean;
  checkRateLimit(ip: string): boolean;
}
```

### 4. Modern Component Library

**Accessible Component Patterns**
```typescript
// Compound Component Pattern Example
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};

// Usage with full accessibility
<Tabs.Root defaultValue="tab1">
  <Tabs.List aria-label="Portfolio sections">
    <Tabs.Trigger value="tab1">Projects</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Skills</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">...</Tabs.Content>
</Tabs.Root>
```

**Design System Integration**
- Radix UI primitives for accessibility
- shadcn/ui components for consistent styling
- Custom theme tokens aligned with existing design
- Storybook documentation for all components

### 5. Advanced State Management

**Server State with TanStack Query**
```typescript
interface BlogPost {
  id: string;
  title: string;
  content: string;
  publishedAt: Date;
}

const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
```

**Optimistic Updates for Forms**
```typescript
const useContactForm = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: submitContactForm,
    onMutate: async (newContact) => {
      // Optimistic update
      await queryClient.cancelQueries(['contacts']);
      const previousContacts = queryClient.getQueryData(['contacts']);
      queryClient.setQueryData(['contacts'], old => [...old, newContact]);
      return { previousContacts };
    },
    onError: (err, newContact, context) => {
      queryClient.setQueryData(['contacts'], context.previousContacts);
    },
  });
};
```

## Data Models

### Performance Metrics Model
```typescript
interface PerformanceMetric {
  id: string;
  timestamp: Date;
  page: string;
  metrics: {
    lcp: number;
    fid: number;
    cls: number;
    inp: number;
    ttfb: number;
  };
  userAgent: string;
  connection: string;
}
```

### Analytics Event Model
```typescript
interface AnalyticsEvent {
  eventName: string;
  eventCategory: 'engagement' | 'performance' | 'error';
  eventLabel?: string;
  value?: number;
  customParameters?: Record<string, any>;
  timestamp: Date;
  sessionId: string;
  userId?: string;
}
```

### Error Tracking Model
```typescript
interface ErrorReport {
  id: string;
  message: string;
  stack: string;
  url: string;
  lineNumber: number;
  columnNumber: number;
  userAgent: string;
  timestamp: Date;
  userId?: string;
  additionalContext?: Record<string, any>;
}
```

## Error Handling

### Global Error Boundary
```typescript
class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to Sentry
    Sentry.captureException(error, {
      contexts: { errorInfo },
      tags: { component: 'GlobalErrorBoundary' },
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### API Error Handling
```typescript
interface APIError {
  status: number;
  message: string;
  code: string;
  details?: any;
}

const handleAPIError = (error: APIError) => {
  switch (error.status) {
    case 400:
      toast.error('Invalid request. Please check your input.');
      break;
    case 429:
      toast.error('Too many requests. Please try again later.');
      break;
    case 500:
      toast.error('Server error. Please try again.');
      Sentry.captureException(new Error(error.message));
      break;
    default:
      toast.error('An unexpected error occurred.');
  }
};
```

### Form Validation Error Handling
```typescript
const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContactForm(data);
      toast.success('Message sent successfully!');
    } catch (error) {
      if (error instanceof ValidationError) {
        error.fieldErrors.forEach(({ field, message }) => {
          setError(field, { message });
        });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    }
  };
};
```

## Testing Strategy

### Unit Testing with Vitest
```typescript
// Example test structure
describe('ContactForm', () => {
  it('should validate email format', async () => {
    const { result } = renderHook(() => useForm({
      resolver: zodResolver(ContactFormSchema)
    }));
    
    await act(async () => {
      result.current.setValue('email', 'invalid-email');
      await result.current.trigger('email');
    });
    
    expect(result.current.formState.errors.email).toBeDefined();
  });

  it('should submit form with valid data', async () => {
    const mockSubmit = vi.fn();
    render(<ContactForm onSubmit={mockSubmit} />);
    
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/message/i), 'Test message');
    await userEvent.click(screen.getByRole('button', { name: /send/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    });
  });
});
```

### E2E Testing with Playwright
```typescript
// Critical user journey tests
test.describe('Portfolio Navigation', () => {
  test('should navigate through all main sections', async ({ page }) => {
    await page.goto('/');
    
    // Test hero section
    await expect(page.getByRole('heading', { name: /building/i })).toBeVisible();
    
    // Test navigation
    await page.getByRole('link', { name: /portfolio/i }).click();
    await expect(page).toHaveURL('/portfolio');
    
    // Test project details
    await page.getByRole('link', { name: /financial data pipeline/i }).click();
    await expect(page.getByRole('heading', { name: /financial data pipeline/i })).toBeVisible();
  });

  test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/contact');
    
    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="message"]', 'This is a test message');
    
    await page.click('button[type="submit"]');
    
    await expect(page.getByText(/message sent successfully/i)).toBeVisible();
  });
});
```

### Performance Testing
```typescript
// Core Web Vitals monitoring
test('should meet Core Web Vitals thresholds', async ({ page }) => {
  await page.goto('/');
  
  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const vitals = {};
        
        entries.forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            vitals.lcp = entry.startTime;
          }
          if (entry.entryType === 'layout-shift') {
            vitals.cls = entry.value;
          }
        });
        
        resolve(vitals);
      }).observe({ entryTypes: ['largest-contentful-paint', 'layout-shift'] });
    });
  });
  
  expect(metrics.lcp).toBeLessThan(2500); // 2.5s threshold
  expect(metrics.cls).toBeLessThan(0.1);  // 0.1 threshold
});
```

## Implementation Phases

### Phase 1: Foundation (Week 1)
- Set up comprehensive testing infrastructure
- Implement performance monitoring
- Add security headers and CSP
- Configure CI/CD pipeline

### Phase 2: Component Enhancement (Week 2)
- Integrate Radix UI + shadcn/ui components
- Implement accessibility improvements
- Add Storybook documentation
- Create design system tokens

### Phase 3: Performance Optimization (Week 3)
- Implement TanStack Query for server state
- Add bundle analysis and optimization
- Implement advanced caching strategies
- Optimize Core Web Vitals

### Phase 4: Monitoring & Analytics (Week 4)
- Set up Sentry error tracking
- Implement Vercel Analytics
- Add custom performance dashboards
- Configure alerting systems

### Phase 5: Testing & Quality Assurance (Week 5)
- Achieve 80%+ test coverage
- Implement visual regression testing
- Add comprehensive E2E test suite
- Performance testing automation

## Technology Integration Points

### Existing Integrations to Maintain
- Framer Motion animations
- Tailwind CSS styling
- Next.js Image optimization
- React Hook Form + Zod validation
- Zustand state management

### New Integrations to Add
- **Radix UI**: Accessible component primitives
- **TanStack Query**: Server state management
- **Playwright**: E2E testing framework
- **Sentry**: Error tracking and monitoring
- **Storybook**: Component documentation
- **Bundle Analyzer**: Performance monitoring

### Configuration Updates Required
- **Next.js Config**: Security headers, performance optimizations
- **TypeScript Config**: Strict mode enhancements
- **Tailwind Config**: Design system tokens
- **ESLint Config**: Additional rules for accessibility and performance
- **Package.json**: New scripts for testing and monitoring

This design maintains the existing aesthetic and functionality while significantly enhancing the technical foundation, performance, security, and maintainability of the portfolio website.