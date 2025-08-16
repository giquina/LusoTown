# LusoTown Authentication Popup System

This document explains the comprehensive authentication popup system that encourages user signup across the LusoTown platform.

## Overview

The authentication popup system provides a seamless user experience by:
- Intercepting authentication-required actions (add to cart, view details)
- Showing compelling signup popups with Portuguese community benefits
- Preserving user intent and restoring actions after successful authentication
- Supporting bilingual content (English/Portuguese)

## Components

### 1. AuthPopupProvider (`src/components/AuthPopupProvider.tsx`)
Context provider that manages popup state and user intent storage.

```typescript
interface AuthIntent {
  type: 'add-to-cart' | 'view-details'
  eventId?: string
  eventTitle?: string
  redirectPath?: string
  data?: any
}
```

### 2. AuthPopup (`src/components/AuthPopup.tsx`)
The main popup component with two variants:

#### Add to Cart Popup
- **Title**: "Want to use this feature? Sign up now!"
- **Benefits**:
  - Save multiple experiences for later
  - Get member-only discounts
  - Easy checkout process
  - Track your bookings in one place

#### View Details Popup
- **Title**: "Want to see full event details? Sign up for free!"
- **Benefits**:
  - Complete event information
  - Host contact details
  - Member reviews and photos
  - Exclusive member pricing

### 3. useAuthRequired Hook (`src/hooks/useAuthRequired.ts`)
Hook for handling authentication-required actions.

```typescript
const { requireAuthForCart, requireAuthForDetails } = useAuthRequired()

// For add to cart actions
requireAuthForCart(addToCartAction, eventId, eventTitle, cartItemData)

// For view details actions
requireAuthForDetails(viewDetailsAction, eventId, redirectPath)
```

### 4. Auth Intent Restoration (`src/hooks/useAuthIntentRestore.ts`)
Restores user actions after successful authentication.

## Integration

### Setup in Layout
The system is integrated in `src/app/layout.tsx`:

```jsx
<AuthPopupProvider>
  {/* Your app components */}
  <AuthPopup />
  <AuthIntentHandler />
</AuthPopupProvider>
```

### Component Integration

#### EventCard Example
```typescript
import { useAuthRequired } from '@/hooks/useAuthRequired'

const { requireAuthForCart, requireAuthForDetails } = useAuthRequired()

const handleAddToCart = () => {
  const addToCartAction = () => {
    // Your add to cart logic
    addToCart(cartItemData)
  }
  
  requireAuthForCart(addToCartAction, eventId, eventTitle, cartItemData)
}

const handleViewDetails = () => {
  requireAuthForDetails(
    () => window.location.href = `/events/${id}`,
    id,
    `/events/${id}`
  )
}
```

## Features

### 1. Popup Variants
- **Add to Cart**: Shows when user tries to add items to cart without authentication
- **View Details**: Shows when user tries to access detailed event information

### 2. Benefits Display
Each popup shows compelling reasons to join:
- Portuguese community stats (750+ speakers, 50+ monthly events)
- Feature-specific benefits
- Trust signals (safe, verified, free)

### 3. Bilingual Support
- Complete Portuguese/English interface
- Cultural messaging for Portuguese community
- Responsive design for mobile/desktop

### 4. Intent Preservation
- Stores user actions before redirecting to signup
- Automatically restores actions after successful authentication
- Handles cart items, redirects, and other user intents

### 5. Smooth Animations
- Framer Motion animations for enter/exit
- Backdrop blur and overlay effects
- Micro-interactions for better UX

## Usage Examples

### Adding to Any Component

```typescript
import { useAuthRequired } from '@/hooks/useAuthRequired'

function MyComponent() {
  const { requireAuth } = useAuthRequired()
  
  const handleProtectedAction = () => {
    requireAuth(
      () => {
        // Your protected action here
        console.log('User is authenticated!')
      },
      'add-to-cart', // or 'view-details'
      {
        eventId: 'some-id',
        eventTitle: 'Event Name'
      }
    )
  }
  
  return (
    <button onClick={handleProtectedAction}>
      Protected Action
    </button>
  )
}
```

### Custom Integration

```typescript
import { useAuthPopup } from '@/components/AuthPopupProvider'

function CustomComponent() {
  const { showPopup, hidePopup } = useAuthPopup()
  
  const handleCustomAction = () => {
    showPopup('view-details', {
      type: 'view-details',
      eventId: 'custom-event',
      redirectPath: '/custom-page'
    })
  }
  
  return <button onClick={handleCustomAction}>Show Popup</button>
}
```

## Styling

The popup system uses LusoTown's Portuguese-inspired design system:
- Primary colors: Azul Atlântico (primary) and Verde Esperança (secondary)
- Portuguese cultural elements and messaging
- Mobile-first responsive design
- Consistent with brand guidelines

## Best Practices

1. **Use Specific Hooks**: Use `requireAuthForCart` and `requireAuthForDetails` for common patterns
2. **Preserve Data**: Always pass cart item data or redirect paths for intent restoration
3. **Mobile Optimization**: Ensure buttons and popups work well on mobile devices
4. **Cultural Sensitivity**: Use appropriate Portuguese cultural context in messaging
5. **Performance**: Popups are lightweight and don't impact app performance

## Testing

To test the authentication popup system:

1. **Logout**: Ensure you're not logged in
2. **Trigger Actions**: Try adding items to cart or viewing event details
3. **Verify Popup**: Check that appropriate popup appears
4. **Test Signup Flow**: Complete signup and verify intent restoration
5. **Mobile Testing**: Test on different screen sizes

## Troubleshooting

### Popup Not Showing
- Check that `AuthPopupProvider` wraps your components
- Verify `isAuthenticated()` returns `false`
- Ensure hooks are called within React components

### Intent Not Restoring
- Check localStorage for 'lusotown-auth-intent'
- Verify `AuthIntentHandler` is included in layout
- Check browser console for restoration errors

### Styling Issues
- Verify Tailwind CSS classes are available
- Check z-index conflicts with other overlays
- Ensure Framer Motion is properly imported

## Future Enhancements

- Additional popup variants for other actions
- A/B testing for different benefit messaging
- Integration with analytics for conversion tracking
- Advanced intent preservation for complex user flows