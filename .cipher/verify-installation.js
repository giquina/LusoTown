#!/usr/bin/env node

/**
 * LusoTown Cipher Configuration Verification Script
 * Verifies that Cipher memory system is properly configured for Portuguese-speaking community platform
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 LusoTown Cipher Configuration Verification\n');

// Check if we're in the correct directory
const projectRoot = '/workspaces/LusoTown';
const currentDir = process.cwd();

if (!currentDir.includes(projectRoot)) {
  console.log(`📁 Current directory: ${currentDir}`);
  console.log(`📂 Expected project root: ${projectRoot}`);
  process.chdir(projectRoot);
  console.log(`✅ Changed to project root: ${projectRoot}\n`);
}

// Verification checklist
const verificationResults = [];

function checkItem(description, checkFunction) {
  try {
    const result = checkFunction();
    verificationResults.push({ description, status: '✅', detail: result });
    console.log(`✅ ${description}: ${result}`);
  } catch (error) {
    verificationResults.push({ description, status: '❌', detail: error.message });
    console.log(`❌ ${description}: ${error.message}`);
  }
}

console.log('🔧 Cipher Installation Checks:\n');

// Check 1: Cipher CLI availability
checkItem('Cipher CLI Installation', () => {
  const result = execSync('which cipher', { encoding: 'utf8' }).trim();
  return result || 'Not found';
});

// Check 2: Cipher version
checkItem('Cipher Version', () => {
  const result = execSync('cipher --version', { encoding: 'utf8' }).trim();
  return result || 'Unknown';
});

console.log('\n📁 Configuration File Checks:\n');

// Check 3: Main configuration file
checkItem('Main Agent Configuration (cipher.yml)', () => {
  const configPath = path.join(projectRoot, 'memAgent', 'cipher.yml');
  if (!fs.existsSync(configPath)) throw new Error('File not found');
  const config = fs.readFileSync(configPath, 'utf8');
  if (!config.includes('LusoTown')) throw new Error('Missing LusoTown configuration');
  if (!config.includes('Portuguese-speaking-community-platform')) throw new Error('Missing cultural context');
  return `Found (${Math.round(config.length / 1024)}KB)`;
});

// Check 4: Project context configuration
checkItem('Project Context Configuration (config.json)', () => {
  const configPath = path.join(projectRoot, '.cipher', 'config.json');
  if (!fs.existsSync(configPath)) throw new Error('File not found');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  if (!config.projectName || config.projectName !== 'LusoTown') throw new Error('Missing project name');
  if (!config.culturalContext) throw new Error('Missing cultural context');
  return `Valid JSON (${Object.keys(config).length} sections)`;
});

// Check 5: Portuguese cultural context
checkItem('Portuguese Cultural Context', () => {
  const contextPath = path.join(projectRoot, '.cipher', 'portuguese-cultural-context.md');
  if (!fs.existsSync(contextPath)) throw new Error('File not found');
  const content = fs.readFileSync(contextPath, 'utf8');
  if (!content.includes('Portuguese-speaking community')) throw new Error('Missing cultural guidelines');
  if (!content.includes('lusophone nations')) throw new Error('Missing diversity requirements');
  return `Complete (${Math.round(content.length / 1024)}KB)`;
});

// Check 6: Memory capture summary
checkItem('Memory Capture Summary', () => {
  const capturePath = path.join(projectRoot, '.cipher', 'memory-capture.md');
  if (!fs.existsSync(capturePath)) throw new Error('File not found');
  const content = fs.readFileSync(capturePath, 'utf8');
  if (!content.includes('COMPLETED')) throw new Error('Memory capture not completed');
  return 'Initialization completed';
});

console.log('\n🎯 LusoTown-Specific Context Checks:\n');

// Check 7: Project structure validation
checkItem('Web App Directory Structure', () => {
  const webAppPath = path.join(projectRoot, 'web-app');
  if (!fs.existsSync(webAppPath)) throw new Error('web-app directory not found');
  
  const configPath = path.join(webAppPath, 'src', 'config');
  if (!fs.existsSync(configPath)) throw new Error('config directory not found');
  
  const componentsPath = path.join(webAppPath, 'src', 'components');
  if (!fs.existsSync(componentsPath)) throw new Error('components directory not found');
  
  return 'Valid Next.js 14 structure';
});

// Check 8: Package.json validation
checkItem('Package.json Configuration', () => {
  const packagePath = path.join(projectRoot, 'web-app', 'package.json');
  if (!fs.existsSync(packagePath)) throw new Error('package.json not found');
  
  const package = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  if (!package.scripts || !package.scripts['audit:hardcoding']) {
    throw new Error('Missing hardcoding audit script');
  }
  
  return `Found scripts: ${Object.keys(package.scripts).length}`;
});

// Check 9: Cultural guidelines validation
checkItem('Community Guidelines Configuration', () => {
  const guidelinesPath = path.join(projectRoot, 'web-app', 'src', 'config', 'community-guidelines.ts');
  if (!fs.existsSync(guidelinesPath)) throw new Error('community-guidelines.ts not found');
  
  const content = fs.readFileSync(guidelinesPath, 'utf8');
  if (!content.includes('Portuguese-speaking')) throw new Error('Missing Portuguese-speaking terminology');
  
  return 'Cultural authenticity guidelines found';
});

console.log('\n📊 Configuration Summary:\n');

// Summary statistics
const totalChecks = verificationResults.length;
const passedChecks = verificationResults.filter(r => r.status === '✅').length;
const failedChecks = verificationResults.filter(r => r.status === '❌').length;

console.log(`Total Checks: ${totalChecks}`);
console.log(`✅ Passed: ${passedChecks}`);
console.log(`❌ Failed: ${failedChecks}`);
console.log(`🎯 Success Rate: ${Math.round((passedChecks / totalChecks) * 100)}%`);

if (failedChecks === 0) {
  console.log('\n🎉 All checks passed! Cipher is properly configured for LusoTown development.');
  console.log('\n📋 Memory Context Available:');
  console.log('   • Portuguese cultural authenticity guidelines');
  console.log('   • Mobile-first development patterns');
  console.log('   • Zero-hardcoding configuration management');
  console.log('   • Bilingual EN/PT translation framework');
  console.log('   • Testing strategies for Portuguese community');
  console.log('\n🚀 Ready for cross-instance coordination with shared memory contexts.');
} else {
  console.log('\n⚠️  Some issues found. Please review failed checks above.');
}

console.log('\n🔗 Next Steps:');
console.log('   1. Use shared memory contexts for consistent development');
console.log('   2. Reference Portuguese cultural guidelines in all implementations');
console.log('   3. Enforce zero-hardcoding policy with config imports');
console.log('   4. Prioritize mobile-first design for Portuguese-speaking users');
console.log('   5. Maintain bilingual EN/PT functionality');

console.log('\n📞 Demo Access:');
console.log('   Email: demo@lusotown.com');
console.log('   Password: LusoTown2025!');
console.log('   Development: cd web-app && npm run dev');

process.exit(failedChecks === 0 ? 0 : 1);