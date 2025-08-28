/**
 * University Partnerships Configuration
 * 
 * Centralized configuration for all United Kingdom university partnerships,
 * Lusophone student counts, and academic contacts.
 */

// University Partnership Data
export interface UniversityPartnership {
  id: string;
  name: string;
  namePortuguese: string;
  shortName: string;
  region: 'london' | 'england' | 'scotland' | 'wales' | 'northern_ireland';
  type: 'russell_group' | 'london_university' | 'red_brick' | 'modern' | 'specialist' | 'ancient';
  
  // Partnership Details
  partnershipLevel: 'strategic' | 'official' | 'community' | 'pending';
  partnershipStartDate: string;
  
  // Student Demographics
  totalStudents: number;
  portugueseStudents: number;
  brazilianStudents: number;
  lusoTownMembers: number;
  
  // Contact Information
  contact: {
    name: string;
    title: string;
    email: string;
    phone?: string;
    department: string;
    office?: string;
    bio?: string;
  };
  
  // Location and URLs
  address: {
    street: string;
    city: string;
    postcode: string;
    coordinates?: { lat: number; lng: number };
  };
  website: string;
  portugueseStudiesPage?: string;
  
  // Programs and Services
  hasPortugueseProgram: boolean;
  portugalStudyAbroad: boolean;
  culturalPrograms: string[];
  academicSupport: string[];
  
  // Social Media
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  
  // Portuguese Society Information
  portugueseSociety?: {
    name: string;
    active: boolean;
    contactEmail?: string;
    whatsappGroup?: string;
    instagramHandle?: string;
    meetingFrequency?: string;
    memberCount?: number;
    activities: string[];
  };
  
  // Student Services Integration
  studentServices: {
    discountVerification: boolean;
    academicSupport: boolean;
    mentorshipProgram: boolean;
    careerGuidance: boolean;
    accommodationSupport: boolean;
  };
}

