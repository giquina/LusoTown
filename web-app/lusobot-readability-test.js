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
      await page.goto('http://localhost:3003', { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      // Wait for page to load
      await page.waitForTimeout(3000);
      
      // Take a "before" screenshot
      console.log('📸 Taking "before" screenshot...');
      await page.screenshot({ 
        path: `lusobot-before-${name.toLowerCase().replace(/\s+/g, '-')}.png`,
        fullPage: true
      });
      
      // Look for LusoBot widget
      console.log('🔍 Looking for LusoBot widget...');
      const lusoBotWidget = page.locator('[data-testid="lusobot-widget"], .lusobot-widget, button:has-text("LusoBot"), [class*="lusobot"], [id*="lusobot"]').first();
      
      // Try multiple selectors to find the widget
      const possibleSelectors = [
        'button[class*="fixed"][class*="bottom"]',
        '[class*="chat"][class*="widget"]',
        '[class*="bot"][class*="widget"]',
        'button:has-text("Chat")',
        'button:has-text("Help")',
        '[data-testid*="chat"]',
        '[data-testid*="bot"]'
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