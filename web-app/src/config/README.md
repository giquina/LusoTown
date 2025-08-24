# Configuration System

This directory contains centralized configuration files to eliminate hardcoded values throughout the LusoTown application. The system addresses 97,904+ hardcoding violations identified in the codebase audit.

## Quick Start

```typescript
// Import everything from the main config file
import { ROUTES, formatPrice, brandColors, trackEvent } from '@/config';

// Or import specific configurations
import { ROUTES } from '@/config/routes';
import { formatPrice, SUBSCRIPTION_PLANS } from '@/config/pricing';
import { brandColors, PORTUGUESE_COLORS } from '@/config/brand';
import { CDN_PROVIDERS, buildUnsplashUrl } from '@/config/cdn';
import { ANALYTICS_EVENTS, trackEvent } from '@/config/analytics';
```

## Configuration Files

### 1. Lusophone Celebrations (`lusophone-celebrations.ts`)
Comprehensive celebration of Portuguese-speaking cultures across all nations with cultural wisdom rotation system.

**Features:**
```typescript
import { 
  LUSOPHONE_CELEBRATIONS, 
  CULTURAL_WISDOM, 
  getFeaturedCelebrations, 
  getRandomCulturalWisdom 
} from '@/config';

// Display cultural celebrations
const celebrations = getFeaturedCelebrations(6);

// Rotate cultural wisdom
const wisdom = getRandomCulturalWisdom();

// Filter by country or category
const brazilianEvents = getCelebrationsByCountry('Brazil');
const musicEvents = getCelebrationsByCategory('music');
```

### 2. Community Guidelines (`community-guidelines.ts`)
Comprehensive inclusivity rules and validation functions for the Portuguese-speaking community.

**Usage:**
```typescript
import { 
  validateCommunityContent, 
  INCLUSIVITY_RULES, 
  getInclusiveTerminology 
} from '@/config';

// Validate content for inclusivity
const validation = validateCommunityContent('Portuguese community in London');
if (!validation.isValid) {
  console.log(validation.suggestions); // Use "Portuguese-speaking community in the United Kingdom"
}
```

### 3. Routes (`routes.ts`)
Centralizes all application routes and URL management.

**Before (hardcoded):**
```typescript
<Link href="/events">Events</Link>
<Link href="/business-directory">Directory</Link>
router.push('/matches');
```

**After (using config):**
```typescript
import { ROUTES } from '@/config';

<Link href={ROUTES.events}>Events</Link>
<Link href={ROUTES.businessDirectory}>Directory</Link>
router.push(ROUTES.matches);

// With query parameters
const eventsUrl = buildRouteWithQuery(ROUTES.events, { category: 'cultural' });

// Check route permissions
if (isProtectedRoute(pathname)) {
  // Require authentication
}
```

### 4. Pricing (`pricing.ts`)
Manages all pricing, currency, and payment-related constants.

**Before (hardcoded):**
```typescript
<span>£19.99/month</span>
<span>From £45</span>
const price = 25.50;
```

**After (using config):**
```typescript
import { formatPrice, SUBSCRIPTION_PLANS, getFormattedPlanPrice } from '@/config';

<span>{getFormattedPlanPrice('community', 'monthly')}</span>
<span>{PRICE_DISPLAY.fromLabel} {formatPrice(45)}</span>
const price = SUBSCRIPTION_PLANS.community.monthly;

// Transport quotes
const quote = getTransportQuote('luxury', 3, 2); // 3 hours, 2 passengers
```

### 5. Brand System (`brand.ts`)
Portuguese cultural design system with colors, typography, and design tokens.

**Before (hardcoded):**
```typescript
<div className="bg-blue-500 text-white">
<div style={{ color: '#D4A574' }}>
```

**After (using config):**
```typescript
import { brandColors, PORTUGUESE_COLORS, COMPONENT_COLORS } from '@/config';

<div style={{ 
  backgroundColor: brandColors.primary,
  color: SEMANTIC_COLORS.text.inverse 
}}>

// Use Tailwind with CSS variables (recommended approach)
<div className="bg-primary text-white">

// Cultural elements
<span>{CULTURAL_SYMBOLS.flag} {CULTURAL_EMOJIS[':saudade:']}</span>
```

