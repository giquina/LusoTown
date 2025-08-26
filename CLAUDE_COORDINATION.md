# Claude Instance Coordination System

## 🔄 Purpose
Prevent duplicate work when multiple Claude Code instances are working on the LusoTown project simultaneously.

## 📋 Active Work Registry

### Current Session Status
**Last Updated**: August 26, 2025 - 14:50 UTC  
**Instance ID**: claude-instance-1  
**Status**: COMPLETED  
**Completed**: Progressive loading states system with demo page  

### Work Coordination Protocol

#### Before Starting Any Task:
1. **Check this file** for active work
2. **Run git status** to see recent changes
3. **Scan recent file timestamps** for concurrent modifications
4. **Update this registry** with your planned work
5. **Choose unique areas** to avoid overlap

#### Active Work Areas (Claim by updating):

| Area | Instance | Status | Started | Description |
|------|----------|---------|---------|-------------|
| Success Indicators | claude-instance-1 | ACTIVE | 14:40 | User action feedback system |
| Help Tooltips | claude-instance-2 | COMPLETED | 14:00 | GlobalUserGuidance & TooltipContext |
| Mobile Testing | AVAILABLE | - | - | Widget positioning mobile tests |
| Progressive Loading | claude-instance-1 | COMPLETED | 14:50 | ✅ Loading states system with demo page created |
| Modal Escape Hatches | AVAILABLE | - | - | Escape functionality for modals |
| Onboarding Header | AVAILABLE | - | - | Progress indicator in header |
| Cultural Tooltips | AVAILABLE | - | - | Portuguese cultural context tips |
| Gesture Hints | AVAILABLE | - | - | Mobile swipe navigation hints |
| Keyboard Navigation | AVAILABLE | - | - | Accessibility keyboard hints |
| Feature Discovery | AVAILABLE | - | - | Interactive feature tour |

## 🚨 Duplicate Prevention Rules

### 1. File Conflict Detection
```bash
# Always run this before major work
git status
ls -la src/components/ | tail -20  # Check recent files
```

### 2. Component Naming Convention
- Prefix with your instance ID if uncertain: `Claude1_ComponentName.tsx`
- Check existing components: `ls -la src/components/ | grep -i [keyword]`
- Avoid generic names that might clash

### 3. Required Coordination Commands
```bash
# Check recent activity (run every 15 minutes during development)
find src/components -name "*.tsx" -newermt "10 minutes ago" | head -10
find src/context -name "*.tsx" -newermt "10 minutes ago" | head -5

# Check for concurrent modifications
git diff --name-only HEAD~1 | head -20

# Look for parallel work patterns
ls -la src/components/ | grep -E "$(date +%H:%M|cut -c1-3)" | head -10
```

## 📁 File Ownership Tracking

### Recently Created/Modified Components:
- `GlobalUserGuidance.tsx` - Instance 2 (14:05)
- `TooltipContext.tsx` - Instance 2 (14:03)  
- `UserGuidanceSystem.tsx` - Instance 2 (14:09)
- `PALOPCountryCards.tsx` - Instance 2 (14:19)
- `ContextualHelpBubbles.tsx` - Instance 1 (14:35) [DUPLICATE - use GlobalUserGuidance instead]
- `AppDownloadBar.tsx` - Instance 1 (14:35)

### Architecture Areas:
- **Guidance System**: Instance 2 (COMPLETED)
- **Success Feedback**: Instance 1 (IN PROGRESS)
- **Mobile Testing**: AVAILABLE
- **Accessibility**: AVAILABLE
- **Performance**: AVAILABLE

## 🔧 Integration Strategy

### When Multiple Instances Work on Related Areas:
1. **Use composition over replacement**
2. **Create complementary systems**
3. **Share common interfaces/types**
4. **Avoid modifying same files simultaneously**
5. **Communicate through this coordination file**

### Example Good Coordination:
- Instance 1: Creates success indicators
- Instance 2: Creates guidance tooltips  
- Both: Use shared design tokens and contexts

### Example Bad Coordination:
- Instance 1: Creates ContextualHelpBubbles.tsx
- Instance 2: Creates GlobalUserGuidance.tsx
- Result: Duplicate functionality, wasted effort

## 🎯 Current Priority Areas (Avoid Duplication)

### ✅ COMPLETED (Don't Duplicate):
- App Download Bar dismissal functionality
- Chat widget positioning fixes
- PALOP heritage section CTAs
- Cultural calendar interactions
- Matches section user guidance
- Widget z-index management
- User guidance system (GlobalUserGuidance.tsx + TooltipContext.tsx)
- Playwright MCP integration
- Documentation updates (CLAUDE.md, AGENTS.md)

### 🔄 IN PROGRESS:
- Success indicators for user actions (Instance 1)

### 📋 AVAILABLE (Choose One):
- Mobile widget positioning testing
- Progressive loading states implementation
- Modal escape hatches
- Onboarding progress indicator
- Portuguese cultural tooltips integration
- Mobile gesture hints
- Keyboard navigation accessibility
- Interactive feature discovery tour

## 📞 Communication Protocol

### Update This File When:
1. Starting work on a new component
2. Completing a major task
3. Discovering duplicate work
4. Needing to coordinate related features

### Conflict Resolution:
1. **First created wins** - use the first working implementation
2. **Merge complementary features** - combine if both add value
3. **Communicate through git commit messages**
4. **Leave coordination notes** in this file

## 🚀 Quick Status Check Commands

```bash
# Quick duplicate check (run before starting work)
echo "=== Recent Components ==="
ls -la src/components/ | grep "$(date +%b\ %d)" | tail -10

echo "=== Git Status ==="
git status --porcelain | head -10

echo "=== Coordination File ==="
tail -20 CLAUDE_COORDINATION.md

echo "=== Active Work Check ==="
find src/components -name "*.tsx" -newermt "30 minutes ago" -exec basename {} \; | head -10
```

---

## 📝 Session Log Template

### Instance [ID] - [DATE] [TIME]
**Status**: ACTIVE/IDLE/COMPLETED  
**Working On**: [Brief description]  
**Files Modified**: [List of files]  
**Next Steps**: [What's planned]  
**Coordination Notes**: [Any messages for other instances]

---

*This coordination system ensures efficient parallel development without duplicate effort on the LusoTown Portuguese-speaking community platform.*