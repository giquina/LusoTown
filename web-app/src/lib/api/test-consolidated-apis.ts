/**
 * Test script for consolidated Portuguese community APIs
 * Run with: npx ts-node src/lib/api/test-consolidated-apis.ts
 */

import { createClient } from '@supabase/supabase-js';

const API_BASE_URL = 'http://localhost:3000/api';

// API Test Configuration
const API_TESTS = {
  // Core Community APIs
  events: {
    endpoint: '/events',
    methods: ['GET'],
    testParams: {
      category: 'fado',
      region: 'portugal',
      language: 'pt'
    }
  },
  
  businessDirectory: {
    endpoint: '/business-directory',
    methods: ['GET'],
    testParams: {
      search: 'pastéis',
      category: 'restaurant',
      verificationStatus: 'verified'
    }
  },
  
  matching: {
    endpoint: '/matching',
    methods: ['GET'],
    testParams: {
      type: 'cultural',
      region: 'portugal'
    }
  },
  
  community: {
    endpoint: '/community',
    methods: ['GET'],
    testParams: {
      action: 'overview'
    }
  },
  
  transport: {
    endpoint: '/transport',
    methods: ['GET'],
    testParams: {
      action: 'services',
      lat: '51.5074',
      lng: '-0.1278'
    }
  },
  
  universities: {
    endpoint: '/universities',
    methods: ['GET'],
    testParams: {
      region: 'london'
    }
  },
  
  streams: {
    endpoint: '/streams',
    methods: ['GET'],
    testParams: {
      language: 'pt',
      community: 'true'
    }
  },
  
  feed: {
    endpoint: '/feed',
    methods: ['GET'],
    testParams: {
      type: 'events'
    }
  }
};

interface TestResult {
  endpoint: string;
  method: string;
  status: number;
  success: boolean;
  responseTime: number;
  error?: string;
  culturalContext?: string;
  bilingualSupport?: boolean;
}

class PortugueseApiTester {
  private results: TestResult[] = [];

  async testEndpoint(
    name: string, 
    config: typeof API_TESTS[keyof typeof API_TESTS]
  ): Promise<void> {
    for (const method of config.methods) {
      const startTime = Date.now();
      
      try {
        let url = `${API_BASE_URL}${config.endpoint}`;
        
        if (method === 'GET' && config.testParams) {
          const params = new URLSearchParams(config.testParams as any);
          url += `?${params.toString()}`;
        }

        console.log(`Testing ${method} ${url}`);
        
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'pt,en;q=0.9',
          }
        });

        const responseTime = Date.now() - startTime;
        const responseData = await response.json().catch(() => null);

        const result: TestResult = {
          endpoint: config.endpoint,
          method,
          status: response.status,
          success: response.ok,
          responseTime,
          culturalContext: responseData?.culturalContext,
          bilingualSupport: this.checkBilingualSupport(responseData)
        };

        if (!response.ok) {
          result.error = responseData?.error || response.statusText;
        }

        this.results.push(result);
        
        console.log(`✅ ${name} ${method}: ${response.status} (${responseTime}ms)`);
        
        // Validate Portuguese community context
        if (responseData?.culturalContext === 'portuguese-speaking-community') {
          console.log(`  🇵🇹 Cultural context: ✓`);
        }
        
