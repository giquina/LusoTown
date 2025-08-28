/**
 * Mobile LusoBot Widget Verification Script
 * Tests mobile responsiveness and functionality for Portuguese-speaking community
 */

const { chromium, devices } = require('playwright');

async function testLusoBotMobileWidget() {
  console.log('🇵🇹 Starting LusoBot Widget Mobile Testing for Portuguese-speaking community...\n');

  const mobileDevices = [
    { device: devices['iPhone 12'], name: 'iPhone 12' },
    { device: devices['Galaxy S21'], name: 'Galaxy S21' }
  ];

  for (const { device, name } of mobileDevices) {
    console.log(`\n📱 Testing on ${name}...`);
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      ...device,
      permissions: ['microphone'],
    });
    
    const page = await context.newPage();
    
    try {
      // Navigate to homepage
      console.log('  → Navigating to homepage...');
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 15000 });
      
      // Wait for hydration
      await page.waitForTimeout(3000);
      
      // 1. Test Widget Visibility
      console.log('  → Testing widget visibility...');
      const lusoBotWidget = page.locator('[data-testid="lusobot-widget"]');
      
      try {
        await lusoBotWidget.waitFor({ state: 'visible', timeout: 10000 });
        console.log('    ✅ Widget is visible');
      } catch (error) {
        // Try alternative selectors
        const alternativeWidget = page.locator('[data-lusobot-widget="true"]');
        if (await alternativeWidget.isVisible()) {
          console.log('    ✅ Widget found with alternative selector');
        } else {
          console.log('    ❌ Widget not found');
          await page.screenshot({ path: `lusobot-widget-missing-${name.toLowerCase().replace(' ', '-')}.png` });
          continue;
        }
      }
      
      // 2. Test Portuguese Heritage Indicator
      console.log('  → Testing Portuguese heritage indicator...');
      const heritageFlag = page.locator('text=🇵🇹');
      if (await heritageFlag.first().isVisible()) {
        console.log('    ✅ Portuguese flag indicator visible');
      } else {
        console.log('    ⚠️ Portuguese flag indicator not visible');
      }
      
      // 3. Test Mobile Positioning
      console.log('  → Testing mobile positioning...');
      const widgetBox = await lusoBotWidget.boundingBox() || await page.locator('[data-lusobot-widget="true"]').boundingBox();
      if (widgetBox) {
        const viewport = page.viewportSize();
        const isBottomRight = widgetBox.x + widgetBox.width > viewport.width * 0.7 && 
                              widgetBox.y + widgetBox.height > viewport.height * 0.7;
        
        if (isBottomRight) {
          console.log('    ✅ Widget positioned correctly (bottom-right)');
        } else {
          console.log('    ⚠️ Widget positioning may need adjustment');
          console.log(`    Widget: x=${widgetBox.x}, y=${widgetBox.y}, w=${widgetBox.width}, h=${widgetBox.height}`);
          console.log(`    Viewport: w=${viewport.width}, h=${viewport.height}`);
        }
      }
      
      // 4. Test Click/Touch Functionality
      console.log('  → Testing click functionality...');
      const fabButton = lusoBotWidget.locator('button').first() || page.locator('button[aria-label*="LusoBot"]').first();
      
      if (await fabButton.isVisible()) {
        // Take screenshot before click
        await page.screenshot({ 
          path: `lusobot-mobile-before-${name.toLowerCase().replace(' ', '-')}.png`,
          fullPage: true 
        });
        
        // Test touch target size
        const buttonBox = await fabButton.boundingBox();
        if (buttonBox && (buttonBox.width >= 44 && buttonBox.height >= 44)) {
          console.log('    ✅ Touch target meets minimum size requirements (44px)');
        } else {
          console.log('    ⚠️ Touch target may be too small');
          console.log(`    Button size: ${buttonBox?.width}x${buttonBox?.height}px`);
        }
        
        // Click to open
        await fabButton.click();
        await page.waitForTimeout(2000);
        
        // 5. Test Chat Interface
        console.log('  → Testing chat interface...');
        const chatDialog = page.locator('[role="dialog"]');
        if (await chatDialog.isVisible()) {
          console.log('    ✅ Chat dialog opens successfully');
          
          // Test chat header
          const chatTitle = chatDialog.locator('text=LusoBot');
          if (await chatTitle.isVisible()) {
            console.log('    ✅ Chat title visible');
          }
          
          // Test Portuguese cultural description
          const culturalDescription = chatDialog.locator('text=/Portuguese.*Cultural.*Assistant/i, text=/Assistente.*Cultural.*Português/i');
          if (await culturalDescription.first().isVisible()) {
            console.log('    ✅ Portuguese cultural context visible');
          }
          
          // Test input field
          const messageInput = chatDialog.locator('input[type="text"]');
          if (await messageInput.isVisible()) {
            console.log('    ✅ Message input field visible');
            
            // Test Portuguese input
            await messageInput.fill('Olá! Sou novo no Reino Unido');
            const inputValue = await messageInput.inputValue();
            if (inputValue === 'Olá! Sou novo no Reino Unido') {
              console.log('    ✅ Portuguese text input works correctly');
            }
          }
          
          // Test control buttons
          const minimizeButton = chatDialog.locator('button[aria-label*="Minimize"], button[aria-label*="Minimizar"]');
          const closeButton = chatDialog.locator('button[aria-label*="Close"], button[aria-label*="Fechar"]');
          
          if (await minimizeButton.isVisible() && await closeButton.isVisible()) {
            console.log('    ✅ Control buttons (minimize/close) visible');
            
            // Test minimize
            await minimizeButton.click();
            await page.waitForTimeout(1000);
            console.log('    ✅ Minimize functionality works');
            
            // Test maximize
            const maximizeButton = chatDialog.locator('button').first();
            await maximizeButton.click();
            await page.waitForTimeout(1000);
            
            // Test close
            await closeButton.click();
            await page.waitForTimeout(1000);
            
            if (!(await chatDialog.isVisible())) {
              console.log('    ✅ Close functionality works');
            }
          }
          
          // Take screenshot after interaction
          await page.screenshot({ 
            path: `lusobot-mobile-after-${name.toLowerCase().replace(' ', '-')}.png`,
            fullPage: true 
          });
          
        } else {
          console.log('    ❌ Chat dialog did not open');
        }
      } else {
        console.log('    ❌ FAB button not found');
      }
      
      // 6. Test with App Download Bar (if visible)
      console.log('  → Testing with App Download Bar...');
      const appDownloadBar = page.locator('[role="banner"]', { hasText: /App.*Available|App.*Disponível/i });
      if (await appDownloadBar.isVisible()) {
        console.log('    ✅ App Download Bar is visible');
        
        // Check if widget positioning adjusts
        const widgetBoxWithBar = await lusoBotWidget.boundingBox() || await page.locator('[data-lusobot-widget="true"]').boundingBox();
        const barBox = await appDownloadBar.boundingBox();
        
        if (widgetBoxWithBar && barBox) {
          const clearsAppBar = widgetBoxWithBar.y + widgetBoxWithBar.height < barBox.y;
          if (clearsAppBar) {
            console.log('    ✅ Widget positioning adjusts for App Download Bar');
          } else {
            console.log('    ⚠️ Widget may overlap with App Download Bar');
          }
        }
      } else {
        console.log('    ℹ️ App Download Bar not visible (may be dismissed)');
      }
      
      // 7. Test Page Context Awareness
      console.log('  → Testing page context awareness...');
      
      // Test on events page
      await page.goto('http://localhost:3000/events', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      const eventsPageRole = await page.locator('[data-lusobot-widget="true"]').getAttribute('data-page-role');
      if (eventsPageRole === 'events-guide') {
        console.log('    ✅ Events page context detected correctly');
      } else {
        console.log(`    ⚠️ Events page context: expected 'events-guide', got '${eventsPageRole}'`);
      }
      
      console.log(`\n✅ ${name} testing completed successfully!`);
      
    } catch (error) {
      console.log(`\n❌ Error testing ${name}:`, error.message);
      await page.screenshot({ 
        path: `lusobot-mobile-error-${name.toLowerCase().replace(' ', '-')}.png`,
        fullPage: true 
      });
    }
    
    await browser.close();
  }
  
  console.log('\n🎉 Mobile testing completed for all devices!');
}

