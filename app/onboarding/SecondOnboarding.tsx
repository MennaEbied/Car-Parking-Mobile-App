/* eslint-disable prettier/prettier */
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";

const SecondOnboarding = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/onboarding4.jpeg")}
        style={styles.image} // Corrected style name from 'imgage' to 'image'
      />
      <Text style={styles.text}>
        Reserve your parking space in advance to ensure you don’t miss out
      </Text>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
      </View>

      <Pressable
        onPress={() => router.push("authentication/SignUp")}
        style={styles.button}
      >
        <Text style={styles.next}> Next </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "space-around", // Changed for better vertical spacing
    paddingVertical: 40, // Reduced vertical padding slightly
    paddingHorizontal: 40,
  },
  image: {
    width: 300,
    height: 280,
    marginTop: 20, // Adjusted margin
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "#001235",
    lineHeight: 25, // Added for better readability
  },
  // --- New Styles for Progress Indicator ---
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#D3D3D3", // Inactive dot color
    marginHorizontal: 8,
  },
  activeDot: {
    backgroundColor: "#009ae9", // Active dot color, matches the button
  },
  // --- End of New Styles ---
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    width: "100%", // Changed for responsiveness
    backgroundColor: "#009ae9",
    borderRadius: 15,
  },
  next: {
    fontSize: 20,
    color: "#ffff",
    fontWeight: 'bold', // Added for better emphasis
  },
});

export default SecondOnboarding;