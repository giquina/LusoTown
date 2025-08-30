/**
 * PALOP Cultural Sections Configuration
 * Complete cultural representation for all 8 Portuguese-speaking nations
 * Supporting Portuguese-speaking communities across the UK
 */

export interface CulturalSection {
  id: string
  nation: {
    name: string
    flag: string
    iso: string
  }
  cultural: {
    primaryGenres: string[]
    traditionalDances: string[]
    instruments: string[]
    festivals: string[]
    cuisine: string[]
  }
  community: {
    ukPresence: string
    primaryRegions: string[]
    communitySize: string
    keyOrganizations: string[]
  }
  events: {
    regular: Array<{
      name: string
      type: string
      frequency: string
      venue: string
    }>
    annual: Array<{
      name: string
      date: string
      description: string
    }>
  }
  testimonials: Array<{
    name: string
    age: number
    profession: string
    location: string
    quote: string
    highlight: string
  }>
  callToAction: {
    primary: string
    secondary: string
    buttonText: string
    actionUrl: string
  }
}

export const PALOP_CULTURAL_SECTIONS: CulturalSection[] = [
  {
    id: 'portugal',
    nation: {
      name: 'Portugal',
      flag: '🇵🇹',
      iso: 'PT'
    },
    cultural: {
      primaryGenres: ['Fado', 'Folk Tradicional', 'Música Popular'],
      traditionalDances: ['Vira', 'Corridinho', 'Bailinho da Madeira'],
      instruments: ['Guitarra Portuguesa', 'Cavaquinho', 'Acordeão'],
      festivals: ['Festa de São João', 'Festa dos Santos Populares', 'Festa da Flor'],
      cuisine: ['Pastéis de Nata', 'Bacalhau', 'Francesinha', 'Bifana']
    },
    community: {
      ukPresence: 'Largest Portuguese-speaking community in the UK',
      primaryRegions: ['London', 'Manchester', 'Birmingham', 'Reading', 'Portsmouth'],
      communitySize: '300,000+ residents',
      keyOrganizations: ['Casa do Bacalhau', 'Portuguese Cultural Centre', 'Association of Portuguese Businesses UK']
    },
    events: {
      regular: [
        {
          name: 'Fado Nights',
          type: 'Cultural Performance',
          frequency: 'Monthly',
          venue: 'Portuguese Cultural Centre, London'
        },
        {
          name: 'Portuguese Language Exchange',
          type: 'Language Learning',
          frequency: 'Weekly',
          venue: 'Various locations across UK'
        }
      ],
      annual: [
        {
          name: 'Festival de Verão Português',
          date: 'July',
          description: 'Celebrating Portuguese summer traditions with music, food, and dance'
        },
        {
          name: 'Dia de Portugal Celebration',
          date: 'June 10',
          description: 'National day celebration with cultural performances and community gathering'
        }
      ]
    },
    testimonials: [
      {
        name: 'Maria Santos',
        age: 34,
        profession: 'Healthcare Worker',
        location: 'London',
        quote: 'LusoTown helped me reconnect with my Portuguese roots while building a new life in the UK.',
        highlight: 'Found her Portuguese dance group through our events'
      },
      {
        name: 'João Pereira',
        age: 28,
        profession: 'Software Developer',
        location: 'Manchester',
        quote: 'The Portuguese business network here opened doors I never expected in tech.',
        highlight: 'Launched successful startup with Portuguese community support'
      }
    ],
    callToAction: {
      primary: 'Connect with the vibrant Portuguese community across the UK',
      secondary: 'From London\'s bustling Portuguese quarters to Manchester\'s growing community',
      buttonText: 'Join Portuguese Community',
      actionUrl: '/communities/portugal'
    }
  },
  {
    id: 'brazil',
    nation: {
      name: 'Brazil',
      flag: '🇧🇷',
      iso: 'BR'
    },
    cultural: {
      primaryGenres: ['Samba', 'Bossa Nova', 'Forró', 'MPB'],
      traditionalDances: ['Samba', 'Forró', 'Capoeira', 'Frevo'],
      instruments: ['Cavaquinho', 'Pandeiro', 'Berimbau', 'Cuíca'],
      festivals: ['Carnaval', 'Festa Junina', 'Círio de Nazaré', 'Festival de Inverno'],
      cuisine: ['Feijoada', 'Pão de Açúcar', 'Coxinha', 'Brigadeiro', 'Açaí']
    },
    community: {
      ukPresence: 'Rapidly growing Brazilian community with strong cultural identity',
      primaryRegions: ['London', 'Brighton', 'Manchester', 'Edinburgh', 'Bristol'],
      communitySize: '180,000+ residents',
      keyOrganizations: ['Brazilian Community Centre UK', 'Samba Schools London', 'Brazilian Business Network']
    },
    events: {
      regular: [
        {
          name: 'Samba Workshops',
          type: 'Dance Classes',
          frequency: 'Weekly',
          venue: 'Community centres across London'
        },
        {
          name: 'Capoeira Roda',
          type: 'Martial Arts & Culture',
          frequency: 'Twice weekly',
          venue: 'Parks and community spaces'
        }
      ],
      annual: [
        {
          name: 'London Brazilian Carnival',
          date: 'February/March',
          description: 'Spectacular carnival celebration with samba schools and street parties'
        },
        {
          name: 'Festa Junina UK',
          date: 'June',
          description: 'Traditional June festivals with quadrilha dancing and typical foods'
        }
      ]
    },
    testimonials: [
      {
        name: 'Carla Oliveira',
        age: 31,
        profession: 'Dance Instructor',
        location: 'Brighton',
        quote: 'Teaching samba to the UK community has been my way of sharing Brazilian joy and culture.',
        highlight: 'Founded the Brighton Samba School'
      },
      {
        name: 'Rafael Silva',
        age: 26,
        profession: 'Graduate Student',
        location: 'Edinburgh',
        quote: 'The Brazilian student community here feels like family - we support each other in everything.',
        highlight: 'PhD in Engineering with community scholarship support'
      }
    ],
    callToAction: {
      primary: 'Experience the warmth and vibrancy of Brazilian culture in the UK',
      secondary: 'Join samba classes, capoeira groups, and carnival celebrations',
      buttonText: 'Explore Brazilian Community',
      actionUrl: '/communities/brazil'
    }
  },
  {
    id: 'angola',
    nation: {
      name: 'Angola',
      flag: '🇦🇴',
      iso: 'AO'
    },
    cultural: {
      primaryGenres: ['Kizomba', 'Semba', 'Kuduro', 'Música Tradicional'],
      traditionalDances: ['Kizomba', 'Semba', 'Rebita', 'Kazukuta'],
      instruments: ['Dikanza', 'Hungu', 'Kisanji', 'Ngoma'],
      festivals: ['Festival Nacional de Cultura', 'Festa do Mar', 'Festival de Música'],
      cuisine: ['Muamba de Galinha', 'Calulu', 'Funge', 'Farofa de Mandioca']
    },
    community: {
      ukPresence: 'Strong Angolan diaspora with rich cultural traditions',
      primaryRegions: ['London', 'Luton', 'Manchester', 'Birmingham'],
      communitySize: '50,000+ residents',
      keyOrganizations: ['Angolan Cultural Association UK', 'Kizomba UK Community', 'Angola Business Network']
    },
    events: {
      regular: [
        {
          name: 'Kizomba Social Dancing',
          type: 'Social Dance',
          frequency: 'Weekly',
          venue: 'Dance studios across London'
        },
        {
          name: 'Angolan Cultural Nights',
          type: 'Cultural Celebration',
          frequency: 'Monthly',
          venue: 'Community centres'
        }
      ],
      annual: [
        {
          name: 'Angola Independence Day',
          date: 'November 11',
          description: 'Celebrating Angolan independence with cultural performances and traditional foods'
        },
        {
          name: 'Kizomba Festival UK',
          date: 'August',
          description: 'International kizomba festival featuring top DJs and instructors'
        }
      ]
    },
    testimonials: [
      {
        name: 'Helena Neto',
        age: 29,
        profession: 'Kizomba Instructor',
        location: 'London',
        quote: 'Sharing kizomba with the UK has created bridges between our cultures.',
        highlight: 'International dance instructor with 500+ students'
      },
      {
        name: 'Miguel Cardoso',
        age: 35,
        profession: 'Business Owner',
        location: 'Luton',
        quote: 'The Angolan community supported me in building my successful import business.',
        highlight: 'Connects UK to Angolan art and crafts'
      }
    ],
    callToAction: {
      primary: 'Discover the rhythm and soul of Angolan culture',
      secondary: 'Learn kizomba, taste authentic Angolan cuisine, celebrate heritage',
      buttonText: 'Join Angolan Community',
      actionUrl: '/communities/angola'
    }
  },
  {
    id: 'cape-verde',
    nation: {
      name: 'Cape Verde',
      flag: '🇨🇻',
      iso: 'CV'
    },
    cultural: {
      primaryGenres: ['Morna', 'Coladeira', 'Funaná', 'Batuque'],
      traditionalDances: ['Coladeira', 'Funaná', 'Morna', 'Contradança'],
      instruments: ['Cavaquinho', 'Violão', 'Ferrinho', 'Gaita'],
      festivals: ['Festival de Verão', 'Carnaval de Mindelo', 'Festival de Santa Maria'],
      cuisine: ['Cachupa', 'Pastel com Diabo Dentro', 'Linguiça', 'Grogue']
    },
    community: {
      ukPresence: 'Vibrant Cape Verdean community with strong musical heritage',
      primaryRegions: ['London', 'Reading', 'Slough', 'Birmingham'],
      communitySize: '25,000+ residents',
      keyOrganizations: ['Cape Verdean Community Centre', 'Morna Cultural Group', 'Cape Verde UK Association']
    },
    events: {
      regular: [
        {
          name: 'Morna Music Sessions',
          type: 'Musical Performance',
          frequency: 'Monthly',
          venue: 'Cape Verdean Community Centre'
        },
        {
          name: 'Creole Language Classes',
          type: 'Language Learning',
          frequency: 'Weekly',
          venue: 'Community centres'
        }
      ],
      annual: [
        {
          name: 'Cape Verde Independence Day',
          date: 'July 5',
          description: 'Celebrating independence with traditional music, dance, and cachupa'
        },
        {
          name: 'Festival de Morna UK',
          date: 'September',
          description: 'Showcase of Cape Verdean musical talent and cultural heritage'
        }
      ]
    },
    testimonials: [
      {
        name: 'Cesária Monteiro',
        age: 42,
        profession: 'Music Teacher',
        location: 'Reading',
        quote: 'Teaching morna to young Cape Verdeans keeps our island spirit alive in the UK.',
        highlight: 'Preserves traditional music for next generation'
      },
      {
        name: 'Antonio Silva',
        age: 38,
        profession: 'Community Leader',
        location: 'London',
        quote: 'Our small but close community shows that Cape Verdean sodade travels anywhere.',
        highlight: 'Founded youth cultural preservation program'
      }
    ],
    callToAction: {
      primary: 'Feel the island breeze of Cape Verdean culture',
      secondary: 'Experience morna music, learn Creole, taste authentic cachupa',
      buttonText: 'Connect with Cape Verde',
      actionUrl: '/communities/cape-verde'
    }
  },
  {
    id: 'mozambique',
    nation: {
      name: 'Mozambique',
      flag: '🇲🇿',
      iso: 'MZ'
    },
    cultural: {
      primaryGenres: ['Marrabenta', 'Música Tradicional', 'Pandza', 'Xigubo'],
      traditionalDances: ['Marrabenta', 'Xigubo', 'Mapiko', 'Tufo'],
      instruments: ['Timbila', 'Mbira', 'Lupembe', 'Chopi'],
      festivals: ['Festival de Marrabenta', 'Festa da Independência', 'Festival Cultural'],
      cuisine: ['Matapa', 'Piri-piri Chicken', 'Xima', 'Caril de Camarão']
    },
    community: {
      ukPresence: 'Growing Mozambican community with rich cultural diversity',
      primaryRegions: ['London', 'Manchester', 'Birmingham', 'Liverpool'],
      communitySize: '15,000+ residents',
      keyOrganizations: ['Mozambican Cultural Association UK', 'Marrabenta UK', 'Mozambique Heritage Group']
    },
    events: {
      regular: [
        {
          name: 'Marrabenta Dance Classes',
          type: 'Cultural Dance',
          frequency: 'Bi-weekly',
          venue: 'Community halls'
        },
        {
          name: 'Portuguese-Mozambican Heritage Meetings',
          type: 'Cultural Exchange',
          frequency: 'Monthly',
          venue: 'Various locations'
        }
      ],
      annual: [
        {
          name: 'Mozambique Independence Day',
          date: 'June 25',
          description: 'Celebrating independence with traditional dances and Mozambican cuisine'
        },
        {
          name: 'Festival of African Heritage',
          date: 'October',
          description: 'Multicultural celebration highlighting Mozambican contributions'
        }
      ]
    },
    testimonials: [
      {
        name: 'Fatima Machel',
        age: 33,
        profession: 'Cultural Coordinator',
        location: 'Manchester',
        quote: 'Organizing cultural events helps keep Mozambican traditions alive for our children.',
        highlight: 'Coordinates heritage education programs'
      },
      {
        name: 'Eduardo Santos',
        age: 27,
        profession: 'University Researcher',
        location: 'Birmingham',
        quote: 'Researching Mozambican history while building community connections has been incredible.',
        highlight: 'PhD research on Mozambican diaspora culture'
      }
    ],
    callToAction: {
      primary: 'Explore the rich tapestry of Mozambican heritage',
      secondary: 'Dance marrabenta, learn about diverse cultures, celebrate independence',
      buttonText: 'Discover Mozambique',
      actionUrl: '/communities/mozambique'
    }
  },
  {
    id: 'guinea-bissau',
    nation: {
      name: 'Guinea-Bissau',
      flag: '🇬🇼',
      iso: 'GW'
    },
    cultural: {
      primaryGenres: ['Gumbe', 'Música Tradicional', 'Kriolu Music', 'Folk'],
      traditionalDances: ['Gumbe', 'Kussundé', 'Djambadon', 'Traditional Folk'],
      instruments: ['Balafon', 'Djembe', 'Kora', 'Traditional Drums'],
      festivals: ['Carnival de Bissau', 'Festa da Independência', 'Festival Cultural'],
      cuisine: ['Jollof Rice', 'Caldo de Mancarra', 'Boiled Fish', 'Cashew Fruits']
    },
    community: {
      ukPresence: 'Emerging Guinea-Bissau community with strong cultural identity',
      primaryRegions: ['London', 'Birmingham', 'Manchester'],
      communitySize: '8,000+ residents',
      keyOrganizations: ['Guinea-Bissau UK Association', 'Gumbe Cultural Group', 'West African Heritage UK']
    },
    events: {
      regular: [
        {
          name: 'Gumbe Music Sessions',
          type: 'Musical Performance',
          frequency: 'Monthly',
          venue: 'Community centres'
        },
        {
          name: 'Kriolu Language Circle',
          type: 'Language Preservation',
          frequency: 'Weekly',
          venue: 'Various locations'
        }
      ],
      annual: [
        {
          name: 'Guinea-Bissau Independence Day',
          date: 'September 24',
          description: 'Celebrating independence with traditional music and communal meals'
        },
        {
          name: 'West African Cultural Festival',
          date: 'May',
          description: 'Showcasing Guinea-Bissau culture alongside other West African nations'
        }
      ]
    },
    testimonials: [
      {
        name: 'Amina Djalo',
        age: 36,
        profession: 'Social Worker',
        location: 'London',
        quote: 'Building bridges between Guinea-Bissau traditions and UK opportunities for our families.',
        highlight: 'Supports integration while preserving culture'
      },
      {
        name: 'Carlos Embalo',
        age: 30,
        profession: 'Community Organizer',
        location: 'Birmingham',
        quote: 'Our small community has big dreams and strong solidarity.',
        highlight: 'Founded youth empowerment programs'
      }
    ],
    callToAction: {
      primary: 'Experience the warmth of Guinea-Bissau community spirit',
      secondary: 'Join gumbe sessions, learn Kriolu, celebrate West African heritage',
      buttonText: 'Join Guinea-Bissau Community',
      actionUrl: '/communities/guinea-bissau'
    }
  },
  {
    id: 'sao-tome-principe',
    nation: {
      name: 'São Tomé & Príncipe',
      flag: '🇸🇹',
      iso: 'ST'
    },
    cultural: {
      primaryGenres: ['Ussua', 'Socopé', 'Dança Congó', 'Puita'],
      traditionalDances: ['Ussua', 'Socopé', 'Dança Congó', 'Tchiloli'],
      instruments: ['Caixa', 'Corneta', 'Traditional Drums', 'String instruments'],
      festivals: ['Festival de São Lourenço', 'Auto de Floripes', 'Tchiloli'],
      cuisine: ['Calulu', 'Fish Stew', 'Breadfruit', 'Coconut Dishes']
    },
    community: {
      ukPresence: 'Small but culturally rich São Toméan community',
      primaryRegions: ['London', 'Birmingham', 'Manchester'],
      communitySize: '3,000+ residents',
      keyOrganizations: ['São Tomé UK Cultural Association', 'Island Heritage Group', 'Atlantic Islands Community']
    },
    events: {
      regular: [
        {
          name: 'Island Culture Gatherings',
          type: 'Cultural Celebration',
          frequency: 'Monthly',
          venue: 'Community centres'
        },
        {
          name: 'Tchiloli Performance Workshops',
          type: 'Traditional Theatre',
          frequency: 'Seasonal',
          venue: 'Arts centres'
        }
      ],
      annual: [
        {
          name: 'São Tomé Independence Day',
          date: 'July 12',
          description: 'Celebrating island independence with traditional performances and cuisine'
        },
        {
          name: 'Atlantic Islands Festival',
          date: 'August',
          description: 'Celebrating island cultures and maritime heritage'
        }
      ]
    },
    testimonials: [
      {
        name: 'Isabel Neves',
        age: 41,
        profession: 'Arts Teacher',
        location: 'London',
        quote: 'Teaching Tchiloli theatre keeps our island storytelling traditions alive.',
        highlight: 'Preserves traditional theatrical arts'
      },
      {
        name: 'Manuel Costa',
        age: 45,
        profession: 'Cultural Preservationist',
        location: 'Birmingham',
        quote: 'Our island may be small, but our culture is vast and beautiful.',
        highlight: 'Documents and shares island cultural heritage'
      }
    ],
    callToAction: {
      primary: 'Discover the hidden treasures of São Toméan culture',
      secondary: 'Experience island traditions, learn Tchiloli theatre, taste island cuisine',
      buttonText: 'Explore Island Culture',
      actionUrl: '/communities/sao-tome-principe'
    }
  },
  {
    id: 'east-timor',
    nation: {
      name: 'East Timor (Timor-Leste)',
      flag: '🇹🇱',
      iso: 'TL'
    },
    cultural: {
      primaryGenres: ['Traditional Folk', 'Dadolin', 'Portuguese Influence', 'Modern Fusion'],
      traditionalDances: ['Tebe Dai', 'Traditional Circle Dances', 'Ceremonial Dances'],
      instruments: ['Babadok', 'Traditional Drums', 'Bamboo Instruments', 'Guitar'],
      festivals: ['Independence Day', 'Traditional Harvest Festivals', 'Cultural Heritage Days'],
      cuisine: ['Batar Da\'an', 'Ikan Pepes', 'Tapai', 'Portuguese-influenced dishes']
    },
    community: {
      ukPresence: 'Small but resilient East Timorese community with strong identity',
      primaryRegions: ['London', 'Portsmouth', 'Birmingham'],
      communitySize: '2,000+ residents',
      keyOrganizations: ['East Timor UK Association', 'Timor-Leste Cultural Group', 'Southeast Asian Heritage UK']
    },
    events: {
      regular: [
        {
          name: 'Tetum Language Classes',
          type: 'Language Learning',
          frequency: 'Weekly',
          venue: 'Community centres'
        },
        {
          name: 'Cultural Heritage Sharing',
          type: 'Community Gathering',
          frequency: 'Monthly',
          venue: 'Various locations'
        }
      ],
      annual: [
        {
          name: 'East Timor Independence Day',
          date: 'May 20',
          description: 'Celebrating independence with cultural performances and traditional foods'
        },
        {
          name: 'Southeast Asian Cultural Festival',
          date: 'September',
          description: 'Multicultural celebration featuring East Timorese heritage'
        }
      ]
    },
    testimonials: [
      {
        name: 'Maria Guterres',
        age: 38,
        profession: 'Community Coordinator',
        location: 'Portsmouth',
        quote: 'Keeping East Timorese culture alive while building new roots in the UK.',
        highlight: 'Bridges generational and cultural gaps'
      },
      {
        name: 'José Ramos',
        age: 32,
        profession: 'Graduate Student',
        location: 'London',
        quote: 'Studying here while maintaining connections to our homeland and culture.',
        highlight: 'PhD in International Relations with focus on small nations'
      }
    ],
    callToAction: {
      primary: 'Connect with the resilient spirit of East Timorese culture',
      secondary: 'Learn Tetum, experience traditional dances, celebrate independence heritage',
      buttonText: 'Join Timor-Leste Community',
      actionUrl: '/communities/east-timor'
    }
  }
]

