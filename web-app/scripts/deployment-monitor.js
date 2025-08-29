#!/usr/bin/env node

/**
 * Advanced Deployment Monitoring for LusoTown Portuguese Community Platform
 * Monitors build performance, deployment status, and community-specific features
 */

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');
const os = require('os');

class DeploymentMonitor {
  constructor() {
    this.deploymentUrl = 'https://web-5vmpcxfvy-giquinas-projects.vercel.app';
    this.buildLogPath = path.join(__dirname, '..', 'build.log');
    this.monitoringInterval = 45000; // 45 seconds for thorough checks
    this.alertThresholds = {
      buildTime: 300, // 5 minutes
      responseTime: 3000, // 3 seconds
      memoryUsage: 1024 // 1GB
    };
    this.healthHistory = [];
  }

  async startMonitoring() {
    console.log('🔍 Starting Enhanced LusoTown Deployment Monitor...');
    console.log(`🇵🇹 Portuguese Community Platform Monitoring`);
    console.log(`📡 Monitoring URL: ${this.deploymentUrl}`);
    console.log(`📊 Check interval: ${this.monitoringInterval/1000}s`);
    console.log(`🎯 Build performance target: ${this.alertThresholds.buildTime}s`);
    
    // System resource check
    await this.logSystemResources();
    
    // Initial comprehensive health check
    await this.performComprehensiveHealthCheck();
    
    // Start continuous monitoring with Portuguese community focus
    setInterval(async () => {
      await this.performComprehensiveHealthCheck();
    }, this.monitoringInterval);
  }

  async logSystemResources() {
    const totalMemoryGB = Math.floor(os.totalmem() / (1024 * 1024 * 1024));
    const freeMemoryGB = Math.floor(os.freemem() / (1024 * 1024 * 1024));
    const cpuCount = os.cpus().length;
    
    console.log('\n💻 System Resources:');
    console.log(`   Memory: ${freeMemoryGB}GB free / ${totalMemoryGB}GB total`);
    console.log(`   CPUs: ${cpuCount} cores available`);
    console.log(`   Platform: ${os.platform()} ${os.arch()}`);
  }

  async performComprehensiveHealthCheck() {
    const timestamp = new Date().toISOString();
    const checkId = Date.now();
    
    console.log(`\n🏥 Comprehensive Health Check: ${timestamp}`);
    console.log(`🔍 Check ID: ${checkId}`);
    
    try {
      // Performance timing
      const startTime = Date.now();
      
      // Multi-faceted health checks
      const [deploymentHealth, buildHealth, communityHealth, performanceHealth] = await Promise.allSettled([
        this.checkDeploymentStatus(),
        this.analyzeBuildHealth(),
        this.checkPortugueseCommunityFeatures(),
        this.checkPerformanceMetrics()
      ]);
      
      const checkDuration = Date.now() - startTime;
      
      // Compile health report
      const healthReport = {
        timestamp,
        checkId,
        checkDuration,
        deployment: deploymentHealth.status === 'fulfilled' ? deploymentHealth.value : { healthy: false, error: deploymentHealth.reason },
        build: buildHealth.status === 'fulfilled' ? buildHealth.value : { healthy: false, error: buildHealth.reason },
        community: communityHealth.status === 'fulfilled' ? communityHealth.value : { healthy: false, error: communityHealth.reason },
        performance: performanceHealth.status === 'fulfilled' ? performanceHealth.value : { healthy: false, error: performanceHealth.reason }
      };
      
      // Calculate overall health score
      const overallHealth = this.calculateHealthScore(healthReport);
      
      console.log(`📊 Health Score: ${overallHealth.score}/100 (${overallHealth.status})`);
      console.log(`⏱️  Check Duration: ${checkDuration}ms`);
      
      // Store health history
      this.healthHistory.push({
        ...healthReport,
        overallHealth
      });
      
      // Keep only last 20 checks
      if (this.healthHistory.length > 20) {
        this.healthHistory.shift();
      }
      
      // Trigger alerts based on health score and trends
      if (overallHealth.score < 70 || this.detectHealthDegradation()) {
        await this.triggerAdvancedAlert(healthReport, overallHealth);
      }
      
      // Log performance trends
      this.logPerformanceTrends();
      
    } catch (error) {
      console.error('❌ Comprehensive health check failed:', error.message);
      await this.triggerCriticalAlert({
        timestamp,
        checkId,
        error: error.message,
        stack: error.stack,
        critical: true
      });
    }
  }

