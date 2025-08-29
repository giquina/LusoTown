import { useMemo } from 'react';
import { sanitizeText, sanitizeHTML, sanitizePortugueseCulturalContent } from '@/lib/security/input-validation';

export interface SafeHTMLOptions {
  allowedTags?: string[];
  preservePortugueseChars?: boolean;
  culturalContent?: boolean;
}

/**
 * React hook for safely rendering HTML content with XSS protection
 * Optimized for Portuguese community content with special character preservation
 */
export function useSafeHTML(
  rawHTML: string | undefined | null, 
  options: SafeHTMLOptions = {}
): string {
  return useMemo(() => {
    if (!rawHTML) return '';

    const {
      allowedTags = [],
      preservePortugueseChars = true,
      culturalContent = false
    } = options;

    // For Portuguese cultural content with rich formatting
    if (culturalContent) {
      return sanitizePortugueseCulturalContent(rawHTML);
    }

    // For content with specific allowed tags
    if (allowedTags.length > 0) {
      return sanitizeHTML(rawHTML, allowedTags);
    }

    // Default: plain text sanitization preserving Portuguese characters
    return sanitizeText(rawHTML);
  }, [rawHTML, options.allowedTags, options.preservePortugueseChars, options.culturalContent]);
}

/**
 * Hook for safely rendering JSON-LD structured data
 * Specialized for Portuguese community SEO content
 */
export function useSafeJsonLD(jsonLdData: any): string {
  return useMemo(() => {
    if (!jsonLdData || typeof jsonLdData !== 'object') {
      return '{}';
    }

    try {
      // Stringify and sanitize JSON-LD data
      const jsonString = JSON.stringify(jsonLdData, null, 2);
      
      // Additional security: ensure no script injection in JSON-LD
      const sanitized = jsonString
        .replace(/<script/gi, '&lt;script')
        .replace(/<\/script>/gi, '&lt;/script&gt;')
        .replace(/javascript\s*:/gi, 'blocked:')
        .replace(/vbscript\s*:/gi, 'blocked:')
        .replace(/data\s*:\s*(?!application\/ld\+json)/gi, 'blocked:')
        .replace(/alert\s*\(/gi, 'blocked(')
        .replace(/eval\s*\(/gi, 'blocked(');
      
      return sanitized;
    } catch (error) {
      console.error('JSON-LD sanitization error:', error);
      return '{}';
    }
  }, [jsonLdData]);
}

/**
 * Hook specifically for Portuguese business descriptions
 */
export function useSafeBusinessDescription(description: string | undefined): string {
  return useSafeHTML(description, {
    allowedTags: ['br', 'strong', 'em'],
    preservePortugueseChars: true,
    culturalContent: false
  });
}

/**
 * Hook for Portuguese cultural content with rich formatting
 */
export function useSafeCulturalContent(content: string | undefined): string {
  return useSafeHTML(content, {
    culturalContent: true,
    preservePortugueseChars: true
  });
}

/**
 * Hook for user-generated text content (messages, comments, etc.)
 */
export function useSafeUserContent(content: string | undefined): string {
  return useSafeHTML(content, {
    allowedTags: [], // No HTML tags allowed in user messages
    preservePortugueseChars: true
  });
}

/**
 * Hook for search queries with extra validation
 */
export function useSafeSearchQuery(query: string | undefined): string {
  return useMemo(() => {
    if (!query) return '';
    
    // Extra strict sanitization for search queries
    return sanitizeText(query)
      .replace(/[<>'"]/g, '') // Remove common XSS characters
      .replace(/javascript:/gi, '') // Remove javascript: protocols
      .replace(/data:/gi, '') // Remove data: protocols
      .trim()
      .slice(0, 100); // Limit length
  }, [query]);
}