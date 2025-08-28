import { NextRequest, NextResponse } from 'next/server'
import { getUniversityById } from '@/config/universities'

interface StudentOnboardingData {
  firstName: string
  lastName: string
  email: string
  universityId: string
  studentId: string
  studyLevel: 'undergraduate' | 'postgraduate' | 'phd' | 'exchange'
  studyYear: string
  course: string
  portugueseLevel: 'native' | 'fluent' | 'intermediate' | 'beginner'
  countryOfOrigin: string
  interests: string[]
  needsAccommodation: boolean
  needsJobSupport: boolean
  wantsNetworking: boolean
  preferredLanguage: 'pt' | 'en' | 'both'
}

export async function POST(request: NextRequest) {
  try {
    const data: StudentOnboardingData = await request.json()
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'universityId', 'studentId', 'studyLevel', 'portugueseLevel', 'countryOfOrigin']
    const missingFields = requiredFields.filter(field => !data[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      )
    }
    
    // Validate university exists
    const university = getUniversityById(data.universityId)
    if (!university) {
      return NextResponse.json(
        { success: false, error: 'Invalid university ID' },
        { status: 400 }
      )
    }
    
    // Validate email domain matches university
    const emailDomain = data.email.split('@')[1]?.toLowerCase()
    const validDomains = getUniversityEmailDomains(data.universityId)
    
    if (!validDomains.includes(emailDomain)) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Email must be from one of these domains: ${validDomains.join(', ')}` 
        },
        { status: 400 }
      )
    }
    
    // Create student profile
    const studentProfile = {
      id: `student_${Date.now()}`,
      ...data,
      universityName: university.name,
      universityShortName: university.shortName,
      partnershipLevel: university.partnershipLevel,
      createdAt: new Date().toISOString(),
      verificationStatus: 'pending',
      onboardingCompleted: true
    }
    
    // Generate personalized recommendations
    const recommendations = generateStudentRecommendations(data, university)
    
    // Create welcome package
    const welcomePackage = createWelcomePackage(data, university)
    
    // In a real implementation, save to database
    // await saveStudentProfile(studentProfile)
    
    return NextResponse.json({
      success: true,
      data: {
        profile: studentProfile,
        university: {
          id: university.id,
          name: university.name,
          shortName: university.shortName,
          partnershipLevel: university.partnershipLevel,
          hasPortugueseProgram: university.hasPortugueseProgram,
          portugueseSociety: university.portugueseSociety,
          studentServices: university.studentServices
        },
        recommendations,
        welcomePackage,
        nextSteps: [
          'Check your email for verification instructions',
          'Join your university\'s Portuguese WhatsApp group',
          'Browse upcoming Portuguese cultural events',
          'Complete your LusoTown profile',
          'Connect with other Portuguese-speaking students'
        ]
      }
    })
    
  } catch (error) {
    console.error('Student onboarding error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to complete student onboarding' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('student_id')
    const universityId = searchParams.get('university_id')
    
    if (studentId) {
      // Get student profile by ID
      // In real implementation, fetch from database
      const mockProfile = {
        id: studentId,
        firstName: 'João',
        lastName: 'Silva',
        email: 'joao.silva@ucl.ac.uk',
        universityId: 'ucl',
        onboardingCompleted: true,
        verificationStatus: 'verified'
      }
      
      return NextResponse.json({
        success: true,
        data: { profile: mockProfile }
      })
    }
    
    if (universityId) {
      // Get onboarding requirements for a university
      const university = getUniversityById(universityId)
      if (!university) {
        return NextResponse.json(
          { success: false, error: 'University not found' },
          { status: 404 }
        )
      }
      
      const requirements = {
        universityId,
        universityName: university.name,
        emailDomains: getUniversityEmailDomains(universityId),
        hasPortugueseProgram: university.hasPortugueseProgram,
        portugueseSociety: university.portugueseSociety,
        studentServices: university.studentServices,
        requiredFields: [
          'firstName',
          'lastName', 
          'email',
          'studentId',
          'studyLevel',
          'portugueseLevel',
          'countryOfOrigin'
        ],
        optionalFields: [
          'studyYear',
          'course',
          'interests',
          'needsAccommodation',
          'needsJobSupport',
          'wantsNetworking'
        ]
      }
      
      return NextResponse.json({
        success: true,
        data: requirements
      })
    }
    
    // Return general onboarding statistics
    const stats = {
      totalStudentsOnboarded: 1847,
      universitiesIntegrated: 8,
      averageOnboardingTime: '3.2 minutes',
      satisfactionRate: 4.7,
      topInterests: [
        'Portuguese Cultural Events',
        'Study Groups', 
        'Career Development',
        'Language Exchange',
        'Sports & Recreation'
      ],
      topCountries: [
        'Portugal',
        'Brazil',
        'Angola',
        'Cape Verde',
        'Mozambique'
      ]
    }
    
    return NextResponse.json({
      success: true,
      data: { stats }
    })
    
  } catch (error) {
    console.error('Get onboarding info error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get onboarding information' },
      { status: 500 }
    )
  }
}

// Helper function to get university email domains
function getUniversityEmailDomains(universityId: string): string[] {
  const domainMap: Record<string, string[]> = {
    'ucl': ['ucl.ac.uk', 'live.ucl.ac.uk'],
    'kings-college': ['kcl.ac.uk', 'kings.ac.uk'],
    'imperial-college': ['imperial.ac.uk', 'ic.ac.uk'],
    'lse': ['lse.ac.uk', 'student.lse.ac.uk'],
    'oxford': ['ox.ac.uk', 'oxon.org', 'student.ox.ac.uk'],
    'cambridge': ['cam.ac.uk', 'cantab.ac.uk', 'student.cam.ac.uk'],
    'manchester': ['manchester.ac.uk', 'postgrad.manchester.ac.uk', 'student.manchester.ac.uk'],
    'edinburgh': ['ed.ac.uk', 'sms.ed.ac.uk', 'student.ed.ac.uk']
  }
  
  return domainMap[universityId] || []
}

// Generate personalized recommendations based on student profile
function generateStudentRecommendations(data: StudentOnboardingData, university: any) {
  const recommendations = []
  
  // Academic recommendations
  if (university.hasPortugueseProgram) {
    recommendations.push({
      type: 'academic',
      title: 'Join Portuguese Studies Program',
      description: `${university.shortName} offers a comprehensive Portuguese studies program`,
      action: 'Learn More',
      priority: 'high'
    })
  }
  
  // Cultural recommendations based on interests
  if (data.interests.includes('cultural-events')) {
    recommendations.push({
      type: 'cultural',
      title: 'Portuguese Cultural Events',
      description: 'Discover upcoming Portuguese festivals, concerts, and cultural celebrations',
      action: 'Browse Events',
      priority: 'high'
    })
  }
  
  if (data.interests.includes('study-groups')) {
    recommendations.push({
      type: 'academic',
      title: 'Join Study Groups',
      description: 'Connect with Portuguese-speaking students in your field of study',
      action: 'Find Groups',
      priority: 'medium'
    })
  }
  
  // Language-specific recommendations
  if (data.portugueseLevel === 'beginner' || data.portugueseLevel === 'intermediate') {
    recommendations.push({
      type: 'language',
      title: 'Portuguese Language Exchange',
      description: 'Practice Portuguese with native speakers while helping others with English',
      action: 'Join Exchange',
      priority: 'high'
    })
  }
  
  // Career recommendations
  if (data.interests.includes('career')) {
    recommendations.push({
      type: 'career',
      title: 'Portuguese Professional Network',
      description: 'Connect with Portuguese professionals and alumni in London',
      action: 'Join Network',
      priority: 'medium'
    })
  }
  
  // Accommodation recommendations
  if (data.needsAccommodation) {
    recommendations.push({
      type: 'housing',
      title: 'Portuguese-Friendly Accommodation',
      description: 'Find housing with Portuguese-speaking flatmates or in Portuguese areas',
      action: 'Browse Housing',
      priority: 'high'
    })
  }
  
  return recommendations
}

// Create a welcome package for new students
function createWelcomePackage(data: StudentOnboardingData, university: any) {
  return {
    welcome: {
      title: `Bem-vindo ao LusoTown, ${data.firstName}!`,
      message: `Welcome to the Portuguese-speaking community at ${university.shortName}`,
      personalizedGreeting: data.preferredLanguage === 'pt' 
        ? `Estamos muito felizes por teres juntado à nossa comunidade lusófona em ${university.address.city}!`
        : `We're excited to have you join our Portuguese-speaking community in ${university.address.city}!`
    },
    universitySpecific: {
      societyInfo: university.portugueseSociety || null,
      availableServices: Object.entries(university.studentServices)
        .filter(([_, available]) => available)
        .map(([service]) => service),
      culturalPrograms: university.culturalPrograms,
      academicSupport: university.academicSupport
    },
    quickLinks: [
      {
        title: 'University Partnership Benefits',
        url: `/students/university-partnerships?university=${university.id}`,
        description: 'Explore all benefits available to you as a verified student'
      },
      {
        title: 'Portuguese Events Calendar',
        url: '/events?filter=portuguese',
        description: 'Browse upcoming Portuguese cultural events and activities'
      },
      {
        title: 'Student Community Chat',
        url: '/community/students',
        description: 'Connect with other Portuguese-speaking students'
      },
      {
        title: 'Study Groups',
        url: `/study-groups?university=${university.id}`,
        description: 'Find or create study groups in your subjects'
      }
    ],
    resources: [
      {
        title: 'UK Student Guide (Portuguese)',
        type: 'document',
        description: 'Comprehensive guide for Portuguese students in the UK',
        language: 'pt'
      },
      {
        title: 'University-Specific Resources',
        type: 'collection',
        description: `Resources specific to ${university.shortName} students`,
        items: university.academicSupport
      },
      {
        title: 'Portuguese Community Directory',
        type: 'directory',
        description: 'Find Portuguese businesses, services, and communities in your area'
      }
    ]
  }
}