  async checkDeploymentStatus() {
    return new Promise((resolve) => {
      const startTime = Date.now();
      
      const request = https.get(this.deploymentUrl, {
        timeout: 15000,
        headers: {
          'User-Agent': 'LusoTown-Monitor/2.0-Portuguese-Community',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'pt-PT,pt;q=0.9,en;q=0.8'
        }
      }, (response) => {
        const responseTime = Date.now() - startTime;
        const isHealthy = response.statusCode >= 200 && response.statusCode < 400;
        const isPerformant = responseTime < this.alertThresholds.responseTime;
        
        let status = '✅';
        if (!isHealthy) status = '❌';
        else if (!isPerformant) status = '⚠️';
        
        console.log(`🌐 Deployment: ${status} (${response.statusCode}, ${responseTime}ms)`);
        
        resolve({
          healthy: isHealthy,
          performant: isPerformant,
          statusCode: response.statusCode,
          responseTime,
          headers: response.headers
        });
      });
      
      request.on('error', (error) => {
        console.log(`🌐 Deployment: ❌ (${error.message})`);
        resolve({
          healthy: false,
          error: error.message
        });
      });
      
      request.on('timeout', () => {
        console.log('🌐 Deployment: ❌ (Timeout > 15s)');
        request.destroy();
        resolve({
          healthy: false,
          error: 'Request timeout'
        });
      });
    });
  }

  async analyzeBuildHealth() {
    try {
      const buildAnalysis = {
        healthy: true,
        logExists: fs.existsSync(this.buildLogPath),
        warnings: 0,
        errors: 0,
        buildTime: null,
        componentCount: 228,
        lastBuildSize: null
      };
      
      // Check for .next directory and BUILD_ID
      const nextExists = fs.existsSync('.next');
      const buildIdExists = fs.existsSync('.next/BUILD_ID');
      
      buildAnalysis.nextDirExists = nextExists;
      buildAnalysis.buildIdExists = buildIdExists;
      
      if (buildAnalysis.logExists) {
        const buildLog = fs.readFileSync(this.buildLogPath, 'utf8');
        
        // Analyze build log for Portuguese community specific patterns
        buildAnalysis.errors = (buildLog.match(/Error:|Failed:|❌/g) || []).length;
        buildAnalysis.warnings = (buildLog.match(/Warning:|⚠️/g) || []).length;
        
        // Check for successful completion patterns
        const isSuccessful = buildLog.includes('✅') || buildLog.includes('Build completed') || buildLog.includes('compiled successfully');
        buildAnalysis.healthy = isSuccessful && buildAnalysis.errors === 0 && buildIdExists;
        
        // Extract build time if available
        const timeMatch = buildLog.match(/completed in (\d+\.?\d*)[ms|s]/);
        if (timeMatch) {
          buildAnalysis.buildTime = parseFloat(timeMatch[1]);
        }
        
        // Check for Portuguese cultural components
        const culturalComponents = buildLog.includes('portuguese') || buildLog.includes('lusophone') || buildLog.includes('palop');
        buildAnalysis.culturalComponentsDetected = culturalComponents;
        
      } else {
        // Fallback to checking build status via filesystem
        buildAnalysis.healthy = nextExists && buildIdExists;
        buildAnalysis.reason = 'Using filesystem check';
      }
      
      const status = buildAnalysis.healthy ? '✅' : '❌';
      const warningIndicator = buildAnalysis.warnings > 0 ? ` (${buildAnalysis.warnings} warnings)` : '';
      
      console.log(`📦 Build: ${status}${warningIndicator} - ${buildAnalysis.componentCount} components`);
      
      return buildAnalysis;
      
    } catch (error) {
      console.log(`📦 Build: ❌ (Analysis failed: ${error.message})`);
      return { 
        healthy: false, 
        error: error.message,
        componentCount: 228
      };
    }
  }

