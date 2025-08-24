/**
 * Portuguese-speaking Community Success Stories Configuration
 * Authentic testimonials representing diverse lusophone backgrounds
 * Environment-configurable for cultural authenticity
 */

export interface SuccessStory {
  id: string
  name: string
  namePortuguese?: string
  age: string
  location: string
  origin: string
  flag: string
  category: 'business' | 'romance' | 'cultural' | 'professional' | 'community'
  
  // Main story content
  quote: string
  quotePortuguese: string
  longStory: string
  longStoryPortuguese: string
  
  // Background information
  profession?: string
  businessType?: string
  culturalContribution?: string
  partnerOrigin?: string
  
  // Image and visual elements
  avatar: string
  businessImage?: string
  eventImage?: string
  
  // Verification badges
  verificationBadges: string[]
  
  // Engagement metrics
  featured: boolean
  dateJoined: string
  communityImpactScore: number
  
  // Cultural context
  culturalEvents?: string[]
  businessAchievements?: string[]
  communityRoles?: string[]
}

/**
 * Authentic Portuguese-speaking Community Success Stories
 */
export const SUCCESS_STORIES: SuccessStory[] = [
  
  // BUSINESS SUCCESS STORIES
  {
    id: 'carlos-porto-accounting',
    name: 'Carlos Silva',
    age: '42',
    location: 'Stockwell',
    origin: 'Porto, Portugal',
    flag: '🇵🇹',
    category: 'business',
    
    quote: "LusoTown helped me connect with 400+ Portuguese-speaking clients in London. My accounting firm now serves the entire Portuguese community!",
    quotePortuguese: "A LusoTown ajudou-me a conectar com 400+ clientes lusófonos em Londres. O meu escritório de contabilidade agora serve toda a comunidade portuguesa!",
    
    longStory: "Coming from Porto in 2018, I struggled to establish my accounting practice in London's competitive market. LusoTown changed everything. Through their business directory and networking events, I connected with Portuguese restaurants, Brazilian import companies, and Cape Verdean entrepreneurs. Today, Silva & Associates serves 400+ Portuguese-speaking clients across London, from family businesses to major imports. The platform's cultural authenticity helped me build trust immediately - when clients saw I understood their unique needs, from Portuguese tax compliance to Brazilian business structures, my practice exploded. Now I sponsor Portuguese cultural events and help other lusophone entrepreneurs succeed.",
    longStoryPortuguese: "Vindo do Porto em 2018, tive dificuldades para estabelecer minha prática contábil no mercado competitivo de Londres. A LusoTown mudou tudo. Através do seu diretório de negócios e eventos de networking, conectei-me com restaurantes portugueses, empresas de importação brasileiras e empresários cabo-verdianos. Hoje, Silva & Associates serve 400+ clientes lusófonos em Londres, desde negócios familiares até grandes importações. A autenticidade cultural da plataforma ajudou-me a construir confiança imediatamente - quando os clientes viram que eu entendia suas necessidades únicas, desde conformidade fiscal portuguesa até estruturas empresariais brasileiras, minha prática explodiu. Agora patrocino eventos culturais portugueses e ajudo outros empreendedores lusófonos a ter sucesso.",
    
    profession: 'Certified Public Accountant',
    businessType: 'Portuguese-speaking Community Tax & Business Services',
    
    avatar: '/images/testimonials/carlos-silva-porto.jpg',
    businessImage: '/images/success-stories/silva-associates-office.jpg',
    
    verificationBadges: ['business-owner-verified', 'community-ambassador', 'tax-specialist-certified'],
    
    featured: true,
    dateJoined: '2018-11-15',
    communityImpactScore: 92,
    
    culturalEvents: ['Portuguese Business Breakfast', 'Annual Tax Workshop (PT/EN)', 'Porto Night Sponsorship'],
    businessAchievements: ['400+ Portuguese-speaking clients', '£2.8M in community tax savings', '50+ business partnerships'],
    communityRoles: ['Business Advisory Committee', 'Portuguese Entrepreneurs Mentor', 'Cultural Event Sponsor']
  },
  
  {
    id: 'fatima-luanda-catering',
    name: 'Fátima Burity',
    age: '38',
    location: 'Elephant & Castle',
    origin: 'Luanda, Angola',
    flag: '🇦🇴',
    category: 'business',
    
    quote: "Started with homemade muamba de galinha, now I cater for 200+ events yearly! LusoTown connected me with London's luxury event planners.",
    quotePortuguese: "Comecei com muamba de galinha caseira, agora faço catering para 200+ eventos por ano! LusoTown conectou-me com organizadores de eventos de luxo em Londres.",
    
    longStory: "I arrived in London from Luanda with nothing but family recipes and determination. Starting from my small Elephant & Castle flat, I began cooking traditional Angolan dishes for neighbours. LusoTown's business directory transformed my kitchen dreams into Sabores d'Angola Catering. Through the platform, I connected with luxury event planners who needed authentic African cuisine. My muamba de galinha, funge, and calulu became sensations at high-end London events. Portuguese cultural events through LusoTown gave me credibility - when people tasted authentic Angolan flavors at Portuguese festivals, word spread. Today, I cater 200+ events annually, employ 15 people (mostly from Portuguese-speaking countries), and partner with Harrods for their African food festivals. My success enabled me to bring my mother from Luanda to London.",
    longStoryPortuguese: "Cheguei a Londres de Luanda com nada além de receitas familiares e determinação. Começando do meu pequeno apartamento em Elephant & Castle, comecei a cozinhar pratos angolanos tradicionais para vizinhos. O diretório de negócios da LusoTown transformou meus sonhos de cozinha em Sabores d'Angola Catering. Através da plataforma, conectei-me com organizadores de eventos de luxo que precisavam de culinária africana autêntica. Minha muamba de galinha, funge e calulu tornaram-se sensações em eventos de Londres de alta classe. Eventos culturais portugueses através da LusoTown deram-me credibilidade - quando as pessoas provaram sabores angolanos autênticos em festivais portugueses, a palavra espalhou-se. Hoje, faço catering para 200+ eventos anualmente, emprego 15 pessoas (principalmente de países lusófonos) e faço parceria com Harrods para seus festivais de comida africana. Meu sucesso permitiu-me trazer minha mãe de Luanda para Londres.",
    
    profession: 'Executive Chef & Catering Business Owner',
    businessType: 'Luxury Angolan & African Cuisine Catering',
    culturalContribution: 'Introducing authentic Angolan cuisine to London\'s luxury events',
    
    avatar: '/images/testimonials/fatima-burity-angola.jpg',
    businessImage: '/images/success-stories/sabores-dangola-kitchen.jpg',
    eventImage: '/images/success-stories/angolan-catering-harrods.jpg',
    
    verificationBadges: ['business-owner-verified', 'cultural-ambassador', 'luxury-catering-certified', 'african-heritage-verified'],
    
    featured: true,
    dateJoined: '2019-03-22',
    communityImpactScore: 88,
    
    culturalEvents: ['Angolan Independence Day Catering', 'Portuguese Food Festival', 'African Heritage Month'],
    businessAchievements: ['200+ events yearly', 'Harrods partnership', '15 employees', '£180k annual revenue'],
    communityRoles: ['Angolan Women Entrepreneurs', 'African Food Culture Ambassador', 'Culinary Mentor']
  },
  
  {
    id: 'joao-sao-paulo-coffee',
    name: 'João Santos',
    age: '35',
    location: 'Shoreditch',
    origin: 'São Paulo, Brazil',
    flag: '🇧🇷',
    category: 'business',
    
    quote: "From barista to coffee empire! LusoTown's network helped me import premium Brazilian coffee. Now supplying 50+ London cafés with authentic Brazilian beans.",
    quotePortuguese: "De barista a império do café! A rede da LusoTown ajudou-me a importar café brasileiro premium. Agora fornecendo 50+ cafés de Londres com grãos brasileiros autênticos.",
    
    longStory: "Working as a barista in Shoreditch, I was frustrated that London couldn't get authentic Brazilian coffee. Through LusoTown's business networking, I met investors who understood the Brazilian market opportunity. Café do Brasil Trading started with one shipping container of beans from my family's São Paulo roastery. The platform's cultural events let me showcase real Brazilian coffee culture - not just espresso, but the social experience of café brasileiro. Portuguese speakers immediately recognized authentic quality. Today, I supply 50+ London cafés including high-end establishments in Mayfair. My success story inspired other Brazilian entrepreneurs through LusoTown's mentorship program. We're now planning to open London's first authentic Brazilian café experience, complete with pão de açúcar and genuine Brazilian hospitality.",
    longStoryPortuguese: "Trabalhando como barista em Shoreditch, estava frustrado porque Londres não conseguia café brasileiro autêntico. Através do networking empresarial da LusoTown, conheci investidores que entendiam a oportunidade do mercado brasileiro. Café do Brasil Trading começou com um container de grãos da torrefação da minha família em São Paulo. Os eventos culturais da plataforma permitiram-me mostrar a verdadeira cultura do café brasileiro - não apenas espresso, mas a experiência social do café brasileiro. Os lusófonos reconheceram imediatamente a qualidade autêntica. Hoje, forneço 50+ cafés de Londres incluindo estabelecimentos de alta classe em Mayfair. Minha história de sucesso inspirou outros empreendedores brasileiros através do programa de mentoria da LusoTown. Agora estamos planejando abrir a primeira experiência de café brasileiro autêntica de Londres, completa com pão de açúcar e genuína hospitalidade brasileira.",
    
    profession: 'Coffee Import Business Owner & Cultural Ambassador',
    businessType: 'Premium Brazilian Coffee Import & Distribution',
    culturalContribution: 'Introducing authentic Brazilian coffee culture to London',
    
    avatar: '/images/testimonials/joao-santos-brazil.jpg',
    businessImage: '/images/success-stories/cafe-do-brasil-warehouse.jpg',
    
    verificationBadges: ['business-owner-verified', 'coffee-specialist-certified', 'brazilian-heritage-verified', 'import-export-licensed'],
    
    featured: true,
    dateJoined: '2020-01-10',
    communityImpactScore: 85,
    
    culturalEvents: ['Brazilian Coffee Culture Workshops', 'São Paulo Business Connection', 'Brazilian Entrepreneurs Network'],
    businessAchievements: ['50+ café partnerships', '£420k annual revenue', 'Family business international expansion'],
    communityRoles: ['Brazilian Business Association', 'Coffee Culture Ambassador', 'Young Entrepreneurs Mentor']
  },
  
  // ROMANCE SUCCESS STORIES
  {
    id: 'ana-miguel-kizomba-romance',
    name: 'Ana & Miguel',
    age: '29 & 32',
    location: 'Camden',
    origin: 'Rio de Janeiro, Brazil & Porto, Portugal',
    flag: '🇧🇷❤️🇵🇹',
    category: 'romance',
    partnerOrigin: 'Porto, Portugal',
    
    quote: "Met at Chocolate Kizomba through LusoTown events. Six months later, we had our Portuguese-Brazilian wedding celebration with 200 community members!",
    quotePortuguese: "Conhecemo-nos no Chocolate Kizomba através de eventos da LusoTown. Seis meses depois, tivemos nossa celebração de casamento luso-brasileira com 200 membros da comunidade!",
    
    longStory: "Ana from Rio came to London for her PhD in Architecture. Miguel from Porto worked in finance but felt disconnected from Portuguese culture. Both joined LusoTown seeking authentic community. At Chocolate Kizomba (Tuesday night at One Regent Street), Ana was teaching Brazilian dance styles while Miguel was learning traditional Portuguese steps. The moment they danced together, the cultural fusion was magical - Brazilian warmth met Portuguese elegance. Six months of LusoTown cultural events (Fado nights, Portuguese business meetups, Brazilian film screenings) deepened their connection. Their wedding celebration brought together 200+ Portuguese-speaking community members from across London. Today, they host monthly Portuguese-Brazilian cultural fusion events, sharing how love transcends borders when cultures unite through authentic community connections.",
    longStoryPortuguese: "Ana do Rio veio para Londres para seu PhD em Arquitetura. Miguel do Porto trabalhava em finanças mas sentia-se desconectado da cultura portuguesa. Ambos juntaram-se à LusoTown procurando comunidade autêntica. No Chocolate Kizomba (terça-feira à noite no One Regent Street), Ana ensinava estilos de dança brasileiros enquanto Miguel aprendia passos portugueses tradicionais. No momento em que dançaram juntos, a fusão cultural foi mágica - o calor brasileiro encontrou a elegância portuguesa. Seis meses de eventos culturais da LusoTown (noites de Fado, encontros de negócios portugueses, sessões de cinema brasileiro) aprofundaram sua conexão. A celebração do seu casamento reuniu 200+ membros da comunidade lusófona de Londres. Hoje, organizam eventos mensais de fusão cultural luso-brasileira, partilhando como o amor transcende fronteiras quando culturas se unem através de conexões comunitárias autênticas.",
    
    profession: 'PhD Architecture Student & Finance Professional',
    culturalContribution: 'Portuguese-Brazilian Cultural Fusion Events',
    
    avatar: '/images/testimonials/ana-miguel-couple.jpg',
    eventImage: '/images/success-stories/portuguese-brazilian-wedding.jpg',
    
    verificationBadges: ['culturally-connected', 'kizomba-community-verified', 'event-organizers', 'cross-cultural-ambassadors'],
    
    featured: true,
    dateJoined: '2022-08-15',
    communityImpactScore: 91,
    
    culturalEvents: ['Chocolate Kizomba Regular Attendees', 'Fado & Samba Fusion Nights', 'Portuguese-Brazilian Wedding'],
    communityRoles: ['Cultural Fusion Ambassadors', 'Dance Community Leaders', 'Cross-Cultural Romance Advocates']
  },
  
  {
    id: 'teresa-paulo-fado-morna',
    name: 'Teresa & Paulo',
    age: '33 & 35',
    location: 'Vauxhall',
    origin: 'Praia, Cape Verde & Luanda, Angola',
    flag: '🇨🇻❤️🇦🇴',
    category: 'romance',
    partnerOrigin: 'Luanda, Angola',
    
    quote: "Connected over shared love of Morna and traditional music. Our Cape Verdean-Angolan wedding showcased the beauty of lusophone unity!",
    quotePortuguese: "Conectámo-nos pelo amor compartilhado pela Morna e música tradicional. O nosso casamento cabo-verdiano-angolano mostrou a beleza da unidade lusófona!",
    
    longStory: "Teresa from Cape Verde moved to London for nursing studies, missing the soulful morna music of the islands. Paulo from Angola worked in engineering but yearned for authentic African Portuguese culture. At a LusoTown Fado evening, Teresa was moved to tears hearing Portuguese melancholy that reminded her of morna's emotional depth. Paulo approached her, recognizing a kindred spirit who understood how music carries cultural soul. They bonded over Cape Verdean morna and Angolan semba, discovering how both cultures express love through deeply emotional music. Their courtship included island music nights, Portuguese poetry readings, and African cultural celebrations. Their wedding was a stunning celebration of lusophone African heritage - Cape Verdean cesária and Angolan kuduro, traditional foods from both islands, and guests from across Portuguese-speaking Africa. They now organize monthly African Portuguese cultural nights, proving that love flourishes when shared heritage creates deep understanding.",
    longStoryPortuguese: "Teresa de Cabo Verde mudou-se para Londres para estudos de enfermagem, sentindo falta da música morna tocante das ilhas. Paulo de Angola trabalhava em engenharia mas ansiava por cultura portuguesa africana autêntica. Numa noite de Fado da LusoTown, Teresa ficou às lágrimas ouvindo melancolia portuguesa que a lembrava da profundidade emocional da morna. Paulo aproximou-se dela, reconhecendo um espírito afim que entendia como a música carrega a alma cultural. Uniram-se pela morna cabo-verdiana e semba angolana, descobrindo como ambas as culturas expressam amor através de música profundamente emocional. O seu namoro incluiu noites de música das ilhas, leituras de poesia portuguesa e celebrações culturais africanas. O seu casamento foi uma celebração deslumbrante da herança africana lusófona - cesária cabo-verdiana e kuduro angolano, comidas tradicionais de ambas as ilhas e convidados de toda África lusófona. Agora organizam noites culturais portuguesas africanas mensais, provando que o amor floresce quando a herança compartilhada cria compreensão profunda.",
    
    profession: 'Registered Nurse & Civil Engineer',
    culturalContribution: 'African Portuguese Cultural Preservation',
    
    avatar: '/images/testimonials/teresa-paulo-couple.jpg',
    eventImage: '/images/success-stories/cape-verde-angola-wedding.jpg',
    
    verificationBadges: ['culturally-connected', 'african-heritage-verified', 'music-community-leaders', 'cross-cultural-ambassadors'],
    
    featured: true,
    dateJoined: '2021-05-20',
    communityImpactScore: 87,
    
    culturalEvents: ['African Portuguese Music Nights', 'Cape Verdean Cultural Celebrations', 'Angolan Independence Day'],
    communityRoles: ['African Portuguese Cultural Ambassadors', 'Traditional Music Preservationists', 'Island Heritage Advocates']
  },
  
  {
    id: 'sandra-ricardo-entrepreneur-romance',
    name: 'Sandra & Ricardo',
    age: '31 & 34',
    location: 'Kensington',
    origin: 'Lisbon, Portugal & Salvador, Brazil',
    flag: '🇵🇹❤️🇧🇷',
    category: 'romance',
    partnerOrigin: 'Salvador, Brazil',
    
    quote: "Met at Portuguese business networking, fell in love over shared entrepreneurial dreams. Now we run London's most successful Portuguese-Brazilian joint venture!",
    quotePortuguese: "Conhecemo-nos num networking empresarial português, apaixonámo-nos pelos sonhos empreendedores compartilhados. Agora dirigimos a joint venture luso-brasileira mais bem-sucedida de Londres!",
    
    longStory: "Sandra from Lisbon had a successful marketing consultancy but struggled to expand into Brazilian markets. Ricardo from Salvador ran a premium import business but lacked European connections. Both attended LusoTown's Monthly Portuguese Business Breakfast seeking strategic partnerships. Their conversation about cultural marketing sparked immediate professional chemistry. What started as business collaboration blossomed into romance as they discovered shared values: family-focused business ethics, cultural pride, and entrepreneurial passion. Six months later, they launched Atlântico Ventures - combining Sandra's European marketing expertise with Ricardo's Brazilian sourcing network. Their personal partnership strengthened their professional success. Today, they run London's largest Portuguese-Brazilian trade consultancy, helping 200+ businesses navigate both markets. Their love story proves that when Portuguese-speaking entrepreneurs unite, both hearts and businesses flourish beyond imagination.",
    longStoryPortuguese: "Sandra de Lisboa tinha uma consultoria de marketing bem-sucedida mas tinha dificuldades para expandir para mercados brasileiros. Ricardo de Salvador dirigia um negócio de importação premium mas faltavam conexões europeias. Ambos participaram no Pequeno-Almoço Empresarial Português Mensal da LusoTown procurando parcerias estratégicas. A sua conversa sobre marketing cultural despertou química profissional imediata. O que começou como colaboração empresarial floresceu em romance quando descobriram valores compartilhados: ética empresarial focada na família, orgulho cultural e paixão empreendedora. Seis meses depois, lançaram Atlântico Ventures - combinando a expertise de marketing europeu de Sandra com a rede de sourcing brasileira de Ricardo. A sua parceria pessoal fortaleceu o sucesso profissional. Hoje, dirigem a maior consultoria comercial luso-brasileira de Londres, ajudando 200+ negócios a navegar ambos os mercados. A sua história de amor prova que quando empreendedores lusófonos se unem, tanto corações quanto negócios florescem além da imaginação.",
    
    profession: 'Marketing Consultant & Import Business Owner',
    businessType: 'Portuguese-Brazilian Trade Consultancy',
    culturalContribution: 'Facilitating business connections between Portugal and Brazil',
    
    avatar: '/images/testimonials/sandra-ricardo-couple.jpg',
    businessImage: '/images/success-stories/atlantico-ventures-office.jpg',
    
    verificationBadges: ['business-owners-verified', 'cross-cultural-trade-certified', 'entrepreneur-power-couple', 'community-business-leaders'],
    
    featured: true,
    dateJoined: '2020-09-10',
    communityImpactScore: 94,
    
    culturalEvents: ['Portuguese Business Breakfasts', 'Brazilian Trade Missions', 'Entrepreneur Couple Mentorship'],
    businessAchievements: ['200+ business consultations', '£1.2M trade facilitation', 'Portugal-Brazil trade corridor'],
    communityRoles: ['Business Power Couple', 'Entrepreneur Mentors', 'Trade Facilitators']
  },
  
  // CULTURAL ACHIEVEMENT STORIES
  {
    id: 'maria-angola-independence-celebration',
    name: 'Maria Cardoso',
    age: '45',
    location: 'Brixton',
    origin: 'Luanda, Angola',
    flag: '🇦🇴',
    category: 'cultural',
    
    quote: "Organized London's biggest Angolan Independence Day celebration! 2,000 people celebrated our heritage with traditional music, food, and unity.",
    quotePortuguese: "Organizei a maior celebração do Dia da Independência de Angola em Londres! 2.000 pessoas celebraram nossa herança com música tradicional, comida e unidade.",
    
    longStory: "As a cultural project manager, I noticed London's Angolan community lacked major cultural celebrations that honored our independence and heritage. Through LusoTown's cultural networking, I connected with Angolan business owners, artists, musicians, and community leaders across London. Together, we organized the largest Angolan Independence Day celebration in London's history. Held in Brockwell Park, the event featured live performances of semba, kuduro, and traditional Angolan music, authentic food vendors serving muamba de galinha and funge, traditional dance demonstrations, and children's activities teaching Angolan culture. Over 2,000 people attended - not just Angolans, but Portuguese, Brazilians, Cape Verdeans, and curious Londoners wanting to learn about African Portuguese culture. The success proved that London's lusophone community craves authentic cultural expression. Now it's an annual tradition that strengthens Angolan identity while educating broader London about our rich cultural contributions.",
    longStoryPortuguese: "Como gestora de projetos culturais, notei que a comunidade angolana de Londres carecia de grandes celebrações culturais que honrassem nossa independência e herança. Através do networking cultural da LusoTown, conectei-me com empresários, artistas, músicos e líderes comunitários angolanos em Londres. Juntos, organizámos a maior celebração do Dia da Independência de Angola na história de Londres. Realizado no Brockwell Park, o evento apresentou performances ao vivo de semba, kuduro e música tradicional angolana, vendedores de comida autêntica servindo muamba de galinha e funge, demonstrações de dança tradicional e atividades infantis ensinando cultura angolana. Mais de 2.000 pessoas participaram - não apenas angolanos, mas portugueses, brasileiros, cabo-verdianos e londrinos curiosos querendo aprender sobre cultura portuguesa africana. O sucesso provou que a comunidade lusófona de Londres anseia por expressão cultural autêntica. Agora é uma tradição anual que fortalece a identidade angolana enquanto educa Londres sobre nossas ricas contribuições culturais.",
    
    profession: 'Cultural Project Manager & Community Organizer',
    culturalContribution: 'Major Angolan cultural event organization and community building',
    
    avatar: '/images/testimonials/maria-cardoso-angola.jpg',
    eventImage: '/images/success-stories/angola-independence-celebration.jpg',
    
    verificationBadges: ['cultural-event-organizer', 'angolan-heritage-verified', 'community-leader', 'cultural-ambassador'],
    
    featured: true,
    dateJoined: '2019-11-11',
    communityImpactScore: 96,
    
    culturalEvents: ['Angolan Independence Day (Annual)', 'African Heritage Month', 'Traditional Music Festivals'],
    communityRoles: ['Angolan Cultural Leader', 'Heritage Preservation Advocate', 'Community Event Coordinator']
  },
  
  {
    id: 'tiago-portuguese-entrepreneur-podcast',
    name: 'Tiago Moreira',
    age: '28',
    location: 'Hackney',
    origin: 'Braga, Portugal',
    flag: '🇵🇹',
    category: 'cultural',
    
    quote: "Started UK's first Portuguese entrepreneur podcast! Now featuring 100+ successful lusophone business owners sharing wisdom with our community.",
    quotePortuguese: "Comecei o primeiro podcast de empreendedores portugueses do Reino Unido! Agora apresentando 100+ empresários lusófonos bem-sucedidos partilhando sabedoria com nossa comunidade.",
    
    longStory: "Working in tech but feeling disconnected from Portuguese business culture, I joined LusoTown to network with other Portuguese professionals. I discovered incredible success stories - Portuguese restaurant owners, Brazilian tech entrepreneurs, Angolan consultants, Cape Verdean artists - but these stories weren't being shared widely. I launched 'Negócios Lusófonos' podcast to showcase Portuguese-speaking entrepreneurial excellence. Through LusoTown's network, I interviewed over 100 successful business owners sharing practical advice, cultural insights, and inspiration. The podcast became the UK's leading Portuguese business resource, downloaded 50,000+ times monthly across Europe and Portuguese-speaking countries. Success stories include helping a Portuguese bakery expand to 5 locations, connecting Brazilian investors with London startups, and inspiring young Portuguese-speakers to launch their own businesses. The platform proves that when we celebrate lusophone business success, entire communities prosper through shared knowledge and cultural pride.",
    longStoryPortuguese: "Trabalhando em tecnologia mas sentindo-me desconectado da cultura empresarial portuguesa, juntei-me à LusoTown para fazer networking com outros profissionais portugueses. Descobri histórias de sucesso incríveis - donos de restaurantes portugueses, empreendedores brasileiros de tecnologia, consultores angolanos, artistas cabo-verdianos - mas essas histórias não estavam sendo amplamente compartilhadas. Lancei o podcast 'Negócios Lusófonos' para mostrar a excelência empreendedora lusófona. Através da rede da LusoTown, entrevistei mais de 100 empresários bem-sucedidos compartilhando conselhos práticos, insights culturais e inspiração. O podcast tornou-se o principal recurso empresarial português do Reino Unido, descarregado 50.000+ vezes mensalmente em Europa e países lusófonos. Histórias de sucesso incluem ajudar uma padaria portuguesa a expandir para 5 localizações, conectar investidores brasileiros com startups de Londres e inspirar jovens lusófonos a lançar seus próprios negócios. A plataforma prova que quando celebramos o sucesso empresarial lusófono, comunidades inteiras prosperam através de conhecimento compartilhado e orgulho cultural.",
    
    profession: 'Tech Professional & Podcast Host',
    culturalContribution: 'First UK Portuguese entrepreneur podcast and business community building',
    
    avatar: '/images/testimonials/tiago-moreira-portugal.jpg',
    businessImage: '/images/success-stories/negocios-lusofonos-studio.jpg',
    
    verificationBadges: ['content-creator-verified', 'portuguese-heritage-verified', 'business-podcast-host', 'community-influencer'],
    
    featured: true,
    dateJoined: '2021-02-14',
    communityImpactScore: 89,
    
    culturalEvents: ['Portuguese Business Conferences', 'Entrepreneur Meetups', 'Podcast Live Recordings'],
    businessAchievements: ['100+ podcast episodes', '50k monthly downloads', '5 business expansions facilitated'],
    communityRoles: ['Portuguese Business Advocate', 'Entrepreneur Media Leader', 'Success Story Curator']
  },
  
  {
    id: 'isabella-brazilian-cooking-classes',
    name: 'Isabella Lima',
    age: '36',
    location: 'Clapham',
    origin: 'Belo Horizonte, Brazil',
    flag: '🇧🇷',
    category: 'cultural',
    
    quote: "My Brazilian cooking classes became London's most popular! Teaching authentic cuisine while preserving cultural traditions for future generations.",
    quotePortuguese: "Minhas aulas de culinária brasileira tornaram-se as mais populares de Londres! Ensinando culinária autêntica enquanto preservo tradições culturais para gerações futuras.",
    
    longStory: "Moving from Belo Horizonte to London, I missed authentic Brazilian home cooking - not restaurant food, but real family recipes passed down through generations. LusoTown's community helped me realize other Portuguese-speakers shared this longing for authentic cultural connection through food. I started offering Brazilian cooking classes from my Clapham kitchen, teaching traditional dishes like feijoada, pão de açúcar, brigadeiros, and regional specialties from Minas Gerais. Word spread through LusoTown's network - soon I had waiting lists. Classes became cultural experiences: students learned cooking techniques while hearing stories about Brazilian family traditions, regional differences, and food's role in Brazilian celebrations. I expanded to corporate team-building, cultural festivals, and private dining experiences. Today, my classes are London's most sought-after Brazilian cooking experience, with 500+ students annually including British food enthusiasts wanting authentic cultural immersion. My success inspired other Portuguese-speaking women to share their cultural knowledge, creating a network of authentic cultural educators.",
    longStoryPortuguese: "Mudando-me de Belo Horizonte para Londres, senti falta da culinária brasileira caseira autêntica - não comida de restaurante, mas receitas familiares reais passadas através de gerações. A comunidade da LusoTown ajudou-me a perceber que outros lusófonos compartilhavam essa saudade de conexão cultural autêntica através da comida. Comecei a oferecer aulas de culinária brasileira da minha cozinha em Clapham, ensinando pratos tradicionais como feijoada, pão de açúcar, brigadeiros e especialidades regionais de Minas Gerais. A palavra espalhou-se através da rede da LusoTown - logo tive listas de espera. As aulas tornaram-se experiências culturais: estudantes aprenderam técnicas de culinária enquanto ouviam histórias sobre tradições familiares brasileiras, diferenças regionais e o papel da comida nas celebrações brasileiras. Expandi para team-building corporativo, festivais culturais e experiências de jantar privado. Hoje, minhas aulas são a experiência de culinária brasileira mais procurada de Londres, com 500+ estudantes anualmente incluindo entusiastas da comida britânica querendo imersão cultural autêntica. Meu sucesso inspirou outras mulheres lusófonas a compartilhar seu conhecimento cultural, criando uma rede de educadoras culturais autênticas.",
    
    profession: 'Culinary Instructor & Cultural Educator',
    culturalContribution: 'Brazilian culinary tradition preservation and cultural education',
    
    avatar: '/images/testimonials/isabella-lima-brazil.jpg',
    eventImage: '/images/success-stories/brazilian-cooking-class.jpg',
    
    verificationBadges: ['culinary-instructor-certified', 'brazilian-heritage-verified', 'cultural-educator', 'cooking-class-leader'],
    
    featured: true,
    dateJoined: '2020-06-18',
    communityImpactScore: 83,
    
    culturalEvents: ['Brazilian Food Festivals', 'Cultural Cooking Workshops', 'Family Recipe Preservation'],
    businessAchievements: ['500+ students annually', 'Corporate partnerships', 'Cultural festival collaborations'],
    communityRoles: ['Brazilian Cultural Educator', 'Culinary Tradition Keeper', 'Food Culture Ambassador']
  }
]

