'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function SearchFilters() {
  const [priceRange, setPriceRange] = useState([100, 2000]);
  const [selectedStops, setSelectedStops] = useState<string[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [durationRange, setDurationRange] = useState([2, 24]);

  const stops = [
    { id: 'direct', label: 'Direct (0)', count: 23, price: 110 },
    { id: '1-stop', label: '1 Stop (4)', count: 4, price: 324 },
    { id: '2-stops', label: '2+ Stops (2)', count: 2, price: 349 },
  ];

  const airlines = [
    { id: 'singapore', label: 'Singapore Airlines', price: 110 },
    { id: 'qatar', label: 'Qatar Airways', price: 324 },
    { id: 'emirates', label: 'Emirates', price: 349 },
    { id: 'ana', label: 'ANA All Nippon', price: 110 },
    { id: 'cathay', label: 'Cathay Pacific', price: 324 },
    { id: 'air-france', label: 'Air France', price: 349 },
  ];

  const handleStopChange = (stopId: string, checked: boolean) => {
    if (checked) {
      setSelectedStops([...selectedStops, stopId]);
    } else {
      setSelectedStops(selectedStops.filter(id => id !== stopId));
    }
  };

  const handleAirlineChange = (airlineId: string, checked: boolean) => {
    if (checked) {
      setSelectedAirlines([...selectedAirlines, airlineId]);
    } else {
      setSelectedAirlines(selectedAirlines.filter(id => id !== airlineId));
    }
  };

  const resetFilters = () => {
    setPriceRange([100, 2000]);
    setSelectedStops([]);
    setSelectedAirlines([]);
    setDurationRange([2, 24]);
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filter By</CardTitle>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Stops */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Stops</h3>
          <div className="space-y-3">
            {stops.map((stop) => (
              <div key={stop.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={stop.id}
                    checked={selectedStops.includes(stop.id)}
                    onCheckedChange={(checked) => handleStopChange(stop.id, !!checked)}
                  />
                  <Label htmlFor={stop.id} className="text-sm cursor-pointer">
                    {stop.label}
                  </Label>
                </div>
                <span className="text-sm text-gray-500">${stop.price}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Airlines */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Airlines</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {airlines.map((airline) => (
              <div key={airline.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={airline.id}
                    checked={selectedAirlines.includes(airline.id)}
                    onCheckedChange={(checked) => handleAirlineChange(airline.id, !!checked)}
                  />
                  <Label htmlFor={airline.id} className="text-sm cursor-pointer">
                    {airline.label}
                  </Label>
                </div>
                <span className="text-sm text-gray-500">${airline.price}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Price</h3>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={2000}
              min={0}
              step={50}
              className="w-full"
            />
            <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Duration */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Duration</h3>
          <div className="px-2">
            <Slider
              value={durationRange}
              onValueChange={setDurationRange}
              max={24}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
              <span>{durationRange[0]}h</span>
              <span>{durationRange[1]}h</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Baggage Allowance */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Baggage Allowance</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="baggage-25kg" />
              <Label htmlFor="baggage-25kg" className="text-sm cursor-pointer">
                25 KG
              </Label>
              <Badge variant="secondary" className="ml-auto text-xs">
                1 Luggage
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="baggage-32kg" />
              <Label htmlFor="baggage-32kg" className="text-sm cursor-pointer">
                32 KG
              </Label>
              <Badge variant="secondary" className="ml-auto text-xs">
                2 Luggage
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="baggage-40kg" />
              <Label htmlFor="baggage-40kg" className="text-sm cursor-pointer">
                40 KG
              </Label>
              <Badge variant="secondary" className="ml-auto text-xs">
                2 Luggage
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}