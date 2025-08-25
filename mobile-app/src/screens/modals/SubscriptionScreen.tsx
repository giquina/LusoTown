import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, CommonStyles } from '../../constants/Styles';
import { supabase } from '../../lib/supabase';

interface SubscriptionPlan {
  id: string;
  name: string;
  namePortuguese: string;
  price: number;
  billing: 'monthly' | 'annual';
  culturalValue: string;
  culturalValuePortuguese: string;
  features: {
    matches: number;
    messages: number;
    events: boolean;
    businessDirectory: boolean;
    premiumEvents: boolean;
    portugueseBusinessDiscount: number;
    culturalEvents: number;
    personalConcierge: boolean;
    familySupport: number;
    culturalResources: boolean;
  };
  portugalSpecific: {
    fadoNightsPriority: boolean;
    portugueseRestaurantNetwork: boolean;
    culturalFestivalAccess: boolean;
    exclusiveBusinessEvents: boolean;
    monthlyPortugueseWineDelivery?: boolean;
  };
  popular?: boolean;
}

const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    namePortuguese: 'Grátis',
    price: 0,
    billing: 'monthly',
    culturalValue: 'Explore Community',
    culturalValuePortuguese: 'Explorar Comunidade',
    features: {
      matches: 2,
      messages: 3,
      events: true,
      businessDirectory: false,
      premiumEvents: false,
      portugueseBusinessDiscount: 0,
      culturalEvents: 2,
      personalConcierge: false,
      familySupport: 0,
      culturalResources: false,
    },
    portugalSpecific: {
      fadoNightsPriority: false,
      portugueseRestaurantNetwork: false,
      culturalFestivalAccess: false,
      exclusiveBusinessEvents: false,
    }
  },
  {
    id: 'community',
    name: 'Community Member',
    namePortuguese: 'Membro da Comunidade',
    price: 15.99,
    billing: 'monthly',
    culturalValue: 'Full Cultural Access',
    culturalValuePortuguese: 'Acesso Cultural Completo',
    popular: true,
    features: {
      matches: -1, // unlimited
      messages: -1, // unlimited
      events: true,
      businessDirectory: true,
      premiumEvents: false,
      portugueseBusinessDiscount: 10,
      culturalEvents: -1,
      personalConcierge: false,
      familySupport: 4,
      culturalResources: true,
    },
    portugalSpecific: {
      fadoNightsPriority: true,
      portugueseRestaurantNetwork: true,
      culturalFestivalAccess: true,
      exclusiveBusinessEvents: false,
    }
  },
  {
    id: 'ambassador',
    name: 'Cultural Ambassador',
    namePortuguese: 'Embaixador Cultural',
    price: 29.99,
    billing: 'monthly',
    culturalValue: 'Community Leadership',
    culturalValuePortuguese: 'Liderança Comunitária',
    features: {
      matches: -1,
      messages: -1,
      events: true,
      businessDirectory: true,
      premiumEvents: true,
      portugueseBusinessDiscount: 20,
      culturalEvents: -1,
      personalConcierge: true,
      familySupport: 4,
      culturalResources: true,
    },
    portugalSpecific: {
      fadoNightsPriority: true,
      portugueseRestaurantNetwork: true,
      culturalFestivalAccess: true,
      exclusiveBusinessEvents: true,
      monthlyPortugueseWineDelivery: true,
    }
  },
  {
    id: 'familia',
    name: 'Família (Family)',
    namePortuguese: 'Família',
    price: 39.99,
    billing: 'monthly',
    culturalValue: 'Multi-Generational Connection',
    culturalValuePortuguese: 'Ligação Multi-Geracional',
    features: {
      matches: -1,
      messages: -1,
      events: true,
      businessDirectory: true,
      premiumEvents: true,
      portugueseBusinessDiscount: 15,
      culturalEvents: -1,
      personalConcierge: false,
      familySupport: 8,
      culturalResources: true,
    },
    portugalSpecific: {
      fadoNightsPriority: true,
      portugueseRestaurantNetwork: true,
      culturalFestivalAccess: true,
      exclusiveBusinessEvents: false,
    }
  }
];

