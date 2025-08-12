# AdyaTribe Event Images

## Overview
This directory contains event images for the AdyaTribe web application. The app uses a sophisticated fallback system to ensure images always display properly.

## Image System

### Fallback Hierarchy
1. **Primary**: Actual event image from `/events/[image-name].jpg`
2. **Secondary**: Category-based SVG placeholder from `@/lib/placeholders.ts`
3. **Tertiary**: Default networking placeholder

### Expected Images
Based on current codebase references, these images should be added:

**EventsShowcase Component:**
- `wine-paint.jpg` - Wine & Paint Night events
- `book-brunch.jpg` - Book Club Brunch events  
- `jazz-networking.jpg` - Jazz Night & Networking events

**Dashboard Events:**
- `book-club.jpg` - Book club meetings
- `wine-tasting.jpg` - Wine tasting events
- `yoga.jpg` - Yoga and wellness activities
- `art-tour.jpg` - Art gallery tours
- `networking.jpg` - Professional networking events

**Events Library:**
- `pottery-wine-1.jpg` - Pottery & wine workshop
- `ceramic-art.jpg` - Ceramic art classes

## Implementation

### Using EventImageWithFallback Component
```tsx
import EventImageWithFallback from '@/components/EventImageWithFallback'

<EventImageWithFallback
  src="/events/wine-paint.jpg"
  alt="Wine & Paint Night"
  category="Art & Culture"
  className="object-cover"
  fill
  priority
/>
```

### Categories for Placeholders
- `Art & Culture` → Art palette icon
- `Books & Reading` → Book icon
- `Wine & Dining` → Wine glass icon
- `Fitness & Wellness` → Yoga pose icon
- `Networking` → Network nodes icon
- `Arts & Culture` → Gallery icon

## Image Guidelines

### Technical Requirements
- **Format**: JPG or PNG preferred
- **Dimensions**: 400x300px minimum (4:3 aspect ratio)
- **File Size**: Under 500KB for web optimization
- **Naming**: Kebab-case (e.g., `wine-paint.jpg`)

### Content Guidelines
- Show the activity or venue
- Include people when possible (with permission)
- Professional, welcoming atmosphere
- Good lighting and composition
- Accessible and inclusive imagery

### Accessibility
- All images must have descriptive `alt` text
- Maintain good contrast with overlaid text
- Consider color-blind accessibility

## Adding New Images

1. Add the image file to this directory
2. Reference it in your component: `/events/your-image.jpg`
3. The fallback system will handle missing images automatically
4. Update this README if adding new categories

## Design System Compliance

✅ **Consistent with AdyaTribe brand colors**  
✅ **Professional appearance for 30+ women audience**  
✅ **Accessible with proper alt text**  
✅ **Mobile-optimized and responsive**  
✅ **Graceful fallbacks for missing images**

## Troubleshooting

**Image not loading?**
- Check file path is correct: `/events/image-name.jpg`
- Verify file exists in `public/events/` directory
- Check `EventImageWithFallback` is imported correctly
- Fallback placeholder should show if image missing

**Placeholder not showing correct icon?**
- Check category name matches placeholder keys
- Add new category to `@/lib/placeholders.ts` if needed
- Default fallback is networking icon

---

*Last updated: 2025-08-11*  
*Design System Guardian compliance ✅*