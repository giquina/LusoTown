/**
 * Transport Services Configuration for Portuguese-speaking Community
 *
 * Centralized configuration for all transport coordination features
 * including rideshare, public transport guides, airport transfers,
 * and Portuguese cultural area connections across the UK.
 */

import { TRANSPORT_PRICING } from './pricing';
import { UNIVERSITIES } from './universities';

export interface TransportHub {
  id: string;
  name: string;
  namePt: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    postcode: string;
  };
  transportTypes: ('train' | 'bus' | 'metro' | 'airport')[];
  portugueseRelevance: number; // 1-5 scale
  nearbyPortugueseAreas: string[];
}

export interface PortugueseArea {
  id: string;
  name: string;
  namePt: string;
  city: string;
  location: {
    lat: number;
    lng: number;
    postcode: string;
  };
  demographics: {
    portuguesePopulation: number;
    primaryCountries: string[];
    businessCount: number;
  };
  transportConnections: string[]; // Transport hub IDs
  culturalSignificance: string;
  culturalSignificancePt: string;
}

// Major UK Transport Hubs with Portuguese Community Relevance
export const UK_TRANSPORT_HUBS: TransportHub[] = [
  // London Airports
  {
    id: 'heathrow',
    name: 'Heathrow Airport',
    namePt: 'Aeroporto de Heathrow',
    location: {
      lat: 51.4700,
      lng: -0.4543,
      address: 'Heathrow Airport, Longford',
      postcode: 'TW6 1AP'
    },
    transportTypes: ['airport', 'train', 'bus'],
    portugueseRelevance: 5,
    nearbyPortugueseAreas: ['hounslow', 'feltham', 'southall']
  },
  {
    id: 'gatwick',
    name: 'Gatwick Airport',
    namePt: 'Aeroporto de Gatwick',
    location: {
      lat: 51.1481,
      lng: -0.1903,
      address: 'Gatwick Airport, Horley',
      postcode: 'RH6 0NP'
    },
    transportTypes: ['airport', 'train'],
    portugueseRelevance: 4,
    nearbyPortugueseAreas: ['crawley', 'horley']
  },
  {
    id: 'stansted',
    name: 'Stansted Airport',
    namePt: 'Aeroporto de Stansted',
    location: {
      lat: 51.8860,
      lng: 0.2389,
      address: 'Stansted Airport, Bishop\'s Stortford',
      postcode: 'CM24 1QW'
    },
    transportTypes: ['airport', 'train', 'bus'],
    portugueseRelevance: 3,
    nearbyPortugueseAreas: ['bishops_stortford']
  },

  // London Major Stations
  {
    id: 'victoria',
    name: 'Victoria Station',
    namePt: 'Estação Victoria',
    location: {
      lat: 51.4952,
      lng: -0.1441,
      address: 'Victoria Station, London',
      postcode: 'SW1V 1JU'
    },
    transportTypes: ['train', 'bus', 'metro'],
    portugueseRelevance: 4,
    nearbyPortugueseAreas: ['vauxhall', 'stockwell', 'brixton']
  },
  {
    id: 'waterloo',
    name: 'Waterloo Station',
    namePt: 'Estação Waterloo',
    location: {
      lat: 51.5031,
      lng: -0.1132,
      address: 'Waterloo Station, London',
      postcode: 'SE1 7LY'
    },
    transportTypes: ['train', 'metro'],
    portugueseRelevance: 3,
    nearbyPortugueseAreas: ['vauxhall', 'elephant_castle']
  },
  {
    id: 'liverpool_street',
    name: 'Liverpool Street Station',
    namePt: 'Estação Liverpool Street',
    location: {
      lat: 51.5178,
      lng: -0.0823,
      address: 'Liverpool Street Station, London',
      postcode: 'EC2M 7QH'
    },
    transportTypes: ['train', 'metro'],
    portugueseRelevance: 2,
    nearbyPortugueseAreas: ['aldgate']
  },

  // Other UK Cities
  {
    id: 'manchester_airport',
    name: 'Manchester Airport',
    namePt: 'Aeroporto de Manchester',
    location: {
      lat: 53.3539,
      lng: -2.2750,
      address: 'Manchester Airport, Manchester',
      postcode: 'M90 1QX'
    },
    transportTypes: ['airport', 'train'],
    portugueseRelevance: 3,
    nearbyPortugueseAreas: ['manchester_center']
  },
  {
    id: 'edinburgh_airport',
    name: 'Edinburgh Airport',
    namePt: 'Aeroporto de Edimburgo',
    location: {
      lat: 55.9500,
      lng: -3.3725,
      address: 'Edinburgh Airport, Edinburgh',
      postcode: 'EH12 9DN'
    },
    transportTypes: ['airport', 'bus'],
    portugueseRelevance: 2,
    nearbyPortugueseAreas: ['edinburgh_center']
  }
];

