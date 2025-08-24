import { test, expect } from '@playwright/test';

test.describe('LusoTown Website Status Check', () => {
  test('Should load homepage and capture errors', async ({ page }) => {
    // Enable console logging to capture JavaScript errors
    const consoleErrors: string[] = [];
    const networkErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(`Console Error: ${msg.text()}`);
      }
    });
    
    page.on('response', response => {
      if (!response.ok()) {
        networkErrors.push(`Network Error: ${response.status()} ${response.url()}`);
      }
    });
    
    console.log('Navigating to: https://web-dgw49bmct-giquinas-projects.vercel.app');
    
    try {
      // Navigate to the website
      await page.goto('https://web-dgw49bmct-giquinas-projects.vercel.app', {
        waitUntil: 'networkidle',
        timeout: 30000
      });
      
      // Take a screenshot of what users actually see
      await page.screenshot({ 
        path: 'homepage-screenshot.png', 
        fullPage: true 
      });
      
      // Check for error messages on the page
      const errorMessages = await page.locator('text=Something went wrong').count();
      const nextErrorMessages = await page.locator('text=Application error').count();
      const errorBoundaryMessages = await page.locator('[data-testid="error-boundary"]').count();
      
      console.log('Error Messages Found:');
      console.log(`- "Something went wrong": ${errorMessages}`);
      console.log(`- "Application error": ${nextErrorMessages}`);
      console.log(`- Error Boundary: ${errorBoundaryMessages}`);
      
      // Get page title and check if it loaded properly
      const title = await page.title();
      console.log(`Page Title: ${title}`);
      
      // Check if main navigation exists
      const navigationExists = await page.locator('nav').count();
      console.log(`Navigation elements found: ${navigationExists}`);
      
      // Check if main content loaded
      const mainContent = await page.locator('main').count();
      console.log(`Main content elements found: ${mainContent}`);
      
      // Try to find specific LusoTown elements
      const lusoTownElements = await page.locator('text=LusoTown').count();
      console.log(`LusoTown text occurrences: ${lusoTownElements}`);
      
      // Get the current URL after potential redirects
      const currentURL = page.url();
      console.log(`Final URL: ${currentURL}`);
      
      // Check page status
      const response = await page.evaluate(() => document.readyState);
      console.log(`Page ready state: ${response}`);
      
      // Log all console errors
      if (consoleErrors.length > 0) {
        console.log('\n=== CONSOLE ERRORS ===');
        consoleErrors.forEach(error => console.log(error));
      }
      
      // Log all network errors
      if (networkErrors.length > 0) {
        console.log('\n=== NETWORK ERRORS ===');
        networkErrors.forEach(error => console.log(error));
      }
      
      // Get page source to see what's actually rendered
      const pageContent = await page.content();
      const contentLength = pageContent.length;
      console.log(`Page content length: ${contentLength} characters`);
      
      // Check if it's a blank or error page
      if (contentLength < 1000) {
        console.log('\n=== PAGE CONTENT (appears to be minimal) ===');
        console.log(pageContent);
      }
      
    } catch (error) {
      console.error('Failed to load page:', error);
      
      // Still take screenshot to see error state
      await page.screenshot({ 
        path: 'error-page-screenshot.png', 
        fullPage: true 
      });
      
      throw error;
    }
  });
  
  test('Should test navigation links', async ({ page }) => {
    try {
      await page.goto('https://web-dgw49bmct-giquinas-projects.vercel.app', {
        waitUntil: 'networkidle',
        timeout: 30000
      });
      
      // Try to click common navigation links
      const navLinks = [
        'a[href="/about"]',
        'a[href="/events"]', 
        'a[href="/community"]',
        'a[href="/premium-membership"]',
        'a[href="/business-directory"]'
      ];
      
      for (const linkSelector of navLinks) {
        const linkExists = await page.locator(linkSelector).count();
        console.log(`Link ${linkSelector}: ${linkExists > 0 ? 'Found' : 'Not found'}`);
        
        if (linkExists > 0) {
          try {
            // Click the link and see if it works
            await page.click(linkSelector, { timeout: 5000 });
            await page.waitForLoadState('networkidle', { timeout: 10000 });
            const newURL = page.url();
            console.log(`Successfully navigated to: ${newURL}`);
            
            // Go back to homepage
            await page.goBack();
            await page.waitForLoadState('networkidle');
          } catch (linkError) {
            console.log(`Failed to click ${linkSelector}:`, linkError);
          }
        }
      }
      
    } catch (error) {
      console.error('Navigation test failed:', error);
    }
  });
});