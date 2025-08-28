import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import logger from '@/utils/logger';

export const dynamic = 'force-dynamic';

// POST /api/events/[id]/booking - Book Portuguese cultural event
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies });

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const eventId = params.id;
    const body = await request.json();
    const { participants = 1, special_requirements, emergency_contact } = body;

    // Get event details
    const { data: event, error: eventError } = await supabase
      .from('portuguese_events')
      .select('*')
      .eq('id', eventId)
      .eq('is_active', true)
      .single();

    if (eventError || !event) {
      return NextResponse.json({ error: 'Event not found or inactive' }, { status: 404 });
    }

    // Check if event requires booking
    if (!event.requires_booking) {
      return NextResponse.json({ 
        error: 'This event does not require advance booking' 
      }, { status: 400 });
    }

    // Check booking deadline
    if (event.booking_deadline && new Date() > new Date(event.booking_deadline)) {
      return NextResponse.json({ 
        error: 'Booking deadline has passed' 
      }, { status: 400 });
    }

    // Check capacity
    if (event.max_participants && (event.current_participants + participants) > event.max_participants) {
      return NextResponse.json({ 
        error: 'Not enough spots available' 
      }, { status: 400 });
    }

    // Check if user already booked
    const { data: existingBooking } = await supabase
      .from('event_bookings')
      .select('id')
      .eq('event_id', eventId)
      .eq('user_id', user.id)
      .eq('status', 'confirmed')
      .single();

    if (existingBooking) {
      return NextResponse.json({ 
        error: 'You have already booked this event' 
      }, { status: 400 });
    }

    // Get user profile for booking details
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('first_name, last_name, phone, preferred_language')
      .eq('id', user.id)
      .single();

    // Create booking
    const bookingData = {
      event_id: eventId,
      user_id: user.id,
      participants_count: participants,
      special_requirements,
      emergency_contact,
      attendee_details: {
        name: `${userProfile?.first_name || ''} ${userProfile?.last_name || ''}`.trim(),
        email: user.email,
        phone: userProfile?.phone,
        preferred_language: userProfile?.preferred_language || 'pt'
      },
      booking_reference: `LT-${Date.now()}-${eventId.slice(-6)}`,
      status: 'confirmed',
      booked_at: new Date().toISOString()
    };

    const { data: booking, error: bookingError } = await supabase
      .from('event_bookings')
      .insert(bookingData)
      .select(`
        *,
        event:portuguese_events!event_id(
          id,
          title,
          event_date,
          event_time,
          location_pt,
          location_en,
          contact_info
        )
      `)
      .single();

    if (bookingError) {
      logger.error('Event booking failed', bookingError, {
        area: 'events',
        action: 'create_booking',
        culturalContext: 'portuguese',
        userId: user.id,
        eventId
      });
      return NextResponse.json({ 
        error: 'Failed to create booking' 
      }, { status: 500 });
    }

    // Update event participant count
    const { error: updateError } = await supabase
      .from('portuguese_events')
      .update({ 
        current_participants: event.current_participants + participants 
      })
      .eq('id', eventId);

    if (updateError) {
      logger.warn('Failed to update participant count', updateError, {
        area: 'events',
        action: 'update_participants',
        eventId
      });
    }

    // Send confirmation (in real implementation, this would send email/SMS)
    logger.info('Portuguese event booking confirmed', {
      area: 'events',
      action: 'booking_confirmed',
      culturalContext: 'portuguese',
      userId: user.id,
      eventId,
      bookingReference: booking.booking_reference,
      participants
    });

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        booking_reference: booking.booking_reference,
        status: booking.status,
        participants_count: booking.participants_count,
        event: {
          title: booking.event.title,
          date: booking.event.event_date,
          time: booking.event.event_time,
          location: booking.event.location_pt || booking.event.location_en
        }
      },
      message: 'Booking confirmed successfully',
      nextSteps: [
        'Check your email for confirmation details',
        'Add the event to your calendar',
        'Contact the organizer if you have questions',
        'Arrive 15 minutes early on the event day'
      ]
    }, { status: 201 });

  } catch (error) {
    logger.error('Event booking API error', error, {
      area: 'events',
      action: 'booking_api_post',
      culturalContext: 'portuguese'
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/events/[id]/booking - Get user's booking for this event
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies });

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const eventId = params.id;

    // Get user's booking for this event
    const { data: booking, error } = await supabase
      .from('event_bookings')
      .select(`
        *,
        event:portuguese_events!event_id(
          id,
          title,
          description,
          event_date,
          event_time,
          location_pt,
          location_en,
          contact_info
        )
      `)
      .eq('event_id', eventId)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      logger.error('Failed to fetch event booking', error, {
        area: 'events',
        action: 'fetch_booking',
        userId: user.id,
        eventId
      });
      return NextResponse.json({ error: 'Failed to fetch booking' }, { status: 500 });
    }

    return NextResponse.json({
      booking: booking || null,
      hasBooking: !!booking
    });

  } catch (error) {
    logger.error('Event booking API GET error', error, {
      area: 'events',
      action: 'booking_api_get',
      culturalContext: 'portuguese'
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/events/[id]/booking - Cancel booking
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies });

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const eventId = params.id;

    // Get existing booking
    const { data: booking, error: fetchError } = await supabase
      .from('event_bookings')
      .select('*, event:portuguese_events!event_id(event_date, current_participants)')
      .eq('event_id', eventId)
      .eq('user_id', user.id)
      .eq('status', 'confirmed')
      .single();

    if (fetchError || !booking) {
      return NextResponse.json({ error: 'No confirmed booking found' }, { status: 404 });
    }

    // Check if event is today or has passed
    const eventDate = new Date(booking.event.event_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (eventDate <= today) {
      return NextResponse.json({ 
        error: 'Cannot cancel booking on the day of the event or after it has passed' 
      }, { status: 400 });
    }

    // Cancel booking
    const { error: cancelError } = await supabase
      .from('event_bookings')
      .update({ 
        status: 'cancelled',
        cancelled_at: new Date().toISOString()
      })
      .eq('id', booking.id);

    if (cancelError) {
      logger.error('Booking cancellation failed', cancelError, {
        area: 'events',
        action: 'cancel_booking',
        userId: user.id,
        bookingId: booking.id
      });
      return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 });
    }

    // Update event participant count
    const { error: updateError } = await supabase
      .from('portuguese_events')
      .update({ 
        current_participants: Math.max(0, booking.event.current_participants - booking.participants_count)
      })
      .eq('id', eventId);

    if (updateError) {
      logger.warn('Failed to update participant count after cancellation', updateError, {
        area: 'events',
        action: 'update_participants_cancel',
        eventId
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Booking cancelled successfully'
    });

  } catch (error) {
    logger.error('Event booking cancellation API error', error, {
      area: 'events',
      action: 'booking_cancel_api',
      culturalContext: 'portuguese'
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}