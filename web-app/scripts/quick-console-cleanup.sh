#!/bin/bash

# Quick Console.log Cleanup Script for LusoTown
# Removes development console.log statements from production code

echo "🧹 Starting Console.log Cleanup..."

# Find all console.log statements
echo "📍 Finding console.log statements..."
CONSOLE_FILES=$(grep -r "console\.log" src/ --include="*.ts" --include="*.tsx" -l | head -20)

if [ -z "$CONSOLE_FILES" ]; then
    echo "✅ No console.log statements found!"
    exit 0
fi

echo "Found console.log in these files:"
echo "$CONSOLE_FILES"
echo ""

# Count total occurrences
TOTAL_COUNT=$(grep -r "console\.log" src/ --include="*.ts" --include="*.tsx" | wc -l)
echo "📊 Total console.log statements: $TOTAL_COUNT"

# Create backup
BACKUP_DIR="./backups/console-cleanup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "💾 Creating backup in $BACKUP_DIR"

# Process each file
for file in $CONSOLE_FILES; do
    echo "🔧 Processing $file..."
    
    # Create backup
    cp "$file" "$BACKUP_DIR/"
    
    # Remove console.log lines (simple removal)
    sed -i '/console\.log(/d' "$file"
    
    # Count removals
    REMOVED=$(grep -c "console\.log" "$BACKUP_DIR/$(basename $file)" 2>/dev/null || echo "0")
    if [ "$REMOVED" -gt 0 ]; then
        echo "   ✅ Removed $REMOVED console.log statements"
    fi
done

echo ""
echo "🎉 Console.log cleanup complete!"
echo "📁 Backups saved to: $BACKUP_DIR"
echo ""
echo "🧪 Next steps:"
echo "1. Test the application to ensure nothing broke"
echo "2. Run: npm run lint"
echo "3. Run: npm run build"
echo "4. If all good, commit the changes"
echo ""
echo "📋 To revert if needed:"
echo "   cp $BACKUP_DIR/* src/path/to/files/"