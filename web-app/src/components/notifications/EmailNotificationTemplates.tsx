'use client'

import { useLanguage } from '@/context/LanguageContext'
import { BaseNotification, NotificationCategory } from '@/context/NotificationContext'

interface EmailTemplateProps {
  notifications: BaseNotification[]
  unsubscribeUrl?: string
  preferencesUrl?: string
  userFirstName?: string
}

export function DailyDigestEmailTemplate({ 
  notifications, 
  unsubscribeUrl = '',
  preferencesUrl = '',
  userFirstName = 'Member'
}: EmailTemplateProps) {
  const { language } = useLanguage()
  
  const groupedNotifications = notifications.reduce((acc, notification) => {
    if (!acc[notification.category]) {
      acc[notification.category] = []
    }
    acc[notification.category].push(notification)
    return acc
  }, {} as Record<NotificationCategory, BaseNotification[]>)

  const categoryLabels: Record<NotificationCategory, { en: string; pt: string; icon: string }> = {
    networking: { en: 'Networking', pt: 'Networking', icon: '🤝' },
    services: { en: 'Services', pt: 'Serviços', icon: '🚗' },
    community: { en: 'Community', pt: 'Comunidade', icon: '🏛️' },
    business: { en: 'Business', pt: 'Negócios', icon: '💼' },
    students: { en: 'Students', pt: 'Estudantes', icon: '🎓' },
    subscription: { en: 'Subscription', pt: 'Subscrição', icon: '💎' },
    system: { en: 'System', pt: 'Sistema', icon: '⚙️' },
    heritage: { en: 'Heritage', pt: 'Património', icon: '🇵🇹' },
    events: { en: 'Events', pt: 'Eventos', icon: '🎭' },
    transport: { en: 'Transport', pt: 'Transporte', icon: '🚙' }
  }

  const today = new Date().toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      color: '#374151'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '24px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
          🇵🇹 LusoTown London
        </div>
        <div style={{ fontSize: '16px', opacity: 0.9 }}>
          {language === 'pt' ? 'Resumo Diário da Comunidade' : 'Daily Community Digest'}
        </div>
        <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '4px' }}>
          {today}
        </div>
      </div>

      {/* Greeting */}
      <div style={{ padding: '24px 24px 16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px' }}>
          {language === 'pt' 
            ? `Olá ${userFirstName}! 👋`
            : `Hello ${userFirstName}! 👋`
          }
        </h2>
        <p style={{ margin: '0', lineHeight: '1.5', color: '#6b7280' }}>
          {language === 'pt' 
            ? `Aqui está o seu resumo diário da comunidade portuguesa em Londres com ${notifications.length} atualizações.`
            : `Here's your daily Portuguese community digest for London with ${notifications.length} updates.`
          }
        </p>
      </div>

      {/* Notifications by Category */}
      <div style={{ padding: '0 24px' }}>
        {Object.entries(groupedNotifications).map(([category, categoryNotifications]) => (
          <div key={category} style={{ 
            marginBottom: '24px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            {/* Category Header */}
            <div style={{
              backgroundColor: '#f9fafb',
              padding: '12px 16px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                margin: '0',
                fontSize: '16px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>{categoryLabels[category as NotificationCategory]?.icon}</span>
                <span>
                  {language === 'pt' 
                    ? categoryLabels[category as NotificationCategory]?.pt
                    : categoryLabels[category as NotificationCategory]?.en
                  }
                </span>
                <span style={{
                  backgroundColor: '#ddd6fe',
                  color: '#7c3aed',
                  fontSize: '12px',
                  fontWeight: '500',
                  padding: '2px 8px',
                  borderRadius: '12px'
                }}>
                  {categoryNotifications.length}
                </span>
              </h3>
            </div>

            {/* Category Notifications */}
            <div style={{ padding: '8px' }}>
              {categoryNotifications.slice(0, 5).map((notification, index) => (
                <div key={notification.id} style={{
                  padding: '12px',
                  borderBottom: index < categoryNotifications.length - 1 ? '1px solid #f3f4f6' : 'none'
                }}>
                  <h4 style={{
                    margin: '0 0 8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#111827'
                  }}>
                    {language === 'pt' && notification.titlePT 
                      ? notification.titlePT 
                      : notification.title
                    }
                  </h4>
                  <p style={{
                    margin: '0 0 8px',
                    fontSize: '13px',
                    lineHeight: '1.4',
                    color: '#6b7280'
                  }}>
                    {language === 'pt' && notification.messagePT 
                      ? notification.messagePT 
                      : notification.message
                    }
                  </p>
                  {notification.actionUrl && (
                    <a
                      href={notification.actionUrl}
                      style={{
                        display: 'inline-block',
                        color: '#1e40af',
                        fontSize: '12px',
                        fontWeight: '500',
                        textDecoration: 'none',
                        padding: '4px 12px',
                        backgroundColor: '#dbeafe',
                        borderRadius: '4px',
                        border: '1px solid #93c5fd'
                      }}
                    >
                      {language === 'pt' && notification.actionLabelPT 
                        ? notification.actionLabelPT 
                        : notification.actionLabel || (language === 'pt' ? 'Ver Mais' : 'View More')
                      }
                    </a>
                  )}
                </div>
              ))}
              
              {categoryNotifications.length > 5 && (
                <div style={{
                  padding: '12px',
                  textAlign: 'center',
                  color: '#6b7280',
                  fontSize: '12px'
                }}>
                  {language === 'pt' 
                    ? `E mais ${categoryNotifications.length - 5} atualizações...`
                    : `And ${categoryNotifications.length - 5} more updates...`
                  }
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div style={{
        padding: '24px',
        textAlign: 'center',
        backgroundColor: '#f9fafb',
        borderTop: '1px solid #e5e7eb'
      }}>
        <a
          href="https://lusotown.com/my-network"
          style={{
            display: 'inline-block',
            backgroundColor: '#1e40af',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
            marginBottom: '16px'
          }}
        >
          {language === 'pt' ? 'Ver Todas as Notificações' : 'View All Notifications'}
        </a>
        
        <div style={{ fontSize: '12px', color: '#6b7280' }}>
          {language === 'pt' 
            ? 'Conectando a comunidade portuguesa em Londres & Reino Unido'
            : 'Connecting the Portuguese community in London & UK'
          }
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '16px 24px',
        fontSize: '11px',
        color: '#9ca3af',
        textAlign: 'center',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{ marginBottom: '8px' }}>
          <a href={preferencesUrl} style={{ color: '#6b7280', textDecoration: 'none' }}>
            {language === 'pt' ? 'Gerir Preferências' : 'Manage Preferences'}
          </a>
          {' | '}
          <a href={unsubscribeUrl} style={{ color: '#6b7280', textDecoration: 'none' }}>
            {language === 'pt' ? 'Cancelar Subscrição' : 'Unsubscribe'}
          </a>
        </div>
        <div>
          © 2025 LusoTown London. {language === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
        </div>
        <div style={{ marginTop: '4px' }}>
          {language === 'pt' 
            ? 'Comunidade Portuguesa em Londres & Reino Unido'
            : 'Portuguese Community in London & UK'
          }
        </div>
      </div>
    </div>
  )
}

export function WeeklyEmailTemplate({ 
  notifications, 
  unsubscribeUrl = '',
  preferencesUrl = '',
  userFirstName = 'Member'
}: EmailTemplateProps) {
  const { language } = useLanguage()
  
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - 7)
  const weekEnd = new Date()

  const dateRange = `${weekStart.toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB')} - ${weekEnd.toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB')}`

  const stats = {
    total: notifications.length,
    networking: notifications.filter(n => n.category === 'networking').length,
    events: notifications.filter(n => n.category === 'events').length,
    business: notifications.filter(n => n.category === 'business').length,
    community: notifications.filter(n => n.category === 'community').length
  }

  const highlights = notifications
    .filter(n => n.priority === 'high' || n.priority === 'urgent')
    .slice(0, 5)

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      color: '#374151'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#059669',
        color: 'white',
        padding: '24px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
          🇵🇹 LusoTown Weekly
        </div>
        <div style={{ fontSize: '16px', opacity: 0.9 }}>
          {language === 'pt' ? 'Resumo Semanal da Comunidade' : 'Weekly Community Roundup'}
        </div>
        <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '4px' }}>
          {dateRange}
        </div>
      </div>

      {/* Stats Overview */}
      <div style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px' }}>
          {language === 'pt' 
            ? `Olá ${userFirstName}! Esta semana na comunidade:`
            : `Hello ${userFirstName}! This week in the community:`
          }
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '16px',
            backgroundColor: '#f0f9ff',
            borderRadius: '8px',
            border: '1px solid #e0f2fe'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0284c7' }}>
              {stats.total}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              {language === 'pt' ? 'Total de Atualizações' : 'Total Updates'}
            </div>
          </div>
          
          <div style={{
            textAlign: 'center',
            padding: '16px',
            backgroundColor: '#f0fdf4',
            borderRadius: '8px',
            border: '1px solid #dcfce7'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>
              {stats.networking}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              {language === 'pt' ? 'Novas Ligações' : 'New Connections'}
            </div>
          </div>
          
          <div style={{
            textAlign: 'center',
            padding: '16px',
            backgroundColor: '#fefce8',
            borderRadius: '8px',
            border: '1px solid #fef3c7'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#d97706' }}>
              {stats.events}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              {language === 'pt' ? 'Eventos' : 'Events'}
            </div>
          </div>
          
          <div style={{
            textAlign: 'center',
            padding: '16px',
            backgroundColor: '#f3e8ff',
            borderRadius: '8px',
            border: '1px solid #e9d5ff'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9333ea' }}>
              {stats.business}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              {language === 'pt' ? 'Oportunidades' : 'Opportunities'}
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      {highlights.length > 0 && (
        <div style={{ padding: '0 24px 24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 16px' }}>
            ⭐ {language === 'pt' ? 'Destaques da Semana' : 'Week Highlights'}
          </h3>
          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            {highlights.map((notification, index) => (
              <div key={notification.id} style={{
                padding: '16px',
                borderBottom: index < highlights.length - 1 ? '1px solid #f3f4f6' : 'none',
                backgroundColor: notification.priority === 'urgent' ? '#fef2f2' : '#ffffff'
              }}>
                <h4 style={{
                  margin: '0 0 8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: notification.priority === 'urgent' ? '#dc2626' : '#111827'
                }}>
                  {language === 'pt' && notification.titlePT 
                    ? notification.titlePT 
                    : notification.title
                  }
                </h4>
                <p style={{
                  margin: '0',
                  fontSize: '13px',
                  lineHeight: '1.4',
                  color: '#6b7280'
                }}>
                  {language === 'pt' && notification.messagePT 
                    ? notification.messagePT 
                    : notification.message
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div style={{
        padding: '24px',
        textAlign: 'center',
        backgroundColor: '#f9fafb',
        borderTop: '1px solid #e5e7eb'
      }}>
        <a
          href="https://lusotown.com/events"
          style={{
            display: 'inline-block',
            backgroundColor: '#059669',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
            marginBottom: '16px'
          }}
        >
          {language === 'pt' ? 'Explorar Eventos' : 'Explore Events'}
        </a>
        
        <div style={{ fontSize: '12px', color: '#6b7280' }}>
          {language === 'pt' 
            ? 'Não perca os próximos eventos da comunidade portuguesa'
            : 'Don\'t miss upcoming Portuguese community events'
          }
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '16px 24px',
        fontSize: '11px',
        color: '#9ca3af',
        textAlign: 'center',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{ marginBottom: '8px' }}>
          <a href={preferencesUrl} style={{ color: '#6b7280', textDecoration: 'none' }}>
            {language === 'pt' ? 'Gerir Preferências' : 'Manage Preferences'}
          </a>
          {' | '}
          <a href={unsubscribeUrl} style={{ color: '#6b7280', textDecoration: 'none' }}>
            {language === 'pt' ? 'Cancelar Subscrição' : 'Unsubscribe'}
          </a>
        </div>
        <div>
          © 2025 LusoTown London. {language === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
        </div>
      </div>
    </div>
  )
}