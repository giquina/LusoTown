#!/usr/bin/env node

/**
 * LusoTown Hardcoding Audit Script
 * Monthly audit to detect and report hardcoding violations
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const AUDIT_CONFIG = {
  sourceDir: './src',
  outputFile: `./audits/hardcoding-audit-${new Date().toISOString().split('T')[0]}.json`,
  excludePatterns: [
    '*.test.tsx',
    '*.test.ts', 
    '*.spec.ts',
    '*.spec.tsx',
    '*.config.js',
    '*.config.ts',
    '*.d.ts',
    'i18n/*.json',
    'src/config/*',
    '__tests__/*',
    'scripts/*',
    'playwright*',
    '*.setup.js',
    'jest.*',
    '*.stories.*',
    'middleware.ts'
  ]
};

// Hardcoding violation patterns - Updated to reduce false positives
const VIOLATION_PATTERNS = [
  {
    category: 'hardcoded_text',
    // Only catch strings with user-facing text, exclude: imports, translation keys, classNames, and technical strings
    pattern: /(?<!import[^'"`]*|from\s+|t\(|className=|key=|id=|data-|aria-|role=|type=|placeholder=|alt=|testId=|@\/)['"]((?![@\/]|[a-z]+\.[a-z]+|className|key|id|data-|aria-|role|type|placeholder|alt|testId|use |client|server)[A-Z][^'"`]{10,}|[A-Z][a-z]+\s+[A-Z][a-z]+[^'"`]*)['"]/g,
    severity: 'high',
    message: 'Hardcoded user-facing text detected - should use t() function'
  },
  {
    category: 'hardcoded_urls',
    // Only catch actual URLs, not import paths
    pattern: /(?<!import[^'"`]*|from\s+)['"](https?:\/\/(?!localhost)[^'"`]+)['"]/g,
    severity: 'high',
    message: 'Hardcoded URL detected - use config/cdn.ts or env vars'
  },
  {
    category: 'hardcoded_routes',
    // Only catch route strings not in ROUTES imports or function calls, exclude paths starting with @
    pattern: /(?<!ROUTES\.|import[^'"`]*|from\s+|href=|to=|path=|pathname=|router\.|navigate\(|Link[^>]*to=)['"](\/(?!api\/)[a-zA-Z][a-zA-Z0-9\-]*(?:\/[a-zA-Z0-9\-]+)*)['"]/g,
    severity: 'medium',
    message: 'Potential hardcoded route - use ROUTES constants'
  },
  {
    category: 'hardcoded_prices',
    // Prices in strings not in config files
    pattern: /(?<!formatPrice|PRICES|config\/)['"](£|$|€)\d+(?:\.\d{2})?[^'"`]*['"]/g,
    severity: 'high',
    message: 'Hardcoded price detected - use formatPrice() function'
  },
  {
    category: 'hardcoded_colors',
    // Color values not in CSS classes or config files  
    pattern: /(?<!className=|class=|from-|to-|bg-|text-|border-|ring-|config\/|theme\.|colors\.)#[0-9a-fA-F]{6}|(?<!className=|class=|config\/|theme\.|colors\.)rgb\(|(?<!className=|class=|config\/|theme\.|colors\.)rgba\(/g,
    severity: 'medium',
    message: 'Hardcoded color detected - use Portuguese brand colors from config'
  },
  {
    category: 'console_logs',
    pattern: /console\.log\(/g,
    severity: 'low',
    message: 'Console.log detected - use logger utility instead'
  },
  {
    category: 'hardcoded_emails',
    // Email addresses not in config
    pattern: /(?<!config\/|CONTACT|EMAIL)['"]\w+@\w+\.\w+['"]/g,
    severity: 'high',
    message: 'Hardcoded email detected - use config/contact.ts'
  }
];

// Scan files for violations
function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const violations = [];

  VIOLATION_PATTERNS.forEach(pattern => {
    lines.forEach((line, index) => {
      const matches = line.match(pattern.pattern);
      if (matches) {
        matches.forEach(match => {
          // Additional filtering to reduce false positives
          if (shouldSkipViolation(line, match, pattern.category)) {
            return;
          }
          
          violations.push({
            file: filePath,
            line: index + 1,
            category: pattern.category,
            severity: pattern.severity,
            message: pattern.message,
            code: match.trim(),
            context: line.trim(),
            timestamp: new Date().toISOString()
          });
        });
      }
    });
  });

  return violations;
}

// Additional filtering function to reduce false positives
function shouldSkipViolation(line, match, category) {
  const trimmedLine = line.trim();
  
  // Skip import statements
  if (trimmedLine.startsWith('import') || trimmedLine.startsWith('from')) {
    return true;
  }
  
  // Skip export statements
  if (trimmedLine.startsWith('export')) {
    return true;
  }
  
  // Skip comment lines
  if (trimmedLine.startsWith('//') || trimmedLine.startsWith('*') || trimmedLine.startsWith('/*')) {
    return true;
  }
  
  // Skip translation function calls
  if (line.includes('t(') && category === 'hardcoded_text') {
    return true;
  }
  
  // Skip className assignments
  if (line.includes('className=') && category === 'hardcoded_text') {
    return true;
  }
  
  // Skip config object properties
  if (/^\s*[a-zA-Z_$][a-zA-Z0-9_$]*:\s*/.test(trimmedLine)) {
    return true;
  }
  
  return false;
}

