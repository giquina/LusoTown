# 🔐 Vercel Environment Variables Setup

## ⚠️ CRITICAL: Required Environment Variables

The Vercel deployment failed because **NEXT_PUBLIC_SUPABASE_URL** is missing. Here's how to fix it:

## 🚀 Option 1: Quick Deploy with Minimal Variables

Set these **essential** variables in Vercel dashboard to get a working deployment:

```env
# Essential Database (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Demo System (Required for testing)
DEMO_EMAIL=demo@lusotown.com
DEMO_PASSWORD=LusoTown2025!
ADMIN_EMAIL_DOMAIN=lusotown.com

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
NEXT_PUBLIC_APP_NAME=LusoTown London
```

## 🔧 How to Add Variables in Vercel

### Method 1: Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Your Supabase URL
   - **Environment**: Production, Preview, Development

### Method 2: Vercel CLI
```bash
# Add essential variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add DEMO_EMAIL
vercel env add DEMO_PASSWORD
vercel env add ADMIN_EMAIL_DOMAIN

# Deploy with variables
vercel --prod
```

## 📋 Complete Environment Variables List

### Essential (Build will fail without these)
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DEMO_EMAIL=demo@lusotown.com
DEMO_PASSWORD=LusoTown2025!
ADMIN_EMAIL_DOMAIN=lusotown.com
```

### Optional (Platform works without these)
```env
# Supabase Admin
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Email Services
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key

# Image Optimization
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Community Metrics
NEXT_PUBLIC_TOTAL_MEMBERS=750
NEXT_PUBLIC_TOTAL_STUDENTS=2150
NEXT_PUBLIC_UNIVERSITY_PARTNERSHIPS=8

# Maps and Location
NEXT_PUBLIC_MAP_SERVICE=openstreetmap
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key

# Social Features
NEXT_PUBLIC_PORTUGUESE_HASHTAGS=LusoLondon PortugueseUK LusoTown
NEXT_PUBLIC_TWITTER_BEARER_TOKEN=your_twitter_token

# Streaming (if enabled)
NEXT_PUBLIC_STREAMING_SERVER_URL=http://localhost:8080
RTMP_SERVER_PORT=1935
HLS_SERVER_PORT=8080
```

## 🛠️ Get Supabase Credentials

If you don't have Supabase credentials:

1. **Create Free Supabase Account**: [supabase.com](https://supabase.com)
2. **Create New Project**: Choose "Portuguese Community" as name
3. **Get Credentials**:
   - **URL**: Project Settings → API → Project URL
   - **Anon Key**: Project Settings → API → Project API keys → anon/public

## 🔄 Redeploy After Adding Variables

After adding environment variables in Vercel:

```bash
# Trigger new deployment
git commit --allow-empty -m "Trigger Vercel redeploy with environment variables"
git push origin main
```

Or in Vercel dashboard:
1. Go to **Deployments**
2. Click **"Redeploy"** on latest deployment

## 📊 Expected Deployment Result

With proper environment variables, your build will:
- ✅ Generate 149 static pages successfully
- ✅ Create 36 API routes
- ✅ Deploy to: `https://luso-town-[hash].vercel.app`

## 🚨 Troubleshooting

### Build Still Fails?
1. **Check all required variables are set**
2. **Verify Supabase URL format**: Must start with `https://`
3. **Check Vercel build logs** for specific missing variables

### Demo Access After Deployment
- **Email**: demo@lusotown.com
- **Password**: LusoTown2025!

This bypasses subscription requirements and provides full platform access.

## 🎯 Quick Setup Script

Copy this script to set all required variables at once:

```bash
#!/bin/bash
# Quick Vercel environment setup
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add DEMO_EMAIL production
vercel env add DEMO_PASSWORD production  
vercel env add ADMIN_EMAIL_DOMAIN production
echo "✅ Essential variables added! Deploy with: vercel --prod"
```

---

**Ready to deploy!** Once these variables are set, your LusoTown platform will deploy successfully to Vercel.