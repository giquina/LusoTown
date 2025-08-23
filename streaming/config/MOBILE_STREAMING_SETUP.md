# LusoTown Portuguese-speaking community - Mobile Streaming Setup

## Production Streaming Infrastructure

### =� **DEPLOYMENT OPTIONS**

#### Option 1: Railway (Recommended)
```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Deploy from streaming directory
cd streaming
./deploy-railway.sh
```

#### Option 2: Render
```bash
# 1. Connect GitHub repo to Render
# 2. Use render.yaml configuration
# 3. Deploy from Render dashboard
```

#### Option 3: Docker Deployment
```bash
# Build and deploy Docker container
docker build -t lusotown-streaming .
docker run -p 3002:3002 -p 8080:8080 -p 1935:1935 lusotown-streaming
```

### =� **STREAMLABS MOBILE CONFIGURATION**

#### **Stream Settings in Streamlabs Mobile:**
```
Server: rtmp://[PRODUCTION_URL]:1935/live/
Stream Key: streamlabs_lusotown_2025
```

#### **Video Quality Settings:**
- **Resolution:** 1280x720 (720p)
- **Frame Rate:** 30 FPS
- **Bitrate:** 2500 kbps (for stable mobile connection)
- **Encoder:** Hardware (recommended for mobile)

#### **Audio Settings:**
- **Sample Rate:** 44.1 kHz
- **Bitrate:** 128 kbps
- **Channels:** Stereo

### < **VERCEL ENVIRONMENT VARIABLES**

Add these to your Vercel project settings:

```env
# Streaming Infrastructure
NEXT_PUBLIC_STREAMING_SERVER_URL=https://[PRODUCTION_URL]:3002
NEXT_PUBLIC_HLS_BASE_URL=https://[PRODUCTION_URL]:8080
NEXT_PUBLIC_RTMP_SERVER_URL=rtmp://[PRODUCTION_URL]:1935

# Portuguese-speaking community Features
NEXT_PUBLIC_PORTUGUESE_STREAMING_ENABLED=true
NEXT_PUBLIC_CULTURAL_CONTENT_PRIORITY=true
NEXT_PUBLIC_PORTUGUESE_EMOTES_ENABLED=true

# Stream Keys for Portuguese Content
NEXT_PUBLIC_DEFAULT_STREAM_KEY=streamlabs_lusotown_2025
NEXT_PUBLIC_CULTURAL_STREAM_KEY=portuguese_cultural_1755571338759
NEXT_PUBLIC_BUSINESS_STREAM_KEY=portuguese_business_1755571338759
```

### =' **PRODUCTION URLS**

Once deployed, your infrastructure will be available at:

```
< API Server: https://[PRODUCTION_URL]:3002
=� HLS Streams: https://[PRODUCTION_URL]:8080/live/[stream_key].m3u8
=� RTMP Ingestion: rtmp://[PRODUCTION_URL]:1935/live/[stream_key]
=� Health Check: https://[PRODUCTION_URL]:3002/health
=� Stream Stats: https://[PRODUCTION_URL]:3002/api/v1/stats
```

### <� **TESTING WORKFLOW**

1. **Deploy Streaming Server**
   ```bash
   cd streaming
   ./deploy-railway.sh  # Follow prompts
   ```

2. **Configure Vercel Environment**
   - Add production URLs to Vercel environment variables
   - Deploy updated web application

3. **Test Streamlabs Mobile**
   - Open Streamlabs mobile app
   - Configure stream settings with production URLs
   - Start test stream

4. **Verify on Website**
   - Visit https://lusotown-london.vercel.app/live
   - Confirm stream appears in Portuguese-speaking community section
   - Test Portuguese emotes and chat features

### =� **STREAMLABS MOBILE APP SETUP**

#### **Step-by-Step Configuration:**

1. **Download Streamlabs Mobile**
   - iOS: App Store
   - Android: Google Play Store

2. **Stream Configuration**
   ```
   Platform: Custom RTMP
   Server: rtmp://[PRODUCTION_URL]:1935/live/
   Stream Key: streamlabs_lusotown_2025
   ```

3. **Quality Settings**
   ```
   Resolution: 720p (1280x720)
   Frame Rate: 30 FPS
   Bitrate: 2500 kbps
   Audio: 128 kbps, 44.1 kHz
   ```

4. **Portuguese-speaking community Features**
   - Stream Title: "LusoTown Portuguese-speaking community Live"
   - Description: "Portuguese speakers in London - Cultural content"
   - Tags: #Portuguese #London #Community #Cultural

### <� **PORTUGUESE STREAMING FEATURES**

#### **Cultural Content Integration**
- Portuguese emotes: :saudade:, :festa:, :futebol:
- Real-time chat with Portuguese language support
- Cultural event streaming capabilities
- Business workshop streaming for Portuguese entrepreneurs

#### **Community Engagement**
- Live viewer count for Portuguese-speaking community
- Chat moderation in Portuguese/English
- Stream notifications for community members
- Recording capabilities for cultural events

### = **SECURITY & MONITORING**

#### **Production Security**
- Stream key validation
- CORS protection for Portuguese-speaking community domains
- Rate limiting for API endpoints
- Health check monitoring

#### **Monitoring Setup**
```bash
# Check streaming server health
curl https://[PRODUCTION_URL]:3002/health

# Monitor active streams
curl https://[PRODUCTION_URL]:3002/api/v1/stats

# Check Portuguese cultural content
curl https://[PRODUCTION_URL]:3002/api/v1/cultural-streams
```

### =� **TROUBLESHOOTING**

#### **Common Issues & Solutions**

1. **Stream Not Appearing on Website**
   - Check CORS configuration
   - Verify stream key matches configuration
   - Ensure HLS URL is accessible

2. **Mobile App Connection Issues**
   - Confirm RTMP URL is correct
   - Check firewall settings for port 1935
   - Verify stream key is valid

3. **Poor Stream Quality**
   - Reduce bitrate to 1500 kbps for mobile
   - Switch to hardware encoder
   - Check mobile network connection

4. **Portuguese Features Not Working**
   - Verify cultural content flags in environment
   - Check Portuguese emotes configuration
   - Confirm community chat settings

### =� **SUPPORT CHANNELS**

- **Technical Issues:** Check /streaming/logs/ directory
- **Community Support:** Portuguese-speaking community Discord
- **Production Monitoring:** Health check endpoints
- **Performance:** Stream statistics API

###  **PRODUCTION CHECKLIST**

- [ ] Streaming server deployed to Railway/Render
- [ ] Vercel environment variables configured
- [ ] Streamlabs mobile app configured
- [ ] Test stream successfully broadcast
- [ ] Website integration verified
- [ ] Portuguese-speaking community features tested
- [ ] Health monitoring configured
- [ ] Security settings validated
- [ ] Community notification setup
- [ ] Performance metrics tracking

---

**<�<� Ready for Portuguese-speaking community Mobile Streaming!**