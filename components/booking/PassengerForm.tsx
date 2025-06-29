'use client';

import React from 'react';
import { PassengerInfo } from '@/contexts/BookingContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface PassengerFormProps {
  passenger: PassengerInfo;
  passengerNumber: number;
  onUpdate: (data: Partial<PassengerInfo>) => void;
}

const titles = [
  { value: 'mr', label: 'Mr.' },
  { value: 'mrs', label: 'Mrs.' },
  { value: 'ms', label: 'Ms.' },
  { value: 'miss', label: 'Miss' },
  { value: 'dr', label: 'Dr.' },
];

const countries = [
  { value: 'bd', label: 'Bangladesh' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'in', label: 'India' },
  { value: 'jp', label: 'Japan' },
  { value: 'sg', label: 'Singapore' },
];

export default function PassengerForm({ passenger, passengerNumber, onUpdate }: PassengerFormProps) {
  const getBadgeColor = () => {
    switch (passenger.type) {
      case 'adult':
        return 'bg-blue-100 text-blue-800';
      case 'child':
        return 'bg-green-100 text-green-800';
      case 'infant':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = () => {
    return passenger.type.charAt(0).toUpperCase() + passenger.type.slice(1);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            Passenger Info
          </CardTitle>
          <Badge className={getBadgeColor()}>
            {getTypeLabel()} {passengerNumber}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor={`${passenger.id}-title`}>
              Title<span className="text-red-500">*</span>
            </Label>
            <Select
              value={passenger.title}
              onValueChange={(value) => onUpdate({ title: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Passenger Type" />
              </SelectTrigger>
              <SelectContent>
                {titles.map((title) => (
                  <SelectItem key={title.value} value={title.value}>
                    {title.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor={`${passenger.id}-firstName`}>
              First Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id={`${passenger.id}-firstName`}
              placeholder="FIRST NAME"
              value={passenger.firstName}
              onChange={(e) => onUpdate({ firstName: e.target.value })}
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor={`${passenger.id}-lastName`}>
              Last Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id={`${passenger.id}-lastName`}
              placeholder="LAST NAME"
              value={passenger.lastName}
              onChange={(e) => onUpdate({ lastName: e.target.value })}
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gender */}
          <div className="space-y-2">
            <Label>
              Gender<span className="text-red-500">*</span>
            </Label>
            <Select
              value={passenger.gender}
              onValueChange={(value) => onUpdate({ gender: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Passenger Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label htmlFor={`${passenger.id}-dob`}>
              Date of Birth<span className="text-red-500">*</span>
            </Label>
            <Input
              id={`${passenger.id}-dob`}
              type="date"
              value={passenger.dateOfBirth}
              onChange={(e) => onUpdate({ dateOfBirth: e.target.value })}
            />
          </div>
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Country */}
          <div className="space-y-2">
            <Label>Country</Label>
            <Select
              value={passenger.country}
              onValueChange={(value) => onUpdate({ country: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor={`${passenger.id}-email`}>Email</Label>
            <Input
              id={`${passenger.id}-email`}
              type="email"
              placeholder="TESTTBP2.0@GMAIL.COM"
              value={passenger.email}
              onChange={(e) => onUpdate({ email: e.target.value })}
            />
          </div>
        </div>

        {/* Fourth Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor={`${passenger.id}-phone`}>Phone Number</Label>
            <Input
              id={`${passenger.id}-phone`}
              placeholder="01XXXXXXXX"
              value={passenger.phone}
              onChange={(e) => onUpdate({ phone: e.target.value })}
            />
          </div>

          {/* Passport Number - Only for adults */}
          {passenger.type === 'adult' && (
            <div className="space-y-2">
              <Label htmlFor={`${passenger.id}-passport`}>
                Passport Number<span className="text-red-500">*</span>
              </Label>
              <Input
                id={`${passenger.id}-passport`}
                placeholder="Passport Number"
                value={passenger.passportNumber || ''}
                onChange={(e) => onUpdate({ passportNumber: e.target.value })}
              />
            </div>
          )}
        </div>

        {/* Search Passenger Button */}
        <div className="flex justify-end">
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Search Passenger First Name
          </button>
        </div>
      </CardContent>
    </Card>
  );
}