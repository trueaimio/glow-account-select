
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface AdAccount {
  id: string;
  name: string;
  accountId: string;
  isActive: boolean;
}

interface AccountSelectedStatusProps {
  selectedAccount: AdAccount | null;
}

const AccountSelectedStatus = ({ selectedAccount }: AccountSelectedStatusProps) => {
  if (!selectedAccount) return null;

  return (
    <div className="flex items-center space-x-3 px-6 py-4 bg-green-900/20 border border-green-700 rounded-xl text-green-300 animate-fade-in">
      <CheckCircle className="w-5 h-5" />
      <span className="font-medium">Account Selected: {selectedAccount.name}</span>
    </div>
  );
};

export default AccountSelectedStatus;
