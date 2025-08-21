#!/usr/bin/env node

/**
 * LusoTown Documentation Validator
 * 
 * Validates that documentation is current and accurate before deployments
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class DocumentationValidator {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '../../../');
    this.webAppRoot = path.resolve(__dirname, '../../');
    this.errors = [];
    this.warnings = [];
  }

  async validate() {
    console.log('🔍 Validating LusoTown documentation...');
    
    await this.validateTODO();
    await this.validateCLAUDE();
    await this.validateComponentCounts();
    await this.validateFeatureStatus();
    await this.validateTranslations();
    
    this.reportResults();
    
    return this.errors.length === 0;
  }

  async validateTODO() {
    const todoPath = path.join(this.webAppRoot, 'TODO.md');
    
    if (!fs.existsSync(todoPath)) {
      this.errors.push('TODO.md file is missing');
      return;
    }

    const todoContent = fs.readFileSync(todoPath, 'utf8');
    
    // Check for outdated timestamp
    const timestampMatch = todoContent.match(/Last Updated: (.+)/);
    if (timestampMatch) {
      const lastUpdated = new Date(timestampMatch[1]);
      const daysSinceUpdate = (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysSinceUpdate > 7) {
        this.warnings.push(`TODO.md hasn't been updated in ${Math.floor(daysSinceUpdate)} days`);
      }
    } else {
      this.warnings.push('TODO.md missing timestamp');
    }

    // Check for completed items that should be marked done
    const implementedFeatures = await this.getImplementedFeatures();
    const todoItems = todoContent.match(/- \[ \] .+/g) || [];
    
    for (const item of todoItems) {
      const itemText = item.substring(6); // Remove "- [ ] "
      
      // Check if this item relates to implemented features
      for (const feature of implementedFeatures) {
        if (itemText.toLowerCase().includes(feature.toLowerCase())) {
          this.warnings.push(`TODO item may be completed: "${itemText}"`);
        }
      }
    }
  }

  async validateCLAUDE() {
    const claudePath = path.join(this.projectRoot, 'CLAUDE.md');
    
    if (!fs.existsSync(claudePath)) {
      this.errors.push('CLAUDE.md file is missing');
      return;
    }

    const claudeContent = fs.readFileSync(claudePath, 'utf8');
    
    // Validate component count accuracy
    const actualComponentCount = this.countFiles('src/components/**/*.tsx');
    const documentedComponentCount = this.extractNumber(claudeContent, /(\d+)\+ components/);
    
    if (Math.abs(actualComponentCount - documentedComponentCount) > 5) {
      this.errors.push(
        `Component count mismatch: documented ${documentedComponentCount}, actual ${actualComponentCount}`
      );
    }

    // Validate page count accuracy
    const actualPageCount = this.countFiles('src/app/**/page.tsx');
    const documentedPageCount = this.extractNumber(claudeContent, /(\d+)\+ pages/);
    
    if (Math.abs(actualPageCount - documentedPageCount) > 3) {
      this.errors.push(
        `Page count mismatch: documented ${documentedPageCount}, actual ${actualPageCount}`
      );
    }

    // Check for required sections
    const requiredSections = [
      'Tech Stack',
      'Core Architecture',
      'Critical Patterns',
      'Hardcoding Prevention Rules',
      'Testing Framework',
      'Development Workflow'
    ];

    for (const section of requiredSections) {
      if (!claudeContent.includes(section)) {
        this.errors.push(`CLAUDE.md missing required section: ${section}`);
      }
    }
  }

  async validateComponentCounts() {
    // Validate that documented components actually exist
    const claudePath = path.join(this.projectRoot, 'CLAUDE.md');
    const claudeContent = fs.readFileSync(claudePath, 'utf8');
    
    // Extract component references from quick links
    const componentRefs = claudeContent.match(/\[(\w+\.tsx)\]/g) || [];
    
    for (const ref of componentRefs) {
      const componentName = ref.replace(/[\[\]]/g, '');
      const componentPath = path.join(this.webAppRoot, 'src/components', componentName);
      
      if (!fs.existsSync(componentPath)) {
        this.warnings.push(`Referenced component does not exist: ${componentName}`);
      }
    }
  }

  async validateFeatureStatus() {
    // Check if claimed features are actually implemented
    const featuresSection = await this.extractFeaturesFromDocs();
    
    for (const feature of featuresSection) {
      const isImplemented = await this.checkFeatureImplementation(feature);
      
      if (!isImplemented) {
        this.warnings.push(`Documented feature may not be fully implemented: ${feature}`);
      }
    }
  }

  async validateTranslations() {
    // Ensure bilingual documentation is consistent
    const enPath = path.join(this.webAppRoot, 'src/i18n/en.json');
    const ptPath = path.join(this.webAppRoot, 'src/i18n/pt.json');
    
    if (!fs.existsSync(enPath) || !fs.existsSync(ptPath)) {
      this.errors.push('Translation files missing');
      return;
    }

    try {
      const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
      const ptContent = JSON.parse(fs.readFileSync(ptPath, 'utf8'));
      
      const enKeys = this.flattenObject(enContent);
      const ptKeys = this.flattenObject(ptContent);
      
      // Check for missing translations
      for (const key of Object.keys(enKeys)) {
        if (!(key in ptKeys)) {
          this.warnings.push(`Missing Portuguese translation for: ${key}`);
        }
      }
      
      for (const key of Object.keys(ptKeys)) {
        if (!(key in enKeys)) {
          this.warnings.push(`Missing English translation for: ${key}`);
        }
      }
      
    } catch (error) {
      this.errors.push('Invalid JSON in translation files');
    }
  }

  countFiles(pattern) {
    try {
      const command = `find ${this.webAppRoot} -path "*/node_modules" -prune -o -name "${pattern.split('/').pop()}" -type f -print | wc -l`;
      const result = execSync(command, { encoding: 'utf8' }).trim();
      return parseInt(result);
    } catch (error) {
      return 0;
    }
  }

  extractNumber(content, regex) {
    const match = content.match(regex);
    return match ? parseInt(match[1]) : 0;
  }

  async getImplementedFeatures() {
    // Return list of features that are definitely implemented
    const features = [];
    
    const checkFeatures = [
      { name: 'Business Directory', file: 'BusinessMap.tsx' },
      { name: 'Twitter Integration', file: 'TwitterFeedWidget.tsx' },
      { name: 'Streaming Platform', file: 'StreamPlayer.tsx' },
      { name: 'Student Verification', file: 'StudentVerificationSystem.tsx' },
      { name: 'Premium Membership', file: 'MembershipTiers.tsx' }
    ];

    for (const feature of checkFeatures) {
      if (fs.existsSync(path.join(this.webAppRoot, 'src/components', feature.file))) {
        features.push(feature.name);
      }
    }

    return features;
  }

  async extractFeaturesFromDocs() {
    // Extract feature list from documentation
    const claudePath = path.join(this.projectRoot, 'CLAUDE.md');
    const content = fs.readFileSync(claudePath, 'utf8');
    
    const featuresMatch = content.match(/### Recent Major Features[^#]+/);
    if (!featuresMatch) return [];
    
    const features = featuresMatch[0].match(/\*\*([^:]+):\*\*/g) || [];
    return features.map(f => f.replace(/\*\*/g, '').replace(':', ''));
  }

  async checkFeatureImplementation(featureName) {
    // Basic implementation check
    const searchTerm = featureName.toLowerCase().replace(/\s+/g, '');
    
    try {
      const grepResult = execSync(
        `grep -r "${searchTerm}" ${this.webAppRoot}/src --include="*.tsx" --include="*.ts"`,
        { encoding: 'utf8' }
      );
      return grepResult.length > 0;
    } catch (error) {
      return false;
    }
  }

  flattenObject(obj, prefix = '') {
    const flattened = {};
    
    for (const key in obj) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'object' && value !== null) {
        Object.assign(flattened, this.flattenObject(value, newKey));
      } else {
        flattened[newKey] = value;
      }
    }
    
    return flattened;
  }

  reportResults() {
    console.log('\n📊 Documentation Validation Results:');
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All documentation is valid and up to date!');
      return;
    }

    if (this.errors.length > 0) {
      console.log('\n❌ Errors (must be fixed):');
      this.errors.forEach(error => console.log(`  - ${error}`));
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  Warnings (should be reviewed):');
      this.warnings.forEach(warning => console.log(`  - ${warning}`));
    }

    console.log('\n💡 To fix issues automatically, run: npm run docs:update');
  }
}

// Run validator if called directly
if (require.main === module) {
  const validator = new DocumentationValidator();
  validator.validate().then(isValid => {
    process.exit(isValid ? 0 : 1);
  }).catch(error => {
    console.error('Validation failed:', error);
    process.exit(1);
  });
}

module.exports = DocumentationValidator;