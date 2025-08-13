# Claude Code Hooks Documentation

This directory contains Claude Code hooks that enhance the development workflow for the LusoTown project.

## Auto-Todo List Hook

**File**: `hooks/user-prompt-submit.sh`

### Purpose
Automatically detects complex tasks and suggests creating todo lists to maintain tracking and organization throughout development work.

### Features

#### 🎯 **Complex Task Detection**
Analyzes user prompts for keywords indicating multi-step work:
- Implementation keywords: `implement`, `create`, `build`, `develop`, `update`, `fix`, `refactor`
- Scope keywords: `multiple`, `several`, `various`, `and`, `also`, `then`, `after`
- Technical keywords: `deploy`, `setup`, `configure`, `integrate`, `optimize`, `redesign`

When 2+ keywords are detected, the hook suggests creating a comprehensive todo list.

#### 🚀 **Deployment Reminders**
When deployment-related keywords are detected (`deploy`, `push`, `commit`, `github`, `git`), provides reminders for:
- Running tests before deployment
- Creating detailed commit messages
- Updating documentation

#### 🇵🇹 **LusoTown-Specific Guidance**
When Portuguese/community-related work is detected, provides context-specific reminders:
- Ensure Portuguese cultural authenticity
- Consider age restrictions and women-only events
- Use Portuguese theme colors (green → red → yellow)
- Test events page and homepage showcase

### Usage Examples

**Input**: "Create multiple events and update the pricing page and deploy to GitHub"
**Hook Response**:
```
🎯 Complex task detected! Consider asking Claude to:
   • Create a comprehensive todo list to track all steps
   • Break down the work into manageable phases
   • Update progress as each item is completed

🚀 Deployment reminder:
   • Run tests before deployment
   • Create detailed commit messages
   • Update documentation if needed

🇵🇹 LusoTown Development Notes:
   • Ensure Portuguese cultural authenticity
   • Consider age restrictions and women-only events
   • Use Portuguese theme colors (green → red → yellow)
   • Test events page and homepage showcase
```

### Installation
The hook is automatically executable and triggers on every user prompt submission to Claude Code.

### Benefits
1. **Never Lose Track**: Automatic prompting ensures complex work is properly organized
2. **Quality Assurance**: Deployment reminders prevent rushed releases
3. **Cultural Authenticity**: LusoTown-specific guidance maintains project focus
4. **Consistent Workflow**: Standardized approach to task management

### Customization
Modify the keyword arrays in the script to adjust sensitivity or add project-specific terms.