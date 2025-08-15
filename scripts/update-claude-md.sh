#!/bin/bash

# Update CLAUDE.md after major changes
# This script should be run after significant updates to keep documentation current

echo "🤖 Updating CLAUDE.md documentation..."

# Get current date
CURRENT_DATE=$(date +"%Y-%m-%d")

# Get recent commits for context
echo "📝 Recent commits:"
git log --oneline -10

# Get current project stats
echo "📊 Current project stats:"
PAGES=$(find web-app/src/app -name "page.tsx" | wc -l)
COMPONENTS=$(find web-app/src/components -name "*.tsx" | wc -l)

echo "Pages: $PAGES"
echo "Components: $COMPONENTS"

# Update project structure if needed
echo "🏗️ Updating project structure..."
tree web-app/src -I 'node_modules|.next|.git' > PROJECT_STRUCTURE_CURRENT.txt

# Generate component list
echo "🧩 Generating component list..."
find web-app/src/components -name "*.tsx" -exec basename {} .tsx \; | sort > COMPONENTS_LIST.txt

# Generate pages list
echo "📄 Generating pages list..."
find web-app/src/app -name "page.tsx" | sed 's|web-app/src/app||g' | sed 's|/page.tsx||g' > PAGES_LIST.txt

echo "✅ Documentation update preparation complete!"
echo "💡 Consider updating these sections in CLAUDE.md:"
echo "   - Project status and stats (${PAGES}+ pages, ${COMPONENTS}+ components)"
echo "   - Recent feature additions"
echo "   - New components or pages"
echo "   - Updated development commands"
echo "   - Agent system changes"

# Remind about manual updates needed
echo ""
echo "🚨 Manual CLAUDE.md updates needed:"
echo "   1. Update page/component counts if changed significantly"
echo "   2. Document any new features or major changes"
echo "   3. Update agent system if new agents added"
echo "   4. Verify all development commands still work"
echo "   5. Update bilingual system status if changed"