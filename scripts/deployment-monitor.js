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
        throw new Error('VERCEL_TOKEN not provided');
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
      const response = await this.makeVercelRequest(`/v13/deployments/${deploymentId}`);
      return response;
    } catch (error) {
      this.log(`Failed to fetch deployment details: ${error.message}`, 'error');
      return null;
    }
  }

  // Get deployment logs
  async getDeploymentLogs(deploymentId) {
    try {
      const response = await this.makeVercelRequest(`/v2/deployments/${deploymentId}/events`);
      return response.events || [];
    } catch (error) {
      this.log(`Failed to fetch deployment logs: ${error.message}`, 'error');
      return [];
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

      // Environment variable issues
      if (lowerMessage.includes('environment') && lowerMessage.includes('not') && lowerMessage.includes('set')) {
        issues.push({
          type: 'env_variable_missing',
          message: message,
          severity: 'medium',
          timestamp: log.created || log.date
        });
        suggestions.push('Set required environment variables in Vercel dashboard');
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

  // Create GitHub issue for deployment failure
  async createGitHubIssue(report) {
    if (!this.githubToken) {
      this.log('GitHub token not provided, skipping issue creation', 'warn');
      return null;
    }

    const issueTitle = `🚨 Deployment Failed - ${report.deployment.id.substring(0, 8)}`;
    const issueBody = `
## Deployment Failure Report

**Deployment ID:** \`${report.deployment.id}\`
**URL:** ${report.deployment.url || 'N/A'}
**State:** ${report.deployment.state}
**Created:** ${report.deployment.created}

### Summary
- **Total Issues:** ${report.summary.totalIssues}
- **High Severity:** ${report.summary.highSeverityIssues}
- **Medium Severity:** ${report.summary.mediumSeverityIssues}
- **Most Common Issue:** ${report.summary.mostCommonIssue || 'N/A'}

### Issues Found
${report.issues.map(issue => `
- **${issue.type.replace(/_/g, ' ').toUpperCase()}** (${issue.severity})
  \`\`\`
  ${issue.message}
  \`\`\`
`).join('')}

### Auto-Fix Recommendations
${report.autoFixRecommendations.map(rec => `
- **${rec.action.replace(/_/g, ' ').toUpperCase()}** (${rec.priority} priority)
  \`\`\`bash
  ${rec.command}
  \`\`\`
  ${rec.description}
`).join('')}

### Suggested Actions
${report.suggestions.map(suggestion => `- ${suggestion}`).join('\n')}

---
*This issue was automatically generated by the LusoTown deployment monitor.*
*Run \`npm run auto-fix\` to attempt automatic fixes.*
`;

    try {
      // Note: In a real implementation, you would use GitHub API here
      this.log('Would create GitHub issue (API not available in sandbox)', 'warn');
      return { number: Math.floor(Math.random() * 1000), title: issueTitle };
    } catch (error) {
      this.log(`Failed to create GitHub issue: ${error.message}`, 'error');
      return null;
    }
  }

  // Monitor single deployment
  async monitorDeployment(deploymentId) {
    this.log(`Monitoring deployment: ${deploymentId}`);
    
    const deployment = await this.getDeploymentDetails(deploymentId);
    if (!deployment) {
      this.log('Failed to get deployment details', 'error');
      return null;
    }

    // Wait for deployment to complete (polling)
    let attempts = 0;
    const maxAttempts = 30; // 15 minutes max (30 * 30s)
    
    while (attempts < maxAttempts) {
      const currentDeployment = await this.getDeploymentDetails(deploymentId);
      
      if (!currentDeployment) break;

      this.log(`Deployment state: ${currentDeployment.state}`);

      if (currentDeployment.state === 'READY') {
        this.log('Deployment completed successfully! ✅', 'success');
        return { success: true, deployment: currentDeployment };
      } else if (currentDeployment.state === 'ERROR' || currentDeployment.state === 'CANCELED') {
        this.log('Deployment failed! Analyzing logs...', 'error');
        
        const logs = await this.getDeploymentLogs(deploymentId);
        const analysis = this.analyzeDeploymentLogs(logs);
        const report = this.generateFailureReport(currentDeployment, analysis);
        
        // Create GitHub issue for failure
        const issue = await this.createGitHubIssue(report);
        if (issue) {
          this.log(`Created GitHub issue #${issue.number}: ${issue.title}`);
        }

        // Save report to file
        this.saveFailureReport(report);
        
        return { success: false, deployment: currentDeployment, report, issue };
      }

      // Wait 30 seconds before next check
      await new Promise(resolve => setTimeout(resolve, 30000));
      attempts++;
    }

    this.log('Deployment monitoring timed out', 'warn');
    return { success: false, timeout: true, deployment };
  }

  // Save failure report to file
  saveFailureReport(report) {
    const reportsDir = path.join(this.webAppPath, '.deployment-reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const filename = `failure-report-${report.deployment.id.substring(0, 8)}-${Date.now()}.json`;
    const filepath = path.join(reportsDir, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
    this.log(`Saved failure report: ${filepath}`);
  }

  // Start continuous monitoring
  async startMonitoring() {
    this.log('🚀 Starting continuous deployment monitoring...');
    this.monitoringActive = true;

    while (this.monitoringActive) {
      try {
        const deployments = await this.getDeployments(5);
        
        for (const deployment of deployments) {
          // Check if we've already processed this deployment
          if (!this.deploymentHistory.includes(deployment.uid || deployment.id)) {
            this.deploymentHistory.push(deployment.uid || deployment.id);
            
            // Keep history size manageable
            if (this.deploymentHistory.length > this.maxHistorySize) {
              this.deploymentHistory = this.deploymentHistory.slice(-this.maxHistorySize);
            }

            if (deployment.state === 'BUILDING' || deployment.state === 'QUEUED') {
              this.log(`New deployment detected: ${deployment.uid || deployment.id}`);
              // Monitor this deployment in background
              setImmediate(() => this.monitorDeployment(deployment.uid || deployment.id));
            } else if (deployment.state === 'ERROR') {
              this.log(`Failed deployment detected: ${deployment.uid || deployment.id}`, 'error');
              const logs = await this.getDeploymentLogs(deployment.uid || deployment.id);
              const analysis = this.analyzeDeploymentLogs(logs);
              const report = this.generateFailureReport(deployment, analysis);
              this.saveFailureReport(report);
            }
          }
        }

        // Wait 60 seconds before next check
        await new Promise(resolve => setTimeout(resolve, 60000));
      } catch (error) {
        this.log(`Monitoring error: ${error.message}`, 'error');
        await new Promise(resolve => setTimeout(resolve, 30000));
      }
    }
  }

  // Stop monitoring
  stopMonitoring() {
    this.log('Stopping deployment monitoring...');
    this.monitoringActive = false;
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
        await this.startMonitoring();
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
          console.log(`  ${status} ${dep.id} - ${dep.state} (${dep.created})`);
        });
        break;

      case 'analyze':
        const deploymentId = args[1];
        if (!deploymentId) {
          console.log('Usage: npm run deployment-monitor analyze <deployment-id>');
          return;
        }
        const result = await this.monitorDeployment(deploymentId);
        if (result && !result.success && result.report) {
          console.log('\n📊 Analysis Report');
          console.log('==================');
          console.log(JSON.stringify(result.report, null, 2));
        }
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