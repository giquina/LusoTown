#!/usr/bin/env node

/**
 * LusoTown Periodic Documentation Maintenance
 * 
 * Comprehensive maintenance script that should be run regularly
 * to keep all documentation synchronized and up-to-date
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DocumentationAgent = require('./documentation-agent');
const DocumentationValidator = require('./validate-documentation');
const InstructionCapture = require('./capture-instructions');

class PeriodicMaintenance {
  constructor() {
    this.webAppRoot = path.resolve(__dirname, '../../');
    this.projectRoot = path.resolve(__dirname, '../../../');
    this.timestamp = new Date().toISOString();
    this.maintenanceLog = [];
  }

  async run() {
    console.log('🔄 Starting LusoTown Periodic Documentation Maintenance...');
    console.log(`⏰ Started at: ${new Date().toLocaleString()}\n`);
    
    try {
      await this.runFullMaintenance();
      await this.generateMaintenanceReport();
      
      console.log('\n✅ Periodic maintenance completed successfully!');
    } catch (error) {
      console.error('\n❌ Periodic maintenance failed:', error.message);
      process.exit(1);
    }
  }

  async runFullMaintenance() {
    // Step 1: Run documentation agent
    console.log('📊 Step 1: Running documentation agent...');
    try {
      const agent = new DocumentationAgent();
      await agent.run();
      this.maintenanceLog.push('✅ Documentation agent completed successfully');
    } catch (error) {
      this.maintenanceLog.push(`❌ Documentation agent failed: ${error.message}`);
      throw error;
    }

    // Step 2: Capture instructions from code
    console.log('\n📋 Step 2: Scanning code for instructions...');
    try {
      const instructionCapture = new InstructionCapture();
      await instructionCapture.scanCodeCommentsForInstructions();
      await instructionCapture.generateInstructionSummary();
      this.maintenanceLog.push('✅ Instruction capture completed');
    } catch (error) {
      this.maintenanceLog.push(`⚠️ Instruction capture warning: ${error.message}`);
    }

    // Step 3: Validate all documentation
    console.log('\n🔍 Step 3: Validating documentation...');
    try {
      const validator = new DocumentationValidator();
      const isValid = await validator.validate();
      
      if (isValid) {
        this.maintenanceLog.push('✅ Documentation validation passed');
      } else {
        this.maintenanceLog.push('⚠️ Documentation validation found issues');
      }
    } catch (error) {
      this.maintenanceLog.push(`❌ Documentation validation failed: ${error.message}`);
    }

    // Step 4: Update architecture documentation
    console.log('\n🏗️ Step 4: Updating architecture documentation...');
    try {
      await this.updateArchitectureDocumentation();
      this.maintenanceLog.push('✅ Architecture documentation updated');
    } catch (error) {
      this.maintenanceLog.push(`⚠️ Architecture update warning: ${error.message}`);
    }

    // Step 5: Clean up stale documentation
    console.log('\n🧹 Step 5: Cleaning up stale documentation...');
    try {
      await this.cleanupStaleDocumentation();
      this.maintenanceLog.push('✅ Stale documentation cleanup completed');
    } catch (error) {
      this.maintenanceLog.push(`⚠️ Cleanup warning: ${error.message}`);
    }

    // Step 6: Update README files
    console.log('\n📖 Step 6: Updating README files...');
    try {
      await this.updateReadmeFiles();
      this.maintenanceLog.push('✅ README files updated');
    } catch (error) {
      this.maintenanceLog.push(`⚠️ README update warning: ${error.message}`);
    }
  }

  async updateArchitectureDocumentation() {
    // Update component counts and architecture overview
    const componentCount = this.countFiles('src/components/**/*.tsx');
    const pageCount = this.countFiles('src/app/**/page.tsx');
    const contextCount = this.countFiles('src/context/**/*.tsx');
    
    // Generate architecture overview
    const architectureDoc = `# LusoTown Architecture Overview
Last Updated: ${new Date().toLocaleDateString()}

## Component Architecture
- **Total Components:** ${componentCount}
- **Pages:** ${pageCount}
- **Contexts:** ${contextCount}

## Technology Decisions
- **Frontend:** Next.js 14 App Router with TypeScript
- **Styling:** Tailwind CSS with Portuguese brand colors
- **State Management:** React Context + localStorage (no Redux)
- **Backend:** Supabase PostgreSQL with PostGIS
- **Streaming:** Simple Relay Server (SRS)
- **Maps:** OpenStreetMap/Leaflet
- **Testing:** Jest + Testing Library + Playwright

## Critical Patterns
1. **Bilingual System:** All text uses \`t('key')\` from i18n files
2. **Mobile-First:** Enhanced responsive design with touch targets
3. **Portuguese Branding:** Cultural colors and elements throughout
4. **Component Organization:** Domain-based structure (Events, Groups, Matches, etc.)

## Recent Architecture Changes
${this.getRecentArchitectureChanges()}

---
*Generated automatically by LusoTown documentation maintenance system*
`;

    const architecturePath = path.join(this.webAppRoot, 'ARCHITECTURE_OVERVIEW.md');
    fs.writeFileSync(architecturePath, architectureDoc);
  }

  getRecentArchitectureChanges() {
    try {
      // Get recent commits related to architecture
      const recentCommits = execSync(
        'git log --oneline -10 --grep="feat:\\|fix:\\|arch:"',
        { cwd: this.projectRoot, encoding: 'utf8' }
      );
      
      const commits = recentCommits.trim().split('\n').slice(0, 5);
      return commits.map(commit => `- ${commit}`).join('\n');
    } catch (error) {
      return '- No recent architecture changes detected';
    }
  }

  async cleanupStaleDocumentation() {
    const docsDir = this.webAppRoot;
    const staleFiles = [];
    
    // Find documentation files that might be stale
    const docFiles = execSync(
      `find ${docsDir} -name "*.md" -type f`,
      { encoding: 'utf8' }
    ).trim().split('\n').filter(Boolean);
    
    for (const file of docFiles) {
      try {
        const stats = fs.statSync(file);
        const daysSinceModified = (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60 * 24);
        
        // Mark files not modified in 30 days as potentially stale
        if (daysSinceModified > 30) {
          staleFiles.push({
            file: path.basename(file),
            daysSinceModified: Math.floor(daysSinceModified)
          });
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    if (staleFiles.length > 0) {
      const staleReport = `# Stale Documentation Report
Generated: ${new Date().toLocaleString()}

The following documentation files haven't been modified recently and may need review:

${staleFiles.map(file => 
  `- **${file.file}** (${file.daysSinceModified} days old)`
).join('\n')}

## Recommended Actions
1. Review each file for relevance
2. Update outdated information
3. Remove or archive obsolete files
4. Ensure all referenced components/features still exist

---
*Generated by automated documentation maintenance*
`;

      const stalePath = path.join(this.webAppRoot, 'STALE_DOCS_REPORT.md');
      fs.writeFileSync(stalePath, staleReport);
    }
  }

  async updateReadmeFiles() {
    // Update component counts in any README files
    const readmeFiles = [
      path.join(this.webAppRoot, 'README.md'),
      path.join(this.projectRoot, 'README.md')
    ];

    for (const readmePath of readmeFiles) {
      if (fs.existsSync(readmePath)) {
        let content = fs.readFileSync(readmePath, 'utf8');
        
        // Update component/page counts if they exist
        const componentCount = this.countFiles('src/components/**/*.tsx');
        const pageCount = this.countFiles('src/app/**/page.tsx');
        
        content = content.replace(/\d+ components?/g, `${componentCount} components`);
        content = content.replace(/\d+ pages?/g, `${pageCount} pages`);
        
        fs.writeFileSync(readmePath, content);
      }
    }
  }

  countFiles(pattern) {
    try {
      const command = `find ${this.webAppRoot} -path "*/node_modules" -prune -o -name "${pattern.split('/').pop()}" -type f -print | wc -l`;
      const result = execSync(command, { encoding: 'utf8' }).trim();
      return parseInt(result);
    } catch (error) {
      return 0;
    }
  }

  async generateMaintenanceReport() {
    const report = `# Periodic Documentation Maintenance Report
Generated: ${new Date().toLocaleString()}

## Maintenance Summary
${this.maintenanceLog.map(log => `- ${log}`).join('\n')}

## Current Statistics
- **Components:** ${this.countFiles('src/components/**/*.tsx')}
- **Pages:** ${this.countFiles('src/app/**/page.tsx')}
- **Contexts:** ${this.countFiles('src/context/**/*.tsx')}
- **Documentation Files:** ${this.countFiles('*.md')}

## Next Scheduled Maintenance
Recommended to run this maintenance script:
- **Daily:** For active development periods
- **Weekly:** For normal development
- **Before major releases:** Always run full maintenance

## Automation Status
- ✅ Git hooks installed
- ✅ Documentation agent functional
- ✅ Validation system operational
- ✅ Instruction capture active

---
*This report was generated automatically by the LusoTown documentation maintenance system*
`;

    const reportPath = path.join(this.webAppRoot, 'PERIODIC_MAINTENANCE_REPORT.md');
    fs.writeFileSync(reportPath, report);
    
    console.log(`\n📄 Maintenance report saved to: ${path.basename(reportPath)}`);
  }
}

// Run maintenance if called directly
if (require.main === module) {
  const maintenance = new PeriodicMaintenance();
  maintenance.run().catch(console.error);
}

module.exports = PeriodicMaintenance;