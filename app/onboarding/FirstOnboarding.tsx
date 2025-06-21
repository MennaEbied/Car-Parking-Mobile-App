import { router } from "expo-router";
import { View, StyleSheet, Text, Image } from "react-native";
import { CustomButton } from "../../components/CustomButton";
import { CustomImage } from "../../components/CustomImage";

export default function FirstOnboarding() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
        source={require("../../assets/onboarding6.jpg")}
        style={styles.image}
        ></Image>
        <Text style={styles.heading}>Discover what CarPark can do !</Text>
        <Text style={styles.tagline}>
          Help you avoid long searches and find a spot quickly
        </Text>
      </View>
      <View style={styles.buttons}>
        <CustomButton
          title="Skip"
          onPress={() => router.push("authentication/SignUp")}
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
            backgroundColor: "#009ae9",
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
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    flexWrap: "wrap",
    marginBottom: 35,
    color:"#003551"
  },
  tagline: {
    fontSize: 18,
    textAlign: "center",
    flexWrap: "wrap",
    color:"#001235"
    //marginHorizontal:10,
    //fontSize:20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 60,
    gap: 50,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  image:{
   height:260,
   width:330,
   marginTop:100
  }
});
