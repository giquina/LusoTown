import dynamic from 'next/dynamic';
import dynamic from 'next/dynamic';
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { communityStats } from "@/config/community";
import { ROUTES } from '@/config/routes';
import { PORTUGUESE_SPEAKING_COUNTRIES } from '@/config/portuguese-countries';
import SocialLogin from "@/components/SocialLogin";
import {
  CheckIcon,
  ExclamationCircleIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import { authService } from "@/lib/auth";
import { referralService } from "@/lib/referral";
import Footer from "@/components/Footer";
const UserOnboardingFlow = dynamic(() => import('@/components/UserOnboardingFlow'), { loading: () => <div>Loading...</div> });
const GrowthFeatures = dynamic(() => import('@/components/GrowthFeatures'), { loading: () => <div>Loading...</div> });
import toast from "react-hot-toast";

// New Enhanced Components
import DualAudienceHeader from "@/components/signup/DualAudienceHeader";
import EnhancedSignupForm from "@/components/signup/EnhancedSignupForm";
import SuccessStoryRotator from "@/components/signup/SuccessStoryRotator";
import EventShowcase from "@/components/signup/EventShowcase";

// Enhanced Form Data Interface
interface EnhancedFormData {
  email: string;
  firstName: string;
  password: string;
  confirmPassword: string;
  ageConfirmation: boolean;
  agreeTerms: boolean;
  portugueseOrigin: string;
  londonArea: string;
  languagePreference: string;
  interests: string[];
  referralCode: string;
  // Enhanced dual-audience fields
  primaryInterests: string[];
  businessTrack: string[];
  socialTrack: string[];
  culturalTrack: string[];
  ukLocation: string;
  culturalVerificationBadges: string[];
  preferredCountries: string[];
  audienceType: 'business' | 'romantic' | 'both' | '';
}

function EnhancedSignupInner() {
  const { language, t } = useLanguage();
  const { subscriptionRequired } = useSubscription();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Enhanced form data with dual-audience fields
  const [formData, setFormData] = useState<EnhancedFormData>({
    email: "",
    firstName: "",
    password: "",
    confirmPassword: "",
    ageConfirmation: false,
    agreeTerms: false,
    portugueseOrigin: "",
    londonArea: "",
    languagePreference: "en",
    interests: [],
    referralCode: "",
    // Enhanced fields
    primaryInterests: [],
    businessTrack: [],
    socialTrack: [],
    culturalTrack: [],
    ukLocation: "",
    culturalVerificationBadges: [],
    preferredCountries: [],
    audienceType: "",
  });

  // State management
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [referralDiscount, setReferralDiscount] = useState<number | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showGrowthFeatures, setShowGrowthFeatures] = useState(false);
  const [onboardingData, setOnboardingData] = useState<any>(null);
  const [selectedAudience, setSelectedAudience] = useState<'business' | 'romantic' | 'both' | ''>("");
  const [showEnhancedForm, setShowEnhancedForm] = useState(false);

  // URL parameter handling
  useEffect(() => {
    const refCode = searchParams.get("ref");
    if (refCode) {
      setFormData((prev) => ({ ...prev, referralCode: refCode.toUpperCase() }));
    }

    // Capture origin param for attribution
    const origin = searchParams.get("origin");
    if (origin) {
      try {
        sessionStorage.setItem("lusotown_signup_origin", origin);
      } catch {}
    }

    // Preselect interests from query (?interests=business,romantic)
    const interestsCsv = searchParams.get("interests");
    if (interestsCsv) {
      const parsed = interestsCsv
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (parsed.length) {
        setFormData((prev) => ({ 
          ...prev, 
          interests: Array.from(new Set([...prev.interests, ...parsed])),
          primaryInterests: Array.from(new Set([...prev.primaryInterests, ...parsed]))
        }));
      }
    }

    // Auto-select audience if specified
    const audience = searchParams.get("audience") as 'business' | 'romantic' | 'both' | '';
    if (audience && ['business', 'romantic', 'both'].includes(audience)) {
      setSelectedAudience(audience);
      setFormData(prev => ({ ...prev, audienceType: audience }));
      setShowEnhancedForm(true);
    }
  }, [searchParams]);

  // Audience selection handler
  const handleAudienceSelect = (audience: 'business' | 'romantic' | 'both') => {
    setSelectedAudience(audience);
    setFormData(prev => ({ ...prev, audienceType: audience }));
    setShowEnhancedForm(true);
    
    // Smooth scroll to form
    setTimeout(() => {
      const formElement = document.getElementById('enhanced-signup-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("");
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError(language === 'pt' ? 'Digite um email válido' : 'Please enter a valid email address');
    } else {
      setEmailError("");
    }
  };

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return Math.min(strength, 4);
  };

  // Form input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Real-time validation
    if (name === "email") {
      validateEmail(value);
    }
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Clear error when user starts typing
    if (error) setError("");
  };

  // Interest toggle handlers
  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handlePrimaryInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      primaryInterests: prev.primaryInterests.includes(interest)
        ? prev.primaryInterests.filter((i) => i !== interest)
        : [...prev.primaryInterests, interest],
    }));
  };

  // Form validation
  const validateForm = () => {
    if (!formData.email.trim()) {
      setError(language === 'pt' ? 'Email é obrigatório' : 'Email is required');
      return false;
    }

    if (!formData.firstName.trim()) {
      setError(language === 'pt' ? 'Primeiro nome é obrigatório' : 'First name is required');
      return false;
    }

    if (!formData.password) {
      setError(language === 'pt' ? 'Senha é obrigatória' : 'Password is required');
      return false;
    }

    if (formData.password.length < 6) {
      setError(language === 'pt' ? 'Senha deve ter pelo menos 6 caracteres' : 'Password must be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(language === 'pt' ? 'Senhas não coincidem' : 'Passwords do not match');
      return false;
    }

    if (!formData.ageConfirmation) {
      setError(language === 'pt' ? 'Você deve confirmar que tem 21 anos ou mais' : 'You must confirm you are 21 years old or older');
      return false;
    }

    if (!formData.agreeTerms) {
      setError(language === 'pt' ? 'Você deve concordar com os termos e condições' : 'You must agree to the terms and conditions');
      return false;
    }

    return true;
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await authService.signup(
        formData.email,
        formData.password,
        {
          firstName: formData.firstName,
          audienceType: formData.audienceType,
          primaryInterests: formData.primaryInterests,
          portugueseOrigin: formData.portugueseOrigin,
          ukLocation: formData.ukLocation,
        }
      );

      if (result.success && result.user) {
        // Apply referral code if provided
        if (formData.referralCode) {
          try {
            const referralResult = await referralService.createReferral(
              formData.referralCode,
              result.user.id
            );

            if (referralResult) {
              toast.success(
                language === "pt"
                  ? "Código de indicação aplicado! Ganhou 25% de desconto."
                  : "Referral code applied! You got 25% discount."
              );
              setReferralDiscount(25);
            }
          } catch (referralError) {
            console.error("Error applying referral code:", referralError);
          }
        }

        setSuccess(
          language === 'pt' 
            ? "Conta criada com sucesso! Verifique seu email para confirmar sua conta."
            : "Account created successfully! Please check your email to verify your account."
        );

        // Show success message with referral discount
        if (referralDiscount) {
          setTimeout(() => {
            toast.success(
              language === "pt"
                ? "Bem-vindo! O seu desconto de 25% está ativo."
                : "Welcome! Your 25% discount is now active."
            );
          }, 1000);
        }

        // Show onboarding flow
        setTimeout(() => {
          setShowOnboarding(true);
        }, 1000);
      } else {
        setError(result.error || (language === 'pt' ? 'Falha ao criar conta' : 'Failed to create account'));
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(language === 'pt' ? 'Ocorreu um erro inesperado. Tente novamente.' : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Onboarding flow handlers
  const handleOnboardingComplete = (data: any) => {
    setOnboardingData(data);
    setShowOnboarding(false);
    setShowGrowthFeatures(true);
  };

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    router.push("/signup/success");
  };

  const handleGrowthFeaturesComplete = (action: string, data?: any) => {
    console.log('Growth feature action:', action, data);
    switch (action) {
      case 'claim_welcome_bonus':
        toast.success(language === 'pt' ? 'Bónus ativado!' : 'Bonus activated!');
        break;
      case 'student_verification_started':
        toast.success(language === 'pt' ? 'Verificação iniciada!' : 'Verification started!');
        break;
      case 'referral_code_copied':
        toast.success(language === 'pt' ? 'Código copiado!' : 'Code copied!');
        break;
      case 'start_premium_trial':
        toast.success(language === 'pt' ? 'Teste iniciado!' : 'Trial started!');
        break;
      default:
        break;
    }
  };

  const handleGrowthFeaturesClose = () => {
    setShowGrowthFeatures(false);
    router.push("/signup/success");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Dual Audience Header */}
      <DualAudienceHeader 
        selectedAudience={selectedAudience}
        onAudienceSelect={handleAudienceSelect}
      />

      {/* Main Content */}
      {showEnhancedForm && (
        <section className="py-12" id="enhanced-signup-form">
          <div className="container-width">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Success Stories */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-1"
                >
                  <SuccessStoryRotator 
                    selectedAudience={selectedAudience}
                    className="mb-8"
                  />
                  
                  <EventShowcase 
                    selectedAudience={selectedAudience}
                  />
                </motion.div>

                {/* Right Column - Enhanced Signup Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="lg:col-span-2"
                >
                  {/* Social Login Section */}
                  <div className="mb-8">
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/50">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {language === 'pt' ? 'Registro Rápido' : 'Quick Signup'}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {language === 'pt' ? 'Registro rápido com redes sociais' : 'Quick signup with social media'}
                        </p>
                      </div>
                      
                      <SocialLogin mode="signup" />
                      
                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">
                            {language === 'pt' ? 'ou registre-se com email' : 'or signup with email'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Signup Form */}
                  <EnhancedSignupForm 
                    formData={formData}
                    onInputChange={handleInputChange}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    error={error}
                    success={success}
                    emailError={emailError}
                    passwordStrength={passwordStrength}
                    selectedAudience={selectedAudience}
                    onInterestToggle={handleInterestToggle}
                    onPrimaryInterestToggle={handlePrimaryInterestToggle}
                  />

                  {/* Security Footer */}
                  <div className="text-center pt-6">
                    <p className="text-xs text-gray-500 mb-3">
                      🔒 {language === 'pt' 
                        ? 'Suas informações são criptografadas e nunca compartilhadas com terceiros'
                        : 'Your information is encrypted and never shared with third parties'
                      }
                    </p>
                    <p className="text-gray-600 text-sm">
                      {language === 'pt' ? 'Já é membro? ' : 'Already a member? '}
                      <a
                        href={ROUTES.login}
                        className="text-primary-400 hover:text-primary-500 font-medium"
                      >
                        {language === 'pt' ? 'Entre na sua conta' : 'Sign into your account'}
                      </a>
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* Onboarding Flow */}
      <UserOnboardingFlow
        isOpen={showOnboarding}
        onClose={handleOnboardingClose}
        onComplete={handleOnboardingComplete}
      />

      {/* Growth Features */}
      <GrowthFeatures
        isOpen={showGrowthFeatures}
        onClose={handleGrowthFeaturesClose}
        userType="new_member"
        onActionComplete={handleGrowthFeaturesComplete}
      />
    </main>
  );
}

export default function EnhancedSignup() {
  return (
    <Suspense>
      <EnhancedSignupInner />
    </Suspense>
  );
}