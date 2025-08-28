"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { BoltIcon, DevicePhoneMobileIcon, CloudIcon } from "@heroicons/react/24/outline";

export default function PerformanceOptimization() {
  const { t } = useLanguage();

  const features = [
    {
      title: t("performance.fastLoading") || "Fast Loading",
      description: t("performance.fastLoadingDesc") || "Optimized for quick page loads",
      icon: BoltIcon
    },
    {
      title: t("performance.mobileOptimized") || "Mobile Optimized",
      description: t("performance.mobileOptimizedDesc") || "Perfect experience on all devices",
      icon: DevicePhoneMobileIcon
    },
    {
      title: t("performance.cloudPowered") || "Cloud Powered",
      description: t("performance.cloudPoweredDesc") || "Reliable global infrastructure",
      icon: CloudIcon
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {t("performance.title") || "Performance Features"}
      </h2>
      
      <div className="space-y-4">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}