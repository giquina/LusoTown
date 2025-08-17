"use client";

import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { 
  MapPinIcon, 
  SparklesIcon,
  ArrowRightIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  CheckCircleIcon,
  UserIcon,
  GlobeAltIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/outline";

export default function ToursPage() {
  const { language } = useLanguage();
  const isPortuguese = language === "pt";

  const tours = [
    {
      id: 1,
      title: isPortuguese ? "Portugal em Londres: Raízes Históricas" : "Portugal in London: Historic Roots",
      description: isPortuguese 
        ? "Descubra 500+ anos de presença portuguesa em Londres. De Catarina de Bragança aos bairros portugueses de hoje, incluindo Casa de Portugal, Embassy Quarter e marcos históricos onde portugueses moldaram a cidade." 
        : "Discover 500+ years of Portuguese presence in London. From Catherine of Braganza to today's Portuguese neighborhoods, including Casa de Portugal, Embassy Quarter and historic landmarks where Portuguese shaped the city.",
      duration: "3.5h",
      groupSize: "6-10",
      rating: 4.9,
      price: "£65",
      image: "/images/tours/portugal-london-heritage.jpg",
      highlights: isPortuguese ? [
        "Casa de Portugal em South Kensington",
        "Embaixada de Portugal e história diplomática",
        "St. James's Palace - Casamento real português",
        "Portuguese cultural landmarks",
        "Stockwell - Little Portugal walking tour"
      ] : [
        "Casa de Portugal in South Kensington", 
        "Portuguese Embassy and diplomatic history",
        "St. James's Palace - Portuguese royal wedding",
        "Portuguese cultural landmarks",
        "Stockwell - Little Portugal walking tour"
      ],
      guide: {
        name: "Carlos Mendoza",
        credentials: isPortuguese ? "Historiador português, 15 anos em Londres" : "Portuguese historian, 15 years in London",
        languages: "Português, English, Español"
      }
    },
    {
      id: 2,
      title: isPortuguese ? "Mercados & Sabores: Experiência Gastronómica Portuguesa" : "Markets & Flavors: Portuguese Culinary Experience", 
      description: isPortuguese 
        ? "Tour gastronómico pelos melhores locais portugueses: Borough Market com produtos portugueses, restaurantes autênticos em Vauxhall, pastelarias tradicionais e mercados onde a comunidade portuguesa compra. Inclui degustações!"
        : "Culinary tour through the best Portuguese spots: Borough Market with Portuguese products, authentic restaurants in Vauxhall, traditional pastéis shops and markets where Portuguese community shops. Includes tastings!",
      duration: "4h",
      groupSize: "8-12", 
      rating: 4.8,
      price: "£75",
      image: "/images/tours/portuguese-food-tour.jpg",
      highlights: isPortuguese ? [
        "Borough Market - produtos portugueses",
        "Casa do Bacalhau em Stockwell",
        "Pastelaria tradicional com pastéis de nata",
        "Restaurante familiar português em Vauxhall",
        "Degustação de vinhos portugueses"
      ] : [
        "Borough Market - Portuguese products",
        "Casa do Bacalhau in Stockwell", 
        "Traditional pastéis de nata bakery",
        "Family Portuguese restaurant in Vauxhall",
        "Portuguese wine tasting"
      ],
      guide: {
        name: "Maria Santos",
        credentials: isPortuguese ? "Chef portuguesa, especialista em gastronomia lusa" : "Portuguese chef, specialist in Portuguese gastronomy",
        languages: "Português, English"
      }
    },
    {
      id: 3,
      title: isPortuguese ? "Comunidade Portuguesa: Vida & Cultura em Londres" : "Portuguese Community: Life & Culture in London",
      description: isPortuguese 
        ? "Explore os verdadeiros bairros portugueses: Stockwell, Vauxhall, South Lambeth. Visite centros comunitários, igrejas portuguesas, escolas de português e espaços onde a nossa comunidade se reúne. Conheça histórias reais de emigração."
        : "Explore the real Portuguese neighborhoods: Stockwell, Vauxhall, South Lambeth. Visit community centers, Portuguese churches, Portuguese schools and spaces where our community gathers. Learn real emigration stories.",
      duration: "3h",
      groupSize: "6-8",
      rating: 4.9,
      price: "£55",
      image: "/images/tours/portuguese-community.jpg", 
      highlights: isPortuguese ? [
        "Igreja Portuguesa em South Lambeth",
        "Centro Comunitário Português",
        "Escola Portuguesa de Londres",
        "Associações culturais portuguesas",
        "Histórias de emigrantes portugueses"
      ] : [
        "Portuguese Church in South Lambeth",
        "Portuguese Community Center", 
        "Portuguese School of London",
        "Portuguese cultural associations",
        "Portuguese emigrant stories"
      ],
      guide: {
        name: "João Silva",
        credentials: isPortuguese ? "Líder comunitário, 25 anos na comunidade portuguesa" : "Community leader, 25 years in Portuguese community",
        languages: "Português, English"
      }
    },
    {
      id: 4,
      title: isPortuguese ? "Londres Real: Palácios & Conexões Portuguesas" : "Royal London: Palaces & Portuguese Connections",
      description: isPortuguese 
        ? "Tour exclusivo pelos palácios reais com foco nas conexões portuguesas: Catarina de Bragança em Whitehall, casa real portuguesa, influência no chá britânico e legado português na monarquia. Inclui acesso especial!"
        : "Exclusive tour through royal palaces focusing on Portuguese connections: Catherine of Braganza at Whitehall, Portuguese royal house, influence on British tea culture and Portuguese legacy in monarchy. Includes special access!",
      duration: "4.5h",
      groupSize: "4-6", 
      rating: 5.0,
      price: "£95",
      image: "/images/tours/royal-portuguese.jpg",
      highlights: isPortuguese ? [
        "Whitehall e Catarina de Bragança",
        "St. James's Palace - história real",
        "Portuguese Chapel Royal",
        "Braganza legacy em Windsor",
        "Acesso exclusivo a áreas privadas"
      ] : [
        "Whitehall and Catherine of Braganza",
        "St. James's Palace - royal history",
        "Portuguese Chapel Royal", 
        "Braganza legacy at Windsor",
        "Exclusive access to private areas"
      ],
      guide: {
        name: "Dr. Isabel Ferreira",
        credentials: isPortuguese ? "Historiadora real, PhD em História Anglo-Portuguesa" : "Royal historian, PhD in Anglo-Portuguese History",
        languages: "Português, English, Français"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-28 md:pt-32 pb-16 bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {isPortuguese ? "Tours de Londres" : "London Tours"}
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {isPortuguese 
                  ? "Descubra Londres com guias portugueses especializados. Experiências autênticas para a comunidade portuguesa."
                  : "Discover London with specialized Portuguese guides. Authentic experiences for the Portuguese community."
                }
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Tours Grid */}
      <section className="py-16">
        <div className="container-width">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isPortuguese ? "Tours Autênticos com Guias Portugueses" : "Authentic Tours with Portuguese Guides"}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {isPortuguese 
                  ? "Experiências únicas que revelam a verdadeira presença portuguesa em Londres, guiadas por especialistas da nossa comunidade."
                  : "Unique experiences revealing the true Portuguese presence in London, guided by specialists from our community."
                }
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {tours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Tour Header with Image Placeholder */}
                  <div className="h-64 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MapPinIcon className="w-20 h-20 text-white/90" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                        {isPortuguese ? "Tour Premium" : "Premium Tour"}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                      <StarIcon className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{tour.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    {/* Tour Title & Price */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 leading-tight pr-4">{tour.title}</h3>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary-600">{tour.price}</div>
                        <div className="text-sm text-gray-500">{isPortuguese ? "por pessoa" : "per person"}</div>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">{tour.description}</p>
                    
                    {/* Tour Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <ClockIcon className="w-5 h-5 text-primary-600" />
                        <span className="text-sm">{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <UserGroupIcon className="w-5 h-5 text-secondary-600" />
                        <span className="text-sm">{tour.groupSize} {isPortuguese ? "pessoas" : "people"}</span>
                      </div>
                    </div>
                    
                    {/* Tour Highlights */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {isPortuguese ? "Destaques do Tour:" : "Tour Highlights:"}
                      </h4>
                      <div className="space-y-2">
                        {tour.highlights.slice(0, 3).map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircleIcon className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{highlight}</span>
                          </div>
                        ))}
                        {tour.highlights.length > 3 && (
                          <div className="text-sm text-primary-600 font-medium">
                            +{tour.highlights.length - 3} {isPortuguese ? "mais locais" : "more locations"}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Guide Information */}
                    <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                          <UserIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{tour.guide.name}</div>
                          <div className="text-sm text-gray-600 mb-1">{tour.guide.credentials}</div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <GlobeAltIcon className="w-3 h-3" />
                            <span>{tour.guide.languages}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold py-3 px-6 rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 flex items-center justify-center gap-2 group-hover:scale-105">
                        {isPortuguese ? "Reservar Agora" : "Book Now"}
                        <ArrowRightIcon className="w-4 h-4" />
                      </button>
                      <button className="px-6 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-200 flex items-center gap-2">
                        <CalendarDaysIcon className="w-4 h-4" />
                        {isPortuguese ? "Ver Datas" : "View Dates"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portuguese Tour Testimonials */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-width">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isPortuguese ? "O Que Dizem os Nossos Visitantes" : "What Our Visitors Say"}
              </h2>
              <p className="text-lg text-gray-600">
                {isPortuguese 
                  ? "Experiências reais de portugueses que descobriram Londres connosco"
                  : "Real experiences from Portuguese people who discovered London with us"
                }
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  {isPortuguese 
                    ? "\"O tour da Casa de Portugal foi incrível! Descobri lugares que nem sabia que existiam em Londres. O Carlos conhece cada história.\""
                    : "\"The Casa de Portugal tour was incredible! I discovered places I didn't know existed in London. Carlos knows every story.\""
                  }
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Maria Santos</div>
                    <div className="text-sm text-gray-500">{isPortuguese ? "Porto → Londres" : "Porto → London"}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  {isPortuguese 
                    ? "\"O tour gastronómico foi perfeito! Provámos pastéis de nata autênticos e descobrimos onde a comunidade portuguesa compra.\""
                    : "\"The food tour was perfect! We tried authentic pastéis de nata and discovered where the Portuguese community shops.\""
                  }
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold">
                    J
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">João Ferreira</div>
                    <div className="text-sm text-gray-500">{isPortuguese ? "Lisboa → Londres" : "Lisbon → London"}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  {isPortuguese 
                    ? "\"Conhecer a história de Catarina de Bragança foi fascinante. Nunca imaginei que Portugal tivesse tanta influência em Londres!\""
                    : "\"Learning about Catherine of Braganza's history was fascinating. I never imagined Portugal had so much influence in London!\""
                  }
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-coral-500 rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Ana Costa</div>
                    <div className="text-sm text-gray-500">{isPortuguese ? "Coimbra → Londres" : "Coimbra → London"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container-width">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isPortuguese ? "Porquê Somos Diferentes?" : "Why We're Different?"}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {isPortuguese 
                  ? "Não somos apenas mais uma empresa de tours. Somos portugueses que vivem em Londres e queremos partilhar as nossas descobertas."
                  : "We're not just another tour company. We're Portuguese people living in London who want to share our discoveries."
                }
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <SparklesIcon className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {isPortuguese ? "Guias Autênticos" : "Authentic Guides"}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {isPortuguese 
                    ? "Historiadores, chefs e líderes comunitários portugueses com anos de experiência em Londres"
                    : "Portuguese historians, chefs and community leaders with years of London experience"
                  }
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <UserGroupIcon className="w-10 h-10 text-secondary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {isPortuguese ? "Grupos Íntimos" : "Intimate Groups"}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {isPortuguese 
                    ? "Máximo 12 pessoas por grupo para experiências personalizadas e interação genuína"
                    : "Maximum 12 people per group for personalized experiences and genuine interaction"
                  }
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPinIcon className="w-10 h-10 text-accent-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {isPortuguese ? "Locais Secretos" : "Secret Locations"}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {isPortuguese 
                    ? "Descobrimos locais que só a comunidade portuguesa conhece - restaurantes, lojas e marcos históricos"
                    : "We uncover places only the Portuguese community knows - restaurants, shops and historic landmarks"
                  }
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-coral-100 to-coral-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <GlobeAltIcon className="w-10 h-10 text-coral-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {isPortuguese ? "Conexão Cultural" : "Cultural Connection"}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {isPortuguese 
                    ? "Não apenas vemos Londres - conectamos com a nossa herança portuguesa e criamos novas amizades"
                    : "We don't just see London - we connect with our Portuguese heritage and create new friendships"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="container-width relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {isPortuguese ? "Pronto para Descobrir o Teu Londres Português?" : "Ready to Discover Your Portuguese London?"}
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {isPortuguese 
                ? "Junta-te a centenas de portugueses que já descobriram a Londres que nunca viram nos guias turísticos."
                : "Join hundreds of Portuguese people who have discovered the London they never saw in tourist guides."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-primary-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
                {isPortuguese ? "Ver Todos os Tours" : "View All Tours"}
              </button>
              <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-200">
                {isPortuguese ? "Falar Connosco" : "Contact Us"}
              </button>
            </div>
            <div className="mt-8 text-sm opacity-80">
              {isPortuguese 
                ? "💬 Tours em português | 🏛️ Locais autênticos | 👥 Comunidade portuguesa"
                : "💬 Tours in Portuguese | 🏛️ Authentic locations | 👥 Portuguese community"
              }
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}