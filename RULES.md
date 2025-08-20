# LusoTown Design & Development Rules

This file provides strict rules and standards for maintaining consistency across all pages, components, and features in the LusoTown platform. **ALL** new pages and components MUST follow these rules.

## 🎨 Design System Standards

### Hero Section Template (MANDATORY)
Every hero section MUST follow this exact structure and quality:

```jsx
{/* Hero Section */}
<section className="relative overflow-hidden bg-gradient-to-br from-[COLOR]-50 via-white to-[ACCENT]-50 pt-20">
  <div className="absolute inset-0 bg-[url('BACKGROUND_IMAGE')] bg-cover bg-center opacity-10"></div>
  <div className="absolute inset-0 bg-gradient-to-br from-[COLOR]-900/10 via-transparent to-[ACCENT]-900/10"></div>
  <div className="relative container-width py-16 lg:py-24">
    <div className="text-center max-w-4xl mx-auto">
      {/* Badge */}
      <motion.div className="mb-6">
        <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-[COLOR]-100 via-[SECONDARY]-50 to-accent-100 border border-[COLOR]-200 shadow-lg">
          <Icon className="w-4 h-4 mr-2 text-[COLOR]-600" />
          <span className="bg-gradient-to-r from-[COLOR]-600 via-[SECONDARY]-600 to-accent-600 bg-clip-text text-transparent font-bold">
            Badge Text
          </span>
        </span>
      </motion.div>

      {/* Title with Desktop/Mobile Responsive */}
      <motion.h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
        <span className="hidden sm:block">Desktop Title</span>
        <span className="sm:hidden">Mobile Title</span>
      </motion.h1>

      {/* Subtitle with Desktop/Mobile Responsive */}
      <motion.p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        <span className="hidden sm:block">Desktop Subtitle</span>
        <span className="sm:hidden">Mobile Subtitle</span>
      </motion.p>

      {/* Feature dots */}
      <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-[COLOR]-500 rounded-full"></div>
          <span>Feature 1</span>
        </div>
        {/* Add 2-3 more feature dots */}
      </motion.div>

      {/* CTAs */}
      <motion.div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-gradient-to-r from-[COLOR]-600 via-[SECONDARY]-600 to-accent-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-[COLOR]-700 hover:via-[SECONDARY]-700 hover:to-accent-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1">
          Primary CTA
        </button>
        <a href="#section" className="border border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl">
          Secondary CTA
        </a>
      </motion.div>
    </div>
  </div>
</section>
```

### Color Scheme (MANDATORY)
ONLY use these Portuguese brand colors:

```css
/* Primary Colors */
primary-50: #f0f9ff
primary-600: #2563eb
primary-700: #1d4ed8

/* Secondary Colors */
secondary-50: #fef2f2
secondary-600: #dc2626
secondary-700: #b91c1c

/* Accent Colors */
accent-50: #f0fdf4
accent-600: #16a34a
accent-700: #15803d

/* Action Colors */
action-500: #f59e0b
action-600: #d97706
action-700: #b45309

/* Premium Colors */
premium-50: #fdf4ff
premium-600: #9333ea
premium-700: #7c3aed

/* Coral (for specific features) */
coral-600: #f97316
```

### Typography Rules (MANDATORY)
1. **Hero Titles**: `text-4xl lg:text-6xl font-black`
2. **Section Titles**: `text-3xl lg:text-4xl font-bold`
3. **Card Titles**: `text-xl lg:text-2xl font-semibold`
4. **Body Text**: `text-gray-600` for descriptions
5. **Feature Text**: `text-sm text-gray-600` for small features

### Mobile-First Responsive Design (MANDATORY)
1. **Always provide mobile and desktop versions** for titles and subtitles
2. **Use responsive grids**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
3. **Enhanced touch targets**: minimum 44px height for buttons
4. **Mobile-optimized spacing**: smaller padding on mobile

