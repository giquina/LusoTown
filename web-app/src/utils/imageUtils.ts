import { ROUTES } from '@/config';
import { mockProfileImages, mockEventImages } from '@/config/mockData';

// Get profile image with fallback
export const getProfileImage = (userId: string | undefined): string => {
  if (!userId) return mockProfileImages.default;
  
  const imageKey = userId.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  return mockProfileImages[imageKey] || mockProfileImages.default;
};

// Get event image with fallback
export const getEventImage = (eventType: string | undefined): string => {
  if (!eventType) return mockEventImages.networking;
  
  const imageKey = eventType.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  return mockEventImages[imageKey] || mockEventImages.networking;
};

// Convert old static image paths to dynamic ones
export const convertStaticImagePath = (imagePath: string): string => {
  // Handle profile images
  if (imagePath.includes('/images/profiles/')) {
    const filename = imagePath.split('/').pop()?.replace('.jpg', '') || 'default';
    return getProfileImage(filename);
  }
  
  // Handle event images  
  if (imagePath.includes(buildRoute(ROUTES.events, { id: 'event-id' }))) {
    const filename = imagePath.split('/').pop()?.replace('.jpg', '') || 'networking';
    return getEventImage(filename);
  }
  
  // Return original path if no conversion needed
  return imagePath;
};