import Categories from '@/components/Categories';
import RecipeCard from '@/components/RecipeCard';
import SearchInput from '@/components/SearchInput';
import { useStoreContext } from '@/store/StoreProvider';
import { type User } from 'firebase/auth';
import { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserWelcomeBanner: React.FC<{ user: User | null }> = ({ user }) => {
  const username = user ? user.displayName : 'Unknown user';
  const profilePhoto = user ? user.photoURL : '';

  return (
    <View className="flex-row items-center gap-1 flex-1">
      <Image
        source={profilePhoto ? profilePhoto : require('../../assets/icons/004-user.png')}
        className="w-8 h-8"
        resizeMode="contain"
      />
      <View>
        <Text className="font-robolight text-sm">Welcome back,</Text>
        <Text className="font-robobold text-xl">{username}</Text>
      </View>
    </View>
  );
};

const HomeScreen: React.FC = () => {
  const { user } = useStoreContext();
  const [query, setQuery] = useState<string>('');
  const [hasNotification, setHasNotification] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);

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
                      : require('../../assets/icons/bell.png')
                  }
                  className="w-5 h-5"
                  resizeMode="contain"
                  tintColor="#F9A826"
                />
              </TouchableOpacity>
            </View>
            <SearchInput
              handleChange={(e) => setQuery(e)}
              value={query}
              placeholder="Search for a recipe..."
              styles="mt-6"
            />
            <Categories styles="mt-2" />
          </View>
        )}
        data={[
          { id: '1', title: 'Spaghetti', imageUrl: 'food.jpg' },
          { id: '2', title: 'Pizza', imageUrl: 'food.jpg' },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecipeCard item={item} likes={likes} />}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center mt-20">
            <Image
              source={require('../../assets/icons/chef-empty.png')}
              className="w-32 h-32"
              resizeMode="contain"
              tintColor="#9da3af"
            />
            <Text className="text-lg font-robobold mb-4">No recipes found</Text>
            <TouchableOpacity className="items-center gap-2">
              <Text className="font-roboregular mt-2">Add a new recipe</Text>
              <Image
                source={require('../../assets/icons/001-plus.png')}
                className="w-8 h-8"
                resizeMode="contain"
                tintColor="#F9A826"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
