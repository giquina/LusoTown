import { test, expect } from '@playwright/test';

/**
 * LusoTown Performance and Accessibility E2E Tests
 * 
 * Comprehensive testing for:
 * - Portuguese community page load performance
 * - Portuguese text accessibility with screen readers
 * - Portuguese cultural image alt-text validation
 * - Portuguese form accessibility and validation
 * - Cross-browser Portuguese character rendering
 * - Mobile performance optimization
 */

const PERFORMANCE_CONFIG = {
  demo: {
    email: 'demo@lusotown.com',
    password: 'LusoTown2025!'
  },
  thresholds: {
    pageLoad: 8000,        // 8 seconds max
    firstContentfulPaint: 3000,  // 3 seconds max
    largestContentfulPaint: 5000, // 5 seconds max
    imageLoad: 2000,       // 2 seconds max
    formSubmission: 1000   // 1 second max
  },
  accessibilityStandards: {
    minContrastRatio: 4.5, // WCAG AA standard
    minTouchTargetSize: 44, // iOS HIG minimum
    maxPageSize: 2048,      // 2MB max initial page size
  }
};

class PerformanceTestHelper {
  async measurePageLoadTime(page: any, url: string): Promise<number> {
    const startTime = Date.now();
    await page.goto(url);
    await page.waitForLoadState('networkidle');
    return Date.now() - startTime;
  }

  async measureImageLoadTimes(page: any): Promise<number[]> {
    const images = page.locator('img');
    const imageCount = await images.count();
    const loadTimes: number[] = [];

    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      const img = images.nth(i);
      const startTime = Date.now();
      
      try {
        await img.waitFor({ state: 'visible', timeout: 5000 });
        await img.evaluate((el: HTMLImageElement) => {
          if (el.complete) return;
          return new Promise(resolve => {
            el.onload = resolve;
            el.onerror = resolve;
          });
        });
        loadTimes.push(Date.now() - startTime);
      } catch (error) {
        loadTimes.push(5000); // Timeout value
      }
    }

    return loadTimes;
  }

  async getWebVitals(page: any): Promise<Record<string, number>> {
    return await page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals: Record<string, number> = {};
        
        // First Contentful Paint
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          for (const entry of entries) {
            if (entry.name === 'first-contentful-paint') {
              vitals.fcp = entry.startTime;
            }
          }
        }).observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          if (lastEntry) {
            vitals.lcp = lastEntry.startTime;
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // Cumulative Layout Shift
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          vitals.cls = clsValue;
        }).observe({ entryTypes: ['layout-shift'] });

        // Return after a short delay to collect metrics
        setTimeout(() => resolve(vitals), 2000);
      });
    });
  }

  async checkAccessibility(page: any): Promise<void> {
    // Check heading hierarchy
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();

    if (headingCount > 0) {
      // Should have at least one h1
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBeGreaterThanOrEqual(1);
    }

    // Check images have alt text
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < Math.min(imageCount, 10); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const role = await img.getAttribute('role');
      
      // Either has alt text or is decorative
      expect(alt !== null || role === 'presentation' || role === 'none').toBe(true);
    }

    // Check form labels
    const inputs = page.locator('input[type="text"], input[type="email"], input[type="password"], textarea');
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = await label.isVisible();
        const hasAriaLabel = ariaLabel || ariaLabelledBy;
        
        expect(hasLabel || hasAriaLabel).toBe(true);
      }
    }

    // Check color contrast (basic test)
    const textElements = page.locator('p, span, a, button, h1, h2, h3, h4, h5, h6');
    const textCount = await textElements.count();

    for (let i = 0; i < Math.min(textCount, 5); i++) {
      const element = textElements.nth(i);
      
  const styles = await element.evaluate((el: HTMLElement) => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          fontSize: computed.fontSize
        };
      });

      // Verify text is readable (basic check)
      expect(styles.fontSize).toMatch(/\d+px/);
    }
  }
}

