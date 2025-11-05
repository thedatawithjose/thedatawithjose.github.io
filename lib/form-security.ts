import { SecurityValidator } from './security-utils';

export interface FormSecurityConfig {
  minFillTime: number; // Minimum time to fill form (ms)
  maxFillTime: number; // Maximum time to fill form (ms)
  minInteractions: number; // Minimum user interactions
  honeypotFields: string[]; // Honeypot field names
  rateLimitWindow: number; // Rate limit window (ms)
  maxSubmissions: number; // Max submissions per window
}

export const DEFAULT_FORM_CONFIG: FormSecurityConfig = {
  minFillTime: 3000, // 3 seconds
  maxFillTime: 30 * 60 * 1000, // 30 minutes
  minInteractions: 5,
  honeypotFields: ['honeypot', 'website', 'phone_number'],
  rateLimitWindow: 15 * 60 * 1000, // 15 minutes
  maxSubmissions: 3,
};

export class FormSecurityValidator {
  private config: FormSecurityConfig;
  private submissionTimes: Map<string, number[]> = new Map();

  constructor(config: Partial<FormSecurityConfig> = {}) {
    this.config = { ...DEFAULT_FORM_CONFIG, ...config };
  }

  /**
   * Validates form submission security
   */
  validateSubmission(data: {
    formData: any;
    fillTime: number;
    interactionCount: number;
    userIP: string;
    userAgent: string;
  }): {
    isValid: boolean;
    errors: string[];
    riskScore: number;
  } {
    const errors: string[] = [];
    let riskScore = 0;

    // 1. Honeypot validation
    const honeypotResult = this.validateHoneypots(data.formData);
    if (!honeypotResult.isValid) {
      errors.push('Bot detected: Honeypot fields filled');
      riskScore += 50;
    }

    // 2. Timing validation
    const timingResult = this.validateTiming(data.fillTime);
    if (!timingResult.isValid) {
      errors.push(timingResult.error || 'Invalid form timing');
      riskScore += timingResult.riskScore;
    }

    // 3. Interaction validation
    const interactionResult = this.validateInteractions(data.interactionCount);
    if (!interactionResult.isValid) {
      errors.push(interactionResult.error || 'Insufficient user interactions');
      riskScore += interactionResult.riskScore;
    }

    // 4. Rate limiting
    const rateLimitResult = this.validateRateLimit(data.userIP);
    if (!rateLimitResult.isValid) {
      errors.push('Rate limit exceeded');
      riskScore += 30;
    }

    // 5. User agent validation
    const userAgentResult = this.validateUserAgent(data.userAgent);
    if (!userAgentResult.isValid) {
      errors.push('Suspicious user agent detected');
      riskScore += 25;
    }

    // 6. Input validation
    const inputResult = this.validateInputs(data.formData);
    if (!inputResult.isValid) {
      errors.push(...inputResult.errors);
      riskScore += inputResult.riskScore;
    }

    return {
      isValid: errors.length === 0 && riskScore < 50,
      errors,
      riskScore: Math.min(riskScore, 100),
    };
  }

  /**
   * Validates honeypot fields
   */
  private validateHoneypots(formData: any): { isValid: boolean } {
    for (const field of this.config.honeypotFields) {
      if (formData[field] && formData[field].trim() !== '') {
        return { isValid: false };
      }
    }
    return { isValid: true };
  }

  /**
   * Validates form fill timing
   */
  private validateTiming(fillTime: number): {
    isValid: boolean;
    error?: string;
    riskScore: number;
  } {
    if (fillTime < this.config.minFillTime) {
      return {
        isValid: false,
        error: 'Form filled too quickly',
        riskScore: 40,
      };
    }

    if (fillTime > this.config.maxFillTime) {
      return {
        isValid: false,
        error: 'Form session expired',
        riskScore: 10,
      };
    }

    return { isValid: true, riskScore: 0 };
  }

