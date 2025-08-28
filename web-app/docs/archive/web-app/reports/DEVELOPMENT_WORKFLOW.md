# 🔄 LusoTown Development Workflow

**Last Updated: 2025-08-26**

**Purpose**: Streamlined development process for Portuguese-speaking community platform  
**Version**: 2.0  
**Status**: Active

---

## 🚀 Rapid Development Framework

### **1. Task Initiation Process**
```bash
# Correct Agent Usage Pattern
✅ CORRECT: Use actual agent names from system
❌ WRONG: Use advisory agent names from AGENTS.md

# Available Executable Agents:
- general-purpose         # Flexible tasks, research, analysis
- backend-engineer        # Server-side, APIs, databases  
- frontend-architect      # UI/UX, components, interfaces
- feature-builder         # New features, component development
- mobile-ux-specialist    # Mobile optimization, responsive design
- luso-heritage-agent     # Portuguese cultural content
- luso-growth-agent       # Community growth, analytics (NOT growth-analytics-advisor)
- deploy-manager          # Deployment, DevOps, production
- doc-writer              # Documentation, guides, README files
- bug-finder              # Quality assurance, testing, debugging
- refactor-helper         # Code optimization, cleanup, performance
```

### **2. Advisory → Execution Mapping**
```typescript
// How to use AGENTS.md advisory guidance with executable agents
interface WorkflowMapping {
  // Advisory Framework (AGENTS.md)     →  Executable Agent (Task tool)
  "strategic-decision-advisor"          →  "general-purpose" 
  "qa-mentor-advisor"                   →  "bug-finder"
  "performance-coach-advisor"           →  "refactor-helper"
  "security-guardian-advisor"           →  "backend-engineer" 
  "growth-analytics-advisor"            →  "luso-growth-agent"
  "instruction-compliance-advisor"      →  "general-purpose"
}
```

### **3. Prompt Enhancement Pattern**
```typescript
// Enhanced prompting using advisory guidance
const enhancedPrompt = `
Based on the ${advisoryAgent} guidance from AGENTS.md, implement:

ADVISORY CONTEXT: ${advisoryFramework}
EXECUTION FOCUS: ${specificRequirements}
CULTURAL REQUIREMENTS: Portuguese-speaking community authenticity
QUALITY STANDARDS: ${qualityFramework}

[Detailed implementation requirements...]
`
```

---

## ⚡ Accelerated Development Patterns

### **Pattern 1: Parallel Implementation**
```bash
# Launch multiple agents simultaneously
Task tool with:
1. backend-engineer: AI service infrastructure
2. frontend-architect: UI components  
3. mobile-ux-specialist: Mobile optimization
4. luso-heritage-agent: Cultural content
5. doc-writer: Documentation updates

# Result: 5x faster development
```

### **Pattern 2: Advisory-Guided Implementation**
```typescript
// Step 1: Consult advisory agent (AGENTS.md)
const guidance = await consultAdvisoryAgent('strategic-decision-advisor')

// Step 2: Execute with appropriate agent
const implementation = await executeWithAgent('feature-builder', {
  advisory: guidance,
  requirements: specificNeeds,
  culturalContext: 'Portuguese-speaking community platform'
})

// Step 3: Update tracking (IMPLEMENTATION.md)
updateImplementationProgress(implementation)
```

### **Pattern 3: Quality Assurance Integration**
```bash
# Pre-implementation QA
1. Check AGENTS.md for relevant advisory guidance
2. Review IMPLEMENTATION.md for existing patterns
3. Consult UI_UX_RULES.md for design standards
4. Reference AI_ENHANCEMENT_STRATEGY.md for AI features

# Post-implementation QA  
1. Update IMPLEMENTATION.md with progress
2. Run mobile optimization tests
3. Verify Portuguese cultural authenticity
4. Performance validation
5. Documentation updates
```

---

## 🛠️ Development Acceleration Tools

