# LusoTown Portuguese Community Platform - Production Deployment Guide

**Updated: 2025-08-29** | **Status**: PRODUCTION-READY DEPLOYMENT GUIDE

## =€ **DEPLOYMENT OVERVIEW**

This guide provides comprehensive instructions for deploying the LusoTown Portuguese-speaking community platform to production environments, ensuring reliable service for 750+ Portuguese speakers across the United Kingdom.

---

## =Ë **PRE-DEPLOYMENT CHECKLIST**

### **= Critical Quality Gates (MANDATORY)**
All checks must pass before deployment to production:

```bash
# Navigate to web application directory
cd web-app

# 1. HARDCODING AUDIT (CRITICAL)
npm run audit:hardcoding
# Status: Must show zero violations or acceptable threshold

# 2. TYPESCRIPT COMPILATION
npx tsc --noEmit
# Status: Must show zero compilation errors

# 3. ESLINT VALIDATION
npm run lint
# Status: Must pass with zero critical errors

# 4. PRODUCTION BUILD TEST
npm run build
# Status: Must complete successfully with no errors

# 5. COMBINED QUALITY CHECK
npm run qa:pre-commit
# Status: All quality gates must pass
```

### **>ê Testing Verification**
```bash
# Unit test suite
npm test
# Status: All tests must pass

# End-to-End testing for Portuguese community features
npx playwright test
# Status: All critical user flows must pass

# Mobile responsiveness testing
npm run test:mobile
# Status: Portuguese community mobile experience validated
```

### **= Security Verification**
```bash
# Security audit
npm audit
# Status: No high or critical vulnerabilities

# XSS protection verification
# Manual check: All components with dangerouslySetInnerHTML use DOMPurify

# Input validation check
# Manual check: All forms use Zod validation schemas
```

---

## < **ENVIRONMENT SETUP**

### **Production Environment Variables (.env.production)**

```bash
# === CORE DATABASE CONFIGURATION ===
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# === PORTUGUESE COMMUNITY PLATFORM CONFIG ===
NEXT_PUBLIC_APP_URL=https://lusotown.london
NEXT_PUBLIC_SITE_URL=https://lusotown.london
NEXT_PUBLIC_BRAND_NAME=LusoTown
NEXT_PUBLIC_APP_NAME=LusoTown London Portuguese Community

# === COMMUNITY METRICS (REQUIRED) ===
NEXT_PUBLIC_TOTAL_MEMBERS=750
NEXT_PUBLIC_TOTAL_STUDENTS=2150
NEXT_PUBLIC_UNIVERSITY_PARTNERSHIPS=8

# === SENTRY ERROR MONITORING (CRITICAL) ===
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn-key@o1234567890.ingest.sentry.io/project-id
SENTRY_DSN=https://your-dsn-key@o1234567890.ingest.sentry.io/project-id
SENTRY_ORG=lusotown-community
SENTRY_PROJECT=lusotown-web
SENTRY_AUTH_TOKEN=your-sentry-auth-token
NEXT_PUBLIC_SENTRY_ENVIRONMENT=production
SENTRY_SAMPLE_RATE=0.1
SENTRY_TRACES_SAMPLE_RATE=0.05

# === PORTUGUESE COMMUNITY MONITORING ===
NEXT_PUBLIC_ERROR_MONITORING_ENABLED=true
PORTUGUESE_COMMUNITY_ERROR_THRESHOLD=0.05
BILINGUAL_ERROR_TRACKING=true
CULTURAL_FEATURE_MONITORING=true

# === VERCEL DEPLOYMENT CONFIG ===
NEXT_PUBLIC_VERCEL_URL=https://your-app.vercel.app
NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA=production-commit-sha
NEXT_PUBLIC_DEPLOYMENT_REGION=lhr1
NEXT_PUBLIC_BUILD_TIME_TRACKING=true

# === FEATURE FLAGS ===
NEXT_PUBLIC_ENABLE_STREAMING=true
NEXT_PUBLIC_ENABLE_MATCHING=true
NEXT_PUBLIC_ENABLE_TRANSPORT=true
NEXT_PUBLIC_ENABLE_EVENTS=true
NEXT_PUBLIC_ENABLE_PREMIUM=true

# === PAYMENT CONFIGURATION ===
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
STRIPE_SECRET_KEY=sk_live_your_live_secret
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# === COMMUNICATION CONFIGURATION ===
NEXT_PUBLIC_CONTACT_EMAIL=info@lusotown.com
NEXT_PUBLIC_SUPPORT_EMAIL=support@lusotown.com
NEXT_PUBLIC_TECH_EMAIL=tech@lusotown.com
NEXT_PUBLIC_EVENTS_EMAIL=events@lusotown.com
NEXT_PUBLIC_PARTNERSHIPS_EMAIL=partnerships@lusotown.com
NEXT_PUBLIC_SAFETY_EMAIL=safety@lusotown.com

# === ALERTING CONFIGURATION ===
ALERT_RECIPIENTS=tech@lusotown.com,support@lusotown.com
PERFORMANCE_ALERT_RECIPIENTS=tech@lusotown.com
CRITICAL_ALERT_RECIPIENTS=tech@lusotown.com,partnerships@lusotown.com

# === OPTIONAL SERVICES ===
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=lusotown-media
CLOUDINARY_API_SECRET=your-cloudinary-secret
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

### **Sentry Setup Instructions**

1. **Create Sentry Project**
   - Visit https://sentry.io and create account
   - Create new project: "lusotown-web"
   - Select "Next.js" as platform
   - Copy DSN from project settings

2. **Configure Portuguese Community Monitoring**
   ```bash
   # Install Sentry CLI
   npm install -g @sentry/cli
   
   # Login to Sentry
   sentry-cli login
   
   # Create Sentry configuration
   sentry-cli projects create lusotown-community lusotown-web
   ```

3. **Set Environment Variables**
   ```bash
   # Add to Vercel environment variables
   NEXT_PUBLIC_SENTRY_DSN=your-dsn-from-step-1
   SENTRY_ORG=lusotown-community
   SENTRY_PROJECT=lusotown-web
   SENTRY_AUTH_TOKEN=your-auth-token-from-sentry-settings
   ```

---

## =€ **VERCEL DEPLOYMENT PROCESS**

### **Initial Setup**

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and connect project
   vercel login
   vercel --cwd web-app
   ```

