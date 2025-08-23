# 💰 LusoTown Ad-Revenue System - Complete Architecture

## 🎯 SYSTEM OVERVIEW

Self-hosted ad-revenue system for LusoTown streaming platform with Google AdSense, Video.js integration, real-time analytics, and automated ad insertion.

---

## 🏗️ ARCHITECTURE COMPONENTS

### **1. Frontend (React + Tailwind)**
```
📱 Video Player (Video.js)
├── Pre-roll Ads
├── Mid-roll Ads (every 10 minutes)
├── Overlay Banner Ads
└── Post-roll Ads

📊 Admin Dashboard
├── Revenue Analytics
├── Ad Performance Metrics
├── Campaign Management
└── Real-time Statistics
```

### **2. Backend (Node.js + Express)**
```
🖥️ API Server
├── Ad Delivery Engine
├── Revenue Tracking
├── Analytics Processing
├── User Targeting
└── Campaign Management

💾 Database (PostgreSQL)
├── Revenue Records
├── Ad Impressions
├── User Analytics
├── Campaign Data
└── Performance Metrics
```

### **3. Ad Integration Layer**
```
🎯 Ad Networks
├── Google AdSense (Primary)
├── Ezoic (Secondary)
├── Propeller Ads (Fallback)
└── Direct Banner Sponsors

📍 Targeting Engine
├── IP-based GeoLocation
├── Country-specific Campaigns
├── Portuguese-speaking community Focus
└── Fallback LusoTown Promotions
```

---

## 📁 PROJECT STRUCTURE

```
lusotown-ad-revenue/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── VideoPlayer.jsx       # Video.js with ad integration
│   │   │   ├── AdDashboard.jsx       # Admin revenue dashboard
│   │   │   ├── AdBanner.jsx          # Banner ad component
│   │   │   └── RevenueStats.jsx      # Real-time stats
│   │   ├── services/
│   │   │   ├── adService.js          # Ad delivery API calls
│   │   │   └── analyticsService.js   # Analytics tracking
│   │   └── utils/
│   │       ├── adUtils.js            # Ad placement logic
│   │       └── geoTarget.js          # Location targeting
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── adController.js       # Ad delivery logic
│   │   │   ├── revenueController.js  # Revenue tracking
│   │   │   └── analyticsController.js # Analytics API
│   │   ├── models/
│   │   │   ├── AdCampaign.js         # Campaign data model
│   │   │   ├── Revenue.js            # Revenue records
│   │   │   └── Impression.js         # Ad impression tracking
│   │   ├── services/
│   │   │   ├── adenseService.js      # Google AdSense integration
│   │   │   ├── geoService.js         # IP geolocation
│   │   │   └── emailService.js       # Daily reports
│   │   ├── middleware/
│   │   │   ├── auth.js               # JWT authentication
│   │   │   └── analytics.js          # Impression tracking
│   │   └── routes/
│   │       ├── ads.js                # Ad delivery routes
│   │       ├── revenue.js            # Revenue API routes
│   │       └── admin.js              # Admin dashboard routes
│   ├── config/
│   │   ├── database.js               # PostgreSQL config
│   │   ├── adsense.js                # AdSense configuration
│   │   └── environment.js            # Environment variables
│   ├── migrations/                   # Database migrations
│   ├── seeds/                        # Sample data
│   └── package.json
├── docker/
│   ├── Dockerfile                    # Production container
│   ├── docker-compose.yml            # Full stack deployment
│   └── nginx.conf                    # Reverse proxy config
├── scripts/
│   ├── deploy.sh                     # Deployment automation
│   ├── backup.sh                     # Database backup
│   └── health-check.sh               # System monitoring
└── docs/
    ├── API.md                        # API documentation
    ├── SETUP.md                      # Installation guide
    └── CONFIGURATION.md              # AdSense setup guide
```

---

## 🎥 VIDEO PLAYER INTEGRATION

