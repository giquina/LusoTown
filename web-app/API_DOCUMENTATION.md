# LusoTown Platform - API Documentation

**Version**: 1.0.0  
**Environment**: Production Ready  
**Last Updated**: August 2025

---

## 📋 API Overview

The LusoTown API provides comprehensive endpoints for managing the Portuguese community platform, including premium services, streaming platform, events, and user management. All endpoints support bilingual content (Portuguese/English) and implement robust security measures.

---

## 🔐 Authentication

### Authentication Methods
```typescript
// Supabase Authentication
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Authentication examples
const { data: user } = await supabase.auth.getUser()
const { error } = await supabase.auth.signInWithPassword({ email, password })
```

### Authorization Headers
```http
Authorization: Bearer <supabase_jwt_token>
Content-Type: application/json
Accept-Language: pt-PT,en-GB;q=0.8
```

---

## 🎭 Events API

### Get Events
```typescript
GET /api/events
```

**Query Parameters**:
- `category` (optional): Filter by event category
- `language` (optional): `pt` or `en`
- `limit` (optional): Number of events to return (default: 20)
- `offset` (optional): Pagination offset

**Response**:
```typescript
interface EventResponse {
  id: string
  title: string
  title_pt?: string
  description: string
  description_pt?: string
  date: string
  location: string
  location_pt?: string
  price: number
  currency: 'GBP' | 'EUR'
  category: EventCategory
  image_url: string
  spots_available: number
  is_premium: boolean
  organizer: {
    id: string
    name: string
    avatar_url?: string
  }
  attendees_count: number
  is_user_attending: boolean
  is_user_saved: boolean
}
```

### Create Event
```typescript
POST /api/events
```

**Request Body**:
```typescript
interface CreateEventRequest {
  title: string
  title_pt?: string
  description: string
  description_pt?: string
  date: string
  location: string
  location_pt?: string
  price: number
  currency: 'GBP' | 'EUR'
  category: EventCategory
  spots_total: number
  is_premium?: boolean
  image_url?: string
}
```

---

## 📺 Streaming API (LusoTown TV)

### Get Live Streams
```typescript
GET /api/streams/live
```

**Response**:
```typescript
interface LiveStreamResponse {
  id: string
  title: string
  title_pt?: string
  description: string
  description_pt?: string
  hls_url?: string
  youtube_video_id?: string
  thumbnail_url: string
  is_live: boolean
  is_premium: boolean
  category: StreamCategory
  viewer_count: number
  chat_enabled: boolean
  scheduled_start?: string
  language_primary: 'pt' | 'en'
}
```

### Get Stream Schedule
```typescript
GET /api/streams/schedule
```

**Query Parameters**:
- `date` (optional): YYYY-MM-DD format
- `category` (optional): Filter by stream category

**Response**:
```typescript
interface ScheduleResponse {
  date: string
  programs: Array<{
    id: string
    title: string
    title_pt?: string
    start_time: string
    end_time: string
    category: StreamCategory
    is_premium: boolean
    description: string
    description_pt?: string
  }>
}
```

### Stream Analytics
```typescript
GET /api/streams/{streamId}/analytics
```

**Response**:
```typescript
interface StreamAnalytics {
  stream_id: string
  current_viewers: number
  peak_viewers: number
  total_views: number
  average_watch_time: number
  engagement_rate: number
  chat_messages_count: number
  viewer_demographics: {
    countries: Record<string, number>
    languages: Record<string, number>
    age_groups: Record<string, number>
  }
}
```

---

## 🚗 Premium Services API

### Get Premium Services
```typescript
GET /api/services
```

**Response**:
```typescript
interface ServiceResponse {
  id: string
  name: string
  name_pt?: string
  description: string
  description_pt?: string
  category: 'cultural-tours' | 'executive-transport' | 'close-protection'
  base_price: number
  currency: 'GBP' | 'EUR'
  duration_hours?: number
  features: Array<{
    name: string
    name_pt?: string
    included: boolean
  }>
  image_url: string
  is_premium_only: boolean
  booking_advance_days: number
  cancellation_policy: string
  cancellation_policy_pt?: string
}
```