// Portuguese Community Areas across the UK
export const PORTUGUESE_AREAS: PortugueseArea[] = [
  // London Areas
  {
    id: 'vauxhall',
    name: 'Vauxhall & Nine Elms',
    namePt: 'Vauxhall & Nine Elms',
    city: 'London',
    location: {
      lat: 51.4861,
      lng: -0.1253,
      postcode: 'SW8'
    },
    demographics: {
      portuguesePopulation: 8500,
      primaryCountries: ['Portugal', 'Brazil', 'Cape Verde'],
      businessCount: 45
    },
    transportConnections: ['victoria', 'waterloo'],
    culturalSignificance: 'Heart of London\'s Portuguese community with cultural centers and businesses',
    culturalSignificancePt: 'Coração da comunidade portuguesa de Londres com centros culturais e negócios'
  },
  {
    id: 'stockwell',
    name: 'Stockwell & South Lambeth',
    namePt: 'Stockwell & South Lambeth',
    city: 'London',
    location: {
      lat: 51.4717,
      lng: -0.1225,
      postcode: 'SW9'
    },
    demographics: {
      portuguesePopulation: 12000,
      primaryCountries: ['Portugal', 'Brazil', 'Angola'],
      businessCount: 65
    },
    transportConnections: ['victoria', 'waterloo'],
    culturalSignificance: 'Historic Portuguese settlement area with traditional restaurants',
    culturalSignificancePt: 'Área histórica de estabelecimento português com restaurantes tradicionais'
  },
  {
    id: 'elephant_castle',
    name: 'Elephant & Castle',
    namePt: 'Elephant & Castle',
    city: 'London',
    location: {
      lat: 51.4945,
      lng: -0.0996,
      postcode: 'SE1'
    },
    demographics: {
      portuguesePopulation: 6500,
      primaryCountries: ['Brazil', 'Portugal', 'Cape Verde'],
      businessCount: 35
    },
    transportConnections: ['waterloo', 'london_bridge'],
    culturalSignificance: 'Growing Brazilian and Portuguese community hub',
    culturalSignificancePt: 'Centro crescente da comunidade brasileira e portuguesa'
  },
  {
    id: 'brixton',
    name: 'Brixton',
    namePt: 'Brixton',
    city: 'London',
    location: {
      lat: 51.4614,
      lng: -0.1157,
      postcode: 'SW2'
    },
    demographics: {
      portuguesePopulation: 4200,
      primaryCountries: ['Angola', 'Cape Verde', 'Brazil'],
      businessCount: 28
    },
    transportConnections: ['victoria'],
    culturalSignificance: 'Diverse Portuguese-speaking community with African influences',
    culturalSignificancePt: 'Comunidade diversa de língua portuguesa com influências africanas'
  },
  {
    id: 'hounslow',
    name: 'Hounslow',
    namePt: 'Hounslow',
    city: 'London',
    location: {
      lat: 51.4581,
      lng: -0.3690,
      postcode: 'TW3'
    },
    demographics: {
      portuguesePopulation: 3800,
      primaryCountries: ['Portugal', 'Brazil'],
      businessCount: 22
    },
    transportConnections: ['heathrow'],
    culturalSignificance: 'Portuguese community near Heathrow with airport workers',
    culturalSignificancePt: 'Comunidade portuguesa perto de Heathrow com trabalhadores do aeroporto'
  },

  // Other UK Cities
  {
    id: 'manchester_center',
    name: 'Manchester City Centre',
    namePt: 'Centro de Manchester',
    city: 'Manchester',
    location: {
      lat: 53.4808,
      lng: -2.2426,
      postcode: 'M1'
    },
    demographics: {
      portuguesePopulation: 2500,
      primaryCountries: ['Portugal', 'Brazil'],
      businessCount: 15
    },
    transportConnections: ['manchester_airport'],
    culturalSignificance: 'Growing Portuguese community in Manchester',
    culturalSignificancePt: 'Crescente comunidade portuguesa em Manchester'
  },
  {
    id: 'edinburgh_center',
    name: 'Edinburgh City Centre',
    namePt: 'Centro de Edimburgo',
    city: 'Edinburgh',
    location: {
      lat: 55.9533,
      lng: -3.1883,
      postcode: 'EH1'
    },
    demographics: {
      portuguesePopulation: 1200,
      primaryCountries: ['Portugal', 'Brazil'],
      businessCount: 8
    },
    transportConnections: ['edinburgh_airport'],
    culturalSignificance: 'Small but active Portuguese community in Scotland',
    culturalSignificancePt: 'Pequena mas ativa comunidade portuguesa na Escócia'
  }
];