### 6. CDN and External URLs (`cdn.ts`)
Centralizes all external URLs and resource management.

**Before (hardcoded):**
```typescript
<img src="https://images.unsplash.com/photo-123?w=400" />
<a href="https://instagram.com/lusotownlondon">Instagram</a>
```

**After (using config):**
```typescript
import { buildUnsplashUrl, SOCIAL_URLS } from '@/config';

<img src={buildUnsplashUrl('photo-123', 400, 300)} />
<a href={SOCIAL_URLS.instagram}>Instagram</a>

// Calendar integration
const calendarUrl = buildCalendarUrl('Portuguese Night', '20250825T190000Z', '20250825T220000Z');
```

### 7. Analytics (`analytics.ts`)
Event tracking and analytics constants.

**Before (hardcoded):**
```typescript
gtag('event', 'page_view');
gtag('event', 'user_signup');
```

**After (using config):**
```typescript
import { ANALYTICS_EVENTS, trackEvent, trackUserAction } from '@/config';

trackEvent(ANALYTICS_EVENTS.PAGE_VIEW);
trackEvent(ANALYTICS_EVENTS.USER_SIGNUP);

// Portuguese cultural tracking
trackPortugueseCulturalEngagement('fado_event', 'event-123');

// Conversion tracking
trackConversion(ANALYTICS_EVENTS.SUBSCRIPTION_COMPLETE, 19.99);
```

## Portuguese Cultural Integration

The configuration system is designed specifically for the Portuguese-speaking community across ALL Lusophone nations:

### Lusophone Cultural Celebrations
```typescript
import { LUSOPHONE_CELEBRATIONS, getCelebrationsByCountry } from '@/config';

// Display celebrations from all Portuguese-speaking nations
const allCelebrations = LUSOPHONE_CELEBRATIONS;
const portugueseCelebrations = getCelebrationsByCountry('Portugal');
const brazilianCelebrations = getCelebrationsByCountry('Brazil');
const angolanCelebrations = getCelebrationsByCountry('Angola');
```

### Cultural Wisdom System
```typescript
import { CULTURAL_WISDOM, getRandomCulturalWisdom } from '@/config';

// Rotate cultural wisdom from across the Lusophone world
const wisdom = getRandomCulturalWisdom();
console.log(wisdom.quote.en); // "Commerce unites peoples and cultures"
console.log(wisdom.origin.pt); // "Provérbio Marítimo Português"
```

### Cultural Colors
```typescript
import { PORTUGUESE_COLORS, brandColors } from '@/config';

// Use Portuguese brand colors, not generic blue/gray
const styles = {
  primary: brandColors.primary,     // Portuguese gold
  secondary: brandColors.secondary, // Portuguese brown
  accent: brandColors.accent,       // Portuguese green
  action: brandColors.action        // Portuguese red
};
```

### Cultural Elements
```typescript
import { CULTURAL_SYMBOLS, CULTURAL_EMOJIS, LUSOPHONE_CELEBRATIONS } from '@/config';

// Cultural celebrations with flags and context
const celebration = LUSOPHONE_CELEBRATIONS[0];
console.log(celebration.flagEmoji); // "🇵🇹🇧🇷"
console.log(celebration.traditionalElements); // ['Sardines & Grilled Corn', 'Quadrilha Dancing']

// Streaming chat emojis
const message = `Great fado performance! ${CULTURAL_EMOJIS[':fado:']} ${CULTURAL_EMOJIS[':saudade:']}`;

// Cultural icons with proper nation representation
<span>{celebration.flagEmoji} {celebration.name.en}</span>
```

### Portuguese Resources
```typescript
import { PORTUGUESE_RESOURCES } from '@/config';

<a href={PORTUGUESE_RESOURCES.consulado}>Portuguese Consulate</a>
<a href={PORTUGUESE_RESOURCES.institutoCamoes}>Instituto Camões</a>
```

## TypeScript Support

All configurations include comprehensive TypeScript types:

