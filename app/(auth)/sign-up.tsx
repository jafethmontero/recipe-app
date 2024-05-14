import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import Logo from '@/components/Logo';
import useCreateUserAccount, { SignUpFormType } from '@/hooks/useCreateUserAccount';
import { Link, router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const { createUserAccount, loading, errorMessage, user } = useCreateUserAccount();

  if (!loading && user) {
    router.push('/home');
  }

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
            handlePress={handleSubmit((data) => createUserAccount(data))}
            disabled={!isValid}
            loading={loading}
          />
          {errorMessage ? <Text className="text-red-500 text-sm mt-2">{errorMessage}</Text> : null}
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
