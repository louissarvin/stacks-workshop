import React, { useState } from 'react';
import { Plus, RefreshCw, Wallet } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { formatStx, parseStx } from '../lib/utils';

const CreateLoan: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const { userData, stxBalance, connectWallet, handleCreateLoan } = useWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const amount = parseFloat(loanAmount);
    if (amount <= 0) {
      setError('Please enter a valid loan amount');
      return;
    }

    if (!userData) {
      setError('Please connect your wallet first');
      return;
    }

    setIsCreating(true);
    try {
      console.log('Creating loan with amount:', amount, 'STX');
      console.log('Converted to microSTX:', parseStx(amount));
      
      await handleCreateLoan(parseStx(amount)); // Convert STX to microSTX
      setLoanAmount('');
      setSuccess('Transaction submitted! Your loan will be created once the transaction is confirmed on the blockchain. This may take a few minutes.');
      console.log('Loan created successfully!');
    } catch (error) {
      console.error('Error creating loan:', error);
      setError(error instanceof Error ? error.message : 'Failed to create loan');
    } finally {
      setIsCreating(false);
    }
  };

  if (!userData) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
              Create Loan
            </span>
          </h1>
          <p className="text-white/70 text-xl leading-relaxed">
            Connect your wallet to create a new loan offer
          </p>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 text-center">
          <Wallet className="w-16 h-16 text-blue-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Wallet Required</h2>
          <p className="text-white/60 mb-8">
            You need to connect your Stacks wallet to create loan offers
          </p>
          <button
            onClick={connectWallet}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
            Create Loan
          </span>
        </h1>
        <p className="text-white/70 text-xl leading-relaxed">
          Offer a new loan to borrowers on the platform
        </p>
      </div>

      {/* Create Loan Form */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 hover:bg-white/15 transition-all duration-300">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Plus className="w-8 h-8 text-blue-300" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">New Loan Offer</h2>
            <p className="text-white/60">Set your loan terms and amount</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-white/80 text-lg font-medium mb-4">
              Loan Amount (STX)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter STX amount to lend"
              className="w-full px-6 py-4 text-xl backdrop-blur-md bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300"
              step="0.1"
              min="0.1"
              required
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-white/50 text-sm">
                Minimum loan amount is 0.1 STX
              </p>
              <p className="text-white/70 text-sm">
                Balance: {formatStx(stxBalance)} STX
              </p>
            </div>
            {error && (
              <div className="mt-3 p-3 bg-red-500/10 border border-red-400/20 rounded-lg">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="mt-3 p-3 bg-green-500/10 border border-green-400/20 rounded-lg">
                <p className="text-green-300 text-sm">{success}</p>
              </div>
            )}
          </div>

          {/* Loan Terms Info */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Loan Terms</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Collateral Type:</span>
                <span className="text-white">Bitcoin (BTC)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Collateral Ratio:</span>
                <span className="text-white">150% minimum</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Interest Rate:</span>
                <span className="text-white">Variable based on market</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Liquidation Threshold:</span>
                <span className="text-white">120% collateral ratio</span>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isCreating || !loanAmount || parseFloat(loanAmount) <= 0}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-6 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 text-xl"
          >
            {isCreating ? (
              <>
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span>Submitting Transaction...</span>
              </>
            ) : (
              <>
                <Plus className="w-6 h-6" />
                <span>Create Loan Offer</span>
              </>
            )}
          </button>

          {/* Blockchain Info */}
          <div className="mt-4 p-4 backdrop-blur-md bg-blue-500/10 border border-blue-400/20 rounded-xl">
            <p className="text-blue-300 text-sm">
              <strong>Note:</strong> After clicking "Create Loan Offer", the transaction will be submitted to the Stacks blockchain. 
              It may take 2-10 minutes for the transaction to be confirmed and your loan to appear in the dashboard.
            </p>
          </div>
        </form>

        {/* How it Works */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <h3 className="text-white font-semibold mb-4">How it Works</h3>
          <div className="space-y-3 text-sm text-white/60">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-300 text-xs font-bold">1</span>
              </div>
              <p>You create a loan offer with your desired STX amount</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-300 text-xs font-bold">2</span>
              </div>
              <p>Borrowers can accept your loan by providing BTC collateral</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-300 text-xs font-bold">3</span>
              </div>
              <p>You earn interest while the loan is active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLoan;