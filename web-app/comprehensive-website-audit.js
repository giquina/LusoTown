const https = require('https');
const http = require('http');

// Comprehensive Website Testing Script for LusoTown
const BASE_URL = 'https://web-99kxh0sku-giquinas-projects.vercel.app';

console.log('🚀 Starting Comprehensive LusoTown Website Testing');
console.log('=' .repeat(60));

// Test 1: Basic Accessibility Check
function testWebsiteAccessibility() {
  return new Promise((resolve, reject) => {
    console.log('\n📋 Test 1: Website Accessibility');
    console.log('-'.repeat(40));
    
    const url = new URL(BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname,
      method: 'GET',
      headers: {
        'User-Agent': 'LusoTown-Testing-Bot/1.0'
      }
    };

    const req = https.request(options, (res) => {
      console.log(`✅ Status Code: ${res.statusCode}`);
      console.log(`✅ Content-Type: ${res.headers['content-type']}`);
      console.log(`✅ Server: ${res.headers['server'] || 'Unknown'}`);
      console.log(`✅ Cache-Control: ${res.headers['cache-control'] || 'None'}`);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        // Basic HTML validation
        const hasDoctype = data.includes('<!DOCTYPE html>') || data.includes('<!doctype html>');
        const hasTitle = data.includes('<title>');
        const hasLusoTown = data.toLowerCase().includes('lusotown');
        const hasPortuguese = data.toLowerCase().includes('portuguese');
        const hasNavigation = data.includes('<nav') || data.includes('navigation');
        
        console.log(`${hasDoctype ? '✅' : '❌'} HTML Doctype: ${hasDoctype}`);
        console.log(`${hasTitle ? '✅' : '❌'} Has Title Tag: ${hasTitle}`);
        console.log(`${hasLusoTown ? '✅' : '❌'} Contains "LusoTown": ${hasLusoTown}`);
        console.log(`${hasPortuguese ? '✅' : '❌'} Contains "Portuguese": ${hasPortuguese}`);
        console.log(`${hasNavigation ? '✅' : '❌'} Has Navigation: ${hasNavigation}`);
        
        resolve({
          status: res.statusCode,
          contentType: res.headers['content-type'],
          hasDoctype,
          hasTitle,
          hasLusoTown,
          hasPortuguese,
          hasNavigation,
          contentLength: data.length
        });
      });
    });

    req.on('error', (err) => {
      console.log(`❌ Connection Error: ${err.message}`);
      reject(err);
    });

    req.setTimeout(10000, () => {
      console.log('❌ Request Timeout');
      req.destroy();
      reject(new Error('Timeout'));
    });

    req.end();
  });
}

// Test 2: Check Critical Page Routes
function testCriticalRoutes() {
  console.log('\n📋 Test 2: Critical Page Routes');
  console.log('-'.repeat(40));
  
  const routes = [
    '/',
    '/events',
    '/business-directory', 
    '/students',
    '/directory'
  ];
  
  const promises = routes.map(route => {
    return new Promise((resolve) => {
      const url = new URL(BASE_URL + route);
      const options = {
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname,
        method: 'GET',
        headers: {
          'User-Agent': 'LusoTown-Testing-Bot/1.0'
        }
      };

      const req = https.request(options, (res) => {
        console.log(`${res.statusCode === 200 ? '✅' : '❌'} ${route}: ${res.statusCode}`);
        resolve({ route, status: res.statusCode });
      });

      req.on('error', () => {
        console.log(`❌ ${route}: Connection Error`);
        resolve({ route, status: 'ERROR' });
      });

      req.setTimeout(5000, () => {
        console.log(`❌ ${route}: Timeout`);
        req.destroy();
        resolve({ route, status: 'TIMEOUT' });
      });

      req.end();
    });
  });
  
  return Promise.all(promises);
}

