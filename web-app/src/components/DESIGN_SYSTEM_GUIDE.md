# LusoTown Design System Guide

## Quick Reference for Consistent Styling

### Button Color Guidelines

**❌ NEVER use generic blue colors (`bg-blue-*`, `text-blue-*`, `border-blue-*`)**

**✅ USE Portuguese Brand Colors:**

#### Primary Action Buttons (CTAs)
```jsx
// Use for: Join, Search, Book, Sign Up, Subscribe, Purchase, etc.
className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 text-white font-bold px-8 py-3 rounded-2xl transition-all duration-300"

// Or use the CSS class:
className="btn-primary"
```

#### Secondary Buttons
```jsx
// Use for: Cancel, Back, Learn More, etc.
className="bg-white/70 backdrop-blur-lg text-gray-800 border-2 border-gray-200 hover:border-secondary-300 hover:text-secondary-700 font-bold px-8 py-3 rounded-2xl"

// Or use the CSS class:
className="btn-secondary"
```

#### Outline Buttons
```jsx
// Use for: Filter, Sort, Toggle options, etc.
className="border-2 border-secondary-600 text-secondary-600 hover:bg-gradient-to-r hover:from-secondary-600 hover:via-action-600 hover:to-accent-600 hover:text-white font-bold px-8 py-3 rounded-2xl"

// Or use the CSS class:
className="btn-outline"
```

### Color Usage by Function

#### Information & Navigation
```jsx
// Use primary colors (blue) for:
// - Icons in navigation
// - Information badges
// - Status indicators
// - Non-action elements
className="text-primary-600 bg-primary-50"
```

#### Success & Positive Actions
```jsx
// Use secondary colors (green) for:
// - Success messages
// - Completion states
// - Positive indicators
className="text-secondary-600 bg-secondary-50"
```

#### Warnings & Attention
```jsx
// Use accent colors (amber) for:
// - Warning messages
// - Important notices
// - Attention-grabbing elements
className="text-accent-600 bg-accent-50"
```

#### Errors & Critical Actions
```jsx
// Use action colors (red) for:
// - Error messages
// - Delete buttons
// - Critical warnings
className="text-action-600 bg-action-50"
```

#### Premium Features
```jsx
// Use premium colors (purple) for:
// - Premium badges
// - Upgraded features
// - VIP elements
className="text-premium-600 bg-premium-50"
```

### Component Examples

#### Search Button (Fixed Example)
```jsx
// ❌ Wrong:
<button className="bg-blue-600 hover:bg-blue-700">Search</button>

// ✅ Correct:
<button className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 text-white font-bold px-8 py-3 rounded-2xl">
  Search
</button>
```

#### Form Button
```jsx
// ❌ Wrong:
<button className="bg-primary-500 text-white">Submit</button>

// ✅ Correct:
<button className="btn-primary">Submit</button>
```

### CSS Classes Available

- `.btn-primary` - Main Portuguese gradient CTA
- `.btn-secondary` - Secondary action button
- `.btn-outline` - Outline style button
- `.btn-primary-sm` - Small primary button
- `.btn-secondary-sm` - Small secondary button
- `.btn-outline-sm` - Small outline button
- `.gradient-portuguese` - Portuguese gradient background
- `.gradient-text` - Portuguese gradient text

### Global CSS Override Protection

The system automatically converts any blue classes to Portuguese colors:
- `bg-blue-*` → `bg-primary-*` or `bg-secondary-*`
- `text-blue-*` → `text-primary-*` or `text-secondary-*`
- `border-blue-*` → `border-primary-*` or `border-secondary-*`

### Design System Colors

```css
/* Azul Atlântico (Atlantic Blue) - Primary */
primary-500: #1e40af

/* Verde Esperança (Hope Green) - Secondary */
secondary-500: #059669

/* Dourado Sol (Golden Sun) - Accent */
accent-500: #f59e0b

/* Vermelho Paixão (Passion Red) - Action */
action-500: #dc2626

/* Roxo Fado (Fado Purple) - Premium */
premium-500: #7c3aed

/* Coral Tropical - Warm Accent */
coral-500: #f97316
```

## When Adding New Features

1. **Always use `btn-primary` class for main CTAs**
2. **Use `primary` colors for information/navigation only**
3. **Reference this guide before choosing colors**
4. **Add design system comments to components**
5. **Test with both English and Portuguese content**

## Quick Fix Commands

If you accidentally use blue colors:
```bash
# Find all blue color usage
grep -r "bg-blue\|text-blue\|border-blue" src/components/

# The global CSS will automatically fix these, but it's better to use the correct classes directly
```