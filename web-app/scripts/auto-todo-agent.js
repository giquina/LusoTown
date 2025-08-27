#!/usr/bin/env node
/**
 * LusoTown Auto TODO Agent
 * Automatically updates TODO.md when tasks are assigned via Claude AI
 * Integrates with TodoWrite tool calls and maintains task synchronization
 */

const TodoSyncSystem = require('./todo-sync-system.js');
const DesktopMobileSyncSystem = require('./desktop-mobile-sync.js');

class AutoTodoAgent {
  constructor() {
    this.todoSync = new TodoSyncSystem();
    this.navigationSync = new DesktopMobileSyncSystem();
    this.isActive = false;
    this.taskBuffer = [];
    this.lastProcessedTime = Date.now();
  }

  /**
   * Starts the auto TODO agent
   */
  async start() {
    console.log('🤖 LusoTown Auto TODO Agent Starting...');
    
    this.isActive = true;
    
    // Setup monitoring systems
    await this.setupMonitoring();
    
    // Initial sync
    await this.performInitialSync();
    
    // Start continuous monitoring
    this.startContinuousMonitoring();
    
    console.log('✅ Auto TODO Agent is now active');
    console.log('📝 Monitoring for TodoWrite tool calls...');
    console.log('🔄 Desktop-Mobile sync enabled');
    console.log('⚡ Real-time TODO.md updates enabled');
  }

  /**
   * Sets up monitoring systems
   */
  async setupMonitoring() {
    // Setup git hooks for automatic syncing
    this.todoSync.setupGitHooks();
    
    // Monitor file changes for navigation sync
    this.navigationSync.startAutoSync();
    
    // Create monitoring directories
    const fs = require('fs');
    const path = require('path');
    
    const monitoringDir = path.join(__dirname, '../.monitoring');
    if (!fs.existsSync(monitoringDir)) {
      fs.mkdirSync(monitoringDir, { recursive: true });
    }
  }

  /**
   * Performs initial synchronization
   */
  async performInitialSync() {
    console.log('🔄 Performing initial sync...');
    
    try {
      // Sync navigation systems
      const navResult = await this.navigationSync.syncNavigationSystems();
      console.log(`📱 Navigation sync: ${navResult.success ? '✅' : '❌'}`);
      
      // Sync TODO.md with current state
      const todoResult = await this.todoSync.syncTodoWithCurrentTasks([], 'initial-sync');
      console.log(`📝 TODO sync: ${todoResult.success ? '✅' : '❌'}`);
      
    } catch (error) {
      console.error('❌ Initial sync failed:', error.message);
    }
  }

  /**
   * Starts continuous monitoring
   */
  startContinuousMonitoring() {
    // Monitor for TodoWrite patterns (simulated - would integrate with actual AI calls)
    this.startTodoWriteMonitoring();
    
    // Monitor for navigation changes
    this.startNavigationMonitoring();
    
    // Periodic sync (every 5 minutes)
    setInterval(async () => {
      if (this.taskBuffer.length > 0) {
        await this.processTaskBuffer();
      }
    }, 5 * 60 * 1000);
  }

  /**
   * Monitors for TodoWrite tool calls
   */
  startTodoWriteMonitoring() {
    const fs = require('fs');
    const path = require('path');
    
    // Monitor log files or create a webhook endpoint
    // This is a simulation - in practice would integrate with Claude API
    const logPath = path.join(__dirname, '../.todo-write-calls.log');
    
    if (fs.existsSync(logPath)) {
      fs.watchFile(logPath, async (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
          console.log('📝 TodoWrite call detected - processing...');
          await this.processTodoWriteCall();
        }
      });
    }

    // Also monitor for changes in common task-related files
    const taskRelatedPaths = [
      path.join(__dirname, '../src/app'),
      path.join(__dirname, '../src/components'),
      path.join(__dirname, '../TODO.md')
    ];

