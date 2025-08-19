#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 COMPREHENSIVE UNUSED FILES AUDIT FOR LUSOTOWN\n');

// Define search paths
const PATHS = {
  components: '/workspaces/LusoTown/web-app/src/components',
  pages: '/workspaces/LusoTown/web-app/src/app',
  utils: '/workspaces/LusoTown/web-app/src/utils',
  lib: '/workspaces/LusoTown/web-app/src/lib',
  hooks: '/workspaces/LusoTown/web-app/src/hooks',
  contexts: '/workspaces/LusoTown/web-app/src/context',
  images: '/workspaces/LusoTown/web-app/public/images',
  events: '/workspaces/LusoTown/web-app/public/events',
  profiles: '/workspaces/LusoTown/web-app/public/profiles',
  root: '/workspaces/LusoTown'
};

const results = {
  unusedComponents: [],
  unusedPages: [],
  unusedUtils: [],
  unusedImages: [],
  unusedMarkdown: [],
  backupFiles: [],
  totalSavings: 0
};

// Helper function to get file size
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (e) {
    return 0;
  }
}

// Helper function to search for file usage
function searchFileUsage(fileName, baseName, extensions = ['.tsx', '.ts', '.js', '.jsx']) {
  try {
    const searchPatterns = [
      `import.*${baseName}.*from`,
      `import.*${baseName}.*}`,
      `from.*${baseName}`,
      `"${baseName}"`,
      `'${baseName}'`,
      `<${baseName}`,
      `${baseName}\\(`,
      `/${baseName}`,
      `${baseName}\\.`,
      `export.*${baseName}`
    ];

    for (let pattern of searchPatterns) {
      try {
        const result = execSync(
          `rg "${pattern}" /workspaces/LusoTown/web-app/src --type typescript --type javascript --type tsx --quiet`,
          { encoding: 'utf8' }
        );
        if (result.trim()) {
          return true;
        }
      } catch (e) {
        // Continue to next pattern
      }
    }
    return false;
  } catch (e) {
    return false;
  }
}

// Check React Components
console.log('📦 Checking React Components...');
function checkComponents() {
  const componentDir = PATHS.components;
  if (!fs.existsSync(componentDir)) return;

  const files = execSync(`find ${componentDir} -name "*.tsx" -type f`, { encoding: 'utf8' }).trim().split('\n').filter(f => f);
  
  for (let filePath of files) {
    const fileName = path.basename(filePath);
    const baseName = fileName.replace('.tsx', '');
    
    // Skip if it's a barrel export or index file
    if (fileName === 'index.tsx' || fileName.includes('index')) continue;
    
    const isUsed = searchFileUsage(fileName, baseName);
    
    if (!isUsed) {
      const size = getFileSize(filePath);
      results.unusedComponents.push({
        path: filePath,
        name: fileName,
        size: size,
        confidence: 'HIGH'
      });
      results.totalSavings += size;
    }
  }
}

// Check Pages
console.log('📄 Checking Pages...');
function checkPages() {
  const pageDir = PATHS.pages;
  if (!fs.existsSync(pageDir)) return;

  const files = execSync(`find ${pageDir} -name "page.tsx" -type f`, { encoding: 'utf8' }).trim().split('\n').filter(f => f);
  
  for (let filePath of files) {
    const dirName = path.dirname(filePath).split('/').pop();
    
    // Check if page is linked in navigation or imported elsewhere
    const isLinked = searchFileUsage('', dirName);
    
    if (!isLinked && dirName !== 'app') {
      const size = getFileSize(filePath);
      results.unusedPages.push({
        path: filePath,
        route: `/${dirName}`,
        size: size,
        confidence: 'MEDIUM'
      });
      results.totalSavings += size;
    }
  }
}

// Check Utils and Lib
console.log('🔧 Checking Utils and Lib files...');
function checkUtils() {
  const dirs = [PATHS.utils, PATHS.lib, PATHS.hooks];
  
  for (let dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    
    const files = execSync(`find ${dir} -name "*.ts" -o -name "*.tsx" -type f`, { encoding: 'utf8' }).trim().split('\n').filter(f => f);
    
    for (let filePath of files) {
      const fileName = path.basename(filePath);
      const baseName = fileName.replace(/\.(ts|tsx)$/, '');
      
      const isUsed = searchFileUsage(fileName, baseName);
      
      if (!isUsed) {
        const size = getFileSize(filePath);
        results.unusedUtils.push({
          path: filePath,
          name: fileName,
          size: size,
          confidence: 'HIGH'
        });
        results.totalSavings += size;
      }
    }
  }
}

// Check Images
console.log('🖼️ Checking Images...');
function checkImages() {
  const imageDirs = [PATHS.images, PATHS.events, PATHS.profiles];
  
  for (let dir of imageDirs) {
    if (!fs.existsSync(dir)) continue;
    
    try {
      const files = execSync(`find ${dir} -type f \\( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.svg" -o -name "*.webp" \\)`, { encoding: 'utf8' }).trim().split('\n').filter(f => f);
      
      for (let filePath of files) {
        const fileName = path.basename(filePath);
        const baseNameWithoutExt = fileName.replace(/\.(jpg|jpeg|png|svg|webp)$/i, '');
        
        // Search for image references
        try {
          const result = execSync(
            `rg "${fileName}|${baseNameWithoutExt}" /workspaces/LusoTown/web-app/src --quiet`,
            { encoding: 'utf8' }
          );
          // If no results, the image is unused
        } catch (e) {
          const size = getFileSize(filePath);
          results.unusedImages.push({
            path: filePath,
            name: fileName,
            size: size,
            confidence: 'HIGH'
          });
          results.totalSavings += size;
        }
      }
    } catch (e) {
      console.log(`Could not check images in ${dir}`);
    }
  }
}

