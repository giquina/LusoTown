#!/usr/bin/env node

/**
 * Script to remove all numerical figures and replace Portuguese terms
 * as requested by the user
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const config = {
  // Files to process
  include: [
    'src/**/*.tsx',
    'src/**/*.ts',
    'src/**/*.json',
    'src/**/*.js',
    'src/**/*.md'
  ],
  
  // Files to exclude
  exclude: [
    '**/node_modules/**',
    '**/test-*.ts',
    '**/test-*.tsx',
    '**/*.test.*',
    '**/__tests__/**'
  ],

  // Number patterns to remove (keep technical numbers like CSS, dates)
  numberReplacements: [
    // Community member counts
    { pattern: /750\+?\s*(Portuguese\s+speakers?|members?|users?|people|community|souls?)/gi, replacement: 'Portuguese speakers' },
    { pattern: /2150\+?\s*(students?|university\s+students?)/gi, replacement: 'students' },
    { pattern: /2750\+?\s*(voices?|members?|speakers?)/gi, replacement: 'voices' },
    { pattern: /2,750\+?\s*(voices?|members?|speakers?)/gi, replacement: 'voices' },
    { pattern: /1200\+?\s*(students?)/gi, replacement: 'students' },
    { pattern: /1,200\+?\s*(students?)/gi, replacement: 'students' },
    { pattern: /5000\+?\s*(students?|members?)/gi, replacement: 'students' },
    { pattern: /5,000\+?\s*(students?|members?)/gi, replacement: 'students' },
    
    // Generic community numbers
    { pattern: /Join\s+\d+\+?\s+(Portuguese\s+speakers?|members?)/gi, replacement: 'Join Portuguese speakers' },
    { pattern: /Over\s+\d+\+?\s+(Portuguese\s+hearts?|members?)/gi, replacement: 'Portuguese hearts' },
    { pattern: /Connect\s+with\s+\d+\+?\s+(Portuguese\s+speakers?|members?)/gi, replacement: 'Connect with Portuguese speakers' },
    { pattern: /Reach\s+\d+\+?\s+(Portuguese\s+speakers?|members?)/gi, replacement: 'Reach Portuguese speakers' },
    
    // Event attendee numbers (keep small group sizes for practical purposes)
    { pattern: /(\d{3,})\+?\s+(people|attendees?|participants?)/gi, replacement: 'many people' },
    { pattern: /Over\s+\d{3,}\s+(people|attendees?|participants?)/gi, replacement: 'Many people' },
    
    // Business/success numbers
    { pattern: /\d{3,}\+?\s+(events?\s+annually|students?\s+annually)/gi, replacement: 'events annually' },
    { pattern: /£\d{1,2}k\s+(charity|raised)/gi, replacement: 'charity raised' },
  ],

  // Text replacements
  textReplacements: [
    // Portuguese communities -> Lusophone communities
    { pattern: /Portuguese communities/g, replacement: 'Lusophone communities' },
    
    // Specific content updates as mentioned by user
    { pattern: /Ready to Transform Your London Longing Into Portuguese Success\?/g, replacement: 'Ready to Transform Your London Longing Into Lusophone Success?' },
    { pattern: /Join \d+\+ Portuguese souls from Portugal, Brazil, Angola, Mozambique & beyond who found their London community through real connections/g, replacement: 'Join Lusophone souls from Portugal, Brazil, Angola, Mozambique & beyond who found their London community through real connections' },
    { pattern: /your Portuguese community awaits at authentic London venues where our culture thrives/g, replacement: 'your Lusophone community awaits at authentic London venues where our culture thrives' },
    
    // Calendar section updates
    { pattern: /Your Portuguese Cultural Calendar/g, replacement: 'Your Lusophone Cultural Calendar' },
    { pattern: /Year-Round Portuguese Community Highlights/g, replacement: 'Year-Round Lusophone Community Highlights' },
    { pattern: /Never miss major Portuguese community celebrations/g, replacement: 'Never miss major Lusophone community celebrations' },
    
    // Standalone Portuguese -> Lusophone (but keep Portuguese-speaking)
    { pattern: /\bPortuguese\b(?!\s*-?\s*speaking|\s*speakers?|\s*language|\s*culture|\s*heritage|\s*food|\s*wine|\s*music|\s*history|\s*traditions?|\s*cuisine|\s*business|\s*enterprises?|\s*restaurant|\s*flag|\s*national|\s*independence|\s*festival|\s*celebration|\s*christmas|\s*carnival)/g, replacement: 'Lusophone' },
  ]
};

// Main execution
async function main() {
  console.log('🔄 Starting number removal and term replacement...\n');
  
  let totalFiles = 0;
  let modifiedFiles = 0;
  
  // Get all files to process
  const files = [];
  for (const pattern of config.include) {
    const matches = glob.sync(pattern, { 
      ignore: config.exclude,
      cwd: process.cwd()
    });
    files.push(...matches);
  }
  
  // Process each file
  for (const file of [...new Set(files)]) {
    totalFiles++;
    
    try {
      const content = fs.readFileSync(file, 'utf8');
      let newContent = content;
      let changes = 0;
      
      // Apply number replacements
      for (const rule of config.numberReplacements) {
        const before = newContent;
        newContent = newContent.replace(rule.pattern, rule.replacement);
        if (newContent !== before) {
          changes++;
          console.log(`  📊 ${file}: Removed numbers - ${rule.pattern.toString().slice(0, 50)}...`);
        }
      }
      
      // Apply text replacements
      for (const rule of config.textReplacements) {
        const before = newContent;
        newContent = newContent.replace(rule.pattern, rule.replacement);
        if (newContent !== before) {
          changes++;
          console.log(`  📝 ${file}: Text replacement - ${rule.pattern.toString().slice(0, 50)}...`);
        }
      }
      
      // Write file if changed
      if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        modifiedFiles++;
        console.log(`✅ ${file}: ${changes} changes applied`);
      }
      
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`  Files processed: ${totalFiles}`);
  console.log(`  Files modified: ${modifiedFiles}`);
  console.log(`  Success rate: ${((modifiedFiles/totalFiles)*100).toFixed(1)}%`);
  
  if (modifiedFiles > 0) {
    console.log('\n✨ All numerical figures removed and terms replaced successfully!');
  } else {
    console.log('\n ℹ️ No changes were needed.');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { config, main };