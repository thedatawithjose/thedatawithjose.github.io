import DOMPurify from 'isomorphic-dompurify';

// Security configuration
export const SECURITY_CONFIG = {
  // Input validation patterns
  patterns: {
    name: /^[a-zA-ZÀ-ÿ\s\-']{2,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[\+]?[1-9][\d]{0,15}$/,
    url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
    alphanumeric: /^[a-zA-Z0-9\s]{1,100}$/,
  },
  
  // Content Security Policy
  csp: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      "'unsafe-inline'", // Required for Next.js
      "'unsafe-eval'", // Required for development
      "https://va.vercel-scripts.com",
      "https://cdnjs.cloudflare.com",
      "https://polyfill.io",
    ],
    styleSrc: [
      "'self'",
      "'unsafe-inline'", // Required for Tailwind CSS
      "https://fonts.googleapis.com",
      "https://cdnjs.cloudflare.com",
    ],
    imgSrc: ["'self'", "data:", "https:", "blob:"],
    fontSrc: [
      "'self'",
      "https://fonts.gstatic.com",
      "https://cdnjs.cloudflare.com",
    ],
    connectSrc: [
      "'self'",
      "https://formsubmit.co",
      "https://va.vercel-scripts.com",
    ],
    mediaSrc: ["'self'", "data:"],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    formAction: ["'self'", "https://formsubmit.co"],
    frameAncestors: ["'none'"],
  },
  
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // requests per window
    apiMaxRequests: 20, // API requests per window
  },
  
  // Blocked patterns
  blockedPatterns: [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /vbscript:/gi,
    /onload=/gi,
    /onerror=/gi,
    /onclick=/gi,
    /onmouseover=/gi,
  ],
};

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHtml(dirty: string): string {
  if (typeof window === 'undefined') {
    // Server-side: basic sanitization
    return dirty
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/on\w+=/gi, '');
  }
  
  // Client-side: use DOMPurify
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
  });
}

/**
 * Sanitize plain text input
 */
export function sanitizeText(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .substring(0, 1000); // Limit length
}

/**
 * Validate input against security patterns
 */
export function validateInput(input: string, type: keyof typeof SECURITY_CONFIG.patterns): boolean {
  if (!input || typeof input !== 'string') return false;
  
  const pattern = SECURITY_CONFIG.patterns[type];
  if (!pattern) return false;
  
  // Check for blocked patterns first
  const hasBlockedPattern = SECURITY_CONFIG.blockedPatterns.some(blocked => 
    blocked.test(input)
  );
  
  if (hasBlockedPattern) return false;
  
  return pattern.test(input.trim());
}

/**
 * Sanitize and validate form data
 */
export function sanitizeFormData(data: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeText(value);
    } else if (typeof value === 'number') {
      sanitized[key] = Math.max(-1000000, Math.min(1000000, value));
    } else if (typeof value === 'boolean') {
      sanitized[key] = Boolean(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.slice(0, 100).map(item => 
        typeof item === 'string' ? sanitizeText(item) : item
      );
    } else {
      // Skip unknown types
      continue;
    }
  }
  
  return sanitized;
}

/**
 * Generate Content Security Policy header value
 */
export function generateCSP(): string {
  const directives = Object.entries(SECURITY_CONFIG.csp).map(([key, values]) => {
    const directive = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `${directive} ${values.join(' ')}`;
  });
  
  return directives.join('; ');
}

/**
 * Check if request is from a suspicious source
 */
export function isSuspiciousRequest(userAgent: string, referer?: string): boolean {
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python/i,
    /php/i,
  ];
  
  // Check user agent
  if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
    return true;
  }
  
  // Check for missing or suspicious referer
  if (referer && !referer.includes(process.env.NEXT_PUBLIC_SITE_URL || 'localhost')) {
    return true;
  }
  
  return false;
}

/**
 * Generate secure random token
 */
export function generateSecureToken(length: number = 32): string {
  if (typeof window !== 'undefined' && window.crypto) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  
  // Fallback for server-side
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Hash sensitive data (client-side only for privacy)
 */
export async function hashData(data: string): Promise<string> {
  if (typeof window === 'undefined') {
    throw new Error('Hashing should only be done client-side');
  }
  
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Validate email format with additional security checks
 */
export function validateEmail(email: string): { isValid: boolean; reason?: string } {
  if (!email || typeof email !== 'string') {
    return { isValid: false, reason: 'Email is required' };
  }
  
  const trimmedEmail = email.trim().toLowerCase();
  
  // Basic format check
  if (!SECURITY_CONFIG.patterns.email.test(trimmedEmail)) {
    return { isValid: false, reason: 'Invalid email format' };
  }
  
  // Length check
  if (trimmedEmail.length > 254) {
    return { isValid: false, reason: 'Email too long' };
  }
  
  // Domain part checks
  const [localPart, domainPart] = trimmedEmail.split('@');
  
  if (localPart.length > 64) {
    return { isValid: false, reason: 'Email local part too long' };
  }
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /\.{2,}/, // Multiple consecutive dots
    /^\./, // Starts with dot
    /\.$/, // Ends with dot
    /[<>]/g, // Angle brackets
  ];
  
  if (suspiciousPatterns.some(pattern => pattern.test(trimmedEmail))) {
    return { isValid: false, reason: 'Email contains invalid characters' };
  }
  
  return { isValid: true };
}

/**
 * Security headers for API responses
 */
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
} as const;