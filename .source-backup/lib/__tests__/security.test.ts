import { describe, it, expect, vi } from 'vitest';
import {
  sanitizeText,
  validateInput,
  sanitizeFormData,
  validateEmail,
  generateSecureToken,
  isSuspiciousRequest,
} from '../security';

describe('Security Utils', () => {
  describe('sanitizeText', () => {
    it('removes control characters', () => {
      const input = 'Hello\x00\x1F\x7FWorld';
      const result = sanitizeText(input);
      expect(result).toBe('HelloWorld');
    });

    it('normalizes whitespace', () => {
      const input = 'Hello    \t\n   World';
      const result = sanitizeText(input);
      expect(result).toBe('Hello World');
    });

    it('trims input', () => {
      const input = '   Hello World   ';
      const result = sanitizeText(input);
      expect(result).toBe('Hello World');
    });

    it('limits length to 1000 characters', () => {
      const input = 'a'.repeat(1500);
      const result = sanitizeText(input);
      expect(result).toHaveLength(1000);
    });

    it('handles empty input', () => {
      expect(sanitizeText('')).toBe('');
      expect(sanitizeText(null as any)).toBe('');
      expect(sanitizeText(undefined as any)).toBe('');
    });
  });

  describe('validateInput', () => {
    it('validates name pattern', () => {
      expect(validateInput('John Doe', 'name')).toBe(true);
      expect(validateInput('José María', 'name')).toBe(true);
      expect(validateInput("O'Connor", 'name')).toBe(true);
      expect(validateInput('John-Smith', 'name')).toBe(true);
      
      expect(validateInput('John123', 'name')).toBe(false);
      expect(validateInput('John@Doe', 'name')).toBe(false);
      expect(validateInput('J', 'name')).toBe(false); // Too short
    });

    it('validates email pattern', () => {
      expect(validateInput('test@example.com', 'email')).toBe(true);
      expect(validateInput('user.name+tag@domain.co.uk', 'email')).toBe(true);
      
      expect(validateInput('invalid-email', 'email')).toBe(false);
      expect(validateInput('test@', 'email')).toBe(false);
      expect(validateInput('@example.com', 'email')).toBe(false);
    });

    it('rejects inputs with blocked patterns', () => {
      expect(validateInput('<script>alert("xss")</script>', 'name')).toBe(false);
      expect(validateInput('javascript:alert(1)', 'name')).toBe(false);
      expect(validateInput('onclick=alert(1)', 'name')).toBe(false);
    });

    it('handles invalid input types', () => {
      expect(validateInput('', 'name')).toBe(false);
      expect(validateInput(null as any, 'name')).toBe(false);
      expect(validateInput(123 as any, 'name')).toBe(false);
    });
  });

  describe('sanitizeFormData', () => {
    it('sanitizes string values', () => {
      const input = {
        name: '  John Doe  ',
        email: 'test@example.com',
        message: 'Hello\x00World',
      };
      
      const result = sanitizeFormData(input);
      
      expect(result.name).toBe('John Doe');
      expect(result.email).toBe('test@example.com');
      expect(result.message).toBe('HelloWorld');
    });

    it('handles number values', () => {
      const input = {
        age: 25,
        score: 1000001, // Should be clamped
        negative: -1000001, // Should be clamped
      };
      
      const result = sanitizeFormData(input);
      
      expect(result.age).toBe(25);
      expect(result.score).toBe(1000000);
      expect(result.negative).toBe(-1000000);
    });

    it('handles boolean values', () => {
      const input = {
        isActive: true,
        isDisabled: false,
        truthy: true,
        falsy: false,
      };
      
      const result = sanitizeFormData(input);
      
      expect(result.isActive).toBe(true);
      expect(result.isDisabled).toBe(false);
      expect(result.truthy).toBe(true);
      expect(result.falsy).toBe(false);
    });

    it('handles array values', () => {
      const input = {
        tags: ['tag1', 'tag2', '  tag3  '],
        numbers: [1, 2, 3],
      };
      
      const result = sanitizeFormData(input);
      
      expect(result.tags).toEqual(['tag1', 'tag2', 'tag3']);
      expect(result.numbers).toEqual([1, 2, 3]);
    });

    it('limits array length', () => {
      const input = {
        manyTags: Array(150).fill('tag'),
      };
      
      const result = sanitizeFormData(input);
      
      expect(result.manyTags).toHaveLength(100);
    });

    it('skips unknown types', () => {
      const input = {
        validString: 'hello',
        invalidObject: { nested: 'object' },
        invalidFunction: () => {},
      };
      
      const result = sanitizeFormData(input);
      
      expect(result.validString).toBe('hello');
      expect(result.invalidObject).toBeUndefined();
      expect(result.invalidFunction).toBeUndefined();
    });
  });

  describe('validateEmail', () => {
    it('validates correct email formats', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'firstname.lastname@company.com',
      ];
      
      validEmails.forEach(email => {
        const result = validateEmail(email);
        expect(result.isValid).toBe(true);
        expect(result.reason).toBeUndefined();
      });
    });

    it('rejects invalid email formats', () => {
      const invalidEmails = [
        'invalid-email',
        'test@',
        '@example.com',
        'test..test@example.com',
        '.test@example.com',
        'test.@example.com',
      ];
      
      invalidEmails.forEach((email) => {
        const result = validateEmail(email);
        expect(result.isValid).toBe(false);
        expect(result.reason).toBeDefined();
      });
    });

    it('rejects emails that are too long', () => {
      const longEmail = 'a'.repeat(250) + '@example.com';
      const result = validateEmail(longEmail);
      
      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('Email too long');
    });

    it('rejects emails with long local part', () => {
      const longLocalPart = 'a'.repeat(65) + '@example.com';
      const result = validateEmail(longLocalPart);
      
      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('Email local part too long');
    });

    it('rejects emails with suspicious characters', () => {
      const suspiciousEmails = [
        'test<script>@example.com',
        'test>alert@example.com',
      ];
      
      suspiciousEmails.forEach(email => {
        const result = validateEmail(email);
        expect(result.isValid).toBe(false);
      });
    });
  });

  describe('generateSecureToken', () => {
    it('generates token of specified length', () => {
      const token16 = generateSecureToken(16);
      const token32 = generateSecureToken(32);
      
      expect(token16).toHaveLength(32); // 16 bytes = 32 hex chars
      expect(token32).toHaveLength(64); // 32 bytes = 64 hex chars
    });

    it('generates different tokens each time', () => {
      const token1 = generateSecureToken();
      const token2 = generateSecureToken();
      
      expect(token1).not.toBe(token2);
    });

    it('generates tokens with valid hex characters', () => {
      const token = generateSecureToken(16);
      const hexPattern = /^[0-9a-f]+$/;
      
      expect(hexPattern.test(token)).toBe(true);
    });
  });

  describe('isSuspiciousRequest', () => {
    it('detects suspicious user agents', () => {
      const suspiciousAgents = [
        'curl/7.68.0',
        'python-requests/2.25.1',
        'Scrapy/2.5.0',
      ];
      
      suspiciousAgents.forEach(agent => {
        expect(isSuspiciousRequest(agent)).toBe(true);
      });
    });

    it('allows legitimate user agents', () => {
      const legitimateAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      ];
      
      legitimateAgents.forEach(agent => {
        expect(isSuspiciousRequest(agent)).toBe(false);
      });
    });

    it('detects suspicious referers', () => {
      // Mock environment variable
      const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;
      process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
      
      const legitimateAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
      
      expect(isSuspiciousRequest(legitimateAgent, 'https://malicious-site.com')).toBe(true);
      expect(isSuspiciousRequest(legitimateAgent, 'https://example.com/page')).toBe(false);
      
      // Restore environment
      process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
    });
  });
});