/**
 * Transport Components Index
 * 
 * Centralized exports for all transport-related components and utilities
 * to support the Portuguese-speaking community transport coordination system.
 */

export { default as TransportCoordination } from './TransportCoordination';


// Re-export the existing TransportBookingForm at the root level
export { default as TransportBookingForm } from '../TransportBookingForm';

// Re-export transport configuration and utilities
export {
  TRANSPORT_SERVICES,
  UK_TRANSPORT_HUBS,
  PORTUGUESE_AREAS,
  PUBLIC_TRANSPORT_GUIDES,
  DRIVER_VERIFICATION,
  TRANSPORT_EMERGENCY,
  transportHelpers,
  type TransportService,
  type TransportHub,
  type PortugueseArea,
  type TransportServiceType
} from '../../config/transport-services';

// Type exports for transport API
export type {
  TransportRequest,
  DriverProfile
} from '../../app/api/transport/route';

// Common transport utilities
export const TRANSPORT_STATUS_COLORS = {
  pending: 'text-yellow-600 bg-yellow-100',
  confirmed: 'text-blue-600 bg-blue-100',
  in_progress: 'text-purple-600 bg-purple-100',
  completed: 'text-green-600 bg-green-100',
  cancelled: 'text-red-600 bg-red-100'
} as const;

export const TRANSPORT_STATUS_LABELS = {
  en: {
    pending: 'Pending',
    confirmed: 'Confirmed',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled'
  },
  pt: {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    in_progress: 'Em Progresso',
    completed: 'Concluído',
    cancelled: 'Cancelado'
  }
} as const;

export const SERVICE_TYPE_LABELS = {
  en: {
    community_rideshare: 'Community Rideshare',
    airport_transfer: 'Airport Transfer',
    cultural_events: 'Cultural Events',
    university_shuttle: 'University Shuttle'
  },
  pt: {
    community_rideshare: 'Partilha Comunitária',
    airport_transfer: 'Transferência Aeroporto',
    cultural_events: 'Eventos Culturais',
    university_shuttle: 'Shuttle Universitário'
  }
} as const;