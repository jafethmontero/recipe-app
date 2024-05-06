import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Onboarding = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Onboarding</Text>
      <Link href="/(tabs)">Go to home</Link>
      <Link href="/sign-in">sign in</Link>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
