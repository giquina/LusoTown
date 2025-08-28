# 🚀 LusoTown Streaming Deployment - Manual Checklist

## ⏱️ **TOTAL TIME: 5-10 MINUTES**

Follow these steps in order to get your streaming server live and start streaming from your phone to your website.

---

## 📋 **PHASE 1: DEPLOY STREAMING SERVER TO RAILWAY**

### ✅ **Step 1.1: Access Railway Dashboard**
- [ ] Go to https://railway.app/login
- [ ] Sign in with your GitHub account
- [ ] Click **"New Project"** button

### ✅ **Step 1.2: Deploy from GitHub**
- [ ] Click **"Deploy from GitHub repo"**
- [ ] Select your **"LusoTown"** repository
- [ ] In the **"Root Directory"** field, enter: `streaming`
- [ ] Click **"Deploy Now"**
- [ ] Wait 2-3 minutes for deployment to complete

### ✅ **Step 1.3: Configure Environment Variables**
After deployment completes:
- [ ] Click on your deployed project
- [ ] Go to **"Variables"** tab
- [ ] Add these variables one by one (click "+ New Variable" for each):

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

### ✅ **Step 1.4: Get Your Production URL**
- [ ] Go to **"Deployments"** tab
- [ ] Copy your Railway domain (looks like: `your-project-name.up.railway.app`)
- [ ] **Write it down here:** `_________________________`

### ✅ **Step 1.5: Test Your Streaming Server**
- [ ] Visit: `https://[YOUR-RAILWAY-URL]:3002/health`
- [ ] You should see: `{"service":"LusoTown Portuguese Streaming","status":"healthy"}`

---

## 📱 **PHASE 2: CONFIGURE STREAMLABS MOBILE**

### ✅ **Step 2.1: Download Streamlabs App**
- [ ] **iPhone:** App Store → Search "Streamlabs" → Install
- [ ] **Android:** Google Play → Search "Streamlabs" → Install

