#!/usr/bin/env node

/**
 * Limited i18n extraction test - just about page
 */

const fs = require('fs');

// Configuration for single file test
const CONFIG = {
  sourceDir: './src/app/about',
  i18nDir: './src/i18n',
  dryRun: process.argv.includes('--dry-run'),
  verbose: true
};

// Copy and simplify the extraction logic
const { main: fullMain } = require('./scripts/codemods/extract-i18n.js');

// Override the configuration in the extraction script
const originalConfig = require('./scripts/codemods/extract-i18n.js');

// Temporarily modify CONFIG for single file test
function testAboutPageOnly() {
  console.log('🧪 Testing i18n extraction on about page only...\n');
  
  // Backup original files
  const aboutPath = './src/app/about/page.tsx';
  const aboutBackup = fs.readFileSync(aboutPath, 'utf8');
  
  const enPath = './src/i18n/en.json';
  const ptPath = './src/i18n/pt.json';
  
  let enBackup = '';
  let ptBackup = '';
  
  try {
    enBackup = fs.readFileSync(enPath, 'utf8');
    ptBackup = fs.readFileSync(ptPath, 'utf8');
  } catch (e) {
    console.log('Note: Translation files will be created');
  }
  
  try {
    // Mock process.argv for the extraction script
    const originalArgv = process.argv;
    process.argv = ['node', 'script'];
    if (CONFIG.dryRun) process.argv.push('--dry-run');
    if (CONFIG.verbose) process.argv.push('--verbose');
    
    // Run the extraction
    const result = fullMain();
    
    console.log('\n🎯 Test Results:');
    console.log(result);
    
    if (!CONFIG.dryRun) {
      console.log('\n📄 Modified about page preview:');
      console.log(fs.readFileSync(aboutPath, 'utf8').substring(0, 1000) + '...');
      
      console.log('\n🇬🇧 English translations added:');
      const newEn = JSON.parse(fs.readFileSync(enPath, 'utf8'));
      Object.keys(newEn).slice(-10).forEach(key => {
        console.log(`  ${key}: "${newEn[key]}"`);
      });
    }
    
    // Restore process.argv
    process.argv = originalArgv;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    
    // Restore files on error
    if (!CONFIG.dryRun) {
      fs.writeFileSync(aboutPath, aboutBackup);
      if (enBackup) fs.writeFileSync(enPath, enBackup);
      if (ptBackup) fs.writeFileSync(ptPath, ptBackup);
    }
  }
}

testAboutPageOnly();