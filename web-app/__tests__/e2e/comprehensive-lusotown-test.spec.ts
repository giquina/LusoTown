import { test, expect, Page } from '@playwright/test';

interface TestResult {
  url: string;
  status: 'success' | 'error' | 'warning';
  errors: string[];
  warnings: string[];
  loadTime: number;
  title: string;
}

interface NavigationItem {
  name: string;
  selector: string;
  expectedUrl?: string;
}

const BASE_URL = 'https://web-gmm2y44rp-giquinas-projects.vercel.app';

test.describe('LusoTown Comprehensive Platform Test', () => {
  let testResults: TestResult[] = [];
  let consoleErrors: string[] = [];
  let consoleWarnings: string[] = [];

  test.beforeEach(async ({ page }) => {
    // Reset error tracking for each test
    consoleErrors = [];
    consoleWarnings = [];

    // Listen for console errors and warnings
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(`[${msg.type()}] ${msg.text()}`);
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(`[${msg.type()}] ${msg.text()}`);
      }
    });

    // Listen for page errors
    page.on('pageerror', error => {
      consoleErrors.push(`[Page Error] ${error.message}`);
    });

    // Listen for failed requests
    page.on('requestfailed', request => {
      consoleErrors.push(`[Request Failed] ${request.url()} - ${request.failure()?.errorText}`);
    });
  });

  async function testPage(page: Page, url: string, pageName: string): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      console.log(`Testing ${pageName}: ${url}`);
      
      const response = await page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      // Wait for page to be fully loaded
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000); // Additional wait for dynamic content

      const loadTime = Date.now() - startTime;
      const title = await page.title();
      
      let status: 'success' | 'error' | 'warning' = 'success';
      
      // Check if page loaded successfully
      if (!response || !response.ok()) {
        status = 'error';
        consoleErrors.push(`HTTP ${response?.status()} for ${url}`);
      } else if (consoleErrors.length > 0) {
        status = 'warning';
      }

      const result: TestResult = {
        url,
        status,
        errors: [...consoleErrors],
        warnings: [...consoleWarnings],
        loadTime,
        title
      };

      // Reset for next page
      consoleErrors = [];
      consoleWarnings = [];

      return result;
    } catch (error) {
      const loadTime = Date.now() - startTime;
      return {
        url,
        status: 'error',
        errors: [`Navigation failed: ${error}`],
        warnings: [],
        loadTime,
        title: 'Failed to load'
      };
    }
  }

  test('1. Homepage and Initial Load', async ({ page }) => {
    const result = await testPage(page, BASE_URL, 'Homepage');
    testResults.push(result);
    
    // Check for key homepage elements
    try {
      await expect(page).toHaveTitle(/LusoTown/i);
      
      // Check for main navigation elements
      const nav = page.locator('nav, header');
      await expect(nav).toBeVisible();
      
    } catch (error) {
      result.errors.push(`Homepage validation failed: ${error}`);
      result.status = 'error';
    }
  });

  test('2. Header Navigation Testing', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Common header navigation items to test
    const headerNavItems: NavigationItem[] = [
      { name: 'Home', selector: 'a[href="/"], a[href="#home"]' },
      { name: 'Events', selector: 'a[href*="event"], a[href="/eventos"]' },
      { name: 'Directory', selector: 'a[href*="directory"], a[href*="diretorio"]' },
      { name: 'Chat', selector: 'a[href*="chat"], a[href*="mensagem"]' },
      { name: 'Profiles', selector: 'a[href*="profile"], a[href*="perfil"]' },
      { name: 'Community', selector: 'a[href*="community"], a[href*="comunidade"]' },
      { name: 'Academy', selector: 'a[href*="academy"], a[href*="academia"]' },
      { name: 'Services', selector: 'a[href*="service"], a[href*="servico"]' },
      { name: 'About', selector: 'a[href*="about"], a[href*="sobre"]' }
    ];

    for (const navItem of headerNavItems) {
      try {
        const element = page.locator(navItem.selector).first();
        
        if (await element.isVisible()) {
          console.log(`Testing header nav: ${navItem.name}`);
          
          // Get the href before clicking
          const href = await element.getAttribute('href');
          
          if (href) {
            let targetUrl = href;
            if (href.startsWith('/')) {
              targetUrl = BASE_URL + href;
            }
            
            await element.click();
            await page.waitForLoadState('networkidle', { timeout: 10000 });
            
            const result = await testPage(page, targetUrl, `Header Nav - ${navItem.name}`);
            testResults.push(result);
          }
        }
      } catch (error) {
        testResults.push({
          url: 'Navigation item',
          status: 'error',
          errors: [`Header nav ${navItem.name} failed: ${error}`],
          warnings: [],
          loadTime: 0,
          title: `Nav Error - ${navItem.name}`
        });
      }
    }
  });

  test('3. Footer Navigation Testing', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // Common footer navigation items
    const footerNavItems: NavigationItem[] = [
      { name: 'Terms', selector: 'a[href*="terms"], a[href*="termo"]' },
      { name: 'Privacy', selector: 'a[href*="privacy"], a[href*="privacidade"]' },
      { name: 'Contact', selector: 'a[href*="contact"], a[href*="contato"]' },
      { name: 'Support', selector: 'a[href*="support"], a[href*="suporte"]' },
      { name: 'Help', selector: 'a[href*="help"], a[href*="ajuda"]' },
      { name: 'Social Media', selector: 'a[href*="twitter"], a[href*="instagram"], a[href*="facebook"]' }
    ];

    for (const navItem of footerNavItems) {
      try {
        const elements = page.locator(navItem.selector);
        const count = await elements.count();
        
        for (let i = 0; i < Math.min(count, 3); i++) {
          const element = elements.nth(i);
          
          if (await element.isVisible()) {
            console.log(`Testing footer nav: ${navItem.name} (${i + 1})`);
            
            const href = await element.getAttribute('href');
            
            if (href) {
              let targetUrl = href;
              if (href.startsWith('/')) {
                targetUrl = BASE_URL + href;
              }
              
              // Handle external links differently
              if (href.startsWith('http') && !href.includes('lusotown')) {
                testResults.push({
                  url: href,
                  status: 'success',
                  errors: [],
                  warnings: [`External link not tested: ${href}`],
                  loadTime: 0,
                  title: `External Link - ${navItem.name}`
                });
                continue;
              }
              
              await element.click();
              await page.waitForLoadState('networkidle', { timeout: 10000 });
              
              const result = await testPage(page, targetUrl, `Footer Nav - ${navItem.name}`);
              testResults.push(result);
              
              // Go back to homepage for next test
              await page.goto(BASE_URL);
              await page.waitForLoadState('networkidle');
              await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            }
          }
        }
      } catch (error) {
        testResults.push({
          url: 'Footer navigation',
          status: 'error',
          errors: [`Footer nav ${navItem.name} failed: ${error}`],
          warnings: [],
          loadTime: 0,
          title: `Footer Error - ${navItem.name}`
        });
      }
    }
  });

  test('4. Main Content Areas Testing', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Test buttons and interactive elements
    const interactiveElements = [
      'button:visible',
      'a[role="button"]:visible',
      '.btn:visible',
      '[class*="button"]:visible',
      'a[href]:visible:not([href*="mailto"]):not([href*="tel"])'
    ];

    for (const selector of interactiveElements) {
      try {
        const elements = page.locator(selector);
        const count = await elements.count();
        
        // Test first 5 elements of each type to avoid too many tests
        for (let i = 0; i < Math.min(count, 5); i++) {
          const element = elements.nth(i);
          
          if (await element.isVisible()) {
            const text = await element.textContent();
            const href = await element.getAttribute('href');
            
            console.log(`Testing interactive element: ${text?.slice(0, 50) || selector}`);
            
            if (href && href.startsWith('/')) {
              const targetUrl = BASE_URL + href;
              
              try {
                await element.click();
                await page.waitForLoadState('networkidle', { timeout: 10000 });
                
                const result = await testPage(page, targetUrl, `Interactive Element - ${text?.slice(0, 30) || 'Unknown'}`);
                testResults.push(result);
                
                // Go back to homepage
                await page.goto(BASE_URL);
                await page.waitForLoadState('networkidle');
              } catch (error) {
                testResults.push({
                  url: targetUrl,
                  status: 'error',
                  errors: [`Interactive element failed: ${error}`],
                  warnings: [],
                  loadTime: 0,
                  title: `Interactive Error - ${text?.slice(0, 30) || 'Unknown'}`
                });
              }
            }
          }
        }
      } catch (error) {
        console.log(`Error testing selector ${selector}: ${error}`);
      }
    }
  });

  test('5. Specific Page Types Testing', async ({ page }) => {
    const specificPages = [
      '/eventos',
      '/events', 
      '/business-directory',
      '/diretorio',
      '/membership',
      '/adesao',
      '/transport',
      '/transporte',
      '/academy',
      '/academia',
      '/tours',
      '/passeios',
      '/streaming',
      '/about',
      '/sobre',
      '/contact',
      '/contato',
      '/privacy',
      '/terms',
      '/help',
      '/support'
    ];

    for (const path of specificPages) {
      const url = BASE_URL + path;
      const result = await testPage(page, url, `Specific Page - ${path}`);
      testResults.push(result);
    }
  });

  test('6. Mobile Navigation Testing', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Look for mobile menu toggle
    const mobileMenuSelectors = [
      'button[aria-label*="menu"]',
      'button[aria-expanded]',
      '.hamburger',
      '[data-testid="mobile-menu"]',
      'button:has-text("Menu")',
      'button:has-text("☰")'
    ];

    for (const selector of mobileMenuSelectors) {
      try {
        const element = page.locator(selector);
        
        if (await element.isVisible()) {
          console.log('Testing mobile menu with selector:', selector);
          
          await element.click();
          await page.waitForTimeout(1000);
          
          // Look for mobile navigation items
          const mobileNavItems = page.locator('nav a, [role="menu"] a, .mobile-nav a');
          const count = await mobileNavItems.count();
          
          console.log(`Found ${count} mobile navigation items`);
          
          // Test first few mobile nav items
          for (let i = 0; i < Math.min(count, 3); i++) {
            try {
              const navItem = mobileNavItems.nth(i);
              const href = await navItem.getAttribute('href');
              const text = await navItem.textContent();
              
              if (href && href.startsWith('/')) {
                console.log(`Testing mobile nav item: ${text}`);
                
                await navItem.click();
                await page.waitForLoadState('networkidle', { timeout: 10000 });
                
                const result = await testPage(page, BASE_URL + href, `Mobile Nav - ${text || href}`);
                testResults.push(result);
                
                // Go back and reopen mobile menu
                await page.goto(BASE_URL);
                await page.waitForLoadState('networkidle');
                await element.click();
                await page.waitForTimeout(500);
              }
            } catch (error) {
              console.log(`Error testing mobile nav item ${i}: ${error}`);
            }
          }
          
          break; // Exit loop once we find working mobile menu
        }
      } catch (error) {
        console.log(`Mobile menu selector ${selector} failed: ${error}`);
      }
    }
  });

  test.afterAll(async () => {
    // Generate comprehensive report
    console.log('\n=== LUSOTOWN COMPREHENSIVE TEST REPORT ===\n');
    
    const successfulPages = testResults.filter(r => r.status === 'success');
    const warningPages = testResults.filter(r => r.status === 'warning');
    const errorPages = testResults.filter(r => r.status === 'error');
    
    console.log(`📊 SUMMARY:`);
    console.log(`Total pages tested: ${testResults.length}`);
    console.log(`✅ Successful: ${successfulPages.length}`);
    console.log(`⚠️  Warnings: ${warningPages.length}`);
    console.log(`❌ Errors: ${errorPages.length}`);
    console.log(`📈 Success rate: ${((successfulPages.length / testResults.length) * 100).toFixed(1)}%`);
    
    if (errorPages.length > 0) {
      console.log('\n❌ PAGES WITH ERRORS:');
      errorPages.forEach(result => {
        console.log(`\n🔴 ${result.title || result.url}`);
        console.log(`   URL: ${result.url}`);
        console.log(`   Load time: ${result.loadTime}ms`);
        result.errors.forEach(error => {
          console.log(`   Error: ${error}`);
        });
      });
    }
    
    if (warningPages.length > 0) {
      console.log('\n⚠️ PAGES WITH WARNINGS:');
      warningPages.forEach(result => {
        console.log(`\n🟡 ${result.title || result.url}`);
        console.log(`   URL: ${result.url}`);
        console.log(`   Load time: ${result.loadTime}ms`);
        result.warnings.forEach(warning => {
          console.log(`   Warning: ${warning}`);
        });
        result.errors.forEach(error => {
          console.log(`   Error: ${error}`);
        });
      });
    }
    
    console.log('\n✅ SUCCESSFUL PAGES:');
    successfulPages.forEach(result => {
      console.log(`✅ ${result.title || result.url} (${result.loadTime}ms)`);
    });
    
    // Performance analysis
    const avgLoadTime = testResults.reduce((sum, r) => sum + r.loadTime, 0) / testResults.length;
    const slowPages = testResults.filter(r => r.loadTime > 5000);
    
    console.log('\n📈 PERFORMANCE ANALYSIS:');
    console.log(`Average load time: ${avgLoadTime.toFixed(0)}ms`);
    console.log(`Slow pages (>5s): ${slowPages.length}`);
    
    if (slowPages.length > 0) {
      console.log('\n🐌 SLOW LOADING PAGES:');
      slowPages.forEach(result => {
        console.log(`${result.url}: ${result.loadTime}ms`);
      });
    }
    
    // Recommendations
    console.log('\n🔧 RECOMMENDATIONS:');
    
    if (errorPages.length > 0) {
      console.log('1. Fix broken pages and navigation links');
      console.log('2. Address JavaScript errors in console');
      console.log('3. Verify all API endpoints are working');
    }
    
    if (slowPages.length > 0) {
      console.log('4. Optimize slow-loading pages');
      console.log('5. Consider lazy loading for heavy content');
    }
    
    if (warningPages.length > 0) {
      console.log('6. Review console warnings for potential issues');
      console.log('7. Implement proper error handling');
    }
    
    console.log('\n=== END REPORT ===\n');
  });
});