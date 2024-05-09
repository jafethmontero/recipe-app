import { View, Text, Image } from "react-native";
import React from "react";

const Logo = () => {
  return (
    <View className="justify-center items-center mb-10">
      <Image
        source={require("../assets/icons/002-chef.png")}
        className="w-[60px] h-[60px]"
        resizeMode="contain"
        style={{ tintColor: "#F9A826" }}
      />
      <Text className="text-3xl font-robobold">BiteBuddies</Text>
    </View>
  );
};

export default Logo;
