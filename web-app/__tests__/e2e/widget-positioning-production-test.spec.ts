import { test, expect } from '@playwright/test';

const PRODUCTION_URL = 'https://lusotown-bzkyz77ez-giquinas-projects.vercel.app';

test.describe('LusoTown Production Widget Positioning Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the LusoTown production site
    await page.goto(PRODUCTION_URL);
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Wait a bit for widgets to initialize
    await page.waitForTimeout(3000);
  });

  test('Desktop - Widget positioning and z-index hierarchy on production', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    
    console.log('Testing on production URL:', PRODUCTION_URL);
    
    // Wait for widgets to load
    await page.waitForTimeout(4000);
    
    // Look for common widget selectors
    const possibleSelectors = [
      // LusoBot selectors
      '[id*="lusobot"]',
      '[class*="lusobot"]',
      '[class*="chatbot"]',
      '[class*="chat-widget"]',
      '[data-testid="lusobot-widget"]',
      'button[class*="chat"]',
      'div[class*="fixed"][class*="bottom"]',
      
      // AppDownloadBar selectors
      '[class*="app-download"]',
      '[class*="AppDownloadBar"]',
      '[data-testid="app-download-bar"]',
      'div[class*="download"]',
      'div[class*="app"][class*="bar"]'
    ];
    
    const widgets = [];
    
    for (const selector of possibleSelectors) {
      const elements = await page.locator(selector).all();
      if (elements.length > 0) {
        for (const element of elements) {
          const isVisible = await element.isVisible();
          if (isVisible) {
            const boundingBox = await element.boundingBox();
            const className = await element.getAttribute('class') || '';
            const id = await element.getAttribute('id') || '';
            const tagName = await element.evaluate(el => el.tagName.toLowerCase());
            
            widgets.push({
              selector,
              className,
              id,
              tagName,
              boundingBox,
              element
            });
            
            console.log(`Found widget - Selector: ${selector}, Class: ${className}, ID: ${id}, Tag: ${tagName}, Position:`, boundingBox);
          }
        }
      }
    }
    
    console.log(`Total visible widgets found: ${widgets.length}`);
    
    // Take a screenshot to see current state
    await page.screenshot({ path: 'widget-positioning-desktop.png', fullPage: true });
    console.log('Desktop screenshot saved as widget-positioning-desktop.png');
    
    // Identify potential LusoBot and AppDownloadBar
    let lusoBotWidget = null;
    let appDownloadBar = null;
    
    for (const widget of widgets) {
      const { className, id, tagName } = widget;
      const classAndId = `${className} ${id}`.toLowerCase();
      
      if (classAndId.includes('lusobot') || classAndId.includes('chatbot') || classAndId.includes('chat')) {
        lusoBotWidget = widget;
        console.log('Identified LusoBot widget:', widget);
      } else if (classAndId.includes('app') && classAndId.includes('download')) {
        appDownloadBar = widget;
        console.log('Identified AppDownloadBar widget:', widget);
      }
    }
    
    // Test scroll behavior with any fixed positioned elements
    console.log('Starting scroll behavior test...');
    
    const scrollPositions = [0, 500, 1000, 1500, 2000, 2500];
    const fixedElements = widgets.filter(w => 
      w.className.includes('fixed') || 
      w.className.includes('sticky') ||
      w.boundingBox?.y > window.innerHeight * 0.7 // Elements in bottom area
    );
    
    console.log(`Testing ${fixedElements.length} potentially fixed elements during scroll`);
    
    for (const scrollY of scrollPositions) {
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(800); // Wait for scroll to complete
      
      console.log(`\n--- Scroll Position: ${scrollY}px ---`);
      
      for (let i = 0; i < fixedElements.length; i++) {
        const widget = fixedElements[i];
        try {
          const stillVisible = await widget.element.isVisible();
          const newBoundingBox = await widget.element.boundingBox();
          
          console.log(`Widget ${i + 1} - Visible: ${stillVisible}, Position:`, newBoundingBox);
          
          // Check if element maintained its fixed position
          if (widget.boundingBox && newBoundingBox) {
            const positionChanged = Math.abs(widget.boundingBox.y - newBoundingBox.y) > 10;
            console.log(`Widget ${i + 1} - Position changed significantly: ${positionChanged}`);
          }
        } catch (error) {
          console.log(`Error testing widget ${i + 1} at scroll ${scrollY}:`, error.message);
        }
      }
    }
    
    // Check for any overlap issues at final scroll position
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(1000);
    
    console.log('\n--- Checking for overlaps at mid-page ---');
    
    // Get all visible fixed elements again
    const allFixedElements = [];
    for (const selector of possibleSelectors) {
      const elements = await page.locator(selector).all();
      for (const element of elements) {
        const isVisible = await element.isVisible();
        if (isVisible) {
          const boundingBox = await element.boundingBox();
          if (boundingBox) {
            allFixedElements.push({ element, boundingBox, selector });
          }
        }
      }
    }
    
    // Check for overlaps between elements
    for (let i = 0; i < allFixedElements.length; i++) {
      for (let j = i + 1; j < allFixedElements.length; j++) {
        const elem1 = allFixedElements[i];
        const elem2 = allFixedElements[j];
        
        const overlap = !(
          elem1.boundingBox.x + elem1.boundingBox.width <= elem2.boundingBox.x ||
          elem2.boundingBox.x + elem2.boundingBox.width <= elem1.boundingBox.x ||
          elem1.boundingBox.y + elem1.boundingBox.height <= elem2.boundingBox.y ||
          elem2.boundingBox.y + elem2.boundingBox.height <= elem1.boundingBox.y
        );
        
        if (overlap) {
          console.log(`OVERLAP DETECTED between widget ${i + 1} and widget ${j + 1}`);
          console.log(`Widget ${i + 1} (${elem1.selector}):`, elem1.boundingBox);
          console.log(`Widget ${j + 1} (${elem2.selector}):`, elem2.boundingBox);
        }
      }
    }
    
    // Take final screenshot
    await page.screenshot({ path: 'widget-positioning-desktop-final.png' });
    console.log('Final desktop screenshot saved');
  });

  test('Mobile - Widget positioning on production', async ({ page }) => {
    // Set mobile viewport (iPhone 12)
    await page.setViewportSize({ width: 390, height: 844 });
    
    console.log('Testing mobile widget positioning on production:', PRODUCTION_URL);
    
    // Wait for widgets to load
    await page.waitForTimeout(4000);
    
    // Take mobile screenshot
    await page.screenshot({ path: 'widget-positioning-mobile.png', fullPage: true });
    console.log('Mobile screenshot saved as widget-positioning-mobile.png');
    
    // Similar widget detection for mobile
    const possibleSelectors = [
      '[id*="lusobot"]',
      '[class*="lusobot"]',
      '[class*="chatbot"]',
      '[class*="chat-widget"]',
      '[class*="app-download"]',
      '[class*="AppDownloadBar"]',
      'div[class*="fixed"][class*="bottom"]',
      'button[class*="chat"]'
    ];
    
    const mobileWidgets = [];
    
    for (const selector of possibleSelectors) {
      const elements = await page.locator(selector).all();
      if (elements.length > 0) {
        for (const element of elements) {
          const isVisible = await element.isVisible();
          if (isVisible) {
            const boundingBox = await element.boundingBox();
            const className = await element.getAttribute('class') || '';
            
            mobileWidgets.push({
              selector,
              className,
              boundingBox,
              element
            });
            
            console.log(`Mobile widget - Selector: ${selector}, Class: ${className}, Position:`, boundingBox);
          }
        }
      }
    }
    
    console.log(`Mobile widgets found: ${mobileWidgets.length}`);
    
    // Test mobile scroll behavior
    console.log('Testing mobile scroll behavior...');
    
    const mobileScrollPositions = [0, 300, 600, 900];
    
    for (const scrollY of mobileScrollPositions) {
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(600);
      
      console.log(`Mobile scroll to: ${scrollY}px`);
      
      // Check widget visibility and positioning
      for (let i = 0; i < mobileWidgets.length; i++) {
        const widget = mobileWidgets[i];
        try {
          const stillVisible = await widget.element.isVisible();
          const newPosition = await widget.element.boundingBox();
          console.log(`Mobile widget ${i + 1} at scroll ${scrollY} - Visible: ${stillVisible}, Position:`, newPosition);
        } catch (error) {
          console.log(`Error with mobile widget ${i + 1}:`, error.message);
        }
      }
    }
    
    await page.screenshot({ path: 'widget-positioning-mobile-final.png' });
    console.log('Final mobile screenshot saved');
  });

  test('Widget z-index and CSS properties verification', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    
    console.log('Testing CSS properties and z-index values...');
    
    await page.waitForTimeout(4000);
    
    // Look for any elements with high z-index values
    const highZIndexElements = await page.evaluate(() => {
      const allElements = document.querySelectorAll('*');
      const results = [];
      
      for (const element of allElements) {
        const computedStyle = window.getComputedStyle(element);
        const zIndex = computedStyle.zIndex;
        const position = computedStyle.position;
        
        if (zIndex !== 'auto' && parseInt(zIndex) >= 10) {
          const rect = element.getBoundingClientRect();
          results.push({
            tagName: element.tagName,
            className: element.className,
            id: element.id,
            zIndex: zIndex,
            position: position,
            visible: rect.width > 0 && rect.height > 0,
            boundingRect: {
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height
            }
          });
        }
      }
      
      return results.sort((a, b) => parseInt(b.zIndex) - parseInt(a.zIndex));
    });
    
    console.log('Elements with high z-index (sorted by z-index desc):');
    highZIndexElements.forEach((element, index) => {
      console.log(`${index + 1}. ${element.tagName} - Class: "${element.className}" - ID: "${element.id}" - Z-Index: ${element.zIndex} - Position: ${element.position} - Visible: ${element.visible}`);
      console.log(`   Bounds:`, element.boundingRect);
    });
    
    // Specifically look for expected z-index values
    const expectedWidgets = [
      { name: 'AppDownloadBar', expectedZIndex: 50 },
      { name: 'LusoBot', expectedZIndex: 70 }
    ];
    
    for (const expectedWidget of expectedWidgets) {
      const matchingElement = highZIndexElements.find(el => 
        el.className.toLowerCase().includes(expectedWidget.name.toLowerCase()) ||
        el.id.toLowerCase().includes(expectedWidget.name.toLowerCase())
      );
      
      if (matchingElement) {
        console.log(`\n${expectedWidget.name} found with z-index: ${matchingElement.zIndex} (expected: ${expectedWidget.expectedZIndex})`);
        
        const actualZIndex = parseInt(matchingElement.zIndex);
        const expectedZIndex = expectedWidget.expectedZIndex;
        
        if (actualZIndex === expectedZIndex) {
          console.log(`✅ ${expectedWidget.name} has correct z-index`);
        } else {
          console.log(`❌ ${expectedWidget.name} has incorrect z-index. Expected: ${expectedZIndex}, Actual: ${actualZIndex}`);
        }
      } else {
        console.log(`\n${expectedWidget.name} not found in high z-index elements`);
      }
    }
    
    console.log(`\nTotal elements with z-index >= 10: ${highZIndexElements.length}`);
  });
});
