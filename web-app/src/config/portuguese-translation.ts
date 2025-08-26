/**
 * Portuguese Translation Configuration
 * 
 * Configuration for Portuguese-English translation system
 * Supporting all Lusophone countries and dialects
 */

export interface TranslationConfig {
  sourceLanguage: string;
  targetLanguage: string;
  dialect: string;
  confidence: number;
  preserveCulturalContext: boolean;
  enableFormality: boolean;
}

export interface TranslationProvider {
  name: string;
  apiKey: string;
  endpoint: string;
  supportsDialects: string[];
  confidenceThreshold: number;
  costPerCharacter: number;
}

export interface CulturalTranslationContext {
  country: string;
  culturalMarkers: string[];
  idioms: Record<string, string>;
  formalityLevels: string[];
  contextualPhrases: Record<string, string>;
}

// Portuguese Dialect Configuration
export const PORTUGUESE_DIALECTS = {
  'pt-PT': {
    name: { en: 'European Portuguese', pt: 'Português Europeu' },
    country: 'Portugal',
    flag: '🇵🇹',
    culturalContext: 'formal',
    commonPhrases: {
      'you': 'tu/você',
      'bathroom': 'casa de banho',
      'mobile': 'telemóvel',
      'cool': 'fixe',
      'okay': 'está bem'
    }
  },
  'pt-BR': {
    name: { en: 'Brazilian Portuguese', pt: 'Português Brasileiro' },
    country: 'Brazil',
    flag: '🇧🇷',
    culturalContext: 'casual',
    commonPhrases: {
      'you': 'você',
      'bathroom': 'banheiro',
      'mobile': 'celular',
      'cool': 'legal',
      'okay': 'tá bom'
    }
  },
  'pt-CV': {
    name: { en: 'Cape Verdean', pt: 'Cabo-verdiano' },
    country: 'Cape Verde',
    flag: '🇨🇻',
    culturalContext: 'mixed',
    commonPhrases: {
      'hello': 'Oi/Olá',
      'thanks': 'Brigado/Obrigado',
      'goodbye': 'Tchau',
      'how are you': 'Modi ku bu stá?'
    }
  },
  'pt-AO': {
    name: { en: 'Angolan Portuguese', pt: 'Português Angolano' },
    country: 'Angola',
    flag: '🇦🇴',
    culturalContext: 'formal',
    commonPhrases: {
      'friend': 'mano/irmão',
      'money': 'massa',
      'cool': 'fixes',
      'work': 'serviço'
    }
  },
  'pt-MZ': {
    name: { en: 'Mozambican Portuguese', pt: 'Português Moçambicano' },
    country: 'Mozambique',
    flag: '🇲🇿',
    culturalContext: 'formal',
    commonPhrases: {
      'hello': 'Salibonani/Olá',
      'friend': 'amigo',
      'good': 'bom',
      'house': 'casa'
    }
  }
};

// Translation Providers Configuration
export const TRANSLATION_PROVIDERS: Record<string, TranslationProvider> = {
  google: {
    name: 'Google Translate',
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY || '',
    endpoint: 'https://translation.googleapis.com/language/translate/v2',
    supportsDialects: ['pt-PT', 'pt-BR'],
    confidenceThreshold: 0.85,
    costPerCharacter: 0.00002
  },
  azure: {
    name: 'Azure Translator',
    apiKey: process.env.NEXT_PUBLIC_AZURE_TRANSLATOR_KEY || '',
    endpoint: 'https://api.cognitive.microsofttranslator.com/translate',
    supportsDialects: ['pt-PT', 'pt-BR', 'pt'],
    confidenceThreshold: 0.9,
    costPerCharacter: 0.00001
  },
  deepl: {
    name: 'DeepL',
    apiKey: process.env.NEXT_PUBLIC_DEEPL_API_KEY || '',
    endpoint: 'https://api-free.deepl.com/v2/translate',
    supportsDialects: ['pt-PT', 'pt-BR'],
    confidenceThreshold: 0.95,
    costPerCharacter: 0.00005
  }
};

