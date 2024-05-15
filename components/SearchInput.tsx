import { icons } from '@/constants/icons';
import { router, usePathname } from 'expo-router';
import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchInputProps {
  placeholder?: string;
  styles?: string;
  initialQuery?: string;
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  const { styles, placeholder, initialQuery } = props;
  const [query, setQuery] = useState(initialQuery ?? '');
  const pathname = usePathname();
  const handleChange = (e: string) => {
    if (!e && pathname.startsWith('/search')) {
      router.setParams({ query: '' });
    }
    setQuery(e);
  };

  return (
    <View
      className={`${styles} border-gray border w-full h-16 px-4 bg-gray rounded-2xl focus:border-secondary items-center flex-row`}
    >
      <TextInput
        placeholder={placeholder}
        className="flex-1 text-base font-roboregular h-full"
        onChangeText={(e) => handleChange(e)}
        value={query}
      />
      <TouchableOpacity
        onPress={() => {
          if (pathname.startsWith('/search')) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.SEARCH} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
