/**
 * A/B Testing Configuration for Signup Conversion Optimization
 * 
 * Centralized configuration for all conversion optimization tests
 * targeting Portuguese-speaking community growth across the UK.
 */

export interface ABTestConfig {
  id: string
  name: string
  description: string
  status: 'draft' | 'active' | 'paused' | 'completed'
  startDate: string
  endDate?: string
  trafficAllocation: number // 0-100 percentage
  variations: ABTestVariation[]
  targetMetrics: string[]
  segmentation?: ABTestSegmentation
  minimumSampleSize: number
  confidenceLevel: number // 0.95 = 95%
  expectedLift: number // Expected improvement percentage
}

export interface ABTestVariation {
  id: string
  name: string
  description: string
  weight: number // Traffic percentage for this variation
  config: Record<string, any>
  isControl: boolean
}

export interface ABTestSegmentation {
  userSource?: string[]
  timeOfDay?: number[]
  userAgent?: string[]
  location?: string[]
  language?: string[]
  returningUser?: boolean
}

// Lusophone Community A/B Testing Configuration
export const CONVERSION_AB_TESTS: ABTestConfig[] = [
  {
    id: 'headline-value-proposition-v1',
    name: 'Primary Headline Value Proposition Test',
    description: 'Testing business-focused vs romance-focused vs community-focused headlines',
    status: 'active',
    startDate: '2025-08-24',
    endDate: '2025-09-14',
    trafficAllocation: 100,
    minimumSampleSize: 500,
    confidenceLevel: 0.95,
    expectedLift: 15,
    targetMetrics: ['signup_conversion_rate', 'form_completion_rate', 'engagement_score'],
    variations: [
      {
        id: 'control',
        name: 'Current Community-Focused',
        description: 'Existing community-centered messaging',
        weight: 34,
        isControl: true,
        config: {
          headlineType: 'community-focused',
          headline: 'Join Portuguese speakers in London',
          subheading: 'Portuguese speakers already connected • Growing daily',
          cta: 'Join Your Community'
        }
      },
      {
        id: 'business-first',
        name: 'Business-Focused Value Prop',
        description: 'Emphasizing professional networking and business growth',
        weight: 33,
        isControl: false,
        config: {
          headlineType: 'business-focused',
          headline: 'Connect with 750+ Lusophone Business Leaders in the UK',
          subheading: 'Professional networking • Business growth • Cultural connections',
          cta: 'Join Professional Network',
          benefits: [
            'Portuguese business networking events',
            'Mentorship from successful Lusophone entrepreneurs', 
            'Access to Portuguese business directory'
          ]
        }
      },
      {
        id: 'romance-first', 
        name: 'Romance-Focused Value Prop',
        description: 'Emphasizing authentic cultural connections and relationships',
        weight: 33,
        isControl: false,
        config: {
          headlineType: 'romance-focused',
          headline: 'Finally! Meet Lusophone Speakers Who Truly Understand You',
          subheading: 'Authentic connections • Cultural compatibility • Lasting relationships',
          cta: 'Find Your Person',
          benefits: [
            'Cultural compatibility matching',
            'Lusophone cultural events and dates',
            'Safe, verified Lusophone community'
          ]
        }
      }
    ]
  },
  {
    id: 'cultural-flag-integration-v1',
    name: 'Lusophone Cultural Flag Display Test',
    description: 'Testing different approaches to displaying lusophone nation flags',
    status: 'active',
    startDate: '2025-08-24',
    trafficAllocation: 50,
    minimumSampleSize: 300,
    confidenceLevel: 0.90,
    expectedLift: 8,
    targetMetrics: ['cultural_engagement_score', 'signup_conversion_rate'],
    variations: [
      {
        id: 'current-flags',
        name: 'Current Flag Display',
        description: 'Existing static flag arrangement',
        weight: 25,
        isControl: true,
        config: {
          flagDisplay: 'static',
          flagCount: 'all',
          animation: false
        }
      },
      {
        id: 'animated-flags',
        name: 'Animated Lusophone Showcase',
        description: 'Rotating animation highlighting all Portuguese-speaking nations',
        weight: 25,
        isControl: false,
        config: {
          flagDisplay: 'animated',
          flagCount: 'all',
          animation: 'rotate',
          animationSpeed: 3000,
          culturalFacts: true
        }
      },
      {
        id: 'simplified-flags',
        name: 'Portugal + Brazil Focus',
        description: 'Focus on Portugal and Brazil with "& 7 more nations" text',
        weight: 25,
        isControl: false,
        config: {
          flagDisplay: 'simplified',
          flagCount: 'primary',
          primaryFlags: ['portugal', 'brazil'],
          moreText: '& 7 more nations'
        }
      },
      {
        id: 'minimalist-heritage',
        name: 'Single Heritage Badge',
        description: 'Clean, minimalist Portuguese heritage indicator',
        weight: 25,
        isControl: false,
        config: {
          flagDisplay: 'badge',
          flagCount: 'single',
          badgeText: 'Lusophone Heritage Community',
          colors: ['#006600', '#FF0000'] // Portuguese flag colors
        }
      }
    ]
  },
  {
    id: 'form-optimization-flow-v1',
    name: 'Signup Form Flow Optimization',
    description: 'Testing single-page vs multi-step vs progressive disclosure forms',
    status: 'draft',
    startDate: '2025-09-01',
    trafficAllocation: 75,
    minimumSampleSize: 400,
    confidenceLevel: 0.95,
    expectedLift: 12,
    targetMetrics: ['form_completion_rate', 'form_abandonment_points', 'signup_time'],
    segmentation: {
      userAgent: ['mobile', 'tablet', 'desktop']
    },
    variations: [
      {
        id: 'current-comprehensive',
        name: 'Current Comprehensive Form',
        description: 'All fields visible on single page',
        weight: 25,
        isControl: true,
        config: {
          formType: 'single-page',
          fieldsVisible: 'all',
          progressIndicator: false
        }
      },
      {
        id: 'simplified-essential',
        name: 'Simplified Essential Fields Only', 
        description: 'Only email, name, password initially',
        weight: 25,
        isControl: false,
        config: {
          formType: 'simplified',
          initialFields: ['email', 'firstName', 'password'],
          deferredFields: ['portugueseOrigin', 'londonArea', 'interests'],
          deferToOnboarding: true
        }
      },
      {
        id: 'progressive-disclosure',
        name: 'Progressive Disclosure with Cultural Milestones',
        description: 'Step-by-step with Lusophone cultural context at each step',
        weight: 25,
        isControl: false,
        config: {
          formType: 'progressive',
          steps: [
            {
              fields: ['email', 'firstName'],
              title: 'Welcome to Your Lusophone Community',
              culturalElement: 'portugal_flag'
            },
            {
              fields: ['portugueseOrigin', 'londonArea'],
              title: 'Connect with Your Cultural Roots',
              culturalElement: 'lusophone_nations'
            },
            {
              fields: ['interests', 'languagePreference'],
              title: 'Personalize Your Experience', 
              culturalElement: 'cultural_interests'
            }
          ],
          progressBar: true,
          backButton: true
        }
      },
      {
        id: 'mobile-optimized-flow',
        name: 'Mobile-Optimized Multi-Step',
        description: 'Specially designed for mobile Lusophone community users',
        weight: 25,
        isControl: false,
        config: {
          formType: 'mobile-optimized',
          touchOptimized: true,
          keyboardOptimization: 'portuguese',
          fieldHeight: '56px', // Luxury touch targets
          autoAdvance: true,
          mobileSpecificValidation: true
        }
      }
    ]
  },
  {
    id: 'social-proof-types-v1',
    name: 'Social Proof Element Testing',
    description: 'Testing different types of social proof for Lusophone community trust',
    status: 'draft', 
    startDate: '2025-09-15',
    trafficAllocation: 60,
    minimumSampleSize: 350,
    confidenceLevel: 0.90,
    expectedLift: 10,
    targetMetrics: ['trust_score', 'social_proof_engagement', 'signup_conversion_rate'],
    variations: [
      {
        id: 'activity-proof',
        name: 'Recent Activity Social Proof',
        description: 'Real-time activity from Lusophone community members',
        weight: 20,
        isControl: true,
        config: {
          socialProofType: 'activity',
          messages: [
            '23 Portuguese speakers joined this week',
            'Maria from Porto joined 2 hours ago',
            '47 attending Porto Night this Friday'
          ],
          updateFrequency: 'real-time',
          showLocation: true
        }
      },
      {
        id: 'success-stories',
        name: 'Success Story Testimonials',
        description: 'Real success stories from Lusophone community members',
        weight: 20,
        isControl: false,
        config: {
          socialProofType: 'testimonials',
          stories: [
            'João found his business partner through LusoTown last month',
            'Ana met her husband at a Fado night event',
            'Carlos expanded his Portuguese restaurant network'
          ],
          includePhotos: true,
          verification: 'verified_member'
        }
      },
      {
        id: 'scarcity-urgency',
        name: 'Scarcity and Urgency Elements',
        description: 'Limited availability and time-sensitive offers',
        weight: 20,
        isControl: false,
        config: {
          socialProofType: 'scarcity',
          messages: [
            'Only 12 spots left for next cultural event',
            'Early bird pricing ends in 48 hours',
            'Join before we Reach Portuguese speakers for founding perks'
          ],
          countdownTimers: true,
          memberCountProgress: true
        }
      },
      {
        id: 'authority-endorsement',
        name: 'Authority and Endorsement Proof',
        description: 'Official endorsements and authority figures',
        weight: 20,
        isControl: false,
        config: {
          socialProofType: 'authority',
          endorsements: [
            'Endorsed by Lusophone Cultural Centers',
            'Recommended by Instituto Camões',
            'Official Lusophone Embassy community partner'
          ],
          officialLogos: true,
          certificationBadges: true
        }
      },
      {
        id: 'combined-proof',
        name: 'Combined Social Proof Strategy',
        description: 'Strategic combination of multiple social proof types',
        weight: 20,
        isControl: false,
        config: {
          socialProofType: 'combined',
          primaryProof: 'activity',
          secondaryProof: 'testimonials',
          rotationInterval: 8000,
          contextualDisplay: true
        }
      }
    ]
  },
  {
    id: 'partnership-integration-v1',
    name: 'Cultural Partnership Integration Test',
    description: 'Testing prominence of Chocolate Kizomba and other partnerships',
    status: 'draft',
    startDate: '2025-09-20',
    trafficAllocation: 40,
    minimumSampleSize: 250,
    confidenceLevel: 0.90,
    expectedLift: 18,
    targetMetrics: ['partnership_click_rate', 'event_interest_score', 'signup_conversion_rate'],
    segmentation: {
      userSource: ['organic', 'social', 'partnership_referral']
    },
    variations: [
      {
        id: 'standard-events',
        name: 'Standard Events Section',
        description: 'Current events section without partnership emphasis',
        weight: 33,
        isControl: true,
        config: {
          partnershipEmphasis: 'standard',
          featuredPartners: [],
          partnerLogos: false
        }
      },
      {
        id: 'chocolate-kizomba-featured',
        name: 'Chocolate Kizomba Featured Prominently',
        description: 'Highlight Chocolate Kizomba partnership and dance events',
        weight: 33,
        isControl: false,
        config: {
          partnershipEmphasis: 'featured',
          featuredPartners: ['chocolate-kizomba'],
          partnerSection: 'hero-adjacent',
          specialOffer: 'LusoTown members get 10% off dance classes',
          partnerCTA: 'Learn Kizomba with Fellow Lusophone Speakers'
        }
      },
      {
        id: 'cultural-partners-showcase',
        name: 'Full Cultural Partners Showcase',
        description: 'Comprehensive display of all cultural partnerships',
        weight: 34,
        isControl: false,
        config: {
          partnershipEmphasis: 'comprehensive',
          featuredPartners: [
            'chocolate-kizomba',
            'portuguese-cultural-centers', 
            'instituto-camoes',
            'portuguese-embassy'
          ],
          partnerLogos: true,
          partnerBenefits: true,
          crossPromotionOffers: true
        }
      }
    ]
  }
]