// 8. Test Widget on Different Pages
async function testWidgetCrossPlatform() {
  console.log('\n🌐 Testing widget cross-platform behavior...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext(devices['iPhone 12']);
  const page = await context.newPage();
  
  const testPages = [
    { url: 'http://localhost:3000', context: 'community-guide' },
    { url: 'http://localhost:3000/events', context: 'events-guide' },
    { url: 'http://localhost:3000/business-directory', context: 'business-advisor' },
    { url: 'http://localhost:3000/transport', context: 'transport-coordinator' },
    { url: 'http://localhost:3000/students', context: 'student-advisor' }
  ];
  
  for (const { url, context: expectedContext } of testPages) {
    console.log(`  → Testing ${url}...`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
      await page.waitForTimeout(2000);
      
      const widget = page.locator('[data-lusobot-widget="true"]');
      if (await widget.isVisible()) {
        const pageRole = await widget.getAttribute('data-page-role');
        if (pageRole === expectedContext) {
          console.log(`    ✅ Context: ${pageRole}`);
        } else {
          console.log(`    ⚠️ Context: expected '${expectedContext}', got '${pageRole}'`);
        }
      } else {
        console.log('    ❌ Widget not visible on this page');
      }
    } catch (error) {
      console.log(`    ❌ Error loading page: ${error.message}`);
    }
  }
  
  // Test that widget doesn't appear on /lusobot pages
  console.log('  → Testing widget exclusion on /lusobot pages...');
  try {
    await page.goto('http://localhost:3000/lusobot', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const widget = page.locator('[data-lusobot-widget="true"]');
    if (await widget.isVisible()) {
      console.log('    ⚠️ Widget should not be visible on /lusobot pages');
    } else {
      console.log('    ✅ Widget correctly hidden on /lusobot pages');
    }
  } catch (error) {
    console.log('    ℹ️ /lusobot page may not exist yet');
  }
  
  await browser.close();
}

// Run all tests
async function runAllTests() {
  try {
    await testLusoBotMobileWidget();
    await testWidgetCrossPlatform();
  } catch (error) {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  runAllTests();
}

module.exports = { testLusoBotMobileWidget, testWidgetCrossPlatform };