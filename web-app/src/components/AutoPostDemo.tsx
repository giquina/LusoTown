'use client'

import { useState } from 'react'
import { 
  CalendarDaysIcon, 
  UserGroupIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export default function AutoPostDemo() {
  const [showNotification, setShowNotification] = useState(false)
  const [rsvpStatus, setRsvpStatus] = useState<'going' | 'waitlist' | null>(null)

  const handleRSVP = (status: 'going' | 'waitlist') => {
    setRsvpStatus(status)
    setShowNotification(true)
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  const dismissNotification = () => {
    setShowNotification(false)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Auto-Post Demo</h3>
      <p className="text-gray-600 mb-6">
        When you RSVP to an event, it automatically creates a post in LusoFeed to share with the community.
      </p>
      
      {/* Mock Event */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 mb-6 border border-primary-100">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            🎉
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-lg text-gray-900 mb-1">Noite de Fado & Vinho Verde</h4>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <span className="flex items-center gap-1">
                <CalendarDaysIcon className="w-4 h-4" />
                Aug 20, 2025 • 7:00 PM
              </span>
              <span className="flex items-center gap-1">
                <UserGroupIcon className="w-4 h-4" />
                A Toca Restaurant
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Experience the soul of Portugal with traditional Fado music, Vinho Verde tasting, and authentic Portuguese cuisine.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => handleRSVP('going')}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
          >
            RSVP Now
          </button>
          <button
            onClick={() => handleRSVP('waitlist')}
            className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Join Waitlist
          </button>
        </div>
      </div>
      
      {/* Auto-Post Notification */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 max-w-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold">
                📱
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900">Auto-Posted to LusoFeed</h4>
                  <button 
                    onClick={dismissNotification}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  {rsvpStatus === 'going' 
                    ? "You're going to 'Noite de Fado & Vinho Verde'!" 
                    : "You've joined the waitlist for 'Noite de Fado & Vinho Verde'!"}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span>Posted to Community Feed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
        <h4 className="font-semibold text-primary-900 mb-2">How It Works:</h4>
        <ul className="text-sm text-primary-800 space-y-1">
          <li>• Click "RSVP Now" to confirm attendance</li>
          <li>• Automatically creates a post in LusoFeed</li>
          <li>• Your friends can see you're attending</li>
          <li>• Builds excitement for the event</li>
        </ul>
      </div>
    </div>
  )
}