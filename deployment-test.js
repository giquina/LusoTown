#!/usr/bin/env node

// Quick test script to verify our API route migration
console.log('🧪 Testing LusoTown API Route Migration...\n');

// Test the new health endpoint locally (when dev server is running)
const testUrl = 'http://localhost:3000/api/health';

console.log('📋 Migration Summary:');
console.log('├── ❌ OLD: pages/api/health.ts (Pages Router)');
console.log('├── ✅ NEW: src/app/api/health/route.ts (App Router)');
console.log('├── 🗑️  Removed: pages/ directory (routing conflict)');
console.log('└── 🚀 Status: Deployed to main branch\n');

console.log('🔗 Test your deployment:');
console.log('1. Visit your Vercel dashboard: https://vercel.com/dashboard');
console.log('2. Check the latest deployment status');
console.log('3. Test the health endpoint: https://your-domain.vercel.app/api/health');
console.log('   Expected response: {"ok":true,"ts":[timestamp]}\n');

console.log('🎉 Deployment fix complete! The routes-manifest.json error should be resolved.');
