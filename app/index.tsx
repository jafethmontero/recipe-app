import { Link } from "expo-router";
import React from "react";
import { SafeAreaView, Text } from "react-native";

const Onboarding = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl">Onboarding</Text>
      <Link href="/(tabs)" className="text-secondary">
        Go to home
      </Link>
      <Link href="/sign-in">sign in</Link>
    </SafeAreaView>
  );
};

export default Onboarding;
