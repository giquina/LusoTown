import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { 
  TRANSPORT_SERVICES, 
  transportHelpers, 
  DRIVER_VERIFICATION,
  TRANSPORT_EMERGENCY 
} from '@/config/transport-services';

export interface TransportRequest {
  id?: string;
  user_id: string;
  service_type: string;
  pickup_location: {
    address: string;
    coordinates: [number, number];
  };
  dropoff_location: {
    address: string;
    coordinates: [number, number];
  };
  scheduled_datetime: string;
  passenger_count: number;
  special_requirements?: string;
  estimated_price: number;
  contact_info: {
    name: string;
    phone: string;
    email: string;
    emergency_contact: string;
  };
  additional_options: string[];
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  driver_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DriverProfile {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  email: string;
  languages: string[];
  vehicle_info: {
    make: string;
    model: string;
    year: number;
    color: string;
    license_plate: string;
    capacity: number;
  };
  verification_status: {
    university_verified: boolean;
    background_check: boolean;
    driving_record: boolean;
    vehicle_inspection: boolean;
    community_references: number;
  };
  service_areas: string[];
  available_services: string[];
  rating: number;
  total_trips: number;
  university_affiliation?: string;
  cultural_background: string[];
  emergency_contact: string;
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at: string;
}

// GET - Fetch transport requests or services
export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(request.url);
  
