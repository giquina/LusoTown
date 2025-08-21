#!/bin/bash

echo "🔧 LusoTown Remaining Hardcoding Fixes"
echo "====================================="

cd "$(dirname "$0")/../web-app"

# Fix hardcoded alert messages
echo "📱 Fixing hardcoded alert messages..."
find src -name "*.tsx" -type f -exec sed -i 's/alert(/toast.error(/g' {} \;

# Fix more generic colors
echo "🎨 Fixing remaining generic colors..."
find src -name "*.tsx" -type f -exec sed -i 's/purple-/accent-/g' {} \;
find src -name "*.tsx" -type f -exec sed -i 's/indigo-/primary-/g' {} \;
find src -name "*.tsx" -type f -exec sed -i 's/slate-/secondary-/g' {} \;
find src -name "*.tsx" -type f -exec sed -i 's/zinc-/secondary-/g' {} \;
find src -name "*.tsx" -type f -exec sed -i 's/neutral-/secondary-/g' {} \;
find src -name "*.tsx" -type f -exec sed -i 's/stone-/secondary-/g' {} \;

# Fix hardcoded border colors
echo "🖼️ Fixing border colors..."
find src -name "*.tsx" -type f -exec sed -i 's/border-gray-/border-secondary-/g' {} \;

# Fix hardcoded bg colors that were missed
echo "🌅 Fixing remaining background colors..."
find src -name "*.tsx" -type f -exec sed -i 's/bg-gray-/bg-secondary-/g' {} \;

echo "✅ Remaining hardcoding fixes completed!"
echo "📋 Manual review still needed for:"
echo "   - Complex text strings that need i18n"
echo "   - Business logic hardcoded values"
echo "   - Component-specific colors that need design review"