"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SparklesIcon, StarIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function SmartRecommendations() {
  const { t } = useLanguage();

  const recommendations = [
    {
      id: 1,
      title: t("recommendations.events") || "Portuguese Cultural Events",
      description: t("recommendations.eventsDesc") || "Discover local Fado nights and cultural celebrations",
      icon: SparklesIcon,
      color: "from-primary-500 to-secondary-500"
    },
    {
      id: 2,
      title: t("recommendations.businesses") || "Portuguese Businesses",
      description: t("recommendations.businessesDesc") || "Find authentic Portuguese restaurants and services",
      icon: StarIcon,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      title: t("recommendations.community") || "Community Groups",
      description: t("recommendations.communityDesc") || "Connect with Portuguese-speaking professionals",
      icon: MapPinIcon,
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
          <SparklesIcon className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          {t("recommendations.title") || "Smart Recommendations"}
        </h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        {t("recommendations.subtitle") || "Personalized suggestions for the Portuguese community"}
      </p>
      
      <div className="space-y-4">
        {recommendations.map((rec) => {
          const IconComponent = rec.icon;
          return (
            <div key={rec.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className={`w-8 h-8 bg-gradient-to-r ${rec.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <IconComponent className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {rec.title}
                </h3>
                <p className="text-xs text-gray-600">
                  {rec.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="w-full mt-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-opacity">
        {t("recommendations.viewAll") || "View All Recommendations"}
      </button>
    </div>
  );
}