import * as Sentry from '@sentry/nextjs';
import { RateLimitType } from './rate-limit';

// Sentry monitoring integration for rate limiting and abuse detection
export interface RateLimitEvent {
  identifier: string;
  rateLimitType: RateLimitType;
  endpoint: string;
  userAgent?: string;
  timestamp: Date;
  limit: number;
  violations: number;
  pattern?: 'rapid_fire' | 'distributed' | 'credential_stuffing' | 'scraping';
}

export interface AbuseDetectionEvent {
  identifier: string;
  endpoint: string;
  violationCount: number;
  timeWindow: string;
  pattern: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  metadata: Record<string, any>;
}

// Rate limit monitoring class
export class RateLimitMonitor {
  private static instance: RateLimitMonitor;
  private eventBuffer: RateLimitEvent[] = [];
  private abuseBuffer: AbuseDetectionEvent[] = [];
  
  static getInstance(): RateLimitMonitor {
    if (!RateLimitMonitor.instance) {
      RateLimitMonitor.instance = new RateLimitMonitor();
    }
    return RateLimitMonitor.instance;
  }

  // Log rate limit exceeded event
  logRateLimitExceeded(event: RateLimitEvent): void {
    this.eventBuffer.push(event);
    
    // Send to Sentry for monitoring
    Sentry.addBreadcrumb({
      category: 'rate-limit',
      message: `Rate limit exceeded for ${event.rateLimitType}`,
      level: 'warning',
      data: {
        identifier: this.maskIdentifier(event.identifier),
        rateLimitType: event.rateLimitType,
        endpoint: event.endpoint,
        limit: event.limit,
        violations: event.violations,
      },
    });

    // Create Sentry event for monitoring dashboard
    Sentry.captureMessage(
      `Rate limit exceeded: ${event.rateLimitType}`,
      {
        level: 'warning',
        tags: {
          component: 'rate-limiting',
          endpoint_type: event.rateLimitType,
          portuguese_community: 'true',
        },
        extra: {
          identifier: this.maskIdentifier(event.identifier),
          endpoint: event.endpoint,
          limit: event.limit,
          violations: event.violations,
          timestamp: event.timestamp.toISOString(),
        },
      }
    );

    this.flushEventsIfNeeded();
  }

  // Log abuse detection event
  logAbuseDetected(event: AbuseDetectionEvent): void {
    this.abuseBuffer.push(event);
    
    // Send critical abuse patterns to Sentry immediately
    const severity = this.calculateSeverity(event);
    const sentryLevel = this.mapSeverityToSentryLevel(severity);
    
    Sentry.addBreadcrumb({
      category: 'abuse-detection',
      message: `Abuse pattern detected: ${event.pattern}`,
      level: sentryLevel,
      data: {
        identifier: this.maskIdentifier(event.identifier),
        endpoint: event.endpoint,
        violations: event.violationCount,
        pattern: event.pattern,
        severity,
      },
    });

    // Create detailed Sentry event
    Sentry.captureMessage(
      `Abuse detected: ${event.pattern} pattern on ${event.endpoint}`,
      {
        level: sentryLevel,
        tags: {
          component: 'abuse-detection',
          abuse_pattern: event.pattern,
          severity,
          portuguese_community: 'true',
        },
        extra: {
          ...event,
          identifier: this.maskIdentifier(event.identifier),
        },
      }
    );

    // Send alert for high/critical severity
    if (severity === 'high' || severity === 'critical') {
      this.sendCriticalAbuseAlert(event);
    }
  }

  // Portuguese community specific abuse patterns
  detectPortugueseCommunityAbuse(
    identifier: string,
    endpoint: string,
    rateLimitType: RateLimitType,
    violations: number,
    timeWindow: number
  ): AbuseDetectionEvent | null {
    const metadata = {
      endpoint,
      rateLimitType,
      violations,
      timeWindow,
      culturalContext: 'portuguese-speaking-community',
    };

    // Detect different abuse patterns
    if (this.isCredentialStuffingPattern(endpoint, violations, timeWindow)) {
      return {
        identifier,
        endpoint,
        violationCount: violations,
        timeWindow: `${timeWindow}ms`,
        pattern: 'credential_stuffing',
        severity: 'high',
        metadata: {
          ...metadata,
          description: 'Potential credential stuffing attack on Portuguese community authentication',
        },
      };
    }

    if (this.isScrapingPattern(endpoint, violations, timeWindow)) {
      return {
        identifier,
        endpoint,
        violationCount: violations,
        timeWindow: `${timeWindow}ms`,
        pattern: 'scraping',
        severity: 'medium',
        metadata: {
          ...metadata,
          description: 'Potential scraping of Portuguese business directory',
        },
      };
    }

    if (this.isRapidFirePattern(violations, timeWindow)) {
      return {
        identifier,
        endpoint,
        violationCount: violations,
        timeWindow: `${timeWindow}ms`,
        pattern: 'rapid_fire',
        severity: 'low',
        metadata: {
          ...metadata,
          description: 'Rapid fire requests to Portuguese community endpoints',
        },
      };
    }

    return null;
  }

