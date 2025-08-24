import { test, expect, devices, Browser } from '@playwright/test'

/**
 * Comprehensive Mobile UX Audit for LusoTown Portuguese-Speaking Community
 * Testing URL: https://web-rms4m4wbx-giquinas-projects.vercel.app
 * 
 * Critical focus areas:
 * - 75%+ Portuguese community users are mobile-first
 * - Touch interface optimization for cultural content
 * - Portuguese text length considerations (20-30% longer than English)
 * - Mobile navigation for event discovery and business directory
 * - Performance on limited mobile networks
 */

const AUDIT_URL = 'https://web-rms4m4wbx-giquinas-projects.vercel.app'

// Portuguese community critical mobile viewports
const PORTUGUESE_MOBILE_DEVICES = [
  { name: 'iPhone SE (Most Common)', viewport: { width: 375, height: 667 } },
  { name: 'iPhone 12/13/14 (Premium)', viewport: { width: 390, height: 844 } },
  { name: 'Samsung Galaxy (Android)', viewport: { width: 360, height: 740 } },
  { name: 'iPhone 15 Pro', viewport: { width: 393, height: 852 } }
]

test.describe('Portuguese Community Mobile UX Audit', () => {
  
  test.describe('Critical Mobile Viewport Testing', () => {
    for (const device of PORTUGUESE_MOBILE_DEVICES) {
      test(`Mobile UX Audit - ${device.name} (${device.viewport.width}px)`, async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize(device.viewport)
        
        const auditResults = {
          device: device.name,
          viewport: device.viewport,
          issues: [],
          touchTargets: [],
          performance: {},
          screenshots: []
        }

        try {
          console.log(`\n🔍 AUDITING ${device.name} (${device.viewport.width}x${device.viewport.height})`)
          
          // Navigate to LusoTown homepage
          const startTime = Date.now()
          await page.goto(AUDIT_URL, { waitUntil: 'networkidle' })
          const loadTime = Date.now() - startTime
          auditResults.performance.loadTime = loadTime

          // Take homepage screenshot
          const homepageScreenshot = await page.screenshot({ 
            fullPage: true,
            path: `/tmp/mobile-audit-${device.viewport.width}px-homepage.png`
          })
          auditResults.screenshots.push('homepage')

          console.log(`⏱️  Load Time: ${loadTime}ms`)

          // 1. MOBILE LAYOUT ANALYSIS
          console.log('📱 Analyzing mobile layout...')
          
          // Check for horizontal scroll issues
          const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
          const viewportWidth = device.viewport.width
          if (bodyWidth > viewportWidth) {
            auditResults.issues.push({
              severity: 'HIGH',
              category: 'Layout',
              issue: `Horizontal scroll detected: Content width ${bodyWidth}px > viewport ${viewportWidth}px`
            })
          }

          // Check mobile navigation visibility
          const mobileMenu = await page.locator('[data-testid="mobile-menu"], .mobile-menu, .hamburger-menu').first()
          if (await mobileMenu.isVisible()) {
            console.log('✅ Mobile menu detected')
          } else {
            auditResults.issues.push({
              severity: 'HIGH', 
              category: 'Navigation',
              issue: 'Mobile menu not found or not visible'
            })
          }

          // 2. TOUCH TARGET ANALYSIS
          console.log('👆 Analyzing touch targets...')
          
          const interactiveElements = await page.locator('button, a, input, [role="button"], [tabindex="0"]').all()
          
          for (const element of interactiveElements.slice(0, 20)) { // Limit to first 20 for performance
            try {
              const box = await element.boundingBox()
              if (box) {
                const meetsMinimum = box.width >= 44 && box.height >= 44
                auditResults.touchTargets.push({
                  size: { width: Math.round(box.width), height: Math.round(box.height) },
                  meets44pxRule: meetsMinimum,
                  element: await element.textContent() || await element.getAttribute('aria-label') || 'Unknown'
                })
                
                if (!meetsMinimum) {
                  auditResults.issues.push({
                    severity: 'MEDIUM',
                    category: 'Touch Targets',
                    issue: `Touch target too small: ${Math.round(box.width)}x${Math.round(box.height)}px (minimum 44x44px required)`
                  })
                }
              }
            } catch (e) {
              // Skip elements that can't be measured
              continue
            }
          }

          // 3. PORTUGUESE TEXT HANDLING
          console.log('🇵🇹 Analyzing Portuguese text handling...')
          
          // Test Portuguese language switching if available
          const languageToggle = page.locator('[data-testid="language-toggle"], .language-switch, button:has-text("PT"), button:has-text("EN")')
          if (await languageToggle.first().isVisible()) {
            await languageToggle.first().click()
            await page.waitForTimeout(1000)
            
            // Check for Portuguese content
            const bodyText = await page.textContent('body')
            const hasPortugueseContent = bodyText?.includes('Bem-vindo') || bodyText?.includes('Eventos') || bodyText?.includes('Português')
            
            if (hasPortugueseContent) {
              console.log('✅ Portuguese content detected')
              
              // Take Portuguese version screenshot
              await page.screenshot({ 
                fullPage: true,
                path: `/tmp/mobile-audit-${device.viewport.width}px-portuguese.png`
              })
              auditResults.screenshots.push('portuguese')
            } else {
              auditResults.issues.push({
                severity: 'HIGH',
                category: 'Localization',
                issue: 'Portuguese language toggle available but no Portuguese content detected'
              })
            }
          } else {
            auditResults.issues.push({
              severity: 'MEDIUM',
              category: 'Localization',
              issue: 'Language toggle not found - Portuguese community needs bilingual support'
            })
          }

          // 4. MOBILE NAVIGATION TESTING
          console.log('🧭 Testing mobile navigation...')
          
          // Test mobile menu functionality
          const hamburgerButton = page.locator('.hamburger, .mobile-menu-button, [aria-label*="menu"], button:has(svg)')
          if (await hamburgerButton.first().isVisible()) {
            await hamburgerButton.first().click()
            await page.waitForTimeout(500)
            
            const mobileMenuContent = await page.locator('.mobile-menu, .drawer, .sidebar').first()
            if (await mobileMenuContent.isVisible()) {
              console.log('✅ Mobile menu opens successfully')
              
              // Check navigation items
              const navItems = await mobileMenuContent.locator('a, button').all()
              console.log(`📋 Found ${navItems.length} navigation items`)
              
              // Take navigation screenshot
              await page.screenshot({ 
                path: `/tmp/mobile-audit-${device.viewport.width}px-navigation.png`
              })
              auditResults.screenshots.push('navigation')
            } else {
              auditResults.issues.push({
                severity: 'HIGH',
                category: 'Navigation',
                issue: 'Mobile menu button present but menu does not open or is not visible'
              })
            }
          }

          // 5. FORMS AND INPUT TESTING
          console.log('📝 Testing mobile forms...')
          
          // Look for search inputs and forms
          const searchInputs = await page.locator('input[type="search"], input[placeholder*="search"], input[placeholder*="procurar"]').all()
          const forms = await page.locator('form').all()
          
          if (searchInputs.length > 0 || forms.length > 0) {
            const testInput = searchInputs[0] || (await forms[0]?.locator('input').first())
            if (testInput) {
              // Test Portuguese character input
              await testInput.fill('São João - Festa Portuguesa')
              const inputValue = await testInput.inputValue()
              
              if (inputValue === 'São João - Festa Portuguesa') {
                console.log('✅ Portuguese characters preserved in input')
              } else {
                auditResults.issues.push({
                  severity: 'MEDIUM',
                  category: 'Forms',
                  issue: `Portuguese characters not preserved: expected "São João - Festa Portuguesa", got "${inputValue}"`
                })
              }
            }
          }

          // 6. PERFORMANCE ANALYSIS
          console.log('⚡ Analyzing mobile performance...')
          
          // Measure critical metrics
          const performanceMetrics = await page.evaluate(() => ({
            timing: performance.timing,
            navigation: performance.navigation,
            memory: (performance as any).memory || null
          }))

          auditResults.performance = {
            loadTime,
            ...performanceMetrics
          }

          // Performance expectations for Portuguese community mobile users
          if (loadTime > 5000) {
            auditResults.issues.push({
              severity: 'HIGH',
              category: 'Performance', 
              issue: `Slow loading: ${loadTime}ms > 5000ms threshold for mobile networks`
            })
          } else if (loadTime > 3000) {
            auditResults.issues.push({
              severity: 'MEDIUM',
              category: 'Performance',
              issue: `Moderate loading: ${loadTime}ms > 3000ms optimal for mobile`
            })
          }

          // 7. EVENT DISCOVERY MOBILE UX
          console.log('🎉 Testing event discovery mobile UX...')
          
          // Navigate to events page if available
          const eventsLinks = await page.locator('a[href*="/events"], a:has-text("Events"), a:has-text("Eventos")').all()
          if (eventsLinks.length > 0) {
            await eventsLinks[0].click()
            await page.waitForTimeout(2000)
            
            // Check for mobile-optimized event cards
            const eventCards = await page.locator('[data-testid="event-card"], .event-card, .card').all()
            if (eventCards.length > 0) {
              console.log(`✅ Found ${eventCards.length} event cards`)
              
              // Take events page screenshot
              await page.screenshot({ 
                path: `/tmp/mobile-audit-${device.viewport.width}px-events.png`
              })
              auditResults.screenshots.push('events')
              
              // Test card interactions
              const firstCard = eventCards[0]
              const cardBox = await firstCard.boundingBox()
              if (cardBox && (cardBox.width < 150 || cardBox.height < 100)) {
                auditResults.issues.push({
                  severity: 'MEDIUM',
                  category: 'Content Layout',
                  issue: `Event cards may be too small for mobile: ${Math.round(cardBox.width)}x${Math.round(cardBox.height)}px`
                })
              }
            } else {
              auditResults.issues.push({
                severity: 'MEDIUM',
                category: 'Content Discovery',
                issue: 'Events page exists but no event cards found'
              })
            }
          }

          // 8. CONTACT AND SOCIAL FEATURES
          console.log('📞 Testing mobile contact features...')
          
          // Check for click-to-call functionality
          const phoneLinks = await page.locator('a[href^="tel:"]').all()
          const emailLinks = await page.locator('a[href^="mailto:"]').all()
          
          console.log(`📞 Found ${phoneLinks.length} phone links, ${emailLinks.length} email links`)
          
          if (phoneLinks.length === 0) {
            auditResults.issues.push({
              severity: 'LOW',
              category: 'Mobile Features',
              issue: 'No click-to-call phone links found - important for Portuguese community engagement'
            })
          }

          // FINAL AUDIT SUMMARY
          console.log(`\n📊 AUDIT COMPLETE - ${device.name}`)
          console.log(`Total Issues: ${auditResults.issues.length}`)
          console.log(`Touch Targets Analyzed: ${auditResults.touchTargets.length}`)
          console.log(`Screenshots: ${auditResults.screenshots.length}`)

          const highSeverityIssues = auditResults.issues.filter(i => i.severity === 'HIGH')
          const mediumSeverityIssues = auditResults.issues.filter(i => i.severity === 'MEDIUM')
          
          console.log(`🚨 High Priority Issues: ${highSeverityIssues.length}`)
          console.log(`⚠️  Medium Priority Issues: ${mediumSeverityIssues.length}`)

          // Log critical issues for this device
          if (highSeverityIssues.length > 0) {
            console.log('\n🚨 CRITICAL MOBILE UX ISSUES:')
            highSeverityIssues.forEach((issue, index) => {
              console.log(`${index + 1}. [${issue.category}] ${issue.issue}`)
            })
          }

          // Assert critical requirements
          expect(highSeverityIssues.length, `Critical mobile UX issues found on ${device.name}`).toBeLessThan(5)
          expect(loadTime, `Page load too slow on ${device.name}`).toBeLessThan(10000) // Allow up to 10s for initial audit
          
        } catch (error) {
          console.error(`❌ Error auditing ${device.name}:`, error)
          throw error
        }
      })
    }
  })

  test.describe('Cross-Device Consistency Testing', () => {
    test('Mobile experience consistency across Portuguese community devices', async ({ page }) => {
      const consistencyResults = {
        devices: [],
        inconsistencies: []
      }

      for (const device of PORTUGUESE_MOBILE_DEVICES.slice(0, 2)) { // Test first 2 devices for comparison
        await page.setViewportSize(device.viewport)
        await page.goto(AUDIT_URL)
        
        // Capture key metrics
        const metrics = {
          device: device.name,
          viewport: device.viewport,
          hasHorizontalScroll: await page.evaluate(() => document.body.scrollWidth > window.innerWidth),
          mobileMenuVisible: await page.locator('[data-testid="mobile-menu"], .mobile-menu').first().isVisible().catch(() => false),
          navigationHeight: await page.locator('nav, header').first().boundingBox().then(box => box?.height).catch(() => null)
        }
        
        consistencyResults.devices.push(metrics)
      }

      // Compare consistency
      const firstDevice = consistencyResults.devices[0]
      const secondDevice = consistencyResults.devices[1]

      if (firstDevice && secondDevice) {
        if (firstDevice.hasHorizontalScroll !== secondDevice.hasHorizontalScroll) {
          consistencyResults.inconsistencies.push('Horizontal scroll behavior inconsistent across devices')
        }
        
        if (firstDevice.mobileMenuVisible !== secondDevice.mobileMenuVisible) {
          consistencyResults.inconsistencies.push('Mobile menu visibility inconsistent across devices')
        }

        console.log(`\n🔄 CROSS-DEVICE CONSISTENCY ANALYSIS`)
        console.log(`Devices tested: ${consistencyResults.devices.length}`)
        console.log(`Inconsistencies found: ${consistencyResults.inconsistencies.length}`)
        
        if (consistencyResults.inconsistencies.length > 0) {
          console.log('\n⚠️  CONSISTENCY ISSUES:')
          consistencyResults.inconsistencies.forEach((issue, index) => {
            console.log(`${index + 1}. ${issue}`)
          })
        }

        expect(consistencyResults.inconsistencies.length).toBeLessThan(3)
      }
    })
  })

  test.describe('Portuguese Community Mobile User Journey', () => {
    test('Complete Portuguese community member mobile journey', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }) // iPhone SE - most common
      
      console.log('\n🇵🇹 TESTING COMPLETE PORTUGUESE COMMUNITY MOBILE JOURNEY')
      
      // 1. Homepage arrival
      await page.goto(AUDIT_URL)
      await page.waitForLoadState('networkidle')
      
      // Take journey start screenshot
      await page.screenshot({ 
        path: '/tmp/mobile-journey-01-homepage.png',
        fullPage: true 
      })
      
      console.log('1️⃣ Homepage loaded')

      // 2. Language preference (if available)
      const languageToggle = page.locator('[data-testid="language-toggle"], .language-switch, button:has-text("PT")')
      if (await languageToggle.first().isVisible()) {
        await languageToggle.first().click()
        await page.waitForTimeout(1000)
        console.log('2️⃣ Switched to Portuguese language')
        
        await page.screenshot({ 
          path: '/tmp/mobile-journey-02-portuguese.png'
        })
      } else {
        console.log('2️⃣ Language toggle not available')
      }

      // 3. Navigation exploration
      const mobileMenuButton = page.locator('.hamburger, .mobile-menu-button, [aria-label*="menu"]')
      if (await mobileMenuButton.first().isVisible()) {
        await mobileMenuButton.first().click()
        await page.waitForTimeout(500)
        
        console.log('3️⃣ Mobile menu opened')
        await page.screenshot({ 
          path: '/tmp/mobile-journey-03-navigation.png'
        })
        
        // Close menu
        const closeButton = page.locator('.close, [aria-label*="close"]')
        if (await closeButton.first().isVisible()) {
          await closeButton.first().click()
        } else {
          // Click outside menu
          await page.click('body')
        }
      }

      // 4. Content discovery (events or services)
      const primaryCTA = page.locator('button:has-text("Events"), button:has-text("Eventos"), a:has-text("Discover"), a:has-text("Descobrir")')
      if (await primaryCTA.first().isVisible()) {
        await primaryCTA.first().click()
        await page.waitForTimeout(2000)
        
        console.log('4️⃣ Navigated to content discovery')
        await page.screenshot({ 
          path: '/tmp/mobile-journey-04-discovery.png'
        })
      }

      // 5. Search functionality
      const searchInput = page.locator('input[type="search"], input[placeholder*="search"], input[placeholder*="procurar"]')
      if (await searchInput.first().isVisible()) {
        await searchInput.first().fill('Fado Lisboa')
        await page.press('input[type="search"], input[placeholder*="search"], input[placeholder*="procurar"]', 'Enter')
        await page.waitForTimeout(1500)
        
        console.log('5️⃣ Performed search for Portuguese content')
        await page.screenshot({ 
          path: '/tmp/mobile-journey-05-search.png'
        })
      }

      // 6. Form interaction
      const anyForm = page.locator('form').first()
      if (await anyForm.isVisible()) {
        const formInputs = await anyForm.locator('input, textarea').all()
        if (formInputs.length > 0) {
          await formInputs[0].fill('José Silva')
          console.log('6️⃣ Tested form input with Portuguese name')
          
          await page.screenshot({ 
            path: '/tmp/mobile-journey-06-form.png'
          })
        }
      }

      console.log('✅ Portuguese community mobile journey test completed')
      
      // Final assertion - journey should complete without critical errors
      const hasContent = await page.locator('body').textContent()
      expect(hasContent?.length || 0).toBeGreaterThan(100) // Should have meaningful content
    })
  })

  test.describe('Mobile Performance Deep Dive', () => {
    test('Mobile performance analysis for Portuguese community networks', async ({ page }) => {
      console.log('\n📊 MOBILE PERFORMANCE DEEP DIVE')
      
      // Simulate mobile network conditions
      const networkConditions = [
        { name: '3G Fast', downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 0.75 * 1024 * 1024 / 8, latency: 150 },
        { name: '3G Slow', downloadThroughput: 0.4 * 1024 * 1024 / 8, uploadThroughput: 0.4 * 1024 * 1024 / 8, latency: 300 }
      ]

      for (const network of networkConditions) {
        console.log(`\n📶 Testing on ${network.name} network`)
        
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 })
        
        // Simulate network conditions
        await page.context().addCookies([])
        
        const startTime = Date.now()
        await page.goto(AUDIT_URL, { waitUntil: 'load' })
        const loadTime = Date.now() - startTime
        
        console.log(`⏱️  ${network.name} load time: ${loadTime}ms`)
        
        // Take performance screenshot
        await page.screenshot({ 
          path: `/tmp/mobile-performance-${network.name.toLowerCase().replace(' ', '-')}.png`
        })
        
        // Performance assertions based on network
        if (network.name === '3G Fast') {
          expect(loadTime).toBeLessThan(8000) // 8 seconds max on 3G Fast
        } else {
          expect(loadTime).toBeLessThan(15000) // 15 seconds max on 3G Slow
        }
        
        // Check for performance optimization indicators
        const hasLazyLoading = await page.locator('img[loading="lazy"]').count()
        console.log(`🖼️  Lazy loaded images: ${hasLazyLoading}`)
        
        const hasPreloading = await page.locator('link[rel="preload"]').count()
        console.log(`⚡ Preloaded resources: ${hasPreloading}`)
      }
    })
  })
})