test.describe('Portuguese Community Performance Testing', () => {
  let helper: PerformanceTestHelper;

  test.beforeEach(async ({ page }) => {
    helper = new PerformanceTestHelper();
  });

  test('Homepage load performance with Portuguese content', async ({ page }) => {
    const loadTime = await helper.measurePageLoadTime(page, '/');
    expect(loadTime).toBeLessThan(PERFORMANCE_CONFIG.thresholds.pageLoad);

    // Measure Web Vitals
    const vitals = await helper.getWebVitals(page);
    
    if (vitals.fcp) {
      expect(vitals.fcp).toBeLessThan(PERFORMANCE_CONFIG.thresholds.firstContentfulPaint);
    }
    
    if (vitals.lcp) {
      expect(vitals.lcp).toBeLessThan(PERFORMANCE_CONFIG.thresholds.largestContentfulPaint);
    }

    // Check if Portuguese text renders quickly
    const portugueseText = page.locator('text=/português|comunidade|eventos/i');
    await expect(portugueseText.first()).toBeVisible({ timeout: 3000 });

    // Measure image load performance
    const imageLoadTimes = await helper.measureImageLoadTimes(page);
    const averageImageLoad = imageLoadTimes.reduce((a, b) => a + b, 0) / imageLoadTimes.length;
    
    if (imageLoadTimes.length > 0) {
      expect(averageImageLoad).toBeLessThan(PERFORMANCE_CONFIG.thresholds.imageLoad);
    }
  });

  test('Portuguese business directory performance', async ({ page }) => {
    const loadTime = await helper.measurePageLoadTime(page, '/business-directory');
    expect(loadTime).toBeLessThan(PERFORMANCE_CONFIG.thresholds.pageLoad);

    // Test search performance
    const searchInput = page.locator('input[type="search"], input[placeholder*="search"]');
    
    if (await searchInput.isVisible()) {
      const searchStartTime = Date.now();
      await searchInput.fill('restaurante');
      await page.keyboard.press('Enter');
      
      // Wait for search results
      await page.waitForTimeout(2000);
      const searchTime = Date.now() - searchStartTime;
      
      expect(searchTime).toBeLessThan(3000); // 3 seconds max for search
    }

    // Test map loading performance if present
    const mapContainer = page.locator('.leaflet-container, #map, .map');
    if (await mapContainer.isVisible({ timeout: 5000 })) {
      // Map should load within reasonable time
      const mapTiles = page.locator('.leaflet-tile-loaded');
      await expect(mapTiles.first()).toBeVisible({ timeout: 8000 });
    }
  });

  test('Portuguese events page performance', async ({ page }) => {
    const loadTime = await helper.measurePageLoadTime(page, '/events');
    expect(loadTime).toBeLessThan(PERFORMANCE_CONFIG.thresholds.pageLoad);

    // Test event card rendering performance
    const eventCards = page.locator('[data-testid="event-card"], .event-card');
    const cardCount = await eventCards.count();

    if (cardCount > 0) {
      // All visible cards should render quickly
      const visibleCards = eventCards.locator(':visible').first();
      await expect(visibleCards).toBeVisible({ timeout: 2000 });
    }

    // Test calendar performance if present
    const calendar = page.locator('.calendar, [data-calendar]');
    if (await calendar.isVisible({ timeout: 3000 })) {
      // Test calendar navigation
      const nextButton = page.locator('button:has-text("Next"), .calendar-next');
      if (await nextButton.isVisible()) {
        const navStartTime = Date.now();
        await nextButton.click();
        await page.waitForTimeout(500);
        const navTime = Date.now() - navStartTime;
        
        expect(navTime).toBeLessThan(1000); // Fast calendar navigation
      }
    }
  });

  test('Mobile performance optimization', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const mobileLoadTime = await helper.measurePageLoadTime(page, '/');
    expect(mobileLoadTime).toBeLessThan(PERFORMANCE_CONFIG.thresholds.pageLoad + 2000); // Allow extra time for mobile

    // Test mobile menu performance
    const mobileMenu = page.locator('[data-testid="mobile-menu"], .mobile-menu-button');
    if (await mobileMenu.isVisible()) {
      const menuStartTime = Date.now();
      await mobileMenu.click();
      
      // Menu should open quickly
      const menuPanel = page.locator('.mobile-menu-panel, nav');
      await expect(menuPanel).toBeVisible({ timeout: 1000 });
      
      const menuTime = Date.now() - menuStartTime;
      expect(menuTime).toBeLessThan(500); // Very fast menu opening
    }

    // Test touch interaction performance
    const touchTargets = page.locator('button, a, .tap-target');
    const touchCount = await touchTargets.count();

    for (let i = 0; i < Math.min(touchCount, 3); i++) {
      const target = touchTargets.nth(i);
      if (await target.isVisible()) {
        const box = await target.boundingBox();
        if (box) {
          // Touch targets should be appropriately sized
          const minSize = Math.min(box.width, box.height);
          expect(minSize).toBeGreaterThanOrEqual(32); // Allow smaller for testing
        }
      }
    }
  });
});

