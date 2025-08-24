/**
 * Portuguese-speaking Community Cultural Events Configuration
 * Authentic events representing diverse lusophone cultures
 * Environment-configurable for cultural authenticity
 */

export interface CulturalEvent {
  id: string
  name: string
  namePortuguese: string
  type: 'kizomba' | 'fado' | 'business' | 'cultural' | 'food' | 'music' | 'dance' | 'festival' | 'networking'
  
  // Event details
  description: string
  descriptionPortuguese: string
  longDescription: string
  longDescriptionPortuguese: string
  
  // Cultural context
  origin: string
  flag: string
  culturalBackground: string
  culturalBackgroundPortuguese: string
  
  // Location and logistics
  venue: string
  address: string
  postcode: string
  capacity: number
  
  // Timing
  frequency: string
  dayOfWeek: string
  time: string
  duration: string
  
  // Community aspects
  targetAudience: string[]
  ageRange: string
  skillLevel: string
  atmosphere: string
  
  // Pricing
  price: string
  priceDetails: string
  studentDiscount: boolean
  groupDiscount: boolean
  
  // Social proof
  attendanceAverage: number
  testimonials: EventTestimonial[]
  popularityScore: number
  
  // Cultural authenticity
  authenticityFeatures: string[]
  culturalEducation: string[]
  partnerOrganizations: string[]
  
  // Visual elements
  image: string
  gallery?: string[]
  
  // Contact information
  organizer: string
  contactEmail: string
  socialMedia: {
    instagram?: string
    facebook?: string
    twitter?: string
  }
  
  // Status
  isActive: boolean
  featured: boolean
  isRegularEvent: boolean
}

export interface EventTestimonial {
  name: string
  origin: string
  quote: string
  quotePortuguese: string
}

/**
 * Authentic Portuguese-speaking Community Cultural Events
 */
