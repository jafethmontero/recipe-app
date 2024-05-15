import CustomButton from '@/components/CustomButton';
import RecipeCard from '@/components/RecipeCard';
import SearchInput from '@/components/SearchInput';
import { icons } from '@/constants/icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockData = [
  {
    id: '1',
    title: 'Spaghetti',
    imageUrl: 'https://picsum.photos/500/300',
    likesCount: 1,
    comments: [],
    creator: 'John Doe',
    cookTime: 30,
  },
  {
    id: '2',
    title: 'Pizza',
    imageUrl: 'https://picsum.photos/500/300',
    likesCount: 2,
    comments: [],
    creator: 'John Doe',
    cookTime: 30,
  },
  {
    id: '3',
    title: 'Burger',
    imageUrl: 'https://picsum.photos/500/300',
    likesCount: 0,
    comments: [],
    creator: 'John Doe',
    cookTime: 30,
  },
  {
    id: '4',
    title: 'Pasta',
    imageUrl: 'https://picsum.photos/500/300',
    likesCount: 4,
    comments: [],
    creator: 'John Doe',
    cookTime: 30,
  },
  {
    id: '5',
    title: 'Salad',
    imageUrl: 'https://picsum.photos/500/300',
    likesCount: 0,
    comments: [],
    creator: 'John Doe',
    cookTime: 30,
  },
  {
    id: '6',
    title: 'Soup',
    imageUrl: 'https://picsum.photos/500/300',
    likesCount: 5,
    comments: [],
    creator: 'John Doe',
    cookTime: 30,
  },
];

const Search: React.FC = () => {
  const { query } = useLocalSearchParams();
  const filteredData = mockData.filter((item) => item.title.includes(query as string));

  return (
    <SafeAreaView className="bg-snow h-full">
      <FlatList
        ListHeaderComponent={() => (
          <View className="mt-6 px-4 mb-4">
            <Text className="text-2xl font-robobold pl-2">Search results</Text>
            <SearchInput placeholder="Search for a recipe..." styles="mt-3" initialQuery={query as string} />
          </View>
        )}
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecipeCard item={item} />}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center mt-20 mx-8">
            <Image source={icons.EMPTY_CHEF} className="w-32 h-32" resizeMode="contain" tintColor="#9da3af" />
            <Text className="text-lg font-robobold mb-4">No recipes found</Text>
            <CustomButton
              title="Add new recipe"
              handlePress={() => router.push('/(tabs)/post')}
              containerStyles="w-full mt-7"
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
