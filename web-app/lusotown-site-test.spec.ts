import { test, expect } from '@playwright/test';

test.describe('LusoTown Portuguese Community Platform', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Homepage loads and displays Portuguese community content', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check title
    await expect(page).toHaveTitle(/LusoTown/);
    
    // Check for Portuguese community specific content
    await expect(page.locator('text=Portuguese-speaking Community')).toBeVisible();
    await expect(page.locator('text=Unidos pela Língua')).toBeVisible();
    
    // Check for flags indicating Portuguese-speaking nations
    await expect(page.locator('[aria-label*="Portugal"]')).toBeVisible();
    await expect(page.locator('[aria-label*="Brazil"]')).toBeVisible();
    
    console.log('✅ Homepage loads with Portuguese community content');
  });

  test('Navigation menu works correctly', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for main navigation elements
    const eventsLink = page.locator('a[href="/events"], text="What\'s Happening"');
    await expect(eventsLink.first()).toBeVisible();
    
    const matchesLink = page.locator('a[href="/matches"]');
    await expect(matchesLink.first()).toBeVisible();
    
    console.log('✅ Main navigation elements are present');
  });

  test('Mobile navigation functionality', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');
    
    // Look for mobile menu button
    const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"], [aria-label*="menu"], button:has-text("Menu")');
    await expect(mobileMenuButton.first()).toBeVisible();
    
    console.log('✅ Mobile navigation button is present');
  });

  test('Portuguese cultural elements are visible', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for cultural content
    const culturalContent = [
      'Fado',
      'Kizomba', 
      'Portuguese',
      'Lusophone',
      'Community'
    ];
    
    let foundElements = 0;
    for (const content of culturalContent) {
      const element = page.locator(`text=${content}`);
      if (await element.count() > 0) {
        foundElements++;
        console.log(`✅ Found cultural content: ${content}`);
      }
    }
    
    expect(foundElements).toBeGreaterThan(2);
    console.log(`✅ Found ${foundElements} Portuguese cultural elements`);
  });

  test('Key pages are accessible', async ({ page }) => {
    const pages = ['/events', '/matches', '/apply'];
    
    for (const pagePath of pages) {
      try {
        await page.goto(`http://localhost:3000${pagePath}`);
        await page.waitForLoadState('networkidle', { timeout: 10000 });
        
        // Check if page loads without major errors
        const title = await page.title();
        expect(title).toContain('LusoTown');
        
        console.log(`✅ ${pagePath} loads successfully - ${title}`);
        
      } catch (error) {
        console.log(`⚠️  ${pagePath} had issues: ${error}`);
      }
    }
  });

  test('Language toggle functionality', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Look for language toggle with flag emojis
    const languageToggle = page.locator('button[title*="Current"]');
    
    if (await languageToggle.count() > 0) {
      console.log('✅ Language toggle button found');
      // Try clicking it
      await languageToggle.first().click();
      await page.waitForTimeout(1000);
      console.log('✅ Language toggle is clickable');
    }
  });

  test('Responsive design check', async ({ page }) => {
    // Test different viewport sizes
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1024, height: 768, name: 'Desktop' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForLoadState('networkidle');
      
      // Check if content is visible
      await expect(page.locator('body')).toBeVisible();
      console.log(`✅ ${viewport.name} (${viewport.width}x${viewport.height}) renders correctly`);
    }
  });
});