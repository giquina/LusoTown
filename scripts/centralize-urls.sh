#!/bin/bash

# Centralize URLs Script
# Replaces hardcoded external URLs with config helpers
# Part of comprehensive hardcoding remediation plan

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔗 LusoTown URL Centralization Script${NC}"
echo "===================================="

# Change to web-app directory
cd "$(dirname "$0")/../web-app"

# Create backup directory
BACKUP_DIR="../backups/url-fixes-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo -e "${YELLOW}📋 Analyzing hardcoded URLs...${NC}"

# Find files with hardcoded URLs
echo "Finding files with hardcoded URLs..."
URL_FILES=$(grep -r -l "https://\|http://\|www\." src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | \
    grep -v "node_modules\|\.git" | sort | uniq)

if [ -z "$URL_FILES" ]; then
    echo -e "${GREEN}✅ No hardcoded URLs found!${NC}"
    exit 0
fi

echo "Found hardcoded URLs in these files:"
echo "$URL_FILES"

# Count total violations by category
echo -e "${YELLOW}📊 URL Analysis by Category:${NC}"

UNSPLASH_COUNT=$(grep -r "images\.unsplash\.com" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | wc -l)
SOCIAL_COUNT=$(grep -r "instagram\.com\|facebook\.com\|twitter\.com\|linkedin\.com" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | wc -l)
CLOUDINARY_COUNT=$(grep -r "cloudinary\.com\|res\.cloudinary\.com" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | wc -l)
OTHER_COUNT=$(grep -r "https://\|http://\|www\." src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | \
    grep -v "images\.unsplash\.com\|instagram\.com\|facebook\.com\|twitter\.com\|linkedin\.com\|cloudinary\.com" | wc -l)

echo "  Unsplash URLs: $UNSPLASH_COUNT"
echo "  Social Media URLs: $SOCIAL_COUNT"
echo "  Cloudinary URLs: $CLOUDINARY_COUNT"
echo "  Other URLs: $OTHER_COUNT"

TOTAL_VIOLATIONS=$((UNSPLASH_COUNT + SOCIAL_COUNT + CLOUDINARY_COUNT + OTHER_COUNT))
echo "  Total URL violations: $TOTAL_VIOLATIONS"

# Create backup of affected files
echo -e "${YELLOW}💾 Creating backup of affected files...${NC}"
while IFS= read -r file; do
    if [ -n "$file" ]; then
        backup_file="$BACKUP_DIR/$file"
        mkdir -p "$(dirname "$backup_file")"
        cp "$file" "$backup_file"
        echo "Backed up: $file"
    fi
done <<< "$URL_FILES"

# Process each file
echo -e "${YELLOW}🔧 Centralizing URLs...${NC}"

while IFS= read -r file; do
    if [ -n "$file" ]; then
        echo "Processing: $file"
        
        # Check if file needs config imports
        needs_unsplash_import=false
        needs_social_import=false
        needs_cloudinary_import=false
        
        if grep -q "images\.unsplash\.com" "$file"; then
            needs_unsplash_import=true
        fi
        
        if grep -q "instagram\.com\|facebook\.com\|twitter\.com\|linkedin\.com" "$file"; then
            needs_social_import=true
        fi
        
        if grep -q "cloudinary\.com\|res\.cloudinary\.com" "$file"; then
            needs_cloudinary_import=true
        fi
        
        # Add necessary imports
        if [ "$needs_unsplash_import" = true ] || [ "$needs_social_import" = true ] || [ "$needs_cloudinary_import" = true ]; then
            if ! grep -q "import.*from.*@/config" "$file"; then
                # Add import line
                import_line="import { "
                
                if [ "$needs_unsplash_import" = true ]; then
                    import_line="${import_line}buildUnsplashUrl, "
                fi
                
                if [ "$needs_social_import" = true ]; then
                    import_line="${import_line}SOCIAL_URLS, "
                fi
                
                if [ "$needs_cloudinary_import" = true ]; then
                    import_line="${import_line}buildCloudinaryUrl, "
                fi
                
                # Remove trailing comma and space, add closing
                import_line=$(echo "$import_line" | sed 's/, $//')
                import_line="${import_line} } from '@/config'"
                
                # Insert import after existing imports
                if grep -q "^import.*from" "$file"; then
                    sed -i "/^import.*from/a $import_line" "$file"
                else
                    sed -i "1i $import_line" "$file"
                fi
                echo "  Added config imports"
            fi
        fi
        
        # Fix Unsplash URLs
        # Pattern: https://images.unsplash.com/photo-xyz?w=400&h=300
        sed -i 's|"https://images\.unsplash\.com/\([^"]*\)"|buildUnsplashUrl("\1")|g' "$file"
        sed -i "s|'https://images\.unsplash\.com/\([^']*\)'|buildUnsplashUrl('\1')|g" "$file"
        
        # Fix Social Media URLs
        sed -i 's|"https://instagram\.com/lusotownlondon"|SOCIAL_URLS.instagram|g' "$file"
        sed -i 's|"https://facebook\.com/lusotownlondon"|SOCIAL_URLS.facebook|g' "$file"
        sed -i 's|"https://twitter\.com/lusotownlondon"|SOCIAL_URLS.twitter|g' "$file"
        sed -i 's|"https://linkedin\.com/company/lusotown"|SOCIAL_URLS.linkedin|g' "$file"
        
        # Fix Cloudinary URLs
        sed -i 's|"https://res\.cloudinary\.com/\([^"]*\)"|buildCloudinaryUrl("\1")|g' "$file"
        sed -i "s|'https://res\.cloudinary\.com/\([^']*\)'|buildCloudinaryUrl('\1')|g" "$file"
        
        # Log specific changes made
        if grep -q "buildUnsplashUrl\|SOCIAL_URLS\|buildCloudinaryUrl" "$file"; then
            echo "  ✅ Centralized URLs in $file"
        fi
    fi
