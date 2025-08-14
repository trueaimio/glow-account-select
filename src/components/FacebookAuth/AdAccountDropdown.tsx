
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Building2, ChevronDown, Copy, Check, Search } from 'lucide-react';
import { AdAccount } from '@/types/facebook';
import { useToast } from '@/hooks/use-toast';

interface AdAccountDropdownProps {
  isAuthenticated: boolean;
  selectedAccount: AdAccount | null;
  adAccounts: AdAccount[];
  onAccountSelect: (account: AdAccount) => void;
}

const AdAccountDropdown = ({ 
  isAuthenticated, 
  selectedAccount, 
  adAccounts, 
  onAccountSelect 
}: AdAccountDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const filteredAccounts = useMemo(() => {
    if (!searchTerm.trim()) return adAccounts;
    return adAccounts.filter(account =>
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [adAccounts, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isDropdownOpen]);

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

  const handleAccountSelect = (account: AdAccount) => {
    onAccountSelect(account);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  if (!isAuthenticated) return null;

  return (
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
        <div className="absolute top-full left-0 right-0 mt-2 z-[99999] animate-fade-in bg-gray-800">
          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
            {/* Search Input */}
            <div className="p-3 border-b border-gray-700 bg-gray-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search ad accounts..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Accounts List */}
            <div className="max-h-64 overflow-y-auto bg-gray-800" style={{ backgroundColor: '#1f2937' }}>
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-700 transition-colors duration-150 cursor-pointer border-b border-gray-700 last:border-b-0"
                    style={{ backgroundColor: '#1f2937' }}
                    onClick={() => handleAccountSelect(account)}
                    role="option"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleAccountSelect(account);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3 flex-1 bg-gray-800" style={{ backgroundColor: '#1f2937' }}>
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <div className="flex-1 bg-gray-800" style={{ backgroundColor: '#1f2937' }}>
                        <p className="text-white font-medium bg-gray-800" style={{ backgroundColor: '#1f2937' }}>{account.name}</p>
                        <p className="text-sm text-gray-400 bg-gray-800" style={{ backgroundColor: '#1f2937' }}>{account.accountId}</p>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-800" style={{ backgroundColor: '#1f2937' }}>
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
                          className="p-1 hover:bg-gray-600 rounded transition-colors duration-150 bg-gray-800"
                          style={{ backgroundColor: '#1f2937' }}
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
                ))
              ) : (
                <div className="px-4 py-6 text-center text-gray-400 bg-gray-800" style={{ backgroundColor: '#1f2937' }}>
                  <p className="text-sm">No ad accounts found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdAccountDropdown;
