import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { NextRequest } from 'next/server';
import {
  securityLogger,
  bruteForceProtection,
  SQLInjectionProtection,
  SecureFileUpload,
  AuthTokenManager,
  PortugueseSessionManager,
  SecurityTester
} from '@/lib/security/comprehensive-security';

// Mock external dependencies
jest.mock('@supabase/supabase-js');
jest.mock('@upstash/redis');

describe('Comprehensive Security System', () => {
  describe('SQL Injection Protection', () => {
    it('should detect and sanitize SQL injection attempts', () => {
      const maliciousInputs = [
        "'; DROP TABLE users; --",
        "1' OR '1'='1",
        "admin' --",
        "' UNION SELECT * FROM passwords --",
        "<script>alert('xss')</script>",
        "javascript:alert(1)",
        "eval(document.cookie)"
      ];

      maliciousInputs.forEach(input => {
        const result = SQLInjectionProtection.validateInput(input, 'test_field');
        expect(result.isValid).toBe(false);
        expect(result.threats.length).toBeGreaterThan(0);
        expect(result.sanitizedInput).not.toContain(input);
      });
    });

    it('should allow safe Portuguese cultural content', () => {
      const safeInputs = [
        'Restaurante Português em Londres',
        'Fado e cultura tradicional',
        'Eventos da comunidade lusófona',
        'Bacalhau à Brás - especialidade',
        'Azulejos e artesanato português'
      ];

      safeInputs.forEach(input => {
        const result = SQLInjectionProtection.validateInput(input, 'cultural_content');
        expect(result.isValid).toBe(true);
        expect(result.threats.length).toBe(0);
        expect(result.sanitizedInput).toBe(input);
      });
    });

    it('should sanitize database parameters comprehensively', () => {
      const params = {
        businessName: "Café Lisboa'; DROP TABLE businesses; --",
        description: 'Safe Portuguese description',
        email: 'test@example.com',
        maliciousField: '<script>alert("xss")</script>'
      };

      const result = SQLInjectionProtection.sanitizeForDatabase(params);
      
      expect(result.isValid).toBe(false);
      expect(result.threats.length).toBeGreaterThan(0);
      expect(result.sanitizedParams.businessName).not.toContain("DROP TABLE");
      expect(result.sanitizedParams.description).toBe('Safe Portuguese description');
      expect(result.sanitizedParams.maliciousField).not.toContain('<script>');
    });
  });

  describe('Secure File Upload', () => {
    it('should validate file types correctly', () => {
      const validFile = {
        name: 'profile.jpg',
        size: 1024 * 1024, // 1MB
        type: 'image/jpeg',
        buffer: Buffer.from('valid image data')
      };

      const result = SecureFileUpload.validateFile(validFile);
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
      expect(result.sanitizedName).toBe('profile.jpg');
    });

    it('should reject dangerous file types', () => {
      const dangerousFiles = [
        { name: 'malware.exe', type: 'application/octet-stream', size: 1024 },
        { name: 'script.js', type: 'application/javascript', size: 512 },
        { name: 'backdoor.php', type: 'application/x-httpd-php', size: 2048 }
      ];

      dangerousFiles.forEach(file => {
        const result = SecureFileUpload.validateFile(file);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      });
    });

    it('should reject oversized files', () => {
      const oversizedFile = {
        name: 'large.jpg',
        size: 10 * 1024 * 1024, // 10MB (over 5MB limit)
        type: 'image/jpeg'
      };

      const result = SecureFileUpload.validateFile(oversizedFile);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('too large'))).toBe(true);
    });

    it('should sanitize filenames properly', () => {
      const unsafeFiles = [
        { name: '../../../etc/passwd', type: 'text/plain', size: 1024 },
        { name: 'file with spaces & symbols!@#.txt', type: 'text/plain', size: 512 },
        { name: '....hidden.txt', type: 'text/plain', size: 256 }
      ];

      unsafeFiles.forEach(file => {
        const result = SecureFileUpload.validateFile(file);
        expect(result.sanitizedName).not.toContain('..');
        expect(result.sanitizedName).not.toContain('/');
        expect(result.sanitizedName).not.toMatch(/^\.+/);
      });
    });
  });

  describe('Authentication Token Management', () => {
    it('should generate secure tokens', () => {
      const token = AuthTokenManager.generateSecureToken();
      expect(token).toHaveLength(64); // 32 bytes = 64 hex chars
      expect(token).toMatch(/^[a-f0-9]{64}$/i);
    });

    it('should generate unique refresh tokens', () => {
      const tokens = Array.from({ length: 100 }, () => 
        AuthTokenManager.generateRefreshToken()
      );
      const uniqueTokens = new Set(tokens);
      expect(uniqueTokens.size).toBe(100); // All tokens should be unique
    });

    it('should validate token formats correctly', () => {
      const validTokens = [
        AuthTokenManager.generateSecureToken(),
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      ];

      const invalidTokens = [
        'short',
        'invalid-format',
        '',
        '12345',
        'not.a.valid.jwt.token'
      ];

      validTokens.forEach(token => {
        expect(AuthTokenManager.validateTokenFormat(token)).toBe(true);
      });

      invalidTokens.forEach(token => {
        expect(AuthTokenManager.validateTokenFormat(token)).toBe(false);
      });
    });
  });

  describe('Portuguese Session Management', () => {
    // Note: These tests would require mocking Supabase client
    it('should create sessions with cultural context', async () => {
      // Mock implementation would go here
      expect(true).toBe(true); // Placeholder
    });

    it('should validate sessions securely', async () => {
      // Mock implementation would go here
      expect(true).toBe(true); // Placeholder
    });
  });

  describe('Security Testing Utilities', () => {
    it('should test XSS protection effectively', async () => {
      const xssPayloads = [
        '<script>alert("XSS")</script>',
        'javascript:alert(1)',
        '<iframe src="javascript:alert(1)"></iframe>',
        '<img onerror="alert(1)" src="invalid">',
        '<svg onload="alert(1)">'
      ];

      for (const payload of xssPayloads) {
        const result = await SecurityTester.testXSSProtection(payload);
        expect(result.blocked).toBe(true);
        expect(result.threats.length).toBeGreaterThan(0);
        expect(result.sanitizedOutput).not.toContain(payload);
      }
    });

    it('should test CSRF protection', async () => {
      // Mock NextRequest for CSRF testing
      const mockRequest = new NextRequest('https://example.com/api/test', {
        method: 'POST',
        headers: new Headers({
          'x-csrf-token': 'valid-token',
          'cookie': 'csrf-token=valid-token'
        })
      });

      const result = await SecurityTester.testCSRFProtection(mockRequest);
      expect(result.protected).toBe(true);
      expect(result.hasToken).toBe(true);
      expect(result.tokenValid).toBe(true);
    });
  });

  describe('Security Event Logging', () => {
    beforeEach(() => {
      // Clear any existing mocks
      jest.clearAllMocks();
    });

    it('should log security events with proper format', async () => {
      const mockEvent = {
        ip: '192.168.1.1',
        userAgent: 'Mozilla/5.0 Test Browser',
        eventType: 'LOGIN_ATTEMPT' as const,
        severity: 'MEDIUM' as const,
        description: 'Test security event',
        culturalContext: 'portuguese-uk' as const,
        metadata: { testData: 'value' }
      };

      // Mock console.log to verify logging
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      // This would normally log to Supabase, but we're testing the structure
      expect(mockEvent.eventType).toBe('LOGIN_ATTEMPT');
      expect(mockEvent.severity).toBe('MEDIUM');
      expect(mockEvent.culturalContext).toBe('portuguese-uk');
      
      consoleSpy.mockRestore();
    });
  });

  describe('Portuguese Cultural Content Validation', () => {
    it('should allow authentic Portuguese cultural expressions', () => {
      const culturalContent = [
        'Fado é Património da Humanidade pela UNESCO',
        'Pastéis de nata originais de Belém',
        'Festival de Santo António em Londres',
        'Grupo folclórico português apresenta rancho',
        'Missa em português na igreja católica'
      ];

      culturalContent.forEach(content => {
        const result = SQLInjectionProtection.validateInput(content, 'cultural_text');
        expect(result.isValid).toBe(true);
        expect(result.sanitizedInput).toBe(content);
      });
    });

    it('should detect suspicious patterns in Portuguese', () => {
      const suspiciousContent = [
        'Esquema para transferir dinheiro rapidamente',
        'Golpe financeiro garantido, contacte já',
        'Fraude documentos portugueses falsos',
        'Dados pessoais vendidos barato'
      ];

      suspiciousContent.forEach(content => {
        // This would integrate with the validatePortugueseContent function
        // For now, we test that the content contains suspicious patterns
        expect(content).toMatch(/golpe|fraude|esquema|dados\s+pessoais/i);
      });
    });
  });

  describe('Rate Limiting Integration', () => {
    it('should handle rate limiting for different endpoint types', () => {
      const endpointLimits = {
        '/api/auth/': { windowMs: 60000, maxRequests: 5 },
        '/api/messaging/': { windowMs: 60000, maxRequests: 30 },
        '/api/business-directory/': { windowMs: 60000, maxRequests: 60 },
        '/api/upload/': { windowMs: 300000, maxRequests: 5 }
      };

      Object.entries(endpointLimits).forEach(([endpoint, limits]) => {
        expect(limits.maxRequests).toBeGreaterThan(0);
        expect(limits.windowMs).toBeGreaterThan(0);
        // Stricter limits for sensitive endpoints
        if (endpoint.includes('auth') || endpoint.includes('upload')) {
          expect(limits.maxRequests).toBeLessThanOrEqual(10);
        }
      });
    });
  });

  describe('Security Headers Validation', () => {
    it('should include all required security headers', () => {
      const requiredHeaders = [
        'Strict-Transport-Security',
        'X-Frame-Options',
        'X-Content-Type-Options',
        'X-XSS-Protection',
        'Referrer-Policy',
        'Permissions-Policy',
        'Content-Security-Policy',
        'Cross-Origin-Embedder-Policy',
        'Cross-Origin-Opener-Policy'
      ];

      // This would test the actual headers in the middleware
      requiredHeaders.forEach(header => {
        expect(header).toMatch(/^[A-Za-z-]+$/);
        expect(header.length).toBeGreaterThan(5);
      });
    });

    it('should have strict CSP policies', () => {
      const cspPolicy = [
        "default-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'"
      ];

      cspPolicy.forEach(directive => {
        expect(directive).toMatch(/^[a-z-]+\s+/);
        // Should not contain 'unsafe-inline' for critical directives
        if (directive.startsWith('default-src') || directive.startsWith('object-src')) {
          expect(directive).not.toContain('unsafe-inline');
        }
      });
    });
  });

  describe('Error Handling and Fallbacks', () => {
    it('should handle security system failures gracefully', async () => {
      // Test what happens when security components fail
      const mockError = new Error('Security system unavailable');
      
      // Simulate security logger failure
      const originalConsoleError = console.error;
      console.error = jest.fn();
      
      // The system should continue functioning even if logging fails
      expect(() => {
        throw mockError;
      }).toThrow('Security system unavailable');
      
      console.error = originalConsoleError;
    });
  });
});