// Cultural events aggregated across all nations
export const CROSS_CULTURAL_EVENTS = [
  {
    name: 'Lusophone Heritage Month',
    date: 'May',
    description: 'Month-long celebration of all Portuguese-speaking cultures',
    nations: ['all'],
    type: 'Heritage Celebration'
  },
  {
    name: 'Portuguese Language Day',
    date: 'May 5',
    description: 'Celebrating the shared Portuguese language across all nations',
    nations: ['all'],
    type: 'Language Celebration'
  },
  {
    name: 'PALOP Cultural Festival',
    date: 'October',
    description: 'African Portuguese-speaking nations cultural showcase',
    nations: ['angola', 'cape-verde', 'mozambique', 'guinea-bissau', 'sao-tome-principe'],
    type: 'Multi-Cultural Festival'
  },
  {
    name: 'Atlantic Portuguese Communities Gathering',
    date: 'September',
    description: 'Connecting Portuguese communities across the Atlantic',
    nations: ['portugal', 'brazil', 'cape-verde'],
    type: 'Community Networking'
  }
]

// Call-to-action configurations
export const CTA_THEMES = {
  primary: {
    bgColor: 'bg-heritage-primary',
    textColor: 'text-white',
    hoverColor: 'hover:bg-heritage-primary-dark'
  },
  secondary: {
    bgColor: 'bg-heritage-secondary',
    textColor: 'text-white',
    hoverColor: 'hover:bg-heritage-secondary-dark'
  },
  accent: {
    bgColor: 'bg-heritage-accent',
    textColor: 'text-heritage-primary',
    hoverColor: 'hover:bg-heritage-accent-dark'
  }
}

// Export default configuration for easy import
export default PALOP_CULTURAL_SECTIONS