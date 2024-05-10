import Categories from '@/components/Categories';
import SearchInput from '@/components/SearchInput';
import { useStoreContext } from '@/store/StoreProvider';
import { useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen: React.FC = () => {
  const { user } = useStoreContext();
  const username = user ? user.displayName : 'Unknown user';
  const profilePhoto = user ? user.photoURL : '';
  const [query, setQuery] = useState('');

  return (
    <SafeAreaView className="bg-snow h-full">
      <FlatList
        data={[
          { id: '1', title: 'First item' },
          { id: '2', title: 'Second item' },
          { id: '3', title: 'Third item' },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-lg my-2">
            <Text>{item.title}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-5">
            <View className="flex-row items-center">
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
              <View>
                <Image
                  source={require('../../assets/icons/bell.png')}
                  className="w-5 h-5"
                  resizeMode="contain"
                  tintColor="#F9A826"
                />
              </View>
            </View>
            <SearchInput
              handleChange={(e) => setQuery(e)}
              value={query}
              placeholder="Search for a recipe..."
              styles="mt-6"
            />
            <View className="my-4 flex-1">
              <Categories />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
