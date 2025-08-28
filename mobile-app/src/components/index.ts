/**
 * LusoTown Mobile - Component Exports
 * 
 * Central export point for all mobile app components
 * Optimized for Portuguese-speaking community features
 */

// Carousel Components
export * from './carousels';

// Auth Components
export { default as BiometricAuthButton } from './auth/BiometricAuthButton';
export { default as SocialLoginButtons } from './auth/SocialLoginButtons';

// Event Components  
export { default as EventCard } from './events/EventCard';

// Match Components
export { default as MatchCard } from './matches/MatchCard';
export { default as EnhancedMatchCard } from './matches/EnhancedMatchCard';

// Messaging Components
export { default as ChatScreen } from './messaging/ChatScreen';
export { default as EnhancedChatScreen } from './messaging/EnhancedChatScreen';

// Optimized Components
export { default as OptimizedImage } from './optimized/OptimizedImage';
export { default as OptimizedComponent } from './optimized/OptimizedComponent';

// Performance Components
export { default as CoreWebVitals } from './performance/CoreWebVitals';

// Shared Components
export { default as SharedButton } from './SharedButton';