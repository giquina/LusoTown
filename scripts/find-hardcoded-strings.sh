#!/bin/bash

# Find Hardcoded Strings Script
# Identifies content strings that need i18n localization
# Part of comprehensive hardcoding remediation plan

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔍 LusoTown Hardcoded Strings Finder${NC}"
echo "===================================="

# Change to web-app directory
cd "$(dirname "$0")/../web-app"

echo -e "${YELLOW}📋 Analyzing hardcoded strings...${NC}"

# Create output directory
OUTPUT_DIR="audits"
mkdir -p "$OUTPUT_DIR"

# Output file
OUTPUT_FILE="$OUTPUT_DIR/hardcoded-strings-$(date +%Y%m%d-%H%M%S).txt"

echo "Results will be saved to: $OUTPUT_FILE"
echo ""

# Find hardcoded strings in JSX/TSX files
echo -e "${BLUE}🔍 Scanning JSX/TSX files for hardcoded strings...${NC}"

{
    echo "# LusoTown Hardcoded Strings Analysis"
    echo "Generated: $(date)"
    echo "========================================"
    echo ""
    
    echo "## HIGH PRIORITY - Page Content Strings"
    echo "These are user-visible content that should use t() function:"
    echo ""
    
    # Look for common hardcoded strings in JSX
    grep -r -n ">\s*[A-Z][^<]*[a-z].*<" src/ --include="*.tsx" --include="*.jsx" | \
    grep -v "className\|import\|export\|console\|//\|/\*" | \
    head -50
    
    echo ""
    echo "## MEDIUM PRIORITY - Button and Link Text"
    echo ""
    
    # Look for hardcoded button/link text
    grep -r -n "\"[A-Z][^\"]*[a-z][^\"]*\"" src/ --include="*.tsx" --include="*.jsx" | \
    grep -v "className\|import\|export\|href\|src\|alt\|id\|key\|data-\|aria-" | \
    head -30
    
    echo ""
    echo "## FILES WITH MOST VIOLATIONS"
    echo ""
    
    # Count violations per file
    for file in $(find src/ -name "*.tsx" -o -name "*.jsx"); do
        violations=$(grep -c ">\s*[A-Z][^<]*[a-z].*<\|\"[A-Z][^\"]*[a-z][^\"]*\"" "$file" 2>/dev/null || echo 0)
        if [ "$violations" -gt 0 ]; then
            echo "$violations violations in $file"
        fi
    done | sort -nr | head -20
    
    echo ""
    echo "## PAGES NEEDING IMMEDIATE ATTENTION"
    echo ""
    
    # Check critical pages
    for page in "page.tsx" "about" "events" "transport" "matches" "business" "streaming" "students"; do
        echo "=== $page ==="
        find src/ -path "*$page*" -name "*.tsx" -exec grep -l ">\s*[A-Z][^<]*[a-z].*<" {} \; 2>/dev/null || echo "No files found for $page"
        echo ""
    done
    
} > "$OUTPUT_FILE"

# Display summary
TOTAL_FILES=$(find src/ -name "*.tsx" -o -name "*.jsx" | wc -l)
AFFECTED_FILES=$(find src/ -name "*.tsx" -o -name "*.jsx" -exec grep -l ">\s*[A-Z][^<]*[a-z].*<\|\"[A-Z][^\"]*[a-z][^\"]*\"" {} \; 2>/dev/null | wc -l)

echo -e "${GREEN}📊 Analysis Complete!${NC}"
echo "Total TSX/JSX files: $TOTAL_FILES"
echo "Files with hardcoded strings: $AFFECTED_FILES"
echo "Results saved to: $OUTPUT_FILE"

echo ""
echo -e "${YELLOW}🎯 RECOMMENDED NEXT STEPS:${NC}"
echo "1. Review the analysis file: cat $OUTPUT_FILE"
echo "2. Start with the files that have the most violations"
echo "3. Use this pattern for fixes:"
echo "   ❌ <h1>About LusoTown</h1>"
echo "   ✅ <h1>{t('about.hero.title')}</h1>"
echo "4. Add translations to src/i18n/en.json and src/i18n/pt.json"

echo ""
echo -e "${BLUE}💡 Pro tip: Run 'npm run lint' after fixes to catch any issues${NC}"