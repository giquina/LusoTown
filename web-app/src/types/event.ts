// Shared Event types for events-related components
// Keep this flexible to accommodate different event variants used across the app.
import type { ReactNode } from "react";

export type EventStatus = "available" | "fully-booked";

export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  address?: string;
  date: string; // e.g., "Mon, 2 Dec"
  time: string; // start time
  endTime?: string;
  attendees: number;
  maxAttendees: number;
  price: number; // in GBP major units
  category: string;
  image: string; // path or URL
  color?: string; // tailwind gradient class
  icon?: ReactNode;
  ageRestriction?: string;
  tags?: string[];
  status: EventStatus;
  featured?: boolean;
  specialOffer?: string;
  agenda?: string[];
  // New Match-to-Event Integration fields
  culturalCategory?: string;
  portugueseCulturalFocus?: boolean;
  culturalTraditions?: string[];
  languageRequirements?:
    | "portuguese_only"
    | "english_only"
    | "bilingual"
    | "any";
  heritageCelebration?: string;
  buddyPricingEnabled?: boolean;
  groupDiscountEnabled?: boolean;
  maxGroupSize?: number;
  minGroupSize?: number;
}

// New Match-to-Event Integration types
export interface EventBuddy {
  id: string;
  requesterId: string;
  requesteeId: string;
  eventId: string;
  buddyType:
    | "double_date"
    | "friend_group"
    | "cultural_companion"
    | "networking_partner";
  status: "pending" | "accepted" | "declined" | "cancelled" | "completed";
  message?: string;
  groupSize: number;
  preferredGroupComposition?: Record<string, any>;
  culturalPreferences?: Record<string, any>;
  buddyRequestExpiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupBooking {
  id: string;
  eventId: string;
  organizerId: string;
  bookingReference: string;
  groupName?: string;
  totalParticipants: number;
  confirmedParticipants: number;
  paymentSplitType: "equal" | "organizer_pays" | "custom";
  totalAmount: number;
  groupDiscountPercentage: number;
  groupDiscountAmount: number;
  finalAmount: number;
  currency: string;
  bookingStatus:
    | "pending"
    | "confirmed"
    | "partial_confirmed"
    | "cancelled"
    | "completed";
  paymentStatus: "pending" | "partial" | "completed" | "refunded";
  specialRequirements?: string;
  expiresAt?: string;
  confirmedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupBookingParticipant {
  id: string;
  groupBookingId: string;
  participantId: string;
  invitationStatus: "pending" | "accepted" | "declined" | "expired";
  paymentShare: number;
  paymentStatus: "pending" | "paid" | "refunded";
  invitedAt: string;
  respondedAt?: string;
  createdAt: string;
}

export interface CulturalPreferences {
  id: string;
  userId: string;
  portugueseOrigin?:
    | "portugal"
    | "brazil"
    | "angola"
    | "mozambique"
    | "cape_verde"
    | "guinea_bissau"
    | "sao_tome_principe"
    | "east_timor"
    | "macau"
    | "mixed"
    | "other";
  languagePreference: "portuguese_only" | "english_only" | "both";
  culturalInterests: Record<string, any>;
  eventPreferences: Record<string, any>;
  culturalCelebrationPreferences: string[];
  musicPreferences: string[];
  foodPreferences: string[];
  heritageConnectionLevel?:
    | "strong"
    | "moderate"
    | "learning"
    | "heritage_seeker";
  createdAt: string;
  updatedAt: string;
}

export interface EventCompatibility {
  id: string;
  matchId: string;
  eventId: string;
  compatibilityScore: number;
  sharedInterests: string[];
  culturalCompatibilityScore: number;
  locationCompatibilityScore: number;
  timingCompatibilityScore: number;
  recommendationReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventRecommendation {
  id: string;
  userId: string;
  matchedUserId: string;
  eventId: string;
  recommendationScore: number;
  recommendationReason: string;
  sharedCulturalInterests: string[];
  portugueseCulturalFocus: boolean;
  recommendationType:
    | "post_match"
    | "compatibility_based"
    | "cultural_event"
    | "buddy_suggestion";
  status: "pending" | "viewed" | "dismissed" | "booked" | "expired";
  expiresAt?: string;
  viewedAt?: string;
  createdAt: string;
}

export interface BuddyPricingTier {
  id: string;
  eventId: string;
  groupSize: number;
  discountPercentage: number;
  pricePerPerson: number;
  description?: string;
  isActive: boolean;
  createdAt: string;
}
