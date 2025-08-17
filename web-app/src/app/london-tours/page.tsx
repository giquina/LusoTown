"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { EventsToursService, EventTour } from "@/lib/events-tours";
import EventToursCard from "@/components/EventToursCard";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-10 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-width text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6"
          >
            {isPortuguese ? "London Tours" : "London Tours"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            {isPortuguese
              ? "Descubra os destinos turísticos mais populares de Londres com a comunidade portuguesa — tours culturais, marcos icónicos e experiências autênticas."
              : "Discover London’s most popular tourist destinations with the Portuguese community — cultural tours, iconic landmarks, and authentic experiences."}
          </motion.p>
        </div>
      </section>

      {/* Filters + Tours list */}
      <section id="tours" className="py-12">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Simple left filters */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 sticky top-24">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {isPortuguese ? "Pesquisar" : "Search"}
                  </label>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={
                      isPortuguese ? "Procurar tours…" : "Search tours…"
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {isPortuguese ? "Categoria" : "Category"}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <option value="">{isPortuguese ? "Todas" : "All"}</option>
                    <option value="Cultural Tours">Cultural Tours</option>
                    <option value="Business & Professional">
                      Business & Professional
                    </option>
                    <option value="Professional Networking">
                      Professional Networking
                    </option>
                    <option value="Technology & AI">Technology & AI</option>
                    <option value="Finance & Investment">
                      Finance & Investment
                    </option>
                    <option value="Social Experiences">
                      Social Experiences
                    </option>
                    <option value="Arts & Entertainment">
                      Arts & Entertainment
                    </option>
                  </select>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-3">
              {filteredTours.length === 0 ? (
                <div className="text-center text-gray-600">
                  {isPortuguese
                    ? "Sem tours disponíveis no momento."
                    : "No tours available at the moment."}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredTours.map((tour) => (
                    <EventToursCard key={tour.id} event={tour} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
