import React from 'react';
import { Shield, Award, Clock } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Lot Of Choices',
    description: 'Total 460+ destinations that we work with.',
  },
  {
    icon: Award,
    title: 'Best Tour Guide',
    description: 'Our tour guides with 15+ years of experience.',
  },
  {
    icon: Clock,
    title: 'Easy Booking',
    description: 'With an easy and fast ticket purchase process.',
  },
];

export default function ValueSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top Value From Us For you
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide the best service for your comfort and convenience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <feature.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}