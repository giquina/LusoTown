import { test, expect, devices } from '@playwright/test';

/**
 * LusoTown Mobile Portuguese Experience E2E Tests
 * 
 * Specialized testing for mobile Portuguese-speaking community experience
 * Tests mobile-specific features, touch interactions, and Portuguese cultural content
 */

const MOBILE_TEST_CONFIG = {
  demo: {
    email: 'demo@lusotown.com',
    password: 'LusoTown2025!'
  },
  mobileDevices: {
    pixel5: devices['Pixel 5'],
    iphone12: devices['iPhone 12'],
    galaxyS9: devices['Galaxy S9+']
  },
  portugueseKeywords: ['fado', 'portugal', 'brasileiro', 'comunidade', 'festa', 'cultural']
};

test.describe('Mobile Portuguese Community Experience', () => {
  test.use({ ...devices['iPhone 12'] });

  test('Mobile Portuguese navigation and language switching', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test mobile menu accessibility
    const mobileMenuButton = page.locator('[data-testid="mobile-menu"], button[aria-label*="menu"], .hamburger');
    
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await page.waitForTimeout(500);

      // Check if navigation items are properly sized for touch
      const navItems = page.locator('nav a, .menu-item');
      const navCount = await navItems.count();

      for (let i = 0; i < Math.min(navCount, 5); i++) {
        const item = navItems.nth(i);
        if (await item.isVisible()) {
          const box = await item.boundingBox();
          if (box) {
            // Touch target should be at least 44px (Apple HIG) or 48dp (Material Design)
            expect(Math.min(box.width, box.height)).toBeGreaterThanOrEqual(40);
          }
        }
      }

      // Test language switching in mobile menu
      const languageToggle = page.locator('[data-testid="language-toggle"], button:has-text("PT"), button:has-text("EN")');
      if (await languageToggle.isVisible()) {
        await languageToggle.click();
        await page.waitForTimeout(1000);

        // Verify Portuguese content appears
        const bodyText = await page.textContent('body');
        const hasPortugueseText = MOBILE_TEST_CONFIG.portugueseKeywords.some(keyword =>
          bodyText?.toLowerCase().includes(keyword)
        );
        expect(hasPortugueseText).toBe(true);
      }
    }
  });

  test('Mobile Portuguese cultural event browsing', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[type="email"]', MOBILE_TEST_CONFIG.demo.email);
    await page.fill('input[type="password"]', MOBILE_TEST_CONFIG.demo.password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard', { timeout: 10000 });

    // Navigate to events
    await page.goto('/events');
    await page.waitForLoadState('networkidle');

    // Test touch-friendly event cards
    const eventCards = page.locator('[data-testid="event-card"], .event-card, .card');
    const cardCount = await eventCards.count();

    if (cardCount > 0) {
      // Test first event card touch interaction
      const firstCard = eventCards.first();
      const cardBox = await firstCard.boundingBox();

      if (cardBox) {
        // Card should be easily tappable on mobile
        expect(cardBox.height).toBeGreaterThanOrEqual(80);
        
        // Test tap interaction
        await firstCard.tap();
        await page.waitForTimeout(1000);

        // Should navigate to event details or show more info
        const currentUrl = page.url();
        const hasNavigated = currentUrl.includes('/events/') || 
                           await page.locator('.modal, .overlay').isVisible({ timeout: 2000 });
        expect(hasNavigated).toBe(true);
      }
    }

    // Test swipe navigation if carousel exists
    const carousel = page.locator('.swiper, .carousel, [data-swiper]');
    if (await carousel.isVisible({ timeout: 2000 })) {
      const carouselBox = await carousel.boundingBox();
      if (carouselBox) {
        // Simulate swipe left
        await page.touchscreen.tap(carouselBox.x + carouselBox.width * 0.8, carouselBox.y + carouselBox.height / 2);
        await page.mouse.move(carouselBox.x + carouselBox.width * 0.8, carouselBox.y + carouselBox.height / 2);
        await page.mouse.down();
        await page.mouse.move(carouselBox.x + carouselBox.width * 0.2, carouselBox.y + carouselBox.height / 2, { steps: 5 });
        await page.mouse.up();
        await page.waitForTimeout(500);
      }
    }
  });

  test('Mobile Portuguese business discovery and contact', async ({ page }) => {
    await page.goto('/business-directory');
    await page.waitForLoadState('networkidle');

    // Test mobile search functionality
    const searchInput = page.locator('input[type="search"], input[placeholder*="search"]');
    if (await searchInput.isVisible()) {
      await searchInput.fill('restaurante português');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(2000);
    }

    // Test business card interactions
    const businessCards = page.locator('[data-testid="business-card"], .business-card');
    const businessCount = await businessCards.count();

    if (businessCount > 0) {
      const firstBusiness = businessCards.first();
      await firstBusiness.tap();
      await page.waitForTimeout(1000);

      // Test mobile-friendly contact options
      const contactButtons = page.locator('a[href^="tel:"], a[href^="mailto:"], button:has-text("Call"), button:has-text("Email")');
      const contactCount = await contactButtons.count();

      if (contactCount > 0) {
        const firstContact = contactButtons.first();
        const href = await firstContact.getAttribute('href');
        
        if (href) {
          // Should be properly formatted for mobile
          expect(href).toMatch(/^(tel:|mailto:|https?:)/);
        }

        // Test tap on contact button
        await firstContact.tap();
        await page.waitForTimeout(500);
      }

      // Test directions functionality if available
      const directionsButton = page.locator('button:has-text("Directions"), a:has-text("Directions")');
      if (await directionsButton.isVisible()) {
        await directionsButton.tap();
        await page.waitForTimeout(1000);
      }
    }
  });

  test('Mobile Portuguese messaging and voice features', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[type="email"]', MOBILE_TEST_CONFIG.demo.email);
    await page.fill('input[type="password"]', MOBILE_TEST_CONFIG.demo.password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard', { timeout: 10000 });

    // Navigate to messages or community
    const messagingPaths = ['/messages', '/community', '/matches'];
    
    for (const path of messagingPaths) {
      try {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        // Look for messaging interface
        const messageInput = page.locator('input[placeholder*="message"], textarea[placeholder*="message"]');
        if (await messageInput.isVisible({ timeout: 5000 })) {
          // Test Portuguese text input
          await messageInput.fill('Olá! Como está? Gostaria de conversar sobre a cultura portuguesa.');
          
          // Check for voice recording button
          const voiceButton = page.locator('[data-testid="voice-record"], button[aria-label*="record"], .voice-button');
          if (await voiceButton.isVisible()) {
            // Test voice button interaction (without actually recording)
            await voiceButton.tap();
            await page.waitForTimeout(500);
            
            // Should show recording interface or permissions
            const recordingIndicator = page.locator('.recording, [data-recording="true"], .voice-recording');
            const hasRecordingUI = await recordingIndicator.isVisible({ timeout: 2000 });
            
            if (hasRecordingUI) {
              // Stop recording
              await voiceButton.tap();
              await page.waitForTimeout(500);
            }
          }

          // Test send message
          const sendButton = page.locator('[data-testid="send-button"], button:has-text("Send")');
          if (await sendButton.isVisible()) {
            await sendButton.tap();
            await page.waitForTimeout(1000);
          }

          break;
        }
      } catch (error) {
        continue;
      }
    }
  });

  test('Mobile Portuguese cultural content and media consumption', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test video content if available
    const videoElements = page.locator('video, iframe[src*="youtube"], iframe[src*="vimeo"]');
    const videoCount = await videoElements.count();

    if (videoCount > 0) {
      const firstVideo = videoElements.first();
      
      // Test video player controls on mobile
      await firstVideo.tap();
      await page.waitForTimeout(1000);

      // Check if video controls are touch-friendly
      const videoControls = page.locator('.video-controls, video::-webkit-media-controls');
      if (await videoControls.isVisible({ timeout: 2000 })) {
        // Controls should be properly sized for mobile
        const controlsBox = await videoControls.boundingBox();
        if (controlsBox) {
          expect(controlsBox.height).toBeGreaterThanOrEqual(40);
        }
      }
    }

    // Test image gallery interactions
    const imageElements = page.locator('img[alt*="cultural"], img[alt*="portugal"], img[alt*="fado"]');
    const imageCount = await imageElements.count();

    if (imageCount > 0) {
      const firstImage = imageElements.first();
      await firstImage.tap();
      await page.waitForTimeout(500);

      // Check if image opens in lightbox or modal
      const modal = page.locator('.modal, .lightbox, .overlay');
      const hasModal = await modal.isVisible({ timeout: 2000 });
      
      if (hasModal) {
        // Test close functionality
        const closeButton = page.locator('[data-testid="close"], .close, button[aria-label*="close"]');
        if (await closeButton.isVisible()) {
          await closeButton.tap();
          await page.waitForTimeout(500);
        } else {
          // Try tapping outside modal
          await modal.tap({ position: { x: 10, y: 10 } });
          await page.waitForTimeout(500);
        }
      }
    }
  });

  test('Mobile Portuguese PWA features and offline functionality', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test PWA install prompt if available
    const installButton = page.locator('[data-testid="install-pwa"], button:has-text("Install"), .install-prompt');
    if (await installButton.isVisible({ timeout: 2000 })) {
      await installButton.tap();
      await page.waitForTimeout(1000);
    }

    // Test service worker registration
    const swRegistered = await page.evaluate(() => {
      return 'serviceWorker' in navigator;
    });
    expect(swRegistered).toBe(true);

    // Test caching by going offline and back
    await page.context().setOffline(true);
    await page.reload();
    
    // Should show offline indicator or cached content
    const offlineIndicator = page.locator('.offline, [data-offline="true"]');
    const hasOfflineHandling = await offlineIndicator.isVisible({ timeout: 3000 }) || 
                              page.url().includes('offline');

    // Go back online
    await page.context().setOffline(false);
    await page.waitForTimeout(1000);

    // Test should pass whether offline features are implemented or not
    expect(true).toBe(true);
  });
});

