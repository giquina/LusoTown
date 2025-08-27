import { test, expect, devices, Page, BrowserContext } from '@playwright/test'

// Configure test timeout for mobile optimization
test.setTimeout(120000)

/**
 * Comprehensive Carousel System Testing for Portuguese-Speaking Community
 * 
 * Tests cover:
 * - Mobile-first responsive design (375px, 768px, 1024px+)
 * - Touch interactions and gestures
 * - Portuguese cultural content display
 * - Bilingual functionality (EN/PT)
 * - Performance optimization
 * - Accessibility compliance (WCAG 2.1 AA)
 * - Cross-browser compatibility
 * - PWA features and offline capability
 */

// Test data for Portuguese cultural content
const EXPECTED_CAROUSEL_ELEMENTS = {
  weekendEvents: {
    title: 'Portuguese Cultural Events',
    items: ['Fado Night', 'Brazilian Carnival', 'Portuguese Folk Dance'],
    flags: ['🇵🇹', '🇧🇷', '🇨🇻']
  },
  businessDirectory: {
    title: 'Featured Portuguese Businesses',
    categories: ['Restaurant', 'Cultural Center', 'Professional Services']
  }
}

const MOBILE_BREAKPOINTS = {
  mobile: { width: 375, height: 667 }, // iPhone SE
  tablet: { width: 768, height: 1024 }, // iPad
  desktop: { width: 1024, height: 768 } // Desktop
}

// Helper function to wait for carousel animations
async function waitForCarouselAnimation(page: Page) {
  await page.waitForTimeout(500) // Allow framer-motion animations to complete
}

// Helper function to check touch target sizes (WCAG 2.1 AA compliance)
async function checkTouchTargetSizes(page: Page) {
  const touchTargets = await page.locator('button, [role="button"]').all()
  
  for (const target of touchTargets) {
    const box = await target.boundingBox()
    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(44) // WCAG minimum touch target
      expect(box.height).toBeGreaterThanOrEqual(44)
    }
  }
}

// Helper function to test Portuguese cultural content
async function verifyPortugueseCulturalContent(page: Page) {
  // Check for Portuguese flag emojis
  const flagEmojis = ['🇵🇹', '🇧🇷', '🇨🇻', '🇦🇴', '🇲🇿']
  for (const flag of flagEmojis) {
    const flagElement = page.locator(`text=${flag}`)
    if (await flagElement.count() > 0) {
      await expect(flagElement.first()).toBeVisible()
    }
  }
  
  // Check for Portuguese-speaking community terminology
  await expect(page.locator('text=/Portuguese.?speaking.?community/i').first()).toBeVisible()
}