export type TransportServiceType = 
  | 'rideshare'
  | 'airport_transfer'
  | 'event_transport'
  | 'public_transport_guide'
  | 'cultural_tour'
  | 'university_shuttle'
  | 'group_booking'
  | 'emergency_transport';

export interface TransportService {
  id: string;
  type: TransportServiceType;
  name: string;
  namePt: string;
  description: string;
  descriptionPt: string;
  pricing: {
    basePrice: number;
    currency: 'GBP';
    unit: 'per_hour' | 'per_trip' | 'per_person' | 'fixed';
    minimumCharge?: number;
    additionalFees?: {
      name: string;
      namePt: string;
      amount: number;
      condition?: string;
    }[];
  };
  availability: {
    days: string[];
    hours: {
      start: string; // HH:MM format
      end: string;
    };
    advanceBooking: {
      minimum: string; // e.g., "2h", "1d"
      maximum: string; // e.g., "30d"
    };
  };
  coverage: {
    areas: string[]; // Area IDs
    maxDistance: number; // km
    airports: boolean;
    universities: boolean;
  };
  features: string[];
  featuresPt: string[];
  safetyFeatures: string[];
  safetyFeaturesPt: string[];
  bookingRequirements: string[];
  bookingRequirementsPt: string[];
}

// Transport Services Configuration
export const TRANSPORT_SERVICES: TransportService[] = [
  {
    id: 'community_rideshare',
    type: 'rideshare',
    name: 'Portuguese Community Rideshare',
    namePt: 'Partilha de Viagens Comunitárias',
    description: 'Safe ridesharing with verified Portuguese-speaking drivers for events and daily transport',
    descriptionPt: 'Partilha segura de viagens com motoristas verificados de língua portuguesa para eventos e transporte diário',
    pricing: {
      basePrice: 8.50,
      currency: 'GBP',
      unit: 'per_trip',
      minimumCharge: 5.00,
      additionalFees: [
        {
          name: 'Airport Pickup',
          namePt: 'Recolha no Aeroporto',
          amount: 10.00,
          condition: 'Airport locations'
        },
        {
          name: 'Late Night Surcharge',
          namePt: 'Taxa Nocturna',
          amount: 3.00,
          condition: 'After 11 PM'
        }
      ]
    },
    availability: {
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      hours: {
        start: '06:00',
        end: '02:00'
      },
      advanceBooking: {
        minimum: '1h',
        maximum: '7d'
      }
    },
    coverage: {
      areas: ['vauxhall', 'stockwell', 'elephant_castle', 'brixton', 'hounslow'],
      maxDistance: 50,
      airports: true,
      universities: true
    },
    features: [
      'Verified Portuguese-speaking drivers',
      'Cultural event coordination',
      'Group booking discounts',
      'University student rates',
      'Real-time GPS tracking'
    ],
    featuresPt: [
      'Motoristas verificados de língua portuguesa',
      'Coordenação de eventos culturais',
      'Descontos para reservas de grupo',
      'Tarifas para estudantes universitários',
      'Rastreamento GPS em tempo real'
    ],
    safetyFeatures: [
      'Background checked drivers',
      'Emergency contact system',
      'Trip sharing with family',
      'In-app safety reporting',
      'University partnership verification'
    ],
    safetyFeaturesPt: [
      'Motoristas com verificação de antecedentes',
      'Sistema de contacto de emergência',
      'Partilha de viagem com família',
      'Relatório de segurança na app',
      'Verificação de parceria universitária'
    ],
    bookingRequirements: [
      'Valid phone number',
      'Profile photo required',
      'Emergency contact',
      'Preferred language selection'
    ],
    bookingRequirementsPt: [
      'Número de telefone válido',
      'Foto de perfil obrigatória',
      'Contacto de emergência',
      'Seleção de idioma preferido'
    ]
  },
  {
    id: 'airport_transfer',
    type: 'airport_transfer',
    name: 'Airport Welcome Service',
    namePt: 'Serviço de Boas-vindas no Aeroporto',
    description: 'Specialized airport pickup for new arrivals to the Portuguese-speaking community in the UK',
    descriptionPt: 'Recolha especializada no aeroporto para novos membros da comunidade de língua portuguesa no Reino Unido',
    pricing: {
      basePrice: 35.00,
      currency: 'GBP',
      unit: 'per_trip',
      minimumCharge: 25.00,
      additionalFees: [
        {
          name: 'Meet & Greet Service',
          namePt: 'Serviço de Receção',
          amount: 15.00,
          condition: 'Inside airport terminal'
        },
        {
          name: 'Luggage Assistance',
          namePt: 'Assistência com Bagagem',
          amount: 5.00,
          condition: 'More than 2 large bags'
        }
      ]
    },
    availability: {
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      hours: {
        start: '05:00',
        end: '23:00'
      },
      advanceBooking: {
        minimum: '4h',
        maximum: '30d'
      }
    },
    coverage: {
      areas: ['heathrow', 'gatwick', 'stansted', 'manchester_airport', 'edinburgh_airport'],
      maxDistance: 100,
      airports: true,
      universities: true
    },
    features: [
      'Flight monitoring service',
      'Portuguese welcome pack',
      'Orientation tour included',
      'Banking and mobile setup assistance',
      'Housing area recommendations'
    ],
    featuresPt: [
      'Serviço de monitorização de voos',
      'Pacote de boas-vindas português',
      'Tour de orientação incluído',
      'Assistência com banco e telemóvel',
      'Recomendações de áreas habitacionais'
    ],
    safetyFeatures: [
      'Licensed airport operators',
      'Pre-arranged meeting points',
      'Family notification service',
      'Arrival confirmation',
      'Cultural orientation briefing'
    ],
    safetyFeaturesPt: [
      'Operadores licenciados do aeroporto',
      'Pontos de encontro pré-definidos',
      'Serviço de notificação familiar',
      'Confirmação de chegada',
      'Briefing de orientação cultural'
    ],
    bookingRequirements: [
      'Flight details required',
      'Destination address',
      'Contact number in UK',
      'Preferred communication language'
    ],
    bookingRequirementsPt: [
      'Detalhes do voo necessários',
      'Endereço de destino',
      'Número de contacto no Reino Unido',
      'Idioma de comunicação preferido'
    ]
  },
  {
    id: 'cultural_events',
    type: 'event_transport',
    name: 'Cultural Events Shuttle',
    namePt: 'Transporte para Eventos Culturais',
    description: 'Group transport coordination for Portuguese cultural celebrations, festivals, and community events',
    descriptionPt: 'Coordenação de transporte em grupo para celebrações culturais portuguesas, festivais e eventos comunitários',
    pricing: {
      basePrice: 12.00,
      currency: 'GBP',
      unit: 'per_person',
      minimumCharge: 60.00,
      additionalFees: [
        {
          name: 'Return Journey',
          namePt: 'Viagem de Regresso',
          amount: 8.00,
          condition: 'Round trip service'
        },
        {
          name: 'Extended Wait Time',
          namePt: 'Tempo de Espera Prolongado',
          amount: 15.00,
          condition: 'Waiting more than 30 minutes'
        }
      ]
    },
    availability: {
      days: ['friday', 'saturday', 'sunday'],
      hours: {
        start: '10:00',
        end: '23:30'
      },
      advanceBooking: {
        minimum: '24h',
        maximum: '14d'
      }
    },
    coverage: {
      areas: ['vauxhall', 'stockwell', 'elephant_castle', 'brixton'],
      maxDistance: 75,
      airports: false,
      universities: false
    },
    features: [
      'Group coordination service',
      'Event schedule integration',
      'Portuguese music during transport',
      'Multiple pickup points',
      'Festival ticket coordination'
    ],
    featuresPt: [
      'Serviço de coordenação de grupo',
      'Integração com horário do evento',
      'Música portuguesa durante o transporte',
      'Múltiplos pontos de recolha',
      'Coordenação de bilhetes para festivais'
    ],
    safetyFeatures: [
      'Group safety coordinator',
      'Event organizer liaison',
      'Emergency contact network',
      'Return transport guarantee',
      'Cultural event insurance'
    ],
    safetyFeaturesPt: [
      'Coordenador de segurança do grupo',
      'Ligação com organizador do evento',
      'Rede de contactos de emergência',
      'Garantia de transporte de regresso',
      'Seguro para eventos culturais'
    ],
    bookingRequirements: [
      'Event details required',
      'Group size confirmation',
      'Pickup location preferences',
      'Return transport needs'
    ],
    bookingRequirementsPt: [
      'Detalhes do evento necessários',
      'Confirmação do tamanho do grupo',
      'Preferências de local de recolha',
      'Necessidades de transporte de regresso'
    ]
  },
  {
    id: 'university_shuttle',
    type: 'university_shuttle',
    name: 'University Connection Service',
    namePt: 'Serviço de Ligação Universitária',
    description: 'Regular shuttle service between Portuguese community areas and major UK universities',
    descriptionPt: 'Serviço regular de transporte entre áreas da comunidade portuguesa e principais universidades do Reino Unido',
    pricing: {
      basePrice: 15.00,
      currency: 'GBP',
      unit: 'per_trip',
      minimumCharge: 10.00,
      additionalFees: [
        {
          name: 'Student Discount',
          namePt: 'Desconto de Estudante',
          amount: -7.50,
          condition: 'Valid student ID'
        },
        {
          name: 'Monthly Pass',
          namePt: 'Passe Mensal',
          amount: 120.00,
          condition: 'Unlimited monthly travel'
        }
      ]
    },
    availability: {
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      hours: {
        start: '07:00',
        end: '20:00'
      },
      advanceBooking: {
        minimum: '2h',
        maximum: '30d'
      }
    },
    coverage: {
      areas: Object.keys(UNIVERSITIES),
      maxDistance: 30,
      airports: false,
      universities: true
    },
    features: [
      'Student ID verification',
      'University schedule coordination',
      'Wi-Fi enabled vehicles',
      'Study space available',
      'Academic calendar integration'
    ],
    featuresPt: [
      'Verificação de cartão de estudante',
      'Coordenação com horário universitário',
      'Veículos com Wi-Fi',
      'Espaço de estudo disponível',
      'Integração com calendário académico'
    ],
    safetyFeatures: [
      'University verified drivers',
      'Student safety protocols',
      'Emergency university contacts',
      'Academic institution partnerships',
      'Regular safety training'
    ],
    safetyFeaturesPt: [
      'Motoristas verificados pela universidade',
      'Protocolos de segurança estudantil',
      'Contactos de emergência universitários',
      'Parcerias com instituições académicas',
      'Formação de segurança regular'
    ],
    bookingRequirements: [
      'Valid student ID or university affiliation',
      'Course enrollment verification',
      'University contact details',
      'Academic calendar awareness'
    ],
    bookingRequirementsPt: [
      'Cartão de estudante válido ou afiliação universitária',
      'Verificação de inscrição no curso',
      'Detalhes de contacto universitário',
      'Conhecimento do calendário académico'
    ]
  }
];

