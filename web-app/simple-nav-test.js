const { chromium } = require('playwright');

async function simpleNavTest() {
  console.log('🚀 Starting Simple Navigation Test...\n');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 } // Mobile first
  });
  
  const page = await context.newPage();
  
  try {
    console.log('📱 Step 1: Loading home page...');
    await page.goto('http://localhost:3000', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    // Wait a moment for React to hydrate
    await page.waitForTimeout(3000);
    
    console.log('✅ Home page loaded');
    
    // Take screenshot for debugging
    await page.screenshot({ path: '/tmp/home-page.png' });
    console.log('📸 Home page screenshot saved');
    
    // Check if main navigation exists
    console.log('🔍 Step 2: Looking for navigation...');
    const navLinks = await page.$$('a[href*="/events"], a:has-text("What"), a:has-text("Happening"), a:has-text("Events")');
    console.log(`Found ${navLinks.length} potential navigation links`);
    
    // Get all links on the page
    const allLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a')).map(a => ({
        href: a.href,
        text: a.textContent.trim(),
        visible: a.offsetWidth > 0 && a.offsetHeight > 0
      })).filter(link => link.text && link.href);
    });
    
    console.log('All links on page:');
    allLinks.forEach(link => {
      console.log(`  - "${link.text}" -> ${link.href} (${link.visible ? 'visible' : 'hidden'})`);
    });
    
    // Try to find and click events link
    const eventsLink = allLinks.find(link => 
      link.href.includes('/events') || 
      link.text.toLowerCase().includes('happening') ||
      link.text.toLowerCase().includes('events')
    );
    
    if (eventsLink) {
      console.log(`🎯 Found events link: "${eventsLink.text}" -> ${eventsLink.href}`);
      
      console.log('🔗 Step 3: Testing navigation...');
      try {
        await page.goto(eventsLink.href, { 
          waitUntil: 'domcontentloaded',
          timeout: 30000 
        });
        await page.waitForTimeout(5000); // Wait for React components to load
        
        await page.screenshot({ path: '/tmp/events-page.png' });
        console.log('📸 Events page screenshot saved');
        
        // Check for events page content
        const title = await page.title();
        console.log(`📄 Page title: ${title}`);
        
        const hasEventContent = await page.evaluate(() => {
          const text = document.body.textContent.toLowerCase();
          return text.includes('portuguese') || text.includes('events') || text.includes('cultural');
        });
        
        if (hasEventContent) {
          console.log('✅ Events page loaded with Portuguese/cultural content');
        } else {
          console.log('⚠️  Events page loaded but no Portuguese/cultural content detected');
        }
        
        // Check for mobile components
        console.log('📱 Step 4: Checking mobile components...');
        
        const mobileComponents = await page.evaluate(() => {
          return {
            hasSkeletonLoading: document.querySelector('[class*="animate-pulse"], [class*="skeleton"]') !== null,
            hasSwipeNavigation: document.querySelector('button:contains("🌙"), button:contains("🎉")') !== null,
            hasQuickFilters: document.querySelector('button:contains("🆓"), [class*="filter"]') !== null,
            hasLocationAware: document.querySelector('[class*="location"], button:contains("location")') !== null,
            hasPortugueseContent: document.body.textContent.toLowerCase().includes('portuguese'),
            hasCulturalContent: document.body.textContent.toLowerCase().includes('cultural')
          };
        });
        
        console.log('Mobile components check:');
        Object.entries(mobileComponents).forEach(([key, value]) => {
          console.log(`  ${value ? '✅' : '❌'} ${key}`);
        });
        
      } catch (navError) {
        console.log('❌ Navigation failed:', navError.message);
      }
    } else {
      console.log('❌ No events/navigation link found');
    }
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
  
  await browser.close();
  console.log('\n🏁 Test completed');
}

simpleNavTest().catch(console.error);