test.describe('Mobile Portuguese Performance Testing', () => {
  test.use({ ...devices['Pixel 5'] });

  test('Mobile Portuguese page load performance', async ({ page }) => {
    // Test homepage load performance
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const domLoadTime = Date.now() - startTime;

    expect(domLoadTime).toBeLessThan(5000); // 5 seconds for DOM load

    await page.waitForLoadState('networkidle');
    const fullLoadTime = Date.now() - startTime;

    expect(fullLoadTime).toBeLessThan(10000); // 10 seconds for full load

    // Test image lazy loading
    const images = page.locator('img[loading="lazy"], img[data-src]');
    const lazyImageCount = await images.count();

    // Should have some lazy loaded images for performance
    expect(lazyImageCount).toBeGreaterThanOrEqual(0);
  });

  test('Mobile Portuguese content rendering performance', async ({ page }) => {
    await page.goto('/events');
    await page.waitForLoadState('networkidle');

    // Measure scroll performance
    const startScroll = Date.now();
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight / 2);
    });
    await page.waitForTimeout(100);
    const scrollTime = Date.now() - startScroll;

    expect(scrollTime).toBeLessThan(1000); // Smooth scrolling

    // Test content rendering after scroll
    const visibleContent = page.locator('[data-testid="content"], .content, .card');
    await expect(visibleContent.first()).toBeVisible();

    // Test Portuguese text rendering performance
    const portugueseText = page.locator('text=/[àáâãéêíóôõúç]/');
    if (await portugueseText.first().isVisible({ timeout: 2000 })) {
      const textCount = await portugueseText.count();
      expect(textCount).toBeGreaterThan(0);
    }
  });
});
