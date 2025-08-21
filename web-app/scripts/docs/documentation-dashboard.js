#!/usr/bin/env node

/**
 * LusoTown Documentation Dashboard
 * 
 * Provides a real-time overview of documentation health,
 * completion status, and maintenance recommendations
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class DocumentationDashboard {
  constructor() {
    this.webAppRoot = path.resolve(__dirname, '../../');
    this.projectRoot = path.resolve(__dirname, '../../../');
    this.timestamp = new Date().toISOString();
  }

  async generateDashboard() {
    console.log('📊 Generating LusoTown Documentation Dashboard...\n');
    
    const stats = await this.collectStatistics();
    const health = await this.assessDocumentationHealth();
    const recommendations = await this.generateRecommendations(health);
    
    this.displayDashboard(stats, health, recommendations);
    this.saveDashboardReport(stats, health, recommendations);
  }

  async collectStatistics() {
    console.log('📈 Collecting project statistics...');
    
    const stats = {
      codebase: {
        components: this.countFiles('src/components/**/*.tsx'),
        pages: this.countFiles('src/app/**/page.tsx'),
        contexts: this.countFiles('src/context/**/*.tsx'),
        hooks: this.countFiles('src/hooks/**/*.tsx'),
        utils: this.countFiles('src/lib/**/*.ts'),
        tests: this.countFiles('__tests__/**/*.test.{ts,tsx}')
      },
      documentation: {
        markdownFiles: this.countFiles('*.md'),
        lastUpdate: this.getLastDocumentationUpdate(),
        totalSize: this.getDocumentationSize(),
        mainFiles: this.checkMainDocumentationFiles()
      },
      features: {
        implemented: await this.countImplementedFeatures(),
        inProgress: await this.countInProgressFeatures(),
        planned: await this.countPlannedFeatures()
      },
      maintenance: {
        lastMaintenance: this.getLastMaintenanceRun(),
        gitHooksInstalled: this.checkGitHooks(),
        automationHealth: this.checkAutomationHealth()
      }
    };

    return stats;
  }

  async assessDocumentationHealth() {
    console.log('🏥 Assessing documentation health...');
    
    const health = {
      overall: 'unknown',
      scores: {
        completeness: 0,
        accuracy: 0,
        freshness: 0,
        consistency: 0
      },
      issues: [],
      strengths: []
    };

    // Assess completeness
    health.scores.completeness = await this.assessCompleteness();
    
    // Assess accuracy
    health.scores.accuracy = await this.assessAccuracy();
    
    // Assess freshness
    health.scores.freshness = await this.assessFreshness();
    
    // Assess consistency
    health.scores.consistency = await this.assessConsistency();
    
    // Calculate overall health
    const averageScore = Object.values(health.scores).reduce((a, b) => a + b, 0) / 4;
    
    if (averageScore >= 85) health.overall = 'excellent';
    else if (averageScore >= 70) health.overall = 'good';
    else if (averageScore >= 55) health.overall = 'fair';
    else health.overall = 'poor';

    return health;
  }

  async assessCompleteness() {
    let score = 100;
    
    // Check for main documentation files
    const requiredFiles = [
      'CLAUDE.md',
      'TODO.md',
      'README.md'
    ];

    for (const file of requiredFiles) {
      const filePath = file === 'CLAUDE.md' ? 
        path.join(this.projectRoot, file) : 
        path.join(this.webAppRoot, file);
      
      if (!fs.existsSync(filePath)) {
        score -= 20;
      }
    }

    // Check component documentation coverage
    const componentCount = this.countFiles('src/components/**/*.tsx');
    const documentedComponents = await this.countDocumentedComponents();
    const coverageRatio = documentedComponents / componentCount;
    
    if (coverageRatio < 0.8) score -= 10;
    if (coverageRatio < 0.6) score -= 15;

    return Math.max(0, score);
  }

  async assessAccuracy() {
    let score = 100;
    
    // Check component count accuracy
    const actualComponents = this.countFiles('src/components/**/*.tsx');
    const documentedComponents = this.getDocumentedComponentCount();
    
    const discrepancy = Math.abs(actualComponents - documentedComponents);
    if (discrepancy > 10) score -= 20;
    else if (discrepancy > 5) score -= 10;

    // Check for broken links in documentation
    const brokenLinks = await this.findBrokenLinks();
    score -= brokenLinks.length * 5;

    return Math.max(0, score);
  }

  async assessFreshness() {
    let score = 100;
    
    // Check last update timestamps
    const claudeFile = path.join(this.projectRoot, 'CLAUDE.md');
    const todoFile = path.join(this.webAppRoot, 'TODO.md');
    
    const daysSinceClaudeUpdate = this.getDaysSinceUpdate(claudeFile);
    const daysSinceTodoUpdate = this.getDaysSinceUpdate(todoFile);
    
    if (daysSinceClaudeUpdate > 14) score -= 20;
    else if (daysSinceClaudeUpdate > 7) score -= 10;
    
    if (daysSinceTodoUpdate > 7) score -= 15;
    else if (daysSinceTodoUpdate > 3) score -= 5;

    return Math.max(0, score);
  }

  async assessConsistency() {
    let score = 100;
    
    // Check translation consistency
    try {
      const enPath = path.join(this.webAppRoot, 'src/i18n/en.json');
      const ptPath = path.join(this.webAppRoot, 'src/i18n/pt.json');
      
      if (fs.existsSync(enPath) && fs.existsSync(ptPath)) {
        const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
        const ptContent = JSON.parse(fs.readFileSync(ptPath, 'utf8'));
        
        const enKeys = this.flattenObject(enContent);
        const ptKeys = this.flattenObject(ptContent);
        
        const missingKeys = Object.keys(enKeys).filter(key => !(key in ptKeys));
        score -= missingKeys.length * 2;
      }
    } catch (error) {
      score -= 10;
    }

    return Math.max(0, score);
  }

  async generateRecommendations(health) {
    console.log('💡 Generating recommendations...');
    
    const recommendations = {
      immediate: [],
      shortTerm: [],
      longTerm: []
    };

    // Immediate actions (critical issues)
    if (health.scores.completeness < 60) {
      recommendations.immediate.push('Create missing core documentation files');
    }
    
    if (health.scores.accuracy < 60) {
      recommendations.immediate.push('Fix component count discrepancies in CLAUDE.md');
    }

    // Short-term improvements
    if (health.scores.freshness < 70) {
      recommendations.shortTerm.push('Run documentation maintenance: npm run docs:maintenance');
    }
    
    if (health.scores.consistency < 70) {
      recommendations.shortTerm.push('Sync English and Portuguese translations');
    }

    // Long-term enhancements
    if (health.overall === 'fair' || health.overall === 'poor') {
      recommendations.longTerm.push('Implement automated daily documentation updates');
      recommendations.longTerm.push('Set up documentation quality gates in CI/CD');
    }

    // Git hooks recommendation
    if (!this.checkGitHooks()) {
      recommendations.immediate.push('Install git hooks: npm run docs:install-hooks');
    }

    return recommendations;
  }

  displayDashboard(stats, health, recommendations) {
    console.log('\n╔══════════════════════════════════════════════════════════════════╗');
    console.log('║                    📊 LUSOTOWN DOCUMENTATION DASHBOARD             ║');
    console.log('╚══════════════════════════════════════════════════════════════════╝\n');

    // Overall Health
    const healthIcon = this.getHealthIcon(health.overall);
    console.log(`🏥 Overall Health: ${healthIcon} ${health.overall.toUpperCase()}\n`);

    // Health Scores
    console.log('📈 Health Scores:');
    console.log(`   Completeness: ${this.formatScore(health.scores.completeness)}%`);
    console.log(`   Accuracy:     ${this.formatScore(health.scores.accuracy)}%`);
    console.log(`   Freshness:    ${this.formatScore(health.scores.freshness)}%`);
    console.log(`   Consistency:  ${this.formatScore(health.scores.consistency)}%\n`);

    // Project Statistics
    console.log('📊 Project Statistics:');
    console.log(`   Components:    ${stats.codebase.components}`);
    console.log(`   Pages:         ${stats.codebase.pages}`);
    console.log(`   Contexts:      ${stats.codebase.contexts}`);
    console.log(`   Tests:         ${stats.codebase.tests}`);
    console.log(`   Doc Files:     ${stats.documentation.markdownFiles}\n`);

    // Feature Status
    console.log('🎯 Feature Status:');
    console.log(`   ✅ Implemented: ${stats.features.implemented}`);
    console.log(`   🔄 In Progress: ${stats.features.inProgress}`);
    console.log(`   📋 Planned:     ${stats.features.planned}\n`);

    // Maintenance Status
    console.log('🔧 Maintenance Status:');
    console.log(`   Git Hooks:     ${stats.maintenance.gitHooksInstalled ? '✅ Installed' : '❌ Missing'}`);
    console.log(`   Last Update:   ${stats.documentation.lastUpdate}`);
    console.log(`   Automation:    ${stats.maintenance.automationHealth ? '✅ Healthy' : '⚠️ Issues'}\n`);

    // Recommendations
    if (recommendations.immediate.length > 0) {
      console.log('🚨 IMMEDIATE ACTIONS REQUIRED:');
      recommendations.immediate.forEach(rec => console.log(`   • ${rec}`));
      console.log('');
    }

    if (recommendations.shortTerm.length > 0) {
      console.log('📅 Short-term Improvements:');
      recommendations.shortTerm.forEach(rec => console.log(`   • ${rec}`));
      console.log('');
    }

    if (recommendations.longTerm.length > 0) {
      console.log('🎯 Long-term Enhancements:');
      recommendations.longTerm.forEach(rec => console.log(`   • ${rec}`));
      console.log('');
    }

    console.log('💡 Quick Commands:');
    console.log('   npm run docs:update     - Update documentation');
    console.log('   npm run docs:validate   - Validate documentation');
    console.log('   npm run docs:maintenance - Full maintenance');
    console.log('   npm run docs:install-hooks - Install git hooks\n');
  }

  saveDashboardReport(stats, health, recommendations) {
    const report = `# LusoTown Documentation Dashboard Report
Generated: ${new Date().toLocaleString()}

## Overall Health: ${health.overall.toUpperCase()}

### Health Scores
- **Completeness:** ${health.scores.completeness}%
- **Accuracy:** ${health.scores.accuracy}%
- **Freshness:** ${health.scores.freshness}%
- **Consistency:** ${health.scores.consistency}%

### Project Statistics
- **Components:** ${stats.codebase.components}
- **Pages:** ${stats.codebase.pages}
- **Contexts:** ${stats.codebase.contexts}
- **Tests:** ${stats.codebase.tests}
- **Documentation Files:** ${stats.documentation.markdownFiles}

### Feature Status
- **Implemented:** ${stats.features.implemented}
- **In Progress:** ${stats.features.inProgress}
- **Planned:** ${stats.features.planned}

### Maintenance Status
- **Git Hooks:** ${stats.maintenance.gitHooksInstalled ? 'Installed' : 'Missing'}
- **Last Documentation Update:** ${stats.documentation.lastUpdate}
- **Automation Health:** ${stats.maintenance.automationHealth ? 'Healthy' : 'Issues Detected'}

### Recommendations

#### Immediate Actions
${recommendations.immediate.map(r => `- ${r}`).join('\n')}

#### Short-term Improvements
${recommendations.shortTerm.map(r => `- ${r}`).join('\n')}

#### Long-term Enhancements
${recommendations.longTerm.map(r => `- ${r}`).join('\n')}

---
*This report was generated automatically by the LusoTown documentation system*
`;

    const reportPath = path.join(this.webAppRoot, 'DOCUMENTATION_DASHBOARD.md');
    fs.writeFileSync(reportPath, report);
    
    console.log(`📄 Dashboard report saved to: ${path.basename(reportPath)}`);
  }

  // Helper methods
  countFiles(pattern) {
    try {
      const command = `find ${this.webAppRoot} -path "*/node_modules" -prune -o -name "${pattern.split('/').pop()}" -type f -print | wc -l`;
      const result = execSync(command, { encoding: 'utf8' }).trim();
      return parseInt(result);
    } catch (error) {
      return 0;
    }
  }

  getHealthIcon(health) {
    const icons = {
      excellent: '🟢',
      good: '🟡',
      fair: '🟠',
      poor: '🔴'
    };
    return icons[health] || '⚪';
  }

  formatScore(score) {
    const rounded = Math.round(score);
    if (rounded >= 85) return `\x1b[32m${rounded}\x1b[0m`; // Green
    if (rounded >= 70) return `\x1b[33m${rounded}\x1b[0m`; // Yellow
    if (rounded >= 55) return `\x1b[31m${rounded}\x1b[0m`; // Red
    return `\x1b[91m${rounded}\x1b[0m`; // Bright red
  }

  getLastDocumentationUpdate() {
    try {
      const claudeFile = path.join(this.projectRoot, 'CLAUDE.md');
      if (fs.existsSync(claudeFile)) {
        const stats = fs.statSync(claudeFile);
        return stats.mtime.toLocaleDateString();
      }
    } catch (error) {
      return 'Unknown';
    }
    return 'Never';
  }

  getDaysSinceUpdate(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        return Math.floor((Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60 * 24));
      }
    } catch (error) {
      return 999;
    }
    return 999;
  }

  getDocumentationSize() {
    try {
      const result = execSync(`find ${this.webAppRoot} -name "*.md" -exec cat {} \\; | wc -c`, { encoding: 'utf8' });
      return `${Math.round(parseInt(result) / 1024)}KB`;
    } catch (error) {
      return 'Unknown';
    }
  }

  checkMainDocumentationFiles() {
    const files = ['CLAUDE.md', 'TODO.md', 'README.md'];
    const existing = files.filter(file => {
      const filePath = file === 'CLAUDE.md' ? 
        path.join(this.projectRoot, file) : 
        path.join(this.webAppRoot, file);
      return fs.existsSync(filePath);
    });
    return `${existing.length}/${files.length}`;
  }

  async countImplementedFeatures() {
    // This is a simplified count - could be enhanced with better detection
    const featuresWithFiles = [
      'BusinessMap.tsx',
      'TwitterFeedWidget.tsx',
      'StreamPlayer.tsx',
      'StudentVerificationSystem.tsx',
      'MembershipTiers.tsx'
    ];

    return featuresWithFiles.filter(file => 
      fs.existsSync(path.join(this.webAppRoot, 'src/components', file))
    ).length;
  }

  async countInProgressFeatures() {
    // Count TODO items that seem to be in progress
    const todoPath = path.join(this.webAppRoot, 'TODO.md');
    if (!fs.existsSync(todoPath)) return 0;

    const content = fs.readFileSync(todoPath, 'utf8');
    const inProgressItems = content.match(/- \[ \] .+/g) || [];
    return Math.min(inProgressItems.length, 20); // Cap at reasonable number
  }

  async countPlannedFeatures() {
    // Count TODO items that seem planned for future
    const todoPath = path.join(this.webAppRoot, 'TODO.md');
    if (!fs.existsSync(todoPath)) return 0;

    const content = fs.readFileSync(todoPath, 'utf8');
    const futurePhases = content.match(/## 🎯 PHASE [2-9]:/g) || [];
    return futurePhases.length * 5; // Estimate 5 features per phase
  }

  getLastMaintenanceRun() {
    const reportPath = path.join(this.webAppRoot, 'docs-maintenance-report.md');
    if (fs.existsSync(reportPath)) {
      const stats = fs.statSync(reportPath);
      return stats.mtime.toLocaleDateString();
    }
    return 'Never';
  }

  checkGitHooks() {
    const hookPath = path.join(this.projectRoot, '.git/hooks/post-commit');
    return fs.existsSync(hookPath);
  }

  checkAutomationHealth() {
    // Check if automation scripts exist and are executable
    const scripts = [
      'scripts/docs/documentation-agent.js',
      'scripts/docs/validate-documentation.js',
      'scripts/docs/capture-instructions.js'
    ];

    return scripts.every(script => 
      fs.existsSync(path.join(this.webAppRoot, script))
    );
  }

  async countDocumentedComponents() {
    // Count components mentioned in CLAUDE.md
    const claudePath = path.join(this.projectRoot, 'CLAUDE.md');
    if (!fs.existsSync(claudePath)) return 0;

    const content = fs.readFileSync(claudePath, 'utf8');
    const componentRefs = content.match(/\[\w+\.tsx\]/g) || [];
    return componentRefs.length;
  }

  getDocumentedComponentCount() {
    const claudePath = path.join(this.projectRoot, 'CLAUDE.md');
    if (!fs.existsSync(claudePath)) return 0;

    const content = fs.readFileSync(claudePath, 'utf8');
    const match = content.match(/(\d+)\+ components/);
    return match ? parseInt(match[1]) : 0;
  }

  async findBrokenLinks() {
    // Simplified broken link detection - could be enhanced
    const brokenLinks = [];
    
    const claudePath = path.join(this.projectRoot, 'CLAUDE.md');
    if (fs.existsSync(claudePath)) {
      const content = fs.readFileSync(claudePath, 'utf8');
      const componentLinks = content.match(/\[(\w+\.tsx)\]/g) || [];
      
      for (const link of componentLinks) {
        const componentName = link.replace(/[\[\]]/g, '');
        const componentPath = path.join(this.webAppRoot, 'src/components', componentName);
        
        if (!fs.existsSync(componentPath)) {
          brokenLinks.push(componentName);
        }
      }
    }
    
    return brokenLinks;
  }

  flattenObject(obj, prefix = '') {
    const flattened = {};
    
    for (const key in obj) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'object' && value !== null) {
        Object.assign(flattened, this.flattenObject(value, newKey));
      } else {
        flattened[newKey] = value;
      }
    }
    
    return flattened;
  }
}

// Run dashboard if called directly
if (require.main === module) {
  const dashboard = new DocumentationDashboard();
  dashboard.generateDashboard().catch(console.error);
}

module.exports = DocumentationDashboard;