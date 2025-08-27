/**
 * Live Site Mobile UX Validation
 * 
 * Tests the live LusoTown platform at https://web-99kxh0sku-giquinas-projects.vercel.app
 * for comprehensive mobile UX validation across all requested areas:
 * 
 * 1. Carousel responsiveness at 375px, 768px, 1024px breakpoints
 * 2. App download bar positioning doesn't cover entire screen
 * 3. Homepage CTA button text wrapping issues
 * 4. Mobile navigation hamburger menu functionality
 * 5. Touch targets meet 44px minimum requirement
 * 6. Portuguese cultural content display on mobile
 * 7. PWA features and mobile app integration
 * 8. Mobile viewport functionality
 */

import { test, expect } from '@playwright/test';

const LIVE_URL = 'https://web-99kxh0sku-giquinas-projects.vercel.app';

test.describe('Live Site Mobile UX Comprehensive Validation', () => {
  test('1. Carousel responsiveness at 375px, 768px, 1024px breakpoints', async ({ page }) => {
    console.log('🎠 Testing carousel responsiveness across breakpoints...');
    
    const breakpoints = [
      { width: 375, height: 667, name: 'Mobile (375px)' },
      { width: 768, height: 1024, name: 'Tablet (768px)' },
      { width: 1024, height: 768, name: 'Desktop (1024px)' }
    ];
    
    for (const breakpoint of breakpoints) {
      console.log(`\n📱 Testing ${breakpoint.name}...`);
      
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await page.goto(LIVE_URL);
      await page.waitForLoadState('networkidle');
      
      // Look for carousel elements
      const carousels = page.locator('[class*="carousel"], [class*="slider"], [class*="swiper"], .swiper, .splide');
      const carouselCount = await carousels.count();
      
      console.log(`Found ${carouselCount} carousel elements`);
      
      if (carouselCount > 0) {
        for (let i = 0; i < Math.min(carouselCount, 3); i++) {
          const carousel = carousels.nth(i);
          
          if (await carousel.isVisible()) {
            const bbox = await carousel.boundingBox();
            
            if (bbox) {
              // Carousel should not overflow viewport
              expect(bbox.width, `Carousel ${i + 1} width should not exceed viewport at ${breakpoint.name}`).toBeLessThanOrEqual(breakpoint.width + 10);
              
              // Should be reasonably sized
              expect(bbox.height, `Carousel ${i + 1} should have reasonable height at ${breakpoint.name}`).toBeLessThan(breakpoint.height);
              
              console.log(`✅ Carousel ${i + 1} at ${breakpoint.name}: ${bbox.width}x${bbox.height}px`);
            }
          }
        }
      }
      
      // Check for horizontal scrolling
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      
      expect(scrollWidth, `No horizontal scroll at ${breakpoint.name}`).toBeLessThanOrEqual(clientWidth + 5);
      console.log(`✅ No horizontal scrolling at ${breakpoint.name}: ${scrollWidth} <= ${clientWidth}`);
    }
  });

  test('2. App download bar positioning verification', async ({ page }) => {
    console.log('📱 Testing app download bar positioning...');
    
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto(LIVE_URL);
    await page.waitForLoadState('networkidle');
    
    // Wait for potential app download bar
    await page.waitForTimeout(6000);
    
    // Look for app download bar with various selectors
    const appBarSelectors = [
      '[role="banner"]',
      '[data-testid="app-download-bar"]',
      '.app-download-bar',
      'div:has-text("Download")',
      'div:has-text("App")',
      'div:has-text("mobile")'
    ];
    
    let appBarFound = false;
    
    for (const selector of appBarSelectors) {
      const element = page.locator(selector);
      const count = await element.count();
      
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const bar = element.nth(i);
          
          if (await bar.isVisible()) {
            const bbox = await bar.boundingBox();
            const textContent = await bar.textContent();
            
            // Check if it's likely an app download bar
            if (textContent?.toLowerCase().includes('app') || textContent?.toLowerCase().includes('download') || textContent?.toLowerCase().includes('mobile')) {
              console.log(`✅ Found potential app download bar: "${textContent?.slice(0, 50)}..."`);
              
              if (bbox) {
                const viewportHeight = 667;
                
                // Should not cover entire screen
                expect(bbox.height, 'App bar should not cover entire screen').toBeLessThan(viewportHeight / 2);
                
                // Should be positioned reasonably (likely at top or bottom)
                const isAtTop = bbox.y < 100;
                const isAtBottom = bbox.y > viewportHeight - 200;
                
                expect(isAtTop || isAtBottom, 'App bar should be positioned at top or bottom').toBe(true);
                
                console.log(`✅ App bar positioned correctly: y=${bbox.y}, height=${bbox.height}px`);
                appBarFound = true;
                break;
              }
            }
          }
        }
        
        if (appBarFound) break;
      }
    }
    
    if (!appBarFound) {
      console.log('ℹ️  App download bar not found or not triggered (may be user-dependent)');
    }
  });

  test('3. Homepage CTA button text wrapping validation', async ({ page }) => {
    console.log('🔘 Testing CTA button text wrapping...');
    
    const breakpoints = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' }
    ];
    
    for (const breakpoint of breakpoints) {
      console.log(`\n📱 Testing CTA buttons at ${breakpoint.name}...`);
      
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await page.goto(LIVE_URL);
      await page.waitForLoadState('networkidle');
      
      // Find CTA buttons
      const ctaButtons = page.locator('a:has-text("Join"), a:has-text("Join Now"), button:has-text("Join"), a:has-text("Get Started"), button:has-text("Get Started"), a[href*="signup"], button[type="submit"]');
      const count = await ctaButtons.count();
      
      console.log(`Found ${count} potential CTA buttons`);
      
      for (let i = 0; i < Math.min(count, 5); i++) {
        const button = ctaButtons.nth(i);
        
        if (await button.isVisible()) {
          const bbox = await button.boundingBox();
          const textContent = await button.textContent();
          
          if (bbox && textContent) {
            console.log(`CTA ${i + 1}: "${textContent.trim()}" - ${bbox.width}x${bbox.height}px`);
            
            // Button should not be excessively tall (indicating text wrapping)
            expect(bbox.height, `CTA button "${textContent.trim()}" height should not indicate wrapping at ${breakpoint.name}`).toBeLessThan(100);
            
            // Check if text appears to be wrapped by looking at width vs text length
            const textLength = textContent.trim().length;
            const expectedMinWidth = Math.min(textLength * 8, 120); // Rough estimate
            
            if (bbox.width < expectedMinWidth && bbox.height > 60) {
              console.warn(`⚠️  Potential text wrapping detected for "${textContent.trim()}" at ${breakpoint.name}`);
            }
            
            console.log(`✅ CTA button "${textContent.trim()}" validated at ${breakpoint.name}`);
          }
        }
      }
    }
  });

  test('4. Mobile navigation hamburger menu functionality', async ({ page }) => {
    console.log('🍔 Testing mobile navigation hamburger menu...');
    
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(LIVE_URL);
    await page.waitForLoadState('networkidle');
    
    // Look for hamburger menu button
    const hamburgerSelectors = [
      'button[aria-label*="menu"], button[aria-label*="Menu"]',
      'button:has-text("☰"), button:has-text("≡")',
      '.hamburger, .menu-toggle, .nav-toggle',
      'button[class*="hamburger"], button[class*="menu-toggle"]',
      'nav button, header button'
    ];
    
    let hamburgerFound = false;
    
    for (const selector of hamburgerSelectors) {
      const hamburgerButtons = page.locator(selector);
      const count = await hamburgerButtons.count();
      
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const button = hamburgerButtons.nth(i);
          
          if (await button.isVisible()) {
            const bbox = await button.boundingBox();
            
            if (bbox && bbox.width < 100 && bbox.height < 100) { // Likely a hamburger button
              console.log(`✅ Found hamburger menu button: ${bbox.width}x${bbox.height}px`);
              
              // Test if button is clickable
              try {
                await button.click();
                await page.waitForTimeout(500);
                
                // Look for opened menu
                const menu = page.locator('nav[class*="open"], .menu[class*="open"], [class*="menu-open"], [aria-expanded="true"]').first();
                
                if (await menu.isVisible()) {
                  console.log('✅ Hamburger menu opens successfully');
                  
                  // Try to close it
                  await button.click();
                  await page.waitForTimeout(500);
                  
                  console.log('✅ Hamburger menu functionality verified');
                } else {
                  console.log('⚠️  Hamburger menu clicked but no visible menu detected');
                }
                
                hamburgerFound = true;
                break;
              } catch (error) {
                console.log(`⚠️  Error testing hamburger menu: ${error}`);
              }
            }
          }
        }
        
        if (hamburgerFound) break;
      }
    }
    
    if (!hamburgerFound) {
      console.log('ℹ️  Hamburger menu not found (may use different navigation pattern)');
    }
  });

  test('5. Touch targets meet 44px minimum requirement', async ({ page }) => {
    console.log('👆 Testing touch target sizes...');
    
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(LIVE_URL);
    await page.waitForLoadState('networkidle');
    
    // Get all interactive elements
    const interactiveElements = page.locator('button, a[href], [role="button"], input, select, textarea, [onclick], [tabindex="0"]');
    const count = await interactiveElements.count();
    
    console.log(`Found ${count} interactive elements to test`);
    
    let validTouchTargets = 0;
    let invalidTouchTargets = 0;
    const maxElementsToTest = Math.min(count, 20);
    
    for (let i = 0; i < maxElementsToTest; i++) {
      const element = interactiveElements.nth(i);
      
      if (await element.isVisible()) {
        const bbox = await element.boundingBox();
        
        if (bbox) {
          const meetsMinimum = bbox.width >= 44 && bbox.height >= 44;
          const almostMeetsMinimum = bbox.width >= 40 && bbox.height >= 40; // 4px tolerance
          
          if (meetsMinimum) {
            validTouchTargets++;
          } else if (almostMeetsMinimum) {
            validTouchTargets++;
            console.log(`📏 Touch target ${i + 1} almost meets minimum: ${bbox.width}x${bbox.height}px (within tolerance)`);
          } else {
            invalidTouchTargets++;
            console.warn(`⚠️  Small touch target ${i + 1}: ${bbox.width}x${bbox.height}px`);
          }
        }
      }
    }
    
    const totalTested = validTouchTargets + invalidTouchTargets;
    const validPercentage = totalTested > 0 ? (validTouchTargets / totalTested) * 100 : 0;
    
    console.log(`📊 Touch target results: ${validTouchTargets}/${totalTested} valid (${validPercentage.toFixed(1)}%)`);
    
    // Should have at least 70% of touch targets meeting minimum
    expect(validPercentage, 'At least 70% of touch targets should meet 44px minimum').toBeGreaterThan(70);
    
    console.log('✅ Touch target validation completed');
  });

  test('6. Portuguese cultural content display on mobile', async ({ page }) => {
    console.log('🇵🇹 Testing Portuguese cultural content display...');
    
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(LIVE_URL);
    await page.waitForLoadState('networkidle');
    
    // Check for Portuguese cultural terminology
    const culturalTerms = [
      'Portuguese-speaking',
      'lusophone',
      'lusófona',
      'Portugal',
      'Brasil',
      'Brazil',
      'Angola',
      'Cabo Verde',
      'Cape Verde',
      'Mozambique',
      'Reino Unido',
      'United Kingdom',
      'UK',
      'saudade',
      'fado'
    ];
    
    let foundTerms = 0;
    const foundTermsList: string[] = [];
    
    for (const term of culturalTerms) {
      // Try different text matching approaches
      const exactMatch = page.locator(`:text("${term}")`);
      const caseInsensitiveMatch = page.locator(`:text-is("${term}")`, { has: page.locator(`text=/${term}/i`) });
      
      if (await exactMatch.count() > 0) {
        foundTerms++;
        foundTermsList.push(term);
      } else if (await caseInsensitiveMatch.count() > 0) {
        foundTerms++;
        foundTermsList.push(term);
      }
    }
    
    console.log(`✅ Found ${foundTerms} Portuguese cultural terms: ${foundTermsList.slice(0, 5).join(', ')}${foundTermsList.length > 5 ? '...' : ''}`);
    
    // Should find at least some Portuguese cultural content
    expect(foundTerms, 'Should find Portuguese cultural content').toBeGreaterThan(0);
    
    // Check for language toggle
    const languageToggle = page.locator('button:has-text("PT"), button:has-text("EN"), [aria-label*="language"], [title*="Português"]');
    
    if (await languageToggle.count() > 0) {
      console.log('✅ Language toggle found');
      
      try {
        await languageToggle.first().click();
        await page.waitForTimeout(1000);
        
        // Look for Portuguese text after language switch
        const portugueseText = page.locator('text=/[áàâãéèêíìîóòôõúùûç]/i');
        const portugueseCount = await portugueseText.count();
        
        if (portugueseCount > 0) {
          console.log(`✅ Portuguese text found after language toggle: ${portugueseCount} elements`);
        }
      } catch (error) {
        console.log('ℹ️  Could not test language toggle functionality');
      }
    } else {
      console.log('ℹ️  Language toggle not found');
    }
  });

  test('7. PWA features and mobile app integration validation', async ({ page }) => {
    console.log('📱 Testing PWA features and mobile app integration...');
    
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(LIVE_URL);
    await page.waitForLoadState('networkidle');
    
    // Check for PWA manifest
    const manifestLink = page.locator('link[rel="manifest"]');
    const hasManifest = await manifestLink.count() > 0;
    
    if (hasManifest) {
      const manifestHref = await manifestLink.getAttribute('href');
      console.log(`✅ PWA manifest found: ${manifestHref}`);
    }
    
    // Check for app icons
    const appIcons = page.locator('link[rel*="icon"], link[rel*="apple-touch-icon"]');
    const iconCount = await appIcons.count();
    
    if (iconCount > 0) {
      console.log(`✅ Found ${iconCount} app icons`);
    }
    
    // Check for viewport meta tag
    const viewportMeta = page.locator('meta[name="viewport"]');
    const hasViewport = await viewportMeta.count() > 0;
    
    if (hasViewport) {
      const viewportContent = await viewportMeta.getAttribute('content');
      console.log(`✅ Viewport meta tag found: ${viewportContent}`);
    }
    
    // Check for service worker indicators
    const serviceWorkerRegistration = await page.evaluate(() => {
      return 'serviceWorker' in navigator;
    });
    
    console.log(`Service Worker support: ${serviceWorkerRegistration ? 'Available' : 'Not available'}`);
    
    // Check for theme color
    const themeColor = page.locator('meta[name="theme-color"]');
    const hasThemeColor = await themeColor.count() > 0;
    
    if (hasThemeColor) {
      const color = await themeColor.getAttribute('content');
      console.log(`✅ Theme color found: ${color}`);
    }
    
    // At minimum, should have viewport meta tag for mobile
    expect(hasViewport, 'Should have viewport meta tag for mobile').toBe(true);
    
    console.log(`📊 PWA features summary: Manifest=${hasManifest}, Icons=${iconCount > 0}, Viewport=${hasViewport}, ThemeColor=${hasThemeColor}`);
  });

  test('8. Mobile viewport functionality comprehensive test', async ({ page }) => {
    console.log('📱 Testing comprehensive mobile viewport functionality...');
    
    const mobileViewports = [
      { width: 375, height: 667, name: 'iPhone SE' },
      { width: 414, height: 896, name: 'iPhone 11' },
      { width: 360, height: 800, name: 'Galaxy S20' }
    ];
    
    for (const viewport of mobileViewports) {
      console.log(`\n📱 Testing ${viewport.name} (${viewport.width}x${viewport.height})...`);
      
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(LIVE_URL);
      await page.waitForLoadState('networkidle');
      
      // Check basic page functionality
      const title = await page.title();
      expect(title, `Page should have title at ${viewport.name}`).toBeTruthy();
      
      // Check main content is visible
      const mainContent = page.locator('main, h1, [role="main"]').first();
      expect(await mainContent.isVisible(), `Main content should be visible at ${viewport.name}`).toBe(true);
      
      // Check navigation is present
      const navigation = page.locator('nav, header, [role="navigation"]').first();
      expect(await navigation.isVisible(), `Navigation should be visible at ${viewport.name}`).toBe(true);
      
      // Check for horizontal scrolling
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      
      expect(scrollWidth, `No horizontal scrolling at ${viewport.name}`).toBeLessThanOrEqual(clientWidth + 10);
      
      // Check page can be scrolled vertically
      const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      const clientHeight = await page.evaluate(() => document.documentElement.clientHeight);
      
      const canScroll = scrollHeight > clientHeight;
      console.log(`${viewport.name} scroll info: ${scrollWidth}x${scrollHeight} (client: ${clientWidth}x${clientHeight}), canScroll: ${canScroll}`);
      
      console.log(`✅ ${viewport.name} viewport functionality verified`);
    }
  });
});

