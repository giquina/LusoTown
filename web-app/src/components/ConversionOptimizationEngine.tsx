"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ChartBarIcon, PlayIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

export default function ConversionOptimizationEngine() {
  const { t } = useLanguage();

  const metrics = [
    {
      label: t("conversion.signupRate") || "Signup Rate",
      value: "3.2%",
      trend: "+0.5%",
      icon: ChartBarIcon,
      positive: true
    },
    {
      label: t("conversion.engagementRate") || "Engagement Rate",
      value: "68%",
      trend: "+12%",
      icon: PlayIcon,
      positive: true
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <AdjustmentsHorizontalIcon className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          {t("conversion.title") || "Conversion Optimization"}
        </h2>
      </div>
      
      <div className="space-y-4">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{metric.label}</h3>
                  <p className="text-lg font-bold text-purple-600">{metric.value}</p>
                </div>
              </div>
              <span className={`text-sm font-medium ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                {metric.trend}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-purple-50 rounded-xl">
        <h3 className="font-semibold text-purple-900 mb-2">
          {t("conversion.recommendations") || "Recommendations"}
        </h3>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• {t("conversion.rec1") || "Optimize mobile onboarding flow"}</li>
          <li>• {t("conversion.rec2") || "A/B test Portuguese content placement"}</li>
          <li>• {t("conversion.rec3") || "Improve call-to-action visibility"}</li>
        </ul>
      </div>
    </div>
  );
}