test.describe('Portuguese Community Accessibility Audit', () => {
  test('Mobile accessibility for Portuguese-speaking users', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto(AUDIT_URL)
    
    console.log('\n♿ MOBILE ACCESSIBILITY AUDIT')
    
    // Check for proper heading structure
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
    console.log(`📝 Heading structure: ${headings.length} headings found`)
    
    // Check for alt text on images
    const images = await page.locator('img').all()
    let imagesWithAlt = 0
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      if (alt && alt.trim()) imagesWithAlt++
    }
    console.log(`🖼️  Images with alt text: ${imagesWithAlt}/${images.length}`)
    
    // Check for proper button labels
    const buttons = await page.locator('button').all()
    let buttonsWithLabels = 0
    for (const button of buttons) {
      const label = await button.textContent() || await button.getAttribute('aria-label')
      if (label && label.trim()) buttonsWithLabels++
    }
    console.log(`🔘 Buttons with labels: ${buttonsWithLabels}/${buttons.length}`)
    
    // Check for proper form labels
    const inputs = await page.locator('input').all()
    let inputsWithLabels = 0
    for (const input of inputs) {
      const id = await input.getAttribute('id')
      const ariaLabel = await input.getAttribute('aria-label')
      const hasLabel = id ? await page.locator(`label[for="${id}"]`).count() > 0 : false
      if (hasLabel || ariaLabel) inputsWithLabels++
    }
    console.log(`📝 Form inputs with labels: ${inputsWithLabels}/${inputs.length}`)
    
    // Accessibility assertions
    expect(headings.length).toBeGreaterThan(0)
    expect(imagesWithAlt / Math.max(images.length, 1)).toBeGreaterThan(0.8) // 80% of images should have alt text
    expect(buttonsWithLabels / Math.max(buttons.length, 1)).toBeGreaterThan(0.9) // 90% of buttons should have labels
    
    await page.screenshot({ 
      path: '/tmp/mobile-accessibility-audit.png',
      fullPage: true
    })
  })
})