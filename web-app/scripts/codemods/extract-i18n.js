#!/usr/bin/env node

/**
 * LusoTown i18n String Extraction Codemod
 * 
 * Automatically extracts hardcoded string literals from JSX/TSX files
 * and replaces them with t('key') function calls, generating translation keys.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  sourceDir: process.argv.includes('--about-only') ? './src/components/AboutLusoTown.tsx' : './src',
  i18nDir: './src/i18n',
  excludePatterns: [
    '*.test.tsx',
    '*.test.ts',
    '*.config.js',
    '*.config.ts',
    'i18n/*.json',
    'node_modules/*'
  ],
  dryRun: process.argv.includes('--dry-run'),
  verbose: process.argv.includes('--verbose')
};

// Translation key generation
let extractedStrings = new Map(); // string -> key
let usageCount = new Map(); // key -> count
let componentKeys = new Map(); // component -> Set<keys>

/**
 * Generate a semantic translation key from string and context
 */
function generateTranslationKey(text, context) {
  // Clean the text for key generation
  const cleanText = text
    .replace(/[^\w\s]/g, '') // Remove special chars
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .toLowerCase()
    .substring(0, 30); // Limit length

  // Determine context-based prefix
  let prefix = 'common';
  
  if (context.filePath.includes('/components/')) {
    const componentName = path.basename(context.filePath, '.tsx').replace(/([A-Z])/g, '_$1').toLowerCase().substring(1);
    prefix = `components.${componentName}`;
  } else if (context.filePath.includes('/app/')) {
    const pageName = context.filePath.split('/app/')[1].split('/')[0];
    prefix = `pages.${pageName}`;
  } else if (context.filePath.includes('/context/')) {
    prefix = 'context';
  }

  // Generate semantic suffix based on content
  let suffix = 'text';
  if (text.match(/^\w+$/)) suffix = 'label';
  if (text.includes('?')) suffix = 'question';
  if (text.includes('!')) suffix = 'exclamation';
  if (text.match(/^(Get|Start|Join|Learn|Discover|Find)/i)) suffix = 'cta';
  if (text.match(/^(Title|Heading)/i)) suffix = 'title';
  if (text.match(/^(Description|About|Details)/i)) suffix = 'description';
  if (text.length > 100) suffix = 'description';

  const baseKey = `${prefix}.${cleanText}_${suffix}`;
  
  // Handle duplicates by adding numbers
  let finalKey = baseKey;
  let counter = 1;
  while (extractedStrings.has(finalKey) && extractedStrings.get(finalKey) !== text) {
    finalKey = `${baseKey}_${counter}`;
    counter++;
  }

  return finalKey;
}

/**
 * Check if a string should be extracted
 */
