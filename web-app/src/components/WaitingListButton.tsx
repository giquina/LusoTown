'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClockIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';

interface WaitingListButtonProps {
  serviceId: string;
  serviceName: string;
  serviceNamePortuguese: string;
  estimatedAvailability?: string;
  estimatedAvailabilityPortuguese?: string;
  className?: string;
}

export default function WaitingListButton({
  serviceId,
  serviceName,
  serviceNamePortuguese,
  estimatedAvailability,
  estimatedAvailabilityPortuguese,
  className = ''
}: WaitingListButtonProps) {
  const { language } = useLanguage();
  const isPortuguese = language === 'pt';
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleJoinWaitingList = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsJoined(true);
    setIsLoading(false);
    setShowModal(true);
    
    // Auto close modal after 3 seconds
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  if (isJoined) {
    return (
      <>
        <div className={`flex items-center justify-center gap-2 bg-secondary-100 text-secondary-800 py-3 px-4 rounded-lg font-medium min-h-[44px] shadow-xl ${className}`}>
          <CheckCircleIcon className="w-4 h-4" />
          <span className="text-sm">
            {isPortuguese ? 'Na Lista de Espera' : 'On Waiting List'}
          </span>
        </div>
        
        {/* Success Modal */}
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="w-8 h-8 text-secondary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {isPortuguese ? 'Adicionado à Lista de Espera!' : 'Added to Waiting List!'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {isPortuguese 
                    ? `Você foi adicionado à lista de espera para ${serviceNamePortuguese}. Notificaremos você quando houver disponibilidade.`
                    : `You've been added to the waiting list for ${serviceName}. We'll notify you when availability opens up.`
                  }
                </p>
                {estimatedAvailability && (
                  <p className="text-sm text-gray-500 mb-4">
                    {isPortuguese ? 'Estimativa: ' : 'Estimated: '}
                    {isPortuguese ? estimatedAvailabilityPortuguese : estimatedAvailability}
                  </p>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-4 rounded-lg font-medium hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 min-h-[44px] shadow-xl hover:shadow-2xl"
                >
                  {isPortuguese ? 'Entendido' : 'Got it'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </>
    );
  }

  return (
    <button
      onClick={handleJoinWaitingList}
      disabled={isLoading}
      className={`bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] shadow-xl hover:shadow-2xl ${className}`}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <ClockIcon className="w-4 h-4" />
      )}
      <span className="text-sm">
        {isLoading 
          ? (isPortuguese ? 'Juntando...' : 'Joining...')
          : (isPortuguese ? 'Entrar na Lista de Espera' : 'Join Waiting List')
        }
      </span>
    </button>
  );
}