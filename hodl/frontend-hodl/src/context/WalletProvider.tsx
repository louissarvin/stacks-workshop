import { createContext, ReactNode } from 'react';
import { useStacks } from '../hooks/useStacks';
import type { UserData } from '@stacks/connect';

interface WalletContextType {
  userData: UserData | null;
  stxBalance: number;
  isLoading: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  handleCreateLoan: (loanAmount: number) => Promise<void>;
  handleAcceptLoan: (loanId: number, btcAddress: string, btcAmount: number) => Promise<void>;
  handleLiquidateLoan: (loanId: number) => Promise<void>;
  handleSetMockPrice: (price: number) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const stacksData = useStacks();

  return (
    <WalletContext.Provider value={stacksData}>
      {children}
    </WalletContext.Provider>
  );
}

export { WalletContext };
