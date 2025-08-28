# 🔗 Agent Mapping Guide

**Purpose**: Bridge between Advisory Framework (AGENTS.md) and Executable Agents (Task tool)  
**Solves**: Agent name mismatch errors  
**Status**: Active Reference

---

## ⚠️ Problem Solution

### **The Issue**
```bash
❌ Error: Agent type 'growth-analytics-advisor' not found
❌ Error: Agent type 'security-guardian-advisor' not found  
❌ Error: Agent type 'performance-coach-advisor' not found
```

### **The Cause**
- **Advisory Agents**: Exist in AGENTS.md as guidance frameworks
- **Executable Agents**: Actually available in Task tool system
- **Mismatch**: Using advisory names in Task tool fails

---

## 🎯 Correct Agent Mapping

### **Available Executable Agents**
```typescript
type ExecutableAgent = 
  | 'general-purpose'        // ✅ Flexible research, analysis, complex tasks
  | 'backend-engineer'       // ✅ APIs, databases, server-side implementation  
  | 'frontend-architect'     // ✅ UI/UX, React components, interfaces
  | 'feature-builder'        // ✅ New feature development, component creation
  | 'mobile-ux-specialist'   // ✅ Mobile optimization, responsive design
  | 'luso-heritage-agent'    // ✅ Portuguese cultural content, authenticity
  | 'luso-growth-agent'      // ✅ Community growth, analytics, optimization
  | 'deploy-manager'         // ✅ Deployment, DevOps, production management
  | 'doc-writer'             // ✅ Documentation, guides, README updates
  | 'bug-finder'             // ✅ QA testing, debugging, issue detection
  | 'refactor-helper'        // ✅ Code optimization, performance, cleanup
```

### **Advisory → Executable Mapping**

| Advisory Agent (AGENTS.md) | Executable Agent (Task tool) | Use Case |
|----------------------------|------------------------------|----------|
| `strategic-decision-advisor` | `general-purpose` | Strategic planning, feature decisions |
| `qa-mentor-advisor` | `bug-finder` | Quality assurance, testing strategies |
| `performance-coach-advisor` | `refactor-helper` | Performance optimization, speed |
| `security-guardian-advisor` | `backend-engineer` | Security implementation, privacy |
| `growth-analytics-advisor` | `luso-growth-agent` | Community growth, analytics |
| `instruction-compliance-advisor` | `general-purpose` | Rule compliance, guidance |

---

## 🚀 Usage Patterns

### **Pattern 1: Direct Mapping**
```typescript
// ❌ WRONG (fails)
Task tool with:
- subagent_type: "growth-analytics-advisor"

// ✅ CORRECT (works)  
Task tool with:
- subagent_type: "luso-growth-agent"
- prompt: "Following growth-analytics-advisor guidance from AGENTS.md, implement..."
```

### **Pattern 2: Advisory-Enhanced Prompting**
```typescript
// Enhanced prompts that reference advisory framework
const enhancedPrompt = `
ADVISORY CONTEXT: Following strategic-decision-advisor guidance from AGENTS.md
EXECUTION AGENT: general-purpose
TASK: Feature prioritization for Portuguese-speaking community platform

Apply the strategic decision framework to evaluate:
1. Business impact vs technical complexity
2. Portuguese-speaking community cultural fit  
3. Resource requirements and timeline
4. Expected ROI and community growth

[Specific task details...]
`
```

### **Pattern 3: Multi-Agent Coordination**
```bash
# Coordinate multiple executable agents using advisory guidance
1. general-purpose: Strategic planning (strategic-decision-advisor guidance)
2. backend-engineer: Security implementation (security-guardian-advisor guidance)  
3. refactor-helper: Performance optimization (performance-coach-advisor guidance)
4. luso-growth-agent: Analytics implementation (growth-analytics-advisor guidance)
```

---

## 📊 Implementation Examples

### **AI Enhancement Tasks**

#### **Example 1: AI Notification System**
```typescript
// ❌ WRONG
Task tool with:
- subagent_type: "performance-coach-advisor"
- description: "AI notification optimization"

// ✅ CORRECT
Task tool with:
- subagent_type: "backend-engineer"  
- description: "AI notification optimization"
- prompt: "Following performance-coach-advisor guidelines from AGENTS.md, implement AI notification system with:
  - <100ms response time optimization
  - Portuguese cultural personalization
  - Mobile-first performance standards
  - Community behavior pattern learning"
```

#### **Example 2: Community Analytics**
```typescript
// ❌ WRONG  
Task tool with:
- subagent_type: "growth-analytics-advisor"
- description: "Portuguese-speaking community analytics"

// ✅ CORRECT
Task tool with:
- subagent_type: "luso-growth-agent"
- description: "Portuguese-speaking community analytics"  
- prompt: "Using growth-analytics-advisor framework from AGENTS.md, develop:
  - Portuguese diaspora growth patterns
  - Cultural event engagement analysis
  - Community retention optimization
  - London Portuguese market intelligence"
```

#### **Example 3: Security Implementation**
```typescript
// ❌ WRONG
Task tool with:
- subagent_type: "security-guardian-advisor"
- description: "AI privacy framework"

// ✅ CORRECT  
Task tool with:
- subagent_type: "backend-engineer"
- description: "AI privacy framework"
- prompt: "Following security-guardian-advisor standards from AGENTS.md, implement:
  - GDPR compliance for Portuguese-speaking community data
  - Cultural sensitivity in AI data handling
  - Privacy-by-design for AI features
  - Portuguese-speaking community trust protection"
```

---

## 🔄 Workflow Integration

### **Step-by-Step Process**
```bash
1. 📖 Consult AGENTS.md for advisory guidance
2. 🔍 Check AGENT_MAPPING.md for correct executable agent
3. 📝 Craft enhanced prompt with advisory context
4. 🚀 Execute with correct agent name
5. 📊 Update IMPLEMENTATION.md with progress
6. ✅ Verify results meet advisory standards
```

### **Quality Checklist**
```markdown
Before Task Execution:
□ Correct executable agent selected (not advisory name)
□ Advisory guidance referenced in prompt
□ Portuguese cultural context included
□ Performance standards specified
□ Expected outcome defined

After Task Completion:  
□ Results meet advisory framework standards
□ Portuguese cultural authenticity maintained
□ Performance benchmarks achieved
□ Implementation tracking updated
□ Ready for next development phase
```

---

## 🎯 Quick Reference Commands

### **Most Common Mappings**
```bash
# Analytics & Growth
luso-growth-agent (not growth-analytics-advisor)

# Performance & Optimization  
refactor-helper (not performance-coach-advisor)

# Security & Privacy
backend-engineer (not security-guardian-advisor)

# Quality & Testing
bug-finder (not qa-mentor-advisor)

# Strategic Planning
general-purpose (not strategic-decision-advisor)

# Rule Compliance
general-purpose (not instruction-compliance-advisor)
```

### **Emergency Fix Commands**
```bash
# If you get agent errors, quickly fix with:
1. Replace advisory agent name with executable agent
2. Add advisory context to prompt  
3. Reference AGENTS.md framework in description
4. Proceed with corrected agent name
```

---

*This mapping guide eliminates agent name errors and accelerates development by providing clear execution paths for all advisory guidance.*