import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import logger from '@/utils/logger';

export const dynamic = 'force-dynamic';

// GET /api/matching - Simple Portuguese cultural compatibility matching
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const matchType = searchParams.get('type') || 'cultural'; // cultural, friendship, language_exchange
    const limit = parseInt(searchParams.get('limit') || '10');
    const region = searchParams.get('region');
    const interests = searchParams.get('interests')?.split(',') || [];
    
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies });

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Get current user's profile and preferences
    const { data: currentUser, error: userError } = await supabase
      .from('portuguese_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (userError || !currentUser) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Build matching query based on simple cultural compatibility
    let query = supabase
      .from('portuguese_profiles')
      .select(`
        id,
        first_name,
        last_name,
        preferred_language,
        portuguese_region,
        cultural_preferences,
        community_contributions,
        heritage_verified,
        cultural_interests,
        visibility_settings,
        created_at
      `)
      .neq('id', user.id) // Exclude current user
      .eq('community_guidelines_accepted', true);

    // Apply visibility filter
    query = query.or('visibility_settings->profile.eq.public,visibility_settings->profile.eq.community');

    // Filter by Portuguese region if specified
    if (region && region !== 'all') {
      query = query.eq('portuguese_region', region);
    }

    // Filter by cultural interests overlap
    if (interests.length > 0) {
      query = query.overlaps('cultural_interests', interests);
    }

    // Apply matching type filters
    switch (matchType) {
      case 'cultural':
        // Focus on cultural heritage and interests
        query = query
          .not('cultural_interests', 'is', null)
          .gte('community_contributions', 1);
        break;
        
      case 'language_exchange':
        // Focus on users interested in language exchange
        query = query.contains('cultural_interests', ['language_learning']);
        break;
        
      case 'friendship':
        // General friendship matching
        query = query
          .not('cultural_preferences', 'is', null)
          .gte('community_contributions', 0);
        break;
    }

    const { data: potentialMatches, error: matchError } = await query
      .order('community_contributions', { ascending: false })
      .limit(limit * 3); // Get more than needed for compatibility scoring

    if (matchError) {
      logger.error('Failed to fetch potential matches', matchError, {
        area: 'matching',
        action: 'fetch_matches',
        culturalContext: 'portuguese',
        userId: user.id,
        matchType
      });
      return NextResponse.json({ error: 'Failed to find matches' }, { status: 500 });
    }

    // Calculate simple compatibility scores
    const matchesWithScores = (potentialMatches || []).map(match => {
      const compatibility = calculateCulturalCompatibility(currentUser, match);
      return {
        ...match,
        compatibility_score: compatibility.score,
        compatibility_reasons: compatibility.reasons,
        match_type: matchType
      };
    });

    // Sort by compatibility and limit results
    const sortedMatches = matchesWithScores
      .sort((a, b) => b.compatibility_score - a.compatibility_score)
      .slice(0, limit);

    return NextResponse.json({
      matches: sortedMatches.map(match => ({
        id: match.id,
        first_name: match.first_name,
        last_name: match.last_name,
        portuguese_region: match.portuguese_region,
        cultural_interests: match.cultural_interests,
        community_contributions: match.community_contributions,
        heritage_verified: match.heritage_verified,
        compatibility_score: match.compatibility_score,
        compatibility_reasons: match.compatibility_reasons,
        match_type: match.match_type,
        member_since: match.created_at
      })),
      total: sortedMatches.length,
      user_preferences: {
        region: currentUser.portuguese_region,
        interests: currentUser.cultural_interests,
        match_type: matchType
      },
      culturalContext: 'portuguese-speaking-community'
    });

  } catch (error) {
    logger.error('Matching API GET error', error, {
      area: 'matching',
      action: 'matching_api_get',
      culturalContext: 'portuguese'
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/matching - Express interest in a match
export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies });

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { target_user_id, message, match_type = 'cultural' } = body;

    if (!target_user_id) {
      return NextResponse.json({ error: 'Target user ID is required' }, { status: 400 });
    }

    // Check if users already have a connection
    const { data: existingConnection } = await supabase
      .from('cultural_connections')
      .select('id, status')
      .or(`and(user_id.eq.${user.id},target_user_id.eq.${target_user_id}),and(user_id.eq.${target_user_id},target_user_id.eq.${user.id})`)
      .single();

    if (existingConnection) {
      return NextResponse.json({ 
        error: 'Connection already exists with this user',
        status: existingConnection.status 
      }, { status: 400 });
    }

    // Get target user to verify they exist and are active
    const { data: targetUser, error: targetError } = await supabase
      .from('portuguese_profiles')
      .select('id, first_name, visibility_settings')
      .eq('id', target_user_id)
      .single();

    if (targetError || !targetUser) {
      return NextResponse.json({ error: 'Target user not found' }, { status: 404 });
    }

    // Check if target user allows community connections
    const visibilitySettings = targetUser.visibility_settings || {};
    if (visibilitySettings.profile === 'private') {
      return NextResponse.json({ 
        error: 'This user is not accepting new connections' 
      }, { status: 403 });
    }

    // Create connection request
    const connectionData = {
      user_id: user.id,
      target_user_id,
      match_type,
      message: message || 'Hi! I would like to connect with you through the Portuguese-speaking community.',
      status: 'pending',
      created_at: new Date().toISOString()
    };

    const { data: connection, error: connectionError } = await supabase
      .from('cultural_connections')
      .insert(connectionData)
      .select(`
        *,
        target_user:portuguese_profiles!target_user_id(
          id,
          first_name,
          last_name,
          portuguese_region
        )
      `)
      .single();

    if (connectionError) {
      logger.error('Cultural connection creation failed', connectionError, {
        area: 'matching',
        action: 'create_connection',
        culturalContext: 'portuguese',
        userId: user.id,
        targetUserId: target_user_id
      });
      return NextResponse.json({ 
        error: 'Failed to create connection request' 
      }, { status: 500 });
    }

    // In a real implementation, send notification to target user
    logger.info('Cultural connection request created', {
      area: 'matching',
      action: 'connection_requested',
      culturalContext: 'portuguese',
      userId: user.id,
      targetUserId: target_user_id,
      matchType: match_type
    });

    return NextResponse.json({
      success: true,
      connection: {
        id: connection.id,
        status: connection.status,
        match_type: connection.match_type,
        target_user: {
          first_name: connection.target_user.first_name,
          region: connection.target_user.portuguese_region
        }
      },
      message: 'Connection request sent successfully'
    }, { status: 201 });

  } catch (error) {
    logger.error('Matching API POST error', error, {
      area: 'matching',
      action: 'matching_api_post',
      culturalContext: 'portuguese'
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper function to calculate simple cultural compatibility
function calculateCulturalCompatibility(userA: any, userB: any): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // Region compatibility (30% weight)
  if (userA.portuguese_region === userB.portuguese_region) {
    score += 30;
    reasons.push(`Both from ${userA.portuguese_region}`);
  } else if (userA.portuguese_region && userB.portuguese_region) {
    score += 15;
    reasons.push('Different Portuguese regions - great for cultural exchange');
  }

  // Cultural interests overlap (40% weight)
  const userAInterests = userA.cultural_interests || [];
  const userBInterests = userB.cultural_interests || [];
  const commonInterests = userAInterests.filter(interest => userBInterests.includes(interest));
  
  if (commonInterests.length > 0) {
    const interestScore = Math.min(40, commonInterests.length * 10);
    score += interestScore;
    reasons.push(`Shared interests: ${commonInterests.join(', ')}`);
  }

  // Community involvement (20% weight)
  const avgContributions = (userA.community_contributions + userB.community_contributions) / 2;
  if (avgContributions >= 5) {
    score += 20;
    reasons.push('Both active community members');
  } else if (avgContributions >= 2) {
    score += 15;
    reasons.push('Community contributors');
  }

  // Heritage verification bonus (10% weight)
  if (userA.heritage_verified && userB.heritage_verified) {
    score += 10;
    reasons.push('Both heritage verified');
  }

  // Ensure score is between 0-100
  score = Math.min(100, Math.max(0, score));

  return { score, reasons };
}