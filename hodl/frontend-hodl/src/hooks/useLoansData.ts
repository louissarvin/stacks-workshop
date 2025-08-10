import { useState, useEffect } from 'react';
import { getAllLoans, getBtcPrice } from '../lib/contract';
import { UiLoan } from '../types/loan';

export function useLoansData() {
  const [loans, setLoans] = useState<UiLoan[]>([]);
  const [btcPrice, setBtcPrice] = useState<number>(29000);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [loansData, priceData] = await Promise.all([
        getAllLoans(),
        getBtcPrice(),
      ]);
      
      setLoans(loansData);
      setBtcPrice(priceData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return {
    loans,
    btcPrice,
    isLoading,
    error,
    refetch,
  };
}
