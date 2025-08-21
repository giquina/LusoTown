#!/usr/bin/env node

/**
 * LusoTown URL and Route Constants Replacement Codemod
 * 
 * Automatically detects and replaces literal URL patterns with constants
 * from config/index.ts (ROUTES, STREAMING_URLS, etc.)
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  sourceDir: './src',
  configDir: './src/config',
  excludePatterns: [
    '*.test.tsx',
    '*.test.ts',
    '*.config.js',
    '*.config.ts',
    'node_modules/*',
    'config/*' // Don't modify config files themselves
  ],
  dryRun: process.argv.includes('--dry-run'),
  verbose: process.argv.includes('--verbose')
};

// URL pattern definitions and their replacements
const URL_PATTERNS = [
  // Streaming URLs
  {
    pattern: /['"`]rtmp:\/\/[^'"`]+['"`]/g,
    configImport: 'STREAMING_URLS',
    replacement: (match, context) => {
      if (match.includes('localhost:1935')) return 'STREAMING_URLS.rtmp.local';
      if (match.includes('stream.lusotown.com')) return 'STREAMING_URLS.rtmp.production';
      return 'STREAMING_URLS.rtmp.default';
    }
  },
  {
    pattern: /['"`]https:\/\/stream\.lusotown\.com[^'"`]*['"`]/g,
    configImport: 'STREAMING_URLS',
    replacement: (match, context) => {
      if (match.includes('.m3u8')) return 'STREAMING_URLS.hls.production';
      return 'STREAMING_URLS.websocket.production';
    }
  },
  {
    pattern: /['"`]ws:\/\/[^'"`]+['"`]/g,
    configImport: 'STREAMING_URLS',
    replacement: () => 'STREAMING_URLS.websocket.local'
  },
  
  // Social media URLs
  {
    pattern: /['"`]https:\/\/twitter\.com\/[^'"`]+['"`]/g,
    configImport: 'SOCIAL_URLS',
    replacement: () => 'SOCIAL_URLS.twitter.profile'
  },
  {
    pattern: /['"`]https:\/\/instagram\.com\/[^'"`]+['"`]/g,
    configImport: 'SOCIAL_URLS',
    replacement: () => 'SOCIAL_URLS.instagram.profile'
  },
  {
    pattern: /['"`]https:\/\/facebook\.com\/[^'"`]+['"`]/g,
    configImport: 'SOCIAL_URLS',
    replacement: () => 'SOCIAL_URLS.facebook.page'
  },
  
  // CDN and external services
  {
    pattern: /['"`]https:\/\/images\.unsplash\.com\/[^'"`]+['"`]/g,
    configImport: 'buildUnsplashUrl',
    replacement: (match, context) => {
      // Extract photo ID from URL
      const photoIdMatch = match.match(/photo-([a-zA-Z0-9_-]+)/);
      if (photoIdMatch) {
        return `buildUnsplashUrl('${photoIdMatch[1]}')`;
      }
      return 'buildUnsplashUrl(\'placeholder\')';
    }
  },
  {
    pattern: /['"`]https:\/\/res\.cloudinary\.com\/[^'"`]+['"`]/g,
    configImport: 'buildCloudinaryUrl',
    replacement: () => 'buildCloudinaryUrl(\'image-id\')'
  },
  
  // Internal routes
  {
    pattern: /['"`]\/events[^'"`]*['"`]/g,
    configImport: 'ROUTES',
    replacement: (match, context) => {
      const url = match.slice(1, -1); // Remove quotes
      if (url === '/events') return 'ROUTES.events';
      if (url.includes('/events/')) return 'buildRoute(ROUTES.events, { id: \'event-id\' })';
      return 'ROUTES.events';
    }
  },
  {
    pattern: /['"`]\/transport[^'"`]*['"`]/g,
    configImport: 'ROUTES',
    replacement: () => 'ROUTES.transport'
  },
  {
    pattern: /['"`]\/matches[^'"`]*['"`]/g,
    configImport: 'ROUTES',
    replacement: () => 'ROUTES.matches'
  },
  {
    pattern: /['"`]\/live[^'"`]*['"`]/g,
    configImport: 'ROUTES',
    replacement: () => 'ROUTES.live'
  },
  {
    pattern: /['"`]\/business-directory[^'"`]*['"`]/g,
    configImport: 'ROUTES',
    replacement: () => 'ROUTES.businessDirectory'
  },
  {
    pattern: /['"`]\/pricing[^'"`]*['"`]/g,
    configImport: 'ROUTES',
    replacement: () => 'ROUTES.pricing'
  },
  {
    pattern: /['"`]\/about[^'"`]*['"`]/g,
    configImport: 'ROUTES',
    replacement: () => 'ROUTES.about'
  },
  {
    pattern: /['"`]\/login[^'"`]*['"`]/g,
    configImport: 'ROUTES',
    replacement: () => 'ROUTES.auth.login'
  },
  {
    pattern: /['"`]\/register[^'"`]*['"`]/g,
    configImport: 'ROUTES',
    replacement: () => 'ROUTES.auth.register'
  },
  
  // University partnerships
  {
    pattern: /['"`]https:\/\/[^'"`]*\.ac\.uk[^'"`]*['"`]/g,
    configImport: 'UNIVERSITY_URLS',
    replacement: () => 'UNIVERSITY_URLS.partner'
  },
  
  // Legal and external links
  {
    pattern: /['"`]https:\/\/stripe\.com\/[^'"`]*['"`]/g,
    configImport: 'EXTERNAL_SERVICES',
    replacement: () => 'EXTERNAL_SERVICES.stripe.dashboard'
  }
];

// Store found patterns and their replacements
let foundPatterns = new Map();
let requiredImports = new Set();

/**
 * Analyze file content and find URL patterns to replace
 */
