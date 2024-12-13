import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";
import { CustomButton } from "../../components/CustomButton";

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
    /*paddingBottom:500,*/
    backgroundColor: "#ffff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 130,
    height: 120,
    marginTop:30,
    marginBottom:50
  },
  text1: {
    marginLeft:10,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  text2: {
    marginLeft:60,
    marginRight:60,
    marginBottom:50,
    fontSize: 14,
    textAlign: "center",
    color: "#6a6a6a",
  },
  button:{
        backgroundColor:"#6081ea",
        marginLeft:40,
        marginRight:40,
        marginBottom:20,
        paddingTop:12,
        paddingBottom:12,
        borderRadius:25,
        paddingRight:55
     },
      text3:{
            paddingLeft:55,
            fontSize:16,
            color:"#f5f5f5"
      },
      text4:{
        paddingLeft:10,
        fontSize:15,
         color:"#a9a9a9"
            
      },
});

export default Notification;
