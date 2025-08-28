"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CpuChipIcon, UserGroupIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function BusinessNetworkingAlgorithm() {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <CpuChipIcon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          {t("networkingAlgorithm.title") || "Smart Networking"}
        </h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        {t("networkingAlgorithm.description") || "Our algorithm matches Portuguese professionals based on compatibility"}
      </p>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
          <UserGroupIcon className="w-5 h-5 text-blue-600" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900">
              {t("networkingAlgorithm.compatibility") || "Professional Compatibility"}
            </h3>
            <p className="text-xs text-blue-700">
              {t("networkingAlgorithm.compatibilityDesc") || "Based on industry and interests"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
          <MapPinIcon className="w-5 h-5 text-purple-600" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-purple-900">
              {t("networkingAlgorithm.location") || "Location-Based"}
            </h3>
            <p className="text-xs text-purple-700">
              {t("networkingAlgorithm.locationDesc") || "Connect with nearby professionals"}
            </p>
          </div>
        </div>
      </div>
      
      <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-opacity">
        {t("networkingAlgorithm.findMatches") || "Find Matches"}
      </button>
    </div>
  );
}