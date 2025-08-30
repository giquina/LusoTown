#!/usr/bin/env node

/**
 * Automatic Cleanup Script for LusoTown Build Performance
 * Runs before every build to ensure optimal disk space
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class AutoCleanup {
  constructor() {
    this.cleanupPaths = [
      '.next',
      'tsconfig.tsbuildinfo',
      '.swc',
      'build.log',
      'dev-server.log',
      'test-results',
      'playwright-report',
      'node_modules/.cache',
      '.eslintcache'
    ];
  }

  async run() {
    console.log('🧹 Starting automatic pre-build cleanup...');
    
    let totalFreed = 0;
    
    for (const cleanupPath of this.cleanupPaths) {
      try {
        if (fs.existsSync(cleanupPath)) {
          const sizeBefore = this.getDirectorySize(cleanupPath);
          
          if (fs.lstatSync(cleanupPath).isDirectory()) {
            execSync(`rm -rf "${cleanupPath}"`, { stdio: 'pipe' });
          } else {
            fs.unlinkSync(cleanupPath);
          }
          
          totalFreed += sizeBefore;
          console.log(`  ✅ Removed ${cleanupPath} (${this.formatBytes(sizeBefore)})`);
        }
      } catch (error) {
        console.log(`  ⚠️  Could not clean ${cleanupPath}`);
      }
    }
    
    // Clean npm cache periodically
    try {
      execSync('npm cache clean --force', { stdio: 'pipe' });
      console.log('  ✅ Cleaned npm cache');
    } catch (error) {
      // Ignore cache clean errors
    }
    
    // Show disk space after cleanup
    const diskSpace = this.getDiskSpace();
    console.log(`\n💾 Total freed: ${this.formatBytes(totalFreed)}`);
    console.log(`📊 Available space: ${diskSpace.available} / ${diskSpace.total} (${diskSpace.percentage}% used)\n`);
    
    return totalFreed;
  }
  
  getDirectorySize(dirPath) {
    try {
      const result = execSync(`du -sb "${dirPath}" 2>/dev/null || echo "0	${dirPath}"`, { encoding: 'utf8' });
      return parseInt(result.split('\t')[0]) || 0;
    } catch {
      return 0;
    }
  }
  
  getDiskSpace() {
    try {
      const result = execSync('df -h .', { encoding: 'utf8' });
      const lines = result.trim().split('\n');
      const data = lines[1].split(/\s+/);
      return {
        total: data[1],
        used: data[2], 
        available: data[3],
        percentage: data[4].replace('%', '')
      };
    } catch {
      return { total: 'unknown', used: 'unknown', available: 'unknown', percentage: 'unknown' };
    }
  }
  
  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Run if called directly
if (require.main === module) {
  const cleanup = new AutoCleanup();
  cleanup.run().catch(console.error);
}

module.exports = AutoCleanup;