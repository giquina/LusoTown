# Claude AI Integration for LusoTown

This directory contains Claude AI configuration for automated code review and quality analysis specifically tailored for the LusoTown Portuguese-speaking community platform.

## <¯ Overview

Claude AI has been configured to understand and validate LusoTown's community-first architecture, ensuring all code changes align with our mission to serve 750+ Portuguese-speaking community members across the United Kingdom.

## =Á Configuration Files

### `community-guidelines.md`
**Purpose**: Core principles for Claude's code review process
**Contains**:
- Community-first architecture requirements
- Portuguese cultural authenticity standards
- Zero hardcoding policy enforcement
- Bilingual EN/PT implementation guidelines
- Mobile-first design principles for Portuguese community

### `pr-review-prompts.md`
**Purpose**: Structured prompts for pull request reviews
**Contains**:
- Community impact assessment framework
- Cultural authenticity validation checklist
- Technical quality review templates
- Portuguese community-specific review questions

## > Active Workflows

### 1. PR Review (`claude-pr-review.yml`)
**Triggers**: Pull requests to main branch
**Features**:
- Automatic community relevance detection
- Integration with existing quality gates (hardcoding audit, lint, TypeScript)
- Portuguese cultural authenticity validation
- Community impact assessment
- Mobile-first design review for Portuguese-speaking users

### 2. Quality Gate Analysis (`quality-gate-with-claude.yml`)
**Triggers**: Push/PR to main, manual dispatch
**Features**:
- Comprehensive quality gate execution
- Claude analysis of quality results with community focus
- Deployment readiness assessment
- Portuguese community impact evaluation
- Mobile validation for community accessibility

### 3. Community Focus Validation (`community-focus-validation.yml`)
**Triggers**: Changes to src/, i18n/, config/ directories
**Features**:
- Portuguese cultural terminology validation
- PALOP (lusophone nations) inclusivity checks
- Bilingual implementation validation
- Cultural branding verification
- Mobile-first community design review

### 4. Issue Assistant (`claude.yml`)
**Triggers**: New issues, `claude` label, `@claude` mentions
**Features**:
- Community-focused issue analysis
- Portuguese cultural considerations for bug reports
- Priority assessment based on community impact
- Actionable recommendations following zero-hardcoding policy

## = Required Secrets

### `ANTHROPIC_API_KEY`
**Required for**: All Claude workflows
**Setup**: Add to repository secrets in GitHub Settings
**Usage**: Enables Claude API calls for code analysis

## <¯ Community Focus Areas

### Cultural Authenticity
- **Terminology**: "Portuguese-speaking community" (not "Portuguese community")
- **Geography**: UK-wide scope (not London-only)
- **Representation**: All 8 PALOP nations included
- **Branding**: Portuguese cultural colors and elements

### Technical Standards
- **Zero Hardcoding**: All data from `/web-app/src/config/` files
- **Bilingual Support**: EN/PT translations mandatory
- **Mobile-First**: Responsive design for Portuguese community
- **Quality Gates**: Hardcoding audit, lint, TypeScript must pass

### Community Impact
- **Priority**: How changes benefit 750+ community members
- **Accessibility**: Mobile optimization for community usage patterns
- **Cultural Elements**: Portuguese cultural authenticity maintained
- **University Integration**: Support for 8 university partnerships

## =€ Usage

### Automatic Activation
- All workflows trigger automatically on relevant events
- No manual intervention required for standard development
- Claude provides contextual analysis based on change type

### Manual Triggers
- Add `claude` label to issues for analysis
- Comment `@claude` in issues for assistance
- Use `workflow_dispatch` for manual quality gate runs

### Review Integration
- Claude comments appear automatically on PRs
- Quality gate results include community impact assessment
- Cultural validation runs on config/i18n changes
- Issue analysis provides community-focused recommendations

## =Ê Quality Metrics

### Community Platform Score
- **Hardcoding Audit**: Must pass (deployment blocker)
- **Cultural Authenticity**: Portuguese community terminology
- **Bilingual Implementation**: EN/PT parity maintained
- **Mobile Accessibility**: Responsive design validated
- **Community Impact**: Changes benefit Portuguese speakers

### Success Indicators
-  Zero hardcoding violations
-  "Portuguese-speaking community" terminology used
-  UK-wide geographic references
-  EN/PT translation parity maintained
-  Mobile-first responsive design
-  Portuguese cultural elements preserved

## =' Troubleshooting

### Claude API Issues
- **Symptom**: API calls failing
- **Solution**: Check `ANTHROPIC_API_KEY` secret configuration
- **Fallback**: Workflows provide community guidelines without Claude

### Missing Context
- **Symptom**: Claude analysis lacks community context
- **Solution**: Update `community-guidelines.md` with new requirements
- **Maintenance**: Regular review of cultural authenticity standards

### Quality Gate Failures
- **Symptom**: Repeated hardcoding audit failures
- **Solution**: Follow zero hardcoding policy, use config imports
- **Prevention**: Run `npm run audit:hardcoding` before commits

## =á Security & Privacy

### API Key Management
- **Storage**: GitHub repository secrets only
- **Access**: Limited to workflow execution context
- **Rotation**: Regular API key rotation recommended

### Data Handling
- **Code Analysis**: Temporary processing only
- **No Storage**: No code or analysis stored by Claude
- **Privacy**: Community data references only aggregate metrics

## =È Continuous Improvement

### Feedback Integration
- Community feedback incorporated into guidelines
- Portuguese cultural authenticity standards updated
- Mobile experience optimization based on usage patterns

### Metrics Tracking
- Quality gate success rates monitored
- Community impact assessment effectiveness
- Portuguese cultural authenticity compliance

### Regular Updates
- Quarterly review of community guidelines
- Annual assessment of Portuguese diaspora needs
- Ongoing optimization for 750+ community members

---

## =¬ Community Support

For questions about Claude integration or Portuguese community platform development:

1. **Create Issue**: Add `claude` label for AI analysis
2. **Comment Mention**: Use `@claude` in existing issues
3. **Manual Review**: Reference community guidelines for standards
4. **Quality Gates**: Run workflows manually via Actions tab

**Mission**: Ensure all development serves the Portuguese-speaking community across the United Kingdom with cultural authenticity, technical excellence, and community-first design.