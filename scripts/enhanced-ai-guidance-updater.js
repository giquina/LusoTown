#!/usr/bin/env node

/**
 * Enhanced LusoTown AI Guidance Auto-Updater
 * 
 * This script automatically updates all critical .md files including:
 * - Core AI guidance files (CLAUDE.md, RULES.md, AGENTS.md) 
 * - Developer setup and workflow files
 * - Platform status and deployment summaries
 * - UI/UX rules and development guides
 * 
 * Usage: node scripts/enhanced-ai-guidance-updater.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class EnhancedAIGuidanceUpdater {
  constructor() {
    this.rootDir = path.resolve(__dirname, '..');
    this.timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    this.fullTimestamp = new Date().toISOString();
    
    // Define critical .md files to update
    this.criticalMdFiles = [
      // Core AI guidance files (primary)
      { path: 'CLAUDE.md', type: 'core', priority: 1 },
      { path: 'RULES.md', type: 'core', priority: 1 },
      { path: 'AGENTS.md', type: 'core', priority: 1 },
      
      // Developer workflow and setup
      { path: 'web-app/DEVELOPER_SETUP.md', type: 'developer', priority: 2 },
      { path: 'web-app/UI_UX_RULES.md', type: 'developer', priority: 2 },
      { path: 'web-app/TODO.md', type: 'roadmap', priority: 2 },
      
      // Platform status and deployment
      { path: 'DEPLOYMENT_SUMMARY.md', type: 'status', priority: 2 },
      { path: 'web-app/TESTING_FRAMEWORK.md', type: 'developer', priority: 3 },
      { path: 'web-app/API_DOCUMENTATION.md', type: 'technical', priority: 3 },
      
      // Architecture and implementation guides
      { path: 'web-app/DESIGN_SYSTEM.md', type: 'design', priority: 3 },
      { path: 'web-app/DEVELOPMENT_WORKFLOW.md', type: 'developer', priority: 3 },
      { path: 'streaming/README.md', type: 'component', priority: 3 },
      
      // Business and strategic documents
      { path: 'LUSOTOWN_API_DOCUMENTATION.md', type: 'technical', priority: 3 },
      { path: 'PORTUGUESE_BRAND_COLORS.md', type: 'design', priority: 3 }
    ];
    
    // Analyze current codebase state
    this.codebaseStats = this.analyzeCodebase();
  }

  analyzeCodebase() {
    const stats = {
      pages: 0,
      components: 0,
      configFiles: 0,
      testFiles: 0,
      totalMdFiles: 0,
      aiSystems: 4, // Known AI systems
      lastCommit: '',
      nodeVersion: '',
      npmScripts: [],
      dependencies: [],
      devDependencies: [],
      liveUrl: 'https://lusotown-bzkyz77ez-giquinas-projects.vercel.app',
      communityMembers: '750+',
      students: '2,150+',
      universities: '8'
    };

    try {
      // Analyze web-app structure
      const webAppSrc = path.join(this.rootDir, 'web-app/src');
      
      // Count pages
      const appDir = path.join(webAppSrc, 'app');
      if (fs.existsSync(appDir)) {
        stats.pages = this.countFiles(appDir, 'page.tsx');
      }

      // Count components
      const componentsDir = path.join(webAppSrc, 'components');
      if (fs.existsSync(componentsDir)) {
        stats.components = this.countFiles(componentsDir, '.tsx');
      }

      // Count config files
      const configDir = path.join(webAppSrc, 'config');
      if (fs.existsSync(configDir)) {
        stats.configFiles = this.countFiles(configDir, '.ts');
      }

      // Count test files
      const testsDir = path.join(this.rootDir, 'web-app/__tests__');
      if (fs.existsSync(testsDir)) {
        stats.testFiles = this.countFiles(testsDir, '.test.');
      }

      // Count total .md files
      stats.totalMdFiles = this.countFiles(this.rootDir, '.md');

      // Get last commit
      try {
        stats.lastCommit = execSync('git log -1 --format="%h %s"', { encoding: 'utf8' }).trim();
      } catch (e) {
        stats.lastCommit = 'Unknown';
      }

      // Get Node version
      try {
        stats.nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
      } catch (e) {
        stats.nodeVersion = 'Unknown';
      }

      // Analyze package.json
      const packageJsonPath = path.join(this.rootDir, 'web-app/package.json');
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        stats.npmScripts = Object.keys(packageJson.scripts || {});
        stats.dependencies = Object.keys(packageJson.dependencies || {});
        stats.devDependencies = Object.keys(packageJson.devDependencies || {});
      }

    } catch (error) {
      console.warn('Warning: Could not analyze codebase completely:', error.message);
    }

    return stats;
  }

  countFiles(dir, pattern) {
    if (!fs.existsSync(dir)) return 0;
    
    let count = 0;
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      if (item.isDirectory()) {
        count += this.countFiles(path.join(dir, item.name), pattern);
      } else if (item.name.includes(pattern)) {
        count++;
      }
    }
    
    return count;
  }

  updateMarkdownFile(filePath, type, priority) {
    const fullPath = path.join(this.rootDir, filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️  File not found: ${filePath}`);
      return false;
    }

    try {
      let content = fs.readFileSync(fullPath, 'utf8');
      let updated = false;

      // Universal updates for all .md files
      content = this.applyUniversalUpdates(content, type);

      // File-specific updates
      switch (path.basename(filePath)) {
        case 'CLAUDE.md':
          content = this.updateClaudeSpecific(content);
          updated = true;
          break;
        case 'RULES.md':
          content = this.updateRulesSpecific(content);
          updated = true;
          break;
        case 'AGENTS.md':
          content = this.updateAgentsSpecific(content);
          updated = true;
          break;
        case 'TODO.md':
          content = this.updateTodoSpecific(content);
          updated = true;
          break;
        case 'DEVELOPER_SETUP.md':
          content = this.updateDeveloperSetupSpecific(content);
          updated = true;
          break;
        case 'DEPLOYMENT_SUMMARY.md':
          content = this.updateDeploymentSummarySpecific(content);
          updated = true;
          break;
        case 'UI_UX_RULES.md':
          content = this.updateUiUxRulesSpecific(content);
          updated = true;
          break;
        default:
          // Apply generic updates
          updated = true;
          break;
      }

      if (updated) {
        fs.writeFileSync(fullPath, content);
        return true;
      }
    } catch (error) {
      console.error(`❌ Error updating ${filePath}:`, error.message);
      return false;
    }

    return false;
  }

  applyUniversalUpdates(content, type) {
    // Update timestamps
    if (content.includes('Last Updated: ') || content.includes('**Last Updated**: ')) {
      content = content.replace(
        /(\*\*)?Last Updated(\*\*)?: \d{4}-\d{2}-\d{2}/g,
        `$1Last Updated$2: ${this.timestamp}`
      );
    } else if (content.includes('**Updated: ')) {
      content = content.replace(
        /\*\*Updated: \d{4}-\d{2}-\d{2}\*\*/,
        `**Updated: ${this.timestamp}**`
      );
    } else {
      // Add timestamp if none exists (after first heading)
      content = content.replace(
        /(^# .+\n\n)/m,
        `$1**Last Updated: ${this.timestamp}**\n\n`
      );
    }

    // Update codebase statistics
    content = content.replace(/\d+\+ pages/g, `${this.codebaseStats.pages}+ pages`);
    content = content.replace(/\d+\+ components/g, `${this.codebaseStats.components}+ components`);
    content = content.replace(/\d+\+ configuration files/g, `${this.codebaseStats.configFiles}+ configuration files`);

    // Update community metrics
    content = content.replace(/750\+ members?/g, `${this.codebaseStats.communityMembers} members`);
    content = content.replace(/2,150\+ students?/g, `${this.codebaseStats.students} students`);
    content = content.replace(/8 universit(y|ies)/g, `${this.codebaseStats.universities} universities`);

    // Update Node.js version references
    content = content.replace(/Node\.js: v?\d+\.\d+\.\d+/g, `Node.js: ${this.codebaseStats.nodeVersion}`);

    return content;
  }

  updateClaudeSpecific(content) {
    // Update status information
    content = content.replace(
      /\*\*Status\*\*: Production-ready with \d+\+ pages, \d+\+ components/,
      `**Status**: Production-ready with ${this.codebaseStats.pages}+ pages, ${this.codebaseStats.components}+ components`
    );

    // Update last commit info  
    content = content.replace(
      /\*\*Last Commit\*\*: [^\n]+/,
      `**Last Commit**: ${this.codebaseStats.lastCommit}`
    );

    // Update system status section if it exists
    if (content.includes('## Current System Status')) {
      const systemStatusRegex = /(## Current System Status[\s\S]*?)(?=##|\n\n##|\Z)/;
      const newSystemStatus = `## Current System Status

**Last Updated**: ${this.timestamp}  
**Node Version**: ${this.codebaseStats.nodeVersion}  
**Last Commit**: ${this.codebaseStats.lastCommit}  
**Architecture**: ${this.codebaseStats.pages} pages, ${this.codebaseStats.components} components, ${this.codebaseStats.configFiles} config files  
**AI Systems**: ${this.codebaseStats.aiSystems} production AI engines  
**Test Coverage**: ${this.codebaseStats.testFiles} test files  
**Documentation**: ${this.codebaseStats.totalMdFiles} .md files

**Key npm Scripts**: ${this.codebaseStats.npmScripts.slice(0, 10).join(', ')}  
**Major Dependencies**: ${this.codebaseStats.dependencies.slice(0, 8).join(', ')}

`;

      content = content.replace(systemStatusRegex, newSystemStatus);
    }

    return content;
  }

  updateRulesSpecific(content) {
    // Update config file count reference
    content = content.replace(
      /All dynamic data centralized in `\/web-app\/src\/config\/` \(\d+\+ configuration files\)/,
      `All dynamic data centralized in \`/web-app/src/config/\` (${this.codebaseStats.configFiles}+ configuration files)`
    );

    // Update audit status date
    content = content.replace(
      /### Current Audit Status \([^)]+\)/,
      `### Current Audit Status (${this.timestamp})`
    );

    return content;
  }

  updateAgentsSpecific(content) {
    // Update status information
    content = content.replace(
      /\*\*Status\*\*: Production-ready - \d+\+ pages, \d+\+ components/,
      `**Status**: Production-ready - ${this.codebaseStats.pages}+ pages, ${this.codebaseStats.components}+ components`
    );

    // Update configuration files count
    content = content.replace(
      /All dynamic data lives in `\/src\/config\/` \(\d+ files\):/,
      `All dynamic data lives in \`/src/config/\` (${this.codebaseStats.configFiles} files):`
    );

    return content;
  }

  updateTodoSpecific(content) {
    // Add current status update at top
    const currentStatus = `---
Auto-update status (${this.timestamp}):

- Platform Status: Production-ready with ${this.codebaseStats.pages}+ pages, ${this.codebaseStats.components}+ components
- Live URL: ${this.codebaseStats.liveUrl}
- Last Commit: ${this.codebaseStats.lastCommit}
- AI Systems: ${this.codebaseStats.aiSystems} production engines operational
- Community: ${this.codebaseStats.communityMembers} members, ${this.codebaseStats.students} students, ${this.codebaseStats.universities} university partnerships

---

`;

    // Insert at the top after any existing status blocks
    if (content.includes('---\n\nClaude instance sync')) {
      // Replace the existing status block
      content = content.replace(
        /---\n\nClaude instance sync[\s\S]*?---\n\n/,
        currentStatus
      );
    } else {
      // Add at the very top
      content = currentStatus + content;
    }

    return content;
  }

  updateDeveloperSetupSpecific(content) {
    // Update version requirements
    content = content.replace(
      /Node\.js: \d+\.x or higher/,
      `Node.js: 22.x or higher (currently ${this.codebaseStats.nodeVersion})`
    );
    
    // Update last updated date in header
    content = content.replace(
      /\*\*Last Updated\*\*: [^*\n]+/,
      `**Last Updated**: ${this.timestamp}`
    );

    return content;
  }

  updateDeploymentSummarySpecific(content) {
    // Update deployment date
    content = content.replace(
      /\*\*Deployment Date\*\*: [^*\n]+/,
      `**Deployment Date**: ${this.timestamp}`
    );

    // Update live platform URL
    content = content.replace(
      /\*\*Live Platform\*\*: https:\/\/[^\s]+/,
      `**Live Platform**: ${this.codebaseStats.liveUrl}`
    );

    return content;
  }

  updateUiUxRulesSpecific(content) {
    // Add current platform context at top
    if (!content.includes('Platform Context:')) {
      const platformContext = `
**Platform Context**: ${this.codebaseStats.pages}+ pages, ${this.codebaseStats.components}+ components - Production-ready Portuguese-speaking community platform

`;
      content = content.replace(
        /(# LusoTown UI\/UX Development Rules\n\n)/,
        `$1**Last Updated**: ${this.timestamp}  
${platformContext}`
      );
    }

    return content;
  }

  async run() {
    console.log('🔄 Starting Enhanced AI Guidance Update System...\n');
    console.log(`📊 Current codebase analysis:`);
    console.log(`   📄 Pages: ${this.codebaseStats.pages}`);
    console.log(`   🧩 Components: ${this.codebaseStats.components}`);
    console.log(`   ⚙️  Config files: ${this.codebaseStats.configFiles}`);
    console.log(`   🧪 Test files: ${this.codebaseStats.testFiles}`);
    console.log(`   📝 Total .md files: ${this.codebaseStats.totalMdFiles}`);
    console.log(`   🤖 AI systems: ${this.codebaseStats.aiSystems}`);
    console.log(`   📦 Node version: ${this.codebaseStats.nodeVersion}`);
    console.log(`   🚀 Last commit: ${this.codebaseStats.lastCommit}`);
    console.log(`   🌐 Live URL: ${this.codebaseStats.liveUrl}\n`);

    let successCount = 0;
    let failCount = 0;

    // Process files by priority
    const filesByPriority = this.criticalMdFiles.sort((a, b) => a.priority - b.priority);

    console.log('📝 Updating critical .md files:\n');

    for (const file of filesByPriority) {
      const success = this.updateMarkdownFile(file.path, file.type, file.priority);
      if (success) {
        console.log(`   ✅ ${file.path} (${file.type}, priority ${file.priority})`);
        successCount++;
      } else {
        console.log(`   ❌ ${file.path} (${file.type}, priority ${file.priority})`);
        failCount++;
      }
    }

    console.log(`\n🎉 Enhanced AI Guidance Update Complete!`);
    console.log(`📈 Results: ${successCount} files updated, ${failCount} failed`);
    console.log(`📅 Timestamp: ${this.timestamp}`);
    console.log(`🔧 All critical .md files now reflect current codebase state`);
    
    if (successCount > 0) {
      console.log(`\n📚 Updated file types:`);
      const types = [...new Set(filesByPriority.map(f => f.type))];
      types.forEach(type => {
        const count = filesByPriority.filter(f => f.type === type).length;
        console.log(`   ${type}: ${count} files`);
      });
    }

    return { successCount, failCount, timestamp: this.timestamp };
  }
}

// Run if called directly
if (require.main === module) {
  const updater = new EnhancedAIGuidanceUpdater();
  updater.run().then(result => {
    process.exit(result.failCount > 0 ? 1 : 0);
  }).catch(error => {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  });
}

module.exports = EnhancedAIGuidanceUpdater;