### Book Premium Service
```typescript
POST /api/services/{serviceId}/book
```

**Request Body**:
```typescript
interface ServiceBookingRequest {
  date: string
  time: string
  duration_hours?: number
  guest_count?: number
  special_requirements?: string
  pickup_location?: string
  dropoff_location?: string
  contact_phone: string
  preferred_language: 'pt' | 'en'
  customizations?: Record<string, any>
}
```

**Response**:
```typescript
interface BookingResponse {
  booking_id: string
  service_id: string
  user_id: string
  date: string
  time: string
  total_price: number
  currency: 'GBP' | 'EUR'
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  confirmation_code: string
  provider_contact?: {
    name: string
    phone: string
    vehicle_details?: string
  }
}
```

---

## 🛒 Cart & Commerce API

### Get Cart
```typescript
GET /api/cart
```

**Response**:
```typescript
interface CartResponse {
  items: Array<{
    id: string
    type: 'event' | 'premium_service' | 'subscription'
    title: string
    title_pt?: string
    price: number
    currency: 'GBP' | 'EUR'
    quantity: number
    expires_at?: string
    metadata: Record<string, any>
  }>
  subtotal: number
  discounts: Array<{
    code: string
    amount: number
    type: 'percentage' | 'fixed'
  }>
  total: number
  currency: 'GBP' | 'EUR'
}
```

### Add to Cart
```typescript
POST /api/cart/items
```

**Request Body**:
```typescript
interface AddToCartRequest {
  item_type: 'event' | 'premium_service' | 'subscription'
  item_id: string
  quantity?: number
  customizations?: Record<string, any>
  expires_in_minutes?: number
}
```

### Process Checkout
```typescript
POST /api/cart/checkout
```

**Request Body**:
```typescript
interface CheckoutRequest {
  payment_method: 'stripe' | 'bank_transfer'
  billing_address: {
    line1: string
    line2?: string
    city: string
    postal_code: string
    country: string
  }
  customer_details: {
    email: string
    phone?: string
    preferred_language: 'pt' | 'en'
  }
  special_instructions?: string
}
```

---

## 👥 User Management API

### Get User Profile
```typescript
GET /api/users/{userId}
```

**Response**:
```typescript
interface UserProfileResponse {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  language_preference: 'pt' | 'en'
  location?: {
    city: string
    country: string
    postcode?: string
  }
  subscription: {
    tier: 'free' | 'premium' | 'vip'
    active: boolean
    expires_at?: string
  }
  preferences: {
    notifications_email: boolean
    notifications_sms: boolean
    event_categories: string[]
    service_categories: string[]
  }
  stats: {
    events_attended: number
    services_booked: number
    network_connections: number
    community_score: number
  }
}
```

### Update User Profile
```typescript
PATCH /api/users/{userId}
```

**Request Body**:
```typescript
interface UpdateUserRequest {
  full_name?: string
  avatar_url?: string
  language_preference?: 'pt' | 'en'
  location?: {
    city?: string
    country?: string
    postcode?: string
  }
  preferences?: {
    notifications_email?: boolean
    notifications_sms?: boolean
    event_categories?: string[]
    service_categories?: string[]
  }
}
```

---

## 🔍 Search API

### Global Search
```typescript
GET /api/search
```

**Query Parameters**:
- `q` (required): Search query
- `type` (optional): `events`, `services`, `users`, `businesses`, `all`
- `language` (optional): `pt` or `en`
- `limit` (optional): Results per page
- `offset` (optional): Pagination offset

**Response**:
```typescript
interface SearchResponse {
  results: Array<{
    type: 'event' | 'service' | 'user' | 'business'
    id: string
    title: string
    title_pt?: string
    description: string
    description_pt?: string
    image_url?: string
    relevance_score: number
    metadata: Record<string, any>
  }>
  total_count: number
  query_suggestions: string[]
  filters_applied: Record<string, any>
}
```

---

## 📊 Analytics API

### Platform Analytics
```typescript
GET /api/analytics/platform
```

**Query Parameters**:
- `period`: `day`, `week`, `month`, `quarter`, `year`
- `start_date` (optional): YYYY-MM-DD
- `end_date` (optional): YYYY-MM-DD

