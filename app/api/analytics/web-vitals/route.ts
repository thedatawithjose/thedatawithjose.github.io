import { NextRequest, NextResponse } from 'next/server';
import { withSecurity, withLogging } from '../../../../lib/api-security';

async function handleWebVitals(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate the data
    if (!data.name || typeof data.value !== 'number') {
      return NextResponse.json(
        { error: 'Invalid web vitals data' },
        { status: 400 }
      );
    }

    // In development, just log the data
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals API]', {
        metric: data.name,
        value: data.value,
        rating: data.rating,
        url: data.url,
        timestamp: new Date(data.timestamp).toISOString(),
      });
    }

    // In production, you would typically:
    // 1. Store in a database (PostgreSQL, MongoDB, etc.)
    // 2. Send to analytics service (Google Analytics, Mixpanel, etc.)
    // 3. Send to monitoring service (DataDog, New Relic, etc.)
    
    // Example: Store in a simple log file or database
    if (process.env.NODE_ENV === 'production') {
      // TODO: Implement actual storage
      // await storeWebVitalsMetric(data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing web vitals data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Apply security middleware
export const POST = withLogging(
  withSecurity(handleWebVitals, {
    rateLimit: { windowMs: 60 * 1000, maxRequests: 30 }, // 30 requests per minute
    allowedMethods: ['POST'],
  })
);

// Helper function for future database storage
async function storeWebVitalsMetric(data: any) {
  // Example implementation:
  // const db = await getDatabase();
  // await db.collection('web_vitals').insertOne({
  //   ...data,
  //   createdAt: new Date(),
  // });
}