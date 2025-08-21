/**
 * Event Availability Management
 * Controls which events are bookable vs fully booked
 */

import { Event } from './events';

// Events that should remain available for booking
const AVAILABLE_EVENT_IDS = [
  'business-001', // AI business event
  'tech-ai-workshop-001', // AI workshop
  'ai-business-growth-001' // AI business growth
];

// Events categories that should be fully booked
const FULLY_BOOKED_CATEGORIES = [
  'Cultural Heritage',
  'Music & Nightlife', 
  'Social Experiences',
  'Arts & Entertainment',
  'Cultural Tours',
  'Women 30+',
  'Women 40+',
  'Mixed Groups'
];

/**
 * Update event status based on availability rules
 */
export const updateEventAvailability = (event: Event): Event => {
  // Check if this specific event should remain available
  if (AVAILABLE_EVENT_IDS.includes(event.id)) {
    return {
      ...event,
      status: 'published' as const,
      currentAttendees: Math.min(event.currentAttendees, event.maxAttendees - 5), // Keep some spots available
      waitlistCount: 0
    };
  }

  // Check if this category should be fully booked
  if (FULLY_BOOKED_CATEGORIES.includes(event.category)) {
    return {
      ...event,
      status: 'fully-booked' as const,
      currentAttendees: event.maxAttendees,
      waitlistCount: Math.floor(Math.random() * 15) + 5 // 5-20 people on waitlist
    };
  }

  // Business events remain available unless specifically marked unavailable
  const businessCategories = [
    'Technology & AI',
    'Business & Professional', 
    'Finance & Investment',
    'Professional Networking'
  ];
  
  if (businessCategories.includes(event.category)) {
    return {
      ...event,
      status: 'published' as const,
      currentAttendees: Math.min(event.currentAttendees, event.maxAttendees - 3),
      waitlistCount: 0
    };
  }

  // Default: make event fully booked
  return {
    ...event,
    status: 'fully-booked' as const,
    currentAttendees: event.maxAttendees,
    waitlistCount: Math.floor(Math.random() * 10) + 2
  };
};

/**
 * Check if an event is available for booking
 */
export const isEventAvailable = (event: Event): boolean => {
  return event.status === 'published' && event.currentAttendees < event.maxAttendees;
};

/**
 * Check if an event has waiting list available
 */
export const hasWaitingListAvailable = (event: Event): boolean => {
  return event.status === 'fully-booked';
};

/**
 * Get availability label for display
 */
export const getEventAvailabilityLabel = (event: Event, isPortuguese: boolean = false): string => {
  if (isEventAvailable(event)) {
    const spotsLeft = event.maxAttendees - event.currentAttendees;
    if (spotsLeft <= 3) {
      return isPortuguese ? `${spotsLeft} lugares restantes` : `${spotsLeft} spots left`;
    }
    return isPortuguese ? 'Disponível' : 'Available';
  }
  
  if (event.status === 'fully-booked') {
    return isPortuguese ? 'Esgotado' : 'Fully Booked';
  }
  
  if (event.status === 'cancelled') {
    return isPortuguese ? 'Cancelado' : 'Cancelled';
  }
  
  return isPortuguese ? 'Indisponível' : 'Unavailable';
};

/**
 * Get availability color scheme
 */
export const getEventAvailabilityColor = (event: Event) => {
  if (isEventAvailable(event)) {
    const spotsLeft = event.maxAttendees - event.currentAttendees;
    if (spotsLeft <= 3) {
      return {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        border: 'border-yellow-200',
        badge: 'bg-yellow-500'
      };
    }
    return {
      bg: 'bg-green-100',
      text: 'text-green-800', 
      border: 'border-green-200',
      badge: 'bg-green-500'
    };
  }
  
  return {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200', 
    badge: 'bg-red-500'
  };
};

/**
 * Get estimated availability for waitlisted events
 */
export const getEventEstimatedAvailability = (event: Event, isPortuguese: boolean = false): string | null => {
  if (event.status !== 'fully-booked') return null;
  
  // Simulate estimated availability based on category
  const estimates = {
    'Cultural Heritage': isPortuguese ? 'Março 2025' : 'March 2025',
    'Music & Nightlife': isPortuguese ? 'Fevereiro 2025' : 'February 2025',
    'Social Experiences': isPortuguese ? 'Abril 2025' : 'April 2025',
    'Arts & Entertainment': isPortuguese ? 'Março 2025' : 'March 2025',
    'Cultural Tours': isPortuguese ? 'Maio 2025' : 'May 2025',
    'Women 30+': isPortuguese ? 'Abril 2025' : 'April 2025',
    'Women 40+': isPortuguese ? 'Março 2025' : 'March 2025',
    'Mixed Groups': isPortuguese ? 'Fevereiro 2025' : 'February 2025'
  };
  
  return estimates[event.category as keyof typeof estimates] || (isPortuguese ? 'A definir' : 'TBD');
};