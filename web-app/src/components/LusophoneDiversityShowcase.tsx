"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  GlobeAltIcon,
  HeartIcon,
  MusicalNoteIcon,
  BookOpenIcon,
  UserGroupIcon,
  CameraIcon,
  HandRaisedIcon,
  SparklesIcon,
  MapPinIcon,
  StarIcon,
  FlagIcon,
  AcademicCapIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/LanguageContext";
import { ROUTES } from "@/config/routes";

interface LusophoneCountry {
  id: string;
  name: string;
  namePortuguese: string;
  flag: string;
  population: string;
  language: string;
  languagePortuguese: string;
  capital: string;
  capitalPortuguese: string;
  culturalHighlights: string[];
  culturalHighlightsPortuguese: string[];
  londonCommunity: {
    size: string;
    mainAreas: string[];
    culturalEvents: string[];
    businesses: string[];
    education: string[];
  };
  successStories: {
    name: string;
    profession: string;
    professionPortuguese: string;
    achievement: string;
    achievementPortuguese: string;
    quote: string;
    quotePortuguese: string;
  }[];
  culturalContributions: {
    music: string;
    musicPortuguese: string;
    cuisine: string;
    cuisinePortuguese: string;
    traditions: string;
    traditionsPortuguese: string;
    literature: string;
    literaturePortuguese: string;
  };
  londonPresence: {
    years: string;
    description: string;
    descriptionPortuguese: string;
  };
}

