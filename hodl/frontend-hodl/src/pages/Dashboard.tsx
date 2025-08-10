import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, CheckCircle, Settings, AlertTriangle, BarChart3, TrendingUp } from 'lucide-react';
import { UiLoan } from '../types/loan';
import { formatStx } from '../lib/utils';

interface DashboardProps {
  loans: UiLoan[];
}

const Dashboard: React.FC<DashboardProps> = ({ loans }) => {
  const stats = {
    totalLoans: loans.length,
    activeLoans: loans.filter(loan => loan.status === 'accepted').length,
    createdLoans: loans.filter(loan => loan.status === 'created').length,
    liquidatedLoans: loans.filter(loan => loan.status === 'liquidated').length,
    totalVolume: loans.reduce((sum, loan) => sum + loan.loanAmount, 0),
  };

  const quickActions = [
    {
      title: 'Create Loan',
      description: 'Create a new loan offer',
      icon: Plus,
      path: '/create-loan',
      color: 'from-blue-500 to-purple-600',
    },
    {
      title: 'Accept Loan',
      description: 'Accept an existing loan',
      icon: CheckCircle,
      path: '/accept-loan',
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Admin Panel',
      description: 'Manage BTC price settings',
      icon: Settings,
      path: '/admin',
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Liquidate',
      description: 'Liquidate undercollateralized loans',
      icon: AlertTriangle,
      path: '/liquidate',
      color: 'from-red-500 to-pink-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
            Dashboard
          </span>
        </h1>
        <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
          Monitor your decentralized Bitcoin-collateralized lending activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Total Loans</p>
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
              <p className="text-white/60 text-sm">Active Loans</p>
              <p className="text-white text-2xl font-bold">{stats.activeLoans}</p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Plus className="w-6 h-6 text-amber-300" />
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
              <AlertTriangle className="w-6 h-6 text-red-300" />
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
              <p className="text-white/60 text-sm">Total Volume</p>
              <p className="text-white text-2xl font-bold">{formatStx(stats.totalVolume)} STX</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.path}
                to={action.path}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`p-4 bg-gradient-to-r ${action.color} rounded-xl group-hover:shadow-lg transition-all duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">{action.title}</h3>
                    <p className="text-white/60 text-sm">{action.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
          <Link
            to="/status"
            className="text-blue-300 hover:text-blue-200 transition-colors font-medium"
          >
            View All →
          </Link>
        </div>

        {loans.length === 0 ? (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 text-lg">No loans created yet</p>
            <p className="text-white/40 text-sm mt-2">Create your first loan to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {loans.slice(-5).reverse().map((loan) => (
              <div key={loan.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    loan.status === 'created' ? 'bg-blue-500/20' :
                    loan.status === 'accepted' ? 'bg-green-500/20' :
                    'bg-red-500/20'
                  }`}>
                    {loan.status === 'created' && <Plus className="w-4 h-4 text-blue-300" />}
                    {loan.status === 'accepted' && <CheckCircle className="w-4 h-4 text-green-300" />}
                    {loan.status === 'liquidated' && <AlertTriangle className="w-4 h-4 text-red-300" />}
                  </div>
                  <div>
                    <p className="text-white font-medium">Loan #{loan.id}</p>
                    <p className="text-white/60 text-sm">
                      {formatStx(loan.loanAmount)} STX • {loan.status}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-sm">
                    {loan.createdAt.toLocaleDateString()}
                  </p>
                  <p className="text-white/40 text-xs">
                    {loan.createdAt.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;