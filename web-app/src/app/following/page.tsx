'use client'
import Image from 'next/image'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import FollowButton from '@/components/FollowButton'
import { useFollowing, FollowableEntity } from '@/context/FollowingContext'
import { useLanguage } from '@/context/LanguageContext'
import { 
  UserGroupIcon,
  UserIcon,
  CalendarDaysIcon,
  MapPinIcon,
  BellIcon,
  BellSlashIcon,
  StarIcon,
  ClockIcon,
  HeartIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

export default function FollowingPage() {
  const { 
    following, 
    getFollowingByType, 
    getFollowingStats, 
    toggleNotifications,
    getFollowingSuggestions 
  } = useFollowing()
  const { language, t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'all' | 'people' | 'groups' | 'communities' | 'organizers'>('all')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const stats = getFollowingStats()
  const suggestions = getFollowingSuggestions()
  
  // Helper function to check if language is Portuguese
  const isPortuguese = language === 'pt'

  const getTabData = () => {
    switch (activeTab) {
      case 'people':
        return getFollowingByType('person')
      case 'groups':
        return getFollowingByType('group')
      case 'communities':
        return getFollowingByType('community')
      case 'organizers':
        return getFollowingByType('event_organizer')
      default:
        return following
    }
  }

  const getEntityIcon = (type: FollowableEntity['type']) => {
    switch (type) {
      case 'person':
        return <UserIcon className="w-5 h-5" />
      case 'group':
        return <UserGroupIcon className="w-5 h-5" />
      case 'community':
        return <UsersIcon className="w-5 h-5" />
      case 'event_organizer':
        return <CalendarDaysIcon className="w-5 h-5" />
    }
  }

  const getTypeLabel = (type: FollowableEntity['type']) => {
    const labels = {
      en: {
        person: 'Person',
        group: 'Group',
        community: 'Community',
        event_organizer: 'Event Organizer'
      },
      pt: {
        person: 'Pessoa',
        group: 'Grupo',
        community: 'Comunidade',
        event_organizer: 'Organizador'
      }
    }
    return labels[language][type]
  }

  const tabData = getTabData()

  return (
    <main className="min-h-screen bg-secondary-50">
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
{isPortuguese ? 'A Minha' : 'My'} <span className="gradient-text">{isPortuguese ? 'Rede' : 'Network'}</span>
              </h1>
              <p className="text-xl text-secondary-600 leading-relaxed mb-8">
{isPortuguese 
                  ? 'Todas as pessoas, grupos e comunidades portuguesas que segues. Mantém-te conectado com a tua rede cultural.'
                  : 'All the Portuguese people, groups, and communities you follow. Stay connected with your cultural network.'
                }
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-primary-600 mb-1">{stats.people}</div>
                  <div className="text-sm text-secondary-600 flex items-center gap-1">
                    <UserIcon className="w-4 h-4" />
{isPortuguese ? 'Pessoas' : 'People'}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-secondary-600 mb-1">{stats.groups}</div>
                  <div className="text-sm text-secondary-600 flex items-center gap-1">
                    <UserGroupIcon className="w-4 h-4" />
{isPortuguese ? 'Grupos' : 'Groups'}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-primary-600 mb-1">{stats.communities}</div>
                  <div className="text-sm text-secondary-600 flex items-center gap-1">
                    <UsersIcon className="w-4 h-4" />
{isPortuguese ? 'Comunidades' : 'Communities'}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-secondary-600 mb-1">{stats.eventOrganizers}</div>
                  <div className="text-sm text-secondary-600 flex items-center gap-1">
                    <CalendarDaysIcon className="w-4 h-4" />
{isPortuguese ? 'Organizadores' : 'Organizers'}
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'all'
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white text-secondary-700 hover:bg-secondary-50'
                  }`}
                >
{isPortuguese ? 'Todos' : 'All'} ({following.length})
                </button>
                <button
                  onClick={() => setActiveTab('people')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    activeTab === 'people'
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white text-secondary-700 hover:bg-secondary-50'
                  }`}
                >
                  <UserIcon className="w-4 h-4" />
{isPortuguese ? 'Pessoas' : 'People'} ({stats.people})
                </button>
                <button
                  onClick={() => setActiveTab('groups')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    activeTab === 'groups'
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white text-secondary-700 hover:bg-secondary-50'
                  }`}
                >
                  <UserGroupIcon className="w-4 h-4" />
{isPortuguese ? 'Grupos' : 'Groups'} ({stats.groups})
                </button>
                <button
                  onClick={() => setActiveTab('communities')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    activeTab === 'communities'
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white text-secondary-700 hover:bg-secondary-50'
                  }`}
                >
                  <UsersIcon className="w-4 h-4" />
{isPortuguese ? 'Comunidades' : 'Communities'} ({stats.communities})
                </button>
                <button
                  onClick={() => setActiveTab('organizers')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    activeTab === 'organizers'
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white text-secondary-700 hover:bg-secondary-50'
                  }`}
                >
                  <CalendarDaysIcon className="w-4 h-4" />
{isPortuguese ? 'Organizadores' : 'Organizers'} ({stats.eventOrganizers})
                </button>
              </div>

              {/* Suggestions Toggle */}
              {suggestions.length > 0 && (
                <button
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className="mb-6 text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 mx-auto"
                >
                  <StarIcon className="w-5 h-5" />
                  {showSuggestions 
? (isPortuguese ? 'Ocultar Sugestões' : 'Hide Suggestions')
                    : (isPortuguese ? 'Ver Sugestões' : 'View Suggestions')
                  }
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Suggestions Section */}
        {showSuggestions && suggestions.length > 0 && (
          <section className="py-8 bg-white border-b">
            <div className="container-width">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <StarIcon className="w-6 h-6 text-accent-500" />
{isPortuguese ? 'Sugestões para Ti' : 'Suggested for You'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suggestions.slice(0, 6).map((entity) => (
                    <motion.div
                      key={entity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          {entity.imageUrl ? (
                            <Image 
                              src={entity.imageUrl}
                              alt={entity.name}
                              width={16 * 4} height={16 * 4} className="object-cover"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-lg">
                              {entity.name.charAt(0)}
                            </div>
                          )}
                          {entity.isVerified && (
                            <CheckBadgeIcon className="absolute -top-1 -right-1 w-5 h-5 text-primary-500" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 truncate">{entity.name}</h3>
                          {entity.title && (
                            <p className="text-sm text-secondary-600 mb-1">{entity.title}</p>
                          )}
                          <p className="text-xs text-gray-500 mb-2 line-clamp-2">{entity.description}</p>
                          
                          {/* Cultural Focus Tags */}
                          {entity.culturalFocus && entity.culturalFocus.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {entity.culturalFocus.slice(0, 2).map((focus, index) => (
                                <span key={index} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                                  {focus}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500 flex items-center gap-2">
                              {entity.followers && (
                                <span className="flex items-center gap-1">
                                  <HeartIcon className="w-3 h-3" />
                                  {entity.followers}
                                </span>
                              )}
                              {entity.location && (
                                <span className="flex items-center gap-1">
                                  <MapPinIcon className="w-3 h-3" />
                                  {entity.location}
                                </span>
                              )}
                            </div>
                            <FollowButton entity={entity} variant="compact" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Following List */}
        <section className="py-12 bg-white">
          <div className="container-width">
            <div className="max-w-6xl mx-auto">
              {tabData.length === 0 ? (
                <div className="text-center py-16">
                  <UserGroupIcon className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
{isPortuguese ? 'Ainda não segues ninguém' : 'Not following anyone yet'}
                  </h3>
                  <p className="text-secondary-600 mb-6">
{isPortuguese 
                      ? 'Começa a seguir pessoas, grupos e comunidades portuguesas para te manteres conectado com a tua cultura.'
                      : 'Start following Portuguese people, groups, and communities to stay connected with your culture.'
                    }
                  </p>
                  <button 
                    onClick={() => setShowSuggestions(true)}
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 flex items-center gap-2 mx-auto"
                  >
                    <StarIcon className="w-5 h-5" />
{isPortuguese ? 'Ver Sugestões' : 'View Suggestions'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tabData.map(({ entity, followedAt, notificationsEnabled }) => (
                    <motion.div
                      key={entity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl shadow-sm border border-secondary-100 p-6 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            {entity.imageUrl ? (
                              <Image 
                                src={entity.imageUrl}
                                alt={entity.name}
                                width={12 * 4} height={12 * 4} className="object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
                                {entity.name.charAt(0)}
                              </div>
                            )}
                            {entity.isVerified && (
                              <CheckBadgeIcon className="absolute -top-1 -right-1 w-4 h-4 text-primary-500" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {getEntityIcon(entity.type)}
                              <span className="text-xs bg-secondary-100 text-secondary-600 px-2 py-1 rounded-full">
                                {getTypeLabel(entity.type)}
                              </span>
                            </div>
                            <h3 className="font-bold text-gray-900">{entity.name}</h3>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => toggleNotifications(entity.id)}
                          className={`p-2 rounded-full transition-colors ${
                            notificationsEnabled
                              ? 'text-primary-600 bg-primary-50 hover:bg-primary-100'
                              : 'text-gray-400 hover:text-secondary-600 hover:bg-secondary-50'
                          }`}
                          title={
                            notificationsEnabled 
? (isPortuguese ? 'Desativar notificações' : 'Turn off notifications')
                              : (isPortuguese ? 'Ativar notificações' : 'Turn on notifications')
                          }
                        >
                          {notificationsEnabled ? (
                            <BellIcon className="w-4 h-4" />
                          ) : (
                            <BellSlashIcon className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      
                      {entity.title && (
                        <p className="text-sm font-medium text-secondary-700 mb-2">{entity.title}</p>
                      )}
                      
                      {entity.description && (
                        <p className="text-sm text-secondary-600 mb-4 line-clamp-2">{entity.description}</p>
                      )}
                      
                      {/* Cultural Focus Tags */}
                      {entity.culturalFocus && entity.culturalFocus.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {entity.culturalFocus.slice(0, 3).map((focus, index) => (
                            <span key={index} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                              {focus}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                          {entity.followers && (
                            <span className="flex items-center gap-1">
                              <HeartIcon className="w-3 h-3" />
                              {entity.followers}
                            </span>
                          )}
                          {entity.location && (
                            <span className="flex items-center gap-1">
                              <MapPinIcon className="w-3 h-3" />
                              {entity.location}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-3 h-3" />
{isPortuguese ? 'Seguindo desde' : 'Following since'} {new Date(followedAt).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <FollowButton 
                        entity={entity} 
                        variant="default"
                        className="w-full justify-center"
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </main>
  )
}