// University Partnerships Data
export const UNIVERSITY_PARTNERSHIPS: UniversityPartnership[] = [
  {
    id: 'ucl',
    name: 'University College London',
    namePortuguese: 'University College London',
    shortName: 'UCL',
    region: 'london',
    type: 'london_university',
    partnershipLevel: 'strategic',
    partnershipStartDate: '2024-01-01',
    totalStudents: 42000,
    portugueseStudents: parseInt(process.env.NEXT_PUBLIC_UCL_PORTUGUESE_STUDENTS || '340'),
    brazilianStudents: parseInt(process.env.NEXT_PUBLIC_UCL_BRAZILIAN_STUDENTS || '85'),
    lusoTownMembers: parseInt(process.env.NEXT_PUBLIC_UCL_LUSOTOWN_MEMBERS || '180'),
    contact: {
      name: process.env.NEXT_PUBLIC_UCL_CONTACT_NAME || 'Dr. Maria Fernandes',
      title: process.env.NEXT_PUBLIC_UCL_CONTACT_TITLE || 'Head of Lusophone Studies',
      email: process.env.NEXT_PUBLIC_UCL_CONTACT_EMAIL || 'portuguese.studies@ucl.ac.uk',
      phone: process.env.NEXT_PUBLIC_UCL_CONTACT_PHONE || '+44 20 7679 7031',
      department: 'Department of Spanish, Lusophone and Latin American Studies',
      office: 'Foster Court, UCL',
      bio: 'Leading Lusophone studies academic with expertise in contemporary Lusophone literature and digital humanities.'
    },
    address: {
      street: 'Gower Street',
      city: 'London',
      postcode: 'WC1E 6BT',
      coordinates: { lat: 51.5246, lng: -0.1340 }
    },
    website: process.env.NEXT_PUBLIC_UCL_URL || 'https://www.ucl.ac.uk',
    portugueseStudiesPage: process.env.NEXT_PUBLIC_UCL_PORTUGUESE_URL || 'https://www.ucl.ac.uk/selcs/departments/spanish-portuguese-latin-american-studies',
    hasPortugueseProgram: true,
    portugalStudyAbroad: true,
    culturalPrograms: ['Lusophone Cultural Nights', 'Fado Workshops', 'Lusophone Film Screenings'],
    academicSupport: ['Lusophone Language Exchange', 'Academic Mentorship', 'Thesis Support'],
    socialMedia: {
      twitter: 'https://twitter.com/UCLPortuguese',
      facebook: 'https://facebook.com/UCLPortugueseStudies',
      instagram: '@ucl_portuguese'
    },
    portugueseSociety: {
      name: 'UCL Portuguese Society',
      active: true,
      contactEmail: 'portuguese.society@ucl.ac.uk',
      whatsappGroup: 'https://chat.whatsapp.com/UCLPortugueseSociety',
      instagramHandle: '@ucl_portuguese_society',
      meetingFrequency: 'Weekly on Wednesdays',
      memberCount: 145,
      activities: [
        'Weekly Portuguese conversation circles',
        'Cultural movie nights with Portuguese films',
        'Traditional Portuguese cooking workshops',
        'Fado music appreciation sessions',
        'Portuguese language exchange program',
        'Academic study groups for Portuguese studies students',
        'Annual Festa Junina celebration',
        'Career networking with Portuguese professionals in London'
      ]
    },
    studentServices: {
      discountVerification: true,
      academicSupport: true,
      mentorshipProgram: true,
      careerGuidance: true,
      accommodationSupport: true
    }
  },
  {
    id: 'kings-college',
    name: "King's College London",
    namePortuguese: "King's College London",
    shortName: 'KCL',
    region: 'london',
    type: 'london_university',
    partnershipLevel: 'strategic',
    partnershipStartDate: '2024-02-01',
    totalStudents: 32000,
    portugueseStudents: parseInt(process.env.NEXT_PUBLIC_KCL_PORTUGUESE_STUDENTS || '340'),
    brazilianStudents: parseInt(process.env.NEXT_PUBLIC_KCL_BRAZILIAN_STUDENTS || '75'),
    lusoTownMembers: parseInt(process.env.NEXT_PUBLIC_KCL_LUSOTOWN_MEMBERS || '220'),
    contact: {
      name: process.env.NEXT_PUBLIC_KCL_CONTACT_NAME || 'Prof. Carlos Mendes',
      title: process.env.NEXT_PUBLIC_KCL_CONTACT_TITLE || 'Lusophone Studies Coordinator',
      email: process.env.NEXT_PUBLIC_KCL_CONTACT_EMAIL || 'portuguese@kcl.ac.uk',
      phone: process.env.NEXT_PUBLIC_KCL_CONTACT_PHONE || '+44 20 7848 2299',
      department: 'Department of Modern Language Centre',
      office: 'Virginia Woolf Building, KCL'
    },
    address: {
      street: 'Strand',
      city: 'London',
      postcode: 'WC2R 2LS',
      coordinates: { lat: 51.5115, lng: -0.1160 }
    },
    website: process.env.NEXT_PUBLIC_KCL_URL || 'https://www.kcl.ac.uk',
    hasPortugueseProgram: true,
    portugalStudyAbroad: true,
    culturalPrograms: ['Lusophone Society Events', 'Cultural Exchange Programs'],
    academicSupport: ['Study Groups', 'Career Guidance', 'Language Practice'],
    portugueseSociety: {
      name: 'KCL Portuguese & Lusophone Society',
      active: true,
      contactEmail: 'portuguese@kclsu.org',
      instagramHandle: '@kcl_portuguese',
      meetingFrequency: 'Bi-weekly on Fridays',
      memberCount: 98,
      activities: [
        'Portuguese and Brazilian cultural exchange',
        'Academic support for language students',
        'Professional networking events',
        'Cultural trips to Portuguese neighborhoods in London',
        'Portuguese literature discussion groups',
        'Sports and social activities'
      ]
    },
    studentServices: {
      discountVerification: true,
      academicSupport: true,
      mentorshipProgram: true,
      careerGuidance: true,
      accommodationSupport: true
    }
  },
  {
    id: 'imperial-college',
    name: 'Imperial College London',
    namePortuguese: 'Imperial College London',
    shortName: 'Imperial',
    region: 'london',
    type: 'specialist',
    partnershipLevel: 'official',
    partnershipStartDate: '2024-03-01',
    totalStudents: 17000,
    portugueseStudents: parseInt(process.env.NEXT_PUBLIC_IMPERIAL_PORTUGUESE_STUDENTS || '280'),
    brazilianStudents: parseInt(process.env.NEXT_PUBLIC_IMPERIAL_BRAZILIAN_STUDENTS || '65'),
    lusoTownMembers: parseInt(process.env.NEXT_PUBLIC_IMPERIAL_LUSOTOWN_MEMBERS || '150'),
    contact: {
      name: process.env.NEXT_PUBLIC_IMPERIAL_CONTACT_NAME || 'Dr. Ana Silva',
      title: process.env.NEXT_PUBLIC_IMPERIAL_CONTACT_TITLE || 'International Student Liaison',
      email: process.env.NEXT_PUBLIC_IMPERIAL_CONTACT_EMAIL || 'portuguese.students@imperial.ac.uk',
      phone: process.env.NEXT_PUBLIC_IMPERIAL_CONTACT_PHONE || '+44 20 7594 8040',
      department: 'International Office'
    },
    address: {
      street: 'South Kensington Campus, Exhibition Road',
      city: 'London',
      postcode: 'SW7 2AZ',
      coordinates: { lat: 51.4988, lng: -0.1749 }
    },
    website: process.env.NEXT_PUBLIC_IMPERIAL_URL || 'https://www.imperial.ac.uk',
    hasPortugueseProgram: false,
    portugalStudyAbroad: false,
    culturalPrograms: ['Lusophone Engineering Society', 'Innovation Labs'],
    academicSupport: ['Technical Mentorship', 'Research Opportunities'],
    studentServices: {
      discountVerification: true,
      academicSupport: true,
      mentorshipProgram: false,
      careerGuidance: true,
      accommodationSupport: false
    }
  },
  {
    id: 'lse',
    name: 'London School of Economics',
    namePortuguese: 'Escola de Economia de Londres',
    shortName: 'LSE',
    region: 'london',
    type: 'specialist',
    partnershipLevel: 'official',
    partnershipStartDate: '2024-02-15',
    totalStudents: 12000,
    portugueseStudents: parseInt(process.env.NEXT_PUBLIC_LSE_PORTUGUESE_STUDENTS || '220'),
    brazilianStudents: parseInt(process.env.NEXT_PUBLIC_LSE_BRAZILIAN_STUDENTS || '45'),
    lusoTownMembers: parseInt(process.env.NEXT_PUBLIC_LSE_LUSOTOWN_MEMBERS || '140'),
    contact: {
      name: process.env.NEXT_PUBLIC_LSE_CONTACT_NAME || 'Prof. Ricardo Santos',
      title: process.env.NEXT_PUBLIC_LSE_CONTACT_TITLE || 'Lusophone Academic Coordinator',
      email: process.env.NEXT_PUBLIC_LSE_CONTACT_EMAIL || 'r.santos@lse.ac.uk',
      phone: process.env.NEXT_PUBLIC_LSE_CONTACT_PHONE || '+44 20 7955 7425',
      department: 'European Institute'
    },
    address: {
      street: 'Houghton Street',
      city: 'London',
      postcode: 'WC2A 2AE',
      coordinates: { lat: 51.5145, lng: -0.1167 }
    },
    website: process.env.NEXT_PUBLIC_LSE_URL || 'https://www.lse.ac.uk',
    hasPortugueseProgram: false,
    portugalStudyAbroad: true,
    culturalPrograms: ['Lusophone Economics Society', 'Business Networking'],
    academicSupport: ['Career Services', 'Alumni Network'],
    portugueseSociety: {
      name: 'LSE Portuguese & Brazilian Society',
      active: true,
      contactEmail: 'portuguese@lse.ac.uk',
      instagramHandle: '@lse_portuguese',
      meetingFrequency: 'Monthly meetups',
      memberCount: 67,
      activities: [
        'Business networking with Portuguese entrepreneurs',
        'Economic policy discussions in Portuguese',
        'Career development workshops',
        'Alumni mentor matching program',
        'Portuguese business case study sessions'
      ]
    },
    studentServices: {
      discountVerification: true,
      academicSupport: true,
      mentorshipProgram: true,
      careerGuidance: true,
      accommodationSupport: false
    }
  },
  {
    id: 'oxford',
    name: 'University of Oxford',
    namePortuguese: 'Universidade de Oxford',
    shortName: 'Oxford',
    region: 'england',
    type: 'ancient',
    partnershipLevel: 'community',
    partnershipStartDate: '2024-04-01',
    totalStudents: 24000,
    portugueseStudents: parseInt(process.env.NEXT_PUBLIC_OXFORD_PORTUGUESE_STUDENTS || '95'),
    brazilianStudents: parseInt(process.env.NEXT_PUBLIC_OXFORD_BRAZILIAN_STUDENTS || '25'),
    lusoTownMembers: parseInt(process.env.NEXT_PUBLIC_OXFORD_LUSOTOWN_MEMBERS || '60'),
    contact: {
      name: process.env.NEXT_PUBLIC_OXFORD_CONTACT_NAME || 'Dr. Ana Rebelo',
      title: process.env.NEXT_PUBLIC_OXFORD_CONTACT_TITLE || 'Lusophone Studies Fellow',
      email: process.env.NEXT_PUBLIC_OXFORD_CONTACT_EMAIL || 'portuguese@ox.ac.uk',
      phone: process.env.NEXT_PUBLIC_OXFORD_CONTACT_PHONE || '+44 1865 270000',
      department: 'Faculty of Medieval and Modern Languages'
    },
    address: {
      street: 'Wellington Square',
      city: 'Oxford',
      postcode: 'OX1 2JD',
      coordinates: { lat: 51.7520, lng: -1.2577 }
    },
    website: process.env.NEXT_PUBLIC_OXFORD_URL || 'https://www.ox.ac.uk',
    hasPortugueseProgram: true,
    portugalStudyAbroad: true,
    culturalPrograms: ['Oxford Lusophone Society', 'Academic Conferences'],
    academicSupport: ['Research Collaboration', 'Academic Publishing'],
    studentServices: {
      discountVerification: false,
      academicSupport: true,
      mentorshipProgram: false,
      careerGuidance: true,
      accommodationSupport: false
    }
  },
  {
    id: 'cambridge',
    name: 'University of Cambridge',
    namePortuguese: 'Universidade de Cambridge',
    shortName: 'Cambridge',
    region: 'england',
    type: 'ancient',
    partnershipLevel: 'community',
    partnershipStartDate: '2024-04-15',
    totalStudents: 23000,
    portugueseStudents: parseInt(process.env.NEXT_PUBLIC_CAMBRIDGE_PORTUGUESE_STUDENTS || '85'),
    brazilianStudents: parseInt(process.env.NEXT_PUBLIC_CAMBRIDGE_BRAZILIAN_STUDENTS || '20'),
    lusoTownMembers: parseInt(process.env.NEXT_PUBLIC_CAMBRIDGE_LUSOTOWN_MEMBERS || '45'),
    contact: {
      name: process.env.NEXT_PUBLIC_CAMBRIDGE_CONTACT_NAME || 'Prof. Helena Costa',
      title: process.env.NEXT_PUBLIC_CAMBRIDGE_CONTACT_TITLE || 'Lusophone Literature Specialist',
      email: process.env.NEXT_PUBLIC_CAMBRIDGE_CONTACT_EMAIL || 'hc@cam.ac.uk',
      phone: process.env.NEXT_PUBLIC_CAMBRIDGE_CONTACT_PHONE || '+44 1223 335000',
      department: 'Department of Spanish and Lusophone'
    },
    address: {
      street: 'Trinity Lane',
      city: 'Cambridge',
      postcode: 'CB2 1TN',
      coordinates: { lat: 51.2080, lng: 0.1186 }
    },
    website: process.env.NEXT_PUBLIC_CAMBRIDGE_URL || 'https://www.cam.ac.uk',
    hasPortugueseProgram: true,
    portugalStudyAbroad: true,
    culturalPrograms: ['Lusophone Literary Society', 'Cultural Heritage Events'],
    academicSupport: ['Research Opportunities', 'Academic Mentorship'],
    studentServices: {
      discountVerification: false,
      academicSupport: true,
      mentorshipProgram: false,
      careerGuidance: true,
      accommodationSupport: false
    }
  },
  {
    id: 'manchester',
    name: 'University of Manchester',
    namePortuguese: 'Universidade de Manchester',
    shortName: 'Manchester',
    region: 'england',
    type: 'red_brick',
    partnershipLevel: 'pending',
    partnershipStartDate: '2024-06-01',
    totalStudents: 40000,
    portugueseStudents: parseInt(process.env.NEXT_PUBLIC_MANCHESTER_PORTUGUESE_STUDENTS || '120'),
    brazilianStudents: parseInt(process.env.NEXT_PUBLIC_MANCHESTER_BRAZILIAN_STUDENTS || '30'),
    lusoTownMembers: parseInt(process.env.NEXT_PUBLIC_MANCHESTER_LUSOTOWN_MEMBERS || '75'),
    contact: {
      name: process.env.NEXT_PUBLIC_MANCHESTER_CONTACT_NAME || 'Dr. João Silva',
      title: process.env.NEXT_PUBLIC_MANCHESTER_CONTACT_TITLE || 'International Student Coordinator',
      email: process.env.NEXT_PUBLIC_MANCHESTER_CONTACT_EMAIL || 'portuguese@manchester.ac.uk',
      department: 'International Office'
    },
    address: {
      street: 'Oxford Road',
      city: 'Manchester',
      postcode: 'M13 9PL',
      coordinates: { lat: 53.4668, lng: -2.2339 }
    },
    website: process.env.NEXT_PUBLIC_MANCHESTER_URL || 'https://www.manchester.ac.uk',
    hasPortugueseProgram: false,
    portugalStudyAbroad: false,
    culturalPrograms: ['Lusophone Student Network'],
    academicSupport: ['Career Guidance'],
    studentServices: {
      discountVerification: false,
      academicSupport: true,
      mentorshipProgram: false,
      careerGuidance: true,
      accommodationSupport: true
    }
  },
  {
    id: 'edinburgh',
    name: 'University of Edinburgh',
    namePortuguese: 'Universidade de Edimburgo',
    shortName: 'Edinburgh',
    region: 'scotland',
    type: 'ancient',
    partnershipLevel: 'pending',
    partnershipStartDate: '2024-07-01',
    totalStudents: 35000,
    portugueseStudents: parseInt(process.env.NEXT_PUBLIC_EDINBURGH_PORTUGUESE_STUDENTS || '90'),
    brazilianStudents: parseInt(process.env.NEXT_PUBLIC_EDINBURGH_BRAZILIAN_STUDENTS || '25'),
    lusoTownMembers: parseInt(process.env.NEXT_PUBLIC_EDINBURGH_LUSOTOWN_MEMBERS || '50'),
    contact: {
      name: process.env.NEXT_PUBLIC_EDINBURGH_CONTACT_NAME || 'Dr. Maria Campbell',
      title: process.env.NEXT_PUBLIC_EDINBURGH_CONTACT_TITLE || 'Lusophone Cultural Coordinator',
      email: process.env.NEXT_PUBLIC_EDINBURGH_CONTACT_EMAIL || 'portuguese@ed.ac.uk',
      department: 'School of Literatures, Languages and Cultures'
    },
    address: {
      street: 'Old College, South Bridge',
      city: 'Edinburgh',
      postcode: 'EH8 9YL',
      coordinates: { lat: 55.9485, lng: -3.1878 }
    },
    website: process.env.NEXT_PUBLIC_EDINBURGH_URL || 'https://www.ed.ac.uk',
    hasPortugueseProgram: false,
    portugalStudyAbroad: true,
    culturalPrograms: ['Scottish-Lusophone Cultural Exchange'],
    academicSupport: ['International Student Support'],
    studentServices: {
      discountVerification: false,
      academicSupport: true,
      mentorshipProgram: false,
      careerGuidance: false,
      accommodationSupport: true
    }
  }
];

