# Khyaram - Travel Booking Website

A modern travel booking website built with Next.js, featuring flight search, booking functionality, and a beautiful user interface.

## 🚀 Setup & Run Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd khyaram-travel
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── booking/           # Booking page
│   ├── search/            # Flight search results
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── booking/           # Booking-related components
│   ├── home/              # Home page components
│   ├── layout/            # Layout components (Header, Footer)
│   ├── search/            # Search-related components
│   └── ui/                # UI components (shadcn/ui)
├── contexts/              # React Context providers
├── lib/                   # Utility functions
└── public/                # Static assets
```

## 🎯 Approach & Architecture

### Technical Stack
- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **UI Components**: shadcn/ui for consistent design system
- **State Management**: React Context API for booking flow
- **Icons**: Lucide React for modern iconography

### Key Design Decisions

1. **Component-Based Architecture**
   - Modular, reusable components for maintainability
   - Clear separation of concerns between UI and business logic
   - Consistent design system using shadcn/ui components

2. **State Management**
   - Context API for booking flow state management
   - Local state for component-specific data
   - Centralized booking context for cross-page data persistence

3. **Responsive Design**
   - Mobile-first approach using Tailwind CSS
   - Flexible grid layouts that adapt to different screen sizes
   - Touch-friendly interface elements

4. **User Experience**
   - Intuitive booking flow with progress indicators
   - Form validation with clear error messages
   - Loading states and smooth transitions

## ✨ Features

### Implemented Features
- **Home Page**: Hero section with search form, popular packages, and value propositions
- **Flight Search**: Advanced search with filters (price, airlines, stops, duration)
- **Search Results**: Sortable flight listings with detailed information
- **Booking Flow**: Multi-step booking process with passenger information forms
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Core Functionality
- Flight search with multiple parameters (origin, destination, dates, passengers)
- Dynamic passenger forms based on traveler count
- Price calculation with taxes and discounts
- Booking progress tracking
- Form validation and error handling

## 🔧 API Integration

### Flight Search API
- **Endpoint**: `https://api.tbp.travel/flights`
- **Method**: POST
- **Payload Structure**:
  ```json
  {
    "origin": "DAC",
    "destination": "DXB", 
    "departureDate": "12 Oct 2025",
    "returnDate": "20 Aug 2025",
    "passenger": {
      "adult": 2,
      "children": 0,
      "infant": 0
    }
  }
  ```

### Mock Data Fallback
- Implemented mock flight data for development and demo purposes
- Realistic airline information and pricing
- Fallback mechanism when API is unavailable

## 📋 Assumptions & Limitations

### Assumptions Made
1. **Guest Booking**: Users can book flights without authentication
2. **Single Currency**: All prices displayed in USD
3. **Static Content**: Popular packages and destinations are static
4. **Demo Data**: Using mock flight data for demonstration
5. **Basic Validation**: Form validation focuses on required fields

### Current Limitations
1. **No Payment Integration**: Booking flow stops at passenger information
2. **No User Accounts**: No user registration or login system
3. **Limited API Error Handling**: Basic error handling for API failures
4. **No Booking Persistence**: Booking data is lost on page refresh
5. **Static Filters**: Search filters don't affect actual results
6. **No Real-time Data**: Flight information is not real-time

### Future Enhancements
- Payment gateway integration (Stripe, PayPal)
- User authentication and account management
- Booking history and management
- Real-time flight data and pricing
- Advanced search filters implementation
- Email confirmations and notifications
- Multi-language support
- Accessibility improvements

## 🎨 Design Philosophy

The design follows modern web standards with emphasis on:
- **Clean, minimalist interface** inspired by leading travel platforms
- **Consistent color scheme** with blue as primary brand color
- **Typography hierarchy** for improved readability
- **Micro-interactions** for enhanced user engagement
- **Accessibility** considerations for inclusive design

## 🚀 Performance Considerations

- **Static Site Generation**: Optimized build output for fast loading
- **Image Optimization**: Using Next.js image optimization
- **Code Splitting**: Automatic code splitting for better performance
- **CSS Optimization**: Tailwind CSS purging for minimal bundle size

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

**Note**: This is a demonstration project showcasing modern web development practices and travel booking interface design. For production use, additional features like payment processing, user authentication, and real-time data integration would be required.