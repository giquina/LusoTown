import { test, expect } from '@playwright/test';

test.describe('LusoTown Navigation Simple Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(3000);
    await page.waitForLoadState('domcontentloaded');
  });

  test('Desktop - Community Dropdown Functionality', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(1000);
    
    // Look for Community button/link
    const communityElement = page.locator('text="Community"').first();
    const exists = await communityElement.count() > 0;
    
    if (exists) {
      console.log('Community element found');
      
      // Check if it's visible
      const isVisible = await communityElement.isVisible();
      console.log('Community element visible:', isVisible);
      
      if (isVisible) {
        // Try to hover over it
        await communityElement.hover();
        await page.waitForTimeout(1000);
        
        // Look for dropdown content
        const dropdownTexts = ['Community Actions', 'Book Events', 'Join Cultural Tours'];
        let dropdownFound = false;
        
        for (const text of dropdownTexts) {
          const element = page.locator(`text="${text}"`);
          const elementExists = await element.count() > 0;
          if (elementExists) {
            const elementVisible = await element.isVisible();
            console.log(`Dropdown text "${text}" found: ${elementExists}, visible: ${elementVisible}`);
            if (elementVisible) {
              dropdownFound = true;
              
              // Check if it's clickable (not hidden behind other elements)
              const boundingBox = await element.boundingBox();
              if (boundingBox) {
                console.log(`Element "${text}" bounding box:`, boundingBox);
              }
            }
          }
        }
        
        console.log('Dropdown menu working:', dropdownFound);
        
        // Take a screenshot for manual inspection
        await page.screenshot({ path: 'community-dropdown-test.png', fullPage: false });
      }
    } else {
      console.log('Community element not found');
    }
  });

  test('Desktop - For Business Dropdown Functionality', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(1000);
    
    // Look for For Business button/link
    const businessElement = page.locator('text="For Business"').first();
    const exists = await businessElement.count() > 0;
    
    if (exists) {
      console.log('For Business element found');
      
      // Check if it's visible
      const isVisible = await businessElement.isVisible();
      console.log('For Business element visible:', isVisible);
      
      if (isVisible) {
        // Try to hover over it
        await businessElement.hover();
        await page.waitForTimeout(1000);
        
        // Look for dropdown content
        const dropdownTexts = ['Business Solutions', 'Discover Businesses', 'List Your Business'];
        let dropdownFound = false;
        
        for (const text of dropdownTexts) {
          const element = page.locator(`text="${text}"`);
          const elementExists = await element.count() > 0;
          if (elementExists) {
            const elementVisible = await element.isVisible();
            console.log(`Dropdown text "${text}" found: ${elementExists}, visible: ${elementVisible}`);
            if (elementVisible) {
              dropdownFound = true;
              
              // Check if it's clickable
              const boundingBox = await element.boundingBox();
              if (boundingBox) {
                console.log(`Element "${text}" bounding box:`, boundingBox);
              }
            }
          }
        }
        
        console.log('For Business dropdown menu working:', dropdownFound);
        
        // Take a screenshot
        await page.screenshot({ path: 'business-dropdown-test.png', fullPage: false });
      }
    } else {
      console.log('For Business element not found');
    }
  });

  test('Mobile - Hamburger Menu Functionality', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(1000);
    
    // Look for hamburger menu button - try multiple selectors
    const hamburgerSelectors = [
      'button[aria-label*="menu"]',
      'button[aria-label*="Menu"]',
      'button:has-text("Close menu")',
      'button:has-text("Open main menu")',
      'button:has(svg)', // Button with SVG (likely hamburger icon)
    ];
    
    let hamburgerButton = null;
    let selectorUsed = '';
    
    for (const selector of hamburgerSelectors) {
      const element = page.locator(selector);
      const count = await element.count();
      if (count > 0) {
        const visible = await element.first().isVisible();
        console.log(`Selector "${selector}" found ${count} elements, first visible: ${visible}`);
        
        if (visible) {
          hamburgerButton = element.first();
          selectorUsed = selector;
          break;
        }
      }
    }
    
    if (hamburgerButton) {
      console.log(`Using hamburger button with selector: ${selectorUsed}`);
      
      // Take a screenshot before clicking
      await page.screenshot({ path: 'mobile-before-menu.png', fullPage: false });
      
      // Click the hamburger menu
      await hamburgerButton.click();
      await page.waitForTimeout(1000);
      
      // Take a screenshot after clicking
      await page.screenshot({ path: 'mobile-after-menu-click.png', fullPage: false });
      
      // Look for mobile menu content
      const mobileMenuTexts = ['Quick Actions', 'What\'s Happening', 'Community Actions', 'Business Solutions'];
      let menuFound = false;
      
      for (const text of mobileMenuTexts) {
        const element = page.locator(`text="${text}"`);
        const elementExists = await element.count() > 0;
        if (elementExists) {
          const elementVisible = await element.isVisible();
          console.log(`Mobile menu text "${text}" found: ${elementExists}, visible: ${elementVisible}`);
          if (elementVisible) {
            menuFound = true;
          }
        }
      }
      
      console.log('Mobile menu opened successfully:', menuFound);
      
      // Check for menu backdrop/overlay
      const backdrop = page.locator('div[class*="backdrop"], div[class*="bg-black"], div[class*="fixed inset-0"]');
      const backdropExists = await backdrop.count() > 0;
      console.log('Menu backdrop found:', backdropExists);
      
    } else {
      console.log('No hamburger menu button found on mobile');
      
      // Take a screenshot to see what's visible
      await page.screenshot({ path: 'mobile-no-menu-found.png', fullPage: false });
    }
  });

});