  // Get rate limiting statistics for monitoring dashboard
  getRateLimitingStats(timeWindow: number = 3600000): {
    totalEvents: number;
    byType: Record<RateLimitType, number>;
    topOffenders: Array<{ identifier: string; count: number }>;
    abuseEvents: number;
  } {
    const now = Date.now();
    const recentEvents = this.eventBuffer.filter(
      event => now - event.timestamp.getTime() < timeWindow
    );
    
    const byType: Record<string, number> = {};
    const identifierCounts: Record<string, number> = {};
    
    recentEvents.forEach(event => {
      byType[event.rateLimitType] = (byType[event.rateLimitType] || 0) + 1;
      const maskedId = this.maskIdentifier(event.identifier);
      identifierCounts[maskedId] = (identifierCounts[maskedId] || 0) + 1;
    });
    
    const topOffenders = Object.entries(identifierCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([identifier, count]) => ({ identifier, count }));
    
    const recentAbuse = this.abuseBuffer.filter(
      event => now - new Date(event.timeWindow).getTime() < timeWindow
    ).length;

    return {
      totalEvents: recentEvents.length,
      byType: byType as Record<RateLimitType, number>,
      topOffenders,
      abuseEvents: recentAbuse,
    };
  }

  // Private helper methods
  private maskIdentifier(identifier: string): string {
    if (identifier.startsWith('user:')) {
      const userId = identifier.replace('user:', '');
      return `user:${userId.substring(0, 4)}***${userId.substring(userId.length - 4)}`;
    }
    
    if (identifier.startsWith('ip:')) {
      const ip = identifier.replace('ip:', '');
      const parts = ip.split('.');
      if (parts.length === 4) {
        return `ip:${parts[0]}.${parts[1]}.***.***.`;
      }
    }
    
    return `${identifier.substring(0, 6)}***`;
  }

  private calculateSeverity(event: AbuseDetectionEvent): 'low' | 'medium' | 'high' | 'critical' {
    if (event.violationCount >= 100) return 'critical';
    if (event.violationCount >= 50) return 'high';
    if (event.violationCount >= 20) return 'medium';
    return 'low';
  }

  private mapSeverityToSentryLevel(severity: string): 'debug' | 'info' | 'warning' | 'error' | 'fatal' {
    switch (severity) {
      case 'critical': return 'fatal';
      case 'high': return 'error';
      case 'medium': return 'warning';
      default: return 'info';
    }
  }

  private isCredentialStuffingPattern(endpoint: string, violations: number, timeWindow: number): boolean {
    return endpoint.includes('/api/auth') && violations >= 20 && timeWindow < 300000; // 5 minutes
  }

  private isScrapingPattern(endpoint: string, violations: number, timeWindow: number): boolean {
    return (
      endpoint.includes('/api/business') ||
      endpoint.includes('/api/events')
    ) && violations >= 50 && timeWindow < 600000; // 10 minutes
  }

  private isRapidFirePattern(violations: number, timeWindow: number): boolean {
    return violations >= 10 && timeWindow < 60000; // 1 minute
  }

  private flushEventsIfNeeded(): void {
    // Keep only last 1000 events in memory
    if (this.eventBuffer.length > 1000) {
      this.eventBuffer = this.eventBuffer.slice(-500);
    }
    
    if (this.abuseBuffer.length > 500) {
      this.abuseBuffer = this.abuseBuffer.slice(-250);
    }
  }

  private sendCriticalAbuseAlert(event: AbuseDetectionEvent): void {
    // In production, you might want to:
    // 1. Send webhook to Discord/Slack
    // 2. Email community moderators
    // 3. Create GitHub issue
    // 4. Update security dashboard
    
    console.error('CRITICAL ABUSE DETECTED:', {
      pattern: event.pattern,
      endpoint: event.endpoint,
      violations: event.violationCount,
      severity: event.severity,
      timestamp: new Date().toISOString(),
    });
    
    // Send immediate Sentry alert
    Sentry.captureException(
      new Error(`Critical abuse pattern detected: ${event.pattern}`),
      {
        level: 'fatal',
        tags: {
          component: 'security',
          alert_type: 'critical_abuse',
          portuguese_community: 'true',
        },
        extra: {
          ...event,
          alert_priority: 'immediate',
          requires_action: true,
        },
      }
    );
  }
}

// Export monitoring functions
export const rateLimitMonitor = RateLimitMonitor.getInstance();

// Helper function to log rate limit events
export function logRateLimitViolation(
  identifier: string,
  rateLimitType: RateLimitType,
  endpoint: string,
  limit: number,
  violations: number,
  userAgent?: string
): void {
  rateLimitMonitor.logRateLimitExceeded({
    identifier,
    rateLimitType,
    endpoint,
    userAgent,
    timestamp: new Date(),
    limit,
    violations,
  });
}

// Helper function to detect and log abuse
export function detectAndLogAbuse(
  identifier: string,
  endpoint: string,
  rateLimitType: RateLimitType,
  violations: number,
  timeWindow: number
): boolean {
  const abuseEvent = rateLimitMonitor.detectPortugueseCommunityAbuse(
    identifier,
    endpoint,
    rateLimitType,
    violations,
    timeWindow
  );
  
  if (abuseEvent) {
    rateLimitMonitor.logAbuseDetected(abuseEvent);
    return true;
  }
  
  return false;
}

// Portuguese community security dashboard data
export function getPortugueseCommunitySecurityStats(): {
  rateLimiting: ReturnType<RateLimitMonitor['getRateLimitingStats']>;
  timestamp: string;
} {
  return {
    rateLimiting: rateLimitMonitor.getRateLimitingStats(),
    timestamp: new Date().toISOString(),
  };
}