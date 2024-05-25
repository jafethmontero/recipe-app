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
  const [createUserCallback, userPending] = useFirebaseApiCallback(
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
              required: { value: true, message: 'This is a required field' },
              maxLength: { value: 50, message: 'Username must be 50 characters or less.' },
              minLength: { value: 3, message: 'Username must contain at least 3 characters.' },
            }}
            autoCapitalize="none"
          />
          <FormField
            name="email"
            control={control}
            label="Email"
            styles="mt-4"
            textContentType="emailAddress"
            rules={{
              required: { value: true, message: 'This is a required field' },
              maxLength: { value: 254, message: 'Email address must be 254 characters or less.' },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address format',
              },
            }}
            autoCapitalize="none"
          />
          <FormField
            name="password"
            control={control}
            label="Password"
            styles="mt-4"
            textContentType="password"
            rules={{
              required: { value: true, message: 'This is a required field' },
              minLength: { value: 8, message: 'Password must be at least 8 characters long.' },
            }}
            autoCapitalize="none"
          />
          <CustomButton
            title="Sign up"
            containerStyles="w-full mt-7"
            handlePress={handleSubmit((data) => createUserCallback(data))}
            disabled={!isValid || userPending}
            loading={userPending}
          />
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