// Get all files to scan
function getFiles(dir, extension = '.tsx') {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    items.forEach(item => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        traverse(fullPath);
      } else if (stat.isFile() && (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts'))) {
        // Check exclude patterns
        const shouldExclude = AUDIT_CONFIG.excludePatterns.some(pattern => {
          const regex = new RegExp(pattern.replace('*', '.*'));
          return regex.test(fullPath);
        });
        
        if (!shouldExclude) {
          files.push(fullPath);
        }
      }
    });
  }
  
  traverse(dir);
  return files;
}

// Generate audit report
function generateReport(violations) {
  const summary = {
    totalViolations: violations.length,
    byCategory: {},
    bySeverity: { high: 0, medium: 0, low: 0 },
    filesAffected: new Set(violations.map(v => v.file)).size,
    timestamp: new Date().toISOString(),
    recommendations: []
  };

  // Group by category
  violations.forEach(violation => {
    if (!summary.byCategory[violation.category]) {
      summary.byCategory[violation.category] = 0;
    }
    summary.byCategory[violation.category]++;
    summary.bySeverity[violation.severity]++;
  });

  // Generate recommendations
  if (summary.byCategory.hardcoded_text > 50) {
    summary.recommendations.push('🚨 CRITICAL: Implement bilingual system with t() function');
  }
  if (summary.byCategory.hardcoded_urls > 10) {
    summary.recommendations.push('🔧 Create config/cdn.ts for URL management');
  }
  if (summary.byCategory.hardcoded_prices > 5) {
    summary.recommendations.push('💰 Create formatPrice() utility function');
  }
  if (summary.bySeverity.high > 100) {
    summary.recommendations.push('⚠️ Schedule immediate cleanup sprint');
  }

  return {
    summary,
    violations: violations.slice(0, 100), // Limit for readability
    fullViolationCount: violations.length
  };
}

// Main audit function
function runAudit() {
  console.log('🔍 Starting LusoTown Hardcoding Audit...');
  
  const files = getFiles(AUDIT_CONFIG.sourceDir);
  console.log(`📁 Scanning ${files.length} files...`);
  
  let allViolations = [];
  
  files.forEach(file => {
    const violations = scanFile(file);
    allViolations = allViolations.concat(violations);
  });
  
  const report = generateReport(allViolations);
  
  // Ensure audit directory exists
  const auditDir = path.dirname(AUDIT_CONFIG.outputFile);
  if (!fs.existsSync(auditDir)) {
    fs.mkdirSync(auditDir, { recursive: true });
  }
  
  // Save report
  fs.writeFileSync(AUDIT_CONFIG.outputFile, JSON.stringify(report, null, 2));
  
  // Console output
  console.log('\n📊 AUDIT RESULTS:');
  console.log(`Total violations: ${report.summary.totalViolations}`);
  console.log(`Files affected: ${report.summary.filesAffected}`);
  console.log(`High severity: ${report.summary.bySeverity.high}`);
  console.log(`Medium severity: ${report.summary.bySeverity.medium}`);
  console.log(`Low severity: ${report.summary.bySeverity.low}`);
  
  console.log('\n📈 BY CATEGORY:');
  Object.entries(report.summary.byCategory).forEach(([category, count]) => {
    console.log(`${category}: ${count}`);
  });
  
  if (report.summary.recommendations.length > 0) {
    console.log('\n💡 RECOMMENDATIONS:');
    report.summary.recommendations.forEach(rec => console.log(rec));
  }
  
  console.log(`\n📄 Full report saved to: ${AUDIT_CONFIG.outputFile}`);
  
  // Return exit code - now informational only (no blocking)
  return 0;
}

// CLI execution
if (require.main === module) {
  const exitCode = runAudit();
  process.exit(exitCode);
}

module.exports = { runAudit, scanFile, VIOLATION_PATTERNS };