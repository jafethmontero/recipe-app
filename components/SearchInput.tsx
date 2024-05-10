import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchInputProps {
  placeholder?: string;
  styles?: string;
  handleChange: (text: string) => void;
  value: string;
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  const { styles, placeholder, handleChange, value } = props;

  return (
    <View
      className={`${styles} border-gray border w-full h-16 px-4 bg-gray rounded-2xl focus:border-secondary items-center flex-row`}
    >
      <TextInput
        placeholder={placeholder}
        className="flex-1 text-base font-roboregular h-full"
        onChangeText={handleChange}
        value={value}
      />
      <TouchableOpacity onPress={() => {}}>
        <Image source={require('../assets/icons/001-search.png')} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
