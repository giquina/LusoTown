const { chromium } = require('playwright');

async function analyzeWebsite() {
  console.log('🚀 Starting LusoTown Website Analysis...\n');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const results = [];
  
  const pagesToAnalyze = [
    { url: 'http://localhost:3000/', name: 'Homepage' },
    { url: 'http://localhost:3000/about', name: 'About Page' },
    { url: 'http://localhost:3000/events', name: 'Events Page' },
    { url: 'http://localhost:3000/transport', name: 'Transport Services' },
    { url: 'http://localhost:3000/live', name: 'Live Streaming' },
    { url: 'http://localhost:3000/students', name: 'University Students' },
    { url: 'http://localhost:3000/premium-membership', name: 'Premium Membership' },
    { url: 'http://localhost:3000/chat', name: 'Community Chat' },
    { url: 'http://localhost:3000/my-network', name: 'My Network' },
    { url: 'http://localhost:3000/housing-assistance', name: 'Housing Assistance' },
    { url: 'http://localhost:3000/mentorship', name: 'Mentorship Programs' },
    { url: 'http://localhost:3000/subscription', name: 'Subscription Page' }
  ];

  for (const pageInfo of pagesToAnalyze) {
    console.log(`📊 Analyzing: ${pageInfo.name} (${pageInfo.url})`);
    
    try {
      const startTime = Date.now();
      const response = await page.goto(pageInfo.url, { waitUntil: 'networkidle', timeout: 30000 });
      const loadTime = Date.now() - startTime;
      
      if (response.status() !== 200) {
        console.log(`❌ ${pageInfo.name}: HTTP ${response.status()}`);
        results.push({
          page: pageInfo.name,
          status: 'fail',
          issues: [`HTTP ${response.status()}`],
          loadTime: loadTime
        });
        continue;
      }
      
      // Basic checks
      const issues = [];
      const metrics = { loadTime };
      
      // Check title
      const title = await page.title();
      if (!title || title.length < 10) {
        issues.push('Title missing or too short');
      }
      metrics.title = title;
      
      // Check for Portuguese content
      const bodyText = await page.textContent('body');
      const hasPortugueseChars = /[áàâãçéêíóôõúü]/gi.test(bodyText || '');
      if (!hasPortugueseChars) {
        issues.push('No Portuguese characters detected');
      }
      
      // Check for navigation
      const navCount = await page.locator('nav, header').count();
      if (navCount === 0) {
        issues.push('No navigation found');
      }
      
      // Check for images
      const images = await page.locator('img').count();
      metrics.imageCount = images;
      
      // Check for broken images
      const imageElements = await page.locator('img').all();
      let brokenImages = 0;
      for (const img of imageElements.slice(0, 5)) { // Check first 5 images only for speed
        const src = await img.getAttribute('src');
        if (src && src.startsWith('http')) {
          try {
            const imgResponse = await page.request.get(src);
            if (imgResponse.status() !== 200) {
              brokenImages++;
            }
          } catch (e) {
            brokenImages++;
          }
        }
      }
      
      if (brokenImages > 0) {
        issues.push(`${brokenImages} broken images detected`);
      }
      
      // Performance check
      if (loadTime > 5000) {
        issues.push(`Slow load time: ${loadTime}ms`);
      } else if (loadTime > 3000) {
        issues.push(`Moderate load time: ${loadTime}ms`);
      }
      
      // Check meta description
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      if (!metaDescription) {
        issues.push('Missing meta description');
      }
      
      results.push({
        page: pageInfo.name,
        status: issues.length === 0 ? 'pass' : (issues.length > 3 ? 'fail' : 'warning'),
        issues: issues,
        metrics: metrics
      });
      
      const statusIcon = issues.length === 0 ? '✅' : (issues.length > 3 ? '❌' : '⚠️');
      console.log(`${statusIcon} ${pageInfo.name}: ${issues.length} issues (${loadTime}ms)`);
      
    } catch (error) {
      console.log(`❌ ${pageInfo.name}: Error - ${error.message}`);
      results.push({
        page: pageInfo.name,
        status: 'fail',
        issues: [`Error: ${error.message}`],
        metrics: {}
      });
    }
  }
  
  await browser.close();
  
  // Generate report
  console.log('\n' + '='.repeat(80));
  console.log('📋 LUSOTOWN WEBSITE ANALYSIS REPORT');
  console.log('='.repeat(80));
  
  const totalIssues = results.reduce((sum, result) => sum + result.issues.length, 0);
  const failedPages = results.filter(result => result.status === 'fail').length;
  const warningPages = results.filter(result => result.status === 'warning').length;
  const passedPages = results.filter(result => result.status === 'pass').length;
  
  console.log(`\n📊 SUMMARY:`);
  console.log(`   Total Pages Analyzed: ${results.length}`);
  console.log(`   ✅ Passed: ${passedPages}`);
  console.log(`   ⚠️  Warnings: ${warningPages}`);
  console.log(`   ❌ Failed: ${failedPages}`);
  console.log(`   🐛 Total Issues: ${totalIssues}`);
  
  console.log(`\n📈 OVERALL ASSESSMENT:`);
  if (totalIssues === 0) {
    console.log('   🎉 EXCELLENT - No issues found!');
  } else if (totalIssues <= 10) {
    console.log('   👍 GOOD - Minor issues that can be easily addressed');
  } else if (totalIssues <= 25) {
    console.log('   🔧 MODERATE - Several issues need attention');
  } else {
    console.log('   🚨 NEEDS WORK - Significant improvements required');
  }
  
  console.log(`\n📄 DETAILED RESULTS:`);
  
  for (const result of results) {
    const statusIcon = result.status === 'pass' ? '✅' : (result.status === 'warning' ? '⚠️' : '❌');
    console.log(`\n${statusIcon} ${result.page}`);
    console.log(`   Load Time: ${result.metrics.loadTime || 'N/A'}ms`);
    console.log(`   Title: "${result.metrics.title || 'N/A'}"`);
    
    if (result.issues.length > 0) {
      console.log(`   Issues (${result.issues.length}):`);
      result.issues.forEach(issue => {
        console.log(`   • ${issue}`);
      });
    } else {
      console.log('   ✨ No issues found');
    }
  }
  
  console.log(`\n🔧 RECOMMENDATIONS:`);
  
  const allIssues = results.flatMap(result => result.issues);
  const issueCategories = {
    'Performance': allIssues.filter(issue => issue.includes('load time') || issue.includes('slow')),
    'SEO': allIssues.filter(issue => issue.includes('title') || issue.includes('meta')),
    'Images': allIssues.filter(issue => issue.includes('image')),
    'Navigation': allIssues.filter(issue => issue.includes('navigation')),
    'Portuguese Content': allIssues.filter(issue => issue.includes('Portuguese')),
    'Technical': allIssues.filter(issue => issue.includes('Error') || issue.includes('HTTP'))
  };
  
  Object.entries(issueCategories).forEach(([category, issues]) => {
    if (issues.length > 0) {
      console.log(`\n   ${category} (${issues.length} issues):`);
      const uniqueIssues = [...new Set(issues)];
      uniqueIssues.forEach(issue => {
        console.log(`   • ${issue}`);
      });
    }
  });
  
  console.log(`\n✨ Analysis completed! Time: ${new Date().toLocaleString()}`);
  console.log('='.repeat(80));
  
  return results;
}

analyzeWebsite().catch(console.error);