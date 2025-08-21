#!/usr/bin/env node

/**
 * Enhanced LusoTown Hardcoding Audit & Remediation Script
 * 
 * Provides detailed analysis and specific fix recommendations
 * for all hardcoding violations in the LusoTown codebase.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Enhanced configuration
const AUDIT_CONFIG = {
  sourceDir: './src',
  outputFile: `./audits/enhanced-audit-${new Date().toISOString().split('T')[0]}.json`,
  remediationFile: `./audits/remediation-plan-${new Date().toISOString().split('T')[0]}.md`,
  excludePatterns: [
    '*.test.tsx',
    '*.test.ts', 
    '*.config.js',
    '*.config.ts',
    'i18n/*.json'
  ]
};

// Enhanced violation patterns with specific fix guidance
const VIOLATION_PATTERNS = [
  {
    category: 'hardcoded_text',
    pattern: /['\"`](?!className|key|id|data-|aria-|role|type|placeholder|alt|&|\\s|·|•)[^'\"`]*[a-zA-Z]{3,}[^'\"`]*['\"`]/g,
    severity: 'high',
    message: 'Hardcoded text detected - should use t() function',
    fixPattern: 'Replace with {t(\'category.key\')}',
    example: '"Welcome" → {t(\'welcome.message\')}',
    priority: 1
  },
  {
    category: 'hardcoded_routes',
    pattern: /['\"`]\/[a-zA-Z-/]*['\"`](?=\s*[,\)\]\}]|\s*$)/g,
    severity: 'high', 
    message: 'Hardcoded route detected - use ROUTES constants',
    fixPattern: 'Replace with ROUTES.routeName',
    example: '"/events" → ROUTES.events',
    priority: 2
  },
  {
    category: 'hardcoded_urls',
    pattern: /['\"`]https?:\/\/[^'\"`]+['\"`]/g,
    severity: 'medium',
    message: 'Hardcoded URL detected - use config functions',
    fixPattern: 'Move to CDN config or use helper functions',
    example: '"https://images.unsplash.com/..." → buildUnsplashUrl(...)',
    priority: 3
  },
  {
    category: 'hardcoded_prices', 
    pattern: /['\"`]?[£$€][\d,.]+['\"`]?/g,
    severity: 'medium',
    message: 'Hardcoded price detected - use formatPrice() function',
    fixPattern: 'Replace with formatPrice() calls',
    example: '"£19.99" → {formatPrice(19.99)}',
    priority: 4
  },
  {
    category: 'hardcoded_colors',
    pattern: /#[0-9A-Fa-f]{3,6}|rgb\([^)]+\)|rgba\([^)]+\)/g,
    severity: 'medium',
    message: 'Hardcoded color detected - use Portuguese brand colors',
    fixPattern: 'Replace with brandColors constants',
    example: '"#DC143C" → brandColors.action',
    priority: 5
  },
  {
    category: 'demo_credentials',
    pattern: /demo@lusotown\.com|LusoTown2025!/g,
    severity: 'critical',
    message: 'Demo credentials detected - move to environment variables',
    fixPattern: 'Use process.env.NEXT_PUBLIC_DEMO_*',
    example: '"demo@lusotown.com" → process.env.NEXT_PUBLIC_DEMO_EMAIL',
    priority: 0
  },
  {
    category: 'console_logs',
    pattern: /console\.log\(/g,
    severity: 'low',
    message: 'Console.log detected - remove before production',
    fixPattern: 'Remove or replace with proper logging',
    example: 'console.log(...) → // Remove or use logger',
    priority: 6
  },
  {
    category: 'hardcoded_analytics',
    pattern: /['\"`]track[A-Z][^'\"`]*['\"`]|['\"`][a-z_]+_event['\"`]/g,
    severity: 'medium',
    message: 'Hardcoded analytics event - use event constants',
    fixPattern: 'Use ANALYTICS_EVENTS constants',
    example: '"button_click" → ANALYTICS_EVENTS.buttonClick',
    priority: 7
  }
];

// File type categorization for targeted remediation
const FILE_CATEGORIES = {
  critical: ['auth.ts', 'pricing.ts', 'routes.ts', 'layout.tsx', 'page.tsx'],
  pages: ['app/', 'pages/'],
  components: ['components/'],
  utilities: ['lib/', 'utils/', 'hooks/'],
  config: ['config/'],
  types: ['types/']
};

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];

  VIOLATION_PATTERNS.forEach(pattern => {
    const matches = content.match(pattern.pattern);
    if (matches) {
      matches.forEach(match => {
        const lineNumber = content.substring(0, content.indexOf(match)).split('\\n').length;
        violations.push({
          file: filePath.replace('./src/', ''),
          line: lineNumber,
          category: pattern.category,
          severity: pattern.severity,
          priority: pattern.priority,
          message: pattern.message,
          code: match.trim(),
          fixPattern: pattern.fixPattern,
          example: pattern.example,
          timestamp: new Date().toISOString()
        });
      });
    }
  });

  return violations;
}

function getFiles(dir, extensions = ['.tsx', '.ts', '.js']) {
  let files = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files = files.concat(getFiles(fullPath, extensions));
      } else if (extensions.some(ext => item.endsWith(ext))) {
        // Skip excluded patterns
        const shouldExclude = AUDIT_CONFIG.excludePatterns.some(pattern => {
          const regex = new RegExp(pattern.replace('*', '.*'));
          return regex.test(fullPath);
        });
        
        if (!shouldExclude) {
          files.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }
  
  return files;
}

function categorizeFile(filePath) {
  for (const [category, patterns] of Object.entries(FILE_CATEGORIES)) {
    if (patterns.some(pattern => filePath.includes(pattern))) {
      return category;
    }
  }
  return 'other';
}

function generatePriorityMatrix(violations) {
  const matrix = {};
  
  violations.forEach(violation => {
    const key = `${violation.category}_${violation.severity}`;
    if (!matrix[key]) {
      matrix[key] = {
        category: violation.category,
        severity: violation.severity,
        priority: violation.priority,
        count: 0,
        files: new Set(),
        examples: []
      };
    }
    
    matrix[key].count++;
    matrix[key].files.add(violation.file);
    
    if (matrix[key].examples.length < 3) {
      matrix[key].examples.push({
        file: violation.file,
        line: violation.line,
        code: violation.code,
        fix: violation.fixPattern
      });
    }
  });
  
  return Object.values(matrix).sort((a, b) => a.priority - b.priority);
}

function generateRemediationPlan(violations, priorityMatrix) {
  const plan = [];
  
  // Group by priority and create actionable steps
  priorityMatrix.forEach((group, index) => {
    const phase = Math.floor(index / 2) + 1;
    const timeEstimate = group.count < 10 ? '1 day' : 
                        group.count < 50 ? '3 days' : 
                        group.count < 200 ? '1 week' : '2 weeks';
    
    plan.push({
      phase,
      category: group.category,
      severity: group.severity,
      priority: group.priority,
      violationCount: group.count,
      filesAffected: group.files.size,
      timeEstimate,
      description: `Fix ${group.count} ${group.category} violations across ${group.files.size} files`,
      examples: group.examples,
      actionItems: generateActionItems(group)
    });
  });
  
  return plan;
}

function generateActionItems(group) {
  const items = [];
  
  switch (group.category) {
    case 'hardcoded_text':
      items.push('Add missing translation keys to en.json and pt.json');
      items.push('Import useLanguage hook in affected components');
      items.push('Replace hardcoded strings with t() calls');
      items.push('Test language switching functionality');
      break;
      
    case 'hardcoded_routes':
      items.push('Import ROUTES from @/config');
      items.push('Replace string literals with ROUTES constants');
      items.push('Update Link and router.push calls');
      items.push('Verify route navigation works correctly');
      break;
      
    case 'hardcoded_urls':
      items.push('Identify URL category (CDN, social, external)');
      items.push('Add to appropriate config file if missing');
      items.push('Import and use config constants');
      items.push('Test external links and image loading');
      break;
      
    case 'hardcoded_prices':
      items.push('Import formatPrice from @/config/pricing');
      items.push('Replace price strings with formatPrice() calls');
      items.push('Ensure currency consistency');
      items.push('Test price display across locales');
      break;
      
    case 'hardcoded_colors':
      items.push('Import brandColors from @/config');
      items.push('Replace hex values with brand color constants');
      items.push('Update CSS custom properties');
      items.push('Verify design consistency');
      break;
      
    default:
      items.push(`Review and fix ${group.category} violations`);
      items.push('Test changes thoroughly');
  }
  
  return items;
}

function generateReport(violations) {
  const priorityMatrix = generatePriorityMatrix(violations);
  const remediationPlan = generateRemediationPlan(violations, priorityMatrix);
  
  // File statistics
  const fileStats = violations.reduce((stats, violation) => {
    const category = categorizeFile(violation.file);
    if (!stats[category]) stats[category] = 0;
    stats[category]++;
    return stats;
  }, {});
  
  // Category breakdown
  const categoryBreakdown = violations.reduce((breakdown, violation) => {
    if (!breakdown[violation.category]) {
      breakdown[violation.category] = {
        total: 0,
        high: 0,
        medium: 0,
        low: 0,
        critical: 0
      };
    }
    breakdown[violation.category].total++;
    breakdown[violation.category][violation.severity]++;
    return breakdown;
  }, {});
  
  const report = {
    summary: {
      totalViolations: violations.length,
      filesAffected: new Set(violations.map(v => v.file)).size,
      categoriesAffected: Object.keys(categoryBreakdown).length,
      timestamp: new Date().toISOString(),
      estimatedRemediationTime: calculateTotalTime(remediationPlan)
    },
    categoryBreakdown,
    fileTypeDistribution: fileStats,
    priorityMatrix,
    remediationPlan,
    mostProblematicFiles: getMostProblematicFiles(violations),
    quickWins: getQuickWins(violations),
    criticalIssues: violations.filter(v => v.severity === 'critical'),
    violations: violations.slice(0, 100) // Limit for performance
  };
  
  return report;
}

function getMostProblematicFiles(violations) {
  const fileViolationCount = violations.reduce((counts, violation) => {
    counts[violation.file] = (counts[violation.file] || 0) + 1;
    return counts;
  }, {});
  
  return Object.entries(fileViolationCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([file, count]) => ({ file, violationCount: count }));
}

function getQuickWins(violations) {
  return violations
    .filter(v => ['console_logs', 'demo_credentials'].includes(v.category))
    .slice(0, 20);
}

function calculateTotalTime(plan) {
  const timeMap = { 
    '1 day': 1, 
    '3 days': 3, 
    '1 week': 7, 
    '2 weeks': 14 
  };
  
  const totalDays = plan.reduce((total, phase) => {
    return total + (timeMap[phase.timeEstimate] || 1);
  }, 0);
  
  if (totalDays < 7) return `${totalDays} days`;
  if (totalDays < 30) return `${Math.ceil(totalDays / 7)} weeks`;
  return `${Math.ceil(totalDays / 30)} months`;
}

function generateMarkdownReport(report) {
  const markdown = `# LusoTown Enhanced Hardcoding Audit Report
Generated: ${report.summary.timestamp}

## Executive Summary
- **Total Violations**: ${report.summary.totalViolations.toLocaleString()}
- **Files Affected**: ${report.summary.filesAffected}
- **Categories**: ${report.summary.categoriesAffected}
- **Estimated Remediation Time**: ${report.summary.estimatedRemediationTime}

## Violation Breakdown by Category
${Object.entries(report.categoryBreakdown).map(([category, stats]) => 
`### ${category.replace(/_/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
- Total: ${stats.total}
- Critical: ${stats.critical} | High: ${stats.high} | Medium: ${stats.medium} | Low: ${stats.low}`
).join('\\n\\n')}

## Most Problematic Files
${report.mostProblematicFiles.map((file, index) => 
`${index + 1}. **${file.file}** - ${file.violationCount} violations`
).join('\\n')}

## Quick Wins (Easy Fixes)
${report.quickWins.map(violation => 
`- \`${violation.file}:${violation.line}\` - ${violation.message}`
).join('\\n')}

## Remediation Plan
${report.remediationPlan.map((phase, index) => 
`### Phase ${phase.phase}: ${phase.category.replace(/_/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
- **Priority**: ${phase.priority}
- **Violations**: ${phase.violationCount}
- **Files**: ${phase.filesAffected}
- **Time Estimate**: ${phase.timeEstimate}

**Action Items**:
${phase.actionItems.map(item => `- ${item}`).join('\\n')}

**Examples**:
${phase.examples.map(ex => `- \`${ex.file}:${ex.line}\` - \`${ex.code}\` → ${ex.fix}`).join('\\n')}
`).join('\\n\\n')}

## Next Steps
1. Start with Quick Wins to build momentum
2. Address Critical violations immediately  
3. Follow remediation plan phases in order
4. Run audit weekly to track progress
5. Update this report monthly

---
*Generated by Enhanced LusoTown Hardcoding Audit Script*`;

  return markdown;
}

function runAudit() {
  console.log('🔍 Starting Enhanced LusoTown Hardcoding Audit...');
  
  const files = getFiles(AUDIT_CONFIG.sourceDir);
  console.log(`📁 Scanning ${files.length} files...`);
  
  let allViolations = [];
  
  files.forEach(file => {
    const violations = scanFile(file);
    allViolations = allViolations.concat(violations);
  });
  
  console.log(`⚠️ Found ${allViolations.length} violations`);
  
  const report = generateReport(allViolations);
  const markdown = generateMarkdownReport(report);
  
  // Ensure audit directory exists
  const auditDir = path.dirname(AUDIT_CONFIG.outputFile);
  if (!fs.existsSync(auditDir)) {
    fs.mkdirSync(auditDir, { recursive: true });
  }
  
  // Save JSON report
  fs.writeFileSync(AUDIT_CONFIG.outputFile, JSON.stringify(report, null, 2));
  
  // Save Markdown report
  fs.writeFileSync(AUDIT_CONFIG.remediationFile, markdown);
  
  // Console summary
  console.log('\\n📊 ENHANCED AUDIT RESULTS:');
  console.log(`Total violations: ${report.summary.totalViolations.toLocaleString()}`);
  console.log(`Files affected: ${report.summary.filesAffected}`);
  console.log(`Estimated remediation time: ${report.summary.estimatedRemediationTime}`);
  console.log('\\n🎯 TOP PRIORITIES:');
  
  report.priorityMatrix.slice(0, 5).forEach((group, index) => {
    console.log(`${index + 1}. ${group.category.replace(/_/g, ' ')} (${group.count} violations, ${group.severity} severity)`);
  });
  
  console.log('\\n📄 REPORTS SAVED:');
  console.log(`JSON: ${AUDIT_CONFIG.outputFile}`);
  console.log(`Markdown: ${AUDIT_CONFIG.remediationFile}`);
  
  return allViolations.length > 0 ? 1 : 0;
}

// CLI execution
if (require.main === module) {
  const exitCode = runAudit();
  process.exit(exitCode);
}

module.exports = { runAudit, scanFile, VIOLATION_PATTERNS };