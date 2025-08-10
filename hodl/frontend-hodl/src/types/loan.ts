// Contract-based types
export interface ContractLoan {
  id: number;
  lender: string;
  borrower: string;
  "collateral-btc-address": string;
  "collateral-btc-amount": number;
  "loan-amount": number;
  status: number; // 0=active, 1=repaid, 2=defaulted
}

// UI-friendly types (mapped from contract types)
export interface UiLoan {
  id: number;
  lender: string;
  borrower?: string;
  btcAddress?: string;
  btcAmount?: number;
  loanAmount: number;
  status: 'created' | 'accepted' | 'liquidated';
  createdAt: Date;
}

export enum LoanStatus {
  CREATED = 0,    // Loan created, available to accept
  REPAID = 1,     // Loan completed successfully
  DEFAULTED = 2,  // Loan liquidated
}

// Helper function to convert contract loan to UI loan
export function contractLoanToUiLoan(contractLoan: ContractLoan): UiLoan {
  // Determine status based on contract state
  let status: 'created' | 'accepted' | 'liquidated';
  
  if (contractLoan.status === LoanStatus.CREATED) {
    // If BTC address is empty or BTC amount is 0, it's still available (created)
    // If borrower has provided BTC details, it's been accepted
    status = (!contractLoan["collateral-btc-address"] || 
              contractLoan["collateral-btc-address"] === "" ||
              contractLoan["collateral-btc-amount"] === 0) ? 'created' : 'accepted';
  } else if (contractLoan.status === LoanStatus.DEFAULTED) {
    status = 'liquidated';
  } else {
    status = 'accepted'; // REPAID status
  }

  return {
    id: contractLoan.id,
    lender: contractLoan.lender,
    borrower: contractLoan.borrower !== contractLoan.lender ? contractLoan.borrower : undefined,
    btcAddress: contractLoan["collateral-btc-address"] || undefined,
    btcAmount: contractLoan["collateral-btc-amount"] || undefined,
    loanAmount: contractLoan["loan-amount"],
    status,
    createdAt: new Date(), // Contract doesn't store creation time, using current time
  };
}
