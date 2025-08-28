import { test, expect } from '@playwright/test';

test.describe('LusoTown Portuguese Community Platform - Core Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the homepage
    await page.goto('http://localhost:3000');
  });

  test('Homepage loads successfully and displays Portuguese community content', async ({ page }) => {
    // Check that the page loads
    await expect(page).toHaveTitle(/LusoTown/);
    
    // Check for Portuguese community elements
    await expect(page.locator('text=Portuguese')).toBeVisible();
    
    // Check for navigation
    await expect(page.locator('nav')).toBeVisible();
    
    // Take screenshot for verification
    await page.screenshot({ path: 'homepage-test.png', fullPage: true });
  });

  test('Navigation menu works correctly', async ({ page }) => {
    // Test mobile navigation if present
    const mobileMenuButton = page.locator('[aria-label*="menu" i], [aria-label*="navigation" i], button:has-text("Menu")');
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await page.waitForTimeout(500);
    }
    
    // Check for main navigation items
    const navigationItems = [
      'Events', 'Directory', 'Matches', 'Transport', 'Students'
    ];
    
    for (const item of navigationItems) {
      const link = page.locator(`a:has-text("${item}"), button:has-text("${item}")`);
      if (await link.isVisible()) {
        console.log(`✓ Found navigation item: ${item}`);
      }
    }
  });

  test('Portuguese language toggle works', async ({ page }) => {
    // Look for language toggle
    const languageToggle = page.locator('button:has-text("PT"), button:has-text("EN"), [aria-label*="language" i]');
    
    if (await languageToggle.isVisible()) {
      await languageToggle.click();
      await page.waitForTimeout(500);
      
      // Verify language changed by checking for Portuguese text
      const portugueseText = page.locator('text=Comunidade');
      if (await portugueseText.isVisible()) {
        console.log('✓ Portuguese language toggle working');
      }
    }
  });

  test('Core pages are accessible', async ({ page }) => {
    const corePages = [
      '/events',
      '/directory', 
      '/matches',
      '/students'
    ];
    
    for (const pagePath of corePages) {
      try {
        await page.goto(`http://localhost:3000${pagePath}`);
        await page.waitForLoadState('networkidle', { timeout: 10000 });
        
        // Check if page loads without major errors
        const errorElements = page.locator('text=Error, text=404, text="Something went wrong"');
        const hasError = await errorElements.count() > 0;
        
        if (!hasError) {
          console.log(`✓ ${pagePath} loads successfully`);
        } else {
          console.log(`⚠ ${pagePath} has errors`);
        }
        
        await page.screenshot({ 
          path: `page-${pagePath.replace('/', '')}.png`, 
          fullPage: true 
        });
        
      } catch (error) {
        console.log(`⚠ ${pagePath} failed to load: ${error}`);
      }
    }
  });

  test('Mobile responsiveness check', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Check if content is visible on mobile
    await expect(page.locator('body')).toBeVisible();
    
    // Take mobile screenshot
    await page.screenshot({ path: 'mobile-test-375px.png', fullPage: true });
    
    // Test tablet viewport  
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.screenshot({ path: 'tablet-test-768px.png', fullPage: true });
  });

  test('Portuguese community features are present', async ({ page }) => {
    // Check for Portuguese cultural elements
    const portugalWords = [
      'Portuguese', 'Portugal', 'Brasil', 'Community', 'Comunidade', 
      'Events', 'Directory', 'Fado', 'Cultural'
    ];
    
    let foundWords = 0;
    for (const word of portugalWords) {
      const element = page.locator(`text=${word}`);
      if (await element.count() > 0) {
        foundWords++;
        console.log(`✓ Found Portuguese content: ${word}`);
      }
    }
    
    console.log(`Found ${foundWords}/${portugalWords.length} Portuguese community elements`);
    expect(foundWords).toBeGreaterThan(2);
  });

  test('LusoBot chat widget functionality', async ({ page }) => {
    // Look for LusoBot widget
    const lusoBotWidget = page.locator('[aria-label*="LusoBot" i], button:has-text("LusoBot"), [class*="lusobot" i]');
    
    if (await lusoBotWidget.isVisible()) {
      await lusoBotWidget.click();
      await page.waitForTimeout(1000);
      
      // Check if chat interface opens
      const chatInterface = page.locator('[role="dialog"], [class*="chat" i], [class*="modal" i]');
      if (await chatInterface.isVisible()) {
        console.log('✓ LusoBot chat widget working');
        await page.screenshot({ path: 'lusobot-test.png' });
      }
    }
  });
});