const { chromium } = require('playwright');

const SITE_URL = 'https://web-rms4m4wbx-giquinas-projects.vercel.app';

async function quickAudit() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const quickResults = {
    homepage: { status: 'unknown', issues: [], loadTime: 0 },
    criticalPages: {},
    brokenFeatures: [],
    jsErrorSummary: []
  };

  console.log('🔍 Quick Critical Issues Check');

  // Test Homepage First
  try {
    console.log('\n🏠 Testing Homepage...');
    const start = Date.now();
    
    const jsErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        jsErrors.push(msg.text());
      }
    });
    
    await page.goto(SITE_URL, { timeout: 15000 });
    quickResults.homepage.loadTime = Date.now() - start;
    quickResults.homepage.status = 'loaded';
    
    // Quick checks
    const title = await page.title();
    if (!title.includes('LusoTown')) {
      quickResults.homepage.issues.push('Title missing LusoTown branding');
    }
    
    // Check main navigation
    const navLinks = await page.locator('nav a, header a').count();
    if (navLinks < 5) {
      quickResults.homepage.issues.push('Insufficient navigation links');
    }
    
    // Check for sign up buttons
    const signupButtons = await page.locator('text="Sign Up", text="Join", text="Get Started"').count();
    if (signupButtons === 0) {
      quickResults.homepage.issues.push('No signup CTAs found');
    }
    
    quickResults.jsErrorSummary.push({
      page: 'homepage',
      errors: jsErrors.length,
      examples: jsErrors.slice(0, 3)
    });
    
    console.log(`✅ Homepage loaded in ${quickResults.homepage.loadTime}ms`);
    console.log(`⚠️ JS Errors: ${jsErrors.length}`);
    
  } catch (error) {
    quickResults.homepage.status = 'failed';
    quickResults.homepage.issues.push(`Homepage failed: ${error.message}`);
    console.log(`❌ Homepage failed: ${error.message}`);
  }

  // Test Critical Pages (quick timeout)
  const criticalPages = ['/about', '/events', '/pricing', '/login', '/signup'];
  
  for (const path of criticalPages) {
    try {
      console.log(`\n🔍 Testing ${path}...`);
      const start = Date.now();
      
      await page.goto(SITE_URL + path, { 
        timeout: 10000,
        waitUntil: 'domcontentloaded' // Faster than networkidle
      });
      
      const loadTime = Date.now() - start;
      const pageTitle = await page.title();
      
      quickResults.criticalPages[path] = {
        status: 'loaded',
        loadTime,
        title: pageTitle,
        issues: []
      };
      
      // Quick validation
      if (pageTitle.includes('404') || pageTitle.includes('Error')) {
        quickResults.criticalPages[path].issues.push('Error in page title');
      }
      
      console.log(`✅ ${path} loaded in ${loadTime}ms`);
      
    } catch (error) {
      quickResults.criticalPages[path] = {
        status: 'failed',
        error: error.message,
        issues: [`Failed to load: ${error.message}`]
      };
      quickResults.brokenFeatures.push(`Page ${path}: ${error.message}`);
      console.log(`❌ ${path} failed: ${error.message}`);
    }
  }

  // Test Demo Login
  try {
    console.log('\n🔐 Testing Demo Login...');
    await page.goto(SITE_URL + '/login', { timeout: 10000 });
    
    const emailInput = page.locator('input[type="email"], input[name="email"]');
    const passwordInput = page.locator('input[type="password"], input[name="password"]');
    const loginButton = page.locator('button:has-text("Sign In"), button:has-text("Login"), input[type="submit"]');
    
    if (await emailInput.count() === 0) {
      quickResults.brokenFeatures.push('Login: Email input not found');
    }
    if (await passwordInput.count() === 0) {
      quickResults.brokenFeatures.push('Login: Password input not found');
    }
    if (await loginButton.count() === 0) {
      quickResults.brokenFeatures.push('Login: Submit button not found');
    }
    
    // Try demo login
    if (await emailInput.count() > 0 && await passwordInput.count() > 0) {
      await emailInput.fill('demo@lusotown.com');
      await passwordInput.fill('LusoTown2025!');
      
      if (await loginButton.count() > 0) {
        await loginButton.click();
        await page.waitForTimeout(3000);
        
        const currentUrl = page.url();
        if (currentUrl.includes('dashboard') || currentUrl.includes('profile')) {
          console.log('✅ Demo login successful');
        } else {
          quickResults.brokenFeatures.push('Demo login: Did not redirect to dashboard');
        }
      }
    }
    
  } catch (error) {
    quickResults.brokenFeatures.push(`Demo login failed: ${error.message}`);
    console.log(`❌ Demo login failed: ${error.message}`);
  }

  await browser.close();

  // Quick Summary
  console.log('\n' + '='.repeat(50));
  console.log('🎯 QUICK AUDIT SUMMARY');
  console.log('='.repeat(50));
  
  const loadedPages = Object.values(quickResults.criticalPages).filter(p => p.status === 'loaded').length;
  const failedPages = Object.values(quickResults.criticalPages).filter(p => p.status === 'failed').length;
  
  console.log(`📊 Homepage Status: ${quickResults.homepage.status}`);
  console.log(`📄 Critical Pages Loaded: ${loadedPages}/${criticalPages.length}`);
  console.log(`❌ Critical Pages Failed: ${failedPages}`);
  console.log(`🚨 Broken Features: ${quickResults.brokenFeatures.length}`);
  
  if (quickResults.brokenFeatures.length > 0) {
    console.log('\n🚨 CRITICAL ISSUES FOUND:');
    quickResults.brokenFeatures.forEach((issue, i) => {
      console.log(`${i + 1}. ${issue}`);
    });
  }
  
  console.log('\n💾 Saving quick results...');
  const fs = require('fs');
  fs.writeFileSync('/workspaces/LusoTown/web-app/quick-audit-results.json', JSON.stringify(quickResults, null, 2));
  
  return quickResults;
}

quickAudit().catch(console.error);