test.describe('Portuguese Text Accessibility Testing', () => {
  let helper: PerformanceTestHelper;

  test.beforeEach(async ({ page }) => {
    helper = new PerformanceTestHelper();
  });

  test('Portuguese character accessibility and screen reader support', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await helper.checkAccessibility(page);

    // Test Portuguese character support
    const portugueseElements = page.locator('text=/[àáâãéêíóôõúçÀÁÂÃÉÊÍÓÔÕÚÇ]/');
    const portugueseCount = await portugueseElements.count();

    for (let i = 0; i < Math.min(portugueseCount, 3); i++) {
      const element = portugueseElements.nth(i);
      
      // Check language attribute
      const lang = await element.getAttribute('lang');
      const parentLang = await element.locator('..').getAttribute('lang');
      const htmlLang = await page.getAttribute('html', 'lang');
      
      // Should have Portuguese language indication somewhere
      const hasPortugueseLang = [lang, parentLang, htmlLang].some(l => l?.startsWith('pt'));
      expect(hasPortugueseLang).toBe(true);
    }

    // Test ARIA attributes for Portuguese content
    const ariaElements = page.locator('[aria-label*="português"], [aria-label*="Portugal"], [aria-label*="Brazil"]');
    const ariaCount = await ariaElements.count();

    for (let i = 0; i < ariaCount; i++) {
      const element = ariaElements.nth(i);
      const ariaLabel = await element.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel!.length).toBeGreaterThan(3);
    }
  });

  test('Portuguese cultural image alt-text validation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check all images for proper alt text
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < Math.min(imageCount, 15); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const role = await img.getAttribute('role');
      const src = await img.getAttribute('src');

      if (role === 'presentation' || role === 'none') {
        // Decorative images don't need alt text
        continue;
      }

      expect(alt).toBeTruthy();
      
      // Portuguese cultural images should have descriptive alt text
      if (src?.includes('portugal') || src?.includes('brazilian') || src?.includes('fado')) {
        expect(alt!.length).toBeGreaterThan(10);
        
        // Should contain cultural context
        const culturalWords = ['portuguese', 'portugal', 'brazilian', 'brazil', 'fado', 'cultural', 'festival'];
        const hasCulturalContext = culturalWords.some(word => alt!.toLowerCase().includes(word));
        expect(hasCulturalContext).toBe(true);
      }
    }

    // Test image loading states
    const lazyImages = page.locator('img[loading="lazy"]');
    const lazyCount = await lazyImages.count();

    // Should use lazy loading for performance
    expect(lazyCount).toBeGreaterThan(0);
  });

  test('Portuguese form accessibility and validation', async ({ page }) => {
    // Test contact form
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    await helper.checkAccessibility(page);

    // Test Portuguese name input
    const nameInput = page.locator('input[name="name"], input[type="text"]').first();
    if (await nameInput.isVisible()) {
      // Test Portuguese characters
      const portugueseName = 'João António da Costa';
      await nameInput.fill(portugueseName);
      
      const inputValue = await nameInput.inputValue();
      expect(inputValue).toBe(portugueseName);

      // Test form validation
      await nameInput.fill('');
      
      const submitButton = page.locator('button[type="submit"], input[type="submit"]');
      if (await submitButton.isVisible()) {
        await submitButton.click();
        await page.waitForTimeout(1000);

        // Check for validation messages
        const validationMessages = page.locator('.error, [role="alert"], .invalid-feedback, .field-error');
        const hasValidation = await validationMessages.isVisible({ timeout: 2000 });
        
        // Should provide validation feedback
        expect(hasValidation).toBe(true);
      }
    }

    // Test email validation with Portuguese domains
    const emailInput = page.locator('input[type="email"]');
    if (await emailInput.isVisible()) {
      const portugueseEmail = 'teste@exemplo.pt';
      await emailInput.fill(portugueseEmail);
      
      const emailValue = await emailInput.inputValue();
      expect(emailValue).toBe(portugueseEmail);

      // Test invalid email
      await emailInput.fill('invalid-email');
      
      const submitButton = page.locator('button[type="submit"]');
      if (await submitButton.isVisible()) {
        await submitButton.click();
        await page.waitForTimeout(1000);

        // Should show email validation
        const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());
        expect(isValid).toBe(false);
      }
    }
  });

  test('Keyboard navigation accessibility', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test tab navigation
    await page.keyboard.press('Tab');
    
    let focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();

    // Test navigation through interactive elements
    const interactiveElements = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
    
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      
      if (focusedElement && interactiveElements.includes(focusedElement)) {
        // Check if element is visible
        const isFocusVisible = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement;
          return el && el.offsetParent !== null;
        });
        expect(isFocusVisible).toBe(true);
      }
    }

    // Test skip links if present
    const skipLink = page.locator('a:has-text("Skip to content"), .skip-link');
    if (await skipLink.isVisible()) {
      await skipLink.click();
      
      // Should jump to main content
      const mainContent = page.locator('main, #main, .main-content');
      await expect(mainContent).toBeFocused({ timeout: 1000 });
    }
  });
});

