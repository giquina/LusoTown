/**
 * Simple Community Matching System
 * 
 * Simplified matching components for Portuguese-speaking community connections
 * focused on cultural compatibility and event-based friendships
 */

// Core matching components (simplified)
export { default as MatchesSystem } from './MatchesSystem';
export { default as CulturalProfileSetup } from './CulturalProfileSetup';

// Event-based matching (basic)
export { default as MatchEventSuggestions } from './MatchEventSuggestions';
export { default as EventBuddyFinder } from './EventBuddyFinder';
export { default as EventMatchingIntegration } from './EventMatchingIntegration';
export { default as PostEventConnections } from './PostEventConnections';

// Cultural compatibility system (essential only)
export { default as CulturalCompatibilityBadge } from './CulturalCompatibilityBadge';
export { default as CulturalCompatibilityIntegration } from './CulturalCompatibilityIntegration';
export { default as CulturalCompatibilityResults } from './CulturalCompatibilityResults';

// Cultural verification (basic)
export { default as CulturallyVerifiedMatchCard } from './CulturallyVerifiedMatchCard';
export { default as CulturalVerificationBadges } from './CulturalVerificationBadges';
export { default as CulturalVerificationIntegration } from './CulturalVerificationIntegration';

// Group matching (simplified)
export { default as GroupMatching } from './GroupMatching';

// Communication (basic)
export { default as MatchConversationInterface } from './MatchConversationInterface';
export { default as EventConversationStarters } from './EventConversationStarters';
export { default as SaudadeMatchingIntegration } from './SaudadeMatchingIntegration';

// Achievements (basic)
export { default as MatchingAchievements } from './MatchingAchievements';

// UI components (essential only)
export { default as CulturalPhotoGallery } from './CulturalPhotoGallery';
export { default as CulturalQuizDemo } from './CulturalQuizDemo';
export { default as HowItWorksSection } from './HowItWorksSection';

// Types
export interface MatchProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  profession: string;
  origin: string;
  interests: string[];
  bio: string;
  image?: string;
  compatibility: number;
  eventCompatibility: number;
  culturalAlignment: number;
  suggestedEvents: Array<{
    id: string;
    title: string;
    category: string;
    date: string;
    price: number;
  }>;
  conversationStarters: Array<{
    id: string;
    text: string;
    category: string;
    culturalContext: string;
    popularity: number;
  }>;
  achievements: Array<{
    id: string;
    name: string;
    icon: string;
    category: string;
  }>;
  isVerified: boolean;
  responseRate: number;
  lastActive: string;
}

export interface EventSuggestion {
  id: string;
  title: string;
  description: string;
  category: string;
  culturalCategory: string;
  date: string;
  time: string;
  location: string;
  neighborhood: string;
  price: number;
  spotsAvailable: number;
  totalSpots: number;
  compatibilityScore: number;
  compatibilityReasons: string[];
  image?: string;
  isFadoFeatured: boolean;
  isSantosPopulares: boolean;
  isFootballViewing: boolean;
  buddyDiscountPercent: number;
  culturalAuthenticity: number;
}

export interface Achievement {
  id: string;
  type: 'first_match' | 'mutual_match' | 'event_attendee' | 'cultural_explorer' | 
        'fado_lover' | 'food_enthusiast' | 'football_fan' | 'networking_pro' |
        'community_builder' | 'cultural_ambassador' | 'buddy_matcher' | 'conversation_starter';
  name: string;
  description: string;
  category: 'matching' | 'cultural' | 'social' | 'events' | 'community';
  level: number;
  maxLevel: number;
  currentProgress: number;
  requiredProgress: number;
  badgeIcon: string;
  badgeColor: string;
  pointsAwarded: number;
  unlockedAt?: string;
  isUnlocked: boolean;
  isFeatured: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  culturalAuthenticity: number;
  rewards?: {
    discountPercent?: number;
    priorityMatching?: boolean;
    specialBadge?: string;
    exclusiveEvents?: boolean;
  };
}

export interface BuddyRequest {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventPrice: number;
  eventCategory: string;
  requesterName: string;
  requesterAge: number;
  requesterImage?: string;
  requesterInterests: string[];
  compatibilityScore: number;
  sharedInterests: string[];
  culturalAlignment: number;
  buddyDiscountPercent: number;
  message?: string;
  timePosted: string;
  responseRate: number;
  isVerified: boolean;
  preferredBuddyCriteria: {
    ageRange: [number, number];
    interests: string[];
    genderPreference: string;
    portugueseSpeakerOnly: boolean;
  };
}

export interface GroupMember {
  id: string;
  name: string;
  age: number;
  image?: string;
  interests: string[];
  location: string;
  isVerified: boolean;
  compatibilityScore: number;
  culturalAlignment: number;
}

export interface GroupMatchRequest {
  id: string;
  initiatorId: string;
  initiatorName: string;
  initiatorAge: number;
  initiatorImage?: string;
  friendId?: string;
  friendName?: string;
  friendAge?: number;
  friendImage?: string;
  requestType: 'double_date' | 'friend_introduction' | 'group_activity' | 'cultural_exploration';
  targetGroupSize: number;
  preferredActivityTypes: string[];
  preferredCulturalFocus: string[];
  ageRangeMin: number;
  ageRangeMax: number;
  genderPreferences: string;
  portugueseSpeakersOnly: boolean;
  preferredNeighborhoods: string[];
  description: string;
  status: 'open' | 'matched' | 'completed' | 'cancelled';
  createdAt: string;
  expiresAt: string;
  suggestedGroups?: GroupMember[][];
  groupCompatibilityScore: number;
  culturalAlignmentScore: number;
}