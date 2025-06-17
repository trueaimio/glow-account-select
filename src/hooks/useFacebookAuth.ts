
import { useState } from 'react';
import { AdAccount, FacebookAuthState } from '@/types/facebook';
import { useToast } from '@/hooks/use-toast';

export const useFacebookAuth = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AdAccount | null>(null);
  const { toast } = useToast();

  const adAccounts: AdAccount[] = [
    { id: '1', name: 'Acme Main Account', accountId: 'AD_123456789', isActive: true },
    { id: '2', name: 'Demo Ad Account', accountId: 'AD_987654321', isActive: true },
    { id: '3', name: 'Marketing Pro Account', accountId: 'AD_456789123', isActive: false },
    { id: '4', name: 'Testing Account', accountId: 'AD_789123456', isActive: true },
  ];

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

  return {
    currentStep,
    isLoading,
    isAuthenticated,
    selectedAccount,
    adAccounts,
    handleFacebookLogin,
    handleAccountSelect,
  };
};
