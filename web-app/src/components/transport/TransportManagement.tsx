'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  CurrencyPoundIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice } from '@/config/pricing';

interface TransportRequest {
  id: string;
  service_type: string;
  pickup_location: {
    address: string;
    coordinates: [number, number];
  };
  dropoff_location: {
    address: string;
    coordinates: [number, number];
  };
  scheduled_datetime: string;
  passenger_count: number;
  estimated_price: number;
  contact_info: {
    name: string;
    phone: string;
    email: string;
  };
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  driver?: {
    name: string;
    phone: string;
    vehicle_info: {
      make: string;
      model: string;
      color: string;
      license_plate: string;
    };
    rating: number;
  };
  created_at: string;
}

export default function TransportManagement() {
  const { t, language } = useLanguage();
  const isPortuguese = language === 'pt';
  
  const [requests, setRequests] = useState<TransportRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<TransportRequest | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');

  useEffect(() => {
    fetchTransportRequests();
  }, []);

  const fetchTransportRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/transport?action=requests');
      if (response.ok) {
        const data = await response.json();
        setRequests(data.requests || []);
      } else {
        console.error('Failed to fetch transport requests');
      }
    } catch (error) {
      console.error('Error fetching transport requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/transport', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId,
          status: newStatus
        })
      });

      if (response.ok) {
        await fetchTransportRequests();
        setSelectedRequest(null);
      } else {
        console.error('Failed to update request status');
      }
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  const filteredRequests = requests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'in_progress': return 'text-purple-600 bg-purple-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: isPortuguese ? 'Pendente' : 'Pending',
      confirmed: isPortuguese ? 'Confirmado' : 'Confirmed',
      in_progress: isPortuguese ? 'Em Progresso' : 'In Progress',
      completed: isPortuguese ? 'Concluído' : 'Completed',
      cancelled: isPortuguese ? 'Cancelado' : 'Cancelled'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getServiceTypeLabel = (serviceType: string) => {
    const labels = {
      community_rideshare: isPortuguese ? 'Partilha Comunitária' : 'Community Rideshare',
      airport_transfer: isPortuguese ? 'Transferência Aeroporto' : 'Airport Transfer',
      cultural_events: isPortuguese ? 'Eventos Culturais' : 'Cultural Events',
      university_shuttle: isPortuguese ? 'Shuttle Universitário' : 'University Shuttle'
    };
    return labels[serviceType as keyof typeof labels] || serviceType;
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 mb-4 shadow-sm border">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary-900">
          {isPortuguese ? 'Gestão de Transporte' : 'Transport Management'}
        </h1>
        
        {/* Filter Buttons */}
        <div className="flex space-x-2">
          {(['all', 'pending', 'confirmed', 'completed'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'all' 
                ? (isPortuguese ? 'Todos' : 'All')
                : getStatusLabel(status)
              }
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { 
            label: isPortuguese ? 'Total Pedidos' : 'Total Requests', 
            value: requests.length, 
            color: 'bg-blue-500' 
          },
          { 
            label: isPortuguese ? 'Pendentes' : 'Pending', 
            value: requests.filter(r => r.status === 'pending').length, 
            color: 'bg-yellow-500' 
          },
          { 
            label: isPortuguese ? 'Confirmados' : 'Confirmed', 
            value: requests.filter(r => r.status === 'confirmed').length, 
            color: 'bg-green-500' 
          },
          { 
            label: isPortuguese ? 'Concluídos' : 'Completed', 
            value: requests.filter(r => r.status === 'completed').length, 
            color: 'bg-primary-500' 
          }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${stat.color} mr-3`}></div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transport Requests List */}
      {filteredRequests.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {isPortuguese 
              ? 'Nenhum pedido de transporte encontrado.'
              : 'No transport requests found.'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <motion.div
              key={request.id}
              layout
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {getServiceTypeLabel(request.service_type)}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                      {getStatusLabel(request.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <UserIcon className="w-4 h-4 mr-2" />
                      {request.contact_info.name}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      {new Date(request.scheduled_datetime).toLocaleDateString(language)}
                      {' '}
                      {new Date(request.scheduled_datetime).toLocaleTimeString(language, { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                    <div className="flex items-center">
                      <CurrencyPoundIcon className="w-4 h-4 mr-2" />
                      {formatPrice(request.estimated_price)}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedRequest(request)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    title={isPortuguese ? 'Ver detalhes' : 'View details'}
                  >
                    <EyeIcon className="w-4 h-4" />
                  </button>
                  
                  {request.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateRequestStatus(request.id, 'confirmed')}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                        title={isPortuguese ? 'Confirmar' : 'Confirm'}
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateRequestStatus(request.id, 'cancelled')}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title={isPortuguese ? 'Cancelar' : 'Cancel'}
                      >
                        <XCircleIcon className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  
                  {request.status === 'confirmed' && (
                    <button
                      onClick={() => updateRequestStatus(request.id, 'in_progress')}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title={isPortuguese ? 'Iniciar viagem' : 'Start trip'}
                    >
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                    </button>
                  )}
                  
                  {request.status === 'in_progress' && (
                    <button
                      onClick={() => updateRequestStatus(request.id, 'completed')}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      title={isPortuguese ? 'Concluir viagem' : 'Complete trip'}
                    >
                      <CheckCircleIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Route Information */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <MapPinIcon className="w-4 h-4 text-green-600 mr-1" />
                      <span className="font-medium text-green-700">
                        {isPortuguese ? 'Recolha:' : 'Pickup:'}
                      </span>
                    </div>
                    <p className="pl-5">{request.pickup_location.address}</p>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <MapPinIcon className="w-4 h-4 text-red-600 mr-1" />
                      <span className="font-medium text-red-700">
                        {isPortuguese ? 'Destino:' : 'Drop-off:'}
                      </span>
                    </div>
                    <p className="pl-5">{request.dropoff_location.address}</p>
                  </div>
                </div>
              </div>
              
              {/* Driver Information (if assigned) */}
              {request.driver && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-blue-900">
                        {isPortuguese ? 'Motorista Atribuído:' : 'Assigned Driver:'}
                      </p>
                      <p className="text-blue-700">{request.driver.name}</p>
                      <p className="text-sm text-blue-600">
                        {request.driver.vehicle_info.color} {request.driver.vehicle_info.make} {request.driver.vehicle_info.model}
                        {' '}({request.driver.vehicle_info.license_plate})
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-blue-900 font-medium">{request.driver.rating.toFixed(1)}</span>
                      </div>
                      <p className="text-sm text-blue-600">
                        <PhoneIcon className="w-4 h-4 inline mr-1" />
                        {request.driver.phone}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isPortuguese ? 'Detalhes do Pedido' : 'Request Details'}
                </h2>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Request Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {isPortuguese ? 'Informação do Serviço' : 'Service Information'}
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p><strong>{isPortuguese ? 'Tipo:' : 'Type:'}</strong> {getServiceTypeLabel(selectedRequest.service_type)}</p>
                    <p><strong>{isPortuguese ? 'Estado:' : 'Status:'}</strong> {getStatusLabel(selectedRequest.status)}</p>
                    <p><strong>{isPortuguese ? 'Passageiros:' : 'Passengers:'}</strong> {selectedRequest.passenger_count}</p>
                    <p><strong>{isPortuguese ? 'Preço Estimado:' : 'Estimated Price:'}</strong> {formatPrice(selectedRequest.estimated_price)}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {isPortuguese ? 'Informação de Contacto' : 'Contact Information'}
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p><strong>{isPortuguese ? 'Nome:' : 'Name:'}</strong> {selectedRequest.contact_info.name}</p>
                    <p><strong>{isPortuguese ? 'Telefone:' : 'Phone:'}</strong> {selectedRequest.contact_info.phone}</p>
                    <p><strong>Email:</strong> {selectedRequest.contact_info.email}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {isPortuguese ? 'Detalhes da Rota' : 'Route Details'}
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="mb-3">
                      <p className="font-medium text-green-700">
                        {isPortuguese ? 'Local de Recolha:' : 'Pickup Location:'}
                      </p>
                      <p>{selectedRequest.pickup_location.address}</p>
                    </div>
                    <div>
                      <p className="font-medium text-red-700">
                        {isPortuguese ? 'Local de Destino:' : 'Drop-off Location:'}
                      </p>
                      <p>{selectedRequest.dropoff_location.address}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {isPortuguese ? 'Horário' : 'Schedule'}
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p><strong>{isPortuguese ? 'Data e Hora:' : 'Date & Time:'}</strong> {' '}
                      {new Date(selectedRequest.scheduled_datetime).toLocaleDateString(language)} {' '}
                      {new Date(selectedRequest.scheduled_datetime).toLocaleTimeString(language)}
                    </p>
                    <p><strong>{isPortuguese ? 'Criado em:' : 'Created:'}</strong> {' '}
                      {new Date(selectedRequest.created_at).toLocaleDateString(language)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {isPortuguese ? 'Fechar' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}