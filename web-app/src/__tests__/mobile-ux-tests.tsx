/**
 * Mobile UX Testing Suite for LusoTown
 * 
 * Comprehensive mobile testing framework specifically designed for
 * Portuguese community platform requirements and cultural considerations.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { validateMobileComponent, generateMobileReport } from '@/utils/mobile-ux-validator';
import { MOBILE_UX_AGENT_CONFIG } from '@/config/mobile-ux-agent';
import { MOBILE_DEVELOPMENT_STANDARDS } from '@/config/mobile-development-standards';

// Mock window dimensions for mobile testing
const mockViewport = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  
  // Dispatch resize event
  window.dispatchEvent(new Event('resize'));
};

// Mock touch events
const createTouchEvent = (type: string, touches: Array<{ clientX: number; clientY: number }>) => {
  const touchEvent = new Event(type, { bubbles: true });
  Object.defineProperty(touchEvent, 'touches', {
    value: touches.map(touch => ({
      clientX: touch.clientX,
      clientY: touch.clientY,
      target: document.body
    })),
    writable: false
  });
  return touchEvent;
};

// Portuguese test content for validation
const PORTUGUESE_TEST_CONTENT = {
  shortText: 'Eventos',
  mediumText: 'Comunidade Portuguesa em Londres',
  longText: 'Descubra a vibrante comunidade portuguesa em Londres através dos nossos eventos culturais autênticos',
  veryLongText: 'Participe em experiências únicas da cultura portuguesa, incluindo noites de fado tradicional, workshops de culinária portuguesa, festivais culturais e oportunidades de networking profissional',
  
  // Common UI elements in Portuguese
  navigation: {
    home: 'Início',
    events: 'Eventos',
    community: 'Comunidade',
    matches: 'Combinações',
    messages: 'Mensagens',
    profile: 'Perfil'
  },
  
  buttons: {
    joinEvent: 'Participar no Evento',
    sendMessage: 'Enviar Mensagem',
    saveToFavorites: 'Guardar nos Favoritos',
    shareEvent: 'Partilhar Evento',
    bookTransport: 'Reservar Transporte'
  },
  
  forms: {
    fullName: 'Nome Completo',
    emailAddress: 'Endereço de Email',
    phoneNumber: 'Número de Telefone',
    dateOfBirth: 'Data de Nascimento',
    location: 'Localização',
    interests: 'Interesses Culturais'
  }
};

/**
 * Mobile UX Test Suite Class
 */
export class MobileUXTestSuite {
  private testResults: Array<{ name: string; result: any; passed: boolean }> = [];

  /**
   * Run complete mobile UX test suite
   */
  async runCompleteSuite(component: React.ReactElement): Promise<void> {
    console.log('🚀 Starting Mobile UX Test Suite for LusoTown...\n');

    // Test critical mobile breakpoints
    await this.testMobileBreakpoints(component);
    
    // Test touch interactions
    await this.testTouchInteractions(component);
    
    // Test Portuguese text handling
    await this.testPortugueseTextHandling(component);
    
    // Test accessibility compliance
    await this.testMobileAccessibility(component);
    
    // Test performance considerations
    await this.testMobilePerformance(component);
    
    // Test gesture support
    await this.testGestureSupport(component);
    
    // Test cultural elements
    await this.testCulturalCompliance(component);

    // Generate final report
    this.generateFinalReport();
  }

  /**
   * Test component across critical mobile breakpoints
   */
  async testMobileBreakpoints(component: React.ReactElement): Promise<void> {
    const breakpoints = [
      { width: 375, height: 667, name: 'iPhone SE', priority: 'critical' },
      { width: 414, height: 896, name: 'iPhone 12', priority: 'critical' },
      { width: 390, height: 844, name: 'iPhone 13', priority: 'high' },
      { width: 768, height: 1024, name: 'iPad Portrait', priority: 'medium' },
    ];

    for (const breakpoint of breakpoints) {
      console.log(`📱 Testing ${breakpoint.name} (${breakpoint.width}x${breakpoint.height}px)...`);
      
      mockViewport(breakpoint.width, breakpoint.height);
      const { container } = render(component);
      
      // Run mobile validation
      const result = await validateMobileComponent(container, {
        viewports: [breakpoint],
        includePortugueseText: true,
        checkAccessibility: true,
        validatePerformance: true
      });

      // Check for horizontal scrolling
      const hasHorizontalScroll = container.scrollWidth > breakpoint.width;
      
      // Check for content overflow
      const elements = container.querySelectorAll('*');
      const overflowElements = Array.from(elements).filter(el => {
        if (el instanceof HTMLElement) {
          const rect = el.getBoundingClientRect();
          return rect.right > breakpoint.width;
        }
        return false;
      });

      const testResult = {
        name: `Mobile Layout - ${breakpoint.name}`,
        breakpoint,
        validationScore: result.score,
        hasHorizontalScroll,
        overflowElements: overflowElements.length,
        issues: result.issues,
        passed: result.passed && !hasHorizontalScroll && overflowElements.length === 0
      };

      this.testResults.push(testResult);
      
      if (testResult.passed) {
        console.log(`✅ ${breakpoint.name} layout test passed`);
      } else {
        console.log(`❌ ${breakpoint.name} layout test failed`);
        if (hasHorizontalScroll) console.log('  - Horizontal scrolling detected');
        if (overflowElements.length > 0) console.log(`  - ${overflowElements.length} elements overflow viewport`);
      }
    }
  }

