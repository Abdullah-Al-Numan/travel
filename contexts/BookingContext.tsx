'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface PassengerInfo {
  id: string;
  type: 'adult' | 'child' | 'infant';
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  country: string;
  email: string;
  phone: string;
  passportNumber?: string;
}

export interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passenger: {
    adult: number;
    children: number;
    infant: number;
  };
  tripType: 'one-way' | 'round-trip' | 'multi-city';
  class: 'economy' | 'business' | 'first';
}

export interface FlightResult {
  id: string;
  airline: string;
  airlineLogo: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  currency: string;
  origin: string;
  destination: string;
  aircraft: string;
  refundable: boolean;
  class: string;
  flightNumber: string;
}

interface BookingState {
  searchParams: SearchParams | null;
  searchResults: FlightResult[];
  selectedFlight: FlightResult | null;
  passengers: PassengerInfo[];
  isLoading: boolean;
  error: string | null;
}

type BookingAction =
  | { type: 'SET_SEARCH_PARAMS'; payload: SearchParams }
  | { type: 'SET_SEARCH_RESULTS'; payload: FlightResult[] }
  | { type: 'SET_SELECTED_FLIGHT'; payload: FlightResult }
  | { type: 'SET_PASSENGERS'; payload: PassengerInfo[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_BOOKING' };

const initialState: BookingState = {
  searchParams: null,
  searchResults: [],
  selectedFlight: null,
  passengers: [],
  isLoading: false,
  error: null,
};

const bookingReducer = (state: BookingState, action: BookingAction): BookingState => {
  switch (action.type) {
    case 'SET_SEARCH_PARAMS':
      return { ...state, searchParams: action.payload };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload, isLoading: false };
    case 'SET_SELECTED_FLIGHT':
      return { ...state, selectedFlight: action.payload };
    case 'SET_PASSENGERS':
      return { ...state, passengers: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'CLEAR_BOOKING':
      return initialState;
    default:
      return state;
  }
};

const BookingContext = createContext<{
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
} | null>(null);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};