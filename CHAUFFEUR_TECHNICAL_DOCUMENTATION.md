# LusoTown Security Chauffeur Services - Technical Documentation

## System Architecture Overview

The LusoTown Security Chauffeur Services platform integrates seamlessly with the main LusoTown community platform, providing specialized booking, management, and operational systems for premium Portuguese chauffeur services.

---

## 1. System Architecture

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    LusoTown Platform                        │
├─────────────────────────────────────────────────────────────┤
│  Frontend (Next.js 14)                                     │
│  ├── Chauffeur Booking Interface                           │
│  ├── Service Management Dashboard                          │
│  ├── Customer Portal                                       │
│  └── Driver/Operations Interface                           │
├─────────────────────────────────────────────────────────────┤
│  Backend Services (Supabase)                               │
│  ├── Booking Management API                                │
│  ├── Driver Assignment System                              │
│  ├── Payment Processing                                    │
│  ├── Real-time Tracking                                    │
│  └── Notification System                                   │
├─────────────────────────────────────────────────────────────┤
│  External Integrations                                     │
│  ├── Payment Gateway (Stripe)                              │
│  ├── GPS Tracking System                                   │
│  ├── SMS/WhatsApp API                                      │
│  └── Google Maps/Places API                                │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Component Architecture

#### Frontend Components (React/TypeScript)
- **ChauffeurBookingForm.tsx** - Multi-step booking interface
- **ChauffeurServiceCard.tsx** - Service tier display component
- **ChauffeurTestimonials.tsx** - Customer reviews and ratings
- **DriverDashboard.tsx** - Driver operations interface
- **BookingManagement.tsx** - Admin booking management

#### Backend Services
- **Booking API** - RESTful API for booking management
- **Driver Management** - Driver assignment and tracking
- **Payment Processing** - Secure payment handling
- **Notification Service** - Real-time communication
- **Analytics Engine** - Performance and usage analytics

---

## 2. Database Schema

### 2.1 Core Tables

#### chauffeur_bookings
```sql
CREATE TABLE chauffeur_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES profiles(id),
    service_tier VARCHAR(50) NOT NULL, -- essential, premium, vip, elite
    service_type VARCHAR(50), -- tier, package
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    pickup_location TEXT NOT NULL,
    destinations TEXT NOT NULL,
    duration_hours INTEGER NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'GBP',
    status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, in_progress, completed, cancelled
    payment_status VARCHAR(20) DEFAULT 'pending', -- pending, paid, refunded
    payment_intent_id VARCHAR(255),
    special_requirements TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### chauffeur_drivers
```sql
CREATE TABLE chauffeur_drivers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id),
    license_number VARCHAR(50) UNIQUE NOT NULL,
    license_expiry DATE NOT NULL,
    dbs_check_date DATE NOT NULL,
    languages TEXT[] DEFAULT ARRAY['en', 'pt'],
    certifications TEXT[],
    vehicle_id UUID REFERENCES chauffeur_vehicles(id),
    status VARCHAR(20) DEFAULT 'available', -- available, busy, offline
    rating DECIMAL(3,2) DEFAULT 5.0,
    total_trips INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### chauffeur_vehicles
