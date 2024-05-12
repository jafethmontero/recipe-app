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

  return (
    <View
      className={`${styles} border-gray border w-full h-16 px-4 bg-gray rounded-2xl focus:border-secondary items-center flex-row`}
    >
      <TextInput
        placeholder={placeholder}
        className="flex-1 text-base font-roboregular h-full"
        onChangeText={(e) => setQuery(e)}
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
        disabled={!query}
      >
        <Image
          source={require('../assets/icons/001-search.png')}
          className="w-5 h-5"
          resizeMode="contain"
          tintColor={!query ? '#d1d5db' : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
