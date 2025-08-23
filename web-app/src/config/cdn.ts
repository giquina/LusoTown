/**
 * CDN and External Resource URL Management
 * 
 * Centralizes all external URLs, CDN endpoints, and resource links
 * to eliminate hardcoded URLs throughout the application.
 * 
 * Features:
 * - Environment-aware URL configuration (dev/prod)
 * - Portuguese cultural resource management
 * - University partnership URL management
 * - Social media URL synchronization with contact config
 * - Image URL builders with optimization parameters
 * - Streaming infrastructure URL management
 * 
 * Usage:
 * - Import specific URL constants: `import { UNIVERSITY_URLS } from '@/config/cdn'`
 * - Use helper functions: `buildUnsplashUrl('photo-123', 600, 400)`
 * - Build environment-specific URLs: `buildStreamingUrl('hls', streamId)`
 */

// CDN and Image Providers
export const CDN_PROVIDERS = {
  unsplash: process.env.NEXT_PUBLIC_UNSPLASH_BASE_URL || 'https://images.unsplash.com',
  cloudinary: process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL || 'https://res.cloudinary.com/dqhbeqttp',
  bunnycdn: process.env.NEXT_PUBLIC_BUNNYCDN_BASE_URL || 'https://lusotown.b-cdn.net',
  gravatar: process.env.NEXT_PUBLIC_GRAVATAR_BASE_URL || 'https://www.gravatar.com/avatar',
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_THUMBNAILS_URL || 'https://img.youtube.com/vi',
  vimeo: process.env.NEXT_PUBLIC_VIMEO_THUMBNAILS_URL || 'https://i.vimeocdn.com/video'
} as const;

// Social Media URLs - Sync with contact.ts
export const SOCIAL_URLS = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/lusotownlondon',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com/lusotownlondon',
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/lusotownlondon',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/lusotown',
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com/@lusotownlondon',
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://tiktok.com/@lusotownlondon',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://chat.whatsapp.com/lusotown'
} as const;

// Portuguese Cultural and Official Resources
export const PORTUGUESE_RESOURCES = {
  consulado: process.env.NEXT_PUBLIC_CONSULADO_URL || 'https://london.embaixadaportugal.mne.gov.pt',
  institutoCamoes: process.env.NEXT_PUBLIC_INSTITUTO_CAMOES_URL || 'https://instituto-camoes.pt',
  camoesLondon: process.env.NEXT_PUBLIC_CAMOES_LONDON_URL || 'https://instituto-camoes.pt/en/centres/london',
  rtp: process.env.NEXT_PUBLIC_RTP_URL || 'https://www.rtp.pt',
  sic: process.env.NEXT_PUBLIC_SIC_URL || 'https://sicnoticias.pt',
  publico: process.env.NEXT_PUBLIC_PUBLICO_URL || 'https://publico.pt',
  observador: process.env.NEXT_PUBLIC_OBSERVADOR_URL || 'https://observador.pt',
  lusa: process.env.NEXT_PUBLIC_LUSA_URL || 'https://lusa.pt',
  // Event Registration URLs
  symposium: process.env.NEXT_PUBLIC_CAMOES_SYMPOSIUM_URL || 'https://instituto-camoes.pt/symposium',
  fadoMasterclass: process.env.NEXT_PUBLIC_CAMOES_FADO_URL || 'https://instituto-camoes.pt/fado-masterclass',
  cinemaFestival: process.env.NEXT_PUBLIC_CAMOES_CINEMA_URL || 'https://instituto-camoes.pt/cinema-festival',
  heritageWorkshop: process.env.NEXT_PUBLIC_CAMOES_HERITAGE_URL || 'https://instituto-camoes.pt/heritage-workshop',
  lusophoneLiterature: process.env.NEXT_PUBLIC_CAMOES_LITERATURE_URL || 'https://instituto-camoes.pt/lusophone-literature',
  // Educational Resources
  digitalLibrary: process.env.NEXT_PUBLIC_CAMOES_LIBRARY_URL || 'https://biblioteca.instituto-camoes.pt',
  pronunciationGuide: process.env.NEXT_PUBLIC_CAMOES_PRONUNCIATION_URL || 'https://instituto-camoes.pt/pronunciation-guide',
  businessToolkit: process.env.NEXT_PUBLIC_CAMOES_BUSINESS_URL || 'https://instituto-camoes.pt/business-toolkit',
  culturalCalendar: process.env.NEXT_PUBLIC_CAMOES_CALENDAR_URL || 'https://instituto-camoes.pt/cultural-calendar',
  citizenshipGuide: process.env.NEXT_PUBLIC_CAMOES_CITIZENSHIP_URL || 'https://instituto-camoes.pt/citizenship-guide'
} as const;

