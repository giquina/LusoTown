#!/bin/bash

# LusoTown Portuguese Community Platform - Production Deployment Script
# This script handles the complete production deployment process

set -e

echo "🚀 Starting LusoTown Production Deployment..."
echo "📅 Deployment Date: $(date)"

# Pre-deployment checks
echo "🔍 Running pre-deployment quality checks..."

# 1. Hardcoding audit
echo "📋 Checking for hardcoding violations..."
npm run audit:hardcoding || {
    echo "❌ Hardcoding audit failed. Please fix violations before deployment."
    exit 1
}

# 2. TypeScript compilation
echo "🔧 Checking TypeScript compilation..."
npx tsc --noEmit || {
    echo "❌ TypeScript compilation failed. Please fix type errors."
    exit 1
}

# 3. Linting
echo "✨ Running ESLint checks..."
npm run lint || {
    echo "⚠️  Lint warnings found, but continuing with deployment..."
}

# 4. Production build test
echo "🏗️  Testing production build..."
npm run build || {
    echo "❌ Production build failed. Please fix build errors."
    exit 1
}

# 5. Security audit
echo "🛡️  Running security audit..."
npm audit --audit-level high || {
    echo "⚠️  Security vulnerabilities found, but continuing..."
}

# Environment setup
echo "🌍 Setting up production environment..."
cp .env.production .env.local

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
if command -v vercel &> /dev/null; then
    vercel --prod --yes
    echo "✅ Deployment completed successfully!"
else
    echo "❌ Vercel CLI not found. Please install: npm install -g vercel"
    exit 1
fi

# Post-deployment verification
echo "🔍 Running post-deployment verification..."
DEPLOYMENT_URL="https://lusotown.vercel.app"

# Basic availability check
echo "📡 Checking site availability..."
HTTP_STATUS=$(curl -o /dev/null -s -w "%{http_code}" $DEPLOYMENT_URL)
if [[ $HTTP_STATUS == "200" ]]; then
    echo "✅ Site is accessible (HTTP $HTTP_STATUS)"
else
    echo "⚠️  Site returned HTTP $HTTP_STATUS"
fi

# Portuguese community features check
echo "🇵🇹 Verifying Portuguese community features..."
curl -s "$DEPLOYMENT_URL/api/health" | grep -q "status" && echo "✅ API endpoints functional"

echo "🎉 Production deployment completed!"
echo "🌐 Live URL: $DEPLOYMENT_URL"
echo "📊 Monitor at: https://vercel.com/dashboard"
echo "🔧 Sentry monitoring: https://sentry.io/organizations/lusotown-community/"

