"use client";

import { useEffect, useMemo, useState } from "react";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { EventsToursService, EventTour } from "@/lib/events-tours";
import EventToursCard from "@/components/EventToursCard";
import { motion } from "framer-motion";
import { 
  MapPinIcon, 
  SparklesIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon
} from "@heroicons/react/24/outline";

export default function LondonToursPage() {
  const { language } = useLanguage();
  const isPortuguese = language === "pt";
  const [tours, setTours] = useState<EventTour[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const data = EventsToursService.getEventsTours({
      category: "Cultural Tours",
    });
    setTours(data);
  }, []);

  const filteredTours = useMemo(() => {
    let data = [...tours];
    if (category) {
      data = data.filter((t) => t.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.location.toLowerCase().includes(q)
      );
    }
    return data;
  }, [tours, category, search]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-16 bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-secondary-200/40 via-accent-100/30 to-coral-100/30 rounded-full opacity-60 animate-pulse" />
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-tr from-action-200/40 via-secondary-100/30 to-accent-100/30 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '8s' }} />
          <div className="absolute top-1/4 left-1/6 w-6 h-6 bg-secondary-300/50 rounded-full opacity-40" />
          <div className="absolute top-3/4 right-1/5 w-4 h-4 bg-accent-300/50 rounded-full opacity-30" />
          <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-coral-300/50 rounded-full opacity-35" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-50/80 via-accent-50/60 to-coral-50/60 border border-secondary-200/40 rounded-3xl px-8 py-4 shadow-2xl mb-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-red-500 animate-pulse shadow-sm"></div>
                <span className="text-lg font-bold bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                  {isPortuguese ? "Tours & Transporte Privado" : "Tours & Private Transport"}
                </span>
              </div>
              <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight"
            >
              {isPortuguese ? "London Tours" : "London Tours"}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-6 font-medium max-w-4xl mx-auto leading-relaxed"
            >
              {isPortuguese
                ? "Descubra os destinos turísticos mais populares de Londres com a comunidade de falantes de português — tours culturais, marcos icónicos e experiências autênticas."
                : "Discover London's most popular tourist destinations with the Portuguese-speaking community — cultural tours, iconic landmarks, and authentic experiences."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-500 via-primary-500 to-accent-500 text-white rounded-2xl px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <MapPinIcon className="h-6 w-6" />
              <span className="font-bold text-lg">
                {isPortuguese 
                  ? "Experiências autênticas com falantes de português" 
                  : "Authentic experiences with Portuguese speakers"
                }
              </span>
              <SparklesIcon className="h-6 w-6" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header with Search and Filters */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
                >
                  {isPortuguese ? "Descubra Tours & Experiências" : "Discover Tours & Experiences"}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-lg text-gray-600 max-w-3xl mx-auto"
                >
                  {isPortuguese 
                    ? "Explore Londres com guias que falam português e grupos autênticos da comunidade lusófona."
                    : "Explore London with Portuguese-speaking guides and authentic lusophone community groups."
                  }
                </motion.p>
              </div>

              {/* Search and Filter Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 mb-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Search */}
                  <div className="lg:col-span-2">
                    <div className="relative">
                      <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={
                          isPortuguese 
                            ? "Procurar por tours, destinos, experiências..." 
                            : "Search for tours, destinations, experiences..."
                        }
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                      />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <div className="relative">
                      <AdjustmentsHorizontalIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base appearance-none bg-white"
                      >
                        <option value="">{isPortuguese ? "Todas as Categorias" : "All Categories"}</option>
                        <option value="Cultural Tours">{isPortuguese ? "Tours Culturais" : "Cultural Tours"}</option>
                        <option value="Business & Professional">{isPortuguese ? "Negócios & Profissional" : "Business & Professional"}</option>
                        <option value="Professional Networking">{isPortuguese ? "Networking Profissional" : "Professional Networking"}</option>
                        <option value="Technology & Smart Systems">{isPortuguese ? "Tecnologia & Sistemas Inteligentes" : "Technology & Smart Systems"}</option>
                        <option value="Finance & Investment">{isPortuguese ? "Finanças & Investimento" : "Finance & Investment"}</option>
                        <option value="Social Experiences">{isPortuguese ? "Experiências Sociais" : "Social Experiences"}</option>
                        <option value="Arts & Entertainment">{isPortuguese ? "Arte & Entretenimento" : "Arts & Entertainment"}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {filteredTours.length === 0 ? (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <SparklesIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {isPortuguese ? "Nenhum tour encontrado" : "No tours found"}
                    </h3>
                    <p className="text-gray-600">
                      {isPortuguese
                        ? "Tente ajustar os filtros ou procurar por algo diferente."
                        : "Try adjusting your filters or searching for something different."}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Results Count */}
                  <div className="mb-8">
                    <p className="text-gray-600 text-lg">
                      {isPortuguese 
                        ? `${filteredTours.length} tour${filteredTours.length !== 1 ? 's' : ''} encontrado${filteredTours.length !== 1 ? 's' : ''}`
                        : `${filteredTours.length} tour${filteredTours.length !== 1 ? 's' : ''} found`
                      }
                    </p>
                  </div>

                  {/* Tours Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTours.map((tour, index) => (
                      <motion.div
                        key={tour.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * (index % 6) }}
                      >
                        <EventToursCard event={tour} />
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
