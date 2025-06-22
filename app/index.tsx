/* eslint-disable prettier/prettier */
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { useRouter } from "expo-router";
import { CustomImage } from "../components/CustomImage";

export default function SplashScreen() {
  const router = useRouter();
  const handlePress = () => {
    router.push("/onboarding/FirstOnboarding");
  };
  return (
    <View style={styles.container}>
      <CustomImage
        source={require("../assets/park3.jpg")}
        style={{ height: 60 , width: 60 }}
      />
      <Text style={styles.heading1}>Welcome in Your</Text>
      <View style={styles.heading}>
      <Text style={styles.heading2}>Parking </Text>
      <Text style={styles.heading3}>Space</Text>
      </View>
      <Text style={styles.tagline}>Easily book spots with real-time availability anytime,anywhere</Text>
      <CustomImage
        source={require("../assets/car9.png")}
        style={{ height: 260 }}
      />
      <CustomButton onPress={handlePress} title="Get Started" textStyle={{color:"#ffff",fontSize:20, fontWeight:"500"}} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    textAlign: "center",
    flexDirection: "row",
    marginBottom:15
  },
  heading1: {
    textAlign: "center",
    paddingTop:10,
    fontSize:28,
    color: "#003551",
    fontWeight: "bold",
  },
  heading2: {
    fontSize:28,
    color:"#009ae9",
    fontWeight: "bold",
  },
  heading3: {
    fontSize:28,
    color: "#003551",
    fontWeight: "bold",
  },
  tagline:{
  fontSize:15,
  textAlign: "center",
  flexWrap: "wrap",
  color: "#002437",
  fontWeight:"500",
  padding:4
  }
});