  /**
   * Test touch target sizes and interactions
   */
  async testTouchInteractions(component: React.ReactElement): Promise<void> {
    console.log('👆 Testing touch interactions...');
    
    mockViewport(375, 667); // Test on smallest critical viewport
    const { container } = render(component);
    
    // Find all interactive elements
    const interactiveElements = container.querySelectorAll(
      'button, a, input, select, textarea, [onclick], [tabindex], [role="button"]'
    );

    let touchTargetIssues = 0;
    let spacingIssues = 0;
    const minTouchSize = 44;
    const minSpacing = 8;

    Array.from(interactiveElements).forEach((element) => {
      if (element instanceof HTMLElement) {
        const rect = element.getBoundingClientRect();
        
        // Check touch target size
        if (rect.width < minTouchSize || rect.height < minTouchSize) {
          touchTargetIssues++;
        }
        
        // Check spacing between elements
        const siblings = Array.from(element.parentElement?.children || [])
          .filter(sibling => sibling !== element && sibling instanceof HTMLElement);
        
        siblings.forEach((sibling) => {
          if (sibling instanceof HTMLElement) {
            const siblingRect = sibling.getBoundingClientRect();
            const distance = Math.min(
              Math.abs(rect.right - siblingRect.left),
              Math.abs(rect.left - siblingRect.right),
              Math.abs(rect.bottom - siblingRect.top),
              Math.abs(rect.top - siblingRect.bottom)
            );
            
            if (distance < minSpacing) {
              spacingIssues++;
            }
          }
        });
      }
    });

    // Test touch events
    let touchEventsWorking = 0;
    Array.from(interactiveElements).forEach((element) => {
      try {
        const touchStart = createTouchEvent('touchstart', [{ clientX: 100, clientY: 100 }]);
        element.dispatchEvent(touchStart);
        touchEventsWorking++;
      } catch (error) {
        // Touch event failed
      }
    });

    const testResult = {
      name: 'Touch Interactions',
      totalInteractiveElements: interactiveElements.length,
      touchTargetIssues,
      spacingIssues,
      touchEventsWorking,
      passed: touchTargetIssues === 0 && spacingIssues === 0
    };

    this.testResults.push(testResult);
    
    if (testResult.passed) {
      console.log('✅ Touch interactions test passed');
    } else {
      console.log('❌ Touch interactions test failed');
      if (touchTargetIssues > 0) console.log(`  - ${touchTargetIssues} elements below minimum touch size`);
      if (spacingIssues > 0) console.log(`  - ${spacingIssues} spacing issues between elements`);
    }
  }

  /**
   * Test Portuguese text handling and overflow
   */
  async testPortugueseTextHandling(component: React.ReactElement): Promise<void> {
    console.log('🇵🇹 Testing Portuguese text handling...');
    
    // Test different text lengths
    const textTests = [
      { name: 'Short Portuguese text', content: PORTUGUESE_TEST_CONTENT.shortText },
      { name: 'Medium Portuguese text', content: PORTUGUESE_TEST_CONTENT.mediumText },
      { name: 'Long Portuguese text', content: PORTUGUESE_TEST_CONTENT.longText },
      { name: 'Very long Portuguese text', content: PORTUGUESE_TEST_CONTENT.veryLongText },
    ];

    let overflowIssues = 0;
    let fontSizeIssues = 0;

    for (const textTest of textTests) {
      // Create test component with Portuguese text
      const TestComponent = () => (
        <div>
          {React.cloneElement(component)}
          <div data-testid="portuguese-text-test">
            <p>{textTest.content}</p>
            <button>{PORTUGUESE_TEST_CONTENT.buttons.joinEvent}</button>
            <label>{PORTUGUESE_TEST_CONTENT.forms.fullName}</label>
          </div>
        </div>
      );

      mockViewport(375, 667);
      const { container } = render(<TestComponent />);
      
      // Check for text overflow
      const textElements = container.querySelectorAll('p, button, label, span');
      Array.from(textElements).forEach((element) => {
        if (element instanceof HTMLElement) {
          if (element.scrollWidth > element.clientWidth || 
              element.scrollHeight > element.clientHeight) {
            overflowIssues++;
          }
          
          // Check font size
          const fontSize = parseInt(window.getComputedStyle(element).fontSize);
          if (fontSize < 14) {
            fontSizeIssues++;
          }
        }
      });
    }

    const testResult = {
      name: 'Portuguese Text Handling',
      overflowIssues,
      fontSizeIssues,
      passed: overflowIssues === 0 && fontSizeIssues === 0
    };

    this.testResults.push(testResult);
    
    if (testResult.passed) {
      console.log('✅ Portuguese text handling test passed');
    } else {
      console.log('❌ Portuguese text handling test failed');
      if (overflowIssues > 0) console.log(`  - ${overflowIssues} text overflow issues`);
      if (fontSizeIssues > 0) console.log(`  - ${fontSizeIssues} font size issues`);
    }
  }

