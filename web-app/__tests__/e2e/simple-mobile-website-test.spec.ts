import { test, expect } from '@playwright/test';

/**
 * Simple Mobile Website Test for LusoTown
 * Tests the live website directly without local server dependency
 */

test.describe('LusoTown Mobile Website - Live Testing', () => {
  
  test('Test mobile website accessibility', async ({ page }) => {
    console.log('🚀 Starting mobile website test...');
    
    const LIVE_URL = 'https://web-8jh71jiyo-giquinas-projects.vercel.app';
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    console.log(`📱 Navigating to: ${LIVE_URL}`);
    
    try {
      await page.goto(LIVE_URL, { timeout: 30000 });
      await page.waitForLoadState('networkidle', { timeout: 20000 });
      
      console.log('✅ Page loaded successfully');
      
      // Take initial screenshot
      await page.screenshot({ 
        path: '/workspaces/LusoTown/web-app/mobile-test-initial.png',
        fullPage: true 
      });
      
      // Check basic page elements
      const pageTitle = await page.title();
      console.log(`📄 Page title: "${pageTitle}"`);
      expect(pageTitle).toBeTruthy();
      
      // Look for mobile menu button
      const hamburgerSelectors = [
        '[data-testid="mobile-menu-button"]',
        'button[aria-label*="menu"]',
        'button:has(svg[data-slot="icon"])',
        '.xl\\:hidden button:visible'
      ];
      
      let menuButton = null;
      for (const selector of hamburgerSelectors) {
        const element = page.locator(selector).first();
        if (await element.count() > 0) {
          menuButton = element;
          console.log(`🔍 Found menu button with selector: ${selector}`);
          break;
        }
      }
      
      if (menuButton && await menuButton.isVisible()) {
        console.log('✅ Mobile menu button found');
        
        // Test menu button click
        await menuButton.click();
        await page.waitForTimeout(1000);
        
        // Take screenshot after menu click
        await page.screenshot({ 
          path: '/workspaces/LusoTown/web-app/mobile-test-menu-clicked.png',
          fullPage: true 
        });
        
        console.log('✅ Menu button clicked');
      } else {
        console.log('❌ Mobile menu button not found');
      }
      
      // Check for Portuguese content
      const bodyText = await page.textContent('body');
      const hasPortugueseContent = bodyText && (
        bodyText.includes('Portuguese') ||
        bodyText.includes('português') ||
        bodyText.includes('LusoTown') ||
        bodyText.includes('community')
      );
      
      console.log(`🇵🇹 Portuguese content found: ${hasPortugueseContent}`);
      
      // Test basic performance
      const performanceMetrics = await page.evaluate(() => {
        const timing = performance.timing;
        return {
          loadTime: timing.loadEventEnd - timing.navigationStart,
          domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart
        };
      });
      
      console.log(`⚡ Performance metrics:`, performanceMetrics);
      
      console.log('🎯 Mobile website test completed successfully');
      
    } catch (error) {
      console.error('❌ Test failed:', error);
      
      // Take error screenshot
      await page.screenshot({ 
        path: '/workspaces/LusoTown/web-app/mobile-test-error.png',
        fullPage: true 
      });
      
      throw error;
    }
  });
  
});