### **Video.js Plugin Configuration**
```javascript
// AdPlayer.jsx
import videojs from 'video.js';
import 'videojs-contrib-ads';
import 'videojs-ima';

const AdPlayer = ({ streamUrl, adConfig }) => {
  useEffect(() => {
    const player = videojs('lusotown-player', {
      controls: true,
      fluid: true,
      sources: [{ src: streamUrl, type: 'application/x-mpegURL' }]
    });

    // Google IMA integration
    player.ima({
      adTagUrl: adConfig.prerollTag,
      adsRenderingSettings: {
        enablePreloading: true,
        restoreCustomPlaybackStateOnAdBreakComplete: true
      },
      adLabel: 'Advertisement'
    });

    // Mid-roll ads every 10 minutes
    player.on('timeupdate', () => {
      const currentTime = player.currentTime();
      if (currentTime % 600 === 0 && currentTime > 0) {
        player.ima.requestAds(adConfig.midrollTag);
      }
    });

    // Revenue tracking
    player.on('ads-ad-started', () => {
      trackImpression('video_ad', currentTime);
    });

    return () => player.dispose();
  }, []);

  return (
    <div className="relative">
      <video 
        id="lusotown-player"
        className="video-js vjs-default-skin w-full"
        controls
        preload="auto"
        poster="/images/stream-poster.jpg"
      />
      
      {/* Overlay Banner Ads */}
      <AdBanner 
        position="overlay" 
        targeting={{ country: userCountry, language: 'pt' }}
        onImpression={() => trackImpression('overlay_banner')}
      />
    </div>
  );
};
```

---

## 📊 REVENUE DASHBOARD

### **Real-time Analytics Component**
```javascript
// RevenueDashboard.jsx
const RevenueDashboard = () => {
  const [stats, setStats] = useState({
    todayRevenue: 0,
    totalImpressions: 0,
    cpm: 0,
    topCountries: []
  });

  useEffect(() => {
    // Real-time updates via WebSocket
    const ws = new WebSocket('ws://localhost:3001/analytics');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStats(prev => ({
        ...prev,
        ...data
      }));
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard 
        title="Today's Revenue"
        value={`£${stats.todayRevenue.toFixed(2)}`}
        trend="+12%"
        color="green"
      />
      <StatsCard 
        title="Total Impressions"
        value={stats.totalImpressions.toLocaleString()}
        trend="+8%"
        color="blue"
      />
      <StatsCard 
        title="Average CPM"
        value={`£${stats.cpm.toFixed(2)}`}
        trend="+5%"
        color="purple"
      />
      
      <RevenueChart data={stats.dailyRevenue} />
      <CountryBreakdown countries={stats.topCountries} />
      <AdPerformanceTable campaigns={stats.campaigns} />
    </div>
  );
};
```

---

## 🎯 AD TARGETING ENGINE

### **Geographic and Cultural Targeting**
```javascript
// adTargeting.js
export const getTargetedAds = async (userIP, userAgent) => {
  const geoData = await getGeoLocation(userIP);
  
  const targeting = {
    country: geoData.country,
    language: detectLanguage(userAgent),
    isPortugueseSpeaker: isPortugueseCountry(geoData.country),
    deviceType: detectDevice(userAgent)
  };

  // Priority order for ad networks
  const adNetworks = [
    {
      name: 'Google AdSense',
      condition: () => true,
      getAd: () => getAdSenseAd(targeting)
    },
    {
      name: 'Ezoic',
      condition: () => geoData.country === 'GB',
      getAd: () => getEzoicAd(targeting)
    },
    {
      name: 'Propeller',
      condition: () => !targeting.isPortugueseSpeaker,
      getAd: () => getPropellerAd(targeting)
    },
    {
      name: 'LusoTown Direct',
      condition: () => true, // Fallback
      getAd: () => getLusoTownPromoAd()
    }
  ];

  for (const network of adNetworks) {
    if (network.condition()) {
      try {
        const ad = await network.getAd();
        if (ad) {
          await logImpression(network.name, targeting);
          return ad;
        }
      } catch (error) {
        console.log(`${network.name} failed:`, error);
      }
    }
  }

  // Ultimate fallback
  return getLusoTownPromoAd();
};
```

