'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface AuthPopupContextType {
  isPopupVisible: boolean
  showPopup: (message?: string) => void
  hidePopup: () => void
  message?: string
}

const AuthPopupContext = createContext<AuthPopupContextType | undefined>(undefined)

interface AuthPopupProviderProps {
  children: ReactNode
}

export const AuthPopupProvider: React.FC<AuthPopupProviderProps> = ({ children }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [message, setMessage] = useState<string>()
  const { t } = useLanguage()

  const showPopup = (customMessage?: string) => {
    setMessage(customMessage || t('auth.signin_required', 'Please sign in to continue'))
    setIsPopupVisible(true)
  }

  const hidePopup = () => {
    setIsPopupVisible(false)
    setMessage(undefined)
  }

  const value = {
    isPopupVisible,
    showPopup,
    hidePopup,
    message
  }

  return (
    <AuthPopupContext.Provider value={value}>
      {children}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {t('auth.authentication_required', 'Authentication Required')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {message}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={hidePopup}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {t('common.cancel', 'Cancel')}
              </button>
              <button
                onClick={() => {
                  hidePopup()
                  window.location.href = '/login'
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                {t('auth.sign_in', 'Sign In')}
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthPopupContext.Provider>
  )
}

export const useAuthPopup = () => {
  const context = useContext(AuthPopupContext)
  if (context === undefined) {
    throw new Error('useAuthPopup must be used within an AuthPopupProvider')
  }
  return context
}

export default AuthPopupProvider
