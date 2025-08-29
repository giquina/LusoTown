'use client'

import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS } from '@/config/brand'

interface TourRoute {
  id: number
  name: string
  namePt: string
  duration: string
  durationPt: string
  description: string
  descriptionPt: string
  highlights: string[]
  highlightsPt: string[]
  price: string
}

const tourRoutes: TourRoute[] = [
  {
    id: 1,
    name: "Portuguese Heritage London",
    namePt: "Patrimônio Português em Londres",
    duration: "4 hours",
    durationPt: "4 horas",
    description: "Explore London's Portuguese cultural sites and historic connections",
    descriptionPt: "Explore locais culturais portugueses e conexões históricas de Londres",
    highlights: ["Portuguese Embassy", "Vauxhall Portuguese Quarter", "Cultural Centres", "Traditional Restaurants"],
    highlightsPt: ["Embaixada Portuguesa", "Bairro Português de Vauxhall", "Centros Culturais", "Restaurantes Tradicionais"],
    price: "£25"
  },
  {
    id: 2,
    name: "Thames Maritime History",
    namePt: "História Marítima do Tâmisa",
    duration: "3 hours",
    durationPt: "3 horas",
    description: "Discover London's maritime connections with Portuguese explorers",
    descriptionPt: "Descubra as conexões marítimas de Londres com exploradores portugueses",
    highlights: ["Greenwich", "Maritime Museum", "Thames Path", "Historic Docks"],
    highlightsPt: ["Greenwich", "Museu Marítimo", "Caminho do Tâmisa", "Docas Históricas"],
    price: "£20"
  },
  {
    id: 3,
    name: "Cultural Communities Tour",
    namePt: "Tour das Comunidades Culturais",
    duration: "5 hours",
    durationPt: "5 horas",
    description: "Visit Portuguese-speaking community hubs across London",
    descriptionPt: "Visite centros comunitários lusófonos em Londres",
    highlights: ["Stockwell", "Elephant & Castle", "East London", "Community Centers"],
    highlightsPt: ["Stockwell", "Elephant & Castle", "East London", "Centros Comunitários"],
    price: "£30"
  }
]

export default function LondonTourRoutes() {
  const { language } = useLanguage()

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: PORTUGUESE_COLORS.brown[700] }}>
            {language === 'pt' ? 'Roteiros de Londres' : 'London Tour Routes'}
          </h2>
          <p className="text-lg text-gray-600">
            {language === 'pt'
              ? 'Descubra Londres através da perspectiva lusófona'
              : 'Discover London through a Portuguese-speaking perspective'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tourRoutes.map((route) => (
            <div 
              key={route.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div 
                className="h-2"
                style={{ backgroundColor: PORTUGUESE_COLORS.gold[500] }}
              ></div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold" style={{ color: PORTUGUESE_COLORS.brown[700] }}>
                    {language === 'pt' ? route.namePt : route.name}
                  </h3>
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: PORTUGUESE_COLORS.green[500] }}
                  >
                    {route.price}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded mb-2">
                    {language === 'pt' ? route.durationPt : route.duration}
                  </span>
                  <p className="text-gray-600">
                    {language === 'pt' ? route.descriptionPt : route.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-2" style={{ color: PORTUGUESE_COLORS.brown[600] }}>
                    {language === 'pt' ? 'Destaques:' : 'Highlights:'}
                  </h4>
                  <ul className="space-y-1">
                    {(language === 'pt' ? route.highlightsPt : route.highlights).map((highlight, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div 
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: PORTUGUESE_COLORS.red[500] }}
                        ></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  className="w-full py-2 px-4 rounded-lg font-medium text-white transition-colors duration-300 hover:opacity-90"
                  style={{ backgroundColor: PORTUGUESE_COLORS.brown[600] }}
                >
                  {language === 'pt' ? 'Reservar Tour' : 'Book Tour'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
