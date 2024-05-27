import { icons } from '@/constants/icons';
import { db } from '@/firebaseConfig';
import { useFirebaseApi } from '@/hooks/useFirebaseApi';
import { useFirebaseApiCallback } from '@/hooks/useFirebaseApiCallback';
import { useStoreContext } from '@/store/StoreProvider';
import { Recipe } from '@/types/types';
import { router, useLocalSearchParams } from 'expo-router';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const TABS = [
  { title: 'Overview', id: 'overview' },
  { title: 'Ingredients', id: 'ingredients' },
  { title: 'Steps', id: 'steps' },
  { title: 'Comments', id: 'comments' },
];

const renderTabContent = (
  tabId: string,
  recipe: Recipe,
  checkedIngredient: any,
  setCheckedIngredient: any,
  checkedSteps: any,
  setCheckedSteps: any
) => {
  switch (tabId) {
    case 'overview':
      return (
        <View>
          <Text className="px-4 text-base font-roboregular mb-2">Description</Text>
          <Text className="pl-4 mb-3 text-base font-robothin">{recipe?.description}</Text>
          <View className="px-6 flex-row justify-between items-center">
            <View className="">
              <Text className="text-base font-roboregular mb-2">Cook time</Text>
              <Text className="text-base font-robothin">{recipe?.cookTime}</Text>
            </View>
            <View className="">
              <Text className="text-base font-roboregular mb-2">Portion</Text>
              <Text className="text-base font-robothin">{recipe?.portion} people</Text>
            </View>
          </View>
        </View>
      );
    case 'ingredients':
      return (
        <View>
          <Text className="px-4 text-base font-roboregular mb-2">Ingredients</Text>
          {recipe?.ingredients.map((ingredient, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCheckedIngredient((prev: any) => ({ ...prev, [index]: !prev[index] }))}
            >
              <View className="flex-row items-center gap-2 pl-4 mb-2">
                <View className="w-2 h-2 bg-secondary rounded-full" />
                <Text
                  className={`text-base font-robothin ${Boolean(checkedIngredient[index]) ? 'line-through' : ''}`}
                >
                  {ingredient.ingredient}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    case 'steps':
      return (
        <View>
          <Text className="px-4 text-base font-roboregular mb-2">Steps</Text>
          {recipe?.steps.map((step, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCheckedSteps((prev: any) => ({ ...prev, [index]: !prev[index] }))}
            >
              <View className="flex-row items-center gap-2 pl-4 mb-2">
                <View className="w-2 h-2 bg-secondary rounded-full" />
                <Text
                  className={`text-base font-robothin ${Boolean(checkedSteps[index]) ? 'line-through' : ''}`}
                >
                  {step.step}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    case 'comments':
      return (
        <View>
          <Text className="px-4 text-base font-roboregular mb-2">Comments</Text>
          {recipe.comments.length > 0 ? (
            recipe.comments.map((comment, index) => (
              <View key={index} className="px-4 mb-2">
                <Text className="text-base font-robobold">{comment.username}</Text>
                <Text className="text-base font-robothin">{comment.text}</Text>
              </View>
            ))
          ) : (
            <Text className="pl-4 mb-3 text-base font-robothin">No comments yet</Text>
          )}
        </View>
      );
  }
};

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
  const [checkedIngredient, setCheckedIngredient] = useState({});
  const [checkedSteps, setCheckedSteps] = useState({});

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
        const checkIngredient = recipe.ingredients.reduce((acc: any, ingredient: string, index: number) => {
          acc[index] = false;
          return acc;
        }, {});
        setCheckedIngredient(checkIngredient);
        const checkSteps = recipe.steps.reduce((acc: any, step: string, index: number) => {
          acc[index] = false;
          return acc;
        }, {});
        setCheckedSteps(checkSteps);
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

  const [saveRecipeCallback, saveRecipePending] = useFirebaseApiCallback(async () => {
    if (!authUser) {
      return;
    }
    const userRef = doc(db, 'users', authUser.uid);
    setIsSaved(!isSaved);
    await updateDoc(userRef, {
      savedRecipes: isSaved ? arrayRemove(recipeId) : arrayUnion(recipeId),
    });
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Recipe saved!',
    });
  }, [authUser, isSaved, recipeId]);

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
      <View className="bg-white w-10 h-10 rounded-full absolute top-14 right-8 z-10 items-center justify-center">
        <TouchableOpacity onPress={() => saveRecipeCallback()} disabled={saveRecipePending}>
          <Image
            source={isSaved ? icons.BOOKMARK_FULL : icons.BOOKMARK}
            className="w-5 h-5"
            resizeMode="contain"
            tintColor="#F9A826"
          />
        </TouchableOpacity>
      </View>
      <View className="bg-white w-10 h-10 rounded-full absolute top-14 left-8 z-10 items-center justify-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.BACK} className="w-5 h-5" resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <Image src={recipe?.imageURL} resizeMode="cover" className="w-full h-[40vh]" />
      <View className="flex-row justify-center items-center my-4 px-4">
        <View className="flex-1">
          <Text className="text-2xl font-robobold">{recipe?.title}</Text>
          <Text className="font-roboregular text-sm">
            Created by {''}
            <Text className="font-robobold text-sm underline"> {creatorUsername}</Text>
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
            <Text
              className={`text-lg ${selectedTab === tab.id ? 'font-robobold text-black' : 'font-robothin'}`}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {recipe
        ? renderTabContent(
            selectedTab,
            recipe,
            checkedIngredient,
            setCheckedIngredient,
            checkedSteps,
            setCheckedSteps
          )
        : null}
    </ScrollView>
  );
};

export default RecipeScreen;
