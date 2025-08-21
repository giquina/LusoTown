import { SOCIAL_URLS } from '@/config'
/**
 * Social Media URLs Configuration
 * 
 * Centralized social media links for LusoTown Portuguese community platform.
 * Use these constants instead of hardcoded URLs.
 */

// Official LusoTown Social Media Accounts
export const SOCIAL_URLS = {
  // Main Social Platforms
  instagram: 'https://instagram.com/lusotownlondon',
  facebook: 'https://facebook.com/lusotownlondon',
  twitter: 'https://twitter.com/lusotownlondon',
  linkedin: 'https://linkedin.com/company/lusotown',
  
  // Video & Streaming
  youtube: 'https://youtube.com/@lusotownlondon',
  tiktok: 'https://tiktok.com/@lusotownlondon',
  
  // Portuguese Community Specific
  whatsapp: 'https://chat.whatsapp.com/lusotownlondon',
  telegram: 'https://t.me/lusotownlondon',
  
  // Professional & Business
  linkedinBusiness: 'https://linkedin.com/company/lusotown-business',
  
  // Streaming Platform
  lusotownTv: 'https://tv.lusotown.com',
  streamingChannel: 'https://live.lusotown.com',
} as const;

// Portuguese Community Hashtags
export const PORTUGUESE_HASHTAGS = {
  general: [
    '#LusoTown',
    '#LusoLondon',
    '#PortugueseUK',
    '#PortuguesesemLondres',
    '#ComunidadePortuguesa'
  ],
  cultural: [
    '#Fado',
    '#SantosPopulares',
    '#CulturaPortuguesa',
    '#PatrimónioPortuguês',
    '#TradicionesPortuguesas'
  ],
  business: [
    '#NegóciosPortugueses',
    '#EmpresariosPortugueses',
    '#ComércioPortuguês',
    '#InvestimentoPortuguês'
  ],
  events: [
    '#EventosPortugueses',
    '#FestasPortuguesas',
    '#MúsicaPortuguesa',
    '#DançaPortuguesa'
  ],
  education: [
    '#EstudantesPortugueses',
    '#EducaçãoPortuguesa',
    '#UniversidadePortuguesa',
    '#AcadémicosPortugueses'
  ]
} as const;

// Social Media Integration Settings
export const SOCIAL_CONFIG = {
  // Platform specific settings
  twitter: {
    bearerToken: process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN,
    maxTweets: 10,
    refreshInterval: 300000, // 5 minutes
    hashtags: PORTUGUESE_HASHTAGS.general
  },
  
  instagram: {
    accessToken: process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN,
    maxPosts: 12,
    refreshInterval: 600000, // 10 minutes
  },
  
  facebook: {
    appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
    pageId: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID,
    maxPosts: 8,
    refreshInterval: 600000, // 10 minutes
  },
  
  youtube: {
    apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
    channelId: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID,
    maxVideos: 6,
    refreshInterval: 1800000, // 30 minutes
  }
} as const;

// Social Media Share URLs
export const getShareUrl = (platform: keyof typeof SOCIAL_URLS, text: string, url: string) => {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);
  
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
  };
  
  return shareUrls[platform as keyof typeof shareUrls] || '';
};

// Portuguese Community Social Media Helpers
export const getPortugueseHashtags = (category?: keyof typeof PORTUGUESE_HASHTAGS): string[] => {
  if (category && PORTUGUESE_HASHTAGS[category]) {
    return PORTUGUESE_HASHTAGS[category];
  }
  return PORTUGUESE_HASHTAGS.general;
};

export const formatHashtagsForPost = (hashtags: string[]): string => {
  return hashtags.join(' ');
};

// Social Media Embed Helpers
export const getEmbedUrl = (platform: string, id: string): string => {
  const embedUrls = {
    twitter: `https://twitter.com/i/status/${id}`,
    instagram: `https://www.instagram.com/p/${id}/embed`,
    facebook: `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(id)}`,
    youtube: `https://www.youtube.com/embed/${id}`,
  };
  
  return embedUrls[platform as keyof typeof embedUrls] || '';
};

// Type definitions
export type SocialPlatform = keyof typeof SOCIAL_URLS;
export type HashtagCategory = keyof typeof PORTUGUESE_HASHTAGS;
export type SocialConfigPlatform = keyof typeof SOCIAL_CONFIG;

// Validation helpers
export const isValidSocialUrl = (platform: SocialPlatform, url: string): boolean => {
  const platformDomains = {
    instagram: 'instagram.com',
    facebook: 'facebook.com',
    twitter: 'twitter.com',
    linkedin: 'linkedin.com',
    youtube: 'youtube.com',
    tiktok: 'tiktok.com',
    whatsapp: 'whatsapp.com',
    telegram: 't.me',
    linkedinBusiness: 'linkedin.com',
    lusotownTv: 'tv.lusotown.com',
    streamingChannel: 'live.lusotown.com',
  };
  
  const domain = platformDomains[platform];
  return domain ? url.includes(domain) : false;
};

export default SOCIAL_URLS;