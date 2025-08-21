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
    '*.config.js',
    '*.config.ts',
    'i18n/*.json'
  ]
};

// Hardcoding violation patterns
const VIOLATION_PATTERNS = [
  {
    category: 'hardcoded_text',
    pattern: /['"`](?!className|key|id|data-|aria-|role|type|placeholder|alt|&|\s|·|•)[^'"`]*[a-zA-Z]{3,}[^'"`]*['"`]/g,
    severity: 'high',
    message: 'Hardcoded text detected - should use t() function'
  },
  {
    category: 'hardcoded_urls',
    pattern: /['"`]https?:\/\/[^'"`]+['"`]/g,
    severity: 'high',
    message: 'Hardcoded URL detected - use config/cdn.ts or env vars'
  },
  {
    category: 'hardcoded_routes',
    pattern: /['"`]\/[a-zA-Z][^'"`]*['"`]/g,
    severity: 'medium',
    message: 'Potential hardcoded route - use ROUTES constants'
  },
  {
    category: 'hardcoded_prices',
    pattern: /['"`][£$€]\d+[^'"`]*['"`]/g,
    severity: 'high',
    message: 'Hardcoded price detected - use formatPrice() function'
  },
  {
    category: 'hardcoded_colors',
    pattern: /#[0-9a-fA-F]{3,6}|rgb\(|rgba\(/g,
    severity: 'medium',
    message: 'Hardcoded color detected - use Portuguese brand colors'
  },
  {
    category: 'console_logs',
    pattern: /console\.log\(/g,
    severity: 'low',
    message: 'Console.log detected - remove before production'
  },
  {
    category: 'hardcoded_analytics',
    pattern: /['"`]track[A-Z][^'"`]*['"`]|['"`][a-z_]+_event['"`]/g,
    severity: 'medium',
    message: 'Hardcoded analytics event - use event constants'
  }
];

// Scan files for violations
function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];

  VIOLATION_PATTERNS.forEach(pattern => {
    const matches = content.match(pattern.pattern);
    if (matches) {
      matches.forEach(match => {
        const lineNumber = content.substring(0, content.indexOf(match)).split('\n').length;
        violations.push({
          file: filePath,
          line: lineNumber,
          category: pattern.category,
          severity: pattern.severity,
          message: pattern.message,
          code: match.trim(),
          timestamp: new Date().toISOString()
        });
      });
    }
  });

  return violations;
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
  
  // Return exit code based on severity
  return report.summary.bySeverity.high > 50 ? 1 : 0;
}

// CLI execution
if (require.main === module) {
  const exitCode = runAudit();
  process.exit(exitCode);
}

module.exports = { runAudit, scanFile, VIOLATION_PATTERNS };