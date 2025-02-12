import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";

const Notification = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/notification.jpg")}
        style={styles.img}
      />
      <Text style={styles.text1}> Enable Notification Access </Text>
      <Text style={styles.text2}>
        Enable notifications to receive real-time updates
      </Text>
    <Pressable style={styles.button}
              onPress={()=> router.push("authentication/SignUp")}
            >
                 <Text style={styles.text3}> Allow Notification</Text>
            </Pressable>   
            <Pressable 
            onPress={()=> router.push("authentication/SignUp")}>
                 <Text style={styles.text4}> Maybe Later </Text>
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
    paddingVertical:170,
    paddingHorizontal:20
  },
  img: {
    width: 130,
    height: 120,
  },
  text1: {
    fontSize:22,
    fontWeight: "bold",
    textAlign: "center",
  },
  text2: {
    fontSize: 15,
    textAlign: "center",
    color: "#6a6a6a",
  },
  button:{
   backgroundColor:"#6081ea",
   borderRadius:30,
   paddingVertical:12,
   paddingHorizontal:60,
  },
  text3:{
    fontSize:15,
    color:"#f5f5f5"
 },
 text4:{
  fontSize:15,
  color:"#a9a9a9" 
  },
});

export default Notification;