export const CULTURAL_EVENTS: CulturalEvent[] = [
  
  // KIZOMBA & DANCE EVENTS
  {
    id: 'chocolate-kizomba-tuesday',
    name: 'Chocolate Kizomba - Sensual Angolan Dance Night',
    namePortuguese: 'Chocolate Kizomba - Noite de Dança Sensual Angolana',
    type: 'kizomba',
    
    description: 'Experience authentic Kizomba - Angola\'s sensual dance gift to the Portuguese-speaking world. Whether you\'re single and looking to connect or wanting to celebrate our African Lusophone heritage, Chocolate Kizomba welcomes all skill levels.',
    descriptionPortuguese: 'Experimente Kizomba autêntica - o presente de dança sensual de Angola para o mundo lusófono. Quer esteja solteiro e procurando conectar ou querendo celebrar nossa herança africana lusófona, Chocolate Kizomba acolhe todos os níveis.',
    
    longDescription: 'Chocolate Kizomba is London\'s premier Angolan dance experience, held every Tuesday and Thursday at the prestigious One Regent Street. Founded by Angolan dance masters, this event celebrates Kizomba as more than just dance - it\'s cultural storytelling through movement. Originating in 1980s Angola, Kizomba blends traditional Semba with Portuguese influences, creating the romantic partner dance that has captivated Portuguese-speaking communities worldwide. Each evening begins with beginner-friendly instruction, ensuring newcomers feel welcomed into our cultural family. As the night progresses, the dance floor fills with the magnetic energy that makes Kizomba irresistible - intimate connections, sensual rhythms, and the unmistakable warmth of Portuguese-speaking hospitality. Advanced dancers share their knowledge freely, creating an inclusive environment where cultural traditions pass naturally between generations. Many lasting relationships - both romantic and friendship - have blossomed on our dance floor, proving that authentic cultural experiences create genuine human connections.',
    longDescriptionPortuguese: 'Chocolate Kizomba é a principal experiência de dança angolana de Londres, realizada todas as terças e quintas-feiras no prestigioso One Regent Street. Fundado por mestres de dança angolanos, este evento celebra Kizomba como mais do que apenas dança - é narrativa cultural através do movimento. Originando na Angola dos anos 1980, Kizomba mistura Semba tradicional com influências portuguesas, criando a dança romântica de parceiros que cativou comunidades lusófonas mundialmente. Cada noite começa com instrução amigável para iniciantes, garantindo que novatos se sintam bem-vindos na nossa família cultural. Conforme a noite progride, a pista de dança enche-se com a energia magnética que torna Kizomba irresistível - conexões íntimas, ritmos sensuais e o calor inconfundível da hospitalidade lusófona. Dançarinos avançados compartilham seu conhecimento livremente, criando um ambiente inclusivo onde tradições culturais passam naturalmente entre gerações. Muitos relacionamentos duradouros - tanto românticos quanto de amizade - floresceram na nossa pista, provando que experiências culturais autênticas criam conexões humanas genuínas.',
    
    origin: 'Angola (Luanda)',
    flag: '🇦🇴',
    culturalBackground: 'Kizomba originated in 1980s Angola, blending traditional Semba with Portuguese influences. Today it\'s the heartbeat of romantic connection across all Portuguese-speaking communities - from Luanda to London.',
    culturalBackgroundPortuguese: 'Kizomba originou na Angola dos anos 1980, misturando Semba tradicional com influências portuguesas. Hoje é o batimento cardíaco da conexão romântica em todas as comunidades lusófonas - de Luanda a Londres.',
    
    venue: 'One Regent Street - Premium Dance Venue',
    address: '1 Regent Street, Piccadilly Circus',
    postcode: 'SW1Y 4NR',
    capacity: 150,
    
    frequency: 'Twice weekly',
    dayOfWeek: 'Tuesday & Thursday',
    time: '8:00pm - Late',
    duration: '4+ hours',
    
    targetAudience: ['Singles seeking connection', 'Couples exploring culture', 'Portuguese-speaking community', 'Dance enthusiasts', 'Cultural explorers'],
    ageRange: '21-45 (all ages welcome)',
    skillLevel: 'All levels - beginner instruction provided',
    atmosphere: 'Intimate, sensual, culturally authentic, welcoming',
    
    price: '£15-20 entry',
    priceDetails: '£15 early bird / £20 regular / £12 students with valid ID',
    studentDiscount: true,
    groupDiscount: true,
    
    attendanceAverage: 85,
    testimonials: [
      {
        name: 'Ana & Miguel',
        origin: 'Brazil & Portugal',
        quote: 'Met at Chocolate Kizomba, married 6 months later with 200 Portuguese-speaking community members celebrating!',
        quotePortuguese: 'Conhecemo-nos no Chocolate Kizomba, casámos 6 meses depois com 200 membros da comunidade lusófona celebrando!'
      },
      {
        name: 'Carlos',
        origin: 'Cape Verde',
        quote: 'This is where London\'s Portuguese-speaking soul lives. Authentic culture, genuine connections.',
        quotePortuguese: 'É aqui que vive a alma lusófona de Londres. Cultura autêntica, conexões genuínas.'
      }
    ],
    popularityScore: 96,
    
    authenticityFeatures: [
      'Angolan dance masters teaching traditional steps',
      'Live Kizomba music from Portugal, Angola, Cape Verde',
      'Cultural context education during lessons',
      'Portuguese/English bilingual instruction',
      'Traditional Angolan hospitality and atmosphere'
    ],
    culturalEducation: [
      'History of Kizomba in Angola and its cultural significance',
      'Connection between Semba, Kizomba, and Portuguese influence',
      'Role of dance in Portuguese-speaking community bonding',
      'Respect and consent in traditional partner dancing'
    ],
    partnerOrganizations: ['Centro Cultural Angolano Londres', 'LusoTown Community', 'London Kizomba Association'],
    
    image: '/images/events/chocolate-kizomba-main.jpg',
    gallery: ['/images/events/kizomba-dancing-1.jpg', '/images/events/kizomba-community-2.jpg', '/images/events/kizomba-lessons-3.jpg'],
    
    organizer: 'Chocolate Kizomba London',
    contactEmail: 'info@chocolatekizomba.com',
    socialMedia: {
      instagram: 'https://instagram.com/chocolatekizomba',
      facebook: 'https://facebook.com/ChocolateKizombaLondon'
    },
    
    isActive: true,
    featured: true,
    isRegularEvent: true
  },
  
  // FADO EVENTS
  {
    id: 'authentic-fado-camden-monthly',
    name: 'Authentic Fado Night - Portuguese Soul Music',
    namePortuguese: 'Noite de Fado Autêntico - Música da Alma Portuguesa',
    type: 'fado',
    
    description: 'Experience the haunting beauty of authentic Portuguese Fado in an intimate Camden setting. Traditional musicians and singers perform the music that captures Portuguese saudade - the untranslatable feeling of longing and nostalgia.',
    descriptionPortuguese: 'Experimente a beleza assombrada do Fado português autêntico num ambiente íntimo de Camden. Músicos e cantores tradicionais apresentam a música que captura a saudade portuguesa - o sentimento intraduzível de anseio e nostalgia.',
    
    longDescription: 'Nossa Noite de Fado Autêntico transports London to the traditional Fado houses of Lisbon\'s Alfama district. Held monthly in Camden\'s most atmospheric venue, this evening celebrates Fado as Portugal\'s most profound cultural expression. Professional Fado singers, accompanied by traditional Portuguese guitar and classical guitar, perform classic repertoire alongside contemporary interpretations. The intimate setting - candle-lit tables, Portuguese wines, traditional atmosphere - recreates the authentic Fado house experience. Between sets, cultural historians share Fado\'s remarkable story: from Lisbon\'s working-class neighborhoods to UNESCO World Heritage status. Audience members often discover personal connections to Portuguese history through Fado\'s emotional storytelling. Many Portuguese expatriates describe these evenings as "coming home" to their cultural roots. The event welcomes cultural newcomers with program notes in English and Portuguese, ensuring everyone appreciates Fado\'s profound artistic and historical significance.',
    longDescriptionPortuguese: 'Nossa Noite de Fado Autêntico transporta Londres para as casas de Fado tradicionais do bairro de Alfama em Lisboa. Realizada mensalmente no local mais atmosférico de Camden, esta noite celebra o Fado como a expressão cultural mais profunda de Portugal. Cantores profissionais de Fado, acompanhados por guitarra portuguesa tradicional e guitarra clássica, apresentam repertório clássico ao lado de interpretações contemporâneas. O ambiente íntimo - mesas à luz de velas, vinhos portugueses, atmosfera tradicional - recria a experiência autêntica da casa de Fado. Entre sets, historiadores culturais compartilham a história notável do Fado: dos bairros da classe trabalhadora de Lisboa ao status de Património Mundial da UNESCO. Membros da audiência frequentemente descobrem conexões pessoais com a história portuguesa através da narrativa emocional do Fado. Muitos expatriados portugueses descrevem essas noites como "voltar para casa" às suas raízes culturais. O evento acolhe novatos culturais com notas de programa em inglês e português, garantindo que todos apreciem a profunda significância artística e histórica do Fado.',
    
    origin: 'Portugal (Lisbon)',
    flag: '🇵🇹',
    culturalBackground: 'Fado emerged in 1820s Lisbon, expressing Portuguese saudade through haunting melodies. UNESCO recognized Fado as Intangible Cultural Heritage, cementing its role as Portugal\'s musical soul.',
    culturalBackgroundPortuguese: 'O Fado emergiu na Lisboa dos anos 1820, expressando saudade portuguesa através de melodias assombradas. A UNESCO reconheceu o Fado como Património Cultural Imaterial, cimentando seu papel como alma musical de Portugal.',
    
    venue: 'The Camden Assembly - Intimate Performance Space',
    address: '49 Chalk Farm Road, Camden',
    postcode: 'NW1 8AN',
    capacity: 120,
    
    frequency: 'Monthly',
    dayOfWeek: 'Third Friday',
    time: '7:30pm - 11:00pm',
    duration: '3.5 hours',
    
    targetAudience: ['Portuguese heritage individuals', 'World music lovers', 'Cultural sophisticates', 'History enthusiasts', 'Mature audiences'],
    ageRange: '25+ (sophisticated audience)',
    skillLevel: 'Cultural appreciation (no prior knowledge needed)',
    atmosphere: 'Intimate, contemplative, emotionally profound, respectful',
    
    price: '£25-35 entry',
    priceDetails: '£25 standing / £35 seated table / Includes Portuguese wine tasting',
    studentDiscount: true,
    groupDiscount: false,
    
    attendanceAverage: 95,
    testimonials: [
      {
        name: 'Teresa',
        origin: 'Cape Verde',
        quote: 'Fado reminded me of morna from my homeland. Music truly connects all Portuguese-speaking hearts.',
        quotePortuguese: 'O Fado lembrou-me da morna da minha terra. A música verdadeiramente conecta todos os corações lusófonos.'
      },
      {
        name: 'Roberto',
        origin: 'Portugal',
        quote: 'Felt like I was back in Alfama. Authentic Portuguese culture preserved beautifully in London.',
        quotePortuguese: 'Senti-me como se estivesse de volta em Alfama. Cultura portuguesa autêntica preservada lindamente em Londres.'
      }
    ],
    popularityScore: 89,
    
    authenticityFeatures: [
      'Professional Fado singers from Portugal',
      'Traditional Portuguese and classical guitar accompaniment',
      'Authentic Portuguese wine service',
      'Historical and cultural context provided',
      'Intimate candlelit atmosphere matching traditional Fado houses'
    ],
    culturalEducation: [
      'History of Fado from 1820s Lisbon to global recognition',
      'UNESCO World Heritage designation significance',
      'Portuguese guitar construction and playing techniques',
      'Concept of saudade in Portuguese culture and literature'
    ],
    partnerOrganizations: ['Instituto Camões London', 'Portuguese Embassy Cultural Department', 'Camden Arts Centre'],
    
    image: '/images/events/fado-night-camden.jpg',
    gallery: ['/images/events/fado-singer-1.jpg', '/images/events/portuguese-guitar-2.jpg', '/images/events/fado-audience-3.jpg'],
    
    organizer: 'Portuguese Cultural Society London',
    contactEmail: 'fado@portugueseculture.org.uk',
    socialMedia: {
      facebook: 'https://facebook.com/FadoNightLondon',
      instagram: 'https://instagram.com/fadonightcamden'
    },
    
    isActive: true,
    featured: true,
    isRegularEvent: true
  },
  
  // BUSINESS NETWORKING EVENTS
  {
    id: 'portuguese-business-breakfast-monthly',
    name: 'Portuguese Business Breakfast - Networking & Success',
    namePortuguese: 'Pequeno-Almoço Empresarial Português - Networking e Sucesso',
    type: 'business',
    
    description: 'London\'s premier Portuguese-speaking business networking event. Connect with successful entrepreneurs, share opportunities, and build partnerships across Portugal, Brazil, Angola, and beyond.',
    descriptionPortuguese: 'O principal evento de networking empresarial lusófono de Londres. Conecte-se com empreendedores bem-sucedidos, compartilhe oportunidades e construa parcerias entre Portugal, Brasil, Angola e além.',
    
    longDescription: 'Our Monthly Portuguese Business Breakfast has become London\'s most influential Portuguese-speaking professional gathering. Held in the prestigious City of London, this event brings together entrepreneurs, executives, investors, and professionals from across the lusophone business community. Each month features a keynote speaker - successful Portuguese-speaking business leaders sharing insights about scaling businesses, navigating United Kingdom markets, and leveraging cultural advantages. Structured networking sessions ensure meaningful connections, while our "Pitch Your Business" segment gives entrepreneurs 60 seconds to present opportunities to potential partners and investors. Success stories include million-pound partnerships, successful business expansions, and collaborative ventures spanning continents. The breakfast format - 7:30am-9:30am - accommodates busy professional schedules while Portuguese cultural hospitality ensures genuine relationship building. Attendees represent diverse sectors: technology, finance, import/export, restaurants, professional services, and luxury goods. Translation services and bilingual materials ensure accessibility for Portuguese and English speakers.',
    longDescriptionPortuguese: 'Nosso Pequeno-Almoço Empresarial Português Mensal tornou-se o encontro profissional lusófono mais influente de Londres. Realizado na prestigiosa City de Londres, este evento reúne empreendedores, executivos, investidores e profissionais de toda a comunidade empresarial lusófona. Cada mês apresenta um orador principal - líderes empresariais lusófonos bem-sucedidos compartilhando insights sobre escalar negócios, navegar mercados do Reino Unido e aproveitar vantagens culturais. Sessões de networking estruturadas garantem conexões significativas, enquanto nosso segmento "Pitch Your Business" dá aos empreendedores 60 segundos para apresentar oportunidades a potenciais parceiros e investidores. Histórias de sucesso incluem parcerias de milhões de libras, expansões empresariais bem-sucedidas e empreendimentos colaborativos abrangendo continentes. O formato de pequeno-almoço - 7:30-9:30 - acomoda horários profissionais ocupados enquanto a hospitalidade cultural portuguesa garante construção genuína de relacionamentos. Participantes representam setores diversos: tecnologia, finanças, importação/exportação, restaurantes, serviços profissionais e bens de luxo. Serviços de tradução e materiais bilíngues garantem acessibilidade para falantes de português e inglês.',
    
    origin: 'Multi-national (Portugal, Brazil, Angola, etc.)',
    flag: '🇵🇹🇧🇷🇦🇴',
    culturalBackground: 'Portuguese business culture emphasizes relationship-building, family values, and long-term partnerships. This tradition creates natural advantages in international business through trust and cultural understanding.',
    culturalBackgroundPortuguese: 'A cultura empresarial portuguesa enfatiza construção de relacionamentos, valores familiares e parcerias de longo prazo. Esta tradição cria vantagens naturais em negócios internacionais através de confiança e compreensão cultural.',
    
    venue: 'Guildhall - Historic City of London Venue',
    address: 'Gresham Street, City of London',
    postcode: 'EC2V 7HH',
    capacity: 80,
    
    frequency: 'Monthly',
    dayOfWeek: 'First Thursday',
    time: '7:30am - 9:30am',
    duration: '2 hours',
    
    targetAudience: ['Business owners', 'Entrepreneurs', 'Executives', 'Investors', 'Professional service providers'],
    ageRange: '25-65 (professional focus)',
    skillLevel: 'Business professionals',
    atmosphere: 'Professional, collaborative, culturally warm, results-oriented',
    
    price: '£35 per person',
    priceDetails: '£35 includes full English/Portuguese breakfast, networking materials, follow-up contact directory',
    studentDiscount: false,
    groupDiscount: true,
    
    attendanceAverage: 65,
    testimonials: [
      {
        name: 'Carlos Silva',
        origin: 'Portugal',
        quote: 'Connected with 400+ clients through these breakfasts. My accounting firm now serves London\'s entire Portuguese community!',
        quotePortuguese: 'Conectei-me com 400+ clientes através destes pequenos-almoços. Meu escritório contábil agora serve toda a comunidade portuguesa de Londres!'
      },
      {
        name: 'Sandra & Ricardo',
        origin: 'Portugal & Brazil',
        quote: 'Met here as business partners, became life partners. Now run London\'s largest Portuguese-Brazilian consultancy.',
        quotePortuguese: 'Conhecemo-nos aqui como parceiros de negócios, tornámo-nos parceiros de vida. Agora dirigimos a maior consultoria luso-brasileira de Londres.'
      }
    ],
    popularityScore: 91,
    
    authenticityFeatures: [
      'Portuguese business culture and networking etiquette',
      'Bilingual environment (Portuguese/English)',
      'Cultural understanding of Portuguese-speaking markets',
      'Traditional Portuguese hospitality in professional setting',
      'Cross-cultural business expertise'
    ],
    culturalEducation: [
      'Portuguese-speaking market opportunities globally',
      'Cultural considerations in international business',
      'Leveraging cultural heritage for business advantage',
      'Portuguese entrepreneurial traditions and modern success'
    ],
    partnerOrganizations: ['City of London Corporation', 'Portuguese Chamber of Commerce United Kingdom', 'Brazilian Business Association'],
    
    image: '/images/events/portuguese-business-breakfast.jpg',
    gallery: ['/images/events/business-networking-1.jpg', '/images/events/keynote-speaker-2.jpg', '/images/events/breakfast-meeting-3.jpg'],
    
    organizer: 'Portuguese-speaking Business Network London',
    contactEmail: 'breakfast@portuguesebusiness.org.uk',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/portuguese-business-london',
      facebook: 'https://facebook.com/PortugueseBusinessBreakfast'
    },
    
    isActive: true,
    featured: true,
    isRegularEvent: true
  },
  
  // CULTURAL CELEBRATION EVENTS
  {
    id: 'porto-night-cultural-celebration',
    name: 'Porto Night - Northern Portuguese Cultural Celebration',
    namePortuguese: 'Noite do Porto - Celebração Cultural do Norte de Portugal',
    type: 'cultural',
    
    description: 'Celebrate the vibrant culture of Porto and Northern Portugal with traditional music, regional cuisine, port wine tasting, and cultural performances showcasing the authentic spirit of Portugal\'s second city.',
    descriptionPortuguese: 'Celebre a cultura vibrante do Porto e Norte de Portugal com música tradicional, culinária regional, degustação de vinho do Porto e apresentações culturais mostrando o espírito autêntico da segunda cidade de Portugal.',
    
    longDescription: 'Porto Night brings the warmth and authenticity of Northern Portuguese culture to London through an immersive cultural celebration. This quarterly event transforms venues into a slice of Porto, complete with traditional décor, regional specialties, and cultural performances. The evening begins with guided port wine tasting, featuring authentic vintage ports from renowned Porto cellars, accompanied by expert sommeliers explaining terroir, production, and cultural significance. Traditional Northern Portuguese cuisine includes francesinha sandwiches, tripas à moda do Porto, and regional pastries like pastéis de nata. Live performances feature traditional folk music from the Minho region, Portuguese guitar concerts, and folk dance demonstrations. Cultural exhibits showcase Porto\'s architectural heritage, from medieval quarters to contemporary design, while local artisans demonstrate traditional crafts like azulejo tile painting and Portuguese embroidery. The event attracts Portuguese expatriates seeking authentic cultural connection alongside curious Londoners wanting genuine Portuguese cultural immersion. Business networking opportunities naturally emerge as attendees bond over shared cultural appreciation and regional pride.',
    longDescriptionPortuguese: 'A Noite do Porto traz o calor e autenticidade da cultura do Norte de Portugal para Londres através de uma celebração cultural imersiva. Este evento trimestral transforma locais numa fatia do Porto, completa com decoração tradicional, especialidades regionais e apresentações culturais. A noite começa com degustação guiada de vinho do Porto, apresentando portos vintage autênticos de adegas renomadas do Porto, acompanhados por sommeliers especializados explicando terroir, produção e significância cultural. A culinária tradicional do Norte de Portugal inclui sanduíches francesinha, tripas à moda do Porto e doces regionais como pastéis de nata. Apresentações ao vivo apresentam música folclórica tradicional da região do Minho, concertos de guitarra portuguesa e demonstrações de dança folclórica. Exposições culturais mostram o patrimônio arquitetónico do Porto, de bairros medievais ao design contemporâneo, enquanto artesãos locais demonstram ofícios tradicionais como pintura de azulejos e bordados portugueses. O evento atrai expatriados portugueses procurando conexão cultural autêntica ao lado de londrinos curiosos querendo imersão cultural portuguesa genuína. Oportunidades de networking empresarial emergem naturalmente conforme participantes se unem sobre apreciação cultural compartilhada e orgulho regional.',
    
    origin: 'Porto & Northern Portugal',
    flag: '🇵🇹',
    culturalBackground: 'Porto, Portugal\'s second city, represents authentic Portuguese culture through wine heritage, architectural beauty, and regional traditions that have shaped Portuguese identity for centuries.',
    culturalBackgroundPortuguese: 'O Porto, segunda cidade de Portugal, representa cultura portuguesa autêntica através de herança vinícola, beleza arquitetónica e tradições regionais que moldaram a identidade portuguesa durante séculos.',
    
    venue: 'Proud Camden - Multi-level Cultural Venue',
    address: 'The Stables Market, Chalk Farm Road',
    postcode: 'NW1 8AH',
    capacity: 200,
    
    frequency: 'Quarterly',
    dayOfWeek: 'Friday',
    time: '7:00pm - 12:00am',
    duration: '5 hours',
    
    targetAudience: ['Portuguese heritage individuals', 'Cultural enthusiasts', 'Wine connoisseurs', 'Food lovers', 'Portuguese families'],
    ageRange: 'All ages welcome (21+ for alcohol)',
    skillLevel: 'Cultural appreciation',
    atmosphere: 'Festive, authentic, family-friendly, culturally rich',
    
    price: '£30-45 entry',
    priceDetails: '£30 general admission / £45 includes port wine tasting and traditional meal',
    studentDiscount: true,
    groupDiscount: true,
    
    attendanceAverage: 145,
    testimonials: [
      {
        name: 'Manuel',
        origin: 'Porto',
        quote: 'Felt like home! The francesinha was perfect, and hearing traditional Minho music brought tears to my eyes.',
        quotePortuguese: 'Senti-me em casa! A francesinha estava perfeita, e ouvir música tradicional do Minho trouxe lágrimas aos meus olhos.'
      },
      {
        name: 'Lisa',
        origin: 'United Kingdom',
        quote: 'Learned so much about Portuguese culture! The port tasting was educational and delicious.',
        quotePortuguese: 'Aprendi muito sobre cultura portuguesa! A degustação de porto foi educativa e deliciosa.'
      }
    ],
    popularityScore: 87,
    
    authenticityFeatures: [
      'Authentic Northern Portuguese cuisine and regional specialties',
      'Traditional port wine from renowned Porto cellars',
      'Live traditional music and folk dance performances',
      'Cultural exhibitions and artisan demonstrations',
      'Bilingual cultural education and storytelling'
    ],
    culturalEducation: [
      'History and cultural significance of Porto and Northern Portugal',
      'Traditional port wine production and terroir education',
      'Regional cuisine traditions and family recipes',
      'Folk music and dance cultural preservation'
    ],
    partnerOrganizations: ['Porto Tourism Board', 'Port Wine Institute', 'Instituto Camões London'],
    
    image: '/images/events/porto-night-celebration.jpg',
    gallery: ['/images/events/port-wine-tasting-1.jpg', '/images/events/northern-portuguese-food-2.jpg', '/images/events/traditional-music-3.jpg'],
    
    organizer: 'Northern Portuguese Cultural Association',
    contactEmail: 'events@northernportuguese.org.uk',
    socialMedia: {
      facebook: 'https://facebook.com/PortoNightLondon',
      instagram: 'https://instagram.com/portonightcultural'
    },
    
    isActive: true,
    featured: true,
    isRegularEvent: false
  },
  
  // FOOD CULTURE EVENTS
  {
    id: 'lusophone-sunday-brunch-vauxhall',
    name: 'Lusophone Sunday Brunch - Multi-Cultural Food Journey',
    namePortuguese: 'Brunch Lusófono de Domingo - Jornada Gastronômica Multi-Cultural',
    type: 'food',
    
    description: 'Experience the diverse culinary traditions of Portuguese-speaking countries through our weekly Sunday brunch. From Portuguese pastéis de nata to Brazilian açaí bowls, Angolan muamba, and Cape Verdean cachupa.',
    descriptionPortuguese: 'Experimente as diversas tradições culinárias dos países lusófonos através do nosso brunch dominical semanal. Dos pastéis de nata portugueses às tigelas de açaí brasileiras, muamba angolana e cachupa cabo-verdiana.',
    
    longDescription: 'Our Lusophone Sunday Brunch celebrates the incredible culinary diversity across Portuguese-speaking nations through an authentic, family-style dining experience. Each Sunday, our rotating menu features specialties from different lusophone countries: Portugal\'s coastal seafood and pastries, Brazil\'s tropical flavors and regional variety, Angola\'s hearty stews and palm oil dishes, Cape Verde\'s island fusion cuisine, and Mozambique\'s spice-influenced foods. Executive chefs from each cultural background prepare traditional family recipes, ensuring authenticity while accommodating London tastes. The communal dining format encourages cultural exchange - families share tables, stories, and food traditions while children learn about their diverse heritage. Educational elements include printed guides explaining dish origins, cultural significance, and family traditions behind each recipe. Live background music features gentle acoustic sounds from Portuguese-speaking countries, creating a relaxed, culturally immersive atmosphere. Many attendees describe the experience as "Sunday dinner with the extended lusophone family" - strangers become friends over shared meals and cultural pride.',
    longDescriptionPortuguese: 'Nosso Brunch Lusófono de Domingo celebra a incrível diversidade culinária dos países lusófonos através de uma experiência gastronômica autêntica e familiar. Cada domingo, nosso cardápio rotativo apresenta especialidades de diferentes países lusófonos: frutos do mar costeiros e doces de Portugal, sabores tropicais e variedade regional do Brasil, ensopados substanciosos e pratos de azeite de palma de Angola, culinária de fusão das ilhas de Cabo Verde e comidas influenciadas por especiarias de Moçambique. Chefs executivos de cada contexto cultural preparam receitas familiares tradicionais, garantindo autenticidade enquanto acomodam gostos londrinos. O formato de jantar comunitário encoraja intercâmbio cultural - famílias compartilham mesas, histórias e tradições alimentares enquanto crianças aprendem sobre sua herança diversa. Elementos educacionais incluem guias impressos explicando origens dos pratos, significância cultural e tradições familiares por trás de cada receita. Música de fundo ao vivo apresenta sons acústicos suaves de países lusófonos, criando uma atmosfera relaxada e culturalmente imersiva. Muitos participantes descrevem a experiência como "jantar de domingo com a família lusófona estendida" - estranhos tornam-se amigos sobre refeições compartilhadas e orgulho cultural.',
    
    origin: 'Multi-national lusophone',
    flag: '🇵🇹🇧🇷🇦🇴🇨🇻🇲🇿',
    culturalBackground: 'Food traditions across Portuguese-speaking countries reflect diverse influences: Portuguese maritime heritage, Brazilian tropical abundance, African community dining, and island fusion creativity.',
    culturalBackgroundPortuguese: 'Tradições alimentares nos países lusófonos refletem influências diversas: herança marítima portuguesa, abundância tropical brasileira, jantar comunitário africano e criatividade de fusão das ilhas.',
    
    venue: 'Vauxhall Food Market - Community Dining Space',
    address: '6 South Lambeth Place, Vauxhall',
    postcode: 'SW8 1SP',
    capacity: 120,
    
    frequency: 'Weekly',
    dayOfWeek: 'Sunday',
    time: '11:00am - 3:00pm',
    duration: '4 hours',
    
    targetAudience: ['Portuguese-speaking families', 'Food enthusiasts', 'Cultural learners', 'Children and families', 'Community builders'],
    ageRange: 'All ages - family friendly',
    skillLevel: 'Open to everyone',
    atmosphere: 'Family-friendly, educational, communal, culturally diverse',
    
    price: '£25-35 per person',
    priceDetails: '£25 adults / £15 children under 12 / £65 family package (2 adults + 2 children)',
    studentDiscount: true,
    groupDiscount: true,
    
    attendanceAverage: 85,
    testimonials: [
      {
        name: 'Isabella',
        origin: 'Brazil',
        quote: 'My children are learning about all Portuguese-speaking cultures through food. Beautiful community building!',
        quotePortuguese: 'Meus filhos estão aprendendo sobre todas as culturas lusófonas através da comida. Bela construção comunitária!'
      },
      {
        name: 'António',
        origin: 'Angola',
        quote: 'Finally found authentic muamba in London! Kids from different countries playing together - this is what community means.',
        quotePortuguese: 'Finalmente encontrei muamba autêntica em Londres! Crianças de países diferentes brincando juntas - isto é o que comunidade significa.'
      }
    ],
    popularityScore: 84,
    
    authenticityFeatures: [
      'Rotating menu featuring all Portuguese-speaking countries',
      'Authentic family recipes from cultural communities',
      'Educational materials about food traditions',
      'Multi-generational and multi-cultural attendance',
      'Community-style shared dining experience'
    ],
    culturalEducation: [
      'Culinary traditions and regional specialties across lusophone countries',
      'Family food traditions and cultural significance',
      'Ingredient sourcing and traditional cooking methods',
      'Community dining customs and social traditions'
    ],
    partnerOrganizations: ['Vauxhall Food Network', 'Portuguese-speaking Cultural Centres', 'London Food Education Partnership'],
    
    image: '/images/events/lusophone-sunday-brunch.jpg',
    gallery: ['/images/events/multicultural-food-1.jpg', '/images/events/family-dining-2.jpg', '/images/events/traditional-dishes-3.jpg'],
    
    organizer: 'Lusophone Community Kitchen',
    contactEmail: 'brunch@lusophonekitchen.org.uk',
    socialMedia: {
      instagram: 'https://instagram.com/lusophonebrunch',
      facebook: 'https://facebook.com/LusophoneSundayBrunch'
    },
    
    isActive: true,
    featured: true,
    isRegularEvent: true
  }
]

