import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate the data
    if (!data.name || typeof data.duration !== 'number') {
      return NextResponse.json(
        { error: 'Invalid resource timing data' },
        { status: 400 }
      );
    }

    // In development, log slow/large resources
    if (process.env.NODE_ENV === 'development') {
      console.log('[Resource Timing]', {
        resource: data.name.split('/').pop() || data.name,
        size: data.size ? `${(data.size / 1024).toFixed(1)}KB` : 'N/A',
        duration: `${data.duration.toFixed(1)}ms`,
        type: data.type,
        url: data.url,
      });
    }

    // In production, you might want to:
    // 1. Track slow resources for optimization
    // 2. Alert on unusually large resources
    // 3. Monitor third-party resource performance
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing resource timing data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}