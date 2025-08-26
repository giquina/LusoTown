#!/usr/bin/env node

/**
 * Mobile Hardcoding Audit Script for LusoTown
 * Ensures zero hardcoding policy compliance in React Native app
 * Based on web app hardcoding audit standards
 */

const fs = require('fs');
const path = require('path');

// Patterns to check for hardcoded values (from web app audit)
const HARDCODED_PATTERNS = [
  // Pricing patterns
  { pattern: /£\d+(\.\d{2})?/, message: "Hardcoded price with £ symbol", severity: "error" },
  { pattern: /\$\d+(\.\d{2})?/, message: "Hardcoded price with $ symbol", severity: "error" },
  { pattern: /€\d+(\.\d{2})?/, message: "Hardcoded price with € symbol", severity: "error" },
  { pattern: /price.*[=:]\s*["']\d+/, message: "Hardcoded price assignment", severity: "error" },
  
  // Contact information
  { pattern: /hello@lusotown\.com/, message: "Hardcoded email address", severity: "error" },
  { pattern: /support@lusotown\.com/, message: "Hardcoded support email", severity: "error" },
  { pattern: /demo@lusotown\.com/, message: "Hardcoded demo email", severity: "error" },
  { pattern: /\+44\s*\d+\s*\d+/, message: "Hardcoded UK phone number", severity: "error" },
  
  // URLs and domains
  { pattern: /https?:\/\/lusotown\.com/, message: "Hardcoded domain URL", severity: "warning" },
  { pattern: /localhost:\d+/, message: "Hardcoded localhost URL", severity: "warning" },
  
  // University names
  { pattern: /(UCL|King's College|Imperial|LSE|Oxford|Cambridge)(?![A-Za-z])/, message: "Hardcoded university name", severity: "error" },
  
  // Portuguese cultural text that should be translated
  { pattern: /"[^"]*português[^"]*"/i, message: "Hardcoded Portuguese text", severity: "warning" },
  { pattern: /"[^"]*comunidade[^"]*"/i, message: "Hardcoded Portuguese text", severity: "warning" },
  
  // Location-specific text
  { pattern: /"[^"]*London[^"]*"/, message: "Hardcoded location reference", severity: "warning" },
  { pattern: /"[^"]*UK[^"]*"/, message: "Hardcoded country reference", severity: "warning" },
  
  // Common hardcoded strings that should use config
  { pattern: /community.*member/i, message: "Should use community config", severity: "warning" },
  { pattern: /subscription.*plan/i, message: "Should use pricing config", severity: "warning" }
];

// Files to ignore
const IGNORE_PATTERNS = [
  'node_modules',
  '.expo',
  '.git',
  'coverage',
  'dist',
  'build',
  '__tests__',
  '.test.',
  '.spec.',
  'hardcoding-audit', // This script itself
  'package.json',
  'app.json',
  '.env',
  'README.md',
  'CHANGELOG.md'
];

// File extensions to check
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];

let totalFiles = 0;
let filesWithIssues = 0;
let totalIssues = 0;
const issues = [];

function shouldIgnoreFile(filePath) {
  return IGNORE_PATTERNS.some(pattern => filePath.includes(pattern));
}

function checkFile(filePath) {
  if (shouldIgnoreFile(filePath)) {
    return;
  }

  if (!FILE_EXTENSIONS.some(ext => filePath.endsWith(ext))) {
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let hasIssues = false;

    lines.forEach((line, lineNumber) => {
      HARDCODED_PATTERNS.forEach(({ pattern, message, severity }) => {
        if (pattern.test(line)) {
          const issue = {
            file: filePath,
            line: lineNumber + 1,
            content: line.trim(),
            message,
            severity,
            pattern: pattern.toString()
          };
          issues.push(issue);
          totalIssues++;
          hasIssues = true;
        }
      });
    });

    totalFiles++;
    if (hasIssues) {
      filesWithIssues++;
    }
  } catch (error) {
    console.warn(`Warning: Could not read file ${filePath}: ${error.message}`);
  }
}

function scanDirectory(dirPath) {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    entries.forEach(entry => {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.isFile()) {
        checkFile(fullPath);
      }
    });
  } catch (error) {
    console.warn(`Warning: Could not scan directory ${dirPath}: ${error.message}`);
  }
}

function formatResults() {
  console.log('\n🔍 LusoTown Mobile App Hardcoding Audit Results\n');
  console.log(`📊 Files scanned: ${totalFiles}`);
  console.log(`⚠️  Files with issues: ${filesWithIssues}`);
  console.log(`🚨 Total issues found: ${totalIssues}\n`);

  if (issues.length === 0) {
    console.log('✅ No hardcoding issues found! Zero hardcoding policy compliance verified.');
    return true;
  }

  // Group issues by severity
  const errorIssues = issues.filter(issue => issue.severity === 'error');
  const warningIssues = issues.filter(issue => issue.severity === 'warning');

  if (errorIssues.length > 0) {
    console.log('🚨 ERRORS (must fix before commit):');
    errorIssues.forEach(issue => {
      console.log(`   ${issue.file}:${issue.line}`);
      console.log(`   ❌ ${issue.message}`);
      console.log(`   💡 Line: ${issue.content}`);
      console.log('');
    });
  }

  if (warningIssues.length > 0) {
    console.log('⚠️  WARNINGS (recommended to fix):');
    warningIssues.forEach(issue => {
      console.log(`   ${issue.file}:${issue.line}`);
      console.log(`   ⚠️  ${issue.message}`);
      console.log(`   💡 Line: ${issue.content}`);
      console.log('');
    });
  }

  console.log('📋 Recommendations:');
  console.log('   • Import values from @lusotown/shared/config files');
  console.log('   • Use translation keys with i18next for user-facing text');
  console.log('   • Store configuration in environment variables');
  console.log('   • Use shared constants for Portuguese cultural content');
  console.log('\n📖 See /shared/config/ for available configuration files\n');

  // Return true if only warnings, false if errors exist
  return errorIssues.length === 0;
}

// Main execution
const startTime = Date.now();
const sourceDir = path.join(__dirname, '../src');

console.log('🔍 Starting LusoTown Mobile App hardcoding audit...');
console.log(`📁 Scanning directory: ${sourceDir}`);

if (fs.existsSync(sourceDir)) {
  scanDirectory(sourceDir);
} else {
  console.error('❌ Source directory not found. Please run from mobile-app root directory.');
  process.exit(1);
}

const endTime = Date.now();
const duration = endTime - startTime;

console.log(`⏱️  Audit completed in ${duration}ms`);

const success = formatResults();

// Exit with error code if critical issues found
if (!success) {
  console.log('❌ Audit failed: Critical hardcoding issues found.');
  console.log('   Please fix all ERROR-level issues before committing.\n');
  process.exit(1);
} else {
  console.log('✅ Mobile app hardcoding audit passed!\n');
  process.exit(0);
}