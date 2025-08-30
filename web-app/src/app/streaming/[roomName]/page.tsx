import { Metadata } from 'next'
import { StreamViewer } from '@/components/streaming/StreamViewer'
import { notFound } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

interface Props {
  params: {
    roomName: string
  }
  searchParams: {
    category?: string
    title?: string
    description?: string
  }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const title = searchParams.title || 'Portuguese Community Stream'
  const description = searchParams.description || 'Join live Portuguese cultural streaming on LusoTown'
  
  return {
    title: `${title} | LusoTown Streaming`,
    description,
    openGraph: {
      title: `${title} | LusoTown`,
      description,
      images: ['/images/streaming-room-og.jpg'],
    }
  }
}

export default async function StreamRoomPage({ params, searchParams }: Props) {
  const supabase = createServerComponentClient({ cookies })
  
  // Check if room exists
  const { data: room, error } = await supabase
    .from('streaming_rooms')
    .select(`
      *,
      creator:profiles!creator_id(
        id,
        first_name,
        last_name,
        avatar_url
      )
    `)
    .eq('room_name', params.roomName)
    .single()

  if (error || !room) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <StreamViewer
        roomName={params.roomName}
        category={room.category}
        title={room.title}
        description={room.description}
      />
    </main>
  )
}