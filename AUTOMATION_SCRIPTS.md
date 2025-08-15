# LusoTown Automation Scripts Documentation

This document outlines the automation scripts developed for the LusoTown Portuguese community platform to streamline documentation maintenance and deployment verification.

## Overview

The LusoTown project includes two main automation scripts designed to maintain documentation accuracy and ensure deployment quality:

1. **update-claude-md.sh** - Documentation maintenance and project stats updating
2. **post-deployment-update.sh** - Comprehensive post-deployment verification

These scripts are located in the `/scripts/` directory at the project root.

## Script 1: update-claude-md.sh

### Purpose
Automatically updates project documentation with current statistics and provides guidance for manual documentation updates.

### Location
`/workspaces/LusoTown/scripts/update-claude-md.sh`

### Features

#### Automatic Statistics Collection
- **Page Count**: Scans `web-app/src/app` for all `page.tsx` files
- **Component Count**: Counts all `.tsx` files in `web-app/src/components`
- **Real-time Updates**: Provides current project statistics

#### Project Structure Analysis
- **Tree Generation**: Creates current project structure overview
- **Component Listing**: Generates sorted list of all components
- **Page Inventory**: Maps all available pages in the application

#### Documentation Guidance
- **Update Reminders**: Lists sections that may need manual updates
- **Change Detection**: Highlights areas requiring attention
- **Best Practices**: Provides guidance for documentation maintenance

### Usage

```bash
# From project root
./scripts/update-claude-md.sh
```

### Output Files Generated
- `PROJECT_STRUCTURE_CURRENT.txt` - Current project tree structure
- `COMPONENTS_LIST.txt` - Sorted list of all components
- `PAGES_LIST.txt` - List of all application pages

### Sample Output
```
🤖 Updating CLAUDE.md documentation...
📝 Recent commits:
5a27505 ✨ Add My Network CTA section to Events page
📊 Current project stats:
Pages: 47
Components: 90
✅ Documentation update preparation complete!
```

## Script 2: post-deployment-update.sh

### Purpose
Comprehensive post-deployment verification system that ensures all systems are functioning correctly after deployment.

### Location
`/workspaces/LusoTown/scripts/post-deployment-update.sh`

### Features

#### Documentation Updates
- **CLAUDE.md Update**: Runs the documentation update script
- **Project Stats**: Ensures documentation reflects current state

#### Build Verification
- **Production Build**: Runs `npm run build` to verify build process
- **Type Checking**: Executes `npx tsc --noEmit` for TypeScript validation
- **Code Quality**: Runs ESLint to ensure code standards

#### System Verification
- **Agent System**: Checks agent system functionality
- **Git Status**: Provides current repository status
- **Deployment Status**: Verifies deployment readiness

### Usage

```bash
# From project root
./scripts/post-deployment-update.sh
```

### Verification Steps Performed

1. **Documentation Update**
   ```bash
   ./scripts/update-claude-md.sh
   ```

2. **Build Verification**
   ```bash
   cd web-app
   npm run build
   ```

3. **Type Checking**
   ```bash
   npx tsc --noEmit
   ```

4. **Code Quality**
   ```bash
   npm run lint
   ```

5. **Agent System Check**
   ```bash
   node .claude/invoke-agent.js --list
   ```

6. **Git Status Review**
   ```bash
   git status --short
   ```

### Sample Output
```
🚀 Post-deployment update script started...
📚 Updating CLAUDE.md...
🔨 Running build verification...
🔍 Running type check...
🧹 Running linter...
🤖 Checking agent system...
📊 Current git status:
✅ Post-deployment update complete!
```

## Script Integration Workflow

### Pre-Deployment
1. Run development server: `cd web-app && npm run dev`
2. Test all functionality locally
3. Update documentation: `./scripts/update-claude-md.sh`
4. Commit changes with updated documentation

### Post-Deployment
1. Execute comprehensive verification: `./scripts/post-deployment-update.sh`
2. Review all output for any issues
3. Test deployed application functionality
4. Update documentation if needed

### Continuous Integration
Both scripts can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions integration
- name: Update Documentation
  run: ./scripts/update-claude-md.sh

- name: Post-Deployment Verification
  run: ./scripts/post-deployment-update.sh
```

## Portuguese Community Context

### Cultural Considerations
- Scripts include Portuguese community-specific checks
- Bilingual functionality verification reminders
- Portuguese cultural feature validation prompts

### Community Features Validated
- **Networking System**: My Network page functionality
- **Chauffeur Services**: Portuguese transportation services
- **Bilingual Interface**: Language switching functionality
- **Cultural Elements**: Portuguese heritage features

## Error Handling and Troubleshooting

### Common Issues

#### Permission Errors
```bash
# Make scripts executable
chmod +x scripts/update-claude-md.sh
chmod +x scripts/post-deployment-update.sh
```

#### Build Failures
- Check TypeScript errors: `npx tsc --noEmit`
- Review ESLint issues: `npm run lint`
- Verify dependencies: `npm install`

#### Agent System Issues
- Ensure `.claude/invoke-agent.js` exists
- Check agent configuration: `.claude/agents.json`
- Verify agent system functionality

### Script Debugging

#### Enable Verbose Output
```bash
# Add to script for debugging
set -x  # Enable debug mode
set -e  # Exit on errors
```

#### Check Script Status
```bash
# Monitor script execution
tail -f /tmp/update-claude.log
```

## Maintenance and Updates

### When to Update Scripts

1. **New Features Added**: Update to include new feature checks
2. **Build Process Changes**: Modify build verification steps
3. **Documentation Structure Changes**: Update documentation paths
4. **Agent System Changes**: Modify agent verification logic

### Script Versioning

Current version: **v1.0** (August 2025)
- Initial implementation
- Basic documentation updates
- Build verification
- Agent system checks

### Best Practices

#### Script Development
- Use clear, descriptive output messages
- Include error handling and validation
- Provide helpful guidance for manual steps
- Follow bash scripting best practices

#### Documentation Maintenance
- Update scripts when project structure changes
- Include new features in verification process
- Maintain Portuguese community context
- Keep automation scripts documented

## Security Considerations

### Script Safety
- Scripts only read project files and run standard build commands
- No external network requests or sensitive operations
- Safe to run in CI/CD environments
- No modification of production data

### Access Control
- Scripts should be executable only by authorized users
- Consider script signing for production environments
- Regular security review of script contents

## Future Enhancements

### Planned Improvements
1. **Enhanced Reporting**: More detailed output and logging
2. **Email Notifications**: Automated deployment status emails
3. **Performance Metrics**: Build time and size tracking
4. **Integration Tests**: Automated functionality testing
5. **Portuguese Localization**: Bilingual script output

### Community Feedback Integration
- Script output can include community feature status
- Portuguese cultural element verification
- Bilingual functionality confirmation
- Heritage feature validation

---

**Unidos pela Língua** - Automated excellence for the Portuguese community platform.

*LusoTown Automation Scripts - Streamlining development for Portuguese heritage preservation.*