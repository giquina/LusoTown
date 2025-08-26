#!/usr/bin/env node

/**
 * LusoTown AI Guidance Auto-Updater
 * 
 * This script automatically updates CLAUDE.md, RULES.md, and AGENTS.md
 * whenever /init command is run to ensure they stay current with codebase changes.
 * 
 * Usage: node scripts/update-ai-guidance.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class AIGuidanceUpdater {
  constructor() {
    this.rootDir = path.resolve(__dirname, '..');
    this.timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Analyze current codebase state
    this.codebaseStats = this.analyzeCodebase();
  }

  analyzeCodebase() {
    const stats = {
      pages: 0,
      components: 0,
      configFiles: 0,
      testFiles: 0,
      totalFiles: 0,
      aiSystems: 0,
      lastCommit: '',
      nodeVersion: '',
      npmScripts: {},
      dependencies: {},
      devDependencies: {}
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

      // AI systems (estimate based on AI-related files)
      const aiDir = path.join(webAppSrc, 'components/ai');
      if (fs.existsSync(aiDir)) {
        stats.aiSystems = Math.max(4, this.countFiles(aiDir, '.tsx') / 5); // Estimate
      } else {
        stats.aiSystems = 4; // Known AI systems
      }

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

  updateClaudeFile() {
    const claudePath = path.join(this.rootDir, 'CLAUDE.md');
    
    // Read current CLAUDE.md
    let content = '';
    if (fs.existsSync(claudePath)) {
      content = fs.readFileSync(claudePath, 'utf8');
    }

    // Update key statistics in the content
    content = content.replace(
      /\*\*Status\*\*: Production-ready with \d+\+ pages, \d+\+ components/,
      `**Status**: Production-ready with ${this.codebaseStats.pages}+ pages, ${this.codebaseStats.components}+ components`
    );

    content = content.replace(
      /- \*\*522\+ React Components\*\*/,
      `- **${this.codebaseStats.components}+ React Components**`
    );

    content = content.replace(
      /All dynamic data centralized in `\/web-app\/src\/config\/` \(\d+\+ configuration files\):/,
      `All dynamic data centralized in \`/web-app/src/config/\` (${this.codebaseStats.configFiles}+ configuration files):`
    );

    // Update timestamp
    if (content.includes('Updated: ')) {
      content = content.replace(
        /Updated: \d{4}-\d{2}-\d{2}/,
        `Updated: ${this.timestamp}`
      );
    } else {
      // Add timestamp at the top after the header
      content = content.replace(
        /This file provides guidance to Claude Code \(claude\.ai\/code\) when working with code in this repository\./,
        `This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.\n\n**Updated: ${this.timestamp}** | **Last Commit**: ${this.codebaseStats.lastCommit}`
      );
    }

    // Add current system info if not present
    if (!content.includes('## Current System Status')) {
      const systemStatus = `

## Current System Status

**Last Updated**: ${this.timestamp}  
**Node Version**: ${this.codebaseStats.nodeVersion}  
**Last Commit**: ${this.codebaseStats.lastCommit}  
**Architecture**: ${this.codebaseStats.pages} pages, ${this.codebaseStats.components} components, ${this.codebaseStats.configFiles} config files  
**AI Systems**: ${this.codebaseStats.aiSystems} production AI engines  
**Test Coverage**: ${this.codebaseStats.testFiles} test files  

**Key npm Scripts**: ${this.codebaseStats.npmScripts.slice(0, 10).join(', ')}  
**Major Dependencies**: ${this.codebaseStats.dependencies.slice(0, 8).join(', ')}
`;

      // Insert after the Project Overview section
      content = content.replace(
        /## System Requirements/,
        systemStatus + '\n## System Requirements'
      );
    }

    fs.writeFileSync(claudePath, content);
    console.log('✅ Updated CLAUDE.md');
  }

  updateRulesFile() {
    const rulesPath = path.join(this.rootDir, 'RULES.md');
    
    let content = '';
    if (fs.existsSync(rulesPath)) {
      content = fs.readFileSync(rulesPath, 'utf8');
    }

    // Update timestamp at the top
    if (content.includes('Last Updated: ')) {
      content = content.replace(
        /Last Updated: \d{4}-\d{2}-\d{2}/,
        `Last Updated: ${this.timestamp}`
      );
    } else {
      content = content.replace(
        /This file provides strict rules and standards/,
        `**Last Updated: ${this.timestamp}**\n\nThis file provides strict rules and standards`
      );
    }

    // Add current audit status if not present
    if (!content.includes('### Current Audit Status (')) {
      content = content.replace(
        /### Current Audit Status \(August 2025\)/,
        `### Current Audit Status (${this.timestamp})`
      );
    }

    // Update config file count reference
    content = content.replace(
      /All dynamic data centralized in `\/web-app\/src\/config\/` \(\d+\+ configuration files\)/,
      `All dynamic data centralized in \`/web-app/src/config/\` (${this.codebaseStats.configFiles}+ configuration files)`
    );

    fs.writeFileSync(rulesPath, content);
    console.log('✅ Updated RULES.md');
  }

  updateAgentsFile() {
    const agentsPath = path.join(this.rootDir, 'AGENTS.md');
    
    let content = '';
    if (fs.existsSync(agentsPath)) {
      content = fs.readFileSync(agentsPath, 'utf8');
    }

    // Update status information
    content = content.replace(
      /\*\*Status\*\*: Production-ready - \d+\+ pages, \d+\+ components/,
      `**Status**: Production-ready - ${this.codebaseStats.pages}+ pages, ${this.codebaseStats.components}+ components`
    );

    // Update timestamp
    if (content.includes('**Last Updated**: ')) {
      content = content.replace(
        /\*\*Last Updated\*\*: \d{4}-\d{2}-\d{2}/,
        `**Last Updated**: ${this.timestamp}`
      );
    } else {
      // Add timestamp after project overview
      content = content.replace(
        /\*\*Status\*\*: Production-ready/,
        `**Last Updated**: ${this.timestamp}\n\n**Status**: Production-ready`
      );
    }

    // Update the configuration files count
    content = content.replace(
      /All dynamic data lives in `\/src\/config\/`:/,
      `All dynamic data lives in \`/src/config/\` (${this.codebaseStats.configFiles} files):`
    );

    fs.writeFileSync(agentsPath, content);
    console.log('✅ Updated AGENTS.md');
  }

  run() {
    console.log('🔄 Starting AI guidance files update...\n');
    console.log(`📊 Current codebase stats:`);
    console.log(`   Pages: ${this.codebaseStats.pages}`);
    console.log(`   Components: ${this.codebaseStats.components}`);
    console.log(`   Config files: ${this.codebaseStats.configFiles}`);
    console.log(`   Test files: ${this.codebaseStats.testFiles}`);
    console.log(`   AI systems: ${this.codebaseStats.aiSystems}`);
    console.log(`   Node version: ${this.codebaseStats.nodeVersion}`);
    console.log(`   Last commit: ${this.codebaseStats.lastCommit}\n`);

    try {
      this.updateClaudeFile();
      this.updateRulesFile();
      this.updateAgentsFile();
      
      console.log(`\n🎉 Successfully updated all AI guidance files on ${this.timestamp}`);
      console.log('📝 Files updated: CLAUDE.md, RULES.md, AGENTS.md');
      console.log('🔧 Next: These files now reflect current codebase state');
      
    } catch (error) {
      console.error('❌ Error updating AI guidance files:', error.message);
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const updater = new AIGuidanceUpdater();
  updater.run();
}

module.exports = AIGuidanceUpdater;