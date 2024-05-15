import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import Logo from '@/components/Logo';
import { auth, db } from '@/firebaseConfig';
import { useFirebaseApiCallback } from '@/hooks/useFirebaseApiCallback';
import { Link, router } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile, type User } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SignUpFormType {
  username: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignUpFormType>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });
  const [newUser, setNewUser] = useState<User | null>(null);
  const [createUserCallback, userPending, userError] = useFirebaseApiCallback(
    async (data) => {
      const { username, email, password } = data;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const usersRef = collection(db, 'users');
      setNewUser(userCredential.user);
      await updateProfile(userCredential.user, {
        displayName: username,
      });
      await setDoc(doc(usersRef, userCredential.user.uid), {
        uid: userCredential.user.uid,
        username,
        email,
        profileImageURL: '',
        followers: [],
        following: [],
        recipes: [],
        savedRecipes: [],
        createdAt: Date.now(),
      });
    },
    [auth]
  );

  useEffect(() => {
    if (!userPending && newUser) {
      router.push('/home');
    }
  }, [userPending, newUser]);

  return (
    <SafeAreaView className="h-full bg-snow">
      <ScrollView>
        <View className="w-full h-[75vh] justify-center px-4 my-6">
          <Logo />
          <FormField
            name="username"
            control={control}
            label="Username"
            styles="mt-4"
            textContentType="username"
            rules={{
              required: { value: true, message: 'Password is required' },
              maxLength: { value: 50, message: 'Max length = 50' },
              minLength: { value: 4, message: 'Min length = 4' },
            }}
          />
          <FormField
            name="email"
            control={control}
            label="Email"
            styles="mt-4"
            textContentType="emailAddress"
            rules={{
              required: { value: true, message: 'Email is required' },
              maxLength: { value: 50, message: 'Max length = 50' },
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email' },
            }}
          />
          <FormField
            name="password"
            control={control}
            label="Password"
            styles="mt-4"
            textContentType="password"
            rules={{
              required: { value: true, message: 'Password is required' },
              maxLength: { value: 50, message: 'Max length = 50' },
              minLength: { value: 8, message: 'Min length = 8' },
            }}
          />
          <CustomButton
            title="Sign up"
            containerStyles="w-full mt-7"
            handlePress={handleSubmit((data) => createUserCallback(data))}
            disabled={!isValid}
            loading={userPending}
          />
          {userError?.message ? <Text className="text-red-500 text-sm mt-2">{userError.message}</Text> : null}
          <View className="justify-center flex-row gap-2 mt-3">
            <Text className="text-md font-robolight">Have an account already?</Text>
            <Link href="/sign-in" className="text-secondary font-robobold">
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
