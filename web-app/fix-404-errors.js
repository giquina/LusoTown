#!/usr/bin/env node
/**
 * LusoTown JavaScript 404 Error Detection & Fix Tool
 * Identifies and fixes missing JavaScript resources, imports, and dependencies
 */

const fs = require('fs');
const path = require('path');

class LusoTown404Fixer {
  constructor() {
    this.srcDir = './src';
    this.errors = [];
    this.fixes = [];
    this.missingFiles = [];
    this.brokenImports = [];
  }

  // Scan for all JavaScript/TypeScript files
  scanFiles(dir = this.srcDir) {
    const files = [];
    
    function scanDir(currentDir) {
      const items = fs.readdirSync(currentDir, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item.name);
        
        if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
          scanDir(fullPath);
        } else if (item.isFile() && (item.name.endsWith('.ts') || item.name.endsWith('.tsx'))) {
          files.push(fullPath);
        }
      }
    }
    
    scanDir(dir);
    return files;
  }

  // Check if a file exists
  fileExists(filePath) {
    const extensions = ['.ts', '.tsx', '.js', '.jsx'];
    
    // First try the exact path
    if (fs.existsSync(filePath)) return filePath;
    
    // Try with extensions
    for (const ext of extensions) {
      const pathWithExt = filePath + ext;
      if (fs.existsSync(pathWithExt)) return pathWithExt;
    }
    
    // Try index files
    for (const ext of extensions) {
      const indexPath = path.join(filePath, 'index' + ext);
      if (fs.existsSync(indexPath)) return indexPath;
    }
    
    return null;
  }

  // Extract imports from a file
  extractImports(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const imports = [];
      
      // Match various import patterns
      const importPatterns = [
        /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g,
        /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
        /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
      ];
      
      for (const pattern of importPatterns) {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          imports.push({
            statement: match[0],
            path: match[1],
            line: content.substring(0, match.index).split('\n').length
          });
        }
      }
      
      return imports;
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error.message);
      return [];
    }
  }

  // Resolve import path
  resolveImportPath(importPath, fromFile) {
    const fromDir = path.dirname(fromFile);
    
    // Handle relative imports
    if (importPath.startsWith('./') || importPath.startsWith('../')) {
      return path.resolve(fromDir, importPath);
    }
    
    // Handle absolute imports with @ alias
    if (importPath.startsWith('@/')) {
      return path.resolve(this.srcDir, importPath.substring(2));
    }
    
    // Handle node_modules (we'll skip checking these)
    if (!importPath.startsWith('.') && !importPath.startsWith('@/')) {
      return 'node_modules';
    }
    
    return path.resolve(fromDir, importPath);
  }

  // Check all imports in a file
  checkFileImports(filePath) {
    const imports = this.extractImports(filePath);
    const brokenImports = [];
    
    for (const imp of imports) {
      // Skip node_modules imports
      if (!imp.path.startsWith('.') && !imp.path.startsWith('@/')) {
        continue;
      }
      
      const resolvedPath = this.resolveImportPath(imp.path, filePath);
      if (resolvedPath !== 'node_modules' && !this.fileExists(resolvedPath)) {
        brokenImports.push({
          ...imp,
          resolvedPath,
          file: filePath
        });
      }
    }
    
    return brokenImports;
  }

  // Check all files for broken imports
  checkAllImports() {
    console.log('🔍 Scanning for broken imports...');
    
    const files = this.scanFiles();
    let totalBroken = 0;
    
    for (const file of files) {
      const brokenImports = this.checkFileImports(file);
      if (brokenImports.length > 0) {
        this.brokenImports.push(...brokenImports);
        totalBroken += brokenImports.length;
        
        console.log(`❌ ${file}: ${brokenImports.length} broken imports`);
        for (const imp of brokenImports) {
          console.log(`   Line ${imp.line}: ${imp.path} -> ${imp.resolvedPath}`);
        }
      }
    }
    
    console.log(`\n📊 Total broken imports: ${totalBroken}`);
    return this.brokenImports;
  }

  // Generate missing file stubs
  generateMissingFiles() {
    console.log('\n🛠️  Generating missing file stubs...');
    
    const missingFiles = new Set();
    
    for (const imp of this.brokenImports) {
      // Determine what type of file to create based on the import path
      const resolvedPath = imp.resolvedPath;
      let fileContent = '';
      let fileName = '';
      
      if (resolvedPath.includes('/components/')) {
        fileName = resolvedPath + '.tsx';
        fileContent = this.generateComponentStub(path.basename(resolvedPath));
      } else if (resolvedPath.includes('/lib/')) {
        fileName = resolvedPath + '.ts';
        fileContent = this.generateLibStub(path.basename(resolvedPath));
      } else if (resolvedPath.includes('/config/')) {
        fileName = resolvedPath + '.ts';
        fileContent = this.generateConfigStub(path.basename(resolvedPath));
      } else if (resolvedPath.includes('/context/')) {
        fileName = resolvedPath + '.tsx';
        fileContent = this.generateContextStub(path.basename(resolvedPath));
      } else if (resolvedPath.includes('/utils/')) {
        fileName = resolvedPath + '.ts';
        fileContent = this.generateUtilStub(path.basename(resolvedPath));
      } else {
        // Default to TypeScript file
        fileName = resolvedPath + '.ts';
        fileContent = this.generateDefaultStub(path.basename(resolvedPath));
      }
      
      missingFiles.add({ fileName, fileContent, originalImport: imp });
    }
    
    // Create the missing files
    for (const { fileName, fileContent } of missingFiles) {
      try {
        // Ensure directory exists
        const dir = path.dirname(fileName);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        // Create the file if it doesn't exist
        if (!fs.existsSync(fileName)) {
          fs.writeFileSync(fileName, fileContent);
          console.log(`✅ Created: ${fileName}`);
          this.fixes.push(`Created missing file: ${fileName}`);
        } else {
          console.log(`⏭️  Skipped existing file: ${fileName}`);
        }
      } catch (error) {
        console.error(`❌ Failed to create ${fileName}:`, error.message);
        this.errors.push(`Failed to create ${fileName}: ${error.message}`);
      }
    }
  }

  // Component stub generator
  generateComponentStub(componentName) {
    return `"use client";

import React from 'react';

interface ${componentName}Props {
  className?: string;
  children?: React.ReactNode;
}

export default function ${componentName}({ className, children }: ${componentName}Props) {
  return (
    <div className={\`${componentName.toLowerCase()}-component \${className || ''}\`}>
      {/* TODO: Implement ${componentName} component */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 text-sm">
          ⚠️  ${componentName} component stub - needs implementation
        </p>
        {children}
      </div>
    </div>
  );
}

export { ${componentName} };
`;
  }

  // Context stub generator
  generateContextStub(contextName) {
    const contextBaseName = contextName.replace('Context', '');
    return `"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ${contextBaseName}ContextType {
  // TODO: Define ${contextBaseName} context type
  isReady: boolean;
}

const ${contextName} = createContext<${contextBaseName}ContextType | undefined>(undefined);

interface ${contextBaseName}ProviderProps {
  children: ReactNode;
}

export function ${contextBaseName}Provider({ children }: ${contextBaseName}ProviderProps) {
  const [isReady] = useState(false);

  const contextValue: ${contextBaseName}ContextType = {
    isReady,
    // TODO: Implement ${contextBaseName} context methods
  };

  return (
    <${contextName}.Provider value={contextValue}>
      {children}
    </${contextName}.Provider>
  );
}

export function use${contextBaseName}() {
  const context = useContext(${contextName});
  if (context === undefined) {
    throw new Error('use${contextBaseName} must be used within a ${contextBaseName}Provider');
  }
  return context;
}

export default ${contextName};
`;
  }

  // Library stub generator
  generateLibStub(libName) {
    return `/**
 * ${libName} library stub
 * TODO: Implement ${libName} functionality
 */

export class ${libName.charAt(0).toUpperCase() + libName.slice(1)} {
  constructor() {
    // TODO: Implement constructor
  }

  // TODO: Add methods
}

export default ${libName.charAt(0).toUpperCase() + libName.slice(1)};
`;
  }

  // Config stub generator
  generateConfigStub(configName) {
    return `/**
 * ${configName} configuration
 * TODO: Add actual configuration values
 */

export const ${configName.toUpperCase()}_CONFIG = {
  // TODO: Add configuration properties
  placeholder: true,
};

export default ${configName.toUpperCase()}_CONFIG;
`;
  }

  // Utils stub generator
  generateUtilStub(utilName) {
    return `/**
 * ${utilName} utilities
 * TODO: Implement utility functions
 */

export const ${utilName} = {
  // TODO: Add utility methods
  placeholder: () => {
    console.warn('${utilName} placeholder function - needs implementation');
    return null;
  },
};

export default ${utilName};
`;
  }

  // Default stub generator
  generateDefaultStub(fileName) {
    return `/**
 * ${fileName} module
 * TODO: Implement functionality
 */

// TODO: Add exports

export default {};
`;
  }

  // Run the complete fix process
  async run() {
    console.log('🚀 LusoTown JavaScript 404 Error Fixer Starting...\n');
    
    try {
      // Check for broken imports
      this.checkAllImports();
      
      // Generate missing files
      if (this.brokenImports.length > 0) {
        this.generateMissingFiles();
      }
      
      // Report results
      console.log('\n📋 Summary:');
      console.log(`✅ Fixes applied: ${this.fixes.length}`);
      console.log(`❌ Errors encountered: ${this.errors.length}`);
      
      if (this.fixes.length > 0) {
        console.log('\n🎉 Fixed issues:');
        this.fixes.forEach(fix => console.log(`  • ${fix}`));
      }
      
      if (this.errors.length > 0) {
        console.log('\n⚠️  Remaining issues:');
        this.errors.forEach(error => console.log(`  • ${error}`));
      }
      
      console.log('\n✨ LusoTown 404 Fix Complete!');
      
      if (this.fixes.length > 0) {
        console.log('\n🔄 Next steps:');
        console.log('  1. Review generated stub files');
        console.log('  2. Implement actual functionality');
        console.log('  3. Run npm run build to verify fixes');
      }
      
    } catch (error) {
      console.error('💥 Fatal error:', error);
      process.exit(1);
    }
  }
}

// Run the fixer
const fixer = new LusoTown404Fixer();
fixer.run().catch(console.error);