### Portuguese Language Support (MANDATORY)
Every text element MUST support both English and Portuguese:

```jsx
const { language } = useLanguage();
const isPortuguese = language === "pt";

// Example usage
<h1>{isPortuguese ? "Título Português" : "English Title"}</h1>
```

### Animation Standards (MANDATORY)
Use Framer Motion for all animations:

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
>
  Content
</motion.div>
```

## 🧩 Component Standards

### Card Components (MANDATORY Structure)
```jsx
<div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
  {/* Optional Popular Badge */}
  {popular && (
    <div className="absolute top-4 right-4 z-10">
      <span className="bg-gradient-to-r from-action-500 to-secondary-500 text-white px-3 py-1 rounded-full text-sm font-bold">
        {isPortuguese ? "Mais Popular" : "Most Popular"}
      </span>
    </div>
  )}

  {/* Image with hover effect */}
  <div className="relative h-64 overflow-hidden">
    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
  </div>

  {/* Content */}
  <div className="p-8">
    <h3 className="text-2xl font-bold text-gray-900 mb-4">Title</h3>
    <p className="text-gray-600 mb-6">Description</p>
    
    {/* Features with checkmarks */}
    <div className="space-y-2 mb-6">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-2">
          <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
          <span className="text-sm text-gray-600">{feature}</span>
        </div>
      ))}
    </div>

    {/* CTA Button */}
    <button className="w-full bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white py-3 rounded-xl font-semibold hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl">
      CTA Text
    </button>
  </div>
</div>
```

### Feature Grid (MANDATORY Structure)
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {features.map((feature, index) => (
    <motion.div
      key={feature.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="w-16 h-16 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <feature.icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {isPortuguese ? feature.titlePortuguese : feature.title}
      </h3>
      <p className="text-gray-600">
        {isPortuguese ? feature.descriptionPortuguese : feature.description}
      </p>
    </motion.div>
  ))}
</div>
```

### Modal Component Standards (MANDATORY Structure)
All modal components MUST follow this responsive pattern with proper click-outside-to-close functionality:

```jsx
const [showModal, setShowModal] = useState(false);

// Modal component structure
{showModal && (
  <div 
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    onClick={(e) => {
      // Click outside to close
      if (e.target === e.currentTarget) {
        setShowModal(false);
      }
    }}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-3xl max-h-[85vh] sm:max-h-[80vh] overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header with close button */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {t('modal.title')}
        </h2>
        <button
          onClick={() => setShowModal(false)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <XMarkIcon className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="overflow-y-auto max-h-[calc(85vh-120px)] sm:max-h-[calc(80vh-120px)]">
        <div className="p-6">
          {/* Modal content goes here */}
        </div>
      </div>

      {/* Footer with actions (optional) */}
      <div className="border-t border-gray-100 p-6 bg-gray-50">
        <div className="flex flex-row gap-3 justify-end">
          <button
            onClick={() => setShowModal(false)}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-medium hover:from-primary-700 hover:to-secondary-700 transition-all"
          >
            {t('common.confirm')}
          </button>
        </div>
      </div>
    </motion.div>
  </div>
)}
```

**Modal Requirements:**
1. **Responsive sizing**: `max-w-sm` mobile, `max-w-3xl` desktop
2. **Height limits**: `max-h-[85vh]` mobile, `max-h-[80vh]` desktop
3. **Click-outside-to-close**: Proper event handling with `stopPropagation`
4. **Backdrop**: Always use `bg-black/50 backdrop-blur-sm`
5. **Animations**: Use Framer Motion with scale and opacity transitions
6. **Scrollable content**: Account for header/footer in max-height calculations
7. **Close button**: Always include X button in top-right
8. **Event handling**: Prevent background scroll when modal is open

### Navigation Dropdown Standards (MANDATORY Positioning)
All navigation dropdowns MUST use this centered positioning pattern with overflow protection:

