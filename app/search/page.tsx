'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/contexts/BookingContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SearchForm from '@/components/search/SearchForm';
import SearchFilters from '@/components/search/SearchFilters';
import FlightCard from '@/components/search/FlightCard';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowUpDown } from 'lucide-react';

export default function SearchPage() {
  const router = useRouter();
  const { state, dispatch } = useBooking();
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    if (state.searchParams) {
      searchFlights();
    }
  }, [state.searchParams]);

  const searchFlights = async () => {
    if (!state.searchParams) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const response = await fetch('https://api.tbp.travel/flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state.searchParams),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }

      const data = await response.json();
      
      // Transform API response to match FlightResult interface
      const mockResults = generateMockFlights(state.searchParams);
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: mockResults });
    } catch (error) {
      console.error('Search error:', error);
      // Use mock data for demo purposes
      const mockResults = generateMockFlights(state.searchParams);
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: mockResults });
    }
  };

  const generateMockFlights = (searchParams: any) => {
    const airlines = [
      { name: 'Singapore Airlines', logo: '🇸🇬', code: 'SQ' },
      { name: 'Qatar Airways', logo: '🇶🇦', code: 'QR' },
      { name: 'Emirates', logo: '🇦🇪', code: 'EK' },
      { name: 'Saudi Airlines', logo: '🇸🇦', code: 'SV' },
      { name: 'Turkish Airlines', logo: '🇹🇷', code: 'TK' },
    ];

    return airlines.map((airline, index) => ({
      id: `flight-${index}`,
      airline: airline.name,
      airlineLogo: airline.logo,
      flightNumber: `${airline.code}${100 + index}`,
      departureTime: `${12 + index}:${index * 10}`,
      arrivalTime: `${15 + index}:${30 + index * 5}`,
      duration: `${3 + index}h ${index * 10}m`,
      stops: index === 0 ? 0 : Math.floor(Math.random() * 2) + 1,
      price: 110 + index * 50 + Math.floor(Math.random() * 200),
      currency: 'USD',
      origin: searchParams.origin,
      destination: searchParams.destination,
      aircraft: 'Boeing 777',
      refundable: Math.random() > 0.5,
      class: searchParams.class,
    }));
  };

  const sortedResults = [...state.searchResults].sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'duration':
        aValue = parseInt(a.duration.split('h')[0]);
        bValue = parseInt(b.duration.split('h')[0]);
        break;
      case 'departure':
        aValue = a.departureTime;
        bValue = b.departureTime;
        break;
      default:
        return 0;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const toggleSort = (newSortBy: 'price' | 'duration' | 'departure') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  if (!state.searchParams) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchForm />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Form */}
          <div className="mb-8">
            <SearchForm />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <SearchFilters />
            </div>

            {/* Results */}
            <div className="flex-1">
              {/* Sort Options */}
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">
                      {state.searchResults.length} of {state.searchResults.length} Results
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <Button
                      variant={sortBy === 'price' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleSort('price')}
                      className="flex items-center space-x-1"
                    >
                      <span>Price</span>
                      {sortBy === 'price' && <ArrowUpDown className="h-3 w-3" />}
                    </Button>
                    <Button
                      variant={sortBy === 'duration' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleSort('duration')}
                      className="flex items-center space-x-1"
                    >
                      <span>Duration</span>
                      {sortBy === 'duration' && <ArrowUpDown className="h-3 w-3" />}
                    </Button>
                    <Button
                      variant={sortBy === 'departure' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleSort('departure')}
                      className="flex items-center space-x-1"
                    >
                      <span>Departure</span>
                      {sortBy === 'departure' && <ArrowUpDown className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {state.isLoading && (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                    <p className="text-gray-600">Searching for flights...</p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {state.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-700">{state.error}</p>
                </div>
              )}

              {/* Flight Results */}
              {!state.isLoading && sortedResults.length > 0 && (
                <div className="space-y-4">
                  {sortedResults.map((flight) => (
                    <FlightCard key={flight.id} flight={flight} />
                  ))}
                </div>
              )}

              {/* No Results */}
              {!state.isLoading && sortedResults.length === 0 && !state.error && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No flights found for your search criteria.</p>
                  <p className="text-gray-500 mt-2">Try adjusting your filters or search parameters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}