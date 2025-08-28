"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { GiftIcon, UserPlusIcon, CurrencyPoundIcon } from "@heroicons/react/24/outline";

export default function ReferralDashboard() {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
          <GiftIcon className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          {t("referrals.title") || "Referral Program"}
        </h2>
      </div>
      
      <div className="space-y-4">
        <div className="bg-primary-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-primary-900">
                {t("referrals.totalReferred") || "Total Referred"}
              </h3>
              <p className="text-2xl font-bold text-primary-600">12</p>
            </div>
            <UserPlusIcon className="w-8 h-8 text-primary-600" />
          </div>
        </div>
        
        <div className="bg-green-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-900">
                {t("referrals.totalEarned") || "Total Earned"}
              </h3>
              <p className="text-2xl font-bold text-green-600">£48</p>
            </div>
            <CurrencyPoundIcon className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>
      
      <button className="w-full mt-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-opacity">
        {t("referrals.inviteFriends") || "Invite Friends"}
      </button>
    </div>
  );
}