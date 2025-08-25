import { NextResponse } from 'next/server'
import { buildPortugueseImageUrl } from '@/config/cdn'

// Mock data for user favorites
let userFavorites: Record<string, any[]> = {
  'user1': [
    {
      id: 'event1',
      type: 'event',
      title: 'Noite de Fado & Vinho Verde',
      description: 'Experience the soul of Portugal with traditional Fado music, Vinho Verde tasting, and authentic Portuguese cuisine.',
      imageUrl: buildPortugueseImageUrl('1493225457124-a3eb161ffa5f'),
      liked: true
    },
    {
      id: 'business1',
      type: 'business',
      title: 'Casa do Pão',
      description: 'Authentic Lusophone bakery and café in Shoreditch with the best pastéis de nata in London.',
      imageUrl: buildPortugueseImageUrl('1574329818413-10376febd3f0'),
      liked: true
    }
  ]
}

// GET /api/favorites - Get user favorites
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  
  if (!userId) {
    return NextResponse.json({ error: 'User ID required' }, { status: 400 })
  }
  
  const favorites = userFavorites[userId] || []
  
  return NextResponse.json({ favorites })
}

// POST /api/favorites - Add item to favorites
export async function POST(request: Request) {
  const { userId, item } = await request.json()
  
  if (!userId || !item) {
    return NextResponse.json({ error: 'User ID and item required' }, { status: 400 })
  }
  
  if (!userFavorites[userId]) {
    userFavorites[userId] = []
  }
  
  // Check if item already exists
  const exists = userFavorites[userId].some(fav => fav.id === item.id)
  
  if (!exists) {
    userFavorites[userId].push({
      ...item,
      liked: true,
      addedAt: new Date().toISOString()
    })
  }
  
  return NextResponse.json({ 
    success: true, 
    favorites: userFavorites[userId],
    added: !exists
  })
}

// DELETE /api/favorites/[id] - Remove item from favorites
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  
  if (!userId) {
    return NextResponse.json({ error: 'User ID required' }, { status: 400 })
  }
  
  if (userFavorites[userId]) {
    userFavorites[userId] = userFavorites[userId].filter(item => item.id !== params.id)
  }
  
  return NextResponse.json({ 
    success: true, 
    favorites: userFavorites[userId] || []
  })
}