import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handlePress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const { title, containerStyles, handlePress, disabled, loading = false } = props;
  return (
    <TouchableOpacity
      className={`${
        disabled ? 'opacity-50' : ''
      } bg-secondary rounded-xl justify-center items-center min-h-[62px] ${containerStyles}`}
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white text-lg font-robobold">{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
