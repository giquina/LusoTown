import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Linking,
  Share as RNShare,
  ActivityIndicator,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { PORTUGUESE_COLORS, MOBILE_UX_CONFIG } from '../../config';

/**
 * Social Media Platforms for Portuguese Community
 */
export type SocialPlatform = 'whatsapp' | 'instagram' | 'telegram' | 'facebook' | 'twitter' | 'linkedin';

/**
 * Translation Service Configuration
 */
interface TranslationConfig {
  enabled: boolean;
  sourceLanguage: 'auto' | 'pt' | 'en';
  targetLanguage: 'pt' | 'en' | 'both';
  service: 'google' | 'azure' | 'aws' | 'mock';
  apiKey?: string;
}

/**
 * Share Content Structure
 */
export interface ShareableContent {
  id: string;
  title: {
    pt: string;
    en: string;
  };
  description?: {
    pt: string;
    en: string;
  };
  url?: string;
  imageUrl?: string;
  category: 'event' | 'business' | 'cultural' | 'community';
  hashtags: string[];
  communitySpecific: {
    heritage: string;
    location?: string;
    culturalContext?: string;
  };
}

/**
 * Translation Result
 */
interface TranslationResult {
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  confidence: number;
  timestamp: number;
}

/**
 * Community Share System Hook
 */