```sql
CREATE TABLE chauffeur_vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    license_plate VARCHAR(20) UNIQUE NOT NULL,
    color VARCHAR(30),
    vehicle_type VARCHAR(30), -- luxury, armored, standard
    capacity INTEGER DEFAULT 4,
    features TEXT[],
    insurance_expiry DATE NOT NULL,
    mot_expiry DATE NOT NULL,
    last_service DATE,
    status VARCHAR(20) DEFAULT 'available', -- available, in_use, maintenance
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### chauffeur_assignments
```sql
CREATE TABLE chauffeur_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES chauffeur_bookings(id),
    driver_id UUID REFERENCES chauffeur_drivers(id),
    vehicle_id UUID REFERENCES chauffeur_vehicles(id),
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    route_data JSONB,
    real_time_location JSONB,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'assigned' -- assigned, en_route, arrived, in_progress, completed
);
```

#### chauffeur_service_tiers
```sql
CREATE TABLE chauffeur_service_tiers (
    id VARCHAR(20) PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_pt VARCHAR(100) NOT NULL,
    description_en TEXT,
    description_pt TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    minimum_hours INTEGER NOT NULL,
    features_en TEXT[],
    features_pt TEXT[],
    color_theme VARCHAR(20),
    display_order INTEGER,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### chauffeur_experience_packages
```sql
CREATE TABLE chauffeur_experience_packages (
    id VARCHAR(30) PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_pt VARCHAR(100) NOT NULL,
    description_en TEXT,
    description_pt TEXT,
    price DECIMAL(10,2),
    duration_hours INTEGER,
    inclusions_en TEXT[],
    inclusions_pt TEXT[],
    category VARCHAR(30), -- cultural, business, luxury
    popular BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.2 Indexes and Performance

```sql
-- Performance indexes
CREATE INDEX idx_chauffeur_bookings_date ON chauffeur_bookings(booking_date);
CREATE INDEX idx_chauffeur_bookings_status ON chauffeur_bookings(status);
CREATE INDEX idx_chauffeur_bookings_client ON chauffeur_bookings(client_id);
CREATE INDEX idx_chauffeur_drivers_status ON chauffeur_drivers(status);
CREATE INDEX idx_chauffeur_vehicles_status ON chauffeur_vehicles(status);
CREATE INDEX idx_chauffeur_assignments_booking ON chauffeur_assignments(booking_id);

-- Full-text search indexes
CREATE INDEX idx_chauffeur_bookings_destinations_fts ON chauffeur_bookings 
USING gin(to_tsvector('english', destinations));
```

---

## 3. API Documentation

### 3.1 Booking Management API

#### POST /api/chauffeur/bookings
Create a new chauffeur booking

**Request Body:**
```json
{
  "serviceType": "tier|package",
  "serviceId": "premium|vip|tea-ritz|airport-vip",
  "bookingDate": "2025-08-20",
  "bookingTime": "14:30",
  "pickupLocation": "Hotel Address, London",
  "destinations": "The Ritz London, 150 Piccadilly",
  "durationHours": 3,
  "eventType": "cultural",
  "securityPreference": "protection",
  "specialRequirements": "Portuguese cultural guide",
  "clientDetails": {
    "fullName": "João Silva",
    "email": "joao@example.com",
    "phone": "+44 7xxx xxx xxx"
  }
}
```

**Response:**
```json
{
  "success": true,
  "bookingId": "uuid-booking-id",
  "totalPrice": 195.00,
  "currency": "GBP",
  "paymentIntentId": "pi_stripe_payment_intent",
  "estimatedArrival": "2025-08-20T14:15:00Z"
}
```

#### GET /api/chauffeur/bookings/{id}
Retrieve booking details

**Response:**
```json
{
  "id": "uuid",
  "serviceTier": "premium",
  "bookingDate": "2025-08-20",
  "bookingTime": "14:30",
  "pickupLocation": "Hotel Address",
  "destinations": "The Ritz London",
  "status": "confirmed",
  "totalPrice": 195.00,
  "driver": {
    "name": "Carlos Santos",
    "phone": "+44 7xxx xxx xxx",
    "rating": 4.9,
    "languages": ["en", "pt"]
  },
  "vehicle": {
    "make": "BMW",
    "model": "5 Series",
    "color": "Black",
    "licensePlate": "ABC 123"
  }
}
```

#### PUT /api/chauffeur/bookings/{id}/status
Update booking status

**Request Body:**
```json
{
  "status": "confirmed|in_progress|completed|cancelled",
  "notes": "Optional status update notes"
}
```

### 3.2 Driver Management API

#### GET /api/chauffeur/drivers/available
Get available drivers for specific time slot

**Query Parameters:**
- `date`: Booking date (YYYY-MM-DD)
- `time`: Booking time (HH:MM)
- `duration`: Duration in hours
- `serviceType`: Required service type

#### POST /api/chauffeur/assignments
Assign driver to booking

**Request Body:**
```json
{
  "bookingId": "uuid",
  "driverId": "uuid",
  "vehicleId": "uuid",
  "routeOptimization": true
}
```

### 3.3 Real-time Tracking API

#### GET /api/chauffeur/tracking/{assignmentId}
Get real-time location and status

**Response:**
```json
{
  "assignmentId": "uuid",
  "currentLocation": {
    "latitude": 51.5074,
    "longitude": -0.1278,
    "timestamp": "2025-08-20T14:45:00Z"
  },
  "status": "en_route",
  "estimatedArrival": "2025-08-20T14:55:00Z",
  "route": {
    "totalDistance": "5.2 miles",
    "estimatedTime": "12 minutes"
  }
}
```

---

## 4. Integration Points

### 4.1 LusoTown Platform Integration

#### Cart System Integration
```typescript
// Add chauffeur service to LusoTown cart
const cartItem = {
  type: 'business_service' as const,
  title: 'Premium Security Chauffeur',
  description: 'Chauffeur service for cultural event',
  price: 195.00,
  currency: 'GBP',
  businessName: 'LusoTown Security Chauffeur',
  businessCategory: 'Transport & Security',
  serviceType: 'Chauffeur Service',
  metadata: {
    bookingDetails: formData,
    serviceId: 'premium'
  }
}
```

#### Authentication Integration
```typescript
// Use LusoTown authentication system
import { useAuth } from '@/context/AuthContext'

const { user, isAuthenticated } = useAuth()
if (isAuthenticated) {
  // Pre-fill booking form with user details
  setFormData({
    fullName: user.full_name,
    email: user.email,
    phone: user.phone
  })
}
```

### 4.2 Payment Gateway Integration

#### Stripe Integration
```typescript
// Payment processing
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const paymentIntent = await stripe.paymentIntents.create({
  amount: Math.round(totalPrice * 100), // Convert to pence
  currency: 'gbp',
  metadata: {
    bookingId: booking.id,
    serviceType: 'chauffeur',
    clientId: user.id
  }
})
```

### 4.3 External Service Integrations

#### Google Maps API
```typescript
// Route optimization and ETA calculation
const directionsService = new google.maps.DirectionsService()

const route = await directionsService.route({
  origin: pickupLocation,
  destination: destinations,
  travelMode: google.maps.TravelMode.DRIVING,
  optimizeWaypoints: true,
  avoidTolls: false,
  region: 'UK'
})
```

#### SMS/WhatsApp Notifications
```typescript
// Send booking confirmations
const sendNotification = async (booking: Booking) => {
  const message = `Your LusoTown chauffeur booking is confirmed for ${booking.date} at ${booking.time}. Driver: ${booking.driver.name}. Track: ${trackingUrl}`
  
  await twilioClient.messages.create({
    body: message,
    from: '+447xxxxxxxxx',
    to: booking.clientPhone
  })
}
```

---

## 5. Security & Compliance

### 5.1 Data Protection (GDPR)

#### Personal Data Handling
- **Data Minimization:** Only collect necessary booking information
- **Consent Management:** Clear opt-in for marketing communications
- **Right to Erasure:** Automated data deletion after retention period
- **Data Portability:** Export functionality for customer data
- **Breach Notification:** Automated alert system for security incidents

#### Database Security
```sql
-- Row Level Security (RLS) policies
ALTER TABLE chauffeur_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings" ON chauffeur_bookings
    FOR SELECT USING (client_id = auth.uid());

CREATE POLICY "Drivers can view assigned bookings" ON chauffeur_bookings
    FOR SELECT USING (
        id IN (
            SELECT booking_id FROM chauffeur_assignments 
            WHERE driver_id = auth.uid()
        )
    );
```

### 5.2 Payment Security

#### PCI DSS Compliance
- **No Card Storage:** All payment data handled by Stripe
- **Secure Transmission:** TLS 1.3 encryption for all transactions
- **Token-based Processing:** Use payment tokens instead of card details
- **Audit Logging:** Comprehensive transaction logging

### 5.3 Driver and Vehicle Security

#### Background Checks
- Enhanced DBS (Disclosure and Barring Service) checks
- Right to work verification
- Professional reference checks
- Medical fitness certificates
- Regular re-verification (annually)

#### Vehicle Safety
- Commercial insurance requirements
- Regular safety inspections
- GPS tracking and monitoring
- Emergency communication systems
- Maintenance record tracking

---

## 6. Performance & Monitoring

### 6.1 System Performance Metrics

#### Key Performance Indicators (KPIs)
- **Booking Conversion Rate:** Target 85%
- **API Response Times:** < 500ms for booking operations
- **Database Query Performance:** < 100ms for standard queries
- **System Uptime:** 99.9% availability target
- **Payment Processing Success:** > 99% success rate

#### Monitoring Stack
```typescript
// Performance monitoring setup
import { Analytics } from '@vercel/analytics'
import { SpeedInsights } from '@vercel/speed-insights'

// Real-time error tracking
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV
})
```

### 6.2 Business Intelligence

#### Analytics Dashboard
- **Booking Patterns:** Peak times and seasonal trends
- **Service Performance:** Popular tiers and packages
- **Customer Satisfaction:** Ratings and feedback analysis
- **Revenue Analytics:** Daily, weekly, monthly reporting
- **Driver Performance:** Efficiency and customer ratings

#### Data Export and Reporting
```sql
-- Weekly performance report query
SELECT 
    DATE_TRUNC('week', booking_date) as week,
    service_tier,
    COUNT(*) as bookings,
    SUM(total_price) as revenue,
    AVG(rating) as avg_rating
