import Categories from '@/components/Categories';
import CustomButton from '@/components/CustomButton';
import RecipeCard from '@/components/RecipeCard';
import SearchInput from '@/components/SearchInput';
import { icons } from '@/constants/icons';
import { db } from '@/firebaseConfig';
import { useFirebaseApi } from '@/hooks/useFirebaseApi';
import { useStoreContext } from '@/store/StoreProvider';
import { UserObject } from '@/types/types';
import { router } from 'expo-router';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
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

const UserWelcomeBanner: React.FC<{ user: UserObject; errorMessage: string | undefined }> = ({
  user,
  errorMessage,
}) => {
  const username = user?.username ?? 'Unknown user';
  const profilePhoto = user?.profileImageURL ? user.profileImageURL : 'https://picsum.photos/500/300';

  if (errorMessage) {
    return <Text className="text-red-500 text-lg">{errorMessage}</Text>;
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
  const { authUser, refreshCount } = useStoreContext();
  const [userObject, setUserObject] = useState(null);
  const [recipes, setRecipes] = useState(null);

  const [userPending, userError] = useFirebaseApi(
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

  const [recipesPending, recipesError] = useFirebaseApi(
    async () => {
      let recipes = null;
      const recipesSnapshot = await getDocs(query(collection(db, 'recipes'), orderBy('createdAt', 'desc')));
      recipes = recipesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return recipes;
    },
    (recipes) => {
      if (recipes) {
        setRecipes(recipes);
      }
    },
    [refreshCount]
  );

  if (userPending || recipesPending) {
    return (
      <SafeAreaView className="h-full bg-snow">
        <View className="justify-center items-center h-full">
          <ActivityIndicator color="#F9A826" size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-snow h-full">
      <FlatList
        ListHeaderComponent={() => (
          <View className="mt-6 px-4 mb-2">
            <View className="flex-row items-center">
              <UserWelcomeBanner user={userObject} errorMessage={userError?.message} />
            </View>
            <SearchInput placeholder="Search for a recipe..." styles="mt-6" />
            <Categories styles="mt-2" />
          </View>
        )}
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecipeCard item={item} />}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center mt-20">
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

export default HomeScreen;
