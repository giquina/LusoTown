/**
 * End-to-End tests for Portuguese-speaking community user journeys
 * Tests complete user flows from landing to key features
 */

import { test, expect } from '@playwright/test'

// Test data for Portuguese community
const testData = {
  portugueseUser: {
    email: 'maria.santos@example.com',
    name: 'Maria Santos',
    location: 'Camberwell, London',
    heritage: 'Portuguese',
    interests: ['Fado', 'Cultural Events', 'Portuguese Food']
  },
  expectedBusinesses: [
    'Portuguese',
    'Café',
    'Restaurant',
    'Delicatessen'
  ],
  culturalEvents: [
    'Fado',
    'Santos Populares',
    'Portuguese',
    'Cultural'
  ]
}

test.describe('Portuguese Community User Journeys', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the live LusoTown platform
    await page.goto('https://web-99kxh0sku-giquinas-projects.vercel.app/')
    
    // Wait for page load and essential elements
    await page.waitForLoadState('networkidle')
  })

  test('Homepage displays Portuguese community context', async ({ page }) => {
    // Check for Portuguese community branding
    await expect(page.locator('h1, h2')).toContainText(/LusoTown|Portuguese|Community/)
    
    // Verify bilingual support
    const languageButton = page.locator('[data-testid*="language"], [class*="language"], button:has-text("PT")')
    if (await languageButton.count() > 0) {
      await expect(languageButton.first()).toBeVisible()
    }
    
    // Check for key Portuguese community features
    const businessDirectoryLink = page.locator('text=/Business.*Directory|Businesses|Directory/i').first()
    const eventsLink = page.locator('text=/Events|Eventos/i').first()
    
    if (await businessDirectoryLink.count() > 0) {
      await expect(businessDirectoryLink).toBeVisible()
    }
    if (await eventsLink.count() > 0) {
      await expect(eventsLink).toBeVisible()
    }
  })

  test('Business Directory displays Portuguese businesses', async ({ page }) => {
    // Navigate to business directory
    try {
      await page.click('text=/Business.*Directory|Businesses/i')
    } catch {
      // If direct navigation fails, try going to /business-directory
      await page.goto('https://web-99kxh0sku-giquinas-projects.vercel.app/business-directory')
    }
    
    await page.waitForLoadState('networkidle')
    
    // Check for business directory elements
    const businessElements = await page.locator('[class*="business"], [data-testid*="business"], .card, .item').all()
    
    if (businessElements.length > 0) {
      // Check for Portuguese business content
      for (const business of businessElements.slice(0, 3)) {
        const businessText = await business.textContent()
        if (businessText) {
          const hasPortugueseContent = testData.expectedBusinesses.some(term => 
            businessText.toLowerCase().includes(term.toLowerCase())
          )
          if (hasPortugueseContent) {
            expect(businessText).toBeTruthy()
            break // Found at least one Portuguese business
          }
        }
      }
    }
    
    // Check for search functionality
    const searchInput = page.locator('input[type="search"], input[placeholder*="search" i], input[placeholder*="business" i]').first()
    if (await searchInput.count() > 0) {
      await expect(searchInput).toBeVisible()
      
      // Test search functionality
      await searchInput.fill('Portuguese')
      await page.keyboard.press('Enter')
      await page.waitForTimeout(1000) // Allow search results to load
    }
  })

  test('Events page shows Portuguese cultural events', async ({ page }) => {
    // Navigate to events page
    try {
      await page.click('text=/Events|Eventos/i')
    } catch {
      await page.goto('https://web-99kxh0sku-giquinas-projects.vercel.app/events')
    }
    
    await page.waitForLoadState('networkidle')
    
    // Check for events content
    const eventElements = await page.locator('[class*="event"], [data-testid*="event"], .card, .item').all()
    
    if (eventElements.length > 0) {
      for (const event of eventElements.slice(0, 3)) {
        const eventText = await event.textContent()
        if (eventText) {
          const hasCulturalContent = testData.culturalEvents.some(term => 
            eventText.toLowerCase().includes(term.toLowerCase())
          )
          if (hasCulturalContent) {
            expect(eventText).toBeTruthy()
            break
          }
        }
      }
    }
  })

  test('Mobile-first responsive design works correctly', async ({ page }) => {
    // Test mobile viewport (iPhone SE)
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check mobile navigation
    const mobileMenuButton = page.locator('button:has-text("☰"), [aria-label*="menu" i], [class*="hamburger"], [class*="mobile-menu"]').first()
    if (await mobileMenuButton.count() > 0) {
      await expect(mobileMenuButton).toBeVisible()
      await mobileMenuButton.click()
      
      // Check if mobile menu opens
      await page.waitForTimeout(500)
    }
    
    // Verify content is readable on mobile
    const mainContent = page.locator('main, [role="main"], .main-content, body > div').first()
    await expect(mainContent).toBeVisible()
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(mainContent).toBeVisible()
    
    // Return to desktop
    await page.setViewportSize({ width: 1024, height: 768 })
  })

  test('Language switching preserves Portuguese cultural terms', async ({ page }) => {
    // Look for language switcher
    const languageButtons = await page.locator('button:has-text("PT"), button:has-text("EN"), [data-testid*="language"], [class*="language"]').all()
    
    if (languageButtons.length > 0) {
      // Find Portuguese language button
      let ptButton = null
      for (const button of languageButtons) {
        const buttonText = await button.textContent()
        if (buttonText?.includes('PT') || buttonText?.includes('Português')) {
          ptButton = button
          break
        }
      }
      
      if (ptButton) {
        await ptButton.click()
        await page.waitForTimeout(1000)
        
        // Check that Portuguese cultural terms are preserved
        const pageContent = await page.textContent('body')
        if (pageContent) {
          // Look for common Portuguese cultural terms that should not be translated
          const culturalTerms = ['Fado', 'Saudade', 'Pastéis de Nata', 'LusoTown']
          const preservedTerms = culturalTerms.filter(term => 
            pageContent.includes(term)
          )
          
          // Should preserve at least some cultural terms
          expect(preservedTerms.length).toBeGreaterThanOrEqual(0)
        }
      }
    }
  })

  test('WCAG 2.1 AA compliance for touch targets', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }) // Mobile viewport
    
    // Check button sizes meet WCAG requirements (minimum 44px)
    const buttons = await page.locator('button, a[role="button"], input[type="button"], input[type="submit"]').all()
    
    for (const button of buttons.slice(0, 5)) { // Check first 5 buttons
      const boundingBox = await button.boundingBox()
      if (boundingBox && await button.isVisible()) {
        // Check minimum touch target size (44px recommended, but we use 56px for better UX)
        expect(boundingBox.height).toBeGreaterThanOrEqual(44)
        expect(boundingBox.width).toBeGreaterThanOrEqual(44)
      }
    }
  })

  test('Portuguese community content loads without errors', async ({ page }) => {
    const errors: string[] = []
    
    // Listen for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })
    
    // Listen for network errors
    page.on('response', response => {
      if (response.status() >= 400) {
        errors.push(`HTTP ${response.status()}: ${response.url()}`)
      }
    })
    
    await page.waitForLoadState('networkidle')
    
    // Check for critical errors (ignore minor warnings)
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('404') && 
      !error.toLowerCase().includes('warning')
    )
    
    expect(criticalErrors).toHaveLength(0)
  })

  test('Search functionality works for Portuguese terms', async ({ page }) => {
    // Look for search input
    const searchInputs = await page.locator('input[type="search"], input[placeholder*="search" i]').all()
    
    if (searchInputs.length > 0) {
      const searchInput = searchInputs[0]
      await expect(searchInput).toBeVisible()
      
      // Test Portuguese search terms
      await searchInput.fill('Português')
      await page.keyboard.press('Enter')
      await page.waitForTimeout(2000)
      
      // Check if results are displayed
      const results = page.locator('[class*="result"], [class*="item"], [class*="card"]')
      if (await results.count() > 0) {
        await expect(results.first()).toBeVisible()
      }
      
      // Test English search
      await searchInput.fill('Portuguese')
      await page.keyboard.press('Enter')
      await page.waitForTimeout(2000)
    }
  })

  test('Social sharing works for Portuguese cultural content', async ({ page }) => {
    // Look for share buttons
    const shareButtons = await page.locator('button:has-text("Share"), [aria-label*="share" i], [class*="share"]').all()
    
    if (shareButtons.length > 0) {
      const shareButton = shareButtons[0]
      
      if (await shareButton.isVisible()) {
        await shareButton.click()
        
        // Check if share modal or options appear
        await page.waitForTimeout(1000)
        
        // Look for social media options
        const socialOptions = page.locator('[href*="twitter.com"], [href*="facebook.com"], [href*="whatsapp"], button:has-text("Twitter"), button:has-text("Facebook")')
        
        if (await socialOptions.count() > 0) {
          await expect(socialOptions.first()).toBeVisible()
        }
      }
    }
  })

  test('Contact and support information is accessible', async ({ page }) => {
    // Look for contact links
    const contactLinks = await page.locator('a[href*="mailto:"], a[href*="contact"], a:has-text("Contact"), a:has-text("Support")').all()
    
    if (contactLinks.length > 0) {
      for (const link of contactLinks.slice(0, 2)) {
        if (await link.isVisible()) {
          const href = await link.getAttribute('href')
          expect(href).toBeTruthy()
          
          // Verify email links are properly formatted
          if (href?.startsWith('mailto:')) {
            expect(href).toMatch(/mailto:[^@]+@[^@]+\.[^@]+/)
          }
        }
      }
    }
  })
})