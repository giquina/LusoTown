/**
 * Portuguese Character Validation Test Suite
 * Comprehensive testing of Portuguese special characters (ã, ç, õ, etc.)
 */

import { PORTUGUESE_PATTERNS } from '@/lib/security/input-validation';
import { PortugueseAddressValidator } from './portuguese-address-validator';

// Portuguese character test data
export const PORTUGUESE_CHARACTER_TESTS = {
  names: {
    valid: [
      'João Silva',
      'Maria José',
      'António Fernandes',
      'São Tomé',
      'Conceição Santos',
      'José da Conceição',
      'Rui Patrão',
      'Cristóvão Colombo',
      'Fernão Mendes Pinto',
      'Luís de Camões',
      'Beatriz Ângelo',
      'Gonçalo Byrne',
      'Amélia Rodrigues',
      'Sebastião Salgado',
      'Delfim Sardo',
      'Álvaro Siza',
      'Manuela Coimbra',
      'Ângela Silva',
      'Tó Zé'
    ],
    invalid: [
      'João<script>',
      'Maria José;',
      'António&alert()',
      'São Tomé"onclick="',
      'José<iframe>',
      'Maria javascript:',
      'João vbscript:',
      'António data:text/html'
    ]
  },
  
  addresses: {
    portugal: [
      'Rua das Flores, 123, 4º andar',
      'Avenida da República, 456',
      'Praça do Comércio, 789',
      'Largo do Rato, 12',
      'Travessa de São Vicente, 34',
      'Estrada Nacional 125, Km 15',
      'Quinta da Malagueira, Lote 67',
      'Vila Nova de São Bento, 890'
    ],
    brazil: [
      'Rua São João, 1234, Apto 567',
      'Avenida Paulista, 2000',
      'Praça da Sé, s/n',
      'Vila Madalena, Rua Fradique Coutinho, 123',
      'Conjunto Nacional, Bloco A, Sala 123',
      'Alameda dos Anjos, 456'
    ],
    uk: [
      'Portuguese Community Centre, Stockwell Road',
      'Casa do Bacalhau, South Lambeth Road',
      'Portuguese Cultural Centre, Tufnell Park',
      '123 São Bento Street, London',
      'Igreja de São Vicente, Golders Green',
      'Restaurante São João, Vauxhall'
    ]
  },
  
  businessNames: {
    valid: [
      'Restaurante São João',
      'Pastelaria Pão de Açúcar',
      'Casa do Bacalhau',
      'Mercearia do António',
      'Café Central',
      'Padaria & Pastelaria São Bento',
      'Loja do Mané',
      'Cabeleireiro João & Filhos',
      'Transportes Rápidos, Lda.',
      'Construção Civil - Irmãos Silva',
      'Bar & Restaurante O Fado',
      'Supermercado São Tomé',
      'Açougue do Tó Zé',
      'Limpezas Domésticas - Maria',
      'Escola de Dança Portuguesa'
    ],
    invalid: [
      'Restaurante <script>alert("xss")</script>',
      'Casa do Bacalhau javascript:void(0)',
      'Café Central";DROP TABLE--',
      'Padaria vbscript:alert(1)',
      'Loja <iframe src="evil.com">',
      'Bar onclick="alert(\'hack\')"',
      'Supermercado data:text/html,<script>',
      'Açougue &#x3C;script&#x3E;'
    ]
  },
  
  culturalContent: {
    valid: [
      'A festa de São João é uma tradição muito importante na cultura portuguesa.',
      'O fado é Património Imaterial da Humanidade pela UNESCO.',
      'Os pastéis de nata são uma especialidade de Belém.',
      'A procissão do Senhor Santo Cristo dos Milagres acontece nos Açores.',
      'O carnaval brasileiro é conhecido mundialmente pela sua alegria.',
      'A capoeira é uma arte marcial afro-brasileira.',
      'Os azulejos portugueses decoram muitos edifícios históricos.',
      'A saudade é um sentimento tipicamente português.',
      'O bacalhau tem mil e uma maneiras de ser preparado.',
      'A Festa do Avante! é um evento cultural e político importante.',
      'As Festas dos Santos Populares animam Lisboa em Junho.',
      'A Festa da Flor é uma celebração típica da Madeira.'
    ],
    malicious: [
      'A festa <script>alert("xss")</script> é importante.',
      'O fado javascript:void(0) é património.',
      'Os pastéis onclick="hack()" são especiais.',
      'A procissão vbscript:alert(1) acontece.',
      'O carnaval <iframe src="evil.com"> é conhecido.',
      'A capoeira data:text/html,<script> é arte.',
      'Os azulejos &#x3C;script&#x3E; decoram.',
      'A saudade ";DROP TABLE users;-- é sentimento.'
    ]
  },
  
  phoneNumbers: {
    portugal: [
      '+351 123 456 789',
      '+351 912 345 678',
      '+351 967 123 456',
      '+351 21 123 4567',
      '+351 22 987 6543',
      '+351918234567', // without spaces
      '+351 93 456 7890'
    ],
    brazil: [
      '+55 (11) 12345-6789',
      '+55 (21) 98765-4321',
      '+55 (85) 91234-5678',
      '+55 (47) 99876-5432',
      '+55 (62) 95555-5555'
    ],
    uk: [
      '+44 20 1234 5678',
      '+44 7912 345678',
      '+44 161 123 4567',
      '+44 113 987 6543',
      '+44 20 7123 4567'
    ],
    invalid: [
      '123456789',
      '+351 abc def ghi',
      '+55 (11) abcd-efgh',
      '+44 20 <script>',
      '+351 javascript:',
      'onclick="alert()"',
      'vbscript:alert(1)'
    ]
  },
  
  postalCodes: {
    portugal: [
      '1000-001', // Lisboa
      '4000-007', // Porto
      '3000-123', // Coimbra
      '8000-456', // Faro
      '2500-789', // Caldas da Rainha
      '9000-012', // Funchal
      '9500-345' // Ponta Delgada
    ],
    brazil: [
      '12345-678', // São Paulo
      '20000-123', // Rio de Janeiro
      '30000-456', // Belo Horizonte
      '40000-789', // Salvador
      '50000-012', // Recife
      '60000-345' // Fortaleza
    ],
    uk: [
      'SW9 8EQ', // Stockwell
      'SW8 1ST', // Vauxhall
      'SE1 6TE', // Elephant & Castle
      'N7 6PA', // Tufnell Park
      'NW11 7QH', // Golders Green
      'E6 3HG', // East Ham
      'HA1 2EN' // Harrow
    ],
    invalid: [
      '12345', // Too short
      'ABCDE-FGH', // Invalid format
      '1234-ABC', // Invalid characters
      '<script>', // XSS attempt
      'javascript:', // Script injection
      '"; DROP--' // SQL injection
    ]
  }
};

