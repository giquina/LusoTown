import { NextRequest, NextResponse } from 'next/server'
import { UNIVERSITY_PARTNERSHIPS, UNIVERSITY_STATS, getUniversityById, getUniversitiesByRegion } from '@/config/universities'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const region = searchParams.get('region')
    const partnershipLevel = searchParams.get('partnership_level')
    const withPortugueseProgram = searchParams.get('with_portuguese_program')
    
    let universities = UNIVERSITY_PARTNERSHIPS
    
    // Filter by region
    if (region) {
      universities = getUniversitiesByRegion(region)
    }
    
    // Filter by partnership level
    if (partnershipLevel) {
      universities = universities.filter(uni => uni.partnershipLevel === partnershipLevel)
    }
    
    // Filter by Portuguese program availability
    if (withPortugueseProgram === 'true') {
      universities = universities.filter(uni => uni.hasPortugueseProgram)
    }
    
    return NextResponse.json({
      success: true,
      data: {
        universities,
        stats: UNIVERSITY_STATS,
        filters: {
          region,
          partnershipLevel,
          withPortugueseProgram: withPortugueseProgram === 'true'
        }
      }
    })
    
  } catch (error) {
    console.error('Universities API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch university partnerships' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, universityId, ...data } = body
    
    if (!action || !universityId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: action and universityId' },
        { status: 400 }
      )
    }
    
    const university = getUniversityById(universityId)
    if (!university) {
      return NextResponse.json(
        { success: false, error: 'University not found' },
        { status: 404 }
      )
    }
    
    switch (action) {
      case 'join_events':
        return handleJoinEvents(universityId, data)
      case 'create_study_group':
        return handleCreateStudyGroup(universityId, data)
      case 'register_interest':
        return handleRegisterInterest(universityId, data)
      case 'sync_calendar':
        return handleSyncCalendar(universityId, data)
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        )
    }
    
  } catch (error) {
    console.error('Universities API POST error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process university partnership request' 
      },
      { status: 500 }
    )
  }
}

// Handle event joining functionality
async function handleJoinEvents(universityId: string, data: any) {
  const { eventIds, userId } = data
  
  if (!eventIds || !Array.isArray(eventIds) || !userId) {
    return NextResponse.json(
      { success: false, error: 'Missing eventIds or userId' },
      { status: 400 }
    )
  }
  
  // In a real implementation, this would integrate with university calendar systems
  // For now, we'll simulate the response
  const joinedEvents = eventIds.map((eventId: string) => ({
    eventId,
    universityId,
    userId,
    joinedAt: new Date().toISOString(),
    status: 'confirmed'
  }))
  
  return NextResponse.json({
    success: true,
    data: {
      message: `Successfully joined ${eventIds.length} events`,
      joinedEvents,
      calendarIntegration: {
        google: true,
        outlook: true,
        ical: true
      }
    }
  })
}

// Handle study group creation
async function handleCreateStudyGroup(universityId: string, data: any) {
  const { 
    subject, 
    description, 
    language, 
    maxMembers, 
    meetingSchedule, 
    level,
    creatorId 
  } = data
  
  if (!subject || !description || !language || !creatorId) {
    return NextResponse.json(
      { success: false, error: 'Missing required study group information' },
      { status: 400 }
    )
  }
  
  const studyGroup = {
    id: `sg_${Date.now()}`,
    universityId,
    subject,
    description,
    language,
    maxMembers: maxMembers || 10,
    currentMembers: 1,
    meetingSchedule,
    level: level || 'all',
    creatorId,
    createdAt: new Date().toISOString(),
    status: 'active',
    members: [creatorId]
  }
  
  return NextResponse.json({
    success: true,
    data: {
      studyGroup,
      message: 'Study group created successfully'
    }
  })
}

// Handle registration of interest
async function handleRegisterInterest(universityId: string, data: any) {
  const { 
    userId, 
    interests, 
    contactPreferences, 
    portugueseLevel,
    studyYear 
  } = data
  
  if (!userId || !interests || !Array.isArray(interests)) {
    return NextResponse.json(
      { success: false, error: 'Missing userId or interests' },
      { status: 400 }
    )
  }
  
  const registration = {
    id: `reg_${Date.now()}`,
    universityId,
    userId,
    interests,
    contactPreferences: contactPreferences || { email: true, sms: false, push: true },
    portugueseLevel: portugueseLevel || 'intermediate',
    studyYear: studyYear || 'unknown',
    registeredAt: new Date().toISOString(),
    status: 'active'
  }
  
  return NextResponse.json({
    success: true,
    data: {
      registration,
      message: 'Interest registered successfully',
      nextSteps: [
        'Check your email for welcome information',
        'Join the university Portuguese WhatsApp group',
        'Browse upcoming Portuguese cultural events',
        'Connect with other Portuguese-speaking students'
      ]
    }
  })
}

// Handle calendar synchronization
async function handleSyncCalendar(universityId: string, data: any) {
  const { userId, calendarType, portugueseEventsOnly } = data
  
  if (!userId || !calendarType) {
    return NextResponse.json(
      { success: false, error: 'Missing userId or calendarType' },
      { status: 400 }
    )
  }
  
  const supportedCalendars = ['google', 'outlook', 'ical', 'apple']
  if (!supportedCalendars.includes(calendarType)) {
    return NextResponse.json(
      { success: false, error: 'Unsupported calendar type' },
      { status: 400 }
    )
  }
  
  // Generate calendar feed URL (in real implementation, this would be actual calendar integration)
  const calendarFeedUrl = `https://lusotown.com/api/universities/${universityId}/calendar/${userId}?type=${calendarType}${portugueseEventsOnly ? '&portuguese_only=true' : ''}`
  
  return NextResponse.json({
    success: true,
    data: {
      calendarFeedUrl,
      calendarType,
      portugueseEventsOnly: !!portugueseEventsOnly,
      syncStatus: 'active',
      message: 'Calendar synchronization configured successfully',
      instructions: {
        google: 'Add this URL to Google Calendar via "Other calendars" -> "From URL"',
        outlook: 'Subscribe to this calendar in Outlook using "Add calendar" -> "From internet"',
        ical: 'Import this iCal feed into your calendar application',
        apple: 'Add this calendar subscription in Calendar app settings'
      }[calendarType]
    }
  })
}