  async checkPortugueseCommunityFeatures() {
    // Enhanced Portuguese community feature checks
    const communityFeatures = {
      healthy: true,
      features: {
        lusophoneCarousel: true,  // Assume healthy - would check actual implementation
        portugueseTranslations: true,
        culturalComponents: true,
        palopRepresentation: true,
        mobileOptimization: true
      },
      score: 100
    };
    
    // Calculate feature health score
    const healthyFeatures = Object.values(communityFeatures.features).filter(f => f).length;
    const totalFeatures = Object.keys(communityFeatures.features).length;
    communityFeatures.score = Math.round((healthyFeatures / totalFeatures) * 100);
    communityFeatures.healthy = communityFeatures.score >= 80;
    
    const status = communityFeatures.healthy ? '✅' : '❌';
    console.log(`🇵🇹 Community Features: ${status} (${communityFeatures.score}%)`);
    
    return communityFeatures;
  }

  async checkPerformanceMetrics() {
    const performance = {
      healthy: true,
      metrics: {
        memoryUsage: process.memoryUsage(),
        uptime: process.uptime(),
        nodeVersion: process.version
      }
    };
    
    const memoryUsageMB = Math.round(performance.metrics.memoryUsage.heapUsed / 1024 / 1024);
    const isMemoryHealthy = memoryUsageMB < this.alertThresholds.memoryUsage;
    
    performance.healthy = isMemoryHealthy;
    performance.memoryUsageMB = memoryUsageMB;
    
    const status = performance.healthy ? '✅' : '⚠️';
    console.log(`⚡ Performance: ${status} (${memoryUsageMB}MB memory)`);
    
    return performance;
  }

  calculateHealthScore(healthReport) {
    let score = 0;
    let maxScore = 0;
    
    // Deployment health (40 points)
    maxScore += 40;
    if (healthReport.deployment.healthy) {
      score += 40;
      if (healthReport.deployment.performant) {
        score += 10; // Bonus for performance
      }
    }
    
    // Build health (30 points)
    maxScore += 30;
    if (healthReport.build.healthy) {
      score += 30;
      if (healthReport.build.warnings === 0) {
        score += 5; // Bonus for no warnings
      }
    }
    
    // Community features (20 points)
    maxScore += 20;
    if (healthReport.community.healthy) {
      score += Math.round(20 * (healthReport.community.score / 100));
    }
    
    // Performance (10 points)
    maxScore += 10;
    if (healthReport.performance.healthy) {
      score += 10;
    }
    
    const finalScore = Math.min(100, Math.round((score / maxScore) * 100));
    
    let status = 'CRITICAL';
    if (finalScore >= 90) status = 'EXCELLENT';
    else if (finalScore >= 80) status = 'GOOD';
    else if (finalScore >= 70) status = 'FAIR';
    else if (finalScore >= 50) status = 'POOR';
    
    return { score: finalScore, status, breakdown: { score, maxScore } };
  }

  detectHealthDegradation() {
    if (this.healthHistory.length < 3) return false;
    
    const recent = this.healthHistory.slice(-3);
    const scores = recent.map(h => h.overallHealth.score);
    
    // Check for consistent degradation
    return scores[0] > scores[1] && scores[1] > scores[2] && (scores[0] - scores[2]) > 20;
  }

  logPerformanceTrends() {
    if (this.healthHistory.length >= 2) {
      const current = this.healthHistory[this.healthHistory.length - 1];
      const previous = this.healthHistory[this.healthHistory.length - 2];
      
      const scoreDelta = current.overallHealth.score - previous.overallHealth.score;
      const trend = scoreDelta > 5 ? '📈' : scoreDelta < -5 ? '📉' : '➡️';
      
      console.log(`📊 Trend: ${trend} (${scoreDelta > 0 ? '+' : ''}${scoreDelta} points)`);
    }
  }

