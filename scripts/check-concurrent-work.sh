#!/bin/bash

# Claude Instance Coordination Check Script
# Run this before starting any development work

echo "🔄 CLAUDE INSTANCE COORDINATION CHECK"
echo "===================================="
echo ""

# Check coordination file
echo "📋 ACTIVE WORK REGISTRY:"
if [ -f "CLAUDE_COORDINATION.md" ]; then
    echo "$(tail -20 CLAUDE_COORDINATION.md | grep -E "(ACTIVE|IN PROGRESS|Instance)" || echo "No active work detected")"
else
    echo "⚠️  CLAUDE_COORDINATION.md not found - creating..."
    echo "No active coordination file found" > CLAUDE_COORDINATION.md
fi
echo ""

# Check git status for concurrent changes
echo "📊 GIT STATUS CHECK:"
git_changes=$(git status --porcelain | wc -l)
if [ $git_changes -gt 0 ]; then
    echo "⚠️  $git_changes files have changes"
    echo "Recent changes:"
    git status --porcelain | head -10
else
    echo "✅ No uncommitted changes"
fi
echo ""

# Check recent file modifications
echo "⏱️  RECENT FILE ACTIVITY:"
recent_components=$(find web-app/src/components -newermt "30 minutes ago" -name "*.tsx" 2>/dev/null | wc -l)
if [ $recent_components -gt 0 ]; then
    echo "⚠️  $recent_components components modified in last 30 minutes:"
    find web-app/src/components -newermt "30 minutes ago" -name "*.tsx" -exec basename {} \; 2>/dev/null | head -10
else
    echo "✅ No recent component modifications"
fi
echo ""

# Check for duplicate-prone patterns
echo "🔍 DUPLICATE RISK ANALYSIS:"
echo "Components created today:"
if ls web-app/src/components/*.tsx 2>/dev/null | xargs ls -la | grep "$(date +%b\ %d)" | wc -l > 0; then
    ls web-app/src/components/*.tsx 2>/dev/null | xargs ls -la | grep "$(date +%b\ %d)" | awk '{print $9}' | xargs basename -s .tsx | head -5
else
    echo "✅ No components created today"
fi
echo ""

# Check for common duplicate patterns
echo "⚠️  HIGH-RISK DUPLICATE PATTERNS TO AVOID:"
echo "- Help/Guidance systems (GlobalUserGuidance.tsx exists)"
echo "- Tooltip systems (TooltipContext.tsx exists)"  
echo "- App download bars (AppDownloadBar.tsx exists)"
echo "- PALOP country components (PALOPCountryCards.tsx exists)"
echo ""

# Recommendations
echo "💡 RECOMMENDATIONS:"
echo "1. Update CLAUDE_COORDINATION.md with your planned work"
echo "2. Choose from AVAILABLE areas in coordination file"
echo "3. Avoid modifying recently changed files"
echo "4. Use complementary approaches rather than replacements"
echo "5. Check this script every 15-30 minutes during development"
echo ""

# Available work areas
echo "🎯 CURRENTLY AVAILABLE WORK AREAS:"
echo "- Mobile widget positioning testing"
echo "- Progressive loading states"
echo "- Modal escape hatches"  
echo "- Keyboard navigation accessibility"
echo "- Performance optimizations"
echo ""

echo "✅ Coordination check complete!"
echo "Safe to proceed with non-conflicting work."

# Return status based on risk level
if [ $git_changes -gt 20 ] || [ $recent_components -gt 5 ]; then
    echo ""
    echo "⚠️  HIGH CONCURRENCY RISK - Proceed with caution"
    exit 1
else
    exit 0
fi