"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ROUTES } from "@/config/routes";

export default function ToolsPage() {
  const { language } = useLanguage();
  const isPt = language === "pt";

  return (
    <main className="min-h-screen bg-secondary-50 pt-24 pb-16">
      <div className="container-width">
  <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 border border-primary-200 rounded-full px-4 py-2 mb-6">
            {isPt ? "Ferramentas" : "Tools"}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {isPt
              ? "Ferramentas para Criadores e Negócios"
              : "Creator and Business Tools"}
          </h1>
          <p className="text-secondary-600 mb-8">
            {isPt
              ? "Estamos a abrir a nossa suíte de ferramentas para criadores e empresas da comunidade portuguesa. Enquanto isso, podes explorar as áreas abaixo."
              : "We’re bringing our creator and business tools online for the Portuguese community. In the meantime, explore the areas below."}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href={ROUTES.streaming}
            className="block rounded-xl border p-5 bg-white hover:shadow-md transition"
          >
            <div className="text-lg font-semibold text-gray-900 mb-1">
              {isPt ? "Streaming para Criadores" : "Creator Streaming"}
            </div>
            <div className="text-secondary-600">
              {isPt ? "Ganha 85% de partilha de receitas." : "Earn 85% revenue share."}
            </div>
          </Link>
          <Link
            href={ROUTES.events}
            className="block rounded-xl border p-5 bg-white hover:shadow-md transition"
          >
            <div className="text-lg font-semibold text-gray-900 mb-1">
              {isPt ? "Eventos Empresariais" : "Business Events"}
            </div>
            <div className="text-secondary-600">
              {isPt
                ? "Workshops pagos e eventos profissionais."
                : "Paid workshops and professional events."}
            </div>
          </Link>
          <Link
            href={ROUTES.matches}
            className="block rounded-xl border p-5 bg-white hover:shadow-md transition"
          >
            <div className="text-lg font-semibold text-gray-900 mb-1">
              {isPt ? "Matching Premium" : "Premium Matching"}
            </div>
            <div className="text-secondary-600">
              {isPt ? "Subscrição mensal disponível." : "Monthly subscription available."}
            </div>
          </Link>
          <Link
            href={ROUTES.transport}
            className="block rounded-xl border p-5 bg-white hover:shadow-md transition"
          >
            <div className="text-lg font-semibold text-gray-900 mb-1">
              {isPt ? "Transporte e Motoristas SIA" : "London Transport"}
            </div>
            <div className="text-secondary-600">
              {isPt
                ? "Serviço premium com motoristas que falam português."
                : "Premium service with Portuguese-speaking drivers."}
            </div>
          </Link>
      </div>
      </div>
    </main>
  );
}
