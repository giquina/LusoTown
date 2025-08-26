# LusoTown London Design System Reference Guide

**Last Updated: 2025-08-26**

*Unidos pela Língua (United by Language)*

## Portuguese-Inspired Color Palette

Our color system reflects the rich heritage and culture of Portuguese-speaking communities. Each color has cultural significance and specific use cases.

### Primary Colors

#### Azul Atlântico (Atlantic Blue) - `primary`
- **Main:** `#1e40af` (primary-500)
- **Light:** `#eff6ff` (primary-50) 
- **Dark:** `#1e3a8a` (primary-900)
- **Usage:** Main navigation, primary buttons, key brand elements
- **Cultural Meaning:** Deep ocean blue representing connection, trust, and the Atlantic that connects Portuguese-speaking nations

#### Verde Esperança (Hope Green) - `secondary`
- **Main:** `#059669` (secondary-500)
- **Light:** `#ecfdf5` (secondary-50)
- **Dark:** `#022c22` (secondary-900)
- **Usage:** Success states, growth indicators, positive actions
- **Cultural Meaning:** Vibrant emerald representing growth, heritage, and hope for the future

#### Dourado Sol (Golden Sun) - `accent`
- **Main:** `#f59e0b` (accent-500)
- **Light:** `#fffbeb` (accent-50)
- **Dark:** `#78350f` (accent-900)
- **Usage:** Highlights, warnings, warm interactions
- **Cultural Meaning:** Warm amber representing the golden sun, warmth, and joy

### Action Colors

#### Vermelho Paixão (Passion Red) - `action`
- **Main:** `#dc2626` (action-500)
- **Light:** `#fef2f2` (action-50)
- **Dark:** `#7f1d1d` (action-900)
- **Usage:** Urgent actions, important notifications, passionate elements
- **Cultural Meaning:** Bold red representing passion, unity, and celebration

#### Roxo Fado (Fado Purple) - `premium`
- **Main:** `#7c3aed` (premium-500)
- **Light:** `#faf5ff` (premium-50)
- **Dark:** `#312e81` (premium-900)
- **Usage:** Premium features, cultural content, sophisticated elements
- **Cultural Meaning:** Rich purple representing the soulful tradition of Fado music

#### Coral Tropical (Tropical Coral) - `coral`
- **Main:** `#f97316` (coral-500)
- **Light:** `#fff7ed` (coral-50)
- **Dark:** `#7c2d12` (coral-900)
- **Usage:** Warm accents, friendly interactions, community elements
- **Cultural Meaning:** Vibrant coral representing warm tropical interactions

## Standard Button Styles

### Primary CTA Buttons
Use for main actions like "JOIN NOW", "Sign Up", "Get Started"

```typescript
import { ButtonStyles } from '@/lib/design'

<a href="/signup" className={ButtonStyles.primaryCTA}>
  JOIN NOW
</a>
```

**Style:** Portuguese flag gradient (secondary → action → accent)
- `bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600`
- Hover: `from-secondary-700 via-action-700 to-accent-700`

### Secondary CTA Buttons
Use for supporting actions like "Browse Events", "Learn More"

```typescript
<a href="/events" className={ButtonStyles.secondaryCTA}>
  Browse Events
</a>
```

**Style:** Glassmorphism white with Portuguese accent borders
- `bg-white/70 backdrop-blur-lg border-2 border-gray-200`
- Hover: `border-secondary-300 text-secondary-700`

### Small Buttons
Use for card actions and secondary interactions

```typescript
<a href="/events/123" className={ButtonStyles.smallButton}>
  Reserve My Spot
</a>
```

**Style:** Ocean gradient (primary → secondary)
- `bg-gradient-to-r from-primary-500 to-secondary-500`

## Portuguese Gradient Combinations

### Flag-Inspired Gradients
```css
/* Main flag gradient */
.portuguese-flag {
  background: linear-gradient(to right, #059669, #dc2626, #f59e0b);
}

/* Subtle flag gradient */
.portuguese-flag-subtle {
  background: linear-gradient(to right, rgb(236 253 245), rgb(254 242 242), rgb(255 251 235));
}
```

### Brand Gradients
```css
/* Ocean gradient */
.ocean-gradient {
  background: linear-gradient(to right, #1e40af, #059669);
}

/* Heritage gradient */
.heritage-gradient {
  background: linear-gradient(to bottom right, #059669, #1e40af);
}

/* Sunset gradient */
.sunset-gradient {
  background: linear-gradient(to right, #f59e0b, #f97316);
}
```

## Typography Scale

### Headings
```typescript
import { Typography } from '@/lib/design'

// Display Large (Hero titles)
<h1 className={Typography.displayLarge}>Your Portuguese-speaking community</h1>

// Display (Section titles)
<h2 className={Typography.display}>Unidos pela Língua</h2>

// Heading 1-3 (Subsection titles)
<h3 className={Typography.heading1}>Community Features</h3>
```

### Body Text
```typescript
// Large body text (Hero descriptions)
<p className={Typography.bodyLarge}>Connect with Portuguese speakers...</p>

// Standard body text
<p className={Typography.body}>Join cultural events and celebrations...</p>

// Caption text
<span className={Typography.caption}>500+ Portuguese speakers</span>
```

## Card Styles

### Glassmorphism Cards
Perfect for overlays and featured content
```typescript
import { CardStyles } from '@/lib/design'

<div className={CardStyles.glassmorphism}>
  Content here
</div>
```

### Standard Cards
For regular content blocks
```typescript
<div className={CardStyles.standard}>
  Content here
</div>
```

### Featured Cards
For highlighted sections with Portuguese accents
```typescript
<div className={CardStyles.featured}>
  Content here
</div>
```

