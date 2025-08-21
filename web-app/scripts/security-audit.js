#!/usr/bin/env node
/**
 * Security Audit Script for LusoTown
 * Scans for hardcoded credentials and security vulnerabilities
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Patterns to check for hardcoded credentials
const SECURITY_PATTERNS = [
  {
    name: 'Hardcoded passwords',
    pattern: /(password|pwd)\s*[=:]\s*['"][a-zA-Z0-9!@#$%^&*]{8,}['"]/i,
    severity: 'CRITICAL'
  },
  {
    name: 'Hardcoded API keys',
    pattern: /(api[_-]?key|secret[_-]?key)\s*[=:]\s*['"][a-zA-Z0-9]{20,}['"]/i,
    severity: 'CRITICAL'
  },
  {
    name: 'Hardcoded email credentials',
    pattern: /demo@lusotown\.com|admin@lusotown\.com/g,
    severity: 'HIGH'
  },
  {
    name: 'Hardcoded Stripe keys',
    pattern: /['"](sk_test_[a-zA-Z0-9]{24,}|pk_test_[a-zA-Z0-9]{24,})['"]/g,
    severity: 'CRITICAL'
  },
  {
    name: 'Demo passwords',
    pattern: /LusoTown2025!/g,
    severity: 'HIGH'
  }
];

// Files to scan
const SCAN_DIRECTORIES = [
  'src',
  'pages'
];

// Files to exclude
const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.next/,
  /\.git/,
  /coverage/,
  /\.md$/,
  /\.json$/
];

function scanFile(filePath) {
  const results = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    SECURITY_PATTERNS.forEach(({ name, pattern, severity }) => {
      const matches = content.match(pattern);
      if (matches) {
        results.push({
          file: filePath,
          pattern: name,
          severity,
          matches: matches.slice(0, 3) // Limit to first 3 matches
        });
      }
    });
  } catch (error) {
    // Skip binary files or files that can't be read
    return [];
  }
  
  return results;
}

function scanDirectory(dirPath) {
  const results = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      
      // Skip excluded patterns
      if (EXCLUDE_PATTERNS.some(pattern => pattern.test(fullPath))) {
        continue;
      }
      
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        results.push(...scanDirectory(fullPath));
      } else if (stat.isFile()) {
        results.push(...scanFile(fullPath));
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not scan directory ${dirPath}: ${error.message}`);
  }
  
  return results;
}

function main() {
  console.log('🔍 LusoTown Security Audit Starting...');
  console.log('=====================================\n');
  
  let allResults = [];
  
  // Scan specified directories
  SCAN_DIRECTORIES.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    
    if (fs.existsSync(dirPath)) {
      console.log(`📂 Scanning ${dir}/...`);
      const results = scanDirectory(dirPath);
      allResults.push(...results);
    } else {
      console.log(`⚠️  Directory ${dir}/ not found, skipping...`);
    }
  });
  
  // Report results
  console.log('\n📊 Security Audit Results');
  console.log('==========================\n');
  
  if (allResults.length === 0) {
    console.log('✅ No hardcoded credentials found!');
    console.log('✅ Security audit passed!');
    return;
  }
  
  // Group by severity
  const groupedResults = {
    CRITICAL: [],
    HIGH: [],
    MEDIUM: [],
    LOW: []
  };
  
  allResults.forEach(result => {
    groupedResults[result.severity].push(result);
  });
  
  let hasIssues = false;
  
  Object.entries(groupedResults).forEach(([severity, results]) => {
    if (results.length > 0) {
      hasIssues = true;
      const emoji = severity === 'CRITICAL' ? '🚨' : severity === 'HIGH' ? '⚠️' : '💡';
      
      console.log(`${emoji} ${severity} Issues (${results.length}):`);
      console.log('-'.repeat(40));
      
      results.forEach(result => {
        console.log(`File: ${result.file}`);
        console.log(`Issue: ${result.pattern}`);
        console.log(`Matches: ${result.matches.join(', ')}`);
        console.log('');
      });
    }
  });
  
  if (hasIssues) {
    console.log('❌ Security audit failed!');
    console.log('\n🔧 Remediation Steps:');
    console.log('1. Move all hardcoded credentials to environment variables');
    console.log('2. Update .env.local.example with required variables');
    console.log('3. Use secure configuration files for credential management');
    console.log('4. Run the audit again to verify fixes');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { scanFile, scanDirectory, SECURITY_PATTERNS };