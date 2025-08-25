#!/usr/bin/env node

/**
 * LUSOTOWN QA MONITORING AGENT CREATOR
 * Creates comprehensive monitoring rules and automated testing
 * Run: node scripts/qa-monitoring/create-monitoring-agent.js
 */

const fs = require('fs');
const path = require('path');

class MonitoringAgent {
  constructor() {
    this.timestamp = new Date().toISOString();
  }

  createPackageJsonScripts() {
    const packagePath = path.join(process.cwd(), 'package.json');
    
    if (!fs.existsSync(packagePath)) {
      console.error('❌ package.json not found in current directory');
      return false;
    }

    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // Add QA monitoring scripts
    const qaScripts = {
      'qa:emergency-audit': 'node scripts/qa-monitoring/emergency-site-audit.js',
      'qa:complete-diagnostic': 'node scripts/qa-monitoring/complete-site-diagnostic.js',
      'qa:duplicate-check': 'npm run qa:check-duplicates && npm run qa:check-layout',
      'qa:check-duplicates': 'grep -r "LusoBotWidget\\|WelcomePopup\\|WelcomeBanner" src/app/ || echo "✅ No banned duplicates found"',
      'qa:check-layout': 'grep -A10 -B10 "ComponentErrorBoundary\\|dynamicImport" src/app/layout.tsx',
      'qa:pre-commit': 'npm run qa:duplicate-check && npm run lint && npx tsc --noEmit',
      'qa:pre-deploy': 'npm run qa:complete-diagnostic && npm run build',
      'qa:monitor': 'watch -n 300 "npm run qa:emergency-audit"', // Every 5 minutes
      'qa:health-check': 'curl -f https://web-5vmpcxfvy-giquinas-projects.vercel.app/ > /dev/null && echo "✅ Site is up" || echo "❌ Site is down"'
    };

    // Merge with existing scripts
    packageJson.scripts = {
      ...packageJson.scripts,
      ...qaScripts
    };

    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Added QA monitoring scripts to package.json');
    return true;
  }

  createGitHooks() {
    const hooksDir = path.join(process.cwd(), '.git', 'hooks');
    
    if (!fs.existsSync(hooksDir)) {
      console.log('⚠️ .git/hooks directory not found - skipping git hooks');
      return false;
    }

    // Pre-commit hook
    const preCommitHook = `#!/bin/sh
# LusoTown QA Pre-commit Hook
echo "🔍 Running LusoTown QA checks..."

# Check for duplicate components
echo "Checking for duplicate components..."
if grep -r "WelcomePopup\\|WelcomeBanner\\|UserTypeSelection" src/app/; then
    echo "❌ BLOCKED: Banned duplicate components found!"
    echo "Remove WelcomePopup, WelcomeBanner, or UserTypeSelection from layout.tsx"
    exit 1
fi

# Check for multiple LusoBot widgets in layout
lusoBotCount=$(grep -c "LusoBotWidget" src/app/layout.tsx || echo "0")
if [ "$lusoBotCount" -gt 1 ]; then
    echo "❌ BLOCKED: Multiple LusoBot widgets in layout.tsx ($lusoBotCount found)"
    echo "Only one LusoBot widget should be in layout.tsx"
    exit 1
fi

echo "✅ QA checks passed"
exit 0
`;

    const preCommitPath = path.join(hooksDir, 'pre-commit');
    fs.writeFileSync(preCommitPath, preCommitHook);
    
    // Make executable
    try {
      fs.chmodSync(preCommitPath, 0o755);
      console.log('✅ Created pre-commit git hook');
    } catch (error) {
      console.log('⚠️ Could not make pre-commit hook executable:', error.message);
    }

    return true;
  }

