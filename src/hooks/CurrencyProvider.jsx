import { useEffect, useState } from 'react';
import { CurrencyContext } from './CurrencyContext';

function getInitialCurrency() {
  return localStorage.getItem('currency') === 'krw' ? 'krw' : 'usd';
}

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(getInitialCurrency);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}
