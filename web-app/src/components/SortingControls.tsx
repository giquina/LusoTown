'use client'

import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

interface SortingControlsProps {
  sortBy: 'recent' | 'most_events' | 'alphabetical' | 'strongest'
  onSortChange: (sortBy: 'recent' | 'most_events' | 'alphabetical' | 'strongest') => void
}

export default function SortingControls({ sortBy, onSortChange }: SortingControlsProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'

  const sortOptions = [
    {
      value: 'recent' as const,
      label: isPortuguese ? 'Mais Recente' : 'Most Recent',
      description: isPortuguese ? 'Última interação' : 'Last interaction'
    },
    {
      value: 'most_events' as const,
      label: isPortuguese ? 'Mais Eventos' : 'Most Events',
      description: isPortuguese ? 'Eventos em comum' : 'Shared events'
    },
    {
      value: 'strongest' as const,
      label: isPortuguese ? 'Conexão Mais Forte' : 'Strongest Connection',
      description: isPortuguese ? 'Força da conexão' : 'Connection strength'
    },
    {
      value: 'alphabetical' as const,
      label: isPortuguese ? 'Alfabética' : 'Alphabetical',
      description: isPortuguese ? 'A-Z por nome' : 'A-Z by name'
    }
  ]

  const currentOption = sortOptions.find(option => option.value === sortBy)

  return (
    <div className="relative">
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as any)}
        className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent cursor-pointer min-w-[200px]"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    </div>
  )
}