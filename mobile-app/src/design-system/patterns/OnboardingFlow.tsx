// 🇵🇹 LusoTown Mobile - Portuguese Cultural Onboarding Flow
// Complete onboarding experience with Portuguese cultural context

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PORTUGUESE_THEME } from '../tokens';
import { PortugueseButton } from '../components/PortugueseButton';
import { HeritageCard } from '../components/HeritageCard';
import { HeritageCountry, OnboardingData } from '../../types';
import { HERITAGE_COUNTRIES, INTEREST_CATEGORIES, UK_CITIES } from '../../config';

const { width: screenWidth } = Dimensions.get('window');

export type OnboardingStep = 
  | 'welcome'
  | 'heritage'
  | 'interests' 
  | 'location'
  | 'university'
  | 'language'
  | 'complete';

export interface OnboardingFlowProps {
  /** Current onboarding step */
  currentStep: OnboardingStep;
  
  /** Onboarding data being collected */
  data: Partial<OnboardingData>;
  
  /** Step navigation handler */
  onStepChange: (step: OnboardingStep) => void;
  
  /** Data update handler */
  onDataUpdate: (updates: Partial<OnboardingData>) => void;
  
  /** Onboarding completion handler */
  onComplete: (data: OnboardingData) => void;
  
  /** Back navigation handler */
  onBack: () => void;
}

/**
 * Portuguese Cultural Onboarding Flow
 * 
 * A comprehensive onboarding experience designed for Portuguese-speaking community members.
 * Features cultural imagery, heritage selection, and Portuguese-optimized user experience.
 * 
 * @example
 * ```tsx
 * <OnboardingFlow
 *   currentStep="heritage"
 *   data={onboardingData}
 *   onStepChange={handleStepChange}
 *   onDataUpdate={handleDataUpdate}
 *   onComplete={handleOnboardingComplete}
 *   onBack={() => navigation.goBack()}
 * />
 * ```
 */
