import { View, StyleSheet, Text } from "react-native";
import { CustomButton } from "../../components/CustomButton";
import { CustomImage } from "../../components/CustomImage";

export default function FirstOnboarding() {
  const handlePress = () => {};
  return (
    <View style={styles.container}>
      <CustomImage
        source={require("../../assets/car.jpg")}
        style={{ height: 300 }}
      />
      <Text style={styles.heading}>Discover what CarPark can do !</Text>
      <Text style={styles.tagline}>
        Help you avoid long searches and find a spot quickly
      </Text>
      <View style={styles.buttons}>
      <CustomButton
        title="Skip"
        onPress={() => console.log("Navigating to next screen...")}
        style={{ backgroundColor: "#C9DCFD", width:120,marginLeft:10 }}
        textStyle={{ color: "#000", fontSize: 20 }}
        pressedStyle={{
          backgroundColor: "#DAE2FA",
        }}
      /><CustomButton
      title="Next"
      onPress={() => console.log("Navigating to next screen...")}
      style={{ backgroundColor: "#8EA5F0", width:120 ,marginRight:10}}
      textStyle={{ color: "#000", fontSize: 20 }}
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
    flex:1,
    
  },
  heading: {
    fontWeight: "500",
    fontSize: 25,
    textAlign: "center",
    margin: 30,
    paddingTop:20
  },
  tagline: {
    fontSize: 20,
    flexWrap: "nowrap",
    textAlign: "center",
    marginHorizontal: 70,
  },
  buttons:{
    display:"flex",
    flexDirection:'row',
    gap:150,
   position:"absolute",
   bottom:80,
   
  }
});