### **Tool 1: Quick Agent Selection**
```typescript
interface AgentSelector {
  taskType: 'implementation' | 'research' | 'optimization' | 'cultural' | 'deployment'
  recommendedAgent: ExecutableAgent
  advisoryReference: AdvisoryAgent
}

const selectAgent = (task: string): AgentSelector => {
  if (task.includes('AI') || task.includes('backend')) 
    return { taskType: 'implementation', recommendedAgent: 'backend-engineer', advisoryReference: 'performance-coach-advisor' }
  
  if (task.includes('UI') || task.includes('component'))
    return { taskType: 'implementation', recommendedAgent: 'frontend-architect', advisoryReference: 'qa-mentor-advisor' }
    
  if (task.includes('mobile') || task.includes('responsive'))
    return { taskType: 'optimization', recommendedAgent: 'mobile-ux-specialist', advisoryReference: 'performance-coach-advisor' }
    
  if (task.includes('Portuguese') || task.includes('cultural'))
    return { taskType: 'cultural', recommendedAgent: 'luso-heritage-agent', advisoryReference: 'instruction-compliance-advisor' }
    
  return { taskType: 'research', recommendedAgent: 'general-purpose', advisoryReference: 'strategic-decision-advisor' }
}
```

### **Tool 2: Implementation Velocity Tracker**
```typescript
// Track development speed and bottlenecks
interface VelocityTracker {
  dailyFeatures: number
  blockers: string[]
  acceleration_opportunities: string[]
  quality_metrics: QualityScore
}

// Auto-update IMPLEMENTATION.md with velocity data
const updateVelocity = async (metrics: VelocityTracker) => {
  await updateImplementationFile({
    section: 'velocity_tracking',
    data: metrics,
    timestamp: new Date()
  })
}
```

### **Tool 3: Cultural Authenticity Validator**
```typescript
// Ensure Portuguese cultural authenticity in all implementations
interface CulturalValidator {
  validatePortugueseContent(content: string): boolean
  checkRegionalConsiderations(feature: Feature): RegionalCheck
  validateCulturalColors(design: Design): boolean
  verifyBilingualSupport(component: Component): boolean
}
```

---

## 📊 Progress Tracking Integration

### **Git Integration**
```bash
# Standardized commit messages with implementation tracking
git commit -m "🤖 [AI-Phase1] Cultural notification personalization

Implementation Details:
- Advisory: strategic-decision-advisor framework
- Executor: backend-engineer  
- Progress: 40% complete (Phase 1.1)
- Ref: IMPLEMENTATION.md L.45-67
- Cultural: Portuguese regional personalization
- Performance: <100ms response time achieved

Next: Timing optimization algorithms"
```

### **Documentation Auto-Updates**
```typescript
// Auto-update documentation based on implementation progress
interface DocumentationSync {
  updateImplementationMD(progress: ImplementationProgress): void
  syncWithAgentsMD(advisoryUsage: AdvisoryUsage): void  
  updateTodoMD(completedTasks: Task[]): void
  generateProgressReport(): ProgressReport
}
```

---

## 🎯 Quality Standards Integration

### **Pre-Implementation Checklist**
```markdown
Before Starting Any Task:
□ Correct executable agent selected (not advisory name)
□ AGENTS.md advisory guidance reviewed
□ IMPLEMENTATION.md checked for existing patterns
□ UI_UX_RULES.md referenced for design standards  
□ Portuguese cultural requirements understood
□ Performance standards defined
□ Mobile-first approach confirmed
```

### **Post-Implementation Validation**
```markdown
After Completing Any Task:
□ IMPLEMENTATION.md updated with progress
□ Mobile optimization tested
□ Portuguese cultural authenticity verified
□ Performance benchmarks met
□ Documentation updated
□ Tests added/updated
□ Code review checklist completed
□ Ready for deployment
```

---

## 🚀 Deployment Pipeline Integration

### **Continuous Deployment Workflow**
```bash
# Automated deployment with implementation tracking
1. Implementation complete → Update IMPLEMENTATION.md
2. All tests pass → Mobile optimization verified
3. Cultural authenticity validated → Portuguese-speaking community standards met
4. Performance benchmarks achieved → Ready for production
5. Documentation updated → Deploy to Vercel
6. Post-deployment monitoring → Update success metrics
```

### **Rollback Procedures**
```typescript
interface RollbackProcedure {
  identifyIssue(): IssueType
  consultAdvisoryGuidance(issue: IssueType): AdvisoryResponse
  executeRollback(agent: ExecutableAgent): RollbackResult
  updateImplementationTracking(rollback: RollbackResult): void
}
```

---

*This workflow ensures rapid, high-quality development while maintaining Portuguese cultural authenticity and leveraging the full advisory framework for guidance.*