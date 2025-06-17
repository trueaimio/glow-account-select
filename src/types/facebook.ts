
export interface AdAccount {
  id: string;
  name: string;
  accountId: string;
  isActive: boolean;
}

export interface FacebookAuthState {
  currentStep: number;
  isLoading: boolean;
  isAuthenticated: boolean;
  selectedAccount: AdAccount | null;
}
