import { test, expect } from '@playwright/test';

test.describe('Homepage Analysis', () => {
  test('should capture full homepage screenshot and analyze layout', async ({ page }) => {
    // Navigate to homepage
    await page.goto('http://localhost:3001');
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Take full page screenshot
    await page.screenshot({ 
      path: 'homepage-full-analysis.png', 
      fullPage: true 
    });
    
    // Check for common elements
    const header = page.locator('header');
    const footer = page.locator('footer');
    const main = page.locator('main');
    
    // Basic structure validation
    await expect(header).toBeVisible();
    await expect(main).toBeVisible();
    await expect(footer).toBeVisible();
    
    // Check page title
    await expect(page).toHaveTitle(/LusoTown/);
    
    console.log('✅ Homepage screenshot captured: homepage-full-analysis.png');
  });
  
  test('should analyze footer structure', async ({ page }) => {
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('networkidle');
    
    // Find all footer sections
    const footerSections = page.locator('footer section');
    const footerCount = await footerSections.count();
    
    console.log(`Footer has ${footerCount} sections`);
    
    // Get footer text content for analysis
    const footerContent = await page.locator('footer').textContent();
    console.log('Footer content length:', footerContent?.length || 0);
    
    // Take screenshot of just the footer area
    await page.locator('footer').screenshot({ 
      path: 'footer-analysis.png' 
    });
    
    console.log('✅ Footer screenshot captured: footer-analysis.png');
  });
});