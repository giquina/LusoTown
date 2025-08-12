#!/usr/bin/env node

/**
 * /project-health Slash Command Implementation
 * 
 * Outputs comprehensive project health metrics:
 * - Count of remaining tasks in todo.md
 * - Number of commits made  
 * - Files changed today
 * - Unresolved bugs in errors/debug.log
 * - Claude-generated summary of current repo state
 * 
 * Usage: node scripts/project-health.js
 * Or via Claude slash command: /project-health
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ProjectHealthMonitor {
  constructor(projectRoot = '/workspaces/AdyaTribe') {
    this.projectRoot = projectRoot;
    this.healthData = {};
    this.currentDate = new Date().toISOString().split('T')[0];
  }

  /**
   * Main health check execution
   */
  async run() {
    console.log('🏥 AdyaTribe Project Health Check');
    console.log('='.repeat(50));
    console.log(`📅 Date: ${this.currentDate}\n`);

    try {
      // Collect all health metrics
      await this.checkTasks();
      await this.checkCommits();
      await this.checkFilesChanged();
      await this.checkBugs();
      await this.checkProjectStructure();
      await this.generateSummary();

      // Output formatted report
      this.printHealthReport();

    } catch (error) {
      console.error('❌ Error during health check:', error.message);
      process.exit(1);
    }
  }

  /**
   * Check remaining tasks in todo.md
   */
  async checkTasks() {
    const todoPath = path.join(this.projectRoot, 'tasks/todo.md');
    
    if (!fs.existsSync(todoPath)) {
      this.healthData.tasks = { error: 'todo.md not found' };
      return;
    }

    try {
      const content = fs.readFileSync(todoPath, 'utf8');
      
      // Count different task types
      const pendingTasks = content.match(/- \[ \]/g) || [];
      const completedTasks = content.match(/- \[x\]|✅/g) || [];
      const inProgressTasks = content.match(/- \[~\]|🔄/g) || [];

      // Extract current tasks section
      const currentTasksSection = content.match(/## 🔄 \*\*Current Tasks[^#]*?(?=##|$)/s);
      const currentTasks = currentTasksSection ? 
        (currentTasksSection[0].match(/- \[ \].*$/gm) || []).length : 0;

      this.healthData.tasks = {
        total_pending: pendingTasks.length,
        total_completed: completedTasks.length,
        in_progress: inProgressTasks.length,
        current_session: currentTasks,
        completion_rate: completedTasks.length / (pendingTasks.length + completedTasks.length) * 100 || 0
      };

    } catch (error) {
      this.healthData.tasks = { error: error.message };
    }
  }

  /**
   * Check git commit history
   */
  async checkCommits() {
    try {
      // Total commits
      const totalCommits = execSync('git rev-list --all --count', {
        cwd: this.projectRoot,
        encoding: 'utf8'
      }).trim();

      // Commits today
      const commitsToday = execSync(`git log --since="midnight" --oneline`, {
        cwd: this.projectRoot,
        encoding: 'utf8'
      }).split('\n').filter(line => line.trim()).length;

      // Commits this week
      const commitsThisWeek = execSync(`git log --since="1 week ago" --oneline`, {
        cwd: this.projectRoot,
        encoding: 'utf8'
      }).split('\n').filter(line => line.trim()).length;

      // Last commit info
      const lastCommit = execSync('git log -1 --pretty=format:"%h %s (%cr)"', {
        cwd: this.projectRoot,
        encoding: 'utf8'
      }).trim();

      this.healthData.commits = {
        total: parseInt(totalCommits),
        today: commitsToday,
        this_week: commitsThisWeek,
        last_commit: lastCommit
      };

    } catch (error) {
      this.healthData.commits = { error: error.message };
    }
  }

  /**
   * Check files changed today and recently
   */
  async checkFilesChanged() {
    try {
      // Files in working directory (staged/unstaged)
      const workingFiles = execSync('git status --porcelain', {
        cwd: this.projectRoot,
        encoding: 'utf8'
      });

      const changedFiles = workingFiles
        .split('\n')
        .filter(line => line.trim())
        .map(line => ({
          status: line.substring(0, 2).trim(),
          file: line.substring(3)
        }));

      // Files modified today (committed)
      const modifiedToday = execSync(`git log --since="midnight" --name-only --pretty=format: | sort -u`, {
        cwd: this.projectRoot,
        encoding: 'utf8'
      }).split('\n').filter(line => line.trim()).length;

      // File type breakdown
      const fileTypes = {
        code: changedFiles.filter(f => /\.(js|jsx|ts|tsx)$/.test(f.file)).length,
        docs: changedFiles.filter(f => /\.(md|txt)$/.test(f.file)).length,
        config: changedFiles.filter(f => /\.(json|yml|yaml)$/.test(f.file)).length,
        agents: changedFiles.filter(f => f.file.includes('.claude/agents')).length
      };

      this.healthData.files = {
        currently_changed: changedFiles.length,
        modified_today: modifiedToday,
        breakdown: fileTypes,
        changed_files: changedFiles.slice(0, 10) // Top 10 for brevity
      };

    } catch (error) {
      this.healthData.files = { error: error.message };
    }
  }

  /**
   * Check for unresolved bugs in errors/debug.log
   */
  async checkBugs() {
    const debugPath = path.join(this.projectRoot, 'errors/debug.log');

    if (!fs.existsSync(debugPath)) {
      this.healthData.bugs = { total: 0, status: 'No debug log found' };
      return;
    }

    try {
      const content = fs.readFileSync(debugPath, 'utf8');
      
      // Count different bug levels
      const criticalBugs = content.match(/\[CRITICAL\]/g) || [];
      const errorBugs = content.match(/\[ERROR\]/g) || [];
      const warningBugs = content.match(/\[WARNING\]/g) || [];
      const resolvedBugs = content.match(/\[RESOLVED\]/g) || [];

      // Extract current issues
      const currentIssuesSection = content.match(/## Current Issues\n(.*?)## /s);
      const hasActiveIssues = currentIssuesSection && 
        !currentIssuesSection[1].includes('No active bugs');

      this.healthData.bugs = {
        critical: criticalBugs.length,
        errors: errorBugs.length,
        warnings: warningBugs.length,
        resolved: resolvedBugs.length,
        active_issues: hasActiveIssues,
        status: hasActiveIssues ? 'Issues detected' : 'Clean ✅'
      };

    } catch (error) {
      this.healthData.bugs = { error: error.message };
    }
  }

  /**
   * Check overall project structure health
   */
  async checkProjectStructure() {
    try {
      // Count key components
      const agentsCount = this.countFiles('.claude/agents', '.md');
      const onboardingSteps = this.countFiles('mobile-app/src/screens/onboarding', 'Step.js');
      const scriptsCount = this.countFiles('scripts', '.js');
      
      // Check for key files
      const keyFiles = [
        'CLAUDE.md',
        'tasks/todo.md',
        'mobile-app/package.json',
        'mobile-app/App.js',
        'claude/context.json'
      ];

      const missingFiles = keyFiles.filter(file => 
        !fs.existsSync(path.join(this.projectRoot, file))
      );

      // Check documentation freshness
      const claudeStats = fs.statSync(path.join(this.projectRoot, 'CLAUDE.md'));
      const todoStats = fs.statSync(path.join(this.projectRoot, 'tasks/todo.md'));
      const hoursSinceUpdate = (Date.now() - Math.max(claudeStats.mtime, todoStats.mtime)) / (1000 * 60 * 60);

      this.healthData.structure = {
        agents: agentsCount,
        onboarding_steps: onboardingSteps,
        scripts: scriptsCount,
        missing_files: missingFiles,
        documentation_freshness: hoursSinceUpdate < 24 ? 'Fresh' : 'Stale',
        last_doc_update: Math.round(hoursSinceUpdate * 10) / 10 + ' hours ago'
      };

    } catch (error) {
      this.healthData.structure = { error: error.message };
    }
  }

  /**
   * Generate Claude summary of current repo state
   */
  async generateSummary() {
    const completedTasks = this.healthData.tasks?.total_completed || 0;
    const pendingTasks = this.healthData.tasks?.total_pending || 0;
    const totalCommits = this.healthData.commits?.total || 0;
    const agentCount = this.healthData.structure?.agents || 0;
    const onboardingSteps = this.healthData.structure?.onboarding_steps || 0;

    // Generate contextual summary
    let healthStatus = '🟢 Healthy';
    let summary = '';

    if (this.healthData.bugs?.active_issues) {
      healthStatus = '🟡 Caution - Active Issues';
    }

    if (pendingTasks > 10) {
      healthStatus = '🟡 Caution - Many Pending Tasks';
    }

    // Context-aware summary based on project state
    if (onboardingSteps >= 3 && agentCount >= 6) {
      summary = `AdyaTribe is in excellent shape! Foundation phase complete with ${onboardingSteps}/7 onboarding steps implemented, ${agentCount} Claude agents operational, and comprehensive automation in place. The project shows strong development momentum with ${totalCommits} commits and active progress on ${pendingTasks} pending tasks.`;
    } else if (onboardingSteps >= 2) {
      summary = `AdyaTribe is progressing well with ${onboardingSteps} onboarding steps completed and solid foundation established. Development is on track with active automation and good commit history.`;
    } else {
      summary = `AdyaTribe is in early development phase. Basic structure established with ${agentCount} agents and ${totalCommits} commits, ready for core feature development.`;
    }

    // Add specific insights
    if (this.healthData.commits?.today > 0) {
      summary += ` Recent activity shows ${this.healthData.commits.today} commits today, indicating active development.`;
    }

    if (this.healthData.files?.currently_changed > 5) {
      summary += ` Currently ${this.healthData.files.currently_changed} files are pending commit, suggesting a development session in progress.`;
    }

    this.healthData.summary = {
      overall_status: healthStatus,
      description: summary,
      recommendations: this.generateRecommendations()
    };
  }

  /**
   * Generate actionable recommendations
   */
  generateRecommendations() {
    const recommendations = [];

    if (this.healthData.tasks?.current_session > 3) {
      recommendations.push('Consider breaking down large tasks into smaller, manageable pieces');
    }

    if (this.healthData.files?.currently_changed > 10) {
      recommendations.push('Many files pending - consider committing completed work');
    }

    if (this.healthData.bugs?.active_issues) {
      recommendations.push('Address active issues in errors/debug.log before adding new features');
    }

    if (this.healthData.commits?.today === 0 && this.healthData.files?.currently_changed > 0) {
      recommendations.push('Consider committing current progress to maintain development momentum');
    }

    if (this.healthData.structure?.documentation_freshness === 'Stale') {
      recommendations.push('Run /update-docs to refresh documentation with recent changes');
    }

    if (recommendations.length === 0) {
      recommendations.push('Project is healthy! Ready for continued development.');
    }

    return recommendations;
  }

  /**
   * Utility function to count files
   */
  countFiles(directory, extension) {
    const dirPath = path.join(this.projectRoot, directory);
    
    if (!fs.existsSync(dirPath)) {
      return 0;
    }

    try {
      return fs.readdirSync(dirPath)
        .filter(file => file.includes(extension))
        .length;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Print formatted health report
   */
  printHealthReport() {
    console.log('📊 PROJECT METRICS');
    console.log('-'.repeat(30));
    
    // Tasks
    if (this.healthData.tasks?.error) {
      console.log(`❌ Tasks: Error - ${this.healthData.tasks.error}`);
    } else {
      const tasks = this.healthData.tasks;
      console.log(`📋 Tasks: ${tasks.total_pending} pending, ${tasks.total_completed} completed (${tasks.completion_rate.toFixed(1)}% done)`);
      console.log(`   Current session: ${tasks.current_session} active tasks`);
    }

    // Commits
    if (this.healthData.commits?.error) {
      console.log(`❌ Commits: Error - ${this.healthData.commits.error}`);
    } else {
      const commits = this.healthData.commits;
      console.log(`🔄 Commits: ${commits.total} total, ${commits.today} today, ${commits.this_week} this week`);
      console.log(`   Last: ${commits.last_commit}`);
    }

    // Files
    if (this.healthData.files?.error) {
      console.log(`❌ Files: Error - ${this.healthData.files.error}`);
    } else {
      const files = this.healthData.files;
      console.log(`📁 Files: ${files.currently_changed} pending changes, ${files.modified_today} modified today`);
      console.log(`   Types: ${files.breakdown.code} code, ${files.breakdown.docs} docs, ${files.breakdown.agents} agents`);
    }

    // Bugs
    if (this.healthData.bugs?.error) {
      console.log(`❌ Bugs: Error - ${this.healthData.bugs.error}`);
    } else {
      const bugs = this.healthData.bugs;
      console.log(`🐛 Issues: ${bugs.critical} critical, ${bugs.errors} errors, ${bugs.warnings} warnings`);
      console.log(`   Status: ${bugs.status} (${bugs.resolved} resolved)`);
    }

    // Structure
    if (this.healthData.structure?.error) {
      console.log(`❌ Structure: Error - ${this.healthData.structure.error}`);
    } else {
      const structure = this.healthData.structure;
      console.log(`🏗️  Structure: ${structure.agents} agents, ${structure.onboarding_steps}/7 onboarding steps, ${structure.scripts} scripts`);
      console.log(`   Documentation: ${structure.documentation_freshness} (${structure.last_doc_update})`);
      
      if (structure.missing_files.length > 0) {
        console.log(`   ⚠️  Missing files: ${structure.missing_files.join(', ')}`);
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('🎯 PROJECT HEALTH SUMMARY');
    console.log('-'.repeat(30));
    console.log(`Status: ${this.healthData.summary.overall_status}`);
    console.log(`\n${this.healthData.summary.description}\n`);

    console.log('💡 RECOMMENDATIONS:');
    this.healthData.summary.recommendations.forEach((rec, i) => {
      console.log(`   ${i + 1}. ${rec}`);
    });

    console.log('\n' + '='.repeat(50));
    console.log(`✅ Health check completed at ${new Date().toLocaleTimeString()}`);
  }
}

// CLI execution
if (require.main === module) {
  const monitor = new ProjectHealthMonitor();
  monitor.run().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = ProjectHealthMonitor;