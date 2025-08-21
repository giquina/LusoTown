import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { preferences, userId } = await request.json();

    // Validate input
    if (!preferences || typeof preferences !== 'object') {
      return NextResponse.json(
        { error: 'Preferences object is required' },
        { status: 400 }
      );
    }

    // In a real implementation, this would:
    // 1. Authenticate the user
    // 2. Update the database with new preferences
    // 3. Handle any email service provider updates

    console.log('Updating email preferences:', {
      userId: userId || 'anonymous',
      preferences,
      timestamp: new Date().toISOString(),
    });

    // Mock database update
    // await updateUserEmailPreferences(userId, preferences);

    // Mock response
    return NextResponse.json({
      success: true,
      message: 'Email preferences updated successfully',
      preferences,
      updatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Email preferences update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // In a real implementation, authenticate and fetch user preferences
    // For now, return mock data
    
    const mockPreferences = {
      events: true,
      matches: true,
      community: true,
      marketing: false,
      newsletter: true
    };

    return NextResponse.json({
      success: true,
      preferences: mockPreferences,
      userId: userId || 'anonymous'
    });

  } catch (error) {
    console.error('Get email preferences error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}