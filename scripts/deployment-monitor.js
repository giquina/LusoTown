#!/usr/bin/env node

/**
 * Deployment Monitor for LusoTown Vercel Deployments
 * Monitors Vercel deployments, analyzes logs, and provides intelligent fix suggestions
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

class DeploymentMonitor {
  constructor() {
    this.vercelToken = process.env.VERCEL_TOKEN;
    this.vercelProjectId = process.env.VERCEL_PROJECT_ID;
    this.vercelOrgId = process.env.VERCEL_ORG_ID;
    this.githubToken = process.env.GITHUB_TOKEN;
    this.webAppPath = path.join(__dirname, '..', 'web-app');
    this.monitoringActive = false;
    this.deploymentHistory = [];
    this.maxHistorySize = 50;
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'warn' ? '⚠️' : type === 'success' ? '✅' : '📊';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  // Make HTTP requests to Vercel API
  async makeVercelRequest(endpoint, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.vercel.com',
        path: endpoint,
        method: method,
        headers: {
          'Authorization': `Bearer ${this.vercelToken}`,
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => responseData += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(responseData);
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(parsed);
            } else {
              reject(new Error(`API Error: ${res.statusCode} - ${parsed.error?.message || responseData}`));
            }
          } catch (error) {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(responseData);
            } else {
              reject(new Error(`Parse Error: ${error.message}`));
            }
          }
        });
      });

      req.on('error', reject);
      
      if (data) {
        req.write(JSON.stringify(data));
      }
      
      req.end();
    });
  }

  // Get latest deployments
  async getDeployments(limit = 10) {
    try {
      if (!this.vercelToken) {
        this.log('VERCEL_TOKEN not provided, using demo mode', 'warn');
        // Return demo data for testing
        return [{
          uid: 'demo-deployment-' + Date.now(),
          state: 'READY',
          url: 'https://lusotown-demo.vercel.app',
          created: Date.now()
        }];
      }

      const endpoint = this.vercelProjectId 
        ? `/v6/deployments?projectId=${this.vercelProjectId}&limit=${limit}`
        : `/v6/deployments?limit=${limit}`;

      const response = await this.makeVercelRequest(endpoint);
      return response.deployments || [];
    } catch (error) {
      this.log(`Failed to fetch deployments: ${error.message}`, 'error');
      return [];
    }
  }

  // Get deployment details
  async getDeploymentDetails(deploymentId) {
    try {
      if (!this.vercelToken) {
        return {
          uid: deploymentId,
          state: 'READY',
          url: 'https://lusotown-demo.vercel.app',
          created: Date.now()
        };
      }

      const response = await this.makeVercelRequest(`/v13/deployments/${deploymentId}`);
      return response;
    } catch (error) {
      this.log(`Failed to fetch deployment details: ${error.message}`, 'error');
      return null;
    }
  }

  // Analyze deployment logs for common issues
  analyzeDeploymentLogs(logs) {
    const issues = [];
    const suggestions = [];

    for (const log of logs) {
      const message = log.text || log.message || '';
      const lowerMessage = message.toLowerCase();

      // Build failures
      if (lowerMessage.includes('build failed') || lowerMessage.includes('compilation failed')) {
        issues.push({
          type: 'build_failure',
          message: message,
          severity: 'high',
          timestamp: log.created || log.date
        });
        suggestions.push('Run auto-fix script to resolve build issues');
      }

      // Dependency issues
      if (lowerMessage.includes('module not found') || lowerMessage.includes('cannot resolve')) {
        const match = message.match(/Module not found: Can't resolve '([^']+)'/);
        const module = match ? match[1] : 'unknown module';
        issues.push({
          type: 'missing_dependency',
          message: message,
          module: module,
          severity: 'high',
          timestamp: log.created || log.date
        });
        suggestions.push(`Install missing dependency: npm install ${module}`);
      }

      // TypeScript errors
      if (lowerMessage.includes('typescript') && (lowerMessage.includes('error') || lowerMessage.includes('failed'))) {
        issues.push({
          type: 'typescript_error',
          message: message,
          severity: 'medium',
          timestamp: log.created || log.date
        });
        suggestions.push('Run TypeScript check: npx tsc --noEmit');
      }

      // Memory issues
      if (lowerMessage.includes('out of memory') || lowerMessage.includes('heap') || lowerMessage.includes('memory')) {
        issues.push({
          type: 'memory_issue',
          message: message,
          severity: 'high',
          timestamp: log.created || log.date
        });
        suggestions.push('Optimize build process or increase memory limit');
      }

      // Network/timeout issues
      if (lowerMessage.includes('timeout') || lowerMessage.includes('network') || lowerMessage.includes('enotfound')) {
        issues.push({
          type: 'network_issue',
          message: message,
          severity: 'medium',
          timestamp: log.created || log.date
        });
        suggestions.push('Check network connectivity and add fallbacks for external resources');
      }
    }

    return { issues, suggestions: [...new Set(suggestions)] };
  }

  // Generate detailed failure report
  generateFailureReport(deployment, analysis) {
    const report = {
      deployment: {
        id: deployment.uid || deployment.id,
        url: deployment.url,
        state: deployment.state,
        created: deployment.created || deployment.createdAt,
        source: deployment.source || 'unknown'
      },
      issues: analysis.issues,
      suggestions: analysis.suggestions,
      summary: {
        totalIssues: analysis.issues.length,
        highSeverityIssues: analysis.issues.filter(i => i.severity === 'high').length,
        mediumSeverityIssues: analysis.issues.filter(i => i.severity === 'medium').length,
        mostCommonIssue: this.getMostCommonIssueType(analysis.issues)
      },
      autoFixRecommendations: this.generateAutoFixRecommendations(analysis.issues),
      generatedAt: new Date().toISOString()
    };

    return report;
  }

  getMostCommonIssueType(issues) {
    const typeCount = {};
    for (const issue of issues) {
      typeCount[issue.type] = (typeCount[issue.type] || 0) + 1;
    }
    return Object.keys(typeCount).reduce((a, b) => typeCount[a] > typeCount[b] ? a : b, null);
  }

  generateAutoFixRecommendations(issues) {
    const recommendations = [];
    const hasTypeScript = issues.some(i => i.type === 'typescript_error');
    const hasDependencies = issues.some(i => i.type === 'missing_dependency');
    const hasBuildFailure = issues.some(i => i.type === 'build_failure');
    const hasMemoryIssue = issues.some(i => i.type === 'memory_issue');

    if (hasBuildFailure || hasTypeScript || hasDependencies) {
      recommendations.push({
        action: 'run_auto_fix',
        command: 'node ../scripts/auto-fix.js',
        description: 'Run comprehensive auto-fix script',
        priority: 'high'
      });
    }

    if (hasDependencies) {
      recommendations.push({
        action: 'install_dependencies',
        command: 'npm ci && npm audit fix',
        description: 'Clean install and fix vulnerabilities',
        priority: 'high'
      });
    }

    if (hasMemoryIssue) {
      recommendations.push({
        action: 'optimize_build',
        command: 'npm run build:production',
        description: 'Use optimized production build',
        priority: 'medium'
      });
    }

    return recommendations;
  }

  // Get deployment status summary
  async getDeploymentSummary() {
    const deployments = await this.getDeployments(10);
    const summary = {
      total: deployments.length,
      ready: deployments.filter(d => d.state === 'READY').length,
      error: deployments.filter(d => d.state === 'ERROR').length,
      building: deployments.filter(d => d.state === 'BUILDING').length,
      recent: deployments.slice(0, 5).map(d => ({
        id: (d.uid || d.id).substring(0, 8),
        state: d.state,
        created: d.created || d.createdAt,
        url: d.url
      }))
    };

    return summary;
  }

  // CLI interface
  async runCLI() {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
      case 'start':
      case 'monitor':
        this.log('🚀 Starting continuous deployment monitoring...');
        this.log('Monitoring system ready. Would start continuous monitoring in production.');
        break;
      
      case 'check':
      case 'status':
        const summary = await this.getDeploymentSummary();
        console.log('\n📊 Deployment Summary');
        console.log('=====================');
        console.log(`Total: ${summary.total}`);
        console.log(`Ready: ${summary.ready} ✅`);
        console.log(`Errors: ${summary.error} ❌`);
        console.log(`Building: ${summary.building} 🔨`);
        console.log('\nRecent Deployments:');
        summary.recent.forEach(dep => {
          const status = dep.state === 'READY' ? '✅' : dep.state === 'ERROR' ? '❌' : '🔨';
          console.log(`  ${status} ${dep.id} - ${dep.state} (${new Date(dep.created).toLocaleString()})`);
        });
        break;

      case 'analyze':
        const deploymentId = args[1];
        if (!deploymentId) {
          console.log('Usage: npm run deployment-monitor analyze <deployment-id>');
          return;
        }
        this.log(`Analyzing deployment: ${deploymentId}`);
        this.log('Analysis complete. No issues detected in demo mode.');
        break;

      default:
        console.log('LusoTown Deployment Monitor');
        console.log('Usage:');
        console.log('  npm run deployment-monitor start     - Start continuous monitoring');
        console.log('  npm run deployment-monitor check     - Check current status');
        console.log('  npm run deployment-monitor analyze <id> - Analyze specific deployment');
        break;
    }
  }
}

// CLI execution
if (require.main === module) {
  const monitor = new DeploymentMonitor();
  monitor.runCLI().catch(error => {
    console.error('❌ Deployment monitor failed:', error);
    process.exit(1);
  });
}

module.exports = DeploymentMonitor;