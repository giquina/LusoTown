'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  UsersIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'

export default function CulturalToursBookingPage() {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  const [selectedTour, setSelectedTour] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [groupSize, setGroupSize] = useState('2')

  const tours = [
    {
      id: 'portuguese-heritage',
      name: 'Portuguese Heritage Trail',
      namePortuguese: 'Trilho do Património Português',
      duration: '3 hours',
      durationPortuguese: '3 horas',
      price: 45,
      maxGroup: 12,
      description: 'Discover hidden Portuguese sites across Central London',
      descriptionPortuguese: 'Descubra locais portugueses escondidos em Central London'
    },
    {
      id: 'fado-culture',
      name: 'Fado & Portuguese Culture',
      namePortuguese: 'Fado e Cultura Portuguesa',
      duration: '4 hours',
      durationPortuguese: '4 horas',
      price: 65,
      maxGroup: 8,
      description: 'Cultural immersion with Fado music and Portuguese traditions',
      descriptionPortuguese: 'Imersão cultural com música Fado e tradições portuguesas'
    },
    {
      id: 'food-wine',
      name: 'Portuguese Food & Wine Tour',
      namePortuguese: 'Tour de Comida e Vinho Português',
      duration: '5 hours',
      durationPortuguese: '5 horas',
      price: 85,
      maxGroup: 10,
      description: 'Culinary journey through Portuguese restaurants and markets',
      descriptionPortuguese: 'Jornada culinária por restaurantes e mercados portugueses'
    }
  ]

  const handleBooking = () => {
    // Redirect to confirmation
    window.location.href = '/services/cultural-tours/confirmation'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              {isPortuguese ? 'Voltar aos Serviços' : 'Back to Services'}
            </button>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Reservar Tour Cultural' : 'Book Cultural Tour'}
            </h1>
            
            <p className="text-lg text-gray-600">
              {isPortuguese
                ? 'Escolha o seu tour cultural português em Londres'
                : 'Choose your Portuguese cultural tour in London'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tour Selection */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {isPortuguese ? 'Selecionar Tour' : 'Select Tour'}
                </h2>
                <div className="space-y-4">
                  {tours.map((tour) => (
                    <label
                      key={tour.id}
                      className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedTour === tour.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="tour"
                        value={tour.id}
                        checked={selectedTour === tour.id}
                        onChange={(e) => setSelectedTour(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            {isPortuguese ? tour.namePortuguese : tour.name}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {isPortuguese ? tour.descriptionPortuguese : tour.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              {isPortuguese ? tour.durationPortuguese : tour.duration}
                            </div>
                            <div className="flex items-center">
                              <UsersIcon className="w-4 h-4 mr-1" />
                              {isPortuguese ? 'Máx.' : 'Max'} {tour.maxGroup}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-primary-600">£{tour.price}</span>
                          <span className="text-sm text-gray-500 block">
                            {isPortuguese ? 'por pessoa' : 'per person'}
                          </span>
                        </div>
                      </div>
                      {selectedTour === tour.id && (
                        <CheckCircleIcon className="w-6 h-6 text-primary-500 mt-2" />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {isPortuguese ? 'Escolher Data' : 'Choose Date'}
                </h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Group Size */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {isPortuguese ? 'Tamanho do Grupo' : 'Group Size'}
                </h2>
                <select
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((size) => (
                    <option key={size} value={size}>
                      {size} {size === 1 ? (isPortuguese ? 'pessoa' : 'person') : (isPortuguese ? 'pessoas' : 'people')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {isPortuguese ? 'Resumo da Reserva' : 'Booking Summary'}
              </h2>

              {selectedTour && (
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-medium text-gray-900">
                      {isPortuguese 
                        ? tours.find(t => t.id === selectedTour)?.namePortuguese
                        : tours.find(t => t.id === selectedTour)?.name
                      }
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {isPortuguese 
                        ? tours.find(t => t.id === selectedTour)?.durationPortuguese
                        : tours.find(t => t.id === selectedTour)?.duration
                      }
                    </p>
                  </div>

                  {selectedDate && (
                    <div className="flex items-center text-gray-700">
                      <CalendarDaysIcon className="w-5 h-5 mr-2" />
                      <span>{new Date(selectedDate).toLocaleDateString(isPortuguese ? 'pt-PT' : 'en-GB')}</span>
                    </div>
                  )}

                  <div className="flex items-center text-gray-700">
                    <UsersIcon className="w-5 h-5 mr-2" />
                    <span>
                      {groupSize} {parseInt(groupSize) === 1 
                        ? (isPortuguese ? 'pessoa' : 'person') 
                        : (isPortuguese ? 'pessoas' : 'people')
                      }
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">
                        {isPortuguese ? 'Total' : 'Total'}
                      </span>
                      <span className="text-2xl font-bold text-primary-600">
                        £{tours.find(t => t.id === selectedTour)?.price! * parseInt(groupSize)}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBooking}
                    disabled={!selectedTour || !selectedDate}
                    className="w-full bg-primary-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isPortuguese ? 'Confirmar Reserva' : 'Confirm Booking'}
                  </motion.button>
                </div>
              )}

              {!selectedTour && (
                <p className="text-gray-500 text-center py-8">
                  {isPortuguese 
                    ? 'Selecione um tour para ver o resumo'
                    : 'Select a tour to see booking summary'
                  }
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}