# LusoTown Error Tracking & Monitoring Setup Guide

## Overview

This guide provides comprehensive setup instructions for the LusoTown platform's error tracking and monitoring system, featuring Sentry integration with Portuguese community-specific context and bilingual error handling.

## 🚀 Quick Start

### 1. Environment Setup

Add the following environment variables to your `.env.local`:

```env
# Sentry Configuration (Required)
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
SENTRY_ORG=your_sentry_org
SENTRY_PROJECT=lusotown-web
SENTRY_AUTH_TOKEN=your_sentry_auth_token

# Error Monitoring Configuration
NEXT_PUBLIC_ERROR_MONITORING_ENDPOINT=https://api.lusotown.com/monitoring/errors
NEXT_PUBLIC_ERROR_MONITORING_API_KEY=your_monitoring_api_key
NEXT_PUBLIC_ENABLE_REAL_TIME_ALERTS=true
NEXT_PUBLIC_ENABLE_PERFORMANCE_TRACKING=true
NEXT_PUBLIC_ENABLE_SESSION_RECORDING=false # Set to true for debugging

# Alert Configuration
ALERT_RECIPIENTS=admin@lusotown.com,dev@lusotown.com
PERFORMANCE_ALERT_RECIPIENTS=ops@lusotown.com
CRITICAL_ALERT_RECIPIENTS=support@lusotown.com,admin@lusotown.com
```

### 2. Sentry Project Setup

1. **Create Sentry Account & Project:**
   ```bash
   # Visit https://sentry.io and create an account
   # Create a new project for "Next.js" platform
   # Copy the DSN from your project settings
   ```

2. **Configure Sentry Project Settings:**
   - **Project Name:** LusoTown Portuguese Community Platform
   - **Platform:** Next.js
   - **Team:** Portuguese Community Development
   - **Environment:** Set up staging and production environments

3. **Set Up Alerts:**
   - **Critical Errors:** Alert immediately for errors affecting Portuguese community features
   - **Performance Issues:** Alert when Portuguese content loading exceeds 3 seconds
   - **Error Rate:** Alert when error rate exceeds 5% over 10 minutes
   - **Portuguese Features Down:** Alert when business directory or cultural features fail

## 📊 Monitoring Features

### Portuguese Community-Specific Tracking

1. **Cultural Feature Monitoring:**
   - Business directory performance (PostGIS queries)
   - Portuguese content loading times
   - Language switching performance
   - Cultural matching algorithm errors
   - Character encoding issues (Portuguese diacritics)

2. **User Experience Tracking:**
   - Mobile experience for Portuguese users
   - Bilingual UI performance
   - Portuguese cultural event booking errors
   - University partnership feature issues

3. **Error Categorization:**
   ```typescript
   // Automatic categorization by Portuguese context
   PORTUGUESE_ERROR_CONTEXTS = {
     CULTURAL_CONTENT: 'portuguese-cultural-content',
     BUSINESS_DIRECTORY: 'portuguese-business-directory', 
     LANGUAGE_SWITCHING: 'bilingual-language-switching',
     CHARACTER_ENCODING: 'portuguese-character-encoding',
     CULTURAL_MATCHING: 'cultural-matching-algorithm',
     EVENT_BOOKING: 'lusophone-event-booking',
     UNIVERSITY_PARTNERSHIPS: 'university-partnership-features'
   }
   ```

### Error Boundary Implementation

The platform includes comprehensive error boundaries:

1. **Portuguese Error Boundary:** `/src/components/monitoring/PortugueseErrorBoundary.tsx`
   - Bilingual error messages (EN/PT)
   - Portuguese cultural context awareness
   - Mobile-optimized error UI
   - Automatic Sentry integration
   - Retry mechanism with Portuguese messaging

2. **Global Error Handler:** `/src/app/global-error.tsx`
   - Critical system error handling
   - Portuguese community context preservation
   - Emergency contact information
   - Status page integration

## 🛠 Development Usage

### Basic Error Tracking

```typescript
import { errorTracker } from '@/lib/monitoring/error-tracker'
import { capturePortugueseError } from '@/lib/monitoring/sentry-utils'

// Track Portuguese feature errors
errorTracker.trackPortugueseFeatureError('BUSINESS_DIRECTORY', error, {
  searchQuery: 'Portuguese restaurants London',
  location: 'SW1A',
  userLanguage: 'pt'
})

// Enhanced Sentry tracking with cultural context
capturePortugueseError(error, {
  feature: 'CULTURAL_MATCHING',
  severity: 'error',
  userContext: {
    language: 'pt',
    culturalFeature: 'CULTURAL_MATCHING',
    mobileDevice: true,
    userLocation: { region: 'London', city: 'London' }
  }
})
```

