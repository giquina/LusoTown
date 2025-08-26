import { test, expect } from '@playwright/test';

test.describe('LusoTown Navigation Critical Issues - Focused Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // Wait for client-side hydration and components to load
    await page.waitForTimeout(3000);
    await page.waitForLoadState('domcontentloaded');
  });

  test('Basic Page Load and Header Presence', async ({ page }) => {
    // Check if page loaded
    const title = await page.title();
    console.log('Page title:', title);
    
    // Check if header exists at all
    const header = page.locator('header');
    const headerExists = await header.count();
    console.log('Headers found:', headerExists);
    
    if (headerExists > 0) {
      const headerVisible = await header.isVisible();
      console.log('Header visible:', headerVisible);
      
      // Check header styles
      const headerStyles = await header.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          zIndex: style.zIndex,
          position: style.position,
          display: style.display,
          visibility: style.visibility
        };
      });
      console.log('Header styles:', headerStyles);
    }
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'header-debug.png', fullPage: true });
  });

  test('Navigation Elements Discovery', async ({ page }) => {
    // Wait for components to load
    await page.waitForTimeout(3000);
    
    // Find all buttons
    const allButtons = await page.locator('button').count();
    console.log('Total buttons found:', allButtons);
    
    // Find navigation-related elements
    const navElements = await page.evaluate(() => {
      const elements = [];
      
      // Look for any text containing navigation terms
      const textContent = document.body.innerText.toLowerCase();
      const hasNavigation = {
        community: textContent.includes('community'),
        business: textContent.includes('business'),
        menu: textContent.includes('menu'),
        navigation: textContent.includes('navigation')
      };
      
      // Find all buttons and their text
      const buttons = Array.from(document.querySelectorAll('button'));
      const buttonInfo = buttons.map(btn => ({
        text: btn.textContent?.trim() || '',
        className: btn.className,
        visible: btn.offsetWidth > 0 && btn.offsetHeight > 0,
        id: btn.id
      }));
      
      // Find elements with menu-like classes
      const menuElements = Array.from(document.querySelectorAll('*')).filter(el => {
        const classList = el.className.toLowerCase();
        return classList.includes('menu') || classList.includes('nav') || classList.includes('dropdown');
      });
      
      return {
        hasNavigation,
        buttonInfo: buttonInfo.slice(0, 10), // First 10 buttons only
        menuElementsCount: menuElements.length,
        bodyClasses: document.body.className,
        htmlClasses: document.documentElement.className
      };
    });
    
    console.log('Navigation discovery results:', navElements);
    
    expect(allButtons).toBeGreaterThan(0);
  });

  test('Mobile Menu Button Search - Comprehensive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(2000);
    
    // Search for mobile menu button using various strategies
    const mobileButtonSearch = await page.evaluate(() => {
      const strategies = [];
      
      // Strategy 1: Look for hamburger icons (≡, ☰, or three lines)
      const hamburgerElements = Array.from(document.querySelectorAll('*')).filter(el => {
        const text = el.textContent;
        return text && (text.includes('☰') || text.includes('≡') || text.includes('menu'));
      });
      
      // Strategy 2: Look for elements with menu-related classes
      const menuClasses = Array.from(document.querySelectorAll('*')).filter(el => {
        const className = el.className.toLowerCase();
        return className.includes('menu') || className.includes('mobile') || className.includes('nav') || className.includes('burger') || className.includes('hamburger');
      });
      
      // Strategy 3: Look for SVG elements that might be hamburger icons
      const svgElements = Array.from(document.querySelectorAll('svg')).filter(svg => {
        const parent = svg.closest('button');
        return parent && parent.offsetWidth > 0 && parent.offsetHeight > 0;
      });
      
      // Strategy 4: Look for buttons in the header area
      const headerButtons = Array.from(document.querySelectorAll('header button, nav button'));
      
      // Strategy 5: Look for elements with data attributes
      const dataAttributes = Array.from(document.querySelectorAll('*[data-testid*="menu"], *[data-testid*="mobile"], *[data-testid*="nav"]'));
      
      return {
        hamburgerElements: hamburgerElements.length,
        menuClasses: menuClasses.length,
        svgElements: svgElements.length,
        headerButtons: headerButtons.map(btn => ({
          text: btn.textContent?.trim() || '',
          className: btn.className,
          visible: btn.offsetWidth > 0 && btn.offsetHeight > 0,
          hasIcon: btn.querySelector('svg') !== null
        })),
        dataAttributes: dataAttributes.length,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight
      };
    });
    
    console.log('Mobile menu button search results:', mobileButtonSearch);
    
    // Try to find visible buttons that might be the mobile menu
    const visibleButtons = page.locator('button:visible');
    const visibleButtonCount = await visibleButtons.count();
    console.log('Visible buttons on mobile:', visibleButtonCount);
    
    for (let i = 0; i < Math.min(visibleButtonCount, 5); i++) {
      const button = visibleButtons.nth(i);
      const buttonInfo = await button.evaluate((btn) => ({
        text: btn.textContent?.trim() || '',
        className: btn.className,
        innerHTML: btn.innerHTML.slice(0, 100),
        boundingRect: btn.getBoundingClientRect()
      }));
      console.log(`Visible button ${i}:`, buttonInfo);
    }
  });

  test('Desktop Dropdown Investigation', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(2000);
    
    // Look for elements that might be dropdowns
    const dropdownSearch = await page.evaluate(() => {
      // Find all elements that might be dropdown triggers
      const potentialTriggers = Array.from(document.querySelectorAll('*')).filter(el => {
        const text = el.textContent?.toLowerCase() || '';
        const className = el.className.toLowerCase();
        return (text.includes('community') || text.includes('business') || text.includes('for business')) && 
               (el.tagName === 'BUTTON' || el.tagName === 'A') &&
               el.offsetWidth > 0 && el.offsetHeight > 0;
      });
      
      // Look for any dropdown content that might be hidden
      const dropdownContent = Array.from(document.querySelectorAll('*')).filter(el => {
        const className = el.className.toLowerCase();
        const text = el.textContent?.toLowerCase() || '';
        return className.includes('dropdown') || 
               text.includes('community actions') || 
               text.includes('business solutions') ||
               className.includes('menu');
      });
      
      return {
        potentialTriggers: potentialTriggers.map(el => ({
          tagName: el.tagName,
          text: el.textContent?.trim() || '',
          className: el.className,
          visible: el.offsetWidth > 0 && el.offsetHeight > 0
        })),
        dropdownContent: dropdownContent.map(el => ({
          tagName: el.tagName,
          className: el.className,
          visible: el.offsetWidth > 0 && el.offsetHeight > 0,
          display: window.getComputedStyle(el).display,
          opacity: window.getComputedStyle(el).opacity,
          zIndex: window.getComputedStyle(el).zIndex
        }))
      };
    });
    
    console.log('Dropdown search results:', dropdownSearch);
    
    // Try to find and hover over Community button
    const communityElements = page.locator('*:has-text("Community"):visible');
    const communityCount = await communityElements.count();
    console.log('Community elements found:', communityCount);
    
    if (communityCount > 0) {
      const firstCommunity = communityElements.first();
      const communityInfo = await firstCommunity.evaluate((el) => ({
        tagName: el.tagName,
        text: el.textContent?.trim(),
        className: el.className,
        boundingRect: el.getBoundingClientRect()
      }));
      console.log('First Community element:', communityInfo);
      
      // Try to hover and see what happens
      await firstCommunity.hover();
      await page.waitForTimeout(1000);
      
      // Check for any new elements after hover
      const afterHover = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('*')).filter(el => {
          const style = window.getComputedStyle(el);
          return style.zIndex !== 'auto' && parseInt(style.zIndex) > 50;
        }).map(el => ({
          className: el.className,
          zIndex: window.getComputedStyle(el).zIndex,
          visible: el.offsetWidth > 0 && el.offsetHeight > 0,
          opacity: window.getComputedStyle(el).opacity
        }));
      });
      
      console.log('High z-index elements after hover:', afterHover);
    }
  });

});
