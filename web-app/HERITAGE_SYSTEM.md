# Heritage Community System

The Heritage Community System allows the platform to serve multiple cultural heritage communities while maintaining a unified architecture. This system generalizes previously Portuguese-specific elements to be configurable for any heritage community.

## Overview

The system transforms LusoTown from a Portuguese-specific platform to a configurable heritage community platform that can serve:
- Portuguese communities (default)
- Italian communities
- Spanish communities
- Greek communities
- Any cultural heritage community

## Key Components

### 1. Heritage Configuration (`/src/config/heritage.ts`)

Central configuration system that defines:
- **Identity**: Name, language, taglines
- **Branding**: Colors, symbols, cultural emojis
- **Geography**: Main country, diaspora hub, cultural areas
- **Culture**: Traditions, foods, music, celebrations, values
- **Streaming**: Emotes, content categories, moderation
- **Community**: Business types, event types, networking categories

### 2. Heritage Context (`/src/context/HeritageContext.tsx`)

React Context that provides:
- Current heritage configuration
- Heritage switching functionality
- Utility hooks for easy access to colors, symbols, emotes
- CSS custom properties for dynamic styling

### 3. Heritage Components

#### Logo Component (`/src/components/Logo.tsx`)
- Dynamically uses heritage symbols instead of hardcoded Portuguese elements
- Shows heritage flag and diaspora city
- Supports configurable brand name

#### Heritage Selector (`/src/components/HeritageSelector.tsx`)
- Allows users to switch between available heritage communities
- Compact and full variants
- Persists selection to localStorage

#### Heritage Style Provider (`/src/components/HeritageStyleProvider.tsx`)
- Applies heritage colors as CSS custom properties
- Provides heritage-aware styled components
- Updates styling when heritage changes

### 4. Heritage-Aware Utilities

#### Tailwind Integration (`/src/lib/heritage-tailwind.ts`)
- Generates heritage-specific color scales
- Creates heritage-aware gradients
- Provides utility functions for color manipulation

## Configuration Examples

### Portuguese Heritage (Default)
```typescript
const PORTUGUESE_HERITAGE: HeritageConfig = {
  identity: {
    name: 'Portuguese',
    code: 'pt',
    tagline: { native: 'Unidos pela Língua', english: 'United by Language' }
  },
  branding: {
    colors: { primary: '#1e40af', secondary: '#059669', ... },
    symbols: { flag: '🇵🇹', primary: '🏛️' }
  },
  // ... rest of configuration
}
```

### Italian Heritage
```typescript
const ITALIAN_HERITAGE: HeritageConfig = {
  identity: {
    name: 'Italian',
    code: 'it',
    tagline: { native: 'Uniti dalla Tradizione', english: 'United by Tradition' }
  },
  branding: {
    colors: { primary: '#006633', secondary: '#CC0000', ... },
    symbols: { flag: '🇮🇹', primary: '🏛️' }
  },
  // ... rest of configuration
}
```

## Environment Configuration

Set heritage configuration via environment variables:

```env
# Basic Configuration
NEXT_PUBLIC_BRAND_NAME=LusoTown
NEXT_PUBLIC_HERITAGE_CODE=pt

# Color Scheme
NEXT_PUBLIC_PRIMARY_COLOR=#1e40af
NEXT_PUBLIC_SECONDARY_COLOR=#059669
NEXT_PUBLIC_ACCENT_COLOR=#f59e0b

# Cultural Elements
NEXT_PUBLIC_HERITAGE_FLAG=🇵🇹
NEXT_PUBLIC_PRIMARY_SYMBOL=🏛️
NEXT_PUBLIC_CULTURAL_AREAS=Vauxhall,Stockwell,Golborne Road
```

## Usage Examples

### Using Heritage Context
```typescript
import { useHeritage } from '@/context/HeritageContext'

function MyComponent() {
  const { heritage, colors, symbols, setHeritage } = useHeritage()
  
  return (
    <div style={{ color: colors.primary }}>
      <span>{symbols.flag}</span>
      {heritage.identity.name} Community
    </div>
  )
}
```

### Heritage-Aware Styling
```typescript
import { HeritageButton, HeritageCard } from '@/components/HeritageStyleProvider'

function MyComponent() {
  return (
    <HeritageCard variant="primary">
      <HeritageButton variant="accent">
        Join Community
      </HeritageButton>
    </HeritageCard>
  )
}
```

### Dynamic CSS Properties
```css
/* Heritage colors available as CSS custom properties */
.my-element {
  background: var(--heritage-primary);
  border-color: var(--heritage-secondary);
}

/* Tailwind classes using heritage colors */
.my-button {
  @apply bg-[var(--heritage-primary)] text-white;
}
```

## Streaming Platform Integration

The streaming platform supports heritage-specific features:

### Cultural Emotes
```typescript
// Portuguese emotes
':saudade:' // 💙 Portuguese feeling of longing
':festa:'   // 🎉 Portuguese celebration
':fado:'    // 🎵 Traditional Portuguese music

// Italian emotes  
':pasta:'    // 🍝 Italian pasta tradition
':opera:'    // 🎭 Italian opera culture
':famiglia:' // 👨‍👩‍👧‍👦 Italian family values
```

