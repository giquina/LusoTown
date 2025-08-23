"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { communityStats } from "@/config/community";
import {
  HeartIcon,
  CheckIcon,
  SparklesIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  StarIcon,
  MapPinIcon,
  CameraIcon,
  GiftIcon,
  ArrowRightIcon,
  PlayIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { getImageWithFallback } from "@/lib/profileImages";
import Footer from "@/components/Footer";

const freeFeatures = [
  {
    icon: CheckIcon,
    title: "Join Portuguese Community",
    titlePt: "Junte-se à Comunidade Portuguesa",
    subtitle: "Connect with Portuguese speakers instantly",
    subtitlePt: "Conecte-se com falantes de português instantaneamente",
  },
  {
    icon: UserGroupIcon,
    title: `${communityStats.members} Members Waiting`,
    titlePt: `${communityStats.members} Membros à Espera`,
    subtitle: "From Portugal, Brazil, Angola & beyond",
    subtitlePt: "De Portugal, Brasil, Angola e além",
  },
  {
    icon: CalendarIcon,
    title: "Free Event Access",
    titlePt: "Acesso Gratuito a Eventos",
    subtitle: "Coffee meetups, cultural events, language exchange",
    subtitlePt: "Encontros de café, eventos culturais, troca de idiomas",
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "3 Daily Matches + 10 Messages",
    titlePt: "3 Matches Diários + 10 Mensagens",
    subtitle: "Start connecting right away",
    subtitlePt: "Comece a conectar-se imediatamente",
  },
];

const upgradeFeatures = [
  {
    icon: SparklesIcon,
    title: "Unlimited Matches & Messages",
    titlePt: "Matches e Mensagens Ilimitadas",
    price: "£19.99/month",
    value: "Most Popular",
    valuePt: "Mais Popular",
  },
  {
    icon: ShieldCheckIcon,
    title: "Priority Visibility + VIP Events",
    titlePt: "Visibilidade Prioritária + Eventos VIP",
    price: "£39.99/month",
    value: "Premium",
    valuePt: "Premium",
  },
];

const testimonials = [
  {
    name: "Sofia R.",
    age: "29",
    location: "Stockwell",
    quote: "Started free, upgraded within a week. Met my Portuguese boyfriend through LusoTown!",
    quotePt: "Comecei grátis, atualizei numa semana. Conheci o meu namorado português através do LusoTown!",
    avatar: getImageWithFallback("sofia-rodrigues"),
    upgraded: true,
  },
  {
    name: "Miguel S.",
    age: "34",
    location: "Camden",
    quote: "Free tier was perfect for trying out. Now I'm Community Member - worth every penny!",
    quotePt: "O plano grátis foi perfeito para experimentar. Agora sou Membro da Comunidade - vale cada centavo!",
    avatar: getImageWithFallback("miguel-santos"),
    upgraded: true,
  },
  {
    name: "Ana M.",
    age: "27",
    location: "Vauxhall",
    quote: "Amazing free events! Upgraded for unlimited messaging after first Portuguese meetup.",
    quotePt: "Eventos gratuitos incríveis! Atualizei para mensagens ilimitadas após o primeiro encontro português.",
    avatar: getImageWithFallback("ana-martins"),
    upgraded: true,
  },
];

export default function StartFree() {
  const { language, t } = useLanguage();
  const router = useRouter();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const isPortuguese = language === "pt";

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleStartFree = () => {
    router.push("/signup?origin=start-free&highlight=free");
  };

  const handleUpgrade = (tier: string) => {
    router.push(`/signup?origin=start-free&highlight=${tier}&interests=professional,social`);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-8 sm:py-12 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
          <div className="container-width">
            <div className="max-w-7xl mx-auto">
              {/* Above the fold content */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Left: Value Prop */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="order-2 lg:order-1"
                >
                  {/* Trust Signal */}
                  <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 text-green-700 font-medium mb-6 text-sm">
                    <CheckIcon className="h-4 w-4" />
                    <span>
                      {isPortuguese ? "100% Gratuito para Começar" : "100% Free to Start"}
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    <span className="block">
                      {isPortuguese ? "Encontre a Sua" : "Find Your"}
                    </span>
                    <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent block">
                      {isPortuguese ? "Comunidade LusoTown" : "LusoTown Community"}
                    </span>
                    <span className="block text-2xl sm:text-3xl lg:text-4xl text-gray-600 mt-2">
                      {isPortuguese ? "em Londres" : "in London"}
                    </span>
                  </h1>

                  <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                    {isPortuguese
                      ? "Comece grátis hoje. Conecte-se com portugueses, junte-se a eventos culturais, e descubra a sua nova família londrina."
                      : "Start free today. Connect with Portuguese speakers, join cultural events, and discover your new London family."}
                  </p>

                  {/* Stats Bar - Mobile Optimized */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-primary-100">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-primary-600">
                        {communityStats.members}
                      </div>
                      <div className="text-xs text-gray-600">
                        {isPortuguese ? "Membros" : "Members"}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-secondary-600">4.9</div>
                      <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                        <StarIcon className="h-3 w-3 text-yellow-400" />
                        {isPortuguese ? "Avaliação" : "Rating"}
                      </div>
                    </div>
                    <div className="text-center col-span-2 sm:col-span-1">
                      <div className="text-2xl sm:text-3xl font-bold text-accent-600">Free</div>
                      <div className="text-xs text-gray-600">
                        {isPortuguese ? "Para Sempre" : "Forever"}
                      </div>
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <div className="space-y-4">
                    <button
                      onClick={handleStartFree}
                      className="btn-primary w-full sm:w-auto text-lg font-semibold px-8 py-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-3"
                    >
                      <HeartIcon className="h-6 w-6" />
                      {isPortuguese ? "Começar Grátis Agora" : "Start Free Now"}
                      <ArrowRightIcon className="h-5 w-5" />
                    </button>
                    
                    <p className="text-sm text-gray-500 text-center sm:text-left">
                      {isPortuguese 
                        ? "✅ Sem cartão de crédito • ✅ Acesso imediato • ✅ Sempre grátis" 
                        : "✅ No credit card • ✅ Instant access • ✅ Always free"}
                    </p>
                  </div>
                </motion.div>

                {/* Right: Visual + Social Proof */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="order-1 lg:order-2 relative"
                >
                  {/* Hero Image with Play Button */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={getImageWithFallback("portuguese-london-community")}
                      alt="Portuguese community in London"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                      priority
                    />
                    {/* Video Play Overlay */}
                    <div 
                      className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer hover:bg-black/40 transition-all"
                      onClick={() => setShowVideoModal(true)}
                    >
                      <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                        <PlayIcon className="h-8 w-8 text-primary-600 ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Testimonial */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute -bottom-8 -left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 border border-white/70"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={testimonials[currentTestimonial].avatar}
                          alt={testimonials[currentTestimonial].name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 italic mb-1 line-clamp-2">
                            "{isPortuguese 
                              ? testimonials[currentTestimonial].quotePt 
                              : testimonials[currentTestimonial].quote}"
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">
                              {testimonials[currentTestimonial].name} • {testimonials[currentTestimonial].location}
                            </p>
                            {testimonials[currentTestimonial].upgraded && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                {isPortuguese ? "Atualizou" : "Upgraded"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Free Features Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container-width">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? "O Que Obtém Gratuitamente" : "What You Get for Free"}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {isPortuguese 
                    ? "Tudo o que precisa para começar a sua jornada na comunidade portuguesa de Londres."
                    : "Everything you need to start your journey in London's Portuguese community."}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {freeFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="text-center p-6 rounded-xl border-2 border-green-100 bg-green-50 hover:border-green-200 transition-colors"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {isPortuguese ? feature.titlePt : feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isPortuguese ? feature.subtitlePt : feature.subtitle}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Upgrade Options - Smart Upselling */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-primary-50 to-secondary-50">
          <div className="container-width">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? "Pronto Para Mais?" : "Ready for More?"}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                  {isPortuguese 
                    ? "85% dos nossos membros gratuitos fazem upgrade dentro de 2 semanas para desbloquear todo o potencial."
                    : "85% of our free members upgrade within 2 weeks to unlock their full potential."}
                </p>
                <p className="text-sm text-primary-600 font-medium">
                  {isPortuguese ? "⚡ Oferta especial: 25% de desconto no primeiro mês" : "⚡ Special offer: 25% off your first month"}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8 mb-12">
                {upgradeFeatures.map((upgrade, index) => {
                  const IconComponent = upgrade.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-primary-100 hover:border-primary-200 transition-all hover:shadow-2xl"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-primary-600" />
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-primary-600 font-medium bg-primary-50 px-3 py-1 rounded-full">
                            {isPortuguese ? upgrade.valuePt : upgrade.value}
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {isPortuguese ? upgrade.titlePt : upgrade.title}
                      </h3>
                      
                      <div className="mb-6">
                        <div className="text-3xl font-bold text-primary-600 mb-1">
                          {upgrade.price}
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          £{Math.round(parseFloat(upgrade.price.replace('£', '').replace('/month', '')) / 0.75)}/month
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleUpgrade(index === 0 ? 'community' : 'ambassador')}
                        className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                          index === 0 
                            ? "bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl"
                            : "bg-premium-500 hover:bg-premium-600 text-white shadow-lg hover:shadow-xl"
                        }`}
                      >
                        {isPortuguese ? "Começar Teste Gratuito" : "Start Free Trial"}
                      </button>
                      
                      <p className="text-xs text-gray-500 text-center mt-3">
                        {isPortuguese ? "7 dias grátis, depois " : "7 days free, then "}{upgrade.price}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Start Free CTA */}
              <div className="text-center">
                <button
                  onClick={handleStartFree}
                  className="btn-secondary text-lg font-semibold px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-200 mb-4"
                >
                  {isPortuguese ? "Ou Continue Grátis Para Sempre" : "Or Stay Free Forever"}
                </button>
                <p className="text-sm text-gray-600">
                  {isPortuguese 
                    ? "Sem compromisso • Pode fazer upgrade a qualquer momento"
                    : "No commitment • Upgrade anytime"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container-width">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
                {isPortuguese ? "Histórias de Sucesso" : "Success Stories"}
              </h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-200"
                      />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">
                          {testimonial.name}, {testimonial.age}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPinIcon className="h-3 w-3" />
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 italic mb-4">
                      "{isPortuguese ? testimonial.quotePt : testimonial.quote}"
                    </p>
                    
                    <div className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full inline-block">
                      {isPortuguese ? "✨ Fez Upgrade" : "✨ Upgraded"}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-12 sm:py-16 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
          <div className="container-width text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                {isPortuguese 
                  ? "A Sua Comunidade Portuguesa Está à Espera" 
                  : "Your Portuguese Community is Waiting"}
              </h2>
              
              <p className="text-xl mb-8 text-primary-100">
                {isPortuguese 
                  ? "Junte-se hoje e comece a construir conexões que duram uma vida inteira."
                  : "Join today and start building connections that last a lifetime."}
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={handleStartFree}
                  className="bg-white text-primary-600 hover:bg-primary-50 font-bold text-xl px-10 py-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-1"
                >
                  {isPortuguese ? "Começar Grátis Agora" : "Start Free Now"}
                </button>
                
                <p className="text-sm text-primary-100">
                  {isPortuguese 
                    ? "Junte-se a mais de 2,000 portugueses em Londres • 100% gratuito para sempre"
                    : "Join 2,000+ Portuguese speakers in London • 100% free forever"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-4">
                {isPortuguese ? "Conheça a LusoTown" : "Meet LusoTown"}
              </h3>
              <p className="text-gray-600 mb-6">
                {isPortuguese 
                  ? "Descubra como a nossa comunidade está a transformar vidas de portugueses em Londres."
                  : "Discover how our community is transforming Portuguese lives in London."}
              </p>
              <div className="space-y-4">
                <button
                  onClick={handleStartFree}
                  className="btn-primary w-full text-lg py-3"
                >
                  {isPortuguese ? "Começar Grátis Agora" : "Start Free Now"}
                </button>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  {isPortuguese ? "Fechar" : "Close"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}