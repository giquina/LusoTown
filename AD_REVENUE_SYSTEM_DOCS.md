# LusoTown Ad Revenue System Documentation

## Overview

The LusoTown Ad Revenue System is a comprehensive monetization solution designed specifically for the Portuguese community streaming platform. It provides automated ad serving, revenue tracking, and detailed analytics with cultural targeting capabilities.

## Features

### ✅ Ad Integration
- Google AdSense integration
- Ezoic and Propeller Ads support
- Easy ad network swapping via configuration
- Pre-roll, mid-roll, and banner ads for Video.js player
- Fallback LusoTown promotional content

### ✅ Revenue Automation
- Real-time impression and click tracking
- Geographic and cultural context detection
- PostgreSQL database storage with Supabase
- Automated daily/weekly/monthly reporting
- Revenue aggregation and performance metrics

### ✅ User Targeting
- IP-based GeoIP detection
- Portuguese cultural context targeting
- Device type detection (desktop, mobile, tablet)
- Language preference targeting
- Fallback content for non-targeted audiences

### ✅ Backend API
- Node.js + Express API endpoints
- Secure JWT authentication for admin functions
- RESTful ad serving and tracking endpoints
- Real-time statistics and analytics
- Automated cron jobs for data aggregation

### ✅ Frontend Dashboard
- React + Tailwind admin interface
- Real-time revenue monitoring
- Campaign performance analytics
- Portuguese community engagement metrics
- Network configuration management

### ✅ Automation
- Automated ad serving with priority-based selection
- Scheduled ad insertion for live streams and VOD
- Daily email reports to administrators
- Weekly performance summaries
- Automated data cleanup and archival

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Frontend  │    │  Streaming API  │    │   Database      │
│   (Next.js)     │◄──►│  (Express.js)   │◄──►│  (PostgreSQL)   │
│                 │    │                 │    │  (Supabase)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Video.js      │    │   Ad Networks   │    │   Automation    │
│   Player        │    │   (AdSense,     │    │   (Cron Jobs)   │
│   (w/ Ads)      │    │   Ezoic, etc.)  │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Quick Start

### 1. Environment Setup

Copy the environment template:
```bash
cp streaming/.env.example streaming/.env
```

Configure your environment variables:
```env
# Database
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key

# Ad Networks
GOOGLE_ADSENSE_PUBLISHER_ID=pub-your-publisher-id
EZOIC_SITE_ID=your-ezoic-site-id
PROPELLER_ZONE_ID=your-propeller-zone-id

# Email Reporting
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@domain.com
SMTP_PASS=your-email-password
ADMIN_EMAIL=admin@lusotown.com
```

### 2. Database Setup

Apply the ad revenue schema migration:
```bash
cd web-app
npm run db:migrate
```

The migration will create the following tables:
- `ad_networks` - Ad network configurations
- `ad_campaigns` - Campaign management
- `ad_impressions` - Impression tracking
- `ad_clicks` - Click tracking
- `ad_revenue_daily` - Daily aggregated data
- `ad_inventory` - Scheduled ad inventory

### 3. Install Dependencies

```bash
# Web app dependencies (includes Video.js plugins)
cd web-app
npm install

# Streaming server dependencies
cd ../streaming
npm install
```

### 4. Start Services

#### Development Mode
```bash
# Start streaming server with ad system
cd streaming
npm start

# Start web application
cd ../web-app
npm run dev
```

#### Production Mode (Docker)
```bash
# Using the enhanced Docker Compose configuration
docker-compose -f docker-compose-ads.yml up -d
```

### 5. Configure Ad Networks

1. Access the admin dashboard at `/admin`
2. Navigate to the "Ad Networks" section
3. Configure your ad network credentials:
   - **Google AdSense**: Publisher ID, Ad Client ID
   - **Ezoic**: Site ID, API Key
   - **Propeller**: Zone ID, Website ID

### 6. Enable Automation

Start the ad revenue automation system:
```bash
cd streaming
node scripts/ad-automation.js
```

This will setup cron jobs for:
- Hourly revenue aggregation
- Daily email reports (8 AM)
- Weekly summaries (Monday 9 AM)
- Monthly data cleanup

## API Endpoints

### Ad Serving API

#### GET `/api/ads/config`
Get available ad network configuration (public)

#### POST `/api/ads/serve`
Request an ad for specific context
```json
{
  "position": "preroll|midroll|banner_overlay|display_banner",
  "contentType": "stream|vod|page",
  "streamId": "optional-stream-id",
  "contentId": "optional-content-id"
}
```

#### POST `/api/ads/impression`
Track ad impression
```json
{
  "campaignId": "campaign-uuid",
  "networkId": "network-uuid",
  "position": "preroll",
  "streamId": "optional-stream-id",
  "viewDuration": 15,
  "wasCompleted": true
}
```

#### POST `/api/ads/click`
Track ad click
```json
{
  "impressionId": "impression-uuid",
  "campaignId": "campaign-uuid",
  "networkId": "network-uuid",
  "clickUrl": "https://destination-url.com"
}
```

### Analytics API

#### GET `/api/ads/stats/revenue`
Get revenue statistics
- Query params: `period` (today|week|month|custom), `startDate`, `endDate`

#### GET `/api/ads/stats/campaigns`
Get campaign performance statistics

## Integration Guide

### Video.js Player Integration

The `StreamPlayerWithAds` component provides complete ad integration:

```jsx
import { StreamPlayerWithAds } from '@/components/StreamPlayerWithAds';

<StreamPlayerWithAds
  streamId="your-stream-id"
  hlsUrl="https://your-stream.m3u8"
  isLive={true}
  enableAds={true}
  adConfig={{
    prerollEnabled: true,
    midrollEnabled: false,
    bannerEnabled: true
  }}
/>
```