const LUSOPHONE_COUNTRIES: LusophoneCountry[] = [
  {
    id: "portugal",
    name: "Portugal",
    namePortuguese: "Portugal",
    flag: "🇵🇹",
    population: "10.3 million",
    language: "Portuguese (European)",
    languagePortuguese: "Português (Europeu)",
    capital: "Lisbon",
    capitalPortuguese: "Lisboa",
    culturalHighlights: [
      "Fado Music",
      "Maritime Heritage",
      "Azulejo Tiles",
      "Port Wine",
      "Pastéis de Nata",
    ],
    culturalHighlightsPortuguese: [
      "Música Fado",
      "Património Marítimo",
      "Azulejos",
      "Vinho do Porto",
      "Pastéis de Nata",
    ],
    londonCommunity: {
      size: "280,000+",
      mainAreas: [
        "Stockwell",
        "Vauxhall",
        "Elephant & Castle",
        "Camden",
        "Bermondsey",
      ],
      culturalEvents: [
        "Santos Populares",
        "Festa do Avante",
        "Portuguese Film Festival",
      ],
      businesses: [
        "Casa do Bacalhau",
        "Nando's (Portuguese-inspired)",
        "Portuguese restaurants & cafés",
      ],
      education: [
        "Portuguese Saturday Schools",
        "University Portuguese Studies",
        "Instituto Camões programs",
      ],
    },
    successStories: [
      {
        name: "Maria Santos-Brown",
        profession: "NHS Senior Consultant",
        professionPortuguese: "Consultora Sénior do NHS",
        achievement:
          "Led COVID-19 Portuguese-speaking community health initiatives, improving health outcomes for 10,000+ Portuguese residents",
        achievementPortuguese:
          "Liderou iniciativas de saúde da comunidade de falantes de português durante COVID-19, melhorando resultados de saúde para 10.000+ residentes portugueses",
        quote:
          "Working with the Portuguese-speaking community in the NHS showed me how cultural understanding improves healthcare. We reduced hospital readmissions by 30% through culturally sensitive care.",
        quotePortuguese:
          "Trabalhar com a comunidade de falantes de português no NHS mostrou-me como a compreensão cultural melhora os cuidados de saúde. Reduzimos as readmissões hospitalares em 30% através de cuidados culturalmente sensíveis.",
      },
      {
        name: "João Pereira",
        profession: "Tech Entrepreneur",
        professionPortuguese: "Empreendedor Tecnológico",
        achievement:
          "Founded Portuguese-United Kingdom fintech startup valued at £5M, connecting Portuguese businesses with United Kingdom markets",
        achievementPortuguese:
          "Fundou startup fintech Portugal-Reino Unido avaliada em £5M, conectando negócios portugueses com mercados do Reino Unido",
        quote:
          "London's Portuguese-speaking community provided the cultural bridges I needed to build trust between Portuguese and British business partners.",
        quotePortuguese:
          "A comunidade de falantes de português de Londres forneceu as pontes culturais que precisava para construir confiança entre parceiros de negócios portugueses e britânicos.",
      },
    ],
    culturalContributions: {
      music:
        "Fado performances in London venues, Portuguese traditional folk groups, classical guitar ensembles",
      musicPortuguese:
        "Performances de fado em locais de Londres, grupos folclóricos portugueses tradicionais, conjuntos de guitarra clássica",
      cuisine:
        "Authentic Portuguese restaurants, pastéis de nata bakeries, traditional fish and seafood cuisine",
      cuisinePortuguese:
        "Restaurantes portugueses autênticos, pastelarias de pastéis de nata, culinária tradicional de peixe e mariscos",
      traditions:
        "Santos Populares festivals, Portuguese religious processions, traditional craft workshops",
      traditionsPortuguese:
        "Festivais dos Santos Populares, procissões religiosas portuguesas, workshops de artesanato tradicional",
      literature:
        "Portuguese poetry readings, Camões literary societies, contemporary Portuguese author events",
      literaturePortuguese:
        "Leituras de poesia portuguesa, sociedades literárias de Camões, eventos de autores portugueses contemporâneos",
    },
    londonPresence: {
      years: "60+ years",
      description:
        "One of London's oldest and most established communities, with deep roots in education, healthcare, and business",
      descriptionPortuguese:
        "Uma das comunidades mais antigas e estabelecidas de Londres, com raízes profundas na educação, saúde e negócios",
    },
  },
  {
    id: "brazil",
    name: "Brazil",
    namePortuguese: "Brasil",
    flag: "🇧🇷",
    population: "215 million",
    language: "Portuguese (Brazilian)",
    languagePortuguese: "Português (Brasileiro)",
    capital: "Brasília",
    capitalPortuguese: "Brasília",
    culturalHighlights: [
      "Samba & Bossa Nova",
      "Carnival",
      "Capoeira",
      "Football Culture",
      "Açaí & Brigadeiros",
    ],
    culturalHighlightsPortuguese: [
      "Samba & Bossa Nova",
      "Carnaval",
      "Capoeira",
      "Cultura do Futebol",
      "Açaí & Brigadeiros",
    ],
    londonCommunity: {
      size: "95,000+",
      mainAreas: ["Brent", "Hammersmith", "Camden", "Islington", "Hackney"],
      culturalEvents: [
        "Brazilian Carnival",
        "Festa Junina",
        "Brazilian Independence Day",
      ],
      businesses: [
        "Brazilian restaurants",
        "Açaí bars",
        "Brazilian beauty salons",
        "Football sports bars",
      ],
      education: [
        "Brazilian schools",
        "Capoeira academies",
        "Samba dance schools",
      ],
    },
    successStories: [
      {
        name: "Carlos Oliveira",
        profession: "Restaurant Chain Owner",
        professionPortuguese: "Proprietário de Cadeia de Restaurantes",
        achievement:
          'Built "Sabores do Brasil" into 8-location restaurant chain, employing 85+ people and celebrating Brazilian cuisine',
        achievementPortuguese:
          'Construiu "Sabores do Brasil" numa cadeia de restaurantes de 8 localizações, empregando 85+ pessoas e celebrando a culinária brasileira',
        quote:
          "Every brigadeiro we serve carries a piece of Brazil to London. Food is our love language, connecting cultures through flavor.",
        quotePortuguese:
          "Cada brigadeiro que servimos carrega um pedaço do Brasil para Londres. A comida é nossa linguagem do amor, conectando culturas através do sabor.",
      },
      {
        name: "Ana Beatriz Silva",
        profession: "Social Impact Lawyer",
        professionPortuguese: "Advogada de Impacto Social",
        achievement:
          "Established legal aid clinic serving 500+ Brazilian families with immigration and employment law issues",
        achievementPortuguese:
          "Estabeleceu clínica de assistência jurídica servindo 500+ famílias brasileiras com questões de imigração e direito laboral",
        quote:
          "Brazilian warmth and British justice together create powerful advocacy. I fight for families who need both legal help and cultural understanding.",
        quotePortuguese:
          "O calor brasileiro e a justiça britânica juntos criam advocacia poderosa. Luto por famílias que precisam tanto de ajuda legal quanto de compreensão cultural.",
      },
    ],
    culturalContributions: {
      music:
        "High-energy samba schools, smooth Bossa Nova jam sessions, electrifying funk carioca nights, infectious forró dance parties, Brazilian jazz fusion concerts",
      musicPortuguese:
        "Escolas de samba cheias de energia, jam sessions suaves de Bossa Nova, noites eletrizantes de funk carioca, festas de forró contagiosas, concertos de fusão de jazz brasileiro",
      cuisine:
        "Vibrant Brazilian barbecue gatherings, refreshing açaí social meetups, hearty feijoada community dinners, exciting Brazilian street food markets",
      cuisinePortuguese:
        "Churrascos brasileiros vibrantes, encontros sociais refrescantes de açaí, jantares comunitários fartos de feijoada, mercados empolgantes de comida de rua brasileira",
      traditions:
        "Explosive carnival street parties, joyful Festa Junina celebrations, dynamic capoeira circles, passionate football watch parties that bring everyone together",
      traditionsPortuguese:
        "Festas de carnaval explosivas nas ruas, celebrações alegres de Festa Junina, rodas dinâmicas de capoeira, festas apaixonadas de futebol que unem todos",
      literature:
        "Paulo Coelho book clubs, Brazilian poetry nights, contemporary Brazilian literature events",
      literaturePortuguese:
        "Clubes de livros de Paulo Coelho, noites de poesia brasileira, eventos de literatura brasileira contemporânea",
    },
    londonPresence: {
      years: "40+ years",
      description:
        "Vibrant and growing community known for bringing Brazilian warmth, creativity, and cultural richness to London",
      descriptionPortuguese:
        "Comunidade vibrante e crescente conhecida por trazer o calor, criatividade e riqueza cultural brasileira para Londres",
    },
  },
  {
    id: "angola",
    name: "Angola",
    namePortuguese: "Angola",
    flag: "🇦🇴",
    population: "33 million",
    language: "Portuguese (Angolan)",
    languagePortuguese: "Português (Angolano)",
    capital: "Luanda",
    capitalPortuguese: "Luanda",
    culturalHighlights: [
      "Semba Music",
      "Kizomba Dance",
      "Angolan Cuisine",
      "Traditional Crafts",
      "Coffee Culture",
    ],
    culturalHighlightsPortuguese: [
      "Música Semba",
      "Dança Kizomba",
      "Culinária Angolana",
      "Artesanato Tradicional",
      "Cultura do Café",
    ],
    londonCommunity: {
      size: "25,000+",
      mainAreas: ["Tottenham", "Hackney", "Croydon", "Lewisham", "Southwark"],
      culturalEvents: [
        "Angolan Independence Day",
        "Kizomba festivals",
        "African heritage celebrations",
      ],
      businesses: [
        "Angolan restaurants",
        "African hair salons",
        "Traditional craft shops",
        "Music venues",
      ],
      education: [
        "Portuguese language schools",
        "African studies programs",
        "Cultural heritage classes",
      ],
    },
    successStories: [
      {
        name: "António Dos Santos",
        profession: "University Professor & Researcher",
        professionPortuguese: "Professor Universitário & Investigador",
        achievement:
          "Published groundbreaking research on Angolan diaspora, featured in international journals and policy discussions",
        achievementPortuguese:
          "Publicou investigação pioneira sobre a diáspora angolana, destacada em revistas internacionais e discussões políticas",
        quote:
          "My research bridges Angola and Britain, showing how African Portuguese heritage enriches European academic discourse.",
        quotePortuguese:
          "Minha investigação une Angola e Grã-Bretanha, mostrando como o património português africano enriquece o discurso académico europeu.",
      },
      {
        name: "Esperança Fernandes",
        profession: "Cultural Event Organizer",
        professionPortuguese: "Organizadora de Eventos Culturais",
        achievement:
          'Founded "Angola in London" festival attracting 5,000+ attendees and showcasing Angolan culture across the United Kingdom',
        achievementPortuguese:
          'Fundou festival "Angola em Londres" atraindo 5.000+ participantes e exibindo cultura angolana por todo o Reino Unido',
        quote:
          "Through music and dance, we show London the beauty of Angola. Culture is our bridge between continents.",
        quotePortuguese:
          "Através da música e dança, mostramos a Londres a beleza de Angola. A cultura é nossa ponte entre continentes.",
      },
    ],
    culturalContributions: {
      music:
        "Sensual kizomba dance workshops, rhythmic semba music nights, soulful gospel celebrations, hypnotic percussion circles, modern afrobeat fusion parties",
      musicPortuguese:
        "Workshops sensuais de dança kizomba, noites rítmicas de música semba, celebrações gospel cheias de alma, círculos de percussão hipnóticos, festas modernas de fusão afrobeat",
      cuisine:
        "Flavorful Angolan cooking classes, community muamba sharing dinners, traditional calulu gatherings, African-Portuguese fusion food experiences",
      cuisinePortuguese:
        "Aulas de culinária angolana saborosas, jantares comunitários de partilha de muamba, encontros tradicionais de calulu, experiências gastronómicas de fusão africano-portuguesa",
      traditions:
        "Traditional Angolan wedding ceremonies, cultural heritage festivals, craft making workshops",
      traditionsPortuguese:
        "Cerimónias tradicionais de casamento angolano, festivais de património cultural, workshops de artesanato",
      literature:
        "Angolan poetry readings, African literature societies, storytelling events featuring oral traditions",
      literaturePortuguese:
        "Leituras de poesia angolana, sociedades de literatura africana, eventos de storytelling com tradições orais",
    },
    londonPresence: {
      years: "35+ years",
      description:
        "Strong cultural presence across the United Kingdom, contributing significantly to Britain's African Portuguese heritage through vibrant community celebrations",
      descriptionPortuguese:
        "Forte presença académica e cultural, contribuindo significativamente para o património português africano de Londres",
    },
  },
  {
    id: "mozambique",
    name: "Mozambique",
    namePortuguese: "Moçambique",
    flag: "🇲🇿",
    population: "32 million",
    language: "Portuguese (Mozambican)",
    languagePortuguese: "Português (Moçambicano)",
    capital: "Maputo",
    capitalPortuguese: "Maputo",
    culturalHighlights: [
      "Marrabenta Music",
      "Traditional Dance",
      "Coastal Cuisine",
      "Makonde Art",
      "Storytelling",
    ],
    culturalHighlightsPortuguese: [
      "Música Marrabenta",
      "Dança Tradicional",
      "Culinária Costeira",
      "Arte Makonde",
      "Contos",
    ],
    londonCommunity: {
      size: "15,000+",
      mainAreas: [
        "Newham",
        "Tower Hamlets",
        "Greenwich",
        "Woolwich",
        "Barking",
      ],
      culturalEvents: [
        "Mozambican Independence Day",
        "Marrabenta music festivals",
        "African heritage month",
      ],
      businesses: [
        "Mozambican restaurants",
        "African grocery stores",
        "Cultural centers",
        "Music venues",
      ],
      education: [
        "Portuguese heritage schools",
        "African culture classes",
        "Traditional arts workshops",
      ],
    },
    successStories: [
      {
        name: "Isabel Machava",
        profession: "Community Social Worker",
        professionPortuguese: "Assistente Social Comunitária",
        achievement:
          "Established cultural network helping 200+ Mozambican families connect across the United Kingdom while celebrating cultural identity through vibrant community gatherings",
        achievementPortuguese:
          "Estabeleceu rede de apoio ajudando 200+ famílias moçambicanas a navegar sistemas do Reino Unido enquanto preserva identidade cultural",
        quote:
          "Ubuntu philosophy guides my work - we rise together. Every family I help strengthens our entire Mozambican community in London.",
        quotePortuguese:
          "A filosofia Ubuntu guia meu trabalho - crescemos juntos. Cada família que ajudo fortalece toda nossa comunidade moçambicana em Londres.",
      },
      {
        name: "Fernando Sitoe",
        profession: "Medical Doctor & Researcher",
        professionPortuguese: "Médico & Investigador",
        achievement:
          "Conducting groundbreaking tropical medicine research, bridging Mozambican traditional healing with British medical science",
        achievementPortuguese:
          "Conduzindo investigação pioneira em medicina tropical, unindo cura tradicional moçambicana com ciência médica britânica",
        quote:
          "Traditional Mozambican healing wisdom combined with British medical training creates powerful solutions for global health challenges.",
        quotePortuguese:
          "A sabedoria tradicional de cura moçambicana combinada com o treino médico britânico cria soluções poderosas para desafios de saúde global.",
      },
    ],
    culturalContributions: {
      music:
        "Marrabenta performances, traditional Mozambican drumming, African Portuguese fusion music",
      musicPortuguese:
        "Performances de Marrabenta, percussão tradicional moçambicana, música de fusão africano-portuguesa",
      cuisine:
        "Mozambican seafood restaurants, peri-peri chicken venues, traditional African Portuguese dishes",
      cuisinePortuguese:
        "Restaurantes de marisco moçambicano, locais de frango peri-peri, pratos tradicionais africano-portugueses",
      traditions:
        "Traditional Mozambican ceremonies, cultural storytelling events, Makonde art exhibitions",
      traditionsPortuguese:
        "Cerimónias tradicionais moçambicanas, eventos de storytelling cultural, exposições de arte Makonde",
      literature:
        "Mozambican poetry evenings, African literature discussions, oral tradition preservation",
      literaturePortuguese:
        "Noites de poesia moçambicana, discussões de literatura africana, preservação de tradições orais",
    },
    londonPresence: {
      years: "30+ years",
      description:
        "Growing community focused on education, healthcare, and preserving Mozambican cultural heritage",
      descriptionPortuguese:
        "Comunidade crescente focada na educação, cuidados de saúde e preservação do património cultural moçambicano",
    },
  },
  {
    id: "cape-verde",
    name: "Cape Verde",
    namePortuguese: "Cabo Verde",
    flag: "🇨🇻",
    population: "560,000",
    language: "Portuguese & Creole",
    languagePortuguese: "Português & Crioulo",
    capital: "Praia",
    capitalPortuguese: "Praia",
    culturalHighlights: [
      "Morna Music",
      "Funaná Dance",
      "Island Cuisine",
      "Creole Culture",
      "Maritime Heritage",
    ],
    culturalHighlightsPortuguese: [
      "Música Morna",
      "Dança Funaná",
      "Culinária Insular",
      "Cultura Crioula",
      "Património Marítimo",
    ],
    londonCommunity: {
      size: "8,000+",
      mainAreas: [
        "Brixton",
        "Tottenham",
        "Wood Green",
        "Elephant & Castle",
        "Bermondsey",
      ],
      culturalEvents: [
        "Cape Verdean Independence Day",
        "Morna music festivals",
        "Island culture celebrations",
      ],
      businesses: [
        "Cape Verdean restaurants",
        "Music venues",
        "Island grocery stores",
        "Cultural centers",
      ],
      education: [
        "Creole language classes",
        "Traditional music schools",
        "Island heritage programs",
      ],
    },
    successStories: [
      {
        name: "Fátima Rodrigues",
        profession: "Healthcare Administrator",
        professionPortuguese: "Administradora de Cuidados de Saúde",
        achievement:
          "Developed multilingual healthcare services reaching 1,000+ Cape Verdean families in London boroughs",
        achievementPortuguese:
          "Desenvolveu serviços de saúde multilingues alcançando 1.000+ famílias cabo-verdianas nos distritos de Londres",
        quote:
          "Speaking Creole in healthcare settings brings comfort to families. Language is medicine for the heart.",
        quotePortuguese:
          "Falar crioulo em ambientes de saúde traz conforto às famílias. A língua é medicina para o coração.",
      },
      {
        name: "Carlos Tavares",
        profession: "Musician & Cultural Ambassador",
        professionPortuguese: "Músico & Embaixador Cultural",
        achievement:
          'Founded "Sounds of Cape Verde" festival showcasing island music to 3,000+ London audiences annually',
        achievementPortuguese:
          'Fundou festival "Sons de Cabo Verde" exibindo música insular para 3.000+ audiências de Londres anualmente',
        quote:
          "Morna music carries the soul of our islands to London. Through song, we keep our homeland alive in every heart.",
        quotePortuguese:
          "A música morna carrega a alma das nossas ilhas para Londres. Através da canção, mantemos nossa pátria viva em cada coração.",
      },
    ],
    culturalContributions: {
      music:
        "Morna and Funaná performances, Cape Verdean guitar music, traditional island singing groups",
      musicPortuguese:
        "Performances de Morna e Funaná, música de guitarra cabo-verdiana, grupos tradicionais de canto insular",
      cuisine:
        "Cape Verdean restaurants serving cachupa, traditional island seafood, Creole fusion cuisine",
      cuisinePortuguese:
        "Restaurantes cabo-verdianos servindo cachupa, marisco tradicional insular, culinária de fusão crioula",
      traditions:
        "Cape Verdean festival celebrations, traditional island ceremonies, Creole cultural events",
      traditionsPortuguese:
        "Celebrações de festivais cabo-verdianos, cerimónias tradicionais insulares, eventos culturais crioulos",
      literature:
        "Cape Verdean poetry readings, Creole storytelling, island literature societies",
      literaturePortuguese:
        "Leituras de poesia cabo-verdiana, storytelling crioulo, sociedades de literatura insular",
    },
    londonPresence: {
      years: "25+ years",
      description:
        "Close-knit island community preserving unique Creole-Portuguese culture and maritime traditions",
      descriptionPortuguese:
        "Comunidade insular unida preservando cultura crioulo-portuguesa única e tradições marítimas",
    },
  },
  {
    id: "guinea-bissau",
    name: "Guinea-Bissau",
    namePortuguese: "Guiné-Bissau",
    flag: "🇬🇼",
    population: "2 million",
    language: "Portuguese & Creole",
    languagePortuguese: "Português & Crioulo",
    capital: "Bissau",
    capitalPortuguese: "Bissau",
    culturalHighlights: [
      "Gumbe Music",
      "Traditional Dance",
      "Rice Culture",
      "Oral Traditions",
      "Coastal Heritage",
    ],
    culturalHighlightsPortuguese: [
      "Música Gumbe",
      "Dança Tradicional",
      "Cultura do Arroz",
      "Tradições Orais",
      "Património Costeiro",
    ],
    londonCommunity: {
      size: "3,500+",
      mainAreas: ["Hackney", "Tottenham", "Southwark", "Newham", "Croydon"],
      culturalEvents: [
        "Guinea-Bissau Independence Day",
        "Gumbe music festivals",
        "West African cultural celebrations",
      ],
      businesses: [
        "West African restaurants",
        "Traditional grocery stores",
        "Cultural community centers",
      ],
      education: [
        "Portuguese-Creole schools",
        "West African heritage classes",
        "Traditional arts programs",
      ],
    },
    successStories: [
      {
        name: "Amílcar Cabral Jr.",
        profession: "Community Organizer",
        professionPortuguese: "Organizador Comunitário",
        achievement:
          "Established Guinea-Bissau Cultural Center serving 500+ families with education and integration support",
        achievementPortuguese:
          "Estabeleceu Centro Cultural da Guiné-Bissau servindo 500+ famílias com educação e apoio de integração",
        quote:
          "Unity is our strength. Building bridges between Guinea-Bissau traditions and London opportunities creates better futures for our children.",
        quotePortuguese:
          "A unidade é nossa força. Construir pontes entre tradições da Guiné-Bissau e oportunidades londrinas cria melhores futuros para nossos filhos.",
      },
    ],
    culturalContributions: {
      music:
        "Gumbe music performances, traditional West African drumming, Portuguese-Creole fusion music",
      musicPortuguese:
        "Performances de música Gumbe, percussão tradicional da África Ocidental, música de fusão português-crioula",
      cuisine:
        "Guinea-Bissau restaurants, traditional rice dishes, West African Portuguese cuisine",
      cuisinePortuguese:
        "Restaurantes da Guiné-Bissau, pratos tradicionais de arroz, culinária portuguesa da África Ocidental",
      traditions:
        "Traditional Guinea-Bissau ceremonies, oral storytelling events, West African cultural festivals",
      traditionsPortuguese:
        "Cerimónias tradicionais da Guiné-Bissau, eventos de storytelling oral, festivais culturais da África Ocidental",
      literature:
        "Guinea-Bissau poetry readings, oral tradition preservation, West African literature events",
      literaturePortuguese:
        "Leituras de poesia da Guiné-Bissau, preservação de tradições orais, eventos de literatura da África Ocidental",
    },
    londonPresence: {
      years: "20+ years",
      description:
        "Emerging community focused on preserving West African Portuguese heritage and supporting education",
      descriptionPortuguese:
        "Comunidade emergente focada em preservar património português da África Ocidental e apoiar educação",
    },
  },
];

