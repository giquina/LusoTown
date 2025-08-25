import { test, expect } from '@playwright/test';

test.describe('Navigation Diagnostic - Top Navigation Bar Issues', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the homepage first
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test('diagnose homepage loading and navigation structure', async ({ page }) => {
    console.log('=== HOMEPAGE DIAGNOSTIC ===');
    
    // Check if homepage loads
    await page.waitForSelector('body', { timeout: 10000 });
    const title = await page.title();
    console.log('Homepage title:', title);
    
    // Take screenshot of current state
    await page.screenshot({ path: 'homepage-current-state.png', fullPage: true });
    
    // Find navigation elements
    const navElements = await page.locator('nav').count();
    console.log('Navigation elements found:', navElements);
    
    // Look for top navigation links
    const topNavLinks = await page.locator('nav a, header a, [role="navigation"] a').all();
    console.log('Navigation links found:', topNavLinks.length);
    
    // List all navigation links
    for (let i = 0; i < topNavLinks.length; i++) {
      const link = topNavLinks[i];
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      console.log(`Link ${i + 1}: "${text}" -> "${href}"`);
    }
  });

  test('test "What\'s Happening" navigation specifically', async ({ page }) => {
    console.log('=== WHATS HAPPENING NAVIGATION TEST ===');
    
    // Look for "What's Happening" link variations
    const possibleSelectors = [
      'text="What\'s Happening"',
      'text="Events"',
      'text="Happening"',
      'text="Discover"',
      'text="Community"',
      '[href="/events"]',
      '[href="/whats-happening"]',
      '[href="/happening"]',
      'nav a:has-text("What")',
      'nav a:has-text("Happening")',
      'header a:has-text("What")',
      'header a:has-text("Events")',
    ];
    
    let whatsHappeningLink = null;
    let foundSelector = '';
    
    for (const selector of possibleSelectors) {
      try {
        const element = page.locator(selector).first();
        if (await element.isVisible({ timeout: 1000 })) {
          whatsHappeningLink = element;
          foundSelector = selector;
          console.log(`Found "What's Happening" link using selector: ${selector}`);
          break;
        }
      } catch (e) {
        // Continue searching
      }
    }
    
    if (whatsHappeningLink) {
      const href = await whatsHappeningLink.getAttribute('href');
      const text = await whatsHappeningLink.textContent();
      console.log(`Found link: "${text}" -> "${href}"`);
      
      // Try to click the link
      console.log('Attempting to click the link...');
      
      // Take screenshot before click
      await page.screenshot({ path: 'before-click.png' });
      
      try {
        await whatsHappeningLink.click();
        await page.waitForLoadState('networkidle', { timeout: 10000 });
        
        // Check what happened after click
        const newUrl = page.url();
        const newTitle = await page.title();
        console.log(`After click - URL: ${newUrl}, Title: ${newTitle}`);
        
        // Take screenshot after click
        await page.screenshot({ path: 'after-click.png' });
        
        // Check for error messages
        const errorMessages = await page.locator('text=/error/i, text=/404/i, text=/not found/i, text=/something went wrong/i').all();
        if (errorMessages.length > 0) {
          console.log('Error messages found:');
          for (const error of errorMessages) {
            const errorText = await error.textContent();
            console.log(`- ${errorText}`);
          }
        }
        
        // Check if page content loaded
        const bodyContent = await page.locator('body').textContent();
        if (bodyContent.length < 100) {
          console.log('WARNING: Very little content loaded after navigation');
        }
        
      } catch (clickError) {
        console.log('Error clicking link:', clickError.message);
        await page.screenshot({ path: 'click-error.png' });
      }
      
    } else {
      console.log('ERROR: Could not find "What\'s Happening" link in navigation');
      
      // Let's see what navigation links are actually available
      const allLinks = await page.locator('a[href^="/"]').all();
      console.log('All internal links found:');
      for (let i = 0; i < Math.min(allLinks.length, 20); i++) {
        const link = allLinks[i];
        const href = await link.getAttribute('href');
        const text = (await link.textContent())?.trim();
        if (text && href) {
          console.log(`- "${text}" -> "${href}"`);
        }
      }
    }
  });

  test('test all main navigation links', async ({ page }) => {
    console.log('=== ALL NAVIGATION LINKS TEST ===');
    
    // Find all main navigation links
    const mainNavLinks = await page.locator('nav a, header nav a, [role="navigation"] a').all();
    
    const linkTests = [];
    for (let i = 0; i < Math.min(mainNavLinks.length, 10); i++) { // Test first 10 links
      const link = mainNavLinks[i];
      const href = await link.getAttribute('href');
      const text = (await link.textContent())?.trim();
      
      if (href && href.startsWith('/') && text) {
        linkTests.push({ href, text, element: link });
      }
    }
    
    console.log(`Testing ${linkTests.length} navigation links:`);
    
    for (const linkTest of linkTests) {
      console.log(`\n--- Testing link: "${linkTest.text}" -> "${linkTest.href}" ---`);
      
      try {
        // Go back to homepage first
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle', { timeout: 5000 });
        
        // Find the link again (it might have changed due to reload)
        const currentLink = page.locator(`a[href="${linkTest.href}"]`).first();
        
        if (await currentLink.isVisible({ timeout: 2000 })) {
          await currentLink.click();
          await page.waitForLoadState('networkidle', { timeout: 8000 });
          
          const finalUrl = page.url();
          const finalTitle = await page.title();
          
          console.log(`Result: URL=${finalUrl}, Title="${finalTitle}"`);
          
          // Check for errors
          const hasError = await page.locator('text=/404/i, text=/error/i, text=/not found/i').count() > 0;
          if (hasError) {
            console.log('❌ ERROR: Page shows error message');
            const errorElements = await page.locator('text=/404/i, text=/error/i, text=/not found/i').all();
            for (const el of errorElements) {
              console.log(`Error text: ${await el.textContent()}`);
            }
          } else {
            console.log('✅ SUCCESS: Page loaded without errors');
          }
          
        } else {
          console.log('❌ ERROR: Link not found or not visible');
        }
        
      } catch (error) {
        console.log(`❌ ERROR: ${error.message}`);
      }
    }
  });

  test('check for JavaScript errors', async ({ page }) => {
    console.log('=== JAVASCRIPT ERRORS DIAGNOSTIC ===');
    
    const errors: string[] = [];
    const warnings: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
        console.log('JS ERROR:', msg.text());
      } else if (msg.type() === 'warning') {
        warnings.push(msg.text());
        console.log('JS WARNING:', msg.text());
      }
    });
    
    page.on('pageerror', (error) => {
      errors.push(error.message);
      console.log('PAGE ERROR:', error.message);
    });
    
    // Navigate to homepage and wait
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(3000); // Wait for any delayed errors
    
    console.log(`Total JS errors: ${errors.length}`);
    console.log(`Total JS warnings: ${warnings.length}`);
    
    // Try to click a navigation link and see if errors occur
    const firstNavLink = page.locator('nav a, header a').first();
    if (await firstNavLink.isVisible({ timeout: 2000 })) {
      const href = await firstNavLink.getAttribute('href');
      console.log(`Trying to navigate to first link: ${href}`);
      
      await firstNavLink.click();
      await page.waitForTimeout(3000); // Wait for potential errors
      
      console.log(`Errors after navigation: ${errors.length - (errors.length > 0 ? 1 : 0)}`);
    }
  });
});