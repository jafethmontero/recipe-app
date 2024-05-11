import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

const Categories: React.FC<{ styles?: string }> = ({ styles }) => {
  const [selected, setSelected] = useState('1');
  return (
    <FlatList
      data={[
        { id: '1', title: 'All' },
        { id: '2', title: 'Dinner' },
        { id: '3', title: 'Lunch' },
        { id: '4', title: 'Mexican' },
        { id: '5', title: 'Italian' },
        { id: '6', title: 'Chinees' },
        { id: '7', title: 'Pasta' },
        { id: '8', title: 'Sea food' },
      ]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="p-4">
          <TouchableOpacity onPress={() => setSelected(item.id)}>
            <Text className={`font-robobold ${selected !== item.id && 'text-silver font-roboregular'}`}>
              {item.title}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      horizontal
      className={`${styles}`}
    />
  );
};

export default Categories;
