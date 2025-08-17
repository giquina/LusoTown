const { chromium } = require('playwright');

async function simplePageTest() {
  console.log('Starting simple page test...');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Console error:', msg.text());
    }
  });
  
  // Listen for page errors
  page.on('pageerror', error => {
    console.log('Page error:', error.message);
  });
  
  const pagesToTest = [
    '/',
    '/transport',
    '/my-network',
    '/events',
    '/matches',
    '/live',
    '/students',
    '/premium-membership',
    '/chauffeur',
    '/groups',
    '/about',
    '/contact'
  ];
  
  for (const path of pagesToTest) {
    try {
      console.log(`\nTesting ${path}...`);
      
      const response = await page.goto(`http://localhost:3002${path}`, { 
        waitUntil: 'domcontentloaded',
        timeout: 15000 
      });
      
      console.log(`Status: ${response.status()}`);
      
      // Wait briefly
      await page.waitForTimeout(1000);
      
      // Check page title
      const title = await page.title();
      console.log(`Title: ${title}`);
      
      // Check if page has basic content
      const hasContent = await page.evaluate(() => {
        return document.body && document.body.innerText.trim().length > 100;
      });
      
      console.log(`Has content: ${hasContent}`);
      
      if (title.includes('404') || title.includes('error')) {
        console.log('❌ Page returned error');
      } else if (hasContent) {
        console.log('✅ Page loaded successfully');
      } else {
        console.log('⚠️ Page loaded but minimal content');
      }
      
    } catch (error) {
      console.log(`❌ Error loading ${path}: ${error.message}`);
    }
  }
  
  await browser.close();
  console.log('\nTest completed');
}

simplePageTest().catch(console.error);