export default function LusophoneDiversityShowcase() {
  const { language } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<string>("portugal");
  const [activeSection, setActiveSection] = useState<string>("overview");

  const currentCountry = LUSOPHONE_COUNTRIES.find(
    (country) => country.id === selectedCountry
  );

  const totalLondonCommunity = LUSOPHONE_COUNTRIES.reduce((total, country) => {
    const size = parseInt(country.londonCommunity.size.replace(/[^\d]/g, ""));
    return total + size;
  }, 0);

  return (
    <section className="py-20 bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-100 via-secondary-50 to-accent-100 border border-primary-200 rounded-full px-8 py-3 shadow-lg mb-6">
            <GlobeAltIcon className="w-6 h-6 text-primary-600" />
            <span className="text-sm font-bold text-primary-700">
              {language === "pt"
                ? "Diversidade Lusófona"
                : "Lusophone Diversity"}
            </span>
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {language === "pt"
              ? "Vibrante Diversidade Cultural Lusófona"
              : "Vibrant Lusophone Cultural Diversity"}
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            {language === "pt"
              ? "Descubra a energia pulsante das comunidades lusófonas no Reino Unido - desde noites de fado em Londres até samba no Manchester, kizomba em Birmingham a festivais crioulos em Liverpool. Cada nação traz música, dança, comida e celebrações únicas que conectam corações portugueses."
              : "Discover the pulsating energy of Portuguese-speaking communities across the United Kingdom - from fado nights in London to samba in Manchester, kizomba in Birmingham to Creole festivals in Liverpool. Each nation brings unique music, dance, food and celebrations that connect Portuguese hearts."}
          </p>
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {totalLondonCommunity.toLocaleString()}+
            </div>
            <div className="text-sm text-gray-600">
              {language === "pt"
                ? "Lusófonos em Londres"
                : "Portuguese Speakers in London"}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50">
            <div className="text-3xl font-bold text-secondary-600 mb-2">6</div>
            <div className="text-sm text-gray-600">
              {language === "pt"
                ? "Países Representados"
                : "Countries Represented"}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50">
            <div className="text-3xl font-bold text-accent-600 mb-2">32</div>
            <div className="text-sm text-gray-600">
              {language === "pt" ? "Distritos de Londres" : "London Boroughs"}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50">
            <div className="text-3xl font-bold text-coral-600 mb-2">260M+</div>
            <div className="text-sm text-gray-600">
              {language === "pt"
                ? "Lusófonos Globais"
                : "Global Portuguese Speakers"}
            </div>
          </div>
        </motion.div>

        {/* Country Selection */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {language === "pt"
              ? "Explore Cada Comunidade"
              : "Explore Each Community"}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {LUSOPHONE_COUNTRIES.map((country) => (
              <button
                key={country.id}
                onClick={() => setSelectedCountry(country.id)}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  selectedCountry === country.id
                    ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg scale-105"
                    : "bg-white/80 text-gray-700 hover:bg-gray-100 hover:scale-102 shadow-md border border-gray-200"
                }`}
              >
                <div className="text-3xl mb-2">{country.flag}</div>
                <div className="text-sm font-medium">
                  {language === "pt" ? country.namePortuguese : country.name}
                </div>
                <div className="text-xs opacity-75 mt-1">
                  {country.londonCommunity.size}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Country Detail View */}
        {currentCountry && (
          <motion.div
            key={selectedCountry}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/60 overflow-hidden"
          >
            {/* Country Header */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-6">
                  <div className="text-6xl">{currentCountry.flag}</div>
                  <div>
                    <h3 className="text-3xl font-bold mb-2">
                      {language === "pt"
                        ? currentCountry.namePortuguese
                        : currentCountry.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="opacity-90">
                          {language === "pt" ? "População:" : "Population:"}
                        </span>
                        <br />
                        <span className="font-semibold">
                          {currentCountry.population}
                        </span>
                      </div>
                      <div>
                        <span className="opacity-90">
                          {language === "pt" ? "Língua:" : "Language:"}
                        </span>
                        <br />
                        <span className="font-semibold">
                          {language === "pt"
                            ? currentCountry.languagePortuguese
                            : currentCountry.language}
                        </span>
                      </div>
                      <div>
                        <span className="opacity-90">
                          {language === "pt" ? "Capital:" : "Capital:"}
                        </span>
                        <br />
                        <span className="font-semibold">
                          {language === "pt"
                            ? currentCountry.capitalPortuguese
                            : currentCountry.capital}
                        </span>
                      </div>
                      <div>
                        <span className="opacity-90">
                          {language === "pt" ? "Em Londres:" : "In London:"}
                        </span>
                        <br />
                        <span className="font-semibold">
                          {currentCountry.londonCommunity.size}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-lg font-bold mb-1">
                      {currentCountry.londonPresence.years}
                    </div>
                    <div className="text-sm opacity-90">
                      {language === "pt" ? "em Londres" : "in London"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cultural Highlights */}
              <div>
                <h4 className="font-semibold mb-3">
                  {language === "pt"
                    ? "Destaques Culturais:"
                    : "Cultural Highlights:"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(language === "pt"
                    ? currentCountry.culturalHighlightsPortuguese
                    : currentCountry.culturalHighlights
                  ).map((highlight, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/20 text-white text-sm rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Section Navigation */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                {[
                  {
                    id: "overview",
                    labelEn: "Community Overview",
                    labelPt: "Visão Geral da Comunidade",
                  },
                  {
                    id: "success",
                    labelEn: "Success Stories",
                    labelPt: "Histórias de Sucesso",
                  },
                  {
                    id: "culture",
                    labelEn: "Cultural Contributions",
                    labelPt: "Contribuições Culturais",
                  },
                  {
                    id: "presence",
                    labelEn: "London Presence",
                    labelPt: "Presença em Londres",
                  },
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                      activeSection === section.id
                        ? "text-primary-600 border-b-2 border-primary-500"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {language === "pt" ? section.labelPt : section.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Section Content */}
            <div className="p-8">
              {activeSection === "overview" && (
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      {language === "pt"
                        ? "Presença Comunitária em Londres"
                        : "Community Presence in London"}
                    </h4>
                    <p className="text-gray-700 mb-6">
                      {language === "pt"
                        ? currentCountry.londonPresence.descriptionPortuguese
                        : currentCountry.londonPresence.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <MapPinIcon className="w-4 h-4" />
                          {language === "pt"
                            ? "Principais Áreas:"
                            : "Main Areas:"}
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {currentCountry.londonCommunity.mainAreas.map(
                            (area, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                              >
                                {area}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <SparklesIcon className="w-4 h-4" />
                          {language === "pt"
                            ? "Eventos Culturais:"
                            : "Cultural Events:"}
                        </h5>
                        <ul className="space-y-1">
                          {currentCountry.londonCommunity.culturalEvents.map(
                            (event, index) => (
                              <li
                                key={index}
                                className="text-gray-700 text-sm flex items-start gap-2"
                              >
                                <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2 flex-shrink-0" />
                                {event}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <BuildingOffice2Icon className="w-4 h-4" />
                          {language === "pt" ? "Negócios:" : "Businesses:"}
                        </h5>
                        <ul className="space-y-1">
                          {currentCountry.londonCommunity.businesses.map(
                            (business, index) => (
                              <li
                                key={index}
                                className="text-gray-700 text-sm flex items-start gap-2"
                              >
                                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0" />
                                {business}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <AcademicCapIcon className="w-4 h-4" />
                          {language === "pt" ? "Educação:" : "Education:"}
                        </h5>
                        <ul className="space-y-1">
                          {currentCountry.londonCommunity.education.map(
                            (edu, index) => (
                              <li
                                key={index}
                                className="text-gray-700 text-sm flex items-start gap-2"
                              >
                                <div className="w-1.5 h-1.5 bg-coral-500 rounded-full mt-2 flex-shrink-0" />
                                {edu}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "success" && (
                <div className="space-y-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-6">
                    {language === "pt"
                      ? "Histórias de Sucesso da Comunidade"
                      : "Community Success Stories"}
                  </h4>

                  {currentCountry.successStories.map((story, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-secondary-50 to-accent-50 rounded-lg p-6 border border-secondary-200"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                          {story.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-900">
                            {story.name}
                          </h5>
                          <p className="text-secondary-600 font-medium">
                            {language === "pt"
                              ? story.professionPortuguese
                              : story.profession}
                          </p>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 mb-4">
                        <h6 className="font-semibold text-gray-900 mb-2">
                          {language === "pt"
                            ? "Conquista Principal:"
                            : "Key Achievement:"}
                        </h6>
                        <p className="text-gray-700 text-sm">
                          {language === "pt"
                            ? story.achievementPortuguese
                            : story.achievement}
                        </p>
                      </div>

                      <blockquote className="italic text-gray-700 border-l-4 border-primary-500 pl-4">
                        "
                        {language === "pt"
                          ? story.quotePortuguese
                          : story.quote}
                        "
                      </blockquote>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === "culture" && (
                <div className="space-y-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-6">
                    {language === "pt"
                      ? "Contribuições Culturais para Londres"
                      : "Cultural Contributions to London"}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6">
                      <h5 className="font-semibold text-primary-800 mb-3 flex items-center gap-2">
                        <MusicalNoteIcon className="w-5 h-5" />
                        {language === "pt" ? "Música:" : "Music:"}
                      </h5>
                      <p className="text-primary-700 text-sm">
                        {language === "pt"
                          ? currentCountry.culturalContributions.musicPortuguese
                          : currentCountry.culturalContributions.music}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-secondary-50 to-accent-50 rounded-lg p-6">
                      <h5 className="font-semibold text-secondary-800 mb-3 flex items-center gap-2">
                        <CameraIcon className="w-5 h-5" />
                        {language === "pt" ? "Culinária:" : "Cuisine:"}
                      </h5>
                      <p className="text-secondary-700 text-sm">
                        {language === "pt"
                          ? currentCountry.culturalContributions
                              .cuisinePortuguese
                          : currentCountry.culturalContributions.cuisine}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-accent-50 to-coral-50 rounded-lg p-6">
                      <h5 className="font-semibold text-accent-800 mb-3 flex items-center gap-2">
                        <SparklesIcon className="w-5 h-5" />
                        {language === "pt" ? "Tradições:" : "Traditions:"}
                      </h5>
                      <p className="text-accent-700 text-sm">
                        {language === "pt"
                          ? currentCountry.culturalContributions
                              .traditionsPortuguese
                          : currentCountry.culturalContributions.traditions}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-coral-50 to-primary-50 rounded-lg p-6">
                      <h5 className="font-semibold text-coral-800 mb-3 flex items-center gap-2">
                        <BookOpenIcon className="w-5 h-5" />
                        {language === "pt" ? "Literatura:" : "Literature:"}
                      </h5>
                      <p className="text-coral-700 text-sm">
                        {language === "pt"
                          ? currentCountry.culturalContributions
                              .literaturePortuguese
                          : currentCountry.culturalContributions.literature}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "presence" && (
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-6">
                    {language === "pt"
                      ? "Presença Histórica em Londres"
                      : "Historical Presence in London"}
                  </h4>

                  <div className="bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <CalendarDaysIcon className="w-8 h-8 text-primary-600" />
                      <div>
                        <h5 className="font-bold text-gray-900">
                          {currentCountry.londonPresence.years}
                        </h5>
                        <p className="text-gray-600">
                          {language === "pt"
                            ? "de presença estabelecida"
                            : "of established presence"}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700">
                      {language === "pt"
                        ? currentCountry.londonPresence.descriptionPortuguese
                        : currentCountry.londonPresence.description}
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h5 className="font-semibold text-gray-900 mb-4">
                      {language === "pt"
                        ? "Impacto na Diversidade Londrina"
                        : "Impact on London's Diversity"}
                    </h5>
                    <p className="text-gray-700 mb-4">
                      {language === "pt"
                        ? `A comunidade ${currentCountry.namePortuguese.toLowerCase()} contribui significativamente para a rica tapeçaria cultural de Londres, trazendo tradições únicas, perspetivas valiosas e inovação para a cidade.`
                        : `The ${currentCountry.name.toLowerCase()} community contributes significantly to London's rich cultural tapestry, bringing unique traditions, valuable perspectives, and innovation to the city.`}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-primary-600">
                          {currentCountry.londonCommunity.size}
                        </div>
                        <div className="text-sm text-gray-600">
                          {language === "pt"
                            ? "Membros da Comunidade"
                            : "Community Members"}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-secondary-600">
                          {currentCountry.londonCommunity.mainAreas.length}
                        </div>
                        <div className="text-sm text-gray-600">
                          {language === "pt"
                            ? "Principais Áreas"
                            : "Main Areas"}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-accent-600">
                          {currentCountry.londonCommunity.culturalEvents.length}
                          +
                        </div>
                        <div className="text-sm text-gray-600">
                          {language === "pt"
                            ? "Eventos Anuais"
                            : "Annual Events"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-3xl p-8 text-center text-white shadow-2xl">
            <GlobeAltIcon className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-3xl font-bold mb-4">
              {language === "pt"
                ? "Viva a Energia Cultural Lusófona"
                : "Experience Lusophone Cultural Energy"}
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-3xl mx-auto">
              {language === "pt"
                ? "Conecte-se através de música, dança, comida incrível e celebrações vibrantes. Do fado ao samba, kizomba ao forró - encontre sua tribo cultural no Reino Unido e celebre a alegria de ser lusófono!"
                : "Connect through music, dance, amazing food and vibrant celebrations. From fado to samba, kizomba to forró - find your cultural tribe across the United Kingdom and celebrate the joy of being Portuguese-speaking!"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <a
                href={ROUTES.signup}
                className="bg-white text-primary-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                {language === "pt"
                  ? "Juntar-se à Comunidade"
                  : "Join the Community"}
              </a>
              <a
                href={ROUTES.events}
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-primary-600 transition-colors"
              >
                {language === "pt" ? "Explorar Eventos" : "Explore Events"}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
