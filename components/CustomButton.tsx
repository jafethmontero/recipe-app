import { Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  containerStyles,
  handlePress,
}: {
  title: string;
  containerStyles?: string;
  handlePress: () => void;
}) => {
  return (
    <TouchableOpacity
      className={`bg-secondary rounded-xl justify-center items-center min-h-[62px] ${containerStyles}`}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <Text className="text-white text-lg font-robobold">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
