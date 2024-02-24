import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableHighlight,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { ref, onValue } from "firebase/database"; // Import Firebase database modules
import { db } from "../config"; // Assuming you have a Firebase database configuration file
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

export default function History() {
  const [penaltyData, setPenaltyData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPenalty, setSelectedPenalty] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch penalty data from Firebase when the component mounts
  useEffect(() => {
    const penaltiesRef = ref(db, "penalties"); // Assuming 'penalties' is your Firebase database reference
    onValue(penaltiesRef, (snapshot) => {
      const firebaseData = snapshot.val();
      if (firebaseData) {
        // Convert the object to an array of penalty objects
        const penaltyArray = Object.values(firebaseData);
        setPenaltyData(penaltyArray);
        setLoading(false);
      }
    });
  }, []);

  const handleBoxPress = (penalty) => {
    setSelectedPenalty(penalty);
    setModalVisible(true);
  };

  const SkeletonCommonProps = {
    colorMode: "light",
    transition: { type: "timing", duration: 3000 },
    backgroundColor: "#FFFAF4",
  };

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
            {loading ? (
              // Show skeleton loading effect while Firebase data is loading
              <Skeleton.Group show={true}>
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <TouchableOpacity style={styles.BoxSkeleton} key={index}>
                    <Skeleton
                      height={24}
                      width={34}
                      {...SkeletonCommonProps}
                    ></Skeleton>
                    <View style={{ marginLeft: 10 }}>
                      <Skeleton
                        height={24}
                        width={55}
                        {...SkeletonCommonProps}
                      ></Skeleton>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <Skeleton
                        height={24}
                        width={130}
                        {...SkeletonCommonProps}
                      ></Skeleton>
                    </View>
                  </TouchableOpacity>
                ))}
              </Skeleton.Group>
            ) : (
              // Show actual penalty data when Firebase data loading is finished
              penaltyData.map((penalty, index) => (
                <TouchableOpacity
                  style={styles.Box}
                  key={index}
                  onPress={() => handleBoxPress(penalty)}
                >
                  <FontAwesome
                    name="id-card-o"
                    size={24}
                    color="#FDAE03"
                    style={styles.Icon}
                  />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.NameText}>Name:</Text>
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.NameDataText}>{penalty.Name}</Text>
                  </View>
                  {/* Display other penalty data here */}
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </View>
      {/* Modal for displaying detailed penalty information */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FontAwesome5
              name="id-card-alt"
              size={24}
              color="#FDAE03"
              style={styles.Icon1}
            />

            {selectedPenalty && (
              <View style={styles.modalDataText}>
                <Text style={styles.modalDataDateText}>
                  {selectedPenalty.Date}
                </Text>
                <Text style={styles.modalDataTextValue}>
                  {selectedPenalty.Name}
                </Text>
                <Text style={styles.modalDataTextValue}>
                  {selectedPenalty.Age} Years
                </Text>

                <Text style={styles.modalDataTextValue}>
                  {selectedPenalty.ID}
                </Text>
                <Text style={styles.modalDataHeadText}>Penalty List</Text>
                {selectedPenalty.Speeding_offenses && (
                  <Text style={styles.PenaltyText}>Speeding offenses</Text>
                )}
                {selectedPenalty.Careless_driving && (
                  <Text style={styles.PenaltyText}>Careless driving</Text>
                )}
                {selectedPenalty.Driving_without_valid_license && (
                  <Text style={styles.PenaltyText}>
                    Driving without valid license{" "}
                  </Text>
                )}
                {selectedPenalty.Failure_to_wear_a_seatbelt && (
                  <Text style={styles.PenaltyText}>
                    Failure to wear a seatbelt{" "}
                  </Text>
                )}
                {selectedPenalty.Drunk_driving && (
                  <Text style={styles.PenaltyText}>Drunk driving</Text>
                )}
              </View>
            )}

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#FDAE03" }}
              underlayColor={"#fddc95"}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
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

  BoxSkeleton: {
    borderWidth: 1,
    borderColor: "#FDAE03",
    flexDirection: "row",
    width: "80%",
    height: 90,
    backgroundColor: "#ffff",
    borderRadius: 20,
    // elevation: 4,
    shadowColor: "#FDAE03",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  Icon: {
    marginTop: 1,
  },

  Icon1: {
    marginTop: 0,
    marginBottom: 10,
  },
  NameText: {
    fontSize: "20@mvs",
    color: "#848484",
    fontFamily: "Inter_400Regular",
    // backgroundColor: "red",
  },
  NameDataText: {
    fontSize: "20@mvs",
    color: "#464646",
    alignSelf: "center",
    fontFamily: "Inter_400Regular",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    height: "auto",
    width: "70%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  btnView: {
    alignContent: "center",
    backgroundColor: "red",
  },
  openButton: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: "70%",
    backgroundColor: "#FDAE03",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  modalText: {
    fontSize: "25@mvs",
    marginBottom: 1,
    textAlign: "center",
    fontFamily: "Inter_500Medium",
  },

  modalDataTextValue: {
    marginBottom: 5,
    fontSize: "20@mvs",
    color: "#464646",
    alignSelf: "center",
    fontFamily: "Inter_500Medium",
  },

  modalDataHeadText: {
    marginTop: 10,
    fontSize: "20@mvs",
    color: "#FDAE03",
    alignSelf: "flex-start",
    fontFamily: "Inter_500Medium",
  },

  modalDataDateText: {
    marginBottom: 20,
    fontSize: "15@mvs",
    color: "#464646",
    alignSelf: "center",
    fontFamily: "Inter_500Medium",
  },

  PenaltyText: {
    marginTop: 5,
    fontSize: "16@mvs",
    color: "#464646",
    alignSelf: "flex-start",
    fontFamily: "Inter_400Regular",
  },
});