// Public Transport Guide Configuration
export const PUBLIC_TRANSPORT_GUIDES = {
  london: {
    id: 'london_guide',
    name: 'London Transport Guide for Portuguese Speakers',
    namePt: 'Guia de Transportes de Londres para Portugueses',
    zones: {
      central: {
        name: 'Central London (Zones 1-2)',
        namePt: 'Centro de Londres (Zonas 1-2)',
        portugueseAreas: ['elephant_castle'],
        keyStations: ['victoria', 'waterloo', 'liverpool_street'],
        ticketRecommendations: {
          tourist: 'Day Travelcard',
          resident: 'Oyster Card with monthly pass',
          student: 'Student Oyster Card'
        }
      },
      south: {
        name: 'South London (Zones 2-4)',
        namePt: 'Sul de Londres (Zonas 2-4)',
        portugueseAreas: ['vauxhall', 'stockwell', 'brixton'],
        keyStations: ['vauxhall', 'stockwell', 'brixton'],
        ticketRecommendations: {
          tourist: 'Zones 1-4 Travelcard',
          resident: 'Oyster Card with zone 1-4 coverage',
          student: 'Student discount on all zones'
        }
      }
    },
    tips: [
      'Download Citymapper app for Portuguese interface',
      'Peak hours are 7-9 AM and 5-7 PM',
      'Weekend engineering works are common',
      'Contactless payment accepted everywhere'
    ],
    tipsPt: [
      'Descarregue a app Citymapper com interface em português',
      'Horas de ponta são 7-9h e 17-19h',
      'Obras de engenharia aos fins-de-semana são comuns',
      'Pagamento sem contacto aceite em todo o lado'
    ]
  },
  manchester: {
    id: 'manchester_guide',
    name: 'Manchester Transport Guide',
    namePt: 'Guia de Transportes de Manchester',
    zones: {
      city: {
        name: 'Manchester City Centre',
        namePt: 'Centro da Cidade de Manchester',
        portugueseAreas: ['manchester_center'],
        keyStations: ['manchester_piccadilly', 'manchester_victoria'],
        ticketRecommendations: {
          tourist: 'Day Saver ticket',
          resident: 'System One monthly pass',
          student: 'Student discount available'
        }
      }
    },
    tips: [
      'Free city center bus services available',
      'Metrolink tram system covers wider area',
      'Airport connections via train and bus',
      'Portuguese community events often near city center'
    ],
    tipsPt: [
      'Serviços de autocarro gratuitos no centro da cidade',
      'Sistema de elétrico Metrolink cobre área mais ampla',
      'Ligações ao aeroporto via comboio e autocarro',
      'Eventos da comunidade portuguesa frequentemente perto do centro'
    ]
  }
};

