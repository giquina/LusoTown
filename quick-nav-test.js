const { chromium } = require('playwright');

async function diagnoseLusoTownNavigation() {
  console.log('🔍 Starting LusoTown Navigation Diagnostic...\n');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Enable console logging
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.log('❌ JS ERROR:', msg.text());
    }
  });
  
  page.on('pageerror', (error) => {
    console.log('💥 PAGE ERROR:', error.message);
  });
  
  try {
    console.log('📱 Loading homepage...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    const title = await page.title();
    console.log('✅ Homepage loaded. Title:', title);
    
    // Take screenshot of homepage
    await page.screenshot({ path: 'homepage-diagnostic.png', fullPage: true });
    console.log('📸 Homepage screenshot saved');
    
    // Find all navigation links
    console.log('\n🔗 Finding navigation links...');
    const navLinks = await page.$$eval('nav a, header a, [role="navigation"] a', links => 
      links.map(link => ({
        text: link.textContent?.trim(),
        href: link.href,
        visible: link.offsetParent !== null
      }))
    );
    
    console.log(`Found ${navLinks.length} navigation links:`);
    navLinks.forEach((link, i) => {
      if (link.text && link.href) {
        console.log(`  ${i + 1}. "${link.text}" -> ${link.href} ${link.visible ? '✅' : '❌'}`);
      }
    });
    
    // Look specifically for "What's Happening" or similar
    console.log('\n🎯 Looking for "What\'s Happening" link...');
    const whatsHappeningSelectors = [
      'text="What\'s Happening"',
      'text="Events"', 
      'text="Discover"',
      'text="Community Events"',
      'a[href*="events"]',
      'a[href*="happening"]',
      'nav a:has-text("Event")',
      'nav a:has-text("Happening")'
    ];
    
    let foundWhatsHappening = false;
    
    for (const selector of whatsHappeningSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          const isVisible = await element.isVisible();
          const text = await element.textContent();
          const href = await element.getAttribute('href');
          
          console.log(`✅ Found with "${selector}": "${text}" -> "${href}" (visible: ${isVisible})`);
          
          if (isVisible) {
            foundWhatsHappening = true;
            console.log('\n🖱️ Attempting to click the link...');
            
            // Click and see what happens
            await element.click();
            await page.waitForTimeout(3000); // Wait for navigation
            
            const newUrl = page.url();
            const newTitle = await page.title();
            console.log(`📍 After click: ${newUrl}`);
            console.log(`📝 New title: ${newTitle}`);
            
            // Check if there's an error on the page
            const errorElements = await page.$$('text=/404/i, text=/error/i, text=/not found/i, text=/something went wrong/i');
            if (errorElements.length > 0) {
              console.log('❌ ERROR DETECTED on the page:');
              for (const errorEl of errorElements) {
                const errorText = await errorEl.textContent();
                console.log(`   "${errorText}"`);
              }
            } else {
              console.log('✅ No obvious error messages found');
              
              // Check if content loaded
              const bodyText = await page.$eval('body', el => el.textContent?.length || 0);
              console.log(`📄 Page content length: ${bodyText} characters`);
              
              if (bodyText < 100) {
                console.log('⚠️ WARNING: Very little content loaded - possible loading issue');
              }
            }
            
            await page.screenshot({ path: 'after-navigation.png', fullPage: true });
            console.log('📸 Post-navigation screenshot saved');
            
            break;
          }
        }
      } catch (e) {
        // Continue with next selector
      }
    }
    
    if (!foundWhatsHappening) {
      console.log('❌ Could not find "What\'s Happening" link');
      
      // Let's see what the actual navigation structure looks like
      console.log('\n🧭 Full navigation structure:');
      const navStructure = await page.evaluate(() => {
        const navs = document.querySelectorAll('nav, header nav, [role="navigation"]');
        return Array.from(navs).map((nav, i) => {
          const links = Array.from(nav.querySelectorAll('a'));
          return {
            navIndex: i,
            navClass: nav.className,
            links: links.map(link => ({
              text: link.textContent?.trim(),
              href: link.href,
              classes: link.className
            }))
          };
        });
      });
      
      console.log(JSON.stringify(navStructure, null, 2));
    }
    
    // Test a few other common links
    console.log('\n🧪 Testing other navigation links...');
    await page.goto('http://localhost:3000'); // Go back to home
    await page.waitForTimeout(1000);
    
    const commonLinks = [
      'text="Home"',
      'text="About"', 
      'text="Community"',
      'text="Business"',
      'text="Contact"',
      'a[href="/"]',
      'a[href="/about"]',
      'a[href="/community"]'
    ];
    
    for (const selector of commonLinks) {
      try {
        const element = await page.$(selector);
        if (element && await element.isVisible()) {
          const text = await element.textContent();
          const href = await element.getAttribute('href');
          console.log(`🔗 Testing: "${text}" -> "${href}"`);
          
          await element.click();
          await page.waitForTimeout(2000);
          
          const resultUrl = page.url();
          const hasError = await page.$('text=/404/i, text=/error/i') !== null;
          
          console.log(`   Result: ${resultUrl} ${hasError ? '❌ ERROR' : '✅ OK'}`);
          
          await page.goto('http://localhost:3000');
          await page.waitForTimeout(500);
        }
      } catch (e) {
        // Continue
      }
    }
    
  } catch (error) {
    console.log('💥 Critical error:', error.message);
  }
  
  console.log('\n🏁 Diagnostic complete. Check screenshots for visual inspection.');
  await browser.close();
}

diagnoseLusoTownNavigation().catch(console.error);