### ✅ **Step 2.2: Create Account & Setup**
- [ ] Open Streamlabs app
- [ ] Create account or sign in
- [ ] Skip any platform connections (we'll use custom RTMP)

### ✅ **Step 2.3: Configure Custom RTMP**
- [ ] Go to **Settings** (gear icon)
- [ ] Select **"Stream Settings"**
- [ ] Choose **"Custom RTMP"**
- [ ] Enter these settings:

**Server URL:** `rtmp://[YOUR-RAILWAY-URL]:1935/live/`
**Stream Key:** `streamlabs_lusotown_2025`

### ✅ **Step 2.4: Optimize Quality Settings**
- [ ] In Stream Settings, set:
  - **Resolution:** 720p (1280x720)
  - **Frame Rate:** 30 FPS
  - **Bitrate:** 2500 kbps
  - **Audio:** 128 kbps

### ✅ **Step 2.5: Test Connection**
- [ ] Tap **"Test Connection"** or **"Go Live"**
- [ ] Grant camera and microphone permissions
- [ ] You should see "Connected" status

---

## 🌐 **PHASE 3: UPDATE VERCEL ENVIRONMENT VARIABLES**

### ✅ **Step 3.1: Access Vercel Dashboard**
- [ ] Go to https://vercel.com/dashboard
- [ ] Find your **"lusotown-london"** project
- [ ] Click on the project

### ✅ **Step 3.2: Add Environment Variables**
- [ ] Go to **"Settings"** tab
- [ ] Click **"Environment Variables"**
- [ ] Add these variables (click "Add" for each):

```bash
Name: NEXT_PUBLIC_STREAMING_SERVER_URL
Value: https://[YOUR-RAILWAY-URL]:3002

Name: NEXT_PUBLIC_HLS_BASE_URL  
Value: https://[YOUR-RAILWAY-URL]:8080

Name: NEXT_PUBLIC_RTMP_SERVER_URL
Value: rtmp://[YOUR-RAILWAY-URL]:1935

Name: NEXT_PUBLIC_PORTUGUESE_STREAMING_ENABLED
Value: true
```

### ✅ **Step 3.3: Redeploy Website**
- [ ] Go to **"Deployments"** tab
- [ ] Click **"..."** menu on latest deployment
- [ ] Click **"Redeploy"**
- [ ] Wait 2-3 minutes for redeployment

---

## 🧪 **PHASE 4: TEST END-TO-END STREAMING**

### ✅ **Step 4.1: Start Mobile Stream**
- [ ] Open Streamlabs mobile app
- [ ] Point camera at something interesting
- [ ] Tap **"Go Live"** button
- [ ] Confirm you see "Live" indicator in app

### ✅ **Step 4.2: Verify Stream on Website**
- [ ] Open browser to: `https://lusotown-london.vercel.app/live`
- [ ] You should see your live stream playing automatically
- [ ] Test the player controls (play/pause/volume)

### ✅ **Step 4.3: Check Stream URL Directly**
- [ ] Visit: `https://[YOUR-RAILWAY-URL]:8080/live/streamlabs_lusotown_2025.m3u8`
- [ ] You should see HLS playlist data (text file with stream segments)

### ✅ **Step 4.4: Test Stream Statistics**
- [ ] Visit: `https://[YOUR-RAILWAY-URL]:3002/api/v1/stats`
- [ ] You should see streaming statistics JSON

---

## 🎉 **PHASE 5: CELEBRATE & OPTIMIZE**

### ✅ **Step 5.1: Confirm Everything Works**
- [ ] Stream from phone ✅
- [ ] Stream appears on website ✅ 
- [ ] Real-time viewer count updates ✅
- [ ] Portuguese cultural features working ✅

### ✅ **Step 5.2: Share Your Live Stream**
- [ ] **Website URL:** `https://lusotown-london.vercel.app/live`
- [ ] **Direct Stream URL:** `https://[YOUR-RAILWAY-URL]:8080/live/streamlabs_lusotown_2025.m3u8`
- [ ] Share on social media to drive traffic to your website!

---

## 🚨 **TROUBLESHOOTING**

### **Problem: Can't connect from Streamlabs**
- [ ] Double-check Railway URL is correct
- [ ] Ensure RTMP port 1935 is included in URL
- [ ] Verify stream key: `streamlabs_lusotown_2025`
- [ ] Check Railway environment variables are set

### **Problem: Stream not showing on website**  
- [ ] Confirm Vercel environment variables are set
- [ ] Wait 5-10 minutes for DNS propagation
- [ ] Try refreshing the page
- [ ] Check browser console for errors

### **Problem: Railway deployment failed**
- [ ] Ensure `streaming` folder is set as root directory
- [ ] Check deployment logs in Railway dashboard
- [ ] Verify all environment variables are set correctly

### **Problem: Stream is laggy or poor quality**
- [ ] Reduce bitrate to 1500 kbps
- [ ] Lower resolution to 480p
- [ ] Check your internet connection speed
- [ ] Move closer to WiFi router

---

## 📱 **MULTI-PLATFORM STREAMING (BONUS)**

Once basic streaming works, you can stream to multiple platforms simultaneously:

### **YouTube Live Setup:**
- [ ] Get YouTube stream key from YouTube Studio
- [ ] In Streamlabs, add second destination:
  - Server: `rtmp://a.rtmp.youtube.com/live2/`
  - Key: `[Your YouTube Key]`

### **Instagram Live Setup:**
- [ ] Get Instagram stream key from Creator Studio
- [ ] Add third destination:
  - Server: `rtmp://live-api-s.facebook.com:80/rtmp/`
  - Key: `[Your Instagram Key]`

### **TikTok Live Setup:**
- [ ] Get TikTok Live access (requires 1000+ followers)
- [ ] Add fourth destination:
  - Server: `rtmp://push.live.tiktok.com/live/`
  - Key: `[Your TikTok Key]`

---

## 💰 **NEXT STEPS: AD REVENUE SYSTEM**

After streaming is working perfectly:
- [ ] Review the complete ad-revenue system design in `AD_REVENUE_SYSTEM_DESIGN.md`
- [ ] Implement Google AdSense integration
- [ ] Add real-time revenue tracking
- [ ] Set up automated daily revenue reports
- [ ] Expected revenue: £7,200-90,000/year

---

## ✅ **SUCCESS CHECKLIST**

Mark these when everything is working:

- [ ] ✅ **Railway streaming server deployed and healthy**
- [ ] ✅ **Streamlabs mobile app configured and connecting** 
- [ ] ✅ **Vercel environment variables updated**
- [ ] ✅ **Website redeployed with new settings**
- [ ] ✅ **End-to-end streaming working (phone → website)**
- [ ] ✅ **Portuguese cultural features active**
- [ ] ✅ **Ready to drive traffic from social platforms**

---

## 🎯 **YOUR STREAMING URLs**

Once deployed, save these URLs:

**Website Live Page:** `https://lusotown-london.vercel.app/live`
**Railway Streaming Server:** `https://[YOUR-RAILWAY-URL]`
**RTMP Ingestion:** `rtmp://[YOUR-RAILWAY-URL]:1935/live/`
**HLS Output:** `https://[YOUR-RAILWAY-URL]:8080/live/streamlabs_lusotown_2025.m3u8`
**API Health Check:** `https://[YOUR-RAILWAY-URL]:3002/health`

---

**🔴 START HERE: Begin with Phase 1 and work through each step!**

**🇵🇹 You're about to have a complete Portuguese-speaking community streaming platform! 🇵🇹**