        // Check response time (should be <200ms for mobile)
        if (responseTime > 200) {
          console.log(`  ⚠️  Slow response: ${responseTime}ms`);
        }

      } catch (error: any) {
        const responseTime = Date.now() - startTime;
        
        this.results.push({
          endpoint: config.endpoint,
          method,
          status: 0,
          success: false,
          responseTime,
          error: error.message
        });
        
        console.log(`❌ ${name} ${method}: Error - ${error.message}`);
      }
    }
  }

  private checkBilingualSupport(responseData: any): boolean {
    if (!responseData) return false;
    
    // Check for bilingual error messages
    if (responseData.error?.message?.pt && responseData.error?.message?.en) {
      return true;
    }
    
    // Check for supportInfo in Portuguese
    if (responseData.supportInfo?.includes('Contacte')) {
      return true;
    }
    
    // Check for Portuguese cultural info
    if (responseData.community_info?.languages?.includes('Portuguese')) {
      return true;
    }
    
    return false;
  }

  async runAllTests(): Promise<void> {
    console.log('🚀 Starting Portuguese Community API Tests\n');
    
    for (const [name, config] of Object.entries(API_TESTS)) {
      await this.testEndpoint(name, config);
      console.log(''); // Empty line between tests
    }
    
    this.generateReport();
  }

  private generateReport(): void {
    console.log('📊 Test Results Summary');
    console.log('========================\n');
    
    const totalTests = this.results.length;
    const successfulTests = this.results.filter(r => r.success).length;
    const failedTests = totalTests - successfulTests;
    
    console.log(`Total APIs tested: ${totalTests}`);
    console.log(`Successful: ${successfulTests} ✅`);
    console.log(`Failed: ${failedTests} ❌`);
    console.log(`Success Rate: ${((successfulTests / totalTests) * 100).toFixed(1)}%\n`);
    
    // Performance Analysis
    const avgResponseTime = this.results
      .filter(r => r.success)
      .reduce((sum, r) => sum + r.responseTime, 0) / successfulTests || 0;
    
    console.log('📈 Performance Metrics');
    console.log(`Average response time: ${avgResponseTime.toFixed(0)}ms`);
    console.log(`Mobile-optimized (<200ms): ${this.results.filter(r => r.success && r.responseTime < 200).length}/${successfulTests}`);
    
    // Cultural Context Analysis
    const culturalContextAPIs = this.results.filter(r => 
      r.success && r.culturalContext === 'portuguese-speaking-community'
    ).length;
    
    console.log(`\n🇵🇹 Portuguese Cultural Context: ${culturalContextAPIs}/${successfulTests}`);
    
    const bilingualAPIs = this.results.filter(r => r.success && r.bilingualSupport).length;
    console.log(`🌍 Bilingual Support: ${bilingualAPIs}/${successfulTests}`);
    
    // Failed Tests Details
    if (failedTests > 0) {
      console.log('\n❌ Failed Tests:');
      this.results.filter(r => !r.success).forEach(result => {
        console.log(`  ${result.endpoint} ${result.method}: ${result.error || `Status ${result.status}`}`);
      });
    }
    
    console.log('\n✨ API Consolidation Complete');
    console.log('Community-first APIs ready for Portuguese-speaking community!');
  }

  // Test specific community features
  async testCommunityFeatures(): Promise<void> {
    console.log('🏘️  Testing Community-Specific Features\n');
    
    // Test Portuguese error messages
    try {
      const response = await fetch(`${API_BASE_URL}/events/nonexistent`, {
        headers: { 'Accept-Language': 'pt' }
      });
      const data = await response.json();
      
      if (data.error?.message?.includes('não encontrado')) {
        console.log('✅ Portuguese error messages: Working');
      } else {
        console.log('❌ Portuguese error messages: Not working');
      }
    } catch (error) {
      console.log('❌ Error message testing failed');
    }
    
    // Test cultural context in responses
    try {
      const response = await fetch(`${API_BASE_URL}/community?action=overview`);
      const data = await response.json();
      
      if (data.culturalContext === 'portuguese-speaking-community') {
        console.log('✅ Cultural context validation: Working');
      } else {
        console.log('❌ Cultural context validation: Missing');
      }
    } catch (error) {
      console.log('❌ Cultural context testing failed');
    }
    
    console.log('\n');
  }
}

// Run tests
async function main() {
  const tester = new PortugueseApiTester();
  
  await tester.runAllTests();
  await tester.testCommunityFeatures();
}

// Export for potential use in other scripts
export { PortugueseApiTester, API_TESTS };

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}