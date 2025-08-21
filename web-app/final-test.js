const { chromium } = require('playwright');

async function testPages() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const baseUrl = 'http://localhost:3001';
  const pagesToTest = [
    { url: '/', name: 'Homepage' },
    { url: '/events', name: 'Events Page' },
    { url: '/london-tours', name: 'London Tours' },
    { url: '/transport', name: 'Transport' },
    { url: '/matches', name: 'Matches' },
    { url: '/students', name: 'Students' },
    { url: '/business-directory', name: 'Business Directory' },
    { url: '/live', name: 'Live Streaming' },
    { url: '/about', name: 'About' },
    { url: '/pricing', name: 'Pricing' },
    { url: '/login', name: 'Login' },
    { url: '/signup', name: 'Signup' }
  ];

  const results = [];

  for (const pageInfo of pagesToTest) {
    try {
      console.log(`Testing: ${pageInfo.name} (${pageInfo.url})`);
      
      const response = await page.goto(baseUrl + pageInfo.url, { 
        waitUntil: 'domcontentloaded',
        timeout: 10000 
      });
      
      const status = response?.status();
      const title = await page.title();
      
      // Check for critical errors (ignore auth 401 and missing resource 404 errors)
      const hasJSError = await page.evaluate(() => {
        return !!(window.hasJavaScriptError || 
                 document.body.textContent.includes('TypeError') ||
                 document.body.textContent.includes('ReferenceError') ||
                 document.body.textContent.includes('Cannot read properties') ||
                 document.body.textContent.includes('is not defined'));
      });

      // Check if page has essential content
      const hasEssentialContent = await page.evaluate(() => {
        const hasHeader = document.querySelector('header') !== null;
        const hasFooter = document.querySelector('footer') !== null;
        const hasMainContent = document.querySelector('main, [role="main"], .main-content') !== null;
        const hasTitle = document.title && document.title.trim() !== '';
        return hasHeader && hasFooter && (hasMainContent || hasTitle);
      });

      // Check if page is loading correctly
      const isLoading = status === 200 && hasEssentialContent && !hasJSError;
      
      results.push({
        page: pageInfo.name,
        url: pageInfo.url,
        status,
        title: title.substring(0, 60),
        hasJSError,
        hasEssentialContent,
        working: isLoading
      });

      if (isLoading) {
        console.log(`✅ ${pageInfo.name}: Working properly`);
      } else {
        console.log(`❌ ${pageInfo.name}: Issues - Status: ${status}, Content: ${hasEssentialContent}, JS Error: ${hasJSError}`);
      }

    } catch (error) {
      console.log(`❌ ${pageInfo.name}: Failed - ${error.message}`);
      results.push({
        page: pageInfo.name,
        url: pageInfo.url,
        status: 'ERROR',
        title: '',
        hasJSError: true,
        hasEssentialContent: false,
        working: false,
        error: error.message
      });
    }
  }

  await browser.close();

  // Summary
  console.log('\n=== FINAL ANALYSIS ===');
  const working = results.filter(r => r.working);
  const broken = results.filter(r => !r.working);
  
  console.log(`✅ Working pages: ${working.length}`);
  console.log(`❌ Pages with issues: ${broken.length}`);
  
  if (working.length > 0) {
    console.log('\n✅ Working pages:');
    working.forEach(page => {
      console.log(`  - ${page.page} (${page.url})`);
    });
  }

  if (broken.length > 0) {
    console.log('\n❌ Pages with issues:');
    broken.forEach(page => {
      console.log(`  - ${page.page} (${page.url}): ${page.error || `Status ${page.status}, Content: ${page.hasEssentialContent}, JS Error: ${page.hasJSError}`}`);
    });
  }

  return { working, broken, all: results };
}

testPages().catch(console.error);