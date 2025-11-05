import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

// Enhanced validation schemas with security measures
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .regex(/^[a-zA-ZÀ-ÿ\u00C0-\u017F\s'-]+$/, 'Name contains invalid characters')
    .transform(val => sanitizeInput(val)),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email cannot exceed 100 characters')
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
    .transform(val => val.toLowerCase().trim()),
  
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject cannot exceed 100 characters')
    .regex(/^[^<>{}[\]\\\/]*$/, 'Subject contains invalid characters')
    .transform(val => sanitizeInput(val)),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message cannot exceed 2000 characters')
    .regex(/^[^<>{}[\]\\]*$/, 'Message contains invalid characters')
    .transform(val => sanitizeInput(val)),
  
  budget: z
    .string()
    .optional()
    .transform(val => val ? sanitizeInput(val) : val),
  
  timeline: z
    .string()
    .optional()
    .transform(val => val ? sanitizeInput(val) : val),
  
  // Honeypot field for bot detection
  honeypot: z
    .string()
    .max(0, 'Bot detected')
    .optional(),
  
  // CSRF token
  csrfToken: z
    .string()
    .min(1, 'Security token required'),
  
  // Timestamp for rate limiting
  timestamp: z
    .number()
    .min(Date.now() - 300000, 'Form expired') // 5 minutes
    .max(Date.now() + 60000, 'Invalid timestamp'), // 1 minute future buffer
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Input sanitization function
export function sanitizeInput(input: string): string {
  if (typeof window !== 'undefined') {
    // Client-side sanitization
    return DOMPurify.sanitize(input, { 
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true,
    }).trim();
  }
  
  // Server-side basic sanitization
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>{}[\]\\\/]/g, '') // Remove dangerous characters
    .trim();
}

// Rate limiting for form submissions
const submissionStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(identifier: string, maxSubmissions: number = 3, windowMs: number = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const current = submissionStore.get(identifier);
  
  if (!current || now > current.resetTime) {
    submissionStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return false; // Not rate limited
  }
  
  if (current.count >= maxSubmissions) {
    return true; // Rate limited
  }
  
  current.count++;
  submissionStore.set(identifier, current);
  return false;
}

// CSRF token generation and validation
export function generateCSRFToken(): string {
  if (typeof window !== 'undefined') {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  
  // Fallback for server-side
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function validateCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken && token.length >= 32;
}

// Spam detection patterns
const SPAM_PATTERNS = [
  /\b(viagra|cialis|casino|poker|lottery|winner|congratulations)\b/i,
  /\b(click here|visit now|act now|limited time)\b/i,
  /\b(make money|earn \$|free money|get rich)\b/i,
  /\b(weight loss|lose weight|diet pills)\b/i,
  /(http[s]?:\/\/[^\s]+){3,}/i, // Multiple URLs
  /(.)\1{10,}/i, // Repeated characters
];

export function detectSpam(text: string): boolean {
  return SPAM_PATTERNS.some(pattern => pattern.test(text));
}

// Email validation with disposable email detection
const DISPOSABLE_EMAIL_DOMAINS = [
  '10minutemail.com',
  'tempmail.org',
  'guerrillamail.com',
  'mailinator.com',
  'throwaway.email',
];

export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return DISPOSABLE_EMAIL_DOMAINS.includes(domain);
}

// Content analysis for suspicious patterns
export function analyzeContent(data: Partial<ContactFormData>): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  
  // Check for spam in message
  if (data.message && detectSpam(data.message)) {
    issues.push('Message contains suspicious content');
  }
  
  // Check for disposable email
  if (data.email && isDisposableEmail(data.email)) {
    issues.push('Disposable email addresses are not allowed');
  }
  
  // Check for suspicious patterns in name
  if (data.name && /^[a-z]+\d+$/i.test(data.name)) {
    issues.push('Name appears to be generated');
  }
  
  // Check for URL in name or subject
  if (data.name && /https?:\/\//.test(data.name)) {
    issues.push('URLs are not allowed in name field');
  }
  
  if (data.subject && /https?:\/\//.test(data.subject)) {
    issues.push('URLs are not allowed in subject field');
  }
  
  return {
    isValid: issues.length === 0,
    issues,
  };
}

// Security headers for form submission
export const SECURITY_HEADERS = {
  'Content-Type': 'application/json',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
} as const;