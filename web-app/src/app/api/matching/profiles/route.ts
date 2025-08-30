import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Extract query parameters
    const ageMin = parseInt(searchParams.get('age_min') || '18')
    const ageMax = parseInt(searchParams.get('age_max') || '65')
    const maxDistance = parseFloat(searchParams.get('max_distance') || '25')
    const minCompatibility = parseFloat(searchParams.get('min_compatibility') || '0')
    const culturalBackground = searchParams.get('cultural_background')?.split(',') || []
    const interests = searchParams.get('interests')?.split(',') || []
    const languageProficiency = searchParams.get('language_proficiency')
    const limit = parseInt(searchParams.get('limit') || '10')
    const userId = searchParams.get('user_id') // Current user to exclude from results

    // Build the query
    let query = supabase
      .from('user_profiles')
      .select(`
        id,
        name,
        age,
        bio,
        location_city,
        profile_image,
        photos,
        cultural_background,
        interests,
        language_skills,
        cultural_values,
        education,
        occupation,
        looking_for,
        profile_completeness,
        is_verified,
        last_active,
        safety_score,
        created_at
      `)
      .eq('is_active', true)
      .eq('looking_for_matches', true)
      .gte('age', ageMin)
      .lte('age', ageMax)
      .gte('profile_completeness', 70) // Minimum profile completeness for matching
      .gte('safety_score', 6) // Minimum safety score
      .limit(limit)

    // Exclude current user
    if (userId) {
      query = query.neq('id', userId)
    }

    // Cultural background filter
    if (culturalBackground.length > 0) {
      query = query.overlaps('cultural_background', culturalBackground)
    }

    // Interests filter
    if (interests.length > 0) {
      query = query.overlaps('interests', interests)
    }

    // Language proficiency filter
    if (languageProficiency) {
      query = query.eq('language_skills->portuguese', languageProficiency)
    }

    // Execute query
    const { data, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 })
    }

    // Transform data for frontend
    const profiles = data?.map(profile => ({
      id: profile.id,
      name: profile.name,
      age: profile.age,
      location: {
        city: profile.location_city,
        distance: null // Would calculate if user location provided
      },
      profileImage: profile.profile_image,
      bio: profile.bio || 'No bio provided',
      culturalBackground: profile.cultural_background || [],
      interests: profile.interests || [],
      languageSkills: profile.language_skills || {
        portuguese: 'intermediate',
        english: 'intermediate'
      },
      culturalValues: profile.cultural_values || [],
      education: profile.education,
      occupation: profile.occupation,
      lookingFor: profile.looking_for || [],
      profileCompleteness: profile.profile_completeness || 0,
      isVerified: profile.is_verified || false,
      lastActive: profile.last_active || profile.created_at,
      photos: profile.photos || [],
      safetyScore: profile.safety_score || 5
    })) || []

    return NextResponse.json({
      profiles,
      total: profiles.length,
      hasMore: profiles.length === limit
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['name', 'age', 'bio', 'cultural_background']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate age range
    if (body.age < 18 || body.age > 80) {
      return NextResponse.json(
        { error: 'Age must be between 18 and 80' },
        { status: 400 }
      )
    }

    // Calculate profile completeness
    const profileCompleteness = calculateProfileCompleteness(body)
    
    // Calculate initial safety score
    const safetyScore = calculateSafetyScore(body)

    // Prepare profile data
    const profileData = {
      name: body.name,
      age: body.age,
      bio: body.bio,
      location_city: body.location?.city || 'London',
      location_coordinates: body.location?.coordinates ? 
        `POINT(${body.location.coordinates[0]} ${body.location.coordinates[1]})` : null,
      profile_image: body.profile_image,
      photos: body.photos || [],
      cultural_background: body.cultural_background || [],
      interests: body.interests || [],
      language_skills: body.language_skills || {
        portuguese: 'intermediate',
        english: 'intermediate'
      },
      cultural_values: body.cultural_values || [],
      education: body.education,
      occupation: body.occupation,
      looking_for: body.looking_for || [],
      profile_completeness: profileCompleteness,
      is_verified: false,
      safety_score: safetyScore,
      looking_for_matches: body.looking_for_matches !== false,
      is_active: true
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .insert([profileData])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 })
    }

    return NextResponse.json({ profile: data }, { status: 201 })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function calculateProfileCompleteness(profile: any): number {
  let completeness = 0
  const totalFields = 10

  // Required fields (20 points each)
  if (profile.name) completeness += 20
  if (profile.age) completeness += 20
  if (profile.bio && profile.bio.length >= 50) completeness += 20

  // Important fields (10 points each)
  if (profile.cultural_background && profile.cultural_background.length > 0) completeness += 10
  if (profile.interests && profile.interests.length >= 3) completeness += 10
  if (profile.language_skills) completeness += 10

  // Optional fields (5 points each)
  if (profile.education) completeness += 5
  if (profile.occupation) completeness += 5
  if (profile.photos && profile.photos.length >= 2) completeness += 5
  if (profile.looking_for && profile.looking_for.length > 0) completeness += 5

  return Math.min(100, completeness)
}

function calculateSafetyScore(profile: any): number {
  let score = 5 // Base score

  // Positive indicators
  if (profile.bio && profile.bio.length >= 100 && profile.bio.length <= 500) score += 1
  if (profile.interests && profile.interests.length >= 3) score += 1
  if (profile.education) score += 1
  if (profile.occupation) score += 1
  
  // Negative indicators (check for spam/inappropriate content)
  const suspiciousWords = ['money', 'investment', 'business opportunity', 'sugar daddy', 'escort']
  const bioLower = (profile.bio || '').toLowerCase()
  
  if (suspiciousWords.some(word => bioLower.includes(word))) {
    score -= 3
  }

  if (profile.photos && profile.photos.length > 10) {
    score -= 1 // Too many photos might indicate fake profile
  }

  return Math.max(1, Math.min(10, score))
}