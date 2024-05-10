import { auth } from '@/firebaseConfig';
import { onAuthStateChanged, type User } from 'firebase/auth';
import React, { useContext, useEffect, useMemo, useState } from 'react';

interface StoreProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type StoreContextType = StoreProps;

interface StoreProviderProps {
  children: React.ReactNode;
}

const initialContext: StoreContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const StoreContext = React.createContext<StoreContextType>(initialContext);

export const useStoreContext = () => useContext(StoreContext);

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, setState] = useState<StoreProps>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setState({ user, isAuthenticated: true, isLoading: false });
      } else {
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    });
    return () => unsubscribe();
  }, []);

  const value = useMemo(() => ({ ...state }), [state]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
