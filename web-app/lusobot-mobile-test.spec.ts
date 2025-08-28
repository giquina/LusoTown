import { test, expect, devices } from '@playwright/test'

// Mobile device configurations for Portuguese-speaking community testing
const mobileDevices = [
  { device: devices['iPhone 12'], name: 'iPhone 12' },
  { device: devices['Galaxy S21'], name: 'Galaxy S21' },
  { device: devices['iPad Pro'], name: 'iPad Pro' }
]

mobileDevices.forEach(({ device, name }) => {
  test.describe(`LusoBot Widget Mobile Tests - ${name}`, () => {
    test.use({ ...device })

    test(`LusoBot widget should be visible and clickable on ${name}`, async ({ page }) => {
      console.log(`Testing LusoBot widget on ${name}...`)
      
      // Navigate to homepage
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
      
      // Wait for page to load and hydrate
      await page.waitForTimeout(3000)
      
      // Check if LusoBot widget exists
      const lusoBotWidget = page.locator('[data-testid="lusobot-widget"]')
      await expect(lusoBotWidget).toBeVisible({ timeout: 10000 })
      
      // Verify widget positioning is mobile-appropriate
      const widgetBox = await lusoBotWidget.boundingBox()
      expect(widgetBox).toBeTruthy()
      
      if (widgetBox) {
        // Widget should be in bottom-right area
        const viewportSize = page.viewportSize()
        if (viewportSize) {
          expect(widgetBox.x + widgetBox.width).toBeGreaterThan(viewportSize.width * 0.7)
          expect(widgetBox.y + widgetBox.height).toBeGreaterThan(viewportSize.height * 0.7)
        }
      }
      
      // Take screenshot before clicking
      await page.screenshot({ 
        path: `lusobot-mobile-before-${name.toLowerCase().replace(' ', '-')}.png`,
        fullPage: true 
      })
      
      // Check for floating action button
      const fabButton = lusoBotWidget.locator('button').first()
      await expect(fabButton).toBeVisible()
      
      // Verify Portuguese heritage indicator
      const heritageIndicator = fabButton.locator('text=🇵🇹')
      await expect(heritageIndicator).toBeVisible()
      
      // Verify accessibility attributes
      await expect(fabButton).toHaveAttribute('aria-label')
      const ariaLabel = await fabButton.getAttribute('aria-label')
      expect(ariaLabel).toMatch(/LusoBot|Portuguese/i)
      
      // Click the widget to open chat
      await fabButton.click()
      await page.waitForTimeout(2000)
      
      // Verify chat interface opens
      const chatDialog = page.locator('[role="dialog"]')
      await expect(chatDialog).toBeVisible({ timeout: 5000 })
      
      // Check chat header
      const chatHeader = chatDialog.locator('text=LusoBot')
      await expect(chatHeader).toBeVisible()
      
      // Verify Portuguese cultural assistant description
      const assistantDescription = chatDialog.locator('text=/Portuguese.*Cultural.*Assistant/i')
      await expect(assistantDescription).toBeVisible()
      
      // Check for minimize and close buttons with proper touch targets
      const minimizeButton = chatDialog.locator('button[aria-label*="Minimize"], button[aria-label*="Minimizar"]')
      const closeButton = chatDialog.locator('button[aria-label*="Close"], button[aria-label*="Fechar"]')
      
      await expect(minimizeButton).toBeVisible()
      await expect(closeButton).toBeVisible()
      
      // Verify button dimensions meet touch target requirements (44px minimum)
      const minimizeBox = await minimizeButton.boundingBox()
      const closeBox = await closeButton.boundingBox()
      
      expect(minimizeBox?.width).toBeGreaterThanOrEqual(44)
      expect(minimizeBox?.height).toBeGreaterThanOrEqual(44)
      expect(closeBox?.width).toBeGreaterThanOrEqual(44)
      expect(closeBox?.height).toBeGreaterThanOrEqual(44)
      
      // Check input field and send button
      const messageInput = chatDialog.locator('input[type="text"]')
      const sendButton = chatDialog.locator('button').last()
      
      await expect(messageInput).toBeVisible()
      await expect(sendButton).toBeVisible()
      
      // Verify send button touch target
      const sendBox = await sendButton.boundingBox()
      expect(sendBox?.width).toBeGreaterThanOrEqual(44)
      expect(sendBox?.height).toBeGreaterThanOrEqual(44)
      
      // Test typing in Portuguese
      await messageInput.fill('Olá! Sou novo no Reino Unido')
      await expect(messageInput).toHaveValue('Olá! Sou novo no Reino Unido')
      
      // Take screenshot after opening chat
      await page.screenshot({ 
        path: `lusobot-mobile-open-${name.toLowerCase().replace(' ', '-')}.png`,
        fullPage: true 
      })
      
      // Test minimize functionality
      await minimizeButton.click()
      await page.waitForTimeout(1000)
      
      // Verify minimized state
      const minimizedChat = chatDialog.locator('text=LusoBot').first()
      await expect(minimizedChat).toBeVisible()
      
      // Test maximize functionality
      const maximizeButton = chatDialog.locator('button[aria-label*="Maximize"], button').first()
      await maximizeButton.click()
      await page.waitForTimeout(1000)
      
      // Verify expanded state
      await expect(messageInput).toBeVisible()
      
      // Test close functionality
      await closeButton.click()
      await page.waitForTimeout(1000)
      
      // Verify chat is closed
      await expect(chatDialog).not.toBeVisible()
      
      // Verify FAB is visible again
      await expect(fabButton).toBeVisible()
      
      console.log(`✅ LusoBot widget test passed on ${name}`)
    })

    test(`LusoBot widget positioning with App Download Bar on ${name}`, async ({ page }) => {
      // Navigate to homepage
      await page.goto('http://localhost:3000')
      await page.waitForTimeout(5000) // Wait for app download bar to appear
      
      // Check if app download bar is visible
      const appBar = page.locator('[role="banner"]', { hasText: /App.*Available|App.*Disponível/i })
      
      let appBarHeight = 0
      if (await appBar.isVisible()) {
        const appBarBox = await appBar.boundingBox()
        appBarHeight = appBarBox?.height || 0
      }
      
      // Check LusoBot widget positioning
      const lusoBotWidget = page.locator('[data-testid="lusobot-widget"]')
      await expect(lusoBotWidget).toBeVisible()
      
      const widgetBox = await lusoBotWidget.boundingBox()
      if (widgetBox && appBarHeight > 0) {
        // Widget should be positioned above app bar
        expect(widgetBox.y + widgetBox.height).toBeLessThan(page.viewportSize()!.height - appBarHeight)
      }
      
      // Take screenshot showing widget positioning with app bar
      await page.screenshot({
        path: `lusobot-mobile-with-appbar-${name.toLowerCase().replace(' ', '-')}.png`,
        fullPage: true
      })
    })

    test(`LusoBot widget contextual behavior on different pages - ${name}`, async ({ page }) => {
      // Test on Events page
      await page.goto('http://localhost:3000/events')
      await page.waitForTimeout(2000)
      
      const lusoBotWidget = page.locator('[data-testid="lusobot-widget"]')
      await expect(lusoBotWidget).toBeVisible()
      
      // Check for events-specific context
      const pageRole = await lusoBotWidget.getAttribute('data-page-role')
      expect(pageRole).toBe('events-guide')
      
      // Test on Business Directory page
      await page.goto('http://localhost:3000/business-directory')
      await page.waitForTimeout(2000)
      
      await expect(lusoBotWidget).toBeVisible()
      const businessPageRole = await lusoBotWidget.getAttribute('data-page-role')
      expect(businessPageRole).toBe('business-advisor')
      
      // Test on Homepage
      await page.goto('http://localhost:3000')
      await page.waitForTimeout(2000)
      
      await expect(lusoBotWidget).toBeVisible()
      const homePageRole = await lusoBotWidget.getAttribute('data-page-role')
      expect(homePageRole).toBe('community-guide')
    })

    test(`LusoBot widget keyboard navigation on ${name}`, async ({ page }) => {
      await page.goto('http://localhost:3000')
      await page.waitForTimeout(2000)
      
      const lusoBotWidget = page.locator('[data-testid="lusobot-widget"]')
      const fabButton = lusoBotWidget.locator('button').first()
      
      // Focus the widget with keyboard
      await fabButton.focus()
      
      // Verify focus indicator
      await expect(fabButton).toBeFocused()
      
      // Open with Enter key
      await page.keyboard.press('Enter')
      await page.waitForTimeout(1000)
      
      // Verify chat opens
      const chatDialog = page.locator('[role="dialog"]')
      await expect(chatDialog).toBeVisible()
      
      // Test Tab navigation within chat
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      
      // Should eventually reach message input
      const messageInput = chatDialog.locator('input[type="text"]')
      await expect(messageInput).toBeFocused()
      
      // Test Escape to close
      await page.keyboard.press('Escape')
      await page.waitForTimeout(1000)
      
      // Chat should close and focus should return to FAB
      await expect(chatDialog).not.toBeVisible()
      await expect(fabButton).toBeFocused()
    })
  })
})

test.describe('LusoBot Widget Cross-Page Tests', () => {
  test.use(devices['iPhone 12'])

  test('Widget should not appear on dedicated LusoBot pages', async ({ page }) => {
    // Navigate to dedicated LusoBot page (should not show widget)
    await page.goto('http://localhost:3000/lusobot')
    await page.waitForTimeout(2000)
    
    // Widget should not be visible on this page
    const lusoBotWidget = page.locator('[data-testid="lusobot-widget"]')
    await expect(lusoBotWidget).not.toBeVisible()
  })

  test('Widget persistence across navigation', async ({ page }) => {
    // Start on homepage
    await page.goto('http://localhost:3000')
    await page.waitForTimeout(2000)
    
    const lusoBotWidget = page.locator('[data-testid="lusobot-widget"]')
    await expect(lusoBotWidget).toBeVisible()
    
    // Navigate to events page
    await page.click('a[href="/events"]')
    await page.waitForTimeout(2000)
    
    // Widget should still be visible
    await expect(lusoBotWidget).toBeVisible()
    
    // Check contextual update
    const pageRole = await lusoBotWidget.getAttribute('data-page-role')
    expect(pageRole).toBe('events-guide')
  })
})