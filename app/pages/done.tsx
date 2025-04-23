import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";

const Notification = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/done.jpg")} style={styles.img} />
      <Text style={styles.text1}> Yay....! Booked it </Text>
      <Text style={styles.text2}>
        congratulations you have successfully booked parking slot
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => router.push("app-pages/home")}
      >
        <Text style={styles.text3}> Back to home </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 190,
  },
  img: {
    width: 150,
    height: 150,
  },
  text1: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
  },
  text2: {
    fontSize: 15,
    textAlign: "center",
    color: "#6a6a6a",
    paddingLeft: 30,
    paddingRight: 30,
  },
  button: {
    backgroundColor: "#6293ff",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 70,
  },
  text3: {
    fontSize: 16,
    color: "#f5f5f5",
  },
});

export default Notification;
