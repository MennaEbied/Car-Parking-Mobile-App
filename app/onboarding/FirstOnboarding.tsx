/* eslint-disable prettier/prettier */
import { router } from "expo-router";
import { View, StyleSheet, Text, Image, SafeAreaView } from "react-native";
import { CustomButton } from "../../components/CustomButton";

export default function FirstOnboarding() {
  return (
    // Use SafeAreaView to avoid content overlapping with notches and status bars
    <SafeAreaView style={styles.container}>
      {/* Main content container */}
      <View style={styles.contentContainer}>
        <Image
          source={require("../../assets/onboarding6.jpg")}
          style={styles.image}
        />
        <Text style={styles.heading}>Discover what CarPark can do!</Text>
        <Text style={styles.tagline}>
          Help you avoid long searches and find a spot quickly
        </Text>
      </View>

      {/* Container for progress indicator and buttons */}
      <View style={styles.footer}>
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttons}>
          <CustomButton
            title="Skip"
            onPress={() => router.push("authentication/SignUp")}
            style={{
              backgroundColor: "#EFEFEF", 
              flex: 1,
              marginRight: 10,
              justifyContent: "center",
            }}
            textStyle={{ color: "#000", fontSize: 18 }}
            pressedStyle={{
              backgroundColor: "#DDDDDD",
            }}
          />
          <CustomButton
            title="Next"
            onPress={() => router.push("onboarding/SecondOnboarding")}
            style={{
              backgroundColor: "#009ae9",
              flex: 1,
              marginLeft: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            textStyle={{ color: "#ffff", fontSize: 18 }}
            pressedStyle={{
              backgroundColor: "#007ABF", 
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    flex: 1,
  },
  contentContainer: {
    flex: 1, 
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40, 
  },
  image: {
    height: 260,
    width: 330,
    resizeMode: 'contain', 
    marginBottom: 50,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 24, 
    textAlign: "center",
    marginBottom: 15,
    color: "#003551",
  },
  tagline: {
    fontSize: 18,
    textAlign: "center",
    color: "#5A6A75", 
    paddingHorizontal: 10,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30, 
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#D3D3D3", 
    marginHorizontal: 8,
  },
  activeDot: {
    backgroundColor: "#009ae9", 
    width: 12, 
    height: 12,
    borderRadius: 6,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});