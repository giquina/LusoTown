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
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const radius = parseFloat(searchParams.get('radius') || '25') // Default 25km
    const businessType = searchParams.get('type')
    const city = searchParams.get('city')
    const culturalFocus = searchParams.get('cultural_focus')
    const minRating = parseFloat(searchParams.get('min_rating') || '0')
    const priceRange = searchParams.get('price_range')
    const features = searchParams.get('features')?.split(',') || []
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Use the PostgreSQL function for basic search with location
    if (lat && lng) {
      const { data, error } = await supabase.rpc('find_portuguese_businesses_basic', {
        user_lat: parseFloat(lat),
        user_lng: parseFloat(lng),
        radius_km: radius,
        business_type_filter: businessType,
        min_rating: minRating,
        limit_results: limit
      })

      if (error) {
        console.error('Database error:', error)
        return NextResponse.json({ error: 'Database query failed' }, { status: 500 })
      }

      return NextResponse.json({
        businesses: data || [],
        total: data?.length || 0,
        hasMore: (data?.length || 0) === limit
      })
    }

    // Build the query for non-location searches
    let query = supabase
      .from('portuguese_businesses')
      .select(`
        id,
        name,
        name_portuguese,
        business_type,
        description,
        short_description,
        address,
        postcode,
        city,
        borough,
        coordinates,
        phone,
        email,
        website_url,
        facebook_url,
        instagram_url,
        portuguese_specialties,
        cultural_focus,
        serves_portuguese_community,
        portuguese_spoken,
        opening_hours,
        price_range,
        accepts_cards,
        delivery_available,
        takeaway_available,
        parking_available,
        wheelchair_accessible,
        is_active,
        is_verified,
        is_premium,
        average_rating,
        total_reviews,
        view_count,
        created_at,
        updated_at
      `)
      .eq('is_active', true)
      .range(offset, offset + limit - 1)
      .order('is_premium', { ascending: false })
      .order('is_verified', { ascending: false })
      .order('average_rating', { ascending: false })

    // Apply filters
    if (businessType) {
      query = query.eq('business_type', businessType)
    }

    if (city) {
      query = query.ilike('city', `%${city}%`)
    }

    if (culturalFocus) {
      query = query.eq('cultural_focus', culturalFocus)
    }

    if (minRating > 0) {
      query = query.gte('average_rating', minRating)
    }

    if (priceRange) {
      query = query.eq('price_range', priceRange)
    }

    // Feature filters
    if (features.includes('delivery')) {
      query = query.eq('delivery_available', true)
    }
    if (features.includes('takeaway')) {
      query = query.eq('takeaway_available', true)
    }
    if (features.includes('verified')) {
      query = query.eq('is_verified', true)
    }
    if (features.includes('premium')) {
      query = query.eq('is_premium', true)
    }

    // Text search
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,` +
        `name_portuguese.ilike.%${search}%,` +
        `description.ilike.%${search}%,` +
        `portuguese_specialties.cs.{${search}},` +
        `address.ilike.%${search}%`
      )
    }

    const { data, error, count } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 })
    }

    // Transform coordinates for client
    const businesses = data?.map(business => ({
      ...business,
      coordinates: business.coordinates ? 
        [business.coordinates.coordinates[0], business.coordinates.coordinates[1]] : 
        null
    })) || []

    return NextResponse.json({
      businesses,
      total: count || businesses.length,
      hasMore: businesses.length === limit
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
    const requiredFields = ['name', 'business_type', 'address', 'postcode']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Get coordinates from address if not provided
    let coordinates = body.coordinates
    if (!coordinates && body.address && body.postcode) {
      try {
        // Use a geocoding service to get coordinates
        // This is a placeholder - implement actual geocoding
        coordinates = await geocodeAddress(`${body.address}, ${body.postcode}, UK`)
      } catch (geocodeError) {
        console.warn('Geocoding failed:', geocodeError)
      }
    }

    // Prepare business data
    const businessData = {
      name: body.name,
      name_portuguese: body.name_portuguese,
      business_type: body.business_type,
      description: body.description,
      short_description: body.short_description,
      address: body.address,
      postcode: body.postcode,
      city: body.city || 'London',
      borough: body.borough,
      coordinates: coordinates ? `POINT(${coordinates[0]} ${coordinates[1]})` : null,
      phone: body.phone,
      email: body.email,
      website_url: body.website_url,
      facebook_url: body.facebook_url,
      instagram_url: body.instagram_url,
      portuguese_specialties: body.portuguese_specialties || [],
      cultural_focus: body.cultural_focus || 'portugal',
      serves_portuguese_community: body.serves_portuguese_community !== false,
      portuguese_spoken: body.portuguese_spoken !== false,
      palop_friendly: body.palop_friendly !== false,
      opening_hours: body.opening_hours || {},
      price_range: body.price_range || '££',
      accepts_cards: body.accepts_cards !== false,
      delivery_available: body.delivery_available === true,
      takeaway_available: body.takeaway_available === true,
      parking_available: body.parking_available === true,
      wheelchair_accessible: body.wheelchair_accessible === true,
      business_established_year: body.business_established_year,
      search_keywords: body.search_keywords || [],
      seo_description: body.seo_description
    }

    const { data, error } = await supabase
      .from('portuguese_businesses')
      .insert([businessData])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to create business' }, { status: 500 })
    }

    // Transform coordinates for client
    const business = {
      ...data,
      coordinates: data.coordinates ? 
        [data.coordinates.coordinates[0], data.coordinates.coordinates[1]] : 
        null
    }

    return NextResponse.json({ business }, { status: 201 })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Simple geocoding function placeholder
async function geocodeAddress(address: string): Promise<[number, number] | null> {
  // This should use a real geocoding service like Google Maps Geocoding API
  // For now, return null to indicate geocoding not available
  return null
}