/**
 * Get events by type
 */
export function getEventsByType(type: CulturalEvent['type']): CulturalEvent[] {
  return CULTURAL_EVENTS.filter(event => event.type === type && event.isActive)
}

/**
 * Get featured cultural events
 */
export function getFeaturedEvents(): CulturalEvent[] {
  return CULTURAL_EVENTS.filter(event => event.featured && event.isActive)
    .sort((a, b) => b.popularityScore - a.popularityScore)
}

/**
 * Get regular weekly/monthly events
 */
export function getRegularEvents(): CulturalEvent[] {
  return CULTURAL_EVENTS.filter(event => event.isRegularEvent && event.isActive)
}

/**
 * Get events by cultural origin
 */
export function getEventsByOrigin(origin: string): CulturalEvent[] {
  return CULTURAL_EVENTS.filter(event => 
    event.origin.toLowerCase().includes(origin.toLowerCase()) && event.isActive
  )
}

/**
 * Get upcoming events for signup page
 */
export function getUpcomingEventsForSignup(): CulturalEvent[] {
  return CULTURAL_EVENTS
    .filter(event => event.featured && event.isActive)
    .sort((a, b) => b.attendanceAverage - a.attendanceAverage)
    .slice(0, 3)
}

/**
 * Get Kizomba and dance events
 */
export function getKizombaEvents(): CulturalEvent[] {
  return getEventsByType('kizomba')
}

/**
 * Get business networking events
 */
export function getBusinessNetworkingEvents(): CulturalEvent[] {
  return getEventsByType('business')
}

/**
 * Get food and culinary events
 */
export function getFoodEvents(): CulturalEvent[] {
  return getEventsByType('food')
}

/**
 * Get cultural authenticity metrics
 */
export function getCulturalEventMetrics(): {
  totalEvents: number
  countriesRepresented: string[]
  eventTypes: string[]
  averageAttendance: number
  regularEvents: number
} {
  const countries = [...new Set(CULTURAL_EVENTS.map(event => event.origin))]
  const types = [...new Set(CULTURAL_EVENTS.map(event => event.type))]
  const totalAttendance = CULTURAL_EVENTS.reduce((sum, event) => sum + event.attendanceAverage, 0)
  
  return {
    totalEvents: CULTURAL_EVENTS.length,
    countriesRepresented: countries,
    eventTypes: types,
    averageAttendance: Math.round(totalAttendance / CULTURAL_EVENTS.length),
    regularEvents: getRegularEvents().length
  }
}