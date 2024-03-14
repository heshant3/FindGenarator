import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Button,
} from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_300Light,
} from "@expo-google-fonts/inter";
import { ScaledSheet } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { ref, push, onValue } from "firebase/database";
import { db } from "../config";
import { BlurView } from "expo-blur";

export default function Penalties() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState("");
  const [alcoholLevel, setAlcoholLevel] = useState(null);
  const [iconColor, setIconColor] = useState("#FDAE03"); // Initial color
  // console.log(alcoholLevel);

  useEffect(() => {
    const alcoholRef = ref(db, "alcohol_Sensor/Level");
    onValue(alcoholRef, (snapshot) => {
      const data = snapshot.val();
      setAlcoholLevel(data);
    });
  }, []);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      if (data === "19970512") {
        setName("Nadun Asiri");
        setAge("20");
        setId("B4155467");
        setModalVisible(false); // Close the modal automatically
      } else if (data === "19970513") {
        setName("Nisal Naween");
        setAge("21");
        setId("B5319648");
        setModalVisible(false); // Close the modal automatically
      } else {
        // Show an alert if the scanned data does not match the expected value
        alert("Please tap Valid license card.");
        setModalVisible(false); // Close the modal automatically
      }
    }
  };

  // Load fonts asynchronously
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_300Light,
  });

  if (!fontsLoaded) {
    // Return a loading indicator or null while fonts are loading
    return null;
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // Inside your component function
  const handleOkPress = () => {
    const penaltiesRef = ref(db, "penalties"); // Assuming 'penalties' is your Firebase database reference

    // Get the current date
    const currentDate = new Date().toISOString().slice(0, 10);

    // Create an object with the desired key-value pairs, including the current date
    const penaltyData = {
      Date: currentDate,
      Name: name,
      Age: age,
      ID: id,
      Speeding_offenses: checked1,
      Careless_driving: checked2,
      Driving_without_valid_license: checked3,
      Failure_to_wear_a_seatbelt: checked4,
      Drunk_driving: checked5,
      // Add any other data you want to send
    };

    // Push data to Firebase with a unique ID
    push(penaltiesRef, penaltyData)
      .then((newRef) => {
        // console.log("Data added with ID: ", newRef.key);
        // Reset states after data is sent
        setName("");
        setAge("");
        setId("");
        setChecked1(false);
        setChecked2(false);
        setChecked3(false);
        setChecked4(false);
        setChecked5(false);
        alert("Data submitted successfully!");
      })
      .catch((error) => {
        // console.error("Error adding data: ", error);
        alert("Error adding data");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFAF4" />
      <View style={styles.Header}>
        <Text style={styles.HeadText}>Penalties</Text>
      </View>
      <View style={styles.Middle}>
        <TouchableOpacity
          style={styles.Box}
          onLongPress={() => {
            setName("");
            setAge("");
            setId("");
          }}
        >
          <View style={styles.TextBox}>
            <Text style={styles.BoxText}>
              Name:{"  "} {name}
            </Text>
            <Text style={styles.BoxText}>
              Age:{"     "} {age}
            </Text>
            <Text style={styles.BoxText}>
              ID:{"        "} {id}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableHighlight
          onPress={() => {
            setName("");
            setAge("");
            setId("");
            setModalVisible(true);
          }}
          underlayColor="#928F8A"
          style={styles.QRbtn}
          onPressIn={() => setIconColor("white")} // Change color to white when pressed
          onPressOut={() => setIconColor("#FDAE03")} // Change color back to original when released
        >
          <MaterialCommunityIcons
            name="qrcode-scan"
            size={44}
            color={iconColor}
            style={styles.Qr}
          />
        </TouchableHighlight>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              intensity={50}
              tint="systemThinMaterialDark"
              style={styles.modalView}
            >
              <View style={styles.Cam}>
                <Camera
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  style={StyleSheet.absoluteFillObject}
                />
              </View>
              {scanned && setScanned(false)}
              <TouchableHighlight
                underlayColor={"#928F8A"}
                style={styles.openButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
            </BlurView>
          </View>
        </Modal>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.BottomText}>Penalties</Text>
        <View style={styles.List}>
          <View style={styles.ListItem}>
            <Text style={styles.ListText}>Speeding offenses</Text>
            <MaterialCommunityIcons
              name={checked1 ? "checkbox-marked" : "checkbox-blank-outline"}
              size={24}
              color={checked1 ? "#FDAE03" : "#9A9A9A"}
              onPress={() => setChecked1(!checked1)}
            />
          </View>
          <View style={styles.ListItem}>
            <Text style={styles.ListText}>Careless driving</Text>
            <MaterialCommunityIcons
              name={checked2 ? "checkbox-marked" : "checkbox-blank-outline"}
              size={24}
              color={checked2 ? "#FDAE03" : "#9A9A9A"}
              onPress={() => setChecked2(!checked2)}
            />
          </View>
          <View style={styles.ListItem}>
            <Text style={styles.ListText}>Driving without valid license</Text>
            <MaterialCommunityIcons
              name={checked3 ? "checkbox-marked" : "checkbox-blank-outline"}
              size={24}
              color={checked3 ? "#FDAE03" : "#9A9A9A"}
              onPress={() => setChecked3(!checked3)}
            />
          </View>
          <View style={styles.ListItem}>
            <Text style={styles.ListText}>Failure to wear a seatbelt</Text>
            <MaterialCommunityIcons
              name={checked4 ? "checkbox-marked" : "checkbox-blank-outline"}
              size={24}
              color={checked4 ? "#FDAE03" : "#9A9A9A"}
              onPress={() => setChecked4(!checked4)}
            />
          </View>
          <View style={styles.ListItem}>
            <Text style={styles.ListText}>Drunk driving</Text>
            <MaterialCommunityIcons
              name={checked5 ? "checkbox-marked" : "checkbox-blank-outline"}
              size={24}
              color={checked5 ? "#FDAE03" : "#9A9A9A"}
              onPress={() => setChecked5(!checked5)}
            />
          </View>

          {/* Conditional rendering for alcohol level */}
          {checked5 && (
            <>
              <View style={styles.AlcoholListItem}>
                <Text style={styles.AlcoholListText}>Alcohol Percentage :</Text>
                <Text style={styles.AlcoholListText}>{alcoholLevel}%</Text>
              </View>
            </>
          )}

          <TouchableHighlight
            onPress={name ? handleOkPress : null}
            underlayColor={"#928F8A"}
            style={[styles.Submitbtn, !name && styles.disabled]}
          >
            <Text style={styles.SubmitText}>Submit</Text>
          </TouchableHighlight>
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
    backgroundColor: "#FFFF",
    shadowColor: "#FDAE03",
    justifyContent: "center",
  },
  Qr: {
    alignSelf: "center",
  },

  QRbtn: {
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderColor: "transparent",
    borderRadius: 10,
    fontSize: 42,
    marginTop: 20,
  },

  BottomText: {
    marginTop: 10,
    fontSize: "25@ms0.1",
    color: "#5B5B5B",
    alignSelf: "flex-start",
    paddingLeft: 30,
    fontFamily: "Inter_500Medium",
  },

  TextBox: {
    alignSelf: "flex-start",
    paddingLeft: 60,
  },

  BoxText: {
    fontSize: "20@mvs",
    color: "#5B5B5B",
    fontFamily: "Inter_400Regular",
    marginVertical: 6,
    alignSelf: "flex-start",
  },

  List: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
  },

  ListItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },

  AlcoholListItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  ListText: {
    fontSize: "20@mvs0.1",
    color: "#5B5B5B",
    fontFamily: "Inter_400Regular",
    alignSelf: "flex-start",
  },

  AlcoholListText: {
    marginTop: -20,
    fontSize: "18@mvs",
    color: "#5B5B5B",
    fontFamily: "Inter_300Light",
    alignSelf: "flex-start",
  },

  Submitbtn: {
    backgroundColor: "#FDAE03",
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
    borderColor: "transparent",
    borderRadius: 10,
    fontSize: 42,
    marginTop: 20,
    marginBottom: 20,
  },

  SubmitText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },

  disabled: {
    opacity: 0.5, // Set opacity to visually indicate that the button is disabled
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FDAE03",
    justifyContent: "center",
    alignItems: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    height: "60%",
    width: "80%",
    overflow: "hidden",
    borderRadius: 20,
    paddingTop: 35,
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "white",
  },
  openButton: {
    marginTop: 40,
    backgroundColor: "#FDAE03",
    alignSelf: "center",
    justifyContent: "center",
    width: "20%",
    height: 30,
    borderRadius: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  Cam: {
    width: "80%",
    height: "80%",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#F194FF",
  },
});