// Driver Verification System
export interface DriverVerification {
  university: {
    required: boolean;
    acceptedUniversities: string[];
    verificationProcess: string[];
    verificationProcessPt: string[];
  };
  community: {
    required: boolean;
    culturalVetting: boolean;
    languageRequirement: 'portuguese' | 'english' | 'both';
    communityReferences: number;
  };
  safety: {
    backgroundCheck: boolean;
    drivingRecord: boolean;
    vehicleInspection: boolean;
    insurance: 'comprehensive' | 'third_party';
  };
}

export const DRIVER_VERIFICATION: DriverVerification = {
  university: {
    required: true,
    acceptedUniversities: Object.keys(UNIVERSITIES),
    verificationProcess: [
      'University email verification',
      'Staff ID or student ID check',
      'Academic department endorsement',
      'Character reference from university contact'
    ],
    verificationProcessPt: [
      'Verificação de email universitário',
      'Verificação de cartão de funcionário ou estudante',
      'Endorso do departamento académico',
      'Referência de carácter de contacto universitário'
    ]
  },
  community: {
    required: true,
    culturalVetting: true,
    languageRequirement: 'both',
    communityReferences: 2
  },
  safety: {
    backgroundCheck: true,
    drivingRecord: true,
    vehicleInspection: true,
    insurance: 'comprehensive'
  }
};

