"use client";

import {
  HeartIcon,
  MapPinIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Logo from "@/components/Logo";
import { ROUTES } from '@/config/routes';
import { socialMedia } from '@/config/contact';

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

const getFooterLinks = (t: any) => ({
  community: [
    { name: "Events & Culture", href: ROUTES.events },
    { name: "Community", href: ROUTES.community },
    { name: "Become a Host", href: ROUTES.host },
    { name: "LusoTown Business Directory", href: ROUTES.directory },
    { name: t("footer.neighborhood-groups"), href: ROUTES.neighborhoodGroups },
    { name: "Mentorship Programs", href: ROUTES.mentorship },
    { name: "Community Guidelines", href: ROUTES.communityGuidelines },
  ],
  services: [
    { name: "Premium Services", href: ROUTES.services },
    { name: "Executive Transport", href: `${ROUTES.services}#executive-transport` },
    { name: "Security Services", href: `${ROUTES.services}/close-protection` },
    { name: "Transport & SIA", href: ROUTES.transport },
    { name: "Business Networking", href: ROUTES.businessNetworking },
  ],
  support: [
    { name: "How It Works", href: ROUTES.howItWorks },
    { name: "Help Center", href: ROUTES.help },
    { name: "Contact Us", href: ROUTES.contact },
    { name: "Safety & Verification", href: ROUTES.safety },
  ],
  company: [
    { name: "About LusoTown", href: ROUTES.about },
    { name: "Pricing", href: ROUTES.pricing },
    { name: "Success Stories", href: ROUTES.successStories },
    { name: "Community Chat", href: ROUTES.forums },
    { name: "Case Studies", href: ROUTES.caseStudies },
    { name: "Careers", href: ROUTES.careers },
    { name: "Streaming Income", href: ROUTES.live },
    { name: "Partnerships", href: ROUTES.partnerships },
    { name: "Corporate Partnerships", href: ROUTES.corporatePartnerships },
    {
      name: "Institutional Partnerships",
      href: ROUTES.portugueseInstitutionalPartnerships,
    },
    { name: "Instituto Camões Partnership", href: ROUTES.instituteCamoes },
  ],
  legal: [
    { name: "Community Guidelines", href: ROUTES.communityGuidelines },
    { name: "Rules", href: ROUTES.rules },
    { name: "Privacy Policy", href: ROUTES.privacy },
    { name: "Terms of Service", href: ROUTES.terms },
    { name: "Community Safety", href: ROUTES.safety },
  ],
});

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
              {t("footer.description")}
            </p>

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