FROM chauffeur_bookings cb
LEFT JOIN chauffeur_ratings cr ON cb.id = cr.booking_id
WHERE booking_date >= NOW() - INTERVAL '12 weeks'
GROUP BY week, service_tier
ORDER BY week DESC, service_tier;
```

---

## 7. Deployment & Infrastructure

### 7.1 Production Environment

#### Vercel Deployment Configuration
```json
{
  "name": "lusotown-chauffeur",
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase_url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase_anon_key",
    "STRIPE_SECRET_KEY": "@stripe_secret_key",
    "STRIPE_WEBHOOK_SECRET": "@stripe_webhook_secret"
  }
}
```

#### Supabase Configuration
```toml
[api]
enabled = true
port = 54321
schemas = ["public", "chauffeur"]
extra_search_path = ["public", "extensions"]
max_rows = 1000

[db]
port = 54322
major_version = 15
```

### 7.2 Continuous Integration/Deployment

#### GitHub Actions Workflow
```yaml
name: Deploy Chauffeur Services

on:
  push:
    branches: [main]
    paths: ['web-app/src/app/chauffeur/**', 'web-app/src/components/Chauffeur*']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test:chauffeur
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## 8. Testing Strategy

### 8.1 Unit Testing

#### Component Testing
```typescript
// ChauffeurBookingForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import ChauffeurBookingForm from '@/components/ChauffeurBookingForm'

describe('ChauffeurBookingForm', () => {
  test('validates required fields', async () => {
    render(<ChauffeurBookingForm isOpen={true} onClose={jest.fn()} />)
    
    fireEvent.click(screen.getByText('Next'))
    
    expect(screen.getByText('Full name is required')).toBeInTheDocument()
    expect(screen.getByText('Email is required')).toBeInTheDocument()
  })
})
```

