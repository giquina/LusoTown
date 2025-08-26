import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

// Import configurations following LusoTown's zero hardcoding policy
import { MOBILE_CONFIG, PORTUGUESE_COLORS, SUBSCRIPTION_PLANS, CONTACT_INFO } from '@/config';
import { Colors, Spacing, Typography, CommonStyles } from '@/constants/Styles';

/**
 * Demo Screen - Showcasing LusoTown Mobile Setup
 * Tests Portuguese cultural integration, configuration system, and mobile UX
 */
export default function DemoScreen() {
  const { t, i18n } = useTranslation();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  // Test configuration loading
  const demoFeatures = [
    {
      id: 'config',
      icon: 'settings-outline',
      title: 'Configuration System',
      description: 'Zero hardcoding policy compliance',
      color: PORTUGUESE_COLORS.primary,
      data: {
        'Community Members': MOBILE_CONFIG.community.totalMembers,
        'University Partnerships': MOBILE_CONFIG.community.universityPartnerships,
        'Supported Languages': MOBILE_CONFIG.culture.supportedLanguages.join(', '),
        'API Base URL': MOBILE_CONFIG.api.baseUrl,
      }
    },
    {
      id: 'cultural',
      icon: 'flag-outline',
      title: 'Portuguese Heritage',
      description: 'Cultural authenticity features',
      color: PORTUGUESE_COLORS.green,
      data: {
        'Heritage Code': MOBILE_CONFIG.culture.heritageCode,
        'Lusophone Nations': MOBILE_CONFIG.culture.lusophoneNations.join(', '),
        'Cultural Features': MOBILE_CONFIG.culture.enableCulturalFeatures ? 'Enabled' : 'Disabled',
        'Primary Color': PORTUGUESE_COLORS.red,
      }
    },
    {
      id: 'pricing',
      icon: 'card-outline',
      title: 'Subscription Plans',
      description: 'Portuguese community pricing',
      color: PORTUGUESE_COLORS.gold,
      data: {
        'Free Plan': `${SUBSCRIPTION_PLANS.free.name} - £${SUBSCRIPTION_PLANS.free.priceMonthly}/mo`,
        'Community Plan': `${SUBSCRIPTION_PLANS.community.name} - £${SUBSCRIPTION_PLANS.community.priceMonthly}/mo`,
        'Ambassador Plan': `${SUBSCRIPTION_PLANS.ambassador.name} - £${SUBSCRIPTION_PLANS.ambassador.priceMonthly}/mo`,
        'Max Connections (Free)': SUBSCRIPTION_PLANS.free.maxConnections,
      }
    },
    {
      id: 'contact',
      icon: 'mail-outline',
      title: 'Contact Information',
      description: 'Community support channels',
      color: PORTUGUESE_COLORS.azulejo,
      data: {
        'Support Email': CONTACT_INFO.support.email,
        'Demo Email': CONTACT_INFO.demo.email,
        'Support Phone': CONTACT_INFO.support.phone,
        'Twitter Handle': CONTACT_INFO.social.twitter,
      }
    },
    {
      id: 'features',
      icon: 'apps-outline',
      title: 'Mobile Features',
      description: 'Platform capabilities',
      color: PORTUGUESE_COLORS.accent,
      data: {
        'Biometric Auth': MOBILE_CONFIG.features.biometricAuth ? 'Enabled' : 'Disabled',
        'Push Notifications': MOBILE_CONFIG.features.pushNotifications ? 'Enabled' : 'Disabled',
        'Offline Mode': MOBILE_CONFIG.features.offlineMode ? 'Enabled' : 'Disabled',
        'Streaming': MOBILE_CONFIG.features.streaming ? 'Enabled' : 'Disabled',
      }
    },
    {
      id: 'i18n',
      icon: 'language-outline',
      title: 'Internationalization',
      description: 'Bilingual EN/PT system',
      color: PORTUGUESE_COLORS.secondary,
      data: {
        'Current Language': i18n.language,
        'Default Language': MOBILE_CONFIG.culture.defaultLanguage,
        'Available Languages': MOBILE_CONFIG.culture.supportedLanguages.join(' | '),
        'Translation Keys': 'Loaded from i18n files',
      }
    }
  ];

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'pt' : 'en';
    i18n.changeLanguage(newLanguage);
    Alert.alert(
      'Language Changed',
      `Switched to ${newLanguage === 'pt' ? 'Portuguese' : 'English'}`,
      [{ text: 'OK' }]
    );
  };

  const testConfiguration = (feature: any) => {
    setSelectedFeature(feature.id);
    
    const dataEntries = Object.entries(feature.data);
    const message = dataEntries
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    Alert.alert(
      `${feature.title} Test`,
      `Configuration loaded successfully:\n\n${message}`,
      [
        { text: 'OK', onPress: () => setSelectedFeature(null) }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={PORTUGUESE_COLORS.primary} barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🇵🇹 LusoTown Demo</Text>
        <Text style={styles.headerSubtitle}>
          {t('demo.subtitle', 'Mobile Setup Validation')}
        </Text>
        <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
          <Ionicons name="language-outline" size={20} color={Colors.surface} />
          <Text style={styles.languageText}>
            {i18n.language === 'en' ? 'PT' : 'EN'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Demo Features Grid */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>
          {t('demo.features.title', 'Mobile App Features')}
        </Text>
        
        {demoFeatures.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            style={[
              styles.featureCard,
              selectedFeature === feature.id && styles.featureCardSelected,
            ]}
            onPress={() => testConfiguration(feature)}
            activeOpacity={0.7}
          >
            <View style={styles.featureHeader}>
              <View style={[styles.featureIcon, { backgroundColor: `${feature.color}20` }]}>
                <Ionicons name={feature.icon} size={24} color={feature.color} />
              </View>
              <View style={styles.featureInfo}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color={Colors.textSecondary} 
              />
            </View>
            
            {/* Preview some configuration data */}
            <View style={styles.featurePreview}>
              {Object.entries(feature.data).slice(0, 2).map(([key, value]) => (
                <View key={key} style={styles.previewItem}>
                  <Text style={styles.previewKey}>{key}:</Text>
                  <Text style={styles.previewValue} numberOfLines={1}>
                    {String(value)}
                  </Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}

        {/* Portuguese Community Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>
            {t('demo.stats.title', 'Community Statistics')}
          </Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {MOBILE_CONFIG.community.totalMembers.toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>
                {t('demo.stats.members', 'Members')}
              </Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {MOBILE_CONFIG.community.totalStudents.toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>
                {t('demo.stats.students', 'Students')}
              </Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {MOBILE_CONFIG.community.universityPartnerships}
              </Text>
              <Text style={styles.statLabel}>
                {t('demo.stats.universities', 'Universities')}
              </Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {MOBILE_CONFIG.community.businessListings}
              </Text>
              <Text style={styles.statLabel}>
                {t('demo.stats.businesses', 'Businesses')}
              </Text>
            </View>
          </View>
        </View>

        {/* Setup Status */}
        <View style={styles.setupStatus}>
          <Text style={styles.sectionTitle}>
            {t('demo.setup.title', 'Setup Status')}
          </Text>
          
          <View style={styles.statusItem}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
            <Text style={styles.statusText}>React Native Development Environment</Text>
          </View>
          
          <View style={styles.statusItem}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
            <Text style={styles.statusText}>Portuguese Cultural Integration</Text>
          </View>
          
          <View style={styles.statusItem}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
            <Text style={styles.statusText}>Zero Hardcoding Policy Compliance</Text>
          </View>
          
          <View style={styles.statusItem}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
            <Text style={styles.statusText}>Bilingual EN/PT Support</Text>
          </View>
          
          <View style={styles.statusItem}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
            <Text style={styles.statusText}>Mobile-First Design System</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🇵🇹 {t('demo.footer', 'LusoTown - Connecting the Portuguese-speaking community across the United Kingdom')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: PORTUGUESE_COLORS.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    position: 'relative',
  },
  headerTitle: {
    ...Typography.h2,
    color: Colors.surface,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    ...Typography.bodySmall,
    color: Colors.surface,
    textAlign: 'center',
    opacity: 0.9,
  },
  languageButton: {
    position: 'absolute',
    right: Spacing.lg,
    top: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 16,
  },
  languageText: {
    ...Typography.bodySmall,
    color: Colors.surface,
    marginLeft: Spacing.xs,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  featureCard: {
    ...CommonStyles.card,
    marginBottom: Spacing.md,
    backgroundColor: Colors.surface,
  },
  featureCardSelected: {
    borderWidth: 2,
    borderColor: PORTUGUESE_COLORS.primary,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  featureDescription: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  featurePreview: {
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  previewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  previewKey: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '500',
    flex: 1,
  },
  previewValue: {
    ...Typography.caption,
    color: Colors.text,
    flex: 1,
    textAlign: 'right',
  },
  statsSection: {
    marginTop: Spacing.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    ...CommonStyles.card,
    width: '48%',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.md,
    backgroundColor: Colors.surface,
  },
  statNumber: {
    ...Typography.h2,
    color: PORTUGUESE_COLORS.primary,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  setupStatus: {
    marginTop: Spacing.xl,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  statusText: {
    ...Typography.body,
    color: Colors.text,
    marginLeft: Spacing.md,
    flex: 1,
  },
  footer: {
    marginTop: Spacing.xxl,
    marginBottom: Spacing.xl,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});