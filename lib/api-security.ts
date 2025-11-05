import { NextRequest, NextResponse } from 'next/server';
import { SECURITY_HEADERS, isSuspiciousRequest, sanitizeFormData } from './security';

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

interface SecurityOptions {
  rateLimit?: {
    windowMs: number;
    maxRequests: number;
  };
  requireAuth?: boolean;
  allowedMethods?: string[];
  validateInput?: boolean;
}

const DEFAULT_OPTIONS: SecurityOptions = {
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 20,
  },
  requireAuth: false,
  allowedMethods: ['GET', 'POST'],
  validateInput: true,
};

/**
 * Security middleware for API routes
 */
export function withSecurity(
  handler: (req: NextRequest) => Promise<NextResponse> | NextResponse,
  options: SecurityOptions = {}
) {
  const config = { ...DEFAULT_OPTIONS, ...options };

  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      // Apply security headers
      const response = await applySecurityChecks(req, handler, config);
      
      // Add security headers to response
      Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
      
      return response;
    } catch (error) {
      console.error('[API Security] Error:', error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  };
}

async function applySecurityChecks(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse> | NextResponse,
  config: SecurityOptions
): Promise<NextResponse> {
  const userAgent = req.headers.get('user-agent') || '';
  const referer = req.headers.get('referer') || '';
  const clientIP = getClientIP(req);

  // 1. Method validation
  if (config.allowedMethods && !config.allowedMethods.includes(req.method)) {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }

  // 2. Suspicious request detection
  if (isSuspiciousRequest(userAgent, referer)) {
    console.log(`[API Security] Blocked suspicious request from ${clientIP}`);
    return new NextResponse('Access Denied', { status: 403 });
  }

  // 3. Rate limiting
  if (config.rateLimit && isRateLimited(clientIP, config.rateLimit)) {
    console.log(`[API Security] Rate limit exceeded for ${clientIP}`);
    return new NextResponse('Too Many Requests', { 
      status: 429,
      headers: {
        'Retry-After': Math.ceil(config.rateLimit.windowMs / 1000).toString(),
      },
    });
  }

  // 4. Input validation for POST requests
  if (req.method === 'POST' && config.validateInput) {
    try {
      const body = await req.json();
      const sanitizedBody = sanitizeFormData(body);
      
      // Create new request with sanitized body
      const sanitizedReq = new NextRequest(req.url, {
        method: req.method,
        headers: req.headers,
        body: JSON.stringify(sanitizedBody),
      });
      
      return await handler(sanitizedReq);
    } catch (error) {
      return new NextResponse('Invalid Request Body', { status: 400 });
    }
  }

  // 5. Execute handler
  return await handler(req);
}

function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

function isRateLimited(ip: string, config: { windowMs: number; maxRequests: number }): boolean {
  const now = Date.now();
  const key = `api:${ip}`;
  
  const current = rateLimitStore.get(key);
  
  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return false;
  }
  
  if (current.count >= config.maxRequests) {
    return true;
  }
  
  current.count++;
  rateLimitStore.set(key, current);
  return false;
}

/**
 * CORS middleware for API routes
 */
export function withCORS(
  handler: (req: NextRequest) => Promise<NextResponse> | NextResponse,
  allowedOrigins: string[] = ['http://localhost:3000']
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const origin = req.headers.get('origin');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      const isAllowedOrigin = !origin || allowedOrigins.includes(origin);
      
      if (!isAllowedOrigin) {
        return new NextResponse('CORS Error', { status: 403 });
      }
      
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': origin || '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }
    
    // Execute handler and add CORS headers
    const response = await handler(req);
    
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }
    
    return response;
  };
}

/**
 * Input validation middleware
 */
export function validateRequestBody<T>(
  schema: (data: any) => T,
  handler: (req: NextRequest, validatedData: T) => Promise<NextResponse> | NextResponse
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      const body = await req.json();
      const validatedData = schema(body);
      
      return await handler(req, validatedData);
    } catch (error) {
      console.error('[API Validation] Error:', error);
      return new NextResponse('Invalid Request Data', { status: 400 });
    }
  };
}

/**
 * Logging middleware for API routes
 */
export function withLogging(
  handler: (req: NextRequest) => Promise<NextResponse> | NextResponse,
  logLevel: 'info' | 'warn' | 'error' = 'info'
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const startTime = Date.now();
    const clientIP = getClientIP(req);
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    
    try {
      const response = await handler(req);
      const duration = Date.now() - startTime;
      
      if (logLevel === 'info' || process.env.NODE_ENV === 'development') {
        console.log(`[API] ${req.method} ${req.url} - ${response.status} - ${duration}ms - ${clientIP}`);
      }
      
      return response;
    } catch (error) {
      const duration = Date.now() - startTime;
      
      console.error(`[API Error] ${req.method} ${req.url} - ${duration}ms - ${clientIP}:`, error);
      
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  };
}