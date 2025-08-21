#!/usr/bin/env node

/**
 * LusoTown Secret Pattern Checker
 * 
 * Enhanced secret detection for preventing hardcoded credentials,
 * API keys, and other sensitive data in source code.
 * 
 * Usage:
 *   node scripts/secret-checker.js [--strict] [--path=src]
 * 
 * Features:
 * - Detects common secret patterns
 * - Excludes configuration and example files
 * - Supports allowlist for false positives
 * - Generates detailed reports
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  sourceDir: './src',
  excludePatterns: [
    '*.test.tsx', '*.test.ts', '*.stories.tsx', '*.d.ts',
    '*.example.*', '*.config.*', '*.md', '*.json',
    'node_modules', '.next', 'dist', 'coverage', '__tests__'
  ],
  allowedFiles: [
    '.env.example', '.env.local.example', '.env.production.example'
  ]
};

// Secret detection patterns
const SECRET_PATTERNS = [
  {
    name: 'API Keys',
    patterns: [
      /api[_-]?key\s*[:=]\s*["']?[a-zA-Z0-9]{20,}["']?/gi,
      /key\s*[:=]\s*["']?[a-zA-Z0-9]{32,}["']?/gi
    ],
    severity: 'high'
  },
  {
    name: 'Auth Tokens',
    patterns: [
      /auth[_-]?token\s*[:=]\s*["']?[a-zA-Z0-9._-]{20,}["']?/gi,
      /bearer\s+[a-zA-Z0-9._-]{20,}/gi,
      /token\s*[:=]\s*["']?[a-zA-Z0-9._-]{32,}["']?/gi
    ],
    severity: 'high'
  },
  {
    name: 'Private Keys',
    patterns: [
      /private[_-]?key\s*[:=]\s*["']?[a-zA-Z0-9\/+]{100,}={0,2}["']?/gi,
      /-----BEGIN\s+(RSA\s+)?PRIVATE\s+KEY-----/gi
    ],
    severity: 'critical'
  },
  {
    name: 'Passwords',
    patterns: [
      /password\s*[:=]\s*["'][^"']{8,}["']/gi,
      /passwd\s*[:=]\s*["'][^"']{8,}["']/gi
    ],
    severity: 'high'
  },
  {
    name: 'Stripe Keys',
    patterns: [
      /pk_live_[a-zA-Z0-9]{24,}/gi,
      /sk_live_[a-zA-Z0-9]{24,}/gi,
      /rk_live_[a-zA-Z0-9]{24,}/gi
    ],
    severity: 'critical'
  },
  {
    name: 'Slack Tokens',
    patterns: [
      /xoxp-[a-zA-Z0-9-]{72}/gi,
      /xoxb-[a-zA-Z0-9-]{72}/gi
    ],
    severity: 'high'
  },
  {
    name: 'Google API',
    patterns: [
      /ya29\.[a-zA-Z0-9_-]{68,}/gi,
      /AIza[a-zA-Z0-9_-]{35}/gi
    ],
    severity: 'high'
  },
  {
    name: 'AWS Keys',
    patterns: [
      /AKIA[0-9A-Z]{16}/gi,
      /[a-zA-Z0-9\/+=]{40}/gi
    ],
    severity: 'critical'
  },
  {
    name: 'Database URLs',
    patterns: [
      /mongodb:\/\/[^"'\s]+/gi,
      /postgres:\/\/[^"'\s]+/gi,
      /mysql:\/\/[^"'\s]+/gi
    ],
    severity: 'high'
  },
  {
    name: 'JWT Secrets',
    patterns: [
      /jwt[_-]?secret\s*[:=]\s*["'][^"']{16,}["']/gi,
      /secret[_-]?key\s*[:=]\s*["'][^"']{16,}["']/gi
    ],
    severity: 'high'
  }
];

// Safe patterns to ignore (environment variables, placeholders, etc.)
const SAFE_PATTERNS = [
  /process\.env\./gi,
  /\{.*\}/gi, // Template variables
  /your[_-]?api[_-]?key/gi,
  /your[_-]?secret/gi,
  /example[_-]?key/gi,
  /placeholder/gi,
  /xxx+/gi,
  /\*{3,}/gi, // Masked values
  /sk_test_/gi, // Test keys
  /pk_test_/gi
];

class SecretChecker {
  constructor(options = {}) {
    this.strict = options.strict || false;
    this.targetPath = options.path || CONFIG.sourceDir;
    this.findings = [];
    this.stats = {
      filesScanned: 0,
      secretsFound: 0,
      criticalFindings: 0,
      highFindings: 0
    };
  }

  isSafePattern(text) {
    return SAFE_PATTERNS.some(pattern => pattern.test(text));
  }

  isAllowedFile(filePath) {
    const fileName = path.basename(filePath);
    return CONFIG.allowedFiles.some(allowed => fileName.includes(allowed));
  }

  scanFile(filePath) {
    if (this.isAllowedFile(filePath)) {
      return [];
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(process.cwd(), filePath);
    const findings = [];

    SECRET_PATTERNS.forEach(({ name, patterns, severity }) => {
      patterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          const secretText = match[0];
          
          // Skip if it's a safe pattern
          if (this.isSafePattern(secretText)) {
            continue;
          }

          const lineNumber = this.getLineNumber(content, match.index);
          const contextStart = Math.max(0, match.index - 50);
          const contextEnd = Math.min(content.length, match.index + secretText.length + 50);
          const context = content.substring(contextStart, contextEnd);

          findings.push({
            file: relativePath,
            line: lineNumber,
            type: name,
            severity,
            secret: secretText,
            context: context.replace(/\n/g, ' ').trim(),
            position: match.index
          });

          if (severity === 'critical') {
            this.stats.criticalFindings++;
          } else if (severity === 'high') {
            this.stats.highFindings++;
          }
        }
      });
    });

    return findings;
  }

  getLineNumber(content, position) {
    const lines = content.substring(0, position).split('\n');
    return lines.length;
  }

  scanDirectory(dir) {
    const entries = fs.readdirSync(dir);

    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip excluded directories
        if (!CONFIG.excludePatterns.some(pattern => 
          entry.includes(pattern.replace('*', '')))) {
          this.scanDirectory(fullPath);
        }
      } else if (stat.isFile()) {
        // Include relevant files, exclude test and config files
        if (this.shouldScanFile(entry)) {
          this.stats.filesScanned++;
          const fileFindings = this.scanFile(fullPath);
          this.findings.push(...fileFindings);
          this.stats.secretsFound += fileFindings.length;
        }
      }
    }
  }

  shouldScanFile(fileName) {
    // Include most source files
    const includedExtensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.env'];
    const hasIncludedExtension = includedExtensions.some(ext => fileName.endsWith(ext));
    
    if (!hasIncludedExtension) return false;

    // Exclude test and config files unless in strict mode
    if (!this.strict) {
      const excludeFile = CONFIG.excludePatterns.some(pattern => 
        fileName.match(pattern.replace('*', '.*')));
      if (excludeFile) return false;
    }

    return true;
  }

  generateReport() {
    console.log('🔒 LusoTown Secret Pattern Checker');
    console.log(`📁 Scanned: ${this.stats.filesScanned} files`);
    console.log(`🚨 Found: ${this.stats.secretsFound} potential secrets`);
    console.log(`⚠️  Critical: ${this.stats.criticalFindings}`);
    console.log(`🔸 High: ${this.stats.highFindings}`);
    console.log('');

    if (this.findings.length === 0) {
      console.log('✅ No secret patterns detected!');
      return true;
    }

    // Group findings by severity
    const grouped = this.findings.reduce((acc, finding) => {
      if (!acc[finding.severity]) acc[finding.severity] = [];
      acc[finding.severity].push(finding);
      return acc;
    }, {});

    Object.entries(grouped).forEach(([severity, findings]) => {
      const icon = severity === 'critical' ? '🚨' : '⚠️';
      console.log(`${icon} ${severity.toUpperCase()} FINDINGS (${findings.length}):`);
      
      findings.forEach(finding => {
        console.log(`  📄 ${finding.file}:${finding.line}`);
        console.log(`  🔍 Type: ${finding.type}`);
        console.log(`  📝 Context: ${finding.context}`);
        console.log('');
      });
    });

    return false;
  }

  run() {
    // Handle single file
    if (fs.existsSync(this.targetPath) && fs.statSync(this.targetPath).isFile()) {
      this.stats.filesScanned = 1;
      const findings = this.scanFile(this.targetPath);
      this.findings.push(...findings);
      this.stats.secretsFound = findings.length;
    } else {
      this.scanDirectory(this.targetPath);
    }

    const isClean = this.generateReport();
    
    if (!isClean) {
      console.log('🔧 Remediation Steps:');
      console.log('1. Move secrets to environment variables');
      console.log('2. Use process.env.VARIABLE_NAME in code');
      console.log('3. Add sensitive values to .env.local (gitignored)');
      console.log('4. Update .env.example with placeholder values');
      console.log('5. Review and commit changes');
      console.log('');
      
      process.exit(1);
    }
    
    process.exit(0);
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    strict: args.includes('--strict'),
    path: args.find(arg => arg.startsWith('--path='))?.split('=')[1]
  };

  const checker = new SecretChecker(options);
  checker.run();
}

module.exports = SecretChecker;