### Performance Monitoring

```typescript
import { trackPortuguesePerformance } from '@/lib/monitoring/sentry-utils'

// Track Portuguese content loading performance
const startTime = performance.now()
await loadPortugueseContent()
const duration = performance.now() - startTime

trackPortuguesePerformance(
  'CULTURAL_CONTENT',
  duration,
  true, // success
  { contentType: 'cultural_events', region: 'lisboa' }
)
```

### User Interaction Tracking

```typescript
import { trackPortugueseUserInteraction } from '@/lib/monitoring/sentry-utils'

// Track Portuguese community interactions
trackPortugueseUserInteraction(
  'search_portuguese_business',
  'BUSINESS_DIRECTORY',
  {
    query: 'pastelaria',
    results_count: 15,
    user_language: 'pt',
    location: 'Manchester'
  }
)
```

## 📱 Mobile Error Handling

### Touch Target Error Tracking

```typescript
// Automatic mobile error detection
const handleTouchError = (event: TouchEvent) => {
  errorTracker.trackError({
    message: 'Touch target too small for Portuguese user',
    type: 'CLIENT_ERROR',
    severity: 'MEDIUM',
    context: 'mobile-ux',
    portugueseContext: {
      language: 'pt',
      mobileDevice: true,
      culturalFeature: 'BUSINESS_DIRECTORY'
    }
  })
}
```

### Offline Error Handling

```typescript
// Offline state handling with Portuguese context
window.addEventListener('offline', () => {
  errorTracker.trackError({
    message: 'Portuguese user went offline',
    type: 'NETWORK',
    severity: 'LOW',
    context: 'offline-mode',
    portugueseContext: {
      language: getCurrentLanguage(),
      mobileDevice: isMobileDevice()
    }
  })
})
```

## 🔧 Configuration

### Error Thresholds

```typescript
// Portuguese community-specific thresholds
PORTUGUESE_ERROR_THRESHOLDS = {
  businessDirectoryFailureRate: 0.05,      // 5% max failure rate
  culturalContentLoadTime: 3000,           // 3 seconds max
  languageSwitchingTime: 500,              // 500ms max
  characterRenderingErrors: 0.01,          // 1% max Portuguese character errors
  culturalMatchingTimeout: 5000,           // 5 seconds max
  eventBookingFailureRate: 0.02            // 2% max booking failures
}
```

### Alert Configuration

```typescript
// Portuguese feature-specific alerts
MONITORING_ALERTS = {
  portugueseFeaturesDown: {
    enabled: true,
    threshold: 0.05, // 5% failure rate
    timeWindow: 300000, // 5 minutes
    channels: ['email', 'sms'],
    message: 'Portuguese community features experiencing issues'
  }
}
```

## 📈 Dashboard Access

### Error Monitoring Dashboard

Access the monitoring dashboard at `/monitoring/errors` (admin only):

- **Real-time Error Tracking:** Live Portuguese community error feed
- **Performance Metrics:** Portuguese content loading times, language switching performance
- **Cultural Feature Health:** Business directory, cultural matching, event booking status
- **Mobile UX Monitoring:** Touch target errors, offline issues, responsive design problems

### Key Metrics Tracked

1. **Portuguese Content Performance:**
   - Average loading time for cultural content
   - Business directory response times
   - Language switching performance
   - Character encoding success rate

2. **Community Feature Health:**
   - Cultural matching algorithm accuracy
   - Event booking success rate
   - University partnership integration status
   - Mobile user experience score

3. **Error Distribution:**
   - Errors by Portuguese cultural context
   - Mobile vs desktop error rates
   - Language-specific error patterns
   - Geographic error distribution (UK regions)

## 🚨 Alert Management

### Critical Alerts

Immediate notification for:
- Portuguese business directory complete failure
- Cultural matching system down
- Language switching broken
- Character encoding issues affecting >1% of users
- Event booking system failures

### Performance Alerts

