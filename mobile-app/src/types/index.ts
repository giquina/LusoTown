// 🇵🇹 LusoTown Mobile - Portuguese-speaking Community Types
export type Language = 'en' | 'pt';

export type HeritageCountry = 
  | 'portugal' 
  | 'brazil' 
  | 'cape-verde' 
  | 'angola' 
  | 'mozambique' 
  | 'guinea-bissau' 
  | 'east-timor' 
  | 'sao-tome';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  profilePicture?: string;
  heritage: HeritageCountry;
  language: Language;
  interests: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PortugueseEvent {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  imageUrl?: string;
  date: string;
  endDate?: string;
  location: {
    name: string;
    address: string;
    city: string;
    postcode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  price?: number;
  currency: string;
  capacity?: number;
  attendeesCount: number;
  categories: EventCategory[];
  organizer: EventOrganizer;
  isAttending?: boolean;
  isFavorite?: boolean;
  culturalContext: HeritageCountry[];
}

export interface EventCategory {
  id: string;
  name: Record<Language, string>;
  icon: string;
  color: string;
}

export interface EventOrganizer {
  id: string;
  name: string;
  avatar?: string;
  isVerified: boolean;
}

export interface Match {
  id: string;
  user: User;
  compatibilityScore: number;
  sharedInterests: string[];
  culturalConnections: HeritageCountry[];
  lastActive: string;
  distance?: number;
  isPremium?: boolean;
}

export interface Business {
  id: string;
  name: string;
  description: Record<Language, string>;
  category: BusinessCategory;
  location: {
    address: string;
    city: string;
    postcode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  images: string[];
  rating?: number;
  reviewCount?: number;
  isVerified: boolean;
  ownerHeritage: HeritageCountry[];
  isOpen?: boolean;
  openingHours?: OpeningHours;
}

export interface BusinessCategory {
  id: string;
  name: Record<Language, string>;
  icon: string;
  parentCategory?: string;
}

export interface OpeningHours {
  monday?: TimeSlot;
  tuesday?: TimeSlot;
  wednesday?: TimeSlot;
  thursday?: TimeSlot;
  friday?: TimeSlot;
  saturday?: TimeSlot;
  sunday?: TimeSlot;
}

export interface TimeSlot {
  open: string; // HH:MM format
  close: string; // HH:MM format
  closed?: boolean;
}

export interface NavigationParamList {
  // Auth Stack
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  OnboardingFlow: undefined;
  
  // Main App Stack
  MainTabs: undefined;
  
  // Tab Screens
  Home: undefined;
  Events: undefined;
  Matches: undefined;
  Directory: undefined;
  Profile: undefined;
  
  // Modal Screens
  EventDetails: { eventId: string };
  UserProfile: { userId: string };
  BusinessDetails: { businessId: string };
  Settings: undefined;
  EditProfile: undefined;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Portuguese Cultural Context
export interface CulturalContext {
  heritage: HeritageCountry;
  language: Language;
  traditions: string[];
  festivals: string[];
  cuisine: string[];
  music: string[];
  sports: string[];
}

// Notification Types
export interface PushNotification {
  id: string;
  title: Record<Language, string>;
  body: Record<Language, string>;
  data?: Record<string, any>;
  type: NotificationType;
  priority: 'low' | 'normal' | 'high';
  scheduledFor?: string;
}

export type NotificationType = 
  | 'event_reminder'
  | 'new_match'
  | 'message_received'
  | 'event_invitation'
  | 'community_update'
  | 'cultural_celebration';

// Form Types
export interface OnboardingData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  heritage: HeritageCountry;
  language: Language;
  interests: string[];
  profilePicture?: string;
  acceptedTerms: boolean;
  marketingConsent: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupCredentials extends LoginCredentials {
  confirmPassword: string;
  firstName: string;
  lastName: string;
  acceptedTerms: boolean;
}

// App State Types
export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  language: Language;
  heritage: HeritageCountry | null;
  notifications: PushNotification[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  language: Language;
  notifications: {
    push: boolean;
    email: boolean;
    events: boolean;
    matches: boolean;
    marketing: boolean;
  };
  privacy: {
    showAge: boolean;
    showLocation: boolean;
    showHeritage: boolean;
  };
  matching: {
    ageRange: [number, number];
    distanceRadius: number;
    heritagePreference: HeritageCountry[];
  };
}

export default {};