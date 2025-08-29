#!/usr/bin/env node
/**
 * Bundle Size Optimizer for Portuguese Community Platform
 * Analyzes and optimizes bundle size with focus on mobile performance
 * Preserves Portuguese cultural components while improving load times
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class BundleSizeOptimizer {
  constructor() {
    this.startTime = Date.now();
    this.optimizations = [];
    this.initialSize = 0;
    this.finalSize = 0;
    this.heavyImports = [];
    this.duplicateDependencies = [];
    this.culturalComponents = [];
  }

  log(message) {
    console.log(`🚀 ${message}`);
  }

  async analyzeCurrentBundleSize() {
    this.log('Analyzing current bundle size...');
    
    try {
      // Check build directory
      const buildPath = '.next';
      if (!fs.existsSync(buildPath)) {
        this.log('Building application for analysis...');
        execSync('npm run build:chunked', { stdio: 'inherit' });
      }

      // Calculate bundle sizes
      this.initialSize = this.getDirectorySize('.next/static');
      this.log(`📦 Initial bundle size: ${this.formatBytes(this.initialSize)}`);
      
      // Analyze specific chunks
      await this.analyzeChunks();
      
      return this.initialSize;
    } catch (error) {
      this.log(`⚠️ Error analyzing bundle: ${error.message}`);
      return 0;
    }
  }

  async analyzeChunks() {
    this.log('Analyzing individual chunks...');
    
    const chunksDir = '.next/static/chunks';
    if (!fs.existsSync(chunksDir)) {
      return;
    }

    const chunks = fs.readdirSync(chunksDir)
      .filter(file => file.endsWith('.js'))
      .map(file => {
        const filePath = path.join(chunksDir, file);
        const size = fs.statSync(filePath).size;
        return { name: file, size, path: filePath };
      })
      .sort((a, b) => b.size - a.size);

    this.log(`📊 Found ${chunks.length} chunks:`);
    chunks.slice(0, 5).forEach(chunk => {
      this.log(`   ${chunk.name}: ${this.formatBytes(chunk.size)}`);
    });

    return chunks;
  }

  async analyzeComponentImports() {
    this.log('Analyzing component imports and dependencies...');
    
    const componentsDir = 'src/components';
    const componentFiles = this.getAllFiles(componentsDir, ['.tsx', '.ts']);
    
    for (const file of componentFiles) {
      await this.analyzeFileImports(file);
    }
    
    // Identify Portuguese cultural components
    this.culturalComponents = componentFiles.filter(file => 
      /lusophone|portuguese|cultural|palop|heritage/i.test(file)
    );
    
    this.log(`🎭 Found ${this.culturalComponents.length} cultural components`);
  }

  async analyzeFileImports(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const imports = this.extractImports(content);
      
      // Check for heavy imports
      const heavyImports = imports.filter(imp => 
        this.isHeavyImport(imp)
      );
      
      if (heavyImports.length > 0) {
        this.heavyImports.push({ file: filePath, imports: heavyImports });
      }
    } catch (error) {
      // Skip files that can't be read
    }
  }

  extractImports(content) {
    const importRegex = /import\s+(?:{[^}]+}|[^\s,{]+(?:\s+as\s+[^\s,{]+)?|\*\s+as\s+[^\s,{]+)\s+from\s+['"]([^'"]+)['"]/g;
    const imports = [];
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      imports.push({
        statement: match[0],
        module: match[1],
        line: content.substr(0, match.index).split('\n').length
      });
    }
    
    return imports;
  }

  isHeavyImport(imp) {
    const heavyModules = [
      'framer-motion',
      'react-spring',
      'lodash',
      '@heroicons/react/24/solid', // Use outline instead
      'moment', // Use date-fns instead
      'chartjs',
      'three',
      'd3'
    ];
    
    return heavyModules.some(module => imp.module.includes(module));
  }

  async optimizeImports() {
    this.log('Optimizing imports for better tree shaking...');
    
    let optimized = 0;
    
    for (const heavyImport of this.heavyImports) {
      try {
        const optimizations = await this.optimizeFileImports(heavyImport.file, heavyImport.imports);
        optimized += optimizations;
      } catch (error) {
        this.log(`⚠️ Could not optimize ${heavyImport.file}: ${error.message}`);
      }
    }
    
    this.optimizations.push(`Optimized ${optimized} import statements`);
    this.log(`✅ Optimized ${optimized} import statements`);
  }

  async optimizeFileImports(filePath, imports) {
    let content = fs.readFileSync(filePath, 'utf8');
    let optimizations = 0;
    
    for (const imp of imports) {
      const optimization = this.getImportOptimization(imp);
      if (optimization) {
        content = content.replace(imp.statement, optimization);
        optimizations++;
      }
    }
    
    if (optimizations > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      this.log(`   ✅ Optimized ${optimizations} imports in ${path.basename(filePath)}`);
    }
    
    return optimizations;
  }

  getImportOptimization(imp) {
    // Specific optimizations for common heavy imports
    if (imp.module === '@heroicons/react/24/solid') {
      return imp.statement.replace('/24/solid', '/24/outline');
    }
    
    if (imp.module === 'framer-motion' && imp.statement.includes('import {')) {
      // Ensure tree-shakable imports
      return imp.statement; // Keep as is for now, framer-motion is already tree-shakable
    }
    
    if (imp.module === 'lodash') {
      // Convert to specific lodash imports
      const funcMatch = imp.statement.match(/import\s+\{([^}]+)\}\s+from\s+['"]lodash['"]/);
      if (funcMatch) {
        const functions = funcMatch[1].split(',').map(f => f.trim());
        return functions.map(func => `import ${func} from 'lodash/${func}';`).join('\n');
      }
    }
    
    return null;
  }

  async optimizeDynamicImports() {
    this.log('Adding dynamic imports for heavy components...');
    
    const pagesDir = 'src/app';
    const pageFiles = this.getAllFiles(pagesDir, ['.tsx']);
    
    let dynamicImports = 0;
    
    for (const file of pageFiles) {
      const optimizations = await this.addDynamicImports(file);
      dynamicImports += optimizations;
    }
    
    this.optimizations.push(`Added ${dynamicImports} dynamic imports`);
    this.log(`✅ Added ${dynamicImports} dynamic imports`);
  }

  async addDynamicImports(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Components that should be dynamically imported
    const candidatesForDynamic = [
      'LusophoneCarousel',
      'AccessibilityFeatures',
      'BusinessSubmissionForm',
      'UserOnboardingFlow',
      'GrowthFeatures',
      'CaseStudies'
    ];
    
    let modifications = 0;
    let newContent = content;
    
    // Check if any heavy components are imported statically
    for (const component of candidatesForDynamic) {
      const staticImportRegex = new RegExp(`import\\s+${component}\\s+from\\s+['"][^'"]+['"];?`);
      if (staticImportRegex.test(content)) {
        // Replace with dynamic import
        const dynamicImport = `const ${component} = dynamic(() => import('@/components/${component}'), { loading: () => <div>Loading...</div> });`;
        
        // Add dynamic import and remove static import
        if (!content.includes('import dynamic from \'next/dynamic\'')) {
          newContent = `import dynamic from 'next/dynamic';\n${newContent}`;
        }
        
        newContent = newContent.replace(staticImportRegex, dynamicImport);
        modifications++;
      }
    }
    
    if (modifications > 0) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      this.log(`   ✅ Added ${modifications} dynamic imports to ${path.basename(filePath)}`);
    }
    
    return modifications;
  }

  async checkDuplicateDependencies() {
    this.log('Checking for duplicate dependencies...');
    
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
      
      const duplicates = [];
      const packages = Object.keys(dependencies);
      
      // Check for similar packages that could be consolidated
      const similarPackages = [
        ['moment', 'date-fns'],
        ['lodash', 'ramda'],
        ['axios', 'fetch'],
        ['classnames', 'clsx', 'tailwind-merge']
      ];
      
      similarPackages.forEach(group => {
        const found = group.filter(pkg => packages.includes(pkg));
        if (found.length > 1) {
          duplicates.push(found);
        }
      });
      
      if (duplicates.length > 0) {
        this.log(`⚠️ Found potential duplicate dependencies:`);
        duplicates.forEach(group => {
          this.log(`   ${group.join(', ')}`);
        });
      }
      
      this.duplicateDependencies = duplicates;
      
    } catch (error) {
      this.log(`⚠️ Could not analyze dependencies: ${error.message}`);
    }
  }

  async optimizeImages() {
    this.log('Optimizing image imports...');
    
    const imageFiles = this.getAllFiles('src', ['.jpg', '.jpeg', '.png', '.gif', '.svg']);
    let optimized = 0;
    
    // Check for large images that should be optimized
    for (const imageFile of imageFiles) {
      try {
        const stats = fs.statSync(imageFile);
        if (stats.size > 100 * 1024) { // Files larger than 100KB
          this.log(`   📸 Large image found: ${imageFile} (${this.formatBytes(stats.size)})`);
          // Add to optimization recommendations
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    // Check for unused images
    await this.findUnusedImages(imageFiles);
    
    this.optimizations.push(`Analyzed ${imageFiles.length} images`);
  }

  async findUnusedImages(imageFiles) {
    this.log('Checking for unused images...');
    
    const sourceFiles = this.getAllFiles('src', ['.tsx', '.ts', '.js', '.jsx']);
    let allSourceContent = '';
    
    // Read all source files
    for (const file of sourceFiles) {
      try {
        allSourceContent += fs.readFileSync(file, 'utf8');
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    const unusedImages = [];
    
    for (const imageFile of imageFiles) {
      const imageName = path.basename(imageFile);
      const imageNameWithoutExt = path.basename(imageFile, path.extname(imageFile));
      
      // Check if image is referenced in source code
      if (!allSourceContent.includes(imageName) && 
          !allSourceContent.includes(imageNameWithoutExt)) {
        unusedImages.push(imageFile);
      }
    }
    
    if (unusedImages.length > 0) {
      this.log(`📸 Found ${unusedImages.length} potentially unused images`);
      unusedImages.slice(0, 5).forEach(img => {
        this.log(`   ${img}`);
      });
    }
  }

  getAllFiles(dir, extensions) {
    const files = [];
    
    if (!fs.existsSync(dir)) {
      return files;
    }
    
    const scan = (currentDir) => {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          scan(fullPath);
        } else if (stat.isFile()) {
          const ext = path.extname(item).toLowerCase();
          if (extensions.includes(ext)) {
            files.push(fullPath);
          }
        }
      }
    };
    
    scan(dir);
    return files;
  }

  getDirectorySize(dir) {
    let size = 0;
    
    if (!fs.existsSync(dir)) {
      return 0;
    }
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        size += this.getDirectorySize(fullPath);
      } else {
        size += stat.size;
      }
    }
    
    return size;
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  generateReport() {
    const duration = Date.now() - this.startTime;
    const sizeSaved = this.initialSize - this.finalSize;
    
    const report = {
      title: 'Bundle Size Optimization Report - Portuguese Community Platform',
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`,
      bundleSize: {
        initial: this.formatBytes(this.initialSize),
        final: this.formatBytes(this.finalSize),
        saved: this.formatBytes(sizeSaved),
        percentImprovement: this.initialSize > 0 ? ((sizeSaved / this.initialSize) * 100).toFixed(2) + '%' : '0%'
      },
      analysis: {
        heavyImports: this.heavyImports.length,
        culturalComponents: this.culturalComponents.length,
        duplicateDependencies: this.duplicateDependencies.length
      },
      optimizations: this.optimizations,
      recommendations: this.generateRecommendations()
    };

    const reportPath = path.join(process.cwd(), 'bundle-optimization-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    return report;
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.heavyImports.length > 0) {
      recommendations.push('Consider lazy loading heavy components with dynamic imports');
    }
    
    if (this.duplicateDependencies.length > 0) {
      recommendations.push('Remove duplicate dependencies to reduce bundle size');
    }
    
    recommendations.push('Enable gzip compression on your server');
    recommendations.push('Use Next.js Image component for automatic image optimization');
    recommendations.push('Consider code splitting at the route level');
    recommendations.push('Monitor bundle size with bundle analyzer in CI/CD');
    
    return recommendations;
  }

  printSummary(report) {
    console.log('\n' + '='.repeat(80));
    console.log('🎯 BUNDLE SIZE OPTIMIZATION COMPLETE');
    console.log('📱 Portuguese Community Platform - Mobile Performance Enhanced');
    console.log('='.repeat(80));
    
    console.log(`\n📊 BUNDLE SIZE ANALYSIS`);
    console.log(`⏱️  Duration: ${report.duration}`);
    console.log(`📦 Initial Size: ${report.bundleSize.initial}`);
    if (report.bundleSize.final !== '0 B') {
      console.log(`📦 Final Size: ${report.bundleSize.final}`);
      console.log(`💾 Size Saved: ${report.bundleSize.saved} (${report.bundleSize.percentImprovement})`);
    }
    
    console.log(`\n🔍 ANALYSIS RESULTS`);
    console.log(`🏋️  Heavy Imports: ${report.analysis.heavyImports}`);
    console.log(`🎭 Cultural Components: ${report.analysis.culturalComponents}`);
    console.log(`📋 Duplicate Dependencies: ${report.analysis.duplicateDependencies}`);
    
    if (report.optimizations.length > 0) {
      console.log(`\n✅ OPTIMIZATIONS APPLIED`);
      report.optimizations.forEach(opt => {
        console.log(`   • ${opt}`);
      });
    }
    
    console.log(`\n💡 RECOMMENDATIONS`);
    report.recommendations.forEach(rec => {
      console.log(`   • ${rec}`);
    });
    
    console.log(`\n🚀 NEXT STEPS`);
    console.log('   1. Run npm run build to test optimizations');
    console.log('   2. Test Portuguese cultural components functionality');
    console.log('   3. Monitor mobile loading performance');
    console.log('   4. Consider implementing additional recommendations');
    
    console.log('\n' + '='.repeat(80));
  }

  async optimize() {
    this.log('Starting bundle size optimization for Portuguese community platform...');
    
    try {
      // Analysis phase
      await this.analyzeCurrentBundleSize();
      await this.analyzeComponentImports();
      await this.checkDuplicateDependencies();
      
      // Optimization phase
      await this.optimizeImports();
      await this.optimizeDynamicImports();
      await this.optimizeImages();
      
      // Final analysis
      this.log('Rebuilding to measure improvements...');
      try {
        execSync('npm run build:chunked', { stdio: 'pipe' });
        this.finalSize = this.getDirectorySize('.next/static');
        this.log(`📦 Final bundle size: ${this.formatBytes(this.finalSize)}`);
      } catch (error) {
        this.log('Could not rebuild for final measurement');
      }
      
      const report = this.generateReport();
      this.printSummary(report);
      
      this.log('\n✅ Bundle size optimization completed successfully!');
      
    } catch (error) {
      console.error('❌ Bundle size optimization failed:', error);
      throw error;
    }
  }
}

// Run optimization if called directly
if (require.main === module) {
  const optimizer = new BundleSizeOptimizer();
  optimizer.optimize().catch(console.error);
}

module.exports = BundleSizeOptimizer;