#!/bin/bash

# LusoTown Claude Init Wrapper
# Automatically updates AI guidance files (CLAUDE.md, RULES.md, AGENTS.md) 
# whenever /init command is run

set -e

echo "🚀 LusoTown Claude Init Process Starting..."
echo "📝 Updating AI guidance files before analysis..."

# Get the directory of this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Update all critical AI guidance and documentation files
echo "🔄 Updating all critical .md documentation files..."
node "$SCRIPT_DIR/enhanced-ai-guidance-updater.js"

echo ""
echo "✅ AI guidance files updated successfully!"
echo "📊 Files now reflect current codebase state"
echo "🎯 Ready for Claude Code analysis"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Quick Reference for Claude Code:"
echo "   • Project: LusoTown Portuguese Community Platform"
echo "   • Tech Stack: Next.js 14, TypeScript, Supabase, PostGIS"
echo "   • Start Dev: cd web-app && npm run dev"
echo "   • Critical Rule: ZERO hardcoding (use /src/config/)"
echo "   • Cultural Focus: Portuguese-speaking community in UK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Show current status
echo "📈 Current Codebase Status:"
cd "$ROOT_DIR"

# Count key metrics
PAGES=$(find web-app/src/app -name "page.tsx" 2>/dev/null | wc -l || echo "0")
COMPONENTS=$(find web-app/src/components -name "*.tsx" 2>/dev/null | wc -l || echo "0") 
CONFIGS=$(find web-app/src/config -name "*.ts" 2>/dev/null | wc -l || echo "0")

echo "   • Pages: $PAGES"
echo "   • Components: $COMPONENTS" 
echo "   • Config Files: $CONFIGS"

# Show git status
if git status >/dev/null 2>&1; then
    echo "   • Git Status: $(git status --porcelain | wc -l) modified files"
    echo "   • Last Commit: $(git log -1 --format='%h %s' 2>/dev/null || echo 'None')"
fi

echo ""
echo "🎉 Ready for Claude Code! All guidance files are current."