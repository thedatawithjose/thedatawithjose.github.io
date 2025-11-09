import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// NOTE: This middleware only runs in development mode
// For static exports (output: 'export'), middleware is not executed in production
// Security is handled by the hosting platform (GitHub Pages, Vercel, etc.)

// Rate limiting store (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

// Security configuration
const SECURITY_CONFIG = {
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // requests per window
  },
  blockedUserAgents: [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
  ],
  allowedOrigins: [
    'https://datawithjose.tech',
    'https://www.datawithjose.tech',
    'https://thedatawithjose.github.io',
    'https://www.thedatawithjose.github.io',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
};

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = SECURITY_CONFIG.rateLimit.windowMs;
  const maxRequests = SECURITY_CONFIG.rateLimit.maxRequests;
  
  const record = rateLimitMap.get(ip);
  
  if (!record || now - record.lastReset > windowMs) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }
  
  if (record.count >= maxRequests) {
    return true;
  }
  
  record.count++;
  return false;
}

function isBlockedUserAgent(userAgent: string): boolean {
  return SECURITY_CONFIG.blockedUserAgents.some(pattern => 
    pattern.test(userAgent)
  );
}

function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  // Allow requests without origin (direct navigation)
  if (!origin && !referer) {
    return true;
  }
  
  const requestOrigin = origin || (referer ? new URL(referer).origin : '');
  
  return SECURITY_CONFIG.allowedOrigins.some(allowed => 
    requestOrigin === allowed || requestOrigin.endsWith('.vercel.app')
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  const ip = getClientIP(request);
  
  // Skip middleware for static assets and Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/_') ||
    pathname.includes('.') && !pathname.startsWith('/api/')
  ) {
    return NextResponse.next();
  }
  
  // Block malicious user agents
  if (isBlockedUserAgent(userAgent)) {
    console.log(`Blocked request from suspicious user agent: ${userAgent}`);
    return new NextResponse('Forbidden', { status: 403 });
  }
  
  // Rate limiting
  if (isRateLimited(ip)) {
    console.log(`Rate limit exceeded for IP: ${ip}`);
    return new NextResponse('Too Many Requests', { 
      status: 429,
      headers: {
        'Retry-After': '900', // 15 minutes
      },
    });
  }
  
  // Origin validation for API routes
  if (pathname.startsWith('/api/') && request.method !== 'GET') {
    if (!validateOrigin(request)) {
      console.log(`Invalid origin for API request: ${request.headers.get('origin')}`);
      return new NextResponse('Forbidden', { status: 403 });
    }
  }
  
  // Create response with security headers
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Request-ID', crypto.randomUUID());
  response.headers.set('X-Robots-Tag', 'index, follow');
  
  // Add rate limit headers
  const rateLimitRecord = rateLimitMap.get(ip);
  if (rateLimitRecord) {
    const remaining = Math.max(0, SECURITY_CONFIG.rateLimit.maxRequests - rateLimitRecord.count);
    const resetTime = rateLimitRecord.lastReset + SECURITY_CONFIG.rateLimit.windowMs;
    
    response.headers.set('X-RateLimit-Limit', SECURITY_CONFIG.rateLimit.maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('X-RateLimit-Reset', Math.ceil(resetTime / 1000).toString());
  }
  
  // Log security events
  if (process.env.NODE_ENV === 'development') {
    console.log(`Security middleware: ${request.method} ${pathname} from ${ip}`);
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sw.js (service worker)
     * - robots.txt, sitemap.xml (SEO files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sw.js|robots.txt|sitemap.xml|images|videos).*)',
  ],
};