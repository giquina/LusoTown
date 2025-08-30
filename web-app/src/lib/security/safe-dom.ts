// Safe DOM manipulation utilities to prevent XSS vulnerabilities
import { sanitizeText, sanitizeHTML, sanitizePortugueseCulturalContent } from './input-validation';

/**
 * Safe DOM manipulation utility class for Portuguese community platform
 * Prevents XSS vulnerabilities while preserving cultural content
 */
export class SafeDOM {
  /**
   * Safely set innerHTML with DOMPurify sanitization
   */
  static setInnerHTML(element: HTMLElement, html: string, options?: {
    allowedTags?: string[];
    culturalContent?: boolean;
  }): void {
    if (!element) return;

    const { allowedTags = [], culturalContent = false } = options || {};

    // Sanitize based on content type
    let sanitizedHTML: string;
    if (culturalContent) {
      sanitizedHTML = sanitizePortugueseCulturalContent(html);
    } else if (allowedTags.length > 0) {
      sanitizedHTML = sanitizeHTML(html, allowedTags);
    } else {
      // For safety, default to text sanitization
      sanitizedHTML = sanitizeText(html);
    }

    element.innerHTML = sanitizedHTML;
  }

  /**
   * Safely set textContent (always safe, but preserves Portuguese characters)
   */
  static setTextContent(element: HTMLElement, text: string): void {
    if (!element) return;
    element.textContent = sanitizeText(text);
  }

  /**
   * Create safe element with sanitized content
   */
  static createElement(
    tagName: string,
    content: string,
    options?: {
      attributes?: Record<string, string>;
      className?: string;
      id?: string;
      sanitizeContent?: boolean;
    }
  ): HTMLElement {
    const element = document.createElement(tagName);
    const { attributes, className, id, sanitizeContent = true } = options || {};

    // Set safe content
    if (sanitizeContent) {
      element.textContent = sanitizeText(content);
    } else {
      element.textContent = content;
    }

    // Set safe attributes
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        // Sanitize attribute values to prevent XSS via attributes
        const safeValue = sanitizeText(value);
        element.setAttribute(key, safeValue);
      });
    }

    if (className) element.className = sanitizeText(className);
    if (id) element.id = sanitizeText(id);

    return element;
  }

  /**
   * Safely append child elements
   */
  static appendChild(parent: HTMLElement, child: HTMLElement): void {
    if (!parent || !child) return;
    parent.appendChild(child);
  }

  /**
   * Safe event data extraction for Portuguese cultural events
   */
  static safeEventData(eventData: any): {
    title: string;
    description: string;
    location: string;
  } {
    if (!eventData || typeof eventData !== 'object') {
      return { title: '', description: '', location: '' };
    }

    return {
      title: sanitizeText(eventData.title || ''),
      description: sanitizeText(eventData.description || ''),
      location: sanitizeText(eventData.location || ''),
    };
  }

  /**
   * Create safe overlay for debugging/admin tools
   */
  static createSafeOverlay(content: {
    title: string;
    items: Array<{ label: string; value: string | number | boolean }>;
  }): HTMLElement {
    const overlay = document.createElement('div');
    overlay.className = 'debug-overlay';
    
    // Create safe title
    const title = document.createElement('div');
    const titleElement = document.createElement('strong');
    titleElement.textContent = sanitizeText(content.title);
    title.appendChild(titleElement);
    overlay.appendChild(title);

    // Create safe items
    content.items.forEach(item => {
      const itemElement = document.createElement('div');
      const safeLabel = sanitizeText(item.label);
      const safeValue = sanitizeText(String(item.value));
      itemElement.textContent = `${safeLabel  }: ${  safeValue}`;
      overlay.appendChild(itemElement);
    });

    return overlay;
  }

  /**
   * Safe skip links creation for accessibility
   */
  static createSkipLinks(links: Array<{ href: string; text: string }>): HTMLElement {
    const container = document.createElement('div');
    container.id = 'skip-links';

    links.forEach(link => {
      const anchorElement = document.createElement('a');
      anchorElement.href = sanitizeText(link.href);
      anchorElement.className = 'skip-link';
      anchorElement.textContent = sanitizeText(link.text);
      container.appendChild(anchorElement);
    });

    return container;
  }

  /**
   * Safe style injection for critical CSS
   */
  static injectSafeCSS(css: string, id?: string): HTMLStyleElement {
    const style = document.createElement('style');
    if (id) style.id = sanitizeText(id);
    
    // CSS should be from trusted sources only - validate it's safe
    if (this.isValidCSS(css)) {
      style.textContent = css;
    } else {
      console.error('Invalid CSS detected and blocked:', css.substring(0, 100));
      style.textContent = '/* CSS blocked due to security validation */';
    }
    
    return style;
  }

  /**
   * Basic CSS validation to prevent CSS injection
   */
  private static isValidCSS(css: string): boolean {
    // Block dangerous CSS patterns
    const dangerousPatterns = [
      /javascript\s*:/i,
      /expression\s*\(/i,
      /import\s*"/i,
      /import\s*'/i,
      /@import/i,
      /behavior\s*:/i,
      /-moz-binding/i,
      /data\s*:\s*(?!image\/)/i, // Allow data: only for images
    ];

    return !dangerousPatterns.some(pattern => pattern.test(css));
  }

  /**
   * Safe JSON-LD injection for SEO
   */
  static createSafeJsonLDScript(jsonLdData: any): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    try {
      // Sanitize JSON-LD data
      const sanitizedData = this.sanitizeJsonLD(jsonLdData);
      script.textContent = JSON.stringify(sanitizedData);
    } catch (error) {
      console.error('JSON-LD sanitization failed:', error);
      script.textContent = '{}';
    }

    return script;
  }

  /**
   * Sanitize JSON-LD data
   */
  private static sanitizeJsonLD(data: any): any {
    if (typeof data !== 'object' || data === null) {
      return {};
    }

    // Recursively sanitize object
    const sanitized: any = Array.isArray(data) ? [] : {};

    Object.keys(data).forEach(key => {
      const value = data[key];
      const safeKey = sanitizeText(key);

      if (typeof value === 'string') {
        sanitized[safeKey] = sanitizeText(value);
      } else if (typeof value === 'object' && value !== null) {
        sanitized[safeKey] = this.sanitizeJsonLD(value);
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        sanitized[safeKey] = value;
      }
    });

    return sanitized;
  }
}

/**
 * Legacy function compatibility - use SafeDOM.setInnerHTML instead
 * @deprecated Use SafeDOM.setInnerHTML instead
 */
export function safeSetInnerHTML(
  element: HTMLElement, 
  html: string, 
  options?: { allowedTags?: string[] }
): void {
  console.warn('safeSetInnerHTML is deprecated. Use SafeDOM.setInnerHTML instead.');
  SafeDOM.setInnerHTML(element, html, options);
}

/**
 * Utility function for safe event data rendering
 */
export function renderSafeEventDetails(eventData: any): string {
  const safeData = SafeDOM.safeEventData(eventData);
  return sanitizeHTML(`<div class="event-details-loaded">${  safeData.title  }</div>`, ['div']);
}

export default SafeDOM;
