"use client";
import Image from "next/image";
import { PortugueseAvatar } from "@/components/OptimizedImage";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { communityStats } from "@/config/community";
import { ROUTES } from '@/config/routes';
import SocialLogin from "@/components/SocialLogin";
import {
  HeartIcon,
  CheckIcon,
  ShieldCheckIcon,
  UsersIcon,
  SparklesIcon,
  LockClosedIcon,
  CameraIcon,
  StarIcon,
  ExclamationCircleIcon,
  MapPinIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import { getImageWithFallback } from "@/lib/profileImages";
import { authService } from "@/lib/auth";
import { referralService } from "@/lib/referral";
import Footer from "@/components/Footer";
import UserOnboardingFlow from "@/components/UserOnboardingFlow";
import GrowthFeatures from "@/components/GrowthFeatures";
import { getSignupPageTestimonials } from "@/config/success-stories";
import { getUpcomingEventsForSignup } from "@/config/cultural-events";
import { getSignupPageBadges } from "@/config/verification-badges";
import toast from "react-hot-toast";

const benefits = [
  {
    icon: CheckIcon,
    text: "Free to join the Portuguese-speaking community",
    subtext: "No membership fees or barriers to participation",
    mobileText: "Free Community Access",
    mobileSubtext: "No barriers • All welcome"
  },
  {
    icon: UsersIcon,
    text: `Connect with ${communityStats.members} Portuguese speakers`,
    subtext: "From Portugal, Brazil, Angola, Mozambique & beyond",
    mobileText: `${communityStats.members} Members`,
    mobileSubtext: "10 Countries • 1 UK Community 🌍🇬🇧"
  },
  {
    icon: SparklesIcon,
    text: "Start free, upgrade when ready",
    subtext: "Access VIP events and exclusive experiences optionally",
    mobileText: "Business & Romance",
    mobileSubtext: "Culture & Connection"
  },
  {
    icon: ShieldCheckIcon,
    text: "Premium features available",
    subtext: "Priority booking, secret societies, exclusive events",
    mobileText: "Elite Portuguese Events",
    mobileSubtext: "Exclusive experiences"
  },
];

const trustSignals = [
  { icon: CameraIcon, text: "Selfie verification required" },
  { icon: ShieldCheckIcon, text: "Background checks available" },
  { icon: LockClosedIcon, text: "Your data stays private" },
  { icon: StarIcon, text: "4.9/5 member satisfaction" },
];

// Get authentic Portuguese-speaking community content
const successStories = getSignupPageTestimonials();
const upcomingEvents = getUpcomingEventsForSignup();
const verificationBadges = getSignupPageBadges();

const testimonials = successStories.map(story => ({
  name: story.name,
  age: story.age,
  location: story.location,
  origin: `${story.origin} ${story.flag}`,
  quote: story.quote,
  quotePortuguese: story.quotePortuguese,
  avatar: story.avatar,
  category: story.category,
  verificationBadges: story.verificationBadges,
  heritage: story.origin.split(',')[1]?.trim() || story.origin,
  flag: story.flag
}));

// Mobile-optimized event showcase data
const mobileEvents = [
  {
    title: "Kizomba Tonight",
    subtitle: "Sensual dancing • 8PM",
    location: "Stockwell",
    emoji: "💃",
    flag: "🇦🇴",
    attending: 47,
    type: "cultural"
  },
  {
    title: "Business Breakfast Tomorrow",
    subtitle: "Portuguese networking • 8AM",
    location: "Canary Wharf",
    emoji: "☕",
    flag: "🇵🇹",
    attending: 23,
    type: "business"
  },
  {
    title: "Fado This Weekend",
    subtitle: "Soulful music • Saturday",
    location: "Camden",
    emoji: "🎵",
    flag: "🇵🇹",
    attending: 65,
    type: "cultural"
  },
  {
    title: "Morna Soul Session",
    subtitle: "Cape Verdean blues • Sunday",
    location: "Vauxhall",
    emoji: "🎤",
    flag: "🇨🇻",
    attending: 32,
    type: "cultural"
  },
  {
    title: "Cachupa Cooking",
    subtitle: "Traditional cooking • Weekend",
    location: "Bermondsey",
    emoji: "🍽️",
    flag: "🇨🇻",
    attending: 18,
    type: "cultural"
  }
];

// Portuguese-speaking nations flags for mobile carousel
const portugueseNations = [
  { flag: "🇵🇹", name: "Portugal", namePort: "Portugal" },
  { flag: "🇧🇷", name: "Brazil", namePort: "Brasil" },
  { flag: "🇦🇴", name: "Angola", namePort: "Angola" },
  { flag: "🇲🇿", name: "Mozambique", namePort: "Moçambique" },
  { flag: "🇨🇻", name: "Cape Verde", namePort: "Cabo Verde" },
  { flag: "🇬🇼", name: "Guinea-Bissau", namePort: "Guiné-Bissau" },
  { flag: "🇸🇹", name: "São Tomé", namePort: "São Tomé e Príncipe" },
  { flag: "🇹🇱", name: "East Timor", namePort: "Timor-Leste" },
  { flag: "🇲🇴", name: "Macau", namePort: "Macau" },
  { flag: "🇬🇧", name: "UK Heritage", namePort: "Herança no Reino Unido" }
];

function SignupInner() {
  const { language, t } = useLanguage();
  const { subscriptionRequired } = useSubscription();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    password: "",
    confirmPassword: "",
    ageConfirmation: false,
    agreeTerms: false,
    portugueseOrigin: "",
    londonArea: "",
    languagePreference: "en",
    interests: [] as string[],
    referralCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [referralDiscount, setReferralDiscount] = useState<number | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showGrowthFeatures, setShowGrowthFeatures] = useState(false);
  const [onboardingData, setOnboardingData] = useState<any>(null);
  const [signupFocus, setSignupFocus] = useState<string>('community');
  const router = useRouter();

  // Check for referral code and focus parameter in URL on component mount
  useEffect(() => {
    const refCode = searchParams.get("ref");
    if (refCode) {
      setFormData((prev) => ({ ...prev, referralCode: refCode.toUpperCase() }));
    }

    // Handle wizard focus parameter to personalize signup form
    const focus = searchParams.get("focus");
    if (focus) {
      setSignupFocus(focus);
      // Pre-select relevant interests based on wizard response
      const focusInterests = {
        'dating': ['matches', 'cultural_events', 'social'],
        'community': ['cultural_events', 'community', 'social'],
        'business': ['networking', 'business', 'professional'],
        'student': ['education', 'student_support', 'academic']
      };
      const interests = focusInterests[focus as keyof typeof focusInterests] || [];
      setFormData((prev) => ({ ...prev, interests }));
    }

    // Capture origin param for attribution
    const origin = searchParams.get("origin");
    if (origin) {
      try {
        sessionStorage.setItem("lusotown_signup_origin", origin);
      } catch {}
    }

    // Preselect interests from query (?interests=fado,business)
    const interestsCsv = searchParams.get("interests");
    if (interestsCsv) {
      const parsed = interestsCsv
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (parsed.length) {
        setFormData((prev) => ({ ...prev, interests: Array.from(new Set([...
          prev.interests,
          ...parsed,
        ])) }));
      }
    }
  }, [searchParams]);

  // Real-time email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("");
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }

    if (!formData.password) {
      setError("Password is required");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (!formData.ageConfirmation) {
      setError("You must confirm you are 21 years old or older");
      return false;
    }

    if (!formData.agreeTerms) {
      setError("You must agree to the terms and conditions");
      return false;
    }

    return true;
  };

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
            // Don't show error for referral failure as signup was successful
          }
        }

        setSuccess(
          "Account created successfully! Please check your email to verify your account."
        );

        // Show referral success message if applicable
        if (referralDiscount) {
          setTimeout(() => {
            toast.success(
              language === "pt"
                ? "Bem-vindo! O seu desconto de 25% está ativo."
                : "Welcome! Your 25% discount is now active."
            );
          }, 1000);
        }

        // Show onboarding flow instead of redirecting immediately
        setTimeout(() => {
          setShowOnboarding(true);
        }, 1000);
      } else {
        setError(result.error || "Failed to create account");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPortuguese = language === "pt";

  // Mobile Event Carousel Component
  const MobileEventCarousel = () => (
    <div className="lg:hidden mb-6 -mx-4 sm:-mx-6">
      <h3 className="text-lg font-bold text-gray-900 mb-3 px-4 sm:px-6">
        🔥 This Week's Hot Events
      </h3>
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-4 sm:px-6 pb-2">
        {mobileEvents.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="min-w-[280px] max-w-[280px] snap-start bg-gradient-to-br from-white to-primary-50 rounded-xl shadow-lg p-4 border border-primary-100"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-xl">
                {event.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-gray-900 truncate">
                    {event.title}
                  </span>
                  <span className="text-xl">{event.flag}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{event.subtitle}</p>
                <p className="text-sm text-primary-600 font-medium">
                  📍 {event.location}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <span className="text-xs text-gray-500 font-medium">
                {event.attending} attending
              </span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                event.type === 'cultural' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {event.type === 'cultural' ? 'Culture' : 'Business'}
              </span>
            </div>
          </motion.div>
        ))}
        <div className="min-w-[120px] snap-start flex items-center justify-center">
          <button className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl transition-all">
            <span className="text-sm">See All</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Mobile Flag Carousel Component
  const MobileFlagCarousel = () => (
    <div className="lg:hidden mb-6">
      <div className="text-center mb-3">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          From 10 Countries 🌍 to One UK Community 🇬🇧
        </h3>
        <p className="text-sm text-gray-600">Swipe to explore Portuguese-speaking nations</p>
      </div>
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-2">
        {portugueseNations.map((nation, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="min-w-[100px] snap-start text-center"
          >
            <div className="w-16 h-16 mx-auto mb-2 bg-white rounded-full flex items-center justify-center text-3xl shadow-md border border-gray-200">
              {nation.flag}
            </div>
            <p className="text-xs font-medium text-gray-700 truncate">
              {isPortuguese ? nation.namePort : nation.name}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Mobile Testimonial Carousel Component
  const MobileTestimonialCarousel = () => (
    <div className="lg:hidden mt-6">
      <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">
        💬 Our Portuguese Community
      </h3>
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-2 pb-2">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="min-w-[300px] snap-start bg-white/60 backdrop-blur-sm rounded-xl border border-white/80 p-4 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <PortugueseAvatar
                src={testimonial.avatar}
                alt={testimonial.name}
                size="md"
                flag={testimonial.flag}
                heritage={testimonial.heritage}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{testimonial.name}</span>
                </div>
                <p className="text-xs text-gray-500">
                  {testimonial.age} • {testimonial.location} • {testimonial.heritage}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700 italic leading-relaxed">
              "{testimonial.quote}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );

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
    // Handle different growth actions
    switch (action) {
      case 'claim_welcome_bonus':
        toast.success(isPortuguese ? 'Bónus ativado!' : 'Bonus activated!');
        break;
      case 'student_verification_started':
        toast.success(isPortuguese ? 'Verificação iniciada!' : 'Verification started!');
        break;
      case 'referral_code_copied':
        toast.success(isPortuguese ? 'Código copiado!' : 'Code copied!');
        break;
      case 'start_premium_trial':
        toast.success(isPortuguese ? 'Teste iniciado!' : 'Trial started!');
        break;
      default:
        break;
    }
  };

  const handleGrowthFeaturesClose = () => {
    setShowGrowthFeatures(false);
    router.push("/signup/success");
  };

  // Get personalized messaging based on wizard focus
  const getPersonalizedMessage = () => {
    const messages = {
      dating: {
        title: "Find Your Portuguese Match",
        subtitle: "Connect with Portuguese speakers for dating and genuine relationships",
        icon: "❤️"
      },
      community: {
        title: "Join Our Cultural Community", 
        subtitle: "Connect with Portuguese speakers through events and cultural activities",
        icon: "🎭"
      },
      business: {
        title: "Grow Your Professional Network",
        subtitle: "Connect with Portuguese business professionals and entrepreneurs", 
        icon: "💼"
      },
      student: {
        title: "Connect with Portuguese Students",
        subtitle: "Find study partners and build your academic network",
        icon: "🎓"
      }
    };
    return messages[signupFocus as keyof typeof messages] || messages.community;
  };

  const personalizedMessage = getPersonalizedMessage();

  return (
    <main className="min-h-screen">
      <div className="pt-16">
        <section className="py-4 sm:py-8 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width w-full px-4 sm:px-6 lg:px-8">
            {/* Mobile Portuguese Nations Showcase */}
            <MobileFlagCarousel />
            
            {/* Mobile Events Carousel */}
            <MobileEventCarousel />
            
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
              {/* Left side - Benefits */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center shadow-lg">
                    <HeartIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    LusoTown
                  </span>
                </div>

                {/* Live Activity Badge */}
                <div className="mb-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 via-white to-red-100 border border-green-200 rounded-full px-4 py-3 shadow-lg mb-4"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm" />
                      <span className="text-sm font-bold text-gray-800">
                        🇵🇹 23 Portuguese speakers joined this week!
                      </span>
                    </div>
                  </motion.div>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-6 leading-tight">
                  <span className="text-3xl mb-2 block">{personalizedMessage.icon}</span>
                  <span className="bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
                    {personalizedMessage.title}
                  </span>{" "}
                  <span className="block sm:inline text-lg sm:text-xl lg:text-2xl text-gray-600 mt-2">
                    {personalizedMessage.subtitle}
                  </span>
                </h1>

                {/* Social Proof Stats */}
                <div className="space-y-4 mb-6">
                  <p className="text-xl xs:text-2xl sm:text-2xl text-gray-700 leading-relaxed font-medium">
                    <span className="font-bold text-green-600">750 Portuguese speakers</span> already connected • 
                    <span className="font-bold text-blue-600">23 joined this week</span>
                  </p>
                  
                  <div className="flex items-center gap-4 text-lg text-gray-600">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                      <span className="font-bold text-yellow-600">4.8★ from 890+ reviews</span>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    <span className="font-semibold text-red-600">Next event:</span> Chocolate Kizomba tonight at One Regent Street (85 attending)
                  </p>
                </div>

                {/* Chocolate Kizomba Cultural Integration */}
                <div className="bg-gradient-to-r from-amber-50 via-red-50 to-green-50 p-6 rounded-2xl border border-amber-200 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🇦🇴💃</div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Experience Authentic Kizomba - Angola's Sensual Dance Gift to the Portuguese-speaking World
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Whether you're single and looking to connect or wanting to celebrate our African Lusophone heritage, 
                        our partner event <strong>Chocolate Kizomba</strong> (@chocolatekizomba) welcomes all skill levels 
                        every <strong>Tuesday & Thursday at One Regent Street, 8pm-Late</strong>.
                      </p>
                      <div className="bg-white/70 p-4 rounded-lg border border-amber-200">
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Cultural Education:</strong> Kizomba originated in 1980s Angola, blending traditional Semba 
                          with Portuguese influences. Today it's the heartbeat of romantic connection across all Portuguese-speaking 
                          communities - from Luanda to London.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-amber-700">
                          <span className="font-semibold">🎵 Ana & Miguel met here → 🤵👰 Married 6 months later!</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-600 mb-3 leading-relaxed">
                  No barriers to community participation. Start free, explore events, and upgrade only when ready.
                </p>
                <p className="text-sm text-gray-500 mb-6 sm:mb-8 flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-green-500" />
                  No credit card required
                </p>

                <div className="space-y-3 sm:space-y-6 mb-6 sm:mb-8">
                  {benefits.map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.2 + index * 0.1,
                          duration: 0.6,
                        }}
                        className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/70"
                      >
                        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-gray-900 block text-sm sm:text-base">
                            <span className="sm:hidden">{benefit.mobileText}</span>
                            <span className="hidden sm:block">{benefit.text}</span>
                          </span>
                          <span className="text-xs sm:text-sm text-gray-600 leading-snug">
                            <span className="sm:hidden">{benefit.mobileSubtext}</span>
                            <span className="hidden sm:block">{benefit.subtext}</span>
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Trust Signals */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {trustSignals.map((signal, index) => {
                    const IconComponent = signal.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <IconComponent className="h-4 w-4 text-secondary-400" />
                        <span>{signal.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Cultural Verification Badges Preview */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ShieldCheckIcon className="h-5 w-5 text-green-600" />
                    Cultural Verification Badges
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {verificationBadges.slice(0, 6).map((badge) => (
                      <div
                        key={badge.id}
                        className="flex items-center gap-2 p-2 bg-white/60 rounded-lg border border-gray-200 text-xs"
                      >
                        <span className="text-lg">{badge.emoji}</span>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {badge.name}
                          </div>
                          <div className="text-gray-600 truncate">
                            {badge.type === 'business' ? 'Business Owner' : 
                             badge.type === 'heritage' ? 'Heritage Verified' :
                             badge.type === 'cultural' ? 'Cultural Leader' : 'Community Member'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    🌟 Earn badges by contributing to the Portuguese-speaking community
                  </p>
                </div>

                {/* Authentic Community Success Stories */}
                <div className="space-y-4 hidden lg:block">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <StarIcon className="h-5 w-5 text-yellow-500" />
                    Real Portuguese-speaking Community Success Stories
                  </h3>
                  {testimonials.slice(0, 3).map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.2 }}
                      className="flex items-start gap-3 p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-white/90 shadow-sm"
                    >
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover ring-2 ring-white shadow-sm flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{testimonial.flag}</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {testimonial.name}, {testimonial.age}
                          </span>
                          <span className="text-xs text-gray-500">
                            • {testimonial.location}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 italic mb-2 leading-relaxed">
                          "{testimonial.quote}"
                        </p>
                        <div className="flex items-center gap-1">
                          {testimonial.category === 'business' && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              💼 Business Success
                            </span>
                          )}
                          {testimonial.category === 'romance' && (
                            <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                              💕 Love & Connection
                            </span>
                          )}
                          {testimonial.category === 'cultural' && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              🎭 Cultural Leader
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div className="text-center pt-2">
                    <p className="text-xs text-gray-500">
                      📈 Join {communityStats.members}+ Portuguese speakers building success stories
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right side - Signup Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-1 lg:order-2"
              >
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/50">
                  <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                    <div className="inline-flex items-center gap-2 bg-green-50 rounded-full px-3 sm:px-4 py-2 text-green-600 font-medium mb-3 sm:mb-4 text-xs sm:text-sm">
                      <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      Free to Join
                    </div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                      <span className="sm:hidden">Join Free Today</span>
                      <span className="hidden sm:block">Start Free Today</span>
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm lg:text-base mb-3 sm:mb-4">
                      <span className="sm:hidden">750+ Members • Business & Romance • No barriers</span>
                      <span className="hidden sm:block">Free community access • No barriers to participation</span>
                    </p>

                    {/* Social Proof */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1 bg-gray-50 rounded-full px-2 py-1">
                        <UsersIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="font-medium">{communityStats.members}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-gray-50 rounded-full px-2 py-1">
                        <MapPinIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="font-medium hidden sm:inline">London & UK</span>
                        <span className="font-medium sm:hidden">UK</span>
                      </div>
                      <div className="flex items-center gap-1 bg-gray-50 rounded-full px-2 py-1">
                        <StarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                        <span className="font-medium">4.9★</span>
                      </div>
                    </div>
                  </div>

                  {/* Social Login Options */}
                  <div className="mb-6 sm:mb-8">
                    <p className="text-center text-sm text-gray-500 mb-4">
                      Quick signup with social media
                    </p>
                    <SocialLogin mode="signup" />
                    
                    {/* Demo Onboarding Button - Remove in production */}
                    {process.env.NODE_ENV === 'development' && (
                      <div className="mt-4 text-center">
                        <button
                          type="button"
                          onClick={() => setShowOnboarding(true)}
                          className="text-xs text-purple-600 hover:text-purple-700 underline"
                        >
                          🚀 Demo Onboarding Flow
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  {/* Success Display */}
                  {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <p className="text-sm text-green-700">{success}</p>
                    </div>
                  )}

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        <span className="sm:hidden">Email Address</span>
                        <span className="hidden sm:block">Professional Email Address</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        required
                        className={`w-full px-4 py-4 sm:py-3 text-base sm:text-sm border rounded-lg focus:ring-2 focus:border-transparent bg-white/90 backdrop-blur-sm disabled:opacity-50 transition-colors min-h-[48px] ${
                          emailError
                            ? "border-red-300 focus:ring-red-400"
                            : formData.email && !emailError
                            ? "border-green-300 focus:ring-green-400"
                            : "border-gray-300 focus:ring-primary-400"
                        }`}
                        placeholder="sarah@company.com"
                        autoComplete="email"
                        inputMode="email"
                      />
                      {emailError && (
                        <p className="mt-1 text-sm text-red-600">
                          {emailError}
                        </p>
                      )}
                      {formData.email && !emailError && (
                        <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                          <CheckIcon className="h-4 w-4" />
                          Valid email address
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        required
                        className="w-full px-4 py-4 sm:py-3 text-base sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90 backdrop-blur-sm disabled:opacity-50 min-h-[48px]"
                        placeholder="Sarah"
                        autoComplete="given-name"
                      />
                    </div>

                    {/* Referral Code Field */}
                    <div>
                      <label
                        htmlFor="referralCode"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <GiftIcon className="h-4 w-4 text-green-600" />
                          {language === "pt"
                            ? "Código de Indicação (Opcional)"
                            : "Referral Code (Optional)"}
                        </div>
                      </label>
                      <input
                        type="text"
                        id="referralCode"
                        name="referralCode"
                        value={formData.referralCode}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-4 sm:py-3 text-base sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white/90 backdrop-blur-sm disabled:opacity-50 uppercase min-h-[48px]"
                        placeholder={
                          language === "pt" ? "Ex: JOÃO1234" : "e.g., MARIA1234"
                        }
                        maxLength={20}
                      />
                      {formData.referralCode && (
                        <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                          <GiftIcon className="h-4 w-4" />
                          {language === "pt"
                            ? "Ganhe 25% de desconto no primeiro mês!"
                            : "Get 25% off your first month!"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        required
                        className="w-full px-4 py-4 sm:py-3 text-base sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90 backdrop-blur-sm disabled:opacity-50 min-h-[48px]"
                        placeholder="Enter a secure password"
                        autoComplete="new-password"
                        minLength={6}
                      />
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex gap-1 mb-1">
                            {[1, 2, 3, 4].map((level) => (
                              <div
                                key={level}
                                className={`h-2 flex-1 rounded-full transition-colors ${
                                  passwordStrength >= level
                                    ? passwordStrength <= 1
                                      ? "bg-red-400"
                                      : passwordStrength <= 2
                                      ? "bg-yellow-400"
                                      : passwordStrength <= 3
                                      ? "bg-blue-400"
                                      : "bg-green-400"
                                    : "bg-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <p
                            className={`text-xs ${
                              passwordStrength <= 1
                                ? "text-red-600"
                                : passwordStrength <= 2
                                ? "text-yellow-600"
                                : passwordStrength <= 3
                                ? "text-blue-600"
                                : "text-green-600"
                            }`}
                          >
                            {passwordStrength <= 1
                              ? "Weak password"
                              : passwordStrength <= 2
                              ? "Fair password"
                              : passwordStrength <= 3
                              ? "Good password"
                              : "Strong password"}
                          </p>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        At least 6 characters, mix of letters, numbers, and
                        symbols
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {t("signup.confirm-password", "Confirm Password")}
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        required
                        className="w-full px-4 py-4 sm:py-3 text-base sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90 backdrop-blur-sm disabled:opacity-50 min-h-[48px]"
                        placeholder={t(
                          "signup.confirm-password-placeholder",
                          "Confirm your password"
                        )}
                        autoComplete="new-password"
                        minLength={6}
                      />
                    </div>

                    {/* Portuguese-speaking community Onboarding */}
                    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 sm:p-6 rounded-xl border border-primary-100">
                      <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                        <div className="flex items-center gap-1">
                          <span title="Portugal">🇵🇹</span>
                          <span title="Brazil">🇧🇷</span>
                          <span title="Angola">🇦🇴</span>
                          <span title="Cape Verde">🇨🇻</span>
                          <span title="Mozambique">🇲🇿</span>
                        </div>
                        <span className="sm:hidden">Portuguese Community</span>
                        <span className="hidden sm:block">
                          {t(
                            "signup.portuguese-community",
                            "Join the Portuguese-speaking community"
                          )}
                        </span>
                      </h3>

                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label
                            htmlFor="portugueseOrigin"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            {t("signup.portuguese-origin", "Portuguese Origin")}
                          </label>
                          <select
                            id="portugueseOrigin"
                            name="portugueseOrigin"
                            value={formData.portugueseOrigin}
                            onChange={handleInputChange}
                            className="w-full px-4 py-4 sm:py-3 text-base sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90 min-h-[48px]"
                          >
                            <option value="">
                              {t(
                                "signup.select-origin",
                                "Select your origin (optional)"
                              )}
                            </option>
                            <option value="portugal">🇵🇹 Portugal</option>
                            <option value="brazil">🇧🇷 Brasil</option>
                            <option value="angola">🇦🇴 Angola</option>
                            <option value="mozambique">🇲🇿 Moçambique</option>
                            <option value="cape-verde">🇨🇻 Cabo Verde</option>
                            <option value="guinea-bissau">
                              🇬🇼 Guiné-Bissau
                            </option>
                            <option value="sao-tome">
                              🇸🇹 São Tomé e Príncipe
                            </option>
                            <option value="east-timor">🇹🇱 Timor-Leste</option>
                            <option value="macau">🇲🇴 Macau</option>
                            <option value="uk-born">
                              🇬🇧 United Kingdom-born with Portuguese heritage
                            </option>
                            <option value="other">
                              🌍 Other Portuguese-speaking background
                            </option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="londonArea"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            {t("signup.london-area", "London Area")}
                          </label>
                          <select
                            id="londonArea"
                            name="londonArea"
                            value={formData.londonArea}
                            onChange={handleInputChange}
                            className="w-full px-4 py-4 sm:py-3 text-base sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90 min-h-[48px]"
                          >
                            <option value="">
                              {t(
                                "signup.select-area",
                                "Select your area (optional)"
                              )}
                            </option>
                            <optgroup
                              label={t(
                                "signup.south-london",
                                "South London (Portuguese Areas)"
                              )}
                            >
                              <option value="stockwell">🇵🇹 Stockwell</option>
                              <option value="vauxhall">🏛️ Vauxhall</option>
                              <option value="elephant-castle">
                                🐘 Elephant & Castle
                              </option>
                              <option value="bermondsey">🏢 Bermondsey</option>
                              <option value="lambeth">🌉 Lambeth</option>
                            </optgroup>
                            <optgroup
                              label={t(
                                "signup.central-north",
                                "Central & North London"
                              )}
                            >
                              <option value="camden">🎵 Camden</option>
                              <option value="kensington">
                                🎨 South Kensington
                              </option>
                              <option value="westminster">
                                🏛️ Westminster
                              </option>
                              <option value="islington">📚 Islington</option>
                            </optgroup>
                            <optgroup
                              label={t("signup.other-areas", "Other Areas")}
                            >
                              <option value="east">📱 East London</option>
                              <option value="west">🌳 West London</option>
                              <option value="outside-london">
                                🚂 Outside London
                              </option>
                            </optgroup>
                          </select>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="languagePreference"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          {t(
                            "signup.language-preference",
                            "Preferred Language for Events"
                          )}
                        </label>
                        <select
                          id="languagePreference"
                          name="languagePreference"
                          value={formData.languagePreference}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90"
                        >
                          <option value="en">
                            🇬🇧 English (I prefer events in English)
                          </option>
                          <option value="pt">
                            🇵🇹 Português (I prefer events in Portuguese)
                          </option>
                          <option value="both">
                            🌍 Both (I'm comfortable with both languages)
                          </option>
                        </select>
                      </div>

                      {/* Interests */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          {t(
                            "signup.interests",
                            "What interests you? (Select all that apply)"
                          )}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {[
                            {
                              key: "fado",
                              label: "🎵 Fado",
                              description: "Traditional Portuguese music",
                            },
                            {
                              key: "food",
                              label: "🍽️ Portuguese Cuisine",
                              description: "Cooking and food events",
                            },
                            {
                              key: "professional",
                              label: "💼 Professional Networking",
                              description: "Career and business connections",
                            },
                            {
                              key: "language",
                              label: "🗣️ Language Exchange",
                              description: "Practice Portuguese/English",
                            },
                            {
                              key: "business",
                              label: "💼 Business Networking",
                              description: "Professional connections",
                            },
                            {
                              key: "culture",
                              label: "🏛️ Cultural Events",
                              description: "Festivals and celebrations",
                            },
                            {
                              key: "sports",
                              label: "⚽ Sports",
                              description: "Football and other sports",
                            },
                            {
                              key: "arts",
                              label: "🎨 Arts & Crafts",
                              description: "Creative activities",
                            },
                            {
                              key: "dance",
                              label: "💃 Dancing",
                              description: "Traditional and modern dance",
                            },
                            {
                              key: "youth",
                              label: "🎓 Young Professionals",
                              description: "20s-30s networking",
                            },
                            {
                              key: "seniors",
                              label: "👴 Seniors",
                              description: "50+ community activities",
                            },
                            {
                              key: "education",
                              label: "📚 Education",
                              description: "Learning and workshops",
                            },
                          ].map((interest) => (
                            <button
                              key={interest.key}
                              type="button"
                              onClick={() => handleInterestToggle(interest.key)}
                              className={`text-left p-3 sm:p-2 rounded-lg text-sm sm:text-xs transition-all min-h-[48px] sm:min-h-auto flex items-center justify-center sm:justify-start ${
                                formData.interests.includes(interest.key)
                                  ? "bg-primary-500 text-white shadow-md transform scale-105"
                                  : "bg-white/60 text-gray-700 hover:bg-white border border-gray-200 hover:shadow-sm"
                              }`}
                              title={interest.description}
                            >
                              {interest.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="ageConfirmation"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Community Guidelines
                      </label>
                      <div className="flex items-start p-3 sm:p-4 border border-gray-300 rounded-lg bg-white/90 backdrop-blur-sm min-h-[48px]">
                        <input
                          id="ageConfirmation"
                          name="ageConfirmation"
                          type="checkbox"
                          checked={formData.ageConfirmation}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          required
                          className="h-5 w-5 sm:h-4 sm:w-4 text-primary-400 focus:ring-primary-400 border-gray-300 rounded disabled:opacity-50 mt-0.5 sm:mt-0 flex-shrink-0"
                        />
                        <label
                          htmlFor="ageConfirmation"
                          className="ml-3 text-sm text-gray-700"
                        >
                          I agree to follow community guidelines and respect all
                          members regardless of age
                        </label>
                      </div>
                    </div>

                    {/* What to expect section */}
                    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl border border-primary-200">
                      <h3 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
                        🎉 {t("signup.what-happens-next", "What happens next?")}
                      </h3>
                      <div className="space-y-2 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">
                              1
                            </span>
                          </div>
                          <span>Instant access to free community features</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">
                              2
                            </span>
                          </div>
                          <span>
                            Browse and join Portuguese events in London
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">
                              3
                            </span>
                          </div>
                          <span>
                            Connect with {communityStats.members} Portuguese speakers for free
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">
                              4
                            </span>
                          </div>
                          <span>
                            Upgrade to VIP when ready for premium experiences
                          </span>
                        </div>
                      </div>

                      {/* Popular first events */}
                      <div className="mt-4 pt-3 border-t border-primary-200">
                        <p className="text-xs text-gray-600 mb-2 font-medium">
                          🔥{" "}
                          {t(
                            "signup.popular-first-events",
                            "Popular first events for new members:"
                          )}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          <span className="text-xs bg-white/60 text-gray-700 px-2 py-1 rounded-full">
                            💃🇦🇴 Chocolate Kizomba (One Regent Street)
                          </span>
                          <span className="text-xs bg-white/60 text-gray-700 px-2 py-1 rounded-full">
                            💼🇵🇹 Portuguese Business Breakfast (City)
                          </span>
                          <span className="text-xs bg-white/60 text-gray-700 px-2 py-1 rounded-full">
                            🍽️🌍 Lusophone Sunday Brunch (Vauxhall)
                          </span>
                          <span className="text-xs bg-white/60 text-gray-700 px-2 py-1 rounded-full">
                            🎵🇵🇹 Authentic Fado Night (Camden)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 sm:p-0">
                      <input
                        id="agreeTerms"
                        name="agreeTerms"
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        required
                        className="h-5 w-5 sm:h-4 sm:w-4 text-primary-400 focus:ring-primary-400 border-gray-300 rounded mt-1 flex-shrink-0 disabled:opacity-50"
                      />
                      <label
                        htmlFor="agreeTerms"
                        className="text-sm text-gray-700"
                      >
                        I agree to LusoTown's{" "}
                        <a
                          href="/terms"
                          className="text-primary-400 hover:text-primary-500 underline"
                        >
                          Terms of Service
                        </a>
                        ,{" "}
                        <a
                          href="/privacy"
                          className="text-primary-400 hover:text-primary-500 underline"
                        >
                          Privacy Policy
                        </a>
                        , and{" "}
                        <a
                          href="/community-guidelines"
                          className="text-primary-400 hover:text-primary-500 underline"
                        >
                          Community Guidelines
                        </a>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !!success}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer group py-4 sm:py-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-h-[56px] sm:min-h-auto"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2 text-lg sm:text-xl font-black">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="sm:hidden">Creating...</span>
                          <span className="hidden sm:block">Creating Account...</span>
                        </span>
                      ) : success ? (
                        <span className="flex items-center justify-center gap-2 text-lg sm:text-xl font-black">
                          <CheckIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                          <span className="sm:hidden">Created!</span>
                          <span className="hidden sm:block">Account Created!</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2 sm:gap-4 text-lg sm:text-xl font-black">
                          <span className="text-lg sm:text-xl">🇵🇹</span>
                          <span className="text-center leading-tight">
                            <span className="sm:hidden">Join 750+ Portuguese Speakers FREE</span>
                            <span className="hidden sm:block">Join 750+ Portuguese Speakers - FREE</span>
                          </span>
                          <span className="text-xl sm:text-2xl">→</span>
                        </span>
                      )}
                    </button>

                    {/* Security footer */}
                    <div className="text-center pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-3">
                        🔒 Your information is encrypted and never shared with
                        third parties
                      </p>
                      <p className="text-gray-600 text-sm">
                        Already a member?{" "}
                        <a
                          href={ROUTES.login}
                          className="text-primary-400 hover:text-primary-500 font-medium"
                        >
                          Sign into your account
                        </a>
                      </p>
                    </div>
                  </form>
                </div>

                {/* Mobile testimonial carousel */}
                <MobileTestimonialCarousel />

                {/* Legacy Mobile testimonials - keeping for fallback */}
                <div className="mt-6 space-y-3 lg:hidden hidden">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-white/80"
                    >
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 italic mb-1">
                          "{testimonial.quote}"
                        </p>
                        <p className="text-xs text-gray-500">
                          {testimonial.name}, {testimonial.age} •{" "}
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
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

export default function Signup() {
  return (
    <Suspense>
      <SignupInner />
    </Suspense>
  );
}