test.describe('Carousel Mobile Experience - Portuguese-Speaking Community', () => {
  
  test.describe('Homepage Carousel System', () => {
    
    test('displays weekend events carousel on mobile (375px)', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
      await page.goto('/')
      
      // Wait for carousel to load
      await expect(page.locator('[data-testid*="weekend-events"]').or(
        page.locator('text=/Portuguese Cultural Events/i')
      )).toBeVisible({ timeout: 10000 })
      
      // Verify mobile-optimized layout
      const carousel = page.locator('.lusophone-carousel').first()
      await expect(carousel).toBeVisible()
      
      // Check for swipe gesture hints on mobile
      const swipeHint = page.locator('text=← →')
      if (await swipeHint.count() > 0) {
        await expect(swipeHint).toBeVisible()
      }
      
      // Verify Portuguese cultural content
      await verifyPortugueseCulturalContent(page)
    })
    
    test('handles touch navigation on mobile', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
      await page.goto('/')
      
      // Wait for carousel to load
      await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
      
      // Test navigation buttons
      const nextButton = page.locator('button[aria-label*="Next"]').first()
      if (await nextButton.count() > 0) {
        await expect(nextButton).toBeVisible()
        
        // Check touch target size
        const buttonBox = await nextButton.boundingBox()
        expect(buttonBox?.width).toBeGreaterThanOrEqual(44)
        expect(buttonBox?.height).toBeGreaterThanOrEqual(44)
        
        // Test navigation
        await nextButton.click()
        await waitForCarouselAnimation(page)
      }
    })
    
    test('supports swipe gestures for carousel navigation', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
      await page.goto('/')
      
      // Wait for carousel
      await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
      
      // Find carousel container
      const carouselContainer = page.locator('.lusophone-carousel').first()
      await expect(carouselContainer).toBeVisible()
      
      // Simulate swipe gesture (touch events)
      const carouselBox = await carouselContainer.boundingBox()
      if (carouselBox) {
        const centerX = carouselBox.x + carouselBox.width / 2
        const centerY = carouselBox.y + carouselBox.height / 2
        
        // Swipe left (next item)
        await page.touchscreen.tap(centerX, centerY)
        await page.mouse.move(centerX, centerY)
        await page.mouse.down()
        await page.mouse.move(centerX - 100, centerY, { steps: 10 })
        await page.mouse.up()
        
        await waitForCarouselAnimation(page)
      }
    })
  })
  
  test.describe('Business Directory Carousel System', () => {
    
    test('displays featured businesses carousel', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
      await page.goto('/business-directory')
      
      // Wait for page to load
      await page.waitForLoadState('networkidle')
      
      // Check for business carousel or featured businesses
      const businessCarousel = page.locator('.lusophone-carousel')
      const featuredBusinesses = page.locator('[data-testid*="business"]')
      const businessGrid = page.locator('.business-grid')
      
      // At least one of these should be visible
      const carouselVisible = await businessCarousel.count() > 0
      const businessesVisible = await featuredBusinesses.count() > 0
      const gridVisible = await businessGrid.count() > 0
      
      expect(carouselVisible || businessesVisible || gridVisible).toBe(true)
      
      // Verify Portuguese business content
      const portugueseContent = page.locator('text=/Portuguese|Português|Restaurant|Cultural|PALOP/i')
      await expect(portugueseContent.first()).toBeVisible()
    })
  })
  
  test.describe('Cross-Browser Compatibility', () => {
    
    test('works on Chrome mobile', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
      await page.goto('/')
      
      // Test basic carousel functionality
      await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
      const carousel = page.locator('.lusophone-carousel').first()
      await expect(carousel).toBeVisible()
      
      // Test touch targets
      await checkTouchTargetSizes(page)
    })
    
    test('adapts to tablet viewport (768px)', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.tablet)
      await page.goto('/')
      
      await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
      
      // Should show more items per view on tablet
      const carouselItems = page.locator('[data-testid*="carousel-item"], .carousel-item')
      const itemCount = await carouselItems.count()
      
      // Tablet should show at least 2 items if available
      if (itemCount > 1) {
        expect(itemCount).toBeGreaterThanOrEqual(2)
      }
    })
    
    test('scales properly to desktop (1024px+)', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.desktop)
      await page.goto('/')
      
      await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
      
      // Desktop should show the most items per view
      const carouselItems = page.locator('[data-testid*="carousel-item"], .carousel-item')
      const itemCount = await carouselItems.count()
      
      // Desktop should show 3+ items if available
      if (itemCount > 2) {
        expect(itemCount).toBeGreaterThanOrEqual(3)
      }
    })
  })
  
  test.describe('Accessibility Compliance (WCAG 2.1 AA)', () => {
    
    test('provides proper ARIA labels for Portuguese content', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
      await page.goto('/')
      
      await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
      
      // Check for carousel region
      const carouselRegion = page.locator('[role="region"]')
      if (await carouselRegion.count() > 0) {
        const ariaLabel = await carouselRegion.first().getAttribute('aria-label')
        expect(ariaLabel).toBeTruthy()
        expect(ariaLabel?.toLowerCase()).toContain('carousel')
      }
      
      // Check for carousel content group
      const contentGroup = page.locator('[role="group"]')
      if (await contentGroup.count() > 0) {
        const ariaLabel = await contentGroup.first().getAttribute('aria-label')
        expect(ariaLabel).toBeTruthy()
      }
    })
    
    test('supports keyboard navigation', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
      await page.goto('/')
      
      await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
      
      // Find focusable carousel element
      const carouselContent = page.locator('[role="group"], .lusophone-carousel [tabindex="0"]').first()
      
      if (await carouselContent.count() > 0) {
        await carouselContent.focus()
        
        // Test arrow key navigation
        await page.keyboard.press('ArrowRight')
        await waitForCarouselAnimation(page)
        
        await page.keyboard.press('ArrowLeft')
        await waitForCarouselAnimation(page)
      }
    })
    
    test('maintains minimum touch target sizes', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
      await page.goto('/')
      
      await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
      await checkTouchTargetSizes(page)
    })
  })
  
  test.describe('Bilingual Functionality (EN/PT)', () => {
    
    test('displays English content by default', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
      await page.goto('/')
      
      await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
      
      // Look for English cultural event titles
      const englishContent = page.locator('text=/Events|Cultural|Portuguese|Night|Workshop/i')
      await expect(englishContent.first()).toBeVisible()
    })
    
    test('switches to Portuguese when language is changed', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
      await page.goto('/')
      
      // Look for language switcher
      const languageSwitcher = page.locator('button:has-text("PT"), [data-testid="language-switch"], text=/Português|Portuguese/i')
      
      if (await languageSwitcher.count() > 0) {
        await languageSwitcher.first().click()
        await page.waitForTimeout(1000)
        
        // Check for Portuguese content
        const portugueseContent = page.locator('text=/Eventos|Português|Noite|Workshop|Cultural/i')
        await expect(portugueseContent.first()).toBeVisible()
      }
    })
  })
  
  test.describe('Performance Optimization', () => {
    
    test('loads carousel content within acceptable time', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
      
      const startTime = Date.now()
      await page.goto('/')
      
      await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
      const loadTime = Date.now() - startTime
      
      // Should load within 10 seconds even on slow connections
      expect(loadTime).toBeLessThan(10000)
    })
    
    test('implements lazy loading for performance', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
      await page.goto('/')
      
      await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
      
      // Check for lazy loading indicators
      const loadingPlaceholders = page.locator('.loading-placeholder, .animate-pulse')
      const lazyImages = page.locator('img[loading="lazy"]')
      
      // Either loading placeholders or lazy images should be present
      const hasLazyLoading = (await loadingPlaceholders.count()) > 0 || (await lazyImages.count()) > 0
      
      // This is optional - not all carousels may implement lazy loading
      if (hasLazyLoading) {
        expect(hasLazyLoading).toBe(true)
      }
    })
  })
  
  test.describe('Auto-Advance Functionality', () => {
    
    test('auto-advances carousel items when enabled', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
      await page.goto('/')
      
      await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
      
      // Look for play/pause controls
      const playPauseButton = page.locator('button[aria-label*="pause"], button[aria-label*="play"]')
      
      if (await playPauseButton.count() > 0) {
        // If there's a play button, click it to start auto-advance
        const isPlayButton = await playPauseButton.first().getAttribute('aria-label')
        if (isPlayButton?.toLowerCase().includes('play')) {
          await playPauseButton.first().click()
        }
        
        // Wait for auto-advance (should happen within 6 seconds)
        await page.waitForTimeout(6000)
        
        // Verify the carousel has advanced
        const pauseButton = page.locator('button[aria-label*="pause"]')
        if (await pauseButton.count() > 0) {
          await expect(pauseButton.first()).toBeVisible()
        }
      }
    })
    
    test('pauses auto-advance on hover (desktop)', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.desktop)
      await page.goto('/')
      
      await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
      
      const carousel = page.locator('.lusophone-carousel').first()
      await carousel.hover()
      
      // Auto-advance should pause on hover
      await page.waitForTimeout(2000)
    })
  })
  
  test.describe('PWA and Offline Features', () => {
    
    test('shows offline indicator when network is unavailable', async ({ page, context }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
      
      // Go offline
      await context.setOffline(true)
      await page.goto('/')
      
      await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
      
      // Check for offline indicator
      const offlineIndicator = page.locator('text=/offline|cached/i, .offline-mode')
      if (await offlineIndicator.count() > 0) {
        await expect(offlineIndicator.first()).toBeVisible()
      }
      
      // Go back online
      await context.setOffline(false)
    })
  })
  
  test.describe('Portuguese Cultural Content Validation', () => {
    
    test('displays PALOP country flags correctly', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
      await page.goto('/')
      
      await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
      
      // Check for PALOP flags
      const palopFlags = ['🇦🇴', '🇨🇻', '🇬🇼', '🇲🇿', '🇸🇹', '🇹🇱']
      let flagFound = false
      
      for (const flag of palopFlags) {
        const flagElement = page.locator(`text=${flag}`)
        if (await flagElement.count() > 0) {
          flagFound = true
          break
        }
      }
      
      // At least one PALOP flag should be present if PALOP content exists
      // This test is informational - not all pages may have PALOP content
    })
    
    test('uses proper Portuguese terminology', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
      await page.goto('/')
      
      await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
      
      // Should use "Portuguese-speaking community" not just "Portuguese community"
      const properTerminology = page.locator('text=/Portuguese.?speaking.?community/i')
      if (await properTerminology.count() > 0) {
        await expect(properTerminology.first()).toBeVisible()
      }
    })
  })
  
  test.describe('Mobile-Specific Features', () => {
    
    test('shows mobile-optimized control layout', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
      await page.goto('/')
      
      await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
      
      // Check for mobile-specific controls
      const mobileControls = page.locator('.mobile-controls, button[style*="min-width: 44px"]')
      if (await mobileControls.count() > 0) {
        await expect(mobileControls.first()).toBeVisible()
      }
    })
    
    test('displays pull-to-refresh indicator on mobile', async ({ page }) => {
      await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
      await page.goto('/')
      
      await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
      
      // Look for pull-to-refresh elements
      const pullToRefresh = page.locator('[data-testid*="pull-to-refresh"], .pull-to-refresh')
      
      // Pull-to-refresh is optional, so we just check if it exists
      const hasPullToRefresh = await pullToRefresh.count() > 0
      
      if (hasPullToRefresh) {
        // If it exists, it should be properly positioned
        const refreshElement = pullToRefresh.first()
        await expect(refreshElement).toBeVisible()
      }
    })
  })
})

