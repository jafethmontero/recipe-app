import { auth } from '@/firebaseConfig';
import { Recipe } from '@/types/types';
import { onAuthStateChanged, type User } from 'firebase/auth';
import React, { useContext, useEffect, useMemo, useState } from 'react';

interface UserStateProps {
  authUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type RecipesT = Recipe[] | [];
type StoreContextType = UserStateProps & {
  refreshCount: number;
  setRefreshCount: React.Dispatch<React.SetStateAction<number>>;
};

interface StoreProviderProps {
  children: React.ReactNode;
}

const initialContext: StoreContextType = {
  authUser: null,
  isAuthenticated: false,
  isLoading: true,
  refreshCount: 0,
  setRefreshCount: () => {},
};

const StoreContext = React.createContext<StoreContextType>(initialContext);

export const useStoreContext = () => useContext(StoreContext);

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [userState, SetUserState] = useState<UserStateProps>({
    authUser: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const [refreshCount, setRefreshCount] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        SetUserState({ authUser: user, isAuthenticated: true, isLoading: false });
      } else {
        SetUserState({ authUser: null, isAuthenticated: false, isLoading: false });
      }
    });
    return () => unsubscribe();
  }, []);

  const value = useMemo(() => ({ ...userState, refreshCount, setRefreshCount }), [userState, refreshCount]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
