import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import Logo from '@/components/Logo';
import { Link, router } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../firebaseConfig';

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
  });

  const signUp = async (data: SignUpFormType) => {
    const { username, email, password } = data;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(userCredential.user, {
        displayName: username,
      });
      router.push('/home');
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data: SignUpFormType) => signUp(data);

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
            }}
          />
          <CustomButton
            title="Sign up"
            containerStyles="w-full mt-7"
            handlePress={handleSubmit(onSubmit)}
            disabled={!isValid}
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
