const { chromium } = require('playwright');
const fs = require('fs');

const SITE_URL = 'https://web-rms4m4wbx-giquinas-projects.vercel.app';

async function runComprehensiveAudit() {
  console.log('🚀 Starting LusoTown Live Site Audit');
  console.log(`📍 Target URL: ${SITE_URL}`);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  
  const auditResults = {
    timestamp: new Date().toISOString(),
    site: SITE_URL,
    totalPages: 0,
    totalIssues: 0,
    criticalIssues: 0,
    warnings: 0,
    pageResults: {},
    brokenLinks: [],
    jsErrors: [],
    images: { total: 0, broken: 0, brokenUrls: [] },
    summary: {}
  };

  // Pages to audit
  const pagesToTest = [
    { path: '/', name: 'Homepage' },
    { path: '/about', name: 'About' },
    { path: '/events', name: 'Events' },
    { path: '/pricing', name: 'Pricing' },
    { path: '/business-directory', name: 'Business Directory' },
    { path: '/matches', name: 'Matches' },
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/students', name: 'Students' },
    { path: '/community', name: 'Community' },
    { path: '/login', name: 'Login' },
    { path: '/signup', name: 'Signup' },
    { path: '/transport', name: 'Transport' },
    { path: '/live', name: 'Live Streaming' },
    { path: '/premium-membership', name: 'Premium Membership' },
    { path: '/contact', name: 'Contact' }
  ];

  for (const pageInfo of pagesToTest) {
    console.log(`\n🔍 Auditing: ${pageInfo.name} (${pageInfo.path})`);
    
    const page = await context.newPage();
    const pageResult = {
      name: pageInfo.name,
      path: pageInfo.path,
      url: SITE_URL + pageInfo.path,
      status: 'unknown',
      loadTime: 0,
      issues: [],
      warnings: [],
      jsErrors: [],
      links: { total: 0, broken: 0 },
      images: { total: 0, broken: 0 },
      ctaButtons: { total: 0, broken: 0 },
      forms: { total: 0, issues: 0 }
    };

    try {
      // Track JavaScript errors
      const jsErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          jsErrors.push(`${msg.text()}`);
        }
      });
      
      page.on('pageerror', error => {
        jsErrors.push(`${error.message}`);
      });

      // Navigate to page with timing
      const startTime = Date.now();
      try {
        await page.goto(SITE_URL + pageInfo.path, { 
          waitUntil: 'networkidle', 
          timeout: 30000 
        });
        pageResult.loadTime = Date.now() - startTime;
        pageResult.status = 'loaded';
        console.log(`✅ Loaded in ${pageResult.loadTime}ms`);
      } catch (error) {
        pageResult.status = 'failed';
        pageResult.issues.push(`Failed to load: ${error.message}`);
        console.log(`❌ Failed to load: ${error.message}`);
        continue;
      }

      // Wait a moment for dynamic content
      await page.waitForTimeout(2000);

      // Check for title and basic content
      try {
        const title = await page.title();
        if (!title || title.trim() === '') {
          pageResult.issues.push('Missing or empty page title');
        }
        console.log(`📄 Title: ${title}`);
      } catch (error) {
        pageResult.issues.push(`Title error: ${error.message}`);
      }

      // Test all links
      try {
        const links = await page.locator('a[href]').all();
        pageResult.links.total = links.length;
        console.log(`🔗 Found ${links.length} links`);

        for (const link of links) {
          try {
            const href = await link.getAttribute('href');
            if (href && (href.startsWith('http') || href.startsWith('/'))) {
              // Test if link is accessible (visible and enabled)
              const isVisible = await link.isVisible();
              if (!isVisible) {
                pageResult.warnings.push(`Hidden link found: ${href}`);
              }
            }
          } catch (error) {
            pageResult.links.broken++;
            auditResults.brokenLinks.push({
              page: pageInfo.path,
              error: error.message
            });
          }
        }
      } catch (error) {
        pageResult.issues.push(`Link analysis failed: ${error.message}`);
      }

      // Test images
      try {
        const images = await page.locator('img').all();
        pageResult.images.total = images.length;
        console.log(`🖼️ Found ${images.length} images`);

        for (const img of images) {
          try {
            const src = await img.getAttribute('src');
            const alt = await img.getAttribute('alt');
            
            if (!alt || alt.trim() === '') {
              pageResult.warnings.push(`Image missing alt text: ${src}`);
            }
            
            // Check if image loads
            const naturalWidth = await img.evaluate(img => img.naturalWidth);
            if (naturalWidth === 0) {
              pageResult.images.broken++;
              auditResults.images.brokenUrls.push({
                page: pageInfo.path,
                src: src
              });
            }
          } catch (error) {
            pageResult.images.broken++;
          }
        }
      } catch (error) {
        pageResult.issues.push(`Image analysis failed: ${error.message}`);
      }

      // Test CTA buttons
      try {
        const ctaSelectors = [
          'button:has-text("Sign Up")',
          'button:has-text("Join")',
          'button:has-text("Learn More")',
          'button:has-text("Get Started")',
          'button:has-text("Subscribe")',
          'button:has-text("Book")',
          'a:has-text("Sign Up")',
          'a:has-text("Join")',
          'a:has-text("Learn More")',
          'a:has-text("Get Started")',
          '.cta-button',
          '[data-testid*="cta"]'
        ];

        for (const selector of ctaSelectors) {
          const buttons = await page.locator(selector).all();
          pageResult.ctaButtons.total += buttons.length;
          
          for (const button of buttons) {
            try {
              const isVisible = await button.isVisible();
              const isEnabled = await button.isEnabled();
              
              if (!isVisible) {
                pageResult.warnings.push(`CTA button not visible: ${selector}`);
              }
              if (!isEnabled) {
                pageResult.ctaButtons.broken++;
                pageResult.issues.push(`CTA button disabled: ${selector}`);
              }
            } catch (error) {
              pageResult.ctaButtons.broken++;
            }
          }
        }
        console.log(`🎯 Found ${pageResult.ctaButtons.total} CTA elements`);
      } catch (error) {
        pageResult.issues.push(`CTA analysis failed: ${error.message}`);
      }

      // Test forms
      try {
        const forms = await page.locator('form').all();
        pageResult.forms.total = forms.length;
        console.log(`📝 Found ${forms.length} forms`);

        for (const form of forms) {
          try {
            const action = await form.getAttribute('action');
            const method = await form.getAttribute('method');
            
            if (!action) {
              pageResult.warnings.push('Form missing action attribute');
            }
          } catch (error) {
            pageResult.forms.issues++;
          }
        }
      } catch (error) {
        pageResult.issues.push(`Form analysis failed: ${error.message}`);
      }

      // Check for mobile menu (on smaller screens)
      try {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(1000);
        
        const mobileMenu = await page.locator('[data-testid="mobile-menu"], .mobile-menu, button[aria-label*="menu"]').first();
        if (await mobileMenu.count() > 0) {
          const isVisible = await mobileMenu.isVisible();
          if (!isVisible) {
            pageResult.warnings.push('Mobile menu button not visible on mobile');
          }
        } else {
          pageResult.warnings.push('Mobile menu not found');
        }
        
        // Reset viewport
        await page.setViewportSize({ width: 1280, height: 720 });
      } catch (error) {
        pageResult.warnings.push(`Mobile menu test failed: ${error.message}`);
      }

      // Test language switcher
      try {
        const langSwitcher = await page.locator('[data-testid="language-switcher"], .language-switcher, button:has-text("EN"), button:has-text("PT")').first();
        if (await langSwitcher.count() > 0) {
          console.log('🌐 Language switcher found');
        } else {
          pageResult.warnings.push('Language switcher not found');
        }
      } catch (error) {
        pageResult.warnings.push(`Language switcher test failed: ${error.message}`);
      }

      // Collect JavaScript errors
      pageResult.jsErrors = jsErrors;
      if (jsErrors.length > 0) {
        console.log(`⚠️ Found ${jsErrors.length} JavaScript errors`);
        auditResults.jsErrors.push({
          page: pageInfo.path,
          errors: jsErrors
        });
      }

    } catch (error) {
      pageResult.status = 'error';
      pageResult.issues.push(`Page audit failed: ${error.message}`);
      console.log(`💥 Audit failed: ${error.message}`);
    } finally {
      await page.close();
    }

    // Classify issues
    const criticalIssues = pageResult.issues.filter(issue => 
      issue.includes('Failed to load') || 
      issue.includes('disabled') || 
      issue.includes('broken')
    ).length;
    
    auditResults.totalPages++;
    auditResults.totalIssues += pageResult.issues.length + pageResult.warnings.length;
    auditResults.criticalIssues += criticalIssues;
    auditResults.warnings += pageResult.warnings.length;
    auditResults.pageResults[pageInfo.path] = pageResult;

    console.log(`📊 Issues: ${pageResult.issues.length}, Warnings: ${pageResult.warnings.length}`);
  }

  await browser.close();

  // Generate summary
  auditResults.summary = {
    overallStatus: auditResults.criticalIssues === 0 ? 'GOOD' : auditResults.criticalIssues < 10 ? 'MODERATE' : 'CRITICAL',
    totalBrokenLinks: auditResults.brokenLinks.length,
    totalBrokenImages: auditResults.images.brokenUrls.length,
    totalJsErrors: auditResults.jsErrors.reduce((sum, page) => sum + page.errors.length, 0),
    averageLoadTime: Object.values(auditResults.pageResults)
      .filter(p => p.loadTime > 0)
      .reduce((sum, p, _, arr) => sum + p.loadTime / arr.length, 0)
  };

  // Save results
  const reportPath = '/workspaces/LusoTown/web-app/lusotown-comprehensive-audit.json';
  fs.writeFileSync(reportPath, JSON.stringify(auditResults, null, 2));
  
  console.log('\n' + '='.repeat(60));
  console.log('🎯 LUSOTOWN LIVE SITE AUDIT COMPLETE');
  console.log('='.repeat(60));
  console.log(`📊 Pages Audited: ${auditResults.totalPages}`);
  console.log(`🔥 Critical Issues: ${auditResults.criticalIssues}`);
  console.log(`⚠️ Total Warnings: ${auditResults.warnings}`);
  console.log(`🔗 Broken Links: ${auditResults.summary.totalBrokenLinks}`);
  console.log(`🖼️ Broken Images: ${auditResults.summary.totalBrokenImages}`);
  console.log(`💥 JavaScript Errors: ${auditResults.summary.totalJsErrors}`);
  console.log(`⏱️ Average Load Time: ${Math.round(auditResults.summary.averageLoadTime)}ms`);
  console.log(`📈 Overall Status: ${auditResults.summary.overallStatus}`);
  console.log(`📄 Full Report: ${reportPath}`);

  return auditResults;
}

if (require.main === module) {
  runComprehensiveAudit().catch(console.error);
}

module.exports = { runComprehensiveAudit };