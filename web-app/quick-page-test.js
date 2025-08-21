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
        waitUntil: 'networkidle',
        timeout: 10000 
      });
      
      const status = response?.status();
      const title = await page.title();
      
      // Check for error indicators
      const hasError = await page.locator('body').textContent().then(text => 
        text.includes('Error') || 
        text.includes('error') || 
        text.includes('Cannot read') ||
        text.includes('TypeError') ||
        text.includes('undefined')
      );

      // Check if page has content
      const hasContent = await page.locator('header, main, [role="main"]').count() > 0;
      
      results.push({
        page: pageInfo.name,
        url: pageInfo.url,
        status,
        title: title.substring(0, 60),
        hasError,
        hasContent,
        working: status === 200 && !hasError && hasContent
      });

      if (status !== 200 || hasError || !hasContent) {
        console.log(`❌ ${pageInfo.name}: Status ${status}, Error: ${hasError}, Content: ${hasContent}`);
      } else {
        console.log(`✅ ${pageInfo.name}: Working`);
      }

    } catch (error) {
      console.log(`❌ ${pageInfo.name}: Failed - ${error.message}`);
      results.push({
        page: pageInfo.name,
        url: pageInfo.url,
        status: 'ERROR',
        title: '',
        hasError: true,
        hasContent: false,
        working: false,
        error: error.message
      });
    }
  }

  await browser.close();

  // Summary
  console.log('\n=== SUMMARY ===');
  const working = results.filter(r => r.working);
  const broken = results.filter(r => !r.working);
  
  console.log(`✅ Working pages: ${working.length}`);
  console.log(`❌ Broken pages: ${broken.length}`);
  
  if (broken.length > 0) {
    console.log('\nBroken pages:');
    broken.forEach(page => {
      console.log(`  - ${page.page} (${page.url}): ${page.error || `Status ${page.status}, Error: ${page.hasError}`}`);
    });
  }

  return { working, broken, all: results };
}

testPages().catch(console.error);