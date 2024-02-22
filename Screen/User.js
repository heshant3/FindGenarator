import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_300Light,
} from "@expo-google-fonts/inter";

export default function User() {
  let [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_300Light,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFAF4" />
      <View style={styles.Header}>
        <Text style={styles.HeadText}>User Data</Text>
      </View>
      <View style={styles.Body}>
        <View style={styles.Circle}></View>
        <Text style={styles.Text}>Jony Amex</Text>
        <Text style={styles.Text}>35 Years</Text>
        <Text style={styles.Text}>659587604038V</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: "#FFFAF4",
    flex: 1,
  },

  Header: {
    flex: 0.13,
    justifyContent: "center",
  },

  HeadText: {
    fontSize: "25@mvs",
    color: "#5B5B5B",
    alignSelf: "center",
    fontFamily: "Inter_500Medium",
  },

  Body: {
    flex: 1,
    justifyContent: "flex-start",
  },

  Circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#D9D9D9",
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 30,
  },

  Text: {
    marginTop: 10,
    fontSize: "25@mvs",
    color: "#5B5B5B",
    alignSelf: "center",
    fontFamily: "Inter_500Medium",
  },
});
