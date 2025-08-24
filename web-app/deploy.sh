#!/bin/bash

# LusoTown Vercel Deployment Script
# Run this script locally after authentication

set -e

echo "🚀 LusoTown Vercel Deployment Script"
echo "====================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the web-app directory"
    echo "   cd web-app && ./deploy.sh"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "🔑 Please login to Vercel..."
    vercel login
fi

# Install dependencies
echo "📦 Installing dependencies..."
PUPPETEER_SKIP_DOWNLOAD=true npm install --no-optional

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to production
echo "🚀 Deploying to Vercel production..."
vercel --prod

echo ""
echo "✅ Deployment Complete!"
echo "🌐 Your LusoTown platform is now live!"
echo ""
echo "📋 Next steps:"
echo "1. Configure environment variables in Vercel dashboard"
echo "2. Set up custom domain if desired"
echo "3. Test all features on the live site"
echo ""
echo "🎉 Welcome to production!"