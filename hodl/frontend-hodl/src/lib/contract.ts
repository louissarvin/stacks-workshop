import { STACKS_TESTNET } from "@stacks/network";
import {
  cvToValue,
  fetchCallReadOnlyFunction,
  OptionalCV,
  PrincipalCV,
  stringAsciiCV,
  TupleCV,
  uintCV,
  UIntCV,
} from "@stacks/transactions";
import { ContractLoan, contractLoanToUiLoan, UiLoan } from "../types/loan";

const CONTRACT_ADDRESS = "ST1Z9Q8F39NMNNAKRXDQZYNS2R6PJA5BVHHGRESTD";
const CONTRACT_NAME = "poh";

type LoanCV = {
  lender: PrincipalCV;
  borrower: PrincipalCV;
  "collateral-btc-address": any; // eslint-disable-line @typescript-eslint/no-explicit-any
  "collateral-btc-amount": UIntCV;
  "loan-amount": UIntCV;
  status: UIntCV;
};

// Get all loans by iterating through loan counter
export async function getAllLoans(): Promise<UiLoan[]> {
  try {
    // First, get the loan counter to know how many loans exist
    const loanCounterCV = (await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "get-loan-counter",
      functionArgs: [],
      senderAddress: CONTRACT_ADDRESS,
      network: STACKS_TESTNET,
    })) as UIntCV;

    const loanCount = parseInt(loanCounterCV.value.toString());

    // Fetch all loans
    const loans: UiLoan[] = [];
    for (let i = 0; i < loanCount; i++) {
      const loan = await getLoan(i);
      if (loan) loans.push(loan);
    }
    return loans;
  } catch (error) {
    console.error("Error fetching loans:", error);
    return [];
  }
}

// Get a specific loan by ID
export async function getLoan(loanId: number): Promise<UiLoan | null> {
  try {
    const loanDetails = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "get-loan",
      functionArgs: [uintCV(loanId)],
      senderAddress: CONTRACT_ADDRESS,
      network: STACKS_TESTNET,
    });

    const responseCV = loanDetails as OptionalCV<TupleCV<LoanCV>>;
    
    if (responseCV.type === "none") return null;
    if (responseCV.value.type !== "tuple") return null;

    const loanCV = responseCV.value.value;

    const contractLoan: ContractLoan = {
      id: loanId,
      lender: loanCV.lender.value,
      borrower: loanCV.borrower.value,
      "collateral-btc-address": cvToValue(loanCV["collateral-btc-address"]),
      "collateral-btc-amount": parseInt(loanCV["collateral-btc-amount"].value.toString()),
      "loan-amount": parseInt(loanCV["loan-amount"].value.toString()),
      status: parseInt(loanCV.status.value.toString()),
    };
    
    return contractLoanToUiLoan(contractLoan);
  } catch (error) {
    console.error(`Error fetching loan ${loanId}:`, error);
    return null;
  }
}

// Get current BTC price
export async function getBtcPrice(): Promise<number> {
  try {
    const priceCV = (await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "get-btc-price", // We'll need to add this to the contract
      functionArgs: [],
      senderAddress: CONTRACT_ADDRESS,
      network: STACKS_TESTNET,
    })) as UIntCV;

    return parseInt(priceCV.value.toString());
  } catch (error) {
    console.error("Error fetching BTC price:", error);
    return 29000; // fallback
  }
}

// Create new loan transaction options
export function createLoanTx(loanAmount: number) {
  return {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "create-loan",
    functionArgs: [uintCV(loanAmount)],
  };
}

// Accept loan transaction options
export function acceptLoanTx(loanId: number, btcAddress: string, btcAmount: number) {
  return {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "accept-loan",
    functionArgs: [
      uintCV(loanId),
      stringAsciiCV(btcAddress),
      uintCV(btcAmount),
    ],
  };
}

// Liquidate loan transaction options
export function liquidateLoanTx(loanId: number) {
  return {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "liquidate-loan",
    functionArgs: [uintCV(loanId)],
  };
}

// Set mock price transaction options (admin function)
export function setMockPriceTx(price: number) {
  return {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "set-mock-price",
    functionArgs: [uintCV(price)],
  };
}
