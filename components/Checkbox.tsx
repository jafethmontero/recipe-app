import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';

interface CheckboxProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  icon: ImageSourcePropType | undefined;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { label, value, onValueChange, icon } = props;
  return (
    <TouchableOpacity onPress={() => onValueChange(!value)} className="flex-row items-center gap-2">
      <View className="w-5 h-5 border-2 border-silver rounded-md justify-center items-center">
        {value ? <View className="w-4 h-4 bg-secondary rounded-sm" /> : null}
      </View>
      <Text className="font-roboregular text-base">{label}</Text>
      <Image source={icon} className="w-4 h-4" />
    </TouchableOpacity>
  );
};

export default Checkbox;
