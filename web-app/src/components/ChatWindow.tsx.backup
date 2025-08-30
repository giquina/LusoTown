'use client'

import React from 'react'

interface ChatWindowProps {
  isOpen: boolean
  onClose: () => void
  messages?: any[]
  onSendMessage?: (message: string) => void
}

export default function ChatWindow({ 
  isOpen, 
  onClose, 
  messages = [], 
  onSendMessage 
}: ChatWindowProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 h-96">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Chat</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <div className="p-4 h-64 overflow-y-auto">
          <p className="text-gray-500">Chat functionality coming soon...</p>
        </div>
        <div className="border-t p-4">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full px-3 py-2 border rounded-lg"
            disabled
          />
        </div>
      </div>
    </div>
  )
}
