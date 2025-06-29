import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import PopularPackages from '@/components/home/PopularPackages';
import ValueSection from '@/components/home/ValueSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PopularPackages />
        <ValueSection />
      </main>
      <Footer />
    </div>
  );
}