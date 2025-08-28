import { NextRequest, NextResponse } from 'next/server'
import { getUniversityById } from '@/config/universities'

interface StudentVerificationRequest {
  universityId: string
  email: string
  studentId: string
  firstName?: string
  lastName?: string
}

interface VerificationResult {
  success: boolean
  verified: boolean
  universityId: string
  studentId: string
  benefits: string[]
  expiryDate?: string
  errorMessage?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: StudentVerificationRequest = await request.json()
    const { universityId, email, studentId, firstName, lastName } = body
    
    // Validate required fields
    if (!universityId || !email || !studentId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: universityId, email, and studentId' 
        },
        { status: 400 }
      )
    }
    
    // Check if university exists in our partnerships
    const university = getUniversityById(universityId)
    if (!university) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'University not found in partnership program' 
        },
        { status: 404 }
      )
    }
    
    // Validate email domain matches university
    const expectedDomains = getUniversityEmailDomains(universityId)
    const emailDomain = email.split('@')[1]?.toLowerCase()
    
    if (!expectedDomains.includes(emailDomain)) {
      return NextResponse.json({
        success: false,
        verified: false,
        errorMessage: `Email must be from one of these domains: ${expectedDomains.join(', ')}`
      })
    }
    
    // Simulate student verification process
    // In a real implementation, this would integrate with university student information systems
    const verificationResult = await performStudentVerification(universityId, email, studentId)
    
    if (verificationResult.verified) {
      // Generate student benefits based on university partnership level
      const benefits = generateStudentBenefits(university)
      
      // Create verification record (in real implementation, save to database)
      const verificationRecord = {
        universityId,
        studentId,
        email,
        firstName,
        lastName,
        verifiedAt: new Date().toISOString(),
        expiryDate: calculateExpiryDate(),
        benefits,
        partnershipLevel: university.partnershipLevel
      }
      
      return NextResponse.json({
        success: true,
        verified: true,
        data: {
          university: {
            id: university.id,
            name: university.name,
            shortName: university.shortName,
            partnershipLevel: university.partnershipLevel
          },
          verification: verificationRecord,
          benefits,
          message: 'Student status verified successfully'
        }
      })
    } else {
      return NextResponse.json({
        success: false,
        verified: false,
        errorMessage: verificationResult.errorMessage || 'Unable to verify student status'
      })
    }
    
  } catch (error) {
    console.error('Student verification error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to verify student status' 
      },
      { status: 500 }
    )
  }
}

// Get expected email domains for each university
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

// Simulate student verification (in real implementation, this would call university APIs)
async function performStudentVerification(
  universityId: string, 
  email: string, 
  studentId: string
): Promise<VerificationResult> {
  
  // Simulate verification delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Mock verification logic - in reality this would integrate with university systems
  const isValidStudentId = /^[A-Z0-9]{6,12}$/i.test(studentId)
  const isValidEmail = email.includes('@') && email.length > 5
  
  // Simulate some verification scenarios
  const mockVerificationSuccess = Math.random() > 0.2 // 80% success rate for demo
  
  if (!isValidStudentId) {
    return {
      success: false,
      verified: false,
      universityId,
      studentId,
      benefits: [],
      errorMessage: 'Invalid student ID format'
    }
  }
  
  if (!isValidEmail) {
    return {
      success: false,
      verified: false,
      universityId,
      studentId,
      benefits: [],
      errorMessage: 'Invalid email address'
    }
  }
  
  if (!mockVerificationSuccess) {
    return {
      success: false,
      verified: false,
      universityId,
      studentId,
      benefits: [],
      errorMessage: 'Student record not found or inactive'
    }
  }
  
  const university = getUniversityById(universityId)
  const benefits = university ? generateStudentBenefits(university) : []
  
  return {
    success: true,
    verified: true,
    universityId,
    studentId,
    benefits,
    expiryDate: calculateExpiryDate()
  }
}

// Generate benefits based on university partnership level
function generateStudentBenefits(university: any): string[] {
  const baseBenefits = [
    'Access to Portuguese community events',
    'Student discount on LusoTown premium features',
    'Priority booking for cultural events',
    'Academic year calendar integration'
  ]
  
  const officialBenefits = [
    ...baseBenefits,
    'Portuguese study group coordination',
    'Academic support in Portuguese language',
    'Career networking events access'
  ]
  
  const strategicBenefits = [
    ...officialBenefits,
    'Direct mentorship program participation',
    'Exclusive Portuguese business networking events',
    'Priority access to Portugal exchange programs',
    'Advanced academic resources in Portuguese',
    'Professional development workshops'
  ]
  
  switch (university.partnershipLevel) {
    case 'strategic':
      return strategicBenefits
    case 'official':
      return officialBenefits
    default:
      return baseBenefits
  }
}

// Calculate verification expiry date (typically end of academic year)
function calculateExpiryDate(): string {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()
  
  // Academic year typically ends in July
  // If we're past July, set expiry to next year's July
  const expiryYear = currentMonth >= 7 ? currentYear + 1 : currentYear
  const expiryDate = new Date(expiryYear, 6, 31) // July 31st
  
  return expiryDate.toISOString()
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const universityId = searchParams.get('university_id')
    
    if (!universityId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing university_id parameter' 
        },
        { status: 400 }
      )
    }
    
    const university = getUniversityById(universityId)
    if (!university) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'University not found' 
        },
        { status: 404 }
      )
    }
    
    const verificationInfo = {
      universityId: university.id,
      universityName: university.name,
      shortName: university.shortName,
      partnershipLevel: university.partnershipLevel,
      emailDomains: getUniversityEmailDomains(universityId),
      benefits: generateStudentBenefits(university),
      requirements: [
        'Valid university email address',
        'Current student ID number',
        'Active enrollment status'
      ],
      verificationProcess: [
        'Enter your university email address',
        'Provide your student ID number',
        'System verifies with university records',
        'Receive confirmation and benefits access'
      ]
    }
    
    return NextResponse.json({
      success: true,
      data: verificationInfo
    })
    
  } catch (error) {
    console.error('Get verification info error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get verification information' 
      },
      { status: 500 }
    )
  }
}