export function useCommunityShareSystem() {
  const { t, i18n } = useTranslation();
  const [isSharing, setIsSharing] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationCache, setTranslationCache] = useState<Map<string, TranslationResult>>(new Map());
  
  const [translationConfig, setTranslationConfig] = useState<TranslationConfig>({
    enabled: true,
    sourceLanguage: 'auto',
    targetLanguage: i18n.language === 'pt' ? 'en' : 'pt',
    service: 'mock', // Using mock service for demo
  });

  /**
   * Task 4: WhatsApp, Instagram, Telegram sharing APIs integration
   */
  const shareToWhatsApp = async (content: ShareableContent, translatedContent?: ShareableContent) => {
    try {
      const language = i18n.language as 'pt' | 'en';
      const shareContent = translatedContent || content;
      
      const message = formatMessageForPlatform(shareContent, 'whatsapp', language);
      const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
      
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
        return { success: true, platform: 'whatsapp' };
      } else {
        // Fallback to web WhatsApp
        const webWhatsAppUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        await Linking.openURL(webWhatsAppUrl);
        return { success: true, platform: 'whatsapp_web' };
      }
    } catch (error) {
      console.error('Error sharing to WhatsApp:', error);
      return { success: false, error: error.message };
    }
  };

  const shareToInstagram = async (content: ShareableContent, translatedContent?: ShareableContent) => {
    try {
      const language = i18n.language as 'pt' | 'en';
      const shareContent = translatedContent || content;
      
      if (content.imageUrl) {
        // Instagram Stories sharing with image
        const instagramUrl = `instagram://camera`;
        const canOpen = await Linking.canOpenURL(instagramUrl);
        
        if (canOpen) {
          await Linking.openURL(instagramUrl);
          
          // Copy caption to clipboard for easy pasting
          const caption = formatMessageForPlatform(shareContent, 'instagram', language);
          await Clipboard.setStringAsync(caption);
          
          Alert.alert(
            t('share.instagram.title', 'Instagram Opened'),
            t('share.instagram.caption_copied', 'Caption copied to clipboard. Paste it in your Instagram post!'),
            [{ text: t('common.ok', 'OK'), style: 'default' }]
          );
          
          return { success: true, platform: 'instagram' };
        }
      }
      
      // Fallback to copying content
      const message = formatMessageForPlatform(shareContent, 'instagram', language);
      await Clipboard.setStringAsync(message);
      
      Alert.alert(
        t('share.instagram.fallback_title', 'Instagram Content Ready'),
        t('share.instagram.fallback_message', 'Content copied to clipboard. Open Instagram and paste your content!'),
        [
          {
            text: t('common.cancel', 'Cancel'),
            style: 'cancel',
          },
          {
            text: t('share.open_instagram', 'Open Instagram'),
            onPress: () => Linking.openURL('https://instagram.com'),
          },
        ]
      );
      
      return { success: true, platform: 'instagram_clipboard' };
    } catch (error) {
      console.error('Error sharing to Instagram:', error);
      return { success: false, error: error.message };
    }
  };

  const shareToTelegram = async (content: ShareableContent, translatedContent?: ShareableContent) => {
    try {
      const language = i18n.language as 'pt' | 'en';
      const shareContent = translatedContent || content;
      
      const message = formatMessageForPlatform(shareContent, 'telegram', language);
      const telegramUrl = `tg://msg?text=${encodeURIComponent(message)}`;
      
      const canOpen = await Linking.canOpenURL(telegramUrl);
      if (canOpen) {
        await Linking.openURL(telegramUrl);
        return { success: true, platform: 'telegram' };
      } else {
        // Fallback to web Telegram
        const webTelegramUrl = `https://t.me/share/url?url=${encodeURIComponent(content.url || '')}&text=${encodeURIComponent(message)}`;
        await Linking.openURL(webTelegramUrl);
        return { success: true, platform: 'telegram_web' };
      }
    } catch (error) {
      console.error('Error sharing to Telegram:', error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Task 5: Real-time Portuguese/English translation system
   */
  const translateContent = async (
    text: string, 
    targetLanguage: 'pt' | 'en' = translationConfig.targetLanguage as 'pt' | 'en',
    sourceLanguage: string = translationConfig.sourceLanguage
  ): Promise<TranslationResult> => {
    const cacheKey = `${text}_${sourceLanguage}_${targetLanguage}`;
    
    // Check cache first
    const cached = translationCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < 3600000) { // 1 hour cache
      return cached;
    }

    setIsTranslating(true);
    
    try {
      let translatedText: string;
      let detectedSourceLanguage: string = sourceLanguage;
      let confidence: number = 0.9;

      switch (translationConfig.service) {
        case 'google':
          // Google Translate API integration would go here
          translatedText = await googleTranslate(text, sourceLanguage, targetLanguage);
          break;
        case 'azure':
          // Azure Translator API integration would go here
          translatedText = await azureTranslate(text, sourceLanguage, targetLanguage);
          break;
        case 'aws':
          // AWS Translate API integration would go here
          translatedText = await awsTranslate(text, sourceLanguage, targetLanguage);
          break;
        default:
          // Mock translation for demo
          ({ translatedText, detectedSourceLanguage, confidence } = await mockTranslate(text, targetLanguage));
      }

      const result: TranslationResult = {
        originalText: text,
        translatedText,
        sourceLanguage: detectedSourceLanguage,
        targetLanguage,
        confidence,
        timestamp: Date.now(),
      };

      // Cache the result
      setTranslationCache(prev => new Map(prev.set(cacheKey, result)));

      return result;
    } catch (error) {
      console.error('Translation error:', error);
      // Return original text if translation fails
      return {
        originalText: text,
        translatedText: text,
        sourceLanguage: sourceLanguage === 'auto' ? 'unknown' : sourceLanguage,
        targetLanguage,
        confidence: 0,
        timestamp: Date.now(),
      };
    } finally {
      setIsTranslating(false);
    }
  };

  const translateShareableContent = async (content: ShareableContent): Promise<ShareableContent> => {
    const currentLang = i18n.language as 'pt' | 'en';
    const targetLang = currentLang === 'pt' ? 'en' : 'pt';

    try {
      const titleTranslation = await translateContent(content.title[currentLang], targetLang);
      const descriptionTranslation = content.description 
        ? await translateContent(content.description[currentLang], targetLang)
        : null;

      return {
        ...content,
        title: {
          ...content.title,
          [targetLang]: titleTranslation.translatedText,
        },
        description: content.description && descriptionTranslation ? {
          ...content.description,
          [targetLang]: descriptionTranslation.translatedText,
        } : content.description,
      };
    } catch (error) {
      console.error('Error translating content:', error);
      return content; // Return original content if translation fails
    }
  };

  /**
   * Task 6: Community-specific sharing workflows
   */
  const shareWithCommunityContext = async (
    content: ShareableContent, 
    platform: SocialPlatform,
    options: {
      includeTranslation?: boolean;
      includeCulturalContext?: boolean;
      includeLocationInfo?: boolean;
      customMessage?: string;
    } = {}
  ) => {
    const {
      includeTranslation = true,
      includeCulturalContext = true,
      includeLocationInfo = true,
      customMessage,
    } = options;

    setIsSharing(true);

    try {
      let finalContent = { ...content };
      let translatedContent: ShareableContent | undefined;

      // Add translation if requested
      if (includeTranslation) {
        translatedContent = await translateShareableContent(content);
      }

      // Enhance with cultural context
      if (includeCulturalContext) {
        finalContent = enhanceWithCulturalContext(finalContent);
      }

      // Add location information
      if (includeLocationInfo && content.communitySpecific.location) {
        finalContent = enhanceWithLocationInfo(finalContent);
      }

      // Add custom message
      if (customMessage) {
        finalContent = {
          ...finalContent,
          description: {
            pt: `${customMessage}\n\n${finalContent.description?.pt || ''}`,
            en: `${customMessage}\n\n${finalContent.description?.en || ''}`,
          },
        };
      }

      // Share to specific platform
      let shareResult;
      switch (platform) {
        case 'whatsapp':
          shareResult = await shareToWhatsApp(finalContent, translatedContent);
          break;
        case 'instagram':
          shareResult = await shareToInstagram(finalContent, translatedContent);
          break;
        case 'telegram':
          shareResult = await shareToTelegram(finalContent, translatedContent);
          break;
        default:
          shareResult = await shareToNativeShare(finalContent);
      }

      return {
        ...shareResult,
        translationUsed: !!translatedContent,
        platform,
      };
    } catch (error) {
      console.error('Error in community sharing:', error);
      return { success: false, error: error.message, platform };
    } finally {
      setIsSharing(false);
    }
  };

  // Helper functions for translation services
  const mockTranslate = async (text: string, targetLanguage: 'pt' | 'en') => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simple mock translation logic
    const translations: { [key: string]: string } = {
      'Hello': targetLanguage === 'pt' ? 'Olá' : 'Hello',
      'Event': targetLanguage === 'pt' ? 'Evento' : 'Event',
      'Portuguese Community': targetLanguage === 'pt' ? 'Comunidade Portuguesa' : 'Portuguese Community',
      'Join us': targetLanguage === 'pt' ? 'Junte-se a nós' : 'Join us',
      'London': targetLanguage === 'pt' ? 'Londres' : 'London',
    };

    let translatedText = text;
    Object.entries(translations).forEach(([original, translated]) => {
      translatedText = translatedText.replace(new RegExp(original, 'gi'), translated);
    });

    return {
      translatedText,
      detectedSourceLanguage: targetLanguage === 'pt' ? 'en' : 'pt',
      confidence: 0.85,
    };
  };

  const googleTranslate = async (text: string, sourceLanguage: string, targetLanguage: string): Promise<string> => {
    // Google Translate API implementation would go here
    // For now, return mock translation
    return mockTranslate(text, targetLanguage as 'pt' | 'en').then(result => result.translatedText);
  };

  const azureTranslate = async (text: string, sourceLanguage: string, targetLanguage: string): Promise<string> => {
    // Azure Translator API implementation would go here
    return mockTranslate(text, targetLanguage as 'pt' | 'en').then(result => result.translatedText);
  };

  const awsTranslate = async (text: string, sourceLanguage: string, targetLanguage: string): Promise<string> => {
    // AWS Translate API implementation would go here
    return mockTranslate(text, targetLanguage as 'pt' | 'en').then(result => result.translatedText);
  };

  // Helper functions
  const formatMessageForPlatform = (content: ShareableContent, platform: SocialPlatform, language: 'pt' | 'en'): string => {
    const title = content.title[language];
    const description = content.description?.[language] || '';
    const hashtags = content.hashtags.map(tag => `#${tag}`).join(' ');
    const url = content.url || '';

    const heritageTag = content.communitySpecific.heritage ? 
      `#${content.communitySpecific.heritage}Community` : '';
    const locationTag = content.communitySpecific.location ? 
      `#${content.communitySpecific.location.replace(/\s+/g, '')}` : '';

    const platformSpecificTags = {
      whatsapp: `#LusoTown #PortugueseCommunityUK`,
      instagram: `#LusoTown #PortugueseCommunityUK #LondonPortugueseCommunity #UKLusophone`,
      telegram: `#LusoTown #PortugueseCommunityUK`,
      facebook: `#LusoTown #PortugueseCommunityUK`,
      twitter: `#LusoTown #PortugueseCommunityUK`,
      linkedin: `#LusoTown #PortugueseCommunityUK #ProfessionalNetworking`,
    };

    const platformTags = platformSpecificTags[platform] || '';

    switch (platform) {
      case 'whatsapp':
        return `${title}\n\n${description}\n\n${url}\n\n${hashtags} ${heritageTag} ${locationTag} ${platformTags}`;
      case 'instagram':
        return `${title}\n\n${description}\n\n${hashtags} ${heritageTag} ${locationTag} ${platformTags}\n\n${url}`;
      case 'telegram':
        return `${title}\n\n${description}\n\n${url}\n\n${hashtags} ${heritageTag} ${locationTag} ${platformTags}`;
      default:
        return `${title}\n\n${description}\n\n${url}`;
    }
  };

  const enhanceWithCulturalContext = (content: ShareableContent): ShareableContent => {
    const culturalContext = content.communitySpecific.culturalContext;
    if (!culturalContext) return content;

    const culturalMessages = {
      pt: `🇵🇹 Experiência cultural autêntica da comunidade ${content.communitySpecific.heritage} no Reino Unido`,
      en: `🇵🇹 Authentic ${content.communitySpecific.heritage} cultural experience in the UK`,
    };

    return {
      ...content,
      description: {
        pt: `${culturalMessages.pt}\n\n${content.description?.pt || ''}`,
        en: `${culturalMessages.en}\n\n${content.description?.en || ''}`,
      },
    };
  };

  const enhanceWithLocationInfo = (content: ShareableContent): ShareableContent => {
    const location = content.communitySpecific.location;
    if (!location) return content;

    const locationMessages = {
      pt: `📍 Localização: ${location}`,
      en: `📍 Location: ${location}`,
    };

    return {
      ...content,
      description: {
        pt: `${content.description?.pt || ''}\n\n${locationMessages.pt}`,
        en: `${content.description?.en || ''}\n\n${locationMessages.en}`,
      },
    };
  };

  const shareToNativeShare = async (content: ShareableContent) => {
    try {
      const language = i18n.language as 'pt' | 'en';
      const message = formatMessageForPlatform(content, 'whatsapp', language); // Generic format
      
      const result = await RNShare.share({
        message,
        url: content.url,
        title: content.title[language],
      });

      return {
        success: result.action !== RNShare.dismissedAction,
        platform: 'native_share',
        action: result.action,
      };
    } catch (error) {
      console.error('Error with native share:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    // Sharing functions
    shareToWhatsApp,
    shareToInstagram,
    shareToTelegram,
    shareWithCommunityContext,
    shareToNativeShare,
    
    // Translation functions
    translateContent,
    translateShareableContent,
    
    // State
    isSharing,
    isTranslating,
    translationConfig,
    setTranslationConfig,
    
    // Cache management
    translationCache,
    clearTranslationCache: () => setTranslationCache(new Map()),
  };
}

/**
 * Community Share Button Component
 */
interface CommunityShareButtonProps {
  content: ShareableContent;
  platform: SocialPlatform;
  style?: any;
  onShareComplete?: (result: any) => void;
  includeTranslation?: boolean;
  customLabel?: string;
}

export function CommunityShareButton({
  content,
  platform,
  style,
  onShareComplete,
  includeTranslation = true,
  customLabel,
}: CommunityShareButtonProps) {
  const { t } = useTranslation();
  const { shareWithCommunityContext, isSharing } = useCommunityShareSystem();

  const platformConfig = {
    whatsapp: { icon: 'logo-whatsapp', color: '#25D366', label: 'WhatsApp' },
    instagram: { icon: 'logo-instagram', color: '#E4405F', label: 'Instagram' },
    telegram: { icon: 'send', color: '#0088cc', label: 'Telegram' },
    facebook: { icon: 'logo-facebook', color: '#1877F2', label: 'Facebook' },
    twitter: { icon: 'logo-twitter', color: '#1DA1F2', label: 'Twitter' },
    linkedin: { icon: 'logo-linkedin', color: '#0077B5', label: 'LinkedIn' },
  };

  const config = platformConfig[platform];
  
  const handleShare = async () => {
    try {
      const result = await shareWithCommunityContext(content, platform, {
        includeTranslation,
        includeCulturalContext: true,
        includeLocationInfo: true,
      });
      
      onShareComplete?.(result);
      
      if (result.success) {
        Alert.alert(
          t('share.success.title', 'Shared Successfully'),
          t('share.success.message', `Content shared to ${config.label} successfully!`),
          [{ text: t('common.ok', 'OK'), style: 'default' }]
        );
      }
    } catch (error) {
      Alert.alert(
        t('share.error.title', 'Share Failed'),
        t('share.error.message', 'Failed to share content. Please try again.'),
        [{ text: t('common.ok', 'OK'), style: 'default' }]
      );
    }
  };

  return (
    <TouchableOpacity
      style={[styles.shareButton, { backgroundColor: config.color }, style]}
      onPress={handleShare}
      disabled={isSharing}
      accessibilityLabel={customLabel || t('share.button.label', `Share to ${config.label}`)}
      accessibilityRole="button"
    >
      {isSharing ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <Ionicons name={config.icon as any} size={20} color="white" />
      )}
      <Text style={styles.shareButtonText}>
        {customLabel || config.label}
      </Text>
    </TouchableOpacity>
  );
}

/**
 * Community Share Panel Component
 */
interface CommunitySharePanelProps {
  content: ShareableContent;
  visible: boolean;
  onClose: () => void;
  platforms?: SocialPlatform[];
  includeTranslation?: boolean;
}

export function CommunitySharePanel({
  content,
  visible,
  onClose,
  platforms = ['whatsapp', 'instagram', 'telegram'],
  includeTranslation = true,
}: CommunitySharePanelProps) {
  const { t } = useTranslation();
  
  if (!visible) return null;

  return (
    <View style={styles.sharePanel}>
      <View style={styles.sharePanelHeader}>
        <Text style={styles.sharePanelTitle}>
          {t('share.panel.title', 'Share with Portuguese Community')}
        </Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color={PORTUGUESE_COLORS.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.shareButtonsContainer}>
        {platforms.map(platform => (
          <CommunityShareButton
            key={platform}
            content={content}
            platform={platform}
            includeTranslation={includeTranslation}
            onShareComplete={onClose}
            style={styles.shareButtonInPanel}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: MOBILE_UX_CONFIG.premiumSpacing,
    paddingVertical: MOBILE_UX_CONFIG.comfortableSpacing,
    borderRadius: 8,
    minHeight: MOBILE_UX_CONFIG.minTouchTarget,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  sharePanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: PORTUGUESE_COLORS.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: MOBILE_UX_CONFIG.premiumSpacing,
    elevation: 10,
    shadowColor: PORTUGUESE_COLORS.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  sharePanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: MOBILE_UX_CONFIG.premiumSpacing,
  },
  sharePanelTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: PORTUGUESE_COLORS.text,
  },
  shareButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  shareButtonInPanel: {
    width: '48%',
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
  },
});

export default {
  useCommunityShareSystem,
  CommunityShareButton,
  CommunitySharePanel,
};