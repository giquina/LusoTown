/**
 * Service Availability Configuration
 * Centralized management of service availability across LusoTown platform
 */

export interface ServiceAvailability {
  id: string;
  name: string;
  namePortuguese: string;
  category: 'transport' | 'tours' | 'security' | 'events' | 'matching' | 'community';
  isAvailable: boolean;
  status: 'available' | 'fully_booked' | 'unavailable' | 'limited';
  waitingListAvailable: boolean;
  statusMessage?: string;
  statusMessagePortuguese?: string;
  estimatedAvailability?: string;
  estimatedAvailabilityPortuguese?: string;
}

// Available Services (only these 3 remain bookable)
export const AVAILABLE_SERVICES: ServiceAvailability[] = [
  {
    id: 'close_protection',
    name: 'Close Protection Private Transportation Services',
    namePortuguese: 'Serviços de Transporte Privado com Proteção Próxima',
    category: 'transport',
    isAvailable: true,
    status: 'available',
    waitingListAvailable: false,
    statusMessage: 'Available for booking',
    statusMessagePortuguese: 'Disponível para reserva'
  },
  {
    id: 'london_tours',
    name: 'London Tours Services',
    namePortuguese: 'Serviços de Tours de Londres',
    category: 'tours',
    isAvailable: true,
    status: 'available',
    waitingListAvailable: false,
    statusMessage: 'Available for booking',
    statusMessagePortuguese: 'Disponível para reserva'
  },
  {
    id: 'security_personal',
    name: 'Security Personal Security Services',
    namePortuguese: 'Serviços de Segurança Pessoal',
    category: 'security',
    isAvailable: true,
    status: 'available',
    waitingListAvailable: false,
    statusMessage: 'Available for booking',
    statusMessagePortuguese: 'Disponível para reserva'
  }
];

// Unavailable Services (everything else)
export const UNAVAILABLE_SERVICES: ServiceAvailability[] = [
  // Transport Services
  {
    id: 'executive_transport',
    name: 'Executive Transport',
    namePortuguese: 'Transporte Executivo',
    category: 'transport',
    isAvailable: false,
    status: 'fully_booked',
    waitingListAvailable: true,
    statusMessage: 'Fully Booked - Join Waiting List',
    statusMessagePortuguese: 'Esgotado - Junte-se à Lista de Espera',
    estimatedAvailability: 'February 2025',
    estimatedAvailabilityPortuguese: 'Fevereiro 2025'
  },
  {
    id: 'airport_transfers',
    name: 'Airport Transfers',
    namePortuguese: 'Transferes do Aeroporto',
    category: 'transport',
    isAvailable: false,
    status: 'fully_booked',
    waitingListAvailable: true,
    statusMessage: 'Fully Booked - Join Waiting List',
    statusMessagePortuguese: 'Esgotado - Junte-se à Lista de Espera',
    estimatedAvailability: 'March 2025',
    estimatedAvailabilityPortuguese: 'Março 2025'
  },
  {
    id: 'chauffeur_services',
    name: 'Chauffeur Services',
    namePortuguese: 'Serviços de Motorista',
    category: 'transport',
    isAvailable: false,
    status: 'fully_booked',
    waitingListAvailable: true,
    statusMessage: 'Fully Booked - Join Waiting List',
    statusMessagePortuguese: 'Esgotado - Junte-se à Lista de Espera',
    estimatedAvailability: 'April 2025',
    estimatedAvailabilityPortuguese: 'Abril 2025'
  },
  
  // Tour Services (except London Tours)
  {
    id: 'portuguese_cultural_tours',
    name: 'Portuguese Cultural Tours',
    namePortuguese: 'Tours Culturais Portugueses',
    category: 'tours',
    isAvailable: false,
    status: 'fully_booked',
    waitingListAvailable: true,
    statusMessage: 'Fully Booked - Join Waiting List',
    statusMessagePortuguese: 'Esgotado - Junte-se à Lista de Espera',
    estimatedAvailability: 'February 2025',
    estimatedAvailabilityPortuguese: 'Fevereiro 2025'
  },
  {
    id: 'custom_tours',
    name: 'Custom Tours',
    namePortuguese: 'Tours Personalizados',
    category: 'tours',
    isAvailable: false,
    status: 'fully_booked',
    waitingListAvailable: true,
    statusMessage: 'Fully Booked - Join Waiting List',
    statusMessagePortuguese: 'Esgotado - Junte-se à Lista de Espera',
    estimatedAvailability: 'March 2025',
    estimatedAvailabilityPortuguese: 'Março 2025'
  },
  
  // Community Events
  {
    id: 'networking_events',
    name: 'Networking Events',
    namePortuguese: 'Eventos de Networking',
    category: 'events',
    isAvailable: false,
    status: 'fully_booked',
    waitingListAvailable: true,
    statusMessage: 'Fully Booked - Join Waiting List',
    statusMessagePortuguese: 'Esgotado - Junte-se à Lista de Espera',
    estimatedAvailability: 'February 2025',
    estimatedAvailabilityPortuguese: 'Fevereiro 2025'
  },
  {
    id: 'cultural_events',
    name: 'Cultural Events',
    namePortuguese: 'Eventos Culturais',
    category: 'events',
    isAvailable: false,
    status: 'fully_booked',
    waitingListAvailable: true,
    statusMessage: 'Fully Booked - Join Waiting List',
    statusMessagePortuguese: 'Esgotado - Junte-se à Lista de Espera',
    estimatedAvailability: 'March 2025',
    estimatedAvailabilityPortuguese: 'Março 2025'
  },
  {
    id: 'group_activities',
    name: 'Group Activities',
    namePortuguese: 'Atividades de Grupo',
    category: 'events',
    isAvailable: false,
    status: 'fully_booked',
    waitingListAvailable: true,
    statusMessage: 'Fully Booked - Join Waiting List',
    statusMessagePortuguese: 'Esgotado - Junte-se à Lista de Espera',
    estimatedAvailability: 'February 2025',
    estimatedAvailabilityPortuguese: 'Fevereiro 2025'
  },
  
  // Premium Services
  {
    id: 'premium_matching',
    name: 'Premium Matching Services',
    namePortuguese: 'Serviços de Correspondência Premium',
    category: 'matching',
    isAvailable: false,
    status: 'fully_booked',
    waitingListAvailable: true,
    statusMessage: 'Fully Booked - Join Waiting List',
    statusMessagePortuguese: 'Esgotado - Junte-se à Lista de Espera',
    estimatedAvailability: 'April 2025',
    estimatedAvailabilityPortuguese: 'Abril 2025'
  }
];

