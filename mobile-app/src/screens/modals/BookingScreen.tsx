import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors, Typography, CommonStyles } from '../../constants/Styles';
import { supabase } from '../../lib/supabase';

interface Service {
  id: string;
  name: string;
  namePortuguese: string;
  duration: number; // in minutes
  price: number;
  description: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function BookingScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { businessId } = route.params;
  const [business, setBusiness] = useState(null);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Service, 2: Date/Time, 3: Details, 4: Confirmation

  useEffect(() => {
    fetchBusinessAndServices();
  }, [businessId]);

  useEffect(() => {
    if (selectedService && selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedService, selectedDate]);

  const fetchBusinessAndServices = async () => {
    try {
      const { data: businessData, error: businessError } = await supabase
        .from('portuguese_businesses')
        .select('*')
        .eq('id', businessId)
        .single();

      if (businessError) throw businessError;
      setBusiness(businessData);

      // Mock services - in a real app this would come from a services table
      const mockServices: Service[] = [
        {
          id: '1',
          name: 'Portuguese Language Lesson',
          namePortuguese: 'Aula de Língua Portuguesa',
          duration: 60,
          price: 45,
          description: 'One-on-one Portuguese language instruction'
        },
        {
          id: '2',
          name: 'Cultural Consultation',
          namePortuguese: 'Consulta Cultural',
          duration: 30,
          price: 25,
          description: 'Cultural guidance and community integration support'
        },
        {
          id: '3',
          name: 'Business Networking Session',
          namePortuguese: 'Sessão de Networking Empresarial',
          duration: 45,
          price: 65,
          description: 'Professional networking and business development'
        }
      ];
      setServices(mockServices);
    } catch (error) {
      console.error('Error fetching business:', error);
      Alert.alert(t('common.error'), t('errors.network'));
    }
  };

  const fetchAvailableSlots = async () => {
    // Mock available slots - in a real app this would fetch from booking system
    const slots: TimeSlot[] = [
      { time: '09:00', available: true },
      { time: '10:00', available: true },
      { time: '11:00', available: false },
      { time: '12:00', available: true },
      { time: '14:00', available: true },
      { time: '15:00', available: true },
      { time: '16:00', available: false },
      { time: '17:00', available: true },
    ];
    setAvailableSlots(slots);
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setCurrentStep(2);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setSelectedTime(''); // Reset time when date changes
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setCurrentStep(3);
  };

  const handleBookingSubmit = async () => {
    if (!selectedService || !selectedTime || !customerInfo.name || !customerInfo.phone) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would create a booking record
      const booking = {
        business_id: businessId,
        service_id: selectedService.id,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        customer_email: customerInfo.email,
        notes: customerInfo.notes,
        status: 'pending',
        created_at: new Date().toISOString()
      };

      console.log('Booking submitted:', booking);
      
      setCurrentStep(4);
      
      // Show confirmation and navigate back
      setTimeout(() => {
        Alert.alert(
          'Booking Confirmed',
          `Your booking has been submitted. You will receive a confirmation call at ${customerInfo.phone}.`,
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }, 2000);

    } catch (error) {
      console.error('Error creating booking:', error);
      Alert.alert('Booking Error', 'Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderServiceSelection = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select a Service</Text>
      <Text style={styles.stepSubtitle}>Choose from available Portuguese cultural services</Text>
      
      {services.map((service) => (
        <TouchableOpacity
          key={service.id}
          style={[
            styles.serviceCard,
            selectedService?.id === service.id && styles.selectedServiceCard
          ]}
          onPress={() => handleServiceSelect(service)}
        >
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceNamePortuguese}>{service.namePortuguese}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
            
            <View style={styles.serviceDetails}>
              <View style={styles.serviceDetail}>
                <Ionicons name="time-outline" size={16} color={Colors.textSecondary} />
                <Text style={styles.serviceDetailText}>{service.duration} min</Text>
              </View>
              <View style={styles.serviceDetail}>
                <Ionicons name="card-outline" size={16} color={Colors.textSecondary} />
                <Text style={styles.serviceDetailText}>£{service.price}</Text>
              </View>
            </View>
          </View>
          
          {selectedService?.id === service.id && (
            <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderDateTime = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select Date & Time</Text>
      <Text style={styles.stepSubtitle}>Choose your preferred appointment slot</Text>
      
      {/* Date Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date</Text>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
          <Text style={styles.dateButtonText}>
            {selectedDate.toLocaleDateString('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Time Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Times</Text>
        <View style={styles.timeSlotsContainer}>
          {availableSlots.map((slot) => (
            <TouchableOpacity
              key={slot.time}
              style={[
                styles.timeSlot,
                !slot.available && styles.unavailableSlot,
                selectedTime === slot.time && styles.selectedTimeSlot
              ]}
              onPress={() => slot.available && handleTimeSelect(slot.time)}
              disabled={!slot.available}
            >
              <Text style={[
                styles.timeSlotText,
                !slot.available && styles.unavailableSlotText,
                selectedTime === slot.time && styles.selectedTimeSlotText
              ]}>
                {slot.time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedTime && (
        <View style={styles.selectionSummary}>
          <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
          <Text style={styles.selectionSummaryText}>
            {selectedDate.toLocaleDateString('en-GB')} at {selectedTime}
          </Text>
        </View>
      )}

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={handleDateChange}
        />
      )}
    </View>
  );

  const renderCustomerDetails = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Your Details</Text>
      <Text style={styles.stepSubtitle}>We'll use this information to confirm your booking</Text>
      
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Full Name *</Text>
          <TextInput
            style={styles.textInput}
            value={customerInfo.name}
            onChangeText={(text) => setCustomerInfo({...customerInfo, name: text})}
            placeholder="Enter your full name"
            placeholderTextColor={Colors.textSecondary}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number *</Text>
          <TextInput
            style={styles.textInput}
            value={customerInfo.phone}
            onChangeText={(text) => setCustomerInfo({...customerInfo, phone: text})}
            placeholder="+44 7XXX XXXXXX"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.textInput}
            value={customerInfo.email}
            onChangeText={(text) => setCustomerInfo({...customerInfo, email: text})}
            placeholder="your.email@example.com"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Special Requirements</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={customerInfo.notes}
            onChangeText={(text) => setCustomerInfo({...customerInfo, notes: text})}
            placeholder="Any special requests or requirements..."
            placeholderTextColor={Colors.textSecondary}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>
      </View>

      <TouchableOpacity 
        style={[
          styles.continueButton,
          (!customerInfo.name || !customerInfo.phone) && styles.disabledButton
        ]}
        onPress={() => setCurrentStep(4)}
        disabled={!customerInfo.name || !customerInfo.phone}
      >
        <Text style={styles.continueButtonText}>Review Booking</Text>
      </TouchableOpacity>
    </View>
  );

  const renderConfirmation = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Confirm Booking</Text>
      <Text style={styles.stepSubtitle}>Please review your booking details</Text>
      
      <View style={styles.confirmationCard}>
        <View style={styles.confirmationSection}>
          <Text style={styles.confirmationLabel}>Service</Text>
          <Text style={styles.confirmationValue}>{selectedService?.name}</Text>
          <Text style={styles.confirmationValueSecondary}>{selectedService?.namePortuguese}</Text>
        </View>

        <View style={styles.confirmationSection}>
          <Text style={styles.confirmationLabel}>Date & Time</Text>
          <Text style={styles.confirmationValue}>
            {selectedDate.toLocaleDateString('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })} at {selectedTime}
          </Text>
        </View>

        <View style={styles.confirmationSection}>
          <Text style={styles.confirmationLabel}>Duration</Text>
          <Text style={styles.confirmationValue}>{selectedService?.duration} minutes</Text>
        </View>

        <View style={styles.confirmationSection}>
          <Text style={styles.confirmationLabel}>Price</Text>
          <Text style={styles.confirmationPrice}>£{selectedService?.price}</Text>
        </View>

        <View style={styles.confirmationSection}>
          <Text style={styles.confirmationLabel}>Customer</Text>
          <Text style={styles.confirmationValue}>{customerInfo.name}</Text>
          <Text style={styles.confirmationValueSecondary}>{customerInfo.phone}</Text>
          {customerInfo.email && (
            <Text style={styles.confirmationValueSecondary}>{customerInfo.email}</Text>
          )}
        </View>

        {customerInfo.notes && (
          <View style={styles.confirmationSection}>
            <Text style={styles.confirmationLabel}>Notes</Text>
            <Text style={styles.confirmationValue}>{customerInfo.notes}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity 
        style={[styles.confirmButton, loading && styles.disabledButton]}
        onPress={handleBookingSubmit}
        disabled={loading}
      >
        <Text style={styles.confirmButtonText}>
          {loading ? 'Submitting...' : 'Confirm Booking'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.disclaimer}>
        You will receive a confirmation call to verify your booking details.
      </Text>
    </View>
  );

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3, 4].map((step) => (
        <View key={step} style={styles.stepIndicatorContainer}>
          <View style={[
            styles.stepCircle,
            step <= currentStep && styles.activeStepCircle
          ]}>
            <Text style={[
              styles.stepNumber,
              step <= currentStep && styles.activeStepNumber
            ]}>
              {step}
            </Text>
          </View>
          {step < 4 && (
            <View style={[
              styles.stepLine,
              step < currentStep && styles.activeStepLine
            ]} />
          )}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Service</Text>
        <View style={{ width: 24 }} />
      </View>

      {renderStepIndicator()}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentStep === 1 && renderServiceSelection()}
        {currentStep === 2 && renderDateTime()}
        {currentStep === 3 && renderCustomerDetails()}
        {currentStep === 4 && renderConfirmation()}
      </ScrollView>

      {/* Navigation Buttons */}
      {currentStep > 1 && currentStep < 4 && (
        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={styles.backStepButton}
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <Text style={styles.backStepButtonText}>Back</Text>
          </TouchableOpacity>
          
          {currentStep === 2 && selectedTime && (
            <TouchableOpacity 
              style={styles.nextStepButton}
              onPress={() => setCurrentStep(3)}
            >
              <Text style={styles.nextStepButtonText}>Continue</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    ...Typography.h2,
    color: Colors.text,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: Colors.white,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStepCircle: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  stepNumber: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  activeStepNumber: {
    color: Colors.white,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: Colors.border,
  },
  activeStepLine: {
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
  },
  stepContainer: {
    padding: 16,
  },
  stepTitle: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: 4,
  },
  stepSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  serviceCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedServiceCard: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: 2,
  },
  serviceNamePortuguese: {
    ...Typography.body,
    color: Colors.primary,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  serviceDescription: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  serviceDetails: {
    flexDirection: 'row',
  },
  serviceDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceDetailText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: 12,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dateButtonText: {
    ...Typography.body,
    color: Colors.text,
    marginLeft: 12,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 70,
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  unavailableSlot: {
    backgroundColor: Colors.background,
    opacity: 0.5,
  },
  timeSlotText: {
    ...Typography.body,
    color: Colors.text,
  },
  selectedTimeSlotText: {
    color: Colors.white,
  },
  unavailableSlotText: {
    color: Colors.textSecondary,
  },
  selectionSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  selectionSummaryText: {
    ...Typography.body,
    color: Colors.success,
    marginLeft: 8,
  },
  formContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    ...Typography.body,
    color: Colors.text,
    marginBottom: 8,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Typography.body,
    color: Colors.text,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  continueButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
  disabledButton: {
    backgroundColor: Colors.textSecondary,
    opacity: 0.5,
  },
  confirmationCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  confirmationSection: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  confirmationLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  confirmationValue: {
    ...Typography.body,
    color: Colors.text,
    marginBottom: 2,
  },
  confirmationValueSecondary: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  confirmationPrice: {
    ...Typography.h3,
    color: Colors.primary,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  confirmButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
  disclaimer: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  backStepButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  backStepButtonText: {
    ...Typography.button,
    color: Colors.primary,
  },
  nextStepButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  nextStepButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
});