### Content Categories
```typescript
// Portuguese categories
{
  cultural: { name: 'Conteúdo Cultural', nameEn: 'Cultural Content' },
  business: { name: 'Negócios e Empreendedorismo', nameEn: 'Business & Entrepreneurship' }
}

// Italian categories
{
  cultural: { name: 'Contenuto Culturale', nameEn: 'Cultural Content' },
  business: { name: 'Business e Imprenditoria', nameEn: 'Business & Entrepreneurship' }
}
```

## Migration from Portuguese-Specific

### Before (Hardcoded Portuguese)
```typescript
// Hardcoded Portuguese elements
<div className="flex items-center">
  <span>🇵🇹</span>
  <span>LusoTown</span>
  <span>🇬🇧</span>
</div>
```

### After (Heritage-Aware)
```typescript
// Configurable heritage elements
import { useHeritage } from '@/context/HeritageContext'

function Component() {
  const { heritage, symbols } = useHeritage()
  
  return (
    <div className="flex items-center">
      <span>{symbols.flag}</span>
      <span>{process.env.NEXT_PUBLIC_BRAND_NAME}</span>
      <span>🇬🇧</span>
    </div>
  )
}
```

## Adding New Heritage Communities

1. **Create Heritage Configuration**
```typescript
// In /src/config/heritage.ts
export const SPANISH_HERITAGE: HeritageConfig = {
  identity: {
    name: 'Spanish',
    code: 'es',
    tagline: { native: 'Unidos por la Cultura', english: 'United by Culture' }
  },
  // ... complete configuration
}
```

2. **Register in Heritage Manager**
```typescript
// In HeritageManager class
const heritageConfigs: Record<string, HeritageConfig> = {
  'pt': PORTUGUESE_HERITAGE,
  'it': ITALIAN_HERITAGE,
  'es': SPANISH_HERITAGE, // Add new heritage
}
```

3. **Set Environment Variables**
```env
NEXT_PUBLIC_HERITAGE_CODE=es
NEXT_PUBLIC_BRAND_NAME=EspañaTown
# ... other Spanish-specific variables
```

## Best Practices

### 1. Always Use Heritage Context
- Never hardcode cultural elements
- Always use `useHeritage()` hook for cultural data
- Use heritage-aware components when possible

### 2. Color Usage
```typescript
// ✅ Good - Heritage-aware
const { colors } = useHeritage()
<div style={{ color: colors.primary }}>

// ❌ Bad - Hardcoded
<div className="text-blue-600">
```

### 3. Cultural Content
```typescript
// ✅ Good - Dynamic based on heritage
const traditions = heritage.culture.traditions

// ❌ Bad - Hardcoded Portuguese
const traditions = ['Fado', 'Santos Populares']
```

### 4. Environment Configuration
```typescript
// ✅ Good - Configurable via environment
const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || 'HeritageTown'

// ❌ Bad - Hardcoded
const brandName = 'LusoTown'
```

## Testing Heritage Switching

1. **Test Portuguese Heritage** (default)
```env
NEXT_PUBLIC_HERITAGE_CODE=pt
NEXT_PUBLIC_BRAND_NAME=LusoTown
```

2. **Test Italian Heritage**
```env
NEXT_PUBLIC_HERITAGE_CODE=it
NEXT_PUBLIC_BRAND_NAME=ItaliaTown
```

3. **Enable Heritage Switching**
```env
NEXT_PUBLIC_HERITAGE_SWITCHING=true
```

## File Structure

```
/src/config/
  heritage.ts              # Heritage configurations
  brand.ts                 # Updated brand configuration

/src/context/
  HeritageContext.tsx      # Heritage React context

/src/components/
  Logo.tsx                 # Updated heritage-aware logo
  HeritageSelector.tsx     # Heritage switching component
  HeritageStyleProvider.tsx # Heritage styling system
  HeritageTestimonials.tsx # Heritage-aware testimonials

/src/lib/
  heritage-tailwind.ts     # Heritage Tailwind utilities

/streaming/
  portuguese-features.js   # Updated to heritage-features.js
```

## Benefits

1. **Scalability**: Easy to add new heritage communities
2. **Maintainability**: Single codebase serves multiple communities
3. **Consistency**: Unified architecture across all heritage variants
4. **Flexibility**: Each heritage community can have unique branding
5. **Performance**: No code duplication, dynamic configuration only

## Future Enhancements

1. **Auto-Detection**: Detect user's heritage based on location/language
2. **Mixed Heritage**: Support users with multiple heritage backgrounds
3. **Sub-Communities**: Regional variations within heritage communities
4. **Heritage-Specific Features**: Unique features per heritage community
5. **AI-Powered Matching**: Heritage-aware compatibility algorithms

This system maintains Portuguese as the default while preparing the platform for expansion to serve multiple heritage communities with their unique cultural elements, traditions, and needs.