"use client";

import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { IMAGES } from "@/config/cdn";
import { motion } from "framer-motion";
import { 
  MapPinIcon, 
  SparklesIcon,
  ArrowRightIcon,
  ClockIcon,
  UsersIcon,
  StarIcon,
  CheckCircleIcon,
  UserIcon,
  GlobeAltIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { isServiceAvailable, getServiceStatus, getAvailabilityStyles, getAvailabilityLabel } from "@/lib/serviceAvailability";

export default function ToursPage() {
  const { language } = useLanguage();
  const isPortuguese = language === "pt";

  const tours = [
    {
      id: 1,
      title: isPortuguese ? "Londres Clássico: Os Marcos Icónicos" : "Classic London: The Iconic Landmarks",
      serviceKey: "london_tours", // Available service
      description: isPortuguese 
        ? "Descubra os pontos turísticos mais famosos de Londres com guias portugueses experientes. Big Ben, Tower Bridge, Buckingham Palace, Westminster Abbey e muito mais. Uma introdução perfeita à capital britânica com explicações em português." 
        : "Discover London's most famous tourist attractions with experienced Portuguese guides. Big Ben, Tower Bridge, Buckingham Palace, Westminster Abbey and much more. A perfect introduction to the British capital with explanations in Portuguese.",
      duration: "3.5h",
      groupSize: "8-12",
      rating: 4.9,
      price: "£45",
      image: "/images/tours/classic-london.jpg",
      highlights: isPortuguese ? [
        "Big Ben e Houses of Parliament",
        "Tower Bridge e Tower of London",
        "Buckingham Palace e Changing of the Guard",
        "Westminster Abbey",
        "Trafalgar Square e Covent Garden"
      ] : [
        "Big Ben and Houses of Parliament", 
        "Tower Bridge and Tower of London",
        "Buckingham Palace and Changing of the Guard",
        "Westminster Abbey",
        "Trafalgar Square and Covent Garden"
      ],
      guide: {
        name: "Carlos Mendoza",
        credentials: isPortuguese ? "Guia turístico licenciado, 15 anos de experiência" : "Licensed tour guide, 15 years experience",
        languages: "Português, English, Español"
      }
    },
    {
      id: 2,
      title: isPortuguese ? "Mercados & Sabores de Londres" : "London Markets & Flavors",
      serviceKey: "custom_tours", // Unavailable service 
      description: isPortuguese 
        ? "Explore os mercados mais famosos de Londres: Borough Market, Camden Market, Covent Garden Market. Prove comidas locais, descubra produtos únicos e experiencie a cultura gastronómica londrina com guias que falam português."
        : "Explore London's most famous markets: Borough Market, Camden Market, Covent Garden Market. Try local foods, discover unique products and experience London's food culture with Portuguese-speaking guides.",
      duration: "3h",
      groupSize: "10-14", 
      rating: 4.8,
      price: "£55",
      image: "/images/tours/london-markets.jpg",
      highlights: isPortuguese ? [
        "Borough Market - mercado gastronómico",
        "Camden Market - cultura alternativa",
        "Covent Garden - entretenimento de rua",
        "Degustação de comidas locais",
        "Compras em mercados autênticos"
      ] : [
        "Borough Market - food market",
        "Camden Market - alternative culture", 
        "Covent Garden - street entertainment",
        "Local food tastings",
        "Shopping at authentic markets"
      ],
      guide: {
        name: "Maria Santos",
        credentials: isPortuguese ? "Especialista em gastronomia londrina" : "London food specialist",
        languages: "Português, English"
      }
    },
    {
      id: 3,
      title: isPortuguese ? "Museus & Cultura de Londres" : "London Museums & Culture",
      serviceKey: "portuguese_cultural_tours", // Unavailable service
      description: isPortuguese 
        ? "Visite os museus mais famosos do mundo: British Museum, Tate Modern, National Gallery, Victoria & Albert Museum. Descubra tesouros históricos e arte mundial com explicações detalhadas em português."
        : "Visit the world's most famous museums: British Museum, Tate Modern, National Gallery, Victoria & Albert Museum. Discover historical treasures and world art with detailed explanations in Portuguese.",
      duration: "4h",
      groupSize: "6-10",
      rating: 4.9,
      price: "£65",
      image: "/images/tours/london-museums.jpg", 
      highlights: isPortuguese ? [
        "British Museum - antiguidades mundiais",
        "National Gallery - obras-primas da arte",
        "Tate Modern - arte contemporânea",
        "Victoria & Albert Museum",
        "South Bank cultural walk"
      ] : [
        "British Museum - world antiquities",
        "National Gallery - art masterpieces", 
        "Tate Modern - contemporary art",
        "Victoria & Albert Museum",
        "South Bank cultural walk"
      ],
      guide: {
        name: "Dr. Ana Ferreira",
        credentials: isPortuguese ? "Historiadora de arte, guia de museus certificada" : "Art historian, certified museum guide",
        languages: "Português, English, Français"
      }
    },
    {
      id: 4,
      title: isPortuguese ? "Palácios Reais de Londres" : "Royal Palaces of London",
      serviceKey: "london_tours", // Available service
      description: isPortuguese 
        ? "Tour exclusivo pelos palácios reais mais famosos: Buckingham Palace, Kensington Palace, Hampton Court Palace. Descubra a história da monarquia britânica, jardins reais e tradições centenárias com acesso preferencial."
        : "Exclusive tour of the most famous royal palaces: Buckingham Palace, Kensington Palace, Hampton Court Palace. Discover British monarchy history, royal gardens and centuries-old traditions with priority access.",
      duration: "4.5h",
      groupSize: "6-8", 
      rating: 5.0,
      price: "£85",
      image: "/images/tours/royal-palaces.jpg",
      highlights: isPortuguese ? [
        "Buckingham Palace State Rooms",
        "Kensington Palace e jardins",
        "Hampton Court Palace",
        "Torre de Londres e Joias da Coroa",
        "Cerimónia da Guarda Real"
      ] : [
        "Buckingham Palace State Rooms",
        "Kensington Palace and gardens",
        "Hampton Court Palace", 
        "Tower of London and Crown Jewels",
        "Changing of the Royal Guard"
      ],
      guide: {
        name: "João Silva",
        credentials: isPortuguese ? "Especialista em história real britânica" : "British royal history specialist",
        languages: "Português, English"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url('${IMAGES.backgrounds.londonSkylineHeritage}')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 via-transparent to-secondary-900/10"></div>
        <div className="relative container-width py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-primary-100 via-secondary-50 to-accent-100 border border-primary-200 shadow-lg">
                <SparklesIcon className="w-4 h-4 mr-2 text-secondary-600" />
                <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent font-bold">
                  {isPortuguese
                    ? "Tours Autênticos em Londres"
                    : "Authentic London Tours"}
                </span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight"
            >
              {/* Desktop full title */}
              <span className="hidden sm:block">
                {isPortuguese ? (
                  <>
                    Descubra Londres com
                    <br />
                    <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                      guias portugueses
                    </span>{" "}
                    experientes
                  </>
                ) : (
                  <>
                    Discover London with
                    <br />
                    <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                      experienced Portuguese
                    </span>{" "}
                    guides
                  </>
                )}
              </span>
              {/* Mobile short title */}
              <span className="sm:hidden">
                {isPortuguese ? (
                  <>
                    Tours de
                    <br />
                    <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                      Londres
                    </span>
                  </>
                ) : (
                  <>
                    London
                    <br />
                    <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                      Tours
                    </span>
                  </>
                )}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              {/* Desktop full subtitle */}
              <span className="hidden sm:block">
                {isPortuguese
                  ? "Explore os marcos icónicos de Londres com guias portugueses qualificados. Experiências culturais autênticas, storytelling em português e descoberta dos segredos da capital britânica através dos olhos da comunidade de falantes de português."
                  : "Explore London's iconic landmarks with qualified Portuguese guides. Authentic cultural experiences, Portuguese storytelling, and discover British capital secrets through the eyes of the Portuguese-speaking community."}
              </span>
              {/* Mobile short subtitle */}
              <span className="sm:hidden">
                {isPortuguese
                  ? "Explore Londres com guias portugueses qualificados! Experiências culturais autênticas e storytelling em português."
                  : "Explore London with qualified Portuguese guides! Authentic cultural experiences and Portuguese storytelling."}
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>
                  {isPortuguese
                    ? "Guias Portugueses Experientes"
                    : "Experienced Portuguese Guides"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                <span>
                  {isPortuguese
                    ? "Marcos Históricos Icónicos"
                    : "Iconic Historic Landmarks"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                <span>
                  {isPortuguese
                    ? "Storytelling em Português"
                    : "Portuguese Storytelling"}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
              >
                {isPortuguese ? "Ver Tours" : "View Tours"}
              </button>
              <button
                onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isPortuguese ? "Testemunhos" : "Testimonials"}
              </button>
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
                  ? "Explore os marcos mais famosos de Londres com guias portugueses qualificados que explicam tudo na nossa língua."
                  : "Explore London's most famous landmarks with qualified Portuguese guides who explain everything in our language."
                }
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {tours.map((tour, index) => {
                const serviceStatus = getServiceStatus(tour.serviceKey);
                const available = isServiceAvailable(tour.serviceKey);
                const availabilityStyles = serviceStatus ? getAvailabilityStyles(serviceStatus.status) : null;
                const availabilityLabel = serviceStatus ? getAvailabilityLabel(serviceStatus.status, isPortuguese) : null;
                
                return (
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
                      {available ? (
                        <span className={`${availabilityStyles?.bg} ${availabilityStyles?.text} px-3 py-1.5 rounded-full text-sm font-bold shadow-lg border ${availabilityStyles?.border}`}>
                          <div className="flex items-center space-x-1.5">
                            <CheckCircleIcon className="w-3 h-3 flex-shrink-0" />
                            <span>{availabilityLabel}</span>
                          </div>
                        </span>
                      ) : (
                        <span className={`${availabilityStyles?.bg} ${availabilityStyles?.text} px-3 py-1.5 rounded-full text-sm font-bold shadow-lg border ${availabilityStyles?.border}`}>
                          <div className="flex items-center space-x-1.5">
                            <ExclamationTriangleIcon className="w-3 h-3 flex-shrink-0" />
                            <span>{availabilityLabel}</span>
                          </div>
                        </span>
                      )}
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
                        <UsersIcon className="w-5 h-5 text-secondary-600" />
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
                    <div className="space-y-3">
                      {available ? (
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
                      ) : (
                        <div className="space-y-2">
                          <button 
                            className="w-full bg-gray-400 text-white py-3 px-6 rounded-xl font-bold cursor-not-allowed opacity-60"
                            disabled
                          >
                            {serviceStatus?.status === 'fully_booked' 
                              ? (isPortuguese ? 'Esgotado' : 'Fully Booked')
                              : (isPortuguese ? 'Indisponível' : 'Unavailable')
                            }
                          </button>
                          {serviceStatus?.waitingListAvailable && (
                            <button
                              onClick={() => {
                                console.log(`Join waiting list for tour ${tour.serviceKey}`);
                              }}
                              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2.5 px-6 rounded-xl font-bold transition-all duration-300"
                            >
                              {isPortuguese ? 'Entrar na Lista de Espera' : 'Join Waiting List'}
                            </button>
                          )}
                          {serviceStatus?.estimatedAvailability && (
                            <p className="text-xs text-gray-600 text-center">
                              {isPortuguese ? 'Estimativa: ' : 'Estimated: '}
                              {isPortuguese ? serviceStatus.estimatedAvailabilityPortuguese : serviceStatus.estimatedAvailability}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Portuguese Tour Testimonials */}
      <section id="testimonials" className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
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
                    ? "\"O tour clássico de Londres foi fantástico! Ver Big Ben, Tower Bridge e Buckingham Palace com explicações em português fez toda a diferença. O Carlos é um guia excelente!\""
                    : "\"The classic London tour was fantastic! Seeing Big Ben, Tower Bridge and Buckingham Palace with explanations in Portuguese made all the difference. Carlos is an excellent guide!\""
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
                    ? "\"O tour dos mercados foi incrível! Borough Market e Camden Market com um guia português que explica tudo na nossa língua. Experimentámos comidas deliciosas!\""
                    : "\"The markets tour was incredible! Borough Market and Camden Market with a Portuguese guide who explains everything in our language. We tried delicious foods!\""
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
                    ? "\"Os museus de Londres são impressionantes! British Museum e National Gallery com explicações detalhadas em português. A Ana conhece tudo sobre arte e história!\""
                    : "\"London's museums are impressive! British Museum and National Gallery with detailed explanations in Portuguese. Ana knows everything about art and history!\""
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
                  <UsersIcon className="w-10 h-10 text-secondary-600" />
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
                    ? "Descobrimos locais que só a comunidade de falantes de português conhece - restaurantes, lojas e marcos históricos"
                    : "We uncover places only the Portuguese-speaking community knows - restaurants, shops and historic landmarks"
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
              {isPortuguese ? "Pronto para Descobrir Londres?" : "Ready to Discover London?"}
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {isPortuguese 
                ? "Junta-te a centenas de portugueses que já exploraram os marcos mais famosos de Londres com os nossos guias especializados."
                : "Join hundreds of Portuguese people who have already explored London's most famous landmarks with our specialized guides."
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
                ? "💬 Tours em português | 🏛️ Marcos famosos | 👥 Guias especializados"
                : "💬 Tours in Portuguese | 🏛️ Famous landmarks | 👥 Specialized guides"
              }
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}