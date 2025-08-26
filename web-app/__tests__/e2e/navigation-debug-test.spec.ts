import { test, expect } from '@playwright/test';

test.describe('LusoTown Navigation Critical Issues', () => {
  
  test.beforeEach(async ({ page }) => {
    // Go to the homepage
    await page.goto('http://localhost:3000');
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
  });

  test('Desktop - Community Dropdown Z-Index Issue', async ({ page }) => {
    // Test on desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Find Community dropdown button
    const communityButton = page.locator('button:has-text("Community")');
    await expect(communityButton).toBeVisible();
    
    // Hover over Community to trigger dropdown
    await communityButton.hover();
    
    // Wait for dropdown to appear
    await page.waitForTimeout(500);
    
    // Check if dropdown is visible
    const dropdown = page.locator('div:has-text("Community Actions")');
    const isDropdownVisible = await dropdown.isVisible();
    
    console.log('Community Dropdown visible:', isDropdownVisible);
    
    // Check z-index of dropdown
    const dropdownZIndex = await dropdown.evaluate((el) => {
      return window.getComputedStyle(el.closest('div') || el).zIndex;
    });
    console.log('Community Dropdown z-index:', dropdownZIndex);
    
    // Check if dropdown items are clickable
    if (isDropdownVisible) {
      const firstLink = dropdown.locator('a').first();
      await expect(firstLink).toBeVisible();
      
      // Check if we can interact with the link
      const isClickable = await firstLink.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        const elementFromPoint = document.elementFromPoint(rect.left + rect.width/2, rect.top + rect.height/2);
        return elementFromPoint === el || el.contains(elementFromPoint);
      });
      console.log('Community dropdown link clickable:', isClickable);
    }
    
    expect(isDropdownVisible).toBe(true);
  });

  test('Desktop - For Business Dropdown Z-Index Issue', async ({ page }) => {
    // Test on desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Find For Business dropdown button
    const businessButton = page.locator('button:has-text("For Business")');
    await expect(businessButton).toBeVisible();
    
    // Hover over For Business to trigger dropdown
    await businessButton.hover();
    
    // Wait for dropdown to appear
    await page.waitForTimeout(500);
    
    // Check if dropdown is visible
    const dropdown = page.locator('div:has-text("Business Solutions")');
    const isDropdownVisible = await dropdown.isVisible();
    
    console.log('For Business Dropdown visible:', isDropdownVisible);
    
    // Check z-index of dropdown
    const dropdownZIndex = await dropdown.evaluate((el) => {
      return window.getComputedStyle(el.closest('div') || el).zIndex;
    });
    console.log('For Business Dropdown z-index:', dropdownZIndex);
    
    // Check if dropdown items are clickable
    if (isDropdownVisible) {
      const firstLink = dropdown.locator('a').first();
      await expect(firstLink).toBeVisible();
      
      // Check if we can interact with the link
      const isClickable = await firstLink.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        const elementFromPoint = document.elementFromPoint(rect.left + rect.width/2, rect.top + rect.height/2);
        return elementFromPoint === el || el.contains(elementFromPoint);
      });
      console.log('For Business dropdown link clickable:', isClickable);
    }
    
    expect(isDropdownVisible).toBe(true);
  });

  test('Mobile - Hamburger Menu Functionality', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    
    // Wait for mobile layout
    await page.waitForTimeout(1000);
    
    // Find hamburger menu button
    const hamburgerButton = page.locator('[data-testid="mobile-nav-button"], button[aria-label*="menu"], button:has(svg)').first();
    
    // Check if hamburger button is visible
    const isHamburgerVisible = await hamburgerButton.isVisible();
    console.log('Hamburger button visible:', isHamburgerVisible);
    
    if (isHamburgerVisible) {
      // Click hamburger menu
      await hamburgerButton.click();
      
      // Wait for menu to appear
      await page.waitForTimeout(500);
      
      // Check if mobile menu is visible
      const mobileMenu = page.locator('div:has-text("Quick Actions"), div:has-text("Community Actions")');
      const isMobileMenuVisible = await mobileMenu.isVisible();
      console.log('Mobile menu visible after click:', isMobileMenuVisible);
      
      // Check z-index of mobile menu
      if (isMobileMenuVisible) {
        const menuZIndex = await mobileMenu.evaluate((el) => {
          return window.getComputedStyle(el).zIndex;
        });
        console.log('Mobile menu z-index:', menuZIndex);
        
        // Check if backdrop is present
        const backdrop = page.locator('div[class*="backdrop"], div[class*="bg-black"]');
        const backdropVisible = await backdrop.isVisible();
        console.log('Mobile menu backdrop visible:', backdropVisible);
        
        // Try clicking a menu item
        const firstMenuItem = mobileMenu.locator('a').first();
        if (await firstMenuItem.isVisible()) {
          const menuItemClickable = await firstMenuItem.evaluate((el) => {
            const rect = el.getBoundingClientRect();
            const elementFromPoint = document.elementFromPoint(rect.left + rect.width/2, rect.top + rect.height/2);
            return elementFromPoint === el || el.contains(elementFromPoint);
          });
          console.log('Mobile menu item clickable:', menuItemClickable);
        }
        
        expect(isMobileMenuVisible).toBe(true);
      } else {
        console.error('Mobile menu failed to open');
        throw new Error('Mobile menu did not appear after clicking hamburger button');
      }
    } else {
      console.error('Hamburger button not found or not visible');
      throw new Error('Hamburger menu button not found');
    }
  });

  test('Z-Index Layer Investigation', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Investigate all elements with z-index
    const zIndexElements = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const zIndexElements = [];
      
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const zIndex = style.zIndex;
        if (zIndex !== 'auto' && zIndex !== '0') {
          zIndexElements.push({
            element: el.tagName + (el.className ? '.' + el.className.split(' ').join('.') : ''),
            zIndex: zIndex,
            position: style.position
          });
        }
      });
      
      return zIndexElements.sort((a, b) => parseInt(b.zIndex) - parseInt(a.zIndex));
    });
    
    console.log('All elements with z-index (sorted by z-index):', zIndexElements);
    
    // Check header z-index specifically
    const headerZIndex = await page.locator('header').evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        zIndex: style.zIndex,
        position: style.position
      };
    });
    console.log('Header z-index and position:', headerZIndex);
    
    // Hover Community dropdown and check element layering
    const communityButton = page.locator('button:has-text("Community")');
    await communityButton.hover();
    await page.waitForTimeout(500);
    
    // Check what elements might be overlapping
    const overlappingCheck = await page.evaluate(() => {
      const dropdown = document.querySelector('div:has-text("Community Actions")');
      if (dropdown) {
        const rect = dropdown.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const elementAtPoint = document.elementFromPoint(centerX, centerY);
        const allElementsAtPoint = document.elementsFromPoint(centerX, centerY);
        
        return {
          dropdownRect: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
          },
          elementAtCenter: elementAtPoint?.tagName + (elementAtPoint?.className ? '.' + elementAtPoint.className.split(' ').join('.') : ''),
          allElementsAtPoint: allElementsAtPoint.map(el => el.tagName + (el.className ? '.' + el.className.split(' ').join('.') : '')).slice(0, 5)
        };
      }
      return null;
    });
    
    console.log('Element layering analysis:', overlappingCheck);
  });

  test('Mobile Menu State Investigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(1000);
    
    // Find all potential hamburger buttons
    const potentialButtons = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.map((btn, index) => ({
        index,
        innerHTML: btn.innerHTML.slice(0, 100),
        className: btn.className,
        visible: btn.offsetWidth > 0 && btn.offsetHeight > 0,
        dataTestId: btn.getAttribute('data-testid'),
        ariaLabel: btn.getAttribute('aria-label')
      }));
    });
    
    console.log('All buttons found on mobile:', potentialButtons);
    
    // Try to find the mobile menu toggle
    const mobileNavButtons = page.locator('button').filter({ hasText: /menu|☰|≡/ }).or(
      page.locator('button[aria-label*="menu"]')
    ).or(
      page.locator('[data-testid*="mobile"]')
    );
    
    const mobileNavButtonCount = await mobileNavButtons.count();
    console.log('Mobile nav buttons found:', mobileNavButtonCount);
    
    for (let i = 0; i < mobileNavButtonCount; i++) {
      const button = mobileNavButtons.nth(i);
      const buttonText = await button.textContent();
      const buttonClass = await button.getAttribute('class');
      console.log(`Mobile nav button ${i}:`, { text: buttonText, class: buttonClass });
    }
  });

});
