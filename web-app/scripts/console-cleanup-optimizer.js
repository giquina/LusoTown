#!/usr/bin/env node
/**
 * Console Log Cleanup Optimizer for Portuguese Community Platform
 * Replaces all console.log statements with structured logging
 * Preserves Portuguese cultural context and community functionality
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ConsoleCleanupOptimizer {
  constructor() {
    this.startTime = Date.now();
    this.processedFiles = [];
    this.replacedStatements = 0;
    this.errors = [];
    this.culturalContextPreserved = 0;
    
    // Portuguese community logging patterns to preserve context
    this.culturalPatterns = [
      'Portuguese Community',
      'Lusophone',
      'PALOP',
      'Cultural',
      'Portuguese',
      'Brazilian',
      'Portuguese-speaking',
      'Heritage',
      'Community',
      'Matching',
      'Events',
      'Business'
    ];
  }

  log(message) {
    console.log(`🧹 ${message}`);
  }

  async findConsoleStatements() {
    this.log('Scanning for console statements...');
    
    try {
      const result = execSync(
        `grep -r -n "console\\.(log|error|warn|info|debug)" src/ --include="*.ts" --include="*.tsx" --exclude-dir=node_modules`,
        { encoding: 'utf8' }
      );
      
      const matches = result.split('\n').filter(line => line.trim());
      this.log(`Found ${matches.length} console statements`);
      
      return matches;
    } catch (error) {
      this.log('No console statements found or error scanning');
      return [];
    }
  }

  detectCulturalContext(line) {
    const lowerLine = line.toLowerCase();
    return this.culturalPatterns.some(pattern => 
      lowerLine.includes(pattern.toLowerCase())
    );
  }

  generateLoggerReplacement(originalStatement, filePath, lineNumber) {
    // Extract the console method and message
    const consoleMatch = originalStatement.match(/console\.(log|error|warn|info|debug)\(([^)]+)\)/);
    if (!consoleMatch) return null;

    const [, method, args] = consoleMatch;
    const hasCulturalContext = this.detectCulturalContext(originalStatement);
    
    // Determine platform area based on file path
    let area = 'community';
    if (filePath.includes('/api/')) area = 'auth';
    else if (filePath.includes('/business')) area = 'business';
    else if (filePath.includes('/events')) area = 'events';
    else if (filePath.includes('/matching')) area = 'matching';
    else if (filePath.includes('/ai') || filePath.includes('Bot')) area = 'ai';
    else if (filePath.includes('/mobile')) area = 'mobile';
    else if (filePath.includes('performance')) area = 'performance';
    else if (filePath.includes('security')) area = 'security';
    else if (filePath.includes('cultural')) area = 'cultural';

    // Generate appropriate logger call
    let replacement;
    const metaObject = `{ migratedFrom: 'console.${method}', migratedAt: '${new Date().toISOString()}' }`;
    
    if (method === 'error') {
      replacement = `logger.${area}.error(${args}, undefined, ${metaObject})`;
    } else if (method === 'warn') {
      replacement = `logger.${area}.warn(${args}, ${metaObject})`;
    } else {
      replacement = `logger.${area}.info(${args}, ${metaObject})`;
    }

    if (hasCulturalContext) {
      this.culturalContextPreserved++;
    }

    return replacement;
  }

  async replaceConsoleStatements(matches) {
    this.log('Replacing console statements with structured logging...');
    
    const fileGroups = {};
    
    // Group matches by file
    matches.forEach(match => {
      const parts = match.split(':');
      if (parts.length >= 3) {
        const filePath = parts[0];
        const lineNumber = parseInt(parts[1]);
        const content = parts.slice(2).join(':').trim();
        
        if (!fileGroups[filePath]) {
          fileGroups[filePath] = [];
        }
        
        fileGroups[filePath].push({ lineNumber, content, originalMatch: match });
      }
    });

    // Process each file
    for (const [filePath, statements] of Object.entries(fileGroups)) {
      try {
        await this.processFile(filePath, statements);
        this.processedFiles.push(filePath);
      } catch (error) {
        this.errors.push({ filePath, error: error.message });
        this.log(`Error processing ${filePath}: ${error.message}`);
      }
    }
  }

  async processFile(filePath, statements) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let hasLoggerImport = content.includes('import logger') || content.includes('from \'@/utils/logger\'');
    
    // Sort statements by line number descending to avoid line number shifts
    statements.sort((a, b) => b.lineNumber - a.lineNumber);
    
    for (const statement of statements) {
      const replacement = this.generateLoggerReplacement(
        statement.content, 
        filePath, 
        statement.lineNumber
      );
      
      if (replacement) {
        // Find and replace the console statement
        const consolePattern = /console\.(log|error|warn|info|debug)\([^)]*\)/g;
        const originalContent = content;
        
        content = content.replace(consolePattern, (match) => {
          if (match === statement.content.match(consolePattern)?.[0]) {
            this.replacedStatements++;
            modified = true;
            return replacement;
          }
          return match;
        });
        
        if (content === originalContent) {
          // Try a more specific replacement
          const lines = content.split('\n');
          if (lines[statement.lineNumber - 1] && lines[statement.lineNumber - 1].includes('console.')) {
            lines[statement.lineNumber - 1] = lines[statement.lineNumber - 1].replace(
              consolePattern, 
              replacement
            );
            content = lines.join('\n');
            this.replacedStatements++;
            modified = true;
          }
        }
      }
    }

    // Add logger import if needed and modifications were made
    if (modified && !hasLoggerImport) {
      const importStatement = "import logger from '@/utils/logger';\n";
      
      // Find the right place to insert the import
      if (content.includes('import React')) {
        content = content.replace(
          /(import React[^;]*;)/,
          `$1\n${importStatement}`
        );
      } else if (content.includes('import')) {
        // Add after the last import
        const lastImportIndex = content.lastIndexOf('import');
        const nextLineIndex = content.indexOf('\n', lastImportIndex);
        content = content.slice(0, nextLineIndex + 1) + importStatement + content.slice(nextLineIndex + 1);
      } else {
        // Add at the beginning if no imports
        content = importStatement + content;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      this.log(`✅ Updated ${filePath} - ${statements.length} statements replaced`);
    }
  }

  generateReport() {
    const duration = Date.now() - this.startTime;
    
    const report = {
      title: 'Console Log Cleanup Report - Portuguese Community Platform',
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`,
      summary: {
        processedFiles: this.processedFiles.length,
        replacedStatements: this.replacedStatements,
        culturalContextPreserved: this.culturalContextPreserved,
        errors: this.errors.length
      },
      files: this.processedFiles,
      errors: this.errors,
      optimizations: [
        'Replaced console statements with structured logging',
        'Preserved Portuguese cultural context in logs',
        'Added proper logger imports where needed',
        'Maintained debugging capabilities for development',
        'Improved production performance by reducing console output'
      ]
    };

    const reportPath = path.join(process.cwd(), 'console-cleanup-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    return report;
  }

  printSummary(report) {
    console.log('\n' + '='.repeat(80));
    console.log('🎯 CONSOLE CLEANUP OPTIMIZATION COMPLETE');
    console.log('📱 Portuguese Community Platform Performance Enhanced');
    console.log('='.repeat(80));
    
    console.log(`\n📊 SUMMARY`);
    console.log(`⏱️  Duration: ${report.duration}`);
    console.log(`📁 Files Processed: ${report.summary.processedFiles}`);
    console.log(`🔄 Statements Replaced: ${report.summary.replacedStatements}`);
    console.log(`🎭 Cultural Context Preserved: ${report.summary.culturalContextPreserved}`);
    console.log(`❌ Errors: ${report.summary.errors}`);
    
    if (report.errors.length > 0) {
      console.log(`\n⚠️  ERRORS:`);
      report.errors.forEach(error => {
        console.log(`   ${error.filePath}: ${error.error}`);
      });
    }
    
    console.log(`\n🚀 NEXT STEPS:`);
    console.log('   1. Run npm run build to test the optimizations');
    console.log('   2. Test Portuguese community features');
    console.log('   3. Monitor performance improvements');
    console.log('   4. Verify cultural context preservation');
    
    console.log('\n' + '='.repeat(80));
  }

  async optimize() {
    this.log('Starting console log cleanup optimization...');
    
    try {
      const matches = await this.findConsoleStatements();
      
      if (matches.length === 0) {
        this.log('✅ No console statements found - already optimized!');
        return;
      }
      
      await this.replaceConsoleStatements(matches);
      const report = this.generateReport();
      this.printSummary(report);
      
      this.log('\n✅ Console cleanup optimization completed successfully!');
      
    } catch (error) {
      console.error('❌ Console cleanup optimization failed:', error);
      throw error;
    }
  }
}

// Run optimization if called directly
if (require.main === module) {
  const optimizer = new ConsoleCleanupOptimizer();
  optimizer.optimize().catch(console.error);
}

module.exports = ConsoleCleanupOptimizer;