  /**
   * Test mobile accessibility compliance
   */
  async testMobileAccessibility(component: React.ReactElement): Promise<void> {
    console.log('♿ Testing mobile accessibility...');
    
    mockViewport(375, 667);
    const { container } = render(component);
    
    // Check for proper heading structure
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const hasHeadings = headings.length > 0;
    
    // Check for alt text on images
    const images = container.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => 
      !img.alt && !img.getAttribute('aria-label')
    ).length;
    
    // Check for form labels
    const inputs = container.querySelectorAll('input, textarea, select');
    const inputsWithoutLabels = Array.from(inputs).filter(input => {
      const label = container.querySelector(`label[for="${input.id}"]`);
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledBy = input.getAttribute('aria-labelledby');
      return !label && !ariaLabel && !ariaLabelledBy;
    }).length;
    
    // Check for Portuguese lang attributes
    const portugueseElements = container.querySelectorAll('[lang="pt"], [lang="pt-PT"]');
    const hasPortugueseLangAttributes = portugueseElements.length > 0;

    const testResult = {
      name: 'Mobile Accessibility',
      hasHeadings,
      imagesWithoutAlt,
      inputsWithoutLabels,
      hasPortugueseLangAttributes,
      passed: hasHeadings && imagesWithoutAlt === 0 && inputsWithoutLabels === 0
    };

    this.testResults.push(testResult);
    
