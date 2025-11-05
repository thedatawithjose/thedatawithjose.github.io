import { NextRequest, NextResponse } from 'next/server';

// Configure for static export
export const dynamic = 'force-static';
export const revalidate = 300; // 5 minutes

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  uptime: number;
  checks: {
    database?: 'ok' | 'error';
    external_apis?: 'ok' | 'error';
    memory?: 'ok' | 'warning' | 'error';
    disk?: 'ok' | 'warning' | 'error';
  };
  performance?: {
    response_time: number;
    memory_usage: number;
  };
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  
  try {
    // Basic health checks
    const checks: HealthStatus['checks'] = {};
    
    // Memory check
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const memUsage = process.memoryUsage();
      const memUsageMB = memUsage.heapUsed / 1024 / 1024;
      
      if (memUsageMB > 500) {
        checks.memory = 'error';
      } else if (memUsageMB > 250) {
        checks.memory = 'warning';
      } else {
        checks.memory = 'ok';
      }
    }
    
    // Determine overall status
    const hasErrors = Object.values(checks).includes('error');
    const hasWarnings = Object.values(checks).includes('warning');
    
    let status: HealthStatus['status'] = 'healthy';
    if (hasErrors) {
      status = 'unhealthy';
    } else if (hasWarnings) {
      status = 'degraded';
    }
    
    const responseTime = Date.now() - startTime;
    
    const healthStatus: HealthStatus = {
      status,
      timestamp: new Date().toISOString(),
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      uptime: typeof process !== 'undefined' ? process.uptime() : 0,
      checks,
      performance: {
        response_time: responseTime,
        memory_usage: typeof process !== 'undefined' 
          ? Math.round(process.memoryUsage().heapUsed / 1024 / 1024) 
          : 0
      }
    };
    
    // Set appropriate status code
    const statusCode = status === 'healthy' ? 200 : status === 'degraded' ? 200 : 503;
    
    return NextResponse.json(healthStatus, { 
      status: statusCode,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
  } catch (error) {
    console.error('Health check failed:', error);
    
    const errorStatus: HealthStatus = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      uptime: 0,
      checks: {
        database: 'error'
      },
      performance: {
        response_time: Date.now() - startTime,
        memory_usage: 0
      }
    };
    
    return NextResponse.json(errorStatus, { 
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }
}

export async function HEAD(request: NextRequest): Promise<NextResponse> {
  // Simple ping endpoint for basic availability checks
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
}