/**
 * Test Portuguese character validation
 */
export class PortugueseCharacterTester {
  
  // Test name validation
  static testNames(): { passed: number; failed: number; results: any[] } {
    const results: any[] = [];
    let passed = 0;
    let failed = 0;

    // Test valid names
    for (const name of PORTUGUESE_CHARACTER_TESTS.names.valid) {
      const isValid = PORTUGUESE_PATTERNS.name.test(name);
      if (isValid) {
        passed++;
        results.push({ name, expected: true, actual: true, status: 'PASS' });
      } else {
        failed++;
        results.push({ name, expected: true, actual: false, status: 'FAIL' });
      }
    }

    // Test invalid names (should fail pattern but pass after sanitization)
    for (const name of PORTUGUESE_CHARACTER_TESTS.names.invalid) {
      const isValid = PORTUGUESE_PATTERNS.name.test(name);
      if (!isValid) {
        passed++;
        results.push({ name, expected: false, actual: false, status: 'PASS' });
      } else {
        failed++;
        results.push({ name, expected: false, actual: true, status: 'FAIL' });
      }
    }

    return { passed, failed, results };
  }

  // Test address validation
  static async testAddresses(): Promise<{ passed: number; failed: number; results: any[] }> {
    const results: any[] = [];
    let passed = 0;
    let failed = 0;

    // Test Portuguese addresses
    for (const address of PORTUGUESE_CHARACTER_TESTS.addresses.portugal) {
      const isValidPattern = PORTUGUESE_PATTERNS.address.test(address);
      const isValidCultural = PORTUGUESE_PATTERNS.culturalText.test(address);
      
      if (isValidPattern && isValidCultural) {
        passed++;
        results.push({ address, country: 'portugal', status: 'PASS' });
      } else {
        failed++;
        results.push({ address, country: 'portugal', status: 'FAIL', 
          pattern: isValidPattern, cultural: isValidCultural });
      }
    }

    // Test Brazilian addresses
    for (const address of PORTUGUESE_CHARACTER_TESTS.addresses.brazil) {
      const isValidPattern = PORTUGUESE_PATTERNS.address.test(address);
      const isValidCultural = PORTUGUESE_PATTERNS.culturalText.test(address);
      
      if (isValidPattern && isValidCultural) {
        passed++;
        results.push({ address, country: 'brazil', status: 'PASS' });
      } else {
        failed++;
        results.push({ address, country: 'brazil', status: 'FAIL',
          pattern: isValidPattern, cultural: isValidCultural });
      }
    }

    return { passed, failed, results };
  }

