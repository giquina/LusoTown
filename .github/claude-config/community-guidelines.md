# LusoTown Community Guidelines for Claude AI Review

## Platform Mission
LusoTown serves Portuguese-speaking community members across the United Kingdom, connecting them through events, business opportunities, cultural activities, and university partnerships. Our platform celebrates all 8 Portuguese-speaking nations (PALOP) and fosters inclusive community connections.

## Core Values for Code Review

### 1. Community-First Architecture
- **Priority**: Portuguese-speaking community needs over technical complexity
- **Focus**: Event discovery, business directory, simple matching, transport coordination
- **Avoid**: Over-engineered AI systems, luxury/elite branding, unnecessary complexity

### 2. Cultural Authenticity
- Use "Portuguese-speaking community" NOT "Portuguese community"
- Reference "United Kingdom" NOT just "London"
- Include diverse representation from Portugal, Brazil, Cape Verde, Angola, Mozambique, etc.
- Maintain Portuguese cultural colors and branding from config files

### 3. Zero Hardcoding Policy
- All data must be imported from `/web-app/src/config/` files
- No inline prices, contact info, university names, or cultural data
- Use configuration-first development pattern
- Must pass `npm run audit:hardcoding`

### 4. Bilingual Requirements
- All user-facing text via `useLanguage().t('translation.key')`
- Add translations to both `en.json` and `pt.json`
- Portuguese language support is mandatory, not optional

### 5. Mobile-First Portuguese Community
- Design for 375px, 768px, 1024px breakpoints
- Portuguese-speaking community is mobile-heavy
- Optimize for community member accessibility

## Architecture Principles

### Streamlined Component Structure
- Essential community components only
- No complex AI/ML systems unless directly serving community needs
- Focus on practical functionality over impressive tech demos

### Database and Performance
- Supabase PostgreSQL with PostGIS for location services
- Portuguese business directory geolocation
- Community event real-time updates
- University partnership data integration

### Quality Gates
1. Hardcoding audit (must pass)
2. ESLint validation
3. TypeScript compilation
4. Production build test
5. Portuguese cultural authenticity check

## Community Impact Validation
- Does this change improve Portuguese community connections?
- Will this help community members find relevant events/businesses?
- Does it maintain cultural authenticity and inclusion?
- Is it accessible to all Portuguese-speaking backgrounds?

## Red Flags for Code Review
- L Hardcoded values instead of config imports
- L Generic blue/gray colors instead of Portuguese brand colors
- L "Portuguese community" instead of "Portuguese-speaking community"
- L London-only references instead of UK-wide
- L Complex AI systems without clear community benefit
- L Missing Portuguese translations
- L Mobile-unfriendly implementations