done <<< "$URL_FILES"

echo -e "${GREEN}✅ URL centralization completed!${NC}"

# Verify the changes
echo -e "${YELLOW}🔍 Verifying fixes...${NC}"

NEW_UNSPLASH_COUNT=$(grep -r "images\.unsplash\.com" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | wc -l)
NEW_SOCIAL_COUNT=$(grep -r "instagram\.com\|facebook\.com\|twitter\.com\|linkedin\.com" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | wc -l)
NEW_CLOUDINARY_COUNT=$(grep -r "cloudinary\.com\|res\.cloudinary\.com" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | wc -l)

FIXED_UNSPLASH=$((UNSPLASH_COUNT - NEW_UNSPLASH_COUNT))
FIXED_SOCIAL=$((SOCIAL_COUNT - NEW_SOCIAL_COUNT))
FIXED_CLOUDINARY=$((CLOUDINARY_COUNT - NEW_CLOUDINARY_COUNT))
TOTAL_FIXED=$((FIXED_UNSPLASH + FIXED_SOCIAL + FIXED_CLOUDINARY))

echo -e "${GREEN}📊 URLs Fixed:${NC}"
echo "  Unsplash URLs: $FIXED_UNSPLASH"
echo "  Social Media URLs: $FIXED_SOCIAL"
echo "  Cloudinary URLs: $FIXED_CLOUDINARY"
echo "  Total URLs fixed: $TOTAL_FIXED"
echo "  Backup created at: $BACKUP_DIR"

# Check if config files exist
echo -e "${YELLOW}🔍 Checking configuration files...${NC}"

if [ ! -f "src/config/cdn.ts" ]; then
    echo -e "${RED}⚠️  CDN configuration file not found!${NC}"
    echo "You need to create src/config/cdn.ts with URL helpers."
fi

if [ ! -f "src/config/social.ts" ]; then
    echo -e "${RED}⚠️  Social media configuration file not found!${NC}"
    echo "You need to create src/config/social.ts with social URLs."
fi

# Show remaining hardcoded URLs that need manual review
REMAINING_URLS=$(grep -r "https://\|http://\|www\." src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | \
    grep -v "buildUnsplashUrl\|SOCIAL_URLS\|buildCloudinaryUrl\|import\|//" | wc -l)

if [ "$REMAINING_URLS" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  $REMAINING_URLS URLs need manual review:${NC}"
    grep -r "https://\|http://\|www\." src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | \
        grep -v "buildUnsplashUrl\|SOCIAL_URLS\|buildCloudinaryUrl\|import\|//" | head -10
fi

echo ""
echo -e "${GREEN}🎉 URL centralization complete!${NC}"
echo "Next steps:"
echo "1. Review the changes: git diff"
echo "2. Ensure all config files exist (cdn.ts, social.ts)"
echo "3. Test the application: npm run dev"
echo "4. Commit the changes if everything looks good"