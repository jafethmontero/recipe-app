import { auth, db } from '@/firebaseConfig';
import { FirebaseError } from 'firebase/app';
import { type User, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useCallback, useState } from 'react';

export interface SignUpFormType {
    username: string;
    email: string;
    password: string;
  }

const useCreateUserAccount = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState<User | null>(null);
    
    const createUserAccount = useCallback(
        async (data: SignUpFormType) => {
          const { username, email, password } = data;
          setLoading(true);
          try {
              const userCredential = await createUserWithEmailAndPassword(auth, email, password);
              setUser(userCredential.user);
              await updateProfile(userCredential.user, {
                displayName: username,
              });
              await addDoc(collection(db, 'users'), {
                uid: userCredential.user.uid,
                username,
                email,
                profileImageURL: '',
                followers: [],
                following: [],
                recipes: [],
                createdAt: Date.now(),
              });
            } catch (error) {
              if (error instanceof FirebaseError) {
                  setErrorMessage(error.message);
              }
              else {
                  setErrorMessage('An unknown error occurred');
              }
            } finally {
              setLoading(false);
            }

        }, [auth]);

  return {createUserAccount, loading, errorMessage, user};
}

export default useCreateUserAccount