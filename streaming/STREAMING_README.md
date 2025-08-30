# LusoTown Portuguese Community Streaming System

Complete streaming infrastructure for Portuguese-speaking community cultural content with LiveKit integration, OBS support, and real-time chat features.

## 🎯 Overview

This streaming system enables Portuguese community members to create and share cultural content including:
- 🎵 **Música**: Fado performances, Kizomba, Portuguese popular music
- 🍽️ **Culinária**: Traditional Portuguese cooking demonstrations  
- 📚 **Cultura & História**: Cultural discussions and educational content
- 💃 **Dança**: Traditional Portuguese dance classes and performances
- 🎨 **Artesanato**: Traditional crafts and artisan demonstrations
- 🎪 **Eventos**: Live community events broadcasting
- 🎤 **Conversas**: Talk shows and community discussions

## 🏗️ Architecture

### Frontend Components
- **StreamDashboard**: Stream creation and management interface
- **StreamViewer**: Live streaming viewer with chat and reactions
- **Portuguese Cultural Categories**: Organized content categorization
- **Real-time Chat**: Multi-language chat with Portuguese cultural reactions

### Backend Services
- **LiveKit Integration**: Professional streaming infrastructure
- **Node.js Server**: Custom streaming server with Portuguese features
- **WebSocket Support**: Real-time chat and reactions
- **Database Integration**: Stream management and analytics

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (web-app) / 22+ (streaming server)
- npm 9+
- Supabase database access
- LiveKit account (optional, can use development mode)

### 1. Install Dependencies

```bash
# Install streaming dependencies in web-app
cd web-app
npm install @livekit/components-react @livekit/components-styles livekit-client livekit-server-sdk socket.io socket.io-client

# Install streaming server dependencies  
cd ../streaming
npm install express cors dotenv concurrently livekit-server-sdk
```

### 2. Environment Configuration

```bash
# Copy environment example
cp .env.example.streaming .env.local

# Edit .env.local with your configuration:
NEXT_PUBLIC_LIVEKIT_URL=wss://lusotown-streaming.livekit.cloud
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
NEXT_PUBLIC_STREAMING_SERVER_URL=http://localhost:8080
```

### 3. Database Setup

```bash
# Apply streaming migrations
cd web-app
npm run db:migrate

# The migration creates:
# - streaming_rooms (Portuguese cultural streams)
# - streaming_sessions (analytics)  
# - streaming_participants (real-time tracking)
# - streaming_categories (Música, Culinária, etc.)
# - streaming_chat_messages (multilingual chat)
# - streaming_reactions (Portuguese cultural expressions)
```

### 4. Start Streaming Infrastructure

```bash
# Terminal 1: Start web application
cd web-app
npm run dev

# Terminal 2: Start LiveKit streaming server  
npm run streaming:dev
# OR manually:
cd ../streaming
npm run dev:livekit

# Terminal 3 (Optional): Start original RTMP server
cd streaming  
npm run dev
```

## 📱 Usage Guide

### For Portuguese Community Members

1. **Access Streaming Dashboard**: Visit `/streaming` on LusoTown
2. **Create Cultural Stream**: Choose from Portuguese categories
3. **OBS Setup**: Follow built-in OBS configuration guide
4. **Go Live**: Start streaming Portuguese cultural content
5. **Engage**: Use Portuguese chat reactions and cultural emojis

### For Viewers

1. **Browse Streams**: Explore Portuguese cultural categories
2. **Join Streams**: Real-time viewing with Portuguese chat
3. **Cultural Reactions**: Express with Portuguese-specific emojis
4. **Community Interaction**: Chat in Portuguese or English

## 🎥 OBS Integration

### Recommended Settings
- **Resolution**: 1920x1080 (desktop) / 1280x720 (mobile)
- **FPS**: 30
- **Video Bitrate**: 2500 kbps (desktop) / 1500 kbps (mobile) 
- **Audio Bitrate**: 160 kbps / 128 kbps
- **Encoder**: x264
- **Preset**: veryfast

### RTMP Configuration
```
Server: rtmp://localhost:1935/live/
Stream Key: [Generated from dashboard]
```

### LiveKit Configuration
```
WebSocket URL: wss://lusotown-streaming.livekit.cloud
Token: [Generated via API]
```

## 🌍 Portuguese Cultural Features

### Streaming Categories
- **Música** 🎵: Fado, Kizomba, Popular, Traditional, Contemporary
- **Culinária** 🍽️: Traditional, Convent Sweets, Fish Dishes, PALOP Cuisine
- **Cultura & História** 📚: History, Traditions, Literature, Heritage, Folk Festivals
- **Dança** 💃: Folk Dance, Kizomba, Corridinho, Vira, Contemporary
- **Artesanato** 🎨: Ceramics, Embroidery, Azulejos, Basketry, Pottery
- **Eventos** 🎪: Folk Festivals, Conferences, Meetups, Celebrations, Workshops
- **Conversas** 🎤: Interviews, Debates, Podcasts, News, Discussions

