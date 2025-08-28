'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  PhoneIcon,
  ShieldCheckIcon,
  CurrencyPoundIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  StarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { 
  TRANSPORT_SERVICES, 
  UK_TRANSPORT_HUBS, 
  PORTUGUESE_AREAS,
  PUBLIC_TRANSPORT_GUIDES,
  TransportService,
  TransportHub,
  PortugueseArea,
  transportHelpers
} from '@/config/transport-services';
import { formatPrice } from '@/config/pricing';

interface TransportCoordinationProps {
  userLocation?: {
    lat: number;
    lng: number;
  };
  selectedEventId?: string;
  mode?: 'rideshare' | 'airport' | 'events' | 'university' | 'all';
}

interface BookingRequest {
  serviceId: string;
  from: string;
  to: string;
  date: string;
  time: string;
  passengers: number;
  additionalOptions: string[];
  contactInfo: {
    name: string;
    phone: string;
    email: string;
    emergencyContact: string;
  };
  specialRequests?: string;
}

export default function TransportCoordination({
  userLocation,
  selectedEventId,
  mode = 'all'
}: TransportCoordinationProps) {
  const { t, language } = useLanguage();
  const isPortuguese = language === 'pt';
  
  const [selectedService, setSelectedService] = useState<TransportService | null>(null);
  const [nearbyAreas, setNearbyAreas] = useState<PortugueseArea[]>([]);
  const [nearestHub, setNearestHub] = useState<TransportHub | null>(null);
  const [activeTab, setActiveTab] = useState<'services' | 'guides' | 'areas'>('services');
  const [bookingRequest, setBookingRequest] = useState<BookingRequest | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  // Filter services based on mode
  const filteredServices = TRANSPORT_SERVICES.filter(service => {
    if (mode === 'all') return true;
    return service.type === mode || 
           (mode === 'rideshare' && service.type === 'rideshare') ||
           (mode === 'airport' && service.type === 'airport_transfer') ||
           (mode === 'events' && service.type === 'event_transport') ||
           (mode === 'university' && service.type === 'university_shuttle');
  });

  useEffect(() => {
    if (userLocation) {
      const areas = transportHelpers.findPortugueseAreasNearLocation(userLocation, 15);
      setNearbyAreas(areas);
      
      const hub = transportHelpers.findNearestHub(userLocation);
      setNearestHub(hub);
    }
  }, [userLocation]);

  const handleServiceSelect = (service: TransportService) => {
    setSelectedService(service);
    
    // Calculate estimated price
    if (userLocation && nearestHub) {
      const distance = transportHelpers.calculateDistance(userLocation, nearestHub.location);
      const pricing = transportHelpers.calculateTransportPrice(service.id, distance, 1);
      setEstimatedPrice(pricing.totalPrice);
    }
  };

  const handleBookingRequest = (service: TransportService) => {
    setBookingRequest({
      serviceId: service.id,
      from: '',
      to: '',
      date: '',
      time: '',
      passengers: 1,
      additionalOptions: [],
      contactInfo: {
        name: '',
        phone: '',
        email: '',
        emergencyContact: ''
      }
    });
    setShowBookingForm(true);
  };

  const formatServicePricing = (service: TransportService) => {
    const price = formatPrice(service.pricing.basePrice);
    const unit = service.pricing.unit === 'per_hour' ? (isPortuguese ? '/hora' : '/hour') :
                 service.pricing.unit === 'per_trip' ? (isPortuguese ? '/viagem' : '/trip') :
                 service.pricing.unit === 'per_person' ? (isPortuguese ? '/pessoa' : '/person') :
                 '';
    return `${price}${unit}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
          {isPortuguese ? 'Coordenação de Transporte Comunitário' : 'Community Transport Coordination'}
        </h1>
        <p className="text-lg text-primary-700 max-w-3xl mx-auto">
          {isPortuguese 
            ? 'Conecte-se com transporte seguro e confiável para a comunidade de língua portuguesa em todo o Reino Unido'
            : 'Connect with safe and reliable transport for the Portuguese-speaking community across the UK'
          }
        </p>
      </div>

      {/* Location Status */}
      {userLocation && (nearbyAreas.length > 0 || nearestHub) && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-4">
            <MapPinIcon className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-primary-900 mb-2">
                {isPortuguese ? 'Sua Localização' : 'Your Location'}
              </h3>
              
              {nearbyAreas.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm text-primary-700 mb-2">
                    {isPortuguese ? 'Áreas Portuguesas Próximas:' : 'Nearby Portuguese Areas:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {nearbyAreas.slice(0, 3).map(area => (
                      <span 
                        key={area.id}
                        className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                      >
                        {isPortuguese ? area.namePt : area.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {nearestHub && (
                <div>
                  <p className="text-sm text-primary-700 mb-1">
                    {isPortuguese ? 'Centro de Transporte Mais Próximo:' : 'Nearest Transport Hub:'}
                  </p>
                  <p className="font-medium text-primary-900">
                    {isPortuguese ? nearestHub.namePt : nearestHub.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'services', labelEn: 'Transport Services', labelPt: 'Serviços de Transporte' },
            { id: 'guides', labelEn: 'Public Transport Guides', labelPt: 'Guias de Transporte Público' },
            { id: 'areas', labelEn: 'Portuguese Areas', labelPt: 'Áreas Portuguesas' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {isPortuguese ? tab.labelPt : tab.labelEn}
            </button>
          ))}
        </nav>
      </div>

      <AnimatePresence mode="wait">
        {/* Transport Services Tab */}
        {activeTab === 'services' && (
          <motion.div
            key="services"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredServices.map(service => (
                <motion.div
                  key={service.id}
                  layout
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleServiceSelect(service)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {isPortuguese ? service.namePt : service.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {isPortuguese ? service.descriptionPt : service.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary-600">
                          {formatServicePricing(service)}
                        </p>
                        {service.pricing.minimumCharge && (
                          <p className="text-xs text-gray-500">
                            {isPortuguese ? 'Min. ' : 'Min. '}{formatPrice(service.pricing.minimumCharge)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Service Type Badge */}
                    <div className="flex items-center mb-3">
                      {service.type === 'rideshare' && <UsersIcon className="w-4 h-4 mr-2" />}
                      {service.type === 'airport_transfer' && <GlobeAltIcon className="w-4 h-4 mr-2" />}
                      {service.type === 'event_transport' && <CalendarDaysIcon className="w-4 h-4 mr-2" />}
                      {service.type === 'university_shuttle' && <AcademicCapIcon className="w-4 h-4 mr-2" />}
                      <span className="text-xs text-gray-500 capitalize">
                        {service.type.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Key Features */}
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-700 mb-2">
                        {isPortuguese ? 'Principais Características:' : 'Key Features:'}
                      </p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {(isPortuguese ? service.featuresPt : service.features).slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircleIcon className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center text-xs text-gray-500 mb-4">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      {service.availability.hours.start} - {service.availability.hours.end}
                      <span className="mx-2">•</span>
                      {service.coverage.maxDistance}km {isPortuguese ? 'raio' : 'radius'}
                    </div>

                    {/* Safety Features */}
                    <div className="flex items-center mb-4">
                      <ShieldCheckIcon className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-xs text-gray-600">
                        {(isPortuguese ? service.safetyFeaturesPt : service.safetyFeatures).length} {isPortuguese ? 'recursos de segurança' : 'safety features'}
                      </span>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookingRequest(service);
                      }}
                      className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                    >
                      {isPortuguese ? 'Solicitar Transporte' : 'Request Transport'}
                      <ArrowRightIcon className="w-4 h-4 inline ml-2" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Public Transport Guides Tab */}
        {activeTab === 'guides' && (
          <motion.div
            key="guides"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Object.entries(PUBLIC_TRANSPORT_GUIDES).map(([cityId, guide]) => (
                <div key={cityId} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {isPortuguese ? guide.namePt : guide.name}
                  </h3>
                  
                  {/* Transport Zones */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-3">
                      {isPortuguese ? 'Zonas de Transporte' : 'Transport Zones'}
                    </h4>
                    {Object.entries(guide.zones).map(([zoneId, zone]) => (
                      <div key={zoneId} className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <h5 className="font-medium text-gray-800 mb-2">
                          {isPortuguese ? zone.namePt : zone.name}
                        </h5>
                        <p className="text-sm text-gray-600 mb-3">
                          {isPortuguese ? 'Áreas Portuguesas: ' : 'Portuguese Areas: '}
                          {zone.portugueseAreas.join(', ')}
                        </p>
                        <div className="text-sm">
                          <p className="font-medium text-gray-700 mb-1">
                            {isPortuguese ? 'Recomendações de Bilhetes:' : 'Ticket Recommendations:'}
                          </p>
                          <ul className="text-gray-600 space-y-1">
                            <li>• <strong>{isPortuguese ? 'Turista:' : 'Tourist:'}</strong> {zone.ticketRecommendations.tourist}</li>
                            <li>• <strong>{isPortuguese ? 'Residente:' : 'Resident:'}</strong> {zone.ticketRecommendations.resident}</li>
                            <li>• <strong>{isPortuguese ? 'Estudante:' : 'Student:'}</strong> {zone.ticketRecommendations.student}</li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Tips */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">
                      {isPortuguese ? 'Dicas Úteis' : 'Useful Tips'}
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      {(isPortuguese ? guide.tipsPt : guide.tips).map((tip, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircleIcon className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Portuguese Areas Tab */}
        {activeTab === 'areas' && (
          <motion.div
            key="areas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PORTUGUESE_AREAS.map(area => (
                <div key={area.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {isPortuguese ? area.namePt : area.name}
                      </h3>
                      <p className="text-sm text-gray-600">{area.city}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary-600">
                        {area.demographics.portuguesePopulation.toLocaleString()} {isPortuguese ? 'residentes' : 'residents'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {area.demographics.businessCount} {isPortuguese ? 'negócios' : 'businesses'}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-4">
                    {isPortuguese ? area.culturalSignificancePt : area.culturalSignificance}
                  </p>

                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">
                      {isPortuguese ? 'Países Principais:' : 'Primary Countries:'}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {area.demographics.primaryCountries.map(country => (
                        <span key={country} className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded">
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-600">
                      {isPortuguese ? 'Ligações de Transporte: ' : 'Transport Connections: '}
                      {area.transportConnections.length} {isPortuguese ? 'centros' : 'hubs'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {isPortuguese ? selectedService.namePt : selectedService.name}
                    </h2>
                    <p className="text-gray-600">
                      {isPortuguese ? selectedService.descriptionPt : selectedService.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Pricing Details */}
                <div className="bg-primary-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-primary-900 mb-3">
                    {isPortuguese ? 'Detalhes de Preço' : 'Pricing Details'}
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <span>{isPortuguese ? 'Preço Base:' : 'Base Price:'}</span>
                    <span className="font-bold">{formatServicePricing(selectedService)}</span>
                  </div>
                  {selectedService.pricing.minimumCharge && (
                    <div className="flex items-center justify-between mb-2">
                      <span>{isPortuguese ? 'Cobrança Mínima:' : 'Minimum Charge:'}</span>
                      <span>{formatPrice(selectedService.pricing.minimumCharge)}</span>
                    </div>
                  )}
                  {estimatedPrice && (
                    <div className="flex items-center justify-between pt-2 border-t border-primary-200">
                      <span className="font-medium">{isPortuguese ? 'Preço Estimado:' : 'Estimated Price:'}</span>
                      <span className="font-bold text-primary-600">{formatPrice(estimatedPrice)}</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {isPortuguese ? 'Características' : 'Features'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(isPortuguese ? selectedService.featuresPt : selectedService.features).map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Safety Features */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {isPortuguese ? 'Recursos de Segurança' : 'Safety Features'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(isPortuguese ? selectedService.safetyFeaturesPt : selectedService.safetyFeatures).map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <ShieldCheckIcon className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Requirements */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {isPortuguese ? 'Requisitos de Reserva' : 'Booking Requirements'}
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    {(isPortuguese ? selectedService.bookingRequirementsPt : selectedService.bookingRequirements).map((req, idx) => (
                      <li key={idx} className="flex items-start">
                        <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      handleBookingRequest(selectedService);
                      setSelectedService(null);
                    }}
                    className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    {isPortuguese ? 'Solicitar Transporte' : 'Request Transport'}
                  </button>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {isPortuguese ? 'Fechar' : 'Close'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emergency Contact */}
      <div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <PhoneIcon className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-900 mb-2">
              {isPortuguese ? 'Contacto de Emergência' : 'Emergency Contact'}
            </h3>
            <p className="text-red-700 mb-2">
              {isPortuguese 
                ? 'Para emergências de transporte ou questões de segurança:'
                : 'For transport emergencies or safety concerns:'
              }
            </p>
            <p className="font-bold text-red-900">+44 20 7946 0958</p>
            <p className="text-sm text-red-600">
              {isPortuguese ? 'Disponível 24/7 em Português, Inglês e Espanhol' : 'Available 24/7 in Portuguese, English and Spanish'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}