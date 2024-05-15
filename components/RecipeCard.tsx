import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { icons } from '@/constants/icons';

type Item = {
  title: string;
  id: string;
  imageUrl: string;
  likesCount: number;
  comments: string[];
  creator: string;
  cookTime: number;
};

interface RecipeCardProps {
  item: Item;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ item }) => {
  return (
    <View>
      <View className="bg-white w-8 h-8 rounded-full absolute top-12 right-10 z-10 items-center justify-center">
        <TouchableOpacity onPress={() => {}}>
          <Image source={icons.BOOKMARK_FULL} className="w-4 h-4" resizeMode="contain" tintColor="#F9A826" />
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center gap-2 pl-8">
        <Image src="https://picsum.photos/500/300" className="w-6 h-6 rounded-full" resizeMode="cover" />
        <Text className="font-roboregular text-sm">{item.creator}</Text>
      </View>
      <TouchableOpacity className="mx-6 mb-6 mt-1" onPress={() => router.push(`/recipe/${item.id}`)}>
        {/*Header section*/}
        <View className="bg-white rounded-xl min-h-[250px] shadow-md">
          <Image src={item.imageUrl} className="w-full h-40 rounded-t-xl" resizeMode="cover" />
          <Text className="text-2xl font-robobold px-6 pt-3">{item.title}</Text>
          <Text className="text-sm font-robothin px-6">Some description of the food...</Text>

          {/*Card controls section*/}
          <View className="flex-row gap-4 px-6 pt-3 items-center">
            <View className="justify-center items-center">
              <TouchableOpacity onPress={() => {}}>
                <Image
                  source={item.likesCount > 0 ? icons.FULL_HEART : icons.HEART}
                  className="w-4 h-4"
                  resizeMode="contain"
                  tintColor={item.likesCount > 0 ? '#d7443e' : '#000'}
                />
              </TouchableOpacity>
              <Text className="text-xs font-robothin">{`${item.likesCount} likes`}</Text>
            </View>
            <View className="justify-center items-center">
              <TouchableOpacity>
                <Image source={icons.CHAT} className="w-4 h-4" resizeMode="contain" />
              </TouchableOpacity>
              <Text className="text-xs font-robothin">({item.comments.length})</Text>
            </View>
            <View className="justify-center items-center">
              <Image source={icons.CLOCK} className="w-4 h-4 mb-1" resizeMode="contain" />
              <Text className="text-xs font-robothin">{item.cookTime} min</Text>
            </View>
          </View>

          {/*Footer section*/}
          <View className="flex-row gap-2 items-center justify-start py-4 pl-6">
            <View className="bg-secondary w-20 rounded-xl items-center">
              <Text className="text-xs font-robobold text-white py-1">Appetizer</Text>
            </View>
            <View className="bg-secondary w-20 rounded-xl items-center">
              <Text className="text-xs font-robobold text-white py-1">Appetizer</Text>
            </View>
            <View className="bg-secondary w-20 rounded-xl items-center">
              <Text className="text-xs font-robobold text-white py-1">Appetizer</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RecipeCard;