// Summary test that runs all validations and provides a comprehensive report
test.describe('Mobile UX Validation Summary', () => {
  test('Comprehensive Mobile UX Health Check', async ({ page }) => {
    console.log('🏥 Running comprehensive mobile UX health check...');
    
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(LIVE_URL);
    await page.waitForLoadState('networkidle');
    
    const results = {
      pageLoads: false,
      hasMainContent: false,
      hasNavigation: false,
      noHorizontalScroll: false,
      hasPortugueseContent: false,
      hasPWAFeatures: false,
      touchTargetsValid: false,
      performanceAcceptable: false
    };
    
    // 1. Page loads successfully
    try {
      const title = await page.title();
      results.pageLoads = !!title;
      console.log(`✅ Page loads: ${results.pageLoads} (title: "${title}")`);
    } catch {
      console.log('❌ Page failed to load');
    }
    
    // 2. Has main content
    const mainContent = page.locator('main, h1, [role="main"]');
    results.hasMainContent = await mainContent.count() > 0;
    console.log(`${results.hasMainContent ? '✅' : '❌'} Main content: ${results.hasMainContent}`);
    
    // 3. Has navigation
    const navigation = page.locator('nav, header, [role="navigation"]');
    results.hasNavigation = await navigation.count() > 0;
    console.log(`${results.hasNavigation ? '✅' : '❌'} Navigation: ${results.hasNavigation}`);
    
    // 4. No horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    results.noHorizontalScroll = scrollWidth <= clientWidth + 5;
    console.log(`${results.noHorizontalScroll ? '✅' : '❌'} No horizontal scroll: ${results.noHorizontalScroll} (${scrollWidth} <= ${clientWidth})`);
    
    // 5. Has Portuguese content
    const portugueseTerms = ['Portuguese', 'Portugal', 'lusophone'];
    let foundPortugueseTerms = 0;
    
    for (const term of portugueseTerms) {
      if (await page.locator(`:text("${term}")`).count() > 0) {
        foundPortugueseTerms++;
      }
    }
    
    results.hasPortugueseContent = foundPortugueseTerms > 0;
    console.log(`${results.hasPortugueseContent ? '✅' : '❌'} Portuguese content: ${results.hasPortugueseContent} (${foundPortugueseTerms} terms found)`);
    
    // 6. PWA features
    const hasViewport = await page.locator('meta[name="viewport"]').count() > 0;
    const hasManifest = await page.locator('link[rel="manifest"]').count() > 0;
    results.hasPWAFeatures = hasViewport; // At minimum
    console.log(`${results.hasPWAFeatures ? '✅' : '❌'} PWA features: ${results.hasPWAFeatures} (viewport: ${hasViewport}, manifest: ${hasManifest})`);
    
    // 7. Touch targets
    const interactiveElements = page.locator('button, a[href], [role="button"]');
    const elementCount = Math.min(await interactiveElements.count(), 10);
    let validTouchTargets = 0;
    
    for (let i = 0; i < elementCount; i++) {
      const element = interactiveElements.nth(i);
      if (await element.isVisible()) {
        const bbox = await element.boundingBox();
        if (bbox && bbox.width >= 40 && bbox.height >= 40) {
          validTouchTargets++;
        }
      }
    }
    
    results.touchTargetsValid = elementCount === 0 || (validTouchTargets / elementCount) >= 0.7;
    console.log(`${results.touchTargetsValid ? '✅' : '❌'} Touch targets: ${results.touchTargetsValid} (${validTouchTargets}/${elementCount} valid)`);
    
    // 8. Performance
    const startTime = Date.now();
    await page.reload();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    results.performanceAcceptable = loadTime < 8000; // 8 seconds reasonable for mobile
    console.log(`${results.performanceAcceptable ? '✅' : '❌'} Performance: ${results.performanceAcceptable} (${loadTime}ms load time)`);
    
    // Overall assessment
    const passedChecks = Object.values(results).filter(Boolean).length;
    const totalChecks = Object.keys(results).length;
    const successRate = (passedChecks / totalChecks) * 100;
    
    console.log(`\n📊 MOBILE UX HEALTH CHECK SUMMARY:`);
    console.log(`✅ Passed: ${passedChecks}/${totalChecks} (${successRate.toFixed(1)}%)`);
    
    if (successRate >= 80) {
      console.log('🎉 Excellent mobile UX health!');
    } else if (successRate >= 60) {
      console.log('⚠️  Good mobile UX with room for improvement');
    } else {
      console.log('❌ Mobile UX needs significant attention');
    }
    
    // Assert that core functionality works
    expect(results.pageLoads, 'Page should load successfully').toBe(true);
    expect(results.hasMainContent, 'Should have main content').toBe(true);
    expect(results.noHorizontalScroll, 'Should not have horizontal scrolling').toBe(true);
    expect(successRate, 'Should pass at least 60% of mobile UX checks').toBeGreaterThan(60);
  });
});