// University Statistics Aggregation
export const UNIVERSITY_STATS = {
  totalPartnerships: UNIVERSITY_PARTNERSHIPS.length,
  totalPortugueseStudents: UNIVERSITY_PARTNERSHIPS.reduce((sum, uni) => sum + uni.portugueseStudents, 0),
  totalBrazilianStudents: UNIVERSITY_PARTNERSHIPS.reduce((sum, uni) => sum + uni.brazilianStudents, 0),
  totalLusoTownMembers: UNIVERSITY_PARTNERSHIPS.reduce((sum, uni) => sum + uni.lusoTownMembers, 0),
  strategicPartnerships: UNIVERSITY_PARTNERSHIPS.filter(uni => uni.partnershipLevel === 'strategic').length,
  officialPartnerships: UNIVERSITY_PARTNERSHIPS.filter(uni => uni.partnershipLevel === 'official').length,
  communityPartnerships: UNIVERSITY_PARTNERSHIPS.filter(uni => uni.partnershipLevel === 'community').length,
  pendingPartnerships: UNIVERSITY_PARTNERSHIPS.filter(uni => uni.partnershipLevel === 'pending').length,
  londonUniversities: UNIVERSITY_PARTNERSHIPS.filter(uni => uni.region === 'london').length,
  portugueseProgramUniversities: UNIVERSITY_PARTNERSHIPS.filter(uni => uni.hasPortugueseProgram).length
};

