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