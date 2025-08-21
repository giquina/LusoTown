import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, types } = await request.json();

    // Validate input
    if (!email || !types || !Array.isArray(types)) {
      return NextResponse.json(
        { error: 'Email and types are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // In a real implementation, this would update the database
    // For now, we'll simulate the API call
    console.log('Unsubscribing email:', email, 'from types:', types);

    // Mock database update
    // await updateEmailPreferences(email, types, false);

    // Log the unsubscribe action for analytics
    console.log('Email unsubscribed:', {
      email,
      types,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from selected email types',
      email,
      unsubscribedTypes: types
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Handle GET requests for email validation or status checking
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { error: 'Email parameter is required' },
      { status: 400 }
    );
  }

  try {
    // In a real implementation, check database for current preferences
    // For now, return mock data
    return NextResponse.json({
      email,
      currentPreferences: {
        marketing: true,
        events: true,
        matches: true,
        community: true,
        newsletter: true
      },
      subscriptionStatus: 'active'
    });

  } catch (error) {
    console.error('Get unsubscribe status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}