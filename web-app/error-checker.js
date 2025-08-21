const { chromium } = require('playwright');

async function checkPageErrors() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Capture console errors
  page.on('console', message => {
    if (message.type() === 'error') {
      console.log(`❌ Console Error: ${message.text()}`);
    }
  });

  // Capture JavaScript errors
  page.on('pageerror', error => {
    console.log(`❌ JavaScript Error: ${error.message}`);
  });

  const baseUrl = 'http://localhost:3001';
  
  try {
    console.log('Testing Transport page for specific errors...');
    const response = await page.goto(baseUrl + '/transport', { 
      waitUntil: 'domcontentloaded',
      timeout: 15000 
    });
    
    console.log(`Status: ${response?.status()}`);
    
    // Wait a bit for any async errors
    await page.waitForTimeout(3000);
    
    // Check for specific error content
    const pageContent = await page.content();
    
    // Look for specific error patterns
    const errorPatterns = [
      'moreDropdownLinks.contact',
      'moreDropdownLinks.company', 
      'moreDropdownLinks.legal',
      'TypeError',
      'ReferenceError',
      'Cannot read properties',
      'undefined'
    ];
    
    console.log('\nChecking for specific error patterns...');
    for (const pattern of errorPatterns) {
      if (pageContent.includes(pattern)) {
        console.log(`❌ Found error pattern: ${pattern}`);
      }
    }
    
    // Check specific DOM elements that might be causing issues
    const headerExists = await page.locator('header').count() > 0;
    const footerExists = await page.locator('footer').count() > 0;
    
    console.log(`\nDOM Structure:`);
    console.log(`Header exists: ${headerExists}`);
    console.log(`Footer exists: ${footerExists}`);
    
  } catch (error) {
    console.log(`❌ Failed to load page: ${error.message}`);
  }

  await browser.close();
}

checkPageErrors().catch(console.error);