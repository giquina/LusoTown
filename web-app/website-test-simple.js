const puppeteer = require('puppeteer');

(async () => {
  console.log('🔍 Testing LusoTown website at http://localhost:3000...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Listen for console messages and errors
    const errors = [];
    const consoleMessages = [];
    
    page.on('console', msg => {
      consoleMessages.push(`${msg.type()}: ${msg.text()}`);
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      errors.push(`Page Error: ${error.message}`);
    });
    
    console.log('📡 Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Take screenshot
    await page.screenshot({ path: 'website-current-state.png' });
    console.log('📸 Screenshot saved as website-current-state.png');
    
    // Check page title
    const title = await page.title();
    console.log(`📄 Page Title: "${title}"`);
    
    // Check if main content is visible
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log(`📝 Page has content: ${bodyText.length > 0 ? 'YES' : 'NO'} (${bodyText.length} chars)`);
    
    // Check for specific elements
    const headerExists = await page.$('header') !== null;
    const navExists = await page.$('nav') !== null;
    const mainExists = await page.$('main') !== null;
    
    console.log(`🏗️ Header exists: ${headerExists}`);
    console.log(`🧭 Navigation exists: ${navExists}`);
    console.log(`📄 Main content exists: ${mainExists}`);
    
    // Check for LusoTown branding
    const lusoTownText = await page.evaluate(() => {
      return document.body.innerText.includes('LusoTown');
    });
    console.log(`🏷️ LusoTown branding found: ${lusoTownText}`);
    
    // Check for hydration errors
    const hydrationError = await page.evaluate(() => {
      return document.body.innerText.includes('Hydration failed') || 
             document.body.innerText.includes('hydration error') ||
             document.querySelector('[data-nextjs-dialog]') !== null;
    });
    console.log(`⚠️ Hydration error visible: ${hydrationError}`);
    
    // Wait a bit more and check again
    await page.waitForTimeout(3000);
    
    console.log('\n=== FINAL RESULTS ===');
    console.log(`✅ Page loads: YES`);
    console.log(`✅ Has content: ${bodyText.length > 0 ? 'YES' : 'NO'}`);
    console.log(`✅ Interactive: ${!hydrationError ? 'YES' : 'NO (hydration error)'}`);
    console.log(`📊 JavaScript errors: ${errors.length}`);
    
    if (errors.length > 0) {
      console.log('\n🚨 JavaScript Errors Found:');
      errors.forEach((error, i) => {
        console.log(`  ${i + 1}. ${error}`);
      });
    }
    
    if (hydrationError) {
      console.log('\n💡 ISSUE IDENTIFIED: Hydration error is blocking user interaction');
      console.log('   The HTML loads but React can\'t properly hydrate, showing error overlay');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();