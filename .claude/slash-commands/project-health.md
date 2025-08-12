# /project-health Slash Command

**Description:** Comprehensive project health monitoring that provides real-time metrics, progress tracking, and actionable insights for the AdyaTribe development workflow.

## What it monitors:

1. **Task Management**: Counts pending, completed, and in-progress tasks from `tasks/todo.md`
2. **Git Activity**: Tracks total commits, daily activity, and development momentum
3. **File Changes**: Monitors working directory changes and development activity
4. **Bug Tracking**: Scans `errors/debug.log` for unresolved issues and warnings
5. **Project Structure**: Validates key files, agents, and architectural components
6. **Claude Analysis**: Generates contextual summary and actionable recommendations

## Usage:

```bash
# Direct execution
node scripts/project-health.js

# Via Claude Code slash command
/project-health
```

## Sample Output:

```
🏥 AdyaTribe Project Health Check
==================================================
📅 Date: 2025-08-09

📊 PROJECT METRICS
------------------------------
📋 Tasks: 5 pending, 15 completed (75.0% done)
   Current session: 3 active tasks

🔄 Commits: 28 total, 2 today, 8 this week
   Last: a1b2c3d Complete automation system (2 hours ago)

📁 Files: 12 pending changes, 8 modified today
   Types: 4 code, 6 docs, 2 agents

🐛 Issues: 0 critical, 0 errors, 1 warnings
   Status: Clean ✅ (3 resolved)

🏗️  Structure: 6 agents, 3/7 onboarding steps, 3 scripts
   Documentation: Fresh (0.5 hours ago)

==================================================
🎯 PROJECT HEALTH SUMMARY
------------------------------
Status: 🟢 Healthy

AdyaTribe is in excellent shape! Foundation phase complete with 3/7 onboarding steps implemented, 6 Claude agents operational, and comprehensive automation in place. The project shows strong development momentum with 28 commits and active progress on 5 pending tasks. Recent activity shows 2 commits today, indicating active development.

💡 RECOMMENDATIONS:
   1. Continue with current development momentum
   2. Consider implementing remaining onboarding steps (4-7)
   3. Project is healthy! Ready for continued development.

==================================================
✅ Health check completed at 6:22:15 PM
```

## Health Status Indicators:

- **🟢 Healthy**: All systems operational, good progress
- **🟡 Caution**: Some issues or heavy task load detected
- **🔴 Warning**: Critical issues or stalled development

## Metrics Tracked:

### **Task Analysis:**
- Pending tasks count and current session active tasks
- Completion rate percentage
- Task distribution and progress momentum

### **Development Velocity:**
- Total commits and recent activity (today/week)
- Last commit information with timestamp
- Development consistency tracking

### **File Management:**
- Working directory changes (staged/unstaged)
- File type breakdown (code/docs/config/agents)
- Daily modification tracking

### **Quality Assurance:**
- Bug severity levels (critical/error/warning/resolved)
- Active issues detection from debug log
- Project health status assessment

### **Structural Integrity:**
- Claude agent count and operational status
- Onboarding flow completion (X/7 steps)
- Key file presence validation
- Documentation freshness tracking

## Actionable Insights:

The command generates context-aware recommendations based on:
- Task load and complexity
- Development activity patterns  
- Issue resolution status
- Project phase and completion metrics
- File organization health

## Integration:

- **Links to /update-docs**: Recommends documentation refresh when stale
- **Supports automation**: Integrates with git hooks and commit validation
- **Session continuity**: Provides context for Claude sessions
- **Progress tracking**: Maintains development momentum visibility

Perfect for daily standups, sprint planning, and maintaining development momentum! 🎯