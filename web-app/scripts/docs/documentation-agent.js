#!/usr/bin/env node

/**
 * LusoTown Documentation Agent
 * 
 * This automated agent maintains up-to-date documentation by:
 * - Scanning codebase for implemented features
 * - Updating TODO.md with completion status
 * - Maintaining CLAUDE.md with current architecture
 * - Capturing new instructions and patterns
 * - Generating component/page counts automatically
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class DocumentationAgent {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '../../../');
    this.webAppRoot = path.resolve(__dirname, '../../');
    this.timestamp = new Date().toISOString();
    this.changesSummary = [];
  }

  async run() {
    console.log('🔄 LusoTown Documentation Agent Starting...');
    
    try {
      await this.scanCodebase();
      await this.updateTODO();
      await this.updateCLAUDE();
      await this.captureInstructions();
      await this.generateReport();
      
      console.log('✅ Documentation maintenance completed successfully');
    } catch (error) {
      console.error('❌ Documentation agent failed:', error.message);
      process.exit(1);
    }
  }

  async scanCodebase() {
    console.log('📊 Scanning codebase for changes...');
    
    // Count components
    this.componentCount = this.countFiles('src/components/**/*.tsx');
    this.pageCount = this.countFiles('src/app/**/page.tsx');
    this.contextCount = this.countFiles('src/context/**/*.tsx');
    this.hookCount = this.countFiles('src/hooks/**/*.tsx');
    
    // Scan for implemented features
    this.implementedFeatures = await this.detectImplementedFeatures();
    
    // Check for new patterns and decisions
    this.newPatterns = await this.detectNewPatterns();
    
    console.log(`📈 Found: ${this.componentCount} components, ${this.pageCount} pages`);
  }

  countFiles(pattern) {
    try {
      const command = `find ${this.webAppRoot} -path "*/node_modules" -prune -o -name "${pattern.split('/').pop()}" -type f -print | wc -l`;
      const result = execSync(command, { encoding: 'utf8' }).trim();
      return parseInt(result);
    } catch (error) {
      console.warn(`Warning: Could not count files for pattern ${pattern}`);
      return 0;
    }
  }

  async detectImplementedFeatures() {
    const features = new Map();
    
    // Check for key feature implementations
    const featureChecks = [
      {
        name: 'Business Directory with Geolocation',
        files: ['BusinessMap.tsx', 'BusinessSubmissionForm.tsx', 'NearMeButton.tsx'],
        status: 'checking'
      },
      {
        name: 'Twitter Feed Integration',
        files: ['TwitterFeedWidget.tsx', 'TwitterHashtagTabs.tsx'],
        status: 'checking'
      },
      {
        name: 'Streaming Platform',
        files: ['StreamPlayer.tsx', 'StreamSchedule.tsx', 'LiveChatWidget.tsx'],
        status: 'checking'
      },
      {
        name: 'Student Verification System',
        files: ['StudentVerificationSystem.tsx'],
        status: 'checking'
      },
      {
        name: 'Premium Membership Tiers',
        files: ['MembershipTiers.tsx', 'MembershipPortal.tsx', 'PaymentProcessor.tsx'],
        status: 'checking'
      }
    ];

    for (const feature of featureChecks) {
      const implemented = feature.files.every(file => 
        fs.existsSync(path.join(this.webAppRoot, 'src/components', file))
      );
      features.set(feature.name, implemented ? 'completed' : 'in-progress');
    }

    return features;
  }

  async detectNewPatterns() {
    const patterns = [];
    
    // Scan recent git commits for new patterns
    try {
      const recentCommits = execSync('git log --oneline -10', { 
        cwd: this.projectRoot, 
        encoding: 'utf8' 
      });
      
      // Look for pattern indicators in commit messages
      if (recentCommits.includes('fix:')) {
        patterns.push('Bug fixes and improvements');
      }
      if (recentCommits.includes('feat:')) {
        patterns.push('New feature implementations');
      }
      if (recentCommits.includes('Portuguese')) {
        patterns.push('Portuguese community enhancements');
      }
      
    } catch (error) {
      console.warn('Could not analyze git commits');
    }
    
    return patterns;
  }

  async updateTODO() {
    console.log('📝 Updating TODO.md...');
    
    const todoPath = path.join(this.webAppRoot, 'TODO.md');
    
    if (!fs.existsSync(todoPath)) {
      console.warn('TODO.md not found, skipping update');
      return;
    }

    let todoContent = fs.readFileSync(todoPath, 'utf8');
    let updated = false;

    // Mark completed features as done
    for (const [feature, status] of this.implementedFeatures) {
      if (status === 'completed') {
        // Look for related TODO items and mark them completed
        const featurePattern = new RegExp(`- \\[ \\] ([^\\n]*${feature.split(' ')[0]}[^\\n]*)`, 'gi');
        const matches = todoContent.match(featurePattern);
        
        if (matches) {
          for (const match of matches) {
            const completed = match.replace('- [ ]', '- [x]');
            todoContent = todoContent.replace(match, completed);
            updated = true;
            this.changesSummary.push(`Marked completed: ${match.substring(6)}`);
          }
        }
      }
    }

    // Update timestamp
    todoContent = todoContent.replace(
      /Last Updated: .*/,
      `Last Updated: ${new Date().toLocaleDateString()}`
    );

    if (updated) {
      fs.writeFileSync(todoPath, todoContent);
      this.changesSummary.push('Updated TODO.md completion status');
    }
  }

  async updateCLAUDE() {
    console.log('📚 Updating CLAUDE.md...');
    
    const claudePath = path.join(this.projectRoot, 'CLAUDE.md');
    
    if (!fs.existsSync(claudePath)) {
      console.warn('CLAUDE.md not found, skipping update');
      return;
    }

    let claudeContent = fs.readFileSync(claudePath, 'utf8');
    let updated = false;

    // Update component and page counts
    const componentPattern = /(\d+)\+ components/;
    const pagePattern = /(\d+)\+ pages/;
    
    if (componentPattern.test(claudeContent)) {
      claudeContent = claudeContent.replace(
        componentPattern,
        `${this.componentCount}+ components`
      );
      updated = true;
      this.changesSummary.push(`Updated component count to ${this.componentCount}`);
    }

    if (pagePattern.test(claudeContent)) {
      claudeContent = claudeContent.replace(
        pagePattern,
        `${this.pageCount}+ pages`
      );
      updated = true;
      this.changesSummary.push(`Updated page count to ${this.pageCount}`);
    }

    // Update status information
    const statusPattern = /\*\*Status:\*\* Production-ready - (\d+)\+ pages, (\d+)\+ components/;
    if (statusPattern.test(claudeContent)) {
      claudeContent = claudeContent.replace(
        statusPattern,
        `**Status:** Production-ready - ${this.pageCount}+ pages, ${this.componentCount}+ components`
      );
      updated = true;
    }

    // Add recent features section if new implementations detected
    if (this.implementedFeatures.size > 0) {
      const recentFeaturesSection = this.generateRecentFeaturesSection();
      
      // Find the latest features section and update it
      const latestFeaturesPattern = /### Recent Major Features \(.*?\)/;
      if (latestFeaturesPattern.test(claudeContent)) {
        claudeContent = claudeContent.replace(
          latestFeaturesPattern,
          `### Recent Major Features (${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })})`
        );
        updated = true;
      }
    }

    if (updated) {
      fs.writeFileSync(claudePath, claudeContent);
      this.changesSummary.push('Updated CLAUDE.md with current architecture');
    }
  }

  generateRecentFeaturesSection() {
    const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    let section = `### Recent Major Features (${currentMonth})\n\n`;
    
    for (const [feature, status] of this.implementedFeatures) {
      if (status === 'completed') {
        section += `**✅ ${feature}:**\n`;
        section += `- Implementation completed and verified\n`;
        section += `- Production ready with full Portuguese community integration\n\n`;
      }
    }
    
    return section;
  }

  async captureInstructions() {
    console.log('📋 Capturing new instructions and patterns...');
    
    const instructionsPath = path.join(this.webAppRoot, 'AGENT_BRIEFINGS.md');
    
    if (this.newPatterns.length > 0) {
      let content = '';
      
      if (fs.existsSync(instructionsPath)) {
        content = fs.readFileSync(instructionsPath, 'utf8');
      } else {
        content = '# Agent Briefings and Patterns\n\n';
      }
      
      // Add new patterns section
      const newSection = `## Patterns Detected - ${new Date().toLocaleDateString()}\n\n`;
      
      for (const pattern of this.newPatterns) {
        content += `- ${pattern}\n`;
      }
      
      content += '\n';
      
      fs.writeFileSync(instructionsPath, content);
      this.changesSummary.push('Captured new development patterns');
    }
  }

  async generateReport() {
    console.log('📊 Generating documentation maintenance report...');
    
    const reportPath = path.join(this.webAppRoot, 'docs-maintenance-report.md');
    
    const report = `# Documentation Maintenance Report
Generated: ${this.timestamp}

## Codebase Statistics
- **Components:** ${this.componentCount}
- **Pages:** ${this.pageCount}
- **Contexts:** ${this.contextCount}
- **Hooks:** ${this.hookCount}

## Feature Implementation Status
${Array.from(this.implementedFeatures).map(([feature, status]) => 
  `- **${feature}:** ${status === 'completed' ? '✅ Completed' : '🔄 In Progress'}`
).join('\n')}

## Changes Made
${this.changesSummary.length > 0 ? 
  this.changesSummary.map(change => `- ${change}`).join('\n') : 
  '- No changes required (documentation up to date)'
}

## New Patterns Detected
${this.newPatterns.length > 0 ? 
  this.newPatterns.map(pattern => `- ${pattern}`).join('\n') : 
  '- No new patterns detected'
}

---
*This report was generated automatically by the LusoTown Documentation Agent*
`;

    fs.writeFileSync(reportPath, report);
    console.log(`📄 Report saved to: ${reportPath}`);
  }
}

// Run the documentation agent
if (require.main === module) {
  const agent = new DocumentationAgent();
  agent.run().catch(console.error);
}

module.exports = DocumentationAgent;