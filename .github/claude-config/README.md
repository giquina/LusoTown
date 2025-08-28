# Claude Integration for LusoTown Portuguese Community Platform

## 🚀 Quick Setup

### 1. Add API Key (REQUIRED)
```bash
# GitHub Repository Settings → Secrets and Variables → Actions → New Repository Secret
Name: ANTHROPIC_API_KEY
Value: your-anthropic-api-key-here
```

### 2. Activate Features
Claude integration works automatically for:
- ✅ **Pull Request Reviews** - Automatic community-focused analysis
- ✅ **Quality Gate Analysis** - Scores based on Portuguese community needs  
- ✅ **Issue Assistance** - Add `claude` label or mention `@claude`
- ✅ **Cultural Validation** - Portuguese-speaking terminology and UK scope

## 🇵🇹 Portuguese Community Focus

Claude is configured specifically for LusoTown's mission of serving Portuguese speakers across the United Kingdom with:

### **Core Services Analysis**
- **Event Discovery**: Portuguese community events and simple booking
- **Business Directory**: PostGIS-powered Portuguese business listings  
- **Simple Matching**: Basic cultural compatibility for friendships
- **Transport Coordination**: Community transport sharing
- **University Partnerships**: Integration with 8 UK institutions
- **Basic Streaming**: Portuguese cultural content delivery

### **Quality Standards**
- **Zero Hardcoding**: All data imported from `/src/config/`
- **Portuguese-Speaking Terminology**: Includes all lusophone nations
- **UK-Wide Scope**: Serves Portuguese speakers across entire United Kingdom
- **Mobile-First**: Optimized for Portuguese community mobile usage
- **Bilingual EN/PT**: Complete translation support throughout platform

## 🤖 Available Workflows

### **1. PR Review (`claude-pr-review.yml`)**
**Triggers**: All pull requests to main branch
**Features**:
- Integrates with existing quality gates (hardcoding, lint, TypeScript, build)  
- Community impact assessment for 750+ Portuguese speakers
- Cultural authenticity validation (terminology, geographic scope)
- Mobile accessibility analysis for Portuguese community
- Practical recommendations for community platform improvements

### **2. Quality Gate Analysis (`quality-gate-with-claude.yml`)**  
**Triggers**: Push to main, PR to main, manual dispatch
**Features**:
- Comprehensive scoring system (100 points total)
- Community-focused quality metrics  
- Automatic issue creation for quality problems
- Mobile UX validation for Portuguese community
- Cultural element detection and validation

### **3. Community Focus Validation (`community-focus-validation.yml`)**
**Triggers**: Changes to config/, i18n/, components/, app/ directories
**Features**:
- Portuguese-speaking terminology validation
- PALOP nations inclusivity checking
- Bilingual translation parity verification
- UK-wide geographic scope validation
- Portuguese cultural branding standards

## 📊 Quality Scoring System

### **Community Platform Score (100 points total)**
- **Zero-Hardcoding Policy**: 40 points (critical for community data centralization)
- **Code Quality Standards**: 20 points (ESLint validation)  
- **TypeScript Type Safety**: 20 points (compilation and type safety)
- **Production Build Readiness**: 20 points (deployment readiness)

### **Quality Thresholds**
- **90-100**: 🏆 **EXCELLENT** - Ready for Portuguese community deployment
- **75-89**: ✅ **GOOD** - Minor improvements recommended
- **60-74**: ⚠️ **NEEDS IMPROVEMENT** - Address issues before serving community
- **0-59**: ❌ **CRITICAL** - Major fixes required for community deployment

## 🎯 Community-Focused Analysis

### **Cultural Requirements Validation**
Claude automatically checks for:
- ✅ "Portuguese-speaking community" (not "Portuguese community")
- ✅ "United Kingdom" or "UK-wide" (not London-only references)
- ✅ All 8 lusophone nations representation (Portugal, Brazil, Cape Verde, etc.)
- ✅ Portuguese cultural colors from `@/config/brand.ts`
- ✅ Mobile-first responsive design (375px, 768px, 1024px breakpoints)

### **Technical Standards Enforcement**
- ✅ Zero hardcoding - imports from `/src/config/` required
- ✅ Bilingual support - EN/PT translations via `useLanguage()`
- ✅ Portuguese cultural authenticity maintained
- ✅ Community-focused architecture over enterprise complexity

## 💬 Using Claude

### **Issue Assistance**
Add label `claude` to any issue or mention `@claude` in comments for community-focused analysis and recommendations.

### **PR Analysis**  
Claude automatically reviews all PRs with focus on:
- Portuguese community benefit and impact
- Cultural authenticity and terminology standards
- Mobile accessibility for community members
- Technical quality and deployment readiness

### **Manual Analysis**
Use workflow dispatch in Actions tab for specific analysis types:
- **Comprehensive**: Full quality analysis
- **Security**: Security-focused review
- **Performance**: Performance optimization suggestions
- **Cultural**: Portuguese cultural authenticity validation

## 🔒 Security & Privacy

### **Data Protection**
- ✅ **Encrypted API keys** stored in GitHub secrets
- ✅ **Limited permissions** - read content, write issues/PRs only
- ✅ **No sensitive data** sent to Claude API
- ✅ **GDPR compliant** for Portuguese community members
- ✅ **Input sanitization** protects against security issues

### **Access Controls**
- ✅ **Timeout limits** prevent runaway costs
- ✅ **Rate limiting** controls API usage
- ✅ **Audit logging** tracks all Claude actions
- ✅ **Token scoping** follows least-privilege principle

## 🚀 Advanced Features

### **Integration Points**
- **Existing Quality Gates**: Works with hardcoding audit, ESLint, TypeScript
- **Vercel Deployment**: Compatible with existing deployment pipeline
- **Portuguese Cultural Context**: Understands LusoTown's community mission
- **CLAUDE.md Integration**: Uses existing development guidelines

### **Community Metrics Tracking**
- Mobile breakpoint usage analysis
- Portuguese cultural element detection
- Bilingual translation implementation tracking  
- Community-focused code change impact assessment

## 📚 Configuration Files

### **Community Guidelines** (`.github/claude-config/community-guidelines.md`)
Comprehensive guidelines ensuring Claude understands LusoTown's Portuguese community focus, cultural requirements, and technical standards.

### **Workflow Files** (`.github/workflows/`)
- `claude-pr-review.yml` - Automated PR reviews with community focus
- `quality-gate-with-claude.yml` - Comprehensive quality analysis  
- `community-focus-validation.yml` - Cultural authenticity validation

## 🎉 Success Indicators

### **Good Claude Analysis Includes:**
- Specific references to Portuguese community benefit
- Cultural authenticity validation and recommendations
- Mobile accessibility suggestions for community members
- Recognition of UK-wide Portuguese diaspora scope
- Practical improvements for community platform functionality

### **Expected Outcomes:**
- Improved code quality focused on community needs
- Better cultural authenticity and Portuguese terminology
- Enhanced mobile experience for Portuguese speakers
- Faster identification of issues affecting community deployment

---

**Result**: Claude integration provides AI-powered development assistance specifically calibrated for LusoTown's mission of serving the Portuguese-speaking community across the United Kingdom with practical, culturally authentic, and accessible community services.

*For support, check the comprehensive guidelines in `community-guidelines.md` or create an issue with the `claude` label.*