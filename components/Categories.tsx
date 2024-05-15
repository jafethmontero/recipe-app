import { icons } from '@/constants/icons';
import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

const Categories: React.FC<{ styles?: string }> = ({ styles }) => {
  const [selected, setSelected] = useState('1');
  return (
    <FlatList
      data={[
        { id: '1', title: 'All', iconName: 'ALL' },
        { id: '2', title: 'Dinner', iconName: 'DINNER' },
        { id: '3', title: 'Lunch', iconName: 'LUNCH' },
        { id: '5', title: 'Breakfast', iconName: 'BREAKFAST' },
        { id: '6', title: 'Dessert', iconName: 'DESSERT' },
        { id: '11', title: 'Vegetarian', iconName: 'VEGETARIAN' },
        { id: '10', title: 'Vegan', iconName: 'VEGAN' },
        { id: '4', title: 'Appetizer', iconName: 'APPETIZER' },
        { id: '9', title: 'Snack', iconName: 'SNACK' },
        { id: '7', title: 'Drinks', iconName: 'DRINKS' },
        { id: '8', title: 'Gluten-free', iconName: 'GLUTEN_FREE' },
      ]}
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
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
      horizontal
      className={`${styles}`}
    />
  );
};

export default Categories;
