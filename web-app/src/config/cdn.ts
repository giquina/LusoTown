import { buildUnsplashUrl, SOCIAL_URLS, buildCloudinaryUrl } from '@/config'
/**
 * CDN and External Resource URL Management
 * 
 * Centralizes all external URLs, CDN endpoints, and resource links
 * to eliminate hardcoded URLs throughout the application.
 */

// CDN and Image Providers
export const CDN_PROVIDERS = {
  unsplash: 'https://images.unsplash.com',
  cloudinary: buildCloudinaryUrl('lusotown'),
  bunnycdn: 'https://lusotown.b-cdn.net',
  gravatar: 'https://www.gravatar.com/avatar',
  youtube: 'https://img.youtube.com/vi',
  vimeo: 'https://i.vimeocdn.com/video'
} as const;

// Social Media URLs
export const SOCIAL_URLS = {
  instagram: 'https://instagram.com/lusotownlondon',
  facebook: 'https://facebook.com/lusotownlondon',
  twitter: 'https://twitter.com/lusotownlondon',
  linkedin: 'https://linkedin.com/company/lusotown',
  youtube: 'https://youtube.com/@lusotownlondon',
  tiktok: 'https://tiktok.com/@lusotownlondon',
  whatsapp: 'https://chat.whatsapp.com/lusotown'
} as const;

// Portuguese Cultural and Official Resources
export const PORTUGUESE_RESOURCES = {
  consulado: 'https://consuladoportugallondres.uk',
  institutoCamoes: 'https://instituto-camoes.pt',
  rtp: 'https://www.rtp.pt',
  sic: 'https://sicnoticias.pt',
  publico: 'https://publico.pt',
  observador: 'https://observador.pt',
  lusa: 'https://lusa.pt'
} as const;

// University Partnership URLs
export const UNIVERSITY_URLS = {
  ucl: 'https://ucl.ac.uk/students/international',
  kingscollege: 'https://kcl.ac.uk/international',
  imperial: 'https://imperial.ac.uk/study/international-students',
  lse: 'https://lse.ac.uk/study/international-students',
  qmul: 'https://qmul.ac.uk/international-students',
  greenwich: 'https://gre.ac.uk/international',
  westminster: 'https://westminster.ac.uk/international',
  roehampton: 'https://roehampton.ac.uk/international',
  oxford: 'https://www.ox.ac.uk',
  cambridge: 'https://www.cam.ac.uk',
  manchester: 'https://www.manchester.ac.uk',
  edinburgh: 'https://www.ed.ac.uk'
} as const;

// External Service URLs
export const EXTERNAL_SERVICES = {
  stripe: 'https://checkout.stripe.com',
  supabase: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co',
  maps: 'https://www.openstreetmap.org',
  directions: 'https://www.google.com/maps/dir',
  translate: 'https://translate.google.com',
  calendar: 'https://calendar.google.com/calendar/render'
} as const;

// Streaming and Media URLs
export const STREAMING_URLS = {
  server: process.env.NEXT_PUBLIC_STREAMING_SERVER_URL || 'http://localhost:8080',
  rtmp: process.env.NEXT_PUBLIC_RTMP_SERVER_URL || 'rtmp://localhost:1935',
  hls: process.env.NEXT_PUBLIC_HLS_SERVER_URL || 'http://localhost:8080/live',
  webrtc: process.env.NEXT_PUBLIC_WEBRTC_SERVER_URL || 'ws://localhost:8080/webrtc'
} as const;

// Business and Professional URLs
export const BUSINESS_URLS = {
  companiesHouse: 'https://find-and-update.company-information.service.gov.uk',
  trustpilot: 'https://uk.trustpilot.com/review/lusotown.com',
  googleBusiness: 'https://business.google.com',
  yell: 'https://yell.com',
  bing: 'https://www.bingplaces.com'
} as const;

// Legal and Compliance URLs
export const LEGAL_URLS = {
  ico: 'https://ico.org.uk',
  gdpr: 'https://gdpr.eu',
  accessibility: 'https://www.w3.org/WAI/WCAG21/quickref',
  cookies: 'https://www.cookielaw.org/the-cookie-law'
} as const;

// Event and Ticketing URLs
export const TICKETING_URLS = {
  eventbrite: 'https://eventbrite.co.uk',
  meetup: 'https://meetup.com',
  facebook: 'https://facebook.com/events',
  ical: 'data:text/calendar;charset=utf8'
} as const;

// Transportation URLs
export const TRANSPORT_URLS = {
  tfl: 'https://tfl.gov.uk',
  uber: 'https://uber.com',
  bolt: 'https://bolt.eu',
  citymapper: 'https://citymapper.com/london'
} as const;

// Helper functions for URL construction
export const buildUnsplashUrl = (imageId: string, width?: number, height?: number): string => {
  const baseUrl = `${CDN_PROVIDERS.unsplash}/${imageId}`;
  if (width && height) {
    return `${baseUrl}?w=${width}&h=${height}&fit=crop`;
  }
  if (width) {
    return `${baseUrl}?w=${width}&fit=crop`;
  }
  return baseUrl;
};

export const buildCloudinaryUrl = (publicId: string, transformations?: string): string => {
  const baseUrl = `${CDN_PROVIDERS.cloudinary}/image/upload`;
  return transformations 
    ? `${baseUrl}/${transformations}/${publicId}`
    : `${baseUrl}/${publicId}`;
};

export const buildGravatarUrl = (email: string, size: number = 200): string => {
  const hash = btoa(email.toLowerCase().trim()).replace(/=/g, '');
  return `${CDN_PROVIDERS.gravatar}/${hash}?s=${size}&d=identicon`;
};

export const buildCalendarUrl = (title: string, start: string, end: string, description?: string): string => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    ...(description && { details: description })
  });
  return `${EXTERNAL_SERVICES.calendar}?${params.toString()}`;
};

export const buildDirectionsUrl = (destination: string, origin?: string): string => {
  const params = new URLSearchParams({
    api: '1',
    destination,
    ...(origin && { origin })
  });
  return `${EXTERNAL_SERVICES.directions}?${params.toString()}`;
};

export const buildSocialShareUrl = (platform: keyof typeof SOCIAL_URLS, url: string, text?: string): string => {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = text ? encodeURIComponent(text) : '';
  
  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
    case 'facebook':
      return `https://facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'linkedin':
      return `https://linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case 'whatsapp':
      return `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
    default:
      return url;
  }
};

// Type definitions
export type CDNProvider = keyof typeof CDN_PROVIDERS;
export type SocialPlatform = keyof typeof SOCIAL_URLS;
export type UniversityPartner = keyof typeof UNIVERSITY_URLS;
export type ExternalService = keyof typeof EXTERNAL_SERVICES;