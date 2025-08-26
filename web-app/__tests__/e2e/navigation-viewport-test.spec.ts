import { test, expect } from '@playwright/test';

test.describe('LusoTown Navigation Viewport Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(3000);
  });

  test('Test different viewport sizes for header visibility', async ({ page }) => {
    const viewports = [
      { width: 768, height: 800, name: 'md (768px)' },
      { width: 1024, height: 800, name: 'lg (1024px)' },
      { width: 1280, height: 800, name: 'xl (1280px)' },
      { width: 1536, height: 800, name: '2xl (1536px)' }
    ];
    
    for (const viewport of viewports) {
      console.log(`\n=== Testing ${viewport.name} ===`);
      
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(1000);
      
      // Check if header exists
      const headerExists = await page.locator('header').count();
      console.log(`Header elements found: ${headerExists}`);
      
      if (headerExists > 0) {
        const headerVisible = await page.locator('header').isVisible();
        console.log(`Header visible: ${headerVisible}`);
        
        // Check for desktop navigation
        const desktopNav = page.locator('div:has-text("Community"), div:has-text("For Business")');
        const desktopNavCount = await desktopNav.count();
        const desktopNavVisible = desktopNavCount > 0 ? await desktopNav.first().isVisible() : false;
        console.log(`Desktop nav elements: ${desktopNavCount}, visible: ${desktopNavVisible}`);
        
        // Check for mobile hamburger
        const mobileButtons = page.locator('button:has(svg)');
        const mobileButtonCount = await mobileButtons.count();
        console.log(`Mobile button count: ${mobileButtonCount}`);
        
        // Take screenshot for this viewport
        await page.screenshot({ path: `viewport-${viewport.width}px.png`, fullPage: false });
      }
    }
  });

  test('Inspect header CSS classes and styles', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(1000);
    
    const headerInfo = await page.evaluate(() => {
      const header = document.querySelector('header');
      if (!header) return { exists: false };
      
      const style = window.getComputedStyle(header);
      return {
        exists: true,
        className: header.className,
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        zIndex: style.zIndex,
        position: style.position,
        top: style.top,
        left: style.left,
        right: style.right,
        width: style.width,
        height: style.height
      };
    });
    
    console.log('Header CSS info:', headerInfo);
    
    // Check all elements with lg: hidden classes
    const hiddenElements = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      return elements
        .filter(el => el.className && el.className.includes('lg:'))
        .map(el => ({
          tagName: el.tagName,
          className: el.className,
          visible: el.offsetWidth > 0 && el.offsetHeight > 0
        }))
        .slice(0, 10);
    });
    
    console.log('Elements with lg: classes:', hiddenElements);
  });

});