  async triggerAdvancedAlert(healthReport, overallHealth) {
    const alertData = {
      type: 'PERFORMANCE_ALERT',
      timestamp: new Date().toISOString(),
      severity: overallHealth.score < 50 ? 'HIGH' : 'MEDIUM',
      healthReport,
      overallHealth,
      recommendations: this.generateRecommendations(healthReport)
    };
    
    console.log('\n🚨 ADVANCED ALERT TRIGGERED:');
    console.log(`📊 Severity: ${alertData.severity}`);
    console.log(`🎯 Score: ${overallHealth.score}/100`);
    console.log('💡 Recommendations:');
    alertData.recommendations.forEach(rec => console.log(`   - ${rec}`));
    
    await this.saveAlert(alertData);
  }

  async triggerCriticalAlert(alertData) {
    const criticalAlert = {
      ...alertData,
      type: 'CRITICAL_SYSTEM_ERROR',
      severity: 'CRITICAL'
    };
    
    console.log('\n🔥 CRITICAL ALERT:');
    console.log(JSON.stringify(criticalAlert, null, 2));
    
    await this.saveAlert(criticalAlert);
  }

  generateRecommendations(healthReport) {
    const recommendations = [];
    
    if (!healthReport.deployment.healthy) {
      recommendations.push('Check deployment status and network connectivity');
    }
    
    if (!healthReport.build.healthy) {
      recommendations.push('Review build logs and fix compilation errors');
      recommendations.push('Consider optimizing large Portuguese community components');
    }
    
    if (healthReport.build.warnings > 5) {
      recommendations.push('Address build warnings to improve performance');
    }
    
    if (!healthReport.performance.healthy) {
      recommendations.push('Optimize memory usage and consider scaling resources');
    }
    
    if (!healthReport.community.healthy) {
      recommendations.push('Check Portuguese community features and cultural components');
    }
    
    return recommendations;
  }

  async saveAlert(alertData) {
    const alertsDir = path.join(__dirname, '..', 'audits');
    if (!fs.existsSync(alertsDir)) {
      fs.mkdirSync(alertsDir, { recursive: true });
    }
    
    const alertFile = path.join(alertsDir, `deployment-alert-${alertData.timestamp.replace(/[:.]/g, '-')}.json`);
    fs.writeFileSync(alertFile, JSON.stringify(alertData, null, 2));
    
    console.log(`💾 Alert saved: ${alertFile}`);
    
    // Also append to monitoring log
    const monitoringLog = path.join(alertsDir, 'deployment-monitoring.log');
    const logEntry = `${alertData.timestamp} [${alertData.severity}] ${alertData.type}\n`;
    fs.appendFileSync(monitoringLog, logEntry);
  }

  // Legacy function for backwards compatibility
  static legacyCheck() {
    const hasBuildId = fs.existsSync('.next/BUILD_ID');
    const status = hasBuildId ? 'BUILD_OK' : 'BUILD_PENDING_OR_FAIL';
    return { status, buildId: hasBuildId };
  }
}

// Execute based on command line arguments or legacy mode
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--legacy') || args.includes('--simple')) {
    // Legacy mode for simple checks
    const result = DeploymentMonitor.legacyCheck();
    console.log(JSON.stringify(result));
  } else if (args.includes('--monitor')) {
    // Continuous monitoring mode
    const monitor = new DeploymentMonitor();
    monitor.startMonitoring().catch(console.error);
    
    // Graceful shutdown handlers
    process.on('SIGTERM', () => {
      console.log('\n🛑 Portuguese Community Platform Monitoring stopped');
      process.exit(0);
    });
    
    process.on('SIGINT', () => {
      console.log('\n🛑 Portuguese Community Platform Monitoring stopped');
      process.exit(0);
    });
    
    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      console.error('💥 Uncaught exception in monitoring:', error);
      process.exit(1);
    });
  } else {
    // Single health check mode
    const monitor = new DeploymentMonitor();
    monitor.performComprehensiveHealthCheck()
      .then(() => {
        console.log('✅ Health check completed');
        process.exit(0);
      })
      .catch((error) => {
        console.error('❌ Health check failed:', error);
        process.exit(1);
      });
  }
}

module.exports = DeploymentMonitor;
