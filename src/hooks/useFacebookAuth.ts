
import { useState } from 'react';
import { AdAccount, FacebookAuthState } from '@/types/facebook';
import { useToast } from '@/hooks/use-toast';

export const useFacebookAuth = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AdAccount | null>(null);
  const { toast } = useToast();

  // Generate test data with 150 accounts to simulate large lists
  const adAccounts: AdAccount[] = Array.from({ length: 150 }, (_, i) => {
    const companies = ['Acme', 'Demo', 'Marketing Pro', 'Testing', 'Global Corp', 'TechStart', 'Brand Co', 'Digital Agency', 'E-commerce Hub', 'Local Business'];
    const types = ['Main Account', 'Campaign Account', 'Testing Account', 'Backup Account', 'Regional Account'];
    
    return {
      id: `${i + 1}`,
      name: `${companies[i % companies.length]} ${types[i % types.length]} ${Math.floor(i / 10) + 1}`,
      accountId: `AD_${(123456789 + i).toString()}`,
      isActive: Math.random() > 0.3 // 70% active accounts
    };
  });

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
