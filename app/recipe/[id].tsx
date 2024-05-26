import { db } from '@/firebaseConfig';
import { useFirebaseApi } from '@/hooks/useFirebaseApi';
import { Recipe } from '@/types/types';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RecipeScreen = () => {
  const { id, tab } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [recipePending] = useFirebaseApi(
    async () => {
      if (!id) {
        return;
      }
      const recipeId = Array.isArray(id) ? id[0] : id;
      const recipeRef = doc(db, 'recipes', recipeId);
      const recipeSnapshot = await getDoc(recipeRef);
      if (recipeSnapshot.exists()) {
        return recipeSnapshot.data();
      }
    },
    (recipe) => {
      if (recipe) {
        setRecipe(recipe);
      }
    },
    [id]
  );

  if (!recipe && recipePending) {
    return (
      <SafeAreaView className="h-full bg-snow">
        <View className="justify-center items-center h-full">
          <ActivityIndicator color="#F9A826" size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Text>{recipe?.title}</Text>
      <Text>{recipe?.description}</Text>
    </SafeAreaView>
  );
};

export default RecipeScreen;