```jsx
const [showDropdown, setShowDropdown] = useState(false);

// Dropdown component structure
<div className="relative">
  <button
    onClick={() => setShowDropdown(!showDropdown)}
    className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors"
  >
    {t('nav.menuItem')}
    <ChevronDownIcon className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
  </button>

  {showDropdown && (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
      {/* Dropdown content */}
      <div className="py-2">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="block px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            onClick={() => setShowDropdown(false)}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-primary-600" />
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-gray-500">{item.subtitle}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )}
</div>
```

**Dropdown Requirements:**
1. **Centered positioning**: Use `left-1/2 transform -translate-x-1/2`
2. **Overflow protection**: Fixed width (e.g., `w-64`) to prevent viewport overflow
3. **Intelligent margins**: Use `mt-2` for proper spacing from trigger
4. **Z-index**: Always use `z-50` or higher to appear above other content
5. **Shadow and borders**: Use `shadow-2xl border border-gray-100`
6. **Auto-close**: Close dropdown when item is clicked
7. **Hover states**: Include hover effects for better UX
8. **Icon integration**: Include icons with consistent sizing (`w-5 h-5`)
9. **Viewport boundary handling**: Ensure dropdown doesn't overflow screen edges

**Mobile Dropdown Adjustments:**
```jsx
// For mobile responsiveness
<div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 sm:w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
  {/* Adjust width based on screen size */}
</div>
```

### Welcome Popup Standards (MANDATORY)
All welcome popups MUST follow this structure with specific text requirements and mobile-optimized layout:

```jsx
const [showWelcome, setShowWelcome] = useState(true);

// Welcome popup component
{showWelcome && (
  <div 
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        setShowWelcome(false);
      }
    }}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="p-6 text-center border-b border-gray-100">
        <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <HeartIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('welcome.title')}
        </h2>
        <p className="text-gray-600">
          {t('welcome.subtitle')}
        </p>
      </div>

      {/* Feature cards in 2x2 grid for mobile */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {welcomeFeatures.map((feature, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-2xl">
              <feature.icon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {t(`welcome.features.${feature.key}.title`)}
              </h3>
              <p className="text-xs text-gray-600">
                {t(`welcome.features.${feature.key}.description`)}
              </p>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGetStarted}
            className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all"
          >
            {t('welcome.getStarted')}
          </button>
          
          {/* MANDATORY: Skip button with exact text */}
          <button
            onClick={() => setShowWelcome(false)}
            className="w-full text-gray-500 hover:text-gray-700 py-2 text-sm font-medium transition-colors"
          >
            {language === 'pt' ? 'Pular por agora' : 'Skip for now'}
          </button>
        </div>
      </div>
    </motion.div>
  </div>
)}
```

**Welcome Popup Requirements:**
1. **Skip button text**: EXACTLY "Skip for now" (EN) / "Pular por agora" (PT)
2. **Mobile layout**: 2x2 grid for feature cards (`grid-cols-2 gap-4`)
3. **Compact sizing**: `max-w-md` width, compact padding for mobile
4. **Feature cards**: 4 features maximum in 2x2 grid with icons
5. **Action hierarchy**: Primary CTA button followed by skip text link
6. **Icon consistency**: Use `w-8 h-8` for feature icons, `w-16 h-16` for header icon
7. **Text sizing**: Smaller text sizes for mobile (`text-sm`, `text-xs`)
8. **Accessibility**: Proper focus management and keyboard navigation
9. **Background interaction**: Click outside or skip button to close
10. **Animation timing**: Use 0.3s duration for smoother welcome experience

**Welcome Popup Accessibility Standards:**
```jsx
// Focus management
useEffect(() => {
  if (showWelcome) {
    // Focus first interactive element
    const firstButton = document.querySelector('[data-welcome-popup] button');
    firstButton?.focus();
  }
}, [showWelcome]);

// Keyboard handling
const handleKeyDown = (e) => {
  if (e.key === 'Escape') {
    setShowWelcome(false);
  }
};
```