function findUrlPatterns(filePath, content) {
  const context = { filePath };
  const replacements = [];
  
  for (const urlPattern of URL_PATTERNS) {
    let match;
    urlPattern.pattern.lastIndex = 0; // Reset regex
    
    while ((match = urlPattern.pattern.exec(content)) !== null) {
      const originalUrl = match[0];
      const replacementCode = urlPattern.replacement(originalUrl, context);
      
      replacements.push({
        index: match.index,
        length: match[0].length,
        original: originalUrl,
        replacement: replacementCode,
        configImport: urlPattern.configImport
      });
      
      requiredImports.add(urlPattern.configImport);
      foundPatterns.set(originalUrl, replacementCode);
    }
  }
  
  return replacements;
}

/**
 * Apply URL replacements to file content
 */
function applyUrlReplacements(content, replacements) {
  if (replacements.length === 0) return content;
  
  // Sort by index in reverse order to maintain positions
  replacements.sort((a, b) => b.index - a.index);
  
  let modifiedContent = content;
  const imports = new Set();
  
  // Apply replacements
  for (const replacement of replacements) {
    const { index, length, replacement: newCode, configImport } = replacement;
    modifiedContent = modifiedContent.substring(0, index) + newCode + modifiedContent.substring(index + length);
    imports.add(configImport);
  }
  
  // Add necessary imports
  const hasConfigImport = modifiedContent.includes('from \'@/config\'');
  
  if (imports.size > 0 && !hasConfigImport) {
    const importsList = Array.from(imports).join(', ');
    const newImport = `import { ${importsList} } from '@/config';\n`;
    
    // Find the first import and add our import
    const firstImportMatch = modifiedContent.match(/^import\s+/m);
    if (firstImportMatch) {
      const insertIndex = firstImportMatch.index;
      modifiedContent = modifiedContent.substring(0, insertIndex) + newImport + modifiedContent.substring(insertIndex);
    } else {
      // Add at the top if no imports found
      modifiedContent = newImport + modifiedContent;
    }
  } else if (imports.size > 0 && hasConfigImport) {
    // Update existing import
    const existingImportPattern = /import\s+{([^}]+)}\s+from\s+['"]@\/config['"];?\n/;
    const existingImport = modifiedContent.match(existingImportPattern);
    
    if (existingImport) {
      const currentImports = existingImport[1].split(',').map(s => s.trim());
      const newImports = [...new Set([...currentImports, ...Array.from(imports)])];
      const newImportLine = `import { ${newImports.join(', ')} } from '@/config';\n`;
      modifiedContent = modifiedContent.replace(existingImportPattern, newImportLine);
    }
  }
  
  return modifiedContent;
}

/**
 * Process all relevant files in the source directory
 */
function processFiles() {
  const files = [];
  
  function collectFiles(dir) {
    const entries = fs.readdirSync(dir);
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        collectFiles(fullPath);
      } else if (entry.match(/\.(tsx?|jsx?|js|ts)$/) && !CONFIG.excludePatterns.some(pattern => 
        fullPath.includes(pattern.replace('*', ''))
      )) {
        files.push(fullPath);
      }
    }
  }
  
  collectFiles(CONFIG.sourceDir);
  
  // Also check some specific non-src files
  const additionalFiles = [
    './scripts',
    './public'
  ].filter(dir => fs.existsSync(dir));
  
  for (const dir of additionalFiles) {
    collectFiles(dir);
  }
  
  return files;
}

/**
 * Main execution function
 */
function main() {
  console.log('🔗 LusoTown URL and Route Constants Replacement Codemod');
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
      const replacements = findUrlPatterns(filePath, content);
      
      if (replacements.length > 0) {
        if (CONFIG.verbose) {
          console.log(`\n📝 ${filePath}: ${replacements.length} URLs found`);
          replacements.forEach(r => console.log(`  - ${r.original} -> ${r.replacement}`));
        }
        
        const modifiedContent = applyUrlReplacements(content, replacements);
        
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
  
  // Print summary
  console.log('\n📊 URL Replacement Summary:');
  console.log(`📄 Files processed: ${files.length}`);
  console.log(`📝 Files modified: ${modifiedFiles}`);
  console.log(`🔗 URLs replaced: ${totalReplacements}`);
  console.log(`📦 Config imports required: ${requiredImports.size}`);
  
  if (CONFIG.verbose && foundPatterns.size > 0) {
    console.log('\n🔍 Patterns found:');
    for (const [original, replacement] of foundPatterns) {
      console.log(`  ${original} -> ${replacement}`);
    }
  }
  
  if (CONFIG.dryRun) {
    console.log('\n⚠️  This was a dry run. Use without --dry-run to apply changes.');
  } else {
    console.log('\n✅ URL replacement complete!');
  }
  
  return {
    filesProcessed: files.length,
    filesModified: modifiedFiles,
    urlsReplaced: totalReplacements,
    importsAdded: requiredImports.size
  };
}

// Run the codemod if called directly
if (require.main === module) {
  main();
}

module.exports = { main, findUrlPatterns, URL_PATTERNS };