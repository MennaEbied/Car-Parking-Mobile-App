import { router } from "expo-router";
import { View, StyleSheet, Text } from "react-native";
import { CustomButton } from "../../components/CustomButton";
import { CustomImage } from "../../components/CustomImage";

export default function FirstOnboarding() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <CustomImage source={require("../../assets/car.jpg")} />
        <Text style={styles.heading}>Discover what CarPark can do !</Text>
        <Text style={styles.tagline}>
          Help you avoid long searches and find a spot quickly
        </Text>
      </View>
      <View style={styles.buttons}>
        <CustomButton
          title="Skip"
          onPress={() => router.push("onboarding/notification")}
          style={{
            backgroundColor: "#C9DCFD",
            flex: 1,
            marginRight: 10,
            justifyContent: "center",
          }}
          textStyle={{ color: "#000", fontSize: 18 }}
          pressedStyle={{
            backgroundColor: "#DAE2FA",
          }}
        />
        <CustomButton
          title="Next"
          onPress={() => router.push("onboarding/SecondOnboarding")}
          style={{
            backgroundColor: "#8EA5F0",
            flex: 1,
            marginLeft: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          textStyle={{ color: "#000", fontSize: 18 }}
          pressedStyle={{
            backgroundColor: "#DAE2FA",
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  heading: {
    fontWeight: "500",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
    flexWrap: "wrap",
  },
  tagline: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 5,
    flexWrap: "wrap",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    gap: 50,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
