"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { HeartIcon, UserGroupIcon, MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

export default function EnhancedMatchDashboard() {
  const { t } = useLanguage();

  const mockMatches = [
    {
      id: 1,
      name: "Maria Santos",
      age: 28,
      location: "London",
      heritage: "Portugal",
      interests: ["Fado", "Football", "Cuisine"],
      compatibility: 92
    },
    {
      id: 2,
      name: "João Silva",
      age: 35,
      location: "Manchester",
      heritage: "Brazil",
      interests: ["Music", "Football", "Travel"],
      compatibility: 87
    }
  ];

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <HeartSolidIcon className="w-8 h-8" />
          <h1 className="text-2xl font-bold">
            {t("matches.dashboard.title") || "Your Matches"}
          </h1>
        </div>
        <p className="text-primary-100">
          {t("matches.dashboard.subtitle") || "Connect with Portuguese speakers in your area"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <HeartIcon className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">12</h3>
              <p className="text-sm text-gray-600">
                {t("matches.stats.newMatches") || "New Matches"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <UserGroupIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">5</h3>
              <p className="text-sm text-gray-600">
                {t("matches.stats.conversations") || "Active Chats"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CalendarDaysIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">3</h3>
              <p className="text-sm text-gray-600">
                {t("matches.stats.meetups") || "Planned Meetups"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Match Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          {t("matches.suggested.title") || "Suggested Matches"}
        </h2>
        
        {mockMatches.map((match) => (
          <div key={match.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {match.name.charAt(0)}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {match.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{match.location}</span>
                    <span>•</span>
                    <span>{match.heritage}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {match.interests.map((interest) => (
                      <span
                        key={interest}
                        className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" 
                        style={{ width: `${match.compatibility}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      {match.compatibility}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <HeartIcon className="w-5 h-5 text-gray-600" />
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
                  {t("matches.connect") || "Connect"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}