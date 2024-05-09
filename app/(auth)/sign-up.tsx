import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import Logo from "@/components/Logo";
import { Link } from "expo-router";
import { useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });
  const onSubmit = (data: { firstName: string; lastName: string }) =>
    console.log(data);

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full h-[75vh] justify-center px-4 my-6">
          <Logo />
          <FormField
            name="username"
            control={control}
            label="Username"
            styles="mt-4"
            textContentType="username"
          />
          <FormField
            name="email"
            control={control}
            label="Email"
            styles="mt-4"
            textContentType="emailAddress"
          />
          <FormField
            name="password"
            control={control}
            label="Password"
            styles="mt-4"
            textContentType="password"
          />
          <CustomButton
            title="Sign up"
            containerStyles="w-full mt-7"
            handlePress={() => {}}
          />
          <View className="justify-center flex-row gap-2 mt-3">
            <Text className="text-md font-robolight">
              Have an account already?
            </Text>
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
