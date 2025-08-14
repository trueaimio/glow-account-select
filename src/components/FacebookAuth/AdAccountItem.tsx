import React, { memo } from 'react';
import { Building2, Copy, Check } from 'lucide-react';
import { AdAccount } from '@/types/facebook';

interface AdAccountItemProps {
  account: AdAccount;
  onSelect: (account: AdAccount) => void;
  onCopy: (accountId: string, id: string) => void;
  isSelected: boolean;
  isCopied: boolean;
}

const AdAccountItem = memo(({ 
  account, 
  onSelect, 
  onCopy, 
  isSelected, 
  isCopied 
}: AdAccountItemProps) => {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-700 transition-colors duration-150 cursor-pointer border-b border-gray-700 last:border-b-0"
      style={{ backgroundColor: '#1f2937' }}
      onClick={() => onSelect(account)}
      role="option"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(account);
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
              onCopy(account.accountId, account.id);
            }}
            className="p-1 hover:bg-gray-600 rounded transition-colors duration-150 bg-gray-800"
            style={{ backgroundColor: '#1f2937' }}
            title="Copy Account ID"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

AdAccountItem.displayName = 'AdAccountItem';

export default AdAccountItem;