import { buildUnsplashUrl } from '@/config'
// Mock profile images using placeholder services for realistic faces
export const mockProfileImages = {
  // Using thispersondoesnotexist-style placeholders
  'ana-sofia': buildUnsplashUrl('photo-1494790108755-2616b9292ad8?w=400&h=400&fit=crop&crop=face'),
  'miguel-santos': buildUnsplashUrl('photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'),
  'beatriz-oliveira': buildUnsplashUrl('photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'),
  'joao-ferreira': buildUnsplashUrl('photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'),
  'carolina-lima': buildUnsplashUrl('photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face'),
  'ricardo-costa': buildUnsplashUrl('photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'),
  'maria': buildUnsplashUrl('photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face'),
  'joao': buildUnsplashUrl('photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face'),
  'default': buildUnsplashUrl('photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face')
};

// Mock event images using realistic stock photos
export const mockEventImages = {
  'networking': buildUnsplashUrl('photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop'),
  'book-club': buildUnsplashUrl('photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'),
  'wine-tasting': buildUnsplashUrl('photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'),
  'yoga': buildUnsplashUrl('photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop'),
  'art-tour': buildUnsplashUrl('photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop'),
  'jazz-networking': buildUnsplashUrl('photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop'),
  'wine-paint': buildUnsplashUrl('photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop'),
  'fado-night': buildUnsplashUrl('photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop'),
  'portuguese-networking': buildUnsplashUrl('photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop'),
  'transport-showcase': buildUnsplashUrl('photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop')
};

// Helper function to get profile image with fallback
export const getProfileImage = (userId: string): string => {
  const imageKey = userId.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  return mockProfileImages[imageKey] || mockProfileImages.default;
};

// Helper function to get event image with fallback  
export const getEventImage = (eventType: string): string => {
  const imageKey = eventType.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  return mockEventImages[imageKey] || mockEventImages.networking;
};