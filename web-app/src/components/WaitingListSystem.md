# Waiting List System Documentation

## Overview
The LusoTown waiting list system provides a comprehensive solution for managing fully booked events, allowing users to join waiting lists and be contacted when spots become available.

## Components

### 1. WaitingListContext.tsx
- **Purpose**: Manages waiting list state and provides global access to waiting list functions
- **Storage**: Uses localStorage for persistence
- **Key Functions**:
  - `addToWaitingList()`: Adds user to waiting list
  - `getWaitingListCount()`: Returns number of people on waiting list for an event
  - `isOnWaitingList()`: Checks if user is already on waiting list
  - `getWaitingListPosition()`: Returns user's position in queue

### 2. WaitingListModal.tsx
- **Purpose**: Modal form for joining waiting lists
- **Features**:
  - Bilingual support (English/Portuguese)
  - Form validation
  - Success animations
  - GDPR compliance
  - Mobile responsive design

### 3. useWaitingListActions.tsx
- **Purpose**: Custom hook for managing waiting list interactions
- **Features**:
  - Modal state management
  - Event status detection
  - Message localization
  - Status checking utilities

### 4. EventCard.tsx
- **Purpose**: Reusable event card component with waiting list integration
- **Features**:
  - Automatic status detection
  - Waiting list button for full events
  - Booking button for available events
  - Real-time waiting list counts

## Form Fields

### Required Fields
- **Name**: Full name of the user
- **Email**: Valid email address (with format validation)
- **Phone**: UK phone number format
- **Privacy Consent**: GDPR compliance checkbox

### Optional Fields
- **Language Preference**: Portuguese, English, or Both
- **Notification Preference**: Email, Phone, or Both
- **Event Questions**: Free text for event-specific questions

## Validation
- Email format validation
- UK phone number validation
- Required field validation
- Duplicate entry prevention
- Real-time error display

## User Experience Features

### Visual Indicators
- Different button styles for available vs. full events
- Progress bars showing attendance
- Waiting list counters
- Success animations

### Status Messages
- Bilingual status messages
- Clear call-to-action buttons
- Position in queue display
- Contact method confirmation

### Mobile Optimization
- Touch-friendly form controls
- Mobile-responsive modal
- Optimized button sizes
- Accessible form labels

## Integration

### Event Components
- EventsShowcase.tsx: Updated with waiting list functionality
- EventCard.tsx: Reusable component with built-in waiting list support

### Language Support
- All text localized in English and Portuguese
- Error messages in user's preferred language
- Success confirmations in appropriate language

### Provider Integration
- Added to app layout.tsx
- Available throughout the application
- Persistent storage across sessions

## Demo Page
- `/waiting-list-demo`: Demonstration page showing the system in action
- Shows different event statuses
- Interactive waiting list forms
- Feature explanations

## Technical Implementation

### Data Structure
```typescript
interface WaitingListEntry {
  id: string
  eventId: number
  name: string
  email: string
  phone: string
  portuguesePreference?: 'portuguese' | 'english' | 'both'
  notificationPreference?: 'email' | 'phone' | 'both'
  eventSpecificQuestions?: string
  agreedToPrivacy: boolean
  joinedAt: Date
}
```

### Priority System
- First-come, first-served based on `joinedAt` timestamp
- Position calculation available for users
- Automatic queue management

### Storage
- localStorage for client-side persistence
- JSON serialization with Date object handling
- Automatic cleanup and validation

## Future Enhancements
- Email notification system
- SMS notifications
- Admin dashboard for waiting list management
- Analytics and reporting
- Automatic spot allocation
- Calendar integration

## Usage Examples

### Basic Event Card
```tsx
<EventCard 
  event={eventData} 
  showWaitingListModal={true} 
/>
```

### Manual Waiting List Modal
```tsx
const { openWaitingListModal } = useWaitingListActions()

<button onClick={() => openWaitingListModal(event)}>
  Join Waiting List
</button>
```

### Check Waiting List Status
```tsx
const { getWaitingListCount } = useWaitingList()
const count = getWaitingListCount(eventId)
```

## Testing
- Visit `/waiting-list-demo` to test the complete system
- Try joining waiting lists for fully booked events
- Test form validation and error handling
- Verify bilingual functionality