// Emergency Contacts and Safety
export const TRANSPORT_EMERGENCY = {
  hotline: {
    number: '+44 20 7946 0958',
    available: '24/7',
    languages: ['en', 'pt', 'es']
  },
  procedures: {
    passengerEmergency: [
      'Contact emergency hotline immediately',
      'Share live location with emergency contact',
      'Contact local emergency services if immediate danger',
      'Report incident through app safety feature'
    ],
    passengerEmergencyPt: [
      'Contacte a linha de emergência imediatamente',
      'Partilhe localização ao vivo com contacto de emergência',
      'Contacte serviços de emergência locais se perigo imediato',
      'Reporte incidente através da funcionalidade de segurança da app'
    ],
    driverEmergency: [
      'Ensure passenger safety first',
      'Contact transport coordination center',
      'Arrange alternative transport if needed',
      'Complete incident report within 2 hours'
    ],
    driverEmergencyPt: [
      'Garanta segurança do passageiro primeiro',
      'Contacte centro de coordenação de transporte',
      'Organize transporte alternativo se necessário',
      'Complete relatório de incidente dentro de 2 horas'
    ]
  }
};

// Route optimization helpers
export const calculateDistance = (
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (to.lat - from.lat) * Math.PI / 180;
  const dLng = (to.lng - from.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(from.lat * Math.PI / 180) * Math.cos(to.lat * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const findNearestHub = (
  userLocation: { lat: number; lng: number },
  hubType?: 'airport' | 'train' | 'bus' | 'metro'
): TransportHub | null => {
  let hubs = UK_TRANSPORT_HUBS;
  
  if (hubType) {
    hubs = hubs.filter(hub => hub.transportTypes.includes(hubType));
  }
  
  if (hubs.length === 0) return null;
  
  return hubs.reduce((nearest, hub) => {
    const distanceToHub = calculateDistance(userLocation, hub.location);
    const distanceToNearest = calculateDistance(userLocation, nearest.location);
    return distanceToHub < distanceToNearest ? hub : nearest;
  });
};

export const findPortugueseAreasNearLocation = (
  userLocation: { lat: number; lng: number },
  maxDistance: number = 10
): PortugueseArea[] => {
  return PORTUGUESE_AREAS.filter(area => {
    const distance = calculateDistance(userLocation, area.location);
    return distance <= maxDistance;
  }).sort((a, b) => {
    const distanceA = calculateDistance(userLocation, a.location);
    const distanceB = calculateDistance(userLocation, b.location);
    return distanceA - distanceB;
  });
};

// Transport pricing calculator
export const calculateTransportPrice = (
  serviceId: string,
  distance: number,
  passengers: number = 1,
  additionalOptions: string[] = []
): {
  basePrice: number;
  additionalFees: number;
  totalPrice: number;
  breakdown: Array<{ name: string; amount: number }>;
} => {
  const service = TRANSPORT_SERVICES.find(s => s.id === serviceId);
  if (!service) {
    throw new Error(`Transport service ${serviceId} not found`);
  }
  
  let basePrice = service.pricing.basePrice;
  let additionalFees = 0;
  const breakdown: Array<{ name: string; amount: number }> = [
    { name: 'Base Price', amount: basePrice }
  ];
  
  // Apply unit pricing
  if (service.pricing.unit === 'per_person') {
    basePrice *= passengers;
    breakdown[0] = { name: `Base Price (${passengers} passengers)`, amount: basePrice };
  }
  
  // Apply minimum charge
  if (service.pricing.minimumCharge && basePrice < service.pricing.minimumCharge) {
    const minimumChargeAdjustment = service.pricing.minimumCharge - basePrice;
    additionalFees += minimumChargeAdjustment;
    breakdown.push({ name: 'Minimum Charge Adjustment', amount: minimumChargeAdjustment });
  }
  
  // Apply additional fees based on options
  service.pricing.additionalFees?.forEach(fee => {
    if (additionalOptions.includes(fee.name) || additionalOptions.includes(fee.namePt)) {
      additionalFees += fee.amount;
      breakdown.push({ name: fee.name, amount: fee.amount });
    }
  });
  
  const totalPrice = Math.max(basePrice + additionalFees, service.pricing.minimumCharge || 0);
  
  return {
    basePrice,
    additionalFees,
    totalPrice,
    breakdown
  };
};

// Export helper functions for easy import
export const transportHelpers = {
  calculateDistance,
  findNearestHub,
  findPortugueseAreasNearLocation,
  calculateTransportPrice
};