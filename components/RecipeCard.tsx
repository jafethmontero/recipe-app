import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

type Item = {
  title: string;
  id: string;
  imageUrl: string;
};

interface RecipeCardProps {
  item: Item;
  likes: number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ item, likes }) => {
  return (
    <TouchableOpacity className="mx-6 my-2">
      {/*Header section*/}
      <View className="bg-white rounded-xl min-h-[250px] shadow-md">
        <Image
          source={require('../assets/images/food.jpg')}
          className="w-full h-40 rounded-t-xl"
          resizeMode="cover"
        />
        <Text className="text-2xl font-robobold px-6 pt-3">{item.title}</Text>

        {/*Card controls section*/}
        <View className="flex-row gap-4 px-6 pt-2 items-center">
          <View className="justify-center items-center">
            <TouchableOpacity onPress={() => {}}>
              <Image
                source={
                  likes > 0 ? require('../assets/icons/heart.png') : require('../assets/icons/001-heart.png')
                }
                className="w-4 h-4"
                resizeMode="contain"
                tintColor={likes > 0 ? '#d7443e' : '#000'}
              />
            </TouchableOpacity>
            <Text className="text-xs font-robothin">{`${likes} likes`}</Text>
          </View>
          <View className="justify-center items-center">
            <TouchableOpacity>
              <Image
                source={require('../assets/icons/002-chat.png')}
                className="w-4 h-4"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className="text-xs font-robothin">(0)</Text>
          </View>
          <View className="justify-center items-center">
            <Image
              source={require('../assets/icons/003-clock.png')}
              className="w-4 h-4 mb-1"
              resizeMode="contain"
            />
            <Text className="text-xs font-robothin">30 min</Text>
          </View>
        </View>

        {/*Footer section*/}
        <View className="flex-row px-6 pt-2 pb-4 items-center">
          <View className="flex-row items-center gap-2 flex-1">
            <Image
              source={require('../assets/icons/004-user.png')}
              className="w-6 h-6 mb-1"
              resizeMode="contain"
            />
            <Text className="font-roboregular text-md">Jafeth Montero</Text>
          </View>
          <TouchableOpacity>
            <Image
              source={require('../assets/icons/bookmark.png')}
              className="w-4 h-4 mb-1"
              resizeMode="contain"
              tintColor="#F9A826"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard;
