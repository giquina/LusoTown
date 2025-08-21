import { NextResponse } from 'next/server'
import { buildPortugueseImageUrl, buildAvatarUrl } from '@/config/cdn'

// Mock data for feed posts
let feedPosts = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Maria Santos',
    userAvatar: buildAvatarUrl('1494790108755-2616b612b1ac'),
    content: 'Just attended the most amazing Fado night at A Toca! The music was incredible and I met so many wonderful people. #FadoNight #PortugueseCulture',
    createdAt: '2025-08-16T14:30:00Z',
    likes: 24,
    comments: 5,
    hashtags: ['FadoNight', 'PortugueseCulture'],
    linkedEvent: {
      id: 'event1',
      title: 'Noite de Fado & Vinho Verde',
      date: '2025-08-16',
      location: 'A Toca Restaurant, Stockwell'
    }
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Carlos Oliveira',
    userAvatar: buildAvatarUrl('1507003211169-0a1dd7228f2d'),
    content: 'Found this amazing pastelaria in Shoreditch that reminds me of home! Their pastéis de nata are authentic and delicious. Check it out!',
    imageUrl: buildPortugueseImageUrl('1574329818413-10376febd3f0'),
    createdAt: '2025-08-16T11:15:00Z',
    likes: 18,
    comments: 3,
    hashtags: ['Pastelaria', 'Shoreditch', 'Food'],
    linkedBusiness: {
      id: 'business1',
      name: 'Casa do Pão',
      category: 'Café & Bakery'
    }
  }
]

// GET /api/feed - Get all feed posts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get('limit') || '10'
  const offset = searchParams.get('offset') || '0'
  
  // In a real implementation, you would:
  // 1. Validate user authentication
  // 2. Fetch posts from database
  // 3. Apply filters/search parameters
  // 4. Paginate results
  
  const posts = feedPosts.slice(
    parseInt(offset),
    parseInt(offset) + parseInt(limit)
  )
  
  return NextResponse.json({
    posts,
    total: feedPosts.length,
    hasNext: parseInt(offset) + parseInt(limit) < feedPosts.length
  })
}

// POST /api/feed - Create a new feed post
export async function POST(request: Request) {
  const data = await request.json()
  
  // In a real implementation, you would:
  // 1. Validate user authentication
  // 2. Validate input data
  // 3. Save post to database
  // 4. Return created post
  
  const newPost = {
    id: `post-${Date.now()}`,
    userId: data.userId,
    userName: data.userName,
    userAvatar: data.userAvatar,
    content: data.content,
    imageUrl: data.imageUrl,
    createdAt: new Date().toISOString(),
    likes: 0,
    comments: 0,
    hashtags: data.hashtags || [],
    linkedEvent: data.linkedEvent,
    linkedBusiness: data.linkedBusiness
  }
  
  feedPosts.unshift(newPost)
  
  return NextResponse.json(newPost, { status: 201 })
}

// PUT /api/feed/[id]/like - Like a feed post
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { action } = await request.json()
  
  if (action === 'like') {
    const post = feedPosts.find(p => p.id === params.id)
    if (post) {
      post.likes += 1
      return NextResponse.json({ likes: post.likes })
    }
  }
  
  return NextResponse.json({ error: 'Post not found' }, { status: 404 })
}