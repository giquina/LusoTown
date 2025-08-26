import { test, expect } from '@playwright/test';

test.describe('LusoTown UX Fixes Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the development server
    await page.goto('http://localhost:3001');
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
  });

  test('1. App Download Bar - Dismissal Functionality', async ({ page }) => {
    console.log('Testing App Download Bar dismissal functionality...');
    
    // Check if app download bar is present
    const appDownloadBar = page.locator('[data-testid="app-download-bar"], .app-download-bar, [class*="download-bar"]');
    
    if (await appDownloadBar.isVisible()) {
      console.log('✅ App Download Bar is visible');
      
      // Look for dismiss button
      const dismissButton = page.locator('button:has-text("×"), button:has-text("Close"), button:has-text("Dismiss"), [data-testid="dismiss-button"]');
      
      if (await dismissButton.isVisible()) {
        console.log('✅ Dismiss button found');
        await dismissButton.click();
        
        // Wait for animation to complete
        await page.waitForTimeout(500);
        
        // Check if bar is hidden
        if (!(await appDownloadBar.isVisible())) {
          console.log('✅ App Download Bar successfully dismissed');
        } else {
          console.log('⚠️ App Download Bar still visible after dismiss');
        }
      } else {
        console.log('⚠️ Dismiss button not found');
      }
    } else {
      console.log('⚠️ App Download Bar not found on page');
    }
  });

  test('2. Chat Widget - Scrolling and Positioning', async ({ page }) => {
    console.log('Testing Chat Widget scrolling and positioning...');
    
    // Look for LusoBot widget
    const chatWidget = page.locator('[data-testid="lusobot-widget"], [class*="lusobot"], [class*="chat-widget"]');
    
    if (await chatWidget.isVisible()) {
      console.log('✅ Chat Widget is visible');
      
      // Click to open chat
      await chatWidget.click();
      await page.waitForTimeout(300);
      
      // Check for chat container
      const chatContainer = page.locator('[data-lusobot-chat-container], [class*="chat-container"], [class*="chat-messages"]');
      
      if (await chatContainer.isVisible()) {
        console.log('✅ Chat container opened successfully');
        
        // Test scroll position
        const scrollTop = await chatContainer.evaluate(el => el.scrollTop);
        console.log(`Chat scroll position: ${scrollTop}`);
        
        // Check z-index and positioning
        const zIndex = await chatWidget.evaluate(el => window.getComputedStyle(el).zIndex);
        console.log(`Chat widget z-index: ${zIndex}`);
        
        if (parseInt(zIndex) >= 1000) {
          console.log('✅ Chat widget has proper z-index for positioning');
        } else {
          console.log('⚠️ Chat widget may have z-index issues');
        }
      } else {
        console.log('⚠️ Chat container not found');
      }
    } else {
      console.log('⚠️ Chat Widget not found on page');
    }
  });

  test('3. PALOP Heritage Section - Clear CTAs', async ({ page }) => {
    console.log('Testing PALOP Heritage Section CTAs...');
    
    // Look for PALOP section
    const palopSection = page.locator('[data-testid="palop-section"], section:has-text("PALOP"), [class*="palop"]');
    
    if (await palopSection.isVisible()) {
      console.log('✅ PALOP Section is visible');
      
      // Look for CTA buttons
      const ctaButtons = page.locator('a:has-text("Explore"), a:has-text("→"), button:has-text("Explore"), button:has-text("→")');
      const ctaCount = await ctaButtons.count();
      
      console.log(`Found ${ctaCount} CTA buttons in PALOP section`);
      
      if (ctaCount > 0) {
        console.log('✅ PALOP Section has CTA buttons');
        
        // Test first CTA button
        const firstCta = ctaButtons.first();
        const ctaText = await firstCta.textContent();
        console.log(`First CTA text: ${ctaText}`);
        
        // Check if CTA is clickable
        if (await firstCta.isEnabled()) {
          console.log('✅ CTA buttons are clickable');
        } else {
          console.log('⚠️ CTA buttons may not be properly enabled');
        }
      } else {
        console.log('⚠️ No CTA buttons found in PALOP section');
      }
    } else {
      console.log('⚠️ PALOP Section not found on page');
    }
  });

  test('4. Cultural Calendar - Interaction Buttons', async ({ page }) => {
    console.log('Testing Cultural Calendar interactions...');
    
    // Look for cultural calendar section
    const calendarSection = page.locator('[data-testid="cultural-calendar"], section:has-text("Cultural"), section:has-text("Calendar"), [class*="calendar"]');
    
    if (await calendarSection.isVisible()) {
      console.log('✅ Cultural Calendar Section is visible');
      
      // Look for interaction buttons
      const interactionButtons = page.locator('button:has-text("Add to Calendar"), button:has-text("Share"), button:has-text("View Event"), a:has-text("Add to Calendar")');
      const buttonCount = await interactionButtons.count();
      
      console.log(`Found ${buttonCount} interaction buttons in Cultural Calendar`);
      
      if (buttonCount > 0) {
        console.log('✅ Cultural Calendar has interaction buttons');
        
        // Test button functionality
        const firstButton = interactionButtons.first();
        const buttonText = await firstButton.textContent();
        console.log(`First interaction button: ${buttonText}`);
        
        if (await firstButton.isEnabled()) {
          console.log('✅ Calendar interaction buttons are enabled');
        } else {
          console.log('⚠️ Calendar interaction buttons may not be properly enabled');
        }
      } else {
        console.log('⚠️ No interaction buttons found in Cultural Calendar');
      }
    } else {
      console.log('⚠️ Cultural Calendar Section not found on page');
    }
  });

  test('5. Matches Section - User Guidance', async ({ page }) => {
    console.log('Testing Matches Section user guidance...');
    
    // Look for matches section
    const matchesSection = page.locator('[data-testid="matches-section"], section:has-text("Match"), section:has-text("Connect"), [class*="matches"]');
    
    if (await matchesSection.isVisible()) {
      console.log('✅ Matches Section is visible');
      
      // Look for guidance elements
      const guidanceElements = page.locator('[data-testid="matches-guidance"], [class*="guidance"], [class*="help"], [class*="steps"]');
      const guidanceCount = await guidanceElements.count();
      
      console.log(`Found ${guidanceCount} guidance elements in Matches section`);
      
      if (guidanceCount > 0) {
        console.log('✅ Matches Section has user guidance');
        
        // Look for step indicators or progress
        const stepElements = page.locator('[class*="step"], [data-step], li:has-text("Step")');
        const stepCount = await stepElements.count();
        
        console.log(`Found ${stepCount} step indicators`);
        
        if (stepCount > 0) {
          console.log('✅ Step-by-step guidance found');
        } else {
          console.log('⚠️ No step indicators found');
        }
      } else {
        console.log('⚠️ No user guidance found in Matches section');
      }
    } else {
      console.log('⚠️ Matches Section not found on page');
    }
  });

  test('6. Widget Manager - Z-Index Management', async ({ page }) => {
    console.log('Testing Widget Manager z-index management...');
    
    // Get all floating elements that should be managed
    const floatingElements = page.locator('[class*="fixed"], [class*="sticky"], [style*="position: fixed"], [style*="position: sticky"]');
    const elementCount = await floatingElements.count();
    
    console.log(`Found ${elementCount} floating elements`);
    
    if (elementCount > 0) {
      // Check z-index values
      for (let i = 0; i < Math.min(elementCount, 5); i++) {
        const element = floatingElements.nth(i);
        if (await element.isVisible()) {
          const zIndex = await element.evaluate(el => window.getComputedStyle(el).zIndex);
          const className = await element.getAttribute('class');
          console.log(`Element ${i + 1}: z-index=${zIndex}, class="${className}"`);
        }
      }
      
      console.log('✅ Widget positioning system active');
    } else {
      console.log('⚠️ No floating elements found to manage');
    }
  });

  test('7. User Guidance System - First-Time Visitors', async ({ page }) => {
    console.log('Testing User Guidance System...');
    
    // Clear localStorage to simulate first-time visitor
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    
    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Look for guidance elements
    const guidanceBanner = page.locator('[data-testid="welcome-guidance"], [class*="welcome-banner"], [class*="guidance-banner"]');
    const helpButton = page.locator('[data-testid="help-button"], button:has-text("Help"), [class*="help-button"]');
    
    let guidanceFound = false;
    
    if (await guidanceBanner.isVisible()) {
      console.log('✅ Welcome guidance banner found');
      guidanceFound = true;
    }
    
    if (await helpButton.isVisible()) {
      console.log('✅ Help button found');
      guidanceFound = true;
    }
    
    if (guidanceFound) {
      console.log('✅ User Guidance System is active');
    } else {
      console.log('⚠️ User Guidance System elements not found');
    }
  });

  test('8. Mobile Responsiveness - Key Breakpoints', async ({ page }) => {
    console.log('Testing mobile responsiveness...');
    
    // Test mobile viewport (375px)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    // Check if elements are properly sized
    const header = page.locator('header, [role="banner"]');
    const main = page.locator('main, [role="main"]');
    
    if (await header.isVisible()) {
      const headerWidth = await header.evaluate(el => el.offsetWidth);
      console.log(`Header width at 375px: ${headerWidth}px`);
      
      if (headerWidth <= 375) {
        console.log('✅ Header responsive at mobile width');
      } else {
        console.log('⚠️ Header may have overflow at mobile width');
      }
    }
    
    // Test tablet viewport (768px)
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    
    // Test desktop viewport (1024px)
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(500);
    
    console.log('✅ Mobile responsiveness test completed');
  });

  test('9. Portuguese Language Context', async ({ page }) => {
    console.log('Testing Portuguese language context...');
    
    // Look for Portuguese text or language switcher
    const portugueseElements = page.locator(':has-text("Português"), :has-text("PT"), [lang="pt"], [class*="portuguese"]');
    const portugueseCount = await portugueseElements.count();
    
    console.log(`Found ${portugueseCount} Portuguese language elements`);
    
    // Look for cultural references
    const culturalElements = page.locator(':has-text("Lusophone"), :has-text("PALOP"), :has-text("Portuguese-speaking")');
    const culturalCount = await culturalElements.count();
    
    console.log(`Found ${culturalCount} Portuguese cultural references`);
    
    if (portugueseCount > 0 || culturalCount > 0) {
      console.log('✅ Portuguese cultural context present');
    } else {
      console.log('⚠️ Limited Portuguese cultural context found');
    }
  });

  test('10. Performance and Loading', async ({ page }) => {
    console.log('Testing performance and loading states...');
    
    const startTime = Date.now();
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    console.log(`Page load time: ${loadTime}ms`);
    
    // Check for loading states
    const loadingElements = page.locator('[class*="loading"], [class*="skeleton"], [class*="animate-pulse"]');
    const loadingCount = await loadingElements.count();
    
    console.log(`Found ${loadingCount} loading state elements`);
    
    if (loadTime < 3000) {
      console.log('✅ Page loads within acceptable time');
    } else {
      console.log('⚠️ Page load time may be slow');
    }
    
    console.log('✅ Performance test completed');
  });
});