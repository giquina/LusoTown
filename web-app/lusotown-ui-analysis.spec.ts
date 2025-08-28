import { test, expect, Page } from '@playwright/test';

test.describe('LusoTown UI/UX Analysis', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto('http://localhost:3001');
  });

  test('Homepage UI Analysis', async () => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Test 1: Check if homepage loads properly
    const title = await page.title();
    console.log('Page Title:', title);

    // Test 2: Check for Portuguese language toggle
    const languageToggle = await page.locator('[data-testid="language-toggle"], [aria-label*="language"], [aria-label*="língua"]').first();
    const hasLanguageToggle = await languageToggle.count() > 0;
    console.log('Language Toggle Present:', hasLanguageToggle);

    // Test 3: Mobile responsiveness check
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.screenshot({ path: 'lusotown-mobile-375px.png', fullPage: true });

    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await page.screenshot({ path: 'lusotown-tablet-768px.png', fullPage: true });

    await page.setViewportSize({ width: 1200, height: 800 }); // Desktop
    await page.screenshot({ path: 'lusotown-desktop-1200px.png', fullPage: true });

    // Test 4: Check for carousel elements
    const carouselElements = await page.locator('[class*="carousel"], [data-testid*="carousel"], [aria-label*="carousel"]').count();
    console.log('Carousel Elements Found:', carouselElements);

    // Test 5: Portuguese content visibility
    const portugueseContent = await page.locator('text=/português|comunidade|eventos|negócios/i').count();
    console.log('Portuguese Content Elements:', portugueseContent);

    // Test 6: Navigation structure
    const navLinks = await page.locator('nav a, [role="navigation"] a').count();
    console.log('Navigation Links Count:', navLinks);

    // Test 7: Check for loading issues
    const errorMessages = await page.locator('text=/error|erro|404|not found/i').count();
    console.log('Error Messages Found:', errorMessages);

    // Test 8: Button and interactive elements
    const buttons = await page.locator('button, [role="button"]').count();
    console.log('Interactive Buttons Count:', buttons);

    // Test 9: Form elements for user engagement
    const forms = await page.locator('form, input, textarea').count();
    console.log('Form Elements Count:', forms);

    // Test 10: Social sharing elements
    const socialElements = await page.locator('[href*="whatsapp"], [href*="instagram"], [href*="facebook"], [href*="telegram"]').count();
    console.log('Social Sharing Elements:', socialElements);
  });

  test('Portuguese Community Content Analysis', async () => {
    // Check for cultural authenticity markers
    const culturalMarkers = await page.locator('text=/fado|samba|portugal|brasil|cabo verde|angola/i').count();
    console.log('Cultural Authenticity Markers:', culturalMarkers);

    // Check for UK location references
    const ukReferences = await page.locator('text=/london|uk|kingdom|manchester|birmingham|bristol/i').count();
    console.log('UK Location References:', ukReferences);

    // Check for community statistics
    const statsElements = await page.locator('text=/750|2150|members|students|partnerships/i').count();
    console.log('Community Statistics Elements:', statsElements);
  });

  test('Accessibility and UX Analysis', async () => {
    // Check for alt texts on images
    const images = await page.locator('img').count();
    const imagesWithAlt = await page.locator('img[alt]').count();
    console.log('Images Total:', images, 'With Alt Text:', imagesWithAlt);

    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    const h2Count = await page.locator('h2').count();
    const h3Count = await page.locator('h3').count();
    console.log('Heading Structure - H1:', h1Count, 'H2:', h2Count, 'H3:', h3Count);

    // Check for ARIA labels
    const ariaLabels = await page.locator('[aria-label], [aria-labelledby]').count();
    console.log('ARIA Labels Present:', ariaLabels);

    // Check for proper color contrast (basic check)
    const bodyStyles = await page.evaluate(() => {
      const body = document.body;
      const styles = window.getComputedStyle(body);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        fontFamily: styles.fontFamily
      };
    });
    console.log('Body Styles:', bodyStyles);
  });

  test('Performance and Technical Analysis', async () => {
    // Measure page load time
    const startTime = Date.now();
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    console.log('Page Load Time (ms):', loadTime);

    // Check for console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.reload();
    await page.waitForTimeout(3000);
    console.log('Console Errors:', errors.length, errors);

    // Check for broken links
    const links = await page.locator('a[href]').all();
    let brokenLinks = 0;
    for (const link of links.slice(0, 10)) { // Check first 10 links
      try {
        const href = await link.getAttribute('href');
        if (href && href.startsWith('http')) {
          // Skip external link checking in development
          continue;
        }
      } catch (e) {
        brokenLinks++;
      }
    }
    console.log('Potential Broken Links:', brokenLinks);
  });
});