## 📝 Content Guidelines

### Messaging Standards (MANDATORY)
1. **Always mention "Portuguese speakers"** not just "community members"
2. **London & UK focus**: Target Portuguese speakers living in London & UK
3. **Cultural comfort**: Emphasize Portuguese-speaking hosts, guides, and cultural familiarity
4. **Professional tone**: Welcoming, inclusive, professional
5. **No family targeting**: Focus on individuals and professionals

### CTA Standards (MANDATORY)
1. **Maximum 2 words** for CTAs: "Book Now", "View Tours", "Join Now"
2. **Pricing format**: "From £XX" format
3. **Action-oriented**: Use verbs like "Book", "Join", "Discover", "Experience"

### Image Standards (MANDATORY)
1. **Use Cloudinary URLs** only: `https://res.cloudinary.com/dqhbeqttp/image/upload/...`
2. **Professional Portuguese community images** preferred
3. **London landmarks** for tourism/transport pages
4. **Always include alt text** in both English and Portuguese

## 🛠 Technical Standards

### Import Structure (MANDATORY Order)
```jsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  // Heroicons
} from "@heroicons/react/24/outline";
import { 
  // Lucide icons 
} from "lucide-react";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
// Other imports
```

### State Management (MANDATORY)
```jsx
const { t, language } = useLanguage();
const [showModal, setShowModal] = useState(false);
const isPortuguese = language === "pt";
```

### File Naming (MANDATORY)
1. **Components**: PascalCase (e.g., `LondonToursPage.tsx`)
2. **Pages**: lowercase with hyphens (e.g., `london-tours/page.tsx`)
3. **Utilities**: camelCase (e.g., `transportServices.ts`)

## 🔧 Header & Navigation Rules

### Dropdown Links (MANDATORY)
When adding hover text to navigation links, use this structure:

```jsx
<a
  href="/transport"
  title={isPortuguese ? "Precisa de motorista português em Londres" : "Need Portuguese driver in London"}
  className="..."
>
  London Transport
</a>
```

### Mobile Hover Text Rules
- **ALWAYS use "Need"** not "It needs" for better user engagement
- **Example**: "Need a Portuguese driver or security in London"
- **Portuguese**: "Precisa de um motorista ou segurança português em Londres"

## 📱 Mobile Optimization Rules

### Grid Layout Standards (MANDATORY)
1. **Community sections MUST display 2 per line on mobile**: Use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-2` or `grid-cols-2 md:grid-cols-4`
2. **Never use single column on mobile** for category listings, community sections, or feature grids
3. **Proper mobile spacing**: Use `gap-4 sm:gap-6 lg:gap-8` for responsive gaps

### CTA Button Standards (MANDATORY)
1. **Side-by-side layout**: CTAs MUST be `flex-row` not `flex-col` on mobile
2. **Equal button sizes**: Use `flex-1 max-w-[180px] sm:max-w-none` for consistent sizing
3. **Proper spacing**: Use `gap-3 sm:gap-4` between buttons
4. **Text sizing**: Use `text-base sm:text-lg` for responsive button text

```jsx
{/* CORRECT: Side-by-side mobile CTAs */}
<div className="flex flex-row gap-3 sm:gap-4 justify-center">
  <a href="/signup" className="flex-1 max-w-[180px] sm:max-w-none text-base sm:text-lg font-bold px-6 sm:px-10 py-4 bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white rounded-2xl text-center">
    Join Community
  </a>
  <a href="/events" className="flex-1 max-w-[180px] sm:max-w-none text-base sm:text-lg font-bold px-6 sm:px-10 py-4 bg-white/80 text-gray-800 border-2 border-gray-200 rounded-2xl text-center">
    Explore Features
  </a>
</div>

{/* WRONG: Stacked mobile CTAs */}
<div className="flex flex-col sm:flex-row gap-4">
  {/* This takes too much vertical space on mobile */}
