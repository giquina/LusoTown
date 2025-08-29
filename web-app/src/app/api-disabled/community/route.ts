import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import logger from '@/utils/logger';
import { COMMUNITY_STATS, CULTURAL_CENTERS } from '@/config/community-guidelines';
import { LUSOPHONE_CELEBRATIONS } from '@/config/lusophone-celebrations';

export const dynamic = 'force-dynamic';

// GET /api/community - Portuguese-speaking community information and stats
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'overview';
    const region = searchParams.get('region');
    const category = searchParams.get('category');
    
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies });

    switch (action) {
      case 'overview':
        // Get community overview with real-time stats
        const { data: memberCount } = await supabase
          .from('portuguese_profiles')
          .select('id', { count: 'exact', head: true })
          .eq('community_guidelines_accepted', true);

        const { data: eventCount } = await supabase
          .from('portuguese_events')
          .select('id', { count: 'exact', head: true })
          .eq('is_active', true)
          .gte('event_date', new Date().toISOString().split('T')[0]);

        const { data: businessCount } = await supabase
          .from('portuguese_businesses')
          .select('id', { count: 'exact', head: true })
          .eq('is_verified', true);

        return NextResponse.json({
          community_stats: {
            total_members: memberCount?.length || COMMUNITY_STATS.totalMembers,
            active_events: eventCount?.length || 0,
            verified_businesses: businessCount?.length || 0,
            cultural_centers: CULTURAL_CENTERS.length,
            university_partnerships: 8
          },
          cultural_context: 'portuguese-speaking-community',
          serving_regions: [
            'Portugal', 'Brazil', 'Cape Verde', 'Angola', 'Mozambique',
            'Guinea-Bissau', 'São Tomé and Príncipe', 'East Timor'
          ],
          uk_presence: {
            primary_areas: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Brighton'],
            established_since: '2023',
            community_focus: 'Cultural preservation and integration'
          }
        });

      case 'celebrations':
        // Get upcoming Portuguese cultural celebrations
        const currentMonth = new Date().getMonth() + 1;
        const upcomingCelebrations = LUSOPHONE_CELEBRATIONS.filter(celebration => {
          const celebrationMonth = parseInt(celebration.date.split('-')[1]);
          return celebrationMonth >= currentMonth;
        });

        return NextResponse.json({
          upcoming_celebrations: upcomingCelebrations.slice(0, 10),
          cultural_significance: 'Portuguese-speaking nations celebrations',
          participation_info: {
            how_to_participate: 'Join community events and cultural activities',
            volunteer_opportunities: 'Help organize celebrations in London',
            cultural_education: 'Learn about Portuguese heritage across 8 nations'
          }
        });

      case 'centers':
        // Get cultural centers information
        // Convert CULTURAL_CENTERS object to array for filtering
        let centers = Object.values(CULTURAL_CENTERS);
        
        if (region) {
          centers = centers.filter(center => 
            center.name?.toLowerCase().includes(region.toLowerCase())
          );
        }

        return NextResponse.json({
          cultural_centers: centers,
          total: centers.length,
          services: [
            'Portuguese language classes',
            'Cultural events and workshops',
            'Community support services',
            'Business networking',
            'Youth programs',
            'Heritage preservation'
          ]
        });

      case 'guidelines':
        // Get community guidelines and safety information
        return NextResponse.json({
          community_guidelines: {
            inclusivity: 'Welcome all Portuguese speakers from 8 lusophone nations',
            language_policy: 'Portuguese and English equally supported',
            cultural_respect: 'Celebrate diversity within Portuguese-speaking community',
            safety_first: 'Safe and supportive environment for all members',
            authenticity: 'Promote authentic Portuguese cultural experiences'
          },
          reporting: {
            safety_concerns: '/api/community/report',
            community_violations: '/api/community/report',
            harassment: 'Immediate action - contact moderators'
          },
          moderation: {
            response_time: '< 24 hours',
            volunteer_moderators: 'Community members from all regions',
            appeal_process: 'Fair and transparent review system'
          }
        });

      case 'regions':
        // Get Portuguese region information and community distribution
        const { data: regionStats } = await supabase
          .from('portuguese_profiles')
          .select('portuguese_region')
          .not('portuguese_region', 'is', null);

        const regionCounts = (regionStats || []).reduce((acc, profile) => {
          const region = profile.portuguese_region;
          acc[region] = (acc[region] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        return NextResponse.json({
          region_distribution: regionCounts,
          supported_regions: {
            'portugal': 'Continental Portugal and Islands',
            'brazil': 'All Brazilian states represented',
            'cape_verde': 'Cabo Verde community',
            'angola': 'Angolan heritage members',
            'mozambique': 'Mozambican cultural group',
            'guinea_bissau': 'Guinea-Bissau representation',
            'sao_tome_principe': 'São Tomé and Príncipe community',
            'east_timor': 'Timorese cultural connections'
          },
          cultural_diversity: 'United by Portuguese language, enriched by regional diversity'
        });

      default:
        return NextResponse.json({ error: 'Invalid action specified' }, { status: 400 });
    }

  } catch (error) {
    logger.error('Community API GET error', error, {
      area: 'community',
      action: 'community_api_get',
      culturalContext: 'portuguese'
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/community - Community interactions and reporting
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
    const { action, ...data } = body;

    switch (action) {
      case 'join_community':
        // Help user join the Portuguese-speaking community
        return handleJoinCommunity(supabase, user, data);

      case 'report_issue':
        // Report community safety or guideline violations
        return handleReportIssue(supabase, user, data);

      case 'volunteer_interest':
        // Express interest in volunteering for community activities
        return handleVolunteerInterest(supabase, user, data);

      case 'cultural_contribution':
        // Submit cultural content or event proposals
        return handleCulturalContribution(supabase, user, data);

      default:
        return NextResponse.json({ error: 'Invalid action specified' }, { status: 400 });
    }

  } catch (error) {
    logger.error('Community API POST error', error, {
      area: 'community',
      action: 'community_api_post',
      culturalContext: 'portuguese'
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper: Join Portuguese-speaking community
async function handleJoinCommunity(supabase: any, user: any, data: any) {
  const { 
    portuguese_region, 
    cultural_interests, 
    preferred_language = 'pt',
    community_goals,
    heritage_info 
  } = data;

  // Update user profile with community information
  const { error: updateError } = await supabase
    .from('portuguese_profiles')
    .upsert({
      id: user.id,
      portuguese_region,
      cultural_interests: cultural_interests || [],
      preferred_language,
      community_goals,
      heritage_info,
      community_guidelines_accepted: true,
      joined_community_at: new Date().toISOString()
    });

  if (updateError) {
    logger.error('Failed to join community', updateError, {
      area: 'community',
      action: 'join_community',
      userId: user.id
    });
    return NextResponse.json({ error: 'Failed to join community' }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: 'Welcome to the Portuguese-speaking community!',
    next_steps: [
      'Explore cultural events in your area',
      'Connect with community members',
      'Visit local Portuguese businesses',
      'Join cultural celebrations and activities'
    ]
  }, { status: 201 });
}

// Helper: Report community issues
async function handleReportIssue(supabase: any, user: any, data: any) {
  const { 
    issue_type, 
    description, 
    reported_user_id, 
    reported_content_id,
    urgency_level = 'normal'
  } = data;

  if (!issue_type || !description) {
    return NextResponse.json({ 
      error: 'Issue type and description are required' 
    }, { status: 400 });
  }

  const reportData = {
    reporter_id: user.id,
    issue_type,
    description,
    reported_user_id,
    reported_content_id,
    urgency_level,
    status: 'pending',
    created_at: new Date().toISOString()
  };

  const { data: report, error: reportError } = await supabase
    .from('community_reports')
    .insert(reportData)
    .select()
    .single();

  if (reportError) {
    logger.error('Community report creation failed', reportError, {
      area: 'community',
      action: 'create_report',
      userId: user.id,
      issueType: issue_type
    });
    return NextResponse.json({ error: 'Failed to submit report' }, { status: 500 });
  }

  logger.info('Community report submitted', {
    area: 'community',
    action: 'report_submitted',
    reportId: report.id,
    issueType: issue_type,
    urgency: urgency_level
  });

  return NextResponse.json({
    success: true,
    report_id: report.id,
    message: 'Report submitted successfully',
    expected_response: urgency_level === 'urgent' ? '< 2 hours' : '< 24 hours'
  }, { status: 201 });
}

// Helper: Volunteer interest
async function handleVolunteerInterest(supabase: any, user: any, data: any) {
  const { 
    volunteer_areas, 
    availability, 
    skills,
    experience,
    preferred_language = 'pt'
  } = data;

  const volunteerData = {
    user_id: user.id,
    volunteer_areas: volunteer_areas || [],
    availability,
    skills: skills || [],
    experience,
    preferred_language,
    status: 'interested',
    applied_at: new Date().toISOString()
  };

  const { error: volunteerError } = await supabase
    .from('community_volunteers')
    .upsert(volunteerData);

  if (volunteerError) {
    logger.error('Volunteer interest registration failed', volunteerError, {
      area: 'community',
      action: 'volunteer_interest',
      userId: user.id
    });
    return NextResponse.json({ error: 'Failed to register volunteer interest' }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: 'Thank you for your interest in volunteering!',
    next_steps: [
      'Community coordinator will contact you within 48 hours',
      'Background check may be required for certain roles',
      'Training sessions available for all volunteers',
      'Flexible scheduling to match your availability'
    ]
  }, { status: 201 });
}

// Helper: Cultural contribution
async function handleCulturalContribution(supabase: any, user: any, data: any) {
  const { 
    contribution_type, 
    title, 
    description,
    cultural_region,
    content_details,
    contact_info
  } = data;

  if (!contribution_type || !title || !description) {
    return NextResponse.json({ 
      error: 'Contribution type, title, and description are required' 
    }, { status: 400 });
  }

  const contributionData = {
    contributor_id: user.id,
    contribution_type,
    title,
    description,
    cultural_region,
    content_details,
    contact_info,
    status: 'submitted',
    submitted_at: new Date().toISOString()
  };

  const { error: contributionError } = await supabase
    .from('cultural_contributions')
    .insert(contributionData);

  if (contributionError) {
    logger.error('Cultural contribution submission failed', contributionError, {
      area: 'community',
      action: 'cultural_contribution',
      userId: user.id,
      contributionType: contribution_type
    });
    return NextResponse.json({ error: 'Failed to submit contribution' }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: 'Cultural contribution submitted successfully!',
    review_process: {
      timeline: '5-7 business days',
      criteria: 'Cultural authenticity and community value',
      feedback: 'You will receive feedback regardless of decision',
      recognition: 'Accepted contributions featured in community events'
    }
  }, { status: 201 });
}