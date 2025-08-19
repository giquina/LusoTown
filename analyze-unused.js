#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all component files
const getComponentFiles = () => {
  try {
    const output = execSync('find web-app/src/components -name "*.tsx" | grep -v ".backup"', { encoding: 'utf8' });
    return output.trim().split('\n').filter(Boolean);
  } catch (error) {
    return [];
  }
};

// Extract component name from file path
const getComponentName = (filePath) => {
  return path.basename(filePath, '.tsx');
};

// Check if component is used anywhere
const isComponentUsed = (componentName) => {
  try {
    // Check for imports and usage in all TypeScript files
    const searchPatterns = [
      `import.*${componentName}.*from`,
      `import.*{.*${componentName}.*}.*from`,
      `<${componentName}[\\s/>]`,
      `export.*${componentName}`
    ];
    
    for (const pattern of searchPatterns) {
      const result = execSync(`cd web-app && find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "${pattern}" | wc -l`, { encoding: 'utf8' });
      if (parseInt(result.trim()) > 1) { // > 1 because the component file itself will match
        return true;
      }
    }
    
    return false;
  } catch (error) {
    return false;
  }
};

const analyzeComponents = () => {
  const componentFiles = getComponentFiles();
  const unusedComponents = [];
  const usedComponents = [];
  
  console.log(`Analyzing ${componentFiles.length} components...\n`);
  
  for (const filePath of componentFiles) {
    const componentName = getComponentName(filePath);
    const isUsed = isComponentUsed(componentName);
    
    if (isUsed) {
      usedComponents.push(componentName);
    } else {
      unusedComponents.push({ name: componentName, path: filePath });
    }
  }
  
  console.log('=== UNUSED COMPONENTS ===' + '\n');
  if (unusedComponents.length === 0) {
    console.log('No unused components found.\n');
  } else {
    unusedComponents.forEach(comp => {
      console.log(`${comp.name} - ${comp.path}`);
    });
    console.log(`\nTotal unused: ${unusedComponents.length}`);
  }
  
  console.log(`\nTotal used: ${usedComponents.length}`);
  console.log(`Total analyzed: ${componentFiles.length}`);
};

analyzeComponents();