### Cultural Chat Reactions
- 👏 **Palmas** (Applause)
- ❤️ **Coração** (Love) 
- 🔥 **Fantástico** (Amazing)
- 🎉 **Parabéns** (Celebration)

### Multi-language Support
- **Portuguese**: Native language support
- **English**: Full bilingual interface
- **Regional**: Azores, Madeira, PALOP variations

## 🔧 API Endpoints

### Stream Management
```typescript
POST /api/streaming/token
POST /api/streaming/room/create  
GET /api/streaming/room/create
POST /api/streaming/room/join
```

### Analytics
```typescript
GET /api/streaming/stats
GET /api/streaming/cultural-streams
GET /api/streaming/categories
```

## 📊 Analytics & Monitoring

### Portuguese Community Metrics
- **Active Streams**: Live Portuguese cultural content
- **Cultural Content**: Percentage of cultural vs general streams
- **Portuguese Viewers**: Community engagement tracking
- **Regional Distribution**: Azores, Madeira, Mainland, PALOP
- **Category Preferences**: Most popular cultural categories

### Performance Monitoring
- **Stream Quality**: Automatic quality adjustment
- **Connection Health**: Real-time connection monitoring
- **Chat Activity**: Message frequency and engagement
- **Cultural Reactions**: Portuguese expression usage

## 🛡️ Security & Moderation

### Content Moderation
- **Cultural Guidelines**: Portuguese community standards
- **Automated Detection**: Inappropriate content filtering
- **Community Reporting**: User-driven moderation
- **Admin Controls**: Administrative oversight tools

### Privacy & Data
- **GDPR Compliant**: European data protection standards
- **Secure Tokens**: JWT-based authentication
- **Encrypted Streams**: End-to-end security
- **Privacy Controls**: User privacy preferences

## 🚀 Deployment

### Production Environment
```bash
# Web application deployment (Vercel)
npm run build
vercel --prod

# Streaming server deployment (Railway/Render)
cd streaming
npm run start:livekit
```

### Environment Variables (Production)
```env
# LiveKit Production
NEXT_PUBLIC_LIVEKIT_URL=wss://your-production-livekit.cloud
LIVEKIT_API_KEY=prod_api_key
LIVEKIT_API_SECRET=prod_secret

# Production Features
NEXT_PUBLIC_ENABLE_STREAMING=true
PORTUGUESE_STREAMING_MODERATION=true
STREAMING_ANALYTICS_ENABLED=true
```

## 🧪 Testing

### Stream Testing
```bash
# Test streaming endpoints
npm run test:streaming

# Health check streaming server
npm run streaming:health

# Portuguese cultural content validation
npm run test:portuguese
```

### Load Testing
- **Concurrent Streams**: Test multiple simultaneous streams
- **Viewer Capacity**: Test participant limits
- **Chat Performance**: Test message throughput
- **Cultural Features**: Test Portuguese-specific functionality

## 📈 Roadmap

### Phase 1 ✅ (Completed)
- [x] Basic streaming infrastructure
- [x] Portuguese cultural categories
- [x] LiveKit integration
- [x] Real-time chat
- [x] OBS setup guide

### Phase 2 🔄 (In Progress)  
- [ ] Advanced stream management
- [ ] Portuguese content moderation
- [ ] Mobile streaming app
- [ ] Stream recording/playback
- [ ] Enhanced analytics

### Phase 3 🔮 (Planned)
- [ ] Monetization features
- [ ] Advanced cultural AI
- [ ] Multi-location streaming
- [ ] Educational partnerships
- [ ] PALOP cultural integration

## 🤝 Contributing

### Development Guidelines
1. Follow Portuguese cultural authenticity
2. Maintain bilingual support (PT/EN)
3. Test across all cultural categories
4. Ensure mobile compatibility
5. Respect community guidelines

### Portuguese Community Focus
- **Cultural Sensitivity**: Respect Portuguese traditions
- **Inclusive Design**: Support all PALOP nations
- **Community First**: Prioritize community needs
- **Quality Content**: Promote cultural education

## 📞 Support

- **Technical Issues**: Check `/api/streaming/stats` for system health
- **Cultural Content**: Follow Portuguese community guidelines
- **OBS Setup**: Use built-in setup guide at `/streaming`
- **Community Support**: Contact Portuguese community moderators

---

**LusoTown Portuguese Community Streaming** - *Connecting Portuguese hearts across the UK* 🇵🇹❤️🇬🇧