#### API Testing
```typescript
// booking.test.ts
describe('Booking API', () => {
  test('creates booking with valid data', async () => {
    const bookingData = {
      serviceType: 'tier',
      serviceId: 'premium',
      bookingDate: '2025-08-20',
      // ... other required fields
    }
    
    const response = await request(app)
      .post('/api/chauffeur/bookings')
      .send(bookingData)
      .expect(201)
    
    expect(response.body.bookingId).toBeDefined()
    expect(response.body.totalPrice).toBe(195.00)
  })
})
```

### 8.2 Integration Testing

#### End-to-End Testing
```typescript
// chauffeur-booking.e2e.ts
describe('Chauffeur Booking Flow', () => {
  test('complete booking process', async () => {
    await page.goto('/chauffeur')
    await page.click('[data-testid="premium-tier-book-now"]')
    
    // Fill booking form
    await page.fill('[data-testid="full-name"]', 'João Silva')
    await page.fill('[data-testid="email"]', 'joao@example.com')
    
    // Complete booking
    await page.click('[data-testid="confirm-booking"]')
    
    // Verify success
    await expect(page.locator('[data-testid="booking-success"]')).toBeVisible()
  })
})
```

---

## 9. Maintenance & Troubleshooting

### 9.1 Common Issues and Solutions