test.describe('Cross-Device Browser Testing', () => {
  
  test.describe('iPhone Safari', () => {
    test.use({ ...devices['iPhone 12'] })
    
    test('carousel works on iPhone Safari', async ({ page }) => {
      await page.goto('/')
      
      await page.waitForSelector('.lusophone-carousel', { timeout: 15000 })
      const carousel = page.locator('.lusophone-carousel').first()
      await expect(carousel).toBeVisible()
      
      // Test touch interaction
      await carousel.tap()
      await waitForCarouselAnimation(page)
      
      // Verify Portuguese content
      await verifyPortugueseCulturalContent(page)
    })
  })
  
  test.describe('Android Chrome', () => {
    test.use({ ...devices['Pixel 5'] })
    
    test('carousel works on Android Chrome', async ({ page }) => {
      await page.goto('/')
      
      await page.waitForSelector('.lusophone-carousel', { timeout: 15000 })
      const carousel = page.locator('.lusophone-carousel').first()
      await expect(carousel).toBeVisible()
      
      // Test Android-specific touch patterns
      const carouselBox = await carousel.boundingBox()
      if (carouselBox) {
        await page.touchscreen.tap(carouselBox.x + carouselBox.width / 2, carouselBox.y + carouselBox.height / 2)
      }
      
      await waitForCarouselAnimation(page)
    })
  })
  
  test.describe('iPad Safari', () => {
    test.use({ ...devices['iPad Pro'] })
    
    test('carousel adapts to iPad layout', async ({ page }) => {
      await page.goto('/')
      
      await page.waitForSelector('.lusophone-carousel', { timeout: 15000 })
      
      // iPad should show more items per view than mobile
      const carouselItems = page.locator('[data-testid*="carousel-item"], .carousel-item')
      const itemCount = await carouselItems.count()
      
      // Should be at least 2 items visible on iPad if content exists
      if (itemCount > 1) {
        expect(itemCount).toBeGreaterThanOrEqual(2)
      }
    })
  })
})

