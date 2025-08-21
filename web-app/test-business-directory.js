const { chromium } = require('playwright');

async function testBusinessDirectory() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Testing Business Directory...');
    
    const response = await page.goto('http://localhost:3001/business-directory', { 
      waitUntil: 'domcontentloaded',
      timeout: 10000 
    });
    
    console.log(`Status: ${response?.status()}`);
    
    // Wait a moment for content to load
    await page.waitForTimeout(2000);
    
    const elements = await page.evaluate(() => {
      return {
        hasHeader: !!document.querySelector('header'),
        hasFooter: !!document.querySelector('footer'),
        hasMain: !!document.querySelector('main'),
        hasH1: !!document.querySelector('h1'),
        h1Text: document.querySelector('h1')?.textContent || 'No H1 found',
        footerText: document.querySelector('footer')?.textContent?.slice(0, 50) || 'No footer found',
        bodyClasses: document.body.className,
        title: document.title
      };
    });
    
    console.log('Elements Check:');
    console.log(`  Header: ${elements.hasHeader ? '✅' : '❌'}`);
    console.log(`  Footer: ${elements.hasFooter ? '✅' : '❌'}`);
    console.log(`  Main: ${elements.hasMain ? '✅' : '❌'}`);
    console.log(`  H1: ${elements.hasH1 ? '✅' : '❌'}`);
    console.log(`  Title: "${elements.title}"`);
    console.log(`  H1 Text: "${elements.h1Text}"`);
    console.log(`  Footer Text: "${elements.footerText}"`);
    
    const isWorking = elements.hasHeader && elements.hasFooter && elements.hasMain && elements.hasH1;
    console.log(`\n${isWorking ? '✅' : '❌'} Business Directory: ${isWorking ? 'Working properly' : 'Missing elements'}`);
    
  } catch (error) {
    console.log(`❌ Failed: ${error.message}`);
  }

  await browser.close();
}

testBusinessDirectory().catch(console.error);