// Test 3: Portuguese Cultural Content Analysis
function testPortugueseCulturalContent() {
  return new Promise((resolve, reject) => {
    console.log('\n📋 Test 3: Portuguese Cultural Content Analysis');
    console.log('-'.repeat(40));
    
    const url = new URL(BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname,
      method: 'GET'
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const content = data.toLowerCase();
        
        // Cultural authenticity checks
        const hasPortugueseSpeaking = content.includes('portuguese-speaking');
        const hasLusophone = content.includes('lusophone');
        const hasUK = content.includes('united kingdom') || content.includes(' uk ');
        const hasLondon = content.includes('london');
        
        // Portuguese-speaking countries
        const hasPortugal = content.includes('portugal');
        const hasBrazil = content.includes('brazil');
        const hasAngola = content.includes('angola');
        const hasCapeVerde = content.includes('cape verde');
        const hasMozambique = content.includes('mozambique');
        
        // Count countries referenced
        const countriesCount = [hasPortugal, hasBrazil, hasAngola, hasCapeVerde, hasMozambique]
          .filter(Boolean).length;
        
        // Community terminology
        const hasCommunityTerms = content.includes('community') || content.includes('comunidade');
        const hasEventsTerms = content.includes('events') || content.includes('eventos');
        const hasBusinessTerms = content.includes('business') || content.includes('negócio');
        
        console.log(`${hasPortugueseSpeaking ? '✅' : '❌'} Uses "Portuguese-speaking": ${hasPortugueseSpeaking}`);
        console.log(`${hasLusophone ? '✅' : '❌'} Uses "Lusophone": ${hasLusophone}`);
        console.log(`${hasUK ? '✅' : '❌'} References UK: ${hasUK}`);
        console.log(`${hasLondon ? '✅' : '❌'} References London: ${hasLondon}`);
        console.log(`${countriesCount >= 2 ? '✅' : '❌'} Multiple Portuguese-speaking countries (${countriesCount}): ${countriesCount >= 2}`);
        console.log(`${hasCommunityTerms ? '✅' : '❌'} Has community terminology: ${hasCommunityTerms}`);
        console.log(`${hasEventsTerms ? '✅' : '❌'} Has events terminology: ${hasEventsTerms}`);
        console.log(`${hasBusinessTerms ? '✅' : '❌'} Has business terminology: ${hasBusinessTerms}`);
        
        resolve({
          culturalAuthenticity: {
            hasPortugueseSpeaking,
            hasLusophone,
            hasUK,
            hasLondon,
            countriesCount,
            hasCommunityTerms,
            hasEventsTerms,
            hasBusinessTerms
          }
        });
      });
    });

    req.on('error', (err) => {
      console.log(`❌ Cultural Content Analysis Error: ${err.message}`);
      reject(err);
    });

    req.setTimeout(10000, () => {
      console.log('❌ Cultural Content Analysis Timeout');
      req.destroy();
      reject(new Error('Timeout'));
    });

    req.end();
  });
}

// Test 4: Mobile Responsiveness Headers
function testMobileResponsiveness() {
  return new Promise((resolve, reject) => {
    console.log('\n📋 Test 4: Mobile Responsiveness Indicators');
    console.log('-'.repeat(40));
    
    const url = new URL(BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        // Check for mobile-responsive indicators
        const hasViewportMeta = data.includes('viewport') && data.includes('width=device-width');
        const hasResponsiveCSS = data.includes('@media') || data.includes('responsive');
        const hasMobileNavigation = data.includes('mobile-nav') || data.includes('hamburger');
        const hasTouchFriendly = data.includes('touch-action') || data.includes('tap-highlight');
        
        console.log(`${hasViewportMeta ? '✅' : '❌'} Has Viewport Meta Tag: ${hasViewportMeta}`);
        console.log(`${hasResponsiveCSS ? '✅' : '❌'} Responsive CSS Indicators: ${hasResponsiveCSS}`);
        console.log(`${hasMobileNavigation ? '✅' : '❌'} Mobile Navigation Elements: ${hasMobileNavigation}`);
        console.log(`${hasTouchFriendly ? '✅' : '❌'} Touch-Friendly Elements: ${hasTouchFriendly}`);
        
        resolve({
          mobileResponsive: {
            hasViewportMeta,
            hasResponsiveCSS,
            hasMobileNavigation,
            hasTouchFriendly
          }
        });
      });
    });

    req.on('error', (err) => {
      console.log(`❌ Mobile Responsiveness Test Error: ${err.message}`);
      reject(err);
    });

    req.setTimeout(10000, () => {
      console.log('❌ Mobile Responsiveness Test Timeout');
      req.destroy();
      reject(new Error('Timeout'));
    });

    req.end();
  });
}

// Test 5: Performance Indicators
function testPerformanceIndicators() {
  return new Promise((resolve, reject) => {
    console.log('\n📋 Test 5: Performance Indicators');
    console.log('-'.repeat(40));
    
    const startTime = Date.now();
    
    const url = new URL(BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname,
      method: 'GET',
      headers: {
        'User-Agent': 'LusoTown-Testing-Bot/1.0',
        'Accept-Encoding': 'gzip, deflate, br'
      }
    };

    const req = https.request(options, (res) => {
      const responseTime = Date.now() - startTime;
      
      // Performance headers
      const hasGzip = res.headers['content-encoding']?.includes('gzip') || false;
      const hasBrotli = res.headers['content-encoding']?.includes('br') || false;
      const hasCacheControl = res.headers['cache-control'] ? true : false;
      const hasETag = res.headers['etag'] ? true : false;
      
      console.log(`✅ Response Time: ${responseTime}ms`);
      console.log(`${hasGzip || hasBrotli ? '✅' : '❌'} Compression: ${res.headers['content-encoding'] || 'None'}`);
      console.log(`${hasCacheControl ? '✅' : '❌'} Cache Control: ${res.headers['cache-control'] || 'None'}`);
      console.log(`${hasETag ? '✅' : '❌'} ETag: ${hasETag}`);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const contentSize = Buffer.byteLength(data, 'utf8');
        console.log(`✅ Content Size: ${(contentSize / 1024).toFixed(2)} KB`);
        
        resolve({
          performance: {
            responseTime,
            contentSize,
            hasGzip,
            hasBrotli,
            hasCacheControl,
            hasETag
          }
        });
      });
    });

    req.on('error', (err) => {
      console.log(`❌ Performance Test Error: ${err.message}`);
      reject(err);
    });

    req.setTimeout(15000, () => {
      console.log('❌ Performance Test Timeout');
      req.destroy();
      reject(new Error('Timeout'));
    });

    req.end();
  });
}