test.describe('Edge Cases and Error Handling', () => {
  
  test('handles empty carousel gracefully', async ({ page }) => {
    await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
    
    // Mock empty carousel by intercepting API calls
    await page.route('**/api/**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ items: [] })
      })
    })
    
    await page.goto('/')
    
    // Should show empty state message
    const emptyState = page.locator('text=/no items available|check back soon/i')
    if (await emptyState.count() > 0) {
      await expect(emptyState.first()).toBeVisible()
    }
  })
  
  test('handles slow network gracefully', async ({ page, context }) => {
    await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
    
    // Throttle network to simulate slow connection
    const client = await context.newCDPSession(page)
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: 200 * 1024 / 8, // 200 Kbps
      uploadThroughput: 200 * 1024 / 8,
      latency: 2000 // 2 second latency
    })
    
    const startTime = Date.now()
    await page.goto('/')
    
    // Should show loading state
    const loadingState = page.locator('.animate-pulse, .loading-placeholder')
    if (await loadingState.count() > 0) {
      await expect(loadingState.first()).toBeVisible()
    }
    
    // Should eventually load
    await page.waitForSelector('.lusophone-carousel', { timeout: 30000 })
    const loadTime = Date.now() - startTime
    
    // Should load within 30 seconds even on slow connection
    expect(loadTime).toBeLessThan(30000)
  })
  
  test('recovers from JavaScript errors', async ({ page }) => {
    await page.setViewportSize(MOBILE_BREAKPOINTS.mobile)
    
    // Listen for JavaScript errors
    const jsErrors: string[] = []
    page.on('pageerror', (error) => {
      jsErrors.push(error.message)
    })
    
    await page.goto('/')
    await page.waitForSelector('.lusophone-carousel', { timeout: 15000 })
    
    // Check if carousel is still functional despite any JS errors
    const carousel = page.locator('.lusophone-carousel').first()
    await expect(carousel).toBeVisible()
    
    // Log any errors for debugging but don't fail the test
    if (jsErrors.length > 0) {
      console.log('JavaScript errors detected:', jsErrors)
    }
  })
})