#!/usr/bin/env node

/**
 * Advanced Console Log Removal Script for Portuguese-speaking Community Platform
 * Removes console.log statements from production code while preserving error handling
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  sourceDir: path.join(__dirname, '../src'),
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  excludeDirs: ['__tests__', 'test', 'spec', 'node_modules', '.next'],
  preserveLogTypes: ['error', 'warn'], // Keep these console methods
  backupDir: path.join(__dirname, '../.console-logs-backup'),
  dryRun: process.argv.includes('--dry-run')
};

// Patterns to match console.log statements
const CONSOLE_LOG_PATTERNS = [
  // Basic console.log patterns
  /console\.log\s*\([^)]*\);?\s*\n?/g,
  /console\.debug\s*\([^)]*\);?\s*\n?/g,
  /console\.info\s*\([^)]*\);?\s*\n?/g,
  /console\.trace\s*\([^)]*\);?\s*\n?/g,
  
  // Multiline console.log patterns
  /console\.log\s*\(\s*[^)]*\n[^)]*\);?\s*\n?/g,
  
  // Template literal console.logs
  /console\.log\s*\(\s*`[^`]*`\s*\);?\s*\n?/g,
  
  // Object destructuring in console.log
  /console\.log\s*\(\s*\{[^}]*\}\s*\);?\s*\n?/g
];

// Portuguese community specific console.log patterns to remove
const PORTUGUESE_LOG_PATTERNS = [
  /console\.log\s*\(\s*['"]['"]Portuguese[\s\S]*?['"]['"][\s\S]*?\);?\s*\n?/g,
  /console\.log\s*\(\s*['"]['"]LusoTown[\s\S]*?['"]['"][\s\S]*?\);?\s*\n?/g,
  /console\.log\s*\(\s*['"]['"]Cultural[\s\S]*?['"]['"][\s\S]*?\);?\s*\n?/g,
  /console\.log\s*\(\s*['"]['"]Event[\s\S]*?['"]['"][\s\S]*?\);?\s*\n?/g,
  /console\.log\s*\(\s*['"]['"]Business[\s\S]*?['"]['"][\s\S]*?\);?\s*\n?/g
];

// Statistics
const stats = {
  filesProcessed: 0,
  consoleLogsRemoved: 0,
  linesRemoved: 0,
  filesModified: 0,
  errors: []
};

/**
 * Get all TypeScript/JavaScript files recursively
 */
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip excluded directories
      if (!CONFIG.excludeDirs.includes(file)) {
        getAllFiles(filePath, fileList);
      }
    } else {
      // Include files with specified extensions
      const ext = path.extname(file);
      if (CONFIG.extensions.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

/**
 * Create backup of original file
 */
function createBackup(filePath, content) {
  if (CONFIG.dryRun) return;
  
  const relativePath = path.relative(CONFIG.sourceDir, filePath);
  const backupPath = path.join(CONFIG.backupDir, relativePath);
  const backupDir = path.dirname(backupPath);
  
  // Ensure backup directory exists
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  fs.writeFileSync(backupPath, content);
}

/**
 * Remove console.log statements from code
 */
function removeConsoleLogs(content, filePath) {
  let modifiedContent = content;
  let removedCount = 0;
  let linesRemovedCount = 0;
  
  // Remove Portuguese-specific console.logs first
  PORTUGUESE_LOG_PATTERNS.forEach(pattern => {
    const matches = modifiedContent.match(pattern) || [];
    removedCount += matches.length;
    linesRemovedCount += matches.reduce((count, match) => {
      return count + (match.match(/\n/g) || []).length;
    }, 0);
    modifiedContent = modifiedContent.replace(pattern, '');
  });
  
  // Remove general console.log patterns
  CONSOLE_LOG_PATTERNS.forEach(pattern => {
    const matches = modifiedContent.match(pattern) || [];
    removedCount += matches.length;
    linesRemovedCount += matches.reduce((count, match) => {
      return count + (match.match(/\n/g) || []).length;
    }, 0);
    modifiedContent = modifiedContent.replace(pattern, '');
  });
  
  // Clean up empty lines and excessive whitespace
  modifiedContent = modifiedContent
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove multiple empty lines
    .replace(/^\s*\n/gm, '') // Remove leading empty lines
    .replace(/\n\s*$/, '\n'); // Ensure single trailing newline
  
  return {
    content: modifiedContent,
    removedCount,
    linesRemovedCount,
    hasChanges: removedCount > 0
  };
}

/**
 * Check if file should be preserved (contains important console methods)
 */
function shouldPreserveFile(content) {
  // Preserve files with error handling or development utilities
  const preservePatterns = [
    /console\.error/,
    /console\.warn/,
    /console\.assert/,
    /console\.table/,
    /console\.group/,
    /console\.time/,
    /@debug/,
    /development.*console/i,
    /debug.*mode/i
  ];
  
  return preservePatterns.some(pattern => pattern.test(content));
}

/**
 * Process a single file
 */
function processFile(filePath) {
  try {
    stats.filesProcessed++;
    
    const originalContent = fs.readFileSync(filePath, 'utf8');
    
    // Skip files that should be preserved
    if (shouldPreserveFile(originalContent)) {
      console.log(`🔒 Preserving: ${path.relative(CONFIG.sourceDir, filePath)} (contains important console methods)`);
      return;
    }
    
    const result = removeConsoleLogs(originalContent, filePath);
    
    if (result.hasChanges) {
      stats.filesModified++;
      stats.consoleLogsRemoved += result.removedCount;
      stats.linesRemoved += result.linesRemovedCount;
      
      console.log(`🧹 Cleaned: ${path.relative(CONFIG.sourceDir, filePath)} (${result.removedCount} console.logs, ${result.linesRemovedCount} lines)`);
      
      if (!CONFIG.dryRun) {
        // Create backup
        createBackup(filePath, originalContent);
        
        // Write cleaned content
        fs.writeFileSync(filePath, result.content);
      }
    }
  } catch (error) {
    stats.errors.push({
      file: filePath,
      error: error.message
    });
    console.error(`❌ Error processing ${filePath}: ${error.message}`);
  }
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Portuguese Community Platform - Console Log Cleanup');
  console.log('================================================');
  
  if (CONFIG.dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified');
  }
  
  console.log(`📁 Source directory: ${CONFIG.sourceDir}`);
  console.log(`💾 Backup directory: ${CONFIG.backupDir}`);
  console.log(`🔧 Extensions: ${CONFIG.extensions.join(', ')}`);
  console.log(`🚫 Excluding: ${CONFIG.excludeDirs.join(', ')}`);
  console.log('');
  
  // Get all files to process
  const files = getAllFiles(CONFIG.sourceDir);
  console.log(`📋 Found ${files.length} files to process\n`);
  
  // Create backup directory
  if (!CONFIG.dryRun && !fs.existsSync(CONFIG.backupDir)) {
    fs.mkdirSync(CONFIG.backupDir, { recursive: true });
  }
  
  // Process each file
  files.forEach(processFile);
  
  // Print summary
  console.log('\n📊 Summary');
  console.log('==========');
  console.log(`Files processed: ${stats.filesProcessed}`);
  console.log(`Files modified: ${stats.filesModified}`);
  console.log(`Console.logs removed: ${stats.consoleLogsRemoved}`);
  console.log(`Lines removed: ${stats.linesRemoved}`);
  console.log(`Errors: ${stats.errors.length}`);
  
  if (stats.errors.length > 0) {
    console.log('\n❌ Errors:');
    stats.errors.forEach(({ file, error }) => {
      console.log(`  ${path.relative(CONFIG.sourceDir, file)}: ${error}`);
    });
  }
  
  if (!CONFIG.dryRun && stats.filesModified > 0) {
    console.log(`\n💾 Backups created in: ${CONFIG.backupDir}`);
    console.log('🔄 Run "npm run restore:console-logs" to restore if needed');
  }
  
  // Portuguese community performance impact
  const estimatedSizeReduction = stats.linesRemoved * 50; // Approximate bytes per line
  console.log(`\n🇵🇹 Portuguese Community Platform Benefits:`);
  console.log(`   Estimated bundle size reduction: ~${Math.round(estimatedSizeReduction / 1024)}KB`);
  console.log(`   Improved mobile performance for Portuguese speakers`);
  console.log(`   Cleaner production code for cultural authenticity`);
  
  process.exit(stats.errors.length > 0 ? 1 : 0);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  removeConsoleLogs,
  CONFIG,
  stats
};