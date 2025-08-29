import {
  sanitizeText,
  sanitizeHTML,
  sanitizePortugueseCulturalContent,
  validatePortugueseContent,
  validateInput
} from '@/lib/security/input-validation';
import { PORTUGUESE_PATTERNS } from '@/lib/security/input-validation';

describe('XSS Protection Tests', () => {
  describe('sanitizeText', () => {
    test('should remove HTML tags', () => {
      const input = '<script>alert("xss")</script>Hello World';
      const result = sanitizeText(input);
      expect(result).not.toContain('<script>');
      expect(result).toContain('Hello World');
    });

    test('should handle Portuguese characters safely', () => {
      const input = 'Olá! Como está? Açúcar, pão, coração';
      const result = sanitizeText(input);
      expect(result).toBe(input);
    });

    test('should remove javascript: protocols', () => {
      const input = 'javascript:alert("xss")';
      const result = sanitizeText(input);
      expect(result).not.toContain('javascript:');
    });

    test('should remove malicious data: URLs', () => {
      const input = 'data:text/html,<script>alert(1)</script>';
      const result = sanitizeText(input);
      expect(result).not.toContain('data:text/html');
    });

    test('should preserve safe data: URLs', () => {
      const input = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
      const result = sanitizeText(input);
      expect(result).toContain('data:image/png');
    });
  });

  describe('sanitizeHTML', () => {
    test('should allow safe tags', () => {
      const input = '<p>Hello <strong>world</strong></p>';
      const result = sanitizeHTML(input, ['p', 'strong']);
      expect(result).toContain('<p>');
      expect(result).toContain('<strong>');
    });

    test('should remove dangerous tags', () => {
      const input = '<p>Hello</p><script>alert("xss")</script>';
      const result = sanitizeHTML(input, ['p']);
      expect(result).toContain('<p>Hello</p>');
      expect(result).not.toContain('<script>');
    });

    test('should remove event handlers', () => {
      const input = '<p onclick="alert(1)">Hello</p>';
      const result = sanitizeHTML(input, ['p']);
      expect(result).not.toContain('onclick');
      expect(result).toContain('Hello');
    });
  });

  describe('sanitizePortugueseCulturalContent', () => {
    test('should preserve cultural content formatting', () => {
      const input = '<h2>Festival de Fado</h2><p>Uma celebração da <strong>cultura portuguesa</strong> em Londres.</p>';
      const result = sanitizePortugueseCulturalContent(input);
      expect(result).toContain('<h2>Festival de Fado</h2>');
      expect(result).toContain('<strong>cultura portuguesa</strong>');
    });

    test('should remove dangerous content from cultural text', () => {
      const input = '<h2>Festival</h2><script>steal_data()</script><p>Cultural event</p>';
      const result = sanitizePortugueseCulturalContent(input);
      expect(result).toContain('<h2>Festival</h2>');
      expect(result).not.toContain('<script>');
      expect(result).toContain('<p>Cultural event</p>');
    });
  });

  describe('Portuguese Content Validation', () => {
    test('should validate safe Portuguese content', () => {
      const content = 'Bem-vindos ao restaurante O Fado! Servimos pratos tradicionais portugueses.';
      const result = validatePortugueseContent(content);
      expect(result.isValid).toBe(true);
      expect(result.issues).toHaveLength(0);
    });

    test('should detect suspicious patterns', () => {
      const content = 'Transferir dinheiro para esta conta: golpe@email.com';
      const result = validatePortugueseContent(content);
      expect(result.isValid).toBe(false);
      expect(result.issues).toContain('Content may contain suspicious patterns');
    });

    test('should handle special Portuguese characters', () => {
      const content = 'Açúcar, pão, coração, ação, não, são, mãe, irmão';
      const result = validatePortugueseContent(content);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Business Submission Validation', () => {
    test('should validate safe business data', () => {
      const businessData = {
        name: 'Restaurante O Bacalhau',
        namePortuguese: 'Restaurante O Bacalhau',
        description: 'Authentic Portuguese cuisine in the heart of London',
        descriptionPortuguese: 'Culinária portuguesa autêntica no coração de Londres',
        address: '123 Portuguese Street, London',
        postcode: 'SW1A 1AA',
        phone: '+44 20 7123 4567',
        email: 'info@obacalhau.com',
        website: 'https://obacalhau.com',
        ownerName: 'João Silva',
        yearEstablished: 2010,
        businessCategory: 'restaurant' as const,
        keywords: ['portuguese', 'restaurant', 'bacalhau', 'traditional'],
        gdprConsent: true
      };

      expect(() => validateInput.businessSubmission(businessData)).not.toThrow();
    });

    test('should reject malicious business data', () => {
      const maliciousData = {
        name: '<script>alert("xss")</script>Evil Restaurant',
        description: 'javascript:alert(document.cookie)',
        address: '<iframe src="evil.com"></iframe>',
        postcode: 'INVALID',
        phone: 'not-a-phone',
        email: 'not-an-email',
        website: 'javascript:void(0)',
        ownerName: '<img onerror="alert(1)" src="x">',
        yearEstablished: 3000,
        keywords: ['<script>', 'javascript:', 'data:text/html']
      };

      expect(() => validateInput.businessSubmission(maliciousData)).toThrow();
    });

    test('should sanitize Portuguese business descriptions', () => {
      const businessData = {
        name: 'Café da Esquina',
        description: 'Café tradicional com pastéis de nata',
        descriptionPortuguese: 'Traditional café with pastéis de nata',
        address: '456 Lisbon Road, London',
        postcode: 'W1A 0AA',
        phone: '+44 20 7987 6543',
        email: 'cafe@esquina.com',
        ownerName: 'Maria Santos',
        yearEstablished: 2015,
        businessCategory: 'cafe' as const,
        keywords: ['café', 'pastéis', 'nata'],
        gdprConsent: true
      };

      const result = validateInput.businessSubmission(businessData);
      expect(result.description).toContain('com pastéis de nata');
      expect(result.descriptionPortuguese).toContain('with pastéis de nata');
    });
  });

  describe('Message Validation', () => {
    test('should validate safe Portuguese messages', () => {
      const messageData = {
        content: 'Olá! Como está? Gostaria de saber mais sobre os eventos culturais.',
        messageType: 'text' as const,
        conversationId: '123e4567-e89b-12d3-a456-426614174000',
        receiverId: '123e4567-e89b-12d3-a456-426614174001'
      };

      expect(() => validateInput.message(messageData)).not.toThrow();
    });

    test('should sanitize malicious messages', () => {
      const maliciousMessage = {
        content: '<script>alert("steal cookies")</script>Hello there!',
        messageType: 'text' as const,
        conversationId: '123e4567-e89b-12d3-a456-426614174000',
        receiverId: '123e4567-e89b-12d3-a456-426614174001'
      };

      const result = validateInput.message(maliciousMessage);
      expect(result.content).not.toContain('<script>');
      expect(result.content).toContain('Hello there!');
    });
  });

  describe('Portuguese Pattern Validation', () => {
    test('should validate Portuguese names correctly', () => {
      const validNames = [
        'João Silva',
        'Maria José Santos',
        'António Guterres',
        'Cristina Ferreira-Costa',
        "Ana O'Connor" // Irish-Portuguese
      ];

      validNames.forEach(name => {
        expect(PORTUGUESE_PATTERNS.name.test(name)).toBe(true);
      });
    });

    test('should reject invalid name patterns', () => {
      const invalidNames = [
        '<script>alert(1)</script>',
        'João<img src=x onerror=alert(1)>',
        'javascript:alert(1)',
        'user@domain.com'
      ];

      invalidNames.forEach(name => {
        expect(PORTUGUESE_PATTERNS.name.test(name)).toBe(false);
      });
    });

    test('should validate Portuguese cultural text', () => {
      const validTexts = [
        'Fado é uma expressão musical típica de Portugal.',
        'Os pastéis de nata são um doce tradicional português.',
        'Lisboa é a capital de Portugal (1143-2024).',
        'A saudade é um sentimento muito português!'
      ];

      validTexts.forEach(text => {
        expect(PORTUGUESE_PATTERNS.culturalText.test(text)).toBe(true);
      });
    });

    test('should reject dangerous cultural text', () => {
      const dangerousTexts = [
        '<script>alert("xss")</script>',
        'javascript:void(0)',
        '<iframe src="evil.com">',
        'data:text/html,<script>alert(1)</script>'
      ];

      dangerousTexts.forEach(text => {
        expect(PORTUGUESE_PATTERNS.culturalText.test(text)).toBe(false);
      });
    });
  });

  describe('Edge Cases and Advanced XSS', () => {
    test('should handle encoded XSS attempts', () => {
      const encoded = '&lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;';
      const result = sanitizeText(encoded);
      expect(result).not.toContain('alert');
    });

    test('should handle SVG-based XSS', () => {
      const svgXss = '<svg onload="alert(1)"><title>XSS</title></svg>';
      const result = sanitizeHTML(svgXss, []);
      expect(result).not.toContain('onload');
      expect(result).not.toContain('alert');
    });

    test('should handle CSS-based attacks', () => {
      const cssAttack = '<p style="background:url(javascript:alert(1))">Test</p>';
      const result = sanitizeHTML(cssAttack, ['p']);
      expect(result).not.toContain('javascript:');
      expect(result).toContain('Test');
    });

    test('should preserve Portuguese accents in all contexts', () => {
      const portuguese = 'Não há pão, só ação e coração. Mãe, irmão, limão, balão!';
      const result = sanitizeText(portuguese);
      expect(result).toBe(portuguese);
      
      const htmlResult = sanitizeHTML(`<p>${portuguese}</p>`, ['p']);
      expect(htmlResult).toContain(portuguese);
    });
  });
});