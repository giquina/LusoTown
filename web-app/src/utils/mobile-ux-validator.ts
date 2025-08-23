/**
 * Mobile UX Validation Utilities for LusoTown
 * 
 * Automated validation functions to ensure mobile compatibility
 * and Portuguese-speaking community accessibility standards.
 */

import { MOBILE_UX_AGENT_CONFIG } from '@/config/mobile-ux-agent';

export interface ValidationResult {
  passed: boolean;
  score: number; // 0-100
  issues: ValidationIssue[];
  recommendations: string[];
  portugueseSpecificIssues: string[];
}

export interface ValidationIssue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'layout' | 'interaction' | 'typography' | 'performance' | 'accessibility' | 'cultural';
  message: string;
  element?: string;
  fix: string;
}

export interface MobileTestConfig {
  viewports: Array<{ width: number; height: number; name: string }>;
  includePortugueseText: boolean;
  checkAccessibility: boolean;
  validatePerformance: boolean;
}

class MobileUXValidator {
  private issues: ValidationIssue[] = [];
  private recommendations: string[] = [];
  private portugueseIssues: string[] = [];

  /**
   * Comprehensive mobile UX validation
   */
  async validateMobileUX(
    container: HTMLElement | Document = document,
    config: Partial<MobileTestConfig> = {}
  ): Promise<ValidationResult> {
    this.reset();

    const defaultConfig: MobileTestConfig = {
      viewports: [
        { width: 375, height: 667, name: 'iPhone SE' },
        { width: 414, height: 896, name: 'iPhone 12' },
        { width: 768, height: 1024, name: 'iPad' }
      ],
      includePortugueseText: true,
      checkAccessibility: true,
      validatePerformance: true,
      ...config
    };

    // Run validation checks
    await this.validateTouchTargets(container);
    await this.validateResponsiveLayout(container, defaultConfig.viewports);
    
    if (defaultConfig.includePortugueseText) {
      await this.validatePortugueseTextHandling(container);
    }
    
    if (defaultConfig.checkAccessibility) {
      await this.validateAccessibility(container);
    }
    
    if (defaultConfig.validatePerformance) {
      await this.validateMobilePerformance();
    }

    await this.validateGestureSupport(container);
    await this.validateCulturalElements(container);

    const score = this.calculateScore();
    
    return {
      passed: score >= 80, // 80% threshold for passing
      score,
      issues: this.issues,
      recommendations: this.recommendations,
      portugueseSpecificIssues: this.portugueseIssues
    };
  }