// Test Assignment Logic
export const getABTestAssignment = (testId: string, userId: string): string => {
  const test = CONVERSION_AB_TESTS.find(t => t.id === testId)
  if (!test || test.status !== 'active') {
    return 'control'
  }

  // Simple hash-based assignment for consistent user experience
  const hash = hashString(`${userId}_${testId}`)
  const percentage = hash % 100

  let cumulativeWeight = 0
  for (const variation of test.variations) {
    cumulativeWeight += variation.weight
    if (percentage < cumulativeWeight) {
      return variation.id
    }
  }

  return test.variations.find(v => v.isControl)?.id || 'control'
}

// Test Metrics Tracking
export interface ConversionMetric {
  testId: string
  variationId: string
  userId: string
  metric: string
  value: number
  timestamp: number
  metadata?: Record<string, any>
}

export const trackConversionMetric = (metric: ConversionMetric): void => {
  // Store in localStorage for later sync to analytics
  const stored = JSON.parse(localStorage.getItem('lusotown-ab-metrics') || '[]')
  stored.push(metric)
  localStorage.setItem('lusotown-ab-metrics', JSON.stringify(stored))

  // Also track in session for immediate use
  const sessionMetrics = JSON.parse(sessionStorage.getItem('lusotown-session-metrics') || '[]')
  sessionMetrics.push(metric)
  sessionStorage.setItem('lusotown-session-metrics', JSON.stringify(sessionMetrics))
}

