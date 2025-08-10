import React, { useState } from 'react';
import { AlertTriangle, RefreshCw, Shield, Wallet } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { UiLoan } from '../types/loan';
import { formatStx } from '../lib/utils';

interface LiquidateProps {
  loans: UiLoan[];
  btcPrice: number;
}

const Liquidate: React.FC<LiquidateProps> = ({ loans, btcPrice }) => {
  const [liquidateLoanId, setLiquidateLoanId] = useState<string>('');
  const [isLiquidating, setIsLiquidating] = useState(false);
  const { userData, connectWallet, handleLiquidateLoan } = useWallet();

  const acceptedLoans = loans.filter(loan => loan.status === 'accepted');
  
  // Debug logging
  console.log('All loans:', loans);
  console.log('Accepted loans:', acceptedLoans);
  console.log('Loan statuses:', loans.map(loan => ({ id: loan.id, status: loan.status, borrower: loan.borrower, btcAmount: loan.btcAmount })));

  const calculateCollateralRatio = (loan: UiLoan) => {
    if (!loan.btcAmount) return 0;
    const collateralValue = (loan.btcAmount / 100000000) * btcPrice; // Convert from satoshis
    const loanAmountInStx = loan.loanAmount / 1000000; // Convert microSTX to STX
    return (collateralValue / loanAmountInStx) * 100;
  };

  const isLiquidatable = (loan: UiLoan) => {
    return calculateCollateralRatio(loan) < 120;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(liquidateLoanId);
    if (id >= 0) {
      setIsLiquidating(true);
      try {
        await handleLiquidateLoan(id);
        setLiquidateLoanId('');
      } catch (error) {
        console.error('Error liquidating loan:', error);
      } finally {
        setIsLiquidating(false);
      }
    }
  };

  if (!userData) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">
              Liquidate Loans
            </span>
          </h1>
          <p className="text-white/70 text-xl leading-relaxed">
            Connect your wallet to liquidate undercollateralized loans
          </p>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 text-center">
          <Wallet className="w-16 h-16 text-red-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Wallet Required</h2>
          <p className="text-white/60 mb-8">
            You need to connect your Stacks wallet to liquidate loans
          </p>
          <button
            onClick={connectWallet}
            className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-pink-400 to-rose-400">
            Liquidate Loans
          </span>
        </h1>
        <p className="text-white/70 text-xl leading-relaxed">
          Liquidate undercollateralized loans to protect the protocol
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liquidation Form */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <AlertTriangle className="w-8 h-8 text-red-300" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Liquidate</h2>
              <p className="text-white/60">Execute liquidation</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/80 text-lg font-medium mb-3">
                Loan ID
              </label>
              <input
                type="number"
                value={liquidateLoanId}
                onChange={(e) => setLiquidateLoanId(e.target.value)}
                placeholder="Enter loan ID to liquidate"
                className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-transparent transition-all duration-300"
                min="1"
                required
              />
            </div>

            {/* Liquidation Info */}
            <div className="backdrop-blur-md bg-red-500/10 border border-red-400/20 rounded-xl p-4">
              <h3 className="text-red-300 font-semibold mb-3">Liquidation Rules</h3>
              <div className="space-y-2 text-sm text-red-200">
                <p>• Loans below 120% collateral ratio can be liquidated</p>
                <p>• Liquidator receives a portion of the collateral</p>
                <p>• Remaining collateral is returned to borrower</p>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLiquidating}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLiquidating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Liquidating...</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5" />
                  <span>Liquidate Loan</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Active Loans */}
        <div className="lg:col-span-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Shield className="w-6 h-6 text-blue-300" />
            </div>
            <h2 className="text-2xl font-bold text-white">Active Loans</h2>
          </div>

          {acceptedLoans.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/60 text-lg">No active loans</p>
              <p className="text-white/40 text-sm mt-2">All loans are safe or no loans exist</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-4 px-2 font-semibold text-white/80">ID</th>
                    <th className="text-left py-4 px-2 font-semibold text-white/80">Loan (STX)</th>
                    <th className="text-left py-4 px-2 font-semibold text-white/80">Collateral (BTC)</th>
                    <th className="text-left py-4 px-2 font-semibold text-white/80">Collateral Value</th>
                    <th className="text-left py-4 px-2 font-semibold text-white/80">Ratio</th>
                    <th className="text-left py-4 px-2 font-semibold text-white/80">Status</th>
                    <th className="text-left py-4 px-2 font-semibold text-white/80">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {acceptedLoans.map((loan) => {
                    const ratio = calculateCollateralRatio(loan);
                    const liquidatable = isLiquidatable(loan);
                    const collateralValue = (loan.btcAmount || 0) / 100000000 * btcPrice; // Convert satoshis to BTC then to USD
                    
                    return (
                      <tr key={loan.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-2 font-mono text-indigo-300">#{loan.id}</td>
                        <td className="py-4 px-2">
                          <span className="font-semibold text-blue-300">
                            {formatStx(loan.loanAmount)} STX
                          </span>
                        </td>
                        <td className="py-4 px-2">
                          <span className="font-semibold text-amber-300">
                            {((loan.btcAmount || 0) / 100000000).toFixed(8)} BTC
                          </span>
                        </td>
                        <td className="py-4 px-2">
                          <span className="font-semibold text-green-300">
                            ${collateralValue.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-4 px-2">
                          <span className={`font-semibold ${
                            ratio < 120 ? 'text-red-300' :
                            ratio < 150 ? 'text-yellow-300' :
                            'text-green-300'
                          }`}>
                            {ratio.toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-4 px-2">
                          {liquidatable ? (
                            <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded-lg text-xs font-medium">
                              Liquidatable
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-lg text-xs font-medium">
                              Safe
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-2">
                          {liquidatable ? (
                            <button
                              onClick={() => setLiquidateLoanId(loan.id.toString())}
                              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-xs font-medium transition-colors"
                            >
                              Liquidate
                            </button>
                          ) : (
                            <span className="text-white/40 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Liquidation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">
            {acceptedLoans.length}
          </div>
          <p className="text-white/60">Active Loans</p>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-red-300 mb-2">
            {acceptedLoans.filter(loan => isLiquidatable(loan)).length}
          </div>
          <p className="text-white/60">Liquidatable</p>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-green-300 mb-2">
            {acceptedLoans.filter(loan => !isLiquidatable(loan)).length}
          </div>
          <p className="text-white/60">Safe Loans</p>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">
            ${btcPrice.toLocaleString()}
          </div>
          <p className="text-white/60">BTC Price</p>
        </div>
      </div>
    </div>
  );
};

export default Liquidate;