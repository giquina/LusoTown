# LusoTown Hardcoding Remediation Checklist

## Overview
This comprehensive checklist addresses **98,474 hardcoding violations** across 510 files found during the August 2025 audit. The violations are categorized by type and priority for systematic remediation.

## ✅ COMPLETED FIXES

### Critical Infrastructure Violations (FIXED)
- [x] **Demo Credentials** - Moved to environment variables (`NEXT_PUBLIC_DEMO_EMAIL`, `NEXT_PUBLIC_DEMO_PASSWORD`)
- [x] **University URLs** - Centralized in `src/config/cdn.ts` (`UNIVERSITY_URLS`)
- [x] **Student Pricing** - Enhanced pricing config with `getStudentPrice()` and `getFormattedStudentPrice()`
- [x] **Community Guidelines i18n** - Added bilingual translations for community guidelines page

## 🚨 REMAINING CRITICAL VIOLATIONS

### 1. Content Strings (96,230 violations) - HIGH PRIORITY

**Problem**: Hardcoded English/Portuguese text instead of using `t()` function
**Impact**: Breaks bilingual system, prevents localization

#### Files requiring immediate attention:
```bash
# Run this to find the worst offenders:
cd web-app && grep -r "Error: Strings not allowed" . --include="*.tsx" | head -20
```

#### Fix Pattern:
```typescript
// ❌ BAD
<h1>About LusoTown London</h1>
<p>Welcome to our community</p>

// ✅ GOOD  
const { t } = useLanguage()
<h1>{t('about.hero.title')}</h1>
<p>{t('about.hero.welcome')}</p>
```

#### Action Items:
- [ ] **Immediate**: Fix top 20 pages with most violations
- [ ] **Week 1**: About, Events, Transport, Matches pages
- [ ] **Week 2**: Business Directory, Streaming, Students pages  
- [ ] **Week 3**: All remaining component files
- [ ] **Week 4**: Hook and utility files

### 2. Route Hardcoding (870 violations) - HIGH PRIORITY

**Problem**: Hardcoded route strings like `"/events"` instead of `ROUTES.events`
**Impact**: Breaks route management, creates maintenance burden

#### Fix Pattern:
```typescript
// ❌ BAD
<Link href="/events">Events</Link>
router.push('/matches');

// ✅ GOOD
import { ROUTES } from '@/config'
<Link href={ROUTES.events}>Events</Link>
router.push(ROUTES.matches);
```

#### Action Items:
- [ ] **Day 1**: Fix all Link components in navigation
- [ ] **Day 2**: Fix router.push() calls  
- [ ] **Day 3**: Fix API route references
- [ ] **Day 4**: Update all form actions and redirects

### 3. URL Hardcoding (631 violations) - MEDIUM PRIORITY

**Problem**: Hardcoded external URLs instead of config helpers
**Impact**: Difficult to maintain, change CDNs, or update links

#### Fix Pattern:
```typescript
// ❌ BAD
<img src="https://images.unsplash.com/photo-123?w=400" />
<a href="https://instagram.com/lusotownlondon">Instagram</a>

// ✅ GOOD
import { buildUnsplashUrl, SOCIAL_URLS } from '@/config'
<img src={buildUnsplashUrl('photo-123', 400, 300)} />
<a href={SOCIAL_URLS.instagram}>Instagram</a>
```

#### Action Items:
- [ ] **Day 1**: Fix all Unsplash image URLs using `buildUnsplashUrl()`
- [ ] **Day 2**: Fix social media links using `SOCIAL_URLS`
- [ ] **Day 3**: Fix Cloudinary URLs using `buildCloudinaryUrl()` 
- [ ] **Day 4**: Fix any remaining external service URLs

### 4. Color Hardcoding (381 violations) - MEDIUM PRIORITY

**Problem**: Hardcoded hex colors or generic Tailwind colors instead of Portuguese brand palette
**Impact**: Breaks brand consistency, difficult to maintain design system

#### Fix Pattern:
```typescript
// ❌ BAD
<div className="bg-blue-500 text-white">
<span style={{ color: '#DC143C' }}>

// ✅ GOOD
import { brandColors } from '@/config'
<div className="bg-primary-500 text-white">
<span style={{ color: brandColors.action }}>
```

#### Action Items:
- [ ] **Day 1**: Replace all generic blue/gray colors with Portuguese brand colors
- [ ] **Day 2**: Fix hardcoded hex values using `brandColors` constants
- [ ] **Day 3**: Update CSS custom properties to use brand variables
- [ ] **Day 4**: Verify all components use Portuguese color palette

### 5. Remaining Price Hardcoding (140+ violations) - MEDIUM PRIORITY

