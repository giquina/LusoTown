#!/usr/bin/env node
/**
 * LusoTown Automated TODO.md Sync System
 * Automatically updates TODO.md whenever new tasks are assigned
 * Integrates with git hooks and development workflow
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class TodoSyncSystem {
  constructor() {
    this.todoPath = path.join(__dirname, '../TODO.md');
    this.logPath = path.join(__dirname, '../.todo-sync.log');
    this.lastSyncFile = path.join(__dirname, '../.last-todo-sync');
    this.backupDir = path.join(__dirname, '../.todo-backups');
    
    // Ensure backup directory exists
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  /**
   * Main sync function - updates TODO.md with current task status
   */
  async syncTodoWithCurrentTasks(tasks = [], source = 'manual') {
    try {
      this.log(`🔄 TODO.md sync initiated from ${source}`);
      
      // Backup current TODO.md
      await this.createBackup();
      
      // Read current TODO.md
      const currentTodo = fs.readFileSync(this.todoPath, 'utf8');
      
      // Update status indicators
      const updatedTodo = this.updateTaskStatuses(currentTodo, tasks);
      
      // Add new tasks if provided
      const finalTodo = this.addNewTasks(updatedTodo, tasks);
      
      // Write updated TODO.md
      fs.writeFileSync(this.todoPath, finalTodo);
      
      // Update sync timestamp
      fs.writeFileSync(this.lastSyncFile, new Date().toISOString());
      
      this.log(`✅ TODO.md synced successfully - ${tasks.length} tasks processed`);
      
      return { success: true, tasksProcessed: tasks.length };
    } catch (error) {
      this.log(`❌ TODO.md sync failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  /**
   * Updates task status indicators in TODO.md
   */
  updateTaskStatuses(todoContent, tasks) {
    let updatedContent = todoContent;
    
    tasks.forEach(task => {
      const statusEmoji = this.getStatusEmoji(task.status);
      const taskPattern = new RegExp(`^(- \\[[ x]\\])\\s*(.*)${this.escapeRegex(task.content)}(.*)$`, 'gm');
      
      updatedContent = updatedContent.replace(taskPattern, (match, checkbox, prefix, suffix) => {
        const newCheckbox = task.status === 'completed' ? '[x]' : '[ ]';
        return `- ${newCheckbox} **${task.content}** ${statusEmoji}${suffix}`;
      });
    });
    
    return updatedContent;
  }

  /**
   * Adds new tasks to the appropriate section
   */
  addNewTasks(todoContent, tasks) {
    // Add timestamp and sync info
    const syncSection = this.generateSyncSection(tasks);
    
    // Find insertion point (after critical issues section)
    const insertPattern = /^(#### \*\*🔥 BLOCKING ISSUES \(Fix Today\)\*\*.*?)(\n#### )/gms;
    
    if (insertPattern.test(todoContent)) {
      return todoContent.replace(insertPattern, `$1\n\n${syncSection}$2`);
    } else {
      // If pattern not found, append to critical section
      return todoContent + '\n\n' + syncSection;
    }
  }

  /**
   * Generates sync section with current task status
   */
  generateSyncSection(tasks) {
    const now = new Date().toISOString();
    const inProgressTasks = tasks.filter(t => t.status === 'in_progress');
    const completedTasks = tasks.filter(t => t.status === 'completed');
    const pendingTasks = tasks.filter(t => t.status === 'pending');

    return `
#### **🔄 CURRENT DEVELOPMENT STATUS** (Auto-synced: ${now})
- **In Progress:** ${inProgressTasks.length} tasks ${this.getStatusEmoji('in_progress')}
- **Completed:** ${completedTasks.length} tasks ${this.getStatusEmoji('completed')}
- **Pending:** ${pendingTasks.length} tasks ${this.getStatusEmoji('pending')}

**Active Tasks:**
${inProgressTasks.map(task => `- [⏳] **${task.content}** (${task.activeForm})`).join('\n') || '- No active tasks'}

**Recently Completed:**
${completedTasks.slice(-3).map(task => `- [x] **${task.content}** ✅`).join('\n') || '- No recent completions'}`;
  }

  /**
   * Creates timestamped backup of TODO.md
   */
  async createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(this.backupDir, `TODO-${timestamp}.md`);
    
    if (fs.existsSync(this.todoPath)) {
      fs.copyFileSync(this.todoPath, backupPath);
      this.log(`📋 Backup created: ${backupPath}`);
    }
  }

  /**
   * Gets emoji for task status
   */
  getStatusEmoji(status) {
    const emojiMap = {
      'pending': '⏸️',
      'in_progress': '⏳',
      'completed': '✅'
    };
    return emojiMap[status] || '❓';
  }

  /**
   * Escapes regex special characters
   */
  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Logs sync activity
   */
  log(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    
    console.log(message);
    fs.appendFileSync(this.logPath, logEntry);
  }

  /**
   * Setup git hooks for automatic syncing
   */
  setupGitHooks() {
    const preCommitHook = `#!/bin/sh
# LusoTown TODO.md Auto-sync
node scripts/todo-sync-system.js --hook pre-commit
`;

    const postCommitHook = `#!/bin/sh
# LusoTown TODO.md Auto-sync
node scripts/todo-sync-system.js --hook post-commit
`;

    const hooksDir = path.join(__dirname, '../../.git/hooks');
    
    if (fs.existsSync(hooksDir)) {
      fs.writeFileSync(path.join(hooksDir, 'pre-commit'), preCommitHook);
      fs.writeFileSync(path.join(hooksDir, 'post-commit'), postCommitHook);
      
      // Make executable
      execSync('chmod +x .git/hooks/pre-commit .git/hooks/post-commit');
      
      this.log('🔗 Git hooks installed for automatic TODO.md syncing');
    }
  }

  /**
   * Watch mode - automatically sync when files change
   */
  startWatchMode() {
    this.log('👀 Starting TODO.md watch mode...');
    
    const watchPaths = [
      path.join(__dirname, '../src'),
      path.join(__dirname, '../scripts'),
    ];

    watchPaths.forEach(watchPath => {
      if (fs.existsSync(watchPath)) {
        fs.watch(watchPath, { recursive: true }, (eventType, filename) => {
          if (filename && (filename.endsWith('.tsx') || filename.endsWith('.ts'))) {
            this.log(`📝 File changed: ${filename} - triggering TODO.md sync`);
            // Debounce multiple rapid changes
            clearTimeout(this.syncTimeout);
            this.syncTimeout = setTimeout(() => {
              this.syncTodoWithCurrentTasks([], 'file-watch');
            }, 2000);
          }
        });
      }
    });
  }
}

// CLI interface
if (require.main === module) {
  const todoSync = new TodoSyncSystem();
  const args = process.argv.slice(2);

  if (args.includes('--setup-hooks')) {
    todoSync.setupGitHooks();
  } else if (args.includes('--watch')) {
    todoSync.startWatchMode();
  } else if (args.includes('--hook')) {
    const hookType = args[args.indexOf('--hook') + 1];
    todoSync.syncTodoWithCurrentTasks([], `git-${hookType}`);
  } else {
    // Manual sync
    todoSync.syncTodoWithCurrentTasks([], 'manual');
  }
}

module.exports = TodoSyncSystem;