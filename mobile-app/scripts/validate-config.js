#!/usr/bin/env node

/**
 * Mobile App Configuration Validation Script
 * 
 * Validates that all required configuration items are present
 * and properly configured following LusoTown's zero hardcoding policy.
 */

const path = require('path');
const fs = require('fs');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  title: (msg) => console.log(`${colors.bold}${colors.blue}\n${msg}${colors.reset}`),
};

// Required configuration items
const REQUIRED_CONFIG_ITEMS = [
  'MOBILE_CONFIG',
  'PORTUGUESE_COLORS',
  'SUBSCRIPTION_PLANS',
  'CONTACT_INFO',
  'CULTURAL_SYMBOLS',
  'HERITAGE_FLAGS',
  'APP_CONFIG',
  'DEMO_CREDENTIALS',
  'API_CONFIG',
  'MOBILE_UX_CONFIG',
  'MOBILE_FEATURE_FLAGS',
];

// Environment variables that should not be hardcoded
const ENVIRONMENT_VARIABLES = [
  'EXPO_PUBLIC_SUPABASE_URL',
  'EXPO_PUBLIC_SUPABASE_ANON_KEY',
  'EXPO_PUBLIC_API_URL',
  'EXPO_PUBLIC_CONTACT_EMAIL',
  'EXPO_PUBLIC_SUPPORT_EMAIL',
  'EXPO_PUBLIC_DEMO_EMAIL',
  'EXPO_PUBLIC_TOTAL_MEMBERS',
  'EXPO_PUBLIC_TOTAL_STUDENTS',
];

// URLs that should use environment variables
const URL_PATTERNS = [
  /https?:\/\/[^"'\s]+/g, // Basic URL pattern
];

async function validateConfiguration() {
  log.title('🇵🇹 LusoTown Mobile App Configuration Validation');
  
  let errors = 0;
  let warnings = 0;
  let success = 0;

  // 1. Check if config file exists
  const configPath = path.join(__dirname, '../src/config/index.ts');
  if (!fs.existsSync(configPath)) {
    log.error('Configuration file not found: src/config/index.ts');
    process.exit(1);
  }
  
  log.success('Configuration file found');

  // 2. Import and validate configuration
  try {
    // We need to compile TypeScript to JavaScript for validation
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    // Check for required exports
    for (const item of REQUIRED_CONFIG_ITEMS) {
      if (configContent.includes(`export const ${item}`)) {
        log.success(`${item} configuration found`);
        success++;
      } else {
        log.error(`Missing required configuration: ${item}`);
        errors++;
      }
    }

    // 3. Check for hardcoded URLs
    const hardcodedUrls = [];
    const matches = configContent.matchAll(/https?:\/\/[^"'\s)]+/g);
    for (const match of matches) {
      const url = match[0];
      // Skip if it's in a comment or is a fallback with environment variable
      if (!url.includes('process.env') && !match.input.slice(0, match.index).includes('//')) {
        hardcodedUrls.push({
          url,
          line: configContent.slice(0, match.index).split('\n').length,
        });
      }
    }

    if (hardcodedUrls.length > 0) {
      log.warning('Potential hardcoded URLs found:');
      hardcodedUrls.forEach(({ url, line }) => {
        log.warning(`  Line ${line}: ${url}`);
      });
      warnings += hardcodedUrls.length;
    } else {
      log.success('No hardcoded URLs found');
      success++;
    }

    // 4. Check environment variable usage
    const envVarUsage = ENVIRONMENT_VARIABLES.filter(envVar => 
      configContent.includes(`process.env.${envVar}`)
    );

    if (envVarUsage.length > 0) {
      log.success(`Environment variables used: ${envVarUsage.length}/${ENVIRONMENT_VARIABLES.length}`);
      success++;
    } else {
      log.warning('No environment variables detected');
      warnings++;
    }

    // 5. Check Portuguese cultural elements
    const culturalElements = [
      'PORTUGUESE_COLORS',
      'CULTURAL_SYMBOLS',
      'HERITAGE_FLAGS',
      'LUSOPHONE_COUNTRIES',
    ];

    const foundCultural = culturalElements.filter(element =>
      configContent.includes(element)
    );

    if (foundCultural.length === culturalElements.length) {
      log.success('All Portuguese cultural elements found');
      success++;
    } else {
      log.error(`Missing cultural elements: ${culturalElements.filter(e => !foundCultural.includes(e)).join(', ')}`);
      errors++;
    }

    // 6. Validate .env.example
    const envExamplePath = path.join(__dirname, '../.env.example');
    if (fs.existsSync(envExamplePath)) {
      const envContent = fs.readFileSync(envExamplePath, 'utf8');
      const envVarsInExample = ENVIRONMENT_VARIABLES.filter(envVar =>
        envContent.includes(envVar.replace('EXPO_PUBLIC_', 'EXPO_PUBLIC_'))
      );

      if (envVarsInExample.length >= ENVIRONMENT_VARIABLES.length * 0.8) {
        log.success('Environment example file is comprehensive');
        success++;
      } else {
        log.warning('Environment example file could be more comprehensive');
        warnings++;
      }
    } else {
      log.warning('No .env.example file found');
      warnings++;
    }

    // 7. Check constants integration
    const stylesPath = path.join(__dirname, '../src/constants/Styles.js');
    if (fs.existsSync(stylesPath)) {
      const stylesContent = fs.readFileSync(stylesPath, 'utf8');
      if (stylesContent.includes("from '../config'")) {
        log.success('Constants properly integrated with config system');
        success++;
      } else {
        log.warning('Constants not fully integrated with config system');
        warnings++;
      }
    }

  } catch (error) {
    log.error(`Failed to validate configuration: ${error.message}`);
    errors++;
  }

  // Summary
  log.title('Validation Summary');
  log.info(`✅ Passed: ${success} items`);
  
  if (warnings > 0) {
    log.warning(`⚠️  Warnings: ${warnings} items`);
  }
  
  if (errors > 0) {
    log.error(`❌ Errors: ${errors} items`);
    log.info('\nTo fix errors:');
    log.info('1. Add missing configuration exports in src/config/index.ts');
    log.info('2. Replace hardcoded values with environment variables');
    log.info('3. Import configuration values instead of hardcoding');
    log.info('4. Follow the web app configuration patterns');
    process.exit(1);
  } else {
    log.success('\n🎉 All critical validations passed!');
    log.info('Mobile app configuration follows LusoTown zero hardcoding policy');
    
    if (warnings > 0) {
      log.info('\nConsider addressing warnings for optimal configuration');
    }
  }
}

// Run validation
validateConfiguration().catch(error => {
  log.error(`Validation failed: ${error.message}`);
  process.exit(1);
});