#!/bin/bash

# Enforce Brand Colors Script
# Replaces generic colors with Portuguese brand palette
# Part of comprehensive hardcoding remediation plan

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🎨 LusoTown Brand Colors Enforcement Script${NC}"
echo "============================================"

# Change to web-app directory
cd "$(dirname "$0")/../web-app"

# Create backup directory
BACKUP_DIR="../backups/color-fixes-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo -e "${YELLOW}📋 Analyzing color usage...${NC}"

# Generic colors to replace with Portuguese brand colors
declare -A COLOR_REPLACEMENTS=(
    # Generic blues -> Portuguese primary
    ["bg-blue-500"]="bg-primary-500"
    ["bg-blue-600"]="bg-primary-600"
    ["bg-blue-700"]="bg-primary-700"
    ["text-blue-500"]="text-primary-500"
    ["text-blue-600"]="text-primary-600"
    ["text-blue-700"]="text-primary-700"
    ["border-blue-500"]="border-primary-500"
    ["hover:bg-blue-600"]="hover:bg-primary-600"
    ["focus:ring-blue-500"]="focus:ring-primary-500"
    
    # Generic grays -> Portuguese secondary/neutral
    ["bg-gray-100"]="bg-secondary-100"
    ["bg-gray-200"]="bg-secondary-200"
    ["bg-gray-800"]="bg-secondary-800"
    ["bg-gray-900"]="bg-secondary-900"
    ["text-gray-600"]="text-secondary-600"
    ["text-gray-700"]="text-secondary-700"
    ["text-gray-800"]="text-secondary-800"
    ["border-gray-300"]="border-secondary-300"
    
    # Generic green -> Portuguese action/success
    ["bg-green-500"]="bg-action-500"
    ["bg-green-600"]="bg-action-600"
    ["text-green-500"]="text-action-500"
    ["text-green-600"]="text-action-600"
    ["border-green-500"]="border-action-500"
    
    # Generic red -> Portuguese coral/error
    ["bg-red-500"]="bg-coral-500"
    ["bg-red-600"]="bg-coral-600"
    ["text-red-500"]="text-coral-500"
    ["text-red-600"]="text-coral-600"
    ["border-red-500"]="border-coral-500"
    
    # Generic yellow -> Portuguese accent
    ["bg-yellow-500"]="bg-accent-500"
    ["bg-yellow-400"]="bg-accent-400"
    ["text-yellow-500"]="text-accent-500"
    ["border-yellow-500"]="border-accent-500"
)

# Hex colors to replace
declare -A HEX_REPLACEMENTS=(
    ["#3b82f6"]="var(--color-primary-500)"
    ["#2563eb"]="var(--color-primary-600)"
    ["#1d4ed8"]="var(--color-primary-700)"
    ["#1e40af"]="var(--color-primary-800)"
    ["#dc2626"]="var(--color-coral-500)"
    ["#b91c1c"]="var(--color-coral-600)"
    ["#991b1b"]="var(--color-coral-700)"
    ["#059669"]="var(--color-action-500)"
    ["#047857"]="var(--color-action-600)"
    ["#065f46"]="var(--color-action-700)"
    ["#f59e0b"]="var(--color-accent-500)"
    ["#d97706"]="var(--color-accent-600)"
    ["#6b7280"]="var(--color-secondary-500)"
    ["#4b5563"]="var(--color-secondary-600)"
    ["#374151"]="var(--color-secondary-700)"
)

