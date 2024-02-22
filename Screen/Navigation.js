import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import Penalties from "./Penalties";
import History from "./History";
import User from "./User";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Penalties"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
<<<<<<< HEAD
          tabBarActiveTintColor: "#FDAE03",
=======
          tabBarActiveTintColor: "#2889eb",
>>>>>>> 6f3b905c5d656c27dba4b833966fc5583962085d
          tabBarInactiveTintColor: "#a8a8aa",
          tabBarStyle: { height: 70 },
        }}
      >
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name="file-document-multiple"
                size={25}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Penalties"
          component={Penalties}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <View
                  style={{
                    marginBottom: 50,

                    width: Platform.OS == "ios" ? 55 : 55,
                    height: Platform.OS == "ios" ? 55 : 55,

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="grid" size={55} color={color} />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="User"
          component={User}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome name="user" size={25} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
