const { chromium } = require('playwright');

const SITE_URL = 'https://web-rms4m4wbx-giquinas-projects.vercel.app';

async function testCriticalIssues() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
  const issues = {
    critical: [],
    warnings: [],
    broken_links: [],
    broken_ctas: [],
    js_errors: [],
    form_issues: [],
    mobile_issues: []
  };

  console.log('🚨 Testing Critical Functionality');

  // Test 1: Homepage Navigation and CTAs
  try {
    console.log('\n1️⃣ Testing Homepage Navigation & CTAs');
    const page = await context.newPage();
    
    const jsErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('favicon')) {
        jsErrors.push(msg.text());
      }
    });
    
    await page.goto(SITE_URL, { waitUntil: 'networkidle' });
    
    // Test main navigation links
    const navLinks = [
      { text: 'Events', expectedUrl: '/events' },
      { text: 'Business Directory', expectedUrl: '/business-directory' },
      { text: 'Matches', expectedUrl: '/matches' },
      { text: 'Students', expectedUrl: '/students' },
      { text: 'Pricing', expectedUrl: '/pricing' }
    ];
    
    for (const link of navLinks) {
      try {
        const linkElement = page.locator(`nav a:has-text("${link.text}"), header a:has-text("${link.text}")`).first();
        if (await linkElement.count() > 0) {
          const href = await linkElement.getAttribute('href');
          if (!href || !href.includes(link.expectedUrl)) {
            issues.broken_links.push({
              page: 'Homepage',
              link: link.text,
              expected: link.expectedUrl,
              actual: href,
              issue: 'Incorrect href'
            });
          }
        } else {
          issues.broken_links.push({
            page: 'Homepage',
            link: link.text,
            issue: 'Navigation link not found'
          });
        }
      } catch (error) {
        issues.broken_links.push({
          page: 'Homepage',
          link: link.text,
          issue: `Error testing link: ${error.message}`
        });
      }
    }
    
    // Test primary CTA buttons
    const ctaButtons = [
      'Join Community',
      'Get Started',
      'Sign Up',
      'Join Now',
      'Start Networking'
    ];
    
    let workingCTAs = 0;
    for (const cta of ctaButtons) {
      const button = page.locator(`button:has-text("${cta}"), a:has-text("${cta}")`).first();
      if (await button.count() > 0) {
        workingCTAs++;
        const isVisible = await button.isVisible();
        const isEnabled = await button.isEnabled();
        
        if (!isVisible || !isEnabled) {
          issues.broken_ctas.push({
            page: 'Homepage',
            cta: cta,
            issue: `Visible: ${isVisible}, Enabled: ${isEnabled}`
          });
        }
      }
    }
    
    if (workingCTAs === 0) {
      issues.critical.push('Homepage: No primary CTA buttons found');
    }
    
    issues.js_errors.push({
      page: 'Homepage',
      errors: jsErrors
    });
    
    console.log(`✅ Homepage: ${navLinks.length} nav links tested, ${workingCTAs} CTAs found`);
    await page.close();
    
  } catch (error) {
    issues.critical.push(`Homepage test failed: ${error.message}`);
  }

  // Test 2: Login Form Functionality
  try {
    console.log('\n2️⃣ Testing Login Form');
    const page = await context.newPage();
    await page.goto(SITE_URL + '/login');
    
    // Check for duplicate forms
    const forms = await page.locator('form').count();
    if (forms > 1) {
      issues.form_issues.push({
        page: 'Login',
        issue: `Multiple forms found: ${forms}`,
        severity: 'warning'
      });
    }
    
    // Check email inputs
    const emailInputs = await page.locator('input[type="email"]').count();
    if (emailInputs > 1) {
      issues.form_issues.push({
        page: 'Login',
        issue: `Multiple email inputs found: ${emailInputs}`,
        severity: 'critical'
      });
    }
    
    // Check submit buttons
    const submitButtons = await page.locator('button[type="submit"], input[type="submit"], button:has-text("Sign In"), button:has-text("Login")').count();
    if (submitButtons === 0) {
      issues.form_issues.push({
        page: 'Login',
        issue: 'No submit button found',
        severity: 'critical'
      });
    }
    
    // Test demo login with specific selectors
    try {
      const mainForm = page.locator('form').first();
      const emailInput = mainForm.locator('input[type="email"]').first();
      const passwordInput = mainForm.locator('input[type="password"]').first();
      
      if (await emailInput.count() > 0 && await passwordInput.count() > 0) {
        await emailInput.fill('demo@lusotown.com');
        await passwordInput.fill('LusoTown2025!');
        
        const submitButton = mainForm.locator('button[type="submit"], button:has-text("Sign In")').first();
        if (await submitButton.count() > 0) {
          await submitButton.click();
          
          // Wait for potential redirect or error
          await page.waitForTimeout(5000);
          
          const currentUrl = page.url();
          if (currentUrl.includes('error') || await page.locator('text="Invalid"').count() > 0) {
            issues.critical.push('Demo login credentials not working');
          } else if (!currentUrl.includes('dashboard') && !currentUrl.includes('profile')) {
            issues.warnings.push('Demo login: Unexpected redirect behavior');
          } else {
            console.log('✅ Demo login appears to work');
          }
        }
      }
    } catch (error) {
      issues.form_issues.push({
        page: 'Login',
        issue: `Demo login test failed: ${error.message}`,
        severity: 'critical'
      });
    }
    
    await page.close();
    
  } catch (error) {
    issues.critical.push(`Login form test failed: ${error.message}`);
  }

  // Test 3: Mobile Responsiveness
  try {
    console.log('\n3️⃣ Testing Mobile Experience');
    const page = await context.newPage();
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(SITE_URL);
    
    // Check for horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    if (hasHorizontalScroll) {
      issues.mobile_issues.push({
        page: 'Homepage',
        issue: 'Horizontal scroll detected on mobile',
        severity: 'warning'
      });
    }
    
    // Check mobile menu
    const mobileMenuSelectors = [
      '[data-testid="mobile-menu"]',
      '.mobile-menu',
      'button[aria-label*="menu"]',
      'button[aria-label*="Menu"]',
      '.hamburger',
      '.menu-toggle'
    ];
    
    let mobileMenuFound = false;
    for (const selector of mobileMenuSelectors) {
      if (await page.locator(selector).count() > 0) {
        mobileMenuFound = true;
        const isVisible = await page.locator(selector).first().isVisible();
        if (!isVisible) {
          issues.mobile_issues.push({
            page: 'Homepage',
            issue: 'Mobile menu button exists but not visible',
            severity: 'warning'
          });
        }
        break;
      }
    }
    
    if (!mobileMenuFound) {
      issues.mobile_issues.push({
        page: 'Homepage',
        issue: 'No mobile menu button found',
        severity: 'critical'
      });
    }
    
    await page.close();
    
  } catch (error) {
    issues.mobile_issues.push({
      page: 'Homepage',
      issue: `Mobile test failed: ${error.message}`,
      severity: 'critical'
    });
  }

  // Test 4: Event Booking (if available)
  try {
    console.log('\n4️⃣ Testing Event Booking');
    const page = await context.newPage();
    await page.goto(SITE_URL + '/events');
    
    const eventCards = await page.locator('.event-card, [data-testid*="event"], .card').count();
    const bookingButtons = await page.locator('button:has-text("Book"), button:has-text("Join"), button:has-text("Register")').count();
    
    if (eventCards === 0 && bookingButtons === 0) {
      issues.warnings.push('Events page: No events or booking buttons found');
    }
    
    console.log(`✅ Events: ${eventCards} event cards, ${bookingButtons} booking buttons`);
    await page.close();
    
  } catch (error) {
    issues.warnings.push(`Event booking test failed: ${error.message}`);
  }

  await browser.close();

  // Generate Summary
  console.log('\n' + '='.repeat(60));
  console.log('🚨 CRITICAL ISSUES ANALYSIS');
  console.log('='.repeat(60));
  
  console.log(`🔥 Critical Issues: ${issues.critical.length}`);
  console.log(`⚠️ Warnings: ${issues.warnings.length}`);
  console.log(`🔗 Broken Links: ${issues.broken_links.length}`);
  console.log(`🎯 Broken CTAs: ${issues.broken_ctas.length}`);
  console.log(`📝 Form Issues: ${issues.form_issues.length}`);
  console.log(`📱 Mobile Issues: ${issues.mobile_issues.length}`);
  
  if (issues.critical.length > 0) {
    console.log('\n🚨 CRITICAL ISSUES:');
    issues.critical.forEach((issue, i) => console.log(`${i + 1}. ${issue}`));
  }
  
  if (issues.form_issues.filter(f => f.severity === 'critical').length > 0) {
    console.log('\n🚨 CRITICAL FORM ISSUES:');
    issues.form_issues
      .filter(f => f.severity === 'critical')
      .forEach((issue, i) => console.log(`${i + 1}. ${issue.page}: ${issue.issue}`));
  }
  
  if (issues.broken_links.length > 0) {
    console.log('\n🔗 BROKEN LINKS:');
    issues.broken_links.forEach((link, i) => console.log(`${i + 1}. ${link.page} - ${link.link}: ${link.issue}`));
  }
  
  const fs = require('fs');
  fs.writeFileSync('/workspaces/LusoTown/web-app/critical-issues.json', JSON.stringify(issues, null, 2));
  
  return issues;
}

testCriticalIssues().catch(console.error);