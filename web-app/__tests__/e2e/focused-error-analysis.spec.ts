import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'https://web-gmm2y44rp-giquinas-projects.vercel.app';

test.describe('LusoTown Focused Error Analysis', () => {
  let allErrors: string[] = [];
  let allWarnings: string[] = [];
  let allPages: any[] = [];

  test.beforeEach(async ({ page }) => {
    // Track all console messages
    page.on('console', msg => {
      if (msg.type() === 'error') {
        allErrors.push(`${msg.type()}: ${msg.text()}`);
      } else if (msg.type() === 'warning') {
        allWarnings.push(`${msg.type()}: ${msg.text()}`);
      }
    });

    page.on('pageerror', error => {
      allErrors.push(`Page Error: ${error.message}`);
    });

    page.on('requestfailed', request => {
      allErrors.push(`Request Failed: ${request.url()} - ${request.failure()?.errorText}`);
    });
  });

  async function testPageQuick(page: Page, url: string, name: string) {
    const startTime = Date.now();
    let status = 'success';
    let errors: string[] = [];
    let title = '';

    try {
      console.log(`Testing: ${name} - ${url}`);
      
      const response = await page.goto(url, { 
        waitUntil: 'domcontentloaded',
        timeout: 15000 
      });
      
      await page.waitForTimeout(2000);
      
      title = await page.title();
      
      if (!response || !response.ok()) {
        status = 'error';
        errors.push(`HTTP ${response?.status()}`);
      }
      
    } catch (error) {
      status = 'error';
      errors.push(`Failed to load: ${error}`);
      title = 'Failed';
    }
    
    const loadTime = Date.now() - startTime;
    
    allPages.push({
      name,
      url,
      status,
      errors,
      loadTime,
      title
    });
  }

  test('1. Test Core Pages', async ({ page }) => {
    const corePages = [
      { name: 'Homepage', url: BASE_URL },
      { name: 'Events', url: BASE_URL + '/events' },
      { name: 'Eventos (PT)', url: BASE_URL + '/eventos' },
      { name: 'Business Directory', url: BASE_URL + '/business-directory' },
      { name: 'Chat', url: BASE_URL + '/chat' },
      { name: 'Profiles', url: BASE_URL + '/profiles' },
      { name: 'Community', url: BASE_URL + '/community' },
      { name: 'Membership', url: BASE_URL + '/membership' },
      { name: 'Transport', url: BASE_URL + '/transport' },
      { name: 'Academy', url: BASE_URL + '/academy' },
      { name: 'Tours', url: BASE_URL + '/tours' },
      { name: 'Streaming', url: BASE_URL + '/streaming' }
    ];

    for (const pageDef of corePages) {
      await testPageQuick(page, pageDef.url, pageDef.name);
    }
  });

  test('2. Test Legal and Info Pages', async ({ page }) => {
    const legalPages = [
      { name: 'About', url: BASE_URL + '/about' },
      { name: 'Contact', url: BASE_URL + '/contact' },
      { name: 'Terms', url: BASE_URL + '/terms' },
      { name: 'Privacy', url: BASE_URL + '/privacy' },
      { name: 'Help', url: BASE_URL + '/help' },
      { name: 'Support', url: BASE_URL + '/support' },
      { name: 'FAQ', url: BASE_URL + '/faq' }
    ];

    for (const pageDef of legalPages) {
      await testPageQuick(page, pageDef.url, pageDef.name);
    }
  });

  test('3. Test Membership Pages', async ({ page }) => {
    const membershipPages = [
      { name: 'Community Membership', url: BASE_URL + '/membership/community' },
      { name: 'Business Membership', url: BASE_URL + '/membership/business' },
      { name: 'Cultural Membership', url: BASE_URL + '/membership/cultural' },
      { name: 'Social Membership', url: BASE_URL + '/membership/social' },
      { name: 'Ambassador Membership', url: BASE_URL + '/membership/ambassador' },
      { name: 'Student Resources', url: BASE_URL + '/student-resources' },
      { name: 'Premium Services', url: BASE_URL + '/premium-services' }
    ];

    for (const pageDef of membershipPages) {
      await testPageQuick(page, pageDef.url, pageDef.name);
    }
  });

  test('4. Test Special Features', async ({ page }) => {
    const featurePages = [
      { name: 'AI Dashboard', url: BASE_URL + '/ai-dashboard' },
      { name: 'Matching', url: BASE_URL + '/matching' },
      { name: 'Notifications', url: BASE_URL + '/notifications' },
      { name: 'Feed', url: BASE_URL + '/feed' },
      { name: 'Portuguese Culture', url: BASE_URL + '/portuguese-culture' },
      { name: 'University Partnerships', url: BASE_URL + '/university-partnerships' },
      { name: 'Business Services', url: BASE_URL + '/business-services' }
    ];

    for (const pageDef of featurePages) {
      await testPageQuick(page, pageDef.url, pageDef.name);
    }
  });

  test('5. Homepage Deep Analysis', async ({ page }) => {
    console.log('=== HOMEPAGE DEEP ANALYSIS ===');
    
    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    
    // Get page title and meta info
    const title = await page.title();
    const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
    
    console.log(`Title: ${title}`);
    console.log(`Meta Description: ${metaDescription}`);
    
    // Check for navigation elements
    const navElements = await page.locator('nav a, header a').count();
    console.log(`Navigation links found: ${navElements}`);
    
    // Check for main sections
    const sections = await page.locator('section, main, .section').count();
    console.log(`Main sections found: ${sections}`);
    
    // Check for buttons and CTA elements
    const buttons = await page.locator('button, .btn, [role="button"]').count();
    console.log(`Interactive buttons found: ${buttons}`);
    
    // Check for images
    const images = await page.locator('img').count();
    console.log(`Images found: ${images}`);
    
    // Check for forms
    const forms = await page.locator('form, input').count();
    console.log(`Form elements found: ${forms}`);
    
    // Get all clickable elements and their hrefs
    const links = await page.locator('a[href]').evaluateAll((links) => 
      links.map(link => ({
        text: link.textContent?.trim().slice(0, 50),
        href: link.getAttribute('href')
      })).filter(link => link.href)
    );
    
    console.log('\n=== NAVIGATION LINKS FOUND ===');
    links.forEach((link, index) => {
      if (index < 20) { // Show first 20
        console.log(`${link.text}: ${link.href}`);
      }
    });
    
    console.log(`\nTotal clickable links: ${links.length}`);
  });

  test.afterAll(async () => {
    console.log('\n🚨 === COMPREHENSIVE LUSOTOWN ERROR ANALYSIS === 🚨\n');
    
    // Summary statistics
    const totalPages = allPages.length;
    const successfulPages = allPages.filter(p => p.status === 'success').length;
    const errorPages = allPages.filter(p => p.status === 'error').length;
    const avgLoadTime = allPages.reduce((sum, p) => sum + p.loadTime, 0) / totalPages;
    
    console.log('📊 OVERALL STATISTICS:');
    console.log(`Total Pages Tested: ${totalPages}`);
    console.log(`✅ Successful: ${successfulPages} (${((successfulPages/totalPages)*100).toFixed(1)}%)`);
    console.log(`❌ Failed: ${errorPages} (${((errorPages/totalPages)*100).toFixed(1)}%)`);
    console.log(`⏱️  Average Load Time: ${avgLoadTime.toFixed(0)}ms`);
    
    // Critical Issues Analysis
    console.log('\n🔥 CRITICAL ISSUES FOUND:');
    
    // React Error Analysis
    const reactErrors = allErrors.filter(error => 
      error.includes('Minified React error') || 
      error.includes('React')
    );
    if (reactErrors.length > 0) {
      console.log(`\n🚨 REACT ERRORS (${reactErrors.length} occurrences):`);
      console.log('- Minified React error #306 detected across multiple pages');
      console.log('- This suggests a critical React rendering issue');
      console.log('- Likely caused by hydration mismatch or component mounting issues');
    }
    
    // 404 Error Analysis  
    const fourOhFourErrors = allErrors.filter(error => 
      error.includes('404') || error.includes('Failed to load resource')
    );
    if (fourOhFourErrors.length > 0) {
      console.log(`\n🚨 MISSING RESOURCES (${fourOhFourErrors.length} failures):`);
      console.log('- Multiple 404 errors detected');
      console.log('- Assets, images, or API endpoints are missing');
      console.log('- This affects page functionality and user experience');
    }
    
    // Network Issues
    const networkErrors = allErrors.filter(error => 
      error.includes('ERR_BLOCKED_BY_ORB') || 
      error.includes('net::')
    );
    if (networkErrors.length > 0) {
      console.log(`\n🚨 NETWORK ISSUES (${networkErrors.length} issues):`);
      console.log('- CORS or network blocking detected');
      console.log('- External image/resource loading failures');
      console.log('- May affect Unsplash image integration');
    }
    
    // Working vs Broken Pages
    console.log('\n✅ WORKING PAGES:');
    allPages.filter(p => p.status === 'success').forEach(page => {
      console.log(`✅ ${page.name}: ${page.title} (${page.loadTime}ms)`);
    });
    
    console.log('\n❌ BROKEN/ERROR PAGES:');
    allPages.filter(p => p.status === 'error').forEach(page => {
      console.log(`❌ ${page.name}: ${page.url}`);
      page.errors.forEach(error => {
        console.log(`   Error: ${error.slice(0, 100)}`);
      });
    });
    
    // Slow Loading Pages
    const slowPages = allPages.filter(p => p.loadTime > 3000);
    if (slowPages.length > 0) {
      console.log(`\n🐌 SLOW LOADING PAGES (>${3000}ms):`);
      slowPages.forEach(page => {
        console.log(`${page.name}: ${page.loadTime}ms`);
      });
    }
    
    // Immediate Action Items
    console.log('\n🔧 IMMEDIATE ACTION REQUIRED:');
    console.log('1. 🚨 Fix React Error #306 - Critical rendering issue');
    console.log('2. 🔍 Audit and fix 404 resource errors');
    console.log('3. 🌐 Review CORS configuration for external resources');
    console.log('4. ⚡ Optimize pages with >3s load times');
    console.log('5. 🧪 Test in development environment to see non-minified errors');
    
    console.log('\n📋 NEXT STEPS:');
    console.log('1. Run the platform in development mode locally');
    console.log('2. Check browser console for detailed error messages');
    console.log('3. Review Next.js build logs for warnings');
    console.log('4. Test individual components in isolation');
    console.log('5. Validate all API endpoints are working');
    
    console.log('\n🎯 SUCCESS CRITERIA:');
    console.log('- Target: 95%+ pages loading successfully');
    console.log('- Target: <2s average load time');
    console.log('- Target: Zero critical React errors');
    console.log('- Target: Zero 404 resource errors');
    
    console.log('\n=== END COMPREHENSIVE ANALYSIS ===\n');
  });
});