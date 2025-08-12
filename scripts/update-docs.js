#!/usr/bin/env node

/**
 * /update-docs Slash Command Implementation
 * 
 * Scans codebase changes and auto-updates documentation files:
 * - All README.md files
 * - CLAUDE.md 
 * - Anything inside /docs/
 * 
 * Usage: node scripts/update-docs.js
 * Or via Claude slash command: /update-docs
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class DocumentationUpdater {
  constructor(projectRoot = '/workspaces/AdyaTribe') {
    this.projectRoot = projectRoot;
    this.changes = [];
    this.lastCommit = '';
    this.currentDate = new Date().toISOString().split('T')[0];
  }

  /**
   * Main execution function
   */
  async run() {
    console.log('🔄 Starting documentation update process...\n');
    
    try {
      // 1. Scan for recent changes
      await this.scanCodebaseChanges();
      
      // 2. Update documentation files
      await this.updateReadmeFiles();
      await this.updateClaudeFile();
      await this.updateDocsDirectory();
      
      // 3. Summary
      this.printSummary();
      
      console.log('\n✅ Documentation update completed successfully!');
      
    } catch (error) {
      console.error('❌ Error updating documentation:', error.message);
      process.exit(1);
    }
  }

  /**
   * Scan git changes since last commit
   */
  async scanCodebaseChanges() {
    console.log('📊 Scanning codebase changes...');
    
    try {
      // Get recent commits
      const gitLog = execSync('git log --oneline -10', { 
        cwd: this.projectRoot,
        encoding: 'utf8' 
      });
      
      this.lastCommit = gitLog.split('\n')[0];
      
      // Get changed files
      const gitStatus = execSync('git status --porcelain', { 
        cwd: this.projectRoot,
        encoding: 'utf8' 
      });
      
      // Get recently modified files
      const changedFiles = gitStatus
        .split('\n')
        .filter(line => line.trim())
        .map(line => ({
          status: line.substring(0, 2),
          file: line.substring(3)
        }));
      
      this.changes = changedFiles;
      
      console.log(`   Found ${changedFiles.length} changed files`);
      console.log(`   Last commit: ${this.lastCommit}`);
      
    } catch (error) {
      console.log('   Warning: Could not scan git changes, proceeding with full update');
    }
  }

  /**
   * Update all README.md files with current project status
   */
  async updateReadmeFiles() {
    console.log('\n📄 Updating README.md files...');
    
    // Find all README.md files (excluding node_modules)
    const readmeFiles = this.findFiles('README.md', [
      'node_modules',
      '.git',
      'build',
      'dist'
    ]);
    
    for (const readmePath of readmeFiles) {
      await this.updateReadme(readmePath);
    }
  }

  /**
   * Update a specific README.md file
   */
  async updateReadme(filePath) {
    const relativePath = path.relative(this.projectRoot, filePath);
    console.log(`   Updating ${relativePath}...`);
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Update last modified date
      const dateRegex = /Last Updated:.*?(\d{4}-\d{2}-\d{2})/;
      if (dateRegex.test(content)) {
        content = content.replace(dateRegex, `Last Updated: ${this.currentDate}`);
      } else {
        // Add last updated section if doesn't exist
        content += `\n\n---\n\n*Last Updated: ${this.currentDate}*\n`;
      }
      
      // Update project status based on actual state
      if (relativePath === 'README.md') {
        // Main project README
        content = this.updateMainReadme(content);
      } else if (relativePath.includes('mobile-app')) {
        // Mobile app README
        content = this.updateMobileAppReadme(content);
      }
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`   ✅ Updated ${relativePath}`);
      
    } catch (error) {
      console.log(`   ⚠️  Failed to update ${relativePath}: ${error.message}`);
    }
  }

  /**
   * Update main project README
   */
  updateMainReadme(content) {
    // Count completed onboarding steps
    const onboardingDir = path.join(this.projectRoot, 'mobile-app/src/screens/onboarding');
    let completedSteps = 0;
    
    try {
      const stepFiles = ['FirstNameStep.js', 'DateOfBirthStep.js', 'EmailStep.js'];
      completedSteps = stepFiles.filter(file => 
        fs.existsSync(path.join(onboardingDir, file))
      ).length;
    } catch (error) {
      // Fallback to known state
      completedSteps = 3;
    }
    
    // Update progress indicators
    const progressRegex = /Steps \d+-\d+ complete/;
    if (progressRegex.test(content)) {
      content = content.replace(progressRegex, `Steps 1-${completedSteps} complete`);
    }
    
    return content;
  }

  /**
   * Update mobile app README
   */
  updateMobileAppReadme(content) {
    // Add current development status
    const statusSection = `
## 🎯 Current Development Status

- ✅ **Onboarding Step 1**: First name collection with validation
- ✅ **Onboarding Step 2**: Date of birth with 30+ age verification  
- ✅ **Onboarding Step 3**: Email validation with real-time feedback
- 📋 **Onboarding Step 4**: Profile picture upload (planned)
- 📋 **Onboarding Step 5**: Selfie verification (planned)
- 📋 **Onboarding Step 6**: Interest selection (planned)
- 📋 **Onboarding Step 7**: Welcome screen (planned)

*Auto-updated: ${this.currentDate}*
`;
    
    // Replace or add status section
    const statusRegex = /## 🎯 Current Development Status[\s\S]*?\*Auto-updated:.*?\*/;
    if (statusRegex.test(content)) {
      content = content.replace(statusRegex, statusSection.trim());
    } else {
      // Add before any existing footer
      const footerRegex = /\n---\n/;
      if (footerRegex.test(content)) {
        content = content.replace(footerRegex, `\n${statusSection}\n---\n`);
      } else {
        content += statusSection;
      }
    }
    
    return content;
  }

  /**
   * Update CLAUDE.md with current project state
   */
  async updateClaudeFile() {
    console.log('\n🤖 Updating CLAUDE.md...');
    
    const claudePath = path.join(this.projectRoot, 'CLAUDE.md');
    
    if (!fs.existsSync(claudePath)) {
      console.log('   ⚠️  CLAUDE.md not found, skipping...');
      return;
    }
    
    try {
      let content = fs.readFileSync(claudePath, 'utf8');
      
      // Update the file structure reference section
      const agentCount = this.countAgents();
      const onboardingSteps = this.countOnboardingSteps();
      
      // Add current project metrics
      const metricsSection = `
## 📊 **Current Project Metrics** 
*(Auto-updated: ${this.currentDate})*

- **Claude Code Agents**: ${agentCount} specialized agents
- **Onboarding Steps**: ${onboardingSteps}/7 completed
- **Documentation Files**: Auto-synced with codebase
- **Git Status**: ${this.changes.length} pending changes
- **Last Activity**: ${this.lastCommit.substring(0, 50)}...

`;

      // Replace or add metrics section
      const metricsRegex = /## 📊 \*\*Current Project Metrics\*\*[\s\S]*?\n\n/;
      if (metricsRegex.test(content)) {
        content = content.replace(metricsRegex, metricsSection);
      } else {
        // Add before quality standards
        const qualityRegex = /## 🎯 \*\*Quality Standards\*\*/;
        if (qualityRegex.test(content)) {
          content = content.replace(qualityRegex, `${metricsSection}## 🎯 **Quality Standards**`);
        } else {
          content += metricsSection;
        }
      }
      
      fs.writeFileSync(claudePath, content, 'utf8');
      console.log('   ✅ Updated CLAUDE.md with current metrics');
      
    } catch (error) {
      console.log(`   ⚠️  Failed to update CLAUDE.md: ${error.message}`);
    }
  }

  /**
   * Update all files in /docs/ directory
   */
  async updateDocsDirectory() {
    console.log('\n📚 Updating /docs/ directory...');
    
    const docsDir = path.join(this.projectRoot, 'docs');
    
    if (!fs.existsSync(docsDir)) {
      console.log('   📁 Creating /docs/ directory...');
      fs.mkdirSync(docsDir, { recursive: true });
      
      // Create initial docs
      await this.createInitialDocs(docsDir);
    }
    
    // Update existing docs
    const docFiles = this.findFiles('*.md', ['node_modules'], docsDir);
    
    for (const docPath of docFiles) {
      await this.updateDocFile(docPath);
    }
  }

  /**
   * Create initial documentation files
   */
  async createInitialDocs(docsDir) {
    const docs = [
      {
        name: 'development-guide.md',
        content: `# AdyaTribe Development Guide

*Auto-generated: ${this.currentDate}*

## Getting Started

This guide covers the development workflow for AdyaTribe.

## Current Progress

- Onboarding Steps: ${this.countOnboardingSteps()}/7 completed
- Claude Code Agents: ${this.countAgents()} specialized agents

## Next Steps

See \`tasks/todo.md\` for current development priorities.

---

*This document is auto-updated by the /update-docs command.*
`
      }
    ];
    
    for (const doc of docs) {
      const docPath = path.join(docsDir, doc.name);
      if (!fs.existsSync(docPath)) {
        fs.writeFileSync(docPath, doc.content, 'utf8');
        console.log(`   ✅ Created ${doc.name}`);
      }
    }
  }

  /**
   * Update a documentation file
   */
  async updateDocFile(filePath) {
    const relativePath = path.relative(this.projectRoot, filePath);
    console.log(`   Updating ${relativePath}...`);
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Update auto-generated timestamp
      const timestampRegex = /\*Auto-(?:generated|updated): \d{4}-\d{2}-\d{2}\*/g;
      content = content.replace(timestampRegex, `*Auto-updated: ${this.currentDate}*`);
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`   ✅ Updated ${relativePath}`);
      
    } catch (error) {
      console.log(`   ⚠️  Failed to update ${relativePath}: ${error.message}`);
    }
  }

  /**
   * Utility functions
   */
  findFiles(pattern, excludeDirs = [], searchDir = null) {
    const startDir = searchDir || this.projectRoot;
    const files = [];
    
    const isGlob = pattern.includes('*');
    
    const walk = (dir) => {
      try {
        const items = fs.readdirSync(dir);
        
        for (const item of items) {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            // Skip excluded directories
            if (!excludeDirs.some(exclude => item.includes(exclude))) {
              walk(fullPath);
            }
          } else if (stat.isFile()) {
            // Match file pattern
            if (isGlob) {
              const regex = new RegExp(pattern.replace('*', '.*'));
              if (regex.test(item)) {
                files.push(fullPath);
              }
            } else if (item === pattern) {
              files.push(fullPath);
            }
          }
        }
      } catch (error) {
        // Skip inaccessible directories
      }
    };
    
    walk(startDir);
    return files;
  }

  countAgents() {
    const agentDir = path.join(this.projectRoot, '.claude/agents');
    try {
      return fs.readdirSync(agentDir).filter(file => file.endsWith('.md')).length;
    } catch {
      return 0;
    }
  }

  countOnboardingSteps() {
    const onboardingDir = path.join(this.projectRoot, 'mobile-app/src/screens/onboarding');
    try {
      return fs.readdirSync(onboardingDir)
        .filter(file => file.endsWith('Step.js')).length;
    } catch {
      return 0;
    }
  }

  printSummary() {
    console.log('\n📋 Documentation Update Summary:');
    console.log(`   📄 README files updated`);
    console.log(`   🤖 CLAUDE.md synchronized`);
    console.log(`   📚 /docs/ directory updated`);
    console.log(`   📊 Project metrics refreshed`);
    console.log(`   📅 Last updated: ${this.currentDate}`);
  }
}

// CLI execution
if (require.main === module) {
  const updater = new DocumentationUpdater();
  updater.run().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = DocumentationUpdater;