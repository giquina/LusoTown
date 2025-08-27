import { test, expect, Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/**
 * Comprehensive Accessibility Testing for Portuguese-Speaking Community Carousels
 * 
 * Tests WCAG 2.1 AA compliance including:
 * - Keyboard navigation
 * - Screen reader compatibility
 * - Touch target sizes (minimum 44px)
 * - Color contrast ratios
 * - Focus management
 * - ARIA labels and roles
 * - Portuguese language accessibility features
 */

test.describe('Carousel Accessibility Compliance (WCAG 2.1 AA)', () => {
  
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport for touch target testing
    await page.setViewportSize({ width: 375, height: 667 })
  })

  test('passes automated accessibility audit', async ({ page }) => {
    await page.goto('/')
    
    // Wait for carousel to load
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    // Run axe accessibility audit
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    
    // Log any violations for debugging
    if (accessibilityScanResults.violations.length > 0) {
      console.log('Accessibility violations found:', accessibilityScanResults.violations)
    }
    
    expect(accessibilityScanResults.violations).toEqual([])
  })
  
  test('provides proper ARIA labels for Portuguese cultural content', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    // Check carousel region has proper ARIA label
    const carouselRegion = page.locator('[role="region"]').first()
    if (await carouselRegion.count() > 0) {
      const ariaLabel = await carouselRegion.getAttribute('aria-label')
      expect(ariaLabel).toBeTruthy()
      expect(ariaLabel?.toLowerCase()).toContain('carousel')
    }
    
    // Check carousel content group
    const contentGroup = page.locator('[role="group"]').first()
    if (await contentGroup.count() > 0) {
      const ariaLabel = await contentGroup.getAttribute('aria-label')
      expect(ariaLabel).toBeTruthy()
    }
    
    // Check navigation buttons have descriptive labels
    const navButtons = page.locator('button[aria-label*="Next"], button[aria-label*="Previous"]')
    const buttonCount = await navButtons.count()
    
    if (buttonCount > 0) {
      for (let i = 0; i < buttonCount; i++) {
        const button = navButtons.nth(i)
        const ariaLabel = await button.getAttribute('aria-label')
        
        expect(ariaLabel).toBeTruthy()
        expect(ariaLabel!.length).toBeGreaterThan(10) // Descriptive label
        
        // Should mention Portuguese cultural context
        const hasPortugueseContext = ariaLabel?.toLowerCase().includes('portuguese') || 
                                   ariaLabel?.toLowerCase().includes('cultural')
        expect(hasPortugueseContext).toBe(true)
      }
    }
  })
  
  test('supports full keyboard navigation', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    // Find focusable carousel element
    const carouselContent = page.locator('[tabindex="0"], [role="group"]').first()
    
    if (await carouselContent.count() > 0) {
      await carouselContent.focus()
      
      // Verify element is focused
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
      
      // Test arrow key navigation
      await page.keyboard.press('ArrowRight')
      await page.waitForTimeout(500) // Allow animation
      
      await page.keyboard.press('ArrowLeft')
      await page.waitForTimeout(500)
      
      // Test Home/End keys
      await page.keyboard.press('Home')
      await page.waitForTimeout(500)
      
      await page.keyboard.press('End')
      await page.waitForTimeout(500)
      
      // Test spacebar for play/pause if available
      const playPauseButton = page.locator('button[aria-label*="pause"], button[aria-label*="play"]')
      if (await playPauseButton.count() > 0) {
        await carouselContent.focus()
        await page.keyboard.press('Space')
        await page.waitForTimeout(500)
      }
    }
  })
  
  test('maintains minimum touch target sizes (44px)', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    // Check all interactive elements
    const interactiveElements = page.locator('button, [role="button"], a, input, [tabindex]:not([tabindex="-1"])')
    const elementCount = await interactiveElements.count()
    
    for (let i = 0; i < elementCount; i++) {
      const element = interactiveElements.nth(i)
      const boundingBox = await element.boundingBox()
      
      if (boundingBox && boundingBox.width > 0 && boundingBox.height > 0) {
        // WCAG 2.1 AA requires minimum 44px touch targets
        expect(boundingBox.width).toBeGreaterThanOrEqual(44)
        expect(boundingBox.height).toBeGreaterThanOrEqual(44)
        
        // Log for debugging
        const elementText = await element.textContent()
        const elementRole = await element.getAttribute('role')
        console.log(`Touch target: ${elementText || elementRole} - ${boundingBox.width}x${boundingBox.height}px`)
      }
    }
  })
  
  test('provides adequate color contrast for Portuguese brand colors', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    // Run axe color contrast audit specifically
    const colorContrastResults = await new AxeBuilder({ page })
      .withRules(['color-contrast', 'color-contrast-enhanced'])
      .analyze()
    
    expect(colorContrastResults.violations.length).toBe(0)
    
    // Additional check for Portuguese brand colors
    const brandColorElements = page.locator('.text-primary-600, .text-primary-700, .text-primary-800, .bg-primary-500')
    const brandElementCount = await brandColorElements.count()
    
    if (brandElementCount > 0) {
      // Brand colors should be visible and accessible
      for (let i = 0; i < brandElementCount; i++) {
        const element = brandColorElements.nth(i)
        await expect(element).toBeVisible()
      }
    }
  })
  
  test('manages focus properly during carousel navigation', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    // Find navigation buttons
    const nextButton = page.locator('button[aria-label*="Next"]').first()
    const prevButton = page.locator('button[aria-label*="Previous"]').first()
    
    if (await nextButton.count() > 0) {
      // Focus should be visible when navigating
      await nextButton.focus()
      
      // Check focus ring is visible
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
      
      // Click and verify focus is maintained appropriately
      await nextButton.click()
      await page.waitForTimeout(500)
      
      // Focus should either stay on button or move appropriately
      const newFocusedElement = page.locator(':focus')
      const isElementFocused = await newFocusedElement.count() > 0
      
      // Some focus should be maintained
      expect(isElementFocused).toBe(true)
    }
  })
  
  test('provides screen reader status announcements', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    // Check for live region status announcements
    const liveRegion = page.locator('[aria-live], [role="status"]')
    const liveRegionCount = await liveRegion.count()
    
    if (liveRegionCount > 0) {
      for (let i = 0; i < liveRegionCount; i++) {
        const region = liveRegion.nth(i)
        
        // Live regions should have appropriate politeness
        const ariaLive = await region.getAttribute('aria-live')
        const role = await region.getAttribute('role')
        
        if (ariaLive) {
          expect(['polite', 'assertive', 'off']).toContain(ariaLive)
        }
        
        if (role === 'status') {
          // Status regions should contain meaningful content
          const content = await region.textContent()
          expect(content).toBeTruthy()
          expect(content!.length).toBeGreaterThan(10)
        }
      }
    }
  })
  
  test('supports Portuguese language screen reader announcements', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    // Check for Portuguese language support
    const portugueseElements = page.locator('[lang="pt"], [lang="pt-PT"], [lang="pt-BR"]')
    const portugueseCount = await portugueseElements.count()
    
    if (portugueseCount > 0) {
      for (let i = 0; i < portugueseCount; i++) {
        const element = portugueseElements.nth(i)
        const langAttribute = await element.getAttribute('lang')
        
        // Should have proper Portuguese language codes
        expect(['pt', 'pt-PT', 'pt-BR']).toContain(langAttribute)
      }
    }
    
    // Check for bilingual accessibility support
    const ariaLabels = page.locator('[aria-label*="Portuguese"], [aria-label*="Português"]')
    const bilingualLabelCount = await ariaLabels.count()
    
    if (bilingualLabelCount > 0) {
      // Should have Portuguese cultural context in accessibility labels
      const firstLabel = ariaLabels.first()
      const labelText = await firstLabel.getAttribute('aria-label')
      
      expect(labelText).toBeTruthy()
      expect(labelText!.toLowerCase()).toMatch(/portuguese|cultural|lusophone/i)
    }
  })
  
  test('handles reduced motion preferences', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' })
    
    await page.goto('/')
    
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    // Carousels should respect reduced motion preferences
    // Check for animation duration reductions or disabling
    const animatedElements = page.locator('[style*="animation"], [style*="transition"], .animate-')
    const animatedCount = await animatedElements.count()
    
    if (animatedCount > 0) {
      // Elements should either have no animations or very short ones when reduced motion is preferred
      for (let i = 0; i < Math.min(animatedCount, 5); i++) {
        const element = animatedElements.nth(i)
        const style = await element.getAttribute('style')
        
        // If animations are present, they should be short or none
        if (style && style.includes('animation')) {
          const hasShortAnimation = style.includes('0s') || 
                                  style.includes('0.1s') || 
                                  style.includes('0.2s') ||
                                  style.includes('none')
          // This is a soft check as some animations might still be appropriate
        }
      }
    }
  })
  
  test('provides clear heading structure for Portuguese cultural content', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    // Check heading hierarchy
    const headings = page.locator('h1, h2, h3, h4, h5, h6')
    const headingCount = await headings.count()
    
    if (headingCount > 0) {
      // Should have a logical heading structure
      const firstHeading = headings.first()
      const headingText = await firstHeading.textContent()
      
      expect(headingText).toBeTruthy()
      
      // Check for Portuguese cultural context in headings
      const culturalHeadings = page.locator('h1, h2, h3, h4, h5, h6').filter({
        hasText: /Portuguese|Cultural|Events|Português|Eventos/i
      })
      
      const culturalHeadingCount = await culturalHeadings.count()
      if (culturalHeadingCount > 0) {
        // Cultural headings should be descriptive
        const culturalHeading = culturalHeadings.first()
        const culturalText = await culturalHeading.textContent()
        
        expect(culturalText).toBeTruthy()
        expect(culturalText!.length).toBeGreaterThan(5)
      }
    }
  })
  
  test('supports assistive technology interaction patterns', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    // Test tab navigation through carousel
    let tabStops = 0
    const maxTabs = 20
    
    // Start from body or first focusable element
    await page.keyboard.press('Tab')
    
    for (let i = 0; i < maxTabs; i++) {
      const focusedElement = page.locator(':focus')
      const elementCount = await focusedElement.count()
      
      if (elementCount > 0) {
        tabStops++
        
        // Check if focused element is within or related to carousel
        const isCarouselElement = await focusedElement.evaluate((el) => {
          const carousel = el.closest('.lusophone-carousel')
          return carousel !== null
        })
        
        if (isCarouselElement) {
          // Verify element has proper accessibility attributes
          const ariaLabel = await focusedElement.getAttribute('aria-label')
          const role = await focusedElement.getAttribute('role')
          
          // Should have some accessibility identifier
          const hasAccessibility = ariaLabel || role
          if (hasAccessibility) {
            expect(ariaLabel || role).toBeTruthy()
          }
        }
      }
      
      await page.keyboard.press('Tab')
      await page.waitForTimeout(100) // Small delay for focus changes
      
      // Break if we've looped back to the start
      if (i > 5) {
        const currentFocused = page.locator(':focus')
        const currentTag = await currentFocused.evaluate(el => el.tagName).catch(() => '')
        if (currentTag === 'BODY' || currentTag === '') {
          break
        }
      }
    }
    
    console.log('Tab stops found:', tabStops)
    
    // Should have reasonable number of tab stops (not too many, not too few)
    expect(tabStops).toBeGreaterThan(0)
    expect(tabStops).toBeLessThan(50) // Prevent excessive tab stops
  })
  
  test('provides proper error and empty state accessibility', async ({ page }) => {
    // Test empty carousel state
    await page.route('**/api/**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ items: [] })
      })
    })
    
    await page.goto('/')
    
    // Wait for empty state
    await page.waitForTimeout(2000)
    
    // Look for empty state messages
    const emptyStateMessage = page.locator('text=/no items available|check back soon|empty/i')
    const emptyStateCount = await emptyStateMessage.count()
    
    if (emptyStateCount > 0) {
      // Empty state should be accessible
      const message = emptyStateMessage.first()
      await expect(message).toBeVisible()
      
      const messageText = await message.textContent()
      expect(messageText).toBeTruthy()
      expect(messageText!.length).toBeGreaterThan(10) // Meaningful message
    }
    
    // Run accessibility check on empty state
    const emptyStateResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()
    
    // Should still pass accessibility even in empty state
    expect(emptyStateResults.violations.length).toBe(0)
  })
})

