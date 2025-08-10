import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletProvider';
import Layout from './components/Layout';
import ToastContainer, { Toast } from './components/Toast';
import Dashboard from './pages/Dashboard';
import CreateLoan from './pages/CreateLoan';
import AcceptLoan from './pages/AcceptLoan';
import Admin from './pages/Admin';
import Liquidate from './pages/Liquidate';
import LoanStatus from './pages/LoanStatus';
import { useLoansData } from './hooks/useLoansData';
import { useState } from 'react';

function AppContent() {
  const { loans, btcPrice, isLoading, error, refetch } = useLoansData();
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  if (isLoading) {
    return (
      <Layout btcPrice={btcPrice}>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading loans data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout btcPrice={btcPrice}>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error: {error}</p>
            <button 
              onClick={refetch}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout btcPrice={btcPrice}>
      <Routes>
        <Route path="/" element={<Dashboard loans={loans} />} />
        <Route path="/create-loan" element={<CreateLoan />} />
        <Route path="/accept-loan" element={<AcceptLoan loans={loans} />} />
        <Route path="/admin" element={<Admin btcPrice={btcPrice} />} />
        <Route path="/liquidate" element={<Liquidate loans={loans} btcPrice={btcPrice} />} />
        <Route path="/status" element={<LoanStatus loans={loans} btcPrice={btcPrice} />} />
      </Routes>
      
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </Layout>
  );
}

function App() {
  return (
    <WalletProvider>
      <Router>
        <AppContent />
      </Router>
    </WalletProvider>
  );
}

export default App;