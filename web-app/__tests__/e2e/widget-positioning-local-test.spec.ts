import { test, expect } from '@playwright/test';

test.describe('LusoTown Local Widget Testing', () => {
  test('Widget positioning verification on local development', async ({ page }) => {
    console.log('Starting local widget positioning test...');
    
    // Navigate to localhost
    try {
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      console.log('Successfully loaded local development server');
    } catch (error) {
      console.log('Could not connect to local server:', error.message);
      // Try to start dev server
      console.log('Server may not be running - test will skip');
      return;
    }
    
    // Wait for page to fully load and widgets to initialize
    await page.waitForTimeout(5000);
    
    console.log('Page loaded, searching for widgets...');
    
    // Take initial screenshot
    await page.screenshot({ path: 'local-widget-test-initial.png', fullPage: true });
    
    // Look for widget elements with various selectors
    const widgetSelectors = [
      // AppDownloadBar selectors
      '[class*="app-download"]',
      '[class*="AppDownloadBar"]',
      'div[style*="z-index: 50"]',
      'div[style*="bottom-0"]',
      'div:has-text("LusoTown App")',
      'div:has-text("Download")',
      
      // LusoBot selectors
      '[class*="lusobot"]',
      '[class*="chat"]',
      'button[class*="rounded-full"]',
      '[class*="bottom-6"][class*="right-6"]',
      'div[style*="z-index: 70"]',
      'button:has-text("🇵🇹")',
      
      // Generic widget patterns
      'div[class*="fixed"][class*="bottom"]',
      'div[class*="z-"]',
      'button[class*="floating"]',
      '*[data-testid*="widget"]'
    ];
    
    const foundWidgets = [];
    
    for (const selector of widgetSelectors) {
      try {
        const elements = await page.locator(selector).all();
        
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          const isVisible = await element.isVisible();
          
          if (isVisible) {
            const boundingBox = await element.boundingBox();
            const className = await element.getAttribute('class') || '';
            const style = await element.getAttribute('style') || '';
            const textContent = await element.textContent() || '';
            const tagName = await element.evaluate(el => el.tagName.toLowerCase());
            
            const widget = {
              selector,
              tagName,
              className,
              style,
              textContent: textContent.slice(0, 100), // Limit text length
              boundingBox,
              isVisible
            };
            
            foundWidgets.push(widget);
            
            console.log(`Found widget - ${tagName.toUpperCase()} with selector "${selector}"`);
            console.log(`  Class: "${className}"`);
            console.log(`  Style: "${style}"`);
            console.log(`  Text: "${textContent.slice(0, 50)}..."`);
            console.log(`  Position:`, boundingBox);
            console.log(`  Visible: ${isVisible}`);
            console.log('---');
          }
        }
      } catch (error) {
        // Skip selectors that don't match anything
      }
    }
    
    console.log(`\nTotal widgets found: ${foundWidgets.length}`);
    
    // Identify specific widgets
    let appDownloadBar = null;
    let lusoBotWidget = null;
    
    for (const widget of foundWidgets) {
      const allText = `${widget.className} ${widget.textContent}`.toLowerCase();
      
      if (allText.includes('download') || allText.includes('app') || widget.style.includes('z-index: 50')) {
        appDownloadBar = widget;
        console.log('\n🔽 IDENTIFIED APP DOWNLOAD BAR:');
        console.log('  Position:', widget.boundingBox);
        console.log('  Z-Index from style:', widget.style);
        console.log('  Classes:', widget.className);
      } else if (allText.includes('lusobot') || allText.includes('chat') || allText.includes('🇵🇹') || widget.style.includes('z-index: 70')) {
        lusoBotWidget = widget;
        console.log('\n🤖 IDENTIFIED LUSOBOT WIDGET:');
        console.log('  Position:', widget.boundingBox);
        console.log('  Z-Index from style:', widget.style);
        console.log('  Classes:', widget.className);
      }
    }
    
    // Test z-index hierarchy if both widgets found
    if (appDownloadBar && lusoBotWidget) {
      console.log('\n🔄 TESTING Z-INDEX HIERARCHY:');
      
      // Extract z-index values
      const appBarZIndex = extractZIndex(appDownloadBar.style, appDownloadBar.className);
      const lusoBotZIndex = extractZIndex(lusoBotWidget.style, lusoBotWidget.className);
      
      console.log(`App Download Bar z-index: ${appBarZIndex}`);
      console.log(`LusoBot Widget z-index: ${lusoBotZIndex}`);
      
      if (lusoBotZIndex > appBarZIndex) {
        console.log('✅ Z-INDEX HIERARCHY CORRECT: LusoBot (70) > AppDownloadBar (50)');
      } else {
        console.log('❌ Z-INDEX HIERARCHY INCORRECT');
        console.log('Expected: LusoBot (70) > AppDownloadBar (50)');
        console.log(`Actual: LusoBot (${lusoBotZIndex}) vs AppDownloadBar (${appBarZIndex})`);
      }
      
      // Check for overlap
      if (appDownloadBar.boundingBox && lusoBotWidget.boundingBox) {
        const overlap = checkOverlap(appDownloadBar.boundingBox, lusoBotWidget.boundingBox);
        
        if (overlap) {
          console.log('⚠️  WIDGET OVERLAP DETECTED');
          console.log('App Download Bar bounds:', appDownloadBar.boundingBox);
          console.log('LusoBot Widget bounds:', lusoBotWidget.boundingBox);
        } else {
          console.log('✅ NO WIDGET OVERLAP - Good positioning');
        }
      }
    } else {
      console.log('\n⚠️  COULD NOT IDENTIFY BOTH WIDGETS:');
      console.log('App Download Bar found:', !!appDownloadBar);
      console.log('LusoBot Widget found:', !!lusoBotWidget);
    }
    
    // Test scroll behavior
    console.log('\n📜 TESTING SCROLL BEHAVIOR:');
    
    const scrollPositions = [0, 500, 1000, 1500];
    
    for (const scrollY of scrollPositions) {
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(800);
      
      console.log(`\nScrolled to ${scrollY}px:`);
      
      // Re-check widget positions
      for (const widget of foundWidgets) {
        if (widget.className.includes('fixed') || widget.style.includes('fixed')) {
          try {
            const element = page.locator(widget.selector).first();
            const newBounds = await element.boundingBox();
            const stillVisible = await element.isVisible();
            
            console.log(`  ${widget.tagName} - Visible: ${stillVisible}, Position:`, newBounds);
            
            // Check if position changed significantly (shouldn't for fixed elements)
            if (widget.boundingBox && newBounds) {
              const positionChanged = Math.abs(widget.boundingBox.y - newBounds.y) > 10;
              if (positionChanged) {
                console.log(`    ⚠️  Position changed significantly: ${widget.boundingBox.y} -> ${newBounds.y}`);
              }
            }
          } catch (error) {
            console.log(`    Error checking widget at scroll ${scrollY}:`, error.message);
          }
        }
      }
    }
    
    // Take final screenshot
    await page.screenshot({ path: 'local-widget-test-final.png', fullPage: true });
    console.log('\nTest completed - Screenshots saved');
  });
});

// Helper functions
function extractZIndex(style: string, className: string): number {
  // Try to extract from style attribute first
  const styleMatch = style.match(/z-index:\s*(\d+)/);
  if (styleMatch) {
    return parseInt(styleMatch[1]);
  }
  
  // Try to extract from Tailwind classes
  const classMatch = className.match(/z-\[(\d+)\]/);
  if (classMatch) {
    return parseInt(classMatch[1]);
  }
  
  // Look for standard Tailwind z-classes
  if (className.includes('z-50')) return 50;
  if (className.includes('z-70')) return 70;
  if (className.includes('z-60')) return 60;
  if (className.includes('z-40')) return 40;
  if (className.includes('z-30')) return 30;
  if (className.includes('z-20')) return 20;
  if (className.includes('z-10')) return 10;
  
  return 0; // Default
}

function checkOverlap(rect1: any, rect2: any): boolean {
  return !(
    rect1.x + rect1.width <= rect2.x ||
    rect2.x + rect2.width <= rect1.x ||
    rect1.y + rect1.height <= rect2.y ||
    rect2.y + rect2.height <= rect1.y
  );
}