Warning notifications for:
- Portuguese content loading >3 seconds
- Language switching >500ms
- Business directory queries >2 seconds
- Mobile performance degradation

### Portuguese Community Alerts

Community-specific notifications for:
- Cultural event booking failures
- University partnership integration issues
- Portuguese character display problems
- Mobile UX threshold breaches

## 🔍 Debugging & Troubleshooting

### Common Issues

1. **Sentry Not Receiving Errors:**
   ```bash
   # Check DSN configuration
   echo $NEXT_PUBLIC_SENTRY_DSN
   
   # Verify Sentry initialization
   # Look for console logs: "Sentry initialized successfully"
   ```

2. **Portuguese Context Missing:**
   ```typescript
   // Ensure Portuguese context is set before errors occur
   import { initializePortugueseMonitoring } from '@/lib/monitoring/sentry-utils'
   
   useEffect(() => {
     initializePortugueseMonitoring(currentLanguage, navigator.userAgent)
   }, [currentLanguage])
   ```

3. **Rate Limiting Issues:**
   ```typescript
   // Adjust rate limits in error-monitoring.ts
   ERROR_MONITORING.sampleRate = 0.1 // 10% sampling in production
   ```

### Debug Mode

Enable debug logging in development:

```env
NEXT_PUBLIC_DEBUG_MONITORING=true
```

## 📚 Integration Examples

### React Component Integration

```typescript
import { withPortugueseErrorBoundary } from '@/components/monitoring/PortugueseErrorBoundary'

// Wrap Portuguese community components
const PortugueseBusinessDirectory = withPortugueseErrorBoundary(
  BusinessDirectoryComponent,
  {
    portugueseContext: 'BUSINESS_DIRECTORY',
    language: 'pt',
    isMobileOptimized: true
  }
)
```

### API Route Integration

```typescript
// /src/app/api/portuguese/businesses/route.ts
import { capturePortugueseError } from '@/lib/monitoring/sentry-utils'

export async function GET(request: NextRequest) {
  try {
    const businesses = await fetchPortugueseBusinesses()
    return NextResponse.json(businesses)
  } catch (error) {
    capturePortugueseError(error, {
      feature: 'BUSINESS_DIRECTORY',
      severity: 'error',
      additionalData: {
        endpoint: '/api/portuguese/businesses',
        method: 'GET'
      }
    })
    
    throw error
  }
}
```

## 🔄 Deployment Checklist

- [ ] Sentry DSN configured in production environment
- [ ] Error monitoring API endpoints deployed
- [ ] Alert recipients configured and tested
- [ ] Portuguese community error thresholds set
- [ ] Mobile error tracking enabled
- [ ] Performance monitoring activated
- [ ] Dashboard access permissions configured
- [ ] Portuguese error messages translated
- [ ] Cultural context tracking verified
- [ ] Bilingual error boundary testing completed

## 📞 Support

For monitoring system issues:
- **Technical Support:** dev@lusotown.com
- **Community Issues:** community@lusotown.com
- **Critical Errors:** alert@lusotown.com
- **Status Page:** https://status.lusotown.com

## 📝 Testing Error Tracking

### Manual Testing

```typescript
// Test Portuguese error boundary
const TestPortugueseError = () => {
  const triggerError = () => {
    throw new Error('Test Portuguese community error')
  }
  
  return (
    <PortugueseErrorBoundary
      portugueseContext="CULTURAL_CONTENT"
      language="pt"
      isMobileOptimized={true}
    >
      <button onClick={triggerError}>
        Trigger Portuguese Error
      </button>
    </PortugueseErrorBoundary>
  )
}
```

### Automated Testing

```bash
# Run error tracking tests
npm run test:portuguese
npm run test:mobile-ux
npm run test:error-boundaries

# Monitor test results
npm run test -- --testNamePattern="error.*tracking"
```

---

## 🎯 Success Metrics

After setup, monitor these Portuguese community-specific metrics:

- **Error Resolution Time:** <2 hours for Portuguese feature errors
- **Community Feature Uptime:** >99.5% for business directory and cultural features  
- **Mobile Error Rate:** <2% for Portuguese mobile users
- **Language Switch Performance:** <500ms average
- **Portuguese Content Loading:** <2 seconds average
- **Cultural Feature Accuracy:** >95% for matching algorithms

This monitoring system ensures the Portuguese community platform maintains high reliability and cultural authenticity while providing excellent user experience across all features.