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
  HandRaisedIcon,
  StarIcon as CrownIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon
} from "@heroicons/react/24/outline";
import { Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Logo from "@/components/Logo";
import { ROUTES } from '@/config/routes';
import { socialMedia } from '@/config/contact';
import { communityStats } from '@/config/community';
import { useMobileRedirect } from '@/components/MobileRedirectProvider';
import { Download, Smartphone } from "lucide-react";

// Membership-focused footer navigation structure
const getFooterLinks = (t: any) => ({
  community: [
    { name: "Apply for Membership", href: ROUTES.apply, featured: true },
    { name: "Cultural Events", href: ROUTES.events },
    { name: "PALOP Heritage", href: "/palop-heritage" },
    { name: "Business Directory", href: ROUTES.directory },
    { name: "Success Stories", href: "/success-stories" }
  ],
  membership: [
    { name: "Membership Tiers", href: ROUTES.premiumMembership, featured: true },
    { name: "Exclusive Events", href: `${ROUTES.events}?filter=members-only` },
    { name: "Premium Services", href: "/premium-services" },
    { name: "Member Benefits", href: "/member-benefits" },
    { name: "Executive Network", href: "/executive-network" }
  ],
  services: [
    { name: "Cultural Tours", href: ROUTES.tours },
    { name: "Private Events", href: "/private-events" },
    { name: "Venue Access", href: "/venue-access" },
    { name: "Concierge", href: "/concierge" },
    { name: "Partner Benefits", href: "/partner-benefits" }
  ],
  support: [
    { name: "Member Portal", href: "/member-portal" },
    { name: "Help Center", href: "/help" },
    { name: "Contact", href: ROUTES.contact },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" }
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

// Section headers mapping
const getSectionHeaders = (t: any) => ({
  community: "Community",
  membership: "Membership", 
  services: "Services",
  support: "Support"
});

export default function Footer() {
  const { t, language } = useLanguage();
  const footerLinks = getFooterLinks(t);
  const sectionHeaders = getSectionHeaders(t);
  const { deviceInfo, triggerAppDownload } = useMobileRedirect();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-primary-900 text-white relative overflow-hidden">
      {/* Premium background effects - compressed */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-400/30 to-transparent"></div>
      
      {/* Main Footer Content - 40% compressed spacing */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          
          {/* Premium Brand Column - Compressed */}
          <div className="md:col-span-4 lg:col-span-1 space-y-4">
            <Logo size="medium" className="text-white" />
            <p className="text-gray-300 leading-relaxed text-sm">
              {language === 'pt' 
                ? "Plataforma premium para membros verificados: portugueses ou falantes de português no Reino Unido."
                : "Premium community for verified Portuguese and Lusophone‑speaking members in the UK."
              }
            </p>
            
            {/* PALOP Pride Recognition - Compressed */}
            <div className="bg-gradient-to-r from-green-800/20 to-red-800/20 border border-green-700/20 rounded-lg p-2">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <HeartIcon className="w-3 h-3 text-red-400" />
                  <span className="text-white font-medium text-xs">
                    PALOP Heritage Celebrated
                  </span>
                </div>
                <div className="text-sm">🇦🇴🇨🇻🇬🇼🇲🇿🇸🇹</div>
                <p className="text-gray-300 text-xs">
                  Elite network for African Lusophone success
                </p>
              </div>
            </div>

            {/* Contact Information - Compressed */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-300 min-w-0">
                <div className="p-1 bg-primary-600/20 rounded backdrop-blur-sm border border-primary-500/30">
                  <MapPinIcon className="h-3 w-3 text-primary-400" />
                </div>
                <span className="text-xs">London, United Kingdom</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-300 min-w-0">
                <div className="p-1 bg-primary-600/20 rounded backdrop-blur-sm border border-primary-500/30">
                  <EnvelopeIcon className="h-3 w-3 text-primary-400" />
                </div>
                <span className="text-xs">members@lusotown.com</span>
              </div>
            </div>
          </div>

          {/* Footer Links Columns - 4 Column Layout */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-white font-bold text-sm uppercase tracking-wide">
                {sectionHeaders[category as keyof typeof sectionHeaders]}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => {
                  const isFeatured = (link as any).featured === true;
                  return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`transition-colors duration-200 text-xs ${
                        isFeatured 
                          ? "text-amber-400 hover:text-amber-300 font-semibold" 
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {isFeatured && <StarIcon className="w-3 h-3 inline mr-1" />}
                      {link.name}
                    </a>
                  </li>
                )})}
              </ul>
            </div>
          ))}
        </div>

        {/* Membership CTA - Single Line Horizontal */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-base font-bold text-white mb-1">
                {language === 'pt' 
                  ? "Junte-se aos 750+ Membros de Elite"
                  : "Join 750+ Elite Members"}
              </h3>
              <p className="text-gray-300 text-sm">
                {language === 'pt'
                  ? "Acesso exclusivo, eventos premium, rede de contactos de elite."
                  : "Exclusive access, premium events, elite networking."}
              </p>
            </div>
            
            {/* Single-line Membership Application */}
            <div className="flex items-center gap-3">
              <a
                href={ROUTES.apply}
                className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm whitespace-nowrap"
              >
                <CrownIcon className="w-4 h-4 mr-2" />
                {language === 'pt' ? "Candidatar-se" : "Apply for Membership"}
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </a>
              
              <a
                href={ROUTES.events}
                className="inline-flex items-center border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium px-4 py-3 rounded-xl transition-all duration-300 text-sm whitespace-nowrap"
              >
                {language === 'pt' ? "Ver Eventos" : "View Events"}
              </a>
            </div>
          </div>
        </div>

        {/* Mobile App Download Section - Only show for mobile users */}
        {(deviceInfo?.isMobile || deviceInfo?.isTablet) && (
          <div className="mt-6 pt-4 border-t border-gray-800">
            <div className="bg-gradient-to-r from-primary-900/40 to-secondary-900/40 border border-primary-700/30 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm mb-1">
                    {t('mobile.footer.app_title', 'Get the LusoTown App')}
                  </h3>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    {t('mobile.footer.app_description', 'Enhanced mobile experience for the Portuguese-speaking community with offline access and push notifications.')}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <motion.button
                    onClick={() => triggerAppDownload()}
                    className="bg-white text-primary-600 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4" />
                    <span>{t('mobile.footer.download', 'Download')}</span>
                  </motion.button>
                </div>
              </div>
              
              {/* App Features Preview */}
              <div className="mt-3 pt-3 border-t border-gray-700/50">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="text-xs">
                    <div className="text-primary-400 font-medium">📱</div>
                    <div className="text-gray-400 mt-1">
                      {t('mobile.footer.feature_offline', 'Offline Access')}
                    </div>
                  </div>
                  <div className="text-xs">
                    <div className="text-secondary-400 font-medium">🔔</div>
                    <div className="text-gray-400 mt-1">
                      {t('mobile.footer.feature_notifications', 'Event Alerts')}
                    </div>
                  </div>
                  <div className="text-xs">
                    <div className="text-accent-400 font-medium">🎭</div>
                    <div className="text-gray-400 mt-1">
                      {t('mobile.footer.feature_cultural', 'Cultural Content')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Membership Tiers Preview - Compressed */}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <div className="grid grid-cols-3 gap-4">
            {/* Community Tier */}
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3 text-center">
              <UserGroupIcon className="w-5 h-5 text-blue-400 mx-auto mb-1" />
              <div className="text-blue-400 font-bold text-xs">COMMUNITY</div>
              <div className="text-gray-300 text-xs">£19.99/month</div>
              <div className="text-gray-400 text-xs mt-1">Cultural Events</div>
            </div>

            {/* Ambassador Tier */}
            <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3 text-center">
              <ShieldCheckIcon className="w-5 h-5 text-purple-400 mx-auto mb-1" />
              <div className="text-purple-400 font-bold text-xs">AMBASSADOR</div>
              <div className="text-gray-300 text-xs">£39.99/month</div>
              <div className="text-gray-400 text-xs mt-1">Premium Access</div>
            </div>

            {/* Executive Tier */}
            <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3 text-center">
              <BuildingOfficeIcon className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <div className="text-amber-400 font-bold text-xs">EXECUTIVE</div>
              <div className="text-gray-300 text-xs">£79.99/month</div>
              <div className="text-gray-400 text-xs mt-1">Elite Network</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer - Compressed */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-6">
              {/* Social Media */}
              <div className="flex items-center gap-3">
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
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>

              {/* Membership Status */}
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <CheckBadgeIcon className="h-4 w-4 text-green-400" />
                <span>750+ verified Portuguese/Lusophone‑speaking members</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-gray-400 text-xs">
                © {new Date().getFullYear()} LusoTown UK • Exclusive Lusophone Community
              </p>
              
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <HeartIcon className="h-3 w-3 text-action-400" />
                <span>
                  {language === 'pt' 
                    ? "Feito com orgulho lusófono"
                    : "Made with Lusophone pride"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}