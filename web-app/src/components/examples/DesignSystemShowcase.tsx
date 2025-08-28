'use client'

import React from 'react'
import {
  DisplayHeading,
  SectionHeading,
  BodyText,
  CulturalLabel,
  CommunityQuote,
  ModernCard,
  EventCard,
  BusinessCard,
  CommunityMemberCard,
  ModernButton,
  CulturalButton,
  CTAButton,
  ButtonGroup,
  JoinEventButton,
  ContactBusinessButton,
  SubscribeButton,
  DesignTokenShowcase
} from '@/components/ui'

// Comprehensive showcase of the new LusoTown Design System

export default function LusoTownDesignSystemShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30">
      <div className="container mx-auto px-6 py-12 space-y-16">
        
        {/* Header Section */}
        <section className="text-center space-y-6">
          <DisplayHeading size="large" cultural>
            Sistema de Design LusoTown
          </DisplayHeading>
          <BodyText size="large" className="max-w-3xl mx-auto text-center">
            Plataforma moderna para a comunidade lusófona no Reino Unido. 
            Celebrando Portugal 🇵🇹, Brasil 🇧🇷, Angola 🇦🇴, Cabo Verde 🇨🇻, 
            Moçambique 🇲🇿, Guiné-Bissau 🇬🇼, São Tomé 🇸🇹, e Timor-Leste 🇹🇱.
          </BodyText>
          
          <div className="flex flex-wrap justify-center gap-3">
            <CulturalLabel nation="portugal">Portugal</CulturalLabel>
            <CulturalLabel nation="brazil">Brasil</CulturalLabel>
            <CulturalLabel nation="angola">Angola</CulturalLabel>
            <CulturalLabel nation="cape-verde">Cabo Verde</CulturalLabel>
            <CulturalLabel nation="mozambique">Moçambique</CulturalLabel>
            <CulturalLabel nation="guinea-bissau">Guiné-Bissau</CulturalLabel>
            <CulturalLabel nation="sao-tome">São Tomé</CulturalLabel>
            <CulturalLabel nation="timor">Timor-Leste</CulturalLabel>
          </div>
        </section>

        {/* Typography Showcase */}
        <section className="space-y-8">
          <SectionHeading level={2} accent>
            Sistema Tipográfico Moderno
          </SectionHeading>
          
          <ModernCard padding="large" elevation="medium">
            <div className="space-y-6">
              <DisplayHeading size="small">
                Comunidade Lusófona no Reino Unido
              </DisplayHeading>
              
              <SectionHeading level={3}>
                Eventos, Negócios, e Conexões
              </SectionHeading>
              
              <BodyText>
                Conectamos mais de 750 membros da comunidade lusófona em Londres e todo o Reino Unido. 
                Nossa plataforma celebra a rica diversidade cultural dos países de língua portuguesa, 
                oferecendo eventos autênticos, diretório de negócios locais, e oportunidades de networking.
              </BodyText>
              
              <BodyText size="small" muted>
                Junte-se a nós e faça parte desta vibrante comunidade que cresce cada dia mais.
              </BodyText>
            </div>
          </ModernCard>
        </section>

        {/* Button System Showcase */}
        <section className="space-y-8">
          <SectionHeading level={2} accent>
            Sistema de Botões Culturais
          </SectionHeading>
          
          <ModernCard padding="large" elevation="medium">
            <div className="space-y-8">
              <div>
                <h4 className="text-heading-4 font-semibold mb-4 text-primary-900">
                  Botões de Ação Principal
                </h4>
                <ButtonGroup spacing="md">
                  <CTAButton emphasis="high">
                    🎉 Juntar-se à Comunidade
                  </CTAButton>
                  <CTAButton emphasis="medium">
                    📱 Baixar App
                  </CTAButton>
                  <CTAButton emphasis="low">
                    📧 Saber Mais
                  </CTAButton>
                </ButtonGroup>
              </div>

              <div>
                <h4 className="text-heading-4 font-semibold mb-4 text-primary-900">
                  Botões Culturais por Nação
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <CulturalButton nation="portugal">
                    🇵🇹 Portugal
                  </CulturalButton>
                  <CulturalButton nation="brazil">
                    🇧🇷 Brasil
                  </CulturalButton>
                  <CulturalButton nation="palop">
                    🌍 PALOP
                  </CulturalButton>
                  <CulturalButton nation="lusophone">
                    ⭐ Lusófono
                  </CulturalButton>
                </div>
              </div>

              <div>
                <h4 className="text-heading-4 font-semibold mb-4 text-primary-900">
                  Botões de Ação Específica
                </h4>
                <div className="flex flex-wrap gap-4">
                  <JoinEventButton eventName="Festa de São João" />
                  <ContactBusinessButton businessName="Restaurante Fado" />
                  <SubscribeButton tier="Premium" />
                </div>
              </div>
            </div>
          </ModernCard>
        </section>

        {/* Card System Showcase */}
        <section className="space-y-8">
          <SectionHeading level={2} accent>
            Sistema de Cards Moderno
          </SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EventCard
              title="Festival de Fado em Londres"
              description="Noite especial de fado tradicional português no coração de Londres. Venha celebrar nossa cultura musical com os melhores fadistas da comunidade."
              date="15 de Março, 2025"
              location="Portuguese Cultural Centre"
              attendees={85}
              featured
              nation="portugal"
            />
            
            <BusinessCard
              name="Restaurante Sabores do Brasil"
              description="Autêntica culinária brasileira no centro de Londres. Pratos tradicionais preparados com ingredientes frescos e muito amor."
              category="Restaurante"
              rating={4.8}
              location="Camden, London"
              verified
              nation="brazil"
            />
            
            <CommunityMemberCard
              name="Maria Santos"
              bio="Empresária portuguesa apaixonada por conectar nossa comunidade. Organizadora de eventos culturais e mentora de negócios."
              heritage="Lisboa, Portugal"
              interests={["Fado", "Culinária", "Networking", "Empreendedorismo"]}
              verified
            />
          </div>
        </section>

        {/* Community Quote */}
        <section>
          <CommunityQuote 
            author="João Silva"
            nation="Portuguese entrepreneur in London"
          >
            LusoTown transformou a forma como nossa comunidade se conecta. 
            Encontrei não apenas novos amigos, mas também parceiros de negócio 
            e oportunidades incríveis. É verdadeiramente o lar digital dos lusófonos no Reino Unido.
          </CommunityQuote>
        </section>

        {/* Cultural Heritage Cards */}
        <section className="space-y-8">
          <SectionHeading level={2} accent>
            Cartões de Herança Cultural
          </SectionHeading>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <ModernCard cultural nation="portugal" padding="medium" interactive>
              <div className="text-center space-y-2">
                <div className="text-3xl">🇵🇹</div>
                <h4 className="font-semibold text-sm">Portugal</h4>
                <p className="text-xs text-neutral-600">10.3M habitantes</p>
              </div>
            </ModernCard>
            
            <ModernCard cultural nation="brazil" padding="medium" interactive>
              <div className="text-center space-y-2">
                <div className="text-3xl">🇧🇷</div>
                <h4 className="font-semibold text-sm">Brasil</h4>
                <p className="text-xs text-neutral-600">215M habitantes</p>
              </div>
            </ModernCard>
            
            <ModernCard cultural nation="angola" padding="medium" interactive>
              <div className="text-center space-y-2">
                <div className="text-3xl">🇦🇴</div>
                <h4 className="font-semibold text-sm">Angola</h4>
                <p className="text-xs text-neutral-600">33.9M habitantes</p>
              </div>
            </ModernCard>
            
            <ModernCard cultural nation="cape-verde" padding="medium" interactive>
              <div className="text-center space-y-2">
                <div className="text-3xl">🇨🇻</div>
                <h4 className="font-semibold text-sm">Cabo Verde</h4>
                <p className="text-xs text-neutral-600">563K habitantes</p>
              </div>
            </ModernCard>
            
            <ModernCard cultural nation="mozambique" padding="medium" interactive>
              <div className="text-center space-y-2">
                <div className="text-3xl">🇲🇿</div>
                <h4 className="font-semibold text-sm">Moçambique</h4>
                <p className="text-xs text-neutral-600">32.4M habitantes</p>
              </div>
            </ModernCard>
            
            <ModernCard cultural nation="guinea-bissau" padding="medium" interactive>
              <div className="text-center space-y-2">
                <div className="text-3xl">🇬🇼</div>
                <h4 className="font-semibold text-sm">Guiné-Bissau</h4>
                <p className="text-xs text-neutral-600">2M habitantes</p>
              </div>
            </ModernCard>
            
            <ModernCard cultural nation="sao-tome" padding="medium" interactive>
              <div className="text-center space-y-2">
                <div className="text-3xl">🇸🇹</div>
                <h4 className="font-semibold text-sm">São Tomé</h4>
                <p className="text-xs text-neutral-600">223K habitantes</p>
              </div>
            </ModernCard>
            
            <ModernCard cultural nation="timor" padding="medium" interactive>
              <div className="text-center space-y-2">
                <div className="text-3xl">🇹🇱</div>
                <h4 className="font-semibold text-sm">Timor-Leste</h4>
                <p className="text-xs text-neutral-600">1.3M habitantes</p>
              </div>
            </ModernCard>
          </div>
        </section>

        {/* Design Tokens Documentation */}
        <section>
          <SectionHeading level={2} accent>
            Tokens de Design
          </SectionHeading>
          <DesignTokenShowcase />
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-6 py-16">
          <DisplayHeading size="medium">
            Pronto para se Juntar?
          </DisplayHeading>
          <BodyText className="max-w-2xl mx-auto text-center">
            Faça parte da maior comunidade lusófona no Reino Unido. 
            Conecte-se, descubra, e celebre nossa rica herança cultural.
          </BodyText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton emphasis="high" size="xl">
              🎉 Criar Conta Gratuita
            </CTAButton>
            <ModernButton variant="secondary" size="xl">
              📱 Baixar App Mobile
            </ModernButton>
          </div>
        </section>
      </div>
    </div>
  )
}