2. **Configure Build Settings**
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
   - **Development Command**: `npm run dev`

3. **Environment Variables Setup**
   ```bash
   # Set production environment variables
   vercel env add NEXT_PUBLIC_SUPABASE_URL production
   vercel env add NEXT_PUBLIC_SENTRY_DSN production
   vercel env add SENTRY_AUTH_TOKEN production
   # ... (add all required variables)
   ```

### **Deployment Commands**

```bash
# Production deployment
vercel --prod --cwd web-app

# Preview deployment (for testing)
vercel --cwd web-app

# Check deployment status
vercel ls --cwd web-app
```

### **Domain Configuration**

```bash
# Add custom domain
vercel domains add lusotown.london --cwd web-app

# Configure SSL (automatic with Vercel)
# DNS configuration for custom domain:
# A record: @ -> 76.76.19.61
# CNAME record: www -> cname.vercel-dns.com
```

---

## = **POST-DEPLOYMENT VERIFICATION**

### **Functional Testing Checklist**

```bash
# 1. Basic site availability
curl -I https://lusotown.london
# Expected: HTTP 200 OK

# 2. Portuguese language switching
# Manual test: Visit site, change language to PT, verify translation

# 3. Business directory functionality
# Manual test: Navigate to business directory, search for Portuguese businesses

# 4. Event booking system
# Manual test: Browse events, attempt booking flow

# 5. Cultural matching features
# Manual test: Complete cultural matching questionnaire

# 6. Mobile responsiveness
# Manual test: Test on mobile devices at 375px, 768px breakpoints
```

### **Performance Monitoring Setup**

```bash
# Lighthouse performance audit
npx lighthouse https://lusotown.london --output=json

# Core Web Vitals monitoring
# Check Google PageSpeed Insights for production URL

# Sentry performance monitoring
# Verify error tracking dashboard shows Portuguese community context
```

### **Error Monitoring Verification**

1. **Sentry Dashboard Check**
   - Visit Sentry project dashboard
   - Verify Portuguese community error contexts are being tracked
   - Check alert configuration for critical errors

2. **Test Error Reporting**
   ```javascript
   // Trigger test error to verify monitoring
   import { reportPortugueseError } from '@/lib/sentry'
   reportPortugueseError(new Error('Test deployment error'), 'CULTURAL_CONTENT')
   ```

---

## =¨ **ROLLBACK PROCEDURES**

### **Emergency Rollback (< 5 minutes)**

```bash
# Immediate rollback to previous deployment
vercel rollback --cwd web-app

# Or rollback to specific deployment
vercel rollback [deployment-url] --cwd web-app
```

### **Database Rollback (if needed)**

```bash
# Connect to Supabase
npx supabase db reset --linked

# Or restore from backup
# (Manual process via Supabase dashboard)
```

### **Communication Protocol**

