# LusoTown Community Platform Guidelines for Claude Analysis

## 🇵🇹 Portuguese Community Focus

LusoTown is a Portuguese-speaking community platform serving 750+ members across the United Kingdom with practical community services:

### **Core Mission**
Serve Portuguese speakers from ALL lusophone nations (Portugal, Brazil, Cape Verde, Angola, Mozambique, São Tomé and Príncipe, Guinea-Bissau, Timor-Leste) living across the entire United Kingdom.

### **Essential Services**
1. **Event Discovery & Simple Booking** - Portuguese community events across UK
2. **Business Directory with PostGIS** - Portuguese businesses with geolocation mapping
3. **Simple Cultural Matching** - Basic friendship connections (no complex AI)
4. **Community Transport Coordination** - Shared transport and coordination
5. **University Partnerships** - Direct partnerships with 8 UK universities
6. **Basic Streaming** - Portuguese cultural content streaming

## 🚨 Critical Community Requirements

### **Terminology Standards (MANDATORY)**
- ✅ **CORRECT**: "Portuguese-speaking community" 
- ❌ **WRONG**: "Portuguese community"
- **Reason**: Includes all lusophone nations, not just Portugal

### **Geographic Scope (MANDATORY)**  
- ✅ **CORRECT**: "United Kingdom" or "UK-wide"
- ❌ **WRONG**: "London" only
- **Reason**: Serves Portuguese speakers across entire UK

### **Zero Hardcoding Policy (CRITICAL)**
- ✅ **CORRECT**: Import from `/src/config/` files
- ❌ **WRONG**: Hardcoded prices, emails, universities, cultural data
- **Example**: `import { CONTACT_INFO } from '@/config/contact'`

### **Bilingual Requirements (MANDATORY)**
- ✅ **CORRECT**: `const { t } = useLanguage(); <h1>{t('welcome.title')}</h1>`
- ❌ **WRONG**: `<h1>Welcome to LusoTown</h1>`
- **Files**: Add keys to both `/src/i18n/en.json` and `/src/i18n/pt.json`

### **Mobile-First Design (CRITICAL)**
- ✅ **REQUIRED**: Test at 375px, 768px, 1024px breakpoints
- **Reason**: Portuguese community is mobile-heavy

### **Cultural Authenticity Standards**
- ✅ **Colors**: Import from `@/config/brand.ts` (Portuguese cultural colors)
- ❌ **Generic**: Never use generic Tailwind colors like `bg-blue-500`
- ✅ **PALOP Integration**: Include all 8 Portuguese-speaking nations
- ✅ **Cultural Context**: Maintain Portuguese heritage and traditions

## 🎯 Community-First Architecture

### **What Serves the Community (KEEP)**
- Portuguese event discovery and booking systems
- Business directory with maps for finding Portuguese services
- Simple cultural matching for friendships
- Transport coordination for community events
- University partnership integration
- Basic streaming for Portuguese cultural content
- Student services and support
- Bilingual EN/PT throughout platform

### **What Contradicts Community Mission (REMOVE)**
- Complex AI/ML systems beyond simple community needs
- Luxury/elite branding that contradicts inclusive values
- Academic/research features unrelated to community services
- Over-engineered enterprise solutions
- Technology showcases that don't serve practical needs
- Systems focused on monetization over community service

## 📊 Quality Assessment Criteria

### **Community Impact Scoring**
When reviewing code changes, assess:

1. **Community Benefit** (40 points)
   - Does this serve practical needs of Portuguese speakers?
   - Does it help with events, business discovery, transport, or university services?
   - Is it accessible and useful for community members?

2. **Cultural Authenticity** (25 points) 
   - Uses "Portuguese-speaking community" terminology?
   - References UK-wide scope (not London-only)?
   - Includes all lusophone nations appropriately?
   - Maintains Portuguese cultural elements and colors?

3. **Technical Quality** (25 points)
   - Imports data from `/src/config/` (zero hardcoding)?
   - Implements bilingual EN/PT support?
   - Follows mobile-first responsive design?
   - Integrates with existing community systems?

4. **Simplicity & Focus** (10 points)
   - Avoids unnecessary complexity?
   - Focuses on community needs over technology showcase?
   - Maintains clean, maintainable code architecture?

### **Red Flags to Identify**
- Hardcoded data that should be in config files
- "Portuguese community" instead of "Portuguese-speaking community"
- London-only references instead of UK-wide
- Missing bilingual support for user-facing text
- Complex AI/ML that doesn't serve practical community needs
- Generic design elements that ignore Portuguese cultural context
- Mobile-unfriendly implementations

## 🚀 Claude Review Process

### **For Pull Requests**
1. **Check Quality Gates**: Review hardcoding audit, ESLint, TypeScript, build status
2. **Assess Community Impact**: How does this change serve the 750+ Portuguese speakers?
3. **Validate Cultural Standards**: Terminology, geographic scope, PALOP inclusion
4. **Review Technical Implementation**: Config imports, bilingual support, mobile-first
5. **Provide Community-Focused Recommendations**: Practical suggestions for improvement

### **For Issues and Questions**  
1. **Understand Community Context**: How does this relate to Portuguese diaspora needs?
2. **Provide Practical Solutions**: Focus on serving community members effectively
3. **Maintain Cultural Sensitivity**: Respect Portuguese heritage and traditions
4. **Suggest Community-Aligned Approaches**: Simple, effective solutions over complex ones

## 📈 Success Metrics

**Good Claude Analysis Includes:**
- Specific references to Portuguese community benefit
- Clear identification of cultural authenticity issues
- Practical recommendations for mobile accessibility
- Recognition of UK-wide Portuguese diaspora scope
- Understanding of zero-hardcoding architecture requirements
- Appreciation for bilingual EN/PT implementation needs

**Community-Focused Language:**
- "This serves Portuguese speakers across the UK by..."
- "For the 750+ community members, this improvement..."  
- "Portuguese diaspora members will benefit from..."
- "This maintains cultural authenticity while..."
- "Community members using mobile devices will..."

---

*These guidelines ensure Claude analysis aligns with LusoTown's mission of serving the Portuguese-speaking community across the United Kingdom with practical, culturally authentic, and accessible community services.*