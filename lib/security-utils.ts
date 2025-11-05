import DOMPurify from 'isomorphic-dompurify';

// Security validation utilities
export class SecurityValidator {
  
  // Input sanitization
  static sanitizeInput(input: string): string {
    if (!input || typeof input !== 'string') {
      return '';
    }
    
    // Remove potential XSS vectors
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true,
    }).trim();
  }
  
  // HTML sanitization for rich content
  static sanitizeHTML(html: string): string {
    if (!html || typeof html !== 'string') {
      return '';
    }
    
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
      ALLOW_DATA_ATTR: false,
    });
  }
  
  // Email validation
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const sanitized = this.sanitizeInput(email);
    return emailRegex.test(sanitized) && sanitized.length <= 254;
  }
  
  // Phone validation
  static isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const sanitized = this.sanitizeInput(phone).replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(sanitized);
  }
  
  // URL validation
  static isValidURL(url: string): boolean {
    try {
      const sanitized = this.sanitizeInput(url);
      const urlObj = new URL(sanitized);
      return ['http:', 'https:'].includes(urlObj.protocol);
    } catch {
      return false;
    }
  }
  
  // SQL injection prevention
  static preventSQLInjection(input: string): string {
    const sanitized = this.sanitizeInput(input);
    const sqlKeywords = [
      'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'CREATE', 'ALTER',
      'EXEC', 'EXECUTE', 'UNION', 'SCRIPT', 'JAVASCRIPT', 'VBSCRIPT'
    ];
    
    let cleaned = sanitized;
    sqlKeywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      cleaned = cleaned.replace(regex, '');
    });
    
    return cleaned;
  }
  
  // CSRF token validation
  static generateCSRFToken(): string {
    return crypto.randomUUID();
  }
  
  static validateCSRFToken(token: string, expectedToken: string): boolean {
    return token === expectedToken && token.length > 0;
  }
  
  // Rate limiting helpers
  static createRateLimitKey(ip: string, endpoint: string): string {
    return `rate_limit:${ip}:${endpoint}`;
  }
  
  // Content validation
  static validateContentLength(content: string, maxLength: number = 1000): boolean {
    const sanitized = this.sanitizeInput(content);
    return sanitized.length <= maxLength;
  }
  
  // File upload validation
  static validateFileType(filename: string, allowedTypes: string[]): boolean {
    const extension = filename.toLowerCase().split('.').pop();
    return extension ? allowedTypes.includes(extension) : false;
  }
  
  static validateFileSize(size: number, maxSizeMB: number = 5): boolean {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return size <= maxSizeBytes;
  }
  
  // Password strength validation
  static validatePasswordStrength(password: string): {
    isValid: boolean;
    score: number;
    feedback: string[];
  } {
    const feedback: string[] = [];
    let score = 0;
    
    if (password.length >= 8) score += 1;
    else feedback.push('Password should be at least 8 characters long');
    
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Password should contain lowercase letters');
    
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Password should contain uppercase letters');
    
    if (/\d/.test(password)) score += 1;
    else feedback.push('Password should contain numbers');
    
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    else feedback.push('Password should contain special characters');
    
    return {
      isValid: score >= 4,
      score,
      feedback,
    };
  }
  
  // Honeypot validation (bot detection)
  static validateHoneypot(honeypotValue: string): boolean {
    // Honeypot should be empty (filled by bots)
    return !honeypotValue || honeypotValue.trim() === '';
  }
  
  // IP validation
  static isValidIP(ip: string): boolean {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
  }
  
  // Environment validation
  static isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }
  
  static isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  }
}

// Security headers utility
export class SecurityHeaders {
  static getSecurityHeaders() {
    return {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    };
  }
  
  static addSecurityHeaders(headers: Headers) {
    const securityHeaders = this.getSecurityHeaders();
    Object.entries(securityHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });
  }
}

// Audit logging
export class SecurityAudit {
  static logSecurityEvent(event: {
    type: 'rate_limit' | 'invalid_origin' | 'blocked_agent' | 'csrf_failure' | 'validation_error';
    ip: string;
    userAgent?: string;
    endpoint?: string;
    details?: any;
  }) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      ...event,
    };
    
    if (SecurityValidator.isDevelopment()) {
      console.log('[Security Event]', logEntry);
    }
    
    // In production, send to monitoring service
    if (SecurityValidator.isProduction()) {
      // Send to Sentry, DataDog, or similar
      // This would be implemented based on your monitoring setup
    }
  }
}