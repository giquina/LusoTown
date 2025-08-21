#!/bin/bash

# Fix Routes Script
# Replaces hardcoded route strings with ROUTES constants
# Part of comprehensive hardcoding remediation plan

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🛣️  LusoTown Route Hardcoding Fix Script${NC}"
echo "========================================"

# Change to web-app directory
cd "$(dirname "$0")/../web-app"

# Create backup directory
BACKUP_DIR="../backups/route-fixes-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo -e "${YELLOW}📋 Analyzing hardcoded routes...${NC}"

# Common hardcoded routes to fix
declare -A ROUTES_MAP=(
    ["\"/\""]="ROUTES.home"
    ["\"/about\""]="ROUTES.about"
    ["\"/events\""]="ROUTES.events"
    ["\"/transport\""]="ROUTES.transport"
    ["\"/matches\""]="ROUTES.matches"
    ["\"/business\""]="ROUTES.business"
    ["\"/business-directory\""]="ROUTES.businessDirectory"
    ["\"/streaming\""]="ROUTES.streaming"
    ["\"/live\""]="ROUTES.live"
    ["\"/students\""]="ROUTES.students"
    ["\"/login\""]="ROUTES.auth.login"
    ["\"/signup\""]="ROUTES.auth.signup"
    ["\"/profile\""]="ROUTES.profile"
    ["\"/settings\""]="ROUTES.settings"
    ["\"/privacy\""]="ROUTES.legal.privacy"
    ["\"/terms\""]="ROUTES.legal.terms"
    ["\"/contact\""]="ROUTES.contact"
    ["'/api/auth'"]="'/api/auth'"
    ["'/api/events'"]="'/api/events'"
    ["'/api/transport'"]="'/api/transport'"
)

# Find files with hardcoded routes
echo "Finding files with hardcoded routes..."
ROUTE_FILES=$(grep -r -l "href=\"/\|router\.push(\"/\|router\.replace(\"/\|pathname === \"/\|asPath === \"/" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | sort | uniq)

if [ -z "$ROUTE_FILES" ]; then
    echo -e "${GREEN}✅ No hardcoded routes found!${NC}"
    exit 0
fi

echo "Found hardcoded routes in these files:"
echo "$ROUTE_FILES"

# Count total violations
TOTAL_VIOLATIONS=$(grep -r "href=\"/\|router\.push(\"/\|router\.replace(\"/\|pathname === \"/\|asPath === \"/" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | wc -l)
echo -e "${YELLOW}📊 Total route violations: $TOTAL_VIOLATIONS${NC}"

# Create backup of affected files
echo -e "${YELLOW}💾 Creating backup of affected files...${NC}"
while IFS= read -r file; do
    if [ -n "$file" ]; then
        backup_file="$BACKUP_DIR/$file"
        mkdir -p "$(dirname "$backup_file")"
        cp "$file" "$backup_file"
        echo "Backed up: $file"
    fi
done <<< "$ROUTE_FILES"

# Process each file
echo -e "${YELLOW}🔧 Fixing hardcoded routes...${NC}"

while IFS= read -r file; do
    if [ -n "$file" ]; then
        echo "Processing: $file"
        
        # Check if file already imports ROUTES
        if ! grep -q "import.*ROUTES.*from.*@/config" "$file"; then
            # Add ROUTES import at the top with other imports
            if grep -q "^import.*from" "$file"; then
                # Find the last import and add ROUTES import after it
                sed -i "/^import.*from/a import { ROUTES } from '@/config'" "$file"
            else
                # Add import at the top of the file
                sed -i "1i import { ROUTES } from '@/config'" "$file"
            fi
            echo "  Added ROUTES import"
        fi
        
        # Replace hardcoded routes with ROUTES constants
        for hardcoded_route in "${!ROUTES_MAP[@]}"; do
            route_constant="${ROUTES_MAP[$hardcoded_route]}"
            if grep -q "$hardcoded_route" "$file"; then
                sed -i "s|$hardcoded_route|{$route_constant}|g" "$file"
                echo "  Replaced $hardcoded_route with {$route_constant}"
            fi
        done
        
        # Fix router.push and router.replace calls
        sed -i 's|router\.push("/\([^"]*\)")|router.push(ROUTES.\1)|g' "$file"
        sed -i 's|router\.replace("/\([^"]*\)")|router.replace(ROUTES.\1)|g' "$file"
        
        # Fix pathname comparisons
        sed -i 's|pathname === "/\([^"]*\)"|pathname === ROUTES.\1|g' "$file"
        sed -i 's|asPath === "/\([^"]*\)"|asPath === ROUTES.\1|g' "$file"
    fi
done <<< "$ROUTE_FILES"

echo -e "${GREEN}✅ Route fixing completed!${NC}"

# Verify the changes
echo -e "${YELLOW}🔍 Verifying fixes...${NC}"
REMAINING_VIOLATIONS=$(grep -r "href=\"/[^h]\|router\.push(\"/\|router\.replace(\"/\|pathname === \"/[^a]\|asPath === \"/" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | grep -v "href=\"/api\|href=\"http" | wc -l)

echo -e "${GREEN}📊 Violations remaining: $REMAINING_VIOLATIONS${NC}"
echo -e "${GREEN}📊 Violations fixed: $((TOTAL_VIOLATIONS - REMAINING_VIOLATIONS))${NC}"
echo -e "${GREEN}💾 Backup created at: $BACKUP_DIR${NC}"

if [ "$REMAINING_VIOLATIONS" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Some routes may need manual review:${NC}"
    grep -r "href=\"/[^h]\|router\.push(\"/\|router\.replace(\"/\|pathname === \"/[^a]\|asPath === \"/" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | grep -v "href=\"/api\|href=\"http" | head -10
fi

# Check if ROUTES config exists
if [ ! -f "src/config/routes.ts" ]; then
    echo -e "${RED}⚠️  ROUTES configuration file not found!${NC}"
    echo "You need to create src/config/routes.ts with route constants."
    echo "Example structure:"
    echo "export const ROUTES = {"
    echo "  home: '/',"
    echo "  about: '/about',"
    echo "  events: '/events',"
    echo "  // ... more routes"
    echo "};"
fi

echo ""
echo -e "${GREEN}🎉 Route fixing complete!${NC}"
echo "Next steps:"
echo "1. Review the changes: git diff"
echo "2. Ensure src/config/routes.ts exists and has all routes"
echo "3. Test the application: npm run dev"
echo "4. Commit the changes if everything looks good"