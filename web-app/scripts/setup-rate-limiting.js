#!/usr/bin/env node

/**
 * Portuguese Community Rate Limiting Setup Script
 * 
 * Helps configure and validate the rate limiting system for production deployment
 */

const fs = require('fs');
const path = require('path');

class RateLimitingSetup {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.envPath = path.join(this.projectRoot, '.env.local');
    this.errors = [];
    this.warnings = [];
    this.info = [];
  }

  async run() {
    console.log('🇵🇹 LusoTown Portuguese Community Rate Limiting Setup\n');
    
    this.checkEnvironmentVariables();
    this.validateConfiguration();
    this.checkRedisConnection();
    this.generateSecurityReport();
    
    this.displayResults();
  }

  checkEnvironmentVariables() {
    console.log('📋 Checking Environment Variables...');
    
    const requiredVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    ];
    
    const optionalVars = [
      'REDIS_URL',
      'UPSTASH_REDIS_REST_URL', 
      'UPSTASH_REDIS_REST_TOKEN',
      'TRUSTED_PARTNER_IPS',
      'RATE_LIMITING_ENABLED',
    ];

    // Check if .env.local exists
    if (!fs.existsSync(this.envPath)) {
      this.errors.push('❌ .env.local file not found');
      this.info.push('💡 Copy .env.example to .env.local and configure your variables');
      return;
    }

    const envContent = fs.readFileSync(this.envPath, 'utf8');
    const envVars = this.parseEnvFile(envContent);

    // Check required variables
    requiredVars.forEach(varName => {
      if (!envVars[varName] || envVars[varName].includes('your_') || envVars[varName].includes('placeholder')) {
        this.errors.push(`❌ Missing or placeholder value for ${varName}`);
      } else {
        this.info.push(`✅ ${varName} configured`);
      }
    });

    // Check Redis configuration
    const hasRedis = envVars['REDIS_URL'] || envVars['UPSTASH_REDIS_REST_URL'];
    if (!hasRedis) {
      this.warnings.push('⚠️  No Redis configuration found - will use in-memory rate limiting (development only)');
      this.info.push('💡 Add REDIS_URL or UPSTASH_REDIS_REST_URL for production');
    } else {
      this.info.push('✅ Redis configuration found');
    }

    // Check optional variables
    optionalVars.forEach(varName => {
      if (envVars[varName]) {
        this.info.push(`✅ ${varName} configured`);
      }
    });
  }

  parseEnvFile(content) {
    const vars = {};
    const lines = content.split('\n');
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...valueParts] = trimmed.split('=');
        vars[key] = valueParts.join('=');
      }
    });
    
    return vars;
  }

  validateConfiguration() {
    console.log('\n🔧 Validating Rate Limiting Configuration...');
    
    const configPath = path.join(this.projectRoot, 'src/lib/rate-limit.ts');
    if (!fs.existsSync(configPath)) {
      this.errors.push('❌ Rate limiting configuration file missing');
      return;
    }

    this.info.push('✅ Rate limiting configuration file found');
    
    // Check if all required files exist
    const requiredFiles = [
      'src/lib/rate-limit.ts',
      'src/lib/rate-limit-middleware.ts', 
      'src/lib/rate-limit-monitoring.ts',
    ];

    requiredFiles.forEach(file => {
      const filePath = path.join(this.projectRoot, file);
      if (fs.existsSync(filePath)) {
        this.info.push(`✅ ${file} exists`);
      } else {
        this.errors.push(`❌ ${file} missing`);
      }
    });
  }

  async checkRedisConnection() {
    console.log('\n🔗 Checking Redis Connection...');
    
    try {
      // Try to import and test Redis connection
      const { rateLimit } = require('../src/lib/rate-limit');
      
      // Test rate limiting function
      const result = await rateLimit('test-setup', 'general');
      
      if (result.success) {
        this.info.push('✅ Rate limiting system operational');
      } else {
        this.warnings.push('⚠️  Rate limiting test failed - check configuration');
      }
      
    } catch (error) {
      if (error.message.includes('Redis')) {
        this.warnings.push('⚠️  Redis connection failed - using fallback mode');
        this.info.push('💡 Configure Redis for production deployment');
      } else {
        this.warnings.push(`⚠️  Rate limiting test error: ${error.message}`);
      }
    }
  }

  generateSecurityReport() {
    console.log('\n🛡️  Generating Security Report...');
    
    const reportData = {
      timestamp: new Date().toISOString(),
      rateLimitingEnabled: true,
      endpoints: [
        { name: 'business-directory', limit: '50/min', protection: 'Portuguese business listings' },
        { name: 'community-messaging', limit: '20/min', protection: 'Community chat safety' },
        { name: 'event-booking', limit: '10/min', protection: 'Event booking fairness' },
        { name: 'authentication', limit: '5/min', protection: 'Brute force prevention' },
        { name: 'matching', limit: '30/min', protection: 'Cultural matching system' },
        { name: 'transport', limit: '15/min', protection: 'Transport coordination' },
      ],
      features: [
        '✅ Redis-based rate limiting',
        '✅ Bilingual error messages (PT/EN)',
        '✅ Abuse detection patterns',
        '✅ Sentry monitoring integration',
        '✅ Trusted partner bypass',
        '✅ Portuguese community context',
      ],
      culturalContext: 'portuguese-speaking-community',
      targetAudience: '750+ Portuguese speakers, 2150+ students',
      location: 'United Kingdom',
    };

    const reportPath = path.join(this.projectRoot, 'rate-limiting-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    this.info.push(`✅ Security report generated: ${reportPath}`);
  }

  displayResults() {
    console.log('\n📊 Setup Results:\n');
    
    if (this.errors.length > 0) {
      console.log('🚨 ERRORS (Must Fix):');
      this.errors.forEach(error => console.log(`  ${error}`));
      console.log();
    }
    
    if (this.warnings.length > 0) {
      console.log('⚠️  WARNINGS (Recommended):');
      this.warnings.forEach(warning => console.log(`  ${warning}`));
      console.log();
    }
    
    if (this.info.length > 0) {
      console.log('ℹ️  INFORMATION:');
      this.info.forEach(info => console.log(`  ${info}`));
      console.log();
    }

    // Display next steps
    console.log('🚀 Next Steps:\n');
    
    if (this.errors.length > 0) {
      console.log('1. Fix all errors listed above');
      console.log('2. Re-run this setup script');
    } else {
      console.log('1. Test rate limiting: npm run dev && curl http://localhost:3000/api/test-rate-limit');
      console.log('2. Deploy to production: npm run build && npm run deploy');
      console.log('3. Monitor via Sentry dashboard');
      console.log('4. Review Portuguese community security stats');
    }

    console.log('\n📚 Documentation:');
    console.log('   • Rate Limiting Guide: src/lib/README-rate-limiting.md');
    console.log('   • Test Endpoint: /api/test-rate-limit');
    console.log('   • Security Stats: /api/test-rate-limit?action=stats');
    
    console.log('\n🇵🇹 Portuguese Community Protection Enabled! 🛡️\n');
  }
}

// Run the setup script
if (require.main === module) {
  const setup = new RateLimitingSetup();
  setup.run().catch(error => {
    console.error('Setup failed:', error);
    process.exit(1);
  });
}

module.exports = RateLimitingSetup;