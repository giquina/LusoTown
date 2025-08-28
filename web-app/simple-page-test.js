const { chromium } = require('playwright');

async function testAllPages() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();
  
  const baseUrl = 'http://localhost:3001';
  const results = [];
  
  // Pages to test
  const pagesToTest = [
    { path: '/', name: 'Homepage' },
    { path: '/events', name: 'What\'s Happening (Events)' },
    { path: '/feed', name: 'Community Feed' },
    { path: '/business-directory', name: 'Business Directory' },
    { path: '/streaming', name: 'Live Streaming' },
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' },
    { path: '/membership', name: 'Membership' },
    { path: '/membership/community', name: 'Community Membership' },
    { path: '/membership/cultural', name: 'Cultural Membership' },
    { path: '/membership/business', name: 'Business Membership' },
    { path: '/login', name: 'Login' },
    { path: '/signup', name: 'Sign Up' },
    { path: '/profile', name: 'Profile' },
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/academy', name: 'Academy' },
    { path: '/academy/cultural-events', name: 'Cultural Events Academy' },
    { path: '/academy/business-networking', name: 'Business Networking Academy' },
    { path: '/business-networking', name: 'Business Networking' },
    { path: '/transport', name: 'Transport Services' },
    { path: '/forums', name: 'Forums' },
    { path: '/chat', name: 'Chat' },
    { path: '/directory', name: 'Member Directory' },
    { path: '/privacy', name: 'Privacy Policy' },
    { path: '/terms', name: 'Terms of Service' }
  ];

  // Track errors
  const pageErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      pageErrors.push(`Console error: ${msg.text()}`);
    }
  });
  
  page.on('pageerror', error => {
    pageErrors.push(`Page error: ${error.message}`);
  });
  
  page.on('response', response => {
    if (response.status() >= 400) {
      pageErrors.push(`HTTP ${response.status()}: ${response.url()}`);
    }
  });

  console.log('🚀 Starting comprehensive page test...\n');

  for (const pageInfo of pagesToTest) {
    try {
      console.log(`📖 Testing: ${pageInfo.name} (${pageInfo.path})`);
      
      // Clear previous errors
      pageErrors.length = 0;
      
      // Navigate to page
      await page.goto(`${baseUrl}${pageInfo.path}`, { 
        waitUntil: 'networkidle', 
        timeout: 15000 
      });
      
      // Get page title
      const title = await page.title();
      
      // Scroll down to test entire page
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 100;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if(totalHeight >= scrollHeight - window.innerHeight){
              clearInterval(timer);
              resolve();
            }
          }, 50);
        });
      });
      
      // Wait for any lazy loading
      await page.waitForTimeout(1000);
      
      // Check for basic page elements
      const hasHeader = await page.locator('header, nav, [role="navigation"]').count() > 0;
      const hasContent = await page.locator('main, [role="main"], .main-content, article, section').count() > 0;
      
      const result = {
        name: pageInfo.name,
        path: pageInfo.path,
        title: title,
        status: pageErrors.length === 0 ? '✅ PASS' : '⚠️ WARNINGS',
        hasHeader: hasHeader,
        hasContent: hasContent,
        errors: [...pageErrors]
      };
      
      results.push(result);
      
      if (pageErrors.length === 0) {
        console.log(`   ✅ SUCCESS - Title: "${title}"`);
      } else {
        console.log(`   ⚠️  WARNINGS (${pageErrors.length} issues) - Title: "${title}"`);
        pageErrors.forEach(error => console.log(`      - ${error}`));
      }
      
      console.log(`   📱 Header: ${hasHeader ? '✅' : '❌'} | Content: ${hasContent ? '✅' : '❌'}\n`);
      
    } catch (error) {
      const result = {
        name: pageInfo.name,
        path: pageInfo.path,
        status: '❌ FAILED',
        error: error.message,
        hasHeader: false,
        hasContent: false,
        errors: [error.message]
      };
      
      results.push(result);
      console.log(`   ❌ FAILED - ${error.message}\n`);
    }
    
    // Small delay between tests
    await page.waitForTimeout(500);
  }

  // Test mobile responsiveness on key pages
  console.log('📱 Testing mobile responsiveness...\n');
  
  const mobileBreakpoints = [
    { width: 375, height: 667, name: 'iPhone SE' },
    { width: 768, height: 1024, name: 'iPad Portrait' },
  ];
  
  const keyPages = ['/', '/events', '/membership'];
  
  for (const breakpoint of mobileBreakpoints) {
    await page.setViewportSize(breakpoint);
    console.log(`📱 Testing ${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`);
    
    for (const pagePath of keyPages) {
      try {
        await page.goto(`${baseUrl}${pagePath}`, { waitUntil: 'networkidle', timeout: 10000 });
        
        // Scroll test on mobile
        await page.evaluate(async () => {
          await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 50;
            const timer = setInterval(() => {
              const scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight - window.innerHeight){
                clearInterval(timer);
                resolve();
              }
            }, 30);
          });
        });
        
        console.log(`   ✅ ${pagePath} responsive test passed`);
      } catch (error) {
        console.log(`   ❌ ${pagePath} responsive test failed: ${error.message}`);
      }
    }
  }

  // Generate summary report
  console.log('\n📊 COMPREHENSIVE TEST SUMMARY');
  console.log('=' .repeat(50));
  
  const totalTests = results.length;
  const passed = results.filter(r => r.status === '✅ PASS').length;
  const warnings = results.filter(r => r.status === '⚠️ WARNINGS').length;
  const failed = results.filter(r => r.status === '❌ FAILED').length;
  
  console.log(`Total Pages Tested: ${totalTests}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`⚠️  With Warnings: ${warnings}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`\nSuccess Rate: ${((passed / totalTests) * 100).toFixed(1)}%`);
  
  // List failed pages
  if (failed > 0) {
    console.log('\n❌ FAILED PAGES:');
    results.filter(r => r.status === '❌ FAILED').forEach(r => {
      console.log(`   - ${r.name} (${r.path}): ${r.error}`);
    });
  }
  
  // List pages with warnings
  if (warnings > 0) {
    console.log('\n⚠️  PAGES WITH WARNINGS:');
    results.filter(r => r.status === '⚠️ WARNINGS').forEach(r => {
      console.log(`   - ${r.name} (${r.path}): ${r.errors.length} issues`);
    });
  }
  
  console.log('\n🎉 TEST COMPLETED!\n');
  
  await browser.close();
  return results;
}

testAllPages().catch(console.error);