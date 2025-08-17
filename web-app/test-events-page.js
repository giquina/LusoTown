const { chromium } = require('playwright');

async function testEventsPage() {
  console.log('Testing redesigned events page...');
  
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
  
  try {
    console.log('Navigating to events page...');
    
    const response = await page.goto('http://localhost:3001/events', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    console.log(`Status: ${response.status()}`);
    
    // Wait for page to render
    await page.waitForTimeout(3000);
    
    // Check if page has loaded without errors
    const pageText = await page.textContent('body');
    console.log('Page loaded, checking content...');
    
    if (pageText.includes('Something went wrong')) {
      console.log('❌ Events page has an error');
    } else if (pageText.includes('Events') || pageText.includes('Eventos')) {
      console.log('✅ Events page loaded successfully');
      
      // Check for event cards
      const eventCards = await page.$$('.grid');
      console.log(`Found ${eventCards.length} grid containers`);
      
      // Check page title
      const title = await page.title();
      console.log(`Page title: ${title}`);
      
    } else {
      console.log('? Events page loaded but content unclear');
    }
    
  } catch (error) {
    console.log('❌ Failed to test events page:', error.message);
  }
  
  await browser.close();
  console.log('Test completed');
}

testEventsPage().catch(console.error);