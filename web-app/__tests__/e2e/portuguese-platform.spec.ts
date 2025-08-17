import { test, expect } from '@playwright/test'

test.describe('LusoTown Portuguese Platform E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set Portuguese locale
    await page.addInitScript(() => {
      localStorage.setItem('lusotown-language', 'pt')
    })
  })

  test.describe('Portuguese User Registration and Onboarding', () => {
    test('should complete Portuguese user registration flow', async ({ page }) => {
      await page.goto('/')
      
      // Should show Portuguese welcome message
      await expect(page.locator('h1')).toContainText('Bem-vindo')
      
      // Click register/sign up
      await page.click('text=Registar')
      
      // Fill registration form with Portuguese data
      await page.fill('input[name="firstName"]', 'João')
      await page.fill('input[name="lastName"]', 'Silva')
      await page.fill('input[name="email"]', 'joao.silva@example.com')
      await page.fill('input[name="password"]', 'LusoTown2025!')
      
      // Select Portuguese language preference
      await page.selectOption('select[name="language"]', 'pt')
      
      // Select location in London
      await page.fill('input[name="location"]', 'Camberwell, Londres')
      
      // Select cultural interests
      await page.check('input[value="Fado"]')
      await page.check('input[value="Gastronomia"]')
      await page.check('input[value="Literatura"]')
      
      // Submit registration
      await page.click('button[type="submit"]')
      
      // Should redirect to welcome page
      await expect(page).toHaveURL(/\/welcome/)
      await expect(page.locator('h1')).toContainText('Bem-vindo ao LusoTown')
    })

    test('should handle Portuguese character input correctly', async ({ page }) => {
      await page.goto('/register')
      
      // Test Portuguese characters in form fields
      await page.fill('input[name="firstName"]', 'José')
      await page.fill('input[name="lastName"]', 'São')
      await page.fill('input[name="bio"]', 'Amo a cultura portuguesa e a saudade!')
      
      // Characters should be preserved
      await expect(page.locator('input[name="firstName"]')).toHaveValue('José')
      await expect(page.locator('input[name="lastName"]')).toHaveValue('São')
      await expect(page.locator('input[name="bio"]')).toContainText('saudade')
    })
  })

  test.describe('Portuguese Cultural Events', () => {
    test('should browse and book Portuguese cultural events', async ({ page }) => {
      await page.goto('/events')
      
      // Should show Portuguese events page
      await expect(page.locator('h1')).toContainText('Eventos')
      
      // Should display Portuguese cultural events
      await expect(page.locator('[data-testid="event-card"]')).toContainText('Fado')
      
      // Filter by cultural events
      await page.selectOption('select[name="category"]', 'cultural')
      
      // Should show filtered results
      await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible()
      
      // Click on a Fado event
      await page.click('text=Noite de Fado')
      
      // Should navigate to event details
      await expect(page).toHaveURL(/\/events\/.*/)
      await expect(page.locator('h1')).toContainText('Noite de Fado')
      
      // Should show event details in Portuguese
      await expect(page.locator('.event-description')).toContainText('música tradicional portuguesa')
      
      // Book the event
      await page.click('button:has-text("Reservar Bilhete")')
      
      // Should show booking confirmation
      await expect(page.locator('.booking-confirmation')).toBeVisible()
      await expect(page.locator('.booking-confirmation')).toContainText('Reserva confirmada')
    })

    test('should filter events by Portuguese location', async ({ page }) => {
      await page.goto('/events')
      
      // Filter by London Portuguese areas
      await page.fill('input[name="location"]', 'Vauxhall')
      await page.press('input[name="location"]', 'Enter')
      
      // Should show events in Portuguese areas of London
      await expect(page.locator('[data-testid="event-card"]')).toContainText('Vauxhall')
      
      // Try another Portuguese area
      await page.fill('input[name="location"]', 'Kennington')
      await page.press('input[name="location"]', 'Enter')
      
      await expect(page.locator('[data-testid="event-card"]')).toContainText('Kennington')
    })
  })

  test.describe('Premium Subscription and Transport Services', () => {
    test('should complete subscription upgrade for transport access', async ({ page }) => {
      // Login first
      await page.goto('/login')
      await page.fill('input[name="email"]', 'demo@lusotown.com')
      await page.fill('input[name="password"]', 'LusoTown2025!')
      await page.click('button[type="submit"]')
      
      // Navigate to transport services
      await page.goto('/transport')
      
      // Should show subscription requirement
      await expect(page.locator('.subscription-gate')).toBeVisible()
      await expect(page.locator('.subscription-gate')).toContainText('subscrição ativa')
      
      // Click subscribe
      await page.click('button:has-text("Subscrever Agora")')
      
      // Should navigate to subscription page
      await expect(page).toHaveURL(/\/subscription/)
      
      // Select premium tier
      await page.click('[data-tier="platinum"]')
      
      // Should show Portuguese subscription details
      await expect(page.locator('.tier-description')).toContainText('£25/ano')
      
      // Proceed to payment (mock)
      await page.click('button:has-text("Continuar para Pagamento")')
      
      // Mock successful payment
      await page.addInitScript(() => {
        localStorage.setItem('lusotown-subscription', JSON.stringify({
          tier: 'platinum',
          status: 'active',
          current_period_end: '2025-12-31T23:59:59Z'
        }))
      })
      
      // Navigate back to transport
      await page.goto('/transport')
      
      // Should now have access to transport services
      await expect(page.locator('.transport-services')).toBeVisible()
      await expect(page.locator('h1')).toContainText('Serviços de Transporte Premium')
    })

    test('should complete SIA compliance questionnaire', async ({ page }) => {
      // Setup premium subscription
      await page.addInitScript(() => {
        localStorage.setItem('lusotown-subscription', JSON.stringify({
          tier: 'platinum',
          status: 'active'
        }))
      })
      
      await page.goto('/transport')
      
      // Start SIA questionnaire
      await page.click('button:has-text("Iniciar Questionário SIA")')
      
      // Should show questionnaire in Portuguese
      await expect(page.locator('h2')).toContainText('Questionário de Conformidade SIA')
      
      // Answer questions
      await page.check('input[value="no_criminal_record"]')
      await page.check('input[value="uk_citizen"]')
      await page.check('input[value="over_18"]')
      
      // Submit questionnaire
      await page.click('button:has-text("Submeter")')
      
      // Should show compliance confirmation
      await expect(page.locator('.compliance-confirmation')).toBeVisible()
      await expect(page.locator('.compliance-confirmation')).toContainText('SIA aprovado')
    })
  })

  test.describe('Portuguese Business Directory', () => {
    test('should search Portuguese businesses in London', async ({ page }) => {
      await page.goto('/business-directory')
      
      // Should show Portuguese business directory
      await expect(page.locator('h1')).toContainText('Diretório de Negócios Portugueses')
      
      // Search for Portuguese restaurants
      await page.fill('input[name="search"]', 'restaurante português')
      await page.press('input[name="search"]', 'Enter')
      
      // Should show Portuguese restaurants
      await expect(page.locator('[data-testid="business-card"]').first()).toContainText('Restaurante')
      
      // Filter by location
      await page.selectOption('select[name="location"]', 'Vauxhall')
      
      // Should show businesses in Vauxhall
      await expect(page.locator('[data-testid="business-card"]')).toContainText('Vauxhall')
      
      // Click on a business
      await page.click('[data-testid="business-card"]:first-child')
      
      // Should show business details
      await expect(page.locator('.business-details')).toBeVisible()
      await expect(page.locator('.business-address')).toContainText('Londres')
    })
  })

  test.describe('Mobile Portuguese Experience', () => {
    test('should provide optimal mobile experience', async ({ page, isMobile }) => {
      test.skip(!isMobile, 'Mobile-specific test')
      
      await page.goto('/')
      
      // Should show mobile-optimized layout
      await expect(page.locator('.mobile-header')).toBeVisible()
      
      // Mobile menu should work
      await page.click('.mobile-menu-button')
      await expect(page.locator('.mobile-menu')).toBeVisible()
      
      // Should show Portuguese navigation
      await expect(page.locator('.mobile-menu')).toContainText('Eventos')
      await expect(page.locator('.mobile-menu')).toContainText('Serviços')
      
      // Touch interactions should work
      await page.tap('text=Eventos')
      await expect(page).toHaveURL(/\/events/)
      
      // Should maintain 2x2 grid layout on mobile
      await expect(page.locator('.events-grid')).toHaveCSS('grid-template-columns', '1fr 1fr')
    })

    test('should handle Portuguese text input on mobile', async ({ page, isMobile }) => {
      test.skip(!isMobile, 'Mobile-specific test')
      
      await page.goto('/events')
      
      // Mobile search should work with Portuguese characters
      await page.fill('input[name="search"]', 'São João')
      
      // Should preserve Portuguese characters
      await expect(page.locator('input[name="search"]')).toHaveValue('São João')
      
      // Touch keyboard should support Portuguese characters
      await page.press('input[name="search"]', 'Enter')
      
      // Should search correctly
      await expect(page.locator('.search-results')).toBeVisible()
    })
  })

  test.describe('Performance and Accessibility', () => {
    test('should load Portuguese content quickly', async ({ page }) => {
      const startTime = Date.now()
      
      await page.goto('/')
      
      // Wait for main content to load
      await page.waitForSelector('h1')
      
      const loadTime = Date.now() - startTime
      
      // Should load within 3 seconds
      expect(loadTime).toBeLessThan(3000)
      
      // Portuguese content should be visible
      await expect(page.locator('h1')).toContainText('Bem-vindo')
    })

    test('should be accessible with Portuguese screen reader support', async ({ page }) => {
      await page.goto('/')
      
      // Should have proper heading structure
      const headings = await page.locator('h1, h2, h3').all()
      expect(headings.length).toBeGreaterThan(0)
      
      // Should have proper ARIA labels in Portuguese
      const navigationLabel = await page.locator('nav').getAttribute('aria-label')
      expect(navigationLabel).toContain('navegação') // Portuguese for navigation
      
      // Should have alt text for images
      const images = await page.locator('img').all()
      for (const img of images) {
        const alt = await img.getAttribute('alt')
        expect(alt).toBeTruthy()
      }
    })

    test('should handle high load scenarios', async ({ page }) => {
      // Simulate high load by rapid navigation
      const pages = ['/', '/events', '/transport', '/business-directory']
      
      for (let i = 0; i < 3; i++) {
        for (const pagePath of pages) {
          await page.goto(pagePath)
          await page.waitForSelector('h1')
          
          // Should still show Portuguese content
          const content = await page.textContent('body')
          expect(content).toBeTruthy()
        }
      }
      
      // Performance should remain stable
      const finalLoadStart = Date.now()
      await page.goto('/')
      await page.waitForSelector('h1')
      const finalLoadTime = Date.now() - finalLoadStart
      
      expect(finalLoadTime).toBeLessThan(5000) // Allow some degradation under load
    })
  })

  test.describe('Security and Data Protection', () => {
    test('should protect against XSS attacks in Portuguese content', async ({ page }) => {
      await page.goto('/events')
      
      // Try to inject XSS in search
      await page.fill('input[name="search"]', '<script>alert("XSS")</script>')
      await page.press('input[name="search"]', 'Enter')
      
      // Should not execute script
      const alerts = []
      page.on('dialog', dialog => {
        alerts.push(dialog.message())
        dialog.dismiss()
      })
      
      await page.waitForTimeout(1000)
      expect(alerts).toHaveLength(0)
      
      // Content should be sanitized
      const searchValue = await page.inputValue('input[name="search"]')
      expect(searchValue).not.toContain('<script>')
    })

    test('should protect Portuguese user data', async ({ page }) => {
      await page.goto('/register')
      
      // Fill sensitive data
      await page.fill('input[name="email"]', 'joao@example.com')
      await page.fill('input[name="password"]', 'SenhaSegura123!')
      
      // Check that password is not exposed in page source
      const pageContent = await page.content()
      expect(pageContent).not.toContain('SenhaSegura123!')
      
      // Local storage should not contain sensitive data in plain text
      const localStorageData = await page.evaluate(() => {
        return JSON.stringify(localStorage)
      })
      expect(localStorageData).not.toContain('SenhaSegura123!')
    })
  })

  test.describe('Cross-Browser Portuguese Support', () => {
    test('should work consistently across browsers', async ({ page, browserName }) => {
      await page.goto('/')
      
      // Portuguese content should render correctly in all browsers
      await expect(page.locator('h1')).toContainText('Bem-vindo')
      
      // Language toggle should work
      await page.click('[data-testid="language-toggle"]')
      
      // Should switch to English
      await expect(page.locator('h1')).toContainText('Welcome')
      
      // Switch back to Portuguese
      await page.click('[data-testid="language-toggle"]')
      await expect(page.locator('h1')).toContainText('Bem-vindo')
      
      // Browser-specific behavior should be consistent
      console.log(`Test completed successfully on ${browserName}`)
    })
  })
})