// Check Markdown files
console.log('📝 Checking Markdown files...');
function checkMarkdown() {
  try {
    const files = execSync(`find ${PATHS.root} -maxdepth 1 -name "*.md" -type f`, { encoding: 'utf8' }).trim().split('\n').filter(f => f);
    
    const importantFiles = ['README.md', 'CLAUDE.md', 'LICENSE'];
    
    for (let filePath of files) {
      const fileName = path.basename(filePath);
      
      if (!importantFiles.includes(fileName)) {
        const size = getFileSize(filePath);
        results.unusedMarkdown.push({
          path: filePath,
          name: fileName,
          size: size,
          confidence: 'MEDIUM'
        });
        results.totalSavings += size;
      }
    }
  } catch (e) {
    console.log('Could not check markdown files');
  }
}

// Check Backup files
console.log('🗑️ Checking Backup files...');
function checkBackupFiles() {
  try {
    const patterns = ['*.backup', '*.old', '*.bak', '*~', '*.orig'];
    
    for (let pattern of patterns) {
      try {
        const files = execSync(`find /workspaces/LusoTown -name "${pattern}" -type f`, { encoding: 'utf8' }).trim().split('\n').filter(f => f);
        
        for (let filePath of files) {
          const fileName = path.basename(filePath);
          const size = getFileSize(filePath);
          results.backupFiles.push({
            path: filePath,
            name: fileName,
            size: size,
            confidence: 'HIGH'
          });
          results.totalSavings += size;
        }
      } catch (e) {
        // No files found for this pattern
      }
    }
  } catch (e) {
    console.log('Could not check backup files');
  }
}

// Format file size
function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Run all checks
checkComponents();
checkPages();
checkUtils();
checkImages();
checkMarkdown();
checkBackupFiles();

// Generate report
console.log('\n' + '='.repeat(80));
console.log('📊 UNUSED FILES AUDIT RESULTS');
console.log('='.repeat(80));

if (results.unusedComponents.length > 0) {
  console.log(`\n🔴 UNUSED REACT COMPONENTS (${results.unusedComponents.length}):`);
  results.unusedComponents.forEach(item => {
    console.log(`  - ${item.name} (${formatSize(item.size)}) [${item.confidence}]`);
    console.log(`    Path: ${item.path}`);
  });
}

if (results.unusedPages.length > 0) {
  console.log(`\n🔴 UNUSED PAGES (${results.unusedPages.length}):`);
  results.unusedPages.forEach(item => {
    console.log(`  - ${item.route} (${formatSize(item.size)}) [${item.confidence}]`);
    console.log(`    Path: ${item.path}`);
  });
}

if (results.unusedUtils.length > 0) {
  console.log(`\n🔴 UNUSED UTILS/LIBS (${results.unusedUtils.length}):`);
  results.unusedUtils.forEach(item => {
    console.log(`  - ${item.name} (${formatSize(item.size)}) [${item.confidence}]`);
    console.log(`    Path: ${item.path}`);
  });
}

if (results.unusedImages.length > 0) {
  console.log(`\n🔴 UNUSED IMAGES (${results.unusedImages.length}):`);
  results.unusedImages.forEach(item => {
    console.log(`  - ${item.name} (${formatSize(item.size)}) [${item.confidence}]`);
    console.log(`    Path: ${item.path}`);
  });
}

if (results.unusedMarkdown.length > 0) {
  console.log(`\n🔴 UNUSED MARKDOWN FILES (${results.unusedMarkdown.length}):`);
  results.unusedMarkdown.forEach(item => {
    console.log(`  - ${item.name} (${formatSize(item.size)}) [${item.confidence}]`);
    console.log(`    Path: ${item.path}`);
  });
}

if (results.backupFiles.length > 0) {
  console.log(`\n🔴 BACKUP FILES (${results.backupFiles.length}):`);
  results.backupFiles.forEach(item => {
    console.log(`  - ${item.name} (${formatSize(item.size)}) [${item.confidence}]`);
    console.log(`    Path: ${item.path}`);
  });
}

console.log('\n' + '='.repeat(80));
console.log(`💾 TOTAL ESTIMATED SAVINGS: ${formatSize(results.totalSavings)}`);
console.log('='.repeat(80));

// Generate cleanup commands
console.log('\n🧹 SAFE CLEANUP COMMANDS:');
console.log('# High confidence files (safe to delete):');

const highConfidenceFiles = [
  ...results.unusedComponents.filter(f => f.confidence === 'HIGH'),
  ...results.unusedUtils.filter(f => f.confidence === 'HIGH'),
  ...results.unusedImages.filter(f => f.confidence === 'HIGH'),
  ...results.backupFiles.filter(f => f.confidence === 'HIGH')
];

if (highConfidenceFiles.length > 0) {
  console.log('rm -f \\');
  highConfidenceFiles.forEach((file, index) => {
    const isLast = index === highConfidenceFiles.length - 1;
    console.log(`  "${file.path}"${isLast ? '' : ' \\'}`);
  });
}

console.log('\n# Medium confidence files (manual review recommended):');
const mediumConfidenceFiles = [
  ...results.unusedPages.filter(f => f.confidence === 'MEDIUM'),
  ...results.unusedMarkdown.filter(f => f.confidence === 'MEDIUM')
];

mediumConfidenceFiles.forEach(file => {
  console.log(`# rm "${file.path}"`);
});

console.log('\n✅ Audit complete!');