import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, magnetId, source } = await request.json();

    // Validate input
    if (!email || !magnetId) {
      return NextResponse.json(
        { error: 'Email and magnet ID are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Log the lead magnet download (in production, save to database)
    console.log('Lead Magnet Download:', {
      email,
      magnetId,
      source,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    });

    // In production, you would:
    // 1. Save to database
    // 2. Add to email marketing list (Mailchimp, ConvertKit, etc.)
    // 3. Send welcome email with download link
    // 4. Track conversion in analytics

    // For now, simulate success
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Lead magnet request processed successfully',
      downloadUrl: getDownloadUrl(magnetId)
    });

  } catch (error) {
    console.error('Lead magnet API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function getDownloadUrl(magnetId: string): string {
  const downloadUrls: Record<string, string> = {
    'data-engineering-checklist': '/downloads/data-engineering-checklist.pdf',
    'roi-calculator': '/downloads/data-pipeline-roi-calculator.xlsx',
    'architecture-templates': '/downloads/data-stack-templates.zip'
  };

  return downloadUrls[magnetId] || '/downloads/default.pdf';
}