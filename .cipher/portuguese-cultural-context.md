# Portuguese Cultural Context for LusoTown Platform
## Shared Memory Context for Team Coordination

### Project Overview
- **Platform Name**: LusoTown
- **Primary Focus**: Portuguese-speaking community platform for United Kingdom
- **Target Audience**: 750+ Portuguese speakers, 2,150+ university students (UK-wide)
- **Geographic Scope**: United Kingdom (not just London)
- **Cultural Scope**: All lusophone nations (Portugal, Brazil, Cape Verde, Angola, Mozambique, etc.)

### Critical Cultural Guidelines

#### Terminology Standards
✅ **USE**: "Portuguese-speaking community"
❌ **AVOID**: "Portuguese community" (excludes Brazilian, Cape Verdean, Angolan, etc.)

✅ **USE**: "United Kingdom" or "UK"
❌ **AVOID**: "London only" references

✅ **USE**: "Lusophone nations" or "Portuguese-speaking countries"
❌ **AVOID**: "Portuguese countries"

#### Diversity & Inclusion Requirements
- **Always mix events/content** from multiple Portuguese-speaking nations
- **Include testimonials** from diverse lusophone backgrounds (Portugal, Brazil, Cape Verde, Angola, Mozambique)
- **Reference cultural celebrations** from all lusophone nations
- **Use appropriate flags/emojis** for each nation represented

#### Language Requirements
- **Bilingual EN/PT**: All user-facing text must support both languages
- **Translation Keys**: Use `t('translation.key')` pattern
- **Cultural Nuances**: Portuguese vs Brazilian Portuguese considerations
- **Regional Variations**: Account for different lusophone dialects/cultures

### Technical Implementation Standards

#### Zero Hardcoding Policy (MANDATORY)
```typescript
// ❌ NEVER:
const price = "£19.99"
const email = "demo@lusotown.com" 
const uni = "UCL"

// ✅ ALWAYS:
import { SUBSCRIPTION_PLANS, formatPrice } from '@/config/pricing'
import { CONTACT_INFO } from '@/config/contact'
import { UNIVERSITY_PARTNERSHIPS } from '@/config/universities'

const price = formatPrice(SUBSCRIPTION_PLANS.community.monthly)
const email = CONTACT_INFO.demo.email
const uni = UNIVERSITY_PARTNERSHIPS.ucl.name
```

#### Mobile-First Development
- **Primary breakpoints**: 375px (mobile), 768px (tablet), 1024px (desktop)
- **Mobile UX priority**: Portuguese-speaking community is mobile-heavy
- **Touch targets**: Minimum 44px for Portuguese cultural content
- **Performance**: Core Web Vitals optimization for mobile devices

#### Heritage Color System
- **Import**: Always use `@/config/brand.ts` for colors
- **Avoid**: Generic blue/gray colors
- **Portuguese Theme**: Use authentic Portuguese heritage colors
- **Dynamic Theming**: Support heritage color switching via `HeritageContext`

### Quality Assurance Requirements

#### Pre-Commit Checklist (MANDATORY)
```bash
cd web-app
npm run audit:hardcoding  # ← CRITICAL (must pass)
npm run lint              # ESLint validation
npx tsc --noEmit         # TypeScript check
npm run build            # Production build test
```

#### Portuguese-Specific Testing
- **Translation Coverage**: Verify both EN/PT translations exist
- **Cultural Content**: Test Portuguese cultural event displays
- **Mobile Portuguese UX**: Validate mobile experience for Portuguese speakers
- **Lusophone Diversity**: Ensure content represents all Portuguese-speaking nations

### Business Context Memory

#### Community Metrics
- **Members**: 750+ Portuguese speakers
- **Students**: 2,150+ university students (UK-wide)
- **Universities**: 8 partnerships (UCL, King's, Imperial, LSE, Oxford, Cambridge, Manchester, Edinburgh)
- **AI Systems**: 4 production AI engines
- **Components**: 522+ React components
- **Pages**: 135+ Next.js pages

#### Core Features
1. **Social Events**: Portuguese cultural events and networking
2. **Business Directory**: PostGIS-powered Portuguese business listings
3. **Streaming Platform**: Portuguese cultural content (localhost:8080)
4. **Premium Transport**: SIA-licensed Portuguese transport services
5. **Student Services**: University partnership programs
6. **Cultural Matching**: AI-powered cultural compatibility system

### Development Workflow Memory

#### Directory Structure
```
/web-app/src/config/     # 49+ configuration files (centralized exports)
/web-app/src/components/ # 522+ React components
/web-app/src/i18n/      # Bilingual EN/PT translations
/web-app/__tests__/     # Comprehensive testing framework
```

#### Key Commands
```bash
# Development
cd web-app && npm run dev  # Start development (localhost:3000)

# Testing  
npm test ComponentName.test                    # Single component test
npm run test:mobile                            # Mobile-specific tests
npm run test:portuguese                        # Portuguese language tests
npx playwright test file.spec.ts --headed     # Visual E2E test

# Quality Checks
npm run audit:hardcoding   # CRITICAL: Must pass before commits
npm run lint               # ESLint validation
```

#### Integration Points
- **Database**: Supabase PostgreSQL + PostGIS for geolocation
- **Streaming**: Simple Relay Server (SRS) for Portuguese cultural content
- **CDN**: BunnyCDN for Portuguese content delivery
- **Mobile**: React Native/Expo Portuguese mobile app
- **AI**: 4 production AI systems with Portuguese language support

### Success Metrics & KPIs

#### Performance Targets
- **Mobile Luxury Compliance**: 73.3%+ luxury compliance score
- **Core Web Vitals**: Optimized for Portuguese content delivery
- **Accessibility**: WCAG AA compliant
- **Cultural Authenticity**: 100% compliance with Portuguese community guidelines

#### User Experience Goals
- **Conversion Rate**: Optimized Portuguese-speaking user onboarding
- **Cultural Relevance**: Events from all lusophone nations represented
- **Mobile Excellence**: Premium mobile experience for Portuguese speakers
- **Community Growth**: Sustainable growth across all Portuguese-speaking nationalities

### Memory Coordination Notes

This context should be shared across all Claude Code instances working on LusoTown to ensure:
- **Consistent Cultural Authenticity**: All Portuguese-speaking nations represented
- **Zero Hardcoding Compliance**: Mandatory config-based development
- **Mobile-First Quality**: Portuguese community mobile experience priority
- **Translation Completeness**: Bilingual EN/PT coverage
- **Testing Standards**: Portuguese-specific test coverage

---
**Last Updated**: 2025-08-27  
**Context Version**: 1.0.0  
**Shared Memory**: Enabled for team coordination