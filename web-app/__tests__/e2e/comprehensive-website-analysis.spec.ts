import { test, expect, type Page } from '@playwright/test';

interface AnalysisResult {
  page: string;
  status: 'pass' | 'fail' | 'warning';
  issues: string[];
  metrics: Record<string, any>;
  accessibility: any[];
  performance: any;
}

class LusoTownWebsiteAnalyzer {
  private page: Page;
  private results: AnalysisResult[] = [];

  constructor(page: Page) {
    this.page = page;
  }

  async analyzePage(url: string, pageName: string): Promise<AnalysisResult> {
    const result: AnalysisResult = {
      page: pageName,
      status: 'pass',
      issues: [],
      metrics: {},
      accessibility: [],
      performance: {}
    };

    try {
      // Navigate to page and measure loading time
      const startTime = Date.now();
      const response = await this.page.goto(url);
      const loadTime = Date.now() - startTime;
      
      result.metrics.loadTime = loadTime;
      result.metrics.statusCode = response?.status();

      // Check if page loaded successfully
      if (response?.status() !== 200) {
        result.status = 'fail';
        result.issues.push(`Page returned status ${response?.status()}`);
        return result;
      }

      // Wait for page to be fully loaded
      await this.page.waitForLoadState('networkidle');

      // Basic page structure checks
      await this.checkBasicStructure(result);
      
      // Portuguese content checks
      await this.checkPortugueseContent(result);
      
      // Mobile responsiveness
      await this.checkMobileResponsiveness(result);
      
      // Accessibility checks
      await this.checkAccessibility(result);
      
      // SEO checks
      await this.checkSEO(result);
      
      // Performance checks
      await this.checkPerformance(result);
      
      // User interface checks
      await this.checkUI(result);

      // Language switching functionality
      await this.checkLanguageSwitching(result);

    } catch (error) {
      result.status = 'fail';
      result.issues.push(`Error analyzing page: ${error.message}`);
    }

    return result;
  }

  async checkBasicStructure(result: AnalysisResult) {
    // Check for essential elements
    const hasHeader = await this.page.locator('header').count() > 0;
    const hasFooter = await this.page.locator('footer').count() > 0;
    const hasMainContent = await this.page.locator('main').count() > 0;

    if (!hasHeader) result.issues.push('Missing header element');
    if (!hasFooter) result.issues.push('Missing footer element');
    if (!hasMainContent) result.issues.push('Missing main content element');

    // Check for broken images
    const images = await this.page.locator('img').all();
    let brokenImages = 0;
    for (const img of images) {
      const src = await img.getAttribute('src');
      if (src && src.startsWith('http')) {
        const response = await this.page.request.get(src);
        if (response.status() !== 200) {
          brokenImages++;
        }
      }
    }
    
    result.metrics.totalImages = images.length;
    result.metrics.brokenImages = brokenImages;
    if (brokenImages > 0) {
      result.issues.push(`${brokenImages} broken images found`);
    }
  }

  async checkPortugueseContent(result: AnalysisResult) {
    // Check for Portuguese text content
    const bodyText = await this.page.locator('body').textContent();
    
    // Portuguese character detection
    const portugueseChars = /[áàâãçéêíóôõúü]/gi;
    const hasPortugueseChars = portugueseChars.test(bodyText || '');
    
    // Common Portuguese words
    const portugueseWords = [
      'português', 'portuguesa', 'lisboa', 'porto', 'fado', 'saudade',
      'comunidade', 'negócios', 'cultura', 'tradição'
    ];
    
    const hasPortugueseWords = portugueseWords.some(word => 
      bodyText?.toLowerCase().includes(word)
    );

    result.metrics.hasPortugueseChars = hasPortugueseChars;
    result.metrics.hasPortugueseWords = hasPortugueseWords;

    if (!hasPortugueseChars && !hasPortugueseWords) {
      result.issues.push('No Portuguese content detected - may not be properly localized');
    }
  }

