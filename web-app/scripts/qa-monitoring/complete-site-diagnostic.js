#!/usr/bin/env node

/**
 * COMPLETE LUSOTOWN SITE DIAGNOSTIC
 * Comprehensive testing of the deployed site for all critical issues
 * Handles redirects, tests functionality, checks for duplicates
 * Run: node scripts/qa-monitoring/complete-site-diagnostic.js
 */

const https = require('https');
const fs = require('fs');

const SITE_URL = 'https://web-5vmpcxfvy-giquinas-projects.vercel.app';

// Test all critical pages
const CRITICAL_PAGES = [
  { name: 'Homepage', path: '/', timeout: 10000 },
  { name: 'Events', path: '/events/', timeout: 15000 },
  { name: 'Matches', path: '/matches/', timeout: 15000 },
  { name: 'Business Directory', path: '/business-directory/', timeout: 15000 },
  { name: 'Pricing', path: '/pricing/', timeout: 10000 },
  { name: 'Login', path: '/login/', timeout: 10000 },
  { name: 'Signup', path: '/signup/', timeout: 10000 },
  { name: 'Community', path: '/community/', timeout: 10000 },
  { name: 'Students', path: '/students/', timeout: 12000 },
  { name: 'London Tours', path: '/london-tours/', timeout: 12000 },
  { name: 'Business Networking', path: '/business-networking/', timeout: 12000 },
  { name: 'Academy', path: '/academy/', timeout: 12000 }
];

// Navigation dropdown pages that should be accessible
const NAVIGATION_PAGES = [
  { name: 'Instituto Camões', path: '/instituto-camoes/', timeout: 10000 },
  { name: 'Brazilian Elite Culture', path: '/brazilian-elite-culture/', timeout: 10000 },
  { name: 'Premium Membership', path: '/premium-membership/', timeout: 10000 },
  { name: 'Live Streaming', path: '/live/', timeout: 12000 }
];

