import React from 'react';
import { FlatList, Text, View } from 'react-native';

const Categories: React.FC = () => {
  const selected = 'All';
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
          <Text className={`${selected === item.title ? 'font-robobold' : 'font-robolight text-silver'}`}>
            {item.title}
          </Text>
        </View>
      )}
      horizontal
    />
  );
};

export default Categories;
