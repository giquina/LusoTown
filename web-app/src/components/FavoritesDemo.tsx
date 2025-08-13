'use client'

import { useState } from 'react'
import FavoriteButton from '@/components/FavoriteButton'
import { HeartIcon } from '@heroicons/react/24/outline'

export default function FavoritesDemo() {
  const [demoItems, setDemoItems] = useState([
    {
      id: 'demo-event-1',
      type: 'event',
      title: 'Portuguese Book Club Meeting',
      description: 'Discussing "O Guarani" by José de Alencar. All Portuguese speakers and literature lovers welcome!',
      liked: false
    },
    {
      id: 'demo-business-1',
      type: 'business',
      title: 'Casa do Pão Bakery',
      description: 'Authentic Portuguese bakery and café in Shoreditch with the best pastéis de nata in London.',
      liked: false
    },
    {
      id: 'demo-feed-1',
      type: 'feed',
      title: 'Beautiful sunset at Hyde Park',
      description: 'Just enjoyed a lovely evening walk at Hyde Park. The sunset was absolutely magical! #HydePark #Sunset #London',
      liked: false
    }
  ])

  const toggleFavorite = (itemId: string) => {
    setDemoItems(demoItems.map(item => 
      item.id === itemId 
        ? { ...item, liked: !item.liked } 
        : item
    ))
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Favorites Demo</h3>
      <p className="text-gray-600 mb-6">
        Click the heart icon to save events, businesses, and feed posts to your favorites.
      </p>
      
      <div className="space-y-6">
        {demoItems.map((item) => (
          <div 
            key={item.id} 
            className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary-100 to-secondary-100 flex items-center justify-center flex-shrink-0">
              <div className="text-lg">
                {item.type === 'event' ? '📅' : 
                 item.type === 'business' ? '🏪' : '📱'}
              </div>
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                  {item.type}
                </span>
              </div>
            </div>
            
            <FavoriteButton
              itemId={item.id}
              itemType={item.type as 'event' | 'business' | 'feed'}
              itemTitle={item.title}
              itemDescription={item.description}
              size="md"
            />
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <h4 className="font-semibold text-purple-900 mb-2">How Favorites Work:</h4>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Click ❤️ to save any item to your favorites</li>
            <li>• Access all saved items from your profile</li>
            <li>• Never miss events or businesses you love</li>
            <li>• Easily share favorites with friends</li>
          </ul>
        </div>
      </div>
    </div>
  )
}