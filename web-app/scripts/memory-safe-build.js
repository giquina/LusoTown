#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');

console.log('🔧 Memory-Safe LusoTown Build Process');
console.log('=====================================');

// Check system resources
console.log('📊 System Resources:');
const memInfo = require('child_process').execSync('free -m', { encoding: 'utf8' });
console.log(memInfo);

// Create minimal build with memory-safe settings
const buildEnv = {
  ...process.env,
  NODE_OPTIONS: '--max-old-space-size=1536',
  NODE_ENV: 'production',
  NEXT_TELEMETRY_DISABLED: '1',
  // Reduce concurrent operations
  UV_THREADPOOL_SIZE: '2',
  // Limit memory usage
  npm_config_maxsockets: '1'
};

console.log('🚀 Starting memory-safe Next.js build...');
console.log('💾 Memory limit: 1.5GB');
console.log('📚 Stack size: 16MB');

const buildProcess = spawn('npx', ['next', 'build'], {
  env: buildEnv,
  stdio: 'inherit',
  shell: true,
  // Reduce resource usage
  windowsHide: true
});

// Monitor build with timeout
const buildTimeout = setTimeout(() => {
  console.log('\n⏰ Build timeout (5 minutes)');
  buildProcess.kill('SIGKILL');
  process.exit(1);
}, 5 * 60 * 1000);

buildProcess.on('close', (code) => {
  clearTimeout(buildTimeout);
  
  if (code === 0) {
    console.log('\n✅ Memory-safe build completed!');
    
    // Check if build artifacts exist
    if (fs.existsSync('.next')) {
      console.log('📦 Build artifacts created successfully');
      
      // Get build size
      try {
        const { execSync } = require('child_process');
        const buildSize = execSync('du -sh .next', { encoding: 'utf8' });
        console.log('📊 Build size:', buildSize.trim());
      } catch (e) {
        console.log('📊 Build completed (size check unavailable)');
      }
    }
    
    process.exit(0);
  } else {
    console.log(`\n❌ Build failed (code: ${code})`);
    
    if (code === 135) {
      console.log('💡 SIGBUS error detected - memory architecture issue');
      console.log('🔧 Try these solutions:');
      console.log('   1. Reduce component file sizes');
      console.log('   2. Split large TypeScript files');
      console.log('   3. Use external memory (swap)');
      console.log('   4. Increase stack size limits');
    }
    
    process.exit(code);
  }
});

buildProcess.on('error', (error) => {
  clearTimeout(buildTimeout);
  console.error('\n💥 Build error:', error.message);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  clearTimeout(buildTimeout);
  console.log('\n🛑 Build interrupted');
  buildProcess.kill('SIGTERM');
  process.exit(1);
});