#!/usr/bin/env node
/**
 * Production Console Log Cleanup Script
 * Removes all console.log statements from production code for Portuguese community platform
 * Preserves console.error and console.warn for critical debugging
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Directories to clean
const TARGET_DIRS = [
  'src/**/*.{ts,tsx,js,jsx}',
  '!src/**/*.test.{ts,tsx,js,jsx}',
  '!src/**/*.spec.{ts,tsx,js,jsx}',
  '!src/**/test/**',
  '!src/**/__tests__/**'
];

// Patterns to remove (but preserve error/warn)
const CONSOLE_PATTERNS = [
  /console\.log\([^)]*\);?\s*/g,
  /console\.debug\([^)]*\);?\s*/g,
  /console\.info\([^)]*\);?\s*/g,
  /console\.trace\([^)]*\);?\s*/g
];

// Production cleanup statistics
let filesProcessed = 0;
let consolesRemoved = 0;
let totalFilesSaved = 0;

function cleanFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let fileConsolesRemoved = 0;

    // Remove console patterns
    CONSOLE_PATTERNS.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        fileConsolesRemoved += matches.length;
        content = content.replace(pattern, '');
      }
    });

    // Clean up empty lines that might be left behind
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Cleaned ${fileConsolesRemoved} console.log from: ${filePath}`);
      consolesRemoved += fileConsolesRemoved;
      totalFilesSaved++;
    }

    filesProcessed++;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

function main() {
  console.log('🚀 Starting Production Console Cleanup for Portuguese Community Platform...\n');

  TARGET_DIRS.forEach(pattern => {
    const files = glob.sync(pattern, { cwd: process.cwd() });
    
    files.forEach(file => {
      const fullPath = path.resolve(file);
      if (fs.existsSync(fullPath)) {
        cleanFile(fullPath);
      }
    });
  });

  console.log('\n📊 Cleanup Summary:');
  console.log('==================');
  console.log(`Files processed: ${filesProcessed}`);
  console.log(`Console.log statements removed: ${consolesRemoved}`);
  console.log(`Files cleaned: ${totalFilesSaved}`);
  
  if (totalFilesSaved > 0) {
    console.log('\n✨ Production code cleanup complete!');
    console.log('🇵🇹 Portuguese community platform ready for production deployment.');
  } else {
    console.log('\n🎉 No console.log statements found - code already clean!');
  }
}

// Run the cleanup
main();