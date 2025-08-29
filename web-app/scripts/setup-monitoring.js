#!/usr/bin/env node

/**
 * Performance Monitoring Setup Script for Portuguese Community Platform
 * 
 * Initializes comprehensive monitoring infrastructure with Portuguese community
 * specific metrics, cultural authenticity tracking, and mobile performance monitoring.
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

class MonitoringSetup {
  constructor() {
    this.rootDir = process.cwd();
    this.configDir = path.join(this.rootDir, 'src', 'config');
    this.apiDir = path.join(this.rootDir, 'src', 'app', 'api');
    
    console.log('🇵🇹 Portuguese Community Platform - Monitoring Setup');
    console.log('====================================================');
  }

  async initialize() {
    try {
      console.log('\n📊 Initializing monitoring infrastructure...');
      
      await this.createDirectories();
      await this.setupEnvironmentVariables();
      await this.validateConfiguration();
      await this.setupAlerts();
      
      console.log('\n✅ Monitoring setup completed successfully!');
      console.log('\n📋 Next steps:');
      console.log('   1. Access monitoring dashboard: /monitoring');
      console.log('   2. Configure Sentry DSN in .env.local');
      console.log('   3. Set up alerting channels (email, Slack, etc.)');
      console.log('   4. Review Portuguese community metrics configuration');
      
    } catch (error) {
      console.error('\n❌ Monitoring setup failed:', error.message);
      process.exit(1);
    }
  }

  async createDirectories() {
    const directories = [
      path.join(this.apiDir, 'monitoring', 'dashboard'),
      path.join(this.apiDir, 'monitoring', 'errors'),
      path.join(this.apiDir, 'monitoring', 'performance'), 
      path.join(this.apiDir, 'monitoring', 'health'),
      path.join(this.apiDir, 'monitoring', 'incident'),
      path.join(this.rootDir, 'src', 'lib', 'monitoring'),
      path.join(this.rootDir, 'logs', 'monitoring')
    ];

    for (const dir of directories) {
      try {
        await fs.mkdir(dir, { recursive: true });
        console.log(`   ✓ Created directory: ${path.relative(this.rootDir, dir)}`);
      } catch (error) {
        if (error.code !== 'EEXIST') {
          throw error;
        }
      }
    }
  }

  async setupEnvironmentVariables() {
    console.log('\n🔧 Setting up environment variables...');
    
    const monitoringEnvPath = path.join(this.rootDir, '.env.monitoring');
    const monitoringEnv = `
# Portuguese Community Platform - Monitoring Configuration
# Generated: ${new Date().toISOString()}

# Sentry Configuration
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_ENVIRONMENT=development
SENTRY_RELEASE=

# Monitoring Features
NEXT_PUBLIC_MONITORING_ENABLED=true
NEXT_PUBLIC_PERFORMANCE_MONITORING=true
NEXT_PUBLIC_ERROR_TRACKING=true
NEXT_PUBLIC_ANALYTICS_ENABLED=true

# Portuguese Community Metrics
NEXT_PUBLIC_CULTURAL_AUTHENTICITY_TRACKING=true
NEXT_PUBLIC_PALOP_NATION_ANALYTICS=true
NEXT_PUBLIC_BILINGUAL_USAGE_TRACKING=true
NEXT_PUBLIC_MOBILE_PERFORMANCE_FOCUS=true

# Alert Configuration
MONITORING_ALERTS_ENABLED=true
MONITORING_EMAIL_ALERTS=
MONITORING_SLACK_WEBHOOK=

# Performance Thresholds
MONITORING_RESPONSE_TIME_THRESHOLD=2000
MONITORING_ERROR_RATE_THRESHOLD=5
MONITORING_AVAILABILITY_THRESHOLD=95
MONITORING_MOBILE_LCP_THRESHOLD=2500

# Portuguese Community Specific
MONITORING_CULTURAL_SCORE_THRESHOLD=8.0
MONITORING_PORTUGUESE_ENGAGEMENT_THRESHOLD=70
MONITORING_BUSINESS_DISCOVERY_THRESHOLD=75
`.trim();

    try {
      await fs.writeFile(monitoringEnvPath, monitoringEnv);
      console.log('   ✓ Created .env.monitoring configuration');
      
      // Update main .env.example if it exists
      const envExamplePath = path.join(this.rootDir, '.env.example');
      try {
        let envExample = await fs.readFile(envExamplePath, 'utf8');
        if (!envExample.includes('NEXT_PUBLIC_SENTRY_DSN')) {
          envExample += '\n\n# Monitoring Configuration (see .env.monitoring for full setup)\nNEXT_PUBLIC_SENTRY_DSN=\nNEXT_PUBLIC_MONITORING_ENABLED=true\n';
          await fs.writeFile(envExamplePath, envExample);
          console.log('   ✓ Updated .env.example with monitoring variables');
        }
      } catch (error) {
        console.log('   ⚠ Could not update .env.example (file may not exist)');
      }
      
    } catch (error) {
      console.error('   ❌ Failed to create monitoring environment:', error.message);
    }
  }

  async validateConfiguration() {
    console.log('\n🔍 Validating monitoring configuration...');
    
    const configChecks = [
      {
        name: 'Error Monitoring Config',
        path: path.join(this.configDir, 'error-monitoring.ts'),
        check: async (filePath) => {
          const content = await fs.readFile(filePath, 'utf8');
          return content.includes('ERROR_MONITORING') && content.includes('PORTUGUESE_ERROR_CONTEXTS');
        }
      },
      {
        name: 'Monitoring Components',
        path: path.join(this.rootDir, 'src', 'components', 'monitoring'),
        check: async (dirPath) => {
          const files = await fs.readdir(dirPath);
          return files.includes('PerformanceMonitoringDashboard.tsx') && 
                 files.includes('CommunityAnalyticsDashboard.tsx');
        }
      },
      {
        name: 'Monitoring Page Route',
        path: path.join(this.rootDir, 'src', 'app', 'monitoring', 'page.tsx'),
        check: async (filePath) => {
          const content = await fs.readFile(filePath, 'utf8');
          return content.includes('MonitoringDashboard');
        }
      }
    ];

    for (const check of configChecks) {
      try {
        const isValid = await check.check(check.path);
        if (isValid) {
          console.log(`   ✓ ${check.name}`);
        } else {
          console.log(`   ⚠ ${check.name} - Configuration incomplete`);
        }
      } catch (error) {
        console.log(`   ❌ ${check.name} - File not found or invalid`);
      }
    }
  }

  async setupAlerts() {
    console.log('\n🚨 Setting up alert system...');
    
    const alertConfigPath = path.join(this.configDir, 'monitoring-alerts.ts');
    const alertConfig = `
/**
 * Monitoring Alerts Configuration for Portuguese Community Platform
 * Generated: ${new Date().toISOString()}
 */

