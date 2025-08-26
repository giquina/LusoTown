import { test, expect } from '@playwright/test';

test('LusoTown Homepage Loads Successfully', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/');
  
  // Check that the page loads and has an expected title
  const title = await page.title();
  expect(/LusoTown|Portuguese Speakers Community/i.test(title)).toBe(true);
  
  // Check for main heading
  const heading = page.locator('h1').first();
  await expect(heading).toBeVisible();
  
  // Check for at least one visible navigation or header
  const anyNavOrHeader = page.locator('nav, header');
  const count = await anyNavOrHeader.count();
  expect(count).toBeGreaterThan(0);
  await expect(anyNavOrHeader.first()).toBeVisible();
  
  // Take a screenshot for manual review
  await page.screenshot({ path: 'homepage-screenshot.png', fullPage: false });
  
  // Screenshot saved for manual review
});

test('Basic Navigation Test', async ({ page }) => {
  await page.goto('/');
  
  // Check if About link exists and works
  const aboutLink = page.locator('a[href*="/about"]').first();
  if (await aboutLink.count() > 0) {
    await aboutLink.click();
    await expect(page).toHaveURL(/.*about.*/);
  // About page navigation works
  }
  
  // Go back to homepage
  await page.goto('/');
  
  // Check if Events link exists and works
  const eventsLink = page.locator('a[href*="/events"]').first();
  if (await eventsLink.count() > 0) {
    await eventsLink.click();
    await expect(page).toHaveURL(/.*events.*/);
  // Events page navigation works
  }
});