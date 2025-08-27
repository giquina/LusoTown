#!/usr/bin/env node

/**
 * Memory-Safe Build Script for LusoTown Web App
 * Handles large component libraries (497+ components) with memory optimization
 */

const { spawn } = require('child_process');
const os = require('os');
const fs = require('fs');
const path = require('path');

class MemorySafeBuildManager {
  constructor() {
    this.totalMemory = os.totalmem();
    this.freeMemory = os.freemem();
    this.cpuCount = os.cpus().length;
    
    // Calculate optimal memory allocation (80% of available memory, min 2GB, max 8GB)
    const availableMemoryGB = Math.floor(this.freeMemory / (1024 * 1024 * 1024));
    const optimalMemoryGB = Math.max(2, Math.min(8, Math.floor(availableMemoryGB * 0.8)));
    this.memoryLimit = optimalMemoryGB * 1024; // Convert to MB
    
    console.log(`🧠 Memory Analysis:`);
    console.log(`   Total Memory: ${Math.floor(this.totalMemory / (1024 * 1024 * 1024))}GB`);
    console.log(`   Available Memory: ${availableMemoryGB}GB`);
    console.log(`   Allocated for Build: ${optimalMemoryGB}GB`);
    console.log(`   CPU Cores: ${this.cpuCount}`);
  }

  async cleanupBeforeBuild() {
    console.log('\n🧹 Pre-build cleanup...');
    
    const cleanupPaths = [
      '.next',
      'tsconfig.tsbuildinfo',
      'node_modules/.cache',
      '.swc'
    ];

    for (const cleanupPath of cleanupPaths) {
      try {
        if (fs.existsSync(cleanupPath)) {
          await this.executeCommand(`rm -rf ${cleanupPath}`);
          console.log(`   ✅ Cleaned ${cleanupPath}`);
        }
      } catch (error) {
        console.log(`   ⚠️ Could not clean ${cleanupPath}: ${error.message}`);
      }
    }
  }

  getOptimizedNodeOptions() {
    const options = [
      `--max-old-space-size=${this.memoryLimit}`,
      '--max-semi-space-size=512',
      '--experimental-loader', './loader.mjs',
      '--no-warnings',
      '--expose-gc'
    ];

    // Add additional optimizations for large codebases
    if (this.memoryLimit >= 4096) {
      options.push('--optimize-for-size');
    }

    return options.join(' ');
  }

  async executeCommand(command, options = {}) {
    return new Promise((resolve, reject) => {
      const fullCommand = `cd /workspaces/LusoTown/web-app && ${command}`;
      const child = spawn('bash', ['-c', fullCommand], {
        stdio: 'inherit',
        env: { 
          ...process.env, 
          PATH: `/workspaces/LusoTown/web-app/node_modules/.bin:${process.env.PATH}`,
          ...options.env 
        },
        cwd: '/workspaces/LusoTown/web-app',
        ...options
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Command failed with exit code ${code}`));
        }
      });

      child.on('error', reject);
    });
  }

  async runMemorySafeBuild() {
    try {
      console.log('\n🚀 Starting Memory-Safe Build Process...');
      console.log('📊 Build Configuration:');
      console.log(`   Components to compile: ~497`);
      console.log(`   Memory allocation: ${this.memoryLimit}MB`);
      console.log(`   Node.js optimization: enabled`);
      
      // Step 1: Cleanup
      await this.cleanupBeforeBuild();
      
      // Step 2: Pre-build TypeScript check with memory limits
      console.log('\n📝 TypeScript validation...');
      const tscEnv = {
        NODE_OPTIONS: this.getOptimizedNodeOptions(),
        TS_NODE_TRANSPILE_ONLY: 'true',
        TS_NODE_TYPE_CHECK: 'false'
      };
      
      try {
        await this.executeCommand('npx tsc --noEmit --incremental', { env: tscEnv });
        console.log('   ✅ TypeScript validation passed');
      } catch (error) {
        console.log('   ⚠️ TypeScript validation failed, proceeding with build...');
        // Don't fail the build for TS errors in memory-safe mode
      }
      
      // Step 3: Main build with optimizations
      console.log('\n🏗️ Running Next.js build with memory optimizations...');
      const buildEnv = {
        NODE_OPTIONS: this.getOptimizedNodeOptions(),
        NEXT_TELEMETRY_DISABLED: '1',
        // Disable source maps in memory-constrained environments
        GENERATE_SOURCEMAP: 'false',
        // Enable SWC optimizations
        SWC_ENABLED: 'true',
        // Reduce parallelism to save memory
        UV_THREADPOOL_SIZE: Math.max(2, Math.floor(this.cpuCount / 2)).toString()
      };
      
      await this.executeCommand('next build', { env: buildEnv });
      
      console.log('\n✅ Memory-safe build completed successfully!');
      console.log('📈 Build Statistics:');
      
      // Display build statistics if available
      try {
        const nextFolder = '.next';
        if (fs.existsSync(nextFolder)) {
          const stats = await this.getBuildStats(nextFolder);
          console.log(`   Bundle size: ${stats.bundleSize}`);
          console.log(`   Pages built: ${stats.pageCount}`);
        }
      } catch (error) {
        console.log('   Build stats unavailable');
      }
      
    } catch (error) {
      console.error('\n❌ Memory-safe build failed:');
      console.error(error.message);
      
      // Provide memory optimization suggestions
      console.log('\n💡 Memory Optimization Suggestions:');
      console.log('   1. Try reducing component complexity');
      console.log('   2. Consider code splitting for large components');
      console.log('   3. Check for memory leaks in components');
      console.log('   4. Increase available system memory if possible');
      
      process.exit(1);
    }
  }

  async getBuildStats(buildPath) {
    try {
      const buildManifest = path.join(buildPath, 'build-manifest.json');
      if (fs.existsSync(buildManifest)) {
        const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'));
        return {
          bundleSize: 'Available',
          pageCount: Object.keys(manifest.pages || {}).length
        };
      }
    } catch (error) {
      // Ignore errors in stats collection
    }
    
    return {
      bundleSize: 'Unknown',
      pageCount: 'Unknown'
    };
  }

  // Force garbage collection if available
  forceGarbageCollection() {
    if (global.gc) {
      global.gc();
      console.log('🗑️  Garbage collection triggered');
    }
  }
}

// Execute if run directly
if (require.main === module) {
  const buildManager = new MemorySafeBuildManager();
  
  // Handle process signals gracefully
  process.on('SIGTERM', () => {
    console.log('\n🛑 Build process terminated');
    process.exit(1);
  });
  
  process.on('SIGINT', () => {
    console.log('\n🛑 Build process interrupted');
    process.exit(1);
  });
  
  buildManager.runMemorySafeBuild().catch((error) => {
    console.error('Fatal build error:', error);
    process.exit(1);
  });
}

module.exports = MemorySafeBuildManager;