export default function SubscriptionScreen({ navigation }) {
  const { t } = useTranslation();
  const [currentPlan, setCurrentPlan] = useState<string>('free');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  useEffect(() => {
    fetchCurrentSubscription();
  }, []);

  const fetchCurrentSubscription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch current subscription from user profile or subscriptions table
        // For now, we'll use mock data
        setCurrentPlan('free');
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Free';
    return `£${price.toFixed(2)}`;
  };

  const getAnnualPrice = (monthlyPrice: number) => {
    if (monthlyPrice === 0) return 0;
    return Math.round(monthlyPrice * 12 * 0.83); // 17% discount
  };

  const handleSubscriptionUpgrade = async (planId: string) => {
    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
    if (!plan) return;

    if (plan.price === 0) {
      // Free plan - just update locally
      setCurrentPlan(planId);
      Alert.alert('Plan Updated', 'You are now on the Free plan');
      return;
    }

    setLoading(true);
    
    try {
      // In a real app, this would integrate with Stripe or similar payment processor
      Alert.alert(
        'Upgrade Subscription',
        `Would you like to upgrade to ${plan.name} for ${formatPrice(plan.price)}/month?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Upgrade',
            onPress: async () => {
              // Mock payment process
              await new Promise(resolve => setTimeout(resolve, 2000));
              setCurrentPlan(planId);
              Alert.alert('Success!', `Welcome to ${plan.name}! Your Portuguese community experience just got better.`);
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to process subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderFeature = (feature: string, included: boolean | number) => {
    let displayText = feature;
    let displayValue = included;

    if (typeof included === 'number') {
      if (included === -1) {
        displayValue = '∞';
        displayText = feature;
      } else if (included === 0) {
        displayValue = '✗';
      } else {
        displayValue = included.toString();
      }
    } else {
      displayValue = included ? '✓' : '✗';
    }

    return (
      <View key={feature} style={styles.featureRow}>
        <Text style={styles.featureText}>{displayText}</Text>
        <Text style={[
          styles.featureValue,
          typeof included === 'boolean' 
            ? (included ? styles.featureIncluded : styles.featureNotIncluded)
            : (included === 0 ? styles.featureNotIncluded : styles.featureIncluded)
        ]}>
          {displayValue}
        </Text>
      </View>
    );
  };

  const renderPlanCard = (plan: SubscriptionPlan) => {
    const isCurrentPlan = currentPlan === plan.id;
    const displayPrice = billingCycle === 'annual' 
      ? getAnnualPrice(plan.price) 
      : plan.price;
    
    return (
      <View key={plan.id} style={[
        styles.planCard,
        isCurrentPlan && styles.currentPlanCard,
        plan.popular && styles.popularPlanCard
      ]}>
        {plan.popular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularBadgeText}>Most Popular</Text>
          </View>
        )}

        <View style={styles.planHeader}>
          <Text style={styles.planName}>{plan.name}</Text>
          <Text style={styles.planNamePortuguese}>{plan.namePortuguese}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {formatPrice(displayPrice)}
            </Text>
            {plan.price > 0 && (
              <Text style={styles.billing}>
                /{billingCycle === 'annual' ? 'year' : 'month'}
              </Text>
            )}
          </View>
          <Text style={styles.culturalValue}>{plan.culturalValue}</Text>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Community Features</Text>
          {renderFeature('Matches', plan.features.matches)}
          {renderFeature('Messages', plan.features.messages)}
          {renderFeature('Cultural Events', plan.features.culturalEvents)}
          {renderFeature('Business Directory', plan.features.businessDirectory)}
          {renderFeature('Premium Events', plan.features.premiumEvents)}
          {plan.features.portugueseBusinessDiscount > 0 && 
            renderFeature(`Business Discount`, `${plan.features.portugueseBusinessDiscount}%`)}
          {plan.features.personalConcierge && 
            renderFeature('Personal Concierge', plan.features.personalConcierge)}
          {plan.features.familySupport > 0 && 
            renderFeature('Family Members', plan.features.familySupport)}
        </View>

        <View style={styles.portugalSpecific}>
          <Text style={styles.featuresTitle}>Portuguese Cultural Benefits</Text>
          {renderFeature('Fado Nights Priority', plan.portugalSpecific.fadoNightsPriority)}
          {renderFeature('Restaurant Network', plan.portugalSpecific.portugueseRestaurantNetwork)}
          {renderFeature('Cultural Festivals', plan.portugalSpecific.culturalFestivalAccess)}
          {renderFeature('Exclusive Business Events', plan.portugalSpecific.exclusiveBusinessEvents)}
          {plan.portugalSpecific.monthlyPortugueseWineDelivery && 
            renderFeature('Monthly Wine Delivery', plan.portugalSpecific.monthlyPortugueseWineDelivery)}
        </View>

        <TouchableOpacity
          style={[
            styles.planButton,
            isCurrentPlan && styles.currentPlanButton,
            loading && styles.disabledButton
          ]}
          onPress={() => handleSubscriptionUpgrade(plan.id)}
          disabled={isCurrentPlan || loading}
        >
          <Text style={[
            styles.planButtonText,
            isCurrentPlan && styles.currentPlanButtonText
          ]}>
            {loading ? 'Processing...' : 
             isCurrentPlan ? 'Current Plan' : 
             plan.price === 0 ? 'Select Free Plan' : 
             'Upgrade Now'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription Plans</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Billing Cycle Toggle */}
      <View style={styles.billingToggle}>
        <TouchableOpacity
          style={[
            styles.billingOption,
            billingCycle === 'monthly' && styles.activeBillingOption
          ]}
          onPress={() => setBillingCycle('monthly')}
        >
          <Text style={[
            styles.billingOptionText,
            billingCycle === 'monthly' && styles.activeBillingOptionText
          ]}>
            Monthly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.billingOption,
            billingCycle === 'annual' && styles.activeBillingOption
          ]}
          onPress={() => setBillingCycle('annual')}
        >
          <Text style={[
            styles.billingOptionText,
            billingCycle === 'annual' && styles.activeBillingOptionText
          ]}>
            Annual
          </Text>
          <View style={styles.savingsBadge}>
            <Text style={styles.savingsText}>Save 17%</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.intro}>
          <Text style={styles.introTitle}>Choose Your Portuguese Community Experience</Text>
          <Text style={styles.introSubtitle}>
            Connect with Portuguese speakers across the UK and access exclusive cultural benefits
          </Text>
        </View>

        {SUBSCRIPTION_PLANS.map(renderPlanCard)}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            All plans include access to Portuguese cultural events, community forums, and basic networking features.
          </Text>
          <Text style={styles.footerNote}>
            Cancel anytime. No hidden fees. Payment processed securely via Stripe.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    ...Typography.h2,
    color: Colors.text,
  },
  billingToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: 8,
    padding: 4,
  },
  billingOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    position: 'relative',
  },
  activeBillingOption: {
    backgroundColor: Colors.primary,
  },
  billingOptionText: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  activeBillingOptionText: {
    color: Colors.white,
  },
  savingsBadge: {
    position: 'absolute',
    top: -8,
    right: 8,
    backgroundColor: Colors.success,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  savingsText: {
    ...Typography.caption,
    color: Colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  intro: {
    padding: 16,
    alignItems: 'center',
  },
  introTitle: {
    ...Typography.h2,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  introSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  planCard: {
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: Colors.border,
    position: 'relative',
  },
  currentPlanCard: {
    borderColor: Colors.success,
    backgroundColor: Colors.successLight,
  },
  popularPlanCard: {
    borderColor: Colors.primary,
    transform: [{ scale: 1.02 }],
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  popularBadgeText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '600',
  },
  planHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  planName: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: 4,
  },
  planNamePortuguese: {
    ...Typography.body,
    color: Colors.primary,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  price: {
    ...Typography.h1,
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 32,
  },
  billing: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  culturalValue: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featuresTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: 12,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  featureText: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
  featureValue: {
    ...Typography.body,
    fontWeight: '600',
    minWidth: 40,
    textAlign: 'right',
  },
  featureIncluded: {
    color: Colors.success,
  },
  featureNotIncluded: {
    color: Colors.textSecondary,
  },
  portugalSpecific: {
    backgroundColor: Colors.primaryLight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  planButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  currentPlanButton: {
    backgroundColor: Colors.success,
  },
  disabledButton: {
    backgroundColor: Colors.textSecondary,
    opacity: 0.5,
  },
  planButtonText: {
    ...Typography.button,
    color: Colors.white,
    fontWeight: '600',
  },
  currentPlanButtonText: {
    color: Colors.white,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 12,
  },
  footerNote: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});