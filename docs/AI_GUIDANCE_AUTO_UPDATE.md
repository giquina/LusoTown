# AI Guidance Auto-Update System

## Overview

This system automatically updates the AI guidance files (`CLAUDE.md`, `RULES.md`, and `AGENTS.md`) to keep them synchronized with the current codebase state whenever the `/init` command is run.

## How It Works

### 1. Auto-Update Script (`scripts/update-ai-guidance.js`)

This Node.js script:
- Analyzes the current codebase (pages, components, config files, tests)
- Updates statistics in all three AI guidance files
- Adds current timestamps and commit information
- Ensures documentation reflects actual codebase state

### 2. Init Wrapper (`scripts/claude-init-wrapper.sh`)

This shell script:
- Runs the auto-update script first
- Provides current codebase metrics
- Shows helpful quick reference information
- Ensures files are ready for Claude Code analysis

### 3. npm Scripts Integration

Added to root `package.json`:
```json
{
  "init": "scripts/claude-init-wrapper.sh",
  "update-ai-docs": "node scripts/update-ai-guidance.js"
}
```

## Usage

### Automatic Update (Recommended)
```bash
npm run init
```
This runs the full init process, updating all AI guidance files automatically.

### Manual Update Only
```bash
npm run update-ai-docs
```
This updates just the AI guidance files without the full init display.

## What Gets Updated

The enhanced system now updates **14 critical .md files** organized by priority and type:

### Core AI Guidance Files (Priority 1)
- **CLAUDE.md**: System status, live metrics, commit hash, Node version
- **RULES.md**: Audit status date, config file counts, timestamps  
- **AGENTS.md**: Platform metrics, component counts, architecture stats

### Developer Documentation (Priority 2)
- **web-app/DEVELOPER_SETUP.md**: Node version, last updated date, platform context
- **web-app/UI_UX_RULES.md**: Platform context, component counts, timestamps
- **web-app/TODO.md**: Current status block, platform metrics, commit info

### Status & Deployment (Priority 2)  
- **DEPLOYMENT_SUMMARY.md**: Live URL, deployment date, platform metrics

### Technical Documentation (Priority 3)
- **web-app/TESTING_FRAMEWORK.md**: Updated with current testing stats
- **web-app/API_DOCUMENTATION.md**: Current API metrics and endpoints
- **web-app/DESIGN_SYSTEM.md**: Component count, design system status
- **web-app/DEVELOPMENT_WORKFLOW.md**: Updated workflow with current metrics
- **streaming/README.md**: Streaming platform status and requirements
- **LUSOTOWN_API_DOCUMENTATION.md**: API documentation with current stats  
- **PORTUGUESE_BRAND_COLORS.md**: Brand system with platform context

## Automation Features

### Git Hook (Optional)
The system includes a pre-commit hook at `.github/hooks/pre-commit` that automatically updates guidance files when significant changes are made to:
- `web-app/src/` directory
- `package.json` files
- Markdown files

### Real-Time Metrics
The system automatically detects and updates:
- Total pages in the app router
- Total React components
- Total configuration files
- Total test files
- Current Node.js version
- Latest git commit information

## Benefits

1. **Always Current**: Documentation never gets out of sync with code
2. **Consistent AI Behavior**: All AI tools get accurate, up-to-date information
3. **Automated Maintenance**: No manual updates needed
4. **Accurate Statistics**: Live codebase metrics for better decision making
5. **Developer Productivity**: Quick access to current system status

## File Locations

```
/workspaces/LusoTown/
├── scripts/
│   ├── update-ai-guidance.js      # Main update script
│   └── claude-init-wrapper.sh     # Init wrapper script
├── .github/hooks/
│   └── pre-commit                 # Auto-update git hook
├── CLAUDE.md                      # Auto-updated
├── RULES.md                       # Auto-updated
├── AGENTS.md                      # Auto-updated
└── docs/
    └── AI_GUIDANCE_AUTO_UPDATE.md # This file
```

## Example Output

When you run `npm run init`:

```
🚀 LusoTown Claude Init Process Starting...
📝 Updating AI guidance files before analysis...

📊 Current codebase stats:
   Pages: 135
   Components: 496
   Config files: 49
   Test files: 24
   AI systems: 4
   Node version: v20.19.4
   Last commit: 66068c0 feat: Complete LusoTown platform...

✅ Updated CLAUDE.md
✅ Updated RULES.md  
✅ Updated AGENTS.md

🎉 Ready for Claude Code! All guidance files are current.
```

## Maintenance

The system is self-maintaining and requires no regular upkeep. If you need to modify what gets updated, edit `scripts/update-ai-guidance.js`.

## Integration with Claude Code

This system ensures that every time you run the `/init` command in Claude Code, you get:
- Current codebase statistics
- Up-to-date architectural information
- Accurate development guidance
- Proper cultural and technical context

The result is more accurate AI assistance and better development productivity.