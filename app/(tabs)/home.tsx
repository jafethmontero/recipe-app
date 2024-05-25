import Categories from '@/components/Categories';
import CustomButton from '@/components/CustomButton';
import RecipeCard from '@/components/RecipeCard';
import RecipeCardSkeleton from '@/components/RecipeCardSkeleton';
import SearchInput from '@/components/SearchInput';
import { categories } from '@/constants/categories';
import { icons } from '@/constants/icons';
import { db } from '@/firebaseConfig';
import { useFirebaseApi } from '@/hooks/useFirebaseApi';
import { useFirebaseApiCallback } from '@/hooks/useFirebaseApiCallback';
import { useStoreContext } from '@/store/StoreProvider';
import { Recipe, UserObject } from '@/types/types';
import { router } from 'expo-router';
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
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserWelcomeBanner: React.FC<{
  user: UserObject;
  userPending: boolean;
}> = ({ user, userPending }) => {
  const username = user?.username ?? 'Unknown user';
  const profilePhoto = user?.profileImageURL ? user.profileImageURL : 'https://picsum.photos/500/300';

  if (!user && userPending) {
    return <ActivityIndicator color="#F9A826" size="small" />;
  }

  return (
    <View className="flex-row items-center gap-1 flex-1">
      <Image src={profilePhoto} className="w-10 h-10 rounded-full" resizeMode="cover" />
      <View>
        <Text className="font-robolight text-sm">Welcome back,</Text>
        <Text className="font-robobold text-2xl">{username}</Text>
      </View>
    </View>
  );
};

const HomeScreen: React.FC = () => {
  const { authUser, refreshHomeTab } = useStoreContext();
  const [userObject, setUserObject] = useState(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [nextDocs, setNextDocs] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>>();

  const [userPending] = useFirebaseApi(
    async () => {
      let userObject = null;
      if (authUser) {
        const userRef = doc(db, 'users', authUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          userObject = userSnap.data();
        }
      }
      return userObject;
    },
    (userObject) => {
      if (userObject) {
        setUserObject(userObject);
      }
    },
    [authUser]
  );

  const [recipesPending] = useFirebaseApi(
    async () => {
      let firstQuery = query(collection(db, 'recipes'), orderBy('createdAt', 'desc'), limit(10));
      if (selectedCategory !== 'all') {
        firstQuery = query(
          collection(db, 'recipes'),
          where('categories', 'array-contains', selectedCategory),
          orderBy('createdAt', 'desc'),
          limit(10)
        );
      }
      const recipesSnapshot = await getDocs(firstQuery);
      setNextDocs(recipesSnapshot.docs[recipesSnapshot.docs.length - 1]);
      return recipesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    (recipes) => {
      if (recipes) {
        setRecipes(recipes);
      }
    },
    [refreshHomeTab, selectedCategory]
  );

  const [loadMoreRecipesCallback, loadMoreRecipesPending] = useFirebaseApiCallback(async () => {
    if (nextDocs) {
      let nextQuery = query(
        collection(db, 'recipes'),
        orderBy('createdAt', 'desc'),
        startAfter(nextDocs),
        limit(10)
      );
      if (selectedCategory !== 'all') {
        nextQuery = query(
          collection(db, 'recipes'),
          where('categories', 'array-contains', selectedCategory),
          orderBy('createdAt', 'desc'),
          startAfter(nextDocs),
          limit(10)
        );
      }
      const nextRecipesSnapshot = await getDocs(nextQuery);
      setNextDocs(nextRecipesSnapshot.docs[nextRecipesSnapshot.docs.length - 1]);
      const nextRecipes = nextRecipesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRecipes((prevRecipes) => [...prevRecipes, ...(nextRecipes as Recipe[])]);
    }
  }, [nextDocs, selectedCategory]);

  return (
    <SafeAreaView className="bg-snow h-full">
      <FlatList
        ListHeaderComponent={() => (
          <View className="mt-6 px-4 mb-2">
            <View className="flex-row items-center">
              <UserWelcomeBanner user={userObject} userPending={userPending} />
            </View>
            <SearchInput placeholder="Search for a recipe..." styles="mt-6" />
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setSelectedCategory(item.id)}
                  className="p-4 justify-center items-center gap-2"
                  disabled={recipesPending}
                >
                  <Image
                    source={icons[item.iconName as keyof typeof icons]}
                    className="w-5 h-5"
                    resizeMode="contain"
                    tintColor={selectedCategory === item.id ? '#F9A826' : '#9da3af'}
                  />
                  <Text
                    className={`font-robobold text-secondary ${selectedCategory !== item.id && 'text-silver font-roboregular'}`}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              horizontal
              className="mt-2"
            />
          </View>
        )}
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (recipesPending ? <RecipeCardSkeleton /> : <RecipeCard item={item} />)}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        ListEmptyComponent={() => {
          return recipesPending ? (
            <SafeAreaView className="h-full bg-snow">
              <View className="justify-center items-center h-full">
                <ActivityIndicator color="#F9A826" size="large" />
              </View>
            </SafeAreaView>
          ) : (
            <View className="flex-1 items-center justify-center mt-20 px-6">
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
          );
        }}
        ListFooterComponent={() =>
          recipes.length ? (
            <View className="justify-center items-center">
              <View className="justify-center items-center mt-2 bg-cream py-2 rounded-lg w-40">
                <TouchableOpacity onPress={loadMoreRecipesCallback} disabled={loadMoreRecipesPending}>
                  {loadMoreRecipesPending ? (
                    <ActivityIndicator size="small" color="#F9A826" />
                  ) : (
                    <Text className="text-base font-roboregular text-secondary">More recipes...</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ) : null
        }
        refreshing={recipesPending}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