#### Booking System Issues
| Issue | Symptoms | Solution |
|-------|----------|----------|
| Payment failures | Booking created but payment not processed | Check Stripe webhook configuration |
| Driver assignment errors | No available drivers shown | Verify driver availability logic and database |
| GPS tracking issues | Location not updating | Check GPS service integration and API limits |
| Email notifications not sent | Customers not receiving confirmations | Verify email service configuration |

#### Performance Issues
| Issue | Symptoms | Solution |
|-------|----------|----------|
| Slow booking form | Form submission takes > 5 seconds | Optimize database queries and add indexes |
| Driver dashboard lag | Real-time updates delayed | Check WebSocket connections and reduce polling frequency |
| Search performance | Slow driver/vehicle lookup | Add database indexes and implement caching |

### 9.2 Monitoring and Alerts

#### Critical Alert Triggers
- Payment processing failure rate > 5%
- API response time > 2 seconds
- Database connection failures
- Driver assignment failures
- Customer booking abandonment > 50%

#### Log Management
```typescript
// Structured logging for troubleshooting
import { logger } from '@/lib/logger'

logger.info('Booking created', {
  bookingId: booking.id,
  serviceType: booking.serviceType,
  totalPrice: booking.totalPrice,
  clientId: booking.clientId
})

logger.error('Payment processing failed', {
  bookingId: booking.id,
  paymentIntentId: paymentIntent.id,
  error: error.message
})
```

---

## 10. Future Enhancements

### 10.1 Planned Features

#### Mobile Application
- Native iOS/Android app for customers
- Driver mobile app for job management
- Real-time GPS tracking
- Push notifications
- Offline capability

#### Advanced Analytics
- Predictive demand modeling
- Dynamic pricing algorithms
- Customer behavior analysis
- Route optimization AI
- Performance benchmarking

#### Integration Expansions
- Calendar system integration
- CRM system connectivity
- Accounting software integration
- Fleet management systems
- Emergency services connectivity

### 10.2 Technology Roadmap

#### Short-term (3 months)
- Enhanced real-time tracking
- Automated driver assignment
- Advanced reporting dashboard
- Mobile-responsive improvements

#### Medium-term (6 months)
- AI-powered route optimization
- Predictive maintenance for vehicles
- Customer preference learning
- Multi-language support expansion

#### Long-term (12 months)
- Full mobile application suite
- Electric vehicle fleet integration
- Autonomous vehicle preparation
- International service expansion

---

## Contact Information

**Technical Support:** tech@lusotown.com  
**API Documentation:** api.lusotown.com/chauffeur  
**System Status:** status.lusotown.com  
**Developer Portal:** developers.lusotown.com

---

*This technical documentation is maintained by the LusoTown development team and updated with each system release. Last updated: August 15, 2025*