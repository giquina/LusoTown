"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  HomeIcon,
  MapPinIcon,
  HeartIcon,
  UserGroupIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Housing listing interface
interface HousingListing {
  id: string;
  type: "room" | "flat" | "house" | "flatmate";
  title: string;
  description: string;
  location: string;
  price: number;
  currency: string;
  contactMethod: "phone" | "email" | "whatsapp";
  contactInfo: string;
  postedBy: string;
  postedDate: string;
  images?: string[];
  features: string[];
  available: boolean;
}

// Sample housing listings
const sampleListings: HousingListing[] = [
  {
    id: "1",
    type: "room",
    title: "Room in Portuguese Family Home",
    description:
      "Cozy room in traditional Portuguese household in Stockwell. Perfect for Portuguese speakers looking for a family environment.",
    location: "Stockwell, SW9",
    price: 650,
    currency: "GBP",
    contactMethod: "phone",
    contactInfo: "+44 7700 000001",
    postedBy: "Maria Santos",
    postedDate: "2025-01-15",
    features: [
      "Portuguese-speaking household",
      "Near Portuguese shops",
      "Shared kitchen",
      "Bills included",
    ],
    available: true,
  },
  {
    id: "2",
    type: "flatmate",
    title: "Portuguese Flatmate Wanted",
    description:
      "Looking for Portuguese-speaking flatmate to share modern 2-bedroom flat near Vauxhall Portuguese community.",
    location: "Vauxhall, SW8",
    price: 800,
    currency: "GBP",
    contactMethod: "email",
    contactInfo: "joao.silva@email.com",
    postedBy: "João Silva",
    postedDate: "2025-01-12",
    features: [
      "Portuguese-speaking flatmate preferred",
      "Near transport links",
      "Modern facilities",
      "Portuguese TV channels",
    ],
    available: true,
  },
  {
    id: "3",
    type: "flat",
    title: "Family Flat - Portuguese Area",
    description:
      "Spacious 3-bedroom flat perfect for Portuguese families. Close to Portuguese school and community center.",
    location: "Nine Elms, SW8",
    price: 2200,
    currency: "GBP",
    contactMethod: "whatsapp",
    contactInfo: "+44 7700 000003",
    postedBy: "António Costa",
    postedDate: "2025-01-10",
    features: [
      "Well-connected area",
      "Near Portuguese community center",
      "Balcony",
      "Parking space",
      "Portuguese neighbors",
    ],
    available: true,
  },
];

