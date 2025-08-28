"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ChartBarIcon, UserGroupIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export default function NetworkAnalytics() {
  const { t } = useLanguage();

  const stats = [
    {
      label: t("network.totalConnections") || "Total Connections",
      value: "127",
      icon: UserGroupIcon,
      color: "from-blue-500 to-cyan-500"
    },
    {
      label: t("network.activeMembers") || "Active Members",
      value: "89",
      icon: GlobeAltIcon,
      color: "from-green-500 to-teal-500"
    },
    {
      label: t("network.monthlyGrowth") || "Monthly Growth",
      value: "+12%",
      icon: ChartBarIcon,
      color: "from-primary-500 to-secondary-500"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {t("network.analytics") || "Network Analytics"}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}