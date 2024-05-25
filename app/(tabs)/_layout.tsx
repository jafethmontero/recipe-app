import { Tabs } from 'expo-router';
import React from 'react';

import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';
import { Image, ImageSourcePropType, View, Text } from 'react-native';
import { icons } from '@/constants/icons';

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View className="justify-center items-center gap-1">
      <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6" />
      <Text className={`${focused ? 'font-robobold' : 'font-roboregular'} text-xs`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  );
};

const TabLayout: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#F9A826',
        tabBarInactiveTintColor: '#d1d5db',
        tabBarShowLabel: false,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, false),
        tabBarStyle: {
          borderTopWidth: 1,
          height: 80,
          borderTopColor: '#d1d5db',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Home" color={color} focused={focused} icon={icons.CHEF} />
          ),
        }}
      />
      <Tabs.Screen
        name="search/[querySearch]"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Search" color={color} focused={focused} icon={icons.SEARCH} />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: 'Post',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Post" color={color} focused={focused} icon={icons.PLUS} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Saved" color={color} focused={focused} icon={icons.BOOKMARK} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Account" color={color} focused={focused} icon={icons.USER} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
