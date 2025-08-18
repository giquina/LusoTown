'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, DocumentDuplicateIcon, EyeIcon, Cog6ToothIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { Crown, Users, Briefcase, GraduationCap, Music, Camera, Globe, MapPin, Clock, Settings } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import toast from 'react-hot-toast'

interface GoLiveModalProps {
  isOpen: boolean
  onClose: () => void
  onStartStream: (streamData: StreamData) => void
}

interface StreamData {
  title: string
  description: string
  category: string
  region: 'portugal' | 'brazil' | 'africa' | 'diaspora'
  language: 'pt' | 'en'
  isPremium: boolean
  tags: string[]
  thumbnail?: string
}

interface Category {
  id: string
  name: string
  description: string
  icon: any
  isPremium: boolean
  color: string
}

export default function GoLiveModal({ isOpen, onClose, onStartStream }: GoLiveModalProps) {
  const { language, t } = useLanguage()
  const { hasActiveSubscription, canAccessLivestream } = useSubscription()
  const [step, setStep] = useState(1) // 1: Basic Info, 2: Settings, 3: Stream Key
  const [streamData, setStreamData] = useState<StreamData>({
    title: '',
    description: '',
    category: 'community-events',
    region: 'diaspora',
    language: 'pt',
    isPremium: false,
    tags: []
  })
  const [streamKey, setStreamKey] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [tagInput, setTagInput] = useState('')

  // Portuguese-focused categories
  const categories: Category[] = [
    {
      id: 'community-events',
      name: t('streaming.community-events', 'Community Events'),
      description: language === 'pt' ? 'Eventos e encontros da comunidade portuguesa' : 'Portuguese community events and meetups',
      icon: Users,
      isPremium: false,
      color: 'primary'
    },
    {
      id: 'portuguese-culture',
      name: t('streaming.cultural-content', 'Cultural Content'),
      description: language === 'pt' ? 'Música, arte e tradições portuguesas' : 'Portuguese music, art, and traditions',
      icon: Music,
      isPremium: false,
      color: 'secondary'
    },
    {
      id: 'student-sessions',
      name: t('streaming.student-sessions', 'Student Sessions'),
      description: language === 'pt' ? 'Apoio e networking para estudantes portugueses' : 'Support and networking for Portuguese students',
      icon: GraduationCap,
      isPremium: false,
      color: 'accent'
    },
    {
      id: 'business-workshops',
      name: t('streaming.business-workshops', 'Business Workshops'),
      description: language === 'pt' ? 'Workshops e formações para negócios' : 'Business workshops and training sessions',
      icon: Briefcase,
      isPremium: true,
      color: 'premium'
    },
    {
      id: 'vip-business',
      name: t('streaming.vip-exclusive', 'VIP Exclusive'),
      description: language === 'pt' ? 'Mesas redondas e eventos VIP' : 'VIP roundtables and exclusive events',
      icon: Crown,
      isPremium: true,
      color: 'premium'
    },
    {
      id: 'behind-scenes',
      name: t('streaming.behind-scenes', 'Behind the Scenes'),
      description: language === 'pt' ? 'Bastidores da comunidade e negócios' : 'Behind the scenes of community and business',
      icon: Camera,
      isPremium: true,
      color: 'coral'
    }
  ]

  const regions = [
    { id: 'diaspora', name: t('streaming.region-diaspora', 'Diaspora'), flag: '🌐', description: language === 'pt' ? 'Comunidade global portuguesa' : 'Global Portuguese community' },
    { id: 'portugal', name: t('streaming.region-portugal', 'Portugal'), flag: '🇵🇹', description: language === 'pt' ? 'Conteúdo direto de Portugal' : 'Content from Portugal' },
    { id: 'brazil', name: t('streaming.region-brazil', 'Brazil'), flag: '🇧🇷', description: language === 'pt' ? 'Conteúdo do Brasil' : 'Content from Brazil' },
    { id: 'africa', name: t('streaming.region-africa', 'Africa'), flag: '🌍', description: language === 'pt' ? 'Países africanos lusófonos' : 'Portuguese-speaking Africa' }
  ]

  useEffect(() => {
    if (isOpen) {
      // Generate stream key when modal opens
      setStreamKey(`luso-${Math.random().toString(36).substring(2, 15)}`)
      setStep(1)
    }
  }, [isOpen])

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!streamData.tags.includes(tagInput.trim()) && streamData.tags.length < 5) {
        setStreamData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }))
      }
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setStreamData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const copyStreamKey = () => {
    navigator.clipboard.writeText(streamKey)
    toast.success(
      language === 'pt' 
        ? 'Chave copiada para área de transferência!' 
        : 'Stream key copied to clipboard!'
    )
  }

  const canCreatePremiumStream = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return !category?.isPremium || hasActiveSubscription
  }

  const handleStartStream = async () => {
    if (!canAccessLivestream()) {
      toast.error(
        language === 'pt' 
          ? 'Precisa de uma subscrição para transmitir ao vivo' 
          : 'You need a subscription to live stream'
      )
      return
    }

    setIsCreating(true)
    
    try {
      // Simulate API call to create stream
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      onStartStream(streamData)
      toast.success(
        language === 'pt' 
          ? 'Transmissão iniciada com sucesso!' 
          : 'Stream started successfully!'
      )
      onClose()
    } catch (error) {
      toast.error(
        language === 'pt' 
          ? 'Erro ao iniciar transmissão' 
          : 'Failed to start stream'
      )
    } finally {
      setIsCreating(false)
    }
  }

  const selectedCategory = categories.find(cat => cat.id === streamData.category)
  const selectedRegion = regions.find(reg => reg.id === streamData.region)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4 sm:mx-0"
            onClick={e => e.stopPropagation()}
          >
            {/* Header - Mobile Optimized */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {t('streaming.go-live', 'Go Live')} 🎥
                </h2>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  {language === 'pt' ? 'Partilhe com a comunidade 🇵🇹' : 'Share with Portuguese community 🇵🇹'}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors touch-manipulation"
              >
                <XMarkIcon className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Steps Indicator */}
            <div className="flex items-center justify-center p-4 bg-gray-50 border-b">
              <div className="flex items-center gap-4">
                {[1, 2, 3].map((stepNum) => (
                  <div key={stepNum} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      stepNum <= step 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {stepNum < step ? (
                        <CheckCircleIcon className="w-5 h-5" />
                      ) : (
                        stepNum
                      )}
                    </div>
                    <span className={`text-sm ${
                      stepNum <= step ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {stepNum === 1 && (language === 'pt' ? 'Informações' : 'Details')}
                      {stepNum === 2 && (language === 'pt' ? 'Configurações' : 'Settings')}
                      {stepNum === 3 && (language === 'pt' ? 'Transmitir' : 'Stream')}
                    </span>
                    {stepNum < 3 && <div className="w-8 h-px bg-gray-300" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6">
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('streaming.stream-title', 'Stream Title')}
                    </label>
                    <input
                      type="text"
                      value={streamData.title}
                      onChange={(e) => setStreamData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder={language === 'pt' ? 'Ex: Fado ao vivo de Lisboa' : 'e.g., Live Fado from Lisbon'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      maxLength={100}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {streamData.title.length}/100
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('streaming.stream-description', 'Stream Description')}
                    </label>
                    <textarea
                      value={streamData.description}
                      onChange={(e) => setStreamData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder={language === 'pt' ? 'Descreva o que vai partilhar...' : 'Describe what you\'ll be sharing...'}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      maxLength={500}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {streamData.description.length}/500
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {t('streaming.category', 'Category')}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {categories.map((category) => {
                        const IconComponent = category.icon
                        const canSelect = canCreatePremiumStream(category.id)
                        
                        return (
                          <button
                            key={category.id}
                            onClick={() => canSelect && setStreamData(prev => ({ ...prev, category: category.id }))}
                            disabled={!canSelect}
                            className={`p-3 rounded-lg border-2 text-left transition-all ${
                              streamData.category === category.id
                                ? 'border-primary-500 bg-primary-50'
                                : canSelect
                                ? 'border-gray-200 hover:border-gray-300'
                                : 'border-gray-200 opacity-50 cursor-not-allowed'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${
                                streamData.category === category.id ? 'bg-primary-500' : 'bg-gray-100'
                              }`}>
                                <IconComponent className={`w-4 h-4 ${
                                  streamData.category === category.id ? 'text-white' : 'text-gray-600'
                                }`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900 text-sm">
                                    {category.name}
                                  </span>
                                  {category.isPremium && (
                                    <Crown className="w-3 h-3 text-premium-500" />
                                  )}
                                </div>
                                <p className="text-xs text-gray-600 mt-1">
                                  {category.description}
                                </p>
                                {category.isPremium && !hasActiveSubscription && (
                                  <p className="text-xs text-premium-600 mt-1">
                                    {language === 'pt' ? 'Premium necessário' : 'Premium required'}
                                  </p>
                                )}
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'pt' ? 'Tags (máx. 5)' : 'Tags (max. 5)'}
                    </label>
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder={language === 'pt' ? 'Adicione tags e pressione Enter' : 'Add tags and press Enter'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      disabled={streamData.tags.length >= 5}
                    />
                    {streamData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {streamData.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                          >
                            #{tag}
                            <button
                              onClick={() => handleRemoveTag(tag)}
                              className="hover:text-primary-900"
                            >
                              <XMarkIcon className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Settings */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* Region */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {language === 'pt' ? 'Região/Origem' : 'Region/Origin'}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {regions.map((region) => (
                        <button
                          key={region.id}
                          onClick={() => setStreamData(prev => ({ ...prev, region: region.id as any }))}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            streamData.region === region.id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{region.flag}</span>
                            <div>
                              <div className="font-medium text-gray-900">{region.name}</div>
                              <p className="text-xs text-gray-600">{region.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {language === 'pt' ? 'Idioma da Transmissão' : 'Stream Language'}
                    </label>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setStreamData(prev => ({ ...prev, language: 'pt' }))}
                        className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                          streamData.language === 'pt'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <span className="text-xl mb-2 block">🇵🇹</span>
                          <span className="font-medium">Português</span>
                        </div>
                      </button>
                      <button
                        onClick={() => setStreamData(prev => ({ ...prev, language: 'en' }))}
                        className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                          streamData.language === 'en'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <span className="text-xl mb-2 block">🇬🇧</span>
                          <span className="font-medium">English</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Premium Toggle */}
                  {hasActiveSubscription && selectedCategory?.isPremium && (
                    <div>
                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                        <input
                          type="checkbox"
                          checked={streamData.isPremium}
                          onChange={(e) => setStreamData(prev => ({ ...prev, isPremium: e.target.checked }))}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Crown className="w-4 h-4 text-premium-500" />
                            <span className="font-medium text-gray-900">
                              {language === 'pt' ? 'Transmissão Premium' : 'Premium Stream'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {language === 'pt' 
                              ? 'Apenas membros premium podem assistir'
                              : 'Only premium members can watch'
                            }
                          </p>
                        </div>
                      </label>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Stream Key */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="bg-primary-100 p-4 rounded-full mx-auto w-fit mb-4">
                      <Settings className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {language === 'pt' ? 'Configure o seu OBS' : 'Set up your OBS'}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'pt' 
                        ? 'Use estas configurações no seu software de streaming'
                        : 'Use these settings in your streaming software'
                      }
                    </p>
                  </div>

                  {/* Stream Settings */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Server URL
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value="rtmp://stream.lusotown.com/live"
                          readOnly
                          className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                        />
                        <button
                          onClick={() => navigator.clipboard.writeText('rtmp://stream.lusotown.com/live')}
                          className="p-2 text-gray-500 hover:text-gray-700"
                        >
                          <DocumentDuplicateIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('streaming.stream-key', 'Stream Key')}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={streamKey}
                          readOnly
                          className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-mono"
                        />
                        <button
                          onClick={copyStreamKey}
                          className="p-2 text-gray-500 hover:text-gray-700"
                          title={t('streaming.copy-stream-key', 'Copy Stream Key')}
                        >
                          <DocumentDuplicateIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Stream Summary */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">
                      {language === 'pt' ? 'Resumo da Transmissão' : 'Stream Summary'}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{language === 'pt' ? 'Título:' : 'Title:'}</span>
                        <span className="font-medium">{streamData.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{language === 'pt' ? 'Categoria:' : 'Category:'}</span>
                        <span className="font-medium">{selectedCategory?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{language === 'pt' ? 'Região:' : 'Region:'}</span>
                        <span className="font-medium">{selectedRegion?.flag} {selectedRegion?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{language === 'pt' ? 'Idioma:' : 'Language:'}</span>
                        <span className="font-medium">{streamData.language === 'pt' ? 'Português' : 'English'}</span>
                      </div>
                      {streamData.isPremium && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language === 'pt' ? 'Tipo:' : 'Type:'}</span>
                          <span className="font-medium text-premium-600 flex items-center gap-1">
                            <Crown className="w-3 h-3" />
                            Premium
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {language === 'pt' ? 'Anterior' : 'Previous'}
                  </button>
                )}
                
                {step < 3 && (
                  <button
                    onClick={() => setStep(step + 1)}
                    disabled={step === 1 && (!streamData.title || !streamData.description)}
                    className="ml-auto px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {language === 'pt' ? 'Próximo' : 'Next'}
                  </button>
                )}

                {step === 3 && (
                  <button
                    onClick={handleStartStream}
                    disabled={isCreating}
                    className="ml-auto px-6 py-2 bg-action-600 text-white rounded-lg hover:bg-action-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isCreating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {language === 'pt' ? 'Iniciando...' : 'Starting...'}
                      </>
                    ) : (
                      <>
                        <EyeIcon className="w-4 h-4" />
                        {t('streaming.start-stream', 'Start Stream')}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}