export default function HousingAssistancePage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"browse" | "post">("browse");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState<
    "all" | "room" | "flat" | "house" | "flatmate"
  >("all");

  const isPortuguese = language === "pt";

  const filteredListings = sampleListings.filter((listing) => {
    const matchesType = searchType === "all" || listing.type === searchType;
    const matchesLocation =
      !searchLocation ||
      listing.location.toLowerCase().includes(searchLocation.toLowerCase());
    return matchesType && matchesLocation && listing.available;
  });

  const getTypeLabel = (type: string) => {
    const labels = {
      room: isPortuguese ? "Quarto" : "Room",
      flat: isPortuguese ? "Apartamento" : "Flat",
      house: isPortuguese ? "Casa" : "House",
      flatmate: isPortuguese ? "Colega de Casa" : "Flatmate",
      all: isPortuguese ? "Todos" : "All",
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 py-16 sm:py-24">
        <div className="container-width">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <HomeIcon className="w-12 h-12 text-primary-600" />
              <span className="text-4xl">🏠</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight"
            >
              {isPortuguese ? (
                <>
                  Assistência de{" "}
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    Habitação
                  </span>
                  <br />
                  para a Comunidade Portuguesa
                </>
              ) : (
                <>
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    Housing Assistance
                  </span>
                  <br />
                  for the Portuguese Community
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              {isPortuguese
                ? "Encontre habitação com famílias e falantes de português em Londres. Mantenha-se conectado à comunidade mesmo quando se muda para novas áreas."
                : "Find housing with Portuguese-speaking families and flatmates in London. Stay connected to the community even when moving to new areas."}
            </motion.p>

            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-primary-100"
            >
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary-600">
                    750+
                  </div>
                  <div className="text-sm text-gray-600">
                    {isPortuguese
                      ? "Falantes de Português em Londres"
                      : "Portuguese Speakers in London"}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary-600">
                    9,009
                  </div>
                  <div className="text-sm text-gray-600">
                    {isPortuguese
                      ? "Em Lambeth (Maior Concentração)"
                      : "In Lambeth (Largest Hub)"}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-width">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-2xl">
              <button
                onClick={() => setActiveTab("browse")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === "browse"
                    ? "bg-white text-primary-600 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <MagnifyingGlassIcon className="w-5 h-5 inline mr-2" />
                {isPortuguese ? "Procurar Habitação" : "Browse Housing"}
              </button>
              <button
                onClick={() => setActiveTab("post")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === "post"
                    ? "bg-white text-primary-600 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <PlusIcon className="w-5 h-5 inline mr-2" />
                {isPortuguese ? "Anunciar Habitação" : "Post Housing"}
              </button>
            </div>
          </div>

          {activeTab === "browse" && (
            <div>
              {/* Search Filters */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPortuguese ? "Localização" : "Location"}
                    </label>
                    <input
                      type="text"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      placeholder={
                        isPortuguese
                          ? "Ex: Stockwell, Vauxhall..."
                          : "e.g. Stockwell, Vauxhall..."
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPortuguese ? "Tipo" : "Type"}
                    </label>
                    <select
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value as any)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="all">{getTypeLabel("all")}</option>
                      <option value="room">{getTypeLabel("room")}</option>
                      <option value="flat">{getTypeLabel("flat")}</option>
                      <option value="house">{getTypeLabel("house")}</option>
                      <option value="flatmate">
                        {getTypeLabel("flatmate")}
                      </option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all">
                      <MagnifyingGlassIcon className="w-5 h-5 inline mr-2" />
                      {isPortuguese ? "Pesquisar" : "Search"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Housing Listings */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing, index) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <span className="px-3 py-1 bg-primary-100 text-primary-800 text-xs font-semibold rounded-full">
                          {getTypeLabel(listing.type)}
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          £{listing.price}
                          <span className="text-sm text-gray-500 font-normal">
                            /month
                          </span>
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {listing.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {listing.description}
                      </p>

                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {listing.location}
                      </div>

                      <div className="space-y-2 mb-4">
                        {listing.features.slice(0, 2).map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center text-xs text-gray-600"
                          >
                            <HeartIcon className="w-3 h-3 mr-2 text-secondary-500" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-xs text-gray-500">
                          {isPortuguese ? "Por" : "By"} {listing.postedBy}
                        </div>
                        <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all">
                          {isPortuguese ? "Contactar" : "Contact"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredListings.length === 0 && (
                <div className="text-center py-12">
                  <HomeIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {isPortuguese
                      ? "Nenhuma habitação encontrada"
                      : "No housing found"}
                  </h3>
                  <p className="text-gray-600">
                    {isPortuguese
                      ? "Tente ajustar os seus critérios de pesquisa ou seja o primeiro a anunciar habitação!"
                      : "Try adjusting your search criteria or be the first to post housing!"}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "post" && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  {isPortuguese ? "Anunciar Habitação" : "Post Housing Listing"}
                </h2>

                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPortuguese ? "Tipo de Habitação" : "Housing Type"}
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option value="room">{getTypeLabel("room")}</option>
                      <option value="flat">{getTypeLabel("flat")}</option>
                      <option value="house">{getTypeLabel("house")}</option>
                      <option value="flatmate">
                        {getTypeLabel("flatmate")}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPortuguese ? "Título" : "Title"}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        isPortuguese
                          ? "Ex: Quarto em casa portuguesa em Stockwell"
                          : "e.g. Room in Portuguese household in Stockwell"
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPortuguese ? "Descrição" : "Description"}
                    </label>
                    <textarea
                      rows={4}
                      placeholder={
                        isPortuguese
                          ? "Descreva a habitação, características especiais, proximidade à comunidade portuguesa..."
                          : "Describe the housing, special features, proximity to Portuguese community..."
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isPortuguese ? "Localização" : "Location"}
                      </label>
                      <input
                        type="text"
                        placeholder={
                          isPortuguese
                            ? "Ex: Stockwell, SW9"
                            : "e.g. Stockwell, SW9"
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isPortuguese ? "Preço (£/mês)" : "Price (£/month)"}
                      </label>
                      <input
                        type="number"
                        placeholder="650"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPortuguese ? "Contacto" : "Contact Information"}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        isPortuguese
                          ? "Telefone, email ou WhatsApp"
                          : "Phone, email or WhatsApp"
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all shadow-lg hover:shadow-xl"
                  >
                    <PlusIcon className="w-5 h-5 inline mr-2" />
                    {isPortuguese ? "Publicar Anúncio" : "Post Listing"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Community Support Section */}
      <section className="bg-gradient-to-br from-gray-50 to-primary-50 py-16">
        <div className="container-width text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {isPortuguese ? "Apoio da Comunidade" : "Community Support"}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {isPortuguese
              ? "Não está sozinho nesta jornada. A comunidade portuguesa está aqui para ajudar com conselhos, apoio e conexões."
              : "You're not alone in this journey. The Portuguese community is here to help with advice, support, and connections."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <UserGroupIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isPortuguese ? "Comunidade" : "Community"}
              </h3>
              <p className="text-gray-600 text-sm">
                {isPortuguese
                  ? "Conecte-se com famílias portuguesas"
                  : "Connect with Portuguese families"}
              </p>
            </div>
            <div className="text-center">
              <HeartIcon className="w-12 h-12 text-secondary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isPortuguese ? "Apoio" : "Support"}
              </h3>
              <p className="text-gray-600 text-sm">
                {isPortuguese
                  ? "Conselhos e orientação"
                  : "Advice and guidance"}
              </p>
            </div>
            <div className="text-center">
              <MapPinIcon className="w-12 h-12 text-accent-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isPortuguese ? "Localização" : "Location"}
              </h3>
              <p className="text-gray-600 text-sm">
                {isPortuguese
                  ? "Perto da comunidade portuguesa"
                  : "Near Portuguese community"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
