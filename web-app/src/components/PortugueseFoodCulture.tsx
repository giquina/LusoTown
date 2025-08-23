"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FireIcon,
  HeartIcon,
  SparklesIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  ArrowRightIcon,
  GiftIcon,
  SunIcon,
  BeakerIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";

interface FoodExperience {
  id: string;
  titleEn: string;
  titlePt: string;
  category: 'pastries' | 'seafood' | 'bbq' | 'wine' | 'street_food' | 'breakfast' | 'regional';
  mealTime: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'anytime' | 'special_occasion';
  icon: string;
  descriptionEn: string;
  descriptionPt: string;
  culturalMagic: {
    en: string;
    pt: string;
  };
  londonSpots: string[];
  bestTime: string;
  socialAspect: {
    en: string;
    pt: string;
  };
  tasteProfile: string[];
  culturalStory: {
    en: string;
    pt: string;
  };
  communityConnection: string[];
  pairingTraditions: string[];
}

const foodExperiences: FoodExperience[] = [
  {
    id: "pasteis_de_nata",
    titleEn: "Pastéis de Nata - Portugal's Golden Treasures",
    titlePt: "Pastéis de Nata - Tesouros Dourados de Portugal",
    category: "pastries",
    mealTime: "anytime",
    icon: "🧁",
    descriptionEn: "Iconic custard tarts with flaky pastry and caramelized tops that make any gathering special. These golden treasures are Portugal's most beloved culinary ambassadors worldwide.",
    descriptionPt: "Icónicos pastéis de nata com massa folhada e topo caramelizado que tornam qualquer encontro especial. Estes tesouros dourados são os embaixadores culinários mais amados de Portugal mundialmente.",
    culturalMagic: {
      en: "Pastéis de nata create instant joy and comfort. The first bite transports you to Portugal - the crispy pastry, creamy custard, and caramelized sweetness create pure happiness.",
      pt: "Os pastéis de nata criam alegria e conforto instantâneos. A primeira dentada transporta-o para Portugal - a massa crocante, o creme sedoso e a doçura caramelizada criam felicidade pura."
    },
    londonSpots: ["Pastéis de Belém (Stockwell)", "Nata (multiple locations)", "Borough Market Portuguese stalls", "Local Portuguese bakeries"],
    bestTime: "Morning with coffee or afternoon with friends",
    socialAspect: {
      en: "Sharing pastéis de nata brings people together. Portuguese families bond over these treats, and offering them to guests is the ultimate act of hospitality.",
      pt: "Partilhar pastéis de nata une as pessoas. Famílias portuguesas criam laços sobre estes doces, e oferecê-los aos convidados é o acto máximo de hospitalidade."
    },
    tasteProfile: ["Creamy custard", "Flaky pastry", "Caramelized sweetness", "Cinnamon hints", "Vanilla notes"],
    culturalStory: {
      en: "Created by monks in Belém over 200 years ago, the secret recipe is still guarded. Each London Portuguese baker adds their own touch while honoring tradition.",
      pt: "Criados por monges em Belém há mais de 200 anos, a receita secreta ainda é guardada. Cada pasteleiro português de Londres adiciona o seu toque enquanto honra a tradição."
    },
    communityConnection: ["Family recipes", "Weekend traditions", "Café conversations", "Cultural pride", "Generational sharing"],
    pairingTraditions: ["Strong espresso", "Galão (Portuguese latte)", "Port wine", "Afternoon tea", "Family gatherings"]
  },
  {
    id: "bacalhau_traditions",
    titleEn: "Bacalhau - 365 Ways to Bring Families Together",
    titlePt: "Bacalhau - 365 Maneiras de Unir Famílias",
    category: "seafood",
    mealTime: "lunch",
    icon: "🐟",
    descriptionEn: "Portugal's beloved cod fish prepared in countless traditional ways that bring families together around the table. Every Portuguese family has their treasured bacalhau recipes.",
    descriptionPt: "O amado bacalhau português preparado de inúmeras maneiras tradicionais que unem famílias à mesa. Cada família portuguesa tem as suas receitas preciosas de bacalhau.",
    culturalMagic: {
      en: "Bacalhau meals create family unity and tradition. The preparation is often a family affair, with recipes passed down through generations, creating deep emotional connections.",
      pt: "As refeições de bacalhau criam unidade familiar e tradição. A preparação é frequentemente um assunto de família, com receitas transmitidas através de gerações, criando conexões emocionais profundas."
    },
    londonSpots: ["Portuguese family restaurants", "Home kitchens", "Community dinners", "Portuguese cultural centres"],
    bestTime: "Sunday family lunches and special occasions",
    socialAspect: {
      en: "Bacalhau dishes are the centerpiece of Portuguese family gatherings. Preparing and sharing these meals strengthens family bonds and preserves cultural identity.",
      pt: "Os pratos de bacalhau são o centro dos encontros familiares portugueses. Preparar e partilhar estas refeições fortalece laços familiares e preserva a identidade cultural."
    },
    tasteProfile: ["Rich and flaky", "Savory depth", "Garlic and herbs", "Olive oil richness", "Comfort warmth"],
    culturalStory: {
      en: "Portuguese explorers brought salted cod from northern seas, and it became central to Portuguese cuisine. There are truly 365+ ways to prepare bacalhau.",
      pt: "Os exploradores portugueses trouxeram bacalhau salgado dos mares do norte, e tornou-se central na culinária portuguesa. Há verdadeiramente mais de 365 maneiras de preparar bacalhau."
    },
    communityConnection: ["Family recipes", "Sunday traditions", "Cultural identity", "Generational bonds", "Celebration meals"],
    pairingTraditions: ["Vinho Verde", "Portuguese bread", "Roasted potatoes", "Family conversations", "Traditional sides"]
  },
  {
    id: "portuguese_bbq",
    titleEn: "Portuguese BBQ (Churrasquinho) - Social Grilling Culture",
    titlePt: "Churrasco Português - Cultura Social de Grelhados",
    category: "bbq",
    mealTime: "dinner",
    icon: "🔥",
    descriptionEn: "Social grilling culture with amazing flavors that brings the Portuguese-speaking community together for incredible barbecue experiences filled with laughter and connection.",
    descriptionPt: "Cultura social de grelhados com sabores incríveis que une a comunidade de falantes de português para experiências de churrasco extraordinárias cheias de riso e conexão.",
    culturalMagic: {
      en: "Portuguese BBQ creates instant community. The smell of grilled sardines, chicken, and chorizo brings neighbors together, creating spontaneous celebrations and lasting friendships.",
      pt: "O churrasco português cria comunidade instantânea. O aroma de sardinhas grelhadas, frango e chouriço une vizinhos, criando celebrações espontâneas e amizades duradouras."
    },
    londonSpots: ["Portuguese-speaking community BBQs", "Parks during Santos Populares", "Private gardens", "Cultural events"],
    bestTime: "Summer evenings and Portuguese festivals",
    socialAspect: {
      en: "Portuguese BBQs are legendary social events where everyone contributes something and leaves with new friends. The grilling is as much about community as it is about food.",
      pt: "Os churrascos portugueses são eventos sociais lendários onde todos contribuem com algo e saem com novos amigos. O grelhado é tanto sobre comunidade quanto sobre comida."
    },
    tasteProfile: ["Smoky flavors", "Herb marinades", "Grilled perfection", "Portuguese spices", "Charcoal essence"],
    culturalStory: {
      en: "Portuguese grilling traditions come from coastal communities where fresh fish and meat were grilled over open fires, creating flavors that define Portuguese outdoor cooking.",
      pt: "As tradições portuguesas de grelhados vêm de comunidades costeiras onde peixe fresco e carne eram grelhados sobre fogueiras, criando sabores que definem a cozinha portuguesa ao ar livre."
    },
    communityConnection: ["Neighborhood gatherings", "Festival celebrations", "Summer traditions", "Cross-cultural sharing", "Community bonds"],
    pairingTraditions: ["Portuguese beer", "Vinho tinto", "Grilled vegetables", "Broa bread", "Outdoor fellowship"]
  },
  {
    id: "port_wine_culture",
    titleEn: "Port Wine Culture - Social Wine Tasting Traditions",
    titlePt: "Cultura do Vinho do Porto - Tradições Sociais de Prova",
    category: "wine",
    mealTime: "special_occasion",
    icon: "🍷",
    descriptionEn: "Social wine tasting and conversation traditions that create intimate connections and celebrate Portugal's most famous wine export with sophistication and warmth.",
    descriptionPt: "Tradições sociais de prova de vinho e conversação que criam conexões íntimas e celebram a mais famosa exportação de vinho de Portugal com sofisticação e calor.",
    culturalMagic: {
      en: "Port wine creates intimate conversations and deep connections. Its rich, complex flavors encourage slow sipping and meaningful dialogue, bringing out the Portuguese art of conversation.",
      pt: "O vinho do Porto cria conversas íntimas e conexões profundas. Os seus sabores ricos e complexos encorajam degustação lenta e diálogo significativo, revelando a arte portuguesa da conversação."
    },
    londonSpots: ["Portuguese wine bars", "Cultural tastings", "Fine dining restaurants", "Private homes"],
    bestTime: "Evening conversations and special celebrations",
    socialAspect: {
      en: "Port wine tastings are sophisticated social events where Portuguese culture shines. These gatherings celebrate heritage while creating new connections through shared appreciation.",
      pt: "As provas de vinho do Porto são eventos sociais sofisticados onde a cultura portuguesa brilha. Estes encontros celebram a herança enquanto criam novas conexões através de apreciação partilhada."
    },
    tasteProfile: ["Rich sweetness", "Complex layers", "Nutty undertones", "Fruity depth", "Warming finish"],
    culturalStory: {
      en: "Port wine has been crafted in Portugal's Douro Valley for centuries. It represents Portuguese mastery of winemaking and has become a symbol of refinement worldwide.",
      pt: "O vinho do Porto tem sido elaborado no Vale do Douro em Portugal há séculos. Representa a maestria portuguesa na vinicultura e tornou-se um símbolo de requinte mundialmente."
    },
    communityConnection: ["Cultural sophistication", "Heritage celebration", "Refined gatherings", "Educational tastings", "International recognition"],
    pairingTraditions: ["Portuguese cheese", "Dark chocolate", "Nuts and dried fruits", "Elegant conversations", "Cultural discussions"]
  },
  {
    id: "francesinha",
    titleEn: "Francesinha - Porto's Incredible Sandwich Experience",
    titlePt: "Francesinha - Experiência Incrível de Sanduíche do Porto",
    category: "street_food",
    mealTime: "lunch",
    icon: "🥪",
    descriptionEn: "Porto's incredible sandwich that's a cultural experience - layers of meat, cheese, and special sauce that create an amazing comfort food adventure.",
    descriptionPt: "A incrível sanduíche do Porto que é uma experiência cultural - camadas de carne, queijo e molho especial que criam uma aventura de comida de conforto incrível.",
    culturalMagic: {
      en: "Francesinha is pure Porto pride on a plate. This hearty sandwich represents the city's bold flavors and generous spirit, creating instant satisfaction and cultural connection.",
      pt: "A francesinha é puro orgulho do Porto num prato. Esta sanduíche farta representa os sabores arrojados e espírito generoso da cidade, criando satisfação instantânea e conexão cultural."
    },
    londonSpots: ["Portuguese restaurants", "Porto-style cafés", "Cultural food events", "Specialty food trucks"],
    bestTime: "Late lunch or hearty dinner",
    socialAspect: {
      en: "Sharing a francesinha is a bonding experience. Its generous size often leads to sharing, creating connections over this iconic Porto comfort food.",
      pt: "Partilhar uma francesinha é uma experiência de união. O seu tamanho generoso frequentemente leva a partilha, criando conexões sobre esta icónica comida de conforto do Porto."
    },
    tasteProfile: ["Rich and hearty", "Cheesy goodness", "Spicy sauce", "Meaty satisfaction", "Comfort warmth"],
    culturalStory: {
      en: "Created in Porto in the 1960s, francesinha represents the city's innovation and bold culinary spirit. Each restaurant guards its secret sauce recipe.",
      pt: "Criada no Porto nos anos 1960, a francesinha representa a inovação e espírito culinário arrojado da cidade. Cada restaurante guarda a sua receita secreta de molho."
    },
    communityConnection: ["Porto pride", "Comfort food tradition", "Generous sharing", "City identity", "Culinary boldness"],
    pairingTraditions: ["Portuguese beer", "Crisp white wine", "Shared plates", "Casual conversations", "City nostalgia"]
  },
  {
    id: "bifana",
    titleEn: "Bifana - Street Food Culture That Brings People Together",
    titlePt: "Bifana - Cultura de Comida de Rua Que Une Pessoas",
    category: "street_food",
    mealTime: "snack",
    icon: "🥖",
    descriptionEn: "Portugal's beloved pork sandwich that creates instant connections through street food culture, bringing people together over simple, delicious comfort food.",
    descriptionPt: "A amada sanduíche de porco de Portugal que cria conexões instantâneas através da cultura de comida de rua, unindo pessoas sobre comida de conforto simples e deliciosa.",
    culturalMagic: {
      en: "Bifana represents Portuguese simplicity and warmth. This humble sandwich creates community connections, whether shared at sports events, festivals, or quick lunch breaks.",
      pt: "A bifana representa a simplicidade e calor portugueses. Esta humilde sanduíche cria conexões comunitárias, seja partilhada em eventos desportivos, festivais ou pausas rápidas para almoço."
    },
    londonSpots: ["Portuguese cafés", "Food festivals", "Sports bars", "Quick lunch spots"],
    bestTime: "Quick lunch, festival snacks, or late-night comfort",
    socialAspect: {
      en: "Bifana brings people together across social boundaries. It's equally enjoyed by workers, students, and families, creating shared cultural experiences.",
      pt: "A bifana une pessoas através de fronteiras sociais. É igualmente apreciada por trabalhadores, estudantes e famílias, criando experiências culturais partilhadas."
    },
    tasteProfile: ["Savory pork", "Garlic notes", "Tender bread", "Simple spices", "Comfort satisfaction"],
    culturalStory: {
      en: "Bifana is Portugal's democratic food - affordable, delicious, and loved by all. It represents the Portuguese values of simplicity and community sharing.",
      pt: "A bifana é a comida democrática de Portugal - acessível, deliciosa e amada por todos. Representa os valores portugueses de simplicidade e partilha comunitária."
    },
    communityConnection: ["Democratic food culture", "Cross-class appeal", "Festival traditions", "Quick connections", "Cultural accessibility"],
    pairingTraditions: ["Portuguese beer", "Espresso", "Casual conversation", "Sports viewing", "Festival atmosphere"]
  },
  {
    id: "portuguese_breakfast",
    titleEn: "Portuguese Breakfast - Strong Coffee & Morning Community",
    titlePt: "Pequeno-Almoço Português - Café Forte & Comunidade Matinal",
    category: "breakfast",
    mealTime: "breakfast",
    icon: "☕",
    descriptionEn: "Strong coffee and pastries creating morning community rituals where Portuguese speakers gather to start the day with warmth, conversation, and cultural connection.",
    descriptionPt: "Café forte e pastelaria criando rituais de comunidade matinal onde lusófonos se reúnem para começar o dia com calor, conversação e conexão cultural.",
    culturalMagic: {
      en: "Portuguese breakfast creates daily community rituals. The strong coffee energizes while pastries comfort, and conversations set a positive tone for the entire day.",
      pt: "O pequeno-almoço português cria rituais comunitários diários. O café forte energiza enquanto a pastelaria conforta, e as conversas definem um tom positivo para todo o dia."
    },
    londonSpots: ["Portuguese cafés", "Local bakeries", "Community centres", "Workplace break rooms"],
    bestTime: "Early morning, 7am - 10am",
    socialAspect: {
      en: "Morning coffee culture creates daily touchpoints for the Portuguese-speaking community, maintaining connections and sharing news while starting the day together.",
      pt: "A cultura do café matinal cria pontos de contacto diários para a comunidade de falantes de português, mantendo conexões e partilhando notícias enquanto começam o dia juntos."
    },
    tasteProfile: ["Strong coffee", "Sweet pastries", "Fresh bread", "Simple pleasures", "Morning comfort"],
    culturalStory: {
      en: "Portuguese coffee culture emphasizes strong, quality coffee enjoyed slowly with community. It's about starting the day right with good people and good conversation.",
      pt: "A cultura portuguesa do café enfatiza café forte e de qualidade apreciado lentamente com a comunidade. É sobre começar bem o dia com boas pessoas e boa conversação."
    },
    communityConnection: ["Daily rituals", "Morning news sharing", "Community updates", "Social routine", "Cultural maintenance"],
    pairingTraditions: ["Fresh pastries", "Portuguese bread", "Morning newspapers", "Community gossip", "Day planning"]
  },
  {
    id: "regional_specialties",
    titleEn: "Regional Specialties - From Northern Cozido to Southern Cataplana",
    titlePt: "Especialidades Regionais - Do Cozido do Norte à Cataplana do Sul",
    category: "regional",
    mealTime: "special_occasion",
    icon: "🍲",
    descriptionEn: "Incredible regional dishes from across Portugal that celebrate local traditions and bring authentic Portuguese flavors to London's Portuguese-speaking community.",
    descriptionPt: "Pratos regionais incríveis de todo o Portugal que celebram tradições locais e trazem sabores portugueses autênticos para a comunidade de falantes de português de Londres.",
    culturalMagic: {
      en: "Regional dishes connect London's Portuguese-speaking community to their roots, evoking memories of home while creating new traditions in their adopted city.",
      pt: "Os pratos regionais conectam a comunidade de falantes de português de Londres às suas raízes, evocando memórias de casa enquanto criam novas tradições na sua cidade adoptiva."
    },
    londonSpots: ["Regional Portuguese restaurants", "Cultural festivals", "Private family dinners", "Community celebrations"],
    bestTime: "Special occasions and cultural celebrations",
    socialAspect: {
      en: "Regional dishes create connections between Portuguese people from different areas, sharing their local traditions and creating a unified Portuguese identity in London.",
      pt: "Os pratos regionais criam conexões entre portugueses de diferentes áreas, partilhando as suas tradições locais e criando uma identidade portuguesa unificada em Londres."
    },
    tasteProfile: ["Regional authenticity", "Local ingredients", "Traditional methods", "Ancestral flavors", "Home memories"],
    culturalStory: {
      en: "Each Portuguese region has distinct culinary traditions. In London, these regional dishes help maintain cultural diversity within the broader Portuguese identity.",
      pt: "Cada região portuguesa tem tradições culinárias distintas. Em Londres, estes pratos regionais ajudam a manter a diversidade cultural dentro da identidade portuguesa mais ampla."
    },
    communityConnection: ["Regional pride", "Cultural diversity", "Home connections", "Traditional preservation", "Identity celebration"],
    pairingTraditions: ["Regional wines", "Traditional accompaniments", "Family stories", "Cultural sharing", "Heritage celebration"]
  }
];

