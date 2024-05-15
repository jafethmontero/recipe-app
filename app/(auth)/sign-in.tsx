import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import Logo from '@/components/Logo';
import { auth } from '@/firebaseConfig';
import { useFirebaseApiCallback } from '@/hooks/useFirebaseApiCallback';
import { Link, router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SignInFormType {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignInFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });
  const [signInCallback, userPending, userError] = useFirebaseApiCallback(
    async (data) => {
      const { email, password } = data;
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/home');
    },
    [auth]
  );

  return (
    <SafeAreaView className="h-full bg-snow">
      <ScrollView>
        <View className="w-full h-[75vh] justify-center px-4 my-6">
          <Logo />
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
              minLength: { value: 8, message: 'Min length = 8' },
            }}
          />
          <CustomButton
            title="Login"
            containerStyles="w-full mt-7"
            handlePress={handleSubmit((data) => signInCallback(data))}
            disabled={!isValid || userPending}
            loading={userPending}
          />
          {userError ? (
            <Text className="text-red-500 text-sm font-robobold mt-2">{userError.message}</Text>
          ) : null}
          <View className="justify-center flex-row gap-2 mt-3">
            <Text className="text-md font-robolight">Don't have an account?</Text>
            <Link href="/sign-up" className="text-secondary font-robobold">
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
