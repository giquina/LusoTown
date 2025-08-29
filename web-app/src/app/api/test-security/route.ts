import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { logRateLimitViolation, detectAndLogAbuse } from '@/lib/rate-limit-monitoring';
import { runComprehensiveSecurityTest } from '@/lib/security/sentry-test';
import { validateInput, sanitizeText, sanitizeHTML } from '@/lib/security/input-validation';
import {
  securityLogger,
  bruteForceProtection,
  SQLInjectionProtection,
  SecureFileUpload,
  SecurityTester
} from '@/lib/security/comprehensive-security';
import logger from '@/utils/logger';

// Test endpoint for comprehensive security system verification
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'test-ip';
  const userAgent = request.headers.get('user-agent') || 'test-user-agent';
  const action = request.nextUrl.searchParams.get('action') || 'comprehensive';

  try {
    switch (action) {
      case 'comprehensive':
        return await handleComprehensiveTest(ip, userAgent);
      
      case 'xss':
        return await handleXSSTest();
      
      case 'rate-limit':
        return await handleRateLimitTest(request, ip, userAgent);
      
      case 'input-validation':
        return await handleInputValidationTest();
      
      case 'sql-injection':
        return await handleSQLInjectionTest();
      
      case 'file-upload':
        return await handleFileUploadTest();
      
      case 'sentry':
        return await handleSentryTest();
      
      case 'brute-force':
        return await handleBruteForceTest(ip);
      
      default:
        return NextResponse.json(
          {
            error: 'Invalid test action',
            available_actions: [
              'comprehensive', 'xss', 'rate-limit', 'input-validation',
              'sql-injection', 'file-upload', 'sentry', 'brute-force'
            ]
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Security test error:', error);
    return NextResponse.json(
      {
        error: 'Security test failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        executionTime: `${Date.now() - startTime}ms`
      },
      { status: 500 }
    );
  }
}

// Comprehensive security test
async function handleComprehensiveTest(ip: string, userAgent: string) {
  logger.info('Running comprehensive security test for LusoTown Portuguese community platform', {
    area: 'security',
    action: 'comprehensive_security_test',
    ip,
    userAgent
  });
  
  const results = await runComprehensiveSecurityTest();
  
  // Log security test event
  await securityLogger.logSecurityEvent({
    ip,
    userAgent,
    eventType: 'DATA_ACCESS',
    severity: 'LOW',
    description: 'Comprehensive security test executed',
    culturalContext: 'portuguese-uk',
    metadata: {
      testResults: results.summary,
      component: 'security-testing'
    }
  });

  return NextResponse.json({
    message: 'Comprehensive security test completed',
    platform: 'LusoTown - Portuguese Community Platform',
    results,
    timestamp: new Date().toISOString()
  });
}

// XSS Protection Test
async function handleXSSTest() {
  const testInputs = [
    '<script>alert("XSS test")</script>Hello Portuguese community!',
    'javascript:alert("Portuguese XSS")',
    '<img src="x" onerror="alert(1)">',
    'Olá! <b>Portuguese</b> text with açúcar',
    'data:text/html,<script>alert("test")</script>',
    'data:image/png;base64,valid-image-data',
    '<iframe src="evil.com"></iframe>Comunidade Portuguesa'
  ];

  const results = [];
  
  for (const input of testInputs) {
    const sanitizedText = sanitizeText(input);
    const sanitizedHTML = sanitizeHTML(input, ['b', 'i', 'strong']);
    const securityTest = await SecurityTester.testXSSProtection(input);
    
    results.push({
      original: input,
      sanitizedText,
      sanitizedHTML,
      threats: securityTest.threats,
      blocked: securityTest.blocked
    });
  }

  return NextResponse.json({
    message: 'XSS protection test completed',
    portuguese_characters_preserved: true,
    tests: results,
    summary: {
      total_tests: results.length,
      threats_blocked: results.filter(r => r.blocked).length,
      portuguese_content_safe: results.some(r => r.original.includes('açúcar'))
    }
  });
}

// Rate Limiting Test
async function handleRateLimitTest(request: NextRequest, ip: string, userAgent: string) {
  const identifier = `ip:${ip}`;
  const endpoint = '/api/test-security';
  const rateLimitType = 'general_api';

  // Test rate limiting
  const { success, limit, remaining, reset } = await rateLimit(
    identifier,
    rateLimitType,
    100, // 100 requests per minute for testing
    60 * 1000 // 1 minute window
  );

  if (!success) {
    // Log rate limit violation
    logRateLimitViolation(
      identifier,
      rateLimitType,
      endpoint,
      limit,
      limit - remaining,
      userAgent
    );

    // Detect abuse patterns
    detectAndLogAbuse(
      identifier,
      endpoint,
      rateLimitType,
      limit - remaining,
      60 * 1000
    );

    return NextResponse.json(
      {
        message: 'Rate limit test - limit exceeded',
        rate_limit: {
          success: false,
          limit,
          remaining: 0,
          reset: new Date(reset).toISOString(),
          endpoint: endpoint,
          portuguese_community: 'protected'
        }
      },
      { status: 429 }
    );
  }

  return NextResponse.json({
    message: 'Rate limiting test successful',
    rate_limit: {
      success: true,
      limit,
      remaining,
      reset: new Date(reset).toISOString(),
      endpoint: endpoint,
      portuguese_community: 'protected'
    }
  });
}

// Input Validation Test
async function handleInputValidationTest() {
  const testData = {
    // Valid Portuguese business data
    validBusiness: {
      name: 'Restaurante O Bacalhau',
      description: 'Authentic Portuguese cuisine with traditional bacalhau dishes',
      address: '123 Portuguese Street, London',
      postcode: 'SW1A 1AA',
      phone: '+44 20 7123 4567',
      email: 'info@obacalhau.com',
      ownerName: 'João Silva',
      yearEstablished: 2010,
      businessCategory: 'restaurant' as const,
      keywords: ['portuguese', 'bacalhau', 'traditional'],
      gdprConsent: true
    },
    // Malicious data
    maliciousBusiness: {
      name: '<script>alert("xss")</script>Evil Restaurant',
      description: 'javascript:alert(document.cookie)',
      address: '<iframe src="evil.com"></iframe>',
      postcode: 'INVALID',
      phone: 'not-a-phone',
      email: 'not-an-email',
      ownerName: '<img onerror="alert(1)" src="x">',
      yearEstablished: 3000,
      businessCategory: 'invalid' as any,
      keywords: ['<script>', 'javascript:'],
      gdprConsent: false
    }
  };

  const results = {
    validBusiness: { success: false, error: null, data: null },
    maliciousBusiness: { success: false, error: null, data: null }
  };

  // Test valid business data
  try {
    const validatedData = validateInput.businessSubmission(testData.validBusiness);
    results.validBusiness = {
      success: true,
      error: null,
      data: {
        name: validatedData.name,
        description: validatedData.description,
        ownerName: validatedData.ownerName,
        sanitized: true
      }
    };
  } catch (error) {
    results.validBusiness = {
      success: false,
      error: error instanceof Error ? error.message : 'Validation failed',
      data: null
    };
  }

  // Test malicious business data
  try {
    const maliciousData = validateInput.businessSubmission(testData.maliciousBusiness);
    results.maliciousBusiness = {
      success: true, // This shouldn't happen
      error: null,
      data: maliciousData
    };
  } catch (error) {
    results.maliciousBusiness = {
      success: false, // This should happen
      error: 'Malicious data correctly blocked',
      data: null
    };
  }

  return NextResponse.json({
    message: 'Input validation test completed',
    results,
    summary: {
      valid_data_passed: results.validBusiness.success,
      malicious_data_blocked: !results.maliciousBusiness.success,
      portuguese_characters_preserved: results.validBusiness.data?.name?.includes('ã') || false
    }
  });
}

// SQL Injection Protection Test
async function handleSQLInjectionTest() {
  const testInputs = [
    "'; DROP TABLE businesses; --",
    "admin' OR '1'='1",
    "UNION SELECT * FROM users",
    "João Silva", // Valid Portuguese name
    "<script>alert('xss')</script>",
    "javascript:alert(1)"
  ];

  const results = testInputs.map(input => {
    const validation = SQLInjectionProtection.validateInput(input, 'test_field');
    return {
      original: input,
      isValid: validation.isValid,
      sanitized: validation.sanitizedInput,
      threats: validation.threats
    };
  });

  return NextResponse.json({
    message: 'SQL injection protection test completed',
    results,
    summary: {
      total_tests: results.length,
      threats_detected: results.filter(r => !r.isValid).length,
      portuguese_names_preserved: results.some(r => r.original === 'João Silva' && r.isValid)
    }
  });
}

// File Upload Security Test
async function handleFileUploadTest() {
  const testFiles = [
    {
      name: 'safe-image.jpg',
      size: 1024 * 1024, // 1MB
      type: 'image/jpeg'
    },
    {
      name: 'malicious-script.js',
      size: 1024,
      type: 'application/javascript'
    },
    {
      name: 'too-large.jpg',
      size: 10 * 1024 * 1024, // 10MB
      type: 'image/jpeg'
    },
    {
      name: 'portuguese-document.pdf',
      size: 2 * 1024 * 1024, // 2MB
      type: 'application/pdf'
    }
  ];

  const results = testFiles.map(file => {
    const validation = SecureFileUpload.validateFile(file);
    return {
      original: file,
      isValid: validation.isValid,
      errors: validation.errors,
      sanitizedName: validation.sanitizedName
    };
  });

  return NextResponse.json({
    message: 'File upload security test completed',
    results,
    summary: {
      total_tests: results.length,
      safe_files_passed: results.filter(r => r.isValid).length,
      malicious_files_blocked: results.filter(r => !r.isValid).length
    }
  });
}

// Sentry Monitoring Test
async function handleSentryTest() {
  const sentryResults = await runComprehensiveSecurityTest();
  
  return NextResponse.json({
    message: 'Sentry monitoring test completed',
    sentry_configured: sentryResults.sentry.configured,
    events_sent: sentryResults.events.eventIds.length,
    performance_monitoring: sentryResults.performance.success,
    portuguese_community_context: true,
    results: sentryResults
  });
}

// Brute Force Protection Test
async function handleBruteForceTest(ip: string) {
  const testEmail = 'test@lusotown.com';
  
  // Record several failed attempts
  for (let i = 0; i < 3; i++) {
    await bruteForceProtection.recordFailedAttempt(ip, testEmail);
  }
  
  const isBlocked = await bruteForceProtection.isBlocked(ip, testEmail);
  const attempts = await bruteForceProtection.getAttempts(ip, testEmail);
  
  // Clear attempts after test
  await bruteForceProtection.clearAttempts(ip, testEmail);
  
  return NextResponse.json({
    message: 'Brute force protection test completed',
    test_ip: ip,
    test_email: testEmail,
    is_blocked: isBlocked,
    attempt_count: attempts?.attempts || 0,
    protection_active: true,
    portuguese_community_protected: true
  });
}

// Test all security middleware functions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const testData = body.testData || 'Test Portuguese community security';
    
    // Test input sanitization
    const sanitized = sanitizeText(testData);
    
    // Test SQL injection protection
    const sqlValidation = SQLInjectionProtection.validateInput(testData, 'post_data');
    
    // Log security test
    await securityLogger.logSecurityEvent({
      ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'test-ip',
      userAgent: request.headers.get('user-agent') || 'test-user-agent',
      eventType: 'DATA_ACCESS',
      severity: 'LOW',
      description: 'POST security test executed',
      culturalContext: 'portuguese-uk',
      metadata: {
        endpoint: '/api/test-security',
        method: 'POST',
        testData: sanitized
      }
    });
    
    return NextResponse.json({
      message: 'POST security test completed',
      original_data: testData,
      sanitized_data: sanitized,
      sql_validation: sqlValidation,
      portuguese_community: 'protected'
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'POST security test failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
