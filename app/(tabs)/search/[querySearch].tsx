import CustomButton from '@/components/CustomButton';
import RecipeCard from '@/components/RecipeCard';
import SearchInput from '@/components/SearchInput';
import { icons } from '@/constants/icons';
import { db } from '@/firebaseConfig';
import { useFirebaseApi } from '@/hooks/useFirebaseApi';
import { Recipe } from '@/types/types';
import { router, useLocalSearchParams } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search: React.FC = () => {
  const { querySearch } = useLocalSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const inputRef = useRef<TextInput>(null);
  const initialQuery = Array.isArray(querySearch) ? querySearch[0] : querySearch;

  const [recipesPending] = useFirebaseApi(
    async () => {
      if (!querySearch) {
        return;
      }
      const lowerCaseQuery = Array.isArray(querySearch)
        ? querySearch[0].toLowerCase()
        : querySearch.toLowerCase();
      const q = query(collection(db, 'recipes'), where('titleLowerCase', 'array-contains', lowerCaseQuery));
      const recipesSnapshot = await getDocs(q);
      return recipesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    (recipes) => {
      if (recipes) {
        setRecipes(recipes);
      }
    },
    [querySearch]
  );

  return (
    <SafeAreaView className="bg-snow h-full">
      <FlatList
        ListHeaderComponent={() => (
          <View className="mt-6 px-4 mb-4">
            <Text className="text-2xl font-robobold pl-2">Search results</Text>
            <SearchInput
              placeholder="Search for a recipe..."
              styles="mt-3"
              initialQuery={initialQuery}
              inputRef={inputRef}
            />
          </View>
        )}
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecipeCard item={item} />}
        ListEmptyComponent={() =>
          recipesPending ? (
            <SafeAreaView className="h-full bg-snow">
              <View className="justify-center items-center h-full">
                <ActivityIndicator color="#F9A826" size="large" />
              </View>
            </SafeAreaView>
          ) : (
            <View className="flex-1 items-center justify-center mt-20 mx-8">
              <Image
                source={icons.EMPTY_CHEF}
                className="w-32 h-32"
                resizeMode="contain"
                tintColor="#9da3af"
              />
              <Text className="text-lg font-robobold mb-4">No recipes found</Text>
              <CustomButton
                title="Add new recipe"
                handlePress={() => router.push('/(tabs)/post')}
                containerStyles="w-full mt-7"
              />
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default Search;
