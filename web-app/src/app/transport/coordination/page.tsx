'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { TransportCoordination } from '@/components/transport';
import Footer from '@/components/Footer';

interface TransportCoordinationPageProps {
  searchParams?: {
    mode?: string;
    eventId?: string;
  };
}

export default function TransportCoordinationPage({
  searchParams = {}
}: TransportCoordinationPageProps) {
  const { t, language } = useLanguage();
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | undefined>();
  const [locationError, setLocationError] = useState<string | null>(null);

  // Get user's location for nearby services
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn('Geolocation error:', error);
          setLocationError(error.message);
          
          // Default to Central London coordinates if geolocation fails
          setUserLocation({
            lat: 51.5074,
            lng: -0.1278
          });
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      // Default to Central London if geolocation not supported
      setUserLocation({
        lat: 51.5074,
        lng: -0.1278
      });
    }
  }, []);

  const mode = searchParams.mode as 'rideshare' | 'airport' | 'events' | 'university' | 'all' | undefined;
  const selectedEventId = searchParams.eventId;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO and Page Metadata */}
      <head>
        <title>
          {language === 'pt' 
            ? 'Coordenação de Transporte Comunitário - LusoTown'
            : 'Community Transport Coordination - LusoTown'
          }
        </title>
        <meta 
          name="description" 
          content={
            language === 'pt'
              ? 'Conecte-se com transporte seguro e confiável para a comunidade de língua portuguesa em todo o Reino Unido. Partilha de viagens, transferências de aeroporto, eventos culturais e muito mais.'
              : 'Connect with safe and reliable transport for the Portuguese-speaking community across the UK. Rideshare, airport transfers, cultural events and more.'
          }
        />
        <meta 
          name="keywords" 
          content={
            language === 'pt'
              ? 'transporte português Reino Unido, partilha viagens comunidade, transferência aeroporto português, eventos culturais transporte'
              : 'Portuguese transport UK, community rideshare, Portuguese airport transfer, cultural events transport'
          }
        />
      </head>

      {/* Main Content */}
      <main>
        <TransportCoordination
          userLocation={userLocation}
          selectedEventId={selectedEventId}
          mode={mode || 'all'}
        />
      </main>

      {/* Location Error Notice */}
      {locationError && (
        <div className="fixed bottom-4 right-4 max-w-sm bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg z-50">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                {language === 'pt' ? 'Localização Indisponível' : 'Location Unavailable'}
              </h3>
              <div className="mt-1 text-sm text-yellow-700">
                <p>
                  {language === 'pt'
                    ? 'Usando localização padrão de Londres. Pode ainda solicitar transporte para qualquer local no Reino Unido.'
                    : 'Using default London location. You can still request transport to any UK location.'
                  }
                </p>
              </div>
              <div className="mt-2">
                <button
                  onClick={() => setLocationError(null)}
                  className="text-sm font-medium text-yellow-800 hover:text-yellow-900"
                >
                  {language === 'pt' ? 'Fechar' : 'Dismiss'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}