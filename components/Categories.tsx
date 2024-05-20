import { categories } from '@/constants/categories';
import { icons } from '@/constants/icons';
import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity } from 'react-native';

const Categories: React.FC<{ styles?: string }> = ({ styles }) => {
  const [selected, setSelected] = useState('all');
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => setSelected(item.id)}
          className="p-4 justify-center items-center gap-2"
        >
          <Image
            source={icons[item.iconName as keyof typeof icons]}
            className="w-5 h-5"
            resizeMode="contain"
            tintColor={selected === item.id ? '#F9A826' : '#9da3af'}
          />
          <Text
            className={`font-robobold text-secondary ${selected !== item.id && 'text-silver font-roboregular'}`}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      )}
      horizontal
      className={`${styles}`}
    />
  );
};

export default Categories;
