
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Building2, ChevronDown, Search } from 'lucide-react';
import { AdAccount } from '@/types/facebook';
import { useToast } from '@/hooks/use-toast';
import AdAccountItem from './AdAccountItem';

interface AdAccountDropdownProps {
  isAuthenticated: boolean;
  selectedAccount: AdAccount | null;
  adAccounts: AdAccount[];
  onAccountSelect: (account: AdAccount) => void;
}

const ITEM_HEIGHT = 72; // Height of each account item in pixels
const MAX_VISIBLE_ITEMS = 6; // Maximum items to show before scrolling
const BUFFER_SIZE = 5; // Extra items to render for smooth scrolling

const AdAccountDropdown = ({ 
  isAuthenticated, 
  selectedAccount, 
  adAccounts, 
  onAccountSelect 
}: AdAccountDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrollTop, setScrollTop] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Filtered accounts with performance optimization
  const filteredAccounts = useMemo(() => {
    if (!searchTerm.trim()) return adAccounts;
    const term = searchTerm.toLowerCase();
    return adAccounts.filter(account =>
      account.name.toLowerCase().includes(term) ||
      account.accountId.toLowerCase().includes(term)
    );
  }, [adAccounts, searchTerm]);

  // Virtual scrolling calculations
  const { visibleItems, containerHeight, offsetY } = useMemo(() => {
    const totalItems = filteredAccounts.length;
    if (totalItems === 0) return { visibleItems: [], containerHeight: 0, offsetY: 0 };

    const containerHeight = Math.min(totalItems * ITEM_HEIGHT, MAX_VISIBLE_ITEMS * ITEM_HEIGHT);
    const clampedScrollTop = Math.max(0, Math.min(scrollTop, (totalItems - MAX_VISIBLE_ITEMS) * ITEM_HEIGHT));
    const startIndex = Math.floor(clampedScrollTop / ITEM_HEIGHT);
    const endIndex = Math.min(
      startIndex + MAX_VISIBLE_ITEMS + BUFFER_SIZE, 
      totalItems
    );

    const visibleItems = filteredAccounts.slice(
      Math.max(0, startIndex - BUFFER_SIZE),
      endIndex
    );

    const offsetY = Math.max(0, startIndex - BUFFER_SIZE) * ITEM_HEIGHT;

    return { visibleItems, containerHeight, offsetY };
  }, [filteredAccounts, scrollTop]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSearchTerm('');
        setScrollTop(0);
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

  // Reset scroll when search changes
  useEffect(() => {
    setScrollTop(0);
  }, [searchTerm]);

  const copyToClipboard = useCallback(async (text: string, accountId: string) => {
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
  }, [toast]);

  const handleAccountSelect = useCallback((account: AdAccount) => {
    onAccountSelect(account);
    setIsDropdownOpen(false);
    setSearchTerm('');
    setScrollTop(0);
  }, [onAccountSelect]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

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
                  placeholder={`Search ${adAccounts.length} ad accounts...`}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Virtual Scrolled Accounts List */}
            <div 
              className="relative overflow-y-auto bg-gray-800" 
              style={{ 
                backgroundColor: '#1f2937',
                height: `${containerHeight}px`,
                maxHeight: '320px'
              }}
              onScroll={handleScroll}
              ref={scrollContainerRef}
            >
              {filteredAccounts.length > 0 ? (
                <div
                  style={{
                    height: `${filteredAccounts.length * ITEM_HEIGHT}px`,
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      transform: `translateY(${offsetY}px)`,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0
                    }}
                  >
                    {visibleItems.map((account) => (
                      <AdAccountItem
                        key={account.id}
                        account={account}
                        onSelect={handleAccountSelect}
                        onCopy={copyToClipboard}
                        isSelected={selectedAccount?.id === account.id}
                        isCopied={copiedId === account.id}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="px-4 py-6 text-center text-gray-400 bg-gray-800" style={{ backgroundColor: '#1f2937' }}>
                  <p className="text-sm">No ad accounts found matching "{searchTerm}"</p>
                </div>
              )}
            </div>

            {/* Results counter for large lists */}
            {adAccounts.length > 20 && (
              <div className="px-3 py-2 text-xs text-gray-500 bg-gray-800 border-t border-gray-700">
                {searchTerm 
                  ? `${filteredAccounts.length} of ${adAccounts.length} accounts`
                  : `${adAccounts.length} total accounts`
                }
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdAccountDropdown;
