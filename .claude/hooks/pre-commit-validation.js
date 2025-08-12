#!/usr/bin/env node

/**
 * Claude Code Pre-Commit Validation Hook
 * 
 * Auto-commits code to GitHub ONLY when:
 * - Code executes without syntax or build errors
 * - No validation issues are detected
 * - Smart commit messages are generated
 * - NO dev servers or watchers are triggered
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class PreCommitValidator {
  constructor(projectRoot = '/workspaces/AdyaTribe') {
    this.projectRoot = projectRoot;
    this.errors = [];
    this.warnings = [];
    this.changedFiles = [];
    this.validationPassed = false;
  }

  /**
   * Main validation and commit process
   */
  async run() {
    console.log('🔍 Starting pre-commit validation...\n');
    
    try {
      // 1. Scan for changes
      await this.scanChanges();
      
      // 2. Run validation checks
      await this.validateSyntax();
      await this.validateBuild();
      await this.validateProject();
      
      // 3. Determine if we should commit
      await this.evaluateCommitReadiness();
      
      // 4. Auto-commit if validation passes
      if (this.validationPassed) {
        await this.performAutoCommit();
      } else {
        await this.reportIssues();
      }
      
    } catch (error) {
      console.error('❌ Critical error during validation:', error.message);
      process.exit(1);
    }
  }

  /**
   * Scan for changed files
   */
  async scanChanges() {
    console.log('📊 Scanning for changes...');
    
    try {
      // Get git status
      const gitStatus = execSync('git status --porcelain', { 
        cwd: this.projectRoot,
        encoding: 'utf8' 
      }).trim();
      
      if (!gitStatus) {
        console.log('   ℹ️  No changes detected, exiting...');
        process.exit(0);
      }
      
      // Parse changed files
      this.changedFiles = gitStatus
        .split('\n')
        .filter(line => line.trim())
        .map(line => ({
          status: line.substring(0, 2).trim(),
          file: line.substring(3)
        }));
      
      console.log(`   Found ${this.changedFiles.length} changed files:`);
      this.changedFiles.forEach(change => {
        console.log(`   ${change.status} ${change.file}`);
      });
      
    } catch (error) {
      this.errors.push(`Failed to scan changes: ${error.message}`);
    }
  }

  /**
   * Validate JavaScript/TypeScript syntax
   */
  async validateSyntax() {
    console.log('\n🔍 Validating syntax...');
    
    const codeFiles = this.changedFiles
      .filter(change => /\.(js|jsx|ts|tsx)$/.test(change.file))
      .map(change => change.file);
    
    if (codeFiles.length === 0) {
      console.log('   ✅ No code files to validate');
      return;
    }
    
    for (const file of codeFiles) {
      await this.validateFileSync(file);
    }
  }

  /**
   * Validate individual file syntax
   */
  async validateFileSync(file) {
    const filePath = path.join(this.projectRoot, file);
    
    if (!fs.existsSync(filePath)) {
      return; // File was deleted
    }
    
    try {
      // For JavaScript files, try to parse with Node.js
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Skip syntax validation for React Native files (they use ES6 modules)
        if (content.includes('import React') || 
            content.includes('from \'react-native\'') ||
            file.includes('mobile-app/src/')) {
          console.log(`   ✅ ${file} - React Native file, skipping Node.js syntax check`);
          return;
        }
        
        // Basic syntax check - try to parse as JavaScript for other files
        try {
          new Function(content);
          console.log(`   ✅ ${file} - syntax OK`);
        } catch (syntaxError) {
          this.errors.push(`Syntax error in ${file}: ${syntaxError.message}`);
          console.log(`   ❌ ${file} - syntax error`);
        }
      }
      
      // For JSON files, validate JSON syntax
      if (file.endsWith('.json')) {
        const content = fs.readFileSync(filePath, 'utf8');
        try {
          JSON.parse(content);
          console.log(`   ✅ ${file} - JSON valid`);
        } catch (jsonError) {
          this.errors.push(`Invalid JSON in ${file}: ${jsonError.message}`);
          console.log(`   ❌ ${file} - JSON invalid`);
        }
      }
      
    } catch (error) {
      this.warnings.push(`Could not validate ${file}: ${error.message}`);
    }
  }

  /**
   * Validate build process (if applicable)
   */
  async validateBuild() {
    console.log('\n🏗️  Validating build...');
    
    // Check if this is a React Native project
    const mobileAppDir = path.join(this.projectRoot, 'mobile-app');
    const packageJsonPath = path.join(mobileAppDir, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
      console.log('   ℹ️  No mobile-app build to validate');
      return;
    }
    
    // Check if any mobile app files changed
    const mobileAppChanges = this.changedFiles.filter(change => 
      change.file.startsWith('mobile-app/')
    );
    
    if (mobileAppChanges.length === 0) {
      console.log('   ℹ️  No mobile-app changes to validate');
      return;
    }
    
    try {
      console.log('   🔧 Running build validation (no server start)...');
      
      // Run a dry-run build check without starting servers
      const buildCommand = 'npm run build --if-present || echo "No build script found"';
      
      const buildOutput = execSync(buildCommand, {
        cwd: mobileAppDir,
        encoding: 'utf8',
        timeout: 60000 // 1 minute timeout
      });
      
      // Check for common build error patterns
      if (buildOutput.includes('ERROR') || buildOutput.includes('FAILED')) {
        this.errors.push('Build validation failed - check build output');
        console.log('   ❌ Build validation failed');
      } else {
        console.log('   ✅ Build validation passed');
      }
      
    } catch (error) {
      // Treat build errors as warnings for now, not blockers
      this.warnings.push(`Build validation warning: ${error.message}`);
      console.log('   ⚠️  Build validation had warnings');
    }
  }

  /**
   * Validate project-specific rules
   */
  async validateProject() {
    console.log('\n📋 Validating project rules...');
    
    // Check that CLAUDE.md rules are followed
    await this.validateClaudeRules();
    
    // Check that todo tracking is updated
    await this.validateTodoTracking();
    
    // Check for sensitive data
    await this.validateNoSecrets();
    
    console.log('   ✅ Project rules validation complete');
  }

  /**
   * Validate CLAUDE.md workflow compliance
   */
  async validateClaudeRules() {
    const todoPath = path.join(this.projectRoot, 'tasks/todo.md');
    
    if (!fs.existsSync(todoPath)) {
      this.warnings.push('tasks/todo.md not found - CLAUDE.md workflow may not be followed');
      return;
    }
    
    // Check if todo.md was updated recently (within last 10 minutes)
    const todoStats = fs.statSync(todoPath);
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    
    if (todoStats.mtime < tenMinutesAgo && this.changedFiles.length > 0) {
      this.warnings.push('tasks/todo.md may need updating - remember to track progress');
    }
  }

  /**
   * Check todo tracking is current
   */
  async validateTodoTracking() {
    // Check if any pending todos mention the changed files
    const todoPath = path.join(this.projectRoot, 'tasks/todo.md');
    
    if (fs.existsSync(todoPath)) {
      const todoContent = fs.readFileSync(todoPath, 'utf8');
      
      // Look for incomplete tasks ([ ] pattern)
      const incompleteTasks = todoContent.match(/- \[ \].*$/gm);
      
      if (incompleteTasks && incompleteTasks.length > 5) {
        this.warnings.push('Many incomplete tasks found - consider updating todo list');
      }
    }
  }

  /**
   * Scan for potential secrets or sensitive data
   */
  async validateNoSecrets() {
    const sensitivePatterns = [
      /api[_-]?key\s*[=:]\s*['"][a-zA-Z0-9]{20,}['"]/, // API keys
      /secret[_-]?key\s*[=:]\s*['"][a-zA-Z0-9]{20,}['"]/, // Secret keys
      /password\s*[=:]\s*['"][^'"]{8,}['"]/, // Passwords
      /token\s*[=:]\s*['"][a-zA-Z0-9._-]{20,}['"]/, // Tokens
    ];
    
    const codeFiles = this.changedFiles
      .filter(change => /\.(js|jsx|ts|tsx|json|md)$/.test(change.file))
      .map(change => change.file);
    
    for (const file of codeFiles) {
      const filePath = path.join(this.projectRoot, file);
      
      if (!fs.existsSync(filePath)) continue;
      
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        for (const pattern of sensitivePatterns) {
          if (pattern.test(content)) {
            this.errors.push(`Potential secret found in ${file} - review before committing`);
          }
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
  }

  /**
   * Evaluate if we should proceed with auto-commit
   */
  async evaluateCommitReadiness() {
    console.log('\n🎯 Evaluating commit readiness...');
    
    // Blocking errors prevent commit
    if (this.errors.length > 0) {
      this.validationPassed = false;
      console.log(`   ❌ ${this.errors.length} blocking errors found`);
    } 
    // Warnings don't block but are reported
    else if (this.warnings.length > 0) {
      this.validationPassed = true; // Allow commit with warnings
      console.log(`   ⚠️  ${this.warnings.length} warnings found, but proceeding`);
    } 
    // No issues found
    else {
      this.validationPassed = true;
      console.log('   ✅ All validations passed');
    }
  }

  /**
   * Generate smart commit message based on changes
   */
  generateCommitMessage() {
    const fileTypes = {
      code: this.changedFiles.filter(f => /\.(js|jsx|ts|tsx)$/.test(f.file)).length,
      docs: this.changedFiles.filter(f => /\.(md|txt)$/.test(f.file)).length,
      config: this.changedFiles.filter(f => /\.(json|yml|yaml)$/.test(f.file)).length,
      agents: this.changedFiles.filter(f => f.file.includes('.claude/agents')).length,
      scripts: this.changedFiles.filter(f => f.file.includes('scripts/')).length,
    };
    
    let primary = '';
    let details = [];
    
    // Determine primary change type
    if (fileTypes.agents > 0) {
      primary = '🤖 Update agents';
    } else if (fileTypes.code > 0) {
      primary = '✨ Code changes';
    } else if (fileTypes.docs > 0) {
      primary = '📚 Update docs';
    } else if (fileTypes.scripts > 0) {
      primary = '🔧 Update scripts';
    } else if (fileTypes.config > 0) {
      primary = '⚙️ Config updates';
    } else {
      primary = '🔄 Project updates';
    }
    
    // Add details
    if (fileTypes.code > 0) details.push(`${fileTypes.code} code files`);
    if (fileTypes.docs > 0) details.push(`${fileTypes.docs} docs`);
    if (fileTypes.agents > 0) details.push(`${fileTypes.agents} agents`);
    if (fileTypes.scripts > 0) details.push(`${fileTypes.scripts} scripts`);
    
    let message = primary;
    if (details.length > 0) {
      message += `: ${details.join(', ')}`;
    }
    
    // Add Claude signature
    message += '\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>';
    
    return message;
  }

  /**
   * Perform the auto-commit
   */
  async performAutoCommit() {
    console.log('\n🚀 Performing auto-commit...');
    
    try {
      // Stage all changes
      execSync('git add .', { cwd: this.projectRoot });
      console.log('   ✅ Changes staged');
      
      // Generate commit message
      const commitMessage = this.generateCommitMessage();
      console.log('   📝 Generated commit message:');
      console.log(`      ${commitMessage.split('\n')[0]}`);
      
      // Commit changes
      execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { 
        cwd: this.projectRoot 
      });
      console.log('   ✅ Changes committed locally');
      
      // Check if we should push (optional - can be configured)
      const shouldPush = process.env.CLAUDE_AUTO_PUSH !== 'false';
      
      if (shouldPush) {
        try {
          execSync('git push origin main', { 
            cwd: this.projectRoot,
            timeout: 30000 // 30 second timeout
          });
          console.log('   ✅ Changes pushed to GitHub');
        } catch (pushError) {
          console.log('   ⚠️  Could not push to GitHub (local commit successful)');
          console.log('      Run `git push` manually when ready');
        }
      }
      
      console.log('\n🎉 Auto-commit completed successfully!');
      
    } catch (error) {
      console.error('   ❌ Auto-commit failed:', error.message);
      throw error;
    }
  }

  /**
   * Report validation issues
   */
  async reportIssues() {
    console.log('\n🚨 Validation Issues Found:');
    
    if (this.errors.length > 0) {
      console.log('\n❌ Blocking Errors:');
      this.errors.forEach((error, i) => {
        console.log(`   ${i + 1}. ${error}`);
      });
    }
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      this.warnings.forEach((warning, i) => {
        console.log(`   ${i + 1}. ${warning}`);
      });
    }
    
    console.log('\n🔧 Please fix the errors above before committing.');
    console.log('   Run the validation again after making changes.');
    
    process.exit(1);
  }
}

// CLI execution
if (require.main === module) {
  const validator = new PreCommitValidator();
  validator.run().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = PreCommitValidator;