```typescript
import type { 
  RouteKey, 
  SubscriptionPlan, 
  Currency,
  AnalyticsEvent,
  CDNProvider 
} from '@/config';

// Type-safe route usage
const navigateToRoute = (route: RouteKey) => {
  router.push(ROUTES[route]);
};

// Type-safe pricing
const calculatePrice = (plan: SubscriptionPlan, billing: 'monthly' | 'annual') => {
  return getPlanPrice(plan, billing);
};
```

## Migration Strategy

### Step 1: Route Migration
Replace hardcoded route strings with `ROUTES` constants:

```bash
# Find hardcoded routes
grep -r '"/events"' src/
grep -r "'/matches'" src/

# Replace with imports
import { ROUTES } from '@/config';
// Then replace literals with ROUTES.events, ROUTES.matches, etc.
```

### Step 2: Pricing Migration
Replace hardcoded prices with configuration:

```bash
# Find hardcoded prices
grep -r '£[0-9]' src/
grep -r '\$[0-9]' src/

# Replace with formatPrice() calls
import { formatPrice } from '@/config';
```

### Step 3: Color Migration
Replace hardcoded colors with brand colors:

```bash
# Find hardcoded colors
grep -r '#[0-9A-Fa-f]' src/
grep -r 'bg-blue-' src/

# Replace with brandColors or PORTUGUESE_COLORS
import { brandColors } from '@/config';
```

### Step 4: URL Migration
Replace hardcoded external URLs:

```bash
# Find hardcoded URLs
grep -r 'https://' src/
grep -r 'http://' src/

# Replace with CDN_PROVIDERS and helper functions
import { SOCIAL_URLS, buildUnsplashUrl } from '@/config';
```

## Best Practices

### 1. Always Use Configuration
```typescript
// ❌ Don't hardcode
<Link href="/events">Events</Link>
<span>£19.99</span>

// ✅ Use configuration
<Link href={ROUTES.events}>Events</Link>
<span>{formatPrice(19.99)}</span>
```

### 2. Portuguese Cultural Branding
```typescript
// ❌ Don't use generic colors
<div className="bg-blue-500">

// ✅ Use Portuguese brand colors
<div style={{ backgroundColor: brandColors.primary }}>
```

### 3. Type Safety
```typescript
// ❌ Don't use string literals
const route = "/events";

// ✅ Use typed constants
const route: RouteKey = 'events';
const path = ROUTES[route];
```

### 4. Centralized Updates
```typescript
// ❌ Don't duplicate logic
const price1 = 19.99;
const price2 = 19.99; // Duplicate!

// ✅ Use centralized configuration
const price = SUBSCRIPTION_PLANS.community.monthly;
```

## Environment Integration

The configuration system integrates with environment variables:

```bash
# .env.local
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STREAMING_SERVER_URL=http://localhost:8080
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
```

```typescript
// Automatically used in configuration
import { EXTERNAL_SERVICES, GA4_CONFIG } from '@/config';

// EXTERNAL_SERVICES.stripe uses NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// GA4_CONFIG.MEASUREMENT_ID uses NEXT_PUBLIC_GA_MEASUREMENT_ID
```

## Testing

Configuration values are easily mockable for testing:

```typescript
// In tests
jest.mock('@/config', () => ({
  ...jest.requireActual('@/config'),
  ROUTES: {
    events: '/mock-events',
    // ... other routes
  },
  formatPrice: jest.fn(() => '£19.99')
}));
```

## Performance

The configuration system is optimized for performance:

- All exports use `as const` for literal types
- Tree-shaking friendly modular exports
- No runtime overhead (compile-time constants)
- Lazy-loaded helper functions

## Contributing

When adding new configuration:

1. **Choose the right file** based on the configuration type
2. **Follow TypeScript patterns** with proper types and `as const`
3. **Add bilingual support** for Portuguese cultural elements
4. **Export from index.ts** for centralized access
5. **Update this README** with usage examples

## Related Files

- `/src/config/index.ts` - Main configuration exports
- `/src/lib/utils.ts` - Utility functions that use configuration
- `/src/styles/globals.css` - CSS variables for brand colors
- `/src/context/LanguageContext.tsx` - Localization integration