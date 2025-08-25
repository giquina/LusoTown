#!/usr/bin/env node

/**
 * Content Quality Check
 * Runs pre-commit to detect potential content quality issues
 */

const fs = require('fs');
const path = require('path');

// Files to check for content quality issues
const CONTENT_FILES = [
  'src/app/page.tsx',
  'src/app/**/page.tsx',
  'src/components/**/*.tsx'
];

// Red flag patterns that indicate content quality issues
const RED_FLAGS = [
  // Multiple similar CTAs
  {
    pattern: /(?:JOIN NOW|SIGN UP|GET STARTED|START FREE).*(?:JOIN NOW|SIGN UP|GET STARTED|START FREE)/gi,
    message: '❌ Multiple similar CTAs detected - consolidate to one primary CTA'
  },
  
  // Repetitive value propositions
  {
    pattern: /(Portuguese community|Portuguese-speaking community).*?(Portuguese community|Portuguese-speaking community).*?(Portuguese community|Portuguese-speaking community)/gi,
    message: '⚠️  Repetitive community messaging detected - consolidate similar phrases'
  },
  
  // Multiple primary headlines
  {
    pattern: /<h1[^>]*>.*?<\/h1>[\s\S]*?<h1[^>]*>.*?<\/h1>/gi,
    message: '❌ Multiple H1 tags detected - should have only one primary headline per page'
  },
  
  // Redundant benefit statements
  {
    pattern: /(discover|find|connect).*?(discover|find|connect).*?(discover|find|connect)/gi,
    message: '⚠️  Repetitive benefit language detected - vary your messaging'
  },
  
  // Multiple "never miss" type messaging
  {
    pattern: /(never miss|don't miss|never lose).*?(never miss|don't miss|never lose)/gi,
    message: '⚠️  Repetitive urgency messaging detected'
  }
];

// Content quality rules
const QUALITY_RULES = [
  {
    check: (content) => {
      const h1Count = (content.match(/<h1[^>]*>/g) || []).length;
      return h1Count <= 1;
    },
    message: '❌ Multiple H1 tags found - use only one primary headline per page'
  },
  
  {
    check: (content) => {
      const primaryButtons = (content.match(/className[^>]*primary[^>]*>/g) || []).length;
      const heroPrimaryButtons = content.match(/hero[\s\S]*?primary[\s\S]*?button/gi) || [];
      return heroPrimaryButtons.length <= 2;
    },
    message: '⚠️  Too many primary buttons in hero section - limit to 1-2 max'
  }
];

function checkFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return { issues: [], warnings: [] };
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  const warnings = [];
  
  // Check red flag patterns
  RED_FLAGS.forEach(redFlag => {
    if (redFlag.pattern.test(content)) {
      if (redFlag.message.startsWith('❌')) {
        issues.push(`${filePath}: ${redFlag.message}`);
      } else {
        warnings.push(`${filePath}: ${redFlag.message}`);
      }
    }
  });
  
  // Check quality rules
  QUALITY_RULES.forEach(rule => {
    if (!rule.check(content)) {
      if (rule.message.startsWith('❌')) {
        issues.push(`${filePath}: ${rule.message}`);
      } else {
        warnings.push(`${filePath}: ${rule.message}`);
      }
    }
  });
  
  return { issues, warnings };
}

function getAllFiles(pattern, dir = 'src') {
  const files = [];
  
  function scanDir(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    items.forEach(item => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.')) {
        scanDir(fullPath);
      } else if (item.endsWith('.tsx') && (item === 'page.tsx' || currentDir.includes('components'))) {
        files.push(fullPath);
      }
    });
  }
  
  scanDir(dir);
  return files;
}

function main() {
  console.log('🔍 Running Content Quality Check...\n');
  
  const files = getAllFiles();
  let totalIssues = 0;
  let totalWarnings = 0;
  
  files.forEach(file => {
    const { issues, warnings } = checkFile(file);
    
    if (issues.length > 0) {
      console.log('❌ CRITICAL ISSUES:');
      issues.forEach(issue => console.log(`  ${issue}`));
      totalIssues += issues.length;
    }
    
    if (warnings.length > 0) {
      console.log('⚠️  WARNINGS:');
      warnings.forEach(warning => console.log(`  ${warning}`));
      totalWarnings += warnings.length;
    }
  });
  
  if (totalIssues > 0) {
    console.log(`\n❌ ${totalIssues} critical content quality issues found!`);
    console.log('\n📚 Review: /web-app/CONTENT_QUALITY_RULES.md');
    console.log('🤖 Use: content-quality-control agent before making content changes');
    process.exit(1);
  }
  
  if (totalWarnings > 0) {
    console.log(`\n⚠️  ${totalWarnings} content quality warnings found.`);
    console.log('Consider reviewing and consolidating repetitive content.');
  }
  
  console.log('✅ Content quality check passed!\n');
}

if (require.main === module) {
  main();
}

module.exports = { checkFile, RED_FLAGS, QUALITY_RULES };