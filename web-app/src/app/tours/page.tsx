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
  StarIcon
} from "@heroicons/react/24/outline";

export default function ToursPage() {
  const { language } = useLanguage();
  const isPortuguese = language === "pt";

  const tours = [
    {
      id: 1,
      title: isPortuguese ? "Tour Histórico de Londres" : "Historic London Tour",
      description: isPortuguese 
        ? "Descubra a rica história de Londres com guias portugueses especializados" 
        : "Discover London's rich history with specialized Portuguese guides",
      duration: "3h",
      groupSize: "8-12",
      rating: 4.9,
      price: "£45",
      image: "/images/tours/historic-london.jpg"
    },
    {
      id: 2,
      title: isPortuguese ? "Camden Market & Cultura" : "Camden Market & Culture",
      description: isPortuguese 
        ? "Explore os mercados vibrantes e a cultura alternativa de Londres" 
        : "Explore London's vibrant markets and alternative culture",
      duration: "2.5h",
      groupSize: "6-10",
      rating: 4.8,
      price: "£35",
      image: "/images/tours/camden-market.jpg"
    },
    {
      id: 3,
      title: isPortuguese ? "Thames & Pontes" : "Thames & Bridges",
      description: isPortuguese 
        ? "Uma jornada ao longo do Tamisa explorando as pontes icónicas" 
        : "A journey along the Thames exploring iconic bridges",
      duration: "2h",
      groupSize: "10-15",
      rating: 4.7,
      price: "£30",
      image: "/images/tours/thames-bridges.jpg"
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

      {/* Tours Grid */}
      <section className="py-16">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPinIcon className="w-16 h-16 text-primary-600" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{tour.rating}</span>
                    </div>
                    <span className="text-2xl font-bold text-primary-600">{tour.price}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tour.title}</h3>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UserGroupIcon className="w-4 h-4" />
                      <span>{tour.groupSize}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold py-3 px-6 rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 flex items-center justify-center gap-2">
                    {isPortuguese ? "Reservar Tour" : "Book Tour"}
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {isPortuguese ? "Porquê Escolher-nos?" : "Why Choose Us?"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SparklesIcon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {isPortuguese ? "Guias Portugueses" : "Portuguese Guides"}
                </h3>
                <p className="text-gray-600">
                  {isPortuguese 
                    ? "Tours conduzidos por guias fluentes em português com conhecimento profundo da cultura"
                    : "Tours led by Portuguese-fluent guides with deep cultural knowledge"
                  }
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="w-8 h-8 text-secondary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {isPortuguese ? "Grupos Pequenos" : "Small Groups"}
                </h3>
                <p className="text-gray-600">
                  {isPortuguese 
                    ? "Experiências íntimas com grupos pequenos para melhor interação"
                    : "Intimate experiences with small groups for better interaction"
                  }
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPinIcon className="w-8 h-8 text-accent-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {isPortuguese ? "Locais Únicos" : "Unique Locations"}
                </h3>
                <p className="text-gray-600">
                  {isPortuguese 
                    ? "Descobrimos locais especiais que só os locais conhecem"
                    : "We discover special places that only locals know"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}