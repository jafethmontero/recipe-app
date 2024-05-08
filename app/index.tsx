import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import React from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";

const Onboarding = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full min-h-[85vh] justify-center items-center px-4">
          <View className="justify-center items-center mb-10">
            <Image
              source={require("../assets/icons/002-chef.png")}
              className="w-[60px] h-[60px]"
              resizeMode="contain"
              style={{ tintColor: "#F9A826" }}
            />
            <Text className="text-3xl font-robobold">BiteBuddies</Text>
          </View>
          <Image
            source={require("../assets/images/onboarding.png")}
            className="w-full max-w-[300px] h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-2xl text-center font-roboregular">
              Share the taste, share the love!
            </Text>
            <Text className="text-center text-sm font-robolight">
              Discover new flavors every day. Share your favorite recipes with
              friends and family, all in one place!
            </Text>
          </View>
          <CustomButton
            title="Get Started"
            containerStyles="w-full mt-7"
            handlePress={() => router.push("/sign-in")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Onboarding;
