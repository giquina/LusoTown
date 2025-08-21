#!/usr/bin/env node

/**
 * Run extraction on specific components one by one
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const COMPONENTS = [
  { file: './src/components/Header.tsx', name: 'Header' },
  { file: './src/components/Footer.tsx', name: 'Footer' }
];

async function extractComponent(component) {
  console.log(`\n🔧 Extracting strings from ${component.name}...`);
  
  if (!fs.existsSync(component.file)) {
    console.log(`❌ File not found: ${component.file}`);
    return;
  }
  
  // Backup the file
  const backup = fs.readFileSync(component.file, 'utf8');
  
  try {
    // Modify the extraction script temporarily
    const extractScript = fs.readFileSync('./scripts/codemods/extract-i18n.js', 'utf8');
    const modifiedScript = extractScript.replace(
      'sourceDir: process.argv.includes(\'--about-only\') ? \'./src/components/AboutLusoTown.tsx\' :',
      `sourceDir: '${component.file}'`
    );
    
    fs.writeFileSync('./scripts/codemods/extract-i18n-temp.js', modifiedScript);
    
    // Run extraction
    const result = execSync('node scripts/codemods/extract-i18n-temp.js', { 
      encoding: 'utf8',
      cwd: process.cwd()
    });
    
    console.log(result);
    
    // Clean up temp script
    fs.unlinkSync('./scripts/codemods/extract-i18n-temp.js');
    
  } catch (error) {
    console.error(`❌ Error extracting from ${component.name}:`, error.message);
    // Restore backup
    fs.writeFileSync(component.file, backup);
  }
}

async function main() {
  console.log('🎯 Extracting strings from specific components...\n');
  
  for (const component of COMPONENTS) {
    await extractComponent(component);
  }
  
  console.log('\n✅ Component extraction complete!');
}

main();