import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

const Recipe = () => {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <Text>Recipe {id}</Text>
    </SafeAreaView>
  );
};

export default Recipe;