  // Test business name validation
  static testBusinessNames(): { passed: number; failed: number; results: any[] } {
    const results: any[] = [];
    let passed = 0;
    let failed = 0;

    // Test valid business names
    for (const name of PORTUGUESE_CHARACTER_TESTS.businessNames.valid) {
      const isValid = PORTUGUESE_PATTERNS.businessName.test(name);
      if (isValid) {
        passed++;
        results.push({ name, expected: true, actual: true, status: 'PASS' });
      } else {
        failed++;
        results.push({ name, expected: true, actual: false, status: 'FAIL' });
      }
    }

    // Test malicious business names (should fail)
    for (const name of PORTUGUESE_CHARACTER_TESTS.businessNames.invalid) {
      const isValid = PORTUGUESE_PATTERNS.businessName.test(name);
      if (!isValid) {
        passed++;
        results.push({ name, expected: false, actual: false, status: 'PASS' });
      } else {
        failed++;
        results.push({ name, expected: false, actual: true, status: 'FAIL - SECURITY RISK' });
      }
    }

    return { passed, failed, results };
  }

  // Test cultural content validation
  static testCulturalContent(): { passed: number; failed: number; results: any[] } {
    const results: any[] = [];
    let passed = 0;
    let failed = 0;

    // Test valid cultural content
    for (const content of PORTUGUESE_CHARACTER_TESTS.culturalContent.valid) {
      const isValid = PORTUGUESE_PATTERNS.culturalText.test(content);
      if (isValid) {
        passed++;
        results.push({ content: content.substring(0, 50) + '...', 
          expected: true, actual: true, status: 'PASS' });
      } else {
        failed++;
        results.push({ content: content.substring(0, 50) + '...', 
          expected: true, actual: false, status: 'FAIL' });
      }
    }

    // Test malicious content (should fail)
    for (const content of PORTUGUESE_CHARACTER_TESTS.culturalContent.malicious) {
      const isValid = PORTUGUESE_PATTERNS.culturalText.test(content);
      if (!isValid) {
        passed++;
        results.push({ content: content.substring(0, 50) + '...', 
          expected: false, actual: false, status: 'PASS' });
      } else {
        failed++;
        results.push({ content: content.substring(0, 50) + '...', 
          expected: false, actual: true, status: 'FAIL - SECURITY RISK' });
      }
    }

    return { passed, failed, results };
  }

  // Test phone number validation
  static testPhoneNumbers(): { passed: number; failed: number; results: any[] } {
    const results: any[] = [];
    let passed = 0;
    let failed = 0;

    const allValidNumbers = [
      ...PORTUGUESE_CHARACTER_TESTS.phoneNumbers.portugal,
      ...PORTUGUESE_CHARACTER_TESTS.phoneNumbers.brazil,
      ...PORTUGUESE_CHARACTER_TESTS.phoneNumbers.uk
    ];

    // Test valid phone numbers
    for (const phone of allValidNumbers) {
      const validation = PortugueseAddressValidator.validatePhoneNumber(phone);
      if (validation.isValid) {
        passed++;
        results.push({ phone, country: validation.country, status: 'PASS' });
      } else {
        failed++;
        results.push({ phone, country: validation.country, status: 'FAIL' });
      }
    }

    // Test invalid phone numbers
    for (const phone of PORTUGUESE_CHARACTER_TESTS.phoneNumbers.invalid) {
      const validation = PortugueseAddressValidator.validatePhoneNumber(phone);
      if (!validation.isValid) {
        passed++;
        results.push({ phone, expected: false, actual: false, status: 'PASS' });
      } else {
        failed++;
        results.push({ phone, expected: false, actual: true, status: 'FAIL - SECURITY RISK' });
      }
    }

    return { passed, failed, results };
  }

