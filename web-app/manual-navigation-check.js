const puppeteer = require('puppeteer');

async function manualNavigationCheck() {
  const BASE_URL = 'https://web-gmm2y44rp-giquinas-projects.vercel.app';
  
  console.log('🔍 Manual Navigation Check - LusoTown Platform');
  console.log('='.repeat(60));
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Track all errors
  const allErrors = [];
  const allWarnings = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      allErrors.push(`[CONSOLE ERROR] ${msg.text()}`);
    } else if (msg.type() === 'warning') {
      allWarnings.push(`[CONSOLE WARNING] ${msg.text()}`);
    }
  });
  
  page.on('pageerror', error => {
    allErrors.push(`[PAGE ERROR] ${error.message}`);
  });
  
  page.on('requestfailed', request => {
    allErrors.push(`[REQUEST FAILED] ${request.url()}`);
  });
  
  try {
    console.log(`\n📍 Testing Homepage: ${BASE_URL}`);
    
    const startTime = Date.now();
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 20000 });
    const loadTime = Date.now() - startTime;
    
    console.log(`✅ Homepage loaded successfully in ${loadTime}ms`);
    
    // Get page title
    const title = await page.title();
    console.log(`📄 Page Title: "${title}"`);
    
    // Extract all navigation links
    console.log('\n🧭 EXTRACTING NAVIGATION STRUCTURE...');
    
    const navigationData = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href]'));
      const navigation = {
        header: [],
        footer: [],
        main: [],
        all: []
      };
      
      links.forEach(link => {
        const href = link.getAttribute('href');
        const text = link.textContent?.trim();
        const parent = link.closest('nav, header, footer, main');
        
        if (href && text && href.length > 0) {
          const linkData = { text: text.slice(0, 40), href };
          
          navigation.all.push(linkData);
          
          if (parent) {
            const tagName = parent.tagName.toLowerCase();
            if (tagName === 'header' || parent.closest('header')) {
              navigation.header.push(linkData);
            } else if (tagName === 'footer' || parent.closest('footer')) {
              navigation.footer.push(linkData);
            } else if (tagName === 'main' || parent.closest('main')) {
              navigation.main.push(linkData);
            }
          }
        }
      });
      
      return navigation;
    });
    
    // Test a sample of internal links
    const internalLinks = navigationData.all
      .filter(link => link.href.startsWith('/') && link.href !== '/')
      .slice(0, 15); // Test first 15 internal links
      
    console.log(`\n🔗 TESTING ${internalLinks.length} INTERNAL NAVIGATION LINKS:`);
    console.log('-'.repeat(50));
    
    const results = [];
    
    for (const link of internalLinks) {
      try {
        const testUrl = BASE_URL + link.href;
        console.log(`Testing: ${link.text} → ${link.href}`);
        
        const response = await page.goto(testUrl, { 
          waitUntil: 'domcontentloaded', 
          timeout: 10000 
        });
        
        if (response && response.ok()) {
          const pageTitle = await page.title();
          results.push({
            text: link.text,
            href: link.href,
            status: 'success',
            title: pageTitle,
            httpStatus: response.status()
          });
          console.log(`  ✅ SUCCESS (${response.status()}) - "${pageTitle}"`);
        } else {
          results.push({
            text: link.text,
            href: link.href,
            status: 'error',
            httpStatus: response ? response.status() : 'unknown'
          });
          console.log(`  ❌ ERROR (${response ? response.status() : 'unknown'})`);
        }
        
      } catch (error) {
        results.push({
          text: link.text,
          href: link.href,
          status: 'error',
          error: error.message
        });
        console.log(`  ❌ FAILED: ${error.message.slice(0, 60)}`);
      }
      
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Summary Report
    console.log('\n📊 NAVIGATION TEST SUMMARY');
    console.log('='.repeat(60));
    
    const successful = results.filter(r => r.status === 'success').length;
    const failed = results.filter(r => r.status === 'error').length;
    
    console.log(`📈 Results: ${successful}/${internalLinks.length} links working (${((successful/internalLinks.length)*100).toFixed(1)}%)`);
    console.log(`✅ Working: ${successful}`);
    console.log(`❌ Broken: ${failed}`);
    
    if (successful > 0) {
      console.log('\n✅ WORKING PAGES:');
      results.filter(r => r.status === 'success').forEach(result => {
        console.log(`  ✅ ${result.href} - "${result.title}"`);
      });
    }
    
    if (failed > 0) {
      console.log('\n❌ BROKEN PAGES:');
      results.filter(r => r.status === 'error').forEach(result => {
        console.log(`  ❌ ${result.href} (HTTP ${result.httpStatus || 'Failed'})`);
      });
    }
    
    // Console Errors Summary
    if (allErrors.length > 0) {
      console.log(`\n🚨 CONSOLE ERRORS DETECTED (${allErrors.length} total):`);
      // Show unique errors only
      const uniqueErrors = [...new Set(allErrors)];
      uniqueErrors.slice(0, 10).forEach(error => {
        console.log(`  🔴 ${error.slice(0, 80)}`);
      });
      if (uniqueErrors.length > 10) {
        console.log(`  ... and ${uniqueErrors.length - 10} more errors`);
      }
    }
    
    // Navigation Structure Analysis
    console.log('\n🧭 NAVIGATION STRUCTURE ANALYSIS:');
    console.log(`📋 Total Links Found: ${navigationData.all.length}`);
    console.log(`📋 Header Navigation: ${navigationData.header.length} links`);
    console.log(`📋 Footer Navigation: ${navigationData.footer.length} links`);
    console.log(`📋 Main Content Links: ${navigationData.main.length} links`);
    
    // Show key navigation links
    if (navigationData.header.length > 0) {
      console.log('\n🔝 HEADER NAVIGATION:');
      navigationData.header.slice(0, 10).forEach(link => {
        console.log(`  • ${link.text} → ${link.href}`);
      });
    }
    
    console.log('\n🎯 KEY FINDINGS:');
    if (successful / internalLinks.length > 0.8) {
      console.log('✅ Platform navigation is largely functional');
    } else {
      console.log('⚠️ Significant navigation issues detected');
    }
    
    if (allErrors.length > 0) {
      console.log('🚨 Console errors detected - requires attention');
    }
    
    console.log('\n📋 IMMEDIATE RECOMMENDATIONS:');
    if (failed > 0) {
      console.log('1. Fix broken page routes (404 errors)');
    }
    if (allErrors.length > 0) {
      console.log('2. Address JavaScript console errors');
    }
    console.log('3. Test remaining pages individually');
    console.log('4. Review React hydration issues');
    
  } catch (error) {
    console.error('❌ Main test failed:', error);
  } finally {
    await browser.close();
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('🔍 Manual Navigation Check Complete');
}

// Run the check
manualNavigationCheck().catch(console.error);