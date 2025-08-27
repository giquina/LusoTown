import { test, expect } from '@playwright/test';

test.describe('LusoTown Website Validation', () => {
  const baseURL = 'https://web-99kxh0sku-giquinas-projects.vercel.app';

  test('Homepage loads and displays core elements', async ({ page }) => {
    console.log('🌐 Testing homepage load and core elements...');
    
    // Navigate to homepage
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    
    // Take screenshot for visual validation
    await page.screenshot({ 
      path: 'homepage-validation-test.png', 
      fullPage: true 
    });
    
    // Check basic elements
    await expect(page).toHaveTitle(/LusoTown/i);
    
    // Check for Portuguese cultural elements
    const content = await page.textContent('body');
    expect(content).toContain('Portuguese');
    
    console.log('✅ Homepage loads successfully');
    console.log('✅ Contains Portuguese cultural content');
  });

  test('Mobile navigation functionality', async ({ page }) => {
    console.log('📱 Testing mobile navigation...');
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(baseURL);
    
    // Take mobile screenshot
    await page.screenshot({ 
      path: 'mobile-navigation-test.png', 
      fullPage: true 
    });
    
    // Look for mobile menu indicators
    const mobileMenuExists = await page.locator('button').filter({ 
      hasText: /menu|☰|≡/ 
    }).count() > 0;
    
    const hamburgerExists = await page.locator('[aria-label*="menu"], [data-testid*="menu"]').count() > 0;
    
    console.log(`${mobileMenuExists || hamburgerExists ? '✅' : '❌'} Mobile menu elements found: ${mobileMenuExists || hamburgerExists}`);
  });

  test('Portuguese language elements validation', async ({ page }) => {
    console.log('🇵🇹 Testing Portuguese language elements...');
    
    await page.goto(baseURL);
    
    // Check for language toggle elements
    const languageElements = await page.locator('*').filter({ 
      hasText: /PT|EN|Português|English|Language|Idioma/ 
    }).count();
    
    console.log(`✅ Found ${languageElements} language-related elements`);
    
    // Check content for Portuguese-speaking community terminology
    const content = await page.textContent('body');
    const hasInclusiveTerms = content?.includes('Portuguese-speaking') || 
                             content?.includes('lusophone') ||
                             content?.includes('Lusophone');
    
    console.log(`${hasInclusiveTerms ? '✅' : '❌'} Uses inclusive Portuguese terminology: ${hasInclusiveTerms}`);
  });

  test('Mobile app download bar positioning', async ({ page }) => {
    console.log('📲 Testing app download bar...');
    
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(baseURL);
    
    // Look for app download elements
    const appDownloadElements = await page.locator('*').filter({ 
      hasText: /download|app|baixar|aplicativo/ 
    }).count();
    
    console.log(`ℹ️ Found ${appDownloadElements} app download related elements`);
    
    // Check if any fixed positioned elements exist at bottom
    const fixedElements = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      return elements.filter(el => {
        const style = window.getComputedStyle(el);
        return style.position === 'fixed' && 
               (style.bottom === '0px' || parseInt(style.bottom) < 100);
      }).length;
    });
    
    console.log(`✅ Found ${fixedElements} fixed positioned elements at bottom`);
  });

  test('CTA buttons and interactive elements', async ({ page }) => {
    console.log('🎯 Testing CTA buttons...');
    
    await page.goto(baseURL);
    
    // Find all button and link elements
    const buttons = await page.locator('button, a[class*="btn"], a[class*="button"]').count();
    const ctaElements = await page.locator('*').filter({ 
      hasText: /join|sign up|get started|contact|subscribe|entrar|participar/ 
    }).count();
    
    console.log(`✅ Found ${buttons} button elements`);
    console.log(`✅ Found ${ctaElements} CTA elements`);
    
    // Test if buttons are clickable (not checking functionality, just presence)
    const clickableButtons = await page.locator('button:not([disabled]), a[href]').count();
    console.log(`✅ Found ${clickableButtons} clickable elements`);
  });

  test('JavaScript error detection', async ({ page }) => {
    console.log('🐛 Testing for JavaScript errors...');
    
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Listen for console messages
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      } else if (msg.type() === 'warning') {
        warnings.push(msg.text());
      }
    });
    
    // Listen for page errors
    page.on('pageerror', (exception) => {
      errors.push(exception.toString());
    });
    
    await page.goto(baseURL);
    await page.waitForTimeout(5000);
    
    console.log(`${errors.length === 0 ? '✅' : '❌'} JavaScript Errors: ${errors.length}`);
    console.log(`ℹ️ JavaScript Warnings: ${warnings.length}`);
    
    if (errors.length > 0) {
      console.log('🚨 JavaScript Errors Found:');
      errors.slice(0, 3).forEach((error, index) => {
        console.log(`  ${index + 1}. ${error.substring(0, 100)}...`);
      });
    }
  });

  test('Responsive breakpoints validation', async ({ page }) => {
    console.log('📐 Testing responsive breakpoints...');
    
    const breakpoints = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1024, height: 768, name: 'Desktop Small' },
      { width: 1440, height: 900, name: 'Desktop Large' }
    ];
    
    for (const breakpoint of breakpoints) {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await page.goto(baseURL);
      
      // Check for horizontal overflow
      const hasOverflow = await page.evaluate(() => {
        return document.body.scrollWidth > window.innerWidth;
      });
      
      // Take screenshot at each breakpoint
      await page.screenshot({ 
        path: `responsive-${breakpoint.width}x${breakpoint.height}.png` 
      });
      
      console.log(`${!hasOverflow ? '✅' : '❌'} ${breakpoint.name} (${breakpoint.width}px): ${!hasOverflow ? 'No overflow' : 'Has overflow'}`);
    }
  });

  test('LusoBot widget and AI elements', async ({ page }) => {
    console.log('🤖 Testing LusoBot and AI elements...');
    
    await page.goto(baseURL);
    await page.waitForTimeout(3000); // Wait for dynamic content
    
    // Look for bot/chat related elements
    const botElements = await page.locator('*').filter({ 
      hasText: /bot|chat|assistant|ajuda|help/ 
    }).count();
    
    // Look for AI-related elements
    const aiElements = await page.locator('*').filter({ 
      hasText: /ai|artificial|inteligencia|smart|match/ 
    }).count();
    
    console.log(`ℹ️ Found ${botElements} bot-related elements`);
    console.log(`ℹ️ Found ${aiElements} AI-related elements`);
    
    // Check for any floating/fixed positioned elements (potential widgets)
    const floatingElements = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      return elements.filter(el => {
        const style = window.getComputedStyle(el);
        return style.position === 'fixed' || style.position === 'absolute';
      }).length;
    });
    
    console.log(`✅ Found ${floatingElements} positioned elements (potential widgets)`);
  });

});