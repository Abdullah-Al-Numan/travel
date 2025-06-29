import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { BookingProvider } from '@/contexts/BookingContext';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Khyaram - Travel The World',  
  description: 'Discover amazing destinations and book your perfect trip',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BookingProvider>
          {children}
          <Toaster />
        </BookingProvider>
      </body>
    </html>
  );
}