class CompleteDiagnostic {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      siteUrl: SITE_URL,
      summary: {
        totalPages: CRITICAL_PAGES.length + NAVIGATION_PAGES.length,
        successfulLoads: 0,
        redirects: 0,
        errors: 0,
        duplicatesFound: 0,
        navigationIssues: 0,
        javascriptErrors: 0
      },
      criticalPages: {},
      navigationPages: {},
      duplicateComponents: [],
      javascriptErrors: [],
      navigationIssues: [],
      recommendations: []
    };
  }

  async makeRequest(url, followRedirects = true) {
    return new Promise((resolve) => {
      let redirectCount = 0;
      const maxRedirects = 5;
      
      const makeReq = (currentUrl) => {
        const req = https.get(currentUrl, (res) => {
          // Handle redirects
          if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
            redirectCount++;
            if (redirectCount <= maxRedirects && followRedirects) {
              const redirectUrl = res.headers.location.startsWith('http') 
                ? res.headers.location 
                : SITE_URL + res.headers.location;
              
              console.log(`  → Redirect ${res.statusCode}: ${redirectUrl}`);
              return makeReq(redirectUrl);
            }
          }
          
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              body: data,
              redirectCount: redirectCount,
              finalUrl: currentUrl
            });
          });
        });
        
        req.on('error', (error) => {
          resolve({
            statusCode: 0,
            error: error.message,
            redirectCount: redirectCount
          });
        });
        
        req.setTimeout(15000, () => {
          req.abort();
          resolve({
            statusCode: 0,
            error: 'Request timeout',
            redirectCount: redirectCount
          });
        });
      };
      
      makeReq(url);
    });
  }

  analyzePageContent(html, pageName, path) {
    const analysis = {
      duplicates: [],
      javascriptErrors: [],
      navigationWorking: true,
      contentIssues: [],
      componentCounts: {
        lusoBotWidgets: 0,
        navigationElements: 0,
        welcomeComponents: 0,
        mobileNavigations: 0
      }
    };

    // Check for duplicate LusoBot instances
    const lusoBotMatches = html.match(/lusobot-widget|LusoBotWidget|aria-label="[^"]*LusoBot[^"]*"/gi) || [];
    analysis.componentCounts.lusoBotWidgets = lusoBotMatches.length;
    
    if (lusoBotMatches.length > 1) {
      analysis.duplicates.push({
        component: 'LusoBotWidget',
        count: lusoBotMatches.length,
        severity: 'HIGH',
        issue: `${lusoBotMatches.length} LusoBot widgets detected - should be exactly 1`
      });
    }

    // Check for multiple navigation systems
    const mobileNavMatches = html.match(/PremiumMobileNavigation|mobile-navigation|bottom.*nav/gi) || [];
    analysis.componentCounts.mobileNavigations = mobileNavMatches.length;
    
    // Check for banned welcome components (should be removed)
    const welcomeMatches = html.match(/WelcomePopup|WelcomeBanner|UserTypeSelection/gi) || [];
    analysis.componentCounts.welcomeComponents = welcomeMatches.length;
    
    if (welcomeMatches.length > 0) {
      analysis.duplicates.push({
        component: 'Welcome Components',
        count: welcomeMatches.length,
        severity: 'CRITICAL',
        issue: `${welcomeMatches.length} banned welcome components found - should be 0`
      });
    }

    // Check for JavaScript errors in page source
    const jsErrorPatterns = [
      /Uncaught\s+(TypeError|ReferenceError|SyntaxError)/gi,
      /Cannot\s+read\s+propert(y|ies)\s+of/gi,
      /\w+\s+is\s+not\s+defined/gi,
      /Script\s+error/gi
    ];
    
    jsErrorPatterns.forEach(pattern => {
      const matches = html.match(pattern) || [];
      if (matches.length > 0) {
        matches.forEach(error => {
          analysis.javascriptErrors.push({
            page: pageName,
            error: error.trim(),
            severity: 'HIGH'
          });
        });
      }
    });

    // Check for essential elements
    const essentialElements = {
      doctype: html.includes('<!DOCTYPE html>'),
      header: html.includes('<header') || html.includes('Header'),
      navigation: html.includes('<nav') || html.includes('navigation'),
      lusoBotWidget: html.includes('LusoBot') || html.includes('lusobot'),
      portugueseContent: html.includes('Portuguese') || html.includes('português') || html.includes('LusoTown')
    };

    Object.entries(essentialElements).forEach(([element, present]) => {
      if (!present) {
        analysis.contentIssues.push(`Missing essential element: ${element}`);
      }
    });

    // Check navigation functionality (look for dropdown menus, buttons)
    const navElements = html.match(/dropdown|menu.*button|nav.*link/gi) || [];
    if (navElements.length === 0) {
      analysis.navigationWorking = false;
    }

    return analysis;
  }

  async testPage(page, isNavigation = false) {
    const url = `${SITE_URL}${page.path}`;
    console.log(`Testing: ${page.name} (${url})`);
    
    const response = await this.makeRequest(url);
    const analysis = {
      name: page.name,
      path: page.path,
      url: url,
      status: 'ERROR',
      statusCode: response.statusCode,
      loadTime: 0,
      redirects: response.redirectCount || 0,
      error: response.error,
      finalUrl: response.finalUrl,
      pageAnalysis: null
    };

    if (response.statusCode === 200 && response.body) {
      analysis.status = 'SUCCESS';
      analysis.pageAnalysis = this.analyzePageContent(response.body, page.name, page.path);
      
      // Update summary counters
      this.results.summary.successfulLoads++;
      if (analysis.redirects > 0) this.results.summary.redirects++;
      
      // Track issues
      if (analysis.pageAnalysis.duplicates.length > 0) {
        this.results.summary.duplicatesFound += analysis.pageAnalysis.duplicates.length;
        this.results.duplicateComponents.push(...analysis.pageAnalysis.duplicates.map(d => ({
          ...d,
          page: page.name
        })));
      }
      
      if (analysis.pageAnalysis.javascriptErrors.length > 0) {
        this.results.summary.javascriptErrors += analysis.pageAnalysis.javascriptErrors.length;
        this.results.javascriptErrors.push(...analysis.pageAnalysis.javascriptErrors);
      }
      
      if (!analysis.pageAnalysis.navigationWorking) {
        this.results.summary.navigationIssues++;
        this.results.navigationIssues.push(`${page.name}: Navigation elements not detected`);
      }
      
    } else {
      this.results.summary.errors++;
      console.log(`  ❌ Error: ${response.error || `HTTP ${response.statusCode}`}`);
    }

    return analysis;
  }

  async runCompleteDiagnostic() {
    console.log('🔍 COMPLETE LUSOTOWN SITE DIAGNOSTIC STARTING...\n');
    console.log(`Testing ${this.results.summary.totalPages} pages for:
    - Duplicate components
    - Navigation functionality  
    - JavaScript errors
    - Portuguese community features
    - Mobile experience\n`);

    // Test critical pages
    console.log('📋 Testing Critical Pages...');
    for (const page of CRITICAL_PAGES) {
      const result = await this.testPage(page, false);
      this.results.criticalPages[page.path] = result;
      await new Promise(resolve => setTimeout(resolve, 800)); // Rate limiting
    }

    console.log('\n🔗 Testing Navigation Pages...');
    for (const page of NAVIGATION_PAGES) {
      const result = await this.testPage(page, true);
      this.results.navigationPages[page.path] = result;
      await new Promise(resolve => setTimeout(resolve, 800)); // Rate limiting
    }

    return this.generateComprehensiveReport();
  }

  generateComprehensiveReport() {
    const allPages = {...this.results.criticalPages, ...this.results.navigationPages};
    
    // Generate recommendations
    if (this.results.summary.duplicatesFound > 0) {
      this.results.recommendations.push('🚨 CRITICAL: Remove duplicate components from layout.tsx');
    }
    if (this.results.summary.javascriptErrors > 0) {
      this.results.recommendations.push('⚠️ HIGH: Fix JavaScript errors preventing functionality');
    }
    if (this.results.summary.navigationIssues > 0) {
      this.results.recommendations.push('🔧 MEDIUM: Improve navigation element detection');
    }
    if (this.results.summary.errors > 0) {
      this.results.recommendations.push('🛠️ LOW: Investigate pages returning non-200 status');
    }

    const report = `
# 🔍 COMPLETE LUSOTOWN SITE DIAGNOSTIC REPORT

**Generated:** ${this.results.timestamp}
**Site Tested:** ${this.results.siteUrl}
**Total Pages:** ${this.results.summary.totalPages}

## 📊 EXECUTIVE SUMMARY
- ✅ **Successful Loads**: ${this.results.summary.successfulLoads}/${this.results.summary.totalPages} (${Math.round((this.results.summary.successfulLoads/this.results.summary.totalPages)*100)}%)
- 🔄 **Redirects**: ${this.results.summary.redirects} pages (normal with trailingSlash: true)
- ❌ **Errors**: ${this.results.summary.errors} critical loading failures
- 🔄 **Duplicate Components**: ${this.results.summary.duplicatesFound} instances found
- 🚨 **JavaScript Errors**: ${this.results.summary.javascriptErrors} script errors detected
- 🔗 **Navigation Issues**: ${this.results.summary.navigationIssues} pages with nav problems

## 🚨 CRITICAL ISSUES REQUIRING IMMEDIATE ACTION

${this.results.duplicateComponents.length > 0 ? `
### 🔄 DUPLICATE COMPONENTS - CRITICAL PRIORITY
${this.results.duplicateComponents.map(dup => `
**${dup.component}** on ${dup.page}:
- Count: ${dup.count} instances
- Severity: ${dup.severity}  
- Issue: ${dup.issue}
- Fix: Remove duplicate instances from layout.tsx or page components
`).join('')}` : '✅ No duplicate components detected'}

${this.results.javascriptErrors.length > 0 ? `
### 🚨 JAVASCRIPT ERRORS - HIGH PRIORITY
${this.results.javascriptErrors.map(err => `
**${err.page}**: ${err.error}
- Severity: ${err.severity}
- Impact: May break user functionality
`).join('')}` : '✅ No JavaScript errors detected'}

${this.results.navigationIssues.length > 0 ? `
### 🔗 NAVIGATION ISSUES - MEDIUM PRIORITY
${this.results.navigationIssues.map(issue => `- ${issue}`).join('\n')}` : '✅ No navigation issues detected'}

## 📋 DETAILED PAGE ANALYSIS

### Critical Pages Status
${Object.entries(this.results.criticalPages).map(([path, result]) => `
**${result.name}** (${path})
- Status: ${result.status} (HTTP ${result.statusCode})
- Redirects: ${result.redirects}x
${result.pageAnalysis ? `- LusoBot Widgets: ${result.pageAnalysis.componentCounts.lusoBotWidgets}
- Mobile Navigation: ${result.pageAnalysis.componentCounts.mobileNavigations}
- Welcome Components: ${result.pageAnalysis.componentCounts.welcomeComponents}` : ''}
${result.error ? `- Error: ${result.error}` : ''}
`).join('')}

### Navigation Pages Status  
${Object.entries(this.results.navigationPages).map(([path, result]) => `
**${result.name}** (${path})
- Status: ${result.status} (HTTP ${result.statusCode})
- Redirects: ${result.redirects}x
${result.error ? `- Error: ${result.error}` : ''}
`).join('')}

## 🎯 IMMEDIATE ACTION PLAN

### Phase 1: Critical Fixes (DO NOW)
${this.results.recommendations.filter(r => r.includes('🚨 CRITICAL')).map(r => `- ${r}`).join('\n')}
${this.results.recommendations.filter(r => r.includes('🚨 CRITICAL')).length === 0 ? '- No critical fixes needed ✅' : ''}

### Phase 2: High Priority (NEXT)
${this.results.recommendations.filter(r => r.includes('⚠️ HIGH')).map(r => `- ${r}`).join('\n')}
${this.results.recommendations.filter(r => r.includes('⚠️ HIGH')).length === 0 ? '- No high priority fixes needed ✅' : ''}

### Phase 3: Medium Priority (SOON)
${this.results.recommendations.filter(r => r.includes('🔧 MEDIUM')).map(r => `- ${r}`).join('\n')}
${this.results.recommendations.filter(r => r.includes('🔧 MEDIUM')).length === 0 ? '- No medium priority fixes needed ✅' : ''}

### Phase 4: Low Priority (LATER)
${this.results.recommendations.filter(r => r.includes('🛠️ LOW')).map(r => `- ${r}`).join('\n')}
${this.results.recommendations.filter(r => r.includes('🛠️ LOW')).length === 0 ? '- No low priority fixes needed ✅' : ''}

## ✅ SUCCESS CRITERIA FOR NEXT TEST

- [ ] All ${this.results.summary.totalPages} pages return HTTP 200 (after redirects)
- [ ] Exactly 1 LusoBot widget per page (never more than 1)
- [ ] Zero welcome components (WelcomePopup, WelcomeBanner removed)
- [ ] Zero JavaScript console errors
- [ ] Navigation dropdowns working on all pages
- [ ] Portuguese community features accessible
- [ ] Mobile navigation working properly

## 🔄 MONITORING SETUP

**Recommended Test Schedule:**
- After each deployment: Run this diagnostic
- Weekly: Automated monitoring check
- Before major releases: Full manual QA review

**Key Metrics to Track:**
- Page load success rate (target: 100%)
- Component duplication count (target: 0)
- JavaScript error count (target: 0)
- Navigation functionality (target: 100% working)

---
**Diagnostic completed:** ${new Date().toISOString()}
**Next recommended run:** After fixing identified issues
**Status:** ${this.results.summary.errors === 0 && this.results.summary.duplicatesFound === 0 && this.results.summary.javascriptErrors === 0 ? '✅ HEALTHY' : '⚠️ ISSUES DETECTED'}
`;

    return report;
  }
}

// Run diagnostic if script is executed directly
if (require.main === module) {
  const diagnostic = new CompleteDiagnostic();
  diagnostic.runCompleteDiagnostic().then(report => {
    console.log('\n' + '='.repeat(80));
    console.log(report);
    
    // Save detailed report
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `complete-diagnostic-${timestamp}.md`;
    fs.writeFileSync(filename, report);
    console.log(`\n📄 Full diagnostic report saved to: ${filename}`);
    
    // Exit with appropriate code
    const hasIssues = diagnostic.results.summary.errors > 0 || 
                     diagnostic.results.summary.duplicatesFound > 0 || 
                     diagnostic.results.summary.javascriptErrors > 0;
    
    if (hasIssues) {
      console.log('\n❌ ISSUES DETECTED - Review report and fix before deployment');
      process.exit(1);
    } else {
      console.log('\n✅ ALL TESTS PASSED - Site is healthy');
      process.exit(0);
    }
  }).catch(error => {
    console.error('\n💥 Diagnostic failed:', error);
    process.exit(1);
  });
}

module.exports = CompleteDiagnostic;
