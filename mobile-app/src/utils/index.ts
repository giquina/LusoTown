// 🇵🇹 LusoTown Mobile Utilities - Portuguese Cultural Functions
import { Language, HeritageCountry } from '../types';

/**
 * Format date for Portuguese cultural contexts
 */
export const formatPortugueseDate = (
  dateString: string,
  language: Language = 'en'
): string => {
  const date = new Date(dateString);
  const locale = language === 'pt' ? 'pt-PT' : 'en-GB';
  
  return date.toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format Portuguese currency (Euros/Pounds)
 */
export const formatPortugueseCurrency = (
  amount: number,
  currency: 'EUR' | 'GBP' = 'GBP',
  language: Language = 'en'
): string => {
  const locale = language === 'pt' ? 'pt-PT' : 'en-GB';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Get cultural greeting based on heritage and time
 */
export const getCulturalGreeting = (
  heritage: HeritageCountry[],
  language: Language = 'en',
  hour: number = new Date().getHours()
): string => {
  const greetings = {
    en: {
      morning: 'Good morning',
      afternoon: 'Good afternoon', 
      evening: 'Good evening',
    },
    pt: {
      morning: 'Bom dia',
      afternoon: 'Boa tarde',
      evening: 'Boa noite',
    },
  };

  // Special Brazilian greetings
  if (heritage.includes('brazil') && language === 'pt') {
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  // Cape Verdean Creole influences
  if (heritage.includes('cape-verde') && language === 'pt') {
    if (hour < 12) return 'Bon dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noti';
  }

  // Default Portuguese greetings
  const timeOfDay = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
  return greetings[language][timeOfDay];
};

/**
 * Validate Portuguese phone numbers (UK/PT/BR formats)
 */
export const validatePortuguesePhone = (phone: string): boolean => {
  // UK format: +44 20 1234 5678 or 07123 456789
  const ukPattern = /^(\+44\s?|0)(20\s?\d{4}\s?\d{4}|[1-9]\d{8,9})$/;
  
  // Portugal format: +351 21 123 4567 or 21 123 4567
  const ptPattern = /^(\+351\s?)?[2-9]\d{8}$/;
  
  // Brazil format: +55 11 99999-9999
  const brPattern = /^(\+55\s?)?[1-9]{2}\s?9?\d{8}$/;
  
  const cleanPhone = phone.replace(/\s+/g, '');
  
  return ukPattern.test(cleanPhone) || 
         ptPattern.test(cleanPhone) || 
         brPattern.test(cleanPhone);
};

/**
 * Get heritage flag emoji
 */
export const getHeritageFlag = (heritage: HeritageCountry): string => {
  const flags: Record<HeritageCountry, string> = {
    portugal: '🇵🇹',
    brazil: '🇧🇷',
    'cape-verde': '🇨🇻',
    angola: '🇦🇴',
    mozambique: '🇲🇿',
    'guinea-bissau': '🇬🇼',
    'east-timor': '🇹🇱',
    'sao-tome': '🇸🇹',
  };
  
  return flags[heritage] || '🇵🇹';
};

/**
 * Calculate Portuguese cultural compatibility score
 */
export const calculateCulturalCompatibility = (
  user1Heritage: HeritageCountry[],
  user2Heritage: HeritageCountry[],
  user1Interests: string[],
  user2Interests: string[]
): number => {
  // Heritage match score (40% weight)
  const heritageOverlap = user1Heritage.filter(h => user2Heritage.includes(h));
  const heritageScore = (heritageOverlap.length / Math.max(user1Heritage.length, user2Heritage.length)) * 40;

  // Interest match score (40% weight)  
  const interestOverlap = user1Interests.filter(i => user2Interests.includes(i));
  const interestScore = (interestOverlap.length / Math.max(user1Interests.length, user2Interests.length)) * 40;

  // Portuguese language bonus (20% weight)
  const languageBonus = 20;

  return Math.min(100, Math.round(heritageScore + interestScore + languageBonus));
};

/**
 * Format Portuguese names properly
 */
export const formatPortugueseName = (firstName: string, lastName: string): string => {
  const capitalizePortuguese = (name: string): string => {
    // Portuguese particles that should be lowercase
    const particles = ['da', 'de', 'do', 'das', 'dos', 'e', 'del', 'van', 'von'];
    
    return name
      .toLowerCase()
      .split(' ')
      .map((word, index) => {
        // Always capitalize first word
        if (index === 0 || !particles.includes(word)) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      })
      .join(' ');
  };

  return `${capitalizePortuguese(firstName)} ${capitalizePortuguese(lastName)}`;
};

/**
 * Distance formatting for Portuguese speakers
 */
export const formatDistance = (
  distanceKm: number,
  language: Language = 'en'
): string => {
  if (distanceKm < 1) {
    const meters = Math.round(distanceKm * 1000);
    return language === 'pt' ? `${meters}m` : `${meters}m`;
  }
  
  if (distanceKm < 10) {
    return language === 'pt' ? `${distanceKm.toFixed(1)}km` : `${distanceKm.toFixed(1)}km`;
  }
  
  return language === 'pt' ? `${Math.round(distanceKm)}km` : `${Math.round(distanceKm)}km`;
};

/**
 * Time ago formatting for Portuguese context
 */
export const formatTimeAgo = (
  dateString: string,
  language: Language = 'en'
): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  
  if (language === 'pt') {
    if (minutes < 1) return 'agora';
    if (minutes < 60) return `${minutes}min`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    if (weeks < 4) return `${weeks}sem`;
    return `${months}mês`;
  } else {
    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    if (weeks < 4) return `${weeks}w`;
    return `${months}mo`;
  }
};

/**
 * Generate Portuguese cultural username suggestions
 */
export const generatePortugueseUsername = (
  firstName: string,
  heritage: HeritageCountry[]
): string[] => {
  const base = firstName.toLowerCase();
  const year = new Date().getFullYear().toString().slice(-2);
  
  const culturalSuffixes = {
    portugal: ['pt', 'luso', 'porto', 'lisboa'],
    brazil: ['br', 'rio', 'sp', 'brasil'], 
    'cape-verde': ['cv', 'cabo', 'ilha'],
    angola: ['ao', 'luanda', 'angola'],
    mozambique: ['mz', 'maputo', 'moçambique'],
  };
  
  const suggestions: string[] = [
    `${base}${year}`,
    `${base}_uk`,
    `${base}_london`,
  ];
  
  heritage.forEach(h => {
    const suffixes = culturalSuffixes[h as keyof typeof culturalSuffixes] || [];
    suffixes.forEach(suffix => {
      suggestions.push(`${base}_${suffix}`);
      suggestions.push(`${base}${suffix}${year}`);
    });
  });
  
  return suggestions.slice(0, 8); // Return top 8 suggestions
};

export default {
  formatPortugueseDate,
  formatPortugueseCurrency,
  getCulturalGreeting,
  validatePortuguesePhone,
  getHeritageFlag,
  calculateCulturalCompatibility,
  formatPortugueseName,
  formatDistance,
  formatTimeAgo,
  generatePortugueseUsername,
};