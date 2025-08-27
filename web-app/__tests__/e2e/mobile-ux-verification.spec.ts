/**
 * Mobile UX Verification E2E Test
 * 
 * Verifies the critical mobile UX fixes implemented:
 * 1. AppDownloadBar positioning and z-index
 * 2. Homepage CTA button text wrapping prevention  
 * 3. Portuguese-speaking community cultural accuracy
 * 4. Mobile responsiveness at key breakpoints
 * 5. Touch target accessibility compliance
 */

import { test, expect, devices } from '@playwright/test';

// Mobile device configurations to test
const mobileDevices = [
  { name: 'iPhone SE', ...devices['iPhone SE'] },
  { name: 'iPhone 12', ...devices['iPhone 12'] },
  { name: 'Pixel 5', ...devices['Pixel 5'] },
  { name: 'iPad', ...devices['iPad (gen 7)'] },
];

// Test each mobile device configuration
for (const device of mobileDevices) {
  test.describe(`Mobile UX Fixes on ${device.name}`, () => {
    test.use({ ...device });

    test('should have properly positioned AppDownloadBar', async ({ page }) => {
      await page.goto('http://localhost:3000');
      
      // Wait for potential app download bar to appear
      await page.waitForTimeout(6000);
      
      // Check if app download bar exists and has proper positioning
      const appDownloadBar = page.locator('[role="banner"]:has-text("LusoTown App")');
      
      if (await appDownloadBar.isVisible()) {
        // Should be positioned at bottom
        const bbox = await appDownloadBar.boundingBox();
        const viewportHeight = page.viewportSize()?.height || 0;
        
        // App bar should be near the bottom of the screen
        expect(bbox?.y).toBeGreaterThan(viewportHeight - 200);
        
        // Should not cover the entire screen
        expect(bbox?.height).toBeLessThan(viewportHeight / 2);
        
        // Should have proper margins on mobile
        expect(bbox?.x).toBeGreaterThan(4); // At least 4px margin
      }
    });

    test('should display culturally accurate app description', async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.waitForTimeout(6000);
      
      const appDownloadBar = page.locator('[role="banner"]:has-text("LusoTown App")');
      
      if (await appDownloadBar.isVisible()) {
        // Check for Portuguese-speaking community terminology (not just Portuguese)
        const description = appDownloadBar.locator('p');
        const descriptionText = await description.textContent();
        
        // Should mention Portuguese-speaking community or UK context
        expect(descriptionText).toMatch(/Portuguese-speaking|lusófona|Reino Unido|across the UK/i);
        
        // Should NOT just say "Portuguese community" without "speaking"
        expect(descriptionText).not.toMatch(/^(?!.*speaking).*Portuguese community/i);
      }
    });

    test('should have proper CTA button text without wrapping', async ({ page }) => {
      await page.goto('http://localhost:3000');
      
      // Find CTA buttons
      const ctaButtons = page.locator('a:has-text("Join"), a:has-text("Join Now")');
      
      for (let i = 0; i < await ctaButtons.count(); i++) {
        const button = ctaButtons.nth(i);
        const bbox = await button.boundingBox();
        
        if (bbox) {
          // Button should not be excessively tall (indicating text wrapping)
          expect(bbox.height).toBeLessThan(80);
          
          // Check for whitespace-nowrap class or similar
          const classNames = await button.getAttribute('class');
          expect(classNames).toContain('whitespace-nowrap');
        }
      }
    });

    test('should have accessible touch targets', async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.waitForTimeout(6000);
      
      // Check buttons and links for proper touch target sizes
      const interactiveElements = page.locator('button, a[href], [role="button"]');
      
      for (let i = 0; i < Math.min(10, await interactiveElements.count()); i++) {
        const element = interactiveElements.nth(i);
        
        if (await element.isVisible()) {
          const bbox = await element.boundingBox();
          
          if (bbox) {
            // Touch targets should be at least 44px in both dimensions (WCAG AA)
            expect(bbox.width).toBeGreaterThanOrEqual(40); // Allow 4px tolerance
            expect(bbox.height).toBeGreaterThanOrEqual(40);
          }
        }
      }
    });

    test('should display properly at different zoom levels', async ({ page }) => {
      await page.goto('http://localhost:3000');
      
      // Test at different zoom levels
      const zoomLevels = [1.0, 1.25, 1.5, 2.0];
      
      for (const zoom of zoomLevels) {
        await page.setViewportSize({ 
          width: Math.round((device.viewport?.width || 375) / zoom),
          height: Math.round((device.viewport?.height || 667) / zoom)
        });
        
        await page.reload();
        await page.waitForTimeout(2000);
        
        // Check that content is still readable and accessible
        const mainContent = page.locator('main, [role="main"]');
        expect(await mainContent.isVisible()).toBe(true);
        
        // Check that navigation remains functional
        const navElements = page.locator('nav, [role="navigation"]');
        if (await navElements.count() > 0) {
          expect(await navElements.first().isVisible()).toBe(true);
        }
      }
    });

    test('should handle Portuguese text properly', async ({ page }) => {
      // Test Portuguese language version
      await page.goto('http://localhost:3000');
      
      // Try to switch to Portuguese if language toggle exists
      const languageToggle = page.locator('[aria-label*="language"], [title*="Português"], text=PT');
      
      if (await languageToggle.count() > 0) {
        await languageToggle.first().click();
        await page.waitForTimeout(1000);
        
        // Check that Portuguese text displays correctly without overflow
        const textElements = page.locator('h1, h2, h3, p, button, a').filter({ hasText: /[áàâãéèêíìîóòôõúùûç]/i });
        
        for (let i = 0; i < Math.min(5, await textElements.count()); i++) {
          const element = textElements.nth(i);
          const bbox = await element.boundingBox();
          
          if (bbox) {
            // Text should not overflow its container significantly
            const parent = await element.locator('..').first();
            const parentBbox = await parent.boundingBox();
            
            if (parentBbox) {
              // Allow some tolerance for font rendering differences
              expect(bbox.width).toBeLessThanOrEqual(parentBbox.width + 10);
            }
          }
        }
      }
    });

    test('should maintain proper z-index layering', async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.waitForTimeout(6000);
      
      // Check that UI elements don't overlap inappropriately
      const appBar = page.locator('[role="banner"]:has-text("LusoTown App")');
      const header = page.locator('header');
      const navigation = page.locator('nav');
      
      if (await appBar.isVisible() && await header.isVisible()) {
        const appBarBbox = await appBar.boundingBox();
        const headerBbox = await header.boundingBox();
        
        // App bar should not cover the header
        if (appBarBbox && headerBbox) {
          expect(appBarBbox.y).toBeGreaterThan(headerBbox.y + headerBbox.height - 10);
        }
      }
      
      // Check z-index values are reasonable (not blocking everything)
      const elementsWithZIndex = page.locator('[style*="z-index"], [class*="z-"]');
      
      for (let i = 0; i < await elementsWithZIndex.count(); i++) {
        const element = elementsWithZIndex.nth(i);
        const computedStyle = await element.evaluate((el) => window.getComputedStyle(el));
        const zIndex = parseInt(computedStyle.zIndex) || 0;
        
        // Z-index should be reasonable (not absurdly high)
        expect(zIndex).toBeLessThan(10000);
      }
    });

    test('should be keyboard accessible', async ({ page }) => {
      await page.goto('http://localhost:3000');
      
      // Test keyboard navigation
      let focusableElementsFound = 0;
      const maxTabs = 20;
      
      for (let i = 0; i < maxTabs; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
        
        const activeElement = page.locator(':focus');
        if (await activeElement.count() > 0) {
          focusableElementsFound++;
          
          // Focused element should be visible
          expect(await activeElement.isVisible()).toBe(true);
          
          // Focused element should have proper focus indicators
          const classNames = await activeElement.getAttribute('class');
          const styles = await activeElement.evaluate(el => window.getComputedStyle(el));
          
          // Should have some form of focus indication
          const hasFocusIndicator = 
            (classNames && classNames.includes('focus')) ||
            styles.outline !== 'none' ||
            styles.border !== 'none' ||
            styles.boxShadow !== 'none';
          
          expect(hasFocusIndicator).toBe(true);
        }
      }
      
      // Should have found at least some focusable elements
      expect(focusableElementsFound).toBeGreaterThan(3);
    });
  });
}

