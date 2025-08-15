#!/bin/bash

# Post-deployment update script
# Run this after major deployments to update all documentation and verify systems

echo "🚀 Post-deployment update script started..."

# Update CLAUDE.md
echo "📚 Updating CLAUDE.md..."
./scripts/update-claude-md.sh

# Run build and tests
echo "🔨 Running build verification..."
cd web-app
npm run build

# Type checking
echo "🔍 Running type check..."
npx tsc --noEmit

# Linting
echo "🧹 Running linter..."
npm run lint

# Check agents
echo "🤖 Checking agent system..."
cd ..
if [ -f .claude/invoke-agent.js ]; then
    node .claude/invoke-agent.js --list
else
    echo "⚠️ Agent system not found"
fi

# Git status
echo "📊 Current git status:"
git status --short

echo "✅ Post-deployment update complete!"
echo "💡 Remember to:"
echo "   - Update CLAUDE.md with any new features"
echo "   - Test bilingual functionality"
echo "   - Verify all networking features work"
echo "   - Check demo login still works"