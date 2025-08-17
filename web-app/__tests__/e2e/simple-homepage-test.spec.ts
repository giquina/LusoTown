import { test, expect } from '@playwright/test';

test('LusoTown Homepage Loads Successfully', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/');
  
  // Check that the page loads and has the expected title
  await expect(page).toHaveTitle(/LusoTown/);
  
  // Check for main heading
  const heading = page.locator('h1').first();
  await expect(heading).toBeVisible();
  
  // Check for navigation
  const nav = page.locator('nav, header');
  await expect(nav).toBeVisible();
  
  // Take a screenshot for manual review
  await page.screenshot({ path: 'homepage-screenshot.png', fullPage: true });
  
  console.log('✅ Homepage loaded successfully!');
  console.log('📸 Screenshot saved as homepage-screenshot.png');
});

test('Basic Navigation Test', async ({ page }) => {
  await page.goto('/');
  
  // Check if About link exists and works
  const aboutLink = page.locator('a[href*="/about"]').first();
  if (await aboutLink.count() > 0) {
    await aboutLink.click();
    await expect(page).toHaveURL(/.*about.*/);
    console.log('✅ About page navigation works');
  }
  
  // Go back to homepage
  await page.goto('/');
  
  // Check if Events link exists and works
  const eventsLink = page.locator('a[href*="/events"]').first();
  if (await eventsLink.count() > 0) {
    await eventsLink.click();
    await expect(page).toHaveURL(/.*events.*/);
    console.log('✅ Events page navigation works');
  }
});