### Ad Network Configuration

#### Google AdSense
1. Create AdSense account and get Publisher ID
2. Configure ad units in AdSense dashboard
3. Add Publisher ID to environment variables
4. Enable AdSense in admin dashboard

#### Ezoic
1. Sign up for Ezoic account
2. Add your domain to Ezoic
3. Get Site ID and API key
4. Configure in admin dashboard

#### Propeller Ads
1. Create Propeller Ads account
2. Set up ad zones for your site
3. Get Zone ID and Website ID
4. Configure in admin dashboard

### Portuguese Cultural Targeting

The system automatically detects Portuguese cultural context:

- **Portugal** (`PT` country code)
- **Brazil** (`BR` country code)
- **UK Portuguese** (`GB` + Portuguese language)
- **Lusophone Africa** (Angola, Mozambique, etc.)
- **Portuguese Diaspora** (Portuguese language, other countries)

## Performance Optimization

### Database Indexing
The migration includes optimized indexes for:
- Campaign and network lookups
- Time-based queries
- Geographic filtering
- Cultural context filtering

### Caching Strategy
- Redis caching for ad configurations
- In-memory caching for frequently accessed campaigns
- CDN-friendly ad content delivery

### Resource Management
- Automatic cleanup of old impression data (6 months)
- Efficient aggregation queries
- Optimized database connections

## Monitoring and Analytics

### Revenue Metrics
- Total revenue by period
- Revenue by geographic region
- Revenue by cultural context
- Revenue by ad network
- Revenue by campaign type

### Performance Metrics
- Click-through rates (CTR)
- Cost per mille (CPM)
- Cost per click (CPC)
- Fill rates by network
- Completion rates for video ads

### Portuguese Community Insights
- Engagement by cultural context
- Device usage patterns
- Geographic distribution
- Language preferences
- Content performance

## Email Reporting

### Daily Reports
Sent at 8 AM daily, includes:
- Previous day revenue summary
- Top performing campaigns
- Portuguese community breakdown
- Network performance comparison

### Weekly Reports
Sent Monday at 9 AM, includes:
- Week-over-week growth
- Trending campaigns
- Geographic insights
- Performance recommendations

## Security Features

### Data Protection
- JWT authentication for admin endpoints
- Row-level security (RLS) on database tables
- IP-based rate limiting
- Encrypted sensitive configuration

### Privacy Compliance
- GDPR-compliant data handling
- No personal data collection without consent
- Automatic data retention policies
- User privacy controls

## Troubleshooting

### Common Issues

#### Ads Not Displaying
1. Check ad network configuration in admin dashboard
2. Verify environment variables are set correctly
3. Check browser console for JavaScript errors
4. Confirm Video.js plugins are loaded

#### Revenue Not Tracking
1. Verify Supabase connection
2. Check database permissions
3. Monitor API endpoint responses
4. Review server logs for errors

#### Email Reports Not Sending
1. Verify SMTP configuration
2. Check email credentials
3. Confirm admin email address
4. Review automation service logs

### Logs and Debugging

#### Server Logs
```bash
# View streaming server logs
docker logs lusotown-streaming-server

# View automation logs
docker logs lusotown-ad-automation
```

#### Database Queries
```sql
-- Check recent impressions
SELECT * FROM ad_impressions 
ORDER BY impression_time DESC 
LIMIT 10;

-- Check revenue by network
SELECT 
  an.name,
  SUM(ai.revenue_amount) as total_revenue
FROM ad_impressions ai
JOIN ad_networks an ON ai.network_id = an.id
WHERE DATE(ai.impression_time) = CURRENT_DATE
GROUP BY an.name;
```

## Deployment

### VPS Deployment (Recommended)

Minimum requirements:
- 1 GB RAM
- 1 CPU core
- 20 GB storage
- Ubuntu 20.04 LTS

```bash
# Clone repository
git clone https://github.com/giquina/LusoTown.git
cd LusoTown

# Copy and configure environment
cp streaming/.env.example streaming/.env
# Edit streaming/.env with your configuration

# Install Docker and Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Start services
docker-compose -f docker-compose-ads.yml up -d

# Apply database migrations
docker exec lusotown-web npm run db:migrate
```

### Production Considerations

#### SSL Configuration
```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /api/ads/ {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### Environment Variables for Production
```env
NODE_ENV=production
ALLOWED_ORIGINS=https://your-domain.com
RATE_LIMIT_REQUESTS_PER_HOUR=1000
PERFORMANCE_MONITORING_ENABLED=true
ERROR_REPORTING_ENABLED=true
```

## Support and Maintenance

### Regular Maintenance Tasks
- Weekly database optimization
- Monthly ad network performance review
- Quarterly targeting optimization
- Annual security audit

### Performance Monitoring
- Response time monitoring
- Error rate tracking
- Revenue trend analysis
- User engagement metrics

### Backup Strategy
- Daily database backups
- Weekly configuration backups
- Monthly full system backups
- Disaster recovery planning

## Contributing

### Development Setup
1. Fork the repository
2. Create feature branch
3. Install dependencies
4. Run tests
5. Submit pull request

### Code Standards
- ESLint configuration for JavaScript
- TypeScript for type safety
- Prettier for code formatting
- Jest for unit testing

### Testing
```bash
# Run unit tests
cd web-app
npm test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

## License

This ad revenue system is part of the LusoTown platform and is licensed under the MIT License. See the LICENSE file for details.

## Contact

For technical support or questions about the ad revenue system:
- Email: dev@lusotown.com
- GitHub Issues: https://github.com/giquina/LusoTown/issues
- Documentation: https://docs.lusotown.com

---

**LusoTown**: Connecting Portuguese speakers in London & UK through innovative community technology and sustainable monetization.