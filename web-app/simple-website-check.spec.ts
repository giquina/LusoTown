import { test, expect } from '@playwright/test';

// Override the playwright config for this test
test.use({ 
  baseURL: undefined, // Don't use localhost base URL
});

test.describe('Live Website Status Check', () => {
  test('Check LusoTown live website status', async ({ page }) => {
    // Arrays to collect errors
    const consoleErrors: string[] = [];
    const networkErrors: string[] = [];
    const failedRequests: string[] = [];
    
    // Listen for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(`Console Error: ${msg.text()}`);
      }
    });
    
    // Listen for network failures
    page.on('response', response => {
      if (!response.ok()) {
        networkErrors.push(`${response.status()} - ${response.url()}`);
        failedRequests.push(response.url());
      }
    });
    
    // Listen for page errors
    page.on('pageerror', exception => {
      consoleErrors.push(`Page Error: ${exception.message}`);
    });
    
    const targetURL = 'https://web-dgw49bmct-giquinas-projects.vercel.app';
    console.log(`\n🔍 Testing website: ${targetURL}`);
    
    try {
      // Navigate to the live website
      const response = await page.goto(targetURL, {
        waitUntil: 'domcontentloaded',
        timeout: 20000
      });
      
      console.log(`\n📋 Initial Response Status: ${response?.status()}`);
      console.log(`📋 Final URL: ${page.url()}`);
      
      // Take a screenshot to see what users see
      await page.screenshot({ 
        path: '/workspaces/LusoTown/web-app/live-website-screenshot.png', 
        fullPage: true 
      });
      console.log('📸 Screenshot saved: live-website-screenshot.png');
      
      // Wait a bit for any dynamic content to load
      await page.waitForTimeout(3000);
      
      // Check page title
      const title = await page.title();
      console.log(`📋 Page Title: "${title}"`);
      
      // Check if we can see common error messages
      const somethingWentWrong = await page.locator('text=/Something went wrong/i').count();
      const applicationError = await page.locator('text=/Application error/i').count();
      const nextJSError = await page.locator('text=/This page could not be found/i').count();
      const errorBoundary = await page.locator('[data-error-boundary], [data-testid*="error"]').count();
      
      console.log(`\n🚨 Error Messages Found:`);
      console.log(`   - "Something went wrong": ${somethingWentWrong}`);
      console.log(`   - "Application error": ${applicationError}`);
      console.log(`   - "Page not found": ${nextJSError}`);
      console.log(`   - Error boundaries: ${errorBoundary}`);
      
      // Check for LusoTown branding
      const lusoTownElements = await page.locator('text=/LusoTown/i').count();
      const logoElements = await page.locator('img[alt*="LusoTown"], [aria-label*="LusoTown"]').count();
      
      console.log(`\n🎯 LusoTown Elements:`);
      console.log(`   - Text mentions: ${lusoTownElements}`);
      console.log(`   - Logo elements: ${logoElements}`);
      
      // Check for main navigation
      const navElements = await page.locator('nav, [role="navigation"]').count();
      const menuItems = await page.locator('a[href*="/"], button').count();
      
      console.log(`\n🧭 Navigation Elements:`);
      console.log(`   - Navigation containers: ${navElements}`);
      console.log(`   - Clickable menu items: ${menuItems}`);
      
      // Check if main content exists
      const mainContent = await page.locator('main, [role="main"]').count();
      const contentDivs = await page.locator('div').count();
      
      console.log(`\n📄 Content Elements:`);
      console.log(`   - Main content areas: ${mainContent}`);
      console.log(`   - Total div elements: ${contentDivs}`);
      
      // Get page source info
      const pageContent = await page.content();
      const contentLength = pageContent.length;
      const hasHTML = pageContent.includes('<html');
      const hasBody = pageContent.includes('<body');
      
      console.log(`\n📏 Page Content:`);
      console.log(`   - Content length: ${contentLength} characters`);
      console.log(`   - Has HTML structure: ${hasHTML}`);
      console.log(`   - Has body tag: ${hasBody}`);
      
      // Check for specific error patterns in HTML
      const hasVercelError = pageContent.includes('vercel') && pageContent.includes('error');
      const hasNextError = pageContent.includes('_next') && pageContent.includes('error');
      
      console.log(`   - Contains Vercel errors: ${hasVercelError}`);
      console.log(`   - Contains Next.js errors: ${hasNextError}`);
      
      // If content is suspiciously short, show it
      if (contentLength < 2000) {
        console.log(`\n📝 Full page content (appears minimal):`);
        console.log('─'.repeat(60));
        console.log(pageContent.slice(0, 1000) + (pageContent.length > 1000 ? '\n... (truncated)' : ''));
        console.log('─'.repeat(60));
      }
      
      // Report console errors
      if (consoleErrors.length > 0) {
        console.log(`\n🔴 Console Errors (${consoleErrors.length}):`);
        consoleErrors.slice(0, 10).forEach((error, i) => {
          console.log(`   ${i + 1}. ${error}`);
        });
        if (consoleErrors.length > 10) {
          console.log(`   ... and ${consoleErrors.length - 10} more errors`);
        }
      }
      
      // Report network errors
      if (networkErrors.length > 0) {
        console.log(`\n🌐 Network Errors (${networkErrors.length}):`);
        networkErrors.slice(0, 10).forEach((error, i) => {
          console.log(`   ${i + 1}. ${error}`);
        });
        if (networkErrors.length > 10) {
          console.log(`   ... and ${networkErrors.length - 10} more errors`);
        }
      }
      
      // Summary assessment
      console.log(`\n📊 Assessment Summary:`);
      const hasErrors = somethingWentWrong > 0 || applicationError > 0 || nextJSError > 0 || consoleErrors.length > 0;
      const hasContent = lusoTownElements > 0 && contentLength > 2000;
      const hasNavigation = navElements > 0 && menuItems > 5;
      
      console.log(`   - Site has critical errors: ${hasErrors ? '❌ YES' : '✅ NO'}`);
      console.log(`   - Site has proper content: ${hasContent ? '✅ YES' : '❌ NO'}`);
      console.log(`   - Site has navigation: ${hasNavigation ? '✅ YES' : '❌ NO'}`);
      
      if (hasErrors) {
        console.log(`\n🚨 ISSUE IDENTIFIED: The website has critical errors that users are experiencing.`);
      } else if (!hasContent) {
        console.log(`\n⚠️  ISSUE IDENTIFIED: The website loads but appears to have minimal or missing content.`);
      } else if (!hasNavigation) {
        console.log(`\n⚠️  ISSUE IDENTIFIED: The website loads but navigation appears broken.`);
      } else {
        console.log(`\n✅ GOOD NEWS: The website appears to be loading correctly.`);
      }
      
    } catch (error) {
      console.error(`\n💥 CRITICAL FAILURE: Could not load the website at all`);
      console.error(`Error details:`, error);
      
      // Still try to take a screenshot of the error state
      try {
        await page.screenshot({ 
          path: '/workspaces/LusoTown/web-app/error-state-screenshot.png', 
          fullPage: true 
        });
        console.log('📸 Error state screenshot saved: error-state-screenshot.png');
      } catch (screenshotError) {
        console.log('Could not take error screenshot');
      }
    }
  });
  
  test('Test key navigation links', async ({ page }) => {
    const targetURL = 'https://web-dgw49bmct-giquinas-projects.vercel.app';
    
    try {
      await page.goto(targetURL, {
        waitUntil: 'domcontentloaded',
        timeout: 15000
      });
      
      console.log(`\n🔗 Testing Navigation Links:`);
      
      // Common links to test
      const testLinks = [
        { href: '/about', name: 'About' },
        { href: '/events', name: 'Events' },
        { href: '/community', name: 'Community' },
        { href: '/premium-membership', name: 'Premium Membership' },
        { href: '/business-directory', name: 'Business Directory' },
        { href: '/login', name: 'Login' },
        { href: '/signup', name: 'Sign Up' }
      ];
      
      for (const link of testLinks) {
        try {
          const linkElement = page.locator(`a[href="${link.href}"]`).first();
          const linkCount = await linkElement.count();
          
          if (linkCount > 0) {
            // Try to click the link
            await linkElement.click({ timeout: 5000 });
            await page.waitForLoadState('domcontentloaded', { timeout: 8000 });
            
            const currentURL = page.url();
            const isCorrectPage = currentURL.includes(link.href);
            
            console.log(`   ✅ ${link.name}: Found and navigable (${currentURL})`);
            
            // Go back to home
            await page.goBack();
            await page.waitForLoadState('domcontentloaded');
            
          } else {
            console.log(`   ❌ ${link.name}: Link not found on page`);
          }
          
        } catch (linkError) {
          console.log(`   ⚠️  ${link.name}: Found but failed to navigate - ${linkError}`);
        }
      }
      
    } catch (error) {
      console.error('Navigation test failed:', error);
    }
  });
});