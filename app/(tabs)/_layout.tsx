import { Tabs } from 'expo-router';
import React from 'react';

import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';
import { Image, ImageSourcePropType, View, Text } from 'react-native';

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
      <Text className={`${focused ? 'font-robobold text-secondary' : 'font-roboregular text-gray'} text-xs`}>
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
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="Home"
              color={color}
              focused={focused}
              icon={require('../../assets/icons/002-chef.png')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="Search"
              color={color}
              focused={focused}
              icon={require('../../assets/icons/001-search.png')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Post',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="Post"
              color={color}
              focused={focused}
              icon={require('../../assets/icons/001-plus.png')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="Saved"
              color={color}
              focused={focused}
              icon={require('../../assets/icons/005-save-instagram.png')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="Account"
              color={color}
              focused={focused}
              icon={require('../../assets/icons/004-user.png')}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
