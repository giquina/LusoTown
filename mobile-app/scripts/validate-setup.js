#!/usr/bin/env node

/**
 * LusoTown Mobile Setup Validation Script
 * Validates React Native development environment and Portuguese cultural integration
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class MobileSetupValidator {
  constructor() {
    this.results = [];
    this.errors = [];
    this.warnings = [];
  }

  log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
  }

  success(message) {
    this.log(`✅ ${message}`, colors.green);
    this.results.push({ type: 'success', message });
  }

  error(message) {
    this.log(`❌ ${message}`, colors.red);
    this.errors.push(message);
    this.results.push({ type: 'error', message });
  }

  warning(message) {
    this.log(`⚠️  ${message}`, colors.yellow);
    this.warnings.push(message);
    this.results.push({ type: 'warning', message });
  }

  info(message) {
    this.log(`ℹ️  ${message}`, colors.blue);
  }

  async run() {
    this.log(`\n${colors.bold}${colors.cyan}🇵🇹 LusoTown Mobile Setup Validation${colors.reset}\n`);

    // Validate environment
    await this.validateNodeEnvironment();
    await this.validateExpoSetup();
    await this.validateProjectStructure();
    await this.validatePortugueseCulturalIntegration();
    await this.validateMobileConfiguration();
    await this.validateTestingSetup();
    await this.validateBuildSystem();

    this.printSummary();
    
    // Exit with appropriate code
    if (this.errors.length > 0) {
      process.exit(1);
    }
  }

  async validateNodeEnvironment() {
    this.info('Validating Node.js environment...');

    try {
      // Check Node.js version
      const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
      const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
      
      const nodeVersionNum = parseInt(nodeVersion.replace('v', '').split('.')[0]);
      const npmVersionNum = parseInt(npmVersion.split('.')[0]);

      if (nodeVersionNum >= 18) {
        this.success(`Node.js ${nodeVersion} (✓ >= v18 required)`);
      } else {
        this.error(`Node.js ${nodeVersion} (✗ v18+ required, please upgrade)`);
      }

      if (npmVersionNum >= 8) {
        this.success(`npm ${npmVersion} (✓ >= v8 required)`);
      } else {
        this.error(`npm ${npmVersion} (✗ v8+ required, please upgrade)`);
      }
    } catch (error) {
      this.error('Node.js or npm not installed');
    }
  }

  async validateExpoSetup() {
    this.info('Validating Expo development environment...');

    try {
      // Check Expo CLI
      const expoVersion = execSync('expo --version', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
      this.success(`Expo CLI ${expoVersion} installed`);
    } catch (error) {
      this.error('Expo CLI not installed. Run: npm install -g @expo/cli');
    }

    try {
      // Check EAS CLI
      const easVersion = execSync('eas --version', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
      this.success(`EAS CLI ${easVersion} installed`);
    } catch (error) {
      this.warning('EAS CLI not installed. Run: npm install -g eas-cli (needed for builds)');
    }

    // Check for iOS Simulator (macOS only)
    if (process.platform === 'darwin') {
      try {
        execSync('xcrun simctl list devices', { stdio: 'ignore' });
        this.success('iOS Simulator available');
      } catch (error) {
        this.warning('iOS Simulator not available (install Xcode for iOS development)');
      }
    }

    // Check for Android SDK
    if (process.env.ANDROID_HOME) {
      this.success(`Android SDK found at ${process.env.ANDROID_HOME}`);
    } else {
      this.warning('ANDROID_HOME not set (install Android Studio for Android development)');
    }
  }

  async validateProjectStructure() {
    this.info('Validating project structure...');

    const requiredFiles = [
      'package.json',
      'app.config.js',
      'tsconfig.json',
      'eas.json',
      'src/navigation/AppNavigator.tsx',
      'src/i18n/index.ts',
      'src/config/index.ts',
      'src/constants/Styles.js'
    ];

    const requiredDirectories = [
      'src/components',
      'src/screens',
      'src/navigation',
      'src/i18n',
      'src/config',
      'src/constants',
      'assets'
    ];

    for (const file of requiredFiles) {
      if (fs.existsSync(path.join(process.cwd(), file))) {
        this.success(`Required file: ${file}`);
      } else {
        this.error(`Missing required file: ${file}`);
      }
    }

    for (const dir of requiredDirectories) {
      if (fs.existsSync(path.join(process.cwd(), dir))) {
        this.success(`Required directory: ${dir}`);
      } else {
        this.error(`Missing required directory: ${dir}`);
      }
    }
  }

  async validatePortugueseCulturalIntegration() {
    this.info('Validating Portuguese cultural integration...');

    // Check i18n files
    const enFile = path.join(process.cwd(), 'src/i18n/en.json');
    const ptFile = path.join(process.cwd(), 'src/i18n/pt.json');

    if (fs.existsSync(enFile)) {
      this.success('English translations available');
    } else {
      this.error('Missing English translations file: src/i18n/en.json');
    }

    if (fs.existsSync(ptFile)) {
      this.success('Portuguese translations available');
    } else {
      this.error('Missing Portuguese translations file: src/i18n/pt.json');
    }

    // Check Portuguese colors in styles
    const stylesFile = path.join(process.cwd(), 'src/constants/Styles.js');
    if (fs.existsSync(stylesFile)) {
      const stylesContent = fs.readFileSync(stylesFile, 'utf8');
      
      if (stylesContent.includes('Portuguese flag red') && stylesContent.includes('Portuguese flag green')) {
        this.success('Portuguese heritage colors configured');
      } else {
        this.error('Portuguese cultural colors not properly configured in Styles.js');
      }
      
      if (stylesContent.includes('#FF0000') && stylesContent.includes('#00A859')) {
        this.success('Portuguese flag colors defined');
      } else {
        this.error('Portuguese flag colors missing from color system');
      }
    }

    // Check app.config.js for cultural settings
    const appConfigFile = path.join(process.cwd(), 'app.config.js');
    if (fs.existsSync(appConfigFile)) {
      const appConfigContent = fs.readFileSync(appConfigFile, 'utf8');
      
      if (appConfigContent.includes('#D4A574') || appConfigContent.includes('Portuguese heritage gold')) {
        this.success('Portuguese heritage gold configured in app.config.js');
      } else {
        this.warning('Consider using Portuguese heritage colors in app.config.js');
      }
    }
  }

  async validateMobileConfiguration() {
    this.info('Validating mobile configuration system...');

    const configFile = path.join(process.cwd(), 'src/config/index.ts');
    if (fs.existsSync(configFile)) {
      const configContent = fs.readFileSync(configFile, 'utf8');
      
      if (configContent.includes('MOBILE_CONFIG')) {
        this.success('MOBILE_CONFIG defined');
      } else {
        this.error('MOBILE_CONFIG missing from configuration');
      }
      
      if (configContent.includes('PORTUGUESE_COLORS')) {
        this.success('PORTUGUESE_COLORS configuration available');
      } else {
        this.error('PORTUGUESE_COLORS missing from configuration');
      }
      
      if (configContent.includes('SUBSCRIPTION_PLANS')) {
        this.success('SUBSCRIPTION_PLANS configuration available');
      } else {
        this.error('SUBSCRIPTION_PLANS missing from configuration');
      }
      
      if (configContent.includes('CONTACT_INFO')) {
        this.success('CONTACT_INFO configuration available');
      } else {
        this.error('CONTACT_INFO missing from configuration');
      }

      // Check for hardcoding violations
      if (configContent.includes('lusotown.com') && !configContent.includes('process.env')) {
        this.warning('Possible hardcoded URL in configuration (should use environment variables)');
      }
    } else {
      this.error('Configuration file missing: src/config/index.ts');
    }
  }

  async validateTestingSetup() {
    this.info('Validating testing setup...');

    const jestConfig = this.checkPackageJsonKey('jest');
    if (jestConfig) {
      this.success('Jest configuration found');
    } else {
      this.error('Jest configuration missing from package.json');
    }

    // Check for test directories
    const testDirs = ['__tests__', 'src/__tests__'];
    let testDirFound = false;
    
    for (const dir of testDirs) {
      if (fs.existsSync(path.join(process.cwd(), dir))) {
        this.success(`Test directory found: ${dir}`);
        testDirFound = true;
        break;
      }
    }
    
    if (!testDirFound) {
      this.warning('No test directory found (__tests__ or src/__tests__)');
    }

    // Check for testing libraries in dependencies
    const testingLibraries = [
      '@testing-library/react-native',
      'jest-expo',
      'react-test-renderer'
    ];

    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };

    testingLibraries.forEach(lib => {
      if (allDeps[lib]) {
        this.success(`Testing library installed: ${lib}`);
      } else {
        this.warning(`Testing library missing: ${lib}`);
      }
    });
  }

  async validateBuildSystem() {
    this.info('Validating build system...');

    // Check EAS configuration
    if (fs.existsSync('eas.json')) {
      this.success('EAS build configuration found');
      
      const easConfig = JSON.parse(fs.readFileSync('eas.json', 'utf8'));
      if (easConfig.build && easConfig.build.development && easConfig.build.production) {
        this.success('EAS build profiles configured (development, production)');
      } else {
        this.warning('EAS build profiles incomplete');
      }
    } else {
      this.warning('EAS build configuration missing (eas.json)');
    }

    // Check TypeScript configuration
    if (fs.existsSync('tsconfig.json')) {
      this.success('TypeScript configuration found');
      
      const tsConfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
      if (tsConfig.compilerOptions && tsConfig.compilerOptions.paths) {
        this.success('TypeScript path mapping configured');
      } else {
        this.warning('TypeScript path mapping not configured');
      }
    } else {
      this.error('TypeScript configuration missing (tsconfig.json)');
    }
  }

  checkPackageJsonKey(key) {
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return packageJson[key];
    } catch (error) {
      return null;
    }
  }

  printSummary() {
    this.log(`\n${colors.bold}${colors.cyan}📊 Validation Summary${colors.reset}\n`);
    
    const successCount = this.results.filter(r => r.type === 'success').length;
    const errorCount = this.errors.length;
    const warningCount = this.warnings.length;

    this.log(`${colors.green}✅ Passed: ${successCount}${colors.reset}`);
    this.log(`${colors.red}❌ Errors: ${errorCount}${colors.reset}`);
    this.log(`${colors.yellow}⚠️  Warnings: ${warningCount}${colors.reset}\n`);

    if (errorCount === 0 && warningCount === 0) {
      this.log(`${colors.bold}${colors.green}🎉 Perfect! LusoTown mobile setup is complete and ready for development.${colors.reset}`);
      this.log(`${colors.blue}Next steps:${colors.reset}`);
      this.log(`  • Run ${colors.bold}npm start${colors.reset} to start development server`);
      this.log(`  • Press ${colors.bold}i${colors.reset} for iOS Simulator`);
      this.log(`  • Press ${colors.bold}a${colors.reset} for Android Emulator`);
      this.log(`  • Press ${colors.bold}w${colors.reset} for web browser\n`);
    } else if (errorCount === 0) {
      this.log(`${colors.bold}${colors.yellow}✅ Setup is functional with minor warnings.${colors.reset}`);
      this.log(`${colors.blue}Consider addressing warnings for optimal development experience.\n`);
    } else {
      this.log(`${colors.bold}${colors.red}❌ Setup has critical errors that need to be fixed.${colors.reset}`);
      this.log(`${colors.blue}Please resolve all errors before continuing with development.\n`);
    }

    this.log(`${colors.cyan}🇵🇹 LusoTown - Connecting the Portuguese-speaking community across the United Kingdom${colors.reset}\n`);
  }
}

// Run validation
if (require.main === module) {
  const validator = new MobileSetupValidator();
  validator.run().catch(error => {
    console.error(`${colors.red}Validation failed: ${error.message}${colors.reset}`);
    process.exit(1);
  });
}

module.exports = MobileSetupValidator;