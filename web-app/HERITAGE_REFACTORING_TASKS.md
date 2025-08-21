# Heritage System Refactoring - Task List

## 🎯 Priority 1: Core User Experience Components

### Task 1.1: ConversationStarters.tsx 🔴 Critical
**Impact:** High - Core messaging functionality  
**Complexity:** High - 200+ lines of hardcoded content  

**Required Changes:**
- Replace hardcoded Portuguese conversation database
- Create `generateConversationStarters(heritage)` function
- Update food references: "pastéis de nata" → `heritage.culture.foods[0]`
- Update cultural references: "saudade" → `heritage.culture.values[0]`
- Update celebrations: "Santos Populares" → `heritage.culture.celebrations[0]`
- Update location references: "London Portuguese Life" → `${heritage.geography.diasporaHub.city} ${heritage.identity.name} Life`

**Code Pattern:**
```typescript
function generateConversationStarters(heritage: any): ConversationStarter[] {
  return [
    {
      id: 'food_1',
      textEn: `What's your favorite ${heritage.identity.name} dish?`,
      textPt: `Qual é o teu prato ${heritage.identity.name.toLowerCase()} favorito?`,
      category: `${heritage.identity.name} Food`,
      // ...
    }
  ]
}
```

### Task 1.2: CulturalPreferences.tsx 🟡 High
**Impact:** High - User onboarding and preferences  
**Complexity:** Medium  

**Required Changes:**
- Update cultural preference options to use heritage context
- Replace "Santos Populares" with dynamic celebrations
- Make preference categories heritage-aware

### Task 1.3: UserOnboardingFlow.tsx 🟡 High
**Impact:** High - New user experience  
**Complexity:** Medium  

**Required Changes:**
- Update cultural interest options
- Replace hardcoded Portuguese references in onboarding flow
- Make cultural verification heritage-aware

## 🎯 Priority 2: Component Architecture Updates

### Task 2.1: Rename Portuguese-Specific Components 🟠 Medium
**Impact:** Medium - Architecture improvement  
**Complexity:** Low - Mostly renaming  

**Components to Rename:**
```
PortugueseEventsShowcase.tsx → HeritageEventsShowcase.tsx
PortugueseCulturalHeritage.tsx → CulturalHeritage.tsx  
PortugueseCommunityActivity.tsx → CommunityActivity.tsx (already partially done)
PortugueseVRExperiences.tsx → HeritageVRExperiences.tsx
PortuguesePolls.tsx → HeritagePolls.tsx
PortugueseUniversityNetwork.tsx → HeritageUniversityNetwork.tsx
PortugueseCulturalNFTs.tsx → HeritageCulturalNFTs.tsx
```

**Update Required:**
- File renaming
- Import statement updates across codebase
- Component name updates

### Task 2.2: PortugueseEventsShowcase.tsx 🟠 Medium
**Impact:** Medium - Events display functionality  
**Complexity:** Medium  

**Required Changes:**
- Rename to HeritageEventsShowcase.tsx
- Update event categories to use heritage.streaming.contentCategories
- Replace hardcoded Portuguese event types
- Update cultural context in event descriptions

### Task 2.3: PortugueseCulturalHeritage.tsx 🟠 Medium
**Impact:** Medium - Cultural content display  
**Complexity:** Medium  

**Required Changes:**
- Rename to CulturalHeritage.tsx
- Use heritage.culture properties for all content
- Make cultural elements fully configurable
- Update visual elements to use heritage branding

## 🎯 Priority 3: Content and Communication

### Task 3.1: USA_PortugueseCommunity.tsx 🟢 Low
**Impact:** Low - Geographic variant  
**Complexity:** Low  

**Required Changes:**
- Rename to USA_HeritageCommunity.tsx
- Update geographic references
- Make cultural elements configurable

### Task 3.2: Streaming Platform Components 🟢 Low
**Impact:** Low - Feature-specific  
**Complexity:** Low  

**Components:**
- StreamSchedule.tsx - Update host names to be heritage-neutral
- CreatorTestimonials.tsx - Use dynamic creator profiles
- StreamReplayLibrary.tsx - Update content categories

### Task 3.3: Social Media Integration 🟢 Low
**Impact:** Low - Social features  
**Complexity:** Low  

**Components:**
- TwitterHashtagTabs.tsx - Make hashtags configurable
- ChatMessagingPreview.tsx - Update group names
- social/TrendingSection.tsx - Update trending hashtags

## 🔧 Implementation Guidelines

### Standard Refactoring Pattern

1. **Import Heritage Context:**
```typescript
import { useHeritage } from '@/context/HeritageContext'
```

2. **Create Content Generation Function:**
```typescript
function generateHeritageContent(heritage: any, geography: any) {
  return {
    culturalElements: heritage.culture.traditions,
    foodReferences: heritage.culture.foods,
    musicReferences: heritage.culture.music,
    locationReferences: geography.culturalAreas,
    identityName: heritage.identity.name
  }
}
```

3. **Update Component to Use Heritage:**
```typescript
function Component() {
  const { heritage } = useHeritage()
  const content = useMemo(() => 
    generateHeritageContent(heritage, heritage.geography.diasporaHub),
    [heritage]
  )
  
  // Use content.identityName instead of "Portuguese"
  // Use content.culturalElements instead of hardcoded elements
}
```

### Common Replacements

| Hardcoded | Heritage-Aware |
|-----------|----------------|
| `"Portuguese"` | `heritage.identity.name` |
| `"Portuguese community"` | `\`${heritage.identity.name} community\`` |
| `"Santos Populares"` | `heritage.culture.celebrations[0]` |
| `"pastéis de nata"` | `heritage.culture.foods[0]` |
| `"fado"` | `heritage.culture.music[0]` |
| `"saudade"` | `heritage.culture.values[0]` |
| `"Vauxhall"` | `heritage.geography.diasporaHub.culturalAreas[0]` |
| `"London"` | `heritage.geography.diasporaHub.city` |
| `"🇵🇹"` | `heritage.branding.symbols.flag` |

### Testing Checklist for Each Component

- [ ] Component loads with Portuguese heritage (default)
- [ ] Component loads with Italian heritage  
- [ ] No hardcoded Portuguese text visible
- [ ] Cultural elements display correctly for both heritages
- [ ] Layout adapts to different heritage name lengths
- [ ] All functionality works with heritage switching
- [ ] Performance remains acceptable with dynamic content

## 📅 Estimated Timeline

**Priority 1 Tasks:** 4-6 hours
- ConversationStarters.tsx: 3-4 hours (most complex)
- CulturalPreferences.tsx: 1 hour
- UserOnboardingFlow.tsx: 1 hour

**Priority 2 Tasks:** 3-4 hours
- Component renaming: 1 hour
- PortugueseEventsShowcase.tsx: 2 hours
- PortugueseCulturalHeritage.tsx: 1 hour

**Priority 3 Tasks:** 2-3 hours
- Various smaller components: 2-3 hours total

**Total Estimated Effort:** 9-13 hours

## 🎆 Success Criteria

1. **Complete Heritage Switching:** All components work with both Portuguese and Italian configurations
2. **No Hardcoded References:** Zero hardcoded Portuguese-specific strings in user-facing components
3. **Performance Maintained:** No significant performance degradation from dynamic content generation
4. **Visual Consistency:** Components maintain visual design across different heritages
5. **Cultural Accuracy:** Non-Portuguese heritages display culturally appropriate content
6. **Backwards Compatibility:** Existing Portuguese experience unchanged

This task list provides a clear roadmap for completing the heritage system refactoring while maintaining code quality and user experience.