export function OnboardingFlow({
  currentStep,
  data,
  onStepChange,
  onDataUpdate,
  onComplete,
  onBack
}: OnboardingFlowProps) {
  
  const [isLoading, setIsLoading] = useState(false);
  
  const steps: OnboardingStep[] = ['welcome', 'heritage', 'interests', 'location', 'university', 'language', 'complete'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = (currentStepIndex + 1) / steps.length;
  
  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      onStepChange(steps[nextIndex]);
    }
  };
  
  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      onStepChange(steps[prevIndex]);
    } else {
      onBack();
    }
  };
  
  const handleComplete = async () => {
    setIsLoading(true);
    try {
      if (isOnboardingDataComplete(data)) {
        await onComplete(data as OnboardingData);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>
        {currentStepIndex + 1} de {steps.length}
      </Text>
    </View>
  );
  
  const renderHeader = () => (
    <View style={styles.header}>
      <PortugueseButton
        title=""
        variant="text"
        icon="arrow-back"
        size="small"
        onPress={handlePrevious}
        accessibilityLabel="Voltar"
      />
      {renderProgressBar()}
    </View>
  );
  
  const renderWelcomeStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.welcomeImageContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b' }}
          style={styles.welcomeImage}
          resizeMode="cover"
        />
        <View style={styles.welcomeOverlay}>
          <Text style={styles.welcomeFlag}>🇵🇹</Text>
        </View>
      </View>
      
      <View style={styles.welcomeContent}>
        <Text style={styles.welcomeTitle}>
          Bem-vindo ao LusoTown
        </Text>
        <Text style={styles.welcomeSubtitle}>
          Welcome to LusoTown
        </Text>
        <Text style={styles.welcomeDescription}>
          A plataforma da comunidade lusófona no Reino Unido. 
          Conecte-se com pessoas, eventos e negócios portugueses.
        </Text>
        <Text style={styles.welcomeDescriptionEn}>
          The Portuguese-speaking community platform in the United Kingdom. 
          Connect with people, events, and Portuguese businesses.
        </Text>
      </View>
      
      <View style={styles.welcomeActions}>
        <PortugueseButton
          title="Começar • Start"
          variant="primary"
          size="large"
          fullWidth
          icon="arrow-forward"
          iconPosition="right"
          onPress={handleNext}
        />
      </View>
    </View>
  );
  
  const renderHeritageStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Sua Herança Cultural</Text>
        <Text style={styles.stepSubtitle}>Your Cultural Heritage</Text>
        <Text style={styles.stepDescription}>
          Selecione os países lusófonos com os quais se identifica. 
          Isto ajuda-nos a conectá-lo com eventos e pessoas relevantes.
        </Text>
      </View>
      
      <ScrollView style={styles.heritageGrid} showsVerticalScrollIndicator={false}>
        <View style={styles.heritageRow}>
          {Object.keys(HERITAGE_COUNTRIES).map((heritage) => (
            <HeritageCard
              key={heritage}
              heritage={heritage as HeritageCountry}
              selected={data.heritage === heritage}
              size="medium"
              showDescription={false}
              language="pt"
              onPress={(selectedHeritage) => {
                onDataUpdate({ heritage: selectedHeritage });
              }}
              style={styles.heritageCardItem}
            />
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.stepActions}>
        <PortugueseButton
          title="Continuar"
          variant="primary"
          size="large"
          fullWidth
          disabled={!data.heritage}
          onPress={handleNext}
        />
      </View>
    </View>
  );
  
  const renderInterestsStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Seus Interesses</Text>
        <Text style={styles.stepSubtitle}>Your Interests</Text>
        <Text style={styles.stepDescription}>
          Escolha as atividades e temas que mais lhe interessam na cultura portuguesa.
        </Text>
      </View>
      
      <ScrollView style={styles.interestsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.interestsGrid}>
          {Object.entries(INTEREST_CATEGORIES).map(([key, category]) => {
            const isSelected = data.interests?.includes(key) || false;
            return (
              <PortugueseButton
                key={key}
                title={`${category.icon} ${category.name.pt}`}
                variant={isSelected ? 'primary' : 'outline'}
                size="medium"
                style={[styles.interestButton, { borderColor: category.color }]}
                onPress={() => {
                  const currentInterests = data.interests || [];
                  const newInterests = isSelected
                    ? currentInterests.filter(interest => interest !== key)
                    : [...currentInterests, key];
                  onDataUpdate({ interests: newInterests });
                }}
              />
            );
          })}
        </View>
      </ScrollView>
      
      <View style={styles.stepActions}>
        <PortugueseButton
          title="Continuar"
          variant="primary"
          size="large"
          fullWidth
          disabled={!data.interests?.length}
          onPress={handleNext}
        />
      </View>
    </View>
  );
  
  const renderLocationStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Localização</Text>
        <Text style={styles.stepSubtitle}>Location</Text>
        <Text style={styles.stepDescription}>
          Onde está localizado no Reino Unido? Isto ajuda-nos a mostrar eventos locais.
        </Text>
      </View>
      
      <ScrollView style={styles.locationContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.locationGrid}>
          {UK_CITIES.map((city) => (
            <PortugueseButton
              key={city.name}
              title={`${city.name} • ${city.portuguese}`}
              variant={data.location === city.name ? 'primary' : 'outline'}
              size="medium"
              fullWidth
              style={styles.locationButton}
              onPress={() => onDataUpdate({ location: city.name })}
            />
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.stepActions}>
        <PortugueseButton
          title="Continuar"
          variant="primary"
          size="large"
          fullWidth
          disabled={!data.location}
          onPress={handleNext}
        />
      </View>
    </View>
  );
  
  const renderUniversityStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Universidade (Opcional)</Text>
        <Text style={styles.stepSubtitle}>University (Optional)</Text>
        <Text style={styles.stepDescription}>
          É estudante? Selecione a sua universidade para aceder a eventos estudantis.
        </Text>
      </View>
      
      <ScrollView style={styles.universityContainer} showsVerticalScrollIndicator={false}>
        <PortugueseButton
          title="Não sou estudante • Not a student"
          variant={!data.university ? 'primary' : 'outline'}
          size="medium"
          fullWidth
          style={styles.universityButton}
          onPress={() => onDataUpdate({ university: undefined })}
        />
        
        {/* University options would be populated from config */}
        <View style={styles.universityList}>
          {['UCL', 'King\'s College', 'Imperial College', 'LSE'].map((uni) => (
            <PortugueseButton
              key={uni}
              title={uni}
              variant={data.university === uni ? 'primary' : 'outline'}
              size="medium"
              fullWidth
              style={styles.universityButton}
              onPress={() => onDataUpdate({ university: uni })}
            />
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.stepActions}>
        <PortugueseButton
          title="Continuar"
          variant="primary"
          size="large"
          fullWidth
          onPress={handleNext}
        />
      </View>
    </View>
  );
  
  const renderLanguageStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Idioma Preferido</Text>
        <Text style={styles.stepSubtitle}>Preferred Language</Text>
        <Text style={styles.stepDescription}>
          Escolha o idioma principal para a aplicação.
        </Text>
      </View>
      
      <View style={styles.languageOptions}>
        <PortugueseButton
          title="🇵🇹 Português"
          variant={data.language === 'pt' ? 'primary' : 'outline'}
          size="large"
          fullWidth
          style={styles.languageButton}
          onPress={() => onDataUpdate({ language: 'pt' })}
        />
        
        <PortugueseButton
          title="🇬🇧 English"
          variant={data.language === 'en' ? 'primary' : 'outline'}
          size="large"
          fullWidth
          style={styles.languageButton}
          onPress={() => onDataUpdate({ language: 'en' })}
        />
      </View>
      
      <View style={styles.stepActions}>
        <PortugueseButton
          title="Concluir • Complete"
          variant="heritage"
          size="large"
          fullWidth
          loading={isLoading}
          disabled={!data.language}
          onPress={handleComplete}
        />
      </View>
    </View>
  );
  
  const renderCompleteStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.completeContent}>
        <Text style={styles.completeIcon}>🎉</Text>
        <Text style={styles.completeTitle}>Bem-vindo à Comunidade!</Text>
        <Text style={styles.completeSubtitle}>Welcome to the Community!</Text>
        <Text style={styles.completeDescription}>
          O seu perfil foi criado com sucesso. Está pronto para explorar eventos, 
          conhecer pessoas e descobrir negócios portugueses no Reino Unido.
        </Text>
      </View>
      
      <View style={styles.stepActions}>
        <PortugueseButton
          title="Explorar LusoTown"
          variant="heritage"
          size="large"
          fullWidth
          icon="arrow-forward"
          iconPosition="right"
          onPress={() => {/* Navigate to main app */}}
        />
      </View>
    </View>
  );
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return renderWelcomeStep();
      case 'heritage':
        return renderHeritageStep();
      case 'interests':
        return renderInterestsStep();
      case 'location':
        return renderLocationStep();
      case 'university':
        return renderUniversityStep();
      case 'language':
        return renderLanguageStep();
      case 'complete':
        return renderCompleteStep();
      default:
        return renderWelcomeStep();
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {currentStep !== 'welcome' && currentStep !== 'complete' && renderHeader()}
      {renderCurrentStep()}
    </SafeAreaView>
  );
}

