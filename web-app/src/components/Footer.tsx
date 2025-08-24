"use client";

import {
  HeartIcon,
  MapPinIcon,
  EnvelopeIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  SparklesIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  StarIcon,
  CheckBadgeIcon,
  TrophyIcon,
  FireIcon,
  HandRaisedIcon
} from "@heroicons/react/24/outline";
import { Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Logo from "@/components/Logo";
import { ROUTES } from '@/config/routes';
import { socialMedia } from '@/config/contact';
import { communityStats } from '@/config/community';
import { CULTURAL_CENTERS } from '@/config/cultural-centers';
import { useState, useEffect } from "react";

// Footer navigation structure
const getFooterLinks = (t: any) => ({
  community: [
    { name: t("footer.nav.events", "Events"), href: ROUTES.events },
    { name: t("footer.nav.business", "Business Directory"), href: ROUTES.directory },
    { name: t("footer.nav.students", "Students"), href: ROUTES.students },
    { name: t("footer.nav.palop_heritage", "PALOP Heritage"), href: "/palop-heritage" },
    { name: t("footer.nav.success_stories", "Success Stories"), href: "/success-stories" }
  ],
  services: [
    { name: t("footer.nav.transport", "Transport"), href: ROUTES.transport },
    { name: t("footer.nav.tours", "Cultural Tours"), href: ROUTES.tours },
    { name: t("footer.nav.premium", "Premium"), href: ROUTES.premium },
    { name: t("footer.nav.partnerships", "University Partnerships"), href: "/partnerships" }
  ],
  support: [
    { name: t("footer.nav.contact", "Contact"), href: ROUTES.contact },
    { name: t("footer.nav.help", "Help Center"), href: "/help" },
    { name: t("footer.nav.privacy", "Privacy"), href: "/privacy" },
    { name: t("footer.nav.terms", "Terms"), href: "/terms" }
  ]
});

// Build a safe, render-ready social links array from config object
const getSocialLinks = () => {
  const links = [
    { name: 'Instagram', url: socialMedia?.instagram, icon: Instagram },
    { name: 'Facebook', url: socialMedia?.facebook, icon: Facebook },
    { name: 'Twitter', url: socialMedia?.twitter, icon: Twitter },
    { name: 'LinkedIn', url: socialMedia?.linkedin, icon: Linkedin },
    { name: 'YouTube', url: socialMedia?.youtube, icon: Youtube },
  ];
  return links.filter((l) => typeof l.url === "string" && l.url.length > 0);
};

// Dynamic community activity
const getCommunityPulse = (t: any) => ({
  weekHighlights: {
    events: t("footer.pulse.events-count"),
    connections: t("footer.pulse.connections-count"),
    partnerships: t("footer.pulse.partnerships-count"),
  },
  upcomingEvents: [
    {
      name: t("footer.pulse.upcoming.event-1"),
      date: t("footer.pulse.upcoming.date-1"),
      location: "Vauxhall"
    },
    {
      name: t("footer.pulse.upcoming.event-2"),
      date: t("footer.pulse.upcoming.date-2"),
      location: "Canary Wharf"
    },
    {
      name: t("footer.pulse.upcoming.event-3"),
      date: t("footer.pulse.upcoming.date-3"),
      location: "King's Cross"
    }
  ]
});

// Cultural phrases rotation
const getCulturalPhrase = (language: string) => {
  const phrases = {
    en: [
      { phrase: "Unidos pela Língua", meaning: "United by Language", context: "LusoTown's mission across all Portuguese-speaking nations" },
      { phrase: "PALOP Unity", meaning: "African Portuguese Strength", context: "Angola, Cape Verde, Guinea-Bissau, Mozambique, São Tomé united in London" },
      { phrase: "Saudade", meaning: "Deep longing", context: "The Portuguese feeling that connects our hearts" },
      { phrase: "Fado do Coração", meaning: "Song of the Heart", context: "Music that touches Portuguese souls worldwide" },
      { phrase: "Morna Soul", meaning: "Cape Verdean Blues", context: "The heartfelt music that defines Cape Verdean culture" },
      { phrase: "Nossa Família", meaning: "Our Family", context: "How we see our community from Portugal to Brazil to Cape Verde" },
    ],
    pt: [
      { phrase: "Unidos pela Língua", meaning: "Missão da LusoTown", context: "Nossa missão através de todas as nações lusófonas" },
      { phrase: "Unidade PALOP", meaning: "Força Africana Portuguesa", context: "Angola, Cabo Verde, Guiné-Bissau, Moçambique, São Tomé unidos em Londres" },
      { phrase: "Saudade", meaning: "Sentimento profundo", context: "O sentimento português que conecta nossos corações" },
      { phrase: "Fado do Coração", meaning: "Música da alma", context: "Música que toca as almas portuguesas pelo mundo" },
      { phrase: "Nossa Família", meaning: "Nossa Comunidade", context: "Como vemos nossa comunidade de Portugal ao Brasil a Cabo Verde" },
    ]
  };
  
  const currentPhrases = phrases[language as keyof typeof phrases] || phrases.en;
  const randomIndex = Math.floor(Math.random() * currentPhrases.length);
  return currentPhrases[randomIndex];
};

// Quick access links by user type
const getQuickAccess = (t: any) => ({
  newUsers: [
    { name: t("footer.quickaccess.getting-started"), href: ROUTES.howItWorks, icon: HandRaisedIcon },
    { name: t("footer.quickaccess.community-tour"), href: ROUTES.community, icon: GlobeAltIcon },
    { name: t("footer.quickaccess.first-event"), href: ROUTES.events, icon: CalendarDaysIcon },
  ],
  activeMembers: [
    { name: t("footer.quickaccess.dashboard"), href: ROUTES.dashboard || "/dashboard", icon: TrophyIcon },
    { name: t("footer.quickaccess.my-events"), href: `${ROUTES.events}?filter=my-events`, icon: CalendarDaysIcon },
    { name: t("footer.quickaccess.messages"), href: ROUTES.forums, icon: ChatBubbleLeftRightIcon },
    { name: t("footer.quickaccess.connections"), href: ROUTES.community, icon: UserGroupIcon },
  ],
  businessOwners: [
    { name: t("footer.quickaccess.list-business"), href: ROUTES.directory, icon: SparklesIcon },
    { name: t("footer.quickaccess.host-events"), href: ROUTES.host, icon: CalendarDaysIcon },
    { name: t("footer.quickaccess.business-network"), href: ROUTES.businessNetworking, icon: UserGroupIcon },
  ]
});

// Member testimonials rotation
const getMemberSpotlight = (language: string) => {
  const testimonials = {
    en: [
      {
        name: "Maria Santos",
        location: "Lisbon → London",
        quote: "LusoTown helped me find my Portuguese family in London. Now I never feel alone!",
        role: "Software Engineer"
      },
      {
        name: "João Silva",
        location: "São Paulo → Manchester",
        quote: "From business connections to weekend fado nights - this community has everything.",
        role: "Investment Banker"
      },
      {
        name: "Ana Costa",
        location: "Porto → Edinburgh",
        quote: "The cultural events make me feel at home. Unidos pela língua, unidos pelo coração!",
        role: "University Student"
      },
      {
        name: "Carlos Mendes",
        location: "Luanda → Birmingham",
        quote: "Amazing network for Portuguese speakers. Found my business partner here!",
        role: "Entrepreneur"
      }
    ],
    pt: [
      {
        name: "Maria Santos",
        location: "Lisboa → Londres",
        quote: "A LusoTown ajudou-me a encontrar a minha família portuguesa em Londres. Agora nunca me sinto sozinha!",
        role: "Engenheira de Software"
      },
      {
        name: "João Silva",
        location: "São Paulo → Manchester",
        quote: "De conexões de negócios a noites de fado - esta comunidade tem tudo.",
        role: "Banqueiro de Investimento"
      },
      {
        name: "Ana Costa",
        location: "Porto → Edimburgo",
        quote: "Os eventos culturais fazem-me sentir em casa. Unidos pela língua, unidos pelo coração!",
        role: "Estudante Universitária"
      },
      {
        name: "Carlos Mendes",
        location: "Luanda → Birmingham",
        quote: "Rede incrível para lusófonos. Encontrei aqui o meu sócio de negócios!",
        role: "Empresário"
      }
    ]
  };
  
  const currentTestimonials = testimonials[language as keyof typeof testimonials] || testimonials.en;
  const randomIndex = Math.floor(Math.random() * currentTestimonials.length);
  return currentTestimonials[randomIndex];
};

export default function Footer() {
  const { t } = useLanguage();
  const footerLinks = getFooterLinks(t);
  // Social links derived from config

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-primary-900 text-white relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-400/30 to-transparent"></div>
      
      {/* Main Footer Content */}
      <div className="relative container-width py-12 sm:py-16">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          
          {/* Premium Brand Column */}
          <div className="md:col-span-2 lg:col-span-1 space-y-6">
            <Logo size="medium" className="text-white" />
            <p className="text-gray-300 leading-relaxed break-words">
              {t("footer.description", "The UK's premier Portuguese-speaking community platform, celebrating cultures from Portugal 🇵🇹 Brazil 🇧🇷 and all PALOP countries 🇦🇴🇨🇻🇬🇼🇲🇿🇸🇹")}
            </p>
            
            {/* PALOP Pride Recognition */}
            <div className="bg-gradient-to-r from-green-800/30 to-red-800/30 border border-green-700/30 rounded-lg p-3 mt-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <HeartIcon className="w-4 h-4 text-red-400" />
                  <span className="text-white font-semibold text-sm">
                    {t('palop.community.recognition', 'PALOP Recognition - Seen, Celebrated, Empowered')}
                  </span>
                </div>
                <div className="text-base">🇦🇴🇨🇻🇬🇼🇲🇿🇸🇹</div>
                <p className="text-gray-300 text-xs mt-1">
                  {t('palop.description', 'From PALOP Countries to UK Success Stories - celebrating 50+ years of independence')}
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300 min-w-0">
                <div className="p-2 bg-primary-600/20 rounded-lg backdrop-blur-sm border border-primary-500/30">
                  <MapPinIcon className="h-4 w-4 text-primary-400" />
                </div>
                <span className="text-sm break-all">London, United Kingdom</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-300 min-w-0">
                <div className="p-2 bg-primary-600/20 rounded-lg backdrop-blur-sm border border-primary-500/30">
                  <EnvelopeIcon className="h-4 w-4 text-primary-400" />
                </div>
                <span className="text-sm break-all">hello@lusotown.com</span>
              </div>
            </div>
          </div>

          {/* Footer Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-white font-semibold text-lg">
                {t(`footer.${category}`)}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm break-words"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-white">
              {t("footer.newsletter.title")}
            </h3>
            <p className="text-gray-300 mb-6">
              {t("footer.newsletter.description")}
            </p>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent min-w-0 min-h-[44px]"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap min-h-[44px]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-width py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm break-words leading-relaxed">
              © {new Date().getFullYear()} LusoTown United Kingdom. All rights reserved.{" "}
              {t("footer.tagline")}
            </p>

            <div className="flex items-center gap-6">
              {/* Social Media */}
              <div className="flex items-center gap-4">
                {getSocialLinks().map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                    >
                      <span className="sr-only">{social.name}</span>
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <HeartIcon className="h-4 w-4 text-action-400" />
                <span>{t("footer.bottom")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}