// Combined service list
export const ALL_SERVICES: ServiceAvailability[] = [
  ...AVAILABLE_SERVICES,
  ...UNAVAILABLE_SERVICES
];

// Helper functions
export const isServiceAvailable = (serviceId: string): boolean => {
  const service = ALL_SERVICES.find(s => s.id === serviceId);
  return service?.isAvailable ?? false;
};

export const getServiceStatus = (serviceId: string): ServiceAvailability | null => {
  return ALL_SERVICES.find(s => s.id === serviceId) ?? null;
};

export const getAvailableServices = (): ServiceAvailability[] => {
  return AVAILABLE_SERVICES;
};

export const getUnavailableServices = (): ServiceAvailability[] => {
  return UNAVAILABLE_SERVICES;
};

export const getServicesByCategory = (category: ServiceAvailability['category']): ServiceAvailability[] => {
  return ALL_SERVICES.filter(s => s.category === category);
};

export const getAvailableServicesByCategory = (category: ServiceAvailability['category']): ServiceAvailability[] => {
  return AVAILABLE_SERVICES.filter(s => s.category === category);
};

export const getUnavailableServicesByCategory = (category: ServiceAvailability['category']): ServiceAvailability[] => {
  return UNAVAILABLE_SERVICES.filter(s => s.category === category);
};

// Waiting list utilities
export const canJoinWaitingList = (serviceId: string): boolean => {
  const service = ALL_SERVICES.find(s => s.id === serviceId);
  return service?.waitingListAvailable ?? false;
};

export const getWaitingListServices = (): ServiceAvailability[] => {
  return UNAVAILABLE_SERVICES.filter(s => s.waitingListAvailable);
};

// Service availability labels
export const getAvailabilityLabel = (status: ServiceAvailability['status'], isPortuguese: boolean = false) => {
  const labels = {
    available: {
      en: 'Available',
      pt: 'Disponível'
    },
    fully_booked: {
      en: 'Fully Booked',
      pt: 'Esgotado'
    },
    unavailable: {
      en: 'Unavailable',
      pt: 'Indisponível'
    },
    limited: {
      en: 'Limited Availability',
      pt: 'Disponibilidade Limitada'
    }
  };
  
  return labels[status]?.[isPortuguese ? 'pt' : 'en'] ?? status;
};

export const getAvailabilityColor = (status: ServiceAvailability['status']) => {
  const colors = {
    available: 'green',
    fully_booked: 'red',
    unavailable: 'gray',
    limited: 'yellow'
  };
  
  return colors[status] ?? 'gray';
};

export const getAvailabilityStyles = (status: ServiceAvailability['status']) => {
  const styles = {
    available: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200',
      badge: 'bg-action-500'
    },
    fully_booked: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-200',
      badge: 'bg-coral-500'
    },
    unavailable: {
      bg: 'bg-secondary-100',
      text: 'text-secondary-800',
      border: 'border-gray-200',
      badge: 'bg-gray-500'
    },
    limited: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-200',
      badge: 'bg-accent-500'
    }
  };
  
  return styles[status] ?? styles.unavailable;
};