// Helper Functions
export const getUniversityById = (id: string): UniversityPartnership | undefined => {
  return UNIVERSITY_PARTNERSHIPS.find(uni => uni.id === id);
};

export const getUniversitiesByRegion = (region: string): UniversityPartnership[] => {
  return UNIVERSITY_PARTNERSHIPS.filter(uni => uni.region === region);
};

export const getUniversitiesByPartnershipLevel = (level: string): UniversityPartnership[] => {
  return UNIVERSITY_PARTNERSHIPS.filter(uni => uni.partnershipLevel === level);
};

export const getLondonUniversities = (): UniversityPartnership[] => {
  return getUniversitiesByRegion('london');
};

export const getPartnerUniversities = (): UniversityPartnership[] => {
  return UNIVERSITY_PARTNERSHIPS.filter(uni => 
    ['strategic', 'official', 'community'].includes(uni.partnershipLevel)
  );
};

export const getUniversitiesWithPortuguesePrograms = (): UniversityPartnership[] => {
  return UNIVERSITY_PARTNERSHIPS.filter(uni => uni.hasPortugueseProgram);
};

// Environment-configurable stats for backward compatibility
export const universityStats = {
  partnerships: process.env.NEXT_PUBLIC_UNIVERSITY_PARTNERSHIPS || UNIVERSITY_STATS.totalPartnerships.toString(),
  students: process.env.NEXT_PUBLIC_TOTAL_STUDENTS || UNIVERSITY_STATS.totalPortugueseStudents.toString(),
  londonStudents: process.env.NEXT_PUBLIC_LONDON_STUDENTS || getLondonUniversities().reduce((sum, uni) => sum + uni.portugueseStudents, 0).toString(),
  lusoTownMembers: process.env.NEXT_PUBLIC_UNIVERSITY_LUSOTOWN_MEMBERS || UNIVERSITY_STATS.totalLusoTownMembers.toString()
};

// Export default for easy importing
export default {
  UNIVERSITY_PARTNERSHIPS,
  UNIVERSITY_STATS,
  universityStats,
  getUniversityById,
  getUniversitiesByRegion,
  getUniversitiesByPartnershipLevel,
  getLondonUniversities,
  getPartnerUniversities,
  getUniversitiesWithPortuguesePrograms
};