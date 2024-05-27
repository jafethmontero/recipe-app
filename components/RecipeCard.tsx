import { icons } from '@/constants/icons';
import { db } from '@/firebaseConfig';
import { useFirebaseApiCallback } from '@/hooks/useFirebaseApiCallback';
import { useStoreContext } from '@/store/StoreProvider';
import { router } from 'expo-router';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { memo, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

const DEFAULT_IMAGE_URL =
  'https://firebasestorage.googleapis.com/v0/b/bite-buddies-67fec.appspot.com/o/recipes%2FThe%20Munchies%20-%20Bowl.png?alt=media&token=a1d1ebc6-ff77-4a6a-9153-09b8fe6dda59';

type Recipe = {
  id: string;
  categories: string[];
  comments: any[];
  cookTime: string;
  createdAt: number;
  createdBy: string;
  description: string;
  imageURL: string;
  ingredients: any[];
  likes: any[];
  portion: string;
  steps: any[];
  title: string;
};

interface RecipeCardProps {
  item: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = memo(({ item }) => {
  const { usersObject, authUser } = useStoreContext();
  const currentUserObject = authUser ? usersObject[authUser.uid] : {};

  const [likesCount, setLikesCount] = useState(item.likes.length);
  const [isLiked, setIsLiked] = useState(item.likes.includes(authUser?.uid));
  const [isSaved, setIsSaved] = useState(currentUserObject?.savedRecipes?.includes(item.id));

  const [likeCallback, likeLoading] = useFirebaseApiCallback(async () => {
    const recipeRef = doc(db, 'recipes', item.id);
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    await updateDoc(recipeRef, {
      likes: isLiked ? arrayRemove(authUser?.uid) : arrayUnion(authUser?.uid),
    });
  }, [authUser, isLiked, item.id]);

  const [saveRecipeCallback, saveRecipePending] = useFirebaseApiCallback(async () => {
    if (!authUser) {
      return;
    }
    const userRef = doc(db, 'users', authUser.uid);
    setIsSaved(!isSaved);
    await updateDoc(userRef, {
      savedRecipes: isSaved ? arrayRemove(item.id) : arrayUnion(item.id),
    });
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Recipe saved!',
    });
  }, [authUser, isSaved, item.id]);

  return (
    <View>
      <View className="bg-white w-8 h-8 rounded-full absolute top-12 right-10 z-10 items-center justify-center">
        <TouchableOpacity onPress={() => saveRecipeCallback()} disabled={saveRecipePending}>
          <Image
            source={isSaved ? icons.BOOKMARK_FULL : icons.BOOKMARK}
            className="w-4 h-4"
            resizeMode="contain"
            tintColor="#F9A826"
          />
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center gap-2 pl-8">
        <Image src="https://picsum.photos/500/300" className="w-6 h-6 rounded-full" resizeMode="cover" />
        <Text className="font-roboregular text-sm">{usersObject[item.createdBy]?.username}</Text>
      </View>
      <TouchableOpacity className="mx-6 mb-6 mt-1" onPress={() => router.push(`/recipe/${item.id}`)}>
        {/*Header section*/}
        <View className="bg-white rounded-xl min-h-[250px] shadow-md">
          <Image
            src={item.imageURL ? item.imageURL : DEFAULT_IMAGE_URL}
            className="w-full h-40 rounded-t-xl"
            resizeMode="cover"
          />
          <Text className="text-2xl font-robobold px-5 pt-3">{item.title}</Text>
          <Text className="text-sm font-robothin px-6" numberOfLines={2}>
            {item.description}
          </Text>

          {/*Card controls section*/}
          <View className="flex-row gap-4 px-6 pt-3 items-center">
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
            <View className="justify-center items-center">
              <TouchableOpacity onPress={() => router.push(`/recipe/${item.id}?tab=comments`)}>
                <Image source={icons.CHAT} className="w-4 h-4" resizeMode="contain" />
              </TouchableOpacity>
              <Text className="text-xs font-robothin">({item.comments.length})</Text>
            </View>
            <View className="justify-center items-center">
              <Image source={icons.CLOCK} className="w-4 h-4 mb-1" resizeMode="contain" />
              <Text className="text-xs font-robothin">{item.cookTime}</Text>
            </View>
          </View>

          {/*Footer section*/}
          <View className="flex-row gap-2 items-center justify-start py-4 pl-6">
            {item.categories.map((category, index) => (
              <View className="bg-secondary w-20 rounded-xl items-center" key={index}>
                <Text className="text-xs font-robobold text-white py-1">{category}</Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
});

export default RecipeCard;
