"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { BuildingOffice2Icon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function BusinessNetworkingMatch() {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
          <BuildingOffice2Icon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          {t("businessNetworking.title") || "Business Networking"}
        </h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        {t("businessNetworking.description") || "Connect with Portuguese business professionals in your area"}
      </p>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl">
          <UserGroupIcon className="w-5 h-5 text-primary-600" />
          <span className="text-sm text-primary-800">
            {t("businessNetworking.findConnections") || "Find professional connections"}
          </span>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-secondary-50 rounded-xl">
          <BuildingOffice2Icon className="w-5 h-5 text-secondary-600" />
          <span className="text-sm text-secondary-800">
            {t("businessNetworking.joinEvents") || "Join business events"}
          </span>
        </div>
      </div>
      
      <button className="w-full mt-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-opacity">
        {t("businessNetworking.startNetworking") || "Start Networking"}
      </button>
    </div>
  );
}