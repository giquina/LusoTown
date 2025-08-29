import * as Sentry from '@sentry/nextjs';

// Test Sentry integration for Portuguese community security monitoring
export async function testSentryConfiguration(): Promise<{
  configured: boolean;
  dsn: string;
  canSendEvents: boolean;
  testEventId?: string;
}> {
  try {
    // Check if Sentry is configured
    const client = Sentry.getCurrentHub().getClient();
    const dsn = client?.getOptions()?.dsn || 'Not configured';
    
    if (!client) {
      return {
        configured: false,
        dsn: 'Not configured',
        canSendEvents: false
      };
    }

    // Test sending a monitoring event
    const testEventId = Sentry.captureMessage(
      'LusoTown Security Monitoring Test - Portuguese Community Platform',
      {
        level: 'info',
        tags: {
          component: 'security-test',
          portuguese_community: 'true',
          test_type: 'configuration'
        },
        extra: {
          timestamp: new Date().toISOString(),
          platform: 'lusotown-web',
          security_version: '1.0.0',
          cultural_context: 'portuguese-uk'
        }
      }
    );

    return {
      configured: true,
      dsn: typeof dsn === 'string' ? dsn : 'Configured',
      canSendEvents: true,
      testEventId
    };
  } catch (error) {
    console.error('Sentry configuration test failed:', error);
    return {
      configured: false,
      dsn: 'Error',
      canSendEvents: false
    };
  }
}

// Test security event logging
export async function testSecurityEventLogging(): Promise<{
  success: boolean;
  eventIds: string[];
  errors: string[];
}> {
  const eventIds: string[] = [];
  const errors: string[] = [];

  try {
    // Test XSS protection event
    const xssEventId = Sentry.captureMessage(
      'XSS Protection Test - Portuguese Community',
      {
        level: 'warning',
        tags: {
          component: 'xss-protection',
          test: 'security',
          portuguese_community: 'true'
        },
        extra: {
          blocked_content: '<script>alert("test")</script>',
          sanitized_content: 'alert("test")',
          endpoint: '/test/xss-protection'
        }
      }
    );
    if (xssEventId) eventIds.push(xssEventId);

    // Test rate limiting event
    const rateLimitEventId = Sentry.captureMessage(
      'Rate Limiting Test - Portuguese Business Directory',
      {
        level: 'warning',
        tags: {
          component: 'rate-limiting',
          endpoint_type: 'business_directory',
          portuguese_community: 'true'
        },
        extra: {
          identifier: 'test_user_123***456',
          limit: 50,
          violations: 3,
          endpoint: '/api/business-directory'
        }
      }
    );
    if (rateLimitEventId) eventIds.push(rateLimitEventId);

    // Test critical security alert
    const criticalEventId = Sentry.captureMessage(
      'Critical Security Test - Portuguese Community Protection',
      {
        level: 'error',
        tags: {
          component: 'security',
          severity: 'critical',
          portuguese_community: 'true',
          test: 'monitoring'
        },
        extra: {
          abuse_pattern: 'credential_stuffing',
          violations: 25,
          cultural_context: 'portuguese-uk',
          requires_immediate_attention: true
        }
      }
    );
    if (criticalEventId) eventIds.push(criticalEventId);

    return {
      success: eventIds.length > 0,
      eventIds,
      errors
    };
  } catch (error) {
    errors.push(error instanceof Error ? error.message : 'Unknown error');
    return {
      success: false,
      eventIds,
      errors
    };
  }
}

// Test performance monitoring
export async function testPerformanceMonitoring(): Promise<{
  success: boolean;
  transactionId?: string;
  error?: string;
}> {
  try {
    const transaction = Sentry.startTransaction({
      name: 'Portuguese Community Security Check',
      op: 'security.test',
      tags: {
        portuguese_community: 'true',
        security_version: '1.0.0'
      }
    });

    // Simulate security operations
    const span1 = transaction.startChild({
      op: 'security.xss_check',
      description: 'XSS Protection Test'
    });
    await new Promise(resolve => setTimeout(resolve, 10));
    span1.finish();

    const span2 = transaction.startChild({
      op: 'security.rate_limit',
      description: 'Rate Limiting Test'
    });
    await new Promise(resolve => setTimeout(resolve, 5));
    span2.finish();

    const span3 = transaction.startChild({
      op: 'security.input_validation',
      description: 'Input Validation Test'
    });
    await new Promise(resolve => setTimeout(resolve, 3));
    span3.finish();

    transaction.setStatus('ok');
    transaction.finish();

    return {
      success: true,
      transactionId: transaction.traceId
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Comprehensive security monitoring test
export async function runComprehensiveSecurityTest(): Promise<{
  sentry: Awaited<ReturnType<typeof testSentryConfiguration>>;
  events: Awaited<ReturnType<typeof testSecurityEventLogging>>;
  performance: Awaited<ReturnType<typeof testPerformanceMonitoring>>;
  summary: {
    allTestsPassed: boolean;
    totalEvents: number;
    criticalIssues: string[];
  };
}> {
  console.log('🔒 Starting comprehensive security monitoring test for LusoTown Portuguese community...');

  const sentry = await testSentryConfiguration();
  const events = await testSecurityEventLogging();
  const performance = await testPerformanceMonitoring();

  const criticalIssues: string[] = [];
  
  if (!sentry.configured) {
    criticalIssues.push('Sentry is not properly configured');
  }
  
  if (!events.success) {
    criticalIssues.push('Security event logging is not working');
  }
  
  if (!performance.success) {
    criticalIssues.push('Performance monitoring is not working');
  }

  const summary = {
    allTestsPassed: criticalIssues.length === 0,
    totalEvents: events.eventIds.length,
    criticalIssues
  };

  console.log('🔒 Security test results:', {
    sentry: sentry.configured ? '✅ Configured' : '❌ Not configured',
    events: events.success ? `✅ ${events.eventIds.length} events sent` : '❌ Failed',
    performance: performance.success ? '✅ Working' : '❌ Failed',
    summary: summary.allTestsPassed ? '✅ All tests passed' : `❌ ${criticalIssues.length} issues`
  });

  return {
    sentry,
    events,
    performance,
    summary
  };
}
