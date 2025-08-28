# Claude Integration Setup Guide for LusoTown Team

## Quick Setup (5 Minutes)

### 1. Get Your Anthropic API Key
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Sign in or create account
3. Navigate to **API Keys**
4. Click **Create Key**
5. Name it `LusoTown-GitHub-Actions`
6. Copy the key (starts with `sk-ant-`)

### 2. Add Secret to GitHub Repository
1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `ANTHROPIC_API_KEY`
5. Value: [paste your API key]
6. Click **Add secret**

### 3. Verify Setup
Create a test issue with the label `claude` to verify Claude responds.

## How to Use Claude Integration

### 🤖 Issue Assistance
**Trigger**: Create issue with `claude` label or mention `@claude` in comments

```markdown
Title: Need help with Portuguese translation system
Body: How do I properly implement bilingual support for event descriptions?
Labels: claude, enhancement
```

Claude will respond with LusoTown-specific guidance including:
- Code examples following our patterns
- Portuguese cultural requirements
- Zero hardcoding compliance
- Mobile-first design considerations

### 🔍 Pull Request Reviews
**Automatic**: Claude reviews all PRs to `main` branch

Claude checks for:
- ✅ Portuguese cultural authenticity
- ✅ Zero hardcoding compliance
- ✅ Bilingual EN/PT support
- ✅ Mobile-first community design
- ✅ Code quality and security

### 🛠️ Manual Analysis
**Trigger**: Use GitHub Actions workflow dispatch

1. Go to **Actions** → **Enhanced Claude Integration**
2. Click **Run workflow**
3. Select analysis type:
   - `full-review`: Comprehensive codebase review
   - `security-audit`: Security vulnerability scan
   - `portuguese-cultural-validation`: Cultural authenticity check
   - `hardcoding-check`: Zero hardcoding compliance
   - `performance-analysis`: Build and performance analysis

Results posted as new GitHub issue.

## Portuguese Community Context

Claude understands LusoTown's specific requirements:

### ✅ Cultural Authenticity
- Uses "Portuguese-speaking community" (not "Portuguese community")
- Targets "United Kingdom" (not just "London")
- Includes all lusophone nations (Portugal, Brazil, Cape Verde, etc.)

### ✅ Technical Standards
- Zero hardcoding policy (import from `/src/config/`)
- Bilingual translations required (`en.json`, `pt.json`)
- Mobile-first design for community members
- Quality gates: hardcoding audit, lint, TypeScript, build

### ✅ Platform Knowledge
- Event discovery and booking system
- Business directory with PostGIS mapping
- Simple cultural matching for friendships
- Transport coordination for community
- University partnerships (8 institutions)

## Security & Privacy

### 🔒 Data Protection
- Only public repository code sent to Claude
- No personal data or secrets exposed
- API responses not permanently stored
- GDPR compliant for Portuguese users

### 🛡️ Rate Limiting
- Workflow timeouts prevent runaway usage
- Conditional triggers reduce unnecessary calls
- Optimized prompts control token usage
- Model configuration allows cost control

### 🔑 Access Control
- API key encrypted in GitHub secrets
- Limited workflow permissions
- Branch protection enforced
- Required status checks for PRs

## Troubleshooting

### ❌ Claude Not Responding to Issues
1. Check issue has `claude` label
2. Verify `ANTHROPIC_API_KEY` secret exists
3. Check workflow run logs in Actions tab
4. Ensure API key is valid and has credits

### ❌ PR Reviews Failing
1. Check workflow permissions are correct
2. Verify branch protection rules allow required checks
3. Check for API rate limiting
4. Review workflow logs for specific errors

### ❌ Manual Analysis Not Working
1. Ensure you have workflow dispatch permissions
2. Check repository access level
3. Verify dependencies install correctly
4. Review analysis type selection

## Best Practices

### 📝 Issue Creation
- Use clear, specific titles
- Add `claude` label for AI assistance
- Include relevant code snippets
- Specify Portuguese community context when needed

### 🔄 PR Management
- Wait for Claude review before merging
- Address security and cultural feedback
- Ensure quality gates pass
- Review hardcoding audit results

### 🎯 Analysis Requests
- Use specific analysis types for focused results
- Review generated issues carefully
- Implement recommended improvements
- Track cultural authenticity suggestions

## Advanced Features

### 🚀 Workflow Integration
Claude integrates with existing quality gates:
- Runs after standard checks (lint, TypeScript, build)
- Provides cultural context for Portuguese features
- Validates zero hardcoding compliance
- Reviews mobile-first design patterns

### 📊 Quality Metrics
Track Claude's impact:
- Issue resolution time improvement
- Code review quality enhancement
- Cultural authenticity validation
- Security vulnerability detection

### 🤝 Team Collaboration
- Claude responses include actionable recommendations
- Cultural guidance specific to Portuguese community
- Technical patterns aligned with LusoTown architecture
- Integration with existing development workflow

## Support & Feedback

### 🆘 Getting Help
- Create issue with `claude` label for AI assistance
- Use workflow dispatch for specific analysis
- Check workflow logs for debugging
- Review security configuration guide

### 📈 Continuous Improvement
- Monitor Claude response quality
- Adjust prompts for better context
- Update cultural requirements as needed
- Optimize workflow performance

---
*🇵🇹 Configured for LusoTown Portuguese-speaking community platform*
*Quality gates: Cultural authenticity • Zero hardcoding • Bilingual support • Mobile-first design*