# Find files with color usage
echo "Finding files with color classes and hex values..."
COLOR_FILES=$(grep -r -l "bg-\|text-\|border-\|#[0-9a-fA-F]\{6\}" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" --include="*.css" | \
    grep -v "node_modules\|\.git" | sort | uniq)

if [ -z "$COLOR_FILES" ]; then
    echo -e "${GREEN}✅ No color issues found!${NC}"
    exit 0
fi

echo "Found color usage in these files:"
echo "$COLOR_FILES"

# Count violations by type
TAILWIND_VIOLATIONS=$(grep -r "bg-blue-\|bg-gray-\|bg-green-\|bg-red-\|bg-yellow-\|text-blue-\|text-gray-\|text-green-\|text-red-\|text-yellow-\|border-blue-\|border-gray-\|border-green-\|border-red-\|border-yellow-" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | wc -l)
HEX_VIOLATIONS=$(grep -r "#[0-9a-fA-F]\{6\}" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" --include="*.css" | wc -l)
TOTAL_VIOLATIONS=$((TAILWIND_VIOLATIONS + HEX_VIOLATIONS))

echo -e "${YELLOW}📊 Color Violations:${NC}"
echo "  Generic Tailwind colors: $TAILWIND_VIOLATIONS"
echo "  Hardcoded hex colors: $HEX_VIOLATIONS"
echo "  Total color violations: $TOTAL_VIOLATIONS"

# Create backup of affected files
echo -e "${YELLOW}💾 Creating backup of affected files...${NC}"
while IFS= read -r file; do
    if [ -n "$file" ]; then
        backup_file="$BACKUP_DIR/$file"
        mkdir -p "$(dirname "$backup_file")"
        cp "$file" "$backup_file"
        echo "Backed up: $file"
    fi
done <<< "$COLOR_FILES"

# Process each file
echo -e "${YELLOW}🔧 Enforcing Portuguese brand colors...${NC}"

while IFS= read -r file; do
    if [ -n "$file" ]; then
        echo "Processing: $file"
        
        # Replace Tailwind color classes
        for generic_color in "${!COLOR_REPLACEMENTS[@]}"; do
            brand_color="${COLOR_REPLACEMENTS[$generic_color]}"
            if grep -q "$generic_color" "$file"; then
                sed -i "s|$generic_color|$brand_color|g" "$file"
                echo "  Replaced $generic_color with $brand_color"
            fi
        done
        
        # Replace hex colors with CSS variables
        for hex_color in "${!HEX_REPLACEMENTS[@]}"; do
            css_var="${HEX_REPLACEMENTS[$hex_color]}"
            if grep -q "$hex_color" "$file"; then
                sed -i "s|$hex_color|$css_var|g" "$file"
                echo "  Replaced $hex_color with $css_var"
            fi
        done
        
        # Check if file needs brandColors import for style objects
        if grep -q "style.*{.*color:" "$file" && ! grep -q "brandColors" "$file"; then
            # Add brandColors import if using style objects
            if grep -q "^import.*from" "$file"; then
                sed -i "/^import.*from/a import { brandColors } from '@/config'" "$file"
                echo "  Added brandColors import"
            fi
        fi
    fi
done <<< "$COLOR_FILES"

echo -e "${GREEN}✅ Brand color enforcement completed!${NC}"

# Verify the changes
echo -e "${YELLOW}🔍 Verifying fixes...${NC}"

NEW_TAILWIND_VIOLATIONS=$(grep -r "bg-blue-\|bg-gray-\|bg-green-\|bg-red-\|bg-yellow-\|text-blue-\|text-gray-\|text-green-\|text-red-\|text-yellow-\|border-blue-\|border-gray-\|border-green-\|border-red-\|border-yellow-" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | wc -l)
NEW_HEX_VIOLATIONS=$(grep -r "#[0-9a-fA-F]\{6\}" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" --include="*.css" | wc -l)

FIXED_TAILWIND=$((TAILWIND_VIOLATIONS - NEW_TAILWIND_VIOLATIONS))
FIXED_HEX=$((HEX_VIOLATIONS - NEW_HEX_VIOLATIONS))
TOTAL_FIXED=$((FIXED_TAILWIND + FIXED_HEX))

echo -e "${GREEN}📊 Colors Fixed:${NC}"
echo "  Tailwind colors: $FIXED_TAILWIND"
echo "  Hex colors: $FIXED_HEX"
echo "  Total colors fixed: $TOTAL_FIXED"
echo "  Backup created at: $BACKUP_DIR"

# Check if brand colors config exists
echo -e "${YELLOW}🔍 Checking brand configuration...${NC}"

if [ ! -f "src/config/brand.ts" ]; then
    echo -e "${RED}⚠️  Brand configuration file not found!${NC}"
    echo "You need to create src/config/brand.ts with Portuguese colors."
    echo ""
    echo "Example structure:"
    echo "export const brandColors = {"
    echo "  primary: { 500: '#YOUR_PRIMARY_COLOR', ... },"
    echo "  secondary: { 500: '#YOUR_SECONDARY_COLOR', ... },"
    echo "  action: { 500: '#YOUR_ACTION_COLOR', ... },"
    echo "  coral: { 500: '#YOUR_CORAL_COLOR', ... },"
    echo "  accent: { 500: '#YOUR_ACCENT_COLOR', ... },"
    echo "};"
fi

# Check Tailwind config
if [ -f "tailwind.config.js" ] && ! grep -q "primary.*500" "tailwind.config.js"; then
    echo -e "${YELLOW}⚠️  Tailwind config may need Portuguese color definitions${NC}"
fi

# Show remaining generic colors that need manual review
REMAINING_GENERIC=$(grep -r "bg-blue-\|bg-gray-\|bg-green-\|bg-red-\|bg-yellow-\|text-blue-\|text-gray-\|text-green-\|text-red-\|text-yellow-" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | wc -l)

if [ "$REMAINING_GENERIC" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  $REMAINING_GENERIC generic colors need manual review:${NC}"
    grep -r "bg-blue-\|bg-gray-\|bg-green-\|bg-red-\|bg-yellow-\|text-blue-\|text-gray-\|text-green-\|text-red-\|text-yellow-" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | head -10
fi

echo ""
echo -e "${GREEN}🎉 Brand color enforcement complete!${NC}"
echo "Next steps:"
echo "1. Review the changes: git diff"
echo "2. Ensure src/config/brand.ts exists with Portuguese colors"
echo "3. Update tailwind.config.js if needed"
echo "4. Test the application: npm run dev"
echo "5. Verify visual consistency matches Portuguese brand"
echo "6. Commit the changes if everything looks good"