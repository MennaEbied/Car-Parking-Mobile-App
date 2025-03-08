/* eslint-disable react-native/no-unused-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomePage: React.FC = () => {
  const [userName, setUserName] = useState("User"); // State to store the user's name

  // Fetch the user's name from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await AsyncStorage.getItem("userName");
        if (name) {
          setUserName(name); // Set the user's name if it exists
        }
      } catch (error) {
        console.error("Failed to fetch user name:", error);
      }
    };
    fetchUserName();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/home.jpeg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.header}>
        <View style={styles.heading}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome6
              name="cloud-sun"
              size={19}
              color="white"
              style={{ marginRight: 10 }}
            />
            <Text style={{ color: "white" }}>Sunny 39°C</Text>
          </View>
          <TouchableOpacity>
            <FontAwesome6
              name="bell"
              size={28}
              color="white"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.greeting}>Hello, {userName}!</Text>
        <Text style={styles.subtitle}>Find your perfect parking spot</Text>
        <Text style={{ fontWeight: "500", fontSize: 16, color: "white" }}>
          Today's price: 15.99$
        </Text>
      </View>
      <TouchableOpacity
        style={{ marginLeft: 180 }}
        onPress={() => router.push("pages/slots")}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.buttontext}>Book Now</Text>
          <FontAwesome6
            name="angles-right"
            size={20}
            color="white"
            style={{ marginRight: 10 }}
          />
        </View>
      </TouchableOpacity>
      <StatusBar style="light" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    padding: 30,
    marginBottom: 380,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 25,
    color: "white",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "500",
    color: "white",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttontext: {
    color: "white",
    fontSize: 20,
    marginRight: 5,
    fontWeight: "700",
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default HomePage;