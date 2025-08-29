'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { UserCircleIcon, CameraIcon } from '@heroicons/react/24/outline'

const ProfileEditor: React.FC = () => {
  const { t, language } = useLanguage()
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    interests: [] as string[]
  })

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const interests = [
    { id: 'culture', label: language === 'pt' ? 'Cultura' : 'Culture' },
    { id: 'music', label: language === 'pt' ? 'Música' : 'Music' },
    { id: 'food', label: language === 'pt' ? 'Gastronomia' : 'Food' },
    { id: 'sports', label: language === 'pt' ? 'Desportos' : 'Sports' },
    { id: 'business', label: language === 'pt' ? 'Negócios' : 'Business' },
    { id: 'education', label: language === 'pt' ? 'Educação' : 'Education' }
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'pt' ? 'Editar Perfil' : 'Edit Profile'}
          </h1>
          <p className="text-gray-600">
            {language === 'pt' 
              ? 'Atualize suas informações pessoais e preferências'
              : 'Update your personal information and preferences'
            }
          </p>
        </div>

        {/* Profile Picture */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <UserCircleIcon className="w-12 h-12 text-gray-400" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
              <CameraIcon className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'pt' ? 'Nome' : 'Name'}
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={language === 'pt' ? 'Seu nome completo' : 'Your full name'}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="seu@email.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'pt' ? 'Telefone' : 'Phone'}
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+44..."
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'pt' ? 'Localização' : 'Location'}
            </label>
            <select
              value={profile.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{language === 'pt' ? 'Selecione...' : 'Select...'}</option>
              <option value="london">London</option>
              <option value="manchester">Manchester</option>
              <option value="birmingham">Birmingham</option>
              <option value="liverpool">Liverpool</option>
            </select>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'pt' ? 'Biografia' : 'Bio'}
          </label>
          <textarea
            value={profile.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={language === 'pt' 
              ? 'Conte um pouco sobre você...'
              : 'Tell us a bit about yourself...'
            }
          />
        </div>

        {/* Interests */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            {language === 'pt' ? 'Interesses' : 'Interests'}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {interests.map((interest) => (
              <label key={interest.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={profile.interests.includes(interest.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setProfile(prev => ({
                        ...prev,
                        interests: [...prev.interests, interest.id]
                      }))
                    } else {
                      setProfile(prev => ({
                        ...prev,
                        interests: prev.interests.filter(i => i !== interest.id)
                      }))
                    }
                  }}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">{interest.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 mt-8">
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            {language === 'pt' ? 'Cancelar' : 'Cancel'}
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors">
            {language === 'pt' ? 'Salvar Alterações' : 'Save Changes'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default ProfileEditor
