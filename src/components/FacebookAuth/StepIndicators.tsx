
import React from 'react';

interface StepIndicatorsProps {
  isAuthenticated: boolean;
  hasSelectedAccount: boolean;
}

const StepIndicators = ({ isAuthenticated, hasSelectedAccount }: StepIndicatorsProps) => {
  return (
    <div className="mb-16 flex items-center space-x-8">
      {/* Step 1 */}
      <div className="flex flex-col items-center">
        <div className={`relative flex items-center justify-center w-16 h-16 rounded-full border-2 transition-all duration-500 ${
          isAuthenticated
            ? 'border-green-500 bg-green-500/20 shadow-lg shadow-green-500/50' 
            : 'border-gray-600 bg-gray-800'
        }`}>
          <span className={`text-lg font-bold transition-colors duration-500 ${
            isAuthenticated ? 'text-green-300' : 'text-gray-400'
          }`}>
            1
          </span>
          {isAuthenticated && (
            <div className="absolute inset-0 rounded-full bg-green-500/10 animate-pulse" />
          )}
        </div>
        <p className={`mt-3 text-sm font-medium transition-colors duration-500 ${
          isAuthenticated ? 'text-green-300' : 'text-gray-400'
        }`}>
          Authenticate
        </p>
      </div>

      {/* Connector Line */}
      <div className="relative w-24 h-1">
        <div className="absolute inset-0 bg-gray-600 rounded-full" />
        <div className={`absolute inset-0 bg-green-500 rounded-full transition-all duration-1000 ${
          hasSelectedAccount ? 'w-full' : 'w-0'
        }`} />
      </div>

      {/* Step 2 */}
      <div className="flex flex-col items-center">
        <div className={`relative flex items-center justify-center w-16 h-16 rounded-full border-2 transition-all duration-500 ${
          hasSelectedAccount
            ? 'border-green-500 bg-green-500/20 shadow-lg shadow-green-500/50' 
            : 'border-gray-600 bg-gray-800'
        }`}>
          <span className={`text-lg font-bold transition-colors duration-500 ${
            hasSelectedAccount ? 'text-green-300' : 'text-gray-400'
          }`}>
            2
          </span>
          {hasSelectedAccount && (
            <div className="absolute inset-0 rounded-full bg-green-500/10 animate-pulse" />
          )}
        </div>
        <p className={`mt-3 text-sm font-medium transition-colors duration-500 ${
          hasSelectedAccount ? 'text-green-300' : 'text-gray-400'
        }`}>
          Select Account
        </p>
      </div>
    </div>
  );
};

export default StepIndicators;
