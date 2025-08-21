const { chromium } = require('playwright');

async function checkSpecificErrors() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const errors = [];
  
  // Capture console errors
  page.on('console', message => {
    if (message.type() === 'error') {
      errors.push(`Console Error: ${message.text()}`);
      console.log(`❌ Console Error: ${message.text()}`);
    }
  });

  // Capture JavaScript errors
  page.on('pageerror', error => {
    errors.push(`JavaScript Error: ${error.message}`);
    console.log(`❌ JavaScript Error: ${error.message}`);
  });

  const baseUrl = 'http://localhost:3001';
  
  try {
    console.log('Loading homepage with detailed error tracking...');
    const response = await page.goto(baseUrl + '/', { 
      waitUntil: 'domcontentloaded',
      timeout: 15000 
    });
    
    console.log(`Status: ${response?.status()}`);
    
    // Wait for any async errors
    await page.waitForTimeout(5000);
    
    // Try to interact with elements that might cause errors
    try {
      const langToggle = await page.locator('[data-testid="language-toggle"], .language-toggle').first();
      if (await langToggle.count() > 0) {
        console.log('Testing language toggle...');
        await langToggle.click();
        await page.waitForTimeout(1000);
      }
    } catch (e) {
      console.log(`Language toggle error: ${e.message}`);
    }

    // Check if header dropdown works
    try {
      const moreButton = await page.locator('text="More"').first();
      if (await moreButton.count() > 0) {
        console.log('Testing More dropdown...');
        await moreButton.hover();
        await page.waitForTimeout(1000);
      }
    } catch (e) {
      console.log(`More dropdown error: ${e.message}`);
    }
    
  } catch (error) {
    console.log(`❌ Failed to load page: ${error.message}`);
    errors.push(`Page load error: ${error.message}`);
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total errors captured: ${errors.length}`);
  
  if (errors.length > 0) {
    console.log('\nAll errors:');
    errors.forEach((error, i) => {
      console.log(`${i + 1}. ${error}`);
    });
  }

  await browser.close();
  return errors;
}

checkSpecificErrors().catch(console.error);