// Cultural Translation Context
export const CULTURAL_CONTEXTS: Record<string, CulturalTranslationContext> = {
  portugal: {
    country: 'Portugal',
    culturalMarkers: ['saudade', 'fado', 'pastel de nata', 'azulejo'],
    idioms: {
      'Está tudo bem': 'Everything is fine',
      'Que saudades': 'I miss you/this so much',
      'Desenrasca': 'Making do with what you have',
      'Ter lata': 'To be cheeky/bold'
    },
    formalityLevels: ['muito formal', 'formal', 'informal', 'íntimo'],
    contextualPhrases: {
      'greeting_formal': 'Bom dia, como está?',
      'greeting_casual': 'Olá, tudo bem?',
      'farewell_formal': 'Até à próxima',
      'farewell_casual': 'Tchau!'
    }
  },
  brazil: {
    country: 'Brazil',
    culturalMarkers: ['samba', 'caipirinha', 'carnaval', 'futebol'],
    idioms: {
      'Tá ligado': 'You know what I mean',
      'Que legal': 'How cool',
      'Jeitinho brasileiro': 'Brazilian way of getting things done',
      'Saudade': 'Deep longing/missing'
    },
    formalityLevels: ['muito formal', 'formal', 'descontraído', 'íntimo'],
    contextualPhrases: {
      'greeting_formal': 'Bom dia, como vai?',
      'greeting_casual': 'Oi, beleza?',
      'farewell_formal': 'Até logo',
      'farewell_casual': 'Falou!'
    }
  },
  capeverde: {
    country: 'Cape Verde',
    culturalMarkers: ['morna', 'cachupa', 'sodade', 'batuko'],
    idioms: {
      'Sodade': 'Deep homesickness/longing',
      'Morabeza': 'Cape Verdean hospitality',
      'Kriolu': 'Cape Verdean Creole',
      'Nha terra': 'My homeland'
    },
    formalityLevels: ['formal', 'casual', 'familiar'],
    contextualPhrases: {
      'greeting_formal': 'Bom dia',
      'greeting_casual': 'Oi, tudo dreto?',
      'farewell_formal': 'Até logo',
      'farewell_casual': 'Tchau!'
    }
  }
};

// Translation Quality Indicators
export const TRANSLATION_QUALITY = {
  excellent: {
    threshold: 0.95,
    color: '#22c55e',
    icon: '✅',
    label: { en: 'Excellent', pt: 'Excelente' }
  },
  good: {
    threshold: 0.85,
    color: '#3b82f6',
    icon: '✓',
    label: { en: 'Good', pt: 'Boa' }
  },
  fair: {
    threshold: 0.75,
    color: '#f59e0b',
    icon: '⚠️',
    label: { en: 'Fair', pt: 'Razoável' }
  },
  poor: {
    threshold: 0.6,
    color: '#ef4444',
    icon: '❌',
    label: { en: 'Poor', pt: 'Fraca' }
  }
};

// Portuguese Cultural Expressions
export const PORTUGUESE_EXPRESSIONS = {
  greetings: {
    formal: {
      pt: ['Bom dia', 'Boa tarde', 'Boa noite', 'Como está?'],
      en: ['Good morning', 'Good afternoon', 'Good evening', 'How are you?']
    },
    casual: {
      pt: ['Olá', 'Oi', 'Tudo bem?', 'Como vai?'],
      en: ['Hello', 'Hi', 'How are things?', 'How\'s it going?']
    }
  },
  farewells: {
    formal: {
      pt: ['Adeus', 'Até à próxima', 'Tenha um bom dia'],
      en: ['Goodbye', 'Until next time', 'Have a good day']
    },
    casual: {
      pt: ['Tchau', 'Até logo', 'Falamos depois'],
      en: ['Bye', 'See you later', 'We\'ll talk later']
    }
  },
  courtesy: {
    pt: ['Por favor', 'Obrigado/a', 'De nada', 'Com licença', 'Desculpe'],
    en: ['Please', 'Thank you', 'You\'re welcome', 'Excuse me', 'Sorry']
  }
};

