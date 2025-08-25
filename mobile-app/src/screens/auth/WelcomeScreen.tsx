import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Spacing, Typography, CommonStyles } from '../../constants/Styles';
import { CULTURAL_SYMBOLS } from '../../config';

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login' as never);
  };

  const handleSignup = () => {
    navigation.navigate('Signup' as never);
  };

  const handleContinueAsGuest = () => {
    navigation.navigate('MainTabs' as never);
  };

  return (
    <SafeAreaView style={CommonStyles.container}>
      <View style={styles.container}>
        {/* Logo and Brand Section */}
        <View style={styles.brandSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>LusoTown</Text>
            <Text style={styles.logoSymbol}>{CULTURAL_SYMBOLS.flag}</Text>
          </View>
          
          <Text style={styles.title}>{t('auth.welcome.title')}</Text>
          <Text style={styles.subtitle}>{t('auth.welcome.subtitle')}</Text>
        </View>

        {/* Heritage Flags Display */}
        <View style={styles.heritageDisplay}>
          <View style={styles.flagRow}>
            <Text style={styles.flag}>🇵🇹</Text>
            <Text style={styles.flag}>🇧🇷</Text>
            <Text style={styles.flag}>🇨🇻</Text>
            <Text style={styles.flag}>🇦🇴</Text>
          </View>
          <View style={styles.flagRow}>
            <Text style={styles.flag}>🇲🇿</Text>
            <Text style={styles.flag}>🇬🇼</Text>
            <Text style={styles.flag}>🇹🇱</Text>
            <Text style={styles.flag}>🇸🇹</Text>
          </View>
          <Text style={styles.heritageText}>Unidos pela Língua</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[CommonStyles.button, styles.primaryButton]}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={[CommonStyles.buttonText, styles.primaryButtonText]}>
              {t('auth.welcome.login')}
            </Text>
            <Ionicons name="log-in" size={20} color={Colors.surface} style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[CommonStyles.button, styles.secondaryButton]}
            onPress={handleSignup}
            activeOpacity={0.8}
          >
            <Text style={[CommonStyles.buttonText, styles.secondaryButtonText]}>
              {t('auth.welcome.signup')}
            </Text>
            <Ionicons name="person-add" size={20} color={Colors.primary} style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.guestButton}
            onPress={handleContinueAsGuest}
            activeOpacity={0.7}
          >
            <Text style={styles.guestButtonText}>
              {t('auth.welcome.continue_guest')}
            </Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.textSecondary} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>

        {/* Cultural Elements */}
        <View style={styles.culturalElements}>
          <View style={styles.culturalIcon}>
            <Text style={styles.culturalEmoji}>{CULTURAL_SYMBOLS.castle}</Text>
          </View>
          <View style={styles.culturalIcon}>
            <Text style={styles.culturalEmoji}>{CULTURAL_SYMBOLS.ship}</Text>
          </View>
          <View style={styles.culturalIcon}>
            <Text style={styles.culturalEmoji}>{CULTURAL_SYMBOLS.music}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Discover Portuguese culture across the UK
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'space-between',
  },
  brandSection: {
    alignItems: 'center',
    paddingTop: Spacing.xxl,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logo: {
    ...Typography.h1,
    fontSize: 36,
    fontWeight: '700',
    color: Colors.primary,
    marginRight: Spacing.sm,
  },
  logoSymbol: {
    fontSize: 32,
  },
  title: {
    ...Typography.h1,
    textAlign: 'center',
    marginBottom: Spacing.md,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.body,
    textAlign: 'center',
    color: Colors.textSecondary,
    lineHeight: 24,
    paddingHorizontal: Spacing.md,
  },
  heritageDisplay: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  flagRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  flag: {
    fontSize: 28,
    marginHorizontal: Spacing.sm,
  },
  heritageText: {
    ...Typography.body,
    fontWeight: '500',
    color: Colors.primary,
    marginTop: Spacing.md,
    fontStyle: 'italic',
  },
  buttonSection: {
    paddingBottom: Spacing.xl,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    marginBottom: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: Colors.surface,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
    marginBottom: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Colors.primary,
  },
  guestButton: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  guestButtonText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  culturalElements: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
  },
  culturalIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Spacing.sm,
  },
  culturalEmoji: {
    fontSize: 24,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: Spacing.lg,
  },
  footerText: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});