// University Partnership URLs
export const UNIVERSITY_URLS = {
  ucl: process.env.NEXT_PUBLIC_UCL_URL || 'https://www.ucl.ac.uk',
  kcl: process.env.NEXT_PUBLIC_KCL_URL || 'https://www.kcl.ac.uk',
  oxford: process.env.NEXT_PUBLIC_OXFORD_URL || 'https://www.ox.ac.uk',
  cambridge: process.env.NEXT_PUBLIC_CAMBRIDGE_URL || 'https://www.cam.ac.uk',
  lse: process.env.NEXT_PUBLIC_LSE_URL || 'https://www.lse.ac.uk',
  imperial: process.env.NEXT_PUBLIC_IMPERIAL_URL || 'https://www.imperial.ac.uk',
  manchester: process.env.NEXT_PUBLIC_MANCHESTER_URL || 'https://www.manchester.ac.uk',
  edinburgh: process.env.NEXT_PUBLIC_EDINBURGH_URL || 'https://www.ed.ac.uk',
  qmul: process.env.NEXT_PUBLIC_QMUL_URL || 'https://qmul.ac.uk/international-students',
  greenwich: process.env.NEXT_PUBLIC_GREENWICH_URL || 'https://gre.ac.uk/international',
  westminster: process.env.NEXT_PUBLIC_WESTMINSTER_URL || 'https://westminster.ac.uk/international',
  roehampton: process.env.NEXT_PUBLIC_ROEHAMPTON_URL || 'https://roehampton.ac.uk/international'
} as const;

// External Service URLs
export const EXTERNAL_SERVICES = {
  stripe: process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL || 'https://checkout.stripe.com',
  supabase: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co',
  maps: process.env.NEXT_PUBLIC_MAPS_BASE_URL || 'https://www.openstreetmap.org',
  directions: process.env.NEXT_PUBLIC_DIRECTIONS_URL || 'https://www.google.com/maps/dir',
  translate: process.env.NEXT_PUBLIC_TRANSLATE_URL || 'https://translate.google.com',
  calendar: process.env.NEXT_PUBLIC_CALENDAR_URL || 'https://calendar.google.com/calendar/render',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_API_URL || 'https://wa.me',
  sendgrid: process.env.NEXT_PUBLIC_SENDGRID_API_URL || 'https://api.sendgrid.com/v3/mail/send',
  resend: process.env.NEXT_PUBLIC_RESEND_API_URL || 'https://api.resend.com/emails',
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_API_URL || 'https://www.googleapis.com/youtube/v3',
  youtubeAnalytics: process.env.NEXT_PUBLIC_YOUTUBE_ANALYTICS_URL || 'https://youtubeanalytics.googleapis.com/v2/reports',
  obsHelp: process.env.NEXT_PUBLIC_OBS_HELP_URL || 'https://obsproject.com/help'
} as const;

