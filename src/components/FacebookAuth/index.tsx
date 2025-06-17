
import React from 'react';
import { useFacebookAuth } from '@/hooks/useFacebookAuth';
import Logo from './Logo';
import StepIndicators from './StepIndicators';
import FacebookLoginButton from './FacebookLoginButton';
import AdAccountDropdown from './AdAccountDropdown';
import AccountSelectedStatus from './AccountSelectedStatus';

const FacebookAuth = () => {
  const {
    isLoading,
    isAuthenticated,
    selectedAccount,
    adAccounts,
    handleFacebookLogin,
    handleAccountSelect,
  } = useFacebookAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6">
      <Logo />
      
      <StepIndicators 
        isAuthenticated={isAuthenticated}
        hasSelectedAccount={!!selectedAccount}
      />

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
            adAccounts={adAccounts}
            onAccountSelect={handleAccountSelect}
          />

          <AccountSelectedStatus selectedAccount={selectedAccount} />
        </div>
      </div>
    </div>
  );
};

export default FacebookAuth;