export const ALERT_CONFIG = {
  enabled: process.env.MONITORING_ALERTS_ENABLED === 'true',
  
  // Portuguese Community Critical Alerts
  community_alerts: {
    cultural_authenticity_degradation: {
      threshold: 8.0,
      enabled: true,
      channels: ['email', 'console'],
      bilingual_notification: true
    },
    business_directory_performance: {
      threshold: 1000, // ms
      enabled: true,
      channels: ['console'],
      portuguese_business_priority: true
    },
    mobile_performance_degradation: {
      threshold: 2500, // LCP ms
      enabled: true,
      channels: ['email', 'console'],
      mobile_heavy_community_focus: true
    }
  },
  
  // Standard Platform Alerts
  platform_alerts: {
    high_error_rate: {
      threshold: 5, // percentage
      enabled: true,
      channels: ['email', 'console']
    },
    slow_response_time: {
      threshold: 2000, // ms
      enabled: true,
      channels: ['console']
    },
    low_availability: {
      threshold: 95, // percentage
      enabled: true,
      channels: ['email', 'console']
    }
  },
  
  // Alert Channels Configuration
  channels: {
    console: { enabled: true },
    email: { 
      enabled: !!process.env.MONITORING_EMAIL_ALERTS,
      recipients: process.env.MONITORING_EMAIL_ALERTS?.split(',') || []
    },
    slack: {
      enabled: !!process.env.MONITORING_SLACK_WEBHOOK,
      webhook: process.env.MONITORING_SLACK_WEBHOOK
    }
  }
} as const;
`.trim();

    try {
      await fs.writeFile(alertConfigPath, alertConfig);
      console.log('   ✓ Created monitoring alerts configuration');
    } catch (error) {
      console.error('   ❌ Failed to create alerts configuration:', error.message);
    }
  }
}

// Run the monitoring setup
if (require.main === module) {
  const setup = new MonitoringSetup();
  setup.initialize().catch(error => {
    console.error('Monitoring setup failed:', error);
    process.exit(1);
  });
}

module.exports = MonitoringSetup;