/**
 * Manual Mobile Website Testing Script
 * 
 * This script will attempt to access the live website and perform basic mobile testing
 * without relying on Playwright's complex configuration
 */

const { chromium } = require('playwright');

const LIVE_URL = 'https://web-8jh71jiyo-giquinas-projects.vercel.app';
const MOBILE_VIEWPORTS = {
  iphoneSE: { width: 375, height: 667 },
  iphone12: { width: 390, height: 844 },
  iphone14Plus: { width: 414, height: 736 }
};

async function testMobileWebsite() {
  console.log('🚀 Starting LusoTown Mobile Website Testing');
  console.log('===========================================');
  
  const browser = await chromium.launch({ 
    headless: true, // Changed to headless for codespace environment
    // slowMo: 500 // Removed slowMo for headless
  });
  
  const context = await browser.newContext({
    viewport: MOBILE_VIEWPORTS.iphoneSE,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1'
  });
  
  const page = await context.newPage();
  
  console.log(`📱 Testing with iPhone SE viewport (${MOBILE_VIEWPORTS.iphoneSE.width}x${MOBILE_VIEWPORTS.iphoneSE.height})`);
  
  try {
    // Test 1: Basic Page Loading
    console.log('\n🔍 TEST 1: Basic Page Loading');
    console.log('-----------------------------');
    
    const startTime = Date.now();
    console.log(`Navigating to: ${LIVE_URL}`);
    
    await page.goto(LIVE_URL, { 
      timeout: 45000,
      waitUntil: 'domcontentloaded' 
    });
    
    const loadTime = Date.now() - startTime;
    console.log(`✅ Page loaded in ${loadTime}ms`);
    
    // Get page title
    const title = await page.title();
    console.log(`📄 Page title: "${title}"`);
    
    // Take initial screenshot
    await page.screenshot({ 
      path: '/workspaces/LusoTown/web-app/mobile-manual-test-initial.png',
      fullPage: true 
    });
    console.log('📸 Initial screenshot saved');
    
    // Test 2: Mobile Navigation Detection
    console.log('\n🔍 TEST 2: Mobile Navigation Detection');
    console.log('-------------------------------------');
    
    // Look for hamburger menu with multiple strategies
    const hamburgerSelectors = [
      '[data-testid="mobile-menu-button"]',
      'button[aria-label*="menu"]',
      'button[aria-label*="Menu"]',
      'button:has(svg)',
      '.xl\\:hidden button',
      'button[class*="mobile"]',
      '[role="button"][aria-label*="menu"]'
    ];
    
    let menuButton = null;
    let menuSelector = '';
    
    for (const selector of hamburgerSelectors) {
      try {
        const element = await page.locator(selector).first();
        if (await element.count() > 0 && await element.isVisible()) {
          menuButton = element;
          menuSelector = selector;
          console.log(`✅ Found menu button with selector: ${selector}`);
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }
    
    if (!menuButton) {
      console.log('❌ CRITICAL ISSUE: Mobile menu button not found');
      
      // Debug: List all buttons on the page
      const allButtons = await page.locator('button').all();
      console.log(`🔍 Found ${allButtons.length} buttons on page:`);
      
      for (let i = 0; i < Math.min(allButtons.length, 10); i++) {
        const button = allButtons[i];
        const isVisible = await button.isVisible();
        const text = await button.textContent().catch(() => 'N/A');
        const ariaLabel = await button.getAttribute('aria-label').catch(() => 'N/A');
        const className = await button.getAttribute('class').catch(() => 'N/A');
        
        console.log(`  Button ${i + 1}: visible=${isVisible}, text="${text}", aria-label="${ariaLabel}", class="${className}"`);
      }
      
      // Take screenshot for debugging
      await page.screenshot({ 
        path: '/workspaces/LusoTown/web-app/mobile-manual-test-no-menu.png',
        fullPage: true 
      });
    }
    
    // Test 3: Menu Interaction (if found)
    if (menuButton) {
      console.log('\n🔍 TEST 3: Mobile Menu Interaction');
      console.log('----------------------------------');
      
      // Get button dimensions for touch target testing
      const buttonBox = await menuButton.boundingBox();
      if (buttonBox) {
        const minDimension = Math.min(buttonBox.width, buttonBox.height);
        console.log(`📏 Menu button dimensions: ${buttonBox.width}x${buttonBox.height}px`);
        console.log(`📏 Touch target size: ${minDimension}px`);
        
        if (minDimension >= 44) {
          console.log('✅ Touch target meets WCAG AA standards (>=44px)');
        } else {
          console.log(`❌ Touch target too small: ${minDimension}px < 44px`);
        }
      }
      
      // Click the menu button
      console.log('Clicking mobile menu button...');
      await menuButton.click();
      await page.waitForTimeout(1500); // Wait for animation
      
      // Take screenshot after clicking
      await page.screenshot({ 
        path: '/workspaces/LusoTown/web-app/mobile-manual-test-menu-clicked.png',
        fullPage: true 
      });
      console.log('📸 Post-menu-click screenshot saved');
      
      // Look for opened menu
      const menuOverlaySelectors = [
        '.xl\\:hidden.fixed',
        '[class*="mobile-menu"]',
        '.backdrop-blur',
        '[role="dialog"]',
        '.fixed[class*="top"]'
      ];
      
      let menuOpened = false;
      for (const selector of menuOverlaySelectors) {
        try {
          const menu = await page.locator(selector).first();
          if (await menu.count() > 0 && await menu.isVisible()) {
            menuOpened = true;
            console.log(`✅ Menu opened - found with selector: ${selector}`);
            break;
          }
        } catch (e) {
          // Continue
        }
      }
      
      if (!menuOpened) {
        console.log('❌ Menu did not appear to open');
      }
    }
    
    // Test 4: Portuguese Content Detection
    console.log('\n🔍 TEST 4: Portuguese Content Detection');
    console.log('--------------------------------------');
    
    const bodyText = await page.textContent('body');
    const portugueseKeywords = [
      'português', 'portugues', 'portuguese',
      'brasil', 'brazil', 'lusófon', 'lusofon',
      'comunidade', 'community', 'lusotown',
      'angola', 'cabo verde', 'moçambique'
    ];
    
    let foundKeywords = [];
    portugueseKeywords.forEach(keyword => {
      if (bodyText && bodyText.toLowerCase().includes(keyword.toLowerCase())) {
        foundKeywords.push(keyword);
      }
    });
    
    console.log(`✅ Found ${foundKeywords.length} Portuguese-related keywords:`, foundKeywords);
    
    // Test 5: Performance Analysis
    console.log('\n🔍 TEST 5: Performance Analysis');
    console.log('-------------------------------');
    
    const metrics = await page.evaluate(() => {
      const timing = performance.timing;
      const navigation = performance.getEntriesByType('navigation')[0];
      
      return {
        loadTime: timing.loadEventEnd - timing.navigationStart,
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        firstPaint: navigation ? navigation.loadEventEnd - navigation.startTime : 'N/A',
        resources: performance.getEntriesByType('resource').length
      };
    });
    
    console.log('⚡ Performance Metrics:');
    console.log(`  - Total load time: ${metrics.loadTime}ms`);
    console.log(`  - DOM Content Loaded: ${metrics.domContentLoaded}ms`);
    console.log(`  - Resources loaded: ${metrics.resources}`);
    
    if (metrics.loadTime > 8000) {
      console.log('⚠️  Page loading is slow (>8s)');
    } else {
      console.log('✅ Page loading performance acceptable');
    }
    
    // Test 6: Basic Responsive Design
    console.log('\n🔍 TEST 6: Responsive Design Check');
    console.log('----------------------------------');
    
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = MOBILE_VIEWPORTS.iphoneSE.width;
    
    console.log(`📏 Body width: ${bodyWidth}px, Viewport: ${viewportWidth}px`);
    
    if (bodyWidth <= viewportWidth + 5) {
      console.log('✅ No horizontal scrolling detected');
    } else {
      console.log('❌ Horizontal scrolling detected - responsive design issue');
    }
    
    // Test 7: Touch Target Analysis
    console.log('\n🔍 TEST 7: Touch Target Analysis');
    console.log('---------------------------------');
    
    const interactiveElements = await page.locator('button, a, input, [tabindex]').all();
    console.log(`🔍 Found ${interactiveElements.length} interactive elements`);
    
    let inadequateTouchTargets = 0;
    const sampleSize = Math.min(interactiveElements.length, 10);
    
    for (let i = 0; i < sampleSize; i++) {
      const element = interactiveElements[i];
      try {
        const box = await element.boundingBox();
        const isVisible = await element.isVisible();
        
        if (box && isVisible) {
          const minDimension = Math.min(box.width, box.height);
          
          if (minDimension < 44) {
            inadequateTouchTargets++;
            console.log(`❌ Element ${i + 1}: ${minDimension}px (too small)`);
          } else {
            console.log(`✅ Element ${i + 1}: ${minDimension}px (adequate)`);
          }
        }
      } catch (e) {
        // Skip elements that can't be measured
      }
    }
    
    const adequateRatio = (sampleSize - inadequateTouchTargets) / sampleSize;
    console.log(`📊 Touch target compliance: ${(adequateRatio * 100).toFixed(1)}%`);
    
    // Final Summary
    console.log('\n📋 MOBILE WEBSITE REVIEW SUMMARY');
    console.log('=================================');
    
    const results = {
      'Page Loading': metrics.loadTime < 8000 ? '✅ PASS' : '❌ SLOW',
      'Mobile Navigation': menuButton ? '✅ FOUND' : '❌ MISSING',
      'Portuguese Content': foundKeywords.length > 0 ? '✅ PRESENT' : '❌ MISSING',
      'Responsive Design': bodyWidth <= viewportWidth + 5 ? '✅ GOOD' : '❌ ISSUES',
      'Touch Accessibility': adequateRatio >= 0.8 ? '✅ GOOD' : '❌ ISSUES',
      'Performance': metrics.loadTime < 5000 ? '✅ FAST' : '⚠️ ACCEPTABLE'
    };
    
    Object.entries(results).forEach(([test, result]) => {
      console.log(`  ${test}: ${result}`);
    });
    
    const passCount = Object.values(results).filter(r => r.includes('✅')).length;
    console.log(`\n🎯 Overall Score: ${passCount}/${Object.keys(results).length} tests passed`);
    
    if (passCount < 4) {
      console.log('⚠️ MULTIPLE CRITICAL ISSUES FOUND - Mobile experience needs improvement');
    } else if (passCount < 6) {
      console.log('✅ Mobile experience is functional with some minor issues');
    } else {
      console.log('✅ Mobile experience is excellent');
    }
    
  } catch (error) {
    console.error('❌ Testing failed:', error.message);
    
    // Take error screenshot
    await page.screenshot({ 
      path: '/workspaces/LusoTown/web-app/mobile-manual-test-error.png',
      fullPage: true 
    });
  } finally {
    await browser.close();
  }
}

// Run the test
testMobileWebsite().catch(console.error);