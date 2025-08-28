const { chromium, devices } = require('playwright');

async function testLusoBotReadability() {
  console.log('🤖 Starting LusoBot readability test...');
  
  const browser = await chromium.launch({ 
    headless: true,
    slowMo: 1000 
  });
  
  // Test both mobile and desktop
  const contexts = [
    {
      name: 'Mobile (iPhone 12)',
      context: await browser.newContext({
        ...devices['iPhone 12'],
        viewport: { width: 375, height: 812 }
      })
    },
    {
      name: 'Desktop',
      context: await browser.newContext({
        viewport: { width: 1280, height: 720 }
      })
    }
  ];

  for (const { name, context } of contexts) {
    console.log(`\n📱 Testing ${name}...`);
    
    const page = await context.newPage();
    
    try {
      // Navigate to localhost:3000
      console.log('🌐 Navigating to localhost:3000...');
      await page.goto('http://localhost:3002', { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      // Wait for page to load
      await page.waitForTimeout(3000);
      
      // Check for console errors
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          console.log(`❌ Console error: ${msg.text()}`);
        }
      });
      
      // Log all buttons on the page to debug
      const allButtons = await page.locator('button').all();
      console.log(`Found ${allButtons.length} buttons on page`);
      
      // Log all elements with 'fixed' class
      const fixedElements = await page.locator('[class*="fixed"]').all();
      console.log(`Found ${fixedElements.length} fixed positioned elements`);
      
      // Check if we can find any Portuguese flag emoji
      const flagElements = await page.locator(':has-text("🇵🇹")').all();
      console.log(`Found ${flagElements.length} elements with Portuguese flag`);
      
      // Check if the LusoBotWrapper is even in the DOM
      const wrapperExists = await page.locator('div').count();
      console.log(`Total div elements on page: ${wrapperExists}`);
      
      // Take a "before" screenshot
      console.log('📸 Taking "before" screenshot...');
      await page.screenshot({ 
        path: `lusobot-before-${name.toLowerCase().replace(/\s+/g, '-')}.png`,
        fullPage: true
      });
      
      // Look for LusoBot widget
      console.log('🔍 Looking for LusoBot widget...');
      
      // Wait a bit longer for the dynamic component to load
      await page.waitForTimeout(5000);
      
      // Try multiple selectors to find the widget (floating button with Portuguese flag)
      const possibleSelectors = [
        // Look for floating chat button
        'button[aria-label*="LusoBot"]',
        'button[aria-label*="Portuguese Cultural Assistant"]',
        'button:has-text("🇵🇹")',
        'button[class*="rounded-full"][class*="fixed"]',
        'button[class*="rounded-full"]:has-text("🇵🇹")',
        // Look for motion button (framer-motion)
        '[class*="motion-button"]',
        // Look for the widget wrapper
        '[class*="fixed"][class*="bottom"][class*="right"]',
        // Generic chat/bot selectors
        'button[class*="fixed"][class*="bottom"]',
        '[class*="chat"][class*="widget"]',
        '[class*="bot"][class*="widget"]',
        'button:has-text("Chat")',
      ];
      
      let widgetFound = false;
      
      for (const selector of possibleSelectors) {
        const elements = await page.locator(selector).count();
        if (elements > 0) {
          console.log(`✅ Found potential widget with selector: ${selector}`);
          await page.locator(selector).first().click();
          widgetFound = true;
          break;
        }
      }
      
      if (!widgetFound) {
        console.log('❌ Widget not found, taking screenshot of page to debug...');
        await page.screenshot({ 
          path: `page-debug-${name.toLowerCase().replace(/\s+/g, '-')}.png`,
          fullPage: true
        });
      } else {
        // Wait for chat to open
        await page.waitForTimeout(2000);
        
        // Take screenshot with chat open
        console.log('📸 Taking screenshot with LusoBot chat open...');
        await page.screenshot({ 
          path: `lusobot-chat-open-${name.toLowerCase().replace(/\s+/g, '-')}.png`,
          fullPage: true
        });
        
        // Try to type a message to see text readability
        const messageInput = page.locator('input[placeholder*="message"], input[placeholder*="Type"], textarea[placeholder*="message"], textarea[placeholder*="Type"]').first();
        
        if (await messageInput.count() > 0) {
          await messageInput.fill('Hello, can you help me find Portuguese events in London?');
          await page.waitForTimeout(1000);
          
          // Take screenshot with typed message
          await page.screenshot({ 
            path: `lusobot-with-message-${name.toLowerCase().replace(/\s+/g, '-')}.png`,
            fullPage: true
          });
        }
      }
      
    } catch (error) {
      console.error(`❌ Error testing ${name}:`, error.message);
      await page.screenshot({ 
        path: `error-${name.toLowerCase().replace(/\s+/g, '-')}.png`,
        fullPage: true
      });
    }
    
    await context.close();
  }
  
  await browser.close();
  console.log('✅ LusoBot readability test complete!');
}

testLusoBotReadability().catch(console.error);