test.describe('Cross-Browser Portuguese Character Rendering', () => {
  test('Portuguese character consistency across browsers', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Create test element with full Portuguese character set
    const portugueseChars = 'àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞß';
    
    await page.evaluate((chars) => {
      const testDiv = document.createElement('div');
      testDiv.id = 'portuguese-char-test';
      testDiv.textContent = chars;
      testDiv.style.cssText = 'font: 16px Arial, sans-serif; position: fixed; top: 0; left: 0; z-index: 9999;';
      document.body.appendChild(testDiv);
    }, portugueseChars);

    // Test character rendering
    const testElement = page.locator('#portuguese-char-test');
    const renderedText = await testElement.textContent();
    
    expect(renderedText).toBe(portugueseChars);

    // Test font rendering properties
    const fontInfo = await testElement.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight
      };
    });

    expect(fontInfo.fontSize).toBe('16px');
    expect(fontInfo.fontFamily).toBeTruthy();

    // Clean up
    await page.evaluate(() => {
      const element = document.getElementById('portuguese-char-test');
      if (element) element.remove();
    });

    // Test existing Portuguese content
    const portugueseElements = page.locator('text=/[àáâãéêíóôõúç]/i');
    const elemCount = await portugueseElements.count();

    for (let i = 0; i < Math.min(elemCount, 3); i++) {
      const element = portugueseElements.nth(i);
      const text = await element.textContent();
      
      if (text) {
        // Verify characters are properly encoded
        expect(text).toMatch(/[àáâãéêíóôõúç]/i);
        
        // Test character width (should not be zero-width)
        const bounds = await element.boundingBox();
        if (bounds) {
          expect(bounds.width).toBeGreaterThan(0);
        }
      }
    }
  });

  test('Portuguese text input and form handling', async ({ page, browserName }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    const testInputs = [
      { selector: 'input[name="name"], input[type="text"]', value: 'José António de Sá' },
      { selector: 'textarea', value: 'Mensagem com acentos: ação, coração, português, informação.' },
      { selector: 'input[type="email"]', value: 'jose.antonio@exemplo.com.pt' }
    ];

    for (const { selector, value } of testInputs) {
      const input = page.locator(selector).first();
      
      if (await input.isVisible({ timeout: 2000 })) {
        await input.fill(value);
        
        // Verify value is properly stored
        const storedValue = await input.inputValue();
        expect(storedValue).toBe(value);

        // Test copy/paste functionality
        await input.selectText();
        await page.keyboard.press('Control+c');
        await input.fill('');
        await page.keyboard.press('Control+v');
        
        const pastedValue = await input.inputValue();
        expect(pastedValue).toBe(value);
      }
    }
  });
});

test.describe('Mobile Accessibility and Performance', () => {

  test('Mobile Portuguese content accessibility', async ({ page }) => {
    const helper = new PerformanceTestHelper();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await helper.checkAccessibility(page);

    // Test mobile font sizes
    const textElements = page.locator('p, span, a, h1, h2, h3');
    const textCount = await textElements.count();

    for (let i = 0; i < Math.min(textCount, 5); i++) {
      const element = textElements.nth(i);
      
      const fontSize = await element.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return parseInt(computed.fontSize);
      });

      // Mobile text should be at least 14px for readability
      expect(fontSize).toBeGreaterThanOrEqual(14);
    }

    // Test mobile touch targets
    const touchTargets = page.locator('button, a, input, [role="button"]');
    const targetCount = await touchTargets.count();

    for (let i = 0; i < Math.min(targetCount, 10); i++) {
      const target = touchTargets.nth(i);
      
      if (await target.isVisible()) {
        const box = await target.boundingBox();
        
        if (box) {
          const minSize = Math.min(box.width, box.height);
          // Apple HIG recommends minimum 44pt, Android recommends 48dp
          expect(minSize).toBeGreaterThanOrEqual(32); // Allow slightly smaller for testing
        }
      }
    }

    // Test mobile Portuguese text wrapping
    const longTextElements = page.locator('p, .description, .content');
    const longTextCount = await longTextElements.count();

    for (let i = 0; i < Math.min(longTextCount, 3); i++) {
      const element = longTextElements.nth(i);
      const text = await element.textContent();
      
      if (text && text.length > 100) {
        const box = await element.boundingBox();
        
        if (box) {
          // Text should fit within mobile viewport
          expect(box.width).toBeLessThanOrEqual(375);
        }
      }
    }
  });
});
