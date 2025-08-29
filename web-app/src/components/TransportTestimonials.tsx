'use client'

import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS } from '@/config/brand'

interface Testimonial {
  id: number
  name: string
  origin: string
  testimonial: string
  testimonialPt: string
  service: string
  servicePt: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Santos",
    origin: "Porto → London",
    testimonial: "The Portuguese community transport service helped me navigate London easily when I first arrived.",
    testimonialPt: "O serviço de transporte da comunidade portuguesa ajudou-me a navegar em Londres facilmente quando cheguei.",
    service: "Airport Transfer",
    servicePt: "Transferência do Aeroporto"
  },
  {
    id: 2,
    name: "João Silva",
    origin: "Lisbon → Manchester",
    testimonial: "Reliable transport to Portuguese cultural events across the UK. Highly recommended!",
    testimonialPt: "Transporte confiável para eventos culturais portugueses em todo o Reino Unido. Altamente recomendado!",
    service: "Cultural Events",
    servicePt: "Eventos Culturais"
  },
  {
    id: 3,
    name: "Ana Rodrigues",
    origin: "Coimbra → Birmingham",
    testimonial: "Safe and affordable travel options connecting Portuguese-speaking communities.",
    testimonialPt: "Opções de viagem seguras e acessíveis conectando comunidades lusófonas.",
    service: "Community Travel",
    servicePt: "Viagem Comunitária"
  }
]

export default function TransportTestimonials() {
  const { t, language } = useLanguage()

  return (
    <section className="py-16 px-4" style={{ backgroundColor: PORTUGUESE_COLORS.gold[50] }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: PORTUGUESE_COLORS.brown[700] }}>
            {language === 'pt' ? 'Testemunhos da Comunidade' : 'Community Testimonials'}
          </h2>
          <p className="text-lg text-gray-600">
            {language === 'pt' 
              ? 'Experiências reais de membros da comunidade lusófona'
              : 'Real experiences from Portuguese-speaking community members'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              style={{ borderTop: `4px solid ${PORTUGUESE_COLORS.gold[500]}` }}
            >
              <div className="mb-4">
                <p className="text-gray-700 italic mb-4">
                  "{language === 'pt' ? testimonial.testimonialPt : testimonial.testimonial}"
                </p>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold" style={{ color: PORTUGUESE_COLORS.brown[700] }}>
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-600 mb-2">{testimonial.origin}</p>
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: PORTUGUESE_COLORS.green[500] }}
                >
                  {language === 'pt' ? testimonial.servicePt : testimonial.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
