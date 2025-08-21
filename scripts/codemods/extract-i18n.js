#!/usr/bin/env node

/**
 * LusoTown i18n Extraction Codemod
 * 
 * Automatically extracts hardcoded strings from JSX/TSX files and replaces them
 * with t('key') lookups. Generates entries for both en.json and pt.json.
 * 
 * Usage:
 *   node scripts/codemods/extract-i18n.js [--dry-run] [--path=src/components]
 * 
 * Features:
 * - Extracts text from JSX elements and attributes
 * - Generates semantic keys (e.g., components.SafetyCenter.title)
 * - Preserves existing t() calls
 * - Handles Portuguese cultural context
 * - Creates backup files
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  sourceDir: './src',
  i18nDir: './src/i18n',
  backupDir: './backups/i18n-extraction',
  excludePatterns: [
    '*.test.tsx', '*.test.ts', '*.stories.tsx', '*.d.ts',
    'node_modules', '.next', 'dist', 'coverage'
  ],
  excludeAttributes: [
    'className', 'key', 'id', 'data-', 'aria-', 'role', 'type', 'name', 
    'href', 'src', 'alt', 'placeholder', 'value', 'defaultValue'
  ]
};

// Text patterns to extract
const TEXT_PATTERNS = {
  // JSX text content: <div>Extract this</div>
  jsxText: />\s*([^<>{}\n]+[a-zA-Z]{2,}[^<>{}\n]*)\s*</g,
  
  // JSX attributes: title="Extract this" 
  jsxAttributes: /(title|label|placeholder|alt)=["']([^"']*[a-zA-Z]{3,}[^"']*)["']/g,
  
  // Hardcoded strings that look like UI text
  hardcodedStrings: /["'](?!className|key|id|data-|aria-|role|type|href|src)([^"']*[a-zA-Z]{3,}[^"']*?)["']/g
};

// Key generation helpers
function generateI18nKey(text, context = '') {
  // Clean and normalize text
  const cleaned = text
    .trim()
    .replace(/[^\w\s]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '_')
    .substring(0, 50);
  
  // Generate semantic key based on context
  if (context.includes('components/')) {
    const componentName = context.split('/').pop()?.replace('.tsx', '') || 'component';
    return `components.${componentName}.${cleaned}`;
  }
  
  if (context.includes('app/')) {
    const pageName = context.split('/').pop()?.replace('page.tsx', '') || 'page';
    return `pages.${pageName}.${cleaned}`;
  }
  
  return `common.${cleaned}`;
}

function isValidUIText(text) {
  // Skip if too short, too long, or contains code patterns
  if (text.length < 3 || text.length > 200) return false;
  
  // Skip code patterns
  const codePatterns = [
    /^[a-z]+(-[a-z]+)*$/, // CSS classes
    /^[A-Z_]+$/, // Constants
    /^\d+(\.\d+)?$/, // Numbers
    /^[a-zA-Z]+\([^)]*\)$/, // Function calls
    /^\/[^\/].*/, // Paths
    /^https?:\/\//, // URLs
    /^[#{}\[\]()]/, // Special characters
    /console\./, // Console methods
    /className|onClick|onChange/ // React props
  ];
  
  return !codePatterns.some(pattern => pattern.test(text.trim()));
}

// Main extraction logic
class I18nExtractor {
  constructor(options = {}) {
    this.dryRun = options.dryRun || false;
    this.targetPath = options.path || CONFIG.sourceDir;
    this.extractedStrings = new Map();
    this.backupCreated = false;
  }

  createBackup() {
    if (this.backupCreated || this.dryRun) return;
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(CONFIG.backupDir, timestamp);
    
    if (!fs.existsSync(CONFIG.backupDir)) {
      fs.mkdirSync(CONFIG.backupDir, { recursive: true });
    }
    
    if (!fs.existsSync(backupPath)) {
      fs.mkdirSync(backupPath, { recursive: true });
    }
    
    // Backup source files and i18n files
    execSync(`cp -r ${CONFIG.sourceDir} ${backupPath}/`);
    if (fs.existsSync(CONFIG.i18nDir)) {
      execSync(`cp -r ${CONFIG.i18nDir} ${backupPath}/`);
    }
    
    console.log(`✅ Backup created: ${backupPath}`);
    this.backupCreated = true;
  }

  extractFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const extractions = [];
    const relativePath = path.relative(process.cwd(), filePath);
    
    // Skip if file already uses useLanguage hook
    if (content.includes('useLanguage') && content.includes("t('")) {
      console.log(`⏭️  Skipping ${relativePath} (already i18n enabled)`);
      return { extractions: [], modifiedContent: content };
    }
    
    let modifiedContent = content;
    
    // Extract JSX text content
    let match;
    while ((match = TEXT_PATTERNS.jsxText.exec(content)) !== null) {
      const text = match[1].trim();
      if (isValidUIText(text)) {
        const key = generateI18nKey(text, relativePath);
        extractions.push({ original: match[0], text, key, type: 'jsx-text' });
        
        // Replace in content
        const replacement = match[0].replace(text, `{t('${key}')}`);
        modifiedContent = modifiedContent.replace(match[0], replacement);
      }
    }
    
    // Extract JSX attributes
    TEXT_PATTERNS.jsxAttributes.lastIndex = 0;
    while ((match = TEXT_PATTERNS.jsxAttributes.exec(content)) !== null) {
      const [fullMatch, attrName, text] = match;
      if (isValidUIText(text)) {
        const key = generateI18nKey(text, relativePath);
        extractions.push({ original: fullMatch, text, key, type: 'jsx-attr' });
        
        // Replace in content
        const replacement = `${attrName}={t('${key}')}`;
        modifiedContent = modifiedContent.replace(fullMatch, replacement);
      }
    }
    
