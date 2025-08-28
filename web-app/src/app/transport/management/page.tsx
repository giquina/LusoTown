'use client';

import { useLanguage } from '@/context/LanguageContext';
import { TransportManagement } from '@/components/transport';
import Footer from '@/components/Footer';

export default function TransportManagementPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO and Page Metadata */}
      <head>
        <title>
          {language === 'pt' 
            ? 'Gestão de Transporte - LusoTown'
            : 'Transport Management - LusoTown'
          }
        </title>
        <meta 
          name="description" 
          content={
            language === 'pt'
              ? 'Gerir os seus pedidos de transporte da comunidade portuguesa. Visualizar, acompanhar e coordenar todas as suas viagens com a comunidade.'
              : 'Manage your Portuguese community transport requests. View, track and coordinate all your trips with the community.'
          }
        />
      </head>

      {/* Main Content */}
      <main>
        <TransportManagement />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}