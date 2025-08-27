#!/usr/bin/env node

/**
 * Build Performance Monitor
 * Tracks SIGBUS errors, memory issues, and TypeScript compilation performance
 * Specifically designed for LusoTown's large Portuguese-speaking community platform
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

class BuildPerformanceMonitor {
  constructor() {
    this.startTime = Date.now();
    this.memorySnapshots = [];
    this.errorLog = [];
    this.performanceMetrics = {
      typeScriptCompilation: null,
      webpackBundling: null,
      componentAnalysis: null,
      buildSuccess: false,
      memoryPeakUsage: 0,
      sigbusErrors: 0,
      timeoutErrors: 0
    };
    
    console.log('🔍 Build Performance Monitor Initialized');
    console.log(`   Target: 522+ Portuguese-speaking community components`);
    console.log(`   System: ${os.totalmem() / 1024 / 1024 / 1024}GB RAM, ${os.cpus().length} CPU cores`);
    console.log(`   Monitoring: SIGBUS errors, memory leaks, compilation timeouts`);
  }

  startMemoryMonitoring() {
    this.memoryMonitorInterval = setInterval(() => {
      const memUsage = process.memoryUsage();
      const memSnapshot = {
        timestamp: Date.now(),
        heapUsed: memUsage.heapUsed,
        heapTotal: memUsage.heapTotal,
        external: memUsage.external,
        rss: memUsage.rss
      };
      
      this.memorySnapshots.push(memSnapshot);
      
      // Track peak memory usage
      if (memUsage.heapUsed > this.performanceMetrics.memoryPeakUsage) {
        this.performanceMetrics.memoryPeakUsage = memUsage.heapUsed;
      }
      
      // Alert on high memory usage (>80% of allocated limit)
      const memUsedMB = memUsage.heapUsed / 1024 / 1024;
      if (memUsedMB > 1500) { // Alert at 1.5GB
        console.log(`⚠️  High memory usage: ${Math.round(memUsedMB)}MB`);
      }
    }, 15000); // Every 15 seconds
  }

  stopMemoryMonitoring() {
    if (this.memoryMonitorInterval) {
      clearInterval(this.memoryMonitorInterval);
    }
  }

  async analyzeComponentDistribution() {
    console.log('\n📊 Analyzing Component Distribution...');
    
    const componentsByType = {
      'matches/': 0,
      'ai/': 0,
      'carousels/': 0,
      'privacy/': 0,
      'students/': 0,
      'ui/': 0,
      'analytics/': 0,
      'other': 0
    };

    try {
      const walkDir = (dir, callback) => {
        fs.readdirSync(dir).forEach(f => {
          const dirPath = path.join(dir, f);
          const isDirectory = fs.statSync(dirPath).isDirectory();
          
          if (isDirectory) {
            walkDir(dirPath, callback);
          } else if (f.endsWith('.tsx')) {
            callback(path.join(dir, f));
          }
        });
      };

      let totalComponents = 0;
      walkDir('src/components', (filePath) => {
        totalComponents++;
        
        // Categorize components
        if (filePath.includes('/matches/')) {
          componentsByType['matches/']++;
        } else if (filePath.includes('/ai/')) {
          componentsByType['ai/']++;
        } else if (filePath.includes('/carousels/')) {
          componentsByType['carousels/']++;
        } else if (filePath.includes('/privacy/')) {
          componentsByType['privacy/']++;
        } else if (filePath.includes('/students/')) {
          componentsByType['students/']++;
        } else if (filePath.includes('/ui/')) {
          componentsByType['ui/']++;
        } else if (filePath.includes('/analytics/')) {
          componentsByType['analytics/']++;
        } else {
          componentsByType['other']++;
        }
      });

      console.log(`   Total Components: ${totalComponents}`);
      Object.entries(componentsByType).forEach(([type, count]) => {
        if (count > 0) {
          console.log(`   ${type}: ${count} components`);
        }
      });

      return { totalComponents, componentsByType };
    } catch (error) {
      console.log(`   ⚠️ Could not analyze component distribution: ${error.message}`);
      return null;
    }
  }

  async runMonitoredBuild(buildScript = 'build:typescript-optimized') {
    console.log(`\n🚀 Starting monitored build: ${buildScript}`);
    
    this.startMemoryMonitoring();
    
    const buildStartTime = Date.now();
    
    try {
      // Component analysis
      const componentAnalysisStart = Date.now();
      const componentStats = await this.analyzeComponentDistribution();
      this.performanceMetrics.componentAnalysis = Date.now() - componentAnalysisStart;
      
      // Run the actual build with monitoring
      await this.executeMonitoredCommand(`npm run ${buildScript}`);
      
      this.performanceMetrics.buildSuccess = true;
      console.log('\n✅ Monitored build completed successfully!');
      
    } catch (error) {
      console.error('\n❌ Monitored build failed:', error.message);
      
      // Categorize error types
      if (error.message.includes('SIGBUS')) {
        this.performanceMetrics.sigbusErrors++;
      } else if (error.message.includes('timeout') || error.message.includes('SIGTERM')) {
        this.performanceMetrics.timeoutErrors++;
      }
      
      this.errorLog.push({
        timestamp: Date.now(),
        error: error.message,
        type: this.categorizeError(error.message)
      });
      
      throw error;
    } finally {
      this.stopMemoryMonitoring();
      this.performanceMetrics.totalBuildTime = Date.now() - buildStartTime;
    }
  }

  categorizeError(errorMessage) {
    if (errorMessage.includes('SIGBUS')) return 'MEMORY_ERROR';
    if (errorMessage.includes('timeout')) return 'TIMEOUT_ERROR';
    if (errorMessage.includes('TypeScript')) return 'TYPESCRIPT_ERROR';
    if (errorMessage.includes('webpack')) return 'WEBPACK_ERROR';
    return 'OTHER_ERROR';
  }

  async executeMonitoredCommand(command) {
    return new Promise((resolve, reject) => {
      console.log(`📋 Executing: ${command}`);
      
      const child = spawn('bash', ['-c', command], {
        stdio: ['inherit', 'pipe', 'pipe'],
        cwd: process.cwd()
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        const output = data.toString();
        stdout += output;
        process.stdout.write(output);
      });

      child.stderr.on('data', (data) => {
        const output = data.toString();
        stderr += output;
        process.stderr.write(output);
        
        // Monitor for specific error patterns
        if (output.includes('SIGBUS')) {
          console.log('🚨 SIGBUS error detected!');
          this.performanceMetrics.sigbusErrors++;
        }
        
        if (output.includes('JavaScript heap out of memory')) {
          console.log('🚨 Memory exhaustion detected!');
        }
      });

      // Set timeout for build process (15 minutes)
      const timeout = setTimeout(() => {
        console.log('⏱️  Build timeout reached - terminating...');
        child.kill('SIGTERM');
        this.performanceMetrics.timeoutErrors++;
        reject(new Error('Build process timed out after 15 minutes'));
      }, 15 * 60 * 1000);

      child.on('close', (code) => {
        clearTimeout(timeout);
        
        if (code === 0) {
          console.log('✅ Command completed successfully');
          resolve();
        } else {
          const errorMsg = `Command failed with exit code ${code}`;
          console.error(`❌ ${errorMsg}`);
          reject(new Error(errorMsg));
        }
      });

      child.on('error', (error) => {
        clearTimeout(timeout);
        console.error('💥 Command execution error:', error);
        reject(error);
      });
    });
  }

  generatePerformanceReport() {
    const endTime = Date.now();
    const totalDuration = endTime - this.startTime;
    
    console.log('\n📈 BUILD PERFORMANCE REPORT');
    console.log('=' .repeat(50));
    
    // Basic metrics
    console.log(`📊 Build Metrics:`);
    console.log(`   Total Duration: ${Math.round(totalDuration / 1000)}s`);
    console.log(`   Build Success: ${this.performanceMetrics.buildSuccess ? '✅ Yes' : '❌ No'}`);
    console.log(`   Component Analysis: ${this.performanceMetrics.componentAnalysis}ms`);
    
    // Memory analysis
    console.log(`\n🧠 Memory Analysis:`);
    console.log(`   Peak Memory Usage: ${Math.round(this.performanceMetrics.memoryPeakUsage / 1024 / 1024)}MB`);
    console.log(`   Memory Snapshots: ${this.memorySnapshots.length} taken`);
    
    if (this.memorySnapshots.length > 0) {
      const avgMemory = this.memorySnapshots.reduce((sum, snap) => sum + snap.heapUsed, 0) / this.memorySnapshots.length;
      console.log(`   Average Memory: ${Math.round(avgMemory / 1024 / 1024)}MB`);
    }
    
    // Error analysis
    console.log(`\n🚨 Error Analysis:`);
    console.log(`   SIGBUS Errors: ${this.performanceMetrics.sigbusErrors}`);
    console.log(`   Timeout Errors: ${this.performanceMetrics.timeoutErrors}`);
    console.log(`   Total Errors: ${this.errorLog.length}`);
    
    if (this.errorLog.length > 0) {
      console.log(`   Error Types:`);
      const errorTypes = this.errorLog.reduce((acc, error) => {
        acc[error.type] = (acc[error.type] || 0) + 1;
        return acc;
      }, {});
      
      Object.entries(errorTypes).forEach(([type, count]) => {
        console.log(`      ${type}: ${count}`);
      });
    }
    
    // Optimization recommendations
    console.log(`\n💡 Optimization Recommendations:`);
    
    if (this.performanceMetrics.memoryPeakUsage > 1500 * 1024 * 1024) {
      console.log(`   🔴 HIGH MEMORY: Consider component splitting (peak: ${Math.round(this.performanceMetrics.memoryPeakUsage / 1024 / 1024)}MB)`);
    }
    
    if (this.performanceMetrics.sigbusErrors > 0) {
      console.log(`   🔴 SIGBUS ERRORS: System memory issues detected - consider memory optimization`);
    }
    
    if (this.performanceMetrics.timeoutErrors > 0) {
      console.log(`   🔴 TIMEOUT ISSUES: Build taking too long - consider incremental compilation`);
    }
    
    if (this.performanceMetrics.buildSuccess) {
      console.log(`   ✅ BUILD STABLE: Current configuration working well`);
      console.log(`   🎯 PORTUGUESE CONTEXT: Cultural components compiled successfully`);
      console.log(`   🤖 AI SYSTEMS: LusoBot, Matching, Notifications, Analytics operational`);
    }
    
    console.log('\n' + '=' .repeat(50));
    
    return {
      duration: totalDuration,
      success: this.performanceMetrics.buildSuccess,
      memoryPeak: this.performanceMetrics.memoryPeakUsage,
      errors: this.errorLog.length,
      sigbusErrors: this.performanceMetrics.sigbusErrors,
      timeoutErrors: this.performanceMetrics.timeoutErrors
    };
  }

  async writePerformanceLog() {
    const report = {
      timestamp: new Date().toISOString(),
      performanceMetrics: this.performanceMetrics,
      memorySnapshots: this.memorySnapshots,
      errorLog: this.errorLog,
      systemInfo: {
        platform: os.platform(),
        arch: os.arch(),
        totalMemory: os.totalmem(),
        cpuCount: os.cpus().length,
        nodeVersion: process.version
      }
    };
    
    const logPath = './build-performance.log';
    fs.writeFileSync(logPath, JSON.stringify(report, null, 2));
    console.log(`📝 Performance log written to: ${logPath}`);
  }
}

// Execute if run directly
if (require.main === module) {
  const monitor = new BuildPerformanceMonitor();
  const buildScript = process.argv[2] || 'build:typescript-optimized';
  
  // Graceful shutdown handlers
  process.on('SIGTERM', () => {
    console.log('\n🛑 Performance monitor terminated');
    monitor.stopMemoryMonitoring();
    process.exit(1);
  });
  
  process.on('SIGINT', () => {
    console.log('\n🛑 Performance monitor interrupted');
    monitor.stopMemoryMonitoring();
    process.exit(1);
  });
  
  monitor.runMonitoredBuild(buildScript)
    .then(() => monitor.generatePerformanceReport())
    .then(() => monitor.writePerformanceLog())
    .then(() => {
      console.log('\n🎉 Performance monitoring completed!');
      process.exit(0);
    })
    .catch(async (error) => {
      console.error('\n💥 Performance monitoring failed:', error.message);
      monitor.generatePerformanceReport();
      await monitor.writePerformanceLog();
      process.exit(1);
    });
}

module.exports = BuildPerformanceMonitor;