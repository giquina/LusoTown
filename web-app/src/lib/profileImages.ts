import { buildUnsplashUrl } from '@/config'
/**
 * Profile Images Management System
 * Provides local image assets for profile photos with fallback support
 */

export interface ProfileImage {
  id: string
  path: string
  alt: string
  category: 'testimonial' | 'community' | 'directory' | 'forum'
}

// Local profile images mapping
export const profileImages: Record<string, ProfileImage> = {
  // Testimonials (6 main testimonials)
  'sarah-chen': {
    id: 'sarah-chen',
    path: '/profiles/testimonials/sarah-chen.jpg',
    alt: 'Sarah Chen - LusoTown member from Clapham, London',
    category: 'testimonial'
  },
  'maya-patel': {
    id: 'maya-patel',
    path: '/profiles/testimonials/maya-patel.jpg',
    alt: 'Maya Patel - LusoTown member from Shoreditch, London',
    category: 'testimonial'
  },
  'jessica-williams': {
    id: 'jessica-williams',
    path: '/profiles/testimonials/jessica-williams.jpg',
    alt: 'Jessica Williams - LusoTown member from Notting Hill, London',
    category: 'testimonial'
  },
  'emma-johnson': {
    id: 'emma-johnson',
    path: '/profiles/testimonials/emma-johnson.jpg',
    alt: 'Emma Johnson - LusoTown member from Greenwich, London',
    category: 'testimonial'
  },
  'priya-sharma': {
    id: 'priya-sharma',
    path: '/profiles/testimonials/priya-sharma.jpg',
    alt: 'Priya Sharma - LusoTown member from Canary Wharf, London',
    category: 'testimonial'
  },
  'lisa-thompson': {
    id: 'lisa-thompson',
    path: '/profiles/testimonials/lisa-thompson.jpg',
    alt: 'Lisa Thompson - LusoTown member from Richmond, London',
    category: 'testimonial'
  },

  // Community showcase (12 diverse images for photo grid)
  'community-1': {
    id: 'community-1',
    path: '/profiles/community/member-1.jpg',
    alt: 'LusoTown member - Professional woman smiling',
    category: 'community'
  },
  'community-2': {
    id: 'community-2',
    path: '/profiles/community/member-2.jpg',
    alt: 'LusoTown member - Confident woman in professional setting',
    category: 'community'
  },
  'community-3': {
    id: 'community-3',
    path: '/profiles/community/member-3.jpg',
    alt: 'LusoTown member - Diverse professional woman',
    category: 'community'
  },
  'community-4': {
    id: 'community-4',
    path: '/profiles/community/member-4.jpg',
    alt: 'LusoTown member - Woman with warm smile',
    category: 'community'
  },
  'community-5': {
    id: 'community-5',
    path: '/profiles/community/member-5.jpg',
    alt: 'LusoTown member - Professional woman outdoors',
    category: 'community'
  },
  'community-6': {
    id: 'community-6',
    path: '/profiles/community/member-6.jpg',
    alt: 'LusoTown member - Confident professional woman',
    category: 'community'
  },
  'community-7': {
    id: 'community-7',
    path: '/profiles/community/member-7.jpg',
    alt: 'LusoTown member - Woman with authentic smile',
    category: 'community'
  },
  'community-8': {
    id: 'community-8',
    path: '/profiles/community/member-8.jpg',
    alt: 'LusoTown member - Approachable professional woman',
    category: 'community'
  },
  'community-9': {
    id: 'community-9',
    path: '/profiles/community/member-9.jpg',
    alt: 'LusoTown member - Confident woman in natural lighting',
    category: 'community'
  },
  'community-10': {
    id: 'community-10',
    path: '/profiles/community/member-10.jpg',
    alt: 'LusoTown member - Professional woman with warm expression',
    category: 'community'
  },
  'community-11': {
    id: 'community-11',
    path: '/profiles/community/member-11.jpg',
    alt: 'LusoTown member - Diverse woman with bright smile',
    category: 'community'
  },
  'community-12': {
    id: 'community-12',
    path: '/profiles/community/member-12.jpg',
    alt: 'LusoTown member - Woman with authentic expression',
    category: 'community'
  },

  // Directory profiles (6 main directory members)
  'rachel-green': {
    id: 'rachel-green',
    path: '/profiles/directory/rachel-green.jpg',
    alt: 'Rachel Green - Wine enthusiast and book lover',
    category: 'directory'
  },
  'emma-wilson': {
    id: 'emma-wilson',
    path: '/profiles/directory/emma-wilson.jpg',
    alt: 'Emma Wilson - Fitness enthusiast and adventure seeker',
    category: 'directory'
  },
  'sophia-martinez': {
    id: 'sophia-martinez',
    path: '/profiles/directory/sophia-martinez.jpg',
    alt: 'Sophia Martinez - Tech professional and creative',
    category: 'directory'
  },
  'olivia-taylor': {
    id: 'olivia-taylor',
    path: '/profiles/directory/olivia-taylor.jpg',
    alt: 'Olivia Taylor - Artist and creative professional',
    category: 'directory'
  },
  'ava-davis': {
    id: 'ava-davis',
    path: '/profiles/directory/ava-davis.jpg',
    alt: 'Ava Davis - New to London, finance professional',
    category: 'directory'
  },
  'chloe-brown': {
    id: 'chloe-brown',
    path: '/profiles/directory/chloe-brown.jpg',
    alt: 'Chloe Brown - Environmental consultant',
    category: 'directory'
  },

  // Forum avatars (5 main forum users)
  'forum-user-1': {
    id: 'forum-user-1',
    path: '/profiles/forums/forum-user-1.jpg',
    alt: 'Forum member avatar',
    category: 'forum'
  },
  'forum-user-2': {
    id: 'forum-user-2',
    path: '/profiles/forums/forum-user-2.jpg',
    alt: 'Forum member avatar',
    category: 'forum'
  },
  'forum-user-3': {
    id: 'forum-user-3',
    path: '/profiles/forums/forum-user-3.jpg',
    alt: 'Forum member avatar',
    category: 'forum'
  },
  'forum-user-4': {
    id: 'forum-user-4',
    path: '/profiles/forums/forum-user-4.jpg',
    alt: 'Forum member avatar',
    category: 'forum'
  },
  'forum-user-5': {
    id: 'forum-user-5',
    path: '/profiles/forums/forum-user-5.jpg',
    alt: 'Forum member avatar',
    category: 'forum'
  },

  // Portuguese Community Testimonials (authentic Portuguese speakers)
  'carlos-silva': {
    id: 'carlos-silva',
    path: '/profiles/testimonials/portuguese/carlos-silva.jpg',
    alt: 'Carlos Silva - Portuguese community organizer from Camden, London',
    category: 'testimonial'
  },
  'ana-ferreira': {
    id: 'ana-ferreira',
    path: '/profiles/testimonials/portuguese/ana-ferreira.jpg',
    alt: 'Ana Ferreira - Brazilian dance community leader from Stockwell, London',
    category: 'testimonial'
  },
  'miguel-santos': {
    id: 'miguel-santos',
    path: '/profiles/testimonials/portuguese/miguel-santos.jpg',
    alt: 'Miguel Santos - Fado soul and cultural preservationist from Elephant & Castle, London',
    category: 'testimonial'
  },
  'joana-silva': {
    id: 'joana-silva',
    path: '/profiles/testimonials/portuguese/joana-silva.jpg',
    alt: 'Joana Silva - Culinary culture and professional networking from Canary Wharf, London',
    category: 'testimonial'
  },
  'pedro-costa': {
    id: 'pedro-costa',
    path: '/profiles/testimonials/portuguese/pedro-costa.jpg',
    alt: 'Pedro Costa - Literature and tech community builder from Hampstead, London',
    category: 'testimonial'
  },
  'teresa-rodrigues': {
    id: 'teresa-rodrigues',
    path: '/profiles/testimonials/portuguese/teresa-rodrigues.jpg',
    alt: 'Teresa Rodrigues - Music appreciation and cultural unity from Brixton, London',
    category: 'testimonial'
  },
  'ricardo-oliveira': {
    id: 'ricardo-oliveira',
    path: '/profiles/testimonials/portuguese/ricardo-oliveira.jpg',
    alt: 'Ricardo Oliveira - Sports and social community organizer from Greenwich, London',
    category: 'testimonial'
  },
  'fernanda-santos': {
    id: 'fernanda-santos',
    path: '/profiles/testimonials/portuguese/fernanda-santos.jpg',
    alt: 'Fernanda Santos - Language exchange and cultural bridge from King\'s Cross, London',
    category: 'testimonial'
  },
  'antonio-pereira': {
    id: 'antonio-pereira',
    path: '/profiles/testimonials/portuguese/antonio-pereira.jpg',
    alt: 'António Pereira - Cultural tours and business development from City of London',
    category: 'testimonial'
  },
  'fernanda-oliveira': {
    id: 'fernanda-oliveira',
    path: '/profiles/testimonials/portuguese/fernanda-oliveira.jpg',
    alt: 'Fernanda Oliveira - Cultural events organizer from Stockwell, London',
    category: 'testimonial'
  },
  'marco-santos': {
    id: 'marco-santos',
    path: '/profiles/testimonials/portuguese/marco-santos.jpg',
    alt: 'Marco Santos - Brazilian musician and community organizer from Bermondsey, London',
    category: 'testimonial'
  },
  'catarina-lopes': {
    id: 'catarina-lopes',
    path: '/profiles/testimonials/portuguese/catarina-lopes.jpg',
    alt: 'Catarina Lopes - Portuguese educator and Luso-British mother from Nine Elms, London',
    category: 'testimonial'
  }
}

