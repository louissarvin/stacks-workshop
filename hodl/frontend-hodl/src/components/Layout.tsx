import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, CheckCircle, Settings, AlertTriangle, BarChart3, DollarSign, Wallet, LogOut } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { abbreviateAddress, formatStx } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  btcPrice: number;
}

const Layout: React.FC<LayoutProps> = ({ children, btcPrice }) => {
  const location = useLocation();
  const { userData, stxBalance, connectWallet, disconnectWallet } = useWallet();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/create-loan', icon: Plus, label: 'Create Loan' },
    { path: '/accept-loan', icon: CheckCircle, label: 'Accept Loan' },
    { path: '/admin', icon: Settings, label: 'Admin' },
    { path: '/liquidate', icon: AlertTriangle, label: 'Liquidate' },
    { path: '/status', icon: BarChart3, label: 'Loan Status' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar Navigation */}
        <nav className="w-64 backdrop-blur-md bg-white/10 border-r border-white/20 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
                Proof-of-Hodl
              </span>
            </h1>
            <p className="text-white/70 text-sm">Loans</p>
          </div>

          {/* BTC Price Display */}
          <div className="mb-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-300" />
              <div>
                <p className="text-white/60 text-xs">BTC Price</p>
                <p className="text-white font-semibold">${btcPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2 mb-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-white/20 text-white border border-white/30'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Wallet Section */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4">
            {userData ? (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Wallet className="w-4 h-4 text-blue-300" />
                  <p className="text-white/60 text-xs">Connected</p>
                </div>
                <p className="text-white text-sm font-mono mb-2">
                  {abbreviateAddress(userData.profile.stxAddress.testnet)}
                </p>
                <p className="text-white/60 text-xs mb-3">
                  {formatStx(stxBalance)} STX
                </p>
                <button
                  onClick={disconnectWallet}
                  className="flex items-center space-x-2 text-red-300 hover:text-red-200 text-xs"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Disconnect</span>
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Wallet className="w-4 h-4 text-gray-400" />
                  <p className="text-white/60 text-xs">Not Connected</p>
                </div>
                <button
                  onClick={connectWallet}
                  className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs font-medium py-2 px-3 rounded-lg transition-all duration-300"
                >
                  Connect Wallet
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;