  /**
   * Validate touch target sizes and spacing
   */
  private async validateTouchTargets(container: HTMLElement | Document): Promise<void> {
    const interactiveElements = this.getInteractiveElements(container);
    const minSize = 44; // WCAG AA standard
    const recommendedSize = 48;

    interactiveElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const { width, height } = rect;

      if (width < minSize || height < minSize) {
        this.addIssue({
          severity: 'critical',
          category: 'interaction',
          message: `Touch target too small: ${Math.round(width)}x${Math.round(height)}px (minimum ${minSize}x${minSize}px required)`,
          element: this.getElementSelector(element),
          fix: `Add classes: min-h-[${minSize}px] min-w-[${minSize}px] or increase padding`
        });
      } else if (width < recommendedSize || height < recommendedSize) {
        this.addIssue({
          severity: 'medium',
          category: 'interaction',
          message: `Touch target below recommended size: ${Math.round(width)}x${Math.round(height)}px (recommended ${recommendedSize}x${recommendedSize}px)`,
          element: this.getElementSelector(element),
          fix: `Consider increasing to min-h-[${recommendedSize}px] min-w-[${recommendedSize}px]`
        });
      }

      // Check spacing between elements
      this.validateTouchTargetSpacing(element);
    });

    if (interactiveElements.length === 0) {
      this.addRecommendation('Consider adding interactive elements for better mobile engagement');
    }
  }

  /**
   * Validate responsive layout across different viewports
   */
  private async validateResponsiveLayout(
    container: HTMLElement | Document,
    viewports: Array<{ width: number; height: number; name: string }>
  ): Promise<void> {
    const originalViewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    for (const viewport of viewports) {
      await this.testViewport(viewport, container);
    }

    // Restore original viewport
    await this.setViewportSize(originalViewport.width, originalViewport.height);
  }

  /**
   * Test layout at specific viewport size
   */
  private async testViewport(
    viewport: { width: number; height: number; name: string },
    container: HTMLElement | Document
  ): Promise<void> {
    await this.setViewportSize(viewport.width, viewport.height);

    // Check for horizontal scrolling
    if (document.body.scrollWidth > viewport.width) {
      this.addIssue({
        severity: 'high',
        category: 'layout',
        message: `Horizontal scrolling detected on ${viewport.name} (${viewport.width}px)`,
        fix: 'Use responsive design classes and avoid fixed widths'
      });
    }

    // Check for layout overflow
    const elements = container instanceof Document 
      ? container.querySelectorAll('*') 
      : container.querySelectorAll('*');
    
    Array.from(elements).forEach((element) => {
      if (element instanceof HTMLElement) {
        const rect = element.getBoundingClientRect();
        if (rect.right > viewport.width) {
          this.addIssue({
            severity: 'medium',
            category: 'layout',
            message: `Element extends beyond viewport on ${viewport.name}`,
            element: this.getElementSelector(element),
            fix: 'Add responsive classes or adjust max-width'
          });
        }
      }
    });

    // Test text readability
    this.validateTextReadability(container, viewport);
  }

  /**
   * Validate Portuguese text handling and overflow
   */
  private async validatePortugueseTextHandling(container: HTMLElement | Document): Promise<void> {
    const textElements = this.getTextElements(container);
    
    textElements.forEach((element) => {
      const text = element.textContent || '';
      
      // Check for Portuguese text overflow
      if (this.hasTextOverflow(element)) {
        this.addIssue({
          severity: 'medium',
          category: 'typography',
          message: 'Text overflow detected - may affect Portuguese content',
          element: this.getElementSelector(element),
          fix: 'Add line-clamp-* classes or increase container width'
        });
        
        if (this.containsPortugueseText(text)) {
          this.portugueseIssues.push(
            `Portuguese text overflow in ${this.getElementSelector(element)}`
          );
        }
      }

      // Check for long Portuguese words that might break layout
      if (this.hasLongPortugueseWords(text)) {
        this.addIssue({
          severity: 'low',
          category: 'typography',
          message: 'Long Portuguese words may break layout on small screens',
          element: this.getElementSelector(element),
          fix: 'Add break-words and hyphens-auto classes'
        });
      }

      // Validate font size on mobile
      const fontSize = window.getComputedStyle(element).fontSize;
      const fontSizeNum = parseInt(fontSize);
      if (fontSizeNum < 14) {
        this.addIssue({
          severity: 'medium',
          category: 'typography',
          message: `Font size too small for mobile: ${fontSize}`,
          element: this.getElementSelector(element),
          fix: 'Use minimum 14px (text-sm) for body text on mobile'
        });
      }
    });
  }

  /**
   * Validate accessibility standards
   */
  private async validateAccessibility(container: HTMLElement | Document): Promise<void> {
    // Check for proper heading structure
    this.validateHeadingStructure(container);
    
    // Check for alt text on images
    this.validateImageAccessibility(container);
    
    // Check for form labels
    this.validateFormAccessibility(container);
    
    // Check color contrast
    await this.validateColorContrast(container);
    
    // Check for Portuguese language attributes
    this.validateLanguageAttributes(container);
  }

  /**
   * Validate mobile performance considerations
   */
  private async validateMobilePerformance(): Promise<void> {
    // Check for large images
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      if (!img.loading || img.loading !== 'lazy') {
        this.addIssue({
          severity: 'low',
          category: 'performance',
          message: 'Image not lazy loaded',
          element: this.getElementSelector(img),
          fix: 'Add loading="lazy" attribute'
        });
      }

      // Check for responsive images
      if (!img.sizes && !img.srcset) {
        this.addIssue({
          severity: 'medium',
          category: 'performance',
          message: 'Image not responsive',
          element: this.getElementSelector(img),
          fix: 'Use Next.js Image component with responsive sizing'
        });
      }
    });

    // Check for excessive animations
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    if (animatedElements.length > 5) {
      this.addIssue({
        severity: 'low',
        category: 'performance',
        message: 'Many animated elements detected - may impact performance',
        fix: 'Consider reducing animations or adding prefers-reduced-motion support'
      });
    }
  }

  /**
   * Validate gesture support implementation
   */
  private async validateGestureSupport(container: HTMLElement | Document): Promise<void> {
    // Check for swipeable elements
    const potentialSwipeElements = container instanceof Document
      ? document.querySelectorAll('[class*="swipe"], [data-swipe]')
      : container.querySelectorAll('[class*="swipe"], [data-swipe]');

    if (potentialSwipeElements.length === 0) {
      this.addRecommendation('Consider adding swipe gestures for better mobile navigation');
    }

    // Check for touch event listeners
    const interactiveElements = this.getInteractiveElements(container);
    let touchListenersFound = 0;

    interactiveElements.forEach((element) => {
      const events = ['touchstart', 'touchmove', 'touchend'];
      const hasTouch = events.some(event => {
        const listeners = (element as any)._listeners?.[event];
        return listeners && listeners.length > 0;
      });

      if (hasTouch) {
        touchListenersFound++;
      }
    });

    if (touchListenersFound === 0 && interactiveElements.length > 0) {
      this.addRecommendation('Consider adding touch event handling for enhanced mobile interaction');
    }
  }

  /**
   * Validate Portuguese cultural elements
   */
  private async validateCulturalElements(container: HTMLElement | Document): Promise<void> {
    // Check for Portuguese brand colors
    const elements = container instanceof Document 
      ? document.querySelectorAll('*') 
      : container.querySelectorAll('*');

    let culturalColorsFound = false;
    const portugalColors = ['red-600', 'green-600', 'heritage-', 'portugal-'];

    Array.from(elements).forEach((element) => {
      const classes = element.className;
      if (typeof classes === 'string' && portugalColors.some(color => classes.includes(color))) {
        culturalColorsFound = true;
      }
    });

    if (!culturalColorsFound) {
      this.addRecommendation('Consider using Portuguese heritage colors to maintain cultural identity');
    }

    // Check for Portuguese content
    const portugueseContent = this.findPortugueseContent(container);
    if (portugueseContent.length > 0) {
      this.addRecommendation(`Portuguese content detected in ${portugueseContent.length} elements - ensure proper mobile formatting`);
    }
  }

  // Helper methods
  private reset(): void {
    this.issues = [];
    this.recommendations = [];
    this.portugueseIssues = [];
  }

  private addIssue(issue: ValidationIssue): void {
    this.issues.push(issue);
  }

  private addRecommendation(recommendation: string): void {
    this.recommendations.push(recommendation);
  }

  private getInteractiveElements(container: HTMLElement | Document): HTMLElement[] {
    const selector = 'button, a, input, select, textarea, [onclick], [tabindex], [role="button"]';
    const elements = container instanceof Document 
      ? document.querySelectorAll(selector) 
      : container.querySelectorAll(selector);
    
    return Array.from(elements).filter((el): el is HTMLElement => el instanceof HTMLElement);
  }

  private getTextElements(container: HTMLElement | Document): HTMLElement[] {
    const selector = 'h1, h2, h3, h4, h5, h6, p, span, label, div';
    const elements = container instanceof Document 
      ? document.querySelectorAll(selector) 
      : container.querySelectorAll(selector);
    
    return Array.from(elements)
      .filter((el): el is HTMLElement => el instanceof HTMLElement)
      .filter(el => el.textContent && el.textContent.trim().length > 0);
  }

  private getElementSelector(element: Element): string {
    if (element.id) return `#${element.id}`;
    if (element.className) {
      const classes = element.className.toString().split(' ').slice(0, 2).join('.');
      return `.${classes}`;
    }
    return element.tagName.toLowerCase();
  }

  private hasTextOverflow(element: HTMLElement): boolean {
    return element.scrollWidth > element.clientWidth || 
           element.scrollHeight > element.clientHeight;
  }

  private containsPortugueseText(text: string): boolean {
    const portugueseWords = [
      'português', 'comunidade', 'eventos', 'cultura', 'tradição',
      'fado', 'lisboa', 'porto', 'brasil', 'açores', 'madeira',
      'participar', 'descobrir', 'conhecer', 'experiência'
    ];
    
    return portugueseWords.some(word => 
      text.toLowerCase().includes(word.toLowerCase())
    );
  }

  private hasLongPortugueseWords(text: string): boolean {
    const words = text.split(/\s+/);
    return words.some(word => word.length > 15);
  }

  private validateTouchTargetSpacing(element: HTMLElement): void {
    const rect = element.getBoundingClientRect();
    const siblings = Array.from(element.parentElement?.children || [])
      .filter((sibling): sibling is HTMLElement => 
        sibling instanceof HTMLElement && sibling !== element
      );

    siblings.forEach((sibling) => {
      const siblingRect = sibling.getBoundingClientRect();
      const distance = Math.min(
        Math.abs(rect.right - siblingRect.left),
        Math.abs(rect.left - siblingRect.right),
        Math.abs(rect.bottom - siblingRect.top),
        Math.abs(rect.top - siblingRect.bottom)
      );

      if (distance < 8) {
        this.addIssue({
          severity: 'medium',
          category: 'interaction',
          message: 'Insufficient spacing between touch targets',
          element: this.getElementSelector(element),
          fix: 'Add margin or padding between interactive elements (minimum 8px)'
        });
      }
    });
  }

  private async setViewportSize(width: number, height: number): Promise<void> {
    // For testing purposes, we simulate viewport changes
    Object.defineProperty(window, 'innerWidth', { value: width, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: height, writable: true });
    
    window.dispatchEvent(new Event('resize'));
    
    // Allow time for layout updates
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  private validateTextReadability(container: HTMLElement | Document, viewport: any): void {
    const textElements = this.getTextElements(container);
    
    textElements.forEach((element) => {
      const style = window.getComputedStyle(element);
      const fontSize = parseInt(style.fontSize);
      const lineHeight = style.lineHeight;
      
      // Check minimum font size for mobile
      if (viewport.width < 768 && fontSize < 14) {
        this.addIssue({
          severity: 'medium',
          category: 'typography',
          message: `Text too small on ${viewport.name}: ${fontSize}px`,
          element: this.getElementSelector(element),
          fix: 'Increase font size to minimum 14px on mobile'
        });
      }
    });
  }

  private validateHeadingStructure(container: HTMLElement | Document): void {
    const headings = container instanceof Document
      ? document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      : container.querySelectorAll('h1, h2, h3, h4, h5, h6');

    if (headings.length === 0) {
      this.addIssue({
        severity: 'medium',
        category: 'accessibility',
        message: 'No headings found - impacts screen reader navigation',
        fix: 'Add proper heading structure (h1, h2, etc.)'
      });
    }
  }

  private validateImageAccessibility(container: HTMLElement | Document): void {
    const images = container instanceof Document
      ? document.querySelectorAll('img')
      : container.querySelectorAll('img');

    images.forEach((img) => {
      if (!img.alt && !img.getAttribute('aria-label')) {
        this.addIssue({
          severity: 'high',
          category: 'accessibility',
          message: 'Image missing alt text',
          element: this.getElementSelector(img),
          fix: 'Add alt attribute describing the image content'
        });
      }
    });
  }

  private validateFormAccessibility(container: HTMLElement | Document): void {
    const inputs = container instanceof Document
      ? document.querySelectorAll('input, textarea, select')
      : container.querySelectorAll('input, textarea, select');

    inputs.forEach((input) => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledBy = input.getAttribute('aria-labelledby');

      if (!label && !ariaLabel && !ariaLabelledBy) {
        this.addIssue({
          severity: 'high',
          category: 'accessibility',
          message: 'Form input missing label',
          element: this.getElementSelector(input),
          fix: 'Add proper label element or aria-label attribute'
        });
      }
    });
  }

  private async validateColorContrast(container: HTMLElement | Document): Promise<void> {
    // This is a simplified contrast check - in practice, you'd use a proper color contrast library
    const textElements = this.getTextElements(container);
    
    textElements.forEach((element) => {
      const style = window.getComputedStyle(element);
      const color = style.color;
      const backgroundColor = style.backgroundColor;
      
      // Simplified check for very light text on light backgrounds or dark on dark
      if (this.isPoorContrast(color, backgroundColor)) {
        this.addIssue({
          severity: 'medium',
          category: 'accessibility',
          message: 'Potential color contrast issue',
          element: this.getElementSelector(element),
          fix: 'Ensure 4.5:1 contrast ratio for normal text, 3:1 for large text'
        });
      }
    });
  }

  private isPoorContrast(color: string, backgroundColor: string): boolean {
    // Very simplified contrast check
    // In practice, you'd convert to RGB and calculate actual contrast ratios
    return (color.includes('white') && backgroundColor.includes('white')) ||
           (color.includes('black') && backgroundColor.includes('black'));
  }

  private validateLanguageAttributes(container: HTMLElement | Document): void {
    const portugueseElements = this.findPortugueseContent(container);
    
    portugueseElements.forEach((element) => {
      if (!element.getAttribute('lang')) {
        this.addIssue({
          severity: 'low',
          category: 'accessibility',
          message: 'Portuguese content missing lang attribute',
          element: this.getElementSelector(element),
          fix: 'Add lang="pt" attribute to Portuguese text elements'
        });
      }
    });
  }

  private findPortugueseContent(container: HTMLElement | Document): HTMLElement[] {
    const textElements = this.getTextElements(container);
    
    return textElements.filter((element) => {
      const text = element.textContent || '';
      return this.containsPortugueseText(text);
    });
  }

  private calculateScore(): number {
    const criticalIssues = this.issues.filter(issue => issue.severity === 'critical').length;
    const highIssues = this.issues.filter(issue => issue.severity === 'high').length;
    const mediumIssues = this.issues.filter(issue => issue.severity === 'medium').length;
    const lowIssues = this.issues.filter(issue => issue.severity === 'low').length;

    // Scoring system: start with 100, deduct points for issues
    let score = 100;
    score -= criticalIssues * 20; // Critical issues are severe
    score -= highIssues * 10;
    score -= mediumIssues * 5;
    score -= lowIssues * 2;

    return Math.max(0, score);
  }
}

