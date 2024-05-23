import { auth, db } from '@/firebaseConfig';
import { useFirebaseApi } from '@/hooks/useFirebaseApi';
import { UserObject } from '@/types/types';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { DocumentData, collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useMemo, useState } from 'react';

interface UserStateProps {
  authUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type StoreContextType = UserStateProps & {
  refreshTab: number;
  setRefreshTab: React.Dispatch<React.SetStateAction<number>>;
  usersObject: Record<string, UserObject>;
};

interface StoreProviderProps {
  children: React.ReactNode;
}

const initialContext: StoreContextType = {
  authUser: null,
  isAuthenticated: false,
  isLoading: true,
  refreshTab: 0,
  setRefreshTab: () => {},
  usersObject: {},
};

const StoreContext = React.createContext<StoreContextType>(initialContext);

export const useStoreContext = () => useContext(StoreContext);

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [refreshTab, setRefreshTab] = useState<number>(0);
  const [usersObject, setUsersObject] = useState<Record<string, UserObject>>({});
  const [userState, SetUserState] = useState<UserStateProps>({
    authUser: null,
    isAuthenticated: false,
    isLoading: true,
  });

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

  useFirebaseApi(
    async () => {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const users = usersSnapshot.docs.reduce(
        (acc, doc) => {
          acc[doc.id] = doc.data();
          return acc;
        },
        {} as Record<string, UserObject>
      );
      return users;
    },
    (users) => {
      if (users) {
        setUsersObject(users);
      }
    },
    []
  );

  const value = useMemo(
    () => ({ ...userState, refreshTab, setRefreshTab, usersObject }),
    [userState, refreshTab, usersObject]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
