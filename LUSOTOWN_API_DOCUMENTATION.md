# LusoTown API Documentation

This document provides comprehensive API documentation for LusoTown's enhanced social & business networking platform.

## Table of Contents

1. [Authentication APIs](#authentication-apis)
2. [Premium Matches APIs](#premium-matches-apis)
3. [Subscription Management APIs](#subscription-management-apis)
4. [Streaming Platform APIs](#streaming-platform-apis)
5. [Student Partnership APIs](#student-partnership-apis)
6. [Platform Integration APIs](#platform-integration-apis)
7. [Transport & SIA APIs](#transport--sia-apis)
8. [Networking & Community APIs](#networking--community-apis)

## Authentication APIs

### Demo Authentication System
Current implementation uses a demo authentication system with hardcoded credentials for development and testing purposes.

**Demo Login Credentials:**
- Email: `demo@lusotown.com`
- Password: `LusoTown2025!`

**Auth Context Methods:**
```typescript
// Get current user
const user = authService.getCurrentUser()

// Check if demo user
const isDemo = authService.isDemoUser()

// Auth state change listener
const unsubscribe = authService.onAuthStateChange(callback)
```

## Premium Matches APIs

### Match Generation & Compatibility Scoring

**Generate Matches**
```typescript
interface MatchingRequest {
  userId: string
  filters?: MatchFilters
  limit?: number
}

interface MatchingResponse {
  matches: PremiumMatch[]
  totalCount: number
  hasMore: boolean
}
```

**Compatibility Algorithm**
```typescript
interface CompatibilityScore {
  overall: number // 75-95%
  cultural: number // 80-95% (Portuguese heritage, language, interests)
  professional: number // 70-95% (career background, networking goals)
  location: number // 60-90% (London boroughs, UK cities)
}
```

### Match Interactions

**Like/Pass Actions**
```typescript
// Like a match
const handleLike = async (matchId: string) => {
  // Update match status
  // Check for mutual match (30% probability in demo)
  // Update daily usage limits for free users
  // Track engagement analytics
}

// Pass on a match
const handlePass = async (matchId: string) => {
  // Remove from current matches
  // Update daily usage for free users
  // Log analytics data
}
```

**Daily Usage Limits**
- **Free Tier**: 5 matches per day
- **Premium Tiers**: Unlimited matches
- Usage tracked in localStorage: `lusotown-daily-matches-${today}`

### Safety & Reporting

**Report User**
```typescript
interface MatchReport {
  reporterId: string
  reportedUserId: string
  reason: 'inappropriate_content' | 'harassment' | 'fake_profile' | 'spam' | 'other'
  description: string
  evidence?: File[]
}
```

## Subscription Management APIs

### Stripe Integration

**Create Subscription**
```typescript
// API Endpoint: POST /api/create-subscription
interface SubscriptionRequest {
  userId: string
  userEmail: string
  userName: string
  tier: 'basic' | 'student' | 'professional' | 'business' | 'vip'
  planType: 'monthly' | 'yearly'
}

interface SubscriptionResponse {
  sessionId: string // Stripe checkout session ID
  redirectUrl: string
}
```

**Subscription Tiers & Pricing**
```typescript
const SUBSCRIPTION_TIERS = {
  student: { annual: 12.50, discount: 50 }, // 50% off for verified students
  professional: { annual: 25.00 }, // Standard tier
  business: { annual: 75.00 }, // Corporate accounts
  vip: { annual: 150.00 } // Premium exclusive access
}
```

### Usage Tracking & Limits

**Feature Usage Limits**
```typescript
interface UsageLimits {
  dailyMatches: number // Free: 5, Premium: unlimited
  monthlyMessages: number // Free: 100, Premium: unlimited
  premiumEvents: number // Free: 2, Premium: unlimited
  livestreamHours: number // Free: 10, Premium: unlimited
  hasUnlimitedAccess: boolean
}
```

**Track Feature Usage**
```typescript
const trackFeatureUsage = async (feature: 'match' | 'message' | 'premium_event' | 'livestream'): Promise<boolean> => {
  // Check current usage against limits
  // Update usage counters
  // Save to database
  // Return success/failure
}
```

### Student Verification

**Validate Student Status**
```typescript
// API Endpoint: POST /api/validate-student
interface StudentValidationRequest {
  email: string // Must be .ac.uk domain
  universityId: string
  documentUpload?: File
}

interface StudentValidationResponse {
  isValid: boolean
  university?: UniversityPartnership
  discountEligible: boolean
  verificationStatus: 'pending' | 'approved' | 'rejected'
}
```

## Streaming Platform APIs

### Stream Management

**Current Live Stream**
```typescript
interface LiveStream {
  id: string
  title: string
  description: string
  category: 'portuguese-culture' | 'business-workshops' | 'community-events' | 'student-sessions' | 'vip-business'
  isLive: boolean
  scheduledStart: string
  viewerCount: number
  isPremium: boolean // Requires subscription
  youtubeVideoId: string
  host: string
  duration: number // minutes
  tags: string[]
}
```

**Stream Categories & Access Control**
```typescript
const STREAM_CATEGORIES = {
  'portuguese-culture': { isPremium: false, description: 'Traditional music, fado nights, cultural celebrations' },
  'business-workshops': { isPremium: true, description: 'Professional development, AI workshops, digital marketing' },
  'community-events': { isPremium: false, description: 'Community meetings, announcements, interactive sessions' },
  'student-sessions': { isPremium: false, description: 'Study groups, career advice, academic support' },
  'vip-business': { isPremium: true, description: 'Exclusive premium content with industry leaders' }
}
```

### Real-Time Analytics

**Viewer Tracking**
```typescript
interface StreamAnalytics {
  currentViewers: number
  peakViewers: number
  totalViews: number
  averageWatchTime: number
  chatParticipation: number
  subscriptionConversions: number
}

// Real-time viewer count simulation
const updateViewerCount = () => {
  const change = Math.floor(Math.random() * 6) - 2 // -2 to +3 viewers
  setViewerCount(prev => Math.max(0, prev + change))
}
```

### Stream Scheduling & Replay Library

**Upcoming Streams**
```typescript
interface StreamSchedule {
  upcoming: LiveStream[]
  recurring: {
    weekly: LiveStream[]
    monthly: LiveStream[]
  }
  categories: string[]
}
```

**Replay Access Control**
```typescript
interface StreamReplay {
  streamId: string
  title: string
  recordedAt: string
  duration: number
  category: string
  isPremium: boolean // Requires subscription for access
  thumbnailUrl: string
  viewCount: number
}
```

## Student Partnership APIs

### University Partnerships

**Partner Universities Data**
```typescript
interface University {
  id: string
  name: string
  namePortuguese: string
  location: string
  type: 'russell_group' | 'london_university' | 'red_brick' | 'modern' | 'specialist'
  hasPortugueseProgram: boolean
  partnershipLevel: 'strategic' | 'official' | 'community' | 'pending'
  studentPopulation: number
  internationalStudents: number
  portugueseStudents: number
  programs: {
    undergraduate: string[]
    postgraduate: string[]
    research: string[]
    languageCourses: string[]
  }
  benefits: string[]
  contact: UniversityContact
}
```

**Student Benefits System**
```typescript
interface StudentBenefit {
  id: string
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  category: 'academic' | 'cultural' | 'professional' | 'social' | 'financial'
  discountAmount?: string
  eligibility: string[]
  verificationRequired: boolean
  value: string // Monetary equivalent or description
}
```

### Student Verification Process

**Verification Steps**
1. **Email Verification**: University .ac.uk domain validation
2. **Document Upload**: Student ID, enrollment confirmation, or tuition receipt
3. **Manual Review**: 24-48 hour approval process
4. **Benefit Activation**: Automatic 50% discount application

**Verification Status Tracking**
```typescript
interface StudentVerification {
  userId: string
  email: string
  university: string
  year: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  reviewedAt?: string
  documents: VerificationDocument[]
  benefits: StudentBenefit[]
}
```

## Platform Integration APIs

### User Journey Tracking

**Journey Initialization**
```typescript
interface UserJourney {
  id: string
  userId: string
  journeyType: 'service_to_community' | 'community_to_service' | 'cross_engagement'
  startPoint: string
  currentStep: string
  completedSteps: string[]
  engagementScore: number
  revenueGenerated: number
  lastActivity: string
}
```

**Journey Progress Updates**
```typescript
const updateJourneyProgress = (step: string, metadata?: Record<string, any>) => {
  // Update current step
  // Add to completed steps
  // Increase engagement score
  // Trigger specific milestone actions
  // Generate recommendations
}
```

### Smart Recommendations Engine

**Recommendation Generation**
```typescript
interface ServiceRecommendation {
  id: string
  type: 'transport' | 'event' | 'community_group' | 'business_networking' | 'premium_feature'
  title: string
  description: string
  relevanceScore: number // 1-10
  basedOn: string[] // Triggering factors
  cta: string
  price?: number
  urgency: 'low' | 'medium' | 'high'
  category: string
  metadata: Record<string, any>
}
```

**Recommendation Triggers**
- Transport completion → Community event suggestions
- High networking activity → Premium transport recommendations
- Active engagement without subscription → Membership conversion
- Student graduation → Professional tier transition

### Ecosystem Analytics

**Analytics Calculation**
```typescript
interface EcosystemAnalytics {
  userEngagementScore: number // 0-10 scale
  serviceUsageFrequency: Record<string, number>
  communityParticipationLevel: number // 0-10 scale
  revenueContribution: number // £ total
  crossPlatformConversions: number
  preferredServices: string[]
  communityConnections: number
  monthlyGrowthRate: number // percentage
}
```

### Revenue Optimization

**Value Calculation**
```typescript
const calculateEcosystemValue = () => {
  return {
    totalValue: revenueContribution + (crossPlatformConversions * 25) + (userEngagementScore * 10),
    monthlyGrowth: monthlyGrowthRate,
    projectedRevenue: revenueContribution * 1.5 + (userEngagementScore * 15)
  }
}
```

## Transport & SIA APIs

### SIA Compliance System

**Compliance Questionnaire**
```typescript
interface SIACompliance {
  userId: string
  bookingId: string
  riskLevel: 'low' | 'medium' | 'high'
  questionnaire: {
    transportType: string
    destinationType: 'business' | 'personal' | 'event' | 'airport'
    securityLevel: 'standard' | 'enhanced' | 'high_risk'
    additionalRequirements: string[]
  }
  approvalStatus: 'pending' | 'approved' | 'requires_review'
  approvedAt?: string
}
```

**Risk Assessment**
```typescript
interface RiskAssessment {
  overallRisk: 'low' | 'medium' | 'high'
  factors: {
    locationRisk: number
    timeRisk: number
    passengerProfile: number
    serviceType: number
  }
  recommendations: string[]
  requiredMeasures: string[]
}
```

### Transport Booking Integration

**Subscription-Gated Booking**
```typescript
const validateBookingAccess = (user: User): boolean => {
  return hasActiveSubscription || isInTrial || isDemoUser
}

const processTransportBooking = async (booking: TransportBooking) => {
  // Validate subscription access
  // Process SIA compliance
  // Apply membership discounts
  // Track revenue opportunity
  // Generate community recommendations
}
```

## Networking & Community APIs

### Event-Based Connections

**Automatic Connection Creation**
```typescript
interface Connection {
  id: string
  userId: string
  connectedUserId: string
  connectionSource: 'event_based' | 'mutual_friends' | 'manual'
  sharedEventsCount: number
  firstMetEventId?: string
  connectionStrength: number // 0-10 scale
  lastInteractionAt: string
  isActive: boolean
  privacyLevel: 'public' | 'normal' | 'private'
}
```

**Network Statistics**
```typescript
interface NetworkStats {
  totalConnections: number
  eventsAttended: number
  monthlyGrowth: number
  achievements: NetworkAchievement[]
  connectionStrength: {
    strong: number // 7-10
    moderate: number // 4-6
    weak: number // 1-3
  }
}
```

### Portuguese Cultural Context

**Conversation Starters**
```typescript
interface ConversationStarter {
  category: 'cultural' | 'professional' | 'personal' | 'heritage'
  question: string
  questionPortuguese: string
  context: string
  appropriateFor: string[] // event types, relationship levels
}
```

**Achievement System**
```typescript
interface NetworkAchievement {
  id: string
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  criteria: {
    connectionsRequired?: number
    eventsRequired?: number
    monthsActive?: number
    specialConditions?: string[]
  }
  badgeIcon: string
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary'
}
```

## Error Handling & Response Formats

### Standard Response Format
```typescript
interface APIResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  metadata?: {
    pagination?: {
      page: number
      limit: number
      total: number
      hasMore: boolean
    }
    timing?: {
      requestId: string
      processingTime: number
    }
  }
}
```

### Common Error Codes
- `AUTH_REQUIRED`: User authentication required
- `SUBSCRIPTION_REQUIRED`: Active subscription needed
- `DAILY_LIMIT_REACHED`: Free tier daily usage exceeded
- `STUDENT_VERIFICATION_REQUIRED`: Student status verification needed
- `INVALID_UNIVERSITY_EMAIL`: .ac.uk email domain required
- `PAYMENT_PROCESSING_ERROR`: Stripe payment failure
- `SIA_COMPLIANCE_REQUIRED`: Transport booking requires compliance
- `DOCUMENT_VALIDATION_FAILED`: Student verification document issues

## Development & Testing

### Demo Environment
All APIs currently operate in demo mode with:
- Hardcoded authentication credentials
- Mock data generation for matches, streams, and analytics
- localStorage persistence for state management
- Simulated real-time updates for viewer counts and notifications

### API Rate Limiting (Future Implementation)
```typescript
interface RateLimit {
  endpoint: string
  limits: {
    free: { requests: number, period: string }
    premium: { requests: number, period: string }
  }
  currentUsage: number
  resetTime: string
}
```

### Testing Endpoints
- **Local Development**: `http://localhost:3000`
- **Demo Login**: Available on all pages with auto-fill button
- **Feature Testing**: All new features accessible through navigation

## Integration Best Practices

1. **Always check subscription status** before accessing premium features
2. **Validate university email domains** (.ac.uk) for student verification
3. **Track user engagement** for recommendation engine optimization
4. **Implement proper error handling** for payment processing failures
5. **Respect daily usage limits** for free tier users
6. **Maintain bilingual support** (English/Portuguese) for all user-facing content
7. **Follow Portuguese cultural context** in all community features
8. **Ensure London & UK geographic focus** in location-based features