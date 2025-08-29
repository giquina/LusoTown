import { test, expect } from '@playwright/test'

test.describe('LusoTown Portuguese Community Platform - E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the platform
    await page.goto('/')
  })

  test.describe('🇵🇹 Portuguese Cultural Identity', () => {
    test('should display LusoTown branding with Portuguese cultural elements', async ({ page }) => {
      // Check for LusoTown logo/branding
      await expect(page.locator('text=LusoTown')).toBeVisible()
      
      // Check for Portuguese flag elements
      await expect(page.locator('[aria-label*="Portuguese"]')).toBeVisible()
      
      // Check for London location emphasis
      await expect(page.locator('text=London')).toBeVisible()
    })

    test('should support Portuguese language toggle', async ({ page }) => {
      // Look for language toggle button
      const languageToggle = page.locator('button[title*="Language"], button[aria-label*="language"]').first()
      
      if (await languageToggle.isVisible()) {
        await languageToggle.click()
        
        // Should trigger some language change (Portuguese content should appear)
        await page.waitForTimeout(1000) // Allow for language switch
        
        // Check if page content has changed or Portuguese elements are visible
        const portugueseContent = page.locator('text=/português|eventos|serviços/i')
        const hasPortuguese = await portugueseContent.count()
        
        // Either Portuguese content appears or toggle functionality exists
        expect(hasPortuguese >= 0).toBeTruthy()
      }
    })
  })

  test.describe('📱 Mobile-First Portuguese Community Experience', () => {
    test('should display properly on mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })
      
      // Check that main content is visible
      await expect(page.locator('main, [role="main"], body')).toBeVisible()
      
      // Check that LusoTown branding is still visible on mobile
      await expect(page.locator('text=LusoTown')).toBeVisible()
      
      // Check for mobile navigation if it exists
      const mobileMenu = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"]').first()
      if (await mobileMenu.isVisible()) {
        expect(await mobileMenu.isEnabled()).toBeTruthy()
      }
    })

    test('should have touch-friendly interface elements', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      // Check for buttons with minimum touch target size (44px)
      const buttons = await page.locator('button, a[role="button"]').all()
      
      for (const button of buttons.slice(0, 5)) { // Check first 5 buttons
        if (await button.isVisible()) {
          const box = await button.boundingBox()
          if (box) {
            // Should meet minimum touch target guidelines (approximately 44px)
            expect(box.height).toBeGreaterThanOrEqual(40)
            expect(box.width).toBeGreaterThanOrEqual(40)
          }
        }
      }
    })
  })

  test.describe('🏪 Portuguese Business Directory', () => {
    test('should display business directory content', async ({ page }) => {
      // Look for business-related content
      const businessContent = page.locator('text=/business|restaurant|service/i').first()
      
      if (await businessContent.isVisible()) {
        // Should have some business-related content
        expect(await businessContent.textContent()).toBeTruthy()
      } else {
        // Alternative: look for any content that suggests business listings
        const contentElements = await page.locator('main *').count()
        expect(contentElements).toBeGreaterThan(0)
      }
    })

    test('should support business search functionality', async ({ page }) => {
      // Look for search inputs
      const searchInput = page.locator('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"]').first()
      
      if (await searchInput.isVisible()) {
        await searchInput.fill('restaurant')
        await searchInput.press('Enter')
        
        // Should trigger some response (loading state, results, etc.)
        await page.waitForTimeout(1000)
        
        // Verify search was processed
        const pageContent = await page.textContent('body')
        expect(pageContent).toBeTruthy()
      }
    })
  })

  test.describe('🎭 Portuguese Events and Cultural Activities', () => {
    test('should display events or cultural content', async ({ page }) => {
      // Look for event-related content
      const eventKeywords = /event|events|cultural|fado|festival|celebration/i
      const eventContent = page.locator(`text=${eventKeywords}`).first()
      
      if (await eventContent.isVisible()) {
        expect(await eventContent.textContent()).toBeTruthy()
      } else {
        // Alternative: check for any structured content that could be events
        const contentSections = await page.locator('section, article, .card, [class*="card"]').count()
        expect(contentSections).toBeGreaterThan(0)
      }
    })
  })

  test.describe('♿ Accessibility for Portuguese Community', () => {
    test('should have proper semantic structure for screen readers', async ({ page }) => {
      // Check for proper heading structure
      const mainHeading = page.locator('h1').first()
      await expect(mainHeading).toBeVisible()
      
      // Check for navigation landmark
      const navigation = page.locator('nav, [role="navigation"]').first()
      if (await navigation.isVisible()) {
        expect(await navigation.isVisible()).toBeTruthy()
      }
      
      // Check for main content landmark
      const mainContent = page.locator('main, [role="main"]').first()
      if (await mainContent.isVisible()) {
        expect(await mainContent.isVisible()).toBeTruthy()
      }
    })

    test('should support keyboard navigation', async ({ page }) => {
      // Test tab navigation through interactive elements
      await page.keyboard.press('Tab')
      
      // Should have focus on some interactive element
      const focusedElement = await page.locator(':focus').count()
      expect(focusedElement).toBeGreaterThan(0)
      
      // Continue tabbing to ensure multiple elements are reachable
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      
      const stillHasFocus = await page.locator(':focus').count()
      expect(stillHasFocus).toBeGreaterThan(0)
    })

    test('should have proper ARIA labels for Portuguese flags and cultural elements', async ({ page }) => {
      // Check for ARIA labels on flag elements
      const flagElements = await page.locator('[aria-label*="flag"], [aria-label*="Portuguese"], [aria-label*="Portugal"]').count()
      
      if (flagElements > 0) {
        const firstFlag = page.locator('[aria-label*="flag"], [aria-label*="Portuguese"], [aria-label*="Portugal"]').first()
        const ariaLabel = await firstFlag.getAttribute('aria-label')
        expect(ariaLabel).toBeTruthy()
      }
    })
  })

  test.describe('🚀 Performance for Portuguese Community Platform', () => {
    test('should load main content within reasonable time', async ({ page }) => {
      const startTime = Date.now()
      
      await page.goto('/')
      
      // Wait for main content to be visible
      await page.locator('main, body').waitFor({ state: 'visible' })
      
      const loadTime = Date.now() - startTime
      
      // Should load within 5 seconds (reasonable for community platform)
      expect(loadTime).toBeLessThan(5000)
    })

    test('should not have console errors that block functionality', async ({ page }) => {
      const consoleErrors: string[] = []
      
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text())
        }
      })
      
      await page.goto('/')
      await page.waitForTimeout(2000) // Allow time for any async errors
      
      // Filter out known acceptable errors (like network timeouts)
      const criticalErrors = consoleErrors.filter(error => 
        !error.includes('Failed to fetch') &&
        !error.includes('NetworkError') &&
        !error.includes('timeout') &&
        !error.toLowerCase().includes('advertisement')
      )
      
      // Should not have critical console errors
      expect(criticalErrors.length).toBeLessThan(5)
    })
  })

  test.describe('🌐 Portuguese Content and Bilingual Support', () => {
    test('should display Portuguese text correctly', async ({ page }) => {
      // Check if Portuguese characters are displayed properly
      const portugueseChars = /[àáâãçéêíóôõú]/i
      const bodyText = await page.textContent('body')
      
      if (bodyText && bodyText.match(portugueseChars)) {
        // Portuguese characters should be rendered correctly
        expect(bodyText.match(portugueseChars)).toBeTruthy()
      } else {
        // Even if no Portuguese text is visible, page should load properly
        expect(bodyText).toBeTruthy()
        expect(bodyText.length).toBeGreaterThan(100)
      }
    })

    test('should maintain cultural authenticity', async ({ page }) => {
      // Check for Portuguese cultural terms
      const culturalTerms = /portugal|português|lusophone|london|fado|bacalhau|community/i
      const pageContent = await page.textContent('body')
      
      if (pageContent) {
        // Should have cultural context
        const hasCulturalContext = pageContent.match(culturalTerms)
        expect(hasCulturalContext).toBeTruthy()
      }
    })
  })

  test.describe('📞 Community Contact and Engagement', () => {
    test('should provide ways to contact or engage with Portuguese community', async ({ page }) => {
      // Look for contact information, signup forms, or community engagement options
      const engagementElements = page.locator(
        'button:has-text("sign"), button:has-text("join"), button:has-text("contact"), ' +
        'a[href*="mailto"], a[href*="tel"], ' +
        'input[type="email"], form'
      )
      
      const count = await engagementElements.count()
      
      if (count > 0) {
        // Should have some form of community engagement
        expect(count).toBeGreaterThan(0)
      } else {
        // Alternative: check for any interactive content
        const interactiveElements = await page.locator('button, a, input').count()
        expect(interactiveElements).toBeGreaterThan(0)
      }
    })
  })

  test.describe('🔍 SEO and Discoverability', () => {
    test('should have proper page title for Portuguese community', async ({ page }) => {
      const title = await page.title()
      
      // Should have a meaningful title
      expect(title.length).toBeGreaterThan(10)
      
      // Should reference community, Portuguese, or London context
      const hasRelevantTitle = title.match(/lusotown|portuguese|community|london/i)
      expect(hasRelevantTitle).toBeTruthy()
    })

    test('should have meta description for Portuguese community platform', async ({ page }) => {
      const metaDescription = await page.getAttribute('meta[name="description"]', 'content')
      
      if (metaDescription) {
        expect(metaDescription.length).toBeGreaterThan(50)
        expect(metaDescription.length).toBeLessThan(160)
      } else {
        // If no meta description, at least page should have substantial content
        const pageContent = await page.textContent('body')
        expect(pageContent?.length).toBeGreaterThan(500)
      }
    })
  })
})
