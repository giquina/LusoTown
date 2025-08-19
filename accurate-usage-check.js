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

// Check if component is actually used (more thorough check)
const isComponentActuallyUsed = (componentName) => {
  try {
    // Check for JSX usage specifically
    const jsxPattern = `<${componentName}[\\s/>]`;
    const result = execSync(`cd web-app && find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "${jsxPattern}" | wc -l`, { encoding: 'utf8' });
    
    // Also check for function calls like Component()
    const functionCallPattern = `${componentName}\\(`;
    const result2 = execSync(`cd web-app && find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "${functionCallPattern}" | wc -l`, { encoding: 'utf8' });
    
    // Check for export references
    const exportPattern = `export.*${componentName}`;
    const result3 = execSync(`cd web-app && find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "${exportPattern}" | grep -v "${componentName}.tsx" | wc -l`, { encoding: 'utf8' });
    
    const jsxUsage = parseInt(result.trim());
    const functionUsage = parseInt(result2.trim());
    const exportUsage = parseInt(result3.trim());
    
    return jsxUsage > 0 || functionUsage > 0 || exportUsage > 0;
  } catch (error) {
    return false;
  }
};

// Test specific components
const testComponents = [
  'StreamSchedule',
  'LiveChatWidget', 
  'StreamViewerStats',
  'StreamCategories',
  'StreamReplayLibrary',
  'CreatorTestimonials',
  'PaymentProcessor',
  'SEOHead'
];

console.log('=== TESTING SPECIFIC COMPONENTS ===\n');

for (const comp of testComponents) {
  const isUsed = isComponentActuallyUsed(comp);
  console.log(`${comp}: ${isUsed ? 'USED' : 'UNUSED'}`);
}
