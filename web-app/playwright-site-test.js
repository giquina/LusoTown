// Playwright-based comprehensive site testing
const { test, expect } = require('@playwright/test');

const SITE_URL = 'https://web-5vmpcxfvy-giquinas-projects.vercel.app';
const TEST_PAGES = [
  { name: 'Homepage', path: '', timeout: 10000 },
  { name: 'Events', path: '/events', timeout: 15000 },
  { name: 'Matches', path: '/matches', timeout: 15000 },
  { name: 'Business Directory', path: '/business-directory', timeout: 15000 },
  { name: 'Pricing', path: '/pricing', timeout: 10000 },
  { name: 'Login', path: '/login', timeout: 10000 },
  { name: 'Signup', path: '/signup', timeout: 10000 }
];

test.describe('LusoTown Live Site Testing', () => {
  
  TEST_PAGES.forEach(page => {
    test(`Test ${page.name} page`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
      });
      const browserPage = await context.newPage();
      
      const errors = [];
      const consoleMessages = [];
      
      // Capture console messages
      browserPage.on('console', msg => {
        consoleMessages.push({
          type: msg.type(),
          text: msg.text(),
          page: page.name
        });
      });
      
      // Capture errors
      browserPage.on('pageerror', error => {
        errors.push({
          message: error.message,
          stack: error.stack,
          page: page.name
        });
      });
      
      try {
        console.log(`Testing ${page.name} at ${SITE_URL}${page.path}`);
        
        // Navigate to page
        await browserPage.goto(`${SITE_URL}${page.path}`, {
          waitUntil: 'domcontentloaded',
          timeout: page.timeout
        });
        
        // Wait for page to stabilize
        await browserPage.waitForTimeout(5000);
        
        // Check for duplicate LusoBot widgets
        const lusoBotWidgets = await browserPage.locator('[aria-label*="LusoBot"], [class*="lusobot"]').count();
        console.log(`${page.name}: Found ${lusoBotWidgets} LusoBot widget(s)`);
        
        // Check for multiple navigation components
        const mobileNavs = await browserPage.locator('[class*="mobile-nav"], [class*="MobileNavigation"]').count();
        console.log(`${page.name}: Found ${mobileNavs} mobile navigation(s)`);
        
        // Check if main navigation works
        try {
          const headerMenu = browserPage.locator('header nav');
          await expect(headerMenu).toBeVisible();
          console.log(`${page.name}: Header navigation visible`);
        } catch (navError) {
          console.error(`${page.name}: Navigation issue - ${navError.message}`);
        }
        
        // Take screenshot
        await browserPage.screenshot({ 
          path: `screenshots/${page.name.toLowerCase().replace(' ', '-')}.png`,
          fullPage: true 
        });
        
        // Log results
        console.log(`${page.name} Results:`);
        console.log(`- Console Messages: ${consoleMessages.filter(m => m.page === page.name).length}`);
        console.log(`- Errors: ${errors.filter(e => e.page === page.name).length}`);
        console.log(`- LusoBot Widgets: ${lusoBotWidgets}`);
        console.log(`- Mobile Navigation Elements: ${mobileNavs}`);
        
      } catch (error) {
        console.error(`Failed to test ${page.name}: ${error.message}`);
      }
      
      await context.close();
    });
  });
  
  test('Mobile responsive test', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 } // iPhone SE
    });
    const page = await context.newPage();
    
    await page.goto(SITE_URL);
    await page.waitForTimeout(5000);
    
    // Check mobile-specific issues
    const mobileElements = await page.locator('[class*="mobile"], [class*="sm:"], [class*="md:"]').count();
    console.log(`Mobile elements found: ${mobileElements}`);
    
    await page.screenshot({ path: 'screenshots/mobile-homepage.png' });
    await context.close();
  });
  
});