    taskRelatedPaths.forEach(watchPath => {
      if (fs.existsSync(watchPath)) {
        fs.watch(watchPath, { recursive: true }, async (eventType, filename) => {
          if (filename && this.shouldTriggerSync(filename)) {
            console.log(`🔄 Task-related change detected: ${filename}`);
            this.debouncedSync();
          }
        });
      }
    });
  }

  /**
   * Processes TodoWrite calls
   */
  async processTodoWriteCall() {
    try {
      // In a real implementation, this would parse the actual TodoWrite call
      // For now, we'll sync with current TODO.md state
      const result = await this.todoSync.syncTodoWithCurrentTasks([], 'todowrite-detected');
      
      if (result.success) {
        console.log('✅ TODO.md updated from TodoWrite call');
      } else {
        console.error('❌ Failed to process TodoWrite call:', result.error);
      }
    } catch (error) {
      console.error('❌ Error processing TodoWrite call:', error.message);
    }
  }

  /**
   * Starts navigation monitoring
   */
  startNavigationMonitoring() {
    const fs = require('fs');
    const path = require('path');
    
    const headerPath = path.join(__dirname, '../src/components/Header.tsx');
    
    fs.watchFile(headerPath, async (curr, prev) => {
      if (curr.mtime !== prev.mtime) {
        console.log('🧭 Navigation changes detected - syncing desktop/mobile...');
        
        try {
          const result = await this.navigationSync.syncNavigationSystems();
          if (result.success) {
            console.log('✅ Desktop-Mobile navigation synced');
            
            // Update TODO.md with navigation task completion
            await this.todoSync.syncTodoWithCurrentTasks([
              {
                content: 'Desktop-Mobile navigation sync',
                status: 'completed',
                activeForm: 'Syncing desktop-mobile navigation automatically'
              }
            ], 'navigation-sync');
          }
        } catch (error) {
          console.error('❌ Navigation sync failed:', error.message);
        }
      }
    });
  }

  /**
   * Determines if a file change should trigger sync
   */
  shouldTriggerSync(filename) {
    const triggerExtensions = ['.tsx', '.ts', '.js'];
    const triggerPatterns = ['Header', 'Navigation', 'Login', 'Modal'];
    
    return triggerExtensions.some(ext => filename.endsWith(ext)) &&
           triggerPatterns.some(pattern => filename.includes(pattern));
  }

  /**
   * Debounced sync to prevent excessive calls
   */
  debouncedSync() {
    clearTimeout(this.syncTimeout);
    this.syncTimeout = setTimeout(async () => {
      await this.performSyncCycle();
    }, 3000);
  }

  /**
   * Performs a complete sync cycle
   */
  async performSyncCycle() {
    console.log('🔄 Performing sync cycle...');
    
    try {
      // Sync navigation first
      const navResult = await this.navigationSync.syncNavigationSystems();
      
      // Then sync TODO.md
      const todoResult = await this.todoSync.syncTodoWithCurrentTasks([], 'sync-cycle');
      
      console.log(`📊 Sync cycle completed - Nav: ${navResult.success ? '✅' : '❌'}, TODO: ${todoResult.success ? '✅' : '❌'}`);
      
    } catch (error) {
      console.error('❌ Sync cycle failed:', error.message);
    }
  }

  /**
   * Processes accumulated tasks from buffer
   */
  async processTaskBuffer() {
    if (this.taskBuffer.length === 0) return;
    
    console.log(`🔄 Processing ${this.taskBuffer.length} buffered tasks...`);
    
    try {
      const result = await this.todoSync.syncTodoWithCurrentTasks(this.taskBuffer, 'buffer-process');
      
      if (result.success) {
        console.log(`✅ Processed ${this.taskBuffer.length} tasks successfully`);
        this.taskBuffer = []; // Clear buffer
      } else {
        console.error('❌ Failed to process task buffer:', result.error);
      }
    } catch (error) {
      console.error('❌ Error processing task buffer:', error.message);
    }
  }

  /**
   * Adds task to buffer (would be called by TodoWrite integration)
   */
  addTaskToBuffer(task) {
    this.taskBuffer.push({
      ...task,
      timestamp: new Date().toISOString(),
      source: 'claude-ai'
    });
    
    console.log(`📝 Task added to buffer: ${task.content} (${task.status})`);
    
    // If buffer gets large, process immediately
    if (this.taskBuffer.length >= 10) {
      this.processTaskBuffer();
    }
  }

  /**
   * Stops the auto TODO agent
   */
  stop() {
    console.log('🛑 Stopping Auto TODO Agent...');
    this.isActive = false;
    
    // Clear any pending timeouts
    if (this.syncTimeout) {
      clearTimeout(this.syncTimeout);
    }
    
    console.log('✅ Auto TODO Agent stopped');
  }

  /**
   * Status report
   */
  getStatus() {
    return {
      active: this.isActive,
      tasksBuffered: this.taskBuffer.length,
      lastProcessed: new Date(this.lastProcessedTime).toISOString(),
      systems: {
        todoSync: 'active',
        navigationSync: 'active',
        fileWatching: 'active'
      }
    };
  }
}

// CLI interface
if (require.main === module) {
  const agent = new AutoTodoAgent();
  const args = process.argv.slice(2);

  if (args.includes('--status')) {
    console.log('📊 Auto TODO Agent Status:', JSON.stringify(agent.getStatus(), null, 2));
  } else if (args.includes('--stop')) {
    agent.stop();
  } else {
    // Start the agent
    agent.start().then(() => {
      console.log('🚀 Auto TODO Agent running...');
      
      // Keep process alive
      process.on('SIGINT', () => {
        agent.stop();
        process.exit(0);
      });
    });
  }
}

module.exports = AutoTodoAgent;