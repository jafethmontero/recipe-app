import { icons } from '@/constants/icons';
import { db } from '@/firebaseConfig';
import { useFirebaseApi } from '@/hooks/useFirebaseApi';
import { useFirebaseApiCallback } from '@/hooks/useFirebaseApiCallback';
import { useStoreContext } from '@/store/StoreProvider';
import { Recipe } from '@/types/types';
import { useLocalSearchParams } from 'expo-router';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TABS = [
  { title: 'Overview', id: 'overview' },
  { title: 'Ingredients', id: 'ingredients' },
  { title: 'Steps', id: 'steps' },
  { title: 'Comments', id: 'comments' },
];

const RecipeScreen = () => {
  const { id, tab } = useLocalSearchParams();
  const { usersObject, authUser } = useStoreContext();
  const currentUserObject = authUser ? usersObject[authUser.uid] : {};
  const recipeId = Array.isArray(id) ? id[0] : id;
  const tabId = Array.isArray(tab) ? tab[0] : tab;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(currentUserObject?.savedRecipes?.includes(recipeId));
  const [creatorUsername, setCreatorUsername] = useState('');
  const [selectedTab, setSelectedTab] = useState(tabId ?? 'overview');

  const [recipePending] = useFirebaseApi(
    async () => {
      if (!recipeId) {
        return;
      }
      const recipeRef = doc(db, 'recipes', recipeId);
      const recipeSnapshot = await getDoc(recipeRef);
      if (recipeSnapshot.exists()) {
        return recipeSnapshot.data();
      }
    },
    (recipe) => {
      if (recipe) {
        setRecipe(recipe);
        setLikesCount(recipe.likes.length);
        setIsLiked(recipe.likes.includes(authUser?.uid));
        setCreatorUsername(usersObject[recipe.createdBy]?.username);
      }
    },
    [recipeId]
  );

  const [likeCallback, likeLoading] = useFirebaseApiCallback(async () => {
    const recipeRef = doc(db, 'recipes', recipeId);
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    await updateDoc(recipeRef, {
      likes: isLiked ? arrayRemove(authUser?.uid) : arrayUnion(authUser?.uid),
    });
  }, [authUser, recipeId]);

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
    <ScrollView>
      <Image src={recipe?.imageURL} resizeMode="cover" className="w-full h-[40vh]" />
      <View className="flex-row justify-center items-center my-4 px-4">
        <View className="flex-1">
          <Text className="text-2xl font-robobold">{recipe?.title}</Text>
          <Text className="font-robobold text-sm">
            <Text className="font-roboregular text-sm">By </Text>
            {creatorUsername}
          </Text>
        </View>
        <View className="justify-center items-center">
          <TouchableOpacity onPress={() => likeCallback()} disabled={likeLoading}>
            <Image
              source={isLiked ? icons.FULL_HEART : icons.HEART}
              className="w-4 h-4"
              resizeMode="contain"
              tintColor={isLiked ? '#d7443e' : '#000'}
            />
          </TouchableOpacity>
          <Text className="text-xs font-robothin">{`${likesCount} likes`}</Text>
        </View>
      </View>
      <View className="flex-row justify-between items-center gap-3 px-4 mb-4">
        {TABS.map((tab) => (
          <TouchableOpacity onPress={() => setSelectedTab(tab.id)} key={tab.id}>
            <Text className={`text-lg ${selectedTab === tab.id ? 'font-robobold' : 'font-roboregular'}`}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text className="px-4 text-base font-roboregular mb-2">Description</Text>
      <Text className="pl-4 mb-3 text-base font-robothin">{recipe?.description}</Text>
      <View className="flex-row pr-4 justify-center items-center gap-2">
        <View className="justify-center items-center">
          <Image source={icons.CLOCK} className="w-4 h-4 mb-1" resizeMode="contain" />
          <Text className="text-xs font-robothin">{recipe?.cookTime}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipeScreen;
