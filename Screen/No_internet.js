import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import {
  useFonts,
  Inter_600SemiBold,
  Inter_300Light,
  Inter_500Medium,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import { ScaledSheet } from "react-native-size-matters";

export default function No_internet() {
  let [fontsLoaded, fontError] = useFonts({
    Inter_600SemiBold,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={styles.view}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFAF4" />
      <LottieView
        source={require("../assets/animation.json")} // Change 'animation.json' to your Lottie animation file
        autoPlay
        loop
        style={{ height: 350 }}
      />

      <Text style={styles.text}>Internet Connection Lost</Text>
    </View>
  );
}

const styles = ScaledSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFAF4",
    alignContent: "center",
  },

  text: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: "20@s",
    fontFamily: "Inter_400Regular",
    color: "#515151",
  },
});
