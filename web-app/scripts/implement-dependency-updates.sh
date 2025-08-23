#!/bin/bash

# LusoTown Dependency Update Implementation Script
# Priority: CRITICAL - Portuguese Community Platform Stability

set -e

echo "🇵🇹 LusoTown Dependency Update Implementation"
echo "================================================"

# Phase 1: Critical Security & Stability Updates
echo "\n📦 Phase 1: Critical Updates"
echo "----------------------------"

# Clean npm cache to resolve conflicts
echo "Cleaning npm cache..."
npm cache clean --force

# Remove problematic lock file and node_modules
echo "Cleaning installation..."
rm -rf node_modules package-lock.json

# Reinstall with latest compatible versions
echo "Reinstalling dependencies..."
npm install

# Update critical packages individually
echo "\n🔒 Updating security-critical packages..."
npm install @supabase/supabase-js@latest
npm install @testing-library/jest-dom@latest
npm install react-hot-toast@latest
npm install redis@latest
npm install puppeteer@latest

# Update TypeScript definitions
echo "\n📝 Updating TypeScript definitions..."
npm install @types/node@latest
npm install @types/react@latest
npm install eslint-config-next@latest

# Phase 2: Performance & Feature Updates
echo "\n⚡ Phase 2: Performance Updates"
echo "-------------------------------"

# Update animation library (used extensively in Portuguese cultural features)
echo "Updating framer-motion for Portuguese cultural animations..."
npm install framer-motion@latest

# Update icon library
echo "Updating lucide-react for Portuguese UI icons..."
npm install lucide-react@latest

# Phase 3: Development Tools
echo "\n🛠️  Phase 3: Development Tools"
echo "-----------------------------"

# Update Playwright for Portuguese content E2E testing
echo "Updating Playwright for Portuguese E2E testing..."
npx playwright install

# Phase 4: Verification
echo "\n✅ Phase 4: Verification"
echo "------------------------"

# Run security audit
echo "Running security audit..."
npm audit --audit-level=high

# Verify installation
echo "Verifying installation..."
npm ls --depth=0

# Test critical functionality
echo "\n🧪 Testing Portuguese Platform Features"
echo "---------------------------------------"

# Type check
echo "TypeScript compilation check..."
npx tsc --noEmit

# Lint check
echo "ESLint validation..."
npm run lint

# Build check
echo "Production build check..."
npm run build

# Portuguese-specific tests
echo "Portuguese language feature tests..."
npm run test:portuguese

# Mobile UX tests (Portuguese users are mobile-heavy)
echo "Mobile UX validation..."
npm run test:mobile-ux

echo "\n🎉 Dependency Update Complete!"
echo "==============================="
echo "✅ All critical packages updated"
echo "✅ Security vulnerabilities resolved"
echo "✅ Portuguese cultural features tested"
echo "✅ Mobile experience validated"
echo "✅ Production build verified"

echo "\n📊 Next Steps:"
echo "- Monitor platform performance"
echo "- Schedule Next.js 15 migration"
echo "- Plan React 19 upgrade"
echo "- Continue monthly dependency audits"

echo "\n🇵🇹 Portuguese Community Platform: Ready for 750+ members!"