import Categories from '@/components/Categories';
import CustomButton from '@/components/CustomButton';
import RecipeCard from '@/components/RecipeCard';
import SearchInput from '@/components/SearchInput';
import { useStoreContext } from '@/store/StoreProvider';
import { router } from 'expo-router';
import { type User } from 'firebase/auth';
import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
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

const UserWelcomeBanner: React.FC<{ user: User | null }> = ({ user }) => {
  const username = user ? user.displayName : 'Unknown user';
  const profilePhoto = user ? user.photoURL : '';

  return (
    <View className="flex-row items-center gap-1 flex-1">
      <Image
        source={profilePhoto ?? require('../../assets/icons/004-user.png')}
        className="w-10 h-10"
        resizeMode="contain"
      />
      <View>
        <Text className="font-robolight text-sm">Welcome back,</Text>
        <Text className="font-robobold text-2xl">{username}</Text>
      </View>
    </View>
  );
};

const HomeScreen: React.FC = () => {
  const { user } = useStoreContext();
  const [hasNotification, setHasNotification] = useState<boolean>(false);

  return (
    <SafeAreaView className="bg-snow h-full">
      <FlatList
        ListHeaderComponent={() => (
          <View className="mt-6 px-4">
            <View className="flex-row items-center">
              <UserWelcomeBanner user={user} />
              <TouchableOpacity onPress={() => setHasNotification(!hasNotification)}>
                <Image
                  source={
                    hasNotification
                      ? require('../../assets/icons/notification.png')
                      : require('../../assets/icons/001-notification-bell.png')
                  }
                  className="w-5 h-5"
                  resizeMode="contain"
                  tintColor="#F9A826"
                />
              </TouchableOpacity>
            </View>
            <SearchInput placeholder="Search for a recipe..." styles="mt-6" />
            <Categories styles="mt-2" />
          </View>
        )}
        data={mockData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecipeCard item={item} />}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center mt-20">
            <Image
              source={require('../../assets/icons/chef-empty.png')}
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
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