    if (testResult.passed) {
      console.log('✅ Mobile accessibility test passed');
    } else {
      console.log('❌ Mobile accessibility test failed');
      if (!hasHeadings) console.log('  - No heading structure found');
      if (imagesWithoutAlt > 0) console.log(`  - ${imagesWithoutAlt} images without alt text`);
      if (inputsWithoutLabels > 0) console.log(`  - ${inputsWithoutLabels} inputs without labels`);
    }
  }

  /**
   * Test mobile performance considerations
   */
  async testMobilePerformance(component: React.ReactElement): Promise<void> {
    console.log('⚡ Testing mobile performance...');
    
    const { container } = render(component);
    
    // Check for lazy loading
    const images = container.querySelectorAll('img');
    const imagesWithoutLazyLoading = Array.from(images).filter(img => 
      !img.loading || img.loading !== 'lazy'
    ).length;
    
    // Check for responsive images
    const imagesWithoutResponsive = Array.from(images).filter(img => 
      !img.sizes && !img.srcset
    ).length;
    
    // Check for excessive animations
    const animatedElements = container.querySelectorAll('[class*="animate-"]');
    const tooManyAnimations = animatedElements.length > 5;
    
    // Check bundle size considerations (simplified)
    const totalElements = container.querySelectorAll('*').length;
    const complexLayout = totalElements > 100;

    const testResult = {
      name: 'Mobile Performance',
      imagesWithoutLazyLoading,
      imagesWithoutResponsive,
      tooManyAnimations,
      complexLayout,
      totalElements,
      passed: imagesWithoutLazyLoading <= 2 && !tooManyAnimations && !complexLayout
    };

    this.testResults.push(testResult);
    
    if (testResult.passed) {
      console.log('✅ Mobile performance test passed');
    } else {
      console.log('❌ Mobile performance test failed');
      if (imagesWithoutLazyLoading > 2) console.log(`  - ${imagesWithoutLazyLoading} images without lazy loading`);
      if (tooManyAnimations) console.log('  - Too many animated elements');
      if (complexLayout) console.log(`  - Complex layout with ${totalElements} elements`);
    }
  }

  /**
   * Test gesture support
   */
  async testGestureSupport(component: React.ReactElement): Promise<void> {
    console.log('👋 Testing gesture support...');
    
    const { container } = render(component);
    
    // Check for swipeable elements
    const swipeElements = container.querySelectorAll('[class*="swipe"], [data-swipe]');
    const hasSwipeSupport = swipeElements.length > 0;
    
    // Test basic touch events
    let touchEventSupported = false;
    try {
      const touchEvent = createTouchEvent('touchstart', [{ clientX: 100, clientY: 100 }]);
      container.dispatchEvent(touchEvent);
      touchEventSupported = true;
    } catch (error) {
      // Touch events not supported
    }

    const testResult = {
      name: 'Gesture Support',
      hasSwipeSupport,
      touchEventSupported,
      swipeElementsCount: swipeElements.length,
      passed: hasSwipeSupport || touchEventSupported
    };

    this.testResults.push(testResult);
    
    if (testResult.passed) {
      console.log('✅ Gesture support test passed');
    } else {
      console.log('❌ Gesture support test failed - consider adding touch gestures for better mobile experience');
    }
  }

  /**
   * Test cultural compliance for Portuguese community
   */
  async testCulturalCompliance(component: React.ReactElement): Promise<void> {
    console.log('🏛️ Testing cultural compliance...');
    
    const { container } = render(component);
    
    // Check for Portuguese heritage colors
    const elements = container.querySelectorAll('*');
    let heritageColorsFound = false;
    const heritageColorClasses = [
      'red-600', 'green-600', 'heritage-', 'action-', 'primary-', 'secondary-'
    ];

    Array.from(elements).forEach((element) => {
      const classes = element.className;
      if (typeof classes === 'string') {
        if (heritageColorClasses.some(colorClass => classes.includes(colorClass))) {
          heritageColorsFound = true;
        }
      }
    });
    
    // Check for Portuguese content
    const textContent = container.textContent || '';
    const hasPortugueseContent = PORTUGUESE_TEST_CONTENT.shortText.split(' ')
      .some(word => textContent.toLowerCase().includes(word.toLowerCase()));
    
    // Check for cultural imagery
    const images = container.querySelectorAll('img');
    const culturalImages = Array.from(images).filter(img => {
      const src = img.src || '';
      const alt = img.alt || '';
      return src.includes('portuguese') || src.includes('portugal') || 
             alt.includes('Portuguese') || alt.includes('Portugal');
    }).length;

    const testResult = {
      name: 'Cultural Compliance',
      heritageColorsFound,
      hasPortugueseContent,
      culturalImages,
      passed: heritageColorsFound || hasPortugueseContent || culturalImages > 0
    };

    this.testResults.push(testResult);
    
    if (testResult.passed) {
      console.log('✅ Cultural compliance test passed');
    } else {
      console.log('❌ Cultural compliance test failed - consider adding Portuguese cultural elements');
    }
  }

  /**
   * Generate comprehensive test report
   */
  private generateFinalReport(): void {
    console.log('\n📊 MOBILE UX TEST SUITE RESULTS\n');
    console.log('='.repeat(50));
    
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(result => result.passed).length;
    const successRate = (passedTests / totalTests * 100).toFixed(1);
    
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${passedTests}`);
    console.log(`Failed: ${totalTests - passedTests}`);
    console.log(`Success Rate: ${successRate}%\n`);
    
    // Detailed results
    this.testResults.forEach((result, index) => {
      const status = result.passed ? '✅ PASS' : '❌ FAIL';
      console.log(`${index + 1}. ${result.name}: ${status}`);
      
      // Show specific details for failed tests
      if (!result.passed) {
        Object.entries(result).forEach(([key, value]) => {
          if (key !== 'name' && key !== 'passed') {
            console.log(`   ${key}: ${JSON.stringify(value)}`);
          }
        });
      }
    });
    
    // Recommendations
    console.log('\n🎯 RECOMMENDATIONS:\n');
    
    if (successRate < 80) {
      console.log('- Critical mobile UX issues detected. Review failed tests before deployment.');
    }
    
    if (successRate >= 80 && successRate < 95) {
      console.log('- Good mobile UX foundation. Address remaining issues for optimal experience.');
    }
    
    if (successRate >= 95) {
      console.log('- Excellent mobile UX! Your component meets LusoTown standards.');
    }
    
    console.log('- Test on real devices before production deployment');
    console.log('- Consider Portuguese community feedback for cultural elements');
    console.log('- Monitor performance on slower mobile networks');
    console.log('- Validate with assistive technologies for accessibility');
    
    console.log(`\n${  '='.repeat(50)}`);
  }

  /**
   * Get test results for programmatic access
   */
  getResults(): Array<{ name: string; result: any; passed: boolean }> {
    return this.testResults;
  }
}

// Export testing utilities
export { PORTUGUESE_TEST_CONTENT, mockViewport, createTouchEvent };

// Default export
export default MobileUXTestSuite;