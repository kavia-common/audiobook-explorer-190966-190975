import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiGet } from '../api/client';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [profile] = useState({ name: 'Guest' });
  const [purchases, setPurchases] = useState([]);
  const [toast, setToast] = useState('');

  useEffect(() => {
    // Load purchases on start
    apiGet('/purchases')
      .then((res) => setPurchases(res.items || []))
      .catch(() => setPurchases([]));
  }, []);

  // PUBLIC_INTERFACE
  const addPurchase = (items) => {
    setPurchases((prev) => [...items, ...prev]);
  };
  // PUBLIC_INTERFACE
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 2600);
  };

  const value = {
    profile,
    purchases,
    addPurchase,
    toast,
    showToast,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// PUBLIC_INTERFACE
export const useUser = () => {
  /** Hook to access user and purchases context. */
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};
