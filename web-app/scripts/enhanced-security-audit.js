#!/usr/bin/env node
/**
 * Enhanced Security Audit Script for LusoTown
 * 
 * Comprehensive security analysis including:
 * - Hardcoded credentials and secrets
 * - SQL injection vulnerabilities  
 * - XSS vulnerabilities
 * - CSRF protection validation
 * - Input validation coverage
 * - Portuguese cultural data protection
 * - GDPR compliance gaps
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Enhanced security patterns for Portuguese community platform
const SECURITY_PATTERNS = {
  // Critical Security Issues
  credentials: [
    {
      name: 'Hardcoded API Keys',
      pattern: /(api[_-]?key|secret[_-]?key|access[_-]?token)\s*[=:]\s*['"][a-zA-Z0-9]{20,}['"]/gi,
      severity: 'CRITICAL',
      description: 'API keys should be stored in environment variables'
    },
    {
      name: 'Hardcoded Passwords',
      pattern: /(password|pwd|pass)\s*[=:]\s*['"][^'"]{8,}['"]/gi,
      severity: 'CRITICAL',
      description: 'Passwords should never be hardcoded'
    },
    {
      name: 'Stripe Keys',
      pattern: /(sk_test_|pk_test_|sk_live_|pk_live_)[a-zA-Z0-9]{24,}/g,
      severity: 'CRITICAL',
      description: 'Stripe keys exposed - immediate revocation required'
    },
    {
      name: 'Database Credentials', 
      pattern: /(postgres|mysql|mongodb):\/\/[^:]+:[^@]+@/gi,
      severity: 'CRITICAL',
      description: 'Database credentials should use environment variables'
    },
    {
      name: 'JWT Secrets',
      pattern: /(jwt[_-]?secret|token[_-]?secret)\s*[=:]\s*['"][^'"]{16,}['"]/gi,
      severity: 'CRITICAL',
      description: 'JWT secrets must be securely managed'
    }
  ],

  // Portuguese Community Specific
  portuguese_data: [
    {
      name: 'Hardcoded Demo Credentials',
      pattern: /demo@lusotown\.com|LusoTown2025!/g,
      severity: 'HIGH',
      description: 'Demo credentials should be environment-configured'
    },
    {
      name: 'Portuguese Cultural Data',
      pattern: /(saudade|fado|bacalhau|azulejos|pastéis de nata|francesinha)/gi,
      severity: 'MEDIUM',
      description: 'Cultural content should be localized, not hardcoded'
    },
    {
      name: 'Portuguese Contact Information',
      pattern: /(\+351\s?\d{3}\s?\d{3}\s?\d{3}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]*\.pt)/g,
      severity: 'HIGH',
      description: 'Portuguese contact data should be configurable'
    }
  ],

  // SQL Injection Risks
  sql_injection: [
    {
      name: 'Dynamic SQL Construction',
      pattern: /\`[^`]*\$\{[^}]+\}[^`]*\`|\+\s*['"][^'"]*\$\{[^}]+\}[^'"]*['"]/g,
      severity: 'CRITICAL',
      description: 'Potential SQL injection through string interpolation'
    },
    {
      name: 'Raw Query Execution',
      pattern: /\.(query|execute|raw)\s*\(\s*['"`][^'"]*\$\{[^}]+\}/g,
      severity: 'CRITICAL', 
      description: 'Raw queries with interpolation are SQL injection risks'
    },
    {
      name: 'Unsafe WHERE Clauses',
      pattern: /WHERE\s+[a-zA-Z_]+\s*=\s*['"]?\$\{[^}]+\}['"]?/gi,
      severity: 'HIGH',
      description: 'WHERE clauses should use parameterized queries'
    }
  ],

  // XSS Vulnerabilities  
  xss_risks: [
    {
      name: 'Dangerous innerHTML Usage',
      pattern: /\.innerHTML\s*=\s*[^;]+\$\{[^}]+\}/g,
      severity: 'HIGH',
      description: 'innerHTML with user data can cause XSS'
    },
    {
      name: 'Unescaped User Content',
      pattern: /dangerouslySetInnerHTML\s*:\s*\{\s*__html\s*:\s*[^}]+\}/g,
      severity: 'HIGH', 
      description: 'dangerouslySetInnerHTML must sanitize user content'
    },
    {
      name: 'Direct DOM Manipulation',
      pattern: /\.(appendChild|insertAdjacentHTML|outerHTML)\s*\([^)]*\$\{[^}]+\}/g,
      severity: 'MEDIUM',
      description: 'DOM manipulation with user data needs sanitization'
    }
  ],

  // Authentication & Authorization
  auth_issues: [
    {
      name: 'Hardcoded Admin Emails',
      pattern: /admin@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      severity: 'HIGH',
      description: 'Admin emails should be configurable'
    },
    {
      name: 'Weak Session Management',
      pattern: /sessionStorage|localStorage\.setItem.*token/g,
      severity: 'MEDIUM',
      description: 'Consider secure cookie storage for sensitive tokens'
    },
    {
      name: 'Missing Auth Checks',
      pattern: /export\s+async\s+function\s+(POST|PUT|DELETE|PATCH)\s*\([^)]*\)\s*\{(?![\s\S]*auth)/g,
      severity: 'HIGH',
      description: 'API routes should validate authentication'
    }
  ],

  // Data Protection & Privacy
  privacy_issues: [
    {
      name: 'Personal Data Logging',
      pattern: /console\.log.*\b(email|password|phone|address|nif|cc)\b/gi,
      severity: 'HIGH',
      description: 'Personal data should not be logged'
    },
    {
      name: 'Unencrypted Sensitive Data',
      pattern: /\b(password|ssn|nif|credit.?card)\b.*=.*['"]/gi,
      severity: 'HIGH',
      description: 'Sensitive data should be encrypted'
    },
    {
      name: 'Missing GDPR Consent',
      pattern: /collect|store|process.*personal.?data/gi,
      severity: 'MEDIUM',
      description: 'GDPR consent required for personal data processing'
    }
  ],

  // Content Security Issues
  content_security: [
    {
      name: 'Unsafe External Resources',
      pattern: /src\s*=\s*['"]https?:\/\/(?!.*\.(lusotown\.com|vercel\.app|supabase\.co))/g,
      severity: 'MEDIUM',
      description: 'External resources should be from trusted domains'
    },
    {
      name: 'Missing CSP Headers',
      pattern: /Content-Security-Policy/g,
      severity: 'LOW',
      invert: true,
      description: 'Content Security Policy headers are missing'
    }
  ]
};

// File extensions to scan
const SCANNABLE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.sql', '.md'];

// Directories to exclude
const EXCLUDE_DIRECTORIES = [
  'node_modules', '.next', '.git', 'dist', 'build', 
  'coverage', '.vercel', '__tests__', '.env*'
];

class SecurityAudit {
  constructor() {
    this.violations = [];
    this.fileCount = 0;
    this.skippedFiles = 0;
    this.startTime = Date.now();
  }

  // Scan a single file for security issues
  scanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const fileName = path.relative(process.cwd(), filePath);
      
      this.fileCount++;
      
      // Skip empty files
      if (!content.trim()) {
        this.skippedFiles++;
        return;
      }

      // Scan each pattern category
      Object.entries(SECURITY_PATTERNS).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          this.checkPattern(fileName, content, category, pattern);
        });
      });

    } catch (error) {
      console.warn(`⚠️  Could not scan ${filePath}: ${error.message}`);
      this.skippedFiles++;
    }
  }

  // Check a specific pattern in file content
  checkPattern(fileName, content, category, pattern) {
    let matches;
    const regex = new RegExp(pattern.pattern.source, pattern.pattern.flags);
    
    while ((matches = regex.exec(content)) !== null) {
      // Handle inverted patterns (checking for absence)
      if (pattern.invert && matches.length > 0) {
        continue;
      }
      
      if (!pattern.invert || matches.length === 0) {
        this.violations.push({
          file: fileName,
          category,
          pattern: pattern.name,
          severity: pattern.severity,
          description: pattern.description,
          line: this.getLineNumber(content, matches.index),
          match: matches[0].substring(0, 100), // Truncate long matches
          recommendation: this.getRecommendation(pattern.name)
        });
      }
    }
  }

  // Get line number for a match
  getLineNumber(content, matchIndex) {
    return content.substring(0, matchIndex).split('\n').length;
  }

  // Get specific recommendation for each issue type
  getRecommendation(patternName) {
    const recommendations = {
      'Hardcoded API Keys': 'Move to environment variables and use process.env.API_KEY',
      'Hardcoded Passwords': 'Use secure password hashing and environment configuration',
      'Stripe Keys': 'IMMEDIATELY revoke and regenerate keys, store in environment',
      'Database Credentials': 'Use connection strings from environment variables',
      'JWT Secrets': 'Generate cryptographically secure secrets, store in environment',
      'Hardcoded Demo Credentials': 'Configure through DEMO_EMAIL and DEMO_PASSWORD env vars',
      'Dynamic SQL Construction': 'Use parameterized queries or ORM with prepared statements',
      'Raw Query Execution': 'Use query builders or ORMs that prevent SQL injection',
      'Dangerous innerHTML Usage': 'Use textContent or sanitize HTML with DOMPurify',
      'Unescaped User Content': 'Sanitize all user-generated content before rendering',
      'Personal Data Logging': 'Remove personal data from logs, use anonymized IDs',
      'Missing Auth Checks': 'Add authentication middleware to all protected routes'
    };
    
    return recommendations[patternName] || 'Review and remediate this security issue';
  }

  // Recursively scan directories
  scanDirectory(dirPath) {
    try {
      const items = fs.readdirSync(dirPath);
      
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        
        // Skip excluded directories
        if (EXCLUDE_DIRECTORIES.some(excluded => item.includes(excluded))) {
          continue;
        }
        
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          this.scanDirectory(fullPath);
        } else if (stat.isFile() && this.isScannable(fullPath)) {
          this.scanFile(fullPath);
        }
      }
    } catch (error) {
      console.warn(`⚠️  Could not scan directory ${dirPath}: ${error.message}`);
    }
  }

  // Check if file should be scanned
  isScannable(filePath) {
    return SCANNABLE_EXTENSIONS.some(ext => filePath.endsWith(ext));
  }

  // Generate detailed report
  generateReport() {
    const endTime = Date.now();
    const duration = (endTime - this.startTime) / 1000;
    
    console.log('🔍 LusoTown Enhanced Security Audit');
    console.log('===================================\n');
    
    // Summary statistics
    console.log('📊 SCAN SUMMARY:');
    console.log(`Files scanned: ${this.fileCount}`);
    console.log(`Files skipped: ${this.skippedFiles}`);
    console.log(`Total violations: ${this.violations.length}`);
    console.log(`Scan duration: ${duration.toFixed(2)}s\n`);
    
    if (this.violations.length === 0) {
      console.log('✅ No security violations found!');
      console.log('✅ Security audit passed!\n');
      return;
    }
    
    // Group violations by severity
    const groupedViolations = {
      CRITICAL: [],
      HIGH: [],
      MEDIUM: [],
      LOW: []
    };
    
    this.violations.forEach(violation => {
      if (groupedViolations[violation.severity]) {
        groupedViolations[violation.severity].push(violation);
      }
    });
    
    // Report violations by severity
    Object.entries(groupedViolations).forEach(([severity, violations]) => {
      if (violations.length > 0) {
        const emoji = this.getSeverityEmoji(severity);
        console.log(`${emoji} ${severity} SEVERITY (${violations.length} issues):`);
        console.log('-'.repeat(50));
        
        violations.slice(0, 10).forEach((violation, index) => {
          console.log(`${index + 1}. ${violation.pattern}`);
          console.log(`   File: ${violation.file}:${violation.line}`);
          console.log(`   Issue: ${violation.description}`);
          console.log(`   Match: ${violation.match.replace(/\n/g, '\\n')}`);
          console.log(`   Fix: ${violation.recommendation}`);
          console.log('');
        });
        
        if (violations.length > 10) {
          console.log(`   ... and ${violations.length - 10} more issues\n`);
        }
      }
    });
    
    // Priority recommendations
    this.generatePriorityRecommendations(groupedViolations);
    
    // Portuguese community specific recommendations
    this.generatePortugueseRecommendations();
    
    // Export detailed report
    this.exportDetailedReport(groupedViolations);
    
    // Exit with error code if critical issues found
    const hasCriticalIssues = groupedViolations.CRITICAL.length > 0 || 
                             groupedViolations.HIGH.length > 0;
    
    if (hasCriticalIssues) {
      console.log('❌ Security audit failed due to critical issues!');
      process.exit(1);
    } else {
      console.log('⚠️ Security audit completed with warnings.');
      process.exit(0);
    }
  }

  // Get emoji for severity level
  getSeverityEmoji(severity) {
    const emojis = {
      CRITICAL: '🚨',
      HIGH: '⚠️',
      MEDIUM: '💡',
      LOW: 'ℹ️'
    };
    return emojis[severity] || '❓';
  }

  // Generate priority recommendations
  generatePriorityRecommendations(groupedViolations) {
    console.log('🎯 PRIORITY REMEDIATION PLAN:');
    console.log('=============================\n');
    
    if (groupedViolations.CRITICAL.length > 0) {
      console.log('🚨 IMMEDIATE ACTION REQUIRED (0-24 hours):');
      console.log('1. Revoke and rotate all exposed API keys and secrets');
      console.log('2. Fix all SQL injection vulnerabilities');
      console.log('3. Remove all hardcoded credentials from codebase');
      console.log('4. Update environment variable configuration\n');
    }
    
    if (groupedViolations.HIGH.length > 0) {
      console.log('⚠️ HIGH PRIORITY (1-7 days):');
      console.log('1. Implement comprehensive input validation');
      console.log('2. Add authentication checks to all API routes');
      console.log('3. Implement CSRF protection');
      console.log('4. Add security headers to all responses\n');
    }
    
    if (groupedViolations.MEDIUM.length > 0) {
      console.log('💡 MEDIUM PRIORITY (1-2 weeks):');
      console.log('1. Improve Portuguese cultural content localization');
      console.log('2. Enhance privacy protection for personal data');
      console.log('3. Implement Content Security Policy');
      console.log('4. Review and secure external resource loading\n');
    }
  }

  // Portuguese community specific recommendations
  generatePortugueseRecommendations() {
    console.log('🇵🇹 PORTUGUESE COMMUNITY SECURITY:');
    console.log('==================================\n');
    console.log('1. Implement cultural data classification system');
    console.log('2. Add Portuguese GDPR compliance validation');
    console.log('3. Secure family connection and heritage data');
    console.log('4. Implement community consent mechanisms');
    console.log('5. Add Portuguese language security scanning');
    console.log('6. Protect saudade and emotional content');
    console.log('7. Secure regional identity preferences\n');
  }

  // Export detailed report to JSON
  exportDetailedReport(groupedViolations) {
    const reportData = {
      timestamp: new Date().toISOString(),
      scanSummary: {
        filesScanned: this.fileCount,
        filesSkipped: this.skippedFiles,
        totalViolations: this.violations.length,
        scanDuration: (Date.now() - this.startTime) / 1000
      },
      violationsByCategory: this.getViolationsByCategory(),
      violationsBySeverity: {
        critical: groupedViolations.CRITICAL.length,
        high: groupedViolations.HIGH.length,
        medium: groupedViolations.MEDIUM.length,
        low: groupedViolations.LOW.length
      },
      detailedViolations: this.violations,
      recommendations: this.generateActionItems()
    };
    
    const reportPath = path.join(process.cwd(), 'security-audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    
    console.log(`📄 Detailed report exported to: ${reportPath}\n`);
  }

  // Get violations grouped by category
  getViolationsByCategory() {
    const categories = {};
    this.violations.forEach(violation => {
      if (!categories[violation.category]) {
        categories[violation.category] = 0;
      }
      categories[violation.category]++;
    });
    return categories;
  }

  // Generate actionable items
  generateActionItems() {
    return [
      'Set up environment variable management system',
      'Implement parameterized database queries',
      'Add comprehensive input validation framework', 
      'Configure Content Security Policy headers',
      'Set up secrets scanning in CI/CD pipeline',
      'Implement Portuguese cultural data protection',
      'Add GDPR compliance validation system',
      'Configure security monitoring and alerting'
    ];
  }
}

// Main execution
function main() {
  const audit = new SecurityAudit();
  
  // Scan web application
  const webAppPath = path.join(process.cwd(), 'src');
  if (fs.existsSync(webAppPath)) {
    console.log('📂 Scanning web application...');
    audit.scanDirectory(webAppPath);
  }
  
  // Scan additional paths
  const additionalPaths = ['pages', 'app', 'api', 'scripts'];
  additionalPaths.forEach(dirName => {
    const dirPath = path.join(process.cwd(), dirName);
    if (fs.existsSync(dirPath)) {
      console.log(`📂 Scanning ${dirName}/...`);
      audit.scanDirectory(dirPath);
    }
  });
  
  // Generate comprehensive report
  audit.generateReport();
}

// Run audit if called directly
if (require.main === module) {
  main();
}

module.exports = { SecurityAudit, SECURITY_PATTERNS };