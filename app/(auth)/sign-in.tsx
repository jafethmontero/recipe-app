import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import Logo from '@/components/Logo';
import { Link, router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });
  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data);
    router.push('/home');
  };

  return (
    <SafeAreaView className="h-full">
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
            title="Login"
            containerStyles="w-full mt-7"
            handlePress={handleSubmit(onSubmit)}
            disabled={!isValid}
          />
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
