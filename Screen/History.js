import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { FontAwesome } from "@expo/vector-icons";
import { ref, onValue } from "firebase/database"; // Import Firebase database modules
import { db } from "../config"; // Assuming you have a Firebase database configuration file

export default function History() {
  const [penaltyData, setPenaltyData] = useState([]);

  // Fetch penalty data from Firebase when the component mounts
  useEffect(() => {
    const penaltiesRef = ref(db, "penalties"); // Assuming 'penalties' is your Firebase database reference
    onValue(penaltiesRef, (snapshot) => {
      const firebaseData = snapshot.val();
      if (firebaseData) {
        // Convert the object to an array of penalty objects
        const penaltyArray = Object.values(firebaseData);
        setPenaltyData(penaltyArray);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFAF4" />
      <View style={styles.Header}>
        <Text style={styles.HeadText}>History</Text>
      </View>
      <View style={styles.Body}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.BodyBox}>
            {penaltyData.map((penalty, index) => (
              <TouchableOpacity style={styles.Box} key={index}>
                <FontAwesome
                  name="id-card-o"
                  size={24}
                  color="#FDAE03"
                  style={styles.Icon}
                />
                <Text style={styles.NameText}>{"  "} Name:</Text>

                <Text style={styles.NameDataText}>
                  {""} {penalty.Name}
                </Text>
                {/* Display other penalty data here */}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
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
  scroll: {
    paddingVertical: 20,
  },
  Body: {
    flex: 1,
  },

  BodyBox: {
    alignItems: "center",
  },
  Box: {
    flexDirection: "row",
    width: "80%",
    height: 90,
    backgroundColor: "#ffff",
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#FDAE03",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  Icon: {
    marginTop: 1,
  },
  NameText: {
    fontSize: "20@mvs",
    color: "#848484",
    alignSelf: "center",
    fontFamily: "Inter_400Regular",
  },

  NameDataText: {
    fontSize: "20@mvs",
    color: "#464646",
    alignSelf: "center",
    fontFamily: "Inter_400Regular",
  },
});
