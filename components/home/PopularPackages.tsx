import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin } from 'lucide-react';

const packages = [
  {
    id: 1,
    title: 'Bali Paradise',
    location: 'Bali, Indonesia',
    price: 899,
    rating: 4.8,
    duration: '5 Days 4 Nights',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    description: 'Experience the beauty of Bali with pristine beaches and cultural heritage.'
  },
  {
    id: 2,
    title: 'Dubai Adventure',
    location: 'Dubai, UAE',
    price: 1299,
    rating: 4.9,
    duration: '7 Days 6 Nights',
    image: 'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    description: 'Discover the luxury and adventure of Dubai with modern architecture.'
  },
  {
    id: 3,
    title: 'Maldives Escape',
    location: 'Maldives',
    price: 1599,
    rating: 5.0,
    duration: '6 Days 5 Nights',
    image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    description: 'Relax in overwater bungalows with crystal clear waters.'
  },
  {
    id: 4,
    title: 'Thailand Explorer',
    location: 'Bangkok, Thailand',
    price: 699,
    rating: 4.7,
    duration: '4 Days 3 Nights',
    image: 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-temple-161401.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    description: 'Explore temples, street food, and vibrant culture of Thailand.'
  },
];

export default function PopularPackages() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most loved travel packages and create unforgettable memories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium">{pkg.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-gray-900">{pkg.title}</h3>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{pkg.location}</span>
                  </div>
                  <p className="text-sm text-gray-600">{pkg.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-sm text-gray-500">{pkg.duration}</span>
                      <div className="text-lg font-bold text-blue-600">${pkg.price}</div>
                    </div>
                    <Button size="sm" className="bg-coral-500 hover:bg-coral-600">
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            View All Packages
          </Button>
        </div>
      </div>
    </section>
  );
}