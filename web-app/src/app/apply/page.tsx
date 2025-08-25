"use client";

import { useRouter } from "next/navigation";
import OnboardingFlowEnhanced from "@/components/OnboardingFlowEnhanced";
import { ROUTES } from "@/config/routes";
import { useLanguage } from "@/context/LanguageContext";

export default function ApplyPage() {
  const router = useRouter();
  const { language } = useLanguage();

  const routeFromData = (data: any) => {
    // Map onboarding data to signup focus
    const role = (data?.role || "community").toString();
    const interests: string[] = Array.isArray(data?.interests) ? data.interests : [];

    // Basic mapping to maintain previous behavior
    if (role === "student") return `${ROUTES.signup}?focus=student`;
    if (role === "professional" || role === "organizer") return `${ROUTES.signup}?focus=business`;
    if (role === "social" || interests.includes("social_connections")) return `${ROUTES.signup}?focus=community`;
    if (interests.includes("business-networking")) return `${ROUTES.signup}?focus=business`;
    if (interests.includes("cultural-events")) return `${ROUTES.signup}?focus=community`;
    return ROUTES.signup;
  };

  const handleComplete = (data: any) => {
    // Mark onboarding complete for this session
    try {
      localStorage.setItem("lusotown-onboarding-completed", "true");
    } catch {}
    const dest = routeFromData(data);
    router.push(dest);
  };

  const handleSkip = () => {
    router.push(ROUTES.signup);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-5xl mx-auto">
          <OnboardingFlowEnhanced onComplete={handleComplete} onSkip={handleSkip} variant="welcome" />
        </div>
      </div>
    </main>
  );
}