// Cross-device compatibility tests
test.describe('Cross-Device Mobile UX', () => {
  test('should work consistently across different mobile devices', async ({ browser }) => {
    const contexts = await Promise.all(
      mobileDevices.slice(0, 2).map(device => 
        browser.newContext({ ...device })
      )
    );
    
    const pages = await Promise.all(
      contexts.map(context => context.newPage())
    );
    
    // Load the page on all devices simultaneously
    await Promise.all(
      pages.map(page => page.goto('http://localhost:3000'))
    );
    
    await Promise.all(
      pages.map(page => page.waitForTimeout(3000))
    );
    
    // Check that core functionality works on all devices
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const deviceName = mobileDevices[i].name;
      
      // Should have main content
      const mainContent = page.locator('main, h1').first();
      expect(await mainContent.isVisible(), `Main content not visible on ${deviceName}`).toBe(true);
      
      // Should have navigation
      const nav = page.locator('nav, header').first();
      expect(await nav.isVisible(), `Navigation not visible on ${deviceName}`).toBe(true);
      
      // Should not have horizontal scrolling
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      
      expect(scrollWidth, `Horizontal scroll detected on ${deviceName}`).toBeLessThanOrEqual(clientWidth + 5);
    }
    
    // Close all contexts
    await Promise.all(contexts.map(context => context.close()));
  });
});