1. **Immediate Response**
   - Update status page: https://status.lusotown.com
   - Send email to CRITICAL_ALERT_RECIPIENTS
   - Post on community social media channels

2. **Portuguese Community Communication**
   ```text
   EN: "We are experiencing technical difficulties and are working to resolve them quickly. Thank you for your patience."
   
   PT: "Estamos a experienciar dificuldades técnicas e estamos a trabalhar para as resolver rapidamente. Obrigado pela vossa paciência."
   ```

---

## =Ê **MONITORING & ALERTS**

### **Critical Metrics to Monitor**

1. **Portuguese Community Engagement**
   - Business directory usage
   - Event booking completion rates
   - Cultural matching interactions
   - Bilingual system usage (EN/PT switching)

2. **Technical Performance**
   - Page load times (target: <2.5s)
   - Error rates (target: <1%)
   - Database query performance
   - Mobile user experience

3. **Business Metrics**
   - User registration rates
   - Portuguese community member retention
   - University partnership engagement
   - Premium subscription conversions

### **Alert Configuration**

```bash
# High-priority alerts (immediate notification)
- Error rate > 5%
- Page load time > 5s
- Database connection failures
- Payment system failures
- Portuguese cultural content errors

# Medium-priority alerts (within 1 hour)
- Error rate > 2%
- Unusual traffic patterns
- Form submission failures
- Search functionality issues

# Low-priority alerts (daily summary)
- Performance degradation
- User experience feedback
- Community engagement metrics
```

---

## = **SECURITY CONSIDERATIONS**

### **Production Security Checklist**

- [ ] SSL certificates configured and auto-renewing
- [ ] Environment variables secured and rotated
- [ ] Database access restricted to application
- [ ] API rate limiting enabled
- [ ] XSS protection implemented with DOMPurify
- [ ] Input validation active on all forms
- [ ] Security headers configured
- [ ] GDPR compliance measures active

### **Ongoing Security Maintenance**

```bash
# Monthly security audit
npm audit
npm update

# Quarterly security review
- Review API keys and rotate if needed
- Update dependencies to latest secure versions
- Review user access permissions
- Audit Portuguese community data handling
```

---

## =È **PERFORMANCE OPTIMIZATION**

### **Production Optimization Settings**

```bash
# Next.js production configuration
module.exports = {
  // Image optimization
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Bundle analysis
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks.chunks = 'all';
    }
    return config;
  },
  
  // Portuguese community specific optimizations
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
  },
}
```

### **CDN and Caching Strategy**

```bash
# Vercel Edge Network (automatic)
# Static assets cached globally
# Portuguese cultural content optimized for UK delivery

# Custom caching headers
Cache-Control: public, max-age=31536000, immutable  # Static assets
Cache-Control: public, max-age=3600                 # Dynamic content
Cache-Control: private, no-cache                    # User-specific data
```

---

## <¯ **SUCCESS CRITERIA**

### **Deployment Success Indicators**

- [ ] **Build Success**: 100% build completion rate
- [ ] **Performance**: Page load times <2.5s (UK users)
- [ ] **Error Rate**: <1% error rate in first 24 hours
- [ ] **Portuguese Features**: All cultural features functional
- [ ] **Mobile Experience**: Responsive on all tested devices
- [ ] **Monitoring Active**: Sentry capturing and categorizing errors
- [ ] **Community Feedback**: Positive initial user feedback

### **24-Hour Post-Deployment Review**

1. **Error Dashboard Review**
   - Check Sentry for any critical errors
   - Review Portuguese community specific error contexts
   - Validate alert system is functioning

2. **Performance Analysis**
   - Google PageSpeed Insights score >85
   - Core Web Vitals within acceptable ranges
   - Mobile user experience validated

3. **Community Engagement Check**
   - Portuguese language switching functional
   - Business directory searches working
   - Event booking flow operational
   - Cultural matching system responsive

---

## =Þ **SUPPORT & EMERGENCY CONTACTS**

### **Technical Team**
- **Primary**: tech@lusotown.com
- **Emergency**: +44 (0) 20 7946 0958
- **Escalation**: partnerships@lusotown.com

### **Community Management**
- **General Inquiries**: info@lusotown.com
- **Community Support**: support@lusotown.com
- **Events Team**: events@lusotown.com

### **External Services**
- **Vercel Support**: https://vercel.com/support
- **Supabase Support**: https://supabase.com/support
- **Sentry Support**: https://sentry.io/support/

---

**Deployment Status**: PRODUCTION-READY  
**Last Updated**: 2025-08-29  
**Next Review**: September 15, 2025  
**Platform Focus**: Reliable service for Portuguese-speaking community across the United Kingdom