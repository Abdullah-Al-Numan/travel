'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useBooking, FlightResult } from '@/contexts/BookingContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane } from 'lucide-react';

interface FlightCardProps {
  flight: FlightResult;
}

export default function FlightCard({ flight }: FlightCardProps) {
  const router = useRouter();
  const { dispatch } = useBooking();

  const handleBookFlight = () => {
    dispatch({ type: 'SET_SELECTED_FLIGHT', payload: flight });
    router.push('/booking');
  };

  const getStopText = (stops: number) => {
    if (stops === 0) return 'Non Stop';
    if (stops === 1) return '1 Stop';
    return `${stops} Stops`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {/* Flight Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              {/* Airline */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                  {flight.airlineLogo}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{flight.airline}</h3>
                  <p className="text-sm text-gray-500">{flight.flightNumber}</p>
                </div>
              </div>

              {/* Flight Status */}
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={flight.refundable ? "default" : "secondary"}
                  className={flight.refundable ? "bg-green-100 text-green-800" : ""}
                >
                  {flight.refundable ? 'Partially Refundable' : 'Non Refundable'}
                </Badge>
              </div>
            </div>

            {/* Flight Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Departure */}
              <div className="text-center md:text-left">
                <div className="text-2xl font-bold text-gray-900">{flight.departureTime}</div>
                <div className="text-sm text-gray-600">{flight.origin}</div>
              </div>

              {/* Flight Path */}
              <div className="flex items-center justify-center md:col-span-2">
                <div className="flex flex-col items-center w-full max-w-xs">
                  <div className="text-sm text-gray-600 mb-1">{flight.duration}</div>
                  <div className="flex items-center w-full">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <div className="flex-1 h-px bg-gray-300 mx-2 relative">
                      <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-blue-600" />
                    </div>
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{getStopText(flight.stops)}</div>
                </div>
              </div>

              {/* Arrival */}
              <div className="text-center md:text-right">
                <div className="text-2xl font-bold text-gray-900">{flight.arrivalTime}</div>
                <div className="text-sm text-gray-600">{flight.destination}</div>
              </div>
            </div>
          </div>

          {/* Price and Book Button */}
          <div className="ml-8 text-center flex-shrink-0">
            <div className="mb-2">
              <div className="text-sm text-gray-500 uppercase">{flight.class} Class</div>
              <div className="text-2xl font-bold text-blue-600">
                ${flight.price}
              </div>
            </div>
            <Button 
              onClick={handleBookFlight}
              className="w-full min-w-[120px] bg-blue-600 hover:bg-blue-700"
            >
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}