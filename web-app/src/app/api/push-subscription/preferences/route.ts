import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// Lusophone cultural notification preferences management
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { subscription, preferences, language } = body;

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json(
        { error: 'Invalid subscription data' },
        { status: 400 }
      );
    }

    if (!preferences) {
      return NextResponse.json(
        { error: 'Preferences data required' },
        { status: 400 }
      );
    }

    // Update Lusophone cultural notification preferences
    console.log('[Push Preferences] Updating Lusophone cultural preferences:', {
      endpoint: subscription.endpoint,
      preferences: {
        culturalEvents: preferences.culturalEvents,
        communityMatches: preferences.communityMatches,
        businessUpdates: preferences.businessUpdates,
        festivalReminders: preferences.festivalReminders,
        fadoNights: preferences.fadoNights,
        portugueseFestas: preferences.portugueseFestas,
        networkingEvents: preferences.networkingEvents,
        restaurantSpecials: preferences.restaurantSpecials,
        communityNews: preferences.communityNews,
        emergencyAlerts: preferences.emergencyAlerts
      },
      language,
      updatedAt: new Date().toISOString()
    });

    // In production, update in database
    /*
    const { data, error } = await supabase
      .from('push_subscriptions')
      .update({
        preferences,
        language,
        updated_at: new Date().toISOString()
      })
      .eq('endpoint', subscription.endpoint)
      .select();

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }
    */

    // Send confirmation based on language preference
    const confirmationMessage = language === 'pt' 
      ? 'Preferências de notificações portuguesas atualizadas com sucesso'
      : 'Lusophone notification preferences updated successfully';

    return NextResponse.json({
      success: true,
      message: confirmationMessage,
      preferences: preferences,
      language: language
    });

  } catch (error) {
    console.error('[Push Preferences] Error updating preferences:', error);
    return NextResponse.json(
      {
        error: 'Failed to update preferences',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');

    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint parameter required' },
        { status: 400 }
      );
    }

    // Get preferences from database
    console.log('[Push Preferences] Fetching preferences for endpoint:', endpoint);

    // In production, fetch from database
    /*
    const { data, error } = await supabase
      .from('push_subscriptions')
      .select('preferences, language')
      .eq('endpoint', endpoint)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }
    */

    // Mock data for development
    const mockPreferences = {
      culturalEvents: true,
      communityMatches: true,
      businessUpdates: false,
      festivalReminders: true,
      fadoNights: true,
      portugueseFestas: true,
      networkingEvents: true,
      restaurantSpecials: false,
      communityNews: true,
      emergencyAlerts: true
    };

    return NextResponse.json({
      success: true,
      preferences: mockPreferences,
      language: 'en'
    });

  } catch (error) {
    console.error('[Push Preferences] Error fetching preferences:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch preferences',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}