// Streaming and Media URLs
export const STREAMING_URLS = {
  server: process.env.NEXT_PUBLIC_STREAMING_SERVER_URL || (process.env.NODE_ENV === 'production' ? 'https://stream.lusotown.com' : 'http://localhost:8080'),
  rtmp: process.env.NEXT_PUBLIC_RTMP_SERVER_URL || (process.env.NODE_ENV === 'production' ? 'rtmp://stream.lusotown.com:1935' : 'rtmp://localhost:1935'),
  hls: process.env.NEXT_PUBLIC_HLS_SERVER_URL || (process.env.NODE_ENV === 'production' ? 'https://stream.lusotown.com/live' : 'http://localhost:8080/live'),
  webrtc: process.env.NEXT_PUBLIC_WEBRTC_SERVER_URL || (process.env.NODE_ENV === 'production' ? 'wss://webrtc.lusotown.com' : 'ws://localhost:8080/webrtc'),
  socket: process.env.NEXT_PUBLIC_SOCKET_URL || (process.env.NODE_ENV === 'production' ? 'wss://chat.lusotown.com' : 'http://localhost:3002'),
  api: process.env.NEXT_PUBLIC_STREAMING_API_URL || (process.env.NODE_ENV === 'production' ? 'https://api.lusotown.com' : 'http://localhost:3002'),
  creatorApi: process.env.NEXT_PUBLIC_CREATOR_API_URL || (process.env.NODE_ENV === 'production' ? 'https://creator-api.lusotown.com/api/creators' : 'http://localhost:8080/api/creators'),
  creatorAuth: process.env.NEXT_PUBLIC_CREATOR_AUTH_URL || (process.env.NODE_ENV === 'production' ? 'https://creator-auth.lusotown.com/auth/creators' : 'http://localhost:8080/auth/creators'),
  analytics: process.env.NEXT_PUBLIC_CREATOR_ANALYTICS_URL || (process.env.NODE_ENV === 'production' ? 'https://analytics.lusotown.com/api/analytics' : 'http://localhost:8080/api/analytics')
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
export const buildUnsplashUrl = (imageId: string, width?: number, height?: number, options?: {
  fit?: 'crop' | 'fill' | 'max';
  crop?: 'center' | 'face' | 'entropy';
  auto?: 'format' | 'compress';
}): string => {
  const baseUrl = `${CDN_PROVIDERS.unsplash}/${imageId}`;
  const params = new URLSearchParams();
  
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  if (options?.fit) params.set('fit', options.fit);
  if (options?.crop) params.set('crop', options.crop);
  if (options?.auto) params.set('auto', options.auto);
  
  // Default options for better performance
  if (!params.has('fit') && (width || height)) params.set('fit', 'crop');
  if (!params.has('auto')) params.set('auto', 'format');
  
  return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
};

// Build full Unsplash photo URL with sensible defaults for Portuguese-speaking community images
export const buildPortugueseImageUrl = (photoId: string, width: number = 600, height: number = 400): string => {
  return buildUnsplashUrl(`photo-${photoId}`, width, height, {
    fit: 'crop',
    crop: 'center',
    auto: 'format'
  });
};

// Build profile/avatar image URLs
export const buildAvatarUrl = (photoId: string, size: number = 150): string => {
  return buildUnsplashUrl(`photo-${photoId}`, size, size, {
    fit: 'crop',
    crop: 'face',
    auto: 'format'
  });
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
      return `${EXTERNAL_SERVICES.whatsapp}/?text=${encodedText}%20${encodedUrl}`;
    default:
      return url;
  }
};

// Build university website URLs with optional paths
export const buildUniversityUrl = (university: keyof typeof UNIVERSITY_URLS, path?: string): string => {
  const baseUrl = UNIVERSITY_URLS[university];
  return path ? `${baseUrl}${path.startsWith('/') ? path : `/${path}`}` : baseUrl;
};

// Build Portuguese resource URLs
export const buildPortugueseResourceUrl = (resource: keyof typeof PORTUGUESE_RESOURCES, path?: string): string => {
  const baseUrl = PORTUGUESE_RESOURCES[resource];
  return path ? `${baseUrl}${path.startsWith('/') ? path : `/${path}`}` : baseUrl;
};

// Build streaming URLs for different environments
export const buildStreamingUrl = (type: 'hls' | 'webrtc' | 'rtmp', streamId?: string): string => {
  const baseUrl = STREAMING_URLS[type];
  if (streamId) {
    if (type === 'hls') return `${baseUrl}/${streamId}.m3u8`;
    if (type === 'webrtc') return `${baseUrl}/${streamId}`;
    if (type === 'rtmp') return `${baseUrl}/live/${streamId}`;
  }
  return baseUrl;
};

// Environment-aware URL helper
export const getEnvironmentUrl = (prodUrl: string, devUrl: string): string => {
  return process.env.NODE_ENV === 'production' ? prodUrl : devUrl;
};