---

## 💾 DATABASE SCHEMA

### **PostgreSQL Tables**
```sql
-- Revenue tracking
CREATE TABLE revenue_records (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  ad_network VARCHAR(50) NOT NULL,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  revenue DECIMAL(10,4) DEFAULT 0,
  cpm DECIMAL(8,4) DEFAULT 0,
  country VARCHAR(2),
  device_type VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ad impressions tracking
CREATE TABLE ad_impressions (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(100),
  ad_type VARCHAR(50), -- 'preroll', 'midroll', 'banner', 'overlay'
  ad_network VARCHAR(50),
  user_ip INET,
  user_country VARCHAR(2),
  user_agent TEXT,
  stream_id VARCHAR(100),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  revenue_generated DECIMAL(8,4) DEFAULT 0
);

-- Campaign management
CREATE TABLE ad_campaigns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  ad_network VARCHAR(50) NOT NULL,
  targeting_rules JSONB,
  daily_budget DECIMAL(8,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance metrics
CREATE TABLE daily_stats (
  id SERIAL PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  total_impressions INTEGER DEFAULT 0,
  total_clicks INTEGER DEFAULT 0,
  total_revenue DECIMAL(10,4) DEFAULT 0,
  unique_viewers INTEGER DEFAULT 0,
  top_countries JSONB,
  avg_session_duration INTEGER DEFAULT 0
);
```

---

## 🔧 BACKEND API ROUTES

### **Revenue Tracking API**
```javascript
// routes/revenue.js
router.get('/stats/daily', async (req, res) => {
  const { start_date, end_date } = req.query;
  
  const stats = await db.query(`
    SELECT 
      date,
      SUM(revenue) as daily_revenue,
      SUM(impressions) as daily_impressions,
      AVG(cpm) as avg_cpm
    FROM revenue_records 
    WHERE date BETWEEN $1 AND $2
    GROUP BY date 
    ORDER BY date DESC
  `, [start_date, end_date]);
  
  res.json({ success: true, data: stats.rows });
});

router.post('/track/impression', async (req, res) => {
  const { ad_type, ad_network, stream_id, user_data } = req.body;
  
  const geoData = await getGeoFromIP(req.ip);
  
  await db.query(`
    INSERT INTO ad_impressions 
    (ad_type, ad_network, stream_id, user_ip, user_country, user_agent)
    VALUES ($1, $2, $3, $4, $5, $6)
  `, [ad_type, ad_network, stream_id, req.ip, geoData.country, req.get('User-Agent')]);
  
  res.json({ success: true });
});

router.get('/stats/realtime', (req, res) => {
  // WebSocket connection for real-time stats
  const ws = req.ws;
  
  setInterval(async () => {
    const liveStats = await getCurrentStats();
    ws.send(JSON.stringify(liveStats));
  }, 5000);
});
```

---

## 🚀 DEPLOYMENT CONFIGURATION

### **Docker Setup**
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Backend setup
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --only=production

# Frontend build
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci && npm run build

# Copy application code
COPY backend/ ./backend/
COPY frontend/dist/ ./frontend/dist/

# Install PM2 for process management
RUN npm install -g pm2

EXPOSE 3000 3001

CMD ["pm2-runtime", "ecosystem.config.js"]
```

### **Docker Compose**
```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: lusotown_ads
      POSTGRES_USER: lusotown
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  app:
    build: .
    ports:
      - "3000:3000"
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://lusotown:${DB_PASSWORD}@postgres:5432/lusotown_ads
      - REDIS_URL=redis://redis:6379
      - ADSENSE_CLIENT_ID=${ADSENSE_CLIENT_ID}
      - ADSENSE_PUBLISHER_ID=${ADSENSE_PUBLISHER_ID}
    depends_on:
      - postgres
      - redis

volumes:
  postgres_data:
