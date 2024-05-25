import CustomButton from '@/components/CustomButton';
import RecipeCard from '@/components/RecipeCard';
import SearchInput from '@/components/SearchInput';
import { icons } from '@/constants/icons';
import { db } from '@/firebaseConfig';
import { useFirebaseApi } from '@/hooks/useFirebaseApi';
import { Recipe } from '@/types/types';
import { router, useLocalSearchParams } from 'expo-router';
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import React, { useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search: React.FC = () => {
  const { querySearch } = useLocalSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [nextDocs, setNextDocs] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>>();

  const [recipesPending, recipesError] = useFirebaseApi(
    async () => {
      let firstQuery = query(collection(db, 'recipes'), orderBy('createdAt', 'desc'), limit(10));
      const recipesSnapshot = await getDocs(firstQuery);
      setNextDocs(recipesSnapshot.docs[recipesSnapshot.docs.length - 1]);
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
              initialQuery={querySearch as string}
            />
          </View>
        )}
        data={recipes}
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
