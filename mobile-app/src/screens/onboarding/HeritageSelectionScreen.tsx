import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Spacing, Typography, CommonStyles } from '../../constants/Styles';
import { HERITAGE_COUNTRIES } from '../../config';
import { HeritageCountry } from '../../types';

interface Props {
  onContinue: (heritage: HeritageCountry[]) => void;
  onBack: () => void;
}

export default function HeritageSelectionScreen({ onContinue, onBack }: Props) {
  const { t } = useTranslation();
  const [selectedHeritage, setSelectedHeritage] = useState<HeritageCountry[]>([]);
  const [allowMultiple, setAllowMultiple] = useState(false);

  const handleHeritageSelect = (heritage: HeritageCountry) => {
    if (allowMultiple) {
      setSelectedHeritage(prev => 
        prev.includes(heritage) 
          ? prev.filter(h => h !== heritage)
          : [...prev, heritage]
      );
    } else {
      setSelectedHeritage([heritage]);
    }
  };

  const handleContinue = () => {
    if (selectedHeritage.length > 0) {
      onContinue(selectedHeritage);
    }
  };

  return (
    <SafeAreaView style={CommonStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.progress}>2/6</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{t('onboarding.heritage.title')}</Text>
          <Text style={styles.subtitle}>{t('onboarding.heritage.subtitle')}</Text>
        </View>

        {/* Heritage Options */}
        <View style={styles.heritageGrid}>
          {Object.entries(HERITAGE_COUNTRIES).map(([key, country]) => {
            const isSelected = selectedHeritage.includes(key as HeritageCountry);
            
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.heritageCard,
                  isSelected && styles.heritageCardSelected
                ]}
                onPress={() => handleHeritageSelect(key as HeritageCountry)}
                activeOpacity={0.7}
              >
                <Text style={styles.heritageFlag}>{country.flag}</Text>
                <Text style={[
                  styles.heritageName,
                  isSelected && styles.heritageNameSelected
                ]}>
                  {country.name.en}
                </Text>
                <Text style={[
                  styles.heritageNamePortuguese,
                  isSelected && styles.heritageNameSelected
                ]}>
                  {country.name.pt}
                </Text>
                {isSelected && (
                  <View style={styles.selectedIndicator}>
                    <Ionicons name="checkmark" size={16} color={Colors.surface} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Multiple Selection Option */}
        <TouchableOpacity 
          style={styles.multipleOption}
          onPress={() => setAllowMultiple(!allowMultiple)}
          activeOpacity={0.7}
        >
          <Ionicons 
            name={allowMultiple ? "checkbox" : "checkbox-outline"} 
            size={20} 
            color={allowMultiple ? Colors.primary : Colors.textSecondary} 
          />
          <Text style={[
            styles.multipleText,
            allowMultiple && styles.multipleTextSelected
          ]}>
            {t('onboarding.heritage.multiple')}
          </Text>
        </TouchableOpacity>

        {/* Cultural Context Info */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color={Colors.primary} />
          <Text style={styles.infoText}>
            Your heritage selection helps us connect you with relevant cultural events, 
            businesses, and community members who share your background.
          </Text>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            CommonStyles.button,
            selectedHeritage.length === 0 && styles.buttonDisabled
          ]}
          onPress={handleContinue}
          disabled={selectedHeritage.length === 0}
          activeOpacity={0.8}
        >
          <Text style={[
            CommonStyles.buttonText,
            selectedHeritage.length === 0 && styles.buttonTextDisabled
          ]}>
            {t('onboarding.heritage.continue')}
          </Text>
          <Ionicons 
            name="arrow-forward" 
            size={20} 
            color={selectedHeritage.length === 0 ? Colors.textLight : Colors.surface}
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  backButton: {
    padding: Spacing.sm,
  },
  progress: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  titleSection: {
    marginBottom: Spacing.xl,
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
  },
  heritageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  heritageCard: {
    width: '47%',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
    position: 'relative',
    ...CommonStyles.shadow,
  },
  heritageCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  heritageFlag: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  heritageName: {
    ...Typography.body,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  heritageNamePortuguese: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  heritageNameSelected: {
    color: Colors.primary,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  multipleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  multipleText: {
    ...Typography.body,
    marginLeft: Spacing.sm,
    color: Colors.textSecondary,
  },
  multipleTextSelected: {
    color: Colors.primary,
    fontWeight: '500',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.azulejoLight,
    padding: Spacing.md,
    borderRadius: 8,
    marginBottom: Spacing.xl,
  },
  infoText: {
    ...Typography.bodySmall,
    color: Colors.text,
    marginLeft: Spacing.sm,
    flex: 1,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.md,
    backgroundColor: Colors.background,
  },
  buttonDisabled: {
    backgroundColor: Colors.border,
  },
  buttonTextDisabled: {
    color: Colors.textLight,
  },
});