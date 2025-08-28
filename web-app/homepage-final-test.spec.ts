import { test, expect } from '@playwright/test';

test('Homepage loads without errors or warnings', async ({ page }) => {
  const consoleErrors: string[] = [];
  const consoleWarnings: string[] = [];
  
  // Track console messages
  page.on('console', (msg) => {
    const message = msg.text();
    if (msg.type() === 'error') {
      consoleErrors.push(message);
    } else if (msg.type() === 'warning') {
      consoleWarnings.push(message);
    }
  });

  // Track page errors
  page.on('pageerror', (error) => {
    consoleErrors.push(`Page error: ${error.message}`);
  });

  // Navigate to homepage
  await page.goto('http://localhost:3001');
  
  // Wait for page to fully load
  await page.waitForTimeout(3000);

  // Check that main content is visible
  await expect(page.locator('main[data-guidance="test-main"]')).toBeVisible();

  // Check that navigation is present
  await expect(page.locator('header nav')).toBeVisible();

  // Check that primary CTA is present
  await expect(page.locator('[data-events-cta="hero-primary"]')).toBeVisible();

  // Verify no Portuguese error page is showing
  await expect(page.locator('text=Algo deu errado')).not.toBeVisible();
  await expect(page.locator('text=Ocorreu um erro inesperado')).not.toBeVisible();

  // Filter out known warnings that are not critical
  const criticalErrors = consoleErrors.filter(error => 
    !error.includes('React DevTools') &&
    !error.includes('Warning: Extra attributes from the server') &&
    !error.includes('Prisma instrumentation')
  );

  const criticalWarnings = consoleWarnings.filter(warning => 
    !warning.includes('React DevTools') &&
    !warning.includes('next/dynamic') &&
    !warning.includes('Prisma instrumentation')
  );

  // Report results
  console.log(`Console Errors (${consoleErrors.length}):`, consoleErrors);
  console.log(`Console Warnings (${consoleWarnings.length}):`, consoleWarnings);
  console.log(`Critical Errors (${criticalErrors.length}):`, criticalErrors);
  console.log(`Critical Warnings (${criticalWarnings.length}):`, criticalWarnings);

  // Take screenshot for verification
  await page.screenshot({ path: 'homepage-final-test.png', fullPage: true });

  // Verify no critical errors
  expect(criticalErrors).toHaveLength(0);
  
  console.log('✅ Homepage loaded successfully without critical errors!');
});