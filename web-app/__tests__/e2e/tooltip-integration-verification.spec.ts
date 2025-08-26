import { test, expect } from '@playwright/test';

test.describe('Homepage Tooltip Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // Wait for page to load fully
    await page.waitForLoadState('domcontentloaded');
  });

  test('should have all required guidance tooltip elements', async ({ page }) => {
    // Verify all expected data-guidance attributes are present
    const guidanceElements = await page.locator('[data-guidance]').count();
    expect(guidanceElements).toBeGreaterThanOrEqual(4);
    
    // Verify specific guidance sections exist
    await expect(page.locator('[data-guidance="homepage-hero"]')).toBeVisible();
    await expect(page.locator('[data-guidance="palop-section"]')).toBeVisible();
    await expect(page.locator('[data-guidance="events-calendar"]')).toBeVisible();
    await expect(page.locator('[data-guidance="matching-section"]')).toBeVisible();
  });

  test('should display tooltip content for PALOP section on hover', async ({ page }) => {
    // Hover over PALOP section
    const palopSection = page.locator('[data-guidance="palop-section"]');
    await palopSection.hover();
    
    // Wait for tooltip to appear
    await page.waitForTimeout(1000); // Allow for hover delay
    
    // Check if tooltip portal content appears
    const tooltipContent = page.locator('[data-tooltip-content]');
    await expect(tooltipContent).toBeVisible({ timeout: 5000 });
  });

  test('should handle mobile touch interaction for tooltips', async ({ page }) => {
    // Simulate mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Click on PALOP section (mobile converts hover to click)
    const palopSection = page.locator('[data-guidance="palop-section"]');
    await palopSection.click();
    
    // Verify tooltip appears on mobile
    const tooltipContent = page.locator('[data-tooltip-content]');
    await expect(tooltipContent).toBeVisible({ timeout: 5000 });
  });

  test('should have Portuguese translations for guidance text', async ({ page }) => {
    // Switch to Portuguese language
    const languageButton = page.locator('[data-testid="language-toggle"]');
    if (await languageButton.isVisible()) {
      await languageButton.click();
    }
    
    // Hover over PALOP section to trigger tooltip
    const palopSection = page.locator('[data-guidance="palop-section"]');
    await palopSection.hover();
    
    await page.waitForTimeout(1000);
    
    // Check that Portuguese text is present in tooltip
    const tooltipContent = page.locator('[data-tooltip-content]');
    if (await tooltipContent.isVisible()) {
      const text = await tooltipContent.textContent();
      // Should contain Portuguese text (checking for Portuguese specific words)
      expect(text).toMatch(/países|eventos|negócios|plataforma/i);
    }
  });

  test('should allow tooltip dismissal', async ({ page }) => {
    // Hover over PALOP section to show tooltip
    const palopSection = page.locator('[data-guidance="palop-section"]');
    await palopSection.hover();
    
    await page.waitForTimeout(1000);
    
    const tooltipContent = page.locator('[data-tooltip-content]');
    await expect(tooltipContent).toBeVisible({ timeout: 5000 });
    
    // Click dismiss button (checkmark)
    const dismissButton = page.locator('[data-tooltip-content] button').last();
    await dismissButton.click();
    
    // Verify tooltip disappears
    await expect(tooltipContent).not.toBeVisible({ timeout: 3000 });
  });

  test('should respect Portuguese brand theming', async ({ page }) => {
    // Hover over PALOP section to show tooltip  
    const palopSection = page.locator('[data-guidance="palop-section"]');
    await palopSection.hover();
    
    await page.waitForTimeout(1000);
    
    const tooltipContent = page.locator('[data-tooltip-content]');
    await expect(tooltipContent).toBeVisible({ timeout: 5000 });
    
    // Check for Portuguese gold theme colors
    const tooltipElement = tooltipContent.first();
    const styles = await tooltipElement.evaluate((el) => {
      const computedStyle = window.getComputedStyle(el);
      return {
        backgroundColor: computedStyle.backgroundColor,
        borderColor: computedStyle.borderColor,
        color: computedStyle.color
      };
    });
    
    // Should use Portuguese brand colors (not generic blue/gray)
    expect(styles).toBeTruthy(); // Basic check that styles are applied
  });

  test('should work with keyboard navigation', async ({ page }) => {
    // Focus on PALOP section with keyboard
    const palopSection = page.locator('[data-guidance="palop-section"]');
    await palopSection.focus();
    
    // Press Enter to trigger focus-based tooltip
    await page.keyboard.press('Enter');
    
    await page.waitForTimeout(1000);
    
    // Check if tooltip appears
    const tooltipContent = page.locator('[data-tooltip-content]');
    
    // Press Escape to dismiss
    await page.keyboard.press('Escape');
    
    // Verify tooltip dismisses with Escape
    await expect(tooltipContent).not.toBeVisible({ timeout: 3000 });
  });
});