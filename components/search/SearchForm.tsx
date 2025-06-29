'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plane, Users, Search } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const airports = [
  { code: 'DAC', name: 'Dhaka', city: 'Dhaka, Bangladesh' },
  { code: 'DXB', name: 'Dubai', city: 'Dubai, UAE' },
  { code: 'LHR', name: 'London Heathrow', city: 'London, UK' },
  { code: 'JFK', name: 'John F. Kennedy', city: 'New York, USA' },
  { code: 'BKK', name: 'Bangkok', city: 'Bangkok, Thailand' },
  { code: 'SIN', name: 'Singapore', city: 'Singapore' },
  { code: 'KUL', name: 'Kuala Lumpur', city: 'Kuala Lumpur, Malaysia' },
  { code: 'CGP', name: 'Chittagong', city: 'Chittagong, Bangladesh' },
];

interface SearchFormProps {
  className?: string;
  variant?: 'hero' | 'page';
}

export default function SearchForm({ className, variant = 'page' }: SearchFormProps) {
  const router = useRouter();
  const { dispatch } = useBooking();
  
  const [formData, setFormData] = useState({
    tripType: 'round-trip' as 'one-way' | 'round-trip' | 'multi-city',
    origin: '',
    destination: '',
    departureDate: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    passengers: {
      adult: 1,
      children: 0,
      infant: 0,
    },
    class: 'economy' as 'economy' | 'business' | 'first',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.origin || !formData.destination || !formData.departureDate) {
      return;
    }

    const searchParams = {
      origin: formData.origin,
      destination: formData.destination,
      departureDate: format(formData.departureDate, 'dd MMM yyyy'),
      returnDate: formData.returnDate ? format(formData.returnDate, 'dd MMM yyyy') : undefined,
      passenger: formData.passengers,
      tripType: formData.tripType,
      class: formData.class,
    };

    dispatch({ type: 'SET_SEARCH_PARAMS', payload: searchParams });
    router.push('/search');
  };

  const totalPassengers = formData.passengers.adult + formData.passengers.children + formData.passengers.infant;

  const isHeroVariant = variant === 'hero';

  return (
    <Card className={cn(
      "w-full max-w-5xl mx-auto",
      isHeroVariant ? "bg-white/95 backdrop-blur-md shadow-2xl" : "bg-white shadow-lg",
      className
    )}>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trip Type Tabs */}
          <Tabs 
            value={formData.tripType} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, tripType: value as any }))}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
              <TabsTrigger value="one-way">One Way</TabsTrigger>
              <TabsTrigger value="multi-city">Multi City</TabsTrigger>
            </TabsList>
            
            <TabsContent value={formData.tripType} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Origin */}
                <div className="space-y-2">
                  <Label htmlFor="origin" className="text-sm font-medium">From</Label>
                  <Select value={formData.origin} onValueChange={(value) => setFormData(prev => ({ ...prev, origin: value }))}>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center space-x-2">
                        <Plane className="h-4 w-4 text-gray-400" />
                        <SelectValue placeholder="Select origin" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {airports.map((airport) => (
                        <SelectItem key={airport.code} value={airport.code}>
                          <div className="flex flex-col">
                            <span className="font-medium">{airport.name}</span>
                            <span className="text-sm text-gray-500">{airport.city}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Destination */}
                <div className="space-y-2">
                  <Label htmlFor="destination" className="text-sm font-medium">To</Label>
                  <Select value={formData.destination} onValueChange={(value) => setFormData(prev => ({ ...prev, destination: value }))}>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center space-x-2">
                        <Plane className="h-4 w-4 text-gray-400 rotate-90" />
                        <SelectValue placeholder="Select destination" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {airports.map((airport) => (
                        <SelectItem key={airport.code} value={airport.code}>
                          <div className="flex flex-col">
                            <span className="font-medium">{airport.name}</span>
                            <span className="text-sm text-gray-500">{airport.city}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Departure Date */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Departure</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.departureDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.departureDate ? format(formData.departureDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.departureDate}
                        onSelect={(date) => setFormData(prev => ({ ...prev, departureDate: date }))}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Return Date */}
                {formData.tripType === 'round-trip' && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Return</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.returnDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.returnDate ? format(formData.returnDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.returnDate}
                          onSelect={(date) => setFormData(prev => ({ ...prev, returnDate: date }))}
                          initialFocus
                          disabled={(date) => date < (formData.departureDate || new Date())}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>

              {/* Passengers and Class */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {/* Passengers */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Travelers</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="mr-2 h-4 w-4" />
                        {totalPassengers} Passenger{totalPassengers > 1 ? 's' : ''}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Adults</p>
                            <p className="text-sm text-gray-500">12+ years</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                passengers: {
                                  ...prev.passengers,
                                  adult: Math.max(1, prev.passengers.adult - 1)
                                }
                              }))}
                              disabled={formData.passengers.adult <= 1}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{formData.passengers.adult}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                passengers: {
                                  ...prev.passengers,
                                  adult: prev.passengers.adult + 1
                                }
                              }))}
                            >
                              +
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Children</p>
                            <p className="text-sm text-gray-500">2-11 years</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                passengers: {
                                  ...prev.passengers,
                                  children: Math.max(0, prev.passengers.children - 1)
                                }
                              }))}
                              disabled={formData.passengers.children <= 0}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{formData.passengers.children}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                passengers: {
                                  ...prev.passengers,
                                  children: prev.passengers.children + 1
                                }
                              }))}
                            >
                              +
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Infants</p>
                            <p className="text-sm text-gray-500">Under 2 years</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                passengers: {
                                  ...prev.passengers,
                                  infant: Math.max(0, prev.passengers.infant - 1)
                                }
                              }))}
                              disabled={formData.passengers.infant <= 0}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{formData.passengers.infant}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                passengers: {
                                  ...prev.passengers,
                                  infant: prev.passengers.infant + 1
                                }
                              }))}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Class */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Class</Label>
                  <Select value={formData.class} onValueChange={(value) => setFormData(prev => ({ ...prev, class: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="first">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium opacity-0">Search</Label>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    size="lg"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search Flights
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </CardContent>
    </Card>
  );
}