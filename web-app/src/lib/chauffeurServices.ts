import { supabase } from './supabase'
import type {
  ChauffeurService,
  ChauffeurVehicle,
  ChauffeurDriver,
  ChauffeurPricingTier,
  ChauffeurPeakTime,
  ChauffeurBooking,
  ChauffeurAvailability,
  PricingCalculationRequest,
  PricingCalculationResult
} from './supabase'

// Service fetching functions
export const getChauffeurServices = async (): Promise<ChauffeurService[]> => {
  try {
    const { data, error } = await supabase
      .from('chauffeur_services')
      .select('*')
      .eq('is_active', true)
      .order('service_name')

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching chauffeur services:', error)
    return []
  }
}

export const getChauffeurVehicles = async (): Promise<ChauffeurVehicle[]> => {
  try {
    const { data, error } = await supabase
      .from('chauffeur_vehicles')
      .select('*')
      .eq('is_active', true)
      .order('category', { ascending: false })
      .order('make')

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching chauffeur vehicles:', error)
    return []
  }
}

export const getChauffeurDrivers = async (languages?: string[]): Promise<ChauffeurDriver[]> => {
  try {
    let query = supabase
      .from('chauffeur_drivers')
      .select('*')
      .eq('is_active', true)

    if (languages && languages.length > 0) {
      query = query.overlaps('languages_spoken', languages)
    }

    const { data, error } = await query.order('years_experience', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching chauffeur drivers:', error)
    return []
  }
}

export const getPricingTiers = async (): Promise<ChauffeurPricingTier[]> => {
  try {
    const { data, error } = await supabase
      .from('chauffeur_pricing_tiers')
      .select('*')
      .eq('is_active', true)
      .order('block_hours_min')

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching pricing tiers:', error)
    return []
  }
}

export const getPeakTimes = async (): Promise<ChauffeurPeakTime[]> => {
  try {
    const { data, error } = await supabase
      .from('chauffeur_peak_times')
      .select('*')
      .eq('is_active', true)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching peak times:', error)
    return []
  }
}

// Availability checking
export const checkAvailability = async (
  datetime: string,
  hours: number,
  vehicleId?: string,
  driverId?: string
): Promise<{ available: boolean; conflicts?: string[] }> => {
  try {
    const endDatetime = new Date(datetime)
    endDatetime.setHours(endDatetime.getHours() + hours)

    let query = supabase
      .from('chauffeur_availability')
      .select('*')
      .neq('availability_type', 'available')
      .lte('start_datetime', endDatetime.toISOString())
      .gte('end_datetime', datetime)

    if (vehicleId) {
      query = query.eq('vehicle_id', vehicleId)
    }

    if (driverId) {
      query = query.eq('driver_id', driverId)
    }

    const { data: conflicts, error } = await query

    if (error) throw error

    return {
      available: !conflicts || conflicts.length === 0,
      conflicts: conflicts?.map(c => c.notes || 'Unavailable') || []
    }
  } catch (error) {
    console.error('Error checking availability:', error)
    return { available: false, conflicts: ['Error checking availability'] }
  }
}

// Advanced pricing calculation engine
export const calculatePricing = async (
  request: PricingCalculationRequest
): Promise<PricingCalculationResult> => {
  try {
    // Fetch service details
    const { data: service } = await supabase
      .from('chauffeur_services')
      .select('*')
      .eq('id', request.service_id)
      .single()

    if (!service) {
      throw new Error('Service not found')
    }

    // Fetch vehicle details if specified
    let vehicle = null
    if (request.vehicle_id) {
      const { data: vehicleData } = await supabase
        .from('chauffeur_vehicles')
        .select('*')
        .eq('id', request.vehicle_id)
        .single()
      vehicle = vehicleData
    }

    // Fetch driver details if specified
    let driver = null
    if (request.driver_id) {
      const { data: driverData } = await supabase
        .from('chauffeur_drivers')
        .select('*')
        .eq('id', request.driver_id)
        .single()
      driver = driverData
    }

    // Fetch pricing tiers and peak times
    const [pricingTiers, peakTimes] = await Promise.all([
      getPricingTiers(),
      getPeakTimes()
    ])

    // Initialize pricing calculation
    const breakdown: { description: string; amount: number; type: 'charge' | 'discount' }[] = []
    let subtotal = 0
    let baseRate = service.base_hourly_rate
    let hours = request.hours

    // Determine if day rate applies
    let dayRateApplied = false
    if (
      request.booking_type === 'day_rate' ||
      (service.day_rate && hours >= service.minimum_day_hours)
    ) {
      dayRateApplied = true
      baseRate = service.day_rate || service.base_hourly_rate * service.minimum_day_hours
      hours = 1 // Day rate is flat
      breakdown.push({
        description: `Day Rate (${service.minimum_day_hours}+ hours)`,
        amount: baseRate,
        type: 'charge'
      })
    } else {
      // Ensure minimum hours
      hours = Math.max(hours, service.minimum_hours)
      subtotal = baseRate * hours
      breakdown.push({
        description: `Base Rate (${hours} hours @ £${baseRate}/hr)`,
        amount: subtotal,
        type: 'charge'
      })
    }

    if (dayRateApplied) {
      subtotal = baseRate
    }

    // Apply call-out fee
    const callOutFee = service.call_out_fee
    if (callOutFee > 0) {
      breakdown.push({
        description: 'Call-out Fee',
        amount: callOutFee,
        type: 'charge'
      })
    }

    // Calculate peak time charges
    const pickupDate = new Date(request.pickup_datetime)
    const pickupDay = pickupDate.getDay()
    const pickupTime = pickupDate.toTimeString().substr(0, 5)

    let peakTimeCharges = 0
    for (const peakTime of peakTimes) {
      if (
        peakTime.days_of_week.includes(pickupDay) &&
        pickupTime >= peakTime.start_time &&
        pickupTime <= peakTime.end_time
      ) {
        const peakCharge = subtotal * (peakTime.multiplier - 1)
        peakTimeCharges += peakCharge
        breakdown.push({
          description: `Peak Time: ${peakTime.name} (+${((peakTime.multiplier - 1) * 100).toFixed(0)}%)`,
          amount: peakCharge,
          type: 'charge'
        })
        break // Apply only the first matching peak time
      }
    }

    // Calculate block booking discount
    let blockDiscount = { applicable: false, percentage: 0, amount: 0 }
    if (request.booking_type === 'block_booking') {
      for (const tier of pricingTiers.sort((a, b) => b.block_hours_min - a.block_hours_min)) {
        if (
          request.hours >= tier.block_hours_min &&
          (!tier.block_hours_max || request.hours <= tier.block_hours_max)
        ) {
          blockDiscount = {
            applicable: true,
            percentage: tier.discount_percentage,
            amount: subtotal * (tier.discount_percentage / 100)
          }
          breakdown.push({
            description: `${tier.tier_name} Discount (-${tier.discount_percentage}%)`,
            amount: blockDiscount.amount,
            type: 'discount'
          })
          break
        }
      }
    }

    // Vehicle premium
    const vehiclePremium = vehicle?.hourly_rate_premium || 0
    if (vehiclePremium > 0) {
      const vehicleCharge = vehiclePremium * (dayRateApplied ? service.minimum_day_hours : hours)
      breakdown.push({
        description: `${vehicle?.make} ${vehicle?.model} Premium`,
        amount: vehicleCharge,
        type: 'charge'
      })
    }

    // Driver premium
    const driverPremium = driver?.hourly_rate_premium || 0
    if (driverPremium > 0) {
      const driverCharge = driverPremium * (dayRateApplied ? service.minimum_day_hours : hours)
      breakdown.push({
        description: `Specialist Driver Premium`,
        amount: driverCharge,
        type: 'charge'
      })
    }

    // Member discount
    const memberDiscountRates = {
      free: 0,
      core: 5,
      premium: 10
    }
    const memberDiscountPercentage = memberDiscountRates[request.membership_tier || 'free']
    let memberDiscount = { applicable: false, percentage: 0, amount: 0 }
    
    if (memberDiscountPercentage > 0) {
      const discountBase = subtotal + peakTimeCharges + vehiclePremium + driverPremium - blockDiscount.amount
      memberDiscount = {
        applicable: true,
        percentage: memberDiscountPercentage,
        amount: discountBase * (memberDiscountPercentage / 100)
      }
      breakdown.push({
        description: `LusoTown ${request.membership_tier?.toUpperCase()} Member Discount (-${memberDiscountPercentage}%)`,
        amount: memberDiscount.amount,
        type: 'discount'
      })
    }

    // Calculate extras total
    let extrasTotal = 0
    if (request.extras) {
      const extraRates = {
        wifi: 5,
        refreshments: 15,
        newspaper: 3,
        phone_charger: 2,
        child_seat: 10,
        wheelchair_access: 0,
        meet_greet: 20,
        flight_monitoring: 10
      }

      for (const extra of request.extras) {
        const unitPrice = extraRates[extra.type as keyof typeof extraRates] || 0
        const extraCost = unitPrice * extra.quantity
        extrasTotal += extraCost
        if (extraCost > 0) {
          breakdown.push({
            description: `${extra.type.replace('_', ' ')} (x${extra.quantity})`,
            amount: extraCost,
            type: 'charge'
          })
        }
      }
    }

    // Calculate final total
    const totalAmount = 
      subtotal +
      callOutFee +
      peakTimeCharges +
      vehiclePremium +
      driverPremium +
      extrasTotal -
      blockDiscount.amount -
      memberDiscount.amount

    return {
      base_rate: baseRate,
      hours: dayRateApplied ? service.minimum_day_hours : hours,
      subtotal,
      call_out_fee: callOutFee,
      peak_time_charges: peakTimeCharges,
      block_discount: blockDiscount,
      vehicle_premium: vehiclePremium,
      driver_premium: driverPremium,
      member_discount: memberDiscount,
      extras_total: extrasTotal,
      total_amount: Math.max(0, totalAmount), // Ensure non-negative
      currency: service.currency,
      breakdown
    }
  } catch (error) {
    console.error('Error calculating pricing:', error)
    throw new Error('Failed to calculate pricing')
  }
}

// Create booking
export const createChauffeurBooking = async (
  bookingData: Omit<ChauffeurBooking, 'id' | 'booking_reference' | 'created_at' | 'updated_at'>
): Promise<{ success: boolean; booking?: ChauffeurBooking; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('chauffeur_bookings')
      .insert([bookingData])
      .select()
      .single()

    if (error) throw error

    return { success: true, booking: data }
  } catch (error) {
    console.error('Error creating chauffeur booking:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create booking' 
    }
  }
}