// Helper functions
export function getProfileImage(id: string): ProfileImage | null {
  return profileImages[id] || null
}

export function getImagesByCategory(category: ProfileImage['category']): ProfileImage[] {
  return Object.values(profileImages).filter(img => img.category === category)
}

// Fallback image for missing profiles
export const defaultProfileImage: ProfileImage = {
  id: 'default',
  path: '/profiles/default-avatar.svg',
  alt: 'Default profile avatar',
  category: 'community'
}

/**
 * Get image with fallback support
 */
export function getImageWithFallback(id: string): string {
  const image = getProfileImage(id)
  return image ? image.path : defaultProfileImage.path
}

/**
 * Get alt text with fallback support
 */
export function getAltTextWithFallback(id: string): string {
  const image = getProfileImage(id)
  return image ? image.alt : defaultProfileImage.alt
}

// Image specifications for download/optimization
export const imageSpecs = {
  format: 'jpg',
  quality: 85,
  dimensions: {
    testimonials: { width: 400, height: 400 },
    community: { width: 400, height: 400 },
    directory: { width: 400, height: 400 },
    forums: { width: 200, height: 200 },
    fallback: { width: 200, height: 200 }
  },
  maxFileSize: '200KB'
} as const

// URLs to replace (for reference during migration)
export const urlMappings = {
  // Testimonials original URLs mapped to new local images
  buildUnsplashUrl('photo-1494790108755-2616b612b1ac'): 'sarah-chen',
  buildUnsplashUrl('photo-1580489944761-15a19d654956'): 'maya-patel',
  buildUnsplashUrl('photo-1531746020798-e6953c6e8e04'): 'jessica-williams',
  buildUnsplashUrl('photo-1438761681033-6461ffad8d80'): 'emma-johnson',
  buildUnsplashUrl('photo-1504703395950-b89145a5425b'): 'priya-sharma',
  buildUnsplashUrl('photo-1487412720507-e7ab37603c6f'): 'lisa-thompson',
} as const