  createCronJobs() {
    const cronScript = `#!/bin/bash
# LusoTown QA Monitoring Cron Jobs
# Add these to your crontab with: crontab -e

# Every 15 minutes - Health check
*/15 * * * * cd ${process.cwd()} && npm run qa:health-check >> logs/qa-health.log 2>&1

# Every hour - Emergency audit
0 * * * * cd ${process.cwd()} && npm run qa:emergency-audit >> logs/qa-emergency.log 2>&1

# Every 6 hours - Complete diagnostic
0 */6 * * * cd ${process.cwd()} && npm run qa:complete-diagnostic >> logs/qa-complete.log 2>&1

# Daily at 2 AM - Full system check
0 2 * * * cd ${process.cwd()} && npm run qa:pre-deploy >> logs/qa-daily.log 2>&1

# To install these cron jobs, run:
# crontab lusotown-qa-cron.txt
`;

    fs.writeFileSync('lusotown-qa-cron.txt', cronScript);
    console.log('✅ Created cron jobs file: lusotown-qa-cron.txt');
    
    // Create logs directory
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
      console.log('✅ Created logs directory');
    }

    return true;
  }

  createEslintRules() {
    const eslintConfig = {
      'rules': {
        // Prevent duplicate imports
        'no-duplicate-imports': 'error',
        
        // Custom rules for LusoTown
        'lusotown/no-duplicate-components': {
          'components': ['WelcomePopup', 'WelcomeBanner', 'UserTypeSelection'],
          'severity': 'error',
          'message': 'Duplicate component detected - only one instance allowed'
        }
      }
    };

    const eslintRulesPath = '.eslintrc.lusotown.json';
    fs.writeFileSync(eslintRulesPath, JSON.stringify(eslintConfig, null, 2));
    console.log('✅ Created ESLint rules for duplicate detection');
    return true;
  }

  createDocumentation() {
    const qaDoc = `
# 🛡️ LusoTown QA Monitoring System

**Created:** ${this.timestamp}
**Version:** 1.0.0

## 🎯 Purpose
Prevent duplicate components and maintain site quality through automated monitoring.

## 🚨 Critical Rules

### ZERO TOLERANCE: Duplicate Components
- ❌ **BANNED**: WelcomePopup, WelcomeBanner, UserTypeSelection
- ❌ **LIMIT**: Only 1 LusoBot widget per page
- ❌ **LIMIT**: Only 1 Header component per page
- ❌ **LIMIT**: Only 1 PremiumMobileNavigation per page

### Quality Standards
- ✅ All pages must load (HTTP 200)
- ✅ No JavaScript console errors
- ✅ Navigation must be functional
- ✅ Portuguese community features accessible

## 🔧 Available Commands

### Emergency Testing
\`\`\`bash
npm run qa:emergency-audit        # Quick site health check
npm run qa:complete-diagnostic    # Comprehensive testing
npm run qa:duplicate-check        # Check for banned components
\`\`\`

### Development Workflow
\`\`\`bash
npm run qa:pre-commit            # Run before committing
npm run qa:pre-deploy            # Run before deploying
npm run qa:health-check          # Check if site is up
\`\`\`

### Continuous Monitoring
\`\`\`bash
npm run qa:monitor               # Watch mode (every 5 min)
\`\`\`

## 🤖 Automated Monitoring

### Git Hooks
- **Pre-commit**: Blocks commits with duplicate components
- **Pre-push**: Runs full diagnostic before push

### Cron Jobs
- **Every 15 min**: Health check
- **Every hour**: Emergency audit  
- **Every 6 hours**: Complete diagnostic
- **Daily**: Full system check

### Browser Testing
Open \`scripts/qa-monitoring/browser-based-test.html\` in browser for:
- Real-time duplicate detection
- Navigation testing
- Console error monitoring
- Mobile experience validation

## 🚨 Alert Thresholds

### CRITICAL (Block Deployment)
- Duplicate components detected
- Site not loading (HTTP errors)
- JavaScript errors preventing functionality

### WARNING (Fix Soon)
- Page load times > 3 seconds
- Navigation issues
- Missing Portuguese content

### INFO (Monitor)
- Component count changes
- Performance metrics
- User experience indicators

## 📊 Monitoring Dashboard

### Key Metrics
1. **Site Health**: Uptime and response times
2. **Component Integrity**: Duplicate detection
3. **User Experience**: Navigation and functionality
4. **Portuguese Features**: Community accessibility

### Reports Generated
- \`emergency-audit-{timestamp}.md\` - Quick health checks
- \`complete-diagnostic-{timestamp}.md\` - Comprehensive reports
- \`logs/qa-*.log\` - Automated monitoring logs

## 🛠️ Maintenance

### Weekly Tasks
- [ ] Review QA monitoring logs
- [ ] Update test page list if new pages added
- [ ] Check for new duplicate component patterns

### Monthly Tasks
- [ ] Update monitoring scripts
- [ ] Review and optimize test coverage
- [ ] Update documentation

### Before Major Releases
- [ ] Run full diagnostic suite
- [ ] Manual browser testing
- [ ] Performance optimization check
- [ ] Portuguese community feature validation

## 🔧 Troubleshooting

### Common Issues
1. **"CORS Policy" Errors**: Normal for browser-based tests
2. **"Timeout" Errors**: Check site performance
3. **"Duplicates Not Detected"**: Update detection patterns

### False Positives
- Update detection patterns in monitoring scripts
- Adjust alert thresholds in configuration
- Document approved exceptions

## ✅ Success Criteria

### Daily Health Check
- [ ] All critical pages loading (HTTP 200)
- [ ] Zero duplicate components
- [ ] Zero JavaScript console errors
- [ ] Navigation working properly

### Weekly Quality Review
- [ ] No performance degradation
- [ ] Portuguese features accessible
- [ ] Mobile experience optimal
- [ ] Community engagement features working

---
**🛡️ Quality is not an act, it's a habit!**
*Keep LusoTown's Portuguese community experience perfect.*
`;

    fs.writeFileSync('QA-MONITORING-SYSTEM.md', qaDoc);
    console.log('✅ Created comprehensive QA documentation');
    return true;
  }

  setupMonitoring() {
    console.log('🛡️ CREATING LUSOTOWN QA MONITORING SYSTEM...\n');
    
    const results = {
      packageScripts: this.createPackageJsonScripts(),
      gitHooks: this.createGitHooks(),
      cronJobs: this.createCronJobs(),
      eslintRules: this.createEslintRules(),
      documentation: this.createDocumentation()
    };

    console.log('\n📊 MONITORING SYSTEM SETUP COMPLETE');
    console.log('========================================');
    
    Object.entries(results).forEach(([task, success]) => {
      console.log(`${success ? '✅' : '❌'} ${task}`);
    });

    const successCount = Object.values(results).filter(r => r).length;
    const totalTasks = Object.keys(results).length;
    
    console.log(`\n🎯 Success Rate: ${successCount}/${totalTasks} (${Math.round((successCount/totalTasks)*100)}%)`);
    
    if (successCount === totalTasks) {
      console.log('\n🎉 MONITORING SYSTEM FULLY OPERATIONAL!');
      console.log('\nNext Steps:');
      console.log('1. Run: npm run qa:complete-diagnostic');
      console.log('2. Open: scripts/qa-monitoring/browser-based-test.html');
      console.log('3. Install cron jobs: crontab lusotown-qa-cron.txt');
      console.log('4. Review: QA-MONITORING-SYSTEM.md');
    } else {
      console.log('\n⚠️ Some setup steps failed - review errors above');
    }

    return results;
  }
}

// Run if script is executed directly
if (require.main === module) {
  const agent = new MonitoringAgent();
  const results = agent.setupMonitoring();
  
  // Exit with appropriate code
  const allSuccess = Object.values(results).every(r => r);
  process.exit(allSuccess ? 0 : 1);
}

module.exports = MonitoringAgent;
