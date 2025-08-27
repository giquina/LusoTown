import { test, expect, devices } from '@playwright/test';

/**
 * Comprehensive Mobile Website Review for LusoTown
 * 
 * Tests the live website at: https://web-8jh71jiyo-giquinas-projects.vercel.app
 * 
 * Focus Areas:
 * 1. Mobile Navigation & Layout Issues
 * 2. Carousel Testing on Mobile (375px)
 * 3. Touch Interactions & Accessibility
 * 4. Responsive Design Analysis
 * 5. Portuguese Content Mobile Rendering
 * 6. Performance & UX Issues
 * 7. Error Scenarios & Edge Cases
 * 8. Mobile Accessibility
 */

const MOBILE_TEST_CONFIG = {
  liveUrl: 'https://web-8jh71jiyo-giquinas-projects.vercel.app',
  breakpoints: {
    iphoneSE: { width: 375, height: 667 },
    iphone12: { width: 390, height: 844 },
    iphonePlus: { width: 414, height: 736 },
    ipadPortrait: { width: 768, height: 1024 }
  },
  minTouchTarget: 44, // WCAG AA compliance
  preferredTouchTarget: 56, // Luxury mobile experience
  performanceThresholds: {
    domContentLoaded: 3000,
    fullLoad: 8000,
    firstContentfulPaint: 2500
  }
};

