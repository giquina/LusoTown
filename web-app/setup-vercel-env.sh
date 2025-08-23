#!/bin/bash

# 🚀 Vercel Environment Variables Setup Script
# This script helps you set up all necessary environment variables for LusoTown deployment

set -e

echo "🔐 LusoTown Vercel Environment Setup"
echo "======================================"

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "📋 Setting up essential environment variables..."

# Essential variables for deployment
echo "Setting NEXT_PUBLIC_SUPABASE_URL..."
read -p "Enter your Supabase URL (or press Enter for placeholder): " SUPABASE_URL
SUPABASE_URL=${SUPABASE_URL:-"https://placeholder.supabase.co"}

echo "Setting NEXT_PUBLIC_SUPABASE_ANON_KEY..."
read -p "Enter your Supabase Anon Key (or press Enter for placeholder): " SUPABASE_ANON_KEY
SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY:-"placeholder-key"}

echo "Setting demo credentials..."
DEMO_EMAIL="demo@lusotown.com"
DEMO_PASSWORD="LusoTown2025!"
ADMIN_EMAIL_DOMAIN="lusotown.com"

echo "🔧 Adding variables to Vercel..."

# Set environment variables for all environments
vercel env add NEXT_PUBLIC_SUPABASE_URL production <<< "$SUPABASE_URL"
vercel env add NEXT_PUBLIC_SUPABASE_URL preview <<< "$SUPABASE_URL"
vercel env add NEXT_PUBLIC_SUPABASE_URL development <<< "$SUPABASE_URL"

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production <<< "$SUPABASE_ANON_KEY"
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview <<< "$SUPABASE_ANON_KEY"
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development <<< "$SUPABASE_ANON_KEY"

vercel env add DEMO_EMAIL production <<< "$DEMO_EMAIL"
vercel env add DEMO_EMAIL preview <<< "$DEMO_EMAIL"
vercel env add DEMO_EMAIL development <<< "$DEMO_EMAIL"

vercel env add DEMO_PASSWORD production <<< "$DEMO_PASSWORD"
vercel env add DEMO_PASSWORD preview <<< "$DEMO_PASSWORD"
vercel env add DEMO_PASSWORD development <<< "$DEMO_PASSWORD"

vercel env add ADMIN_EMAIL_DOMAIN production <<< "$ADMIN_EMAIL_DOMAIN"
vercel env add ADMIN_EMAIL_DOMAIN preview <<< "$ADMIN_EMAIL_DOMAIN"
vercel env add ADMIN_EMAIL_DOMAIN development <<< "$ADMIN_EMAIL_DOMAIN"

# Optional: Community metrics
vercel env add NEXT_PUBLIC_TOTAL_MEMBERS production <<< "750"
vercel env add NEXT_PUBLIC_TOTAL_STUDENTS production <<< "2150"
vercel env add NEXT_PUBLIC_UNIVERSITY_PARTNERSHIPS production <<< "8"

echo "✅ Environment variables configured!"
echo ""
echo "🚀 Ready to deploy!"
echo "Run: vercel --prod"
echo ""
echo "📋 Configured variables:"
echo "  - NEXT_PUBLIC_SUPABASE_URL: $SUPABASE_URL"
echo "  - NEXT_PUBLIC_SUPABASE_ANON_KEY: ${SUPABASE_ANON_KEY:0:8}..."
echo "  - DEMO_EMAIL: $DEMO_EMAIL"
echo "  - ADMIN_EMAIL_DOMAIN: $ADMIN_EMAIL_DOMAIN"
echo ""
echo "🎯 After deployment, your platform will be available at:"
echo "   https://luso-town-[hash].vercel.app"
echo ""
echo "🔐 Demo access:"
echo "   Email: demo@lusotown.com"
echo "   Password: LusoTown2025!"