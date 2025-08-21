'use client'

import { useState } from 'react'
import { useWaitingList } from '@/context/WaitingListContext'
import { useLanguage } from '@/context/LanguageContext'
import { toast } from 'react-hot-toast'

interface Event {
  id: number
  title: string
  date: string
  time: string
  maxAttendees: number
  attendees: number
}

export function useWaitingListActions() {
  const { addToWaitingList, getWaitingListCount, isOnWaitingList } = useWaitingList()
  const { language } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const openWaitingListModal = (event: Event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const closeWaitingListModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  const handleWaitingListSuccess = () => {
    toast.success(
      language === 'pt' 
        ? 'Adicionado à lista de espera com sucesso!'
        : 'Successfully added to waiting list!',
      {
        icon: '✅',
        duration: 5000,
      }
    )
  }

  const checkIfOnWaitingList = (eventId: number, email?: string) => {
    if (!email) return false
    return isOnWaitingList(eventId, email)
  }

  const getWaitingListInfo = (eventId: number) => {
    const count = getWaitingListCount(eventId)
    return {
      count,
      message: language === 'pt' 
        ? `${count} ${count === 1 ? 'pessoa na' : 'pessoas na'} lista de espera`
        : `${count} ${count === 1 ? 'person' : 'people'} on waiting list`
    }
  }

  const isEventFull = (event: Event) => {
    return event.attendees >= event.maxAttendees
  }

  const getSpotsLeft = (event: Event) => {
    return Math.max(0, event.maxAttendees - event.attendees)
  }

  const getBookingStatus = (event: Event) => {
    const spotsLeft = getSpotsLeft(event)
    const waitingListCount = getWaitingListCount(event.id)

    if (spotsLeft > 0) {
      return {
        status: 'available' as const,
        spotsLeft,
        canBook: true,
        showWaitingList: false,
        waitingListCount
      }
    } else {
      return {
        status: 'full' as const,
        spotsLeft: 0,
        canBook: false,
        showWaitingList: true,
        waitingListCount
      }
    }
  }

  const getStatusMessages = (event: Event) => {
    const bookingStatus = getBookingStatus(event)
    
    if (bookingStatus.status === 'available') {
      return {
        primary: language === 'pt' ? 'Disponível para reserva' : 'Available to book',
        secondary: language === 'pt' 
          ? `${bookingStatus.spotsLeft} ${bookingStatus.spotsLeft === 1 ? 'vaga restante' : 'vagas restantes'}`
          : `${bookingStatus.spotsLeft} ${bookingStatus.spotsLeft === 1 ? 'spot' : 'spots'} left`,
        buttonText: language === 'pt' ? `Reservar Agora - £${event.price || 0}` : `Book Now - £${event.price || 0}`,
        buttonAction: 'book' as const
      }
    } else {
      return {
        primary: language === 'pt' ? 'Completo' : 'Fully booked',
        secondary: language === 'pt' 
          ? `${bookingStatus.waitingListCount} na lista de espera`
          : `${bookingStatus.waitingListCount} on waiting list`,
        buttonText: language === 'pt' ? 'Juntar à Lista de Espera' : 'Join Waiting List',
        buttonAction: 'waitlist' as const
      }
    }
  }

  return {
    // Modal state
    isModalOpen,
    selectedEvent,
    openWaitingListModal,
    closeWaitingListModal,
    
    // Actions
    handleWaitingListSuccess,
    checkIfOnWaitingList,
    
    // Information getters
    getWaitingListInfo,
    isEventFull,
    getSpotsLeft,
    getBookingStatus,
    getStatusMessages,
    
    // Direct access to context functions
    getWaitingListCount,
    isOnWaitingList,
    addToWaitingList
  }
}

export default useWaitingListActions