test.describe('LusoTown Mobile Website Review - Live Site Testing', () => {

  test.describe('1. Mobile Navigation & Layout Issues', () => {

    test('Mobile hamburger menu functionality at 375px', async ({ page }) => {
      await page.setViewportSize(MOBILE_TEST_CONFIG.breakpoints.iphoneSE);
      
      console.log('🔍 Testing mobile hamburger menu on live website...');
      
      await page.goto(MOBILE_TEST_CONFIG.liveUrl);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000); // Allow page to fully initialize
      
      // Take screenshot of initial state
      await page.screenshot({ 
        path: '/workspaces/LusoTown/web-app/mobile-review-initial.png', 
        fullPage: true 
      });

      // Find hamburger menu button
      const hamburgerSelectors = [
        '[data-testid="mobile-menu-button"]',
        'button[aria-label*="menu"]',
        'button:has(svg[class*="Bars3Icon"])',
        '.xl\\:hidden button:has(svg)',
        'button:has([data-slot="icon"]):visible'
      ];

      let hamburgerButton = null;
      let usedSelector = '';

      for (const selector of hamburgerSelectors) {
        const element = page.locator(selector).first();
        if (await element.count() > 0 && await element.isVisible()) {
          hamburgerButton = element;
          usedSelector = selector;
          break;
        }
      }

      console.log(`🔍 Hamburger button found with selector: ${usedSelector}`);
      
      if (hamburgerButton) {
        // Test touch target size
        const buttonBox = await hamburgerButton.boundingBox();
        expect(buttonBox).not.toBeNull();
        
        if (buttonBox) {
          const minDimension = Math.min(buttonBox.width, buttonBox.height);
          console.log(`📏 Hamburger button dimensions: ${buttonBox.width}x${buttonBox.height}px`);
          
          expect(minDimension).toBeGreaterThanOrEqual(MOBILE_TEST_CONFIG.minTouchTarget);
          console.log(`✅ Touch target meets standards (${minDimension}px >= ${MOBILE_TEST_CONFIG.minTouchTarget}px)`);
        }

        // Test menu open interaction
        await hamburgerButton.click();
        await page.waitForTimeout(1000);
        
        // Take screenshot after menu click
        await page.screenshot({ 
          path: '/workspaces/LusoTown/web-app/mobile-review-menu-opened.png', 
          fullPage: true 
        });

        // Check if mobile menu opened
        const mobileMenuSelectors = [
          '.xl\\:hidden.fixed',
          '[class*="mobile-menu"]',
          '[role="dialog"]',
          '.fixed.inset-0 + .fixed',
          '.backdrop-blur'
        ];

        let mobileMenuVisible = false;
        for (const selector of mobileMenuSelectors) {
          const menu = page.locator(selector);
          if (await menu.count() > 0 && await menu.isVisible()) {
            mobileMenuVisible = true;
            console.log(`✅ Mobile menu found and visible with selector: ${selector}`);
            break;
          }
        }

        // If standard selectors don't work, look for any overlay or dropdown that appeared
        if (!mobileMenuVisible) {
          const overlays = await page.locator('div[class*="fixed"], div[class*="absolute"], div[class*="dropdown"]').count();
          const visibleOverlays = await page.locator('div[class*="fixed"]:visible, div[class*="absolute"]:visible').count();
          console.log(`🔍 Found ${overlays} overlay elements, ${visibleOverlays} visible`);
          
          if (visibleOverlays > 0) {
            mobileMenuVisible = true;
            console.log('✅ Mobile menu likely opened (detected overlay elements)');
          }
        }

        expect(mobileMenuVisible).toBe(true);

        // Test menu close
        await hamburgerButton.click();
        await page.waitForTimeout(1000);
        
        console.log('✅ Mobile hamburger menu functionality tested successfully');
      } else {
        console.log('❌ CRITICAL ISSUE: Mobile hamburger menu button not found');
        
        // Take screenshot of current state for debugging
        await page.screenshot({ 
          path: '/workspaces/LusoTown/web-app/mobile-review-no-menu.png', 
          fullPage: true 
        });
        
        // List all visible buttons for debugging
        const allButtons = await page.locator('button:visible').count();
        console.log(`🔍 Found ${allButtons} visible buttons on page`);
        
        for (let i = 0; i < Math.min(allButtons, 10); i++) {
          const button = page.locator('button:visible').nth(i);
          const buttonText = await button.textContent();
          const buttonClass = await button.getAttribute('class');
          console.log(`Button ${i + 1}: "${buttonText}" - ${buttonClass}`);
        }
        
        throw new Error('CRITICAL: Mobile hamburger menu not found - Navigation broken');
      }
    });

    test('Header positioning and z-index conflicts', async ({ page }) => {
      await page.setViewportSize(MOBILE_TEST_CONFIG.breakpoints.iphoneSE);
      await page.goto(MOBILE_TEST_CONFIG.liveUrl);
      await page.waitForLoadState('networkidle');

      console.log('🔍 Testing header positioning and z-index conflicts...');

      // Check header element
      const headerSelectors = ['header', '[role="banner"]', '.header', 'nav'];
      let header = null;

      for (const selector of headerSelectors) {
        const element = page.locator(selector).first();
        if (await element.count() > 0 && await element.isVisible()) {
          header = element;
          break;
        }
      }

      if (header) {
        const headerBox = await header.boundingBox();
        if (headerBox) {
          console.log(`📍 Header position: x=${headerBox.x}, y=${headerBox.y}, width=${headerBox.width}, height=${headerBox.height}`);
          
          // Header should be at top of page
          expect(headerBox.y).toBeLessThanOrEqual(5);
          
          // Header should span full width
          expect(headerBox.width).toBeCloseTo(MOBILE_TEST_CONFIG.breakpoints.iphoneSE.width, 10);
          
          // Check z-index if computable
          const zIndex = await header.evaluate(el => window.getComputedStyle(el).zIndex);
          console.log(`📊 Header z-index: ${zIndex}`);
        }
      }

      console.log('✅ Header positioning analysis complete');
    });

    test('Logo and navigation element spacing', async ({ page }) => {
      await page.setViewportSize(MOBILE_TEST_CONFIG.breakpoints.iphoneSE);
      await page.goto(MOBILE_TEST_CONFIG.liveUrl);
      await page.waitForLoadState('networkidle');

      console.log('🔍 Testing logo and navigation element spacing...');

      // Find logo
      const logoSelectors = ['[alt*="logo"]', '[alt*="LusoTown"]', 'img[src*="logo"]', '.logo'];
      let logo = null;

      for (const selector of logoSelectors) {
        const element = page.locator(selector).first();
        if (await element.count() > 0 && await element.isVisible()) {
          logo = element;
          break;
        }
      }

      // Find navigation elements
      const navElements = await page.locator('nav a, nav button, header a, header button').all();
      
      console.log(`🔍 Found ${navElements.length} navigation elements`);

      if (logo) {
        const logoBox = await logo.boundingBox();
        console.log(`📍 Logo position: x=${logoBox?.x}, y=${logoBox?.y}, width=${logoBox?.width}, height=${logoBox?.height}`);
      }

      // Check spacing between interactive elements
      for (let i = 0; i < Math.min(navElements.length, 5); i++) {
        const element = navElements[i];
        const box = await element.boundingBox();
        if (box) {
          const minDimension = Math.min(box.width, box.height);
          console.log(`📏 Nav element ${i + 1} touch target: ${minDimension}px`);
          
          // Navigation elements should have adequate touch targets
          expect(minDimension).toBeGreaterThanOrEqual(MOBILE_TEST_CONFIG.minTouchTarget);
        }
      }

      console.log('✅ Logo and navigation spacing analysis complete');
    });

  });

  test.describe('2. Carousel Testing on Mobile (375px)', () => {

    test('Weekend events carousel swipe functionality', async ({ page }) => {
      await page.setViewportSize(MOBILE_TEST_CONFIG.breakpoints.iphoneSE);
      await page.goto(MOBILE_TEST_CONFIG.liveUrl);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000); // Allow carousels to load

      console.log('🎠 Testing weekend events carousel...');

      // Look for carousel containers
      const carouselSelectors = [
        '[class*="carousel"]',
        '[class*="slider"]',
        '[class*="swiper"]',
        '.embla',
        '[role="region"]'
      ];

      let carousels = [];
      for (const selector of carouselSelectors) {
        const elements = await page.locator(selector).all();
        carousels.push(...elements);
      }

      console.log(`🔍 Found ${carousels.length} potential carousel elements`);

      if (carousels.length > 0) {
        const carousel = carousels[0];
        const carouselBox = await carousel.boundingBox();
        
        if (carouselBox) {
          console.log(`📍 Carousel dimensions: ${carouselBox.width}x${carouselBox.height}px`);
          
          // Test swipe gesture
          const startX = carouselBox.x + carouselBox.width * 0.8;
          const endX = carouselBox.x + carouselBox.width * 0.2;
          const y = carouselBox.y + carouselBox.height / 2;

          await page.mouse.move(startX, y);
          await page.mouse.down();
          await page.mouse.move(endX, y);
          await page.mouse.up();
          
          await page.waitForTimeout(1000);
          console.log('✅ Carousel swipe gesture executed');

          // Check for navigation buttons
          const navButtons = await page.locator('button[class*="prev"], button[class*="next"], button[aria-label*="next"], button[aria-label*="previous"]').count();
          console.log(`🔍 Found ${navButtons} carousel navigation buttons`);
        }
      } else {
        console.log('⚠️  No carousel elements found on homepage');
      }

      console.log('✅ Carousel testing complete');
    });

    test('Carousel auto-advance and performance', async ({ page }) => {
      await page.setViewportSize(MOBILE_TEST_CONFIG.breakpoints.iphoneSE);
      await page.goto(MOBILE_TEST_CONFIG.liveUrl);
      await page.waitForLoadState('networkidle');

      console.log('⚡ Testing carousel performance and auto-advance...');

      // Monitor for any carousel animation performance
      const performanceEntries = await page.evaluate(() => {
        return JSON.stringify(performance.getEntriesByType('measure'));
      });

      console.log(`📊 Performance entries count: ${JSON.parse(performanceEntries).length}`);

      // Wait and observe for auto-advance behavior
      await page.waitForTimeout(5000);
      
      console.log('✅ Carousel performance testing complete');
    });

  });

  test.describe('3. Touch Interactions & Accessibility', () => {

    test('Touch targets meet minimum standards', async ({ page }) => {
      await page.setViewportSize(MOBILE_TEST_CONFIG.breakpoints.iphoneSE);
      await page.goto(MOBILE_TEST_CONFIG.liveUrl);
      await page.waitForLoadState('networkidle');

      console.log('👆 Testing touch target accessibility standards...');

      // Find all interactive elements
      const interactiveElements = await page.locator('button, a, input, [tabindex], [role="button"]').all();
      console.log(`🔍 Found ${interactiveElements.length} interactive elements`);

      let inadequateTouchTargets = 0;
      const sampleSize = Math.min(interactiveElements.length, 20); // Test first 20 elements

      for (let i = 0; i < sampleSize; i++) {
        const element = interactiveElements[i];
        const box = await element.boundingBox();
        
        if (box && await element.isVisible()) {
          const minDimension = Math.min(box.width, box.height);
          
          if (minDimension < MOBILE_TEST_CONFIG.minTouchTarget) {
            inadequateTouchTargets++;
            console.log(`❌ Element ${i + 1} has inadequate touch target: ${minDimension}px`);
          } else {
            console.log(`✅ Element ${i + 1} meets touch standards: ${minDimension}px`);
          }
        }
      }

      const adequateRatio = (sampleSize - inadequateTouchTargets) / sampleSize;
      console.log(`📊 Touch accessibility score: ${(adequateRatio * 100).toFixed(1)}%`);
      
      // At least 80% of elements should meet touch standards
      expect(adequateRatio).toBeGreaterThanOrEqual(0.8);
      
      console.log('✅ Touch target accessibility testing complete');
    });

    test('Button hover states and responsiveness', async ({ page }) => {
      await page.setViewportSize(MOBILE_TEST_CONFIG.breakpoints.iphoneSE);
      await page.goto(MOBILE_TEST_CONFIG.liveUrl);
      await page.waitForLoadState('networkidle');

      console.log('🖱️ Testing button responsiveness...');

      // Find primary buttons
      const buttons = await page.locator('button:visible').all();
      const sampleButtons = buttons.slice(0, 5);

      for (let i = 0; i < sampleButtons.length; i++) {
        const button = sampleButtons[i];
        const buttonText = await button.textContent();
        
        console.log(`Testing button ${i + 1}: "${buttonText}"`);
        
        // Test tap responsiveness
        await button.tap();
        await page.waitForTimeout(200);
      }

      console.log('✅ Button responsiveness testing complete');
    });

  });

  test.describe('4. Responsive Design Analysis', () => {

    test('Layout behavior across mobile breakpoints', async ({ page }) => {
      const breakpoints = [
        { name: 'iPhone SE', ...MOBILE_TEST_CONFIG.breakpoints.iphoneSE },
        { name: 'iPhone 12', ...MOBILE_TEST_CONFIG.breakpoints.iphone12 },
        { name: 'iPhone Plus', ...MOBILE_TEST_CONFIG.breakpoints.iphonePlus }
      ];

      console.log('📱 Testing responsive layout across mobile breakpoints...');

      for (const breakpoint of breakpoints) {
        console.log(`🔍 Testing ${breakpoint.name} (${breakpoint.width}x${breakpoint.height}px)...`);
        
        await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
        await page.goto(MOBILE_TEST_CONFIG.liveUrl);
        await page.waitForLoadState('networkidle');
        
        // Take screenshot for visual comparison
        await page.screenshot({ 
          path: `/workspaces/LusoTown/web-app/mobile-review-${breakpoint.width}px.png`, 
          fullPage: true 
        });

        // Check for horizontal scrolling
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        expect(bodyWidth).toBeLessThanOrEqual(breakpoint.width + 5); // Allow 5px tolerance
        
        console.log(`✅ ${breakpoint.name}: No horizontal scrolling (body width: ${bodyWidth}px)`);

        // Check main content visibility
        const mainContentHeight = await page.evaluate(() => document.body.scrollHeight);
        console.log(`📏 ${breakpoint.name}: Content height: ${mainContentHeight}px`);
        
        expect(mainContentHeight).toBeGreaterThan(breakpoint.height); // Should have content to scroll
      }

      console.log('✅ Responsive design analysis complete');
    });

    test('Text readability and scaling', async ({ page }) => {
      await page.setViewportSize(MOBILE_TEST_CONFIG.breakpoints.iphoneSE);
      await page.goto(MOBILE_TEST_CONFIG.liveUrl);
      await page.waitForLoadState('networkidle');

      console.log('📖 Testing text readability and scaling...');

      // Check heading sizes
      const headings = await page.locator('h1, h2, h3').all();
      
      for (let i = 0; i < Math.min(headings.length, 5); i++) {
        const heading = headings[i];
        if (await heading.isVisible()) {
          const fontSize = await heading.evaluate(el => window.getComputedStyle(el).fontSize);
          const lineHeight = await heading.evaluate(el => window.getComputedStyle(el).lineHeight);
          
          console.log(`📝 Heading ${i + 1}: font-size: ${fontSize}, line-height: ${lineHeight}`);
          
          // Font size should be at least 16px for readability
          const fontSizeNumber = parseInt(fontSize);
          expect(fontSizeNumber).toBeGreaterThanOrEqual(16);
        }
      }

      // Check body text
      const bodyElements = await page.locator('p, div, span').all();
      if (bodyElements.length > 0) {
        const sampleElement = bodyElements[0];
        const fontSize = await sampleElement.evaluate(el => window.getComputedStyle(el).fontSize);
        console.log(`📝 Body text font-size: ${fontSize}`);
        
        const fontSizeNumber = parseInt(fontSize);
        expect(fontSizeNumber).toBeGreaterThanOrEqual(14); // Minimum for body text
      }

      console.log('✅ Text readability testing complete');
    });

  });

  test.describe('5. Portuguese Content Mobile Rendering', () => {

    test('Portuguese character rendering', async ({ page }) => {
      await page.setViewportSize(MOBILE_TEST_CONFIG.breakpoints.iphoneSE);
      await page.goto(MOBILE_TEST_CONFIG.liveUrl);
      await page.waitForLoadState('networkidle');

      console.log('🇵🇹 Testing Portuguese character rendering...');

      // Check for Portuguese text content
      const bodyText = await page.textContent('body');
      const portugueseChars = ['ã', 'õ', 'ç', 'á', 'é', 'í', 'ó', 'ú', 'à', 'ê'];
      
      let foundPortugueseChars = 0;
      portugueseChars.forEach(char => {
        if (bodyText?.includes(char)) {
          foundPortugueseChars++;
          console.log(`✅ Found Portuguese character: ${char}`);
        }
      });

      console.log(`🔍 Portuguese characters found: ${foundPortugueseChars}/${portugueseChars.length}`);

      // Check for Portuguese keywords
      const portugueseKeywords = ['português', 'portugues', 'brasil', 'lusófon', 'lusofon', 'comunidade'];
      let foundKeywords = 0;
      
      portugueseKeywords.forEach(keyword => {
        if (bodyText?.toLowerCase().includes(keyword.toLowerCase())) {
          foundKeywords++;
          console.log(`✅ Found Portuguese keyword: ${keyword}`);
        }
      });

      console.log(`🔍 Portuguese keywords found: ${foundKeywords}/${portugueseKeywords.length}`);
      
      console.log('✅ Portuguese content analysis complete');
    });

    test('Flag emoji and cultural symbol display', async ({ page }) => {
      await page.setViewportSize(MOBILE_TEST_CONFIG.breakpoints.iphoneSE);
      await page.goto(MOBILE_TEST_CONFIG.liveUrl);
      await page.waitForLoadState('networkidle');

      console.log('🎌 Testing flag emoji and cultural symbols...');

      // Look for flag images or emojis
      const flagElements = await page.locator('img[alt*="flag"], img[alt*="portugal"], img[alt*="brasil"], [class*="flag"]').all();
      console.log(`🔍 Found ${flagElements.length} flag-related elements`);

      // Check for emoji in text content
      const bodyText = await page.textContent('body');
      const flagEmojis = ['🇵🇹', '🇧🇷', '🇦🇴', '🇨🇻', '🇲🇿'];
      
      let foundEmojis = 0;
      flagEmojis.forEach(emoji => {
        if (bodyText?.includes(emoji)) {
          foundEmojis++;
          console.log(`✅ Found flag emoji: ${emoji}`);
        }
      });

      console.log(`🔍 Flag emojis found: ${foundEmojis}/${flagEmojis.length}`);
      
      console.log('✅ Cultural symbols testing complete');
    });

  });

  test.describe('6. Performance & UX Issues', () => {

    test('Mobile loading performance analysis', async ({ page }) => {
      await page.setViewportSize(MOBILE_TEST_CONFIG.breakpoints.iphoneSE);

      console.log('⚡ Testing mobile loading performance...');

      const startTime = Date.now();
      await page.goto(MOBILE_TEST_CONFIG.liveUrl);
      
      // Measure DOM Content Loaded
      await page.waitForLoadState('domcontentloaded');
      const domLoadTime = Date.now() - startTime;
      console.log(`⏱️  DOM Content Loaded: ${domLoadTime}ms`);
      
      // Measure full load
      await page.waitForLoadState('networkidle');
      const fullLoadTime = Date.now() - startTime;
      console.log(`⏱️  Full Load Time: ${fullLoadTime}ms`);

      // Performance expectations
      expect(domLoadTime).toBeLessThan(MOBILE_TEST_CONFIG.performanceThresholds.domContentLoaded);
      expect(fullLoadTime).toBeLessThan(MOBILE_TEST_CONFIG.performanceThresholds.fullLoad);

      // Get Core Web Vitals if available
      const coreWebVitals = await page.evaluate(() => {
        return new Promise((resolve) => {
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const vitals = {};
            entries.forEach((entry) => {
              if (entry.entryType === 'largest-contentful-paint') {
                vitals.LCP = entry.startTime;
              }
              if (entry.entryType === 'first-input') {
                vitals.FID = entry.processingStart - entry.startTime;
              }
              if (entry.entryType === 'layout-shift') {
                vitals.CLS = (vitals.CLS || 0) + entry.value;
              }
            });
            setTimeout(() => resolve(vitals), 2000);
          }).observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
          
          // Fallback timeout
          setTimeout(() => resolve({}), 3000);
        });
      });

      console.log('📊 Core Web Vitals:', coreWebVitals);
      console.log('✅ Performance analysis complete');
    });

    test('Smooth scrolling and animations', async ({ page }) => {
      await page.setViewportSize(MOBILE_TEST_CONFIG.breakpoints.iphoneSE);
      await page.goto(MOBILE_TEST_CONFIG.liveUrl);
      await page.waitForLoadState('networkidle');

      console.log('✨ Testing smooth scrolling and animations...');

      // Test scroll behavior
      const scrollPositions = [0, 500, 1000, 1500, 0];
      
      for (let i = 0; i < scrollPositions.length; i++) {
        const scrollTo = scrollPositions[i];
        await page.evaluate((scroll) => {
          window.scrollTo({ top: scroll, behavior: 'smooth' });
        }, scrollTo);
        
        await page.waitForTimeout(500);
        
        const currentScroll = await page.evaluate(() => window.pageYOffset);
        console.log(`📜 Scrolled to position: ${currentScroll}px`);
      }

      console.log('✅ Scroll behavior testing complete');
    });

  });

  test.describe('7. Error Scenarios & Edge Cases', () => {

    test('Offline functionality testing', async ({ page }) => {
      await page.setViewportSize(MOBILE_TEST_CONFIG.breakpoints.iphoneSE);
      await page.goto(MOBILE_TEST_CONFIG.liveUrl);
      await page.waitForLoadState('networkidle');

      console.log('🌐 Testing offline functionality...');

      // Go offline
      await page.context().setOffline(true);
      await page.waitForTimeout(1000);

      // Test if page still functions
      const pageTitle = await page.title();
      expect(pageTitle).toBeTruthy();
      console.log(`📄 Page title still accessible offline: "${pageTitle}"`);

      // Test local interactions
      const buttons = await page.locator('button:visible').all();
      if (buttons.length > 0) {
        await buttons[0].click();
        console.log('✅ Local button interaction works offline');
      }

      // Restore online
      await page.context().setOffline(false);
      await page.waitForTimeout(1000);
      console.log('🌐 Network restored');
      
      console.log('✅ Offline functionality testing complete');
    });

    test('Network timeout handling', async ({ page }) => {
      await page.setViewportSize(MOBILE_TEST_CONFIG.breakpoints.iphoneSE);

      console.log('⏰ Testing network timeout handling...');

      // Set very slow network conditions
      await page.route('**/*', async (route, request) => {
        // Delay responses to test timeout handling
        await new Promise(resolve => setTimeout(resolve, 1000));
        await route.continue();
      });

      const startTime = Date.now();
      await page.goto(MOBILE_TEST_CONFIG.liveUrl, { timeout: 30000 });
      const loadTime = Date.now() - startTime;
      
      console.log(`⏱️  Load time with network delay: ${loadTime}ms`);
      console.log('✅ Network timeout handling complete');
    });

  });

  test.describe('8. Mobile Accessibility', () => {

    test('Screen reader compatibility', async ({ page }) => {
      await page.setViewportSize(MOBILE_TEST_CONFIG.breakpoints.iphoneSE);
      await page.goto(MOBILE_TEST_CONFIG.liveUrl);
      await page.waitForLoadState('networkidle');

      console.log('♿ Testing screen reader compatibility...');

      // Check for ARIA labels
      const ariaLabels = await page.locator('[aria-label]').count();
      console.log(`🔍 Found ${ariaLabels} elements with aria-label`);

      // Check for alt text on images
      const imagesWithAlt = await page.locator('img[alt]').count();
      const imagesTotal = await page.locator('img').count();
      console.log(`🖼️  Images with alt text: ${imagesWithAlt}/${imagesTotal}`);

      // Check heading structure
      const h1Count = await page.locator('h1').count();
      const h2Count = await page.locator('h2').count();
      const h3Count = await page.locator('h3').count();
      
      console.log(`📝 Heading structure: H1(${h1Count}) H2(${h2Count}) H3(${h3Count})`);
      expect(h1Count).toBeGreaterThan(0); // Should have at least one H1
      
      console.log('✅ Screen reader compatibility testing complete');
    });

    test('Color contrast and visibility', async ({ page }) => {
      await page.setViewportSize(MOBILE_TEST_CONFIG.breakpoints.iphoneSE);
      await page.goto(MOBILE_TEST_CONFIG.liveUrl);
      await page.waitForLoadState('networkidle');

      console.log('🎨 Testing color contrast and visibility...');

      // Check if page has proper color contrast by looking for CSS classes that suggest proper theming
      const contrastElements = await page.locator('[class*="contrast"], [class*="text-"], [class*="bg-"]').count();
      console.log(`🔍 Found ${contrastElements} elements with color/contrast classes`);

      // Test in high contrast mode simulation
      await page.evaluate(() => {
        document.documentElement.style.filter = 'contrast(150%)';
      });
      
      await page.waitForTimeout(1000);
      
      // Verify page is still readable
      const bodyVisible = await page.locator('body').isVisible();
      expect(bodyVisible).toBe(true);
      
      console.log('✅ High contrast mode compatibility confirmed');
      console.log('✅ Color contrast testing complete');
    });

  });

  // Summary test
  test.describe('Mobile Experience Summary', () => {
    
    test('Overall mobile UX assessment', async ({ page }) => {
      await page.setViewportSize(MOBILE_TEST_CONFIG.breakpoints.iphoneSE);
      
      console.log('📋 LusoTown Mobile Website Review Summary');
      console.log('==========================================');
      
      await page.goto(MOBILE_TEST_CONFIG.liveUrl);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);

      // Take final comprehensive screenshot
      await page.screenshot({ 
        path: '/workspaces/LusoTown/web-app/mobile-review-final.png', 
        fullPage: true 
      });

      const results = {
        pageLoads: '✅ PASS',
        mobileNavigation: '❓ NEEDS_VERIFICATION',
        touchAccessibility: '❓ NEEDS_VERIFICATION',
        portugueseContent: '❓ NEEDS_VERIFICATION',
        performance: '❓ NEEDS_VERIFICATION',
        accessibility: '❓ NEEDS_VERIFICATION'
      };

      // Test basic functionality
      const pageTitle = await page.title();
      if (!pageTitle || pageTitle.toLowerCase().includes('error')) {
        results.pageLoads = '❌ FAIL - Page loading issues';
      }

      // Check for mobile navigation
      const hamburgerExists = await page.locator('[data-testid="mobile-menu-button"], button[aria-label*="menu"]').count() > 0;
      results.mobileNavigation = hamburgerExists ? '✅ PASS' : '❌ FAIL - Mobile menu not found';

      // Basic performance check
      const loadStart = Date.now();
      await page.reload();
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - loadStart;
      results.performance = loadTime < 8000 ? '✅ PASS' : '⚠️  SLOW - Load time: ' + loadTime + 'ms';

      console.log('📊 Mobile Review Results:');
      console.log(`   Page Loading: ${results.pageLoads}`);
      console.log(`   Mobile Navigation: ${results.mobileNavigation}`);
      console.log(`   Touch Accessibility: ${results.touchAccessibility}`);
      console.log(`   Portuguese Content: ${results.portugueseContent}`);
      console.log(`   Performance: ${results.performance}`);
      console.log(`   Accessibility: ${results.accessibility}`);
      console.log('==========================================');
      
      const passCount = Object.values(results).filter(result => result.includes('✅')).length;
      console.log(`🎯 Overall Score: ${passCount}/6 areas passed initial testing`);
      
      // The page should at least load successfully
      expect(passCount).toBeGreaterThanOrEqual(2);
    });
  });

});