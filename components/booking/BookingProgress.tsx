import React from 'react';
import { Check } from 'lucide-react';

interface BookingProgressProps {
  currentStep: number;
}

const steps = [
  { id: 0, name: 'Details', description: 'Passenger Information' },
  { id: 1, name: 'Review', description: 'Review & Confirm' },
  { id: 2, name: 'Payment', description: 'Complete Payment' },
];

export default function BookingProgress({ currentStep }: BookingProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <div className="flex items-center">
              <div
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                  ${
                    currentStep > step.id
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : currentStep === step.id
                      ? 'border-blue-600 text-blue-600 bg-white'
                      : 'border-gray-300 text-gray-400 bg-white'
                  }
                `}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id + 1}</span>
                )}
              </div>
              
              {/* Step Label */}
              <div className="ml-3 text-left">
                <div
                  className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  {step.name}
                </div>
                <div className="text-xs text-gray-500">{step.description}</div>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  mx-6 h-px w-16 transition-colors
                  ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'}
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}