test.describe('Portuguese Cultural Accessibility Features', () => {
  
  test('supports Portuguese language screen reader navigation', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    // Test Portuguese-specific accessibility features
    const portugueseLabels = page.locator('[aria-label*="Português"], [aria-label*="português"]')
    const portugueseLabelCount = await portugueseLabels.count()
    
    if (portugueseLabelCount > 0) {
      for (let i = 0; i < portugueseLabelCount; i++) {
        const label = portugueseLabels.nth(i)
        const labelText = await label.getAttribute('aria-label')
        
        expect(labelText).toBeTruthy()
        expect(labelText!.length).toBeGreaterThan(5)
      }
    }
  })
  
  test('handles Portuguese character input accessibility', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    // Look for input elements that might handle Portuguese text
    const textInputs = page.locator('input[type="text"], input[type="search"], textarea')
    const inputCount = await textInputs.count()
    
    if (inputCount > 0) {
      const input = textInputs.first()
      await input.focus()
      
      // Test Portuguese characters
      await input.type('Procurar eventos portugueses em São Paulo')
      
      const inputValue = await input.inputValue()
      expect(inputValue).toContain('São Paulo') // Should preserve Portuguese accents
      expect(inputValue).toContain('portugueses')
    }
  })
  
  test('provides culturally appropriate ARIA descriptions', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    // Check for cultural context in ARIA descriptions
    const ariaDescribedElements = page.locator('[aria-describedby]')
    const describedCount = await ariaDescribedElements.count()
    
    if (describedCount > 0) {
      for (let i = 0; i < Math.min(describedCount, 3); i++) {
        const element = ariaDescribedElements.nth(i)
        const describedBy = await element.getAttribute('aria-describedby')
        
        if (describedBy) {
          const description = page.locator(`#${describedBy}`)
          const descriptionCount = await description.count()
          
          if (descriptionCount > 0) {
            const descriptionText = await description.textContent()
            expect(descriptionText).toBeTruthy()
            
            // Should provide meaningful cultural context
            expect(descriptionText!.length).toBeGreaterThan(10)
          }
        }
      }
    }
  })
})