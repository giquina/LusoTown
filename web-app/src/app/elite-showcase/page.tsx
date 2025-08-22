'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  EliteHoverCard, 
  MajesticButton, 
  SophisticatedLoading, 
  EliteProgressBar 
} from '@/components/ui/EliteMicroInteractions'
import { 
  EliteErrorBoundary, 
  EliteNotification,
  useEliteNotifications 
} from '@/components/ui/EliteErrorHandling'
import { 
  ElitePerformanceMonitor,
  LazyImage,
  EliteInfiniteScroll 
} from '@/components/ui/ElitePerformance'
import { 
  EliteFeedbackSystem,
  EliteReviewSystem 
} from '@/components/ui/EliteFeedback'
import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/lib/utils'
import { 
  StarIcon,
  HeartIcon,
  SparklesIcon,
  CrownIcon,
  GemIcon
} from '@heroicons/react/24/outline'

export default function EliteShowcasePage() {
  const { language, t } = useLanguage()
  const { 
    notifications,
    showSuccess, 
    showError, 
    showWarning, 
    showInfo, 
    showCultural,
    removeNotification
  } = useEliteNotifications()

  const [progress, setProgress] = React.useState(0)
  const [showErrorDemo, setShowErrorDemo] = React.useState(false)
  const [hasNextPage, setHasNextPage] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5
        return newProgress > 100 ? 0 : newProgress
      })
    }, 500)

    return () => clearInterval(timer)
  }, [])

  const handleFeedback = (feedback: any) => {
    console.log('Elite feedback received:', feedback)
    showCultural(
      t('elite.feedback.thank_you'),
      t('elite.feedback.support_message')
    )
  }

  const handleReview = async (review: any) => {
    console.log('Elite review received:', review)
    return new Promise(resolve => setTimeout(resolve, 1000))
  }

  const fetchNextPage = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setHasNextPage(false)
    }, 2000)
  }

  const DemoErrorComponent = () => {
    if (showErrorDemo) {
      throw new Error('Elite demo error for testing sophisticated error handling')
    }
    return null
  }

  return (
    <ElitePerformanceMonitor culturalTheme={true}>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-amber-500 to-green-600 text-white">
          <div className="container mx-auto px-4 py-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 flex items-center justify-center space-x-4">
                <CrownIcon className="w-12 h-12" />
                <span>Elite UX Showcase</span>
                <GemIcon className="w-12 h-12" />
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                {language === 'pt' 
                  ? 'Experiência sofisticada para a elite da comunidade portuguesa'
                  : 'Sophisticated Experience for Portuguese Community Elite'
                }
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 space-y-12">
          {/* Sophisticated Micro-Interactions Section */}
          <section className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-amber-800 mb-4 flex items-center justify-center space-x-2">
                <SparklesIcon className="w-8 h-8" />
                <span>Sophisticated Micro-Interactions</span>
              </h2>
              <p className="text-amber-600 max-w-2xl mx-auto">
                {language === 'pt'
                  ? 'Interações refinadas que elevam a experiência do utilizador a um nível aristocrático'
                  : 'Refined interactions that elevate user experience to an aristocratic level'
                }
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Elite Hover Cards */}
              <EliteHoverCard 
                sophistication="majestic" 
                culturalPattern={true}
                goldLeafAccent={true}
              >
                <div className="text-center space-y-3">
                  <HeartIcon className="w-8 h-8 text-red-500 mx-auto" />
                  <h3 className="text-lg font-bold text-amber-800">
                    {language === 'pt' ? 'Cartão Majestoso' : 'Majestic Card'}
                  </h3>
                  <p className="text-amber-600 text-sm">
                    {language === 'pt' 
                      ? 'Experiência visual sofisticada com padrões culturais portugueses'
                      : 'Sophisticated visual experience with Portuguese cultural patterns'
                    }
                  </p>
                </div>
              </EliteHoverCard>

              <EliteHoverCard 
                sophistication="opulent" 
                culturalPattern={false}
                goldLeafAccent={true}
              >
                <div className="text-center space-y-3">
                  <StarIcon className="w-8 h-8 text-amber-500 mx-auto" />
                  <h3 className="text-lg font-bold text-gray-800">
                    {language === 'pt' ? 'Cartão Opulento' : 'Opulent Card'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'pt' 
                      ? 'Design luxuoso com animações refinadas e efeitos premium'
                      : 'Luxury design with refined animations and premium effects'
                    }
                  </p>
                </div>
              </EliteHoverCard>

              <EliteHoverCard 
                sophistication="imperial" 
                culturalPattern={true}
                goldLeafAccent={true}
              >
                <div className="text-center space-y-3">
                  <CrownIcon className="w-8 h-8 text-amber-600 mx-auto" />
                  <h3 className="text-lg font-bold text-amber-800">
                    {language === 'pt' ? 'Cartão Imperial' : 'Imperial Card'}
                  </h3>
                  <p className="text-amber-600 text-sm">
                    {language === 'pt' 
                      ? 'O mais alto nível de sofisticação com elementos culturais'
                      : 'The highest level of sophistication with cultural elements'
                    }
                  </p>
                </div>
              </EliteHoverCard>
            </div>

            {/* Majestic Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <MajesticButton
                variant="aristocratic"
                size="lg"
                luxury={true}
                culturalHeritage={true}
                hapticFeedback={true}
                onClick={() => showCultural(
                  'Aristocratic Button',
                  'Portuguese heritage interaction activated!'
                )}
              >
                <HeartIcon className="w-5 h-5 mr-2" />
                {language === 'pt' ? 'Aristocrático' : 'Aristocratic'}
              </MajesticButton>

              <MajesticButton
                variant="royal"
                size="lg"
                luxury={true}
                onClick={() => showSuccess('Royal Button', 'Premium interaction activated!')}
              >
                <CrownIcon className="w-5 h-5 mr-2" />
                {language === 'pt' ? 'Real' : 'Royal'}
              </MajesticButton>

              <MajesticButton
                variant="imperial"
                size="lg"
                luxury={true}
                culturalHeritage={true}
                onClick={() => showInfo('Imperial Button', 'Imperial luxury experience!')}
              >
                <SparklesIcon className="w-5 h-5 mr-2" />
                {language === 'pt' ? 'Imperial' : 'Imperial'}
              </MajesticButton>

              <MajesticButton
                variant="diamond"
                size="lg"
                luxury={true}
                onClick={() => showWarning('Diamond Button', 'Pristine interaction detected!')}
              >
                <GemIcon className="w-5 h-5 mr-2" />
                {language === 'pt' ? 'Diamante' : 'Diamond'}
              </MajesticButton>
            </div>

            {/* Sophisticated Loading States */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <h4 className="font-semibold text-amber-800">
                  {language === 'pt' ? 'Carregamento Refinado' : 'Refined Loading'}
                </h4>
                <SophisticatedLoading
                  size="md"
                  variant="refined"
                  culturalTheme={true}
                />
              </div>

              <div className="text-center space-y-4">
                <h4 className="font-semibold text-amber-800">
                  {language === 'pt' ? 'Carregamento Opulento' : 'Opulent Loading'}
                </h4>
                <SophisticatedLoading
                  size="md"
                  variant="opulent"
                  culturalTheme={true}
                />
              </div>

              <div className="text-center space-y-4">
                <h4 className="font-semibold text-amber-800">
                  {language === 'pt' ? 'Carregamento Majestoso' : 'Majestic Loading'}
                </h4>
                <SophisticatedLoading
                  size="md"
                  variant="majestic"
                  culturalTheme={true}
                  message={language === 'pt' ? 'Experiência premium...' : 'Premium experience...'}
                />
              </div>
            </div>

            {/* Elite Progress Bar */}
            <div className="max-w-2xl mx-auto space-y-4">
              <h4 className="font-semibold text-amber-800 text-center">
                {language === 'pt' ? 'Barra de Progresso Elite' : 'Elite Progress Bar'}
              </h4>
              <EliteProgressBar
                progress={progress}
                variant="majestic"
                culturalTheme={true}
                showPercentage={true}
              />
            </div>
          </section>

          {/* Elite Error Handling Section */}
          <section className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-amber-800 mb-4">
                {language === 'pt' ? 'Tratamento de Erros Sofisticado' : 'Sophisticated Error Handling'}
              </h2>
              <p className="text-amber-600 max-w-2xl mx-auto">
                {language === 'pt'
                  ? 'Sistema de tratamento de erros com sensibilidade cultural e mensagens refinadas'
                  : 'Error handling system with cultural sensitivity and refined messaging'
                }
              </p>
            </motion.div>

            <div className="flex justify-center">
              <MajesticButton
                variant="royal"
                size="md"
                onClick={() => setShowErrorDemo(!showErrorDemo)}
              >
                {language === 'pt' ? 'Demonstrar Erro Elite' : 'Demonstrate Elite Error'}
              </MajesticButton>
            </div>

            <EliteErrorBoundary culturalSensitivity={true}>
              <DemoErrorComponent />
            </EliteErrorBoundary>
          </section>

          {/* Elite Performance & Loading Section */}
          <section className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-amber-800 mb-4">
                {language === 'pt' ? 'Performance Premium' : 'Premium Performance'}
              </h2>
              <p className="text-amber-600 max-w-2xl mx-auto">
                {language === 'pt'
                  ? 'Componentes otimizados para a experiência mais sofisticada da comunidade portuguesa'
                  : 'Optimized components for the most sophisticated Portuguese community experience'
                }
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Lazy Image Demo */}
              <div className="space-y-4">
                <h4 className="font-semibold text-amber-800 text-center">
                  {language === 'pt' ? 'Imagem com Carregamento Sofisticado' : 'Sophisticated Image Loading'}
                </h4>
                <LazyImage
                  src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b"
                  alt="Portuguese community"
                  luxury={true}
                  culturalTheme={true}
                  aspectRatio="landscape"
                  className="w-full"
                />
              </div>

              {/* Infinite Scroll Demo */}
              <div className="space-y-4">
                <h4 className="font-semibold text-amber-800 text-center">
                  {language === 'pt' ? 'Scroll Infinito Elite' : 'Elite Infinite Scroll'}
                </h4>
                <div className="h-64 overflow-hidden border-2 border-amber-200 rounded-2xl">
                  <EliteInfiniteScroll
                    hasNextPage={hasNextPage}
                    fetchNextPage={fetchNextPage}
                    isLoading={isLoading}
                    culturalTheme={true}
                  >
                    <div className="space-y-4 p-4">
                      {Array.from({ length: 5 }, (_, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-amber-200">
                          <h5 className="font-semibold text-amber-800">
                            {language === 'pt' ? `Conteúdo da Comunidade ${i + 1}` : `Community Content ${i + 1}`}
                          </h5>
                          <p className="text-amber-600 text-sm">
                            {language === 'pt' 
                              ? 'Conteúdo premium da comunidade portuguesa'
                              : 'Premium Portuguese community content'
                            }
                          </p>
                        </div>
                      ))}
                    </div>
                  </EliteInfiniteScroll>
                </div>
              </div>
            </div>
          </section>

          {/* Elite Feedback Systems Section */}
          <section className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-amber-800 mb-4">
                {language === 'pt' ? 'Sistemas de Feedback Elite' : 'Elite Feedback Systems'}
              </h2>
              <p className="text-amber-600 max-w-2xl mx-auto">
                {language === 'pt'
                  ? 'Ferramentas sofisticadas de feedback com sensibilidade cultural para a comunidade portuguesa'
                  : 'Sophisticated feedback tools with cultural sensitivity for the Portuguese community'
                }
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Elite Feedback System */}
              <EliteFeedbackSystem
                onFeedback={handleFeedback}
                culturalTheme={true}
                showComments={true}
                showRating={true}
                showEmojis={true}
              />

              {/* Elite Review System */}
              <EliteReviewSystem
                itemId="demo-event"
                itemType="event"
                culturalTheme={true}
                onReview={handleReview}
              />
            </div>
          </section>

          {/* Notification Demos */}
          <section className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-amber-800 mb-4">
                {language === 'pt' ? 'Sistema de Notificações Elite' : 'Elite Notification System'}
              </h2>
              <p className="text-amber-600 max-w-2xl mx-auto">
                {language === 'pt'
                  ? 'Notificações sofisticadas com design premium e contexto cultural português'
                  : 'Sophisticated notifications with premium design and Portuguese cultural context'
                }
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              <MajesticButton
                variant="aristocratic"
                size="sm"
                onClick={() => showCultural(
                  language === 'pt' ? 'Actualização Cultural' : 'Cultural Update',
                  language === 'pt' 
                    ? 'Nova funcionalidade disponível para a comunidade portuguesa!'
                    : 'New feature available for the Portuguese community!'
                )}
              >
                {language === 'pt' ? 'Notificação Cultural' : 'Cultural Notification'}
              </MajesticButton>

              <MajesticButton
                variant="royal"
                size="sm"
                onClick={() => showSuccess(
                  language === 'pt' ? 'Sucesso Premium' : 'Premium Success',
                  language === 'pt' 
                    ? 'Operação completada com excelência!'
                    : 'Operation completed with excellence!'
                )}
              >
                {language === 'pt' ? 'Sucesso' : 'Success'}
              </MajesticButton>

              <MajesticButton
                variant="imperial"
                size="sm"
                onClick={() => showInfo(
                  language === 'pt' ? 'Informação Imperial' : 'Imperial Information',
                  language === 'pt' 
                    ? 'Informação importante da plataforma premium'
                    : 'Important information from the premium platform'
                )}
              >
                {language === 'pt' ? 'Informação' : 'Information'}
              </MajesticButton>

              <MajesticButton
                variant="diamond"
                size="sm"
                onClick={() => showError(
                  language === 'pt' ? 'Erro Sofisticado' : 'Sophisticated Error',
                  language === 'pt' 
                    ? 'Exemplo de tratamento de erro com classe'
                    : 'Example of error handling with class'
                )}
              >
                {language === 'pt' ? 'Erro' : 'Error'}
              </MajesticButton>
            </div>
          </section>
        </div>

        {/* Notification Container */}
        {notifications.map((notification) => (
          <EliteNotification
            key={notification.id}
            variant={notification.variant}
            title={notification.title}
            message={notification.message}
            isVisible={true}
            onClose={() => removeNotification(notification.id)}
            culturalTheme={notification.culturalTheme}
            position="top-right"
          />
        ))}
      </div>
    </ElitePerformanceMonitor>
  )
}