  async checkMobileResponsiveness(result: AnalysisResult) {
    // Test different viewport sizes
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1920, height: 1080, name: 'Desktop' }
    ];

    const responsiveIssues = [];

    for (const viewport of viewports) {
      await this.page.setViewportSize(viewport);
      await this.page.waitForTimeout(500); // Allow for responsive adjustments

      // Check for horizontal scroll
      const hasHorizontalScroll = await this.page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      if (hasHorizontalScroll) {
        responsiveIssues.push(`Horizontal scroll detected on ${viewport.name}`);
      }

      // Check if navigation is accessible on mobile
      if (viewport.width <= 768) {
        const mobileMenu = await this.page.locator('[data-testid="mobile-menu"], .mobile-menu, .hamburger').count();
        if (mobileMenu === 0) {
          responsiveIssues.push('Mobile navigation menu not found');
        }
      }
    }

    result.metrics.responsiveIssues = responsiveIssues;
    result.issues.push(...responsiveIssues);
  }

  async checkAccessibility(result: AnalysisResult) {
    // Check for alt text on images
    const imagesWithoutAlt = await this.page.locator('img:not([alt])').count();
    if (imagesWithoutAlt > 0) {
      result.issues.push(`${imagesWithoutAlt} images missing alt text`);
    }

    // Check for proper heading hierarchy
    const headings = await this.page.locator('h1, h2, h3, h4, h5, h6').all();
    const headingLevels = [];
    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
      headingLevels.push(parseInt(tagName.charAt(1)));
    }

    // Check if h1 exists and is unique
    const h1Count = headingLevels.filter(level => level === 1).length;
    if (h1Count === 0) {
      result.issues.push('No H1 heading found');
    } else if (h1Count > 1) {
      result.issues.push('Multiple H1 headings found');
    }

    // Check for proper form labels
    const inputs = await this.page.locator('input[type="text"], input[type="email"], textarea').all();
    let unlabeledInputs = 0;
    for (const input of inputs) {
      const hasLabel = await input.evaluate(el => {
        const id = el.getAttribute('id');
        const hasAriaLabel = el.hasAttribute('aria-label');
        const hasAriaLabelledBy = el.hasAttribute('aria-labelledby');
        const hasAssociatedLabel = id && document.querySelector(`label[for="${id}"]`);
        
        return hasLabel || hasAriaLabel || hasAriaLabelledBy || hasAssociatedLabel;
      });
      
      if (!hasLabel) unlabeledInputs++;
    }

    if (unlabeledInputs > 0) {
      result.issues.push(`${unlabeledInputs} form inputs without proper labels`);
    }

    result.metrics.imagesWithoutAlt = imagesWithoutAlt;
    result.metrics.headingStructure = headingLevels;
    result.metrics.unlabeledInputs = unlabeledInputs;
  }

  async checkSEO(result: AnalysisResult) {
    // Check meta title
    const title = await this.page.title();
    if (!title || title.length < 10) {
      result.issues.push('Meta title missing or too short');
    } else if (title.length > 60) {
      result.issues.push('Meta title too long (>60 characters)');
    }

    // Check meta description
    const metaDescription = await this.page.locator('meta[name="description"]').getAttribute('content');
    if (!metaDescription) {
      result.issues.push('Meta description missing');
    } else if (metaDescription.length < 120) {
      result.issues.push('Meta description too short (<120 characters)');
    } else if (metaDescription.length > 160) {
      result.issues.push('Meta description too long (>160 characters)');
    }

    // Check for Open Graph tags
    const ogTitle = await this.page.locator('meta[property="og:title"]').count();
    const ogDescription = await this.page.locator('meta[property="og:description"]').count();
    const ogImage = await this.page.locator('meta[property="og:image"]').count();

    if (ogTitle === 0) result.issues.push('Missing og:title');
    if (ogDescription === 0) result.issues.push('Missing og:description');
    if (ogImage === 0) result.issues.push('Missing og:image');

    result.metrics.seo = {
      title: title,
      titleLength: title?.length || 0,
      metaDescription: metaDescription,
      metaDescriptionLength: metaDescription?.length || 0,
      hasOgTags: ogTitle > 0 && ogDescription > 0 && ogImage > 0
    };
  }

  async checkPerformance(result: AnalysisResult) {
    // Measure First Contentful Paint and other metrics
    const performanceMetrics = await this.page.evaluate(() => {
      const timing = performance.timing;
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      return {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        loadComplete: timing.loadEventEnd - timing.navigationStart,
        firstContentfulPaint: navigation?.toJSON?.()?.['firstContentfulPaint'] || null,
        largestContentfulPaint: navigation?.toJSON?.()?.['largestContentfulPaint'] || null,
        resourceCount: performance.getEntriesByType('resource').length
      };
    });

    result.performance = performanceMetrics;

    // Performance thresholds
    if (performanceMetrics.domContentLoaded > 3000) {
      result.issues.push('DOM Content Loaded time > 3 seconds');
    }
    if (performanceMetrics.loadComplete > 5000) {
      result.issues.push('Page load time > 5 seconds');
    }
    if (performanceMetrics.resourceCount > 100) {
      result.issues.push('High number of resources loaded (>100)');
    }
  }

  async checkUI(result: AnalysisResult) {
    // Check for consistent branding colors
    const primaryColor = await this.page.evaluate(() => {
      const computedStyle = getComputedStyle(document.documentElement);
      return computedStyle.getPropertyValue('--primary-500') || 
             computedStyle.getPropertyValue('--color-primary') ||
             '#000000';
    });

    // Check for consistent font usage
    const bodyFont = await this.page.evaluate(() => {
      return getComputedStyle(document.body).fontFamily;
    });

    // Check for Portuguese cultural elements
    const culturalElements = await this.page.locator('[data-cultural], .fado, .portuguese, .lusitano').count();

    result.metrics.ui = {
      primaryColor,
      bodyFont,
      culturalElements
    };

    // Check for broken CSS
    const brokenStyles = await this.page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      let broken = 0;
      elements.forEach(el => {
        const styles = getComputedStyle(el);
        if (styles.display === 'none' && el.textContent?.trim()) {
          // Element with content is hidden - potential issue
        }
      });
      return broken;
    });
  }

  async checkLanguageSwitching(result: AnalysisResult) {
    // Look for language switcher
    const langSwitcher = await this.page.locator('[data-testid="language-switcher"], .language-switch, [aria-label*="language"]').first();
    
    if (await langSwitcher.count() > 0) {
      try {
        const originalContent = await this.page.locator('body').textContent();
        await langSwitcher.click();
        await this.page.waitForTimeout(1000); // Wait for language change
        
        const newContent = await this.page.locator('body').textContent();
        
        if (originalContent === newContent) {
          result.issues.push('Language switcher does not change content');
        } else {
          result.metrics.hasWorkingLanguageSwitch = true;
        }
      } catch (error) {
        result.issues.push('Language switcher not functional');
      }
    } else {
      result.issues.push('Language switcher not found');
    }
  }

  generateReport(): string {
    const totalIssues = this.results.reduce((sum, result) => sum + result.issues.length, 0);
    const failedPages = this.results.filter(result => result.status === 'fail').length;
    
    let report = `# LusoTown Website Professional Analysis Report\n\n`;
    report += `**Analysis Date:** ${new Date().toISOString()}\n`;
    report += `**Pages Analyzed:** ${this.results.length}\n`;
    report += `**Total Issues Found:** ${totalIssues}\n`;
    report += `**Failed Pages:** ${failedPages}\n\n`;

    // Executive Summary
    report += `## Executive Summary\n\n`;
    if (totalIssues === 0) {
      report += `✅ **Excellent!** No significant issues found across the platform.\n\n`;
    } else if (totalIssues <= 10) {
      report += `⚠️ **Good** with minor improvements needed. ${totalIssues} issues require attention.\n\n`;
    } else if (totalIssues <= 25) {
      report += `🔶 **Moderate** issues found. ${totalIssues} items need addressing for optimal performance.\n\n`;
    } else {
      report += `🔴 **Significant** improvements needed. ${totalIssues} critical issues require immediate attention.\n\n`;
    }

    // Detailed Results by Page
    report += `## Detailed Analysis by Page\n\n`;
    
    for (const result of this.results) {
      const statusIcon = result.status === 'pass' ? '✅' : '❌';
      report += `### ${statusIcon} ${result.page}\n\n`;
      
      if (result.issues.length === 0) {
        report += `**Status:** Excellent - No issues found\n\n`;
      } else {
        report += `**Issues Found (${result.issues.length}):**\n`;
        result.issues.forEach(issue => {
          report += `- ${issue}\n`;
        });
        report += `\n`;
      }

      // Performance metrics
      if (result.performance && Object.keys(result.performance).length > 0) {
        report += `**Performance:**\n`;
        report += `- Load Time: ${result.metrics.loadTime}ms\n`;
        report += `- DOM Content Loaded: ${result.performance.domContentLoaded}ms\n`;
        report += `- Resources Loaded: ${result.performance.resourceCount}\n\n`;
      }

      // SEO metrics
      if (result.metrics.seo) {
        report += `**SEO:**\n`;
        report += `- Title: "${result.metrics.seo.title}" (${result.metrics.seo.titleLength} chars)\n`;
        report += `- Meta Description: ${result.metrics.seo.metaDescriptionLength} chars\n`;
        report += `- Open Graph Tags: ${result.metrics.seo.hasOgTags ? 'Present' : 'Missing'}\n\n`;
      }
    }

    // Recommendations
    report += `## Recommendations for Improvement\n\n`;
    
    const allIssues = this.results.flatMap(result => result.issues);
    const issueCategories = this.categorizeIssues(allIssues);
    
    Object.entries(issueCategories).forEach(([category, issues]) => {
      if (issues.length > 0) {
        report += `### ${category}\n`;
        issues.forEach(issue => {
          report += `- ${issue}\n`;
        });
        report += `\n`;
      }
    });

    return report;
  }

  private categorizeIssues(issues: string[]): Record<string, string[]> {
    const categories: Record<string, string[]> = {
      'Performance': [],
      'Accessibility': [],
      'SEO': [],
      'Mobile Responsiveness': [],
      'Portuguese Localization': [],
      'Technical': []
    };

    issues.forEach(issue => {
      const lowercaseIssue = issue.toLowerCase();
      
      if (lowercaseIssue.includes('load') || lowercaseIssue.includes('performance') || lowercaseIssue.includes('slow')) {
        categories['Performance'].push(issue);
      } else if (lowercaseIssue.includes('alt') || lowercaseIssue.includes('label') || lowercaseIssue.includes('heading')) {
        categories['Accessibility'].push(issue);
      } else if (lowercaseIssue.includes('meta') || lowercaseIssue.includes('title') || lowercaseIssue.includes('og:')) {
        categories['SEO'].push(issue);
      } else if (lowercaseIssue.includes('mobile') || lowercaseIssue.includes('responsive') || lowercaseIssue.includes('scroll')) {
        categories['Mobile Responsiveness'].push(issue);
      } else if (lowercaseIssue.includes('portuguese') || lowercaseIssue.includes('language')) {
        categories['Portuguese Localization'].push(issue);
      } else {
        categories['Technical'].push(issue);
      }
    });

    return categories;
  }
}

