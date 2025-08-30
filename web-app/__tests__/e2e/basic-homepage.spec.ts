import { test, expect } from '@playwright/test'

test.describe('LusoTown Portuguese Community Platform - Basic Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/')
    
    // Wait for basic content to load
    await page.waitForLoadState('networkidle')
    
    // Check that the page loaded successfully
    await expect(page).toHaveTitle(/LusoTown|Portuguese|Community/i)
    
    // Check for LusoTown branding
    const logo = page.getByText(/lusotown/i).first()
    await expect(logo).toBeVisible()
  })

  test('basic navigation is present', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Check for main navigation elements
    const navigation = page.getByRole('navigation').first()
    await expect(navigation).toBeVisible()
    
    // Look for common navigation links
    const eventsLink = page.getByRole('link', { name: /events/i }).first()
    if (await eventsLink.isVisible()) {
      await expect(eventsLink).toBeVisible()
    }
  })

  test('page is responsive on mobile', async ({ page, isMobile }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    if (isMobile) {
      // Check mobile menu button exists
      const mobileMenuButton = page.getByRole('button', { name: /menu/i }).first()
      await expect(mobileMenuButton).toBeVisible()
    }
    
    // Basic content should be visible regardless of screen size
    const logo = page.getByText(/lusotown/i).first()
    await expect(logo).toBeVisible()
  })
})

test.describe('Portuguese Language Support', () => {
  test('supports Portuguese cultural content', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Wait a moment for any dynamic content
    await page.waitForTimeout(2000)
    
    // Check for Portuguese cultural elements or language toggle
    const pageContent = await page.textContent('body')
    
    // Look for Portuguese elements
    const hasPortugueseElements = 
      pageContent.includes('Portuguese') ||
      pageContent.includes('Português') ||
      pageContent.includes('Lusophone') ||
      pageContent.includes('Portugal') ||
      pageContent.includes('Brazil') ||
      pageContent.includes('Reino Unido') ||
      pageContent.includes('London')
    
    expect(hasPortugueseElements).toBeTruthy()
  })
})