const PortugueseFoodCulture: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedExperience, setSelectedExperience] = useState<FoodExperience | null>(null);

  const categories = [
    { id: 'all', nameEn: 'All Portuguese Food', namePt: 'Toda Comida Portuguesa', icon: '🍽️' },
    { id: 'pastries', nameEn: 'Sweet Pastries', namePt: 'Doçaria', icon: '🧁' },
    { id: 'seafood', nameEn: 'Seafood Traditions', namePt: 'Tradições Marítimas', icon: '🐟' },
    { id: 'bbq', nameEn: 'BBQ Culture', namePt: 'Cultura Churrasco', icon: '🔥' },
    { id: 'wine', nameEn: 'Wine Culture', namePt: 'Cultura Vinho', icon: '🍷' },
    { id: 'street_food', nameEn: 'Street Food', namePt: 'Comida de Rua', icon: '🥪' },
    { id: 'breakfast', nameEn: 'Morning Rituals', namePt: 'Rituais Matinais', icon: '☕' }
  ];

  const filteredExperiences = selectedCategory === 'all' 
    ? foodExperiences 
    : foodExperiences.filter(exp => exp.category === selectedCategory);

  const getMealTimeColor = (mealTime: string) => {
    const colorMap: Record<string, string> = {
      'breakfast': 'from-yellow-500 to-orange-500',
      'lunch': 'from-green-500 to-blue-500',
      'dinner': 'from-red-500 to-purple-500',
      'snack': 'from-pink-500 to-purple-500',
      'anytime': 'from-indigo-500 to-purple-500',
      'special_occasion': 'from-gold-500 to-amber-500'
    };
    return colorMap[mealTime] || 'from-primary-500 to-secondary-500';
  };

  const getMealTimeIcon = (mealTime: string) => {
    const iconMap: Record<string, React.ReactElement> = {
      'breakfast': <SunIcon className="w-4 h-4" />,
      'lunch': <ClockIcon className="w-4 h-4" />,
      'dinner': <MoonIcon className="w-4 h-4" />,
      'snack': <FireIcon className="w-4 h-4" />,
      'anytime': <HeartIcon className="w-4 h-4" />,
      'special_occasion': <GiftIcon className="w-4 h-4" />
    };
    return iconMap[mealTime] || <BeakerIcon className="w-4 h-4" />;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-white via-orange-50 to-red-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-orange-200 via-red-100 to-yellow-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-tr from-red-200 via-orange-100 to-yellow-100 rounded-full opacity-25"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-red-100 rounded-full px-6 py-3 mb-6">
            <BeakerIcon className="w-5 h-5 text-orange-600 mr-2" />
            <span className="text-orange-700 font-medium">
              {language === "pt" ? "Cultura Gastronómica Portuguesa" : "Portuguese Food Culture"}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === "pt" 
              ? "Sabores Incríveis da Comida Portuguesa" 
              : "Amazing Portuguese Food Culture"}
          </h2>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-4">
            {language === "pt"
              ? "Descubra pastéis de nata divinos, tradições de bacalhau, churrasco português, cultura do vinho do Porto e especialidades regionais que tornam a gastronomia portuguesa absolutamente cativante e deliciosa."
              : "Discover divine pastéis de nata, bacalhau traditions, Portuguese BBQ, Port wine culture, and regional specialties that make Portuguese cuisine absolutely captivating and delicious."
            }
          </p>

          <div className="inline-flex items-center gap-2 text-lg text-orange-600 font-medium">
            <HeartIcon className="w-5 h-5" />
            <span>
              {language === "pt" ? "Sabores que unem corações" : "Flavors that unite hearts"}
            </span>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:shadow-md'
              }`}
            >
              <span className="text-base">{category.icon}</span>
              <span className="font-medium">
                {language === "pt" ? category.namePt : category.nameEn}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Food Experiences Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedExperience(experience)}
            >
              {/* Header with meal time gradient */}
              <div className={`h-2 bg-gradient-to-r ${getMealTimeColor(experience.mealTime)}`}></div>
              
              <div className="p-6">
                {/* Title and Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center text-2xl">
                        {experience.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-orange-600 transition-colors">
                          {language === "pt" ? experience.titlePt : experience.titleEn}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="capitalize">{experience.category.replace('_', ' ')}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            {getMealTimeIcon(experience.mealTime)}
                            <span className="capitalize">{experience.mealTime.replace('_', ' ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <BeakerIcon className="w-6 h-6 text-orange-500 group-hover:text-orange-600 transition-colors" />
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {language === "pt" ? experience.descriptionPt : experience.descriptionEn}
                </p>

                {/* Cultural Magic */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 mb-4 border border-orange-100">
                  <div className="flex items-center gap-2 mb-2">
                    <SparklesIcon className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">
                      {language === "pt" ? "Magia Cultural" : "Cultural Magic"}
                    </span>
                  </div>
                  <p className="text-sm text-orange-700 leading-relaxed">
                    {language === "pt" ? experience.culturalMagic.pt : experience.culturalMagic.en}
                  </p>
                </div>

                {/* London Spots */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPinIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {language === "pt" ? "Onde encontrar em Londres:" : "Where to find in London:"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {experience.londonSpots.slice(0, 2).map((spot, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full"
                      >
                        {spot}
                      </span>
                    ))}
                    {experience.londonSpots.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{experience.londonSpots.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Best Time */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ClockIcon className="w-4 h-4" />
                    <span>{experience.bestTime}</span>
                  </div>
                </div>

                {/* Taste Profile */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {language === "pt" ? "Perfil de sabor:" : "Taste profile:"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {experience.tasteProfile.slice(0, 3).map((taste, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-full"
                      >
                        {taste}
                      </span>
                    ))}
                    {experience.tasteProfile.length > 3 && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full">
                        +{experience.tasteProfile.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105">
                  {language === "pt" ? "Experimentar Esta Delícia" : "Try This Delicacy"}
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Food Culture Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white"
        >
          <div className="flex justify-center mb-4">
            <BeakerIcon className="w-12 h-12 opacity-80" />
          </div>
          <blockquote className="text-2xl md:text-3xl italic mb-4">
            {language === "pt" 
              ? "\"A comida portuguesa une corações e cria famílias onde quer que seja partilhada.\""
              : "\"Portuguese food unites hearts and creates families wherever it's shared.\""}
          </blockquote>
          <div className="mt-6">
            <p className="text-lg opacity-95">
              {language === "pt"
                ? "Junte-se à nossa cultura gastronómica e descubra como os sabores portugueses criam conexões mágicas em Londres."
                : "Join our food culture and discover how Portuguese flavors create magical connections in London."
              }
            </p>
          </div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      {selectedExperience && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className={`h-2 bg-gradient-to-r ${getMealTimeColor(selectedExperience.mealTime)}`}></div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center text-3xl">
                    {selectedExperience.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">
                      {language === "pt" ? selectedExperience.titlePt : selectedExperience.titleEn}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="capitalize">{selectedExperience.category.replace('_', ' ')}</span>
                      <span>•</span>
                      <span className="capitalize">{selectedExperience.mealTime.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {language === "pt" ? "Descrição" : "Description"}
                  </h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {language === "pt" ? selectedExperience.descriptionPt : selectedExperience.descriptionEn}
                  </p>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 mb-6 border border-orange-100">
                    <h5 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                      <SparklesIcon className="w-4 h-4" />
                      {language === "pt" ? "Magia Cultural" : "Cultural Magic"}
                    </h5>
                    <p className="text-orange-700 leading-relaxed">
                      {language === "pt" ? selectedExperience.culturalMagic.pt : selectedExperience.culturalMagic.en}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-100">
                    <h5 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                      <UserGroupIcon className="w-4 h-4" />
                      {language === "pt" ? "Aspecto Social" : "Social Aspect"}
                    </h5>
                    <p className="text-green-700 leading-relaxed">
                      {language === "pt" ? selectedExperience.socialAspect.pt : selectedExperience.socialAspect.en}
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {language === "pt" ? "Detalhes Gastronómicos" : "Culinary Details"}
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4 text-primary-500" />
                        {language === "pt" ? "Locais em Londres" : "London Spots"}
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedExperience.londonSpots.map((spot, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                          >
                            {spot}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                        <ClockIcon className="w-4 h-4 text-secondary-500" />
                        {language === "pt" ? "Melhor Altura" : "Best Time"}
                      </h5>
                      <p className="text-gray-600">{selectedExperience.bestTime}</p>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        {language === "pt" ? "Perfil de Sabor" : "Taste Profile"}
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedExperience.tasteProfile.map((taste, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-yellow-50 text-yellow-700 text-sm rounded-full"
                          >
                            {taste}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                        <HeartIcon className="w-4 h-4 text-pink-500" />
                        {language === "pt" ? "Conexão Comunitária" : "Community Connection"}
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedExperience.communityConnection.map((connection, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-pink-50 text-pink-700 text-sm rounded-full"
                          >
                            {connection}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
                      <h5 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
                        <HomeIcon className="w-4 h-4" />
                        {language === "pt" ? "História Cultural" : "Cultural Story"}
                      </h5>
                      <p className="text-indigo-700 leading-relaxed">
                        {language === "pt" ? selectedExperience.culturalStory.pt : selectedExperience.culturalStory.en}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pairing Traditions */}
              <div className="mt-8">
                <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <GiftIcon className="w-5 h-5 text-orange-500" />
                  {language === "pt" ? "Tradições de Acompanhamento" : "Pairing Traditions"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExperience.pairingTraditions.map((pairing, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 rounded-full border border-orange-200"
                    >
                      {pairing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium py-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2">
                  {language === "pt" ? "Experimentar Esta Delícia" : "Try This Delicacy"}
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
                <button className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-4 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2">
                  {language === "pt" ? "Encontrar Restaurantes" : "Find Restaurants"}
                  <MapPinIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default PortugueseFoodCulture;