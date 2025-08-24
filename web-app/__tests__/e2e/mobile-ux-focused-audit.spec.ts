import { test, expect } from '@playwright/test'

/**
 * Focused Mobile UX Audit for LusoTown Portuguese-Speaking Community
 * Testing URL: https://web-rms4m4wbx-giquinas-projects.vercel.app
 * 
 * Memory-optimized version focusing on critical mobile UX metrics
 */

const AUDIT_URL = 'https://web-rms4m4wbx-giquinas-projects.vercel.app'

test.describe('LusoTown Mobile UX Critical Analysis', () => {
  
  test('Portuguese Community Mobile Performance & UX Analysis', async ({ page }) => {
    console.log('\n🇵🇹 LUSOTOWN MOBILE UX AUDIT REPORT')
    console.log('=' * 60)
    
    // Test on iPhone SE (most common Portuguese community device)
    await page.setViewportSize({ width: 375, height: 667 })
    
    const startTime = Date.now()
    await page.goto(AUDIT_URL, { waitUntil: 'networkidle' })
    const loadTime = Date.now() - startTime
    
    console.log(`\n📊 PERFORMANCE METRICS`)
    console.log(`⏱️  Page Load Time: ${loadTime}ms`)
    console.log(`🎯 Target: < 3000ms for Portuguese community mobile users`)
    
    if (loadTime > 5000) {
      console.log('🚨 CRITICAL: Load time exceeds 5 seconds - major mobile UX issue')
    } else if (loadTime > 3000) {
      console.log('⚠️  WARNING: Load time exceeds optimal 3 seconds for mobile')
    } else {
      console.log('✅ GOOD: Load time within optimal range')
    }

    // Analyze mobile layout
    console.log(`\n📱 MOBILE LAYOUT ANALYSIS`)
    
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewportWidth = 375
    
    console.log(`📐 Content Width: ${bodyWidth}px vs Viewport: ${viewportWidth}px`)
    
    if (bodyWidth > viewportWidth) {
      console.log('🚨 CRITICAL: Horizontal scroll detected - breaks mobile experience')
    } else {
      console.log('✅ GOOD: No horizontal scroll')
    }

    // Touch target analysis
    console.log(`\n👆 TOUCH TARGET ANALYSIS`)
    
    const buttons = await page.locator('button').all()
    const links = await page.locator('a').all()
    const interactiveElements = [...buttons.slice(0, 10), ...links.slice(0, 10)]
    
    let smallTargetsCount = 0
    let totalMeasured = 0
    
    for (const element of interactiveElements) {
      try {
        const box = await element.boundingBox()
        if (box && box.width > 0 && box.height > 0) {
          totalMeasured++
          if (box.width < 44 || box.height < 44) {
            smallTargetsCount++
          }
        }
      } catch (e) {
        continue
      }
    }
    
    console.log(`🔢 Touch Targets Analyzed: ${totalMeasured}`)
    console.log(`❌ Below 44px minimum: ${smallTargetsCount}`)
    console.log(`📊 Compliance Rate: ${Math.round((totalMeasured - smallTargetsCount) / totalMeasured * 100)}%`)
    
    if (smallTargetsCount > totalMeasured * 0.2) {
      console.log('🚨 CRITICAL: >20% of touch targets too small')
    } else if (smallTargetsCount > 0) {
      console.log('⚠️  WARNING: Some touch targets below minimum size')
    } else {
      console.log('✅ GOOD: All touch targets meet 44px minimum')
    }

    // Mobile navigation test
    console.log(`\n🧭 MOBILE NAVIGATION ANALYSIS`)
    
    const mobileMenuIndicators = [
      '.hamburger',
      '.mobile-menu-button', 
      '[aria-label*="menu"]',
      'button:has(svg)',
      '.menu-toggle'
    ]
    
    let mobileMenuFound = false
    for (const selector of mobileMenuIndicators) {
      if (await page.locator(selector).first().isVisible()) {
        mobileMenuFound = true
        console.log(`✅ Mobile menu found: ${selector}`)
        
        // Test menu functionality
        await page.locator(selector).first().click()
        await page.waitForTimeout(500)
        
        const menuVisible = await page.locator('.mobile-menu, .drawer, .sidebar, .nav-menu').first().isVisible()
        if (menuVisible) {
          console.log('✅ Mobile menu opens successfully')
        } else {
          console.log('❌ Mobile menu button present but menu doesn\'t open')
        }
        break
      }
    }
    
    if (!mobileMenuFound) {
      console.log('🚨 CRITICAL: No mobile menu found - navigation will be difficult on mobile')
    }

    // Portuguese language support
    console.log(`\n🇵🇹 PORTUGUESE LANGUAGE SUPPORT`)
    
    const bodyText = await page.textContent('body')
    const hasPortugueseContent = bodyText?.includes('Bem-vindo') || 
                                 bodyText?.includes('Eventos') || 
                                 bodyText?.includes('Português') ||
                                 bodyText?.includes('Lisboa') ||
                                 bodyText?.includes('Brasil')
    
    if (hasPortugueseContent) {
      console.log('✅ Portuguese content detected')
    } else {
      console.log('⚠️  WARNING: Limited Portuguese content found')
    }
    
    // Language toggle
    const languageToggleSelectors = [
      '[data-testid="language-toggle"]',
      '.language-switch',
      'button:has-text("PT")',
      'button:has-text("EN")',
      '.lang-toggle'
    ]
    
    let langToggleFound = false
    for (const selector of languageToggleSelectors) {
      if (await page.locator(selector).first().isVisible()) {
        langToggleFound = true
        console.log('✅ Language toggle available')
        break
      }
    }
    
    if (!langToggleFound) {
      console.log('❌ Language toggle not found - Portuguese community needs bilingual support')
    }

    // Form analysis
    console.log(`\n📝 MOBILE FORMS ANALYSIS`)
    
    const inputs = await page.locator('input').all()
    const textareas = await page.locator('textarea').all()
    const allInputs = [...inputs, ...textareas]
    
    console.log(`📊 Form Elements Found: ${allInputs.length}`)
    
    if (allInputs.length > 0) {
      // Test Portuguese character input
      const testInput = allInputs[0]
      await testInput.fill('José Silva - São Paulo')
      const inputValue = await testInput.inputValue()
      
      if (inputValue === 'José Silva - São Paulo') {
        console.log('✅ Portuguese characters preserved in forms')
      } else {
        console.log(`❌ Portuguese characters lost: "${inputValue}" vs expected "José Silva - São Paulo"`)
      }
    }

    // Image optimization
    console.log(`\n🖼️  IMAGE OPTIMIZATION ANALYSIS`)
    
    const images = await page.locator('img').all()
    const lazyImages = await page.locator('img[loading="lazy"]').count()
    
    console.log(`📊 Total Images: ${images.length}`)
    console.log(`⚡ Lazy Loaded: ${lazyImages}`)
    console.log(`📊 Lazy Loading Rate: ${Math.round(lazyImages / images.length * 100)}%`)
    
    if (lazyImages / images.length > 0.8) {
      console.log('✅ EXCELLENT: >80% images lazy loaded')
    } else if (lazyImages / images.length > 0.5) {
      console.log('⚠️  MODERATE: 50-80% images lazy loaded')
    } else {
      console.log('🚨 POOR: <50% images lazy loaded - impacts mobile performance')
    }

    // Accessibility check
    console.log(`\n♿ ACCESSIBILITY ANALYSIS`)
    
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').count()
    const imagesWithAlt = await page.locator('img[alt]').count()
    const buttonsWithLabels = await page.locator('button').all()
    
    let labeledButtons = 0
    for (const button of buttonsWithLabels.slice(0, 20)) {
      const text = await button.textContent()
      const ariaLabel = await button.getAttribute('aria-label')
      if ((text && text.trim()) || (ariaLabel && ariaLabel.trim())) {
        labeledButtons++
      }
    }
    
    console.log(`📝 Headings: ${headings}`)
    console.log(`🖼️  Images with alt text: ${imagesWithAlt}/${images.length} (${Math.round(imagesWithAlt/images.length*100)}%)`)
    console.log(`🔘 Buttons with labels: ${labeledButtons}/${Math.min(buttonsWithLabels.length, 20)} (${Math.round(labeledButtons/Math.min(buttonsWithLabels.length, 20)*100)}%)`)
    
    // Event discovery (Portuguese community priority)
    console.log(`\n🎉 EVENT DISCOVERY ANALYSIS`)
    
    const eventElements = await page.locator('[data-testid="event-card"], .event-card, .card').count()
    const eventLinks = await page.locator('a:has-text("Events"), a:has-text("Eventos")').count()
    
    console.log(`📊 Event Cards: ${eventElements}`)
    console.log(`🔗 Event Navigation: ${eventLinks}`)
    
    if (eventElements > 0) {
      console.log('✅ Event discovery UI present')
    } else if (eventLinks > 0) {
      console.log('⚠️  Event navigation available but no visible events')
    } else {
      console.log('❌ No obvious event discovery features')
    }

    // Business directory (Portuguese community priority)
    console.log(`\n🏪 BUSINESS DIRECTORY ANALYSIS`)
    
    const businessElements = await page.locator('.business-card, [data-testid="business-card"]').count()
    const businessLinks = await page.locator('a:has-text("Business"), a:has-text("Negócios"), a:has-text("Directory"), a:has-text("Diretório")').count()
    
    console.log(`📊 Business Cards: ${businessElements}`)
    console.log(`🔗 Business Navigation: ${businessLinks}`)
    
    if (businessElements > 0) {
      console.log('✅ Business directory UI present')
    } else if (businessLinks > 0) {
      console.log('⚠️  Business navigation available but no visible businesses')
    } else {
      console.log('❌ No obvious business directory features')
    }

    // Final Mobile UX Score
    console.log(`\n🏆 MOBILE UX SCORE CALCULATION`)
    
    let score = 100
    let criticalIssues = 0
    let warningIssues = 0
    
    // Performance
    if (loadTime > 5000) { score -= 20; criticalIssues++ }
    else if (loadTime > 3000) { score -= 10; warningIssues++ }
    
    // Layout
    if (bodyWidth > viewportWidth) { score -= 15; criticalIssues++ }
    
    // Touch targets
    if (smallTargetsCount > totalMeasured * 0.2) { score -= 15; criticalIssues++ }
    else if (smallTargetsCount > 0) { score -= 5; warningIssues++ }
    
    // Navigation
    if (!mobileMenuFound) { score -= 20; criticalIssues++ }
    
    // Language support
    if (!hasPortugueseContent) { score -= 10; warningIssues++ }
    if (!langToggleFound) { score -= 10; warningIssues++ }
    
    // Image optimization
    if (lazyImages / images.length < 0.5) { score -= 10; warningIssues++ }
    
    console.log(`\n🎯 FINAL MOBILE UX SCORE: ${score}/100`)
    console.log(`🚨 Critical Issues: ${criticalIssues}`)
    console.log(`⚠️  Warning Issues: ${warningIssues}`)
    
    if (score >= 90) {
      console.log('🏆 EXCELLENT: Mobile UX meets Portuguese community needs')
    } else if (score >= 75) {
      console.log('👍 GOOD: Mobile UX is solid with minor improvements needed')
    } else if (score >= 60) {
      console.log('⚠️  MODERATE: Significant mobile UX improvements needed')
    } else {
      console.log('🚨 POOR: Critical mobile UX issues must be addressed')
    }

    console.log('\n📋 PRIORITY RECOMMENDATIONS FOR PORTUGUESE COMMUNITY:')
    console.log('1. Optimize for 375px mobile viewport (iPhone SE most common)')
    console.log('2. Ensure all touch targets meet 44px minimum')
    console.log('3. Implement robust mobile navigation')
    console.log('4. Enhance Portuguese language support')
    console.log('5. Prioritize event discovery and business directory mobile UX')
    console.log('6. Improve mobile performance for limited data plans')
    
    // Assertions for test framework
    expect(loadTime).toBeLessThan(10000) // Allow up to 10s for initial load
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10) // Small tolerance for scroll
    expect(mobileMenuFound).toBeTruthy() // Mobile navigation is critical
    expect(score).toBeGreaterThan(50) // Minimum acceptable score
  })
})