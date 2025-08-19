# 🚀 LusoTown Streaming Server - IMMEDIATE DEPLOYMENT GUIDE

## ⚡ QUICK DEPLOY TO RAILWAY (2 MINUTES)

### **Step 1: Deploy via Railway Dashboard**

1. **Go to Railway Dashboard**: https://railway.app/new
2. **Connect GitHub**: Select "Deploy from GitHub repo"
3. **Select Repository**: Choose your `LusoTown` repository
4. **Root Directory**: Set to `streaming/` folder
5. **Deploy**: Railway will auto-detect Node.js and deploy

### **Step 2: Set Environment Variables**
After deployment, go to your Railway project settings and add these variables:

```bash
NODE_ENV=production
PORT=3002
HTTP_PORT=8080  
RTMP_PORT=1935
HOST=0.0.0.0
LUSOTOWN_STREAMING_SECRET=lusotown_production_secret_2025_secure
LOG_LEVEL=warn
CORS_ORIGINS=https://lusotown-london.vercel.app
```

### **Step 3: Get Your Production URLs**

After deployment, Railway will provide:
- **Domain**: `your-project-name.up.railway.app`

Your streaming URLs will be:
- **RTMP Server**: `rtmp://your-project-name.up.railway.app:1935/live/[stream_key]`
- **HLS Output**: `https://your-project-name.up.railway.app:8080/live/[stream_key].m3u8`
- **API**: `https://your-project-name.up.railway.app:3002/api/v1/`

---

## 🔧 ALTERNATIVE: Deploy to Render (If Railway doesn't work)

1. **Go to Render**: https://render.com/new/web-service
2. **Connect GitHub**: Select your LusoTown repository
3. **Configuration**:
   - **Root Directory**: `streaming`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Add the same variables as above

---

## 📱 STREAMLABS MOBILE SETUP (After Deployment)

### **Settings for Streamlabs Mobile App:**

```
Platform: Custom RTMP
Server URL: rtmp://[YOUR-RAILWAY-URL]:1935/live/
Stream Key: streamlabs_lusotown_2025
```

### **Quality Settings:**
```
Resolution: 1280x720 (720p)
Frame Rate: 30 FPS
Bitrate: 2500 kbps
Audio: 128 kbps, 44.1 kHz
```

---

## 🌐 UPDATE VERCEL ENVIRONMENT VARIABLES

After getting your Railway URL, add these to your Vercel project:

```bash
NEXT_PUBLIC_STREAMING_SERVER_URL=https://[YOUR-RAILWAY-URL]:3002
NEXT_PUBLIC_HLS_BASE_URL=https://[YOUR-RAILWAY-URL]:8080
NEXT_PUBLIC_RTMP_SERVER_URL=rtmp://[YOUR-RAILWAY-URL]:1935
NEXT_PUBLIC_PORTUGUESE_STREAMING_ENABLED=true
```

---

## ✅ TESTING YOUR DEPLOYMENT

1. **Test Health Check**: Visit `https://[YOUR-RAILWAY-URL]:3002/health`
2. **Test HLS Stream**: Visit `https://[YOUR-RAILWAY-URL]:8080/live/streamlabs_lusotown_2025.m3u8`
3. **Start Mobile Stream**: Use Streamlabs with the RTMP settings above
4. **Watch on Website**: Visit `https://lusotown-london.vercel.app/live`

---

## 🎯 MULTI-PLATFORM STREAMING SETUP

### **Streamlabs Multi-Stream Configuration:**

1. **Primary Destination** (Your Server):
   ```
   Server: rtmp://[YOUR-RAILWAY-URL]:1935/live/
   Key: streamlabs_lusotown_2025
   ```

2. **YouTube Live**:
   ```
   Server: rtmp://a.rtmp.youtube.com/live2/
   Key: [Your YouTube Stream Key]
   ```

3. **Instagram Live**:
   ```
   Server: rtmp://live-api-s.facebook.com:80/rtmp/
   Key: [Your Instagram Stream Key]
   ```

4. **TikTok Live**:
   ```
   Server: rtmp://push.live.tiktok.com/live/
   Key: [Your TikTok Stream Key]
   ```

---

## 📊 NEXT STEPS FOR AD REVENUE

After streaming is working, we'll implement:
1. **Google AdSense Integration**
2. **Real-time Analytics Dashboard**
3. **Revenue Tracking System**
4. **Automated Ad Insertion**

---

**🔴 START HERE**: Deploy to Railway first, then configure Streamlabs!