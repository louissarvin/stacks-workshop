import React from 'react';
import { BarChart3, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';
import { UiLoan } from '../types/loan';
import { formatStx, formatUsd } from '../lib/utils';

interface LoanStatusProps {
  loans: UiLoan[];
  btcPrice: number;
}

const LoanStatus: React.FC<LoanStatusProps> = ({ loans, btcPrice }) => {
  const getStatusColor = (status: UiLoan['status']) => {
    switch (status) {
      case 'created': return 'text-blue-300';
      case 'accepted': return 'text-green-300';
      case 'liquidated': return 'text-red-300';
      default: return 'text-gray-300';
    }
  };

  const getStatusIcon = (status: UiLoan['status']) => {
    switch (status) {
      case 'created': return <Clock className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'liquidated': return <XCircle className="w-4 h-4" />;
    }
  };

  const calculateCollateralRatio = (loan: UiLoan) => {
    if (!loan.btcAmount) return 0;
    const collateralValue = (loan.btcAmount / 100000000) * btcPrice; // Convert from satoshis
    const loanAmountInStx = loan.loanAmount / 1000000; // Convert microSTX to STX
    return (collateralValue / loanAmountInStx) * 100;
  };

  const stats = {
    totalLoans: loans.length,
    activeLoans: loans.filter(loan => loan.status === 'accepted').length,
    createdLoans: loans.filter(loan => loan.status === 'created').length,
    liquidatedLoans: loans.filter(loan => loan.status === 'liquidated').length,
    totalVolume: loans.reduce((sum, loan) => sum + loan.loanAmount, 0),
    totalCollateral: loans.reduce((sum, loan) => sum + (((loan.btcAmount || 0) / 100000000) * btcPrice), 0),
  };

  return (
    <div className="w-full max-w-none space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Loan Status
          </span>
        </h1>
        <p className="text-white/70 text-xl leading-relaxed">
          Comprehensive overview of all loan activities
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Total</p>
              <p className="text-white text-2xl font-bold">{stats.totalLoans}</p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-300" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Active</p>
              <p className="text-white text-2xl font-bold">{stats.activeLoans}</p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Created</p>
              <p className="text-white text-2xl font-bold">{stats.createdLoans}</p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <XCircle className="w-6 h-6 text-red-300" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Liquidated</p>
              <p className="text-white text-2xl font-bold">{stats.liquidatedLoans}</p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Volume</p>
              <p className="text-white text-xl font-bold">{formatStx(stats.totalVolume)} STX</p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Collateral</p>
              <p className="text-white text-lg font-bold">{formatUsd(stats.totalCollateral)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Loans Table */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 hover:bg-white/15 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-indigo-300" />
            </div>
            <h2 className="text-2xl font-bold text-white">All Loans</h2>
          </div>
          <div className="text-white/60">
            {loans.length} loan{loans.length !== 1 ? 's' : ''} total
          </div>
        </div>

        {loans.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 text-lg">No loans created yet</p>
            <p className="text-white/40 text-sm mt-2">Create your first loan to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 px-2 font-semibold text-white/80">ID</th>
                  <th className="text-left py-4 px-2 font-semibold text-white/80">Lender</th>
                  <th className="text-left py-4 px-2 font-semibold text-white/80">Borrower</th>
                  <th className="text-left py-4 px-2 font-semibold text-white/80">Loan (STX)</th>
                  <th className="text-left py-4 px-2 font-semibold text-white/80">BTC Collateral</th>
                  <th className="text-left py-4 px-2 font-semibold text-white/80">Collateral Value</th>
                  <th className="text-left py-4 px-2 font-semibold text-white/80">Ratio</th>
                  <th className="text-left py-4 px-2 font-semibold text-white/80">Status</th>
                  <th className="text-left py-4 px-2 font-semibold text-white/80">Created</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => {
                  const ratio = calculateCollateralRatio(loan);
                  const collateralValue = (loan.btcAmount || 0) * btcPrice;
                  
                  return (
                    <tr key={loan.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-2 font-mono text-indigo-300">#{loan.id}</td>
                      <td className="py-4 px-2 font-mono text-sm">
                        {loan.lender.substring(0, 8)}...{loan.lender.substring(-4)}
                      </td>
                      <td className="py-4 px-2 font-mono text-sm">
                        {loan.borrower ? (
                          `${loan.borrower.substring(0, 8)}...${loan.borrower.substring(-4)}`
                        ) : (
                          <span className="text-white/40">—</span>
                        )}
                      </td>
                      <td className="py-4 px-2">
                        <span className="font-semibold text-blue-300">
                          {formatStx(loan.loanAmount)} STX
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        {loan.btcAmount ? (
                          <span className="font-semibold text-amber-300">
                            {loan.btcAmount} BTC
                          </span>
                        ) : (
                          <span className="text-white/40">—</span>
                        )}
                      </td>
                      <td className="py-4 px-2">
                        {loan.btcAmount ? (
                          <span className="font-semibold text-green-300">
                            ${collateralValue.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-white/40">—</span>
                        )}
                      </td>
                      <td className="py-4 px-2">
                        {loan.btcAmount ? (
                          <span className={`font-semibold ${
                            ratio < 120 ? 'text-red-300' :
                            ratio < 150 ? 'text-yellow-300' :
                            'text-green-300'
                          }`}>
                            {ratio.toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-white/40">—</span>
                        )}
                      </td>
                      <td className="py-4 px-2">
                        <div className={`flex items-center space-x-2 ${getStatusColor(loan.status)}`}>
                          {getStatusIcon(loan.status)}
                          <span className="font-medium capitalize">{loan.status}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-white/60 text-sm">
                        <div>
                          <div>{loan.createdAt.toLocaleDateString()}</div>
                          <div className="text-xs text-white/40">
                            {loan.createdAt.toLocaleTimeString()}
                          </div>
                        </div>
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
  );
};

export default LoanStatus;