function shouldExtractString(text, context) {
  // Skip if too short or too long
  if (text.length < 3 || text.length > 500) return false;
  
  // Skip comments and technical strings
  if (text.match(/^\/\*.*\*\/$/)) return false; // Block comments
  if (text.match(/^\/\/.*$/)) return false; // Line comments
  if (text.match(/^{\/\*.*\*\/}$/)) return false; // JSX comments
  
  // Skip CSS classes and Tailwind utilities
  if (text.match(/^[\w-]+$/) && (text.includes('-') || text.match(/^\d+$/))) return false;
  if (text.match(/^(opacity|translate|scale|rotate|skew|transform|shadow|from|to|via|gradient)-/)) return false;
  if (text.match(/^(bg|text|border|ring|shadow|p|m|w|h|max|min|flex|grid|gap|space)-/)) return false;
  if (text.match(/^[A-Z_]+$/)) return false; // Constants
  if (text.match(/^[a-z]+([A-Z][a-z]*)*$/)) return false; // camelCase
  if (text.match(/^[\w-]+\.[\w-]+/)) return false; // file.ext
  
  // Skip imports and technical paths
  if (text.match(/^[@\/]/) || text.includes('/')) return false;
  
  // Skip URLs, emails, and technical patterns
  if (text.match(/^https?:\/\//)) return false;
  if (text.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) return false;
  if (text.match(/^#[0-9a-fA-F]{3,6}$/)) return false; // Hex colors
  
  // Skip single characters and common abbreviations
  if (text.length === 1) return false;
  if (['API', 'URL', 'ID', 'UI', 'UX', 'FAQ', 'CEO', 'CTO', 'LT'].includes(text.toUpperCase())) return false;
  
  // Skip emoji and special characters only
  if (text.match(/^[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}•·★◦]+$/u)) return false;
  
  // Skip already extracted translations or t() calls
  if (text.match(/^[a-z]+(\.[a-z_]+)+$/)) return false;
  if (text.match(/^t\(['"]/)) return false;
  if (text.match(/^{.*}$/)) return false; // JSX expressions
  
  // Skip patterns that are clearly code or configuration
  if (text.match(/^[A-Z][A-Z_]*$/)) return false; // CONSTANTS
  if (text.match(/^[a-z_]+:[a-z_]+$/)) return false; // css:property
  if (text.match(/^\d+(\.\d+)?(px|em|rem|%|vh|vw)$/)) return false; // CSS units
  
  // Skip React directives and technical strings
  if (text === 'use client' || text === 'use server') return false;
  
  // Must contain at least one letter and have meaningful content
  if (!text.match(/[a-zA-Z]/)) return false;
  
  // Skip whitespace-only or special character only strings
  if (text.trim().length === 0) return false;
  
  // Must be primarily text content - reject if mostly punctuation/symbols
  const alphaRatio = (text.match(/[a-zA-Z]/g) || []).length / text.length;
  if (alphaRatio < 0.5) return false;
  
  return true;
}

/**
 * Extract strings from JSX text nodes and string attributes
 */
function extractStringsFromFile(filePath, content) {
  const context = { filePath };
  const extractedFromFile = [];
  
  // Pattern for JSX text content: >{text}<
  const jsxTextPattern = />([^<>]+)</g;
  let match;
  
  while ((match = jsxTextPattern.exec(content)) !== null) {
    const text = match[1].trim();
    if (shouldExtractString(text, context)) {
      const key = generateTranslationKey(text, context);
      extractedStrings.set(key, text);
      extractedFromFile.push({ type: 'jsx-text', text, key, match: match[0], index: match.index });
    }
  }
  
  // Pattern for string literals in JSX attributes: "text" or 'text'
  const stringLiteralPattern = /(['"])((?:(?!\1)[^\\]|\\.)*)(\1)/g;
  
  while ((match = stringLiteralPattern.exec(content)) !== null) {
    const text = match[2];
    // Skip className, style, and other technical attributes
    const beforeMatch = content.substring(Math.max(0, match.index - 30), match.index);
    if (beforeMatch.match(/(className|style|id|data-|aria-|type|role|key|ref)=$/)) continue;
    
    // Skip strings that are already inside t() function calls
    const beforeLargeMatch = content.substring(Math.max(0, match.index - 100), match.index);
    if (beforeLargeMatch.match(/\bt\(\s*['"]/)) continue;
    
    if (shouldExtractString(text, context)) {
      const key = generateTranslationKey(text, context);
      extractedStrings.set(key, text);
      
      // Check if this is inside an object property (key: "value")
      const isObjectProperty = beforeMatch.match(/\w+:\s*$/);
      const replacement = isObjectProperty ? `t('${key}')` : `{t('${key}')}`;
      
      extractedFromFile.push({ 
        type: 'string-literal', 
        text, 
        key, 
        match: match[0], 
        index: match.index,
        replacement 
      });
    }
  }
  
  return extractedFromFile;
}

/**
 * Apply replacements to file content
 */
function applyReplacements(content, replacements) {
  // Sort by index in reverse order to maintain positions
  replacements.sort((a, b) => b.index - a.index);
  
  let modifiedContent = content;
  let hasUseLanguage = content.includes('useLanguage');
  
  for (const replacement of replacements) {
    const { type, match, key, index, replacement: customReplacement } = replacement;
    
    if (type === 'jsx-text') {
      // Replace >{text}< with >{t('key')}<
      const newContent = `>{t('${key}')}<`;
      modifiedContent = modifiedContent.substring(0, index) + newContent + modifiedContent.substring(index + match.length);
    } else if (type === 'string-literal') {
      // Use custom replacement if provided (for object properties)
      const newContent = customReplacement || `{t('${key}')}`;
      modifiedContent = modifiedContent.substring(0, index) + newContent + modifiedContent.substring(index + match.length);
    }
  }
  
  // Add useLanguage import if needed
  if (replacements.length > 0 && !hasUseLanguage) {
    // Find the import section and add the useLanguage import
    const importPattern = /import\s+{[^}]+}\s+from\s+['"]@\/context\/LanguageContext['"];?\n/;
    const existingImport = modifiedContent.match(importPattern);
    
    if (existingImport) {
      // Update existing import
      const currentImports = existingImport[0].match(/{([^}]+)}/)[1];
      if (!currentImports.includes('useLanguage')) {
        const newImports = currentImports.trim() + ', useLanguage';
        const newImportLine = `import { ${newImports} } from '@/context/LanguageContext';\n`;
        modifiedContent = modifiedContent.replace(importPattern, newImportLine);
      }
    } else {
      // Add new import at the top
      const firstImportMatch = modifiedContent.match(/^import\s+/m);
      if (firstImportMatch) {
        const insertIndex = firstImportMatch.index;
        const newImport = `import { useLanguage } from '@/context/LanguageContext';\n`;
        modifiedContent = modifiedContent.substring(0, insertIndex) + newImport + modifiedContent.substring(insertIndex);
      }
    }
    
    // Add useLanguage hook if component doesn't have it
    const hasUseLanguageCall = modifiedContent.includes('useLanguage()');
    if (!hasUseLanguageCall) {
      // Find the function component body and add the hook
      const componentMatch = modifiedContent.match(/(export\s+default\s+function\s+\w+[^{]*{\s*)/);
      if (componentMatch) {
        const insertIndex = componentMatch.index + componentMatch[0].length;
        const hookLine = '  const { t } = useLanguage();\n\n';
        modifiedContent = modifiedContent.substring(0, insertIndex) + hookLine + modifiedContent.substring(insertIndex);
      }
    }
  }
  
  return modifiedContent;
}

/**
 * Process all TypeScript/TSX files in the source directory
 */
function processFiles() {
  const files = [];
  
  // Handle single file mode
  if (CONFIG.sourceDir.endsWith('.tsx') || CONFIG.sourceDir.endsWith('.ts')) {
    if (fs.existsSync(CONFIG.sourceDir)) {
      files.push(CONFIG.sourceDir);
    }
    return files;
  }
  
  function collectFiles(dir) {
    const entries = fs.readdirSync(dir);
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        collectFiles(fullPath);
      } else if (entry.match(/\.(tsx?|jsx?)$/) && !CONFIG.excludePatterns.some(pattern => 
        fullPath.includes(pattern.replace('*', ''))
      )) {
        files.push(fullPath);
      }
    }
  }
  
  collectFiles(CONFIG.sourceDir);
  return files;
}

/**
 * Update translation files with extracted strings
 */
function updateTranslationFiles() {
  const enPath = path.join(CONFIG.i18nDir, 'en.json');
  const ptPath = path.join(CONFIG.i18nDir, 'pt.json');
  
  // Load existing translations
  let enTranslations = {};
  let ptTranslations = {};
  
  try {
    if (fs.existsSync(enPath)) {
      enTranslations = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    }
    if (fs.existsSync(ptPath)) {
      ptTranslations = JSON.parse(fs.readFileSync(ptPath, 'utf8'));
    }
  } catch (error) {
    console.error('Error reading existing translations:', error);
  }
  
  // Add new translations
  for (const [key, englishText] of extractedStrings) {
    if (!enTranslations[key]) {
      enTranslations[key] = englishText;
    }
    if (!ptTranslations[key]) {
      // Mark for translation
      ptTranslations[key] = `[PT] ${englishText}`;
    }
  }
  
  // Write updated translation files
  if (!CONFIG.dryRun) {
    fs.writeFileSync(enPath, JSON.stringify(enTranslations, null, 2) + '\n');
    fs.writeFileSync(ptPath, JSON.stringify(ptTranslations, null, 2) + '\n');
  }
  
  return { enTranslations, ptTranslations };
}

/**
 * Main execution function
 */
function main() {
  console.log('🌐 LusoTown i18n String Extraction Codemod');
  console.log(`📁 Processing files in: ${CONFIG.sourceDir}`);
  console.log(`🔧 Mode: ${CONFIG.dryRun ? 'DRY RUN' : 'LIVE'}`);
  console.log('');
  
  const files = processFiles();
  console.log(`📄 Found ${files.length} files to process`);
  
  let totalReplacements = 0;
  let modifiedFiles = 0;
  
  for (const filePath of files) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const replacements = extractStringsFromFile(filePath, content);
      
      if (replacements.length > 0) {
        if (CONFIG.verbose) {
          console.log(`\n📝 ${filePath}: ${replacements.length} strings found`);
          replacements.forEach(r => console.log(`  - "${r.text}" -> ${r.key}`));
        }
        
        const modifiedContent = applyReplacements(content, replacements);
        
        if (!CONFIG.dryRun) {
          fs.writeFileSync(filePath, modifiedContent);
        }
        
        totalReplacements += replacements.length;
        modifiedFiles++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  }
  
  // Update translation files
  const { enTranslations, ptTranslations } = updateTranslationFiles();
  
  // Print summary
  console.log('\n📊 Extraction Summary:');
  console.log(`📄 Files processed: ${files.length}`);
  console.log(`📝 Files modified: ${modifiedFiles}`);
  console.log(`🔤 Strings extracted: ${totalReplacements}`);
  console.log(`🔑 Unique keys generated: ${extractedStrings.size}`);
  console.log(`🇬🇧 English translations: ${Object.keys(enTranslations).length}`);
  console.log(`🇵🇹 Portuguese translations: ${Object.keys(ptTranslations).length}`);
  
  if (CONFIG.dryRun) {
    console.log('\n⚠️  This was a dry run. Use without --dry-run to apply changes.');
  } else {
    console.log('\n✅ Extraction complete! Remember to review and update Portuguese translations.');
  }
  
  return {
    filesProcessed: files.length,
    filesModified: modifiedFiles,
    stringsExtracted: totalReplacements,
    uniqueKeys: extractedStrings.size
  };
}

// Run the codemod if called directly
if (require.main === module) {
  main();
}

module.exports = { main, generateTranslationKey, shouldExtractString };