# Heritage Color System Documentation

## Overview

The Heritage Color System enables the LusoTown platform to adapt its visual appearance to different cultural communities while maintaining design consistency and accessibility. Instead of hardcoded Portuguese flag colors, the platform now uses a configurable heritage system that can adapt to Lusophone, Italian, or other heritage communities.

## Architecture

### Core Components

1. **Heritage Configuration** (`/config/heritage.ts`)
   - Defines color palettes, cultural elements, and branding for each heritage
   - Currently supports Lusophone and Italian configurations
   - Extensible for additional heritage communities

2. **Heritage Context** (`/context/HeritageContext.tsx`)
   - React Context providing heritage configuration throughout the app
   - Manages heritage selection and persistence
   - Provides utility hooks for easy access

3. **Heritage Style Provider** (`/components/HeritageStyleProvider.tsx`)
   - Applies heritage CSS custom properties to document root
   - Updates meta theme-color dynamically
   - Handles heritage change events

4. **Heritage Tailwind Integration** (`/lib/heritage-tailwind.ts`)
   - Generates CSS custom properties from heritage configuration
   - Provides color manipulation utilities
   - Handles gradient generation

## Color Configuration

### CSS Custom Properties

The system generates CSS custom properties that can be used throughout the application:

```css
--heritage-primary: #1e40af     /* Main brand color */
--heritage-secondary: #059669   /* Secondary brand color */
--heritage-accent: #f59e0b      /* Accent color */
--heritage-action: #dc2626      /* Action/CTA color */
--heritage-premium: #7c3aed     /* Premium features color */
--heritage-coral: #f97316       /* Warm accent color */

/* Color scales (50-900) for each heritage color */
--heritage-primary-50: #eff6ff
--heritage-primary-100: #dbeafe
/* ... up to 900 */
```

### Tailwind Configuration

Tailwind CSS is configured to use heritage colors as fallbacks:

```javascript
// tailwind.config.js
colors: {
  primary: {
    500: 'var(--heritage-primary, #1e40af)',
    // ... other shades
  },
  // ... other heritage colors
}
```

## Usage Guide

### 1. Using Heritage Colors in Components

#### Method 1: Tailwind Classes (Recommended)
```jsx
// These classes automatically adapt to heritage configuration
<button className="bg-primary-500 text-white hover:bg-primary-600">
  Heritage Button
</button>

<div className="text-secondary-600 border-accent-300">
  Heritage Content
</div>
```

#### Method 2: Heritage CSS Utility Classes
```jsx
// Use the new heritage-specific utility classes
<button className="heritage-btn heritage-btn-primary">
  Primary Button
</button>

<div className="heritage-card heritage-bg-primary-light">
  Heritage Card
</div>

<span className="heritage-badge heritage-badge-secondary">
  Badge
</span>
```

#### Method 3: CSS Custom Properties
```jsx
// Direct use of CSS custom properties
<div style={{ 
  backgroundColor: 'var(--heritage-primary)', 
  color: 'white' 
}}>
  Direct Heritage Color
</div>
```

#### Method 4: Heritage Context Hooks
```jsx
import { useHeritageColors } from '@/context/HeritageContext'

function MyComponent() {
  const colors = useHeritageColors()
  
  return (
    <div style={{ backgroundColor: colors.primary }}>
      Dynamic Heritage Color
    </div>
  )
}
```

### 2. Available Heritage Utility Classes

#### Buttons
- `heritage-btn` - Base button styles
- `heritage-btn-primary` - Primary button
- `heritage-btn-secondary` - Secondary button
- `heritage-btn-outline` - Outline button
- `heritage-btn-ghost` - Ghost button

#### Cards
- `heritage-card` - Basic heritage-aware card
- `heritage-card-featured` - Featured card with gradient background

#### Badges
- `heritage-badge-primary` - Primary badge
- `heritage-badge-secondary` - Secondary badge
- `heritage-badge-accent` - Accent badge
- `heritage-badge-action` - Action badge
- `heritage-badge-premium` - Premium badge

#### Text and Backgrounds
- `heritage-text-primary` - Heritage primary text color
- `heritage-bg-primary` - Heritage primary background
- `heritage-bg-primary-light` - Heritage primary light background
- `heritage-border-primary` - Heritage primary border

#### Gradients
- `heritage-gradient-primary` - Primary gradient
- `heritage-gradient-brand` - Brand gradient (primary → secondary → accent)
- `heritage-gradient-hero` - Hero gradient (primary → action)

#### Text Gradients
- `heritage-text-gradient-primary` - Primary gradient text
- `heritage-text-gradient-brand` - Brand gradient text

### 3. Migration from Hardcoded Colors

#### Before (Hardcoded Lusophone Colors)
```jsx
// Old hardcoded approach
<button className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white">
  Button
</button>

<div style={{ backgroundColor: '#059669', color: 'white' }}>
  Content
</div>
```

