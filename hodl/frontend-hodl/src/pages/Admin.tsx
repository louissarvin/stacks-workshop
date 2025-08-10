import React, { useState } from 'react';
import { Settings, RefreshCw, DollarSign, TrendingUp, Wallet } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

interface AdminProps {
  btcPrice: number;
}

const Admin: React.FC<AdminProps> = ({ btcPrice }) => {
  const [newBtcPrice, setNewBtcPrice] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState(false);
  const { userData, connectWallet, handleSetMockPrice } = useWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(newBtcPrice);
    if (price > 0) {
      setIsUpdating(true);
      try {
        await handleSetMockPrice(price);
        setNewBtcPrice('');
      } catch (error) {
        console.error('Error setting price:', error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const pricePresets = [
    { label: 'Bear Market', price: 25000 },
    { label: 'Current Market', price: 45000 },
    { label: 'Bull Market', price: 75000 },
    { label: 'All-Time High', price: 100000 },
  ];

  if (!userData) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
              Admin Panel
            </span>
          </h1>
          <p className="text-white/70 text-xl leading-relaxed">
            Connect your wallet to access admin functions
          </p>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 text-center">
          <Wallet className="w-16 h-16 text-amber-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Wallet Required</h2>
          <p className="text-white/60 mb-8">
            You need to connect your Stacks wallet to access admin functions
          </p>
          <button
            onClick={connectWallet}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
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
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
            Admin Panel
          </span>
        </h1>
        <p className="text-white/70 text-xl leading-relaxed">
          Manage system settings and BTC price oracle
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Price Display */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <DollarSign className="w-8 h-8 text-green-300" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Current BTC Price</h2>
              <p className="text-white/60">Live oracle price feed</p>
            </div>
          </div>

          <div className="text-center py-8">
            <div className="text-6xl font-bold text-white mb-4">
              ${btcPrice.toLocaleString()}
            </div>
            <p className="text-white/60">USD per Bitcoin</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <TrendingUp className="w-6 h-6 text-green-300 mx-auto mb-2" />
              <p className="text-white/60 text-sm">24h Change</p>
              <p className="text-green-300 font-semibold">+2.5%</p>
            </div>
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <DollarSign className="w-6 h-6 text-blue-300 mx-auto mb-2" />
              <p className="text-white/60 text-sm">Market Cap</p>
              <p className="text-blue-300 font-semibold">$890B</p>
            </div>
          </div>
        </div>

        {/* Price Update Form */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-amber-500/20 rounded-xl">
              <Settings className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Update Price</h2>
              <p className="text-white/60">Set new BTC price for testing</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/80 text-lg font-medium mb-3">
                New BTC Price (USD)
              </label>
              <input
                type="number"
                value={newBtcPrice}
                onChange={(e) => setNewBtcPrice(e.target.value)}
                placeholder="Enter new BTC price"
                className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all duration-300"
                min="1"
                required
              />
            </div>

            {/* Price Presets */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-3">
                Quick Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {pricePresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setNewBtcPrice(preset.price.toString())}
                    className="px-3 py-2 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg text-white/80 hover:bg-white/10 transition-all duration-300 text-sm"
                  >
                    <div className="font-medium">{preset.label}</div>
                    <div className="text-xs text-white/60">${preset.price.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isUpdating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Updating Price...</span>
                </>
              ) : (
                <>
                  <Settings className="w-5 h-5" />
                  <span>Set BTC Price</span>
                </>
              )}
            </button>
          </form>

          {/* Warning */}
          <div className="mt-6 p-4 backdrop-blur-md bg-red-500/10 border border-red-400/20 rounded-xl">
            <p className="text-red-300 text-sm">
              <strong>Warning:</strong> Changing the BTC price will affect all active loans and may trigger liquidations if collateral ratios fall below 120%.
            </p>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">System Status</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-white font-semibold mb-2">Oracle Status</h3>
            <p className="text-green-300 text-sm">Online</p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-white font-semibold mb-2">Smart Contract</h3>
            <p className="text-blue-300 text-sm">Active</p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-white font-semibold mb-2">Network</h3>
            <p className="text-purple-300 text-sm">Stacks Mainnet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;