import { View, Text, Image } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';

const Logo: React.FC = () => {
  return (
    <View className="justify-center items-center mb-10">
      <Image
        source={icons.CHEF}
        className="w-[60px] h-[60px]"
        resizeMode="contain"
        style={{ tintColor: '#F9A826' }}
      />
      <Text className="text-3xl font-robobold">BiteBuddies</Text>
    </View>
  );
};

export default Logo;
