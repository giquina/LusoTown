# LusoTown Automated Workflows and Hook System

## Overview

The LusoTown platform features an automated workflow system that triggers specialized agents based on specific events, code changes, and community activities. This ensures consistent quality, cultural authenticity, and community safety across all platform operations.

## Automated Workflow Types

### 1. Content Review Workflows

#### Portuguese Content Translation Workflow
**Trigger**: New English content added to platform
**Auto-Activated Agents**: 
- `luso-content-agent` → Review and translate content
- `luso-heritage-agent` → Ensure cultural authenticity
- `doc-writer` → Document content changes

**Process**:
1. Detect new English content in components or pages
2. Auto-invoke luso-content-agent for Portuguese translation
3. Cultural review by luso-heritage-agent
4. Safety review by luso-safety-agent for adult appropriateness
5. Documentation update by doc-writer

#### Event Content Creation Workflow
**Trigger**: New event creation or event content updates
**Auto-Activated Agents**:
- `luso-events-agent` → Create culturally appropriate event details
- `luso-business-agent` → Identify venue and business partnerships
- `luso-safety-agent` → Ensure adult event safety guidelines

### 2. Community Safety Workflows

#### Content Moderation Workflow
**Trigger**: User-generated content submission or community reports
**Auto-Activated Agents**:
- `luso-safety-agent` → Primary content moderation
- `luso-content-agent` → Cultural sensitivity review
- `doc-writer` → Log moderation decisions and guidelines

**Process**:
1. Auto-scan user submissions for potential safety issues
2. Cultural appropriateness review for Portuguese community
3. Adult community standards verification (18+ focus)
4. Automated response or escalation to human moderators

#### Community Incident Response Workflow
**Trigger**: Safety reports, harassment complaints, or community conflicts
**Auto-Activated Agents**:
- `luso-safety-agent` → Immediate incident assessment
- `luso-heritage-agent` → Cultural context evaluation
- `doc-writer` → Incident documentation and resolution tracking

### 3. Platform Growth Workflows

#### New User Onboarding Workflow
**Trigger**: New user registration or profile completion
**Auto-Activated Agents**:
- `luso-growth-agent` → Personalized onboarding optimization
- `luso-content-agent` → Bilingual welcome experience
- `luso-events-agent` → Personalized event recommendations

#### Portuguese Community Outreach Workflow
**Trigger**: Low engagement periods or community growth targets
**Auto-Activated Agents**:
- `luso-growth-agent` → SEO and marketing campaign activation
- `luso-partnership-agent` → Community partnership outreach
- `luso-business-agent` → Business community engagement

### 4. Technical Quality Workflows

#### Code Quality Assurance Workflow
**Trigger**: New code commits or pull requests
**Auto-Activated Agents**:
- `bug-finder` → Automated code quality review
- `refactor-helper` → Code optimization suggestions
- `deploy-manager` → Deployment readiness assessment

#### Performance Monitoring Workflow
**Trigger**: Performance metrics degradation or user experience issues
**Auto-Activated Agents**:
- `bug-finder` → Performance issue identification
- `refactor-helper` → Optimization recommendations
- `doc-writer` → Performance documentation updates

## Hook System Implementation

### Git Hooks

#### Pre-Commit Hook
**Purpose**: Ensure code quality and cultural appropriateness before commits
**Activated Agents**:
```bash
#!/bin/bash
# .git/hooks/pre-commit

# Auto-trigger agents for code review
claude-agent bug-finder --review-changes
claude-agent luso-content-agent --check-portuguese-content
claude-agent doc-writer --update-documentation
```

#### Pre-Push Hook
**Purpose**: Final deployment readiness check
**Activated Agents**:
```bash
#!/bin/bash
# .git/hooks/pre-push

# Deployment readiness verification
claude-agent deploy-manager --deployment-check
claude-agent luso-safety-agent --community-safety-review
```

### Application Hooks

#### Content Creation Hooks
**Location**: `web-app/src/hooks/useContentHooks.ts`
**Purpose**: Auto-trigger Portuguese content agents when creating new content

```typescript
export const useContentCreationHook = () => {
  const triggerContentReview = async (content: string) => {
    // Auto-activate Portuguese content agents
    await claudeAgent('luso-content-agent', {
      action: 'review-content',
      content: content,
      language: 'portuguese'
    });
    
    await claudeAgent('luso-heritage-agent', {
      action: 'cultural-authenticity-check',
      content: content
    });
  };
};
```

#### Event Management Hooks
**Location**: `web-app/src/hooks/useEventHooks.ts`
**Purpose**: Automatically optimize events for Portuguese community

```typescript
export const useEventManagementHook = () => {
  const triggerEventOptimization = async (eventData: EventData) => {
    // Auto-activate event-related agents
    await claudeAgent('luso-events-agent', {
      action: 'optimize-event',
      eventData: eventData,
      community: 'portuguese-adults'
    });
    
    await claudeAgent('luso-business-agent', {
      action: 'identify-partnerships',
      eventType: eventData.type,
      location: eventData.location
    });
  };
};
```

