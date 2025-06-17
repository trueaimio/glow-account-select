
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Logo from './FacebookAuth/Logo';
import StepIndicators from './FacebookAuth/StepIndicators';
import FacebookLoginButton from './FacebookAuth/FacebookLoginButton';
import AdAccountDropdown from './FacebookAuth/AdAccountDropdown';
import AccountSelectedStatus from './FacebookAuth/AccountSelectedStatus';

interface AdAccount {
  id: string;
  name: string;
  accountId: string;
  isActive: boolean;
}

const FacebookAuth = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AdAccount | null>(null);
  const { toast } = useToast();

  const handleFacebookLogin = async () => {
    setIsLoading(true);
    
    // Simulate authentication process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsAuthenticated(true);
    setCurrentStep(2);
    
    toast({
      title: "Authentication Successful",
      description: "Connected to Facebook successfully!",
    });
  };

  const handleAccountSelect = (account: AdAccount) => {
    setSelectedAccount(account);
    setCurrentStep(3);
    
    toast({
      title: "Account Selected",
      description: `Selected ${account.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6">
      <Logo />
      
      <StepIndicators 
        isAuthenticated={isAuthenticated} 
        selectedAccount={selectedAccount} 
      />

      {/* Main Content */}
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center space-y-6">
          <FacebookLoginButton
            isLoading={isLoading}
            isAuthenticated={isAuthenticated}
            onLogin={handleFacebookLogin}
          />

          <AdAccountDropdown
            isAuthenticated={isAuthenticated}
            selectedAccount={selectedAccount}
            onAccountSelect={handleAccountSelect}
          />

          <AccountSelectedStatus selectedAccount={selectedAccount} />
        </div>
      </div>
    </div>
  );
};

export default FacebookAuth;
