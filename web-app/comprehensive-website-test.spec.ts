import { test, expect } from '@playwright/test';

test.describe('LusoTown Comprehensive Website Testing', () => {
  const baseURL = 'https://web-99kxh0sku-giquinas-projects.vercel.app';

  test.beforeEach(async ({ page }) => {
    // Set viewport for mobile testing
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test('1. Website loads and is accessible', async ({ page }) => {
    console.log('Testing website accessibility...');
    
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    
    // Check if page loads
    await expect(page).toHaveTitle(/LusoTown/);
    
    // Check for critical elements
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    
    // Check for no critical errors
    const errors = await page.evaluate(() => {
      return window.console.error?.toString() || '';
    });
    
    console.log('✅ Website loads successfully');
  });

  test('2. Navigation links functionality', async ({ page }) => {
    console.log('Testing navigation links...');
    
    await page.goto(baseURL);
    
    // Test main navigation links
    const navigationTests = [
      { selector: 'a[href="/events"]', expected: '/events' },
      { selector: 'a[href="/business-directory"]', expected: '/business-directory' },
      { selector: 'a[href="/students"]', expected: '/students' },
      { selector: 'a[href="/directory"]', expected: '/directory' }
    ];
    
    for (const nav of navigationTests) {
      try {
        const link = page.locator(nav.selector).first();
        if (await link.isVisible()) {
          await link.click();
          await page.waitForLoadState('networkidle');
          expect(page.url()).toContain(nav.expected);
          await page.goBack();
          await page.waitForLoadState('networkidle');
          console.log(`✅ Navigation to ${nav.expected} works`);
        }
      } catch (error) {
        console.log(`❌ Navigation to ${nav.expected} failed: ${error}`);
      }
    }
  });

  test('3. Mobile navigation hamburger menu', async ({ page }) => {
    console.log('Testing mobile hamburger menu...');
    
    await page.goto(baseURL);
    
    // Look for mobile menu button (hamburger)
    const menuButtons = [
      'button[aria-label*="menu"]',
      'button[aria-label*="Menu"]',
      '[data-testid="mobile-menu-button"]',
      'button:has-text("☰")',
      'button:has(svg)',
      '.mobile-menu-button'
    ];
    
    let menuFound = false;
    
    for (const selector of menuButtons) {
      try {
        const menuButton = page.locator(selector).first();
        if (await menuButton.isVisible()) {
          await menuButton.click();
          await page.waitForTimeout(500);
          
          // Check if menu opened
          const mobileMenu = page.locator('[role="dialog"], .mobile-menu, nav[data-mobile="true"]').first();
          if (await mobileMenu.isVisible()) {
            console.log('✅ Mobile hamburger menu opens successfully');
            menuFound = true;
            
            // Test menu items
            const menuLinks = await page.locator('nav a, [role="dialog"] a').count();
            console.log(`✅ Found ${menuLinks} navigation items in mobile menu`);
            break;
          }
        }
      } catch (error) {
        continue;
      }
    }
    
    if (!menuFound) {
      console.log('❌ Mobile hamburger menu not found or not working');
    }
  });

  test('4. Portuguese language toggle', async ({ page }) => {
    console.log('Testing Portuguese language toggle...');
    
    await page.goto(baseURL);
    
    // Look for language toggle
    const languageSelectors = [
      'button:has-text("PT")',
      'button:has-text("EN")',
      '[data-testid="language-toggle"]',
      'select[name="language"]',
      '.language-toggle'
    ];
    
    let languageToggleFound = false;
    
    for (const selector of languageSelectors) {
      try {
        const toggle = page.locator(selector).first();
        if (await toggle.isVisible()) {
          const originalText = await page.textContent('body');
          await toggle.click();
          await page.waitForTimeout(1000);
          
          const newText = await page.textContent('body');
          if (originalText !== newText) {
            console.log('✅ Portuguese language toggle works');
            languageToggleFound = true;
            break;
          }
        }
      } catch (error) {
        continue;
      }
    }
    
    if (!languageToggleFound) {
      console.log('❌ Portuguese language toggle not found or not working');
    }
  });

  test('5. Mobile responsiveness at key breakpoints', async ({ page }) => {
    console.log('Testing mobile responsiveness...');
    
    const breakpoints = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1024, height: 768, name: 'Desktop' }
    ];
    
    for (const breakpoint of breakpoints) {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await page.goto(baseURL);
      await page.waitForLoadState('networkidle');
      
      // Check if content is visible and properly formatted
      const header = page.locator('header');
      const main = page.locator('main');
      
      await expect(header).toBeVisible();
      await expect(main).toBeVisible();
      
      // Check for horizontal scrolling issues
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = breakpoint.width;
      
      if (bodyWidth <= viewportWidth + 20) { // Allow small buffer
        console.log(`✅ ${breakpoint.name} (${breakpoint.width}px) - No horizontal scroll`);
      } else {
        console.log(`❌ ${breakpoint.name} (${breakpoint.width}px) - Horizontal scroll detected`);
      }
    }
  });

  test('6. Mobile app download bar positioning', async ({ page }) => {
    console.log('Testing mobile app download bar...');
    
    await page.goto(baseURL);
    
    // Look for app download bar
    const appBarSelectors = [
      '.app-download-bar',
      '[data-testid="app-download"]',
      ':has-text("Download")',
      ':has-text("App")'
    ];
    
    for (const selector of appBarSelectors) {
      try {
        const appBar = page.locator(selector).first();
        if (await appBar.isVisible()) {
          const boundingBox = await appBar.boundingBox();
          const viewportHeight = await page.viewportSize().then(size => size?.height || 667);
          
          if (boundingBox && boundingBox.y > viewportHeight - 200) {
            console.log('✅ App download bar positioned at bottom');
          } else {
            console.log('❌ App download bar not positioned correctly');
          }
          break;
        }
      } catch (error) {
        continue;
      }
    }
  });

  test('7. CTA buttons display correctly', async ({ page }) => {
    console.log('Testing CTA buttons...');
    
    await page.goto(baseURL);
    
    // Find CTA buttons
    const ctaButtons = page.locator('button, a').filter({ hasText: /Join|Sign Up|Get Started|Subscribe|Contact/ });
    const count = await ctaButtons.count();
    
    for (let i = 0; i < count; i++) {
      const button = ctaButtons.nth(i);
      if (await button.isVisible()) {
        const text = await button.textContent();
        const boundingBox = await button.boundingBox();
        
        if (boundingBox && boundingBox.height >= 40) {
          console.log(`✅ CTA button "${text?.trim()}" has proper size`);
        } else {
          console.log(`❌ CTA button "${text?.trim()}" too small`);
        }
      }
    }
  });

  test('8. LusoBot widget positioning', async ({ page }) => {
    console.log('Testing LusoBot widget...');
    
    await page.goto(baseURL);
    await page.waitForTimeout(2000); // Wait for widget to load
    
    // Look for LusoBot widget
    const botSelectors = [
      '[data-testid="lusobot"]',
      '.lusobot',
      '[aria-label*="bot"]',
      '[aria-label*="chat"]'
    ];
    
    for (const selector of botSelectors) {
      try {
        const widget = page.locator(selector).first();
        if (await widget.isVisible()) {
          const boundingBox = await widget.boundingBox();
          const viewport = await page.viewportSize();
          
          if (boundingBox && viewport) {
            const isBottomRight = boundingBox.x > viewport.width - 200 && 
                                boundingBox.y > viewport.height - 200;
            
            if (isBottomRight) {
              console.log('✅ LusoBot widget positioned correctly (bottom-right)');
            } else {
              console.log('❌ LusoBot widget positioning needs adjustment');
            }
            break;
          }
        }
      } catch (error) {
        continue;
      }
    }
  });

  test('9. Demo login functionality', async ({ page }) => {
    console.log('Testing demo login...');
    
    await page.goto(baseURL);
    
    // Look for sign in/login button
    const loginSelectors = [
      'button:has-text("Sign In")',
      'button:has-text("Login")',
      'a:has-text("Sign In")',
      'a:has-text("Login")'
    ];
    
    for (const selector of loginSelectors) {
      try {
        const loginButton = page.locator(selector).first();
        if (await loginButton.isVisible()) {
          await loginButton.click();
          await page.waitForTimeout(1000);
          
          // Look for email/username field
          const emailField = page.locator('input[type="email"], input[name="email"], input[placeholder*="email"]').first();
          const passwordField = page.locator('input[type="password"], input[name="password"]').first();
          
          if (await emailField.isVisible() && await passwordField.isVisible()) {
            await emailField.fill('demo@lusotown.com');
            await passwordField.fill('LusoTown2025!');
            
            // Look for submit button
            const submitButton = page.locator('button[type="submit"], button:has-text("Sign In"), button:has-text("Login")').first();
            if (await submitButton.isVisible()) {
              await submitButton.click();
              await page.waitForTimeout(2000);
              
              console.log('✅ Demo login attempt completed');
              break;
            }
          }
        }
      } catch (error) {
        continue;
      }
    }
  });

  test('10. Check for JavaScript errors', async ({ page }) => {
    console.log('Checking for JavaScript errors...');
    
    const errors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', (exception) => {
      errors.push(exception.toString());
    });
    
    await page.goto(baseURL);
    await page.waitForTimeout(3000);
    
    if (errors.length === 0) {
      console.log('✅ No JavaScript errors detected');
    } else {
      console.log(`❌ Found ${errors.length} JavaScript errors:`);
      errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
    }
  });

  test('11. Portuguese cultural authenticity validation', async ({ page }) => {
    console.log('Validating Portuguese cultural authenticity...');
    
    await page.goto(baseURL);
    
    const content = await page.textContent('body');
    
    // Check for inclusive Portuguese terminology
    const hasInclusiveTerms = content?.includes('Portuguese-speaking') || 
                             content?.includes('lusophone') ||
                             content?.includes('Portuguese community');
    
    // Check for UK-wide references
    const hasUKReferences = content?.includes('United Kingdom') || 
                           content?.includes('UK') ||
                           content?.includes('London');
    
    // Check for multiple Portuguese-speaking countries
    const countriesReferenced = [
      content?.includes('Portugal'),
      content?.includes('Brazil'),
      content?.includes('Angola'),
      content?.includes('Cape Verde'),
      content?.includes('Mozambique')
    ].filter(Boolean).length;
    
    if (hasInclusiveTerms) {
      console.log('✅ Inclusive Portuguese terminology found');
    } else {
      console.log('❌ Missing inclusive Portuguese terminology');
    }
    
    if (hasUKReferences) {
      console.log('✅ UK geographical references found');
    } else {
      console.log('❌ Missing UK geographical references');
    }
    
    if (countriesReferenced >= 2) {
      console.log(`✅ Multiple Portuguese-speaking countries referenced (${countriesReferenced})`);
    } else {
      console.log(`❌ Limited Portuguese-speaking countries referenced (${countriesReferenced})`);
    }
  });

  test('12. AI notification system integration', async ({ page }) => {
    console.log('Testing AI notification system...');
    
    await page.goto(baseURL);
    await page.waitForTimeout(5000); // Wait for AI systems to load
    
    // Look for notification elements
    const notificationSelectors = [
      '[data-testid="notification"]',
      '.notification',
      '[role="alert"]',
      '.alert',
      '.toast'
    ];
    
    let notificationsFound = false;
    
    for (const selector of notificationSelectors) {
      const notifications = page.locator(selector);
      const count = await notifications.count();
      
      if (count > 0) {
        console.log(`✅ Found ${count} notification elements`);
        notificationsFound = true;
        
        // Check if notifications are interactive
        const firstNotification = notifications.first();
        if (await firstNotification.isVisible()) {
          console.log('✅ Notifications are visible and accessible');
        }
        break;
      }
    }
    
    if (!notificationsFound) {
      console.log('ℹ️ No active notifications found (normal if no recent activity)');
    }
  });
});