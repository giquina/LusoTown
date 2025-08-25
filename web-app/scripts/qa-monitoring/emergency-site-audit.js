#!/usr/bin/env node

/**
 * EMERGENCY SITE AUDIT SCRIPT
 * Tests the deployed LusoTown site for critical issues
 * Run: node scripts/qa-monitoring/emergency-site-audit.js
 */

const https = require('https');
const fs = require('fs');

const SITE_URL = 'https://web-5vmpcxfvy-giquinas-projects.vercel.app';
const PAGES_TO_TEST = [
  '/',
  '/events',
  '/matches', 
  '/business-directory',
  '/pricing',
  '/login',
  '/signup',
  '/community',
  '/students'
];

class EmergencyAudit {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      siteUrl: SITE_URL,
      pages: {},
      criticalIssues: [],
      duplicateComponents: [],
      summary: {
        totalPages: PAGES_TO_TEST.length,
        successfulLoads: 0,
        errors: 0,
        duplicatesFound: 0
      }
    };
  }

  async testPage(path) {
    return new Promise((resolve) => {
      const url = `${SITE_URL}${path}`;
      console.log(`Testing: ${url}`);
      
      const req = https.get(url, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          const pageResult = this.analyzePageHTML(data, path, res.statusCode);
          resolve(pageResult);
        });
      });
      
      req.on('error', (error) => {
        console.error(`Error testing ${url}:`, error.message);
        resolve({
          path: path,
          status: 'ERROR',
          statusCode: 0,
          error: error.message,
          duplicates: [],
          issues: [`Failed to load: ${error.message}`]
        });
      });
      
      req.setTimeout(10000, () => {
        req.abort();
        resolve({
          path: path,
          status: 'TIMEOUT',
          statusCode: 0,
          error: 'Request timeout',
          duplicates: [],
          issues: ['Page load timeout after 10 seconds']
        });
      });
    });
  }

  analyzePageHTML(html, path, statusCode) {
    const result = {
      path: path,
      status: statusCode === 200 ? 'SUCCESS' : 'ERROR',
      statusCode: statusCode,
      duplicates: [],
      issues: [],
      componentCounts: {}
    };

    if (statusCode !== 200) {
      result.issues.push(`HTTP ${statusCode} - Page not loading properly`);
      return result;
    }

    // Check for duplicate LusoBot components
    const lusoBotMatches = html.match(/LusoBot|lusobot-widget|aria-label=".*LusoBot.*"/gi) || [];
    if (lusoBotMatches.length > 2) { // Allow for reasonable component usage
      result.duplicates.push({
        component: 'LusoBot',
        count: lusoBotMatches.length,
        issue: `${lusoBotMatches.length} LusoBot references found - potential duplicates`
      });
    }

    // Check for multiple navigation components  
    const navMatches = html.match(/mobile-navigation|PremiumMobileNavigation|class=".*nav.*"/gi) || [];
    result.componentCounts.navigation = navMatches.length;

    // Check for welcome popups/banners
    const welcomeMatches = html.match(/WelcomePopup|WelcomeBanner|welcome-modal/gi) || [];
    if (welcomeMatches.length > 0) {
      result.duplicates.push({
        component: 'Welcome Components',
        count: welcomeMatches.length,
        issue: 'Welcome components found - should be removed from layout'
      });
    }

    // Check for JavaScript errors in HTML
    if (html.includes('Uncaught') || html.includes('TypeError') || html.includes('ReferenceError')) {
      result.issues.push('JavaScript errors detected in page source');
    }

    // Check if critical elements are missing
    if (!html.includes('<!DOCTYPE html>')) {
      result.issues.push('Invalid HTML structure - missing DOCTYPE');
    }

    if (!html.includes('<header') && !html.includes('Header')) {
      result.issues.push('No header component found');
    }

    // Check for essential Portuguese community features
    const portugueseFeatures = [
      'portuguese',
      'Portuguese', 
      'LusoTown',
      'community'
    ];
    
    const missingFeatures = portugueseFeatures.filter(feature => !html.includes(feature));
    if (missingFeatures.length > 0) {
      result.issues.push(`Missing Portuguese community content: ${missingFeatures.join(', ')}`);
    }

    return result;
  }

  async runFullAudit() {
    console.log('🚨 EMERGENCY LUSOTOWN SITE AUDIT STARTING...\n');
    console.log(`Testing ${PAGES_TO_TEST.length} critical pages...\n`);

    for (const path of PAGES_TO_TEST) {
      const result = await this.testPage(path);
      this.results.pages[path] = result;
      
      // Update summary
      if (result.status === 'SUCCESS') {
        this.results.summary.successfulLoads++;
      } else {
        this.results.summary.errors++;
      }
      
      if (result.duplicates.length > 0) {
        this.results.summary.duplicatesFound += result.duplicates.length;
        this.results.duplicateComponents.push(...result.duplicates);
      }
      
      if (result.issues.length > 0) {
        this.results.criticalIssues.push({
          page: path,
          issues: result.issues
        });
      }
      
      // Wait between requests to avoid overwhelming server
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return this.generateReport();
  }

  generateReport() {
    const report = `
# 🚨 EMERGENCY LUSOTOWN SITE AUDIT REPORT

**Generated:** ${this.results.timestamp}
**Site:** ${this.results.siteUrl}
**Pages Tested:** ${this.results.summary.totalPages}

## 📊 SUMMARY
- ✅ Successful Loads: ${this.results.summary.successfulLoads}/${this.results.summary.totalPages}
- ❌ Errors: ${this.results.summary.errors}
- 🔄 Duplicates Found: ${this.results.summary.duplicatesFound}

## 🚨 CRITICAL ISSUES BY PAGE

${Object.entries(this.results.pages).map(([path, result]) => `
### ${path || 'Homepage'}
- **Status:** ${result.status} (HTTP ${result.statusCode})
${result.error ? `- **Error:** ${result.error}` : ''}
${result.duplicates.length > 0 ? `- **Duplicates:** ${result.duplicates.map(d => `${d.component} (${d.count}x)`).join(', ')}` : ''}
${result.issues.length > 0 ? `- **Issues:** ${result.issues.join('; ')}` : '- **Issues:** None detected'}
`).join('')}

## 🔄 DUPLICATE COMPONENTS DETECTED

${this.results.duplicateComponents.length === 0 ? '✅ No duplicate components detected' : 
  this.results.duplicateComponents.map(dup => `- **${dup.component}**: ${dup.issue}`).join('\n')
}

## 🎯 IMMEDIATE ACTION REQUIRED

${this.results.summary.errors > 0 ? `
### 🚨 CRITICAL - ${this.results.summary.errors} Pages Not Loading:
${Object.entries(this.results.pages)
  .filter(([path, result]) => result.status !== 'SUCCESS')
  .map(([path, result]) => `- ${path}: ${result.error || 'HTTP ' + result.statusCode}`)
  .join('\n')
}` : '✅ All pages loading successfully'}

${this.results.summary.duplicatesFound > 0 ? `
### 🔄 DUPLICATES - Remove These Components:
${this.results.duplicateComponents.map(dup => `- Fix: ${dup.issue}`).join('\n')
}` : '✅ No duplicate components found'}

### 🛠️ NEXT STEPS:
1. **Fix Critical Loading Issues:** Address all HTTP errors and timeouts
2. **Remove Duplicate Components:** Clean up any duplicate UI elements
3. **Test Navigation:** Ensure all dropdown menus and navigation work
4. **Mobile Testing:** Test responsive design on mobile devices
5. **Monitor Console:** Check browser console for JavaScript errors

## ✅ SUCCESS CRITERIA
- [ ] All ${this.results.summary.totalPages} pages load successfully (HTTP 200)
- [ ] Zero duplicate components visible to users
- [ ] All navigation links working properly
- [ ] Portuguese community features accessible
- [ ] No JavaScript console errors

---
**Audit completed at:** ${new Date().toISOString()}
**Next audit recommended:** After fixing identified issues
`;

    return report;
  }
}

// Run audit if script is executed directly
if (require.main === module) {
  const audit = new EmergencyAudit();
  audit.runFullAudit().then(report => {
    console.log(report);
    
    // Save report to file
    const filename = `emergency-audit-${Date.now()}.md`;
    fs.writeFileSync(filename, report);
    console.log(`\n📄 Report saved to: ${filename}`);
    
    // Exit with error code if critical issues found
    if (audit.results.summary.errors > 0 || audit.results.summary.duplicatesFound > 0) {
      process.exit(1);
    }
  }).catch(error => {
    console.error('Audit failed:', error);
    process.exit(1);
  });
}

module.exports = EmergencyAudit;
