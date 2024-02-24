import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { ref, onValue, set } from "firebase/database"; // Import set method to update database value
import { db } from "../config";
import { useNavigation } from "@react-navigation/native";

function Login() {
  const [Login, setLogin] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const LoginRef = ref(db, "Login");

    onValue(LoginRef, (snapshot) => {
      const data = snapshot.val();
      if (data && typeof data === "object" && "Value" in data) {
        setLogin(data.Value);
      }
    });
  }, []);

  useEffect(() => {
    if (Login == 1) {
      navigation.navigate("HomeScreen");

      // Update the value in the database to 0 after successful login
      set(ref(db, "Login"), { Value: 0 })
        .then(() => console.log("Login value updated to 0"))
        .catch((error) => console.error("Error updating login value:", error));
    }
  }, [Login]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent barStyle="light" backgroundColor="transparent" />

      <View style={styles.Body}>
        <Image
          style={[styles.image, StyleSheet.absoluteFillObject]}
          source={require("../assets/BK.png")}
        />
        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          intensity={20}
          tint="systemChromeMaterial"
          style={styles.Box}
        >
          <View style={styles.BoxContain}>
            <Ionicons name="finger-print-sharp" size={54} color="#FDAE03" />
            <Text style={styles.Text}>Scan Your Fingerprint</Text>
          </View>
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FDAE03",
    flex: 1,
  },

  Body: {
    flex: 1,
    justifyContent: "center",
  },

  image: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },

  Box: {
    alignSelf: "center",
    overflow: "hidden",
    width: "80%",
    height: "24%",
    borderRadius: 20,
    borderColor: "#ffff",
    borderWidth: 1,
  },

  BoxContain: {
    flex: 1,
    paddingVertical: 40,
    justifyContent: "space-between",
    alignItems: "center",
  },

  Text: {
    color: "#ffff",
    fontSize: 30,
  },
});
