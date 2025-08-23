"use client";

import { HeartIcon, SparklesIcon, UsersIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ROUTES } from "@/config/routes";

export default function MeetYourMatchUpsell() {
  const { language } = useLanguage();
  const isPt = language === "pt";

  return (
    <section className="relative w-full mt-10">
      <div className="bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left: Copy */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 bg-gradient-to-r from-red-50 via-amber-50 to-green-50 px-3 py-1 rounded-full border border-red-100/50 mb-3">
              <span>💞</span>
              <span>{isPt ? "Conhece o Teu Match" : "Meet Your Match"}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
              {isPt ? "Conhece pessoas que falam português" : "Match with Portuguese speakers"}
            </h3>
            <p className="text-gray-700 text-sm sm:text-base mb-5">
              {isPt
                ? "Encontra pessoas com interesses comuns e valores culturais semelhantes em todo o Reino Unido. Ligações autênticas, sem barulho."
                : "Find people who share your interests and cultural values across the United Kingdom. Authentic connections, no noise."}
            </p>

            <ul className="space-y-2 text-sm text-gray-700 mb-6">
              {[ 
                isPt ? "Correspondências ilimitadas" : "Unlimited matches",
                isPt ? "Eventos e grupos locais" : "Local events and groups",
                isPt ? "Preferências culturais e de idioma" : "Cultural and language preferences",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Plans */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="rounded-xl border border-gray-200 p-4">
                <div className="text-xs font-bold text-gray-500 mb-1">
                  {isPt ? "Membro da Comunidade" : "Community Member"}
                </div>
                <div className="text-xl font-extrabold text-gray-900">£19.99<span className="text-sm font-semibold text-gray-500">/m</span></div>
              </div>
              <div className="rounded-xl border border-gray-200 p-4">
                <div className="text-xs font-bold text-gray-500 mb-1">
                  {isPt ? "Embaixador Cultural" : "Cultural Ambassador"}
                </div>
                <div className="text-xl font-extrabold text-gray-900">£39.99<span className="text-sm font-semibold text-gray-500">/m</span></div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={ROUTES.signup}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 transition-all shadow-lg hover:shadow-xl"
              >
                {isPt ? "Começar a Socializar" : "Start Socializing"}
              </a>
              <a
                href={ROUTES.pricing || ROUTES.signup}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50"
              >
                {isPt ? "Serviços Premium" : "Premium Services"}
              </a>
            </div>
          </div>

          {/* Right: Social proof and quick join */}
          <div className="p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-secondary-50 via-action-50 to-accent-50 border-t md:border-l border-gray-100">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl bg-white p-4 border border-gray-100 shadow-sm">
                <div className="text-2xl font-extrabold text-gray-900">150+</div>
                <div className="text-xs text-gray-500">{isPt ? "Experiências Mensais" : "Monthly Experiences"}</div>
              </div>
              <div className="rounded-xl bg-white p-4 border border-gray-100 shadow-sm">
                <div className="text-2xl font-extrabold text-gray-900">25+</div>
                <div className="text-xs text-gray-500">{isPt ? "Cidades no Reino Unido" : "United Kingdom Cities"}</div>
              </div>
            </div>

            <div className="mb-4 font-semibold text-gray-700">
              {isPt ? "Entrar Rápido" : "Quick Join"}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {[
                { label: "Google", href: ROUTES.signup },
                { label: "Facebook", href: ROUTES.signup },
                { label: "Instagram", href: ROUTES.signup },
                { label: "LinkedIn", href: ROUTES.signup },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="text-center rounded-xl border border-gray-200 bg-white py-2 text-sm font-semibold hover:bg-gray-50"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <div className="text-xs text-gray-500 mb-4">{isPt ? "ou continuar com email" : "or continue with email"}</div>

            <div className="grid grid-cols-2 gap-2">
              <a href={ROUTES.events} className="rounded-xl text-center bg-white border border-gray-200 p-3 font-semibold hover:bg-gray-50">
                {isPt ? "Explorar Eventos" : "Explore Events"}
              </a>
              <a href={ROUTES.host} className="rounded-xl text-center bg-white border border-gray-200 p-3 font-semibold hover:bg-gray-50">
                {isPt ? "Serviços Premium" : "Premium Services"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