// Conversion Events Configuration
export const CONVERSION_EVENTS = {
  // Primary Conversion Events
  SIGNUP_STARTED: 'signup_started',
  SIGNUP_COMPLETED: 'signup_completed', 
  FORM_FIELD_COMPLETED: 'form_field_completed',
  FORM_ABANDONED: 'form_abandoned',
  
  // Engagement Events  
  HEADLINE_VIEWED: 'headline_viewed',
  BENEFIT_HOVERED: 'benefit_hovered',
  SOCIAL_PROOF_CLICKED: 'social_proof_clicked',
  CTA_CLICKED: 'cta_clicked',
  
  // Cultural Events
  FLAG_INTERACTION: 'flag_interaction',
  CULTURAL_ELEMENT_VIEWED: 'cultural_element_viewed',
  PORTUGUESE_LANGUAGE_SELECTED: 'portuguese_language_selected',
  
  // Partnership Events
  PARTNER_CLICKED: 'partner_clicked',
  EVENT_INTEREST_SHOWN: 'event_interest_shown',
  
  // Mobile Events
  MOBILE_FORM_FOCUSED: 'mobile_form_focused',
  MOBILE_CTA_TAPPED: 'mobile_cta_tapped'
} as const

// Utility Functions
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

export const isTestActive = (testId: string): boolean => {
  const test = CONVERSION_AB_TESTS.find(t => t.id === testId)
  if (!test || test.status !== 'active') return false
  
  const now = new Date()
  const startDate = new Date(test.startDate)
  const endDate = test.endDate ? new Date(test.endDate) : null
  
  return now >= startDate && (!endDate || now <= endDate)
}

export const getTestConfig = (testId: string, variationId: string): Record<string, any> => {
  const test = CONVERSION_AB_TESTS.find(t => t.id === testId)
  if (!test) return {}
  
  const variation = test.variations.find(v => v.id === variationId)
  return variation?.config || {}
}

// Lusophone Community Specific Test Configurations
export const PORTUGUESE_COMMUNITY_TESTS = {
  culturalAuthenticity: {
    saudadeMessaging: 'Test emotional Lusophone cultural messaging',
    familyValues: 'Test family-oriented value propositions',
    heritagePreservation: 'Test cultural preservation messaging'
  },
  businessNetworking: {
    entrepreneurship: 'Test Lusophone entrepreneurship angle',
    professionalGrowth: 'Test UK professional integration messaging',
    businessDirectory: 'Test Portuguese business network emphasis'
  },
  romanticConnections: {
    culturalCompatibility: 'Test cultural compatibility matching',
    authenticity: 'Test authentic connection messaging',
    safeSpace: 'Test safe Lusophone community emphasis'
  }
}

export default CONVERSION_AB_TESTS