</div>
```

### Statistics/Numbers Section Standards (MANDATORY)
1. **Mobile margin**: Add `mx-4 sm:mx-0` to prevent edge cutoff
2. **Text wrapping**: Use `break-words` class on stat labels
3. **Responsive text sizes**: `text-2xl sm:text-3xl md:text-4xl` for numbers
4. **Grid padding**: Add `px-2` to grid items for mobile breathing room

```jsx
{/* CORRECT: Mobile-optimized statistics */}
<div className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-2xl mx-4 sm:mx-0">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
    {stats.map((stat, index) => (
      <div key={index} className="text-center px-2">
        <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-2">
          {stat.number}
        </div>
        <div className="text-white/90 font-semibold text-xs sm:text-sm md:text-base mb-1 break-words">
          {stat.label}
        </div>
        <div className="text-white/70 text-xs break-words">
          {stat.sublabel}
        </div>
      </div>
    ))}
  </div>
</div>
```

### Touch Targets (MANDATORY)
1. **Minimum 44px height** for all interactive elements
2. **Enhanced button spacing** with proper padding
3. **Mobile-first button layouts** using 2x2 grids when appropriate

### Responsive Text (MANDATORY)
Always provide mobile-optimized versions:
```jsx
{/* Desktop full title */}
<span className="hidden sm:block">Full desktop title here</span>
{/* Mobile short title */}
<span className="sm:hidden">Short mobile title</span>
```

### Language Standards for Mobile (MANDATORY)
1. **Force English for statistics sections** to prevent mobile layout issues
2. **Use shorter text on mobile** to fit properly in containers
3. **Test both EN/PT on mobile** to ensure no text overflow

## 🚨 Quality Control

### Pre-Deployment Checklist (MANDATORY)
Before any page goes live, verify:

- [ ] Hero section follows exact template
- [ ] Portuguese brand colors only
- [ ] Both English/Portuguese support
- [ ] Mobile and desktop responsive versions
- [ ] Professional image with alt text
- [ ] CTA buttons max 2 words
- [ ] Touch targets 44px minimum
- [ ] Framer Motion animations
- [ ] Consistent component structure
- [ ] No generic Tailwind colors (blue-500, etc.)
- [ ] **NEW: Community sections display 2 per line on mobile**
- [ ] **NEW: CTA buttons are side-by-side on mobile (flex-row)**
- [ ] **NEW: Statistics sections don't cut off on mobile edges**
- [ ] **NEW: All text uses break-words for mobile wrapping**
- [ ] **NEW: Grid layouts use sm:grid-cols-2 for mobile optimization**

### Component Review Standards
Every new component MUST:
1. **Match the London Tours page quality** in design and UX
2. **Follow the exact hero section template**
3. **Include proper Portuguese translations**
4. **Have mobile-optimized versions**
5. **Use only Portuguese brand colors**
6. **Include proper animations and hover effects**

## 📋 Examples to Follow

### ✅ GOOD Examples (Use as Templates)
- **London Tours page** (`/london-tours/page.tsx`) - Perfect hero section
- **Transport page** (`/transport/page.tsx`) - Professional quality standard
- **Header component** - Proper dropdown and mobile navigation

### ❌ AVOID Examples
- Generic blue colors (blue-500, blue-600, etc.)
- Single-language content
- Non-responsive design
- Poor mobile experience
- "It needs" instead of "Need" in hover text
- CTAs longer than 2 words

## 🔄 Updates & Maintenance

### Rule Updates
When new design patterns are established:
1. Update this RULES.md file
2. Apply to existing components
3. Document in CLAUDE.md

### Consistency Checks
Regularly verify all pages maintain:
- Design consistency with London Tours quality
- Portuguese brand color usage
- Mobile-first responsive design
- Proper bilingual support

---

**Remember: Every new page and component MUST match the quality and design standards of the London Tours page. No exceptions.**