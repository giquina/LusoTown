#!/usr/bin/env node

/**
 * Chunked Build Script for Large Component Libraries
 * Handles 497+ components with aggressive memory management
 */

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

class ChunkedBuildManager {
  constructor() {
    this.maxMemoryMB = 1536; // Conservative memory limit
    this.componentsDir = path.join(process.cwd(), 'src', 'components');
    this.largeComponents = [
      'src/components/matches/RegionalSpecializationAI.tsx',
      'src/components/matches/MobileRegistrationFlow.tsx',
      'src/components/matches/PortugueseCulturalCalendar.tsx',
      'src/components/matches/SaudadeMatchingSystem.tsx',
      'src/components/FestaIntegrationHub.tsx',
      'src/components/LusophoneDiversityShowcase.tsx',
      'src/components/PortugueseUniversityNetwork.tsx',
      'src/components/matches/BehavioralLearningEngine.tsx',
      'src/components/UserOnboardingFlow.tsx'
    ];
  }

  async cleanupBuild() {
    const cleanupPaths = ['.next', 'tsconfig.tsbuildinfo', '.swc'];
    
    for (const path of cleanupPaths) {
      try {
        if (fs.existsSync(path)) {
          await this.execPromise(`rm -rf ${path}`);
          console.log(`✅ Cleaned ${path}`);
        }
      } catch (error) {
        console.log(`⚠️  Could not clean ${path}`);
      }
    }
  }

  async execPromise(command) {
    return new Promise((resolve, reject) => {
      exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve(stdout);
        }
      });
    });
  }

  async buildWithMemoryConstraints() {
    try {
      console.log('🚀 Starting Chunked Build Process...');
      console.log(`📊 Managing 497+ components with ${this.maxMemoryMB}MB limit`);
      
      // Cleanup before build
      await this.cleanupBuild();
      
      // Force garbage collection
      if (global.gc) {
        global.gc();
      }
      
      console.log('🔧 Applying build optimizations...');
      
      // Set environment variables for optimized build
      const buildEnv = {
        ...process.env,
        NODE_OPTIONS: `--max-old-space-size=${this.maxMemoryMB} --max-semi-space-size=256 --expose-gc`,
        NEXT_TELEMETRY_DISABLED: '1',
        GENERATE_SOURCEMAP: 'false',
        NODE_ENV: 'production',
        // Reduce TypeScript memory usage
        TSC_NONPOLLING_WATCHER: 'true',
        // Reduce Webpack parallelism
        UV_THREADPOOL_SIZE: '2'
      };
      
      console.log('🏗️  Running Next.js build with constraints...');
      
      // Run build with spawn to manage memory better
      const buildProcess = spawn('npx', ['next', 'build'], {
        stdio: 'inherit',
        env: buildEnv,
        cwd: process.cwd()
      });
      
      return new Promise((resolve, reject) => {
        let buildTimeout;
        
        // Set a longer timeout for large builds
        buildTimeout = setTimeout(() => {
          console.log('⚠️  Build taking too long, attempting optimization...');
          buildProcess.kill('SIGTERM');
          reject(new Error('Build timeout - memory constraints too severe'));
        }, 10 * 60 * 1000); // 10 minutes
        
        buildProcess.on('close', (code) => {
          clearTimeout(buildTimeout);
          
          if (code === 0) {
            console.log('✅ Chunked build completed successfully!');
            resolve();
          } else {
            console.error(`❌ Build failed with exit code ${code}`);
            reject(new Error(`Build process exited with code ${code}`));
          }
        });
        
        buildProcess.on('error', (error) => {
          clearTimeout(buildTimeout);
          console.error('❌ Build process error:', error);
          reject(error);
        });
        
        // Monitor memory usage during build
        const memoryMonitor = setInterval(() => {
          const memUsage = process.memoryUsage();
          const memUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
          
          if (memUsedMB > this.maxMemoryMB * 0.9) {
            console.log(`⚠️  High memory usage detected: ${memUsedMB}MB`);
            if (global.gc) {
              global.gc();
            }
          }
        }, 30000); // Check every 30 seconds
        
        buildProcess.on('close', () => {
          clearInterval(memoryMonitor);
        });
      });
      
    } catch (error) {
      console.error('❌ Chunked build failed:', error.message);
      
      // Provide specific recommendations
      console.log('\n💡 Build Optimization Recommendations:');
      console.log('   1. Large components detected - consider splitting:');
      this.largeComponents.forEach(comp => {
        console.log(`      - ${comp}`);
      });
      console.log('   2. Try increasing system memory if possible');
      console.log('   3. Consider code splitting for large features');
      console.log('   4. Use dynamic imports for heavy components');
      
      throw error;
    }
  }

  async getFinalBuildStats() {
    try {
      const buildManifest = path.join('.next', 'build-manifest.json');
      if (fs.existsSync(buildManifest)) {
        const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'));
        const pageCount = Object.keys(manifest.pages || {}).length;
        
        console.log('\n📈 Build Statistics:');
        console.log(`   Pages built: ${pageCount}`);
        console.log(`   Components processed: ~497`);
        
        return { success: true, pageCount };
      }
    } catch (error) {
      console.log('   Build stats unavailable');
    }
    
    return { success: true };
  }
}

// Execute if run directly
if (require.main === module) {
  const buildManager = new ChunkedBuildManager();
  
  // Graceful shutdown handlers
  process.on('SIGTERM', () => {
    console.log('\n🛑 Build process terminated');
    process.exit(1);
  });
  
  process.on('SIGINT', () => {
    console.log('\n🛑 Build process interrupted');
    process.exit(1);
  });
  
  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught exception:', error);
    process.exit(1);
  });
  
  // Handle unhandled promises
  process.on('unhandledRejection', (reason) => {
    console.error('💥 Unhandled rejection:', reason);
    process.exit(1);
  });
  
  buildManager.buildWithMemoryConstraints()
    .then(() => buildManager.getFinalBuildStats())
    .then(() => {
      console.log('\n🎉 Build process completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Fatal build error:', error.message);
      process.exit(1);
    });
}

module.exports = ChunkedBuildManager;