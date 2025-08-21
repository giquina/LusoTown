import { NextRequest, NextResponse } from 'next/server'

// Demo API route for testing messaging system without full database setup
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')
  const targetUserId = searchParams.get('targetUserId')

  try {
    switch (action) {
      case 'permissions':
        // Mock permission check
        return NextResponse.json({
          can_message: true,
          has_mutual_match: Math.random() > 0.5,
          has_event_permission: Math.random() > 0.5,
          shared_events_count: Math.floor(Math.random() * 3),
          reasons: ['mutual_match']
        })

      case 'conversations':
        // Mock conversations list
        const mockConversations = [
          {
            id: '1',
            participant_ids: ['user1', 'user2'],
            connection_type: 'mutual_match',
            is_active: true,
            last_activity_at: new Date().toISOString(),
            created_at: new Date(Date.now() - 86400000).toISOString(),
            other_participant: {
              id: 'user2',
              first_name: 'Maria',
              last_name: 'Silva',
              profile_picture_url: '/images/avatars/maria.jpg',
              location: 'London, UK',
              verification_status: 'verified'
            },
            last_message: {
              id: 'msg1',
              content: 'Olá! Como está?',
              sender_id: 'user2',
              created_at: new Date(Date.now() - 3600000).toISOString(),
              is_read: false,
              approval_status: 'auto_approved'
            },
            unread_count: 1
          },
          {
            id: '2',
            participant_ids: ['user1', 'user3'],
            connection_type: 'event_based',
            is_active: true,
            last_activity_at: new Date(Date.now() - 172800000).toISOString(),
            created_at: new Date(Date.now() - 259200000).toISOString(),
            other_participant: {
              id: 'user3',
              first_name: 'João',
              last_name: 'Santos',
              profile_picture_url: '/images/avatars/joao.jpg',
              location: 'London, UK',
              verification_status: 'verified'
            },
            last_message: {
              id: 'msg2',
              content: 'Foi muito bom conhecê-lo no evento!',
              sender_id: 'user1',
              created_at: new Date(Date.now() - 172800000).toISOString(),
              is_read: true,
              approval_status: 'auto_approved'
            },
            unread_count: 0
          },
          {
            id: '3',
            participant_ids: ['user1', 'user4'],
            connection_type: 'mutual_match',
            is_active: true,
            last_activity_at: new Date(Date.now() - 432000000).toISOString(),
            created_at: new Date(Date.now() - 518400000).toISOString(),
            other_participant: {
              id: 'user4',
              first_name: 'Ana',
              last_name: 'Costa',
              profile_picture_url: '/images/avatars/ana.jpg',
              location: 'London, UK',
              verification_status: 'verified'
            },
            last_message: {
              id: 'msg3',
              content: 'Qual é o seu restaurante português favorito em Londres?',
              sender_id: 'user4',
              created_at: new Date(Date.now() - 432000000).toISOString(),
              is_read: true,
              approval_status: 'auto_approved'
            },
            unread_count: 0
          }
        ]
        return NextResponse.json(mockConversations)

      case 'messages':
        const conversationId = searchParams.get('conversationId')
        // Mock messages for a conversation
        const mockMessages = [
          {
            id: 'msg1',
            conversation_id: conversationId,
            sender_id: 'user2',
            receiver_id: 'user1',
            content: 'Olá! Tudo bem?',
            message_type: 'text',
            approval_status: 'auto_approved',
            is_read: true,
            is_blocked: false,
            safety_score: 100,
            contains_contact_info: false,
            created_at: new Date(Date.now() - 7200000).toISOString(),
            sender: {
              id: 'user2',
              first_name: 'Maria',
              last_name: 'Silva',
              profile_picture_url: '/images/avatars/maria.jpg'
            }
          },
          {
            id: 'msg2',
            conversation_id: conversationId,
            sender_id: 'user1',
            receiver_id: 'user2',
            content: 'Olá Maria! Tudo óptimo, obrigado. E contigo?',
            message_type: 'text',
            approval_status: 'auto_approved',
            is_read: true,
            is_blocked: false,
            safety_score: 100,
            contains_contact_info: false,
            created_at: new Date(Date.now() - 3600000).toISOString(),
            sender: {
              id: 'user1',
              first_name: 'You',
              last_name: '',
              profile_picture_url: '/images/avatars/default.jpg'
            }
          },
          {
            id: 'msg3',
            conversation_id: conversationId,
            sender_id: 'user2',
            receiver_id: 'user1',
            content: 'Também está tudo bem! Gostava de saber se conhece algum bom restaurante português por aqui?',
            message_type: 'text',
            approval_status: 'auto_approved',
            is_read: false,
            is_blocked: false,
            safety_score: 100,
            contains_contact_info: false,
            created_at: new Date(Date.now() - 1800000).toISOString(),
            sender: {
              id: 'user2',
              first_name: 'Maria',
              last_name: 'Silva',
              profile_picture_url: '/images/avatars/maria.jpg'
            }
          }
        ]
        return NextResponse.json(mockMessages)

      case 'matches':
        // Mock mutual matches
        const mockMatches = [
          {
            id: 'match1',
            user_id: 'user1',
            target_user_id: 'user2',
            match_type: 'compatibility',
            compatibility_score: 87,
            shared_interests: ['Portuguese culture', 'Football', 'Food'],
            status: 'liked',
            is_mutual: true,
            mutual_matched_at: new Date().toISOString(),
            target_user: {
              id: 'user2',
              first_name: 'Maria',
              last_name: 'Silva',
              profile_picture_url: '/images/avatars/maria.jpg',
              location: 'London, UK',
              membership_tier: 'community'
            }
          },
          {
            id: 'match2',
            user_id: 'user1',
            target_user_id: 'user4',
            match_type: 'cultural',
            compatibility_score: 92,
            shared_interests: ['Portuguese culture', 'Music', 'Events'],
            status: 'liked',
            is_mutual: true,
            mutual_matched_at: new Date(Date.now() - 86400000).toISOString(),
            target_user: {
              id: 'user4',
              first_name: 'Ana',
              last_name: 'Costa',
              profile_picture_url: '/images/avatars/ana.jpg',
              location: 'London, UK',
              membership_tier: 'cultural_ambassador'
            }
          }
        ]
        return NextResponse.json(mockMatches)

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Demo API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, conversationId, content, targetUserId } = body

    switch (action) {
      case 'send_message':
        // Mock sending a message
        const newMessage = {
          id: `msg_${Date.now()}`,
          conversation_id: conversationId,
          sender_id: 'user1',
          receiver_id: targetUserId,
          content,
          message_type: 'text',
          approval_status: 'auto_approved',
          is_read: false,
          is_blocked: false,
          safety_score: 100,
          contains_contact_info: false,
          created_at: new Date().toISOString(),
          sender: {
            id: 'user1',
            first_name: 'You',
            last_name: '',
            profile_picture_url: '/images/avatars/default.jpg'
          }
        }
        return NextResponse.json(newMessage)

      case 'create_conversation':
        // Mock creating a conversation
        const newConversation = {
          id: `conv_${Date.now()}`,
          participant_ids: ['user1', targetUserId],
          connection_type: 'mutual_match',
          is_active: true,
          last_activity_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        }
        return NextResponse.json(newConversation)

      case 'like_user':
        // Mock liking a user
        const likeResult = {
          id: `match_${Date.now()}`,
          user_id: 'user1',
          target_user_id: targetUserId,
          status: 'liked',
          is_mutual: Math.random() > 0.7, // 30% chance of immediate mutual match
          created_at: new Date().toISOString()
        }
        return NextResponse.json(likeResult)

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Demo API POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}