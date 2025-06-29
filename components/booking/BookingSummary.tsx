import React from 'react';
import { FlightResult, SearchParams } from '@/contexts/BookingContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Plane, Calendar, Users } from 'lucide-react';

interface BookingSummaryProps {
  flight: FlightResult;
  searchParams: SearchParams;
}

export default function BookingSummary({ flight, searchParams }: BookingSummaryProps) {
  const totalPassengers = searchParams.passenger.adult + searchParams.passenger.children + searchParams.passenger.infant;
  
  // Calculate pricing
  const basePrice = flight.price;
  const adultPrice = basePrice * searchParams.passenger.adult;
  const childPrice = basePrice * 0.75 * searchParams.passenger.children; // 25% discount for children
  const infantPrice = basePrice * 0.1 * searchParams.passenger.infant; // 90% discount for infants
  
  const subtotal = adultPrice + childPrice + infantPrice;
  const taxes = subtotal * 0.12; // 12% tax
  const totalAmount = subtotal + taxes;

  return (
    <div className="space-y-6">
      {/* Itinerary Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ITINERARY DETAILS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Flight Route */}
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">{flight.origin} - {flight.destination}</div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{flight.flightNumber.slice(-3)}</span>
              </div>
              <span className="text-sm text-gray-600">{flight.flightNumber}</span>
            </div>
          </div>

          {/* Flight Times */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Departure:</span>
              <span className="font-medium">Thu, Jun 26 2025, 5:05 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Arrival:</span>
              <span className="font-medium">Thu, Jun 26 2025, 6:05 PM</span>
            </div>
          </div>

          <Separator />

          {/* More Details Expandable */}
          <details className="group">
            <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-700 flex items-center justify-between">
              More Details
              <span className="transform group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Aircraft:</span>
                <span>{flight.aircraft}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span>{flight.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Class:</span>
                <span className="capitalize">{flight.class}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Refundable:</span>
                <Badge variant={flight.refundable ? "default" : "secondary"}>
                  {flight.refundable ? 'Yes' : 'No'}
                </Badge>
              </div>
            </div>
          </details>
        </CardContent>
      </Card>

      {/* Price Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">PRICE SUMMARY</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Passenger Breakdown */}
          {searchParams.passenger.adult > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Adult</h4>
              <div className="flex justify-between text-sm">
                <span>Base fare</span>
                <span>{(basePrice * searchParams.passenger.adult).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>{(basePrice * searchParams.passenger.adult * 0.12).toFixed(2)}</span>
              </div>
            </div>
          )}

          {searchParams.passenger.children > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Child</h4>
              <div className="flex justify-between text-sm">
                <span>Base fare</span>
                <span>{(basePrice * 0.75 * searchParams.passenger.children).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>{(basePrice * 0.75 * searchParams.passenger.children * 0.12).toFixed(2)}</span>
              </div>
            </div>
          )}

          <Separator />

          {/* Totals */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Base Amount</span>
              <span>{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Tax & Fees</span>
              <span>{taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount Amount</span>
              <span>-{(basePrice * 0.1).toFixed(2)}</span>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Gross Amount</span>
            <span>BDT {totalAmount.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-lg font-bold text-blue-600">
            <span>Offer Amount</span>
            <span>BDT {(totalAmount * 0.95).toFixed(2)}</span>
          </div>

          {/* Terms */}
          <div className="pt-4 space-y-2">
            <label className="flex items-start space-x-2 text-xs">
              <input type="checkbox" className="mt-1" />
              <span>By continuing you agree to the <span className="text-blue-600">Fare Rule</span></span>
            </label>
            <label className="flex items-start space-x-2 text-xs">
              <input type="checkbox" className="mt-1" />
              <span>By continuing you agree to the <span className="text-blue-600">Terms & Condition</span></span>
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}