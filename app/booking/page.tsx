'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking, PassengerInfo } from '@/contexts/BookingContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BookingProgress from '@/components/booking/BookingProgress';
import PassengerForm from '@/components/booking/PassengerForm';
import BookingSummary from '@/components/booking/BookingSummary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Plane } from 'lucide-react';
import { toast } from 'sonner';

export default function BookingPage() {
  const router = useRouter();
  const { state, dispatch } = useBooking();
  const [currentStep, setCurrentStep] = useState(0);
  const [passengers, setPassengers] = useState<PassengerInfo[]>([]);

  useEffect(() => {
    if (!state.selectedFlight || !state.searchParams) {
      router.push('/search');
      return;
    }

    // Initialize passenger forms
    initializePassengers();
  }, [state.selectedFlight, state.searchParams]);

  const initializePassengers = () => {
    if (!state.searchParams) return;

    const { adult, children, infant } = state.searchParams.passenger;
    const passengerForms: PassengerInfo[] = [];

    // Add adult forms
    for (let i = 0; i < adult; i++) {
      passengerForms.push({
        id: `adult-${i}`,
        type: 'adult',
        title: '',
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        country: '',
        email: i === 0 ? 'guest@example.com' : '',
        phone: '',
        passportNumber: '',
      });
    }

    // Add children forms
    for (let i = 0; i < children; i++) {
      passengerForms.push({
        id: `child-${i}`,
        type: 'child',
        title: '',
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        country: '',
        email: '',
        phone: '',
      });
    }

    // Add infant forms
    for (let i = 0; i < infant; i++) {
      passengerForms.push({
        id: `infant-${i}`,
        type: 'infant',
        title: '',
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        country: '',
        email: '',
        phone: '',
      });
    }

    setPassengers(passengerForms);
  };

  const updatePassenger = (passengerId: string, data: Partial<PassengerInfo>) => {
    setPassengers(prev => 
      prev.map(p => p.id === passengerId ? { ...p, ...data } : p)
    );
  };

  const validatePassengers = () => {
    const errors: string[] = [];

    passengers.forEach((passenger, index) => {
      const passengerNum = index + 1;
      const passengerType = passenger.type.charAt(0).toUpperCase() + passenger.type.slice(1);

      if (!passenger.title) {
        errors.push(`${passengerType} ${passengerNum}: Title is required`);
      }
      if (!passenger.firstName) {
        errors.push(`${passengerType} ${passengerNum}: First name is required`);
      }
      if (!passenger.lastName) {
        errors.push(`${passengerType} ${passengerNum}: Last name is required`);
      }
      if (!passenger.gender) {
        errors.push(`${passengerType} ${passengerNum}: Gender is required`);
      }
      if (!passenger.dateOfBirth) {
        errors.push(`${passengerType} ${passengerNum}: Date of birth is required`);
      }
      if (!passenger.country) {
        errors.push(`${passengerType} ${passengerNum}: Country is required`);
      }

      // Email required for primary passenger
      if (index === 0 && !passenger.email) {
        errors.push(`${passengerType} ${passengerNum}: Email is required`);
      }

      // Passport number required for adults
      if (passenger.type === 'adult' && !passenger.passportNumber) {
        errors.push(`${passengerType} ${passengerNum}: Passport number is required`);
      }
    });

    return errors;
  };

  const handleContinue = () => {
    const errors = validatePassengers();
    
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return;
    }

    dispatch({ type: 'SET_PASSENGERS', payload: passengers });
    
    // For demo purposes, show success message
    toast.success('Booking details saved successfully!');
    
    // In a real app, this would proceed to payment
    setCurrentStep(1);
  };

  if (!state.selectedFlight || !state.searchParams) {
    return null;
  }

  const getPassengersByType = (type: 'adult' | 'child' | 'infant') => {
    return passengers.filter(p => p.type === type);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress */}
          <BookingProgress currentStep={currentStep} />

          {/* Warning Notice */}
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Notice:</strong> Please don't put wrong information or Test data for Avoid ADM
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Passenger Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Flight Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <Plane className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold">{state.selectedFlight.origin} {state.selectedFlight.departureTime}</div>
                          <div className="text-sm text-gray-600">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
                        </div>
                        <div className="text-center px-4">
                          <div className="text-sm text-gray-600">Non Stop</div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            <div className="flex-1 h-px bg-gray-300 mx-2"></div>
                            <Plane className="h-4 w-4 text-blue-600" />
                            <div className="flex-1 h-px bg-gray-300 mx-2"></div>
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          </div>
                          <div className="text-sm text-gray-600">{state.selectedFlight.duration}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">{state.selectedFlight.destination} {state.selectedFlight.arrivalTime}</div>
                          <div className="text-sm text-gray-600">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Passenger Forms */}
              {getPassengersByType('adult').map((passenger, index) => (
                <PassengerForm
                  key={passenger.id}
                  passenger={passenger}
                  passengerNumber={index + 1}
                  onUpdate={(data) => updatePassenger(passenger.id, data)}
                />
              ))}

              {getPassengersByType('child').map((passenger, index) => (
                <PassengerForm
                  key={passenger.id}
                  passenger={passenger}
                  passengerNumber={index + 1}
                  onUpdate={(data) => updatePassenger(passenger.id, data)}
                />
              ))}

              {getPassengersByType('infant').map((passenger, index) => (
                <PassengerForm
                  key={passenger.id}
                  passenger={passenger}
                  passengerNumber={index + 1}
                  onUpdate={(data) => updatePassenger(passenger.id, data)}
                />
              ))}

              {/* Continue Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleContinue}
                  size="lg"
                  className="px-8"
                >
                  Next
                </Button>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <BookingSummary flight={state.selectedFlight} searchParams={state.searchParams} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}