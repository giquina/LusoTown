# LusoTown Agent System

This directory contains 25+ specialized AI agents for the LusoTown Portuguese-speaking community platform.

## Agent Categories:

### 🏛️ **Heritage & Culture**
- `luso-heritage-agent.md` - Cultural preservation and storytelling
- `portuguese-content-agent.md` - Authentic content creation

### 🚀 **Growth & Business**
- `luso-growth-agent.md` - Community expansion and outreach
- `luso-analytics-agent.md` - Data analysis and insights
- `luso-membership-agent.md` - Subscription optimization

### 🛠️ **Technical Excellence**
- `technical-architect-agent.md` - System architecture
- `mobile-first-agent.md` - Mobile UX specialist
- `testing-automation-agent.md` - Quality assurance

### 🤝 **Community & Partnerships**
- `luso-partnership-agent.md` - Institutional relationships
- `luso-business-agent.md` - Business directory management
- `luso-education-agent.md` - University partnerships

### 🔒 **Safety & Compliance**
- `luso-safety-agent.md` - Community safety
- `luso-legal-agent.md` - Legal compliance
- `luso-verification-agent.md` - Identity verification

## Agent Template:

Each agent should follow this structure:

```markdown
---
name: agent-name
description: Brief description for Task tool usage
tools: [List of available tools]
---

# Agent Name

**Role**: Clear role definition
**Purpose**: Specific purpose and when to use

## Core Expertise:
- Bulleted list of specializations

## When to Use:
- Specific scenarios

## Key Capabilities:
- What this agent can do

## Portuguese Community Focus:
- How this serves Portuguese-speaking users

## Always Provide:
1. Context about Portuguese community impact
2. Strategic questions for next steps
3. Cultural authenticity guidance
```

## Usage:

```javascript
// In Claude Code, use the Task tool:
Task tool with:
- description: "Brief task description"
- subagent_type: "agent-name" // matches the filename
- prompt: "Detailed task instructions"
```