// Image Asset Configuration
export const IMAGES = {
  transport: {
    security: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535200/premium-security-service_dlqxkx.jpg`,
    vipBridge: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535201/vip-london-bridge_hml2nr.jpg`,
    eliteProtection: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535202/elite-protection-service_dqmxvr.jpg`,
    bigBen: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535203/big-ben-westminster_zlkd5m.jpg`,
    buckinghamPalace: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535204/buckingham-palace_xnr8wp.jpg`,
    theShard: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535205/the-shard-london_kqe9xr.jpg`,
    coventGarden: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535206/covent-garden_dxh3qm.jpg`,
    towerBridge: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535207/tower-bridge-sunset_kml8pr.jpg`,
    towerOfLondon: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535207/tower-of-london_kmlr5p.jpg`,
    stPauls: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535208/st-pauls-cathedral_r9nxhw.jpg`,
    londonCollage: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535209/london-attractions-collage_dxh4mn.jpg`,
    executive: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535200/executive-transport-london_dlqxkx.jpg`,
    closeProtection: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535200/close-protection-london_dlqxkx.jpg`
  },
  streaming: {
    creatorStarter: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535200/creator-starter-setup_dlqxkx.jpg`,
    professionalStudio: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535201/professional-creator-studio_hml2nr.jpg`,
    enterpriseSetup: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535202/enterprise-streaming-setup_abc123.jpg`,
    ukStreamingBg: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535200/uk-streaming-background_dlqxkx.jpg`
  },
  testimonials: {
    businessman: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535200/portuguese-businessman-testimonial_lk9dex.jpg`,
    family: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535200/portuguese-family-testimonial_mk3pqz.jpg`,
    diplomat: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535200/portuguese-diplomat-testimonial_qw8rty.jpg`,
    entrepreneur: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535200/portuguese-entrepreneur-testimonial_zx9vbn.jpg`
  },
  backgrounds: {
    theShard: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535205/the-shard-london_kqe9xr.jpg`,
    ukStreaming: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535200/uk-streaming-background_dlqxkx.jpg`,
    universityStudents: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535201/university-students-london_q8w9xr.jpg`,
    londonSkylineHeritage: `${CDN_PROVIDERS.cloudinary}/image/upload/v1734535204/london-skyline-heritage_kqw8xr.jpg`
  }
} as const;

// Common Image URLs - Frequently used images with proper configuration
export const COMMON_IMAGES = {
  // Placeholder images for development
  placeholders: {
    avatar: buildUnsplashUrl('photo-1507003211169-0a1dd7228f2d', 150, 150, { fit: 'crop', crop: 'face', auto: 'format' }),
    event: buildUnsplashUrl('photo-1493225457124-a3eb161ffa5f', 600, 400, { fit: 'crop', auto: 'format' }),
    business: buildUnsplashUrl('photo-1574329818413-10376febd3f0', 600, 400, { fit: 'crop', auto: 'format' }),
    venue: buildUnsplashUrl('photo-1506905925346-21bda4d32df4', 600, 400, { fit: 'crop', auto: 'format' }),
    group: buildUnsplashUrl('photo-1511895426328-dc8714191300', 600, 400, { fit: 'crop', auto: 'format' })
  },
  // Portuguese cultural images
  portuguese: {
    professional: buildPortugueseImageUrl('1493225457124-a3eb161ffa5f'),
    cultural: buildPortugueseImageUrl('1574362848149-11496d93a7c7'),
    community: buildPortugueseImageUrl('1533929736458-ca588d08c8be'),
    events: buildPortugueseImageUrl('1578662996442-48f60103fc96'),
    business: buildPortugueseImageUrl('1544735716-392fe2489ffa')
  },
  // Background images for sections
  backgrounds: {
    hero: buildUnsplashUrl('photo-1522869635100-9f4c5e86aa37', 1200, 600, { fit: 'crop', crop: 'center', auto: 'format' }),
    streaming: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23058B49\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
  }
} as const;

// Development vs Production URL Configuration
export const URL_CONFIG = {
  development: {
    streaming: {
      server: 'http://localhost:8080',
      rtmp: 'rtmp://localhost:1935',
      hls: 'http://localhost:8080/live',
      webrtc: 'ws://localhost:8080/webrtc',
      socket: 'http://localhost:3002'
    },
    app: {
      base: 'http://localhost:3000',
      api: 'http://localhost:3000/api'
    }
  },
  production: {
    streaming: {
      server: 'https://stream.lusotown.com',
      rtmp: 'rtmp://stream.lusotown.com:1935',
      hls: 'https://stream.lusotown.com/live',
      webrtc: 'wss://webrtc.lusotown.com',
      socket: 'wss://chat.lusotown.com'
    },
    app: {
      base: 'https://lusotown.com',
      api: 'https://api.lusotown.com'
    }
  }
} as const;

// Type definitions
export type CDNProvider = keyof typeof CDN_PROVIDERS;
export type SocialPlatform = keyof typeof SOCIAL_URLS;
export type UniversityPartner = keyof typeof UNIVERSITY_URLS;
export type ExternalService = keyof typeof EXTERNAL_SERVICES;
export type PortugueseResource = keyof typeof PORTUGUESE_RESOURCES;
export type StreamingUrlType = keyof typeof STREAMING_URLS;