/**
 * Voice Messaging Configuration
 * 
 * Configuration for Portuguese-speaking community voice messaging system
 * Including speech-to-text, voice recording, and audio optimization
 */

export interface VoiceRecordingConfig {
  maxDuration: number; // seconds
  sampleRate: number;
  channelCount: number;
  mimeType: string;
  bitRate: number;
  fileFormat: string;
}

export interface SpeechToTextConfig {
  language: string;
  accent: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  confidenceThreshold: number;
}

export interface VoiceMessageUIConfig {
  waveformHeight: number;
  waveformColor: string;
  playbackSpeed: number[];
  showTranscription: boolean;
  showTranslation: boolean;
}

// Portuguese Voice Recording Settings
export const VOICE_RECORDING_CONFIG: Record<string, VoiceRecordingConfig> = {
  standard: {
    maxDuration: 60, // 1 minute for standard messages
    sampleRate: 44100,
    channelCount: 1,
    mimeType: 'audio/webm;codecs=opus',
    bitRate: 128000,
    fileFormat: 'webm'
  },
  premium: {
    maxDuration: 180, // 3 minutes for premium members
    sampleRate: 48000,
    channelCount: 2,
    mimeType: 'audio/webm;codecs=opus',
    bitRate: 256000,
    fileFormat: 'webm'
  },
  ambassador: {
    maxDuration: 300, // 5 minutes for ambassadors
    sampleRate: 48000,
    channelCount: 2,
    mimeType: 'audio/webm;codecs=opus',
    bitRate: 320000,
    fileFormat: 'webm'
  }
};

// Speech-to-Text Configuration for Portuguese Dialects
export const SPEECH_TO_TEXT_CONFIG: Record<string, SpeechToTextConfig> = {
  'pt-PT': { // Portugal Portuguese
    language: 'pt-PT',
    accent: 'portugal',
    continuous: true,
    interimResults: true,
    maxAlternatives: 3,
    confidenceThreshold: 0.8
  },
  'pt-BR': { // Brazilian Portuguese
    language: 'pt-BR',
    accent: 'brazil',
    continuous: true,
    interimResults: true,
    maxAlternatives: 3,
    confidenceThreshold: 0.8
  },
  'pt-CV': { // Cape Verdean Portuguese/Creole
    language: 'pt-PT',
    accent: 'cape-verde',
    continuous: true,
    interimResults: true,
    maxAlternatives: 5,
    confidenceThreshold: 0.7
  },
  'pt-AO': { // Angolan Portuguese
    language: 'pt-PT',
    accent: 'angola',
    continuous: true,
    interimResults: true,
    maxAlternatives: 4,
    confidenceThreshold: 0.75
  },
  'pt-MZ': { // Mozambican Portuguese
    language: 'pt-PT',
    accent: 'mozambique',
    continuous: true,
    interimResults: true,
    maxAlternatives: 4,
    confidenceThreshold: 0.75
  }
};

// Voice Message UI Configuration
export const VOICE_MESSAGE_UI: VoiceMessageUIConfig = {
  waveformHeight: 60,
  waveformColor: '#8B5A3C', // Portuguese heritage brown
  playbackSpeed: [0.5, 0.75, 1.0, 1.25, 1.5, 2.0],
  showTranscription: true,
  showTranslation: true
};

// Voice Recording Quality Levels
export const RECORDING_QUALITY = {
  low: {
    bitRate: 64000,
    sampleRate: 22050,
    label: { en: 'Low Quality', pt: 'Qualidade Baixa' }
  },
  standard: {
    bitRate: 128000,
    sampleRate: 44100,
    label: { en: 'Standard Quality', pt: 'Qualidade Padrão' }
  },
  high: {
    bitRate: 256000,
    sampleRate: 48000,
    label: { en: 'High Quality', pt: 'Alta Qualidade' }
  }
};

// Voice Message Categories
export const VOICE_MESSAGE_CATEGORIES = {
  casual: {
    icon: '💬',
    label: { en: 'Casual Message', pt: 'Mensagem Casual' },
    maxDuration: 60
  },
  cultural: {
    icon: '🇵🇹',
    label: { en: 'Cultural Expression', pt: 'Expressão Cultural' },
    maxDuration: 120
  },
  business: {
    icon: '💼',
    label: { en: 'Business Message', pt: 'Mensagem Profissional' },
    maxDuration: 180
  },
  storytelling: {
    icon: '📖',
    label: { en: 'Story/Experience', pt: 'História/Experiência' },
    maxDuration: 300
  }
};

// Portuguese Audio Enhancement Settings
export const AUDIO_ENHANCEMENT = {
  noiseReduction: {
    enabled: true,
    strength: 0.7,
    type: 'adaptive'
  },
  volumeNormalization: {
    enabled: true,
    targetLevel: -16, // dB
    threshold: -40
  },
  compressionRatio: 4,
  enableEcho: false,
  enableReverb: false
};

