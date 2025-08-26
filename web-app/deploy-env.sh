#!/bin/bash
# Deploy environment variables to Vercel
echo "Setting up Vercel environment variables..."

# Set Supabase variables
echo "https://tukocypkjtguqbicjpvc.supabase.co" | npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1a29jeXBranRndXFiaWNqcHZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMTY0NTIsImV4cCI6MjA2NjU5MjQ1Mn0.1R7kHUCgRj6V311PPjIroymfzcaMlwe7Wm5W2aYQLm8" | npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

# Set app variables
echo "LusoTown" | npx vercel env add NEXT_PUBLIC_BRAND_NAME production

echo "✅ Environment variables configured!"
echo "Now run: npm run deploy"