import { test, expect } from '@playwright/test';

const PRODUCTION_URL = 'https://lusotown-bzkyz77ez-giquinas-projects.vercel.app';

test.describe('LusoTown Widget DOM Inspection', () => {
  test('Inspect homepage and widget structure', async ({ page }) => {
    console.log('Navigating to:', PRODUCTION_URL);
    
    // Navigate to the site
    await page.goto(PRODUCTION_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Check if we're on login page
    const title = await page.title();
    console.log('Page title:', title);
    
    const isLoginPage = await page.locator('text="Log in to Vercel"').count() > 0;
    console.log('Is login page:', isLoginPage);
    
    if (isLoginPage) {
      console.log('Detected Vercel login page - trying to find direct access');
      
      // Try to access homepage directly (sometimes auth is not required for GET requests)
      const response = await page.goto(`${PRODUCTION_URL}/`);
      console.log('Homepage response status:', response?.status());
      
      await page.waitForTimeout(3000);
      
      const homeTitle = await page.title();
      console.log('New page title:', homeTitle);
    }
    
    // Check for common LusoTown elements
    const lusotownElements = [
      'LusoTown',
      'Portuguese',
      'Community',
      'Events',
      'Business Directory',
      'Chat',
      'Download',
      'App'
    ];
    
    console.log('Searching for LusoTown-related content...');
    
    for (const searchTerm of lusotownElements) {
      const count = await page.locator(`text*="${searchTerm}"`).count();
      if (count > 0) {
        console.log(`Found "${searchTerm}" - ${count} instances`);
      }
    }
    
    // Get page HTML structure
    const bodyHTML = await page.locator('body').innerHTML();
    
    // Look for potential widget-related classes/IDs
    const widgetClasses = [
      'chat', 'bot', 'lusobot', 'widget', 'fixed', 'bottom', 'download', 'app-bar', 'floating', 'overlay'
    ];
    
    console.log('Analyzing page structure for widget-related elements...');
    
    for (const className of widgetClasses) {
      const hasClass = bodyHTML.toLowerCase().includes(className);
      if (hasClass) {
        console.log(`Found potential widget class: "${className}"`);
        
        // Try to locate elements with this class
        const elements = await page.locator(`[class*="${className}"]`).all();
        console.log(`  - Elements with class containing "${className}": ${elements.length}`);
        
        for (let i = 0; i < Math.min(elements.length, 3); i++) {
          try {
            const element = elements[i];
            const fullClassName = await element.getAttribute('class');
            const isVisible = await element.isVisible();
            const boundingBox = await element.boundingBox();
            console.log(`    Element ${i + 1}: class="${fullClassName}", visible=${isVisible}, bounds=`, boundingBox);
          } catch (e) {
            console.log(`    Element ${i + 1}: Error getting details -`, e.message);
          }
        }
      }
    }
    
    // Take screenshot for manual inspection
    await page.screenshot({ path: 'lusotown-page-inspection.png', fullPage: true });
    console.log('Page screenshot saved as lusotown-page-inspection.png');
    
    // Try to find any JavaScript-rendered content by waiting longer
    console.log('Waiting for potential JavaScript widgets to load...');
    await page.waitForTimeout(5000);
    
    // Re-check for widgets after additional wait
    const allDivs = await page.locator('div').all();
    console.log(`Total divs on page: ${allDivs.length}`);
    
    let widgetLikeDivs = 0;
    for (const div of allDivs.slice(0, 50)) { // Check first 50 divs
      try {
        const className = await div.getAttribute('class') || '';
        const style = await div.getAttribute('style') || '';
        const isVisible = await div.isVisible();
        
        // Look for fixed/absolute positioning or z-index in style
        if (isVisible && (
          className.includes('fixed') || 
          className.includes('bottom') || 
          className.includes('chat') ||
          className.includes('download') ||
          style.includes('position: fixed') ||
          style.includes('position: absolute') ||
          style.includes('z-index')
        )) {
          widgetLikeDivs++;
          const boundingBox = await div.boundingBox();
          console.log(`Widget-like div found - class: "${className}", style: "${style}", bounds:`, boundingBox);
        }
      } catch (e) {
        // Skip errors
      }
    }
    
    console.log(`Total widget-like divs found: ${widgetLikeDivs}`);
    
    // Check for any iframes (widgets might be in iframes)
    const iframes = await page.locator('iframe').all();
    console.log(`Iframes found: ${iframes.length}`);
    
    for (let i = 0; i < iframes.length; i++) {
      try {
        const iframe = iframes[i];
        const src = await iframe.getAttribute('src');
        const isVisible = await iframe.isVisible();
        console.log(`Iframe ${i + 1}: src="${src}", visible=${isVisible}`);
      } catch (e) {
        console.log(`Iframe ${i + 1}: Error getting details`);
      }
    }
  });

  test('Direct homepage test with demo credentials', async ({ page }) => {
    console.log('Testing with potential demo access...');
    
    // First try to go directly to homepage
    await page.goto(`${PRODUCTION_URL}/`);
    await page.waitForTimeout(3000);
    
    const hasLoginForm = await page.locator('input[type="email"]').count() > 0;
    
    if (hasLoginForm) {
      console.log('Login form detected, trying demo credentials...');
      
      // Try demo credentials from CLAUDE.md
      try {
        await page.fill('input[type="email"]', 'demo@lusotown.com');
        await page.waitForTimeout(500);
        
        // Look for password field
        const passwordField = page.locator('input[type="password"]');
        if (await passwordField.count() > 0) {
          await page.fill('input[type="password"]', 'LusoTown2025!');
          await page.waitForTimeout(500);
          
          // Try to submit
          await page.click('button[type="submit"], button:has-text("Continue"), button:has-text("Login"), button:has-text("Sign")');
          await page.waitForTimeout(5000);
          
          console.log('Attempted login with demo credentials');
          
          const newTitle = await page.title();
          console.log('Page title after login attempt:', newTitle);
          
          // Take screenshot after login attempt
          await page.screenshot({ path: 'lusotown-after-login.png', fullPage: true });
          console.log('Post-login screenshot saved');
        }
      } catch (e) {
        console.log('Login attempt failed:', e.message);
      }
    }
    
    // Now check for widgets
    await page.waitForTimeout(3000);
    
    // Look for any bottom-positioned elements that might be widgets
    const bottomElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const results = [];
      
      for (const el of elements) {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        
        if (style.position === 'fixed' || style.position === 'absolute') {
          if (rect.bottom > window.innerHeight * 0.7) { // In bottom 30% of screen
            results.push({
              tagName: el.tagName,
              className: el.className,
              id: el.id,
              position: style.position,
              bottom: style.bottom,
              right: style.right,
              zIndex: style.zIndex,
              visible: rect.width > 0 && rect.height > 0,
              rect: {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height
              }
            });
          }
        }
      }
      
      return results;
    });
    
    console.log('Bottom-positioned elements found:');
    bottomElements.forEach((el, i) => {
      console.log(`${i + 1}. ${el.tagName} - class="${el.className}" - id="${el.id}"`);
      console.log(`   Position: ${el.position}, Bottom: ${el.bottom}, Right: ${el.right}, Z-Index: ${el.zIndex}`);
      console.log(`   Visible: ${el.visible}, Rect:`, el.rect);
    });
    
    await page.screenshot({ path: 'lusotown-final-check.png', fullPage: true });
  });
});
