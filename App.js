import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import Navigation from "./Screen/Navigation";
import NetInfo from "@react-native-community/netinfo";
import * as SplashScreen from "expo-splash-screen";
import No_internet from "./Screen/No_internet";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    // Hide splash screen after 2 seconds
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);

    // Unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected ? <Navigation /> : <No_internet />;
}
