/**
 * Monitoring Library for Portuguese Community Platform
 * 
 * Comprehensive monitoring and analytics system designed specifically for 
 * Portuguese-speaking community features with cultural authenticity tracking.
 */

import { PORTUGUESE_ERROR_CONTEXTS, ERROR_SEVERITY } from '@/config/error-monitoring';

// Mock Sentry utilities for development (would be actual Sentry in production)
interface PortugueseErrorContext {
  user_heritage?: string;
  palop_nation?: string;
  language_preference?: 'pt' | 'en';
  uk_city?: string;
  user_type?: 'student' | 'professional' | 'family' | 'business_owner';
  feature_context?: keyof typeof PORTUGUESE_ERROR_CONTEXTS;
  cultural_authenticity_score?: number;
  mobile_device?: boolean;
}

interface PortugueseError {
  message: string;
  context: PortugueseErrorContext;
  severity: keyof typeof ERROR_SEVERITY;
  timestamp: Date;
  user_agent?: string;
  page_url?: string;
  api_endpoint?: string;
}

/**
 * Capture errors with Portuguese community context
 */
export function capturePortugueseError(error: PortugueseError): void {
  try {
    // In production, this would integrate with actual Sentry
    if (typeof window !== 'undefined' && window.console) {
      console.error('Portuguese Community Error:', {
        ...error,
        formatted_context: formatPortugueseContext(error.context),
        community_impact: ERROR_SEVERITY[error.severity].portuguese_impact
      });
    }

    // Log to monitoring service (would be actual service in production)
    logPortugueseCommunityError(error);

  } catch (loggingError) {
    console.error('Failed to capture Portuguese error:', loggingError);
  }
}

/**
 * Format Portuguese community context for better monitoring
 */
function formatPortugueseContext(context: PortugueseErrorContext): Record<string, any> {
  return {
    heritage_info: {
      palop_nation: context.palop_nation || 'unknown',
      user_heritage: context.user_heritage || 'not_specified',
      cultural_authenticity: context.cultural_authenticity_score || 0
    },
    location_info: {
      uk_city: context.uk_city || 'unknown',
      user_type: context.user_type || 'unknown'
    },
    technical_info: {
      language_preference: context.language_preference || 'unknown',
      mobile_device: context.mobile_device || false,
      feature_context: context.feature_context || 'general'
    }
  };
}

/**
 * Log Portuguese community-specific errors
 */
function logPortugueseCommunityError(error: PortugueseError): void {
  const logEntry = {
    timestamp: error.timestamp.toISOString(),
    error_type: 'portuguese_community_error',
    severity: error.severity,
    message: error.message,
    context: error.context,
    community_impact: ERROR_SEVERITY[error.severity].portuguese_impact,
    requires_notification: ERROR_SEVERITY[error.severity].notification_required
  };

  // In production, send to monitoring service
  if (process.env.NODE_ENV === 'development') {
    console.log('Portuguese Community Error Log:', JSON.stringify(logEntry, null, 2));
  }
}

/**
 * Performance monitoring utilities
 */
export class PortuguesePerformanceMonitor {
  private static instance: PortuguesePerformanceMonitor;
  private metrics: Map<string, any[]> = new Map();

  static getInstance(): PortuguesePerformanceMonitor {
    if (!PortuguesePerformanceMonitor.instance) {
      PortuguesePerformanceMonitor.instance = new PortuguesePerformanceMonitor();
    }
    return PortuguesePerformanceMonitor.instance;
  }

  /**
   * Record API request performance
   */
  recordApiRequest(endpoint: string, duration: number, failed: boolean, context?: PortugueseErrorContext): void {
    if (!this.metrics.has('api_requests')) {
      this.metrics.set('api_requests', []);
    }

    const requests = this.metrics.get('api_requests')!;
    requests.push({
      timestamp: new Date().toISOString(),
      endpoint,
      duration,
      failed,
      context: context ? formatPortugueseContext(context) : null,
      portuguese_community_feature: this.isPortugueseFeature(endpoint)
    });

    // Keep only last 1000 requests
    if (requests.length > 1000) {
      requests.splice(0, requests.length - 1000);
    }
  }

  /**
   * Get performance metrics for Portuguese community features
   */
  getPortugueseMetrics(): any {
    const apiRequests = this.metrics.get('api_requests') || [];
    const portugueseRequests = apiRequests.filter(req => req.portuguese_community_feature);

    return {
      total_requests: portugueseRequests.length,
      avg_response_time: this.calculateAverageResponseTime(portugueseRequests),
      error_rate: this.calculateErrorRate(portugueseRequests),
      mobile_usage_rate: this.calculateMobileUsage(portugueseRequests),
      bilingual_feature_usage: this.calculateBilingualUsage(portugueseRequests),
      last_updated: new Date().toISOString()
    };
  }

  private isPortugueseFeature(endpoint: string): boolean {
    const portugueseEndpoints = [
      '/api/business-directory',
      '/api/events',
      '/api/cultural-content',
      '/api/streaming',
      '/api/transport',
      '/api/heritage',
      '/api/university-partnerships'
    ];

    return portugueseEndpoints.some(pe => endpoint.includes(pe));
  }

  private calculateAverageResponseTime(requests: any[]): number {
    if (requests.length === 0) return 0;
    const sum = requests.reduce((acc, req) => acc + req.duration, 0);
    return Math.round(sum / requests.length);
  }

  private calculateErrorRate(requests: any[]): number {
    if (requests.length === 0) return 0;
    const errorCount = requests.filter(req => req.failed).length;
    return Math.round((errorCount / requests.length) * 100 * 100) / 100;
  }

  private calculateMobileUsage(requests: any[]): number {
    if (requests.length === 0) return 0;
    const mobileCount = requests.filter(req => 
      req.context?.technical_info?.mobile_device === true
    ).length;
    return Math.round((mobileCount / requests.length) * 100 * 100) / 100;
  }

  private calculateBilingualUsage(requests: any[]): number {
    if (requests.length === 0) return 0;
    const portugueseCount = requests.filter(req => 
      req.context?.technical_info?.language_preference === 'pt'
    ).length;
    return Math.round((portugueseCount / requests.length) * 100 * 100) / 100;
  }
}

// Export singleton instance
export const performanceMonitor = PortuguesePerformanceMonitor.getInstance();

// Export convenience function
export function recordApiRequest(endpoint: string, duration: number, failed: boolean, context?: PortugueseErrorContext): void {
  performanceMonitor.recordApiRequest(endpoint, duration, failed, context);
}