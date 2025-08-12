# Claude Code Hooks - AdyaTribe

This directory contains Claude Code hooks for automated project maintenance.

## 🪝 Available Hooks

### **auto-commit-validator**
**File:** `pre-commit-validation.js`  
**Trigger:** After file edits (Edit, MultiEdit, Write tools)  
**Purpose:** Auto-commits code to GitHub only when validation passes

#### What it validates:
- ✅ **Syntax Checking**: JavaScript, TypeScript, JSON syntax validation
- ✅ **Build Validation**: Runs build checks without starting dev servers  
- ✅ **Project Rules**: Ensures CLAUDE.md workflow compliance
- ✅ **Security Scan**: Detects potential secrets or sensitive data
- ✅ **Todo Tracking**: Warns if task tracking seems outdated

#### Smart Commit Messages:
```
✨ Code changes: 3 code files, 2 docs
🤖 Update agents: 2 agents
📚 Update docs: development guide, README
🔧 Update scripts: automation tools
```

#### When it commits:
- ✅ All syntax validation passes
- ✅ No blocking errors detected  
- ✅ No secrets found in code
- ⚠️  Warnings don't block commits (but are reported)

#### When it DOESN'T commit:
- ❌ Syntax errors found
- ❌ Build failures detected
- ❌ Potential secrets detected
- ❌ Critical validation failures

## 🔧 Configuration

### Hook Settings (`claude-code-hook.json`):
```json
{
  "trigger": "after-tool-execution",
  "conditions": {
    "tools": ["Edit", "MultiEdit", "Write"],
    "file_patterns": ["*.js", "*.jsx", "*.ts", "*.tsx", "*.json", "*.md"]
  },
  "environment": {
    "CLAUDE_AUTO_PUSH": "true"
  }
}
```

### Environment Variables:
- `CLAUDE_AUTO_PUSH=true` - Auto-push to GitHub (default: true)
- `CLAUDE_AUTO_PUSH=false` - Only commit locally, manual push required

## 🚀 Usage

The hook runs automatically when Claude Code executes file editing tools. You can also run it manually:

```bash
# Run validation and auto-commit
node .claude/hooks/pre-commit-validation.js

# Run with custom project root
PROJ_ROOT=/path/to/project node .claude/hooks/pre-commit-validation.js
```

## 📊 Example Output

```
🔍 Starting pre-commit validation...

📊 Scanning for changes...
   Found 4 changed files:
   M  mobile-app/src/screens/onboarding/EmailStep.js
   M  .claude/agents/onboarding-flow-expert.md
   A  scripts/update-docs.js
   M  tasks/todo.md

🔍 Validating syntax...
   ✅ mobile-app/src/screens/onboarding/EmailStep.js - syntax OK
   ✅ .claude/agents/onboarding-flow-expert.md - valid markdown

🏗️  Validating build...
   🔧 Running build validation (no server start)...
   ✅ Build validation passed

📋 Validating project rules...
   ✅ Project rules validation complete

🎯 Evaluating commit readiness...
   ✅ All validations passed

🚀 Performing auto-commit...
   ✅ Changes staged
   📝 Generated commit message:
      ✨ Code changes: 1 code file, 2 agents, 1 script
   ✅ Changes committed locally
   ✅ Changes pushed to GitHub

🎉 Auto-commit completed successfully!
```

## ⚠️ Important Notes

- **No Dev Servers**: Hook never starts development servers or watchers
- **Safe Validation**: Only performs read-only checks and git operations
- **Error Recovery**: Failed hooks don't break the development workflow
- **Manual Override**: You can always commit manually if needed

This system ensures code is automatically committed only when it's ready and validated! 🚀

---

*Last Updated: 2025-08-10*
