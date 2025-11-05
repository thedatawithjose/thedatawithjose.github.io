import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate the data
    if (!data.name || typeof data.value !== 'number') {
      return NextResponse.json(
        { error: 'Invalid custom metric data' },
        { status: 400 }
      );
    }

    // In development, log custom metrics
    if (process.env.NODE_ENV === 'development') {
      console.log('[Custom Metric]', {
        name: data.name,
        value: data.value,
        additionalData: data.additionalData,
        url: data.url,
        timestamp: new Date(data.timestamp).toISOString(),
      });
    }

    // In production, store custom metrics for analysis
    if (process.env.NODE_ENV === 'production') {
      // TODO: Implement actual storage
      // await storeCustomMetric(data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing custom metric:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}