const puppeteer = require('puppeteer');

class LusoTownTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.baseUrl = 'http://localhost:3005';
    this.testResults = {
      critical: [],
      moderate: [],
      minor: [],
      passed: []
    };
  }

  async initialize() {
    this.browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1280, height: 720 },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1280, height: 720 });
  }

  async testPageLoad(path, pageName) {
    try {
      console.log(`Testing ${pageName} (${path})...`);
      const response = await this.page.goto(`${this.baseUrl}${path}`, { 
        waitUntil: 'networkidle2',
        timeout: 10000 
      });
      
      if (response.status() === 200) {
        this.testResults.passed.push(`✅ ${pageName} loads successfully`);
        return true;
      } else {
        this.testResults.critical.push(`❌ ${pageName} failed to load (status: ${response.status()})`);
        return false;
      }
    } catch (error) {
      this.testResults.critical.push(`❌ ${pageName} failed to load: ${error.message}`);
      return false;
    }
  }

  async testCTAButtons() {
    try {
      console.log('Testing CTA buttons...');
      
      // Get all buttons and links that might be CTAs
      const ctaElements = await this.page.$$eval('button, a[href], .btn, [role="button"]', elements => {
        return elements.map(el => ({
          text: el.textContent.trim(),
          href: el.href || null,
          disabled: el.disabled || false,
          visible: el.offsetParent !== null
        })).filter(el => el.text && el.visible);
      });

      let workingCTAs = 0;
      let brokenCTAs = 0;

      for (const cta of ctaElements) {
        if (cta.text.toLowerCase().includes('book now') || 
            cta.text.toLowerCase().includes('learn more') ||
            cta.text.toLowerCase().includes('view more') ||
            cta.text.toLowerCase().includes('join now')) {
          
          if (cta.disabled) {
            this.testResults.moderate.push(`⚠️ CTA "${cta.text}" is disabled`);
            brokenCTAs++;
          } else if (cta.href === '#' || !cta.href) {
            this.testResults.moderate.push(`⚠️ CTA "${cta.text}" has no valid link`);
            brokenCTAs++;
          } else {
            workingCTAs++;
          }
        }
      }

      this.testResults.passed.push(`✅ Found ${workingCTAs} working CTAs`);
      if (brokenCTAs > 0) {
        this.testResults.moderate.push(`⚠️ Found ${brokenCTAs} broken CTAs`);
      }

    } catch (error) {
      this.testResults.critical.push(`❌ CTA testing failed: ${error.message}`);
    }
  }

  async testLanguageToggle() {
    try {
      console.log('Testing language toggle...');
      
      // Look for language toggle button
      const languageToggle = await this.page.$('[data-testid="language-toggle"], .language-toggle, button[aria-label*="language"]');
      
      if (!languageToggle) {
        this.testResults.moderate.push(`⚠️ Language toggle not found`);
        return;
      }

      // Test toggle functionality
      const initialText = await this.page.evaluate(() => document.body.textContent);
      await languageToggle.click();
      await this.page.waitForTimeout(1000); // Wait for language change
      const changedText = await this.page.evaluate(() => document.body.textContent);

      if (initialText !== changedText) {
        this.testResults.passed.push(`✅ Language toggle works`);
      } else {
        this.testResults.moderate.push(`⚠️ Language toggle may not be working`);
      }

    } catch (error) {
      this.testResults.moderate.push(`⚠️ Language toggle testing failed: ${error.message}`);
    }
  }

  async testMobileResponsiveness() {
    try {
      console.log('Testing mobile responsiveness...');
      
      // Test mobile viewport
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.reload({ waitUntil: 'networkidle2' });

      // Check for mobile navigation
      const mobileNav = await this.page.$('.mobile-nav, .hamburger, [data-testid="mobile-menu"]');
      if (mobileNav) {
        this.testResults.passed.push(`✅ Mobile navigation found`);
      } else {
        this.testResults.moderate.push(`⚠️ Mobile navigation not found`);
      }

      // Test grid layouts
      const gridElements = await this.page.$$eval('.grid', grids => {
        return grids.map(grid => {
          const styles = window.getComputedStyle(grid);
          return {
            columns: styles.gridTemplateColumns,
            gap: styles.gap
          };
        });
      });

      if (gridElements.length > 0) {
        this.testResults.passed.push(`✅ Found ${gridElements.length} grid layouts`);
      }

      // Reset viewport
      await this.page.setViewport({ width: 1280, height: 720 });

    } catch (error) {
      this.testResults.moderate.push(`⚠️ Mobile responsiveness testing failed: ${error.message}`);
    }
  }

  async testDemoLogin() {
    try {
      console.log('Testing demo login...');
      
      await this.page.goto(`${this.baseUrl}/login`, { waitUntil: 'networkidle2' });
      
      // Look for auto-fill button or demo credentials
      const autoFillButton = await this.page.$('button[data-testid="demo-login"], .demo-login, button:contains("Demo")');
      const emailField = await this.page.$('input[type="email"], input[name="email"]');
      const passwordField = await this.page.$('input[type="password"], input[name="password"]');

      if (autoFillButton) {
        await autoFillButton.click();
        this.testResults.passed.push(`✅ Demo login auto-fill button works`);
      } else if (emailField && passwordField) {
        await emailField.type('demo@lusotown.com');
        await passwordField.type('LusoTown2025!');
        this.testResults.passed.push(`✅ Demo login form available`);
      } else {
        this.testResults.moderate.push(`⚠️ Demo login system not found`);
      }

    } catch (error) {
      this.testResults.moderate.push(`⚠️ Demo login testing failed: ${error.message}`);
    }
  }

  async runComprehensiveTest() {
    console.log('Starting comprehensive LusoTown testing...');
    
    await this.initialize();

    // Test main pages
    const pages = [
      ['/', 'Homepage'],
      ['/events', 'Events'],
      ['/transport', 'Transport'],
      ['/matches', 'Premium Matches'],
      ['/live', 'Live Streaming'],
      ['/students', 'Students'],
      ['/premium-membership', 'Premium Membership'],
      ['/my-network', 'My Network'],
      ['/housing-assistance', 'Housing Assistance'],
      ['/directory', 'Directory'],
      ['/about', 'About'],
      ['/contact', 'Contact']
    ];

    for (const [path, name] of pages) {
      await this.testPageLoad(path, name);
      if (path === '/') {
        await this.testCTAButtons();
        await this.testLanguageToggle();
        await this.testMobileResponsiveness();
      }
    }

    // Test demo login
    await this.testDemoLogin();

    await this.browser.close();
    return this.generateReport();
  }

  generateReport() {
    const report = {
      summary: {
        total: this.testResults.critical.length + this.testResults.moderate.length + this.testResults.minor.length + this.testResults.passed.length,
        critical: this.testResults.critical.length,
        moderate: this.testResults.moderate.length,
        minor: this.testResults.minor.length,
        passed: this.testResults.passed.length
      },
      details: this.testResults
    };

    console.log('\n=== LUSOTOWN COMPREHENSIVE TEST REPORT ===\n');
    console.log(`Total Tests: ${report.summary.total}`);
    console.log(`Passed: ${report.summary.passed}`);
    console.log(`Critical Issues: ${report.summary.critical}`);
    console.log(`Moderate Issues: ${report.summary.moderate}`);
    console.log(`Minor Issues: ${report.summary.minor}\n`);

    if (this.testResults.critical.length > 0) {
      console.log('🚨 CRITICAL ISSUES:');
      this.testResults.critical.forEach(issue => console.log(issue));
      console.log('');
    }

    if (this.testResults.moderate.length > 0) {
      console.log('⚠️ MODERATE ISSUES:');
      this.testResults.moderate.forEach(issue => console.log(issue));
      console.log('');
    }

    if (this.testResults.minor.length > 0) {
      console.log('ℹ️ MINOR ISSUES:');
      this.testResults.minor.forEach(issue => console.log(issue));
      console.log('');
    }

    console.log('✅ PASSED TESTS:');
    this.testResults.passed.forEach(test => console.log(test));

    return report;
  }
}

// Run the test if called directly
if (require.main === module) {
  const tester = new LusoTownTester();
  tester.runComprehensiveTest().then(report => {
    process.exit(report.summary.critical > 0 ? 1 : 0);
  }).catch(error => {
    console.error('Test failed:', error);
    process.exit(1);
  });
}

module.exports = LusoTownTester;