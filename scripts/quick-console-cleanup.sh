#!/bin/bash

# Quick Console Cleanup Script
# Removes console.log statements from LusoTown codebase
# Part of comprehensive hardcoding remediation plan

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🧹 LusoTown Console Log Cleanup Script${NC}"
echo "=================================="

# Change to web-app directory
cd "$(dirname "$0")/../web-app"

# Create backup directory
BACKUP_DIR="../backups/console-cleanup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo -e "${YELLOW}📋 Analyzing console.log usage...${NC}"

# Find all console.log instances
echo "Finding all console.log statements..."
CONSOLE_FILES=$(grep -r "console\.log" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" -l | sort | uniq)

if [ -z "$CONSOLE_FILES" ]; then
    echo -e "${GREEN}✅ No console.log statements found!${NC}"
    exit 0
fi

echo "Found console.log statements in these files:"
echo "$CONSOLE_FILES"

# Count total violations
TOTAL_VIOLATIONS=$(grep -r "console\.log" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | wc -l)
echo -e "${YELLOW}📊 Total console.log violations: $TOTAL_VIOLATIONS${NC}"

# Create backup of affected files
echo -e "${YELLOW}💾 Creating backup of affected files...${NC}"
while IFS= read -r file; do
    if [ -n "$file" ]; then
        # Create directory structure in backup
        backup_file="$BACKUP_DIR/$file"
        mkdir -p "$(dirname "$backup_file")"
        cp "$file" "$backup_file"
        echo "Backed up: $file"
    fi
done <<< "$CONSOLE_FILES"

# Remove console.log statements (but preserve console.warn and console.error)
echo -e "${YELLOW}🔧 Removing console.log statements...${NC}"

while IFS= read -r file; do
    if [ -n "$file" ]; then
        echo "Processing: $file"
        
        # Remove console.log statements but keep console.warn and console.error
        # This preserves legitimate error handling
        sed -i.tmp '
            # Remove standalone console.log lines (with optional leading whitespace)
            /^[[:space:]]*console\.log(/d
            # Remove console.log in expressions but be careful not to remove console.warn/error
            s/console\.log([^)]*)[;,]*//g
        ' "$file"
        
        # Clean up temporary file
        rm -f "$file.tmp"
    fi
done <<< "$CONSOLE_FILES"

echo -e "${GREEN}✅ Console cleanup completed!${NC}"

# Verify the cleanup
echo -e "${YELLOW}🔍 Verifying cleanup...${NC}"
REMAINING_VIOLATIONS=$(grep -r "console\.log" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | wc -l)

if [ "$REMAINING_VIOLATIONS" -eq 0 ]; then
    echo -e "${GREEN}✅ All console.log statements successfully removed!${NC}"
    echo -e "${GREEN}📊 Violations removed: $TOTAL_VIOLATIONS${NC}"
    echo -e "${GREEN}💾 Backup created at: $BACKUP_DIR${NC}"
else
    echo -e "${RED}⚠️  $REMAINING_VIOLATIONS console.log statements remain${NC}"
    echo "Remaining instances:"
    grep -r "console\.log" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" -n
fi

# Run ESLint to check for any issues
echo -e "${YELLOW}🔍 Running ESLint check...${NC}"
if npm run lint 2>/dev/null; then
    echo -e "${GREEN}✅ ESLint check passed${NC}"
else
    echo -e "${YELLOW}⚠️  ESLint found some issues - please review${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Console cleanup complete!${NC}"
echo "Next steps:"
echo "1. Review the changes: git diff"
echo "2. Test the application: npm run dev"
echo "3. Commit the changes if everything looks good"
echo "4. Backup is available at: $BACKUP_DIR"