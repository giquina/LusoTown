import { test, expect } from '@playwright/test';

test('LusoTown website basic functionality', async ({ page }) => {
  console.log('Testing LusoTown website at http://localhost:3000');
  
  // Navigate to the website
  await page.goto('http://localhost:3000', { 
    waitUntil: 'networkidle',
    timeout: 30000 
  });

  // Take a screenshot to see what's actually loading
  await page.screenshot({ path: 'website-screenshot.png', fullPage: true });
  console.log('Screenshot saved as website-screenshot.png');

  // Check for basic page elements
  const title = await page.title();
  console.log('Page title:', title);

  // Check if page contains basic content
  const bodyText = await page.locator('body').textContent();
  console.log('Page contains text:', bodyText?.length ? 'Yes' : 'No');
  
  // Check for JavaScript errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
      console.log('Console Error:', msg.text());
    }
  });

  // Wait a bit more for any async content to load
  await page.waitForTimeout(5000);

  // Check if main navigation or header exists
  const header = page.locator('header, nav, [data-testid*="header"], [data-testid*="nav"]');
  const headerExists = await header.count() > 0;
  console.log('Header/Navigation found:', headerExists);

  // Check for LusoTown specific content
  const lusoContent = await page.getByText('LusoTown').count();
  console.log('LusoTown text found:', lusoContent, 'times');

  // Report findings
  console.log('\n=== WEBSITE TEST RESULTS ===');
  console.log('Title:', title);
  console.log('Has content:', bodyText?.length ? 'Yes' : 'No');
  console.log('Header/Nav present:', headerExists);
  console.log('JavaScript errors:', errors.length);
  console.log('LusoTown branding:', lusoContent > 0 ? 'Present' : 'Missing');
  
  if (errors.length > 0) {
    console.log('Errors found:');
    errors.forEach(error => console.log('- ', error));
  }
});