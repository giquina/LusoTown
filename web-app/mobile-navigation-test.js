const { chromium } = require('playwright');

async function testMobileNavigation() {
  const browser = await chromium.launch({ 
    headless: true, // Run in headless mode for server environment
    args: ['--no-sandbox', '--disable-dev-shm-usage'] 
  });

  const breakpoints = [
    { name: 'Mobile Small', width: 375, height: 667 }, // iPhone SE
    { name: 'Mobile Standard', width: 414, height: 896 }, // iPhone 11 Pro Max
    { name: 'Tablet Portrait', width: 768, height: 1024 }, // iPad
    { name: 'Desktop', width: 1024, height: 768 }, // Small desktop
  ];

  const testResults = {
    homePageLoad: false,
    navigationWorking: false,
    eventsPageLoad: false,
    mobileComponents: {
      skeletonLoading: false,
      swipeNavigation: false,
      quickFilters: false,
      locationAware: false
    },
    responsiveness: {}
  };

  try {
    for (const breakpoint of breakpoints) {
      console.log(`\n🧪 Testing ${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`);
      
      const context = await browser.newContext({
        viewport: { width: breakpoint.width, height: breakpoint.height }
      });
      const page = await context.newPage();

      // Test 1: Home page loads
      console.log('  📱 Loading home page...');
      try {
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
        await page.waitForSelector('[data-testid="home-page"], h1, .hero, main', { timeout: 10000 });
        console.log('  ✅ Home page loaded successfully');
        testResults.homePageLoad = true;
      } catch (error) {
        console.log('  ❌ Home page failed to load:', error.message);
      }

      // Test 2: Navigation to "What's Happening" works
      console.log('  🔗 Testing "What\'s Happening" navigation...');
      try {
        // Look for the navigation link (both mobile and desktop)
        const navSelector = 'a[href="/events"], a:has-text("What\'s Happening"), a:has-text("Eventos")';
        await page.waitForSelector(navSelector, { timeout: 5000 });
        
        // If mobile, might need to open menu first
        if (breakpoint.width <= 768) {
          try {
            await page.click('[data-testid="mobile-menu-button"], button:has-text("☰"), button:has([class*="bars-3"])');
            await page.waitForTimeout(500);
          } catch (e) {
            console.log('    No mobile menu button found, continuing...');
          }
        }

        await page.click(navSelector);
        await page.waitForURL('**/events**', { timeout: 10000 });
        console.log('  ✅ Navigation to events page working');
        testResults.navigationWorking = true;
      } catch (error) {
        console.log('  ❌ Navigation failed:', error.message);
      }

      // Test 3: Events page loads properly
      console.log('  📅 Testing events page load...');
      try {
        await page.goto('http://localhost:3000/events', { waitUntil: 'networkidle' });
        
        // Wait for key elements to load
        await page.waitForSelector('h1, [class*="hero"], main', { timeout: 15000 });
        
        // Check for key content
        const hasEventContent = await page.locator('h1:has-text("Portuguese"), h1:has-text("Cultural"), h1:has-text("Events")').count() > 0;
        const hasSearchBar = await page.locator('input[placeholder*="Search"], input[placeholder*="Buscar"]').count() > 0;
        
        if (hasEventContent || hasSearchBar) {
          console.log('  ✅ Events page loaded with content');
          testResults.eventsPageLoad = true;
        } else {
          console.log('  ⚠️  Events page loaded but missing expected content');
        }
      } catch (error) {
        console.log('  ❌ Events page failed to load:', error.message);
      }

      // Test 4: Mobile-specific components (for mobile breakpoints)
      if (breakpoint.width <= 768) {
        console.log('  📱 Testing mobile components...');
        
        try {
          // Test for Portuguese-themed skeleton loading
          const hasSkeletonLoading = await page.locator('[class*="skeleton"], [class*="animate-pulse"], [class*="bg-gradient-to-r"][class*="green"]').count() > 0;
          if (hasSkeletonLoading) {
            console.log('    ✅ Skeleton loading system detected');
            testResults.mobileComponents.skeletonLoading = true;
          }

          // Test for swipe navigation
          const hasSwipeNav = await page.locator('button:has-text("🌙"), button:has-text("🎉"), button:has-text("🎭")').count() > 0;
          if (hasSwipeNav) {
            console.log('    ✅ Swipe event navigation detected');
            testResults.mobileComponents.swipeNavigation = true;
          }

          // Test for quick filters
          const hasQuickFilters = await page.locator('button:has-text("🆓"), button:has-text("🌍"), [class*="filter"]').count() > 0;
          if (hasQuickFilters) {
            console.log('    ✅ Quick filters system detected');
            testResults.mobileComponents.quickFilters = true;
          }

          // Test for location awareness
          const hasLocationAware = await page.locator('button:has-text("location"), button:has-text("localização"), [class*="location"]').count() > 0;
          if (hasLocationAware) {
            console.log('    ✅ Location-aware events detected');
            testResults.mobileComponents.locationAware = true;
          }
        } catch (error) {
          console.log('    ⚠️  Mobile component test incomplete:', error.message);
        }
      }

      // Test 5: Responsive design
      console.log('  📐 Testing responsive design...');
      try {
        const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
        const hasHorizontalScroll = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
        
        testResults.responsiveness[breakpoint.name] = {
          width: breakpoint.width,
          height: breakpoint.height,
          contentHeight: bodyHeight,
          hasHorizontalScroll: hasHorizontalScroll,
          passed: !hasHorizontalScroll && bodyHeight > 500
        };

        if (!hasHorizontalScroll) {
          console.log('  ✅ No horizontal scrolling detected');
        } else {
          console.log('  ❌ Horizontal scrolling detected');
        }
      } catch (error) {
        console.log('  ⚠️  Responsive test incomplete:', error.message);
      }

      await context.close();
      await new Promise(resolve => setTimeout(resolve, 1000)); // Brief pause between tests
    }

  } catch (error) {
    console.log('❌ Test suite failed:', error.message);
  }

  await browser.close();

  // Print comprehensive report
  console.log('\n📊 COMPREHENSIVE TEST REPORT');
  console.log('================================');
  
  console.log(`✨ Core Functionality:`);
  console.log(`   Home Page Load: ${testResults.homePageLoad ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Navigation Working: ${testResults.navigationWorking ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Events Page Load: ${testResults.eventsPageLoad ? '✅ PASS' : '❌ FAIL'}`);

  console.log(`\n🚀 Mobile UX Components:`);
  console.log(`   Skeleton Loading: ${testResults.mobileComponents.skeletonLoading ? '✅ DETECTED' : '⚠️  NOT FOUND'}`);
  console.log(`   Swipe Navigation: ${testResults.mobileComponents.swipeNavigation ? '✅ DETECTED' : '⚠️  NOT FOUND'}`);
  console.log(`   Quick Filters: ${testResults.mobileComponents.quickFilters ? '✅ DETECTED' : '⚠️  NOT FOUND'}`);
  console.log(`   Location Aware: ${testResults.mobileComponents.locationAware ? '✅ DETECTED' : '⚠️  NOT FOUND'}`);

  console.log(`\n📱 Responsive Design:`);
  Object.entries(testResults.responsiveness).forEach(([name, data]) => {
    console.log(`   ${name}: ${data.passed ? '✅ PASS' : '❌ FAIL'} (${data.width}x${data.height}, Content: ${data.contentHeight}px, Horizontal scroll: ${data.hasHorizontalScroll ? 'YES' : 'NO'})`);
  });

  // Overall score
  const coreTests = [testResults.homePageLoad, testResults.navigationWorking, testResults.eventsPageLoad];
  const mobileTests = Object.values(testResults.mobileComponents);
  const responsiveTests = Object.values(testResults.responsiveness).map(r => r.passed);
  
  const coreScore = (coreTests.filter(Boolean).length / coreTests.length) * 100;
  const mobileScore = (mobileTests.filter(Boolean).length / mobileTests.length) * 100;
  const responsiveScore = (responsiveTests.filter(Boolean).length / responsiveTests.length) * 100;
  
  const overallScore = (coreScore + mobileScore + responsiveScore) / 3;

  console.log(`\n🎯 OVERALL SCORE: ${overallScore.toFixed(1)}%`);
  console.log(`   Core Functionality: ${coreScore.toFixed(1)}%`);
  console.log(`   Mobile UX: ${mobileScore.toFixed(1)}%`);
  console.log(`   Responsive Design: ${responsiveScore.toFixed(1)}%`);

  if (overallScore >= 80) {
    console.log('🎉 EXCELLENT - Navigation and mobile UX working properly!');
  } else if (overallScore >= 60) {
    console.log('⚠️  GOOD - Some issues detected but basic functionality works');
  } else {
    console.log('❌ NEEDS WORK - Significant issues detected');
  }

  return testResults;
}

// Run the test
testMobileNavigation().catch(console.error);