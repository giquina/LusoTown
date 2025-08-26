// Simple script to test if tooltips are working in the browser
const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    console.log('Navigating to localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    // Wait for the page to fully load and hydrate
    await page.waitForTimeout(3000);
    
    // Count data-guidance attributes
    const guidanceCount = await page.evaluate(() => {
      return document.querySelectorAll('[data-guidance]').length;
    });
    
    console.log(`Found ${guidanceCount} elements with data-guidance attributes`);
    
    // List all data-guidance attributes
    const guidanceElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('[data-guidance]');
      return Array.from(elements).map(el => ({
        tag: el.tagName,
        guidance: el.getAttribute('data-guidance'),
        className: el.className
      }));
    });
    
    console.log('Guidance elements found:', JSON.stringify(guidanceElements, null, 2));
    
    await browser.close();
    
    if (guidanceCount > 0) {
      console.log('✅ Tooltips are working!');
      process.exit(0);
    } else {
      console.log('❌ No tooltip attributes found');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error testing tooltips:', error);
    process.exit(1);
  }
})();