  // Test postal code validation
  static testPostalCodes(): { passed: number; failed: number; results: any[] } {
    const results: any[] = [];
    let passed = 0;
    let failed = 0;

    const testCases = [
      { codes: PORTUGUESE_CHARACTER_TESTS.postalCodes.portugal, country: 'portugal' },
      { codes: PORTUGUESE_CHARACTER_TESTS.postalCodes.brazil, country: 'brazil' },
      { codes: PORTUGUESE_CHARACTER_TESTS.postalCodes.uk, country: 'uk' }
    ];

    // Test valid postal codes
    for (const { codes, country } of testCases) {
      for (const code of codes) {
        const validation = PortugueseAddressValidator.validatePostalCode(code);
        if (validation.isValid && validation.country === country) {
          passed++;
          results.push({ code, country, region: validation.region, status: 'PASS' });
        } else {
          failed++;
          results.push({ code, country, expected: country, 
            actual: validation.country, status: 'FAIL' });
        }
      }
    }

    // Test invalid postal codes
    for (const code of PORTUGUESE_CHARACTER_TESTS.postalCodes.invalid) {
      const validation = PortugueseAddressValidator.validatePostalCode(code);
      if (!validation.isValid) {
        passed++;
        results.push({ code, expected: false, actual: false, status: 'PASS' });
      } else {
        failed++;
        results.push({ code, expected: false, actual: true, status: 'FAIL - SECURITY RISK' });
      }
    }

    return { passed, failed, results };
  }

  // Run comprehensive test suite
  static async runAllTests(): Promise<{
    summary: { totalPassed: number; totalFailed: number; totalTests: number };
    details: Record<string, any>;
  }> {
    console.log('🧪 Running Portuguese Character Validation Tests...\n');

    const tests = {
      names: this.testNames(),
      addresses: await this.testAddresses(),
      businessNames: this.testBusinessNames(),
      culturalContent: this.testCulturalContent(),
      phoneNumbers: this.testPhoneNumbers(),
      postalCodes: this.testPostalCodes()
    };

    const summary = {
      totalPassed: Object.values(tests).reduce((sum, test) => sum + test.passed, 0),
      totalFailed: Object.values(tests).reduce((sum, test) => sum + test.failed, 0),
      totalTests: Object.values(tests).reduce((sum, test) => sum + test.passed + test.failed, 0)
    };

    // Log results
    console.log('📊 Test Results Summary:');
    console.log(`✅ Passed: ${summary.totalPassed}`);
    console.log(`❌ Failed: ${summary.totalFailed}`);
    console.log(`📈 Success Rate: ${((summary.totalPassed / summary.totalTests) * 100).toFixed(1)}%\n`);

    // Detailed results
    for (const [testName, result] of Object.entries(tests)) {
      console.log(`${testName.toUpperCase()}:`);
      console.log(`  ✅ ${result.passed} passed, ❌ ${result.failed} failed`);
      
      // Show security risks
      const securityRisks = result.results.filter(r => r.status?.includes('SECURITY RISK'));
      if (securityRisks.length > 0) {
        console.log(`  🚨 ${securityRisks.length} SECURITY RISKS DETECTED!`);
        securityRisks.forEach(risk => {
          console.log(`    - ${risk.name || risk.phone || risk.code || 'Content'}`);
        });
      }
      console.log('');
    }

    return { summary, details: tests };
  }
}

// Export test runner for use in development
export const runPortugueseCharacterTests = PortugueseCharacterTester.runAllTests;

// Quick validation functions for common use cases
export const testPortugueseName = (name: string) => PORTUGUESE_PATTERNS.name.test(name);
export const testPortugueseAddress = (address: string) => PORTUGUESE_PATTERNS.address.test(address);
export const testPortugueseBusinessName = (name: string) => PORTUGUESE_PATTERNS.businessName.test(name);
export const testPortugueseContent = (content: string) => PORTUGUESE_PATTERNS.culturalText.test(content);