  /**
   * Validates user interactions
   */
  private validateInteractions(interactionCount: number): {
    isValid: boolean;
    error?: string;
    riskScore: number;
  } {
    if (interactionCount < this.config.minInteractions) {
      return {
        isValid: false,
        error: `Insufficient interactions (${interactionCount}/${this.config.minInteractions})`,
        riskScore: 30,
      };
    }

    return { isValid: true, riskScore: 0 };
  }

  /**
   * Validates rate limiting
   */
  private validateRateLimit(userIP: string): { isValid: boolean } {
    const now = Date.now();
    const submissions = this.submissionTimes.get(userIP) || [];
    
    // Clean old submissions
    const recentSubmissions = submissions.filter(
      time => now - time < this.config.rateLimitWindow
    );

    if (recentSubmissions.length >= this.config.maxSubmissions) {
      return { isValid: false };
    }

    // Add current submission
    recentSubmissions.push(now);
    this.submissionTimes.set(userIP, recentSubmissions);

    return { isValid: true };
  }

  /**
   * Validates user agent
   */
  private validateUserAgent(userAgent: string): { isValid: boolean } {
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /curl/i,
      /wget/i,
      /python/i,
      /java/i,
    ];

    return {
      isValid: !suspiciousPatterns.some(pattern => pattern.test(userAgent)),
    };
  }

  /**
   * Validates form inputs
   */
  private validateInputs(formData: any): {
    isValid: boolean;
    errors: string[];
    riskScore: number;
  } {
    const errors: string[] = [];
    let riskScore = 0;

    // Email validation
    if (formData.email && !SecurityValidator.isValidEmail(formData.email)) {
      errors.push('Invalid email format');
      riskScore += 10;
    }

    // Check for suspicious content
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /vbscript:/i,
      /onload=/i,
      /onerror=/i,
      /onclick=/i,
    ];

    const textFields = ['name', 'subject', 'message'];
    for (const field of textFields) {
      if (formData[field]) {
        const content = formData[field].toString();
        if (suspiciousPatterns.some(pattern => pattern.test(content))) {
          errors.push(`Suspicious content in ${field}`);
          riskScore += 20;
        }
      }
    }

    // Check for excessive length
    if (formData.message && formData.message.length > 5000) {
      errors.push('Message too long');
      riskScore += 5;
    }

    return {
      isValid: errors.length === 0,
      errors,
      riskScore,
    };
  }

  /**
   * Generates security report
   */
  generateSecurityReport(data: any): {
    timestamp: string;
    riskLevel: 'low' | 'medium' | 'high';
    checks: Array<{
      name: string;
      status: 'pass' | 'fail' | 'warning';
      details: string;
    }>;
  } {
    const validation = this.validateSubmission(data);
    
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (validation.riskScore > 70) riskLevel = 'high';
    else if (validation.riskScore > 30) riskLevel = 'medium';

    const checks = [
      {
        name: 'Honeypot Fields',
        status: this.validateHoneypots(data.formData).isValid ? 'pass' : 'fail',
        details: 'Bot detection via hidden fields',
      },
      {
        name: 'Form Timing',
        status: this.validateTiming(data.fillTime).isValid ? 'pass' : 'fail',
        details: `Fill time: ${(data.fillTime / 1000).toFixed(1)}s`,
      },
      {
        name: 'User Interactions',
        status: this.validateInteractions(data.interactionCount).isValid ? 'pass' : 'fail',
        details: `Interactions: ${data.interactionCount}`,
      },
      {
        name: 'Rate Limiting',
        status: this.validateRateLimit(data.userIP).isValid ? 'pass' : 'fail',
        details: 'Submission frequency check',
      },
      {
        name: 'Input Validation',
        status: this.validateInputs(data.formData).isValid ? 'pass' : 'fail',
        details: 'Content security validation',
      },
    ] as Array<{ name: string; status: 'pass' | 'fail' | 'warning'; details: string }>;

    return {
      timestamp: new Date().toISOString(),
      riskLevel,
      checks,
    };
  }
}

// Export singleton instance
export const formSecurityValidator = new FormSecurityValidator();