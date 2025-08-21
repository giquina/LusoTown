#!/usr/bin/env node

/**
 * Targeted i18n extraction for critical components
 */

const fs = require('fs');
const path = require('path');

// Target files for initial extraction
const TARGET_FILES = [
  './src/components/AboutLusoTown.tsx',
  './src/components/Header.tsx', 
  './src/components/Footer.tsx',
  './src/components/SafetyCenter.tsx',
  './src/components/WelcomeBanner.tsx',
  './src/app/about/page.tsx',
  './src/app/pricing/page.tsx',
  './src/app/page.tsx'
];

// Import the main extraction logic
const extractionModule = require('./scripts/codemods/extract-i18n.js');

// Override the processFiles function temporarily
const originalProcessFiles = extractionModule.processFiles;

function processTargetFiles() {
  const files = [];
  
  for (const file of TARGET_FILES) {
    if (fs.existsSync(file)) {
      files.push(file);
    } else {
      console.log(`⚠️  Warning: ${file} not found`);
    }
  }
  
  return files;
}

// Temporarily override the function
extractionModule.processFiles = processTargetFiles;

console.log('🎯 Running targeted i18n extraction on critical components...');
console.log(`📁 Target files: ${TARGET_FILES.length}`);
console.log('');

// Run the extraction
extractionModule.main();