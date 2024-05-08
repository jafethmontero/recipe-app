import { Tabs } from "expo-router";
import React from "react";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Image, ImageSourcePropType } from "react-native";

const Icon = ({
  icon,
  color,
}: {
  name: string;
  color: string;
  focused: boolean;
  icon: ImageSourcePropType;
}) => {
  return (
    <Image
      source={icon}
      resizeMode="contain"
      tintColor={color}
      className="w-6 h-6"
    />
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#F9A826",
        tabBarInactiveTintColor: "#d1d5db",
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, false),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Icon
              name="home"
              color={color}
              focused={true}
              icon={require("../../assets/icons/002-chef.png")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Icon
              name="search"
              color={color}
              focused={true}
              icon={require("../../assets/icons/001-search.png")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Post",
          tabBarIcon: ({ color }) => (
            <Icon
              name="create"
              color={color}
              focused={true}
              icon={require("../../assets/icons/001-plus.png")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Saved",
          tabBarIcon: ({ color }) => (
            <Icon
              name="bookmark"
              color={color}
              focused={true}
              icon={require("../../assets/icons/005-save-instagram.png")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <Icon
              name="account"
              color={color}
              focused={true}
              icon={require("../../assets/icons/004-user.png")}
            />
          ),
        }}
      />
    </Tabs>
  );
}
