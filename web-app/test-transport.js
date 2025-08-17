const { chromium } = require('playwright');

async function testTransportPage() {
  console.log('Starting transport page test...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Browser error:', msg.text());
    }
  });
  
  // Listen for page errors
  page.on('pageerror', error => {
    console.log('Page error:', error.message);
  });
  
  try {
    console.log('Navigating to transport page...');
    
    const response = await page.goto('http://localhost:3001/transport', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    console.log(`Response status: ${response.status()}`);
    
    // Wait for page to render
    await page.waitForTimeout(3000);
    
    // Check if the page has loaded without errors
    const pageText = await page.textContent('body');
    console.log('Page loaded, checking for errors...');
    
    if (pageText.includes('Something went wrong')) {
      console.log('✗ Transport page has an error');
      console.log('Error text found in page');
    } else if (pageText.includes('Transport')) {
      console.log('✓ Transport page loaded successfully');
    } else {
      console.log('? Transport page loaded but content unclear');
    }
    
    // Check page title
    const title = await page.title();
    console.log(`Page title: ${title}`);
    
  } catch (error) {
    console.log('✗ Failed to test transport page:', error.message);
  }
  
  await browser.close();
}

testTransportPage().catch(console.error);