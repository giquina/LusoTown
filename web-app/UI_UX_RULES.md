# LusoTown UI/UX Development Rules

**Last Updated**: 2025-08-26  

**Platform Context**: 135+ pages, 496+ components - Production-ready Portuguese-speaking community platform

**Last Updated**: 2025-08-26  

**Platform Context**: 135+ pages, 496+ components - Production-ready Portuguese-speaking community platform

**Last Updated: 2025-08-26**

This file contains critical UI/UX rules that must be followed for all development work on the LusoTown platform.

## 🚨 CRITICAL BUTTON & CTA RULES

### Button Text Requirements
- **ALL CTA button text MUST be displayed in a single line**
- **NEVER allow button text to wrap to multiple lines**
- Examples of CORRECT formatting:
  - ✅ "Book Together" (single line)
  - ✅ "Start Streaming" (single line)  
  - ✅ "View Packages" (single line)
- Examples of INCORRECT formatting:
  - ❌ "Book" on first line, "Together" on second line
  - ❌ "Start" on first line, "Streaming" on second line

### CSS Implementation
```css
/* Apply these classes to ALL CTA buttons */
.cta-button {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

/* For mobile responsiveness without text wrapping */
@media (max-width: 768px) {
  .cta-button {
    font-size: 0.875rem; /* Reduce font size if needed */
    padding: 0.5rem 0.75rem; /* Adjust padding if needed */
    min-width: fit-content; /* Ensure button fits content */
  }
}
```

## 🗺️ GEOGRAPHIC TERMINOLOGY RULES

### Location References
- **NEVER use "London" when referring to the broader community**
- **ALWAYS use "United Kingdom" or "United Kingdom" for community-wide references**
- Examples:
  - ✅ "Connect with Portuguese speakers in the United Kingdom"
  - ✅ "Portuguese-speaking community in the United Kingdom"
  - ❌ "Portuguese-speaking community in London"
  - ❌ "Connect with Portuguese speakers in London"

### Specific Location Usage
- Only use "London" when referring to specific London-based events, venues, or services
- For general community features, matches, or platform descriptions, use "United Kingdom"

## 📱 MOBILE RESPONSIVENESS RULES

### Card Layouts
- **ALL card content must stay within card boundaries**
- **NO content should overflow outside card containers**
- **Test all cards at 375px, 768px, and 1024px breakpoints**

### Modal Sizing
- Mobile modals: `max-h-[85vh]` 
- Desktop modals: `max-w-[3xl]`
- Always implement click-outside-to-close functionality

### Navigation Dropdowns
- Center dropdowns using: `left-1/2 transform -translate-x-1/2`
- Add margin calculations to prevent viewport overflow
- Use: `marginLeft: 'max(-340px, calc(-50vw + 1rem))'`

## 🎯 CONTENT & MESSAGING RULES

### Streaming Services
- **NEVER use complex phrases like "Put your be streaming in London"**
- **Use simple, clear labels: "Streaming"**
- **Remove unnecessary words and keep it concise**

### Profile Information
- **Remove location text that overlays compatibility scores**
- **Use flags only for origin indicators when space is limited**
- **Ensure compatibility badges are clearly visible**

## 🎨 VISUAL HIERARCHY RULES

### Badge Positioning
- Compatibility badges: top-right corner
- Origin flags: top-left corner (flag only, no text on mobile)
- Verification badges: secondary position to avoid overlap

### Text Overflow
- All truncated text must use: `truncate max-w-[appropriate-size]`
- Ensure important information (like match percentages) is never hidden
- Priority: Match percentage > User actions > Secondary info

## 📋 DEVELOPMENT CHECKLIST

Before committing any UI changes, verify:

- [ ] All CTA buttons display text in single line
- [ ] No "London" references in community-wide contexts
- [ ] All cards contain content within boundaries  
- [ ] Mobile modals use correct max-height/width
- [ ] Navigation dropdowns center properly
- [ ] No text overlays that hide important information
- [ ] Compatibility scores are clearly visible
- [ ] All responsive breakpoints tested (375px, 768px, 1024px)

## 🚀 IMPLEMENTATION PRIORITIES

1. **Button text wrapping** - Highest priority, affects user experience
2. **Content overflow** - High priority, breaks visual design
3. **Geographic terminology** - Medium priority, affects messaging consistency
4. **Visual overlays** - Medium priority, affects information clarity

## 📝 TESTING REQUIREMENTS

### Mobile Testing
- Test on actual mobile devices when possible
- Use browser dev tools at 375px width minimum
- Verify touch targets are accessible (minimum 44px)
- Check text readability at small sizes

### Button Testing
- Test all button states (normal, hover, active, disabled)
- Verify text fits at all supported font sizes
- Check accessibility with screen readers
- Validate color contrast ratios

---

**Note**: These rules must be followed by all developers and designers. Any violations should be caught in code review and fixed before deployment.