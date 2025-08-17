const { chromium } = require('playwright');

async function checkAllPages() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const baseUrl = 'http://localhost:3002';
  const pagesToCheck = [
    '/',
    '/my-network',
    '/transport',
    '/events',
    '/matches',
    '/live',
    '/students',
    '/premium-membership',
    '/chauffeur',
    '/groups',
    '/about',
    '/contact',
    '/privacy',
    '/terms'
  ];
  
  const results = [];
  
  for (const pagePath of pagesToCheck) {
    try {
      console.log(`Testing ${pagePath}...`);
      
      // Navigate to page
      const response = await page.goto(`${baseUrl}${pagePath}`, { 
        waitUntil: 'networkidle',
        timeout: 10000 
      });
      
      // Check for basic success
      const status = response.status();
      
      // Check for JavaScript errors
      const jsErrors = [];
      page.on('pageerror', error => {
        jsErrors.push(error.message);
      });
      
      // Wait a bit for the page to fully load and any JS errors to occur
      await page.waitForTimeout(2000);
      
      // Check if page has basic content (not just a blank error page)
      const hasContent = await page.evaluate(() => {
        const body = document.body;
        return body && body.innerText.trim().length > 50;
      });
      
      // Check for error messages
      const hasError = await page.evaluate(() => {
        const errorTexts = [
          'Something went wrong',
          'An unexpected error occurred',
          'Cannot read properties of undefined',
          'TypeError',
          'ReferenceError'
        ];
        const bodyText = document.body.innerText;
        return errorTexts.some(errorText => bodyText.includes(errorText));
      });
      
      results.push({
        path: pagePath,
        status: status,
        hasContent: hasContent,
        hasError: hasError,
        jsErrors: jsErrors,
        success: status === 200 && hasContent && !hasError && jsErrors.length === 0
      });
      
      console.log(`✓ ${pagePath}: Status ${status}, Content: ${hasContent}, Error: ${hasError}, JS Errors: ${jsErrors.length}`);
      
    } catch (error) {
      console.log(`✗ ${pagePath}: ${error.message}`);
      results.push({
        path: pagePath,
        status: 'failed',
        hasContent: false,
        hasError: true,
        jsErrors: [error.message],
        success: false
      });
    }
  }
  
  await browser.close();
  
  // Print summary
  console.log('\n=== PAGE CHECK SUMMARY ===');
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✓ Successful pages: ${successful.length}/${results.length}`);
  successful.forEach(r => console.log(`  ✓ ${r.path}`));
  
  if (failed.length > 0) {
    console.log(`\n✗ Failed pages: ${failed.length}/${results.length}`);
    failed.forEach(r => {
      console.log(`  ✗ ${r.path}: Status ${r.status}, Has Error: ${r.hasError}`);
      if (r.jsErrors.length > 0) {
        r.jsErrors.forEach(err => console.log(`    - ${err}`));
      }
    });
  }
  
  return results;
}

checkAllPages().catch(console.error);