**Problem**: Hardcoded prices in descriptions and display text
**Impact**: Inconsistent pricing display, maintenance burden

#### Action Items:
- [ ] **Day 1**: Fix all remaining `£X.XX` strings in description text
- [ ] **Day 2**: Update value proposition sections to use `formatPrice()`
- [ ] **Day 3**: Fix pricing comparisons and discount calculations
- [ ] **Day 4**: Ensure all pricing uses centralized config

### 6. Console Logs (137 violations) - LOW PRIORITY

**Problem**: Development debugging statements left in production code
**Impact**: Clutters console, potential information leakage

#### Action Items:
- [ ] **Day 1**: Remove all `console.log()` statements from production files
- [ ] **Day 2**: Replace with proper error handling or logging service
- [ ] **Day 3**: Add ESLint rule to prevent future console.log usage

### 7. Analytics Event Names (60 violations) - LOW PRIORITY

**Problem**: Hardcoded analytics event names instead of constants
**Impact**: Inconsistent tracking, typos in event names

#### Action Items:
- [ ] **Day 1**: Move all analytics events to `ANALYTICS_EVENTS` constants
- [ ] **Day 2**: Update all `trackEvent()` calls to use constants
- [ ] **Day 3**: Verify analytics consistency across platform

## 📋 SYSTEMATIC REMEDIATION PLAN

### Phase 1: Critical Infrastructure (COMPLETED ✅)
- Demo credentials to environment variables
- University URLs to centralized config
- Student pricing enhancement
- Community guidelines i18n setup

### Phase 2: Content Localization (Current Focus)
**Timeline**: 4 weeks
**Target**: Eliminate all hardcoded content strings

1. **Week 1**: Core pages (About, Events, Transport, Matches)
2. **Week 2**: Service pages (Business Directory, Streaming, Students)  
3. **Week 3**: Component library (all shared components)
4. **Week 4**: Utilities and remaining files

### Phase 3: Route Management 
**Timeline**: 1 week
**Target**: Eliminate all hardcoded route strings

### Phase 4: URL & Asset Management
**Timeline**: 1 week  
**Target**: Centralize all external URLs and CDN usage

### Phase 5: Design System Compliance
**Timeline**: 1 week
**Target**: Ensure all colors use Portuguese brand palette

### Phase 6: Cleanup & Validation
**Timeline**: 1 week
**Target**: Remove console logs, fix analytics, validate all changes

## 🛠️ AUTOMATED TOOLS & HELPERS

### Enhanced Audit Script
```bash
cd web-app && node scripts/hardcoding-audit.js
```

### Quick Fix Scripts (Create these)
```bash
# Content string finder
./scripts/find-hardcoded-strings.sh

# Route string replacer  
./scripts/fix-routes.sh

# URL centralizer
./scripts/centralize-urls.sh

# Color palette enforcer
./scripts/enforce-brand-colors.sh
```

### ESLint Enhancement
Add to `.eslintrc.json`:
```json
{
  "rules": {
    "react/jsx-no-literals": ["error", { 
      "noStrings": true, 
      "allowedStrings": ["className", "key", "id", "data-", "aria-", "role"]
    }],
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "no-restricted-syntax": [
      "error",
      {
        "selector": "Literal[value=/^https?:\\/\\//]",
        "message": "URLs must be in config files, not hardcoded"
      }
    ]
  }
}
```

### Pre-commit Hooks
Add to `.husky/pre-commit`:
```bash
#!/bin/sh
npm run audit:hardcoding
npm run lint
npm run test
```

## 📊 SUCCESS METRICS

### Current State (August 2025)
- **Total Violations**: 98,474
- **Files Affected**: 510
- **Critical Fixes**: 4 completed

### Target State (End of Remediation)
- **Total Violations**: < 100 (only acceptable exceptions)
- **Files Affected**: < 10 (only configuration files)
- **Critical Violations**: 0

### Weekly Progress Tracking
Run audit weekly and track:
- Violations by category
- Files cleaned up
- New violations introduced
- ESLint compliance rate

## 🚀 IMMEDIATE NEXT STEPS

1. **Today**: Create the quick fix scripts mentioned above
2. **This Week**: Begin Phase 2 - Content Localization for core pages
3. **Daily**: Run audit and track progress
4. **Weekly**: Review and adjust plan based on progress

## 📚 RESOURCES

- **Configuration Docs**: `/src/config/README.md`
- **Audit Results**: `/audits/hardcoding-audit-2025-08-21.json`
- **ESLint Rules**: `RULES.md` lines 661-837
- **i18n System**: `/src/i18n/` and `LanguageContext.tsx`

---

**Note**: This is a large-scale refactoring project. Prioritize high-impact, low-risk changes first. Test frequently and deploy incrementally to avoid breaking the production system.