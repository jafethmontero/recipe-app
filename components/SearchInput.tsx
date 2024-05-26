import { icons } from '@/constants/icons';
import { router, usePathname } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchInputProps {
  placeholder?: string;
  styles?: string;
  initialQuery?: string;
  inputRef?: any;
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  const { styles, placeholder, initialQuery, inputRef } = props;
  const [query, setQuery] = useState(initialQuery || '');
  const pathname = usePathname();
  const handleChange = (e: string) => {
    if (!e && pathname.startsWith('/search')) {
      router.setParams({ querySearch: '' });
    }
    setQuery(e);
  };

  useEffect(() => {
    if (inputRef?.current && query === '') {
      inputRef.current.focus();
    }
  }, [query]);

  return (
    <View
      className={`${styles} border-gray border w-full h-16 px-4 bg-gray rounded-2xl focus:border-secondary items-center flex-row`}
    >
      <TextInput
        placeholder={placeholder}
        className="flex-1 text-base font-roboregular h-full"
        onChangeText={(e) => handleChange(e)}
        value={query}
        ref={inputRef}
      />
      <TouchableOpacity
        onPress={() => {
          if (pathname.startsWith('/search')) {
            router.setParams({ querySearch: query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
        disabled={!query}
      >
        {query ? <Image source={icons.SEARCH} className="w-5 h-5" resizeMode="contain" /> : null}
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
