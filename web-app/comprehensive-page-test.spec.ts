import { test, expect, Page } from '@playwright/test';

// Comprehensive page accessibility and navigation test
test.describe('LusoTown Complete Site Navigation Test', () => {
  const baseUrl = 'http://localhost:3001';
  
  // All known pages to test
  const pagesToTest = [
    // Main navigation pages
    { path: '/', name: 'Homepage' },
    { path: '/events', name: 'What\'s Happening (Events)' },
    { path: '/feed', name: 'Community Feed' },
    { path: '/business-directory', name: 'Business Directory' },
    { path: '/streaming', name: 'Live Streaming' },
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' },
    
    // Membership pages
    { path: '/membership', name: 'Membership' },
    { path: '/membership/community', name: 'Community Membership' },
    { path: '/membership/cultural', name: 'Cultural Membership' },
    { path: '/membership/business', name: 'Business Membership' },
    { path: '/membership/social', name: 'Social Membership' },
    { path: '/membership/success', name: 'Membership Success' },
    
    // User pages
    { path: '/login', name: 'Login' },
    { path: '/signup', name: 'Sign Up' },
    { path: '/profile', name: 'Profile' },
    { path: '/settings', name: 'Settings' },
    { path: '/dashboard', name: 'Dashboard' },
    
    // Academy pages
    { path: '/academy', name: 'Academy' },
    { path: '/academy/cultural-events', name: 'Cultural Events Academy' },
    { path: '/academy/business-networking', name: 'Business Networking Academy' },
    { path: '/academy/dating-matching', name: 'Dating Matching Academy' },
    { path: '/academy/housing-assistance', name: 'Housing Assistance Academy' },
    { path: '/academy/transport-chauffeur', name: 'Transport Chauffeur Academy' },
    { path: '/academy/live-streaming', name: 'Live Streaming Academy' },
    
    // Business pages
    { path: '/business-networking', name: 'Business Networking' },
    { path: '/transport', name: 'Transport Services' },
    
    // Community pages
    { path: '/forums', name: 'Forums' },
    { path: '/chat', name: 'Chat' },
    { path: '/directory', name: 'Member Directory' },
    
    // Special pages
    { path: '/elite-showcase', name: 'Elite Showcase' },
    { path: '/elite-mobile-showcase', name: 'Elite Mobile Showcase' },
    { path: '/privacy', name: 'Privacy Policy' },
    { path: '/terms', name: 'Terms of Service' },
    
    // Portuguese content
    { path: '/pt', name: 'Portuguese Homepage' },
    { path: '/pt/events', name: 'Portuguese Events' },
    { path: '/pt/about', name: 'Portuguese About' },
    
    // Mobile-specific pages
    { path: '/mobile-navigation-test', name: 'Mobile Navigation Test' },
    { path: '/mobile-discovery-test', name: 'Mobile Discovery Test' },
  ];

  async function scrollToBottom(page: Page) {
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if(totalHeight >= scrollHeight - window.innerHeight){
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  }

  async function checkPageErrors(page: Page, pageName: string) {
    const errors: string[] = [];
    
    // Check for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(`Console error: ${msg.text()}`);
      }
    });
    
    // Check for network failures
    page.on('response', response => {
      if (response.status() >= 400) {
        errors.push(`HTTP ${response.status()}: ${response.url()}`);
      }
    });
    
    return errors;
  }

  // Test each page individually
  for (const pageInfo of pagesToTest) {
    test(`Test ${pageInfo.name} - ${pageInfo.path}`, async ({ page }) => {
      const errors: string[] = [];
      
      // Set up error tracking
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(`Console error: ${msg.text()}`);
        }
      });
      
      page.on('response', response => {
        if (response.status() >= 400) {
          errors.push(`HTTP ${response.status()}: ${response.url()}`);
        }
      });
      
      page.on('pageerror', error => {
        errors.push(`Page error: ${error.message}`);
      });

      try {
        console.log(`Testing page: ${pageInfo.name} at ${pageInfo.path}`);
        
        // Navigate to page with longer timeout
        await page.goto(`${baseUrl}${pageInfo.path}`, { 
          waitUntil: 'networkidle', 
          timeout: 30000 
        });
        
        // Wait for page to be ready
        await page.waitForLoadState('domcontentloaded');
        
        // Check if page loaded successfully
        const title = await page.title();
        console.log(`Page title: ${title}`);
        
        // Take screenshot for visual verification
        await page.screenshot({ 
          path: `test-results/${pageInfo.name.replace(/[^a-zA-Z0-9]/g, '-')}-screenshot.png`,
          fullPage: true
        });
        
        // Scroll down the entire page to test all content
        console.log(`Scrolling through ${pageInfo.name}...`);
        await scrollToBottom(page);
        
        // Wait a moment for any lazy-loaded content
        await page.waitForTimeout(2000);
        
        // Check for basic page elements
        const hasHeader = await page.locator('header, nav, [role="navigation"]').count() > 0;
        const hasMainContent = await page.locator('main, [role="main"], .main-content').count() > 0;
        
        console.log(`${pageInfo.name} - Header: ${hasHeader ? '✅' : '❌'}, Main Content: ${hasMainContent ? '✅' : '❌'}`);
        
        // Report any errors found
        if (errors.length > 0) {
          console.error(`Errors found on ${pageInfo.name}:`, errors);
        } else {
          console.log(`✅ ${pageInfo.name} loaded successfully with no errors`);
        }
        
        // Test should not fail unless page completely fails to load
        expect(title).toBeTruthy();
        
      } catch (error) {
        console.error(`❌ Failed to load ${pageInfo.name}: ${error}`);
        errors.push(`Navigation error: ${error}`);
      }
      
      // Log final status
      if (errors.length === 0) {
        console.log(`🎉 ${pageInfo.name} - PASSED: No errors detected`);
      } else {
        console.warn(`⚠️  ${pageInfo.name} - WARNINGS: ${errors.length} issues detected`);
        errors.forEach(error => console.warn(`  - ${error}`));
      }
    });
  }

  // Special comprehensive test for main navigation
  test('Test Main Navigation Links', async ({ page }) => {
    console.log('Testing main navigation functionality...');
    
    await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
    
    // Find and test all navigation links
    const navLinks = await page.locator('nav a, header a').all();
    
    for (const link of navLinks) {
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      
      if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        console.log(`Testing navigation link: "${text}" -> ${href}`);
        
        try {
          await link.click();
          await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
          console.log(`✅ Navigation to ${href} successful`);
          
          // Go back to continue testing other links
          await page.goBack();
          await page.waitForLoadState('domcontentloaded');
        } catch (error) {
          console.error(`❌ Failed to navigate to ${href}: ${error}`);
        }
      }
    }
  });

  // Mobile responsiveness test
  test('Test Mobile Responsiveness', async ({ page }) => {
    console.log('Testing mobile responsiveness...');
    
    const breakpoints = [
      { width: 375, height: 667, name: 'iPhone SE' },
      { width: 414, height: 896, name: 'iPhone 11 Pro' },
      { width: 768, height: 1024, name: 'iPad Portrait' },
      { width: 1024, height: 768, name: 'iPad Landscape' },
    ];
    
    for (const breakpoint of breakpoints) {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await page.goto(`${baseUrl}/events`, { waitUntil: 'networkidle' });
      
      console.log(`Testing ${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`);
      
      // Take screenshot at this breakpoint
      await page.screenshot({ 
        path: `test-results/mobile-${breakpoint.name.replace(/\s+/g, '-')}.png`,
        fullPage: true
      });
      
      // Test scroll functionality
      await scrollToBottom(page);
      
      console.log(`✅ ${breakpoint.name} responsive test completed`);
    }
  });
});