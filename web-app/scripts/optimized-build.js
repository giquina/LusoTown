#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting optimized LusoTown build process...');

// Clean previous build artifacts
console.log('🧹 Cleaning build artifacts...');
const cleanDirs = ['.next', 'out', 'dist'];
cleanDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`   Cleaned: ${dir}`);
  }
});

// Clean TypeScript build info
const tsFiles = ['tsconfig.tsbuildinfo', 'tsconfig.build.tsbuildinfo', 'tsconfig.components.tsbuildinfo'];
tsFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`   Cleaned: ${file}`);
  }
});

// Set optimized Node.js options for Portuguese-speaking community platform
const nodeOptions = [
  '--max-old-space-size=4096',    // 4GB heap limit  
  '--max-semi-space-size=512',    // Optimize new space size
  '--expose-gc'                   // Enable manual garbage collection
];

console.log('⚙️  Node.js optimization settings:');
nodeOptions.forEach(opt => console.log(`   ${opt}`));

// Build environment variables
const buildEnv = {
  ...process.env,
  NODE_OPTIONS: nodeOptions.join(' '),
  NODE_ENV: 'production',
  NEXT_TELEMETRY_DISABLED: '1',
  // Portuguese-speaking community specific optimizations
  NEXT_PRIVATE_STANDALONE: '1',
  NEXT_PRIVATE_DEBUG_CACHE: '1'
};

console.log('\n🏗️  Starting Next.js production build...');

const buildProcess = spawn('next', ['build'], {
  env: buildEnv,
  stdio: 'inherit',
  shell: true
});

let buildTimeout;

// Set build timeout for Portuguese-speaking community platform (8 minutes max)
buildTimeout = setTimeout(() => {
  console.log('\n⏰ Build timeout reached (8 minutes). Terminating...');
  buildProcess.kill('SIGTERM');
  
  setTimeout(() => {
    console.log('🔪 Force killing build process...');
    buildProcess.kill('SIGKILL');
    process.exit(1);
  }, 5000);
}, 8 * 60 * 1000);

buildProcess.on('close', (code) => {
  clearTimeout(buildTimeout);
  
  if (code === 0) {
    console.log('\n✅ LusoTown build completed successfully!');
    console.log('🎯 Portuguese-speaking community platform ready for deployment');
    
    // Display build statistics
    try {
      const buildManifest = path.join('.next', 'build-manifest.json');
      if (fs.existsSync(buildManifest)) {
        const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'));
        const pageCount = Object.keys(manifest.pages || {}).length;
        console.log(`📊 Build statistics: ${pageCount} pages generated`);
      }
    } catch (error) {
      console.log('📊 Build statistics not available');
    }
    
    process.exit(0);
  } else {
    console.log(`\n❌ Build failed with exit code: ${code}`);
    console.log('🔧 Check the error messages above for troubleshooting');
    process.exit(code);
  }
});

buildProcess.on('error', (error) => {
  clearTimeout(buildTimeout);
  console.error('\n💥 Build process error:', error.message);
  process.exit(1);
});

// Handle process termination
process.on('SIGINT', () => {
  clearTimeout(buildTimeout);
  console.log('\n🛑 Build interrupted by user');
  buildProcess.kill('SIGTERM');
  process.exit(1);
});

process.on('SIGTERM', () => {
  clearTimeout(buildTimeout);
  console.log('\n🛑 Build terminated');
  buildProcess.kill('SIGTERM');
  process.exit(1);
});