    // Add useLanguage import if extractions were made
    if (extractions.length > 0 && !content.includes('useLanguage')) {
      const importMatch = content.match(/^(import.*from ['"][^'"]*['"];?\s*)*/m);
      const importSection = importMatch ? importMatch[0] : '';
      const newImport = "import { useLanguage } from '@/context/LanguageContext';\n";
      
      if (!importSection.includes('useLanguage')) {
        modifiedContent = modifiedContent.replace(
          importSection,
          importSection + newImport
        );
      }
      
      // Add useLanguage hook at component start
      const componentMatch = modifiedContent.match(/(export default function \w+\([^)]*\) \{)/);
      if (componentMatch) {
        const hookLine = '\n  const { t } = useLanguage();\n';
        modifiedContent = modifiedContent.replace(
          componentMatch[1],
          componentMatch[1] + hookLine
        );
      }
    }
    
    return { extractions, modifiedContent };
  }

  processFiles() {
    const files = this.getFilesToProcess();
    let totalExtractions = 0;
    
    console.log(`🔍 Processing ${files.length} files...`);
    
    for (const filePath of files) {
      const { extractions, modifiedContent } = this.extractFromFile(filePath);
      
      if (extractions.length > 0) {
        console.log(`📝 ${path.relative(process.cwd(), filePath)}: ${extractions.length} extractions`);
        totalExtractions += extractions.length;
        
        // Store extractions
        extractions.forEach(extraction => {
          this.extractedStrings.set(extraction.key, extraction.text);
        });
        
        // Write modified file
        if (!this.dryRun) {
          this.createBackup();
          fs.writeFileSync(filePath, modifiedContent);
        }
      }
    }
    
    return totalExtractions;
  }

  updateI18nFiles() {
    if (this.dryRun) {
      console.log('\n🔍 Dry run - would create/update i18n files:');
      this.extractedStrings.forEach((text, key) => {
        console.log(`  ${key}: "${text}"`);
      });
      return;
    }
    
    // Load existing i18n files
    const enPath = path.join(CONFIG.i18nDir, 'en.json');
    const ptPath = path.join(CONFIG.i18nDir, 'pt.json');
    
    let enTranslations = {};
    let ptTranslations = {};
    
    if (fs.existsSync(enPath)) {
      enTranslations = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    }
    
    if (fs.existsSync(ptPath)) {
      ptTranslations = JSON.parse(fs.readFileSync(ptPath, 'utf8'));
    }
    
    // Add new translations
    this.extractedStrings.forEach((text, key) => {
      if (!enTranslations[key]) {
        enTranslations[key] = text;
      }
      
      if (!ptTranslations[key]) {
        // Add placeholder for Portuguese translation
        ptTranslations[key] = `[PT] ${text}`;
      }
    });
    
    // Write updated files
    if (!fs.existsSync(CONFIG.i18nDir)) {
      fs.mkdirSync(CONFIG.i18nDir, { recursive: true });
    }
    
    fs.writeFileSync(enPath, JSON.stringify(enTranslations, null, 2));
    fs.writeFileSync(ptPath, JSON.stringify(ptTranslations, null, 2));
    
    console.log(`✅ Updated ${enPath} with ${Object.keys(enTranslations).length} keys`);
    console.log(`✅ Updated ${ptPath} with ${Object.keys(ptTranslations).length} keys`);
  }

  getFilesToProcess() {
    const files = [];
    
    // Handle single file
    if (fs.existsSync(this.targetPath) && fs.statSync(this.targetPath).isFile()) {
      if ((this.targetPath.endsWith('.tsx') || this.targetPath.endsWith('.jsx')) &&
          !CONFIG.excludePatterns.some(pattern => 
            this.targetPath.match(pattern.replace('*', '.*')))) {
        files.push(this.targetPath);
      }
      return files;
    }
    
    function scanDirectory(dir) {
      const entries = fs.readdirSync(dir);
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // Skip excluded directories
          if (!CONFIG.excludePatterns.some(pattern => 
            entry.includes(pattern.replace('*', '')))) {
            scanDirectory(fullPath);
          }
        } else if (stat.isFile()) {
          // Include TSX/JSX files, exclude test files
          if ((entry.endsWith('.tsx') || entry.endsWith('.jsx')) &&
              !CONFIG.excludePatterns.some(pattern => 
                entry.match(pattern.replace('*', '.*')))) {
            files.push(fullPath);
          }
        }
      }
    }
    
    scanDirectory(this.targetPath);
    return files;
  }

  run() {
    console.log('🚀 LusoTown i18n Extraction Codemod');
    console.log(`Target: ${this.targetPath}`);
    console.log(`Mode: ${this.dryRun ? 'DRY RUN' : 'LIVE'}`);
    console.log('');
    
    const totalExtractions = this.processFiles();
    
    if (totalExtractions > 0) {
      this.updateI18nFiles();
      
      console.log('\n✅ Extraction complete!');
      console.log(`📊 Total extractions: ${totalExtractions}`);
      console.log(`📚 Unique keys: ${this.extractedStrings.size}`);
      
      if (!this.dryRun) {
        console.log('\n🔄 Next steps:');
        console.log('1. Review generated translations in src/i18n/');
        console.log('2. Update Portuguese translations (replace [PT] prefixes)');
        console.log('3. Run npm run lint to check for any issues');
        console.log('4. Test the application to ensure i18n works correctly');
      }
    } else {
      console.log('✅ No hardcoded strings found to extract.');
    }
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    dryRun: args.includes('--dry-run'),
    path: args.find(arg => arg.startsWith('--path='))?.split('=')[1]
  };
  
  const extractor = new I18nExtractor(options);
  extractor.run();
}

module.exports = I18nExtractor;