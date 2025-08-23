# LusoTown Vercel Deployment Configuration

## Environment Variables for Production

The following environment variables need to be configured in Vercel for successful deployment:

### Critical Required Variables
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
DEMO_EMAIL=demo@lusotown.com
DEMO_PASSWORD=LusoTown2025!
ADMIN_EMAIL_DOMAIN=lusotown.com
```

### App Configuration
```
NEXT_PUBLIC_APP_URL=https://lusotown-london.vercel.app
NEXT_PUBLIC_APP_NAME=LusoTown London
```

### Portuguese-speaking Community Metrics
```
NEXT_PUBLIC_TOTAL_MEMBERS=750
NEXT_PUBLIC_TOTAL_STUDENTS=2150
NEXT_PUBLIC_UNIVERSITY_PARTNERSHIPS=8
```

### Optional Configuration
```
NEXT_PUBLIC_MAP_SERVICE=openstreetmap
NEXT_PUBLIC_PORTUGUESE_HASHTAGS=LusoLondon PortugueseUK LusoTown
NEXT_PUBLIC_STREAMING_SERVER_URL=http://localhost:8080
```

## Build Status
✅ Build successful - 149 pages generated
✅ All static assets optimized
✅ Font loading optimized with fallbacks

## Deployment Commands
```bash
# Production build (verified working)
npm run build

# Vercel deployment (requires authentication)
vercel --prod

# Or use GitHub integration through Vercel dashboard
```

## Notes
- Temporarily using system fonts with Google Fonts fallback for network-restricted environments
- Build process generates 149 static pages successfully
- All critical dependencies resolved