// Helper functions
function isOnboardingDataComplete(data: Partial<OnboardingData>): data is OnboardingData {
  return !!(
    data.firstName &&
    data.lastName &&
    data.email &&
    data.heritage &&
    data.language &&
    data.interests?.length &&
    data.acceptedTerms
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PORTUGUESE_THEME.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: PORTUGUESE_THEME.spacing.lg,
    paddingVertical: PORTUGUESE_THEME.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: PORTUGUESE_THEME.colors.border,
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: PORTUGUESE_THEME.spacing.lg,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: PORTUGUESE_THEME.colors.border,
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: PORTUGUESE_THEME.colors.primary,
    borderRadius: 2,
  },
  progressText: {
    ...PORTUGUESE_THEME.typography.caption,
    color: PORTUGUESE_THEME.colors.textSecondary,
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: PORTUGUESE_THEME.spacing.lg,
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: PORTUGUESE_THEME.spacing.xl,
    paddingTop: PORTUGUESE_THEME.spacing.lg,
  },
  stepTitle: {
    ...PORTUGUESE_THEME.typography.headingLarge,
    textAlign: 'center',
    marginBottom: 8,
    color: PORTUGUESE_THEME.colors.text,
  },
  stepSubtitle: {
    ...PORTUGUESE_THEME.typography.headingSmall,
    textAlign: 'center',
    color: PORTUGUESE_THEME.colors.textSecondary,
    marginBottom: 16,
  },
  stepDescription: {
    ...PORTUGUESE_THEME.typography.bodyMedium,
    textAlign: 'center',
    color: PORTUGUESE_THEME.colors.textSecondary,
    lineHeight: 24,
  },
  stepActions: {
    paddingVertical: PORTUGUESE_THEME.spacing.xl,
  },
  
  // Welcome step styles
  welcomeImageContainer: {
    height: 300,
    marginBottom: PORTUGUESE_THEME.spacing.xl,
    borderRadius: PORTUGUESE_THEME.borderRadius.large,
    overflow: 'hidden',
    position: 'relative',
  },
  welcomeImage: {
    width: '100%',
    height: '100%',
  },
  welcomeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeFlag: {
    fontSize: 64,
  },
  welcomeContent: {
    alignItems: 'center',
    marginBottom: PORTUGUESE_THEME.spacing.xl,
  },
  welcomeTitle: {
    ...PORTUGUESE_THEME.typography.displayMedium,
    textAlign: 'center',
    color: PORTUGUESE_THEME.colors.primary,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    ...PORTUGUESE_THEME.typography.headingMedium,
    textAlign: 'center',
    color: PORTUGUESE_THEME.colors.textSecondary,
    marginBottom: 24,
  },
  welcomeDescription: {
    ...PORTUGUESE_THEME.typography.bodyLarge,
    textAlign: 'center',
    color: PORTUGUESE_THEME.colors.text,
    lineHeight: 28,
    marginBottom: 16,
  },
  welcomeDescriptionEn: {
    ...PORTUGUESE_THEME.typography.bodyMedium,
    textAlign: 'center',
    color: PORTUGUESE_THEME.colors.textSecondary,
    lineHeight: 24,
  },
  welcomeActions: {
    marginTop: 'auto',
    paddingBottom: PORTUGUESE_THEME.spacing.xl,
  },
  
  // Heritage step styles
  heritageGrid: {
    flex: 1,
    marginBottom: PORTUGUESE_THEME.spacing.lg,
  },
  heritageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  heritageCardItem: {
    width: (screenWidth - (PORTUGUESE_THEME.spacing.lg * 2) - PORTUGUESE_THEME.spacing.md) / 2,
    marginBottom: PORTUGUESE_THEME.spacing.md,
  },
  
  // Interests step styles
  interestsContainer: {
    flex: 1,
    marginBottom: PORTUGUESE_THEME.spacing.lg,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  interestButton: {
    width: (screenWidth - (PORTUGUESE_THEME.spacing.lg * 2) - PORTUGUESE_THEME.spacing.md) / 2,
    marginBottom: PORTUGUESE_THEME.spacing.md,
  },
  
  // Location step styles
  locationContainer: {
    flex: 1,
    marginBottom: PORTUGUESE_THEME.spacing.lg,
  },
  locationGrid: {
    gap: PORTUGUESE_THEME.spacing.sm,
  },
  locationButton: {
    marginBottom: PORTUGUESE_THEME.spacing.sm,
  },
  
  // University step styles
  universityContainer: {
    flex: 1,
    marginBottom: PORTUGUESE_THEME.spacing.lg,
  },
  universityList: {
    marginTop: PORTUGUESE_THEME.spacing.md,
    gap: PORTUGUESE_THEME.spacing.sm,
  },
  universityButton: {
    marginBottom: PORTUGUESE_THEME.spacing.sm,
  },
  
  // Language step styles
  languageOptions: {
    flex: 1,
    justifyContent: 'center',
    gap: PORTUGUESE_THEME.spacing.lg,
  },
  languageButton: {
    marginBottom: PORTUGUESE_THEME.spacing.md,
  },
  
  // Complete step styles
  completeContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeIcon: {
    fontSize: 80,
    marginBottom: PORTUGUESE_THEME.spacing.xl,
  },
  completeTitle: {
    ...PORTUGUESE_THEME.typography.displayMedium,
    textAlign: 'center',
    color: PORTUGUESE_THEME.colors.primary,
    marginBottom: 8,
  },
  completeSubtitle: {
    ...PORTUGUESE_THEME.typography.headingMedium,
    textAlign: 'center',
    color: PORTUGUESE_THEME.colors.textSecondary,
    marginBottom: 24,
  },
  completeDescription: {
    ...PORTUGUESE_THEME.typography.bodyLarge,
    textAlign: 'center',
    color: PORTUGUESE_THEME.colors.text,
    lineHeight: 28,
    paddingHorizontal: PORTUGUESE_THEME.spacing.md,
  },
});

export default OnboardingFlow;