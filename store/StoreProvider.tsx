import { auth } from '@/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';

interface StoreProps {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface StoreProviderProps {
  children: React.ReactNode;
}
const StoreContext = React.createContext<StoreProps>({ user: null, isAuthenticated: false, isLoading: true });

export const useStoreContext = () => useContext(StoreContext);

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, setState] = useState<StoreProps>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setState({ ...state, user, isAuthenticated: true });
      } else {
        setState({ ...state, user: null, isAuthenticated: false });
      }
      setState({ ...state, isLoading: false });
    });
  }, []);

  return (
    <StoreContext.Provider
      value={{ user: state.user, isAuthenticated: state.isAuthenticated, isLoading: state.isLoading }}
    >
      {children}
    </StoreContext.Provider>
  );
};
