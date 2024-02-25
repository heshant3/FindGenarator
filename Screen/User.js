import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_300Light,
} from "@expo-google-fonts/inter";
import { FontAwesome } from "@expo/vector-icons";

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
        <View style={styles.Circle}>
          <FontAwesome name="user-circle-o" size={100} color="#FDAE03" />
        </View>
        <View style={styles.Box}>
          <View style={styles.BodyBox}>
            <View style={styles.BodyBoxContain}>
              <Text style={styles.Text}>Name: </Text>
              <Text style={styles.Text2} paddingLeft={40}>
                Jony Amex
              </Text>
            </View>
            <View style={styles.BodyBoxContain}>
              <Text style={styles.Text}>Age: </Text>
              <Text style={styles.Text2} paddingLeft={58}>
                35 year
              </Text>
            </View>
            <View style={styles.BodyBoxContain}>
              <Text style={styles.Text}>User ID: </Text>
              <Text style={styles.Text2} paddingLeft={25}>
                6595876038V
              </Text>
            </View>
            <View style={styles.BodyBoxContain}>
              <Text style={styles.Text}>Police ID:</Text>
              <Text style={styles.Text2} paddingLeft={20}>
                3467754
              </Text>
            </View>
            <View style={styles.BodyBoxContain}>
              <Text style={styles.Text}>Address: </Text>
              <Text style={styles.Text2} paddingLeft={19}>
                Colombo
              </Text>
            </View>
          </View>
        </View>
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
    width: 120,
    height: 120,
    borderRadius: 100,
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFF",
    elevation: 10,
    shadowColor: "#FDAE03",
  },

  Box: {
    alignSelf: "center",
    width: "90%",
    height: 250,
    elevation: 10,
    borderRadius: 30,
    backgroundColor: "#FFFF",
    shadowColor: "#FDAE03",
    justifyContent: "center",
  },

  BodyBox: {
    flex: 1,
    alignSelf: "center",
    width: "80%",
    height: 250,
    justifyContent: "center",
  },

  BodyBoxContain: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  Text: {
    marginTop: 10,
    fontSize: "20@mvs",
    color: "#5B5B5B",
    fontFamily: "Inter_400Regular",
  },

  Text2: {
    marginTop: 10,
    fontSize: "20@mvs",
    color: "#000000",
    fontFamily: "Inter_400Regular",
  },
});