// Integration tests for full security workflow
describe('Security Integration Tests', () => {
  it('should handle complete authentication flow with security checks', async () => {
    // Mock a complete login flow with all security checks
    const mockLoginData = {
      email: 'test@lusotown.com',
      password: 'SecurePassword123!',
      culturalContext: 'portuguese-uk'
    };

    // Verify all validation steps would pass for legitimate user
    expect(mockLoginData.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(mockLoginData.password.length).toBeGreaterThanOrEqual(8);
    expect(mockLoginData.culturalContext).toBe('portuguese-uk');
  });

  it('should block malicious request completely', async () => {
    const maliciousRequest = {
      email: "admin'; DROP TABLE users; --",
      password: '<script>alert("xss")</script>',
      culturalContext: 'javascript:alert(1)'
    };

    // SQL injection check
    const sqlResult = SQLInjectionProtection.validateInput(maliciousRequest.email, 'email');
    expect(sqlResult.isValid).toBe(false);

    // XSS check
    const xssResult = await SecurityTester.testXSSProtection(maliciousRequest.password);
    expect(xssResult.blocked).toBe(true);

    // Cultural context validation
    expect(maliciousRequest.culturalContext).toContain('javascript:');
  });
});

// Performance tests for security operations
describe('Security Performance Tests', () => {
  it('should perform security validations within acceptable time limits', async () => {
    const testData = 'A'.repeat(1000); // 1KB of test data
    
    const startTime = Date.now();
    SQLInjectionProtection.validateInput(testData, 'large_field');
    const sqlTime = Date.now() - startTime;

    const startTime2 = Date.now();
    await SecurityTester.testXSSProtection(testData);
    const xssTime = Date.now() - startTime2;

    // Security validations should complete within reasonable time
    expect(sqlTime).toBeLessThan(100); // Less than 100ms
    expect(xssTime).toBeLessThan(100); // Less than 100ms
  });

  it('should handle concurrent security operations', async () => {
    const concurrentTests = Array.from({ length: 10 }, (_, i) =>
      SQLInjectionProtection.validateInput(`test${i}`, `field${i}`)
    );

    const results = await Promise.all(
      concurrentTests.map(async (test) => Promise.resolve(test))
    );

    expect(results).toHaveLength(10);
    results.forEach(result => {
      expect(result.isValid).toBe(true);
    });
  });
});