// Get user bookings
export const getUserChauffeurBookings = async (userId: string): Promise<ChauffeurBooking[]> => {
  try {
    const { data, error } = await supabase
      .from('chauffeur_bookings')
      .select(`
        *,
        chauffeur_services!inner(service_name, service_type),
        chauffeur_vehicles(make, model, category),
        chauffeur_drivers(first_name, last_name)
      `)
      .eq('customer_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching user bookings:', error)
    return []
  }
}

// Update booking status
export const updateBookingStatus = async (
  bookingId: string,
  status: ChauffeurBooking['status'],
  userId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('chauffeur_bookings')
      .update({ 
        status,
        ...(status === 'confirmed' ? { confirmed_at: new Date().toISOString() } : {}),
        ...(status === 'completed' ? { completed_at: new Date().toISOString() } : {})
      })
      .eq('id', bookingId)
      .eq('customer_id', userId)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error updating booking status:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update booking' 
    }
  }
}

// Get available vehicles for datetime
export const getAvailableVehicles = async (
  datetime: string,
  hours: number,
  passengerCount?: number
): Promise<ChauffeurVehicle[]> => {
  try {
    const vehicles = await getChauffeurVehicles()
    const availableVehicles: ChauffeurVehicle[] = []

    for (const vehicle of vehicles) {
      if (passengerCount && vehicle.max_passengers < passengerCount) {
        continue
      }

      const availability = await checkAvailability(datetime, hours, vehicle.id)
      if (availability.available) {
        availableVehicles.push(vehicle)
      }
    }

    return availableVehicles
  } catch (error) {
    console.error('Error fetching available vehicles:', error)
    return []
  }
}

