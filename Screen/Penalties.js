import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_300Light,
} from "@expo-google-fonts/inter";
import { ScaledSheet } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Penalties() {
  // * Font add part
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
        <Text style={styles.HeadText}>Penalties</Text>
      </View>
      <View style={styles.Middle}>
        <View style={styles.Box}></View>
        <MaterialCommunityIcons
          name="qrcode-scan"
          size={44}
          color="#FDAE03"
          style={styles.Qr}
        />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.BottomText}>Penalties</Text>
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
    flex: 0.2,
    justifyContent: "center",
  },

  Middle: {
    flex: 0.6,
    justifyContent: "flex-start",
  },

  bottom: {
    // backgroundColor: "blue",
    flex: 1,
  },

  HeadText: {
    fontSize: "25@mvs",
    color: "#5B5B5B",
    alignSelf: "center",
    fontFamily: "Inter_500Medium",
  },

  Box: {
    alignSelf: "center",
    width: "80%",
    height: 150,
    elevation: 10,
    borderRadius: 30,
    backgroundColor: "#FFFAF4",
    shadowColor: "#FDAE03",
  },
  Qr: {
    paddingTop: 30,
    alignSelf: "center",
  },

  BottomText: {
    fontSize: "25@mvs",
    color: "#5B5B5B",
    alignSelf: "flex-start",
    paddingLeft: 30,
    fontFamily: "Inter_500Medium",
  },
});
