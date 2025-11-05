import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send to FormSubmit (free service)
    const formData = new FormData();
    formData.append('email', email);
    formData.append('_subject', 'New Newsletter Subscription - Data Engineering');
    formData.append('message', `New newsletter subscription from: ${email}`);
    formData.append('source', 'website_newsletter');
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');

    const formSubmitResponse = await fetch('https://formsubmit.co/datawithjose@outlook.com', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!formSubmitResponse.ok) {
      throw new Error('Failed to submit newsletter subscription');
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter!' 
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}