### Community Interaction Hooks

#### User Safety Hooks
**Location**: `web-app/src/hooks/useSafetyHooks.ts`
**Purpose**: Real-time safety monitoring and response

```typescript
export const useCommunitysafety Hooks = () => {
  const triggerSafetyReview = async (userAction: UserAction) => {
    // Auto-activate safety agents for community protection
    await claudeAgent('luso-safety-agent', {
      action: 'review-user-action',
      userAction: userAction,
      communityStandards: 'adult-portuguese-community'
    });
  };
};
```

## Scheduled Workflows

### Daily Workflows

#### Community Health Check
**Schedule**: Daily at 9:00 AM UTC
**Activated Agents**:
- `luso-safety-agent` → Community safety metrics review
- `luso-growth-agent` → Daily engagement analysis
- `bug-finder` → System health monitoring

#### Content Quality Review
**Schedule**: Daily at 6:00 PM UTC
**Activated Agents**:
- `luso-content-agent` → Portuguese content quality assessment
- `luso-heritage-agent` → Cultural authenticity verification
- `doc-writer` → Documentation currency check

### Weekly Workflows

#### Portuguese Community Engagement Analysis
**Schedule**: Weekly on Mondays at 10:00 AM UTC
**Activated Agents**:
- `luso-growth-agent` → Weekly growth metrics analysis
- `luso-events-agent` → Event performance review
- `luso-business-agent` → Business partnership assessment

#### Platform Optimization Review
**Schedule**: Weekly on Fridays at 4:00 PM UTC
**Activated Agents**:
- `refactor-helper` → Code optimization opportunities
- `feature-builder` → New feature analysis based on community needs
- `deploy-manager` → Deployment optimization review

### Monthly Workflows

#### Portuguese Cultural Calendar Integration
**Schedule**: Monthly on 1st at 12:00 PM UTC
**Activated Agents**:
- `luso-events-agent` → Monthly cultural event planning
- `luso-heritage-agent` → Cultural significance analysis
- `luso-partnership-agent` → Cultural institution engagement

## Emergency Response Workflows

### Community Crisis Response
**Trigger**: High volume of safety reports or community conflicts
**Auto-Activated Agents**:
1. `luso-safety-agent` → Immediate crisis assessment
2. `luso-heritage-agent` → Cultural context evaluation
3. `luso-partnership-agent` → External community leader engagement
4. `doc-writer` → Crisis documentation and response tracking

### Technical Emergency Response
**Trigger**: Platform downtime or critical technical issues
**Auto-Activated Agents**:
1. `bug-finder` → Immediate issue identification
2. `deploy-manager` → Emergency deployment procedures
3. `refactor-helper` → Quick fix implementation
4. `doc-writer` → Incident documentation

## Workflow Configuration

### Environment Variables
```bash
# .env.local
CLAUDE_AGENT_AUTO_ACTIVATION=true
PORTUGUESE_COMMUNITY_FOCUS=adult-18plus
CULTURAL_AUTHENTICITY_REQUIRED=true
SAFETY_MONITORING_ENABLED=true
```

### Agent Activation Thresholds
```typescript
// .claude/config.ts
export const workflowConfig = {
  contentReview: {
    autoActivateThreshold: 1, // Activate on any new content
    requiredAgents: ['luso-content-agent', 'luso-safety-agent']
  },
  communityGrowth: {
    autoActivateThreshold: 5, // Activate on 5+ new users per day
    requiredAgents: ['luso-growth-agent', 'luso-partnership-agent']
  },
  safetyMonitoring: {
    autoActivateThreshold: 1, // Activate on any safety report
    requiredAgents: ['luso-safety-agent', 'luso-heritage-agent']
  }
};
```

## Monitoring and Analytics

### Workflow Performance Metrics
- Agent activation frequency and success rates
- Workflow completion times and efficiency
- Community satisfaction with automated responses
- Cultural authenticity maintenance scores
- Platform safety and security indicators

### Dashboard Integration
The workflow system integrates with the LusoTown admin dashboard to provide:
- Real-time workflow status monitoring
- Agent performance analytics
- Community health indicators
- Automated alert systems for critical issues

## Best Practices for Workflow Management

### Agent Coordination
- Ensure agents work collaboratively, not in isolation
- Maintain clear handoff procedures between agents
- Implement fallback mechanisms for agent failures

### Cultural Sensitivity
- Always include Portuguese community specialists in cultural content workflows
- Maintain adult focus (18+) across all automated processes
- Respect Portuguese regional variations and diaspora experiences

### Quality Assurance
- Implement human oversight for critical community decisions
- Maintain audit logs for all automated actions
- Regular review and optimization of workflow effectiveness

### Performance Optimization
- Monitor workflow execution times and resource usage
- Optimize agent activation thresholds based on community needs
- Implement caching and batching for high-frequency workflows

The LusoTown automated workflow system ensures consistent quality, cultural authenticity, and community safety while enabling the platform to scale efficiently with the growing Portuguese adult community in London.