// Get available drivers for datetime and languages
export const getAvailableDrivers = async (
  datetime: string,
  hours: number,
  languages?: string[]
): Promise<ChauffeurDriver[]> => {
  try {
    const drivers = await getChauffeurDrivers(languages)
    const availableDrivers: ChauffeurDriver[] = []

    for (const driver of drivers) {
      const availability = await checkAvailability(datetime, hours, undefined, driver.id)
      if (availability.available) {
        availableDrivers.push(driver)
      }
    }

    return availableDrivers
  } catch (error) {
    console.error('Error fetching available drivers:', error)
    return []
  }
}

// Utility functions
export const formatCurrency = (amount: number, currency: string = 'GBP'): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount)
}

export const formatDateTime = (datetime: string): string => {
  return new Date(datetime).toLocaleString('en-GB', {
    dateStyle: 'full',
    timeStyle: 'short'
  })
}

export const getServiceTypeLabel = (serviceType: string): string => {
  const labels = {
    executive: 'Executive Transport',
    tourism: 'Tourism & Sightseeing',
    airport: 'Airport Transfer',
    events: 'Event Transport',
    business: 'Business Travel',
    personal: 'Personal Service'
  }
  return labels[serviceType as keyof typeof labels] || serviceType
}

export const getVehicleCategoryLabel = (category: string): string => {
  const labels = {
    executive: 'Executive',
    luxury: 'Luxury',
    premium: 'Premium',
    standard: 'Standard'
  }
  return labels[category as keyof typeof labels] || category
}