// File Storage Configuration
export const VOICE_STORAGE_CONFIG = {
  maxFileSize: 50 * 1024 * 1024, // 50MB
  allowedFormats: ['webm', 'mp3', 'wav', 'm4a'],
  encryptionEnabled: true,
  retentionPeriod: 365, // days
  compressionLevel: 0.8,
  cdnDistribution: true
};

// Voice Message Moderation
export const VOICE_MODERATION = {
  enableAutoTranscription: true,
  enableContentFiltering: true,
  enableLanguageDetection: true,
  moderationTimeout: 300, // seconds
  flaggedKeywords: {
    pt: ['palavrão', 'insulto', 'ameaça'],
    en: ['profanity', 'threat', 'harassment']
  },
  confidenceThreshold: 0.9
};

// Accessibility Features
export const VOICE_ACCESSIBILITY = {
  enableVisualWaveforms: true,
  enableVibrationFeedback: true,
  enableClosedCaptions: true,
  speechRate: {
    min: 0.5,
    max: 2.0,
    default: 1.0
  },
  textSize: {
    small: '14px',
    medium: '16px',
    large: '18px',
    default: 'medium'
  }
};

// Portuguese Cultural Audio Settings
export const PORTUGUESE_AUDIO_PREFERENCES = {
  preferredAccents: ['pt-PT', 'pt-BR', 'pt-CV', 'pt-AO', 'pt-MZ'],
  culturalExpressions: {
    greetings: ['Olá!', 'Bom dia!', 'Boa tarde!', 'Boa noite!'],
    farewells: ['Tchau!', 'Até logo!', 'Até breve!', 'Adeus!'],
    expressions: ['Que saudades!', 'Muito fixe!', 'Está bem!', 'Claro!']
  },
  musicIntegration: {
    enableFadoBackground: false,
    enableTraditionalSounds: false,
    volumeLevel: 0.1
  }
};

// Voice Message Analytics
export const VOICE_ANALYTICS = {
  trackDuration: true,
  trackQuality: true,
  trackAccentDetection: true,
  trackTranscriptionAccuracy: true,
  trackUserPreferences: true,
  trackCulturalContent: true
};

// API Configuration
export const VOICE_API_CONFIG = {
  speechToText: {
    provider: 'google', // 'google', 'azure', 'aws'
    apiKey: process.env.NEXT_PUBLIC_SPEECH_TO_TEXT_API_KEY,
    endpoints: {
      transcribe: '/api/voice/transcribe',
      translate: '/api/voice/translate'
    }
  },
  textToSpeech: {
    provider: 'elevenlabs',
    apiKey: process.env.NEXT_PUBLIC_TEXT_TO_SPEECH_API_KEY,
    voiceId: 'portuguese-male',
    endpoints: {
      synthesize: '/api/voice/synthesize'
    }
  },
  upload: {
    endpoint: '/api/voice/upload',
    maxFileSize: VOICE_STORAGE_CONFIG.maxFileSize,
    allowedTypes: VOICE_STORAGE_CONFIG.allowedFormats
  }
};

// Helper Functions
export const getVoiceConfigForTier = (membershipTier: string): VoiceRecordingConfig => {
  switch (membershipTier) {
    case 'ambassador':
      return VOICE_RECORDING_CONFIG.ambassador;
    case 'community':
      return VOICE_RECORDING_CONFIG.premium;
    default:
      return VOICE_RECORDING_CONFIG.standard;
  }
};

export const getSpeechToTextForDialect = (dialect: string): SpeechToTextConfig => {
  return SPEECH_TO_TEXT_CONFIG[dialect] || SPEECH_TO_TEXT_CONFIG['pt-PT'];
};

export const getRecordingQualityLabel = (quality: string, language: 'en' | 'pt'): string => {
  return RECORDING_QUALITY[quality as keyof typeof RECORDING_QUALITY]?.label[language] || 'Standard';
};

export const getMaxDurationForCategory = (category: string): number => {
  return VOICE_MESSAGE_CATEGORIES[category as keyof typeof VOICE_MESSAGE_CATEGORIES]?.maxDuration || 60;
};

export const isValidVoiceFormat = (format: string): boolean => {
  return VOICE_STORAGE_CONFIG.allowedFormats.includes(format.toLowerCase());
};

export const calculateVoiceFileSize = (duration: number, quality: string): number => {
  const qualityConfig = RECORDING_QUALITY[quality as keyof typeof RECORDING_QUALITY];
  if (!qualityConfig) return 0;
  
  return (duration * qualityConfig.bitRate) / 8; // bytes
};