// Export singleton instance
export const mobileUXValidator = new MobileUXValidator();

// Convenience functions
export const validateMobileComponent = async (
  component: HTMLElement,
  config?: Partial<MobileTestConfig>
): Promise<ValidationResult> => {
  return mobileUXValidator.validateMobileUX(component, config);
};

export const validateFullPage = async (
  config?: Partial<MobileTestConfig>
): Promise<ValidationResult> => {
  return mobileUXValidator.validateMobileUX(document, config);
};

export const generateMobileReport = (result: ValidationResult): string => {
  let report = `Mobile UX Validation Report\n`;
  report += `Score: ${result.score}/100 ${result.passed ? '✅' : '❌'}\n\n`;

  if (result.issues.length > 0) {
    report += `Issues Found (${result.issues.length}):\n`;
    result.issues.forEach((issue, index) => {
      report += `${index + 1}. [${issue.severity.toUpperCase()}] ${issue.message}\n`;
      if (issue.element) report += `   Element: ${issue.element}\n`;
      report += `   Fix: ${issue.fix}\n\n`;
    });
  }

  if (result.recommendations.length > 0) {
    report += `Recommendations (${result.recommendations.length}):\n`;
    result.recommendations.forEach((rec, index) => {
      report += `${index + 1}. ${rec}\n`;
    });
    report += '\n';
  }

  if (result.portugueseSpecificIssues.length > 0) {
    report += `Portuguese-Specific Issues (${result.portugueseSpecificIssues.length}):\n`;
    result.portugueseSpecificIssues.forEach((issue, index) => {
      report += `${index + 1}. ${issue}\n`;
    });
  }

  return report;
};