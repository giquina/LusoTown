'use client'

import { useState, useEffect } from 'react'
import { UserPlusIcon, CheckIcon, XMarkIcon, ClockIcon } from '@heroicons/react/24/outline'
import { connectionService, Connection } from '@/lib/connections'
import { toast } from 'react-hot-toast'

interface ConnectionButtonProps {
  profileId: string
  currentUserId: string
  className?: string
}

type ConnectionStatus = 'none' | 'pending_sent' | 'pending_received' | 'connected' | 'loading'

export default function ConnectionButton({ profileId, currentUserId, className = '' }: ConnectionButtonProps) {
  const [status, setStatus] = useState<ConnectionStatus>('loading')
  const [isLoading, setIsLoading] = useState(false)
  const [showMessageForm, setShowMessageForm] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    checkConnectionStatus()
  }, [profileId, currentUserId])

  const checkConnectionStatus = async () => {
    setIsLoading(true)
    
    try {
      // Check if already connected
      const connections = await connectionService.getConnections(currentUserId)
      const isConnected = connections.some(conn => conn.id === profileId)
      
      if (isConnected) {
        setStatus('connected')
        return
      }
      
      // Check for pending requests
      const sentRequests = await connectionService.getConnectionRequests(profileId)
      const receivedRequests = await connectionService.getConnectionRequests(currentUserId)
      
      const hasSentRequest = sentRequests.some(req => req.fromUserId === currentUserId)
      const hasReceivedRequest = receivedRequests.some(req => req.fromUserId === profileId)
      
      if (hasSentRequest) {
        setStatus('pending_sent')
      } else if (hasReceivedRequest) {
        setStatus('pending_received')
      } else {
        setStatus('none')
      }
    } catch (error) {
      console.error('Error checking connection status:', error)
      setStatus('none')
    }
  }

  const handleConnect = async () => {
    if (!message.trim()) {
      setShowMessageForm(true)
      return
    }
    
    setIsLoading(true)
    
    try {
      const result = await connectionService.sendConnectionRequest(
        currentUserId,
        profileId,
        message,
        'profile_browse'
      )
      
      if (result.success) {
        setStatus('pending_sent')
        setShowMessageForm(false)
        setMessage('')
        toast.success('Connection request sent!')
      } else {
        toast.error(result.message)
        setStatus('none')
      }
    } catch (error) {
      toast.error('Failed to send connection request')
      setStatus('none')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAcceptConnection = async () => {
    setIsLoading(true)
    
    try {
      // Find the request ID
      const requests = await connectionService.getConnectionRequests(currentUserId)
      const request = requests.find(req => req.fromUserId === profileId)
      
      if (!request) {
        toast.error('Connection request not found')
        setStatus('pending_received')
        return
      }
      
      const result = await connectionService.respondToConnectionRequest(request.id, 'accepted')
      
      if (result.success) {
        setStatus('connected')
        toast.success('Connection accepted!')
      } else {
        toast.error(result.message)
        setStatus('pending_received')
      }
    } catch (error) {
      toast.error('Failed to accept connection')
      setStatus('pending_received')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeclineConnection = async () => {
    setIsLoading(true)
    
    try {
      // Find the request ID
      const requests = await connectionService.getConnectionRequests(currentUserId)
      const request = requests.find(req => req.fromUserId === profileId)
      
      if (!request) {
        toast.error('Connection request not found')
        setStatus('pending_received')
        return
      }
      
      const result = await connectionService.respondToConnectionRequest(request.id, 'declined')
      
      if (result.success) {
        setStatus('none')
        toast.success('Connection declined')
      } else {
        toast.error(result.message)
        setStatus('pending_received')
      }
    } catch (error) {
      toast.error('Failed to decline connection')
      setStatus('pending_received')
    } finally {
      setIsLoading(false)
    }
  }

  const getButtonConfig = () => {
    switch (status) {
      case 'loading':
        return {
          text: 'Loading...',
          icon: <ClockIcon className="w-4 h-4 animate-spin" />,
          className: 'bg-gray-100 text-gray-500 cursor-not-allowed',
          disabled: true
        }
      
      case 'connected':
        return {
          text: 'Connected',
          icon: <CheckIcon className="w-4 h-4" />,
          className: 'bg-green-100 text-green-700 border border-green-200',
          disabled: true
        }
      
      case 'pending_sent':
        return {
          text: 'Request Sent',
          icon: <ClockIcon className="w-4 h-4" />,
          className: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
          disabled: true
        }
      
      case 'pending_received':
        return {
          text: 'Respond',
          icon: <UserPlusIcon className="w-4 h-4" />,
          className: 'bg-primary-500 text-white hover:bg-primary-600',
          disabled: false
        }
      
      default:
        return {
          text: 'Connect',
          icon: <UserPlusIcon className="w-4 h-4" />,
          className: 'bg-[#FF6B6B] text-white hover:bg-[#FF5252]',
          disabled: false
        }
    }
  }

  const buttonConfig = getButtonConfig()

  if (showMessageForm) {
    return (
      <div className="space-y-3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a friendly message with your connection request..."
          className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
          rows={3}
          maxLength={200}
        />
        <div className="flex items-center gap-2">
          <button
            onClick={handleConnect}
            disabled={!message.trim() || status === 'loading'}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF6B6B] text-white rounded-lg hover:bg-[#FF5252] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            <UserPlusIcon className="w-4 h-4" />
            Send Request
          </button>
          <button
            onClick={() => setShowMessageForm(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
          >
            Cancel
          </button>
        </div>
        <p className="text-xs text-gray-500">
          {message.length}/200 characters
        </p>
      </div>
    )
  }

  if (status === 'pending_received') {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleAcceptConnection}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <CheckIcon className="w-4 h-4" />
          Accept
        </button>
        <button
          onClick={handleDeclineConnection}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <XMarkIcon className="w-4 h-4" />
          Decline
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={status === 'none' ? () => setShowMessageForm(true) : undefined}
      disabled={buttonConfig.disabled}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${buttonConfig.className} ${className}`}
    >
      {buttonConfig.icon}
      {buttonConfig.text}
    </button>
  )
}