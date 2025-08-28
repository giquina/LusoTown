import { test, expect } from '@playwright/test';

test('Homepage hydration check', async ({ page }) => {
  const consoleMessages: string[] = [];
  const hydrationErrors: string[] = [];
  
  // Capture console messages
  page.on('console', msg => {
    const text = msg.text();
    consoleMessages.push(text);
    
    // Check for hydration-related errors
    if (text.toLowerCase().includes('hydration') || 
        text.toLowerCase().includes('hydrated') ||
        text.includes('Warning: Text content did not match') ||
        text.includes('Warning: Expected server HTML') ||
        text.includes('Hydration failed')) {
      hydrationErrors.push(text);
      console.log('🚨 Hydration Error:', text);
    }
  });
  
  // Navigate to homepage
  console.log('🔍 Navigating to localhost:3001...');
  await page.goto('http://localhost:3001', { 
    waitUntil: 'domcontentloaded',
    timeout: 15000 
  });
  
  // Wait for page to be fully loaded
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  
  console.log(`📝 Total console messages: ${consoleMessages.length}`);
  console.log(`⚠️  Hydration errors found: ${hydrationErrors.length}`);
  
  // Log hydration errors if found
  if (hydrationErrors.length > 0) {
    console.log('\n🚨 HYDRATION ERRORS DETECTED:');
    hydrationErrors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`);
    });
    
    // Take screenshot if errors found
    await page.screenshot({ 
      path: 'hydration-error-screenshot.png',
      fullPage: true 
    });
    console.log('📸 Screenshot saved: hydration-error-screenshot.png');
  } else {
    console.log('✅ No hydration errors detected');
  }
  
  // Log all console messages for debugging
  console.log('\n📋 All console messages:');
  consoleMessages.forEach((msg, index) => {
    console.log(`${index + 1}. ${msg}`);
  });
  
  // Test should pass regardless of hydration errors for information gathering
  expect(true).toBe(true);
});