import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const RecipeCardSkeleton = () => {
  return (
    <View>
      <View className="bg-gray-200 w-8 h-8 rounded-full absolute top-12 right-10 z-10 items-center justify-center"></View>
      <View className="flex-row items-center gap-2 pl-8">
        <View className="bg-gray-200 w-6 h-6 rounded-full"></View>
        <View className="bg-gray-200 h-4 w-24 rounded-md"></View>
      </View>
      <View className="mx-6 mb-6 mt-1">
        <View className="bg-white rounded-xl min-h-[300px] shadow-md justify-center items-center">
          <ActivityIndicator size="large" color="#F9A826" />
        </View>
      </View>
    </View>
  );
};

export default RecipeCardSkeleton;