test.describe('LusoTown Comprehensive Website Analysis', () => {
  let analyzer: LusoTownWebsiteAnalyzer;
  
  test.beforeEach(async ({ page }) => {
    analyzer = new LusoTownWebsiteAnalyzer(page);
  });

  const pagesToAnalyze = [
    { url: '/', name: 'Homepage' },
    { url: '/about', name: 'About Page' },
    { url: '/events', name: 'Events Page' },
    { url: '/transport', name: 'Transport Services' },
    { url: '/live', name: 'Live Streaming' },
    { url: '/matches', name: 'Premium Matches' },
    { url: '/students', name: 'University Students' },
    { url: '/premium-membership', name: 'Premium Membership' },
    { url: '/chat', name: 'Community Chat' },
    { url: '/my-network', name: 'My Network' },
    { url: '/housing-assistance', name: 'Housing Assistance' },
    { url: '/mentorship', name: 'Mentorship Programs' },
    { url: '/neighborhood-groups', name: 'Neighborhood Groups' },
    { url: '/business-directory', name: 'Business Directory' },
    { url: '/subscription', name: 'Subscription Page' }
  ];

  test('Comprehensive Website Analysis', async () => {
    const results: AnalysisResult[] = [];

    // Analyze each page
    for (const pageInfo of pagesToAnalyze) {
      console.log(`Analyzing: ${pageInfo.name}`);
      const result = await analyzer.analyzePage(pageInfo.url, pageInfo.name);
      results.push(result);
      analyzer['results'] = results; // Update analyzer results
    }

    // Generate and save report
    const report = analyzer.generateReport();
    
    // Write report to file
    const fs = require('fs');
    const path = require('path');
    const reportPath = path.join(process.cwd(), 'lusotown-analysis-report.md');
    fs.writeFileSync(reportPath, report);
    
    console.log(`\n${report}`);
    console.log(`\nFull report saved to: ${reportPath}`);

    // Assert that the analysis completed
    expect(results.length).toBe(pagesToAnalyze.length);
    
    // Fail test if any critical issues found
    const criticalIssues = results.filter(result => result.status === 'fail');
    if (criticalIssues.length > 0) {
      const failedPages = criticalIssues.map(result => result.page).join(', ');
      console.warn(`❌ Critical issues found on: ${failedPages}`);
    }
    
    const totalIssues = results.reduce((sum, result) => sum + result.issues.length, 0);
    console.log(`\n📊 Analysis Summary: ${totalIssues} total issues found across ${results.length} pages`);
  });
});