/**
 * Get success stories by category
 */
export function getSuccessStoriesByCategory(category: SuccessStory['category']): SuccessStory[] {
  return SUCCESS_STORIES.filter(story => story.category === category)
}

/**
 * Get featured success stories
 */
export function getFeaturedSuccessStories(): SuccessStory[] {
  return SUCCESS_STORIES.filter(story => story.featured)
    .sort((a, b) => b.communityImpactScore - a.communityImpactScore)
}

/**
 * Get success stories by origin country
 */
export function getSuccessStoriesByOrigin(origin: string): SuccessStory[] {
  return SUCCESS_STORIES.filter(story => 
    story.origin.toLowerCase().includes(origin.toLowerCase())
  )
}

/**
 * Get business success stories for inspiration
 */
export function getBusinessSuccessStories(): SuccessStory[] {
  return getSuccessStoriesByCategory('business')
}

/**
 * Get romance success stories for community warmth
 */
export function getRomanceSuccessStories(): SuccessStory[] {
  return getSuccessStoriesByCategory('romance')
}

/**
 * Get cultural achievement stories for heritage pride
 */
export function getCulturalAchievementStories(): SuccessStory[] {
  return getSuccessStoriesByCategory('cultural')
}

/**
 * Get a random success story for variety
 */
export function getRandomSuccessStory(): SuccessStory {
  const randomIndex = Math.floor(Math.random() * SUCCESS_STORIES.length)
  return SUCCESS_STORIES[randomIndex]
}

/**
 * Get success stories for signup page testimonials
 */
export function getSignupPageTestimonials(): SuccessStory[] {
  return SUCCESS_STORIES
    .filter(story => story.featured && story.communityImpactScore > 85)
    .slice(0, 3)
}

/**
 * Cultural authenticity validation
 */
export function validateCulturalAuthenticity(): {
  totalStories: number
  countriesRepresented: string[]
  businessCategories: string[]
  romanceConnections: number
  culturalPreservation: number
} {
  const countries = [...new Set(SUCCESS_STORIES.map(story => story.origin.split(',')[1]?.trim() || story.origin))]
  const businessStories = getBusinessSuccessStories()
  const romanceStories = getRomanceSuccessStories()
  const culturalStories = getCulturalAchievementStories()
  
  return {
    totalStories: SUCCESS_STORIES.length,
    countriesRepresented: countries,
    businessCategories: [...new Set(businessStories.map(story => story.businessType || 'General Business'))],
    romanceConnections: romanceStories.length,
    culturalPreservation: culturalStories.length
  }
}