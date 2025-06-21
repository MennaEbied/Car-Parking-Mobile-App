import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";

const SecondOnboarding = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/onboarding4.jpeg")}
        style={styles.imgage}
      />
      <Text style={styles.text}>
        Reserve your parking space in advance to ensure you don’t miss out
      </Text>
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
    justifyContent: "space-between",
    paddingVertical:90,
    paddingHorizontal: 40,
  },
  imgage: {
    width: 300,
    height: 280,
    marginTop:50
  },
  text: {
    fontSize:18,
    textAlign: "center",
    color:"#001235",
    marginBottom:100
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 95,
    backgroundColor: "#009ae9",
    borderRadius:15,
  },
  next: {
    fontSize:20,
  },
});
export default SecondOnboarding;
