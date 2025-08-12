# /update-docs Slash Command

**Description:** Automatically scans codebase changes and updates all documentation files to stay synchronized with the current project state.

## What it does:

1. **Scans Codebase Changes**: Analyzes git status and recent commits
2. **Updates README.md files**: Refreshes project status, completion metrics
3. **Synchronizes CLAUDE.md**: Updates project metrics and current state  
4. **Maintains /docs/ directory**: Ensures documentation stays current
5. **Provides Summary**: Reports what was updated and current metrics

## Files Updated:

- **All README.md files** (excluding node_modules)
- **CLAUDE.md** - Operating rules with current project metrics
- **docs/*.md** - All documentation in docs directory
- **Auto-timestamps** - Adds/updates "Last Updated" dates

## Usage:

```bash
# Direct execution
node scripts/update-docs.js

# Via Claude Code slash command
/update-docs
```

## Output Example:

```
🔄 Starting documentation update process...

📊 Scanning codebase changes...
   Found 3 changed files
   Last commit: a1b2c3d Complete AdyaTribe foundation...

📄 Updating README.md files...
   Updating README.md...
   ✅ Updated README.md
   Updating mobile-app/README.md...
   ✅ Updated mobile-app/README.md

🤖 Updating CLAUDE.md...
   ✅ Updated CLAUDE.md with current metrics

📚 Updating /docs/ directory...
   ✅ Created development-guide.md
   ✅ Updated development-guide.md

📋 Documentation Update Summary:
   📄 README files updated
   🤖 CLAUDE.md synchronized  
   📚 /docs/ directory updated
   📊 Project metrics refreshed
   📅 Last updated: 2025-08-09

✅ Documentation update completed successfully!
```

## Features:

- **Smart Scanning**: Only updates what needs updating based on git changes
- **Project Metrics**: Automatically counts agents, onboarding steps, etc.
- **Safe Updates**: Preserves manual content while updating auto-generated sections
- **Error Handling**: Continues processing even if individual files fail
- **Progress Tracking**: Syncs with actual project completion status

This command ensures documentation never gets out of sync with the codebase!