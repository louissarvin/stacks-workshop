import React, { useState } from 'react';
import { CheckCircle, RefreshCw, Wallet } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { UiLoan } from '../types/loan';
import { formatStx, abbreviateAddress } from '../lib/utils';

interface AcceptLoanProps {
  loans: UiLoan[];
}

const AcceptLoan: React.FC<AcceptLoanProps> = ({ loans }) => {
  const [borrowLoanId, setBorrowLoanId] = useState<string>('');
  const [btcAddress, setBtcAddress] = useState<string>('');
  const [btcAmount, setBtcAmount] = useState<string>('');
  const [isAccepting, setIsAccepting] = useState(false);
  const { userData, connectWallet, handleAcceptLoan } = useWallet();

  const availableLoans = loans.filter(loan => loan.status === 'created');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(borrowLoanId);
    const amount = parseFloat(btcAmount);
    if (id >= 0 && btcAddress && amount > 0) {
      setIsAccepting(true);
      try {
        await handleAcceptLoan(id, btcAddress, Math.floor(amount * 100000000)); // Convert to satoshis
        setBorrowLoanId('');
        setBtcAddress('');
        setBtcAmount('');
      } catch (error) {
        console.error('Error accepting loan:', error);
      } finally {
        setIsAccepting(false);
      }
    }
  };

  if (!userData) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
              Borrow Stacks
            </span>
          </h1>
          <p className="text-white/70 text-xl leading-relaxed">
            Connect your wallet to borrow 
          </p>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 text-center">
          <Wallet className="w-16 h-16 text-green-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Wallet Required</h2>
          <p className="text-white/60 mb-8">
            You need to connect your Stacks wallet to borrow
          </p>
          <button
            onClick={connectWallet}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
            Borrow
          </span>
        </h1>
        <p className="text-white/70 text-xl leading-relaxed">
          Borrow STX by providing Bitcoin collateral
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Loans */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Available Loans</h2>
          
          {availableLoans.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/60">No loans available</p>
              <p className="text-white/40 text-sm mt-2">Check back later for new loan offers</p>
            </div>
          ) : (
            <div className="space-y-4">
              {availableLoans.map((loan) => (
                <div
                  key={loan.id}
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  onClick={() => setBorrowLoanId(loan.id.toString())}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-semibold">Loan #{loan.id}</p>
                      <p className="text-green-300 text-lg font-bold">{formatStx(loan.loanAmount)} STX</p>
                      <p className="text-white/60 text-sm">
                        Lender: {abbreviateAddress(loan.lender)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-sm">Created</p>
                      <p className="text-white/40 text-xs">
                        {loan.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Accept Loan Form */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <CheckCircle className="w-8 h-8 text-green-300" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Borrow</h2>
              <p className="text-white/60">Provide collateral to borrow STX</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/80 text-lg font-medium mb-3">
                Loan ID
              </label>
              <input
                type="number"
                value={borrowLoanId}
                onChange={(e) => setBorrowLoanId(e.target.value)}
                placeholder="Enter loan ID"
                className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all duration-300"
                min="1"
                required
              />
            </div>
            
            <div>
              <label className="block text-white/80 text-lg font-medium mb-3">
                BTC Address
              </label>
              <input
                type="text"
                value={btcAddress}
                onChange={(e) => setBtcAddress(e.target.value)}
                placeholder="Enter your BTC address"
                className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all duration-300"
                required
              />
            </div>
            
            <div>
              <label className="block text-white/80 text-lg font-medium mb-3">
                BTC Collateral Amount
              </label>
              <input
                type="number"
                value={btcAmount}
                onChange={(e) => setBtcAmount(e.target.value)}
                placeholder="Enter BTC amount"
                className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all duration-300"
                step="0.00001"
                min="0.00001"
                required
              />
              <p className="text-white/50 text-sm mt-2">
                Minimum 150% collateralization ratio required
              </p>
            </div>

            {/* Collateral Info */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-3">Collateral Requirements</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Minimum Ratio:</span>
                  <span className="text-white">150%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Liquidation Threshold:</span>
                  <span className="text-red-300">120%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Collateral Type:</span>
                  <span className="text-white">Bitcoin (BTC)</span>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isAccepting}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isAccepting ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Accepting Loan...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Borrow</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AcceptLoan;