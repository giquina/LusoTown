import { test, expect } from '@playwright/test'

test.describe('Production Deployment Audit', () => {
  const baseURL = 'https://web-iyd68me4y-giquinas-projects.vercel.app'
  
  test('Homepage loads and welcome popup appears', async ({ page }) => {
    await page.goto(baseURL)
    await page.waitForLoadState('networkidle')
    
    // Take screenshot of homepage
    await page.screenshot({ path: 'homepage-audit.png', fullPage: true })
    
    // Check if welcome popup shows
    const welcomePopup = page.locator('[data-testid="welcome-popup"], .welcome-popup')
    console.log('Welcome popup found:', await welcomePopup.count())
    
    // Check for "Unidos pela Língua" messaging
    const unidosText = await page.locator('text=Unidos pela Língua').count()
    console.log('Unidos pela Língua found:', unidosText)
    
    // Check flag flow animation
    const flags = await page.locator('text=🇵🇹').count()
    console.log('Portuguese flags found:', flags)
    
    expect(page.locator('h1')).toBeVisible()
  })

  test('Check all membership application pages', async ({ page }) => {
    const membershipPages = [
      '/cultural-membership',
      '/social-membership', 
      '/business-membership',
      '/community-membership',
      '/membership-success'
    ]
    
    for (const path of membershipPages) {
      console.log(`Testing: ${baseURL}${path}`)
      const response = await page.goto(`${baseURL}${path}`)
      
      if (response?.status() === 404) {
        console.log(`❌ 404 Error: ${path}`)
      } else if (response?.status() === 200) {
        console.log(`✅ Page loads: ${path}`)
        
        // Check for heritage selector on membership pages
        if (path.includes('membership') && !path.includes('success')) {
          const heritageSelector = await page.locator('[data-testid="heritage-selector"], .heritage-selector').count()
          console.log(`Heritage selector found on ${path}:`, heritageSelector)
        }
      } else {
        console.log(`⚠️ Status ${response?.status()}: ${path}`)
      }
      
      await page.screenshot({ path: `page-${path.replace('/', '')}.png` })
    }
  })

  test('Check lusophone experience page', async ({ page }) => {
    const testPath = '/lusophone-experience'
    console.log(`Testing: ${baseURL}${testPath}`)
    const response = await page.goto(`${baseURL}${testPath}`)
    console.log(`Status: ${response?.status()} for ${testPath}`)
  })

  test('Footer and navigation audit', async ({ page }) => {
    await page.goto(baseURL)
    await page.waitForLoadState('networkidle')
    
    // Check footer exists
    const footer = await page.locator('footer').count()
    console.log('Footer found:', footer)
    
    // Check navigation links
    const navLinks = await page.locator('nav a, header a').count()
    console.log('Navigation links found:', navLinks)
    
    // Test a few key navigation items
    const keyLinks = ['Events', 'Business Directory', 'Community', 'Pricing']
    for (const link of keyLinks) {
      const linkCount = await page.locator(`text=${link}`).count()
      console.log(`"${link}" links found:`, linkCount)
    }
  })

  test('Check for new components and translations', async ({ page }) => {
    await page.goto(baseURL)
    
    // Check for Portuguese-speaking messaging
    const portugueseSpeaking = await page.locator('text=Portuguese-speaking').count()
    console.log('Portuguese-speaking references:', portugueseSpeaking)
    
    // Check for PALOP references
    const palop = await page.locator('text=PALOP').count()
    console.log('PALOP references found:', palop)
    
    // Check for lusophone references
    const lusophone = await page.locator('text=lusophone, text=Lusophone').count()
    console.log('Lusophone references found:', lusophone)
    
    // Check if LusophoneTestimonials component exists
    const testimonials = await page.locator('[data-testid="lusophone-testimonials"], .lusophone-testimonials').count()
    console.log('Lusophone testimonials component:', testimonials)
  })

  test('Mobile welcome wizard audit', async ({ page, isMobile }) => {
    if (!isMobile) {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })
    }
    
    await page.goto(baseURL)
    
    // Scroll to trigger mobile welcome wizard
    await page.evaluate(() => window.scrollTo(0, 600))
    await page.waitForTimeout(31000) // Wait for 30 second trigger + buffer
    
    const mobileWizard = await page.locator('[data-testid="mobile-welcome-wizard"], .mobile-welcome-wizard').count()
    console.log('Mobile welcome wizard found:', mobileWizard)
    
    // Check if enhanced wizard exists
    const enhancedWizard = await page.locator('[data-testid="enhanced-wizard"], .enhanced-wizard').count()
    console.log('Enhanced mobile wizard found:', enhancedWizard)
  })
})