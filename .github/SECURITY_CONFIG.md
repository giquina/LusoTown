# GitHub Repository Security Configuration for Claude Integration

## Repository Settings Configuration

### 1. Branch Protection Rules (Settings → Branches)

**Protected Branch: `main`**
```yaml
# Required status checks (all must pass)
Required Status Checks:
  - "quality-assurance"           # From deploy.yml
  - "claude-pr-review / claude-pr-review"  # From claude-enhanced.yml
  
# Additional protection rules
Enforce admins: false
Restrict pushes: true
Allow force pushes: false
Allow deletions: false

# PR Requirements
Require a pull request before merging: true
Require approvals: 1
Dismiss stale reviews: true
Require review from code owners: true (if CODEOWNERS file exists)
Require status checks to pass: true
Require branches to be up to date: true
```

### 2. Required Status Checks Setup

Navigate to Settings → Branches → Add rule for `main`:

```yaml
Branch name pattern: main

☑️ Require a pull request before merging
  ☑️ Require approvals: 1
  ☑️ Dismiss stale pull request approvals when new commits are pushed
  ☑️ Require review from code owners

☑️ Require status checks to pass before merging
  ☑️ Require branches to be up to date before merging
  
  Required status checks:
    ☑️ quality-assurance
    ☑️ claude-pr-review / claude-pr-review
    
☑️ Restrict pushes that create files
☑️ Do not allow bypassing the above settings
```

### 3. Action Permissions (Settings → Actions → General)

**Actions permissions:**
```yaml
Actions permissions: "Allow enterprise, and select non-enterprise, actions and reusable workflows"

Selected actions and reusable workflows:
  ☑️ Allow actions created by GitHub
  ☑️ Allow Marketplace actions by verified creators
  ☑️ Allow specified actions and reusable workflows:
    - actions/checkout@v4
    - actions/setup-node@v4
    - actions/github-script@v7
    - anthropic/*  # If any official Anthropic actions exist
```

**Workflow permissions:**
```yaml
Workflow permissions: "Read and write permissions"

☑️ Allow GitHub Actions to create and approve pull requests: false
```

### 4. Repository Access Control

**Collaborators & teams** (Settings → Manage access):
```yaml
# Base permissions for repository
Base permissions: Read

# Team/User specific permissions
Maintainers: Admin
Developers: Write  
Reviewers: Triage
Claude-Bots: Read (for Claude integrations)
```

## GitHub Token Permissions

The enhanced Claude workflow automatically uses optimized permissions:

```yaml
permissions:
  contents: read          # Read repository content
  issues: write          # Comment on issues  
  pull-requests: write   # Comment on PRs
  checks: write          # Create status checks
  statuses: write        # Update commit statuses
  discussions: write     # Participate in discussions
```

## Security Best Practices Implemented

### 1. API Key Security
- ✅ Anthropic API key stored as encrypted repository secret
- ✅ Never exposed in logs or output
- ✅ Scoped to repository only (not organization-wide)
- ✅ Rotation reminder set (quarterly)

### 2. Workflow Security
- ✅ Limited permissions per job
- ✅ Timeout limits on all jobs (10-20 minutes)
- ✅ Input validation and sanitization
- ✅ Error handling without secret exposure

### 3. Rate Limiting & Usage Control
- ✅ Timeouts prevent runaway Claude API usage
- ✅ Conditional triggers reduce unnecessary API calls
- ✅ Structured prompts optimize token usage
- ✅ Model configuration allows cost control

### 4. Content Security
- ✅ PR content sanitized before sending to Claude
- ✅ Repository context limited to public information
- ✅ No secret values passed to Claude API
- ✅ Response validation before posting

## Required Environment Variables

Add these to repository secrets (Settings → Secrets and variables → Actions):

```bash
# Core Secrets (Required)
ANTHROPIC_API_KEY="sk-ant-your-key-here"

# Vercel Integration (Already configured)
VERCEL_TOKEN="your-vercel-token"
VERCEL_ORG_ID="your-org-id" 
VERCEL_PROJECT_ID="your-project-id"

# Optional Claude Configuration
CLAUDE_MODEL="claude-3-5-sonnet-20241022"  # Default if not set
CLAUDE_MAX_TOKENS="4000"                   # Default if not set
CLAUDE_TEMPERATURE="0.1"                   # Default if not set
```

## Audit & Monitoring

### 1. Security Monitoring
Monitor these for security concerns:
- Workflow run frequency and duration
- API key usage patterns
- Failed authentication attempts
- Unusual repository access patterns

### 2. Regular Security Audits
Quarterly checklist:
- [ ] Rotate Anthropic API key
- [ ] Review workflow permissions
- [ ] Audit collaborator access
- [ ] Check for exposed secrets in logs
- [ ] Validate branch protection rules
- [ ] Review action marketplace permissions

### 3. Incident Response
If security breach suspected:
1. Immediately revoke Anthropic API key
2. Review recent workflow runs
3. Check for unauthorized repository access
4. Generate new API key and update secrets
5. Review and update security configurations

## Compliance & Privacy

### 1. Data Handling
- Repository content sent to Claude is public code only
- No personal data or credentials sent to Claude API
- API responses stored temporarily in GitHub Actions only
- No long-term data retention by Claude integration

### 2. Portuguese Community Data Protection
- Cultural content reviews respect community privacy
- No personal user data exposed to Claude
- GDPR compliance maintained for Portuguese users
- Community guidelines enforced in all Claude responses

### 3. Audit Trail
All Claude interactions logged:
- Workflow execution logs
- API call timestamps
- Response summaries (no full content stored)
- User trigger information