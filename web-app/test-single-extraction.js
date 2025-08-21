#!/usr/bin/env node

/**
 * Test single file i18n extraction
 */

const fs = require('fs');
const path = require('path');

// Import the extraction logic
const { generateTranslationKey, shouldExtractString } = require('./scripts/codemods/extract-i18n.js');

// Test file
const testFile = process.argv[2] || './src/app/about/page.tsx';

function testSingleFile(filePath) {
  console.log(`🧪 Testing i18n extraction on: ${filePath}`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  const context = { filePath };
  
  console.log('\n📄 Original content preview:');
  console.log(content.substring(0, 500) + '...\n');
  
  // Test string extraction patterns
  const jsxTextPattern = />([^<>]+)</g;
  const stringLiteralPattern = /(['"])((?:(?!\1)[^\\]|\\.)*)(\1)/g;
  
  console.log('🔍 Found JSX text strings:');
  let match;
  let jsxCount = 0;
  while ((match = jsxTextPattern.exec(content)) !== null) {
    const text = match[1].trim();
    if (shouldExtractString(text, context)) {
      const key = generateTranslationKey(text, context);
      console.log(`  ✅ "${text}" -> ${key}`);
      jsxCount++;
    } else {
      console.log(`  ❌ "${text}" (skipped)`);
    }
  }
  
  console.log(`\n🔍 Found string literals:`);
  let literalCount = 0;
  stringLiteralPattern.lastIndex = 0;
  while ((match = stringLiteralPattern.exec(content)) !== null) {
    const text = match[2];
    // Skip className, style, and other technical attributes
    const beforeMatch = content.substring(Math.max(0, match.index - 30), match.index);
    if (beforeMatch.match(/(className|style|id|data-|aria-|type|role|key|ref)=$/)) continue;
    
    if (shouldExtractString(text, context)) {
      const key = generateTranslationKey(text, context);
      console.log(`  ✅ "${text}" -> ${key}`);
      literalCount++;
    } else {
      console.log(`  ❌ "${text}" (skipped)`);
    }
  }
  
  console.log(`\n📊 Summary: ${jsxCount} JSX strings + ${literalCount} literals = ${jsxCount + literalCount} total extractable strings`);
}

testSingleFile(testFile);