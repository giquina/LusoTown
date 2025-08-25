"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPinIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";

interface LocationAwareEventsProps {
  onLocationUpdate?: (location: any) => void;
  onNearbyEvents?: (events: any[]) => void;
  maxDistance?: number;
  className?: string;
}

export default function LocationAwareEvents({
  onLocationUpdate,
  onNearbyEvents,
  maxDistance = 15,
  className = "",
}: LocationAwareEventsProps) {
  const { language } = useLanguage();
  const isPortuguese = language === "pt";
  const [locationPermission, setLocationPermission] = useState<string>("prompt");

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocationPermission("granted");
          if (onLocationUpdate) onLocationUpdate(location);
        },
        () => setLocationPermission("denied")
      );
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-4 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <MapPinIcon className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-bold text-gray-900">
          {isPortuguese ? "Eventos Próximos" : "Nearby Events"}
        </h3>
      </div>

      {locationPermission === "prompt" && (
        <div className="text-center py-4">
          <p className="text-gray-600 mb-4">
            {isPortuguese
              ? "Permita a localização para encontrar eventos próximos"
              : "Allow location to find nearby events"}
          </p>
          <motion.button
            onClick={requestLocation}
            className="bg-gradient-to-r from-green-500 to-red-500 text-white px-6 py-2 rounded-xl font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isPortuguese ? "Permitir Localização" : "Allow Location"}
          </motion.button>
        </div>
      )}

      {locationPermission === "granted" && (
        <div className="text-center py-4">
          <div className="text-green-600 mb-2">
            {isPortuguese ? "✅ Localização ativada" : "✅ Location enabled"}
          </div>
          <p className="text-sm text-gray-600">
            {isPortuguese
              ? "Procurando eventos portugueses próximos..."
              : "Finding nearby Portuguese events..."}
          </p>
        </div>
      )}

      {locationPermission === "denied" && (
        <div className="text-center py-4">
          <div className="text-gray-500 mb-2">
            {isPortuguese ? "📍 Localização não disponível" : "📍 Location not available"}
          </div>
          <p className="text-sm text-gray-600">
            {isPortuguese
              ? "Explore eventos por área de Londres"
              : "Explore events by London area"}
          </p>
        </div>
      )}
    </div>
  );
}