```

---

## 📧 AUTOMATED REPORTING

### **Daily Revenue Email**
```javascript
// services/emailService.js
const sendDailyReport = async () => {
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  const stats = await db.query(`
    SELECT 
      SUM(revenue) as total_revenue,
      SUM(impressions) as total_impressions,
      AVG(cpm) as avg_cpm,
      COUNT(DISTINCT user_country) as countries_reached
    FROM revenue_records 
    WHERE date = $1
  `, [yesterday]);

  const htmlReport = `
    <h2>LusoTown Daily Revenue Report - ${yesterday}</h2>
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
      <h3>📊 Yesterday's Performance</h3>
      <ul>
        <li><strong>Total Revenue:</strong> £${stats.rows[0].total_revenue}</li>
        <li><strong>Total Impressions:</strong> ${stats.rows[0].total_impressions}</li>
        <li><strong>Average CPM:</strong> £${stats.rows[0].avg_cpm}</li>
        <li><strong>Countries Reached:</strong> ${stats.rows[0].countries_reached}</li>
      </ul>
      
      <h3>🎯 Top Performing Ads</h3>
      ${await getTopAdsHTML(yesterday)}
      
      <h3>🌍 Geographic Performance</h3>
      ${await getGeoPerformanceHTML(yesterday)}
    </div>
  `;

  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `LusoTown Revenue Report - £${stats.rows[0].total_revenue}`,
    html: htmlReport
  });
};

// Schedule daily at 9 AM
cron.schedule('0 9 * * *', sendDailyReport);
```

---

## ⚙️ CONFIGURATION

### **Environment Variables**
```bash
# .env
NODE_ENV=production
PORT=3000
WEBSOCKET_PORT=3001

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/lusotown_ads
REDIS_URL=redis://localhost:6379

# Google AdSense
ADSENSE_CLIENT_ID=your_adsense_client_id
ADSENSE_PUBLISHER_ID=ca-pub-your_publisher_id
ADSENSE_SECRET=your_adsense_secret

# Other Ad Networks
EZOIC_API_KEY=your_ezoic_api_key
PROPELLER_SITE_ID=your_propeller_site_id

# Email Reports
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=admin@lusotown.com

# Security
JWT_SECRET=your_jwt_secret_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password

# Geo Targeting
GEOIP_API_KEY=your_geoip_api_key
```

---

## 🎉 SETUP INSTRUCTIONS

### **1. Installation**
```bash
# Clone and setup
git clone https://github.com/yourusername/lusotown-ad-revenue.git
cd lusotown-ad-revenue

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Setup database
createdb lusotown_ads
npm run migrate
npm run seed
```

### **2. AdSense Configuration**
```bash
# Get your AdSense credentials from:
# https://www.google.com/adsense/

# Add to .env file:
ADSENSE_CLIENT_ID=your_client_id
ADSENSE_PUBLISHER_ID=ca-pub-your_id
```

### **3. Deploy to VPS**
```bash
# Build and deploy
docker-compose up -d

# Monitor logs
docker-compose logs -f app
```

### **4. Test the System**
```bash
# Health check
curl http://your-domain:3000/api/health

# Test ad delivery
curl http://your-domain:3000/api/ads/video?country=GB&language=pt

# Check analytics
curl -H "Authorization: Bearer your_token" \
     http://your-domain:3000/api/revenue/stats/daily
```

---

## 📈 EXPECTED REVENUE PERFORMANCE

### **Revenue Projections**
- **Daily Impressions**: 10,000-50,000 (based on stream viewers)
- **Average CPM**: £2-5 (UK market, Portuguese content)
- **Daily Revenue**: £20-250
- **Monthly Revenue**: £600-7,500
- **Annual Revenue**: £7,200-90,000

### **Optimization Strategies**
1. **High-Value Keywords**: Target "Portuguese business London", "Portuguese events UK"
2. **Premium Placements**: Mid-roll ads during business workshops
3. **Geographic Focus**: Higher CPM for UK/Ireland visitors
4. **Cultural Targeting**: Portuguese festival seasons, cultural events
5. **Direct Sponsors**: Local Portuguese businesses and services

---

**🚀 This system will generate significant revenue while maintaining the Portuguese-speaking community focus of LusoTown!**