  const action = searchParams.get('action');
  const serviceId = searchParams.get('serviceId');
  const userId = searchParams.get('userId');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  try {
    const { data: { user } } = await supabase.auth.getUser();

    switch (action) {
      case 'services':
        // Return available transport services
        const userLocation = lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : null;
        
        let services = TRANSPORT_SERVICES.map(service => {
          let estimatedPrice = null;
          
          if (userLocation) {
            // Find nearest hub to estimate pricing
            const nearestHub = transportHelpers.findNearestHub(userLocation);
            if (nearestHub) {
              const distance = transportHelpers.calculateDistance(userLocation, nearestHub.location);
              const pricing = transportHelpers.calculateTransportPrice(service.id, distance, 1);
              estimatedPrice = pricing.totalPrice;
            }
          }
          
          return {
            ...service,
            estimatedPrice
          };
        });

        // Filter by service type if specified
        if (serviceId) {
          services = services.filter(s => s.id === serviceId || s.type === serviceId);
        }

        return NextResponse.json({
          services,
          userLocation: userLocation ? {
            nearbyAreas: userLocation ? transportHelpers.findPortugueseAreasNearLocation(userLocation, 10) : [],
            nearestHub: userLocation ? transportHelpers.findNearestHub(userLocation) : null
          } : null
        });

      case 'requests':
        if (!user) {
          return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
        }

        // Fetch user's transport requests
        const { data: requests, error: requestsError } = await supabase
          .from('transport_requests')
          .select(`
            *,
            driver:driver_profiles(name, phone, vehicle_info, rating)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (requestsError) throw requestsError;

        return NextResponse.json({ requests });

      case 'drivers':
        const serviceType = searchParams.get('serviceType');
        const area = searchParams.get('area');
        
        let driverQuery = supabase
          .from('driver_profiles')
          .select('*')
          .eq('status', 'active');

        if (serviceType) {
          driverQuery = driverQuery.contains('available_services', [serviceType]);
        }

        if (area) {
          driverQuery = driverQuery.contains('service_areas', [area]);
        }

        const { data: drivers, error: driversError } = await driverQuery
          .order('rating', { ascending: false })
          .limit(20);

        if (driversError) throw driversError;

        return NextResponse.json({ drivers });

      case 'quote':
        const fromLat = parseFloat(searchParams.get('fromLat') || '0');
        const fromLng = parseFloat(searchParams.get('fromLng') || '0');
        const toLat = parseFloat(searchParams.get('toLat') || '0');
        const toLng = parseFloat(searchParams.get('toLng') || '0');
        const passengers = parseInt(searchParams.get('passengers') || '1');
        const service = searchParams.get('service') || '';
        const options = searchParams.get('options')?.split(',') || [];

        if (!fromLat || !fromLng || !toLat || !toLng || !service) {
          return NextResponse.json({ error: 'Missing required location or service parameters' }, { status: 400 });
        }

        const distance = transportHelpers.calculateDistance(
          { lat: fromLat, lng: fromLng },
          { lat: toLat, lng: toLng }
        );

        const pricing = transportHelpers.calculateTransportPrice(service, distance, passengers, options);

        return NextResponse.json({
          distance: Math.round(distance * 10) / 10, // Round to 1 decimal place
          estimatedDuration: Math.round(distance * 2.5), // Rough estimate: 2.5 minutes per km
          pricing
        });

      default:
        return NextResponse.json({ error: 'Invalid action specified' }, { status: 400 });
    }

  } catch (error) {
    console.error('Transport GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create transport request
export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const {
      service_type,
      pickup_location,
      dropoff_location,
      scheduled_datetime,
      passenger_count,
      special_requirements,
      contact_info,
      additional_options = []
    } = body as Omit<TransportRequest, 'id' | 'user_id' | 'estimated_price' | 'status' | 'created_at' | 'updated_at'>;

    // Validate required fields
    if (!service_type || !pickup_location || !dropoff_location || !scheduled_datetime || !contact_info) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate service type exists
    const service = TRANSPORT_SERVICES.find(s => s.id === service_type || s.type === service_type);
    if (!service) {
      return NextResponse.json({ error: 'Invalid service type' }, { status: 400 });
    }

    // Calculate distance and pricing
    const distance = transportHelpers.calculateDistance(
      { lat: pickup_location.coordinates[1], lng: pickup_location.coordinates[0] },
      { lat: dropoff_location.coordinates[1], lng: dropoff_location.coordinates[0] }
    );

    const pricing = transportHelpers.calculateTransportPrice(
      service_type,
      distance,
      passenger_count || 1,
      additional_options
    );

    // Create transport request
    const transportRequest: Omit<TransportRequest, 'id'> = {
      user_id: user.id,
      service_type,
      pickup_location,
      dropoff_location,
      scheduled_datetime,
      passenger_count: passenger_count || 1,
      special_requirements,
      estimated_price: pricing.totalPrice,
      contact_info,
      additional_options,
      status: 'pending'
    };

    const { data: newRequest, error: insertError } = await supabase
      .from('transport_requests')
      .insert(transportRequest)
      .select()
      .single();

    if (insertError) throw insertError;

    // Find and notify available drivers
    const { data: availableDrivers } = await supabase
      .from('driver_profiles')
      .select('*')
      .eq('status', 'active')
      .contains('available_services', [service_type])
      .overlaps('service_areas', [pickup_location.address.split(',').pop()?.trim() || 'London']);

    // In a real implementation, you'd send notifications to drivers here
    // For now, we'll just log the available drivers
    console.log(`Found ${availableDrivers?.length || 0} available drivers for request ${newRequest.id}`);

    // Send confirmation email/SMS to user (implement with actual service)
    const confirmationMessage = {
      to: contact_info.email,
      subject: 'LusoTown Transport Request Confirmation',
      message: `Your transport request has been submitted. Request ID: ${newRequest.id}`
    };

    return NextResponse.json({
      success: true,
      request: newRequest,
      pricing,
      availableDrivers: availableDrivers?.length || 0,
      message: 'Transport request submitted successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Transport POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create transport request' },
      { status: 500 }
    );
  }
}

// PUT - Update transport request status
export async function PUT(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { requestId, status, driverId, notes } = body;

    if (!requestId || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const updateData: any = {
      status,
      updated_at: new Date().toISOString()
    };

    if (driverId) {
      updateData.driver_id = driverId;
    }

    if (notes) {
      updateData.notes = notes;
    }

    const { data: updatedRequest, error: updateError } = await supabase
      .from('transport_requests')
      .update(updateData)
      .eq('id', requestId)
      .eq('user_id', user.id) // Ensure user can only update their own requests
      .select()
      .single();

    if (updateError) throw updateError;

    return NextResponse.json({
      success: true,
      request: updatedRequest
    });

  } catch (error) {
    console.error('Transport PUT error:', error);
    return NextResponse.json(
      { error: 'Failed to update transport request' },
      { status: 500 }
    );
  }
}

// DELETE - Cancel transport request
export async function DELETE(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get('requestId');

    if (!requestId) {
      return NextResponse.json({ error: 'Request ID required' }, { status: 400 });
    }

    // Check if request exists and belongs to user
    const { data: existingRequest, error: fetchError } = await supabase
      .from('transport_requests')
      .select('*')
      .eq('id', requestId)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingRequest) {
      return NextResponse.json({ error: 'Transport request not found' }, { status: 404 });
    }

    // Only allow cancellation if request is not already completed
    if (existingRequest.status === 'completed') {
      return NextResponse.json({ error: 'Cannot cancel completed request' }, { status: 400 });
    }

    // Update status to cancelled instead of deleting
    const { error: cancelError } = await supabase
      .from('transport_requests')
      .update({
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('id', requestId);

    if (cancelError) throw cancelError;

    return NextResponse.json({
      success: true,
      message: 'Transport request cancelled successfully'
    });

  } catch (error) {
    console.error('Transport DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to cancel transport request' },
      { status: 500 }
    );
  }
}