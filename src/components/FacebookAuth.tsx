import React, { useState, useRef, useEffect } from 'react';
import { Facebook, ChevronDown, CheckCircle, Building2, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AdAccount | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const adAccounts: AdAccount[] = [
    { id: '1', name: 'Acme Main Account', accountId: 'AD_123456789', isActive: true },
    { id: '2', name: 'Demo Ad Account', accountId: 'AD_987654321', isActive: true },
    { id: '3', name: 'Marketing Pro Account', accountId: 'AD_456789123', isActive: false },
    { id: '4', name: 'Testing Account', accountId: 'AD_789123456', isActive: true },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    setIsDropdownOpen(false);
    setCurrentStep(3);
    
    toast({
      title: "Account Selected",
      description: `Selected ${account.name}`,
    });
  };

  const copyToClipboard = async (text: string, accountId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(accountId);
      setTimeout(() => setCopiedId(null), 2000);
      
      toast({
        title: "Copied!",
        description: "Account ID copied to clipboard",
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="mb-12">
        <img 
          src="/lovable-uploads/2c9050c4-ea79-41eb-8e5d-570d860f9197.png" 
          alt="AI Logo" 
          className="w-40 h-40 object-contain"
        />
      </div>

      {/* Step Indicators */}
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
            selectedAccount ? 'w-full' : 'w-0'
          }`} />
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <div className={`relative flex items-center justify-center w-16 h-16 rounded-full border-2 transition-all duration-500 ${
            selectedAccount
              ? 'border-green-500 bg-green-500/20 shadow-lg shadow-green-500/50' 
              : 'border-gray-600 bg-gray-800'
          }`}>
            <span className={`text-lg font-bold transition-colors duration-500 ${
              selectedAccount ? 'text-green-300' : 'text-gray-400'
            }`}>
              2
            </span>
            {selectedAccount && (
              <div className="absolute inset-0 rounded-full bg-green-500/10 animate-pulse" />
            )}
          </div>
          <p className={`mt-3 text-sm font-medium transition-colors duration-500 ${
            selectedAccount ? 'text-green-300' : 'text-gray-400'
          }`}>
            Select Account
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md">
        {/* Facebook Login Button */}
        <div className="flex flex-col items-center space-y-6">
          <button
            onClick={handleFacebookLogin}
            disabled={isLoading || isAuthenticated}
            className={`relative flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
              isAuthenticated
                ? 'bg-green-600 cursor-default'
                : isLoading
                ? 'bg-blue-500 cursor-not-allowed'
                : 'bg-[#1877F2] hover:bg-[#166FE5] hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Connecting...</span>
              </>
            ) : isAuthenticated ? (
              <>
                <CheckCircle className="w-6 h-6" />
                <span>Connected to Facebook</span>
              </>
            ) : (
              <>
                <Facebook className="w-6 h-6" />
                <span>Continue with Facebook</span>
              </>
            )}
          </button>

          {/* Ad Account Dropdown */}
          {isAuthenticated && (
            <div className="w-full relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white hover:bg-gray-750 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400/50"
                aria-expanded={isDropdownOpen}
                aria-haspopup="listbox"
              >
                <span className="flex items-center space-x-3">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <span>
                    {selectedAccount ? selectedAccount.name : 'Choose Ad Account'}
                  </span>
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Dropdown Panel */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-[9999] animate-fade-in">
                  <div className="max-h-64 overflow-y-auto bg-gray-800 rounded-xl">
                    {adAccounts.map((account) => (
                      <div
                        key={account.id}
                        className="flex items-center justify-between px-4 py-3 hover:bg-gray-700 transition-colors duration-150 cursor-pointer border-b border-gray-700 last:border-b-0 bg-gray-800"
                        onClick={() => handleAccountSelect(account)}
                        role="option"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleAccountSelect(account);
                          }
                        }}
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <div className="flex-1">
                            <p className="text-white font-medium">{account.name}</p>
                            <p className="text-sm text-gray-400">{account.accountId}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              account.isActive 
                                ? 'bg-green-900/50 text-green-300 border border-green-700' 
                                : 'bg-gray-900/50 text-gray-400 border border-gray-700'
                            }`}>
                              {account.isActive ? 'Active' : 'Inactive'}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(account.accountId, account.id);
                              }}
                              className="p-1 hover:bg-gray-600 rounded transition-colors duration-150"
                              title="Copy Account ID"
                            >
                              {copiedId === account.id ? (
                                <Check className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Account Selected Status */}
          {selectedAccount && (
            <div className="flex items-center space-x-3 px-6 py-4 bg-green-900/20 border border-green-700 rounded-xl text-green-300 animate-fade-in">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Account Selected: {selectedAccount.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacebookAuth;
