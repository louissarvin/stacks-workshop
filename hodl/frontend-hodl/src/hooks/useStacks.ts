import {
  acceptLoanTx,
  createLoanTx,
  liquidateLoanTx,
  setMockPriceTx,
} from "../lib/contract";
import { getStxBalance } from "../lib/utils";
import {
  AppConfig,
  openContractCall,
  showConnect,
  type UserData,
  UserSession,
} from "@stacks/connect";
import { PostConditionMode } from "@stacks/transactions";
import { useEffect, useState } from "react";

const appDetails = {
  name: "HODL Lending Platform",
  icon: "https://cryptologos.cc/logos/stacks-stx-logo.png",
};

const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });

export function useStacks() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [stxBalance, setStxBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function connectWallet() {
    showConnect({
      appDetails,
      onFinish: () => {
        window.location.reload();
      },
      userSession,
    });
  }

  function disconnectWallet() {
    userSession.signUserOut();
    setUserData(null);
    setStxBalance(0);
  }

  const handleCreateLoan = async (amount: number) => {
    if (!userData || !userData.profile.stxAddress) {
      console.error('Wallet not connected');
      alert('❌ Please connect your wallet first!');
      return;
    }

    console.log(`Creating loan with amount: ${amount} STX`);
    console.log('Wallet address:', userData.profile.stxAddress.testnet);
    console.log('User connected:', !!userData);
    
    // Fix: Don't convert here - amount is already in microSTX from CreateLoan.tsx
    const microStxAmount = amount;
    console.log(`Amount in microSTX: ${microStxAmount}`);
    console.log(`Amount in STX: ${microStxAmount / 1000000}`);

    try {
      const transaction = await createLoanTx(microStxAmount);
      console.log('Transaction object created:', transaction);
      
      // Force Leather to show popup by adding explicit options
      console.log('🔐 Opening Leather wallet for signing...');
      console.log('WATCH FOR LEATHER EXTENSION POPUP NOW!');
      
      await openContractCall({
        ...transaction,
        userSession,
        appDetails,
        postConditionMode: PostConditionMode.Deny,
        postConditions: [],
        onFinish: (data) => {
          console.log('✅ Transaction signed and submitted:', data);
          console.log('Transaction ID:', data.txId);
          console.log('View on explorer:', `https://explorer.stacks.co/txid/${data.txId}?chain=testnet`);
          
          // This alert shows AFTER signing
          alert(`✅ Transaction Submitted Successfully!\n\nTransaction ID: ${data.txId}\n\n🔗 Track your transaction at:\nhttps://explorer.stacks.co/txid/${data.txId}?chain=testnet`);
        },
        onCancel: () => {
          console.log('❌ Transaction cancelled by user in wallet');
          alert('Transaction was cancelled in your wallet.');
        }
      });
    } catch (error) {
      console.error('Error creating loan:', error);
      alert(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    }
  };

  async function handleAcceptLoan(loanId: number, btcAddress: string, btcAmount: number) {
    if (!userData) {
      throw new Error("User not connected");
    }

    if (!btcAddress || btcAmount <= 0) {
      throw new Error("Valid BTC address and amount required");
    }

    setIsLoading(true);
    try {
      const txOptions = acceptLoanTx(loanId, btcAddress, btcAmount);
      await openContractCall({
        ...txOptions,
        appDetails,
        onFinish: (data) => {
          console.log("Accept loan transaction:", data);
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (error) {
      console.error("Error accepting loan:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLiquidateLoan(loanId: number) {
    if (!userData) {
      throw new Error("User not connected");
    }

    setIsLoading(true);
    try {
      const txOptions = liquidateLoanTx(loanId);
      await openContractCall({
        ...txOptions,
        appDetails,
        onFinish: (data) => {
          console.log("Liquidate loan transaction:", data);
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (error) {
      console.error("Error liquidating loan:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSetMockPrice(price: number) {
    if (!userData) {
      throw new Error("User not connected");
    }

    if (price <= 0) {
      throw new Error("Price must be greater than 0");
    }

    setIsLoading(true);
    try {
      const txOptions = setMockPriceTx(price);
      await openContractCall({
        ...txOptions,
        appDetails,
        onFinish: (data) => {
          console.log("Set price transaction:", data);
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (error) {
      console.error("Error setting price:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  // Handle authentication state
  useEffect(() => {
    try {
      if (userSession.isSignInPending()) {
        userSession.handlePendingSignIn().then((userData) => {
          setUserData(userData);
        });
      } else if (userSession.isUserSignedIn()) {
        setUserData(userSession.loadUserData());
      }
    } catch (error) {
      console.error('Session data error - clearing storage:', error);
      // Clear corrupted session data
      localStorage.removeItem('blockstack-session');
      localStorage.removeItem('stacks-session');
      sessionStorage.clear();
      // Reload to start fresh
      window.location.reload();
    }
  }, []);

  // Fetch STX balance when user connects
  useEffect(() => {
    if (userData) {
      const address = userData.profile.stxAddress.testnet;
      getStxBalance(address).then((balance) => {
        setStxBalance(balance);
      });
    }
  }, [userData]);

  return {
    userData,
    stxBalance,
    isLoading,
    connectWallet,
    disconnectWallet,
    handleCreateLoan,
    handleAcceptLoan,
    handleLiquidateLoan,
    handleSetMockPrice,
  };
}