### Luxury Service Cards
For premium services with sophisticated styling
```typescript
<div className={CardStyles.luxury}>
  <div className="luxury-service-content">
    Premium service content with premium positioning
  </div>
</div>
```

### Streaming Platform Cards
For LusoTown TV and media content
```typescript
<div className={CardStyles.streaming}>
  <div className="streaming-overlay">
    Professional video content with premium gating
  </div>
</div>
```

## Icon Backgrounds

Use these color combinations for consistent icon styling:

```typescript
import { IconBackgrounds } from '@/lib/design'

// Cultural events
<div className={IconBackgrounds.cultural}>
  <MusicalNoteIcon className="w-6 h-6 text-white" />
</div>

// Social gatherings
<div className={IconBackgrounds.social}>
  <UsersIcon className="w-6 h-6 text-white" />
</div>

// Professional networking
<div className={IconBackgrounds.professional}>
  <BriefcaseIcon className="w-6 h-6 text-white" />
</div>
```

## Animations and Transitions

### Standard Transitions
All interactive elements should use consistent timing:
```css
transition: all 0.3s ease-out;
```

### Hover Effects
```css
/* Scale on hover */
hover:scale-105 transition-transform duration-300

/* Lift on hover */
hover:-translate-y-1 transition-all duration-300

/* Rotate on hover (for icons) */
group-hover:rotate-3 transition-transform duration-300
```

### Page Animations
```css
/* Fade in up */
animate-fade-in-up

/* Staggered animations */
animation-delay-100 /* 100ms */
animation-delay-200 /* 200ms */
animation-delay-300 /* 300ms */
```

## Spacing and Layout

### Container Spacing
```typescript
import { Spacing } from '@/lib/design'

// Section padding
<section className={Spacing.section}>  {/* py-20 */}

// Container width
<div className={Spacing.container}>     {/* container mx-auto px-4 sm:px-6 lg:px-8 */}

// Card padding
<div className={Spacing.cardPadding}>   {/* p-6 sm:p-8 */}
```

### Component Spacing
- **Section gaps:** `py-20` (80px vertical)
- **Component gaps:** `mb-16` (64px bottom margin)
- **Element gaps:** `gap-6 sm:gap-8` (24px → 32px responsive)
- **Text spacing:** `mb-4` (16px) for paragraphs, `mb-6` (24px) for headings

## Component Guidelines

### Modal Components
Use consistent responsive sizing and accessibility patterns:

```typescript
// Welcome modal responsive sizing
<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
  <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
    {/* Modal content */}
  </div>
</div>
```

**Key Standards:**
- **Mobile:** `max-h-[85vh]` to ensure proper viewport fit
- **Desktop:** `max-w-3xl` for optimal content width
- **Accessibility:** Click-outside-to-close functionality
- **Content:** Use 2x2 grid layout for feature cards on mobile

### Navigation Dropdowns
Use intelligent centering to prevent viewport overflow:

```typescript
// Centered dropdown positioning
<div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg">
  {/* Dropdown content */}
</div>
```

**Key Standards:**
- **Positioning:** `left-1/2 transform -translate-x-1/2` for center alignment
- **Overflow Prevention:** Add margin calculations for viewport boundaries
- **Responsive:** Adjust positioning based on available space
- **Consistency:** Apply same centering pattern across all dropdowns

## Best Practices

### CTA Button Guidelines
1. **Primary CTAs:** Always use "JOIN NOW" text for maximum impact
2. **Portuguese Gradient:** Use the flag-inspired gradient for primary actions
3. **Consistent Sizing:** `px-8 py-4` for desktop, responsive for mobile
4. **Hover States:** Include scale and shadow effects for tactile feedback
5. **Accessibility:** Ensure proper contrast ratios and focus states

### Color Usage Guidelines
1. **Primary (Azul Atlântico):** Navigation, primary buttons, brand elements
2. **Secondary (Verde Esperança):** Success, growth, positive actions
3. **Accent (Dourado Sol):** Highlights, warm touches, call-outs
4. **Action (Vermelho Paixão):** Urgent actions, important notifications
5. **Premium (Roxo Fado):** Cultural content, premium features
6. **Coral (Coral Tropical):** Community warmth, friendly interactions

### Responsive Design
- **Mobile First:** Start with mobile layouts and enhance for desktop
- **Breakpoints:** `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- **Typography:** Scale up font sizes responsively
- **Spacing:** Reduce padding/margins on mobile, increase on desktop

### Performance
- **CSS Classes:** Use Tailwind utility classes over custom CSS
- **Animations:** Prefer CSS transitions over JavaScript animations
- **Images:** Always include proper alt text and loading states
- **Gradients:** Use CSS gradients instead of background images

## Implementation Examples

### Complete Primary CTA
```tsx
<a 
  href="/signup"
  className="group relative inline-flex items-center justify-center bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 overflow-hidden"
>
  <span className="relative z-10 flex items-center gap-3">
    JOIN NOW
    <ArrowRightIcon className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
  </span>
</a>
```

### Feature Card with Portuguese Styling
```tsx
<div className="group bg-white/70 backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
  <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
    <HeartIcon className="w-8 h-8 text-white" />
  </div>
  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-secondary-600 transition-colors duration-300">
    Portuguese-speaking community
  </h3>
  <p className="text-gray-600 leading-relaxed">
    Connect with Portuguese speakers who share your culture and heritage.
  </p>
</div>
```

## Utility Function

Use the `cn` utility for conditional class names:
```typescript
import { cn } from '@/lib/design'

const buttonClass = cn(
  'base-button-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class'
)
```

---

*This design system preserves Portuguese cultural identity while ensuring modern, accessible, and performant user interfaces. Unidos pela Língua! 🇵🇹*