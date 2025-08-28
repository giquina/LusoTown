"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function OnboardingFlowEnhanced() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">🇵🇹</span>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {t("onboarding.welcome") || "Welcome to LusoTown"}
        </h1>
        
        <p className="text-gray-600 mb-8">
          {t("onboarding.description") || "Join the Portuguese-speaking community in the United Kingdom"}
        </p>
        
        <div className="space-y-4">
          <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            {t("onboarding.getStarted") || "Get Started"}
          </button>
          
          <button className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors">
            {t("onboarding.learnMore") || "Learn More"}
          </button>
        </div>
      </div>
    </div>
  );
}