**Response**:
```typescript
interface PlatformAnalytics {
  period: string
  user_metrics: {
    active_users: number
    new_registrations: number
    retention_rate: number
    subscription_conversion_rate: number
  }
  content_metrics: {
    events_created: number
    events_attended: number
    services_booked: number
    streaming_hours_watched: number
  }
  revenue_metrics: {
    total_revenue: number
    currency: string
    revenue_by_category: Record<string, number>
    average_order_value: number
  }
  engagement_metrics: {
    page_views: number
    session_duration_avg: number
    bounce_rate: number
    language_usage: Record<string, number>
  }
}
```

---

## 🌐 Webhooks

### Event Webhooks
LusoTown sends webhooks for significant events:

```typescript
// Webhook payload structure
interface WebhookPayload {
  event: string
  timestamp: string
  data: Record<string, any>
  user_id?: string
  signature: string // HMAC signature for verification
}
```

**Available Events**:
- `user.created`
- `user.subscription.updated`
- `event.created`
- `event.booking.completed`
- `service.booking.confirmed`
- `payment.successful`
- `stream.started`
- `stream.ended`

---

## ⚡ Rate Limits

### Standard Rate Limits
- **Anonymous users**: 100 requests per hour
- **Authenticated users**: 1000 requests per hour
- **Premium users**: 5000 requests per hour
- **Streaming endpoints**: 10 requests per minute

### Rate Limit Headers
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

---

## 🚨 Error Handling

### Error Response Format
```typescript
interface ErrorResponse {
  error: {
    code: string
    message: string
    message_pt?: string
    details?: Record<string, any>
    request_id: string
  }
  timestamp: string
}
```

### Common Error Codes
- `AUTH_REQUIRED` - Authentication required
- `INSUFFICIENT_PERMISSIONS` - Authorization failed
- `RESOURCE_NOT_FOUND` - Requested resource not found
- `VALIDATION_FAILED` - Request validation failed
- `RATE_LIMIT_EXCEEDED` - Rate limit exceeded
- `SUBSCRIPTION_REQUIRED` - Premium subscription required
- `SERVICE_UNAVAILABLE` - Temporary service issue

---

## 📱 Mobile-Specific Considerations

### Mobile Headers
```http
User-Agent: LusoTown-Mobile/1.0 (iOS/Android)
X-Device-Type: mobile
X-App-Version: 1.0.0
```

### Mobile-Optimized Responses
- Smaller image sizes for mobile requests
- Reduced payload sizes for slower connections
- Touch-friendly data structures

---

## 🔒 Security Features

### Data Protection
- **Row Level Security (RLS)** - Database-level security
- **Input Sanitization** - Prevent XSS and injection attacks
- **Rate Limiting** - Prevent abuse
- **CORS Configuration** - Controlled cross-origin access

### Portuguese Data Compliance
- **GDPR Compliance** - EU data protection standards
- **Data Localization** - Portuguese user data handling
- **Right to Erasure** - User data deletion
- **Data Portability** - User data export

---

## 🛠️ Development Tools

### API Testing
```bash
# Test authentication
curl -X POST https://api.lusotown.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Test events endpoint
curl -X GET https://api.lusotown.com/api/events \
  -H "Authorization: Bearer <token>" \
  -H "Accept-Language: pt-PT"
```

### SDK Usage
```typescript
import { LusoTownAPI } from '@lusotown/api-client'

const api = new LusoTownAPI({
  apiKey: process.env.LUSOTOWN_API_KEY,
  language: 'pt'
})

const events = await api.events.list({ category: 'cultural' })
```

---

## 📚 Additional Resources

### Related Documentation
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - UI component guidelines
- **[FEATURES_README.md](./FEATURES_README.md)** - Feature implementation details
- **[Database Schema](./database_schema.sql)** - Complete database structure

### Community Support
- **GitHub Issues** - Bug reports and feature requests
- **Community Forum** - Developer discussions
- **Premium Support** - Enterprise customer support

---

**Built with ❤️ for the Portuguese community in London & UK**  
**API Version 1.0.0 | Documentation Last Updated: August 2025**