const { chromium } = require('playwright');

async function debugSpecificPages() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const baseUrl = 'http://localhost:3001';
  const pagesToDebug = [
    { url: '/matches', name: 'Matches' },
    { url: '/business-directory', name: 'Business Directory' }
  ];

  for (const pageInfo of pagesToDebug) {
    console.log(`\n=== DEBUGGING: ${pageInfo.name} ===`);
    
    try {
      const response = await page.goto(baseUrl + pageInfo.url, { 
        waitUntil: 'domcontentloaded',
        timeout: 10000 
      });
      
      console.log(`Status: ${response?.status()}`);
      console.log(`Title: "${await page.title()}"`);
      
      // Check for essential elements
      const elements = await page.evaluate(() => {
        return {
          hasHeader: !!document.querySelector('header'),
          hasFooter: !!document.querySelector('footer'),
          hasMain: !!document.querySelector('main'),
          hasMainRole: !!document.querySelector('[role="main"]'),
          hasMainClass: !!document.querySelector('.main-content'),
          bodyContent: document.body.textContent.slice(0, 200) + '...',
          hasH1: !!document.querySelector('h1'),
          hasNav: !!document.querySelector('nav'),
          elementCounts: {
            divs: document.querySelectorAll('div').length,
            sections: document.querySelectorAll('section').length,
            articles: document.querySelectorAll('article').length,
            buttons: document.querySelectorAll('button').length,
            links: document.querySelectorAll('a').length
          },
          hasContent: document.body.textContent.trim().length > 100,
          firstParagraph: document.querySelector('p')?.textContent || 'No paragraph found'
        };
      });
      
      console.log('Essential Elements Check:');
      console.log(`  Header: ${elements.hasHeader ? '✅' : '❌'}`);
      console.log(`  Footer: ${elements.hasFooter ? '✅' : '❌'}`);
      console.log(`  Main: ${elements.hasMain ? '✅' : '❌'}`);
      console.log(`  Main Role: ${elements.hasMainRole ? '✅' : '❌'}`);
      console.log(`  Main Class: ${elements.hasMainClass ? '✅' : '❌'}`);
      console.log(`  H1: ${elements.hasH1 ? '✅' : '❌'}`);
      console.log(`  Nav: ${elements.hasNav ? '✅' : '❌'}`);
      console.log(`  Has Content: ${elements.hasContent ? '✅' : '❌'}`);
      
      console.log('\nElement Counts:');
      Object.entries(elements.elementCounts).forEach(([tag, count]) => {
        console.log(`  ${tag}: ${count}`);
      });
      
      console.log(`\nFirst Paragraph: "${elements.firstParagraph}"`);
      console.log(`Body Content Preview: "${elements.bodyContent}"`);
      
      // Check for errors in page
      const errors = await page.evaluate(() => {
        const errorElements = Array.from(document.querySelectorAll('*')).filter(el => 
          el.textContent.includes('Error') || 
          el.textContent.includes('error') ||
          el.textContent.includes('TypeError') ||
          el.textContent.includes('undefined')
        );
        return errorElements.map(el => el.textContent.slice(0, 100));
      });
      
      if (errors.length > 0) {
        console.log('\nErrors found:');
        errors.forEach(error => console.log(`  - ${error}`));
      } else {
        console.log('\nNo visible errors found ✅');
      }

    } catch (error) {
      console.log(`❌ Failed to load: ${error.message}`);
    }
  }

  await browser.close();
}

debugSpecificPages().catch(console.error);