// Translation Features Configuration
export const TRANSLATION_FEATURES = {
  realTime: {
    enabled: true,
    debounceMs: 500,
    maxCharacters: 5000,
    cacheResults: true
  },
  voiceTranslation: {
    enabled: true,
    supportedDialects: ['pt-PT', 'pt-BR', 'pt-CV'],
    synthesizeTranslation: true
  },
  contextualTranslation: {
    enabled: true,
    preserveCulturalReferences: true,
    explainIdioms: true,
    showAlternatives: true
  },
  batchTranslation: {
    enabled: true,
    maxBatchSize: 100,
    priorityQueue: true
  }
};

// Portuguese Idiom Dictionary
export const PORTUGUESE_IDIOMS = {
  'pt-PT': {
    'Água mole em pedra dura tanto bate até que fura': 'Persistence pays off',
    'Quem não arrisca não petisca': 'Nothing ventured, nothing gained',
    'Em casa de ferreiro, espeto de pau': 'The cobbler\'s children have no shoes',
    'Quem semeia ventos colhe tempestades': 'You reap what you sow'
  },
  'pt-BR': {
    'Casa de ferreiro, espeto de pau': 'The cobbler\'s children have no shoes',
    'Quem tem boca vai a Roma': 'Ask and you shall find the way',
    'Água mole em pedra dura tanto bate até que fura': 'Persistence pays off',
    'O seguro morreu de velho': 'Better safe than sorry'
  }
};

// Translation UI Configuration
export const TRANSLATION_UI = {
  showOriginalText: true,
  showTranslationConfidence: true,
  enableToggle: true,
  showDialectIndicator: true,
  animations: {
    fadeIn: 200,
    slideUp: 300,
    highlight: 500
  },
  colors: {
    original: '#8B5A3C', // Portuguese heritage brown
    translated: '#2563eb', // Blue for clarity
    confidence: {
      high: '#22c55e',
      medium: '#f59e0b',
      low: '#ef4444'
    }
  }
};

// Translation Moderation
export const TRANSLATION_MODERATION = {
  enableContentFiltering: true,
  flagInapproprateContent: true,
  preserveRespectfulTone: true,
  culturalSensitivityCheck: true,
  moderationTimeout: 200 // ms
};

// Helper Functions
export const getDialectInfo = (dialectCode: string) => {
  return PORTUGUESE_DIALECTS[dialectCode] || PORTUGUESE_DIALECTS['pt-PT'];
};

export const getBestTranslationProvider = (dialectCode: string): TranslationProvider => {
  // DeepL for European and Brazilian Portuguese
  if (['pt-PT', 'pt-BR'].includes(dialectCode)) {
    return TRANSLATION_PROVIDERS.deepl;
  }
  
  // Google Translate for other dialects
  return TRANSLATION_PROVIDERS.google;
};

export const getTranslationQuality = (confidence: number) => {
  if (confidence >= TRANSLATION_QUALITY.excellent.threshold) return TRANSLATION_QUALITY.excellent;
  if (confidence >= TRANSLATION_QUALITY.good.threshold) return TRANSLATION_QUALITY.good;
  if (confidence >= TRANSLATION_QUALITY.fair.threshold) return TRANSLATION_QUALITY.fair;
  return TRANSLATION_QUALITY.poor;
};

export const getCulturalContext = (country: string): CulturalTranslationContext => {
  return CULTURAL_CONTEXTS[country.toLowerCase()] || CULTURAL_CONTEXTS.portugal;
};

export const isPortugueseIdiom = (text: string, dialect: string): boolean => {
  const idioms = PORTUGUESE_IDIOMS[dialect as keyof typeof PORTUGUESE_IDIOMS] || {};
  return Object.keys(idioms).some(idiom => text.includes(idiom));
};

export const translateIdiom = (text: string, dialect: string): string | null => {
  const idioms = PORTUGUESE_IDIOMS[dialect as keyof typeof PORTUGUESE_IDIOMS] || {};
  const found = Object.keys(idioms).find(idiom => text.includes(idiom));
  return found ? idioms[found] : null;
};

export const formatTranslationResult = (
  originalText: string,
  translatedText: string,
  confidence: number,
  dialect: string
) => {
  const quality = getTranslationQuality(confidence);
  const dialectInfo = getDialectInfo(dialect);
  
  return {
    original: originalText,
    translated: translatedText,
    confidence,
    quality: quality.label,
    dialect: dialectInfo.name,
    flag: dialectInfo.flag
  };
};