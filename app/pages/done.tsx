/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text, Pressable, SafeAreaView, Animated } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/MaterialIcons";


const COLORS = {
  primary: "#1A73E8", 
  white: "#FFFFFF",
  background: "#FFFFFF",
  text: "#212529",
  textSecondary: "#6C757D",
};

const SuccessScreen = () => {
  // Set up the animation value using React Native's built-in Animated API
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Configure and start the spring animation when the screen loads
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4, // Controls the "bounciness"
      useNativeDriver: true, // Improves performance
    }).start();
  }, [scaleAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Main content area */}
      <View style={styles.content}>
        {/* The animated checkmark circle */}
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleAnim }] }]}>
          <Icon name="check" size={80} color={COLORS.white} />
        </Animated.View>
        
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>
          Congratulations,you have successfully booked the parking slot.
        </Text>
      </View>

      {/* Button fixed at the bottom */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => router.push("app-pages/home")}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
     paddingVertical:50
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 130,
    height: 130,
    borderRadius: 75,
    backgroundColor: COLORS.primary, 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.text,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: COLORS.textSecondary,
    lineHeight: 23,
  },
  buttonContainer: {
    padding: 30,
    paddingBottom: 30,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.white,
  },
});

export default SuccessScreen;