// Main test execution
async function runComprehensiveTest() {
  console.log(`🌐 Testing: ${BASE_URL}`);
  console.log(`📅 Date: ${new Date().toISOString()}`);
  
  const results = {
    timestamp: new Date().toISOString(),
    url: BASE_URL,
    tests: {}
  };
  
  try {
    // Run all tests
    results.tests.accessibility = await testWebsiteAccessibility();
    results.tests.routes = await testCriticalRoutes();
    results.tests.cultural = await testPortugueseCulturalContent();
    results.tests.mobile = await testMobileResponsiveness();
    results.tests.performance = await testPerformanceIndicators();
    
    // Summary
    console.log('\n📊 COMPREHENSIVE TESTING SUMMARY');
    console.log('=' .repeat(60));
    
    console.log('\n🎯 Key Findings:');
    const accessibility = results.tests.accessibility;
    console.log(`• Website Status: ${accessibility.status === 200 ? '✅ ONLINE' : '❌ OFFLINE'}`);
    console.log(`• Content Length: ${(accessibility.contentLength / 1024).toFixed(2)} KB`);
    console.log(`• Has LusoTown Branding: ${accessibility.hasLusoTown ? '✅ YES' : '❌ NO'}`);
    console.log(`• Portuguese Context: ${accessibility.hasPortuguese ? '✅ YES' : '❌ NO'}`);
    
    const cultural = results.tests.cultural.culturalAuthenticity;
    console.log(`• Cultural Authenticity Score: ${Object.values(cultural).filter(Boolean).length}/8`);
    console.log(`• Portuguese-speaking Countries: ${cultural.countriesCount}/5`);
    
    const mobile = results.tests.mobile.mobileResponsive;
    console.log(`• Mobile Responsiveness Score: ${Object.values(mobile).filter(Boolean).length}/4`);
    
    const performance = results.tests.performance.performance;
    console.log(`• Response Time: ${performance.responseTime}ms`);
    console.log(`• Compression Enabled: ${performance.hasGzip || performance.hasBrotli ? '✅ YES' : '❌ NO'}`);
    
    const routes = results.tests.routes;
    const workingRoutes = routes.filter(r => r.status === 200).length;
    console.log(`• Working Routes: ${workingRoutes}/${routes.length}`);
    
    console.log('\n🚨 Critical Issues:');
    const issues = [];
    if (accessibility.status !== 200) issues.push('Website not accessible');
    if (!accessibility.hasLusoTown) issues.push('Missing LusoTown branding');
    if (!accessibility.hasPortuguese) issues.push('Missing Portuguese context');
    if (!cultural.hasPortugueseSpeaking) issues.push('Not using inclusive "Portuguese-speaking" terminology');
    if (cultural.countriesCount < 2) issues.push('Limited Portuguese-speaking countries representation');
    if (!mobile.hasViewportMeta) issues.push('Missing mobile viewport meta tag');
    if (performance.responseTime > 3000) issues.push('Slow response time (>3s)');
    if (workingRoutes < routes.length) issues.push('Some routes not working');
    
    if (issues.length === 0) {
      console.log('✅ No critical issues found!');
    } else {
      issues.forEach((issue, index) => {
        console.log(`${index + 1}. ❌ ${issue}`);
      });
    }
    
    console.log('\n💡 Recommendations:');
    console.log('1. ✅ Continue monitoring website performance');
    console.log('2. ✅ Validate mobile UX with real device testing');
    console.log('3. ✅ Test Portuguese language toggle functionality');
    console.log('4. ✅ Verify all navigation links work correctly');
    console.log('5. ✅ Check demo login with provided credentials');
    
    console.log('\n🎉 Testing completed successfully!');
    
    return results;
    
  } catch (error) {
    console.log(`\n❌ Testing failed with error: ${error.message}`);
    return { error: error.message, timestamp: new Date().toISOString() };
  }
}

// Run the comprehensive test
runComprehensiveTest()
  .then(results => {
    console.log('\n📋 Full Results Available');
    // Could save results to file or send to monitoring system
  })
  .catch(error => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });