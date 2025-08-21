'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface WaitingListEntry {
  id: string
  eventId: number
  name: string
  email: string
  phone: string
  portuguesePreference?: 'portuguese' | 'english' | 'both'
  eventSpecificQuestions?: string
  agreedToPrivacy: boolean
  joinedAt: Date
  notificationPreference?: 'email' | 'phone' | 'both'
}

interface WaitingListContextType {
  entries: WaitingListEntry[]
  addToWaitingList: (entry: Omit<WaitingListEntry, 'id' | 'joinedAt'>) => Promise<void>
  getWaitingListCount: (eventId: number) => number
  getWaitingListPosition: (eventId: number, email: string) => number
  removeFromWaitingList: (eventId: number, email: string) => void
  isOnWaitingList: (eventId: number, email: string) => boolean
  getWaitingListForEvent: (eventId: number) => WaitingListEntry[]
}

const WaitingListContext = createContext<WaitingListContextType | undefined>(undefined)

export function WaitingListProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<WaitingListEntry[]>([])

  // Load waiting list entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('lusotown-waiting-list')
    if (savedEntries) {
      try {
        const parsed = JSON.parse(savedEntries)
        // Convert joinedAt strings back to Date objects
        const entriesWithDates = parsed.map((entry: any) => ({
          ...entry,
          joinedAt: new Date(entry.joinedAt)
        }))
        setEntries(entriesWithDates)
      } catch (error) {
        console.error('Error loading waiting list from localStorage:', error)
      }
    }
  }, [])

  // Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('lusotown-waiting-list', JSON.stringify(entries))
  }, [entries])

  const addToWaitingList = async (entry: Omit<WaitingListEntry, 'id' | 'joinedAt'>) => {
    // Check if user is already on waiting list for this event
    const existingEntry = entries.find(
      e => e.eventId === entry.eventId && e.email.toLowerCase() === entry.email.toLowerCase()
    )

    if (existingEntry) {
      throw new Error('You are already on the waiting list for this event')
    }

    const newEntry: WaitingListEntry = {
      ...entry,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      joinedAt: new Date()
    }

    setEntries(prev => [...prev, newEntry])
  }

  const getWaitingListCount = (eventId: number): number => {
    return entries.filter(entry => entry.eventId === eventId).length
  }

  const getWaitingListPosition = (eventId: number, email: string): number => {
    const eventEntries = entries
      .filter(entry => entry.eventId === eventId)
      .sort((a, b) => a.joinedAt.getTime() - b.joinedAt.getTime())
    
    const position = eventEntries.findIndex(
      entry => entry.email.toLowerCase() === email.toLowerCase()
    )
    
    return position === -1 ? 0 : position + 1
  }

  const removeFromWaitingList = (eventId: number, email: string) => {
    setEntries(prev => 
      prev.filter(entry => 
        !(entry.eventId === eventId && entry.email.toLowerCase() === email.toLowerCase())
      )
    )
  }

  const isOnWaitingList = (eventId: number, email: string): boolean => {
    return entries.some(
      entry => entry.eventId === eventId && entry.email.toLowerCase() === email.toLowerCase()
    )
  }

  const getWaitingListForEvent = (eventId: number): WaitingListEntry[] => {
    return entries
      .filter(entry => entry.eventId === eventId)
      .sort((a, b) => a.joinedAt.getTime() - b.joinedAt.getTime())
  }

  const value: WaitingListContextType = {
    entries,
    addToWaitingList,
    getWaitingListCount,
    getWaitingListPosition,
    removeFromWaitingList,
    isOnWaitingList,
    getWaitingListForEvent
  }

  return (
    <WaitingListContext.Provider value={value}>
      {children}
    </WaitingListContext.Provider>
  )
}

export function useWaitingList() {
  const context = useContext(WaitingListContext)
  if (context === undefined) {
    throw new Error('useWaitingList must be used within a WaitingListProvider')
  }
  return context
}

export default WaitingListContext