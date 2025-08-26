const { chromium } = require('playwright');

async function testWidgetPositioning() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 } // iPhone size
  });
  const page = await context.newPage();
  
  try {
    console.log('🧪 Testing LusoTown Widget Positioning Issues');
    console.log('📱 Testing on mobile viewport (375x667)');
    
    // Navigate to the live website
    await page.goto('https://web-99kxh0sku-giquinas-projects.vercel.app', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log('✅ Page loaded successfully');
    
    // Wait for widgets to load
    await page.waitForTimeout(8000); // Wait for AppDownloadBar auto-show (5s + buffer)
    
    // Check initial widget states
    console.log('\n🔍 INITIAL WIDGET STATE:');
    
    // Check for AppDownloadBar
    const appDownloadBar = await page.locator('[role="banner"]').first();
    const isAppBarVisible = await appDownloadBar.isVisible().catch(() => false);
    console.log(`📱 App Download Bar: ${isAppBarVisible ? 'VISIBLE' : 'HIDDEN'}`);
    
    if (isAppBarVisible) {
      const appBarStyles = await appDownloadBar.evaluate(el => {
        const computed = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          zIndex: computed.zIndex,
          position: computed.position,
          bottom: computed.bottom,
          display: computed.display,
          actualBottom: window.innerHeight - rect.bottom,
          height: rect.height
        };
      });
      console.log(`   Z-Index: ${appBarStyles.zIndex}, Position: ${appBarStyles.position}`);
      console.log(`   CSS Bottom: ${appBarStyles.bottom}, Actual Bottom: ${appBarStyles.actualBottom}px`);
      console.log(`   Height: ${appBarStyles.height}px`);
    }
    
    // Check for LusoBot widget button
    const lusoBotButton = await page.locator('button[aria-label*="LusoBot"]').first();
    const isLusoBotVisible = await lusoBotButton.isVisible().catch(() => false);
    console.log(`🤖 LusoBot Button: ${isLusoBotVisible ? 'VISIBLE' : 'HIDDEN'}`);
    
    if (isLusoBotVisible) {
      const lusoBotStyles = await lusoBotButton.evaluate(el => {
        const computed = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          zIndex: computed.zIndex,
          position: computed.position,
          bottom: computed.bottom,
          right: computed.right,
          transform: computed.transform,
          actualBottom: window.innerHeight - rect.bottom,
          actualRight: window.innerWidth - rect.right,
          isVisible: rect.width > 0 && rect.height > 0 && computed.display !== 'none',
          className: el.className
        };
      });
      console.log(`   Z-Index: ${lusoBotStyles.zIndex}, Position: ${lusoBotStyles.position}`);
      console.log(`   CSS Bottom: ${lusoBotStyles.bottom}, Actual Bottom: ${lusoBotStyles.actualBottom}px`);
      console.log(`   CSS Right: ${lusoBotStyles.right}, Actual Right: ${lusoBotStyles.actualRight}px`);
      console.log(`   Classes: ${lusoBotStyles.className}`);
      console.log(`   Is Actually Visible: ${lusoBotStyles.isVisible}`);
    }
    
    // Test scroll behavior
    console.log('\n📜 TESTING SCROLL BEHAVIOR:');
    
    // Scroll to middle of page
    await page.evaluate(() => window.scrollTo(0, window.innerHeight / 2));
    await page.waitForTimeout(1000);
    
    const lusoBotAfterScroll = await lusoBotButton.isVisible().catch(() => false);
    console.log(`🤖 LusoBot after scroll to middle: ${lusoBotAfterScroll ? 'VISIBLE' : 'HIDDEN'}`);
    
    if (lusoBotAfterScroll) {
      const scrollStyles = await lusoBotButton.evaluate(el => {
        const rect = el.getBoundingClientRect();
        const computed = window.getComputedStyle(el);
        return {
          actualBottom: window.innerHeight - rect.bottom,
          zIndex: computed.zIndex,
          opacity: computed.opacity,
          visibility: computed.visibility,
          pointerEvents: computed.pointerEvents
        };
      });
      console.log(`   After scroll - Z-Index: ${scrollStyles.zIndex}, Opacity: ${scrollStyles.opacity}`);
      console.log(`   Visibility: ${scrollStyles.visibility}, Pointer Events: ${scrollStyles.pointerEvents}`);
    }
    
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    const lusoBotAtBottom = await lusoBotButton.isVisible().catch(() => false);
    console.log(`🤖 LusoBot at bottom: ${lusoBotAtBottom ? 'VISIBLE' : 'HIDDEN'}`);
    
    // Check z-index hierarchy at bottom
    if (lusoBotAtBottom || isAppBarVisible) {
      const zIndexAnalysis = await page.evaluate(() => {
        const elements = [];
        
        // Find all fixed positioned elements
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
          const computed = window.getComputedStyle(el);
          if (computed.position === 'fixed' && computed.display !== 'none') {
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
              elements.push({
                tagName: el.tagName,
                className: el.className,
                zIndex: computed.zIndex,
                bottom: computed.bottom,
                right: computed.right,
                actualBottom: window.innerHeight - rect.bottom,
                actualRight: window.innerWidth - rect.right,
                role: el.getAttribute('role'),
                ariaLabel: el.getAttribute('aria-label')
              });
            }
          }
        });
        
        return elements.sort((a, b) => parseInt(b.zIndex) - parseInt(a.zIndex));
      });
      
      console.log('\n🎯 Z-INDEX HIERARCHY (highest to lowest):');
      zIndexAnalysis.forEach((el, index) => {
        console.log(`${index + 1}. ${el.tagName} - Z-Index: ${el.zIndex}`);
        console.log(`   Classes: ${el.className}`);
        console.log(`   Role: ${el.role || 'none'}, Aria-Label: ${el.ariaLabel || 'none'}`);
        console.log(`   Position: ${el.actualBottom}px from bottom, ${el.actualRight}px from right`);
        console.log('');
      });
    }
    
    console.log('✅ Widget positioning test completed');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
}

testWidgetPositioning();
