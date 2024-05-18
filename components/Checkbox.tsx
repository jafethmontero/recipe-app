import React from 'react';
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';

interface CheckboxProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  icon: ImageSourcePropType | undefined;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { label, value, onValueChange, icon, disabled } = props;
  return (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      className="flex-row items-center gap-2 py-2"
      disabled={disabled}
    >
      <View className="w-4 h-4 border-2 border-silver rounded-md justify-center items-center">
        {value ? <View className="w-3 h-3 bg-secondary rounded-sm" /> : null}
      </View>
      <Text className="font-roboregular text-sm">{label}</Text>
      <Image source={icon} className="w-4 h-4" />
    </TouchableOpacity>
  );
};

export default Checkbox;
