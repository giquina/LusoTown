'use client'

import React, { useState, useEffect, useRef } from 'react'
import { X, MessageCircle, Heart, Users, Shield, Calendar, ArrowRight } from 'lucide-react'

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
  options?: string[]
  icon?: React.ReactNode
}

const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [showWidget, setShowWidget] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Conversation flow with icons for visual appeal
  const conversationFlow = [
    {
      message: "Hi there! 👋 Welcome to AdyaTribe - London's premier community for 30+ women! I'm here to help you discover how we can help you find your tribe.",
      options: ["Tell me more about AdyaTribe", "I'm looking for new friendships", "What makes you different?", "Just browsing for now"],
      icon: <Heart className="w-4 h-4 text-[#FF6B6B]" />
    },
    {
      message: "Brilliant! 🌟 AdyaTribe is a carefully curated, safe space where amazing women connect authentically. We focus on quality connections over quantity, with:",
      options: ["Safety sounds important", "What kind of events?", "How does verification work?", "Tell me about the community"],
      icon: <Shield className="w-4 h-4 text-[#4ECDC4]" />
    },
    {
      message: "Absolutely! Safety is our top priority. Here's what sets us apart:\n\n🛡️ Selfie verification for all members\n✅ Women-only verified spaces\n👥 Professional community moderation\n🎯 Age-verified (30+) community",
      options: ["That sounds perfect!", "What about interests & hobbies?", "How do I get verified?", "Any success stories?"],
      icon: <Shield className="w-4 h-4 text-[#4ECDC4]" />
    },
    {
      message: "We have 48 interest categories to help you find your perfect tribe! 🎨\n\n✨ Arts & Culture\n🍷 Food & Wine Experiences\n🏃‍♀️ Fitness & Wellness\n📚 Books & Learning\n🌍 Travel & Adventures\n💼 Career & Networking\n\nAnd so much more!",
      options: ["I love this variety!", "How do I join groups?", "What about local meetups?", "Membership options?"],
      icon: <Users className="w-4 h-4 text-purple-600" />
    },
    {
      message: "Perfect! 🎉 We offer flexible membership options:\n\n🆓 **Free**: Browse and basic connections\n⭐ **Core**: Full access to groups & events (£12/month)\n💎 **Premium**: Priority booking & exclusive events (£25/month)\n\nAll with London-focused meetups!",
      options: ["I'm interested in joining!", "Tell me about premium benefits", "Can I try it first?", "What's the signup process?"],
      icon: <Calendar className="w-4 h-4 text-[#FF6B6B]" />
    },
    {
      message: "Wonderful! 💫 Getting started is super simple:\n\n1️⃣ Quick 2-minute signup\n2️⃣ Choose your interests from 48 categories\n3️⃣ Quick selfie verification (takes 30 seconds)\n4️⃣ Start connecting with your tribe!\n\nReady to begin your journey?",
      options: ["Yes, let's do this!", "I have more questions", "Maybe later", "Take me to signup"],
      icon: <ArrowRight className="w-4 h-4 text-[#FF6B6B]" />
    }
  ]

  // Check if device is mobile
  const isMobile = () => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  // Always show widget, but control auto-popup behavior
  useEffect(() => {
    // Show widget immediately on load
    setShowWidget(true)
    
    // Auto-open only on desktop after 5 minutes
    if (!isMobile()) {
      const timer = setTimeout(() => {
        if (!hasInteracted) {
          setIsOpen(true)
          setTimeout(() => {
            addBotMessage(conversationFlow[0])
          }, 800)
        }
      }, 300000) // 5 minutes = 300000ms
      
      return () => clearTimeout(timer)
    }
  }, [hasInteracted])

  const addBotMessage = (step: typeof conversationFlow[0]) => {
    const newMessage: Message = {
      id: Date.now(),
      text: step.message,
      isBot: true,
      timestamp: new Date(),
      options: step.options,
      icon: step.icon
    }
    setMessages(prev => [...prev, newMessage])
  }

  const handleOptionClick = (option: string) => {
    setHasInteracted(true)
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: option,
      isBot: false,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    // Handle signup actions
    if (option.includes("let's do this") || option.includes("Take me to signup") || option.includes("interested in joining")) {
      setTimeout(() => {
        const finalMessage: Message = {
          id: Date.now() + 1,
          text: "Fantastic! 🚀 Welcome to your new community adventure!\n\nTaking you to the signup page now...",
          isBot: true,
          timestamp: new Date(),
          icon: <Heart className="w-4 h-4 text-[#FF6B6B]" />
        }
        setMessages(prev => [...prev, finalMessage])
        
        // Redirect to signup after showing message
        setTimeout(() => {
          window.open('/signup', '_blank')
        }, 2000)
      }, 1000)
      return
    }

    // Handle "maybe later" responses
    if (option.includes("Maybe later") || option.includes("Just browsing")) {
      setTimeout(() => {
        const laterMessage: Message = {
          id: Date.now() + 1,
          text: "No worries at all! 😊 I'll be here whenever you're ready to explore our amazing community. Feel free to browse our website and come back anytime!",
          isBot: true,
          timestamp: new Date(),
          icon: <Heart className="w-4 h-4 text-[#4ECDC4]" />
        }
        setMessages(prev => [...prev, laterMessage])
      }, 1000)
      return
    }

    // Progress through conversation
    setTimeout(() => {
      const nextStep = currentStep + 1
      if (nextStep < conversationFlow.length) {
        addBotMessage(conversationFlow[nextStep])
        setCurrentStep(nextStep)
      } else {
        // End of conversation - encourage signup
        const finalMessage: Message = {
          id: Date.now() + 1,
          text: "Thanks for chatting with me! 💕 AdyaTribe is here to help you find your perfect tribe in London. Ready to start your journey?",
          isBot: true,
          timestamp: new Date(),
          options: ["Yes, sign me up!", "I'll think about it"],
          icon: <Users className="w-4 h-4 text-[#FF6B6B]" />
        }
        setMessages(prev => [...prev, finalMessage])
      }
    }, 1500)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const toggleWidget = () => {
    setHasInteracted(true)
    if (!isOpen) {
      setIsOpen(true)
      setIsMinimized(false)
      if (messages.length === 0) {
        setTimeout(() => {
          addBotMessage(conversationFlow[0])
        }, 500)
      }
    } else {
      setIsMinimized(!isMinimized)
    }
  }

  const closeWidget = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  if (!showWidget) return null

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans">
      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 sm:w-96 lg:w-80 max-w-[calc(100vw-2rem)] max-h-[80vh] sm:max-h-[32rem] flex flex-col animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Heart className="w-5 h-5 text-[#FF6B6B]" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">AdyaTribe Helper</h3>
                <p className="text-xs opacity-90">Find your London tribe 💕</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleWidget}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Minimize"
              >
                <div className="w-4 h-1 bg-white rounded"></div>
              </button>
              <button
                onClick={closeWidget}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50 max-h-60 sm:max-h-80">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xs sm:max-w-sm ${
                  message.isBot 
                    ? 'bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm border border-gray-200' 
                    : 'bg-[#FF6B6B] text-white rounded-2xl rounded-br-md shadow-sm'
                } p-3`}>
                  {message.isBot && message.icon && (
                    <div className="flex items-center space-x-2 mb-2">
                      {message.icon}
                      <span className="text-xs font-medium text-gray-600">AdyaTribe Helper</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                  {message.options && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className="block w-full text-left p-2.5 text-xs bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white rounded-xl hover:from-[#E85A5A] hover:to-[#3BA99C] transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex items-center justify-center space-x-2 text-gray-500 text-xs">
              <MessageCircle className="w-4 h-4" />
              <span>Click the options above to continue chatting!</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleWidget}
        className={`w-16 h-16 bg-gradient-to-r from-[#FF6B6B] via-[#FF7F7F] to-[#4ECDC4] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden ${
          isOpen && !isMinimized ? 'scale-90' : 'scale-100 hover:scale-105'
        }`}
        aria-label="Open chat"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {isOpen && !isMinimized ? (
          <div className="w-6 h-1 bg-white rounded relative z-10"></div>
        ) : (
          <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-200 relative z-10" />
        )}
        
        {/* Notification Badge */}
        {!hasInteracted && !isOpen && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#FF6B6B] text-white text-xs rounded-full flex items-center justify-center animate-pulse font-bold shadow-lg">
            1
          </div>
        )}

        {/* Pulse animation ring */}
        {!hasInteracted && !isOpen && (
          <div className="absolute inset-0 rounded-full border-4 border-[#FF6B6B] animate-ping opacity-20"></div>
        )}
      </button>

      {/* Initial Welcome Tooltip */}
      {!hasInteracted && !isOpen && (
        <div className="absolute bottom-20 right-0 sm:bottom-20 bg-white p-3 sm:p-4 rounded-xl shadow-xl border border-gray-200 max-w-xs sm:max-w-xs animate-fade-in">
          <div className="text-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Heart className="w-4 h-4 text-[#FF6B6B]" />
              <strong className="text-[#FF6B6B]">Welcome to AdyaTribe!</strong>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Find your tribe in London! Chat with me to get started 💕
            </p>
            <div className="mt-2 text-xs text-[#4ECDC4] font-medium">
              Click to start →
            </div>
          </div>
          {/* Arrow pointing to button */}
          <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
          <div className="absolute -bottom-3 right-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-200"></div>
        </div>
      )}
    </div>
  )
}

export default WhatsAppWidget