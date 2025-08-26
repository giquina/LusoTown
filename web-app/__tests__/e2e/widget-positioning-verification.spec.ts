import { test, expect } from '@playwright/test';

test.describe('LusoTown Widget Positioning Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the LusoTown homepage
    await page.goto('/');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Wait a bit for widgets to initialize
    await page.waitForTimeout(2000);
  });

  test('Desktop - Widget positioning and z-index hierarchy', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // Wait for widgets to load
    await page.waitForTimeout(3000);
    
    // Check if AppDownloadBar is present
    const appDownloadBar = page.locator('[class*="app-download"], [class*="AppDownloadBar"], [data-testid="app-download-bar"]');
    const appDownloadBarExists = await appDownloadBar.count() > 0;
    
    // Check if LusoBot chatbot is present
    const lusoBotWidget = page.locator('[class*="lusobot"], [class*="chatbot"], [class*="chat-widget"], [data-testid="lusobot-widget"]');
    const lusoBotExists = await lusoBotWidget.count() > 0;
    
    console.log('AppDownloadBar exists:', appDownloadBarExists);
    console.log('LusoBot widget exists:', lusoBotExists);
    
    if (appDownloadBarExists && lusoBotExists) {
      // Get initial positions
      const appDownloadBarBox = await appDownloadBar.first().boundingBox();
      const lusoBotBox = await lusoBotWidget.first().boundingBox();
      
      console.log('AppDownloadBar initial position:', appDownloadBarBox);
      console.log('LusoBot initial position:', lusoBotBox);
      
      // Check for overlap
      if (appDownloadBarBox && lusoBotBox) {
        const overlap = !(
          appDownloadBarBox.x + appDownloadBarBox.width <= lusoBotBox.x ||
          lusoBotBox.x + lusoBotBox.width <= appDownloadBarBox.x ||
          appDownloadBarBox.y + appDownloadBarBox.height <= lusoBotBox.y ||
          lusoBotBox.y + lusoBotBox.height <= appDownloadBarBox.y
        );
        
        expect(overlap).toBe(false); // Should not overlap
        console.log('Widget overlap check:', overlap ? 'OVERLAPPING' : 'NO OVERLAP');
      }
      
      // Check z-index values
      const appDownloadBarZIndex = await appDownloadBar.first().evaluate(el => window.getComputedStyle(el).zIndex);
      const lusoBotZIndex = await lusoBotWidget.first().evaluate(el => window.getComputedStyle(el).zIndex);
      
      console.log('AppDownloadBar z-index:', appDownloadBarZIndex);
      console.log('LusoBot z-index:', lusoBotZIndex);
      
      // LusoBot should have higher z-index than AppDownloadBar
      if (appDownloadBarZIndex !== 'auto' && lusoBotZIndex !== 'auto') {
        expect(parseInt(lusoBotZIndex)).toBeGreaterThan(parseInt(appDownloadBarZIndex));
      }
    }
    
    // Scroll test - simulate user scrolling down the page
    console.log('Starting scroll test...');
    
    const scrollPositions = [0, 500, 1000, 1500, 2000];
    
    for (const scrollY of scrollPositions) {
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(500); // Wait for scroll to complete
      
      console.log(`Scrolled to position: ${scrollY}px`);
      
      if (lusoBotExists) {
        // Check if LusoBot is still visible
        const lusoBotVisible = await lusoBotWidget.first().isVisible();
        expect(lusoBotVisible).toBe(true);
        
        // Get position after scroll
        const lusoBotBoxAfterScroll = await lusoBotWidget.first().boundingBox();
        console.log(`LusoBot position at scroll ${scrollY}:`, lusoBotBoxAfterScroll);
      }
      
      if (appDownloadBarExists) {
        // Check if AppDownloadBar is still positioned correctly
        const appDownloadBarVisible = await appDownloadBar.first().isVisible();
        const appDownloadBarBoxAfterScroll = await appDownloadBar.first().boundingBox();
        console.log(`AppDownloadBar visibility at scroll ${scrollY}:`, appDownloadBarVisible);
        console.log(`AppDownloadBar position at scroll ${scrollY}:`, appDownloadBarBoxAfterScroll);
      }
    }
  });

  test('Mobile - Widget positioning and responsiveness', async ({ page }) => {
    // Set mobile viewport (iPhone 12)
    await page.setViewportSize({ width: 390, height: 844 });
    
    // Wait for widgets to load
    await page.waitForTimeout(3000);
    
    // Check if widgets are present on mobile
    const appDownloadBar = page.locator('[class*="app-download"], [class*="AppDownloadBar"], [data-testid="app-download-bar"]');
    const lusoBotWidget = page.locator('[class*="lusobot"], [class*="chatbot"], [class*="chat-widget"], [data-testid="lusobot-widget"]');
    
    const appDownloadBarExists = await appDownloadBar.count() > 0;
    const lusoBotExists = await lusoBotWidget.count() > 0;
    
    console.log('Mobile - AppDownloadBar exists:', appDownloadBarExists);
    console.log('Mobile - LusoBot widget exists:', lusoBotExists);
    
    if (appDownloadBarExists && lusoBotExists) {
      // Check positioning on mobile
      const appDownloadBarBox = await appDownloadBar.first().boundingBox();
      const lusoBotBox = await lusoBotWidget.first().boundingBox();
      
      console.log('Mobile - AppDownloadBar position:', appDownloadBarBox);
      console.log('Mobile - LusoBot position:', lusoBotBox);
      
      // Ensure widgets don't overlap on mobile
      if (appDownloadBarBox && lusoBotBox) {
        const overlap = !(
          appDownloadBarBox.x + appDownloadBarBox.width <= lusoBotBox.x ||
          lusoBotBox.x + lusoBotBox.width <= appDownloadBarBox.x ||
          appDownloadBarBox.y + appDownloadBarBox.height <= lusoBotBox.y ||
          lusoBotBox.y + lusoBotBox.height <= appDownloadBarBox.y
        );
        
        expect(overlap).toBe(false);
        console.log('Mobile - Widget overlap check:', overlap ? 'OVERLAPPING' : 'NO OVERLAP');
      }
    }
    
    // Mobile scroll test
    console.log('Mobile - Starting scroll test...');
    
    const mobileScrollPositions = [0, 300, 600, 900, 1200];
    
    for (const scrollY of mobileScrollPositions) {
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(500);
      
      console.log(`Mobile - Scrolled to position: ${scrollY}px`);
      
      if (lusoBotExists) {
        const lusoBotVisible = await lusoBotWidget.first().isVisible();
        const lusoBotBoxAfterScroll = await lusoBotWidget.first().boundingBox();
        console.log(`Mobile - LusoBot visibility at scroll ${scrollY}:`, lusoBotVisible);
        console.log(`Mobile - LusoBot position at scroll ${scrollY}:`, lusoBotBoxAfterScroll);
      }
      
      if (appDownloadBarExists) {
        const appDownloadBarVisible = await appDownloadBar.first().isVisible();
        console.log(`Mobile - AppDownloadBar visibility at scroll ${scrollY}:`, appDownloadBarVisible);
      }
    }
  });

  test('Widget interaction and behavior', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // Wait for widgets to load
    await page.waitForTimeout(3000);
    
    // Try to interact with widgets to ensure they're functional
    const lusoBotWidget = page.locator('[class*="lusobot"], [class*="chatbot"], [class*="chat-widget"], [data-testid="lusobot-widget"]');
    const appDownloadBar = page.locator('[class*="app-download"], [class*="AppDownloadBar"], [data-testid="app-download-bar"]');
    
    if (await lusoBotWidget.count() > 0) {
      console.log('Testing LusoBot interaction...');
      
      // Try to click on the chatbot widget (if clickable)
      try {
        await lusoBotWidget.first().click({ timeout: 2000 });
        console.log('LusoBot widget clicked successfully');
      } catch (error) {
        console.log('LusoBot widget not clickable or interaction failed:', error.message);
      }
      
      // Check if chatbot expanded or changed state
      await page.waitForTimeout(1000);
    }
    
    if (await appDownloadBar.count() > 0) {
      console.log('Testing AppDownloadBar interaction...');
      
      // Look for close button or interaction elements
      const closeButton = page.locator('[class*="close"], [data-testid="close-app-download"]');
      if (await closeButton.count() > 0) {
        try {
          await closeButton.first().click({ timeout: 2000 });
          console.log('AppDownloadBar close button clicked successfully');
          
          // Wait and check if bar is hidden
          await page.waitForTimeout(1000);
          const barStillVisible = await appDownloadBar.first().isVisible();
          console.log('AppDownloadBar still visible after close:', barStillVisible);
        } catch (error) {
          console.log('AppDownloadBar close interaction failed:', error.message);
        }
      }
    }
  });
});