#### After (Heritage-Configurable)
```jsx
// New heritage-aware approach
<button className="heritage-btn heritage-btn-primary">
  Button
</button>

<div className="heritage-bg-secondary text-white">
  Content
</div>

// Or using Tailwind classes (also heritage-aware now)
<button className="bg-primary-500 hover:bg-primary-600 text-white">
  Button
</button>
```

#### Using Migration Utilities
```jsx
import { HeritageColorMigration, useHeritageColorReplacements } from '@/components/HeritageColorMigrationUtility'

// Wrap legacy components temporarily
<HeritageColorMigration>
  <LegacyComponent />
</HeritageColorMigration>

// Or use color replacement hooks
function Component() {
  const { replaceColor } = useHeritageColorReplacements()
  
  const color = replaceColor('#1e40af') // Returns current heritage primary color
  
  return <div style={{ backgroundColor: color }}>Content</div>
}
```

## Heritage Management

### Switching Heritage Communities

```jsx
import { useHeritage } from '@/context/HeritageContext'

function HeritageSelector() {
  const { setHeritage, availableHeritages, heritageCode } = useHeritage()
  
  return (
    <select 
      value={heritageCode}
      onChange={(e) => setHeritage(e.target.value)}
    >
      {availableHeritages.map(heritage => (
        <option key={heritage.code} value={heritage.code}>
          {heritage.flag} {heritage.name}
        </option>
      ))}
    </select>
  )
}
```

### Adding New Heritage Configurations

1. Create a new heritage configuration in `/config/heritage.ts`:

```typescript
export const SPANISH_HERITAGE: HeritageConfig = {
  identity: {
    name: 'Spanish',
    code: 'es',
    defaultLanguage: 'es-ES',
    tagline: {
      native: 'Unidos por la Cultura',
      english: 'United by Culture'
    }
  },
  branding: {
    colors: {
      primary: '#C60B1E',    // Spanish red
      secondary: '#FFC400',  // Spanish gold
      accent: '#FF6B35',     // Spanish orange
      action: '#E53E3E',     // Spanish crimson
      premium: '#9F7AEA',    // Royal purple
      coral: '#F56565'       // Coral red
    },
    symbols: {
      flag: '🇪🇸',
      primary: '🏛️',
      secondary: '🎭'
    },
    culturalEmoji: '🇪🇸'
  },
  // ... rest of configuration
}
```

2. Add to the HeritageManager:

```typescript
public setHeritage(code: string): boolean {
  const heritageConfigs: Record<string, HeritageConfig> = {
    'pt': PORTUGUESE_HERITAGE,
    'it': ITALIAN_HERITAGE,
    'es': SPANISH_HERITAGE // Add new heritage
  };
  // ... rest of method
}
```

## Best Practices

### 1. Color Accessibility
- Always ensure sufficient color contrast ratios
- Test heritage colors with accessibility tools
- Provide alternative indicators beyond color alone

### 2. Performance
- CSS custom properties are efficient and update instantly
- Heritage changes don't require component re-renders
- Use CSS utility classes for better performance than inline styles

### 3. Consistency
- Stick to heritage color meanings (primary for brand, action for CTAs, etc.)
- Use the design system's predefined components when possible
- Maintain visual hierarchy across heritage variants

### 4. Development
- Use the `HeritageColorDebugger` component during development
- Test all heritage variants before deploying
- Document any custom color usage

## Troubleshooting

### Colors Not Updating
1. Ensure `HeritageProvider` wraps your app
2. Check that `HeritageStyleProvider` is included
3. Verify CSS custom properties are being set in document root

### Hardcoded Colors Still Showing
1. Check for hardcoded hex values in CSS files
2. Use the migration utilities for legacy components
3. Update Tailwind config if using custom color values

### Performance Issues
1. Avoid inline styles with heritage color hooks in render loops
2. Use CSS utility classes instead of CSS-in-JS when possible
3. Leverage CSS custom properties for dynamic theming

## Future Enhancements

1. **Automatic Color Palette Generation**: Generate complete color scales from single brand colors
2. **Theme Designer Interface**: Visual interface for creating new heritage configurations  
3. **Advanced Color Harmony**: Automatic generation of complementary colors
4. **Regional Variants**: Support for regional variations within heritage communities
5. **Seasonal Themes**: Temporary color adjustments for holidays and seasons

## Integration with Design Systems

The heritage color system is designed to work with:

- **Component Libraries**: Easy integration with existing component systems
- **Design Tokens**: Export heritage colors as design tokens
- **Figma Integration**: Sync heritage colors with design files
- **Brand Guidelines**: Generate brand guideline documents automatically

## Conclusion

The Heritage Color System transforms LusoTown from a Lusophone-specific platform to a configurable cultural community platform while maintaining excellent developer experience and design consistency. By using CSS custom properties and React Context, the system provides instant theme switching with minimal performance impact.

For questions or contributions to the heritage system, please refer to the development team or create an issue in the project repository.