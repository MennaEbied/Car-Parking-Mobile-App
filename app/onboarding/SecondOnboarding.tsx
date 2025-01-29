import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";

const SecondOnboarding = () => {
  return (
    <View style={styles.container}>
      
          <Image source={require("../../assets/onboarding1.jpeg")}
          style={styles.img}
          />
      <Text style={styles.text}>
         Reserve your parking space in advance to ensure you don’t miss out</Text>

       <Pressable onPress={()=> router.push("onboarding/notification")} 
           style ={styles.button}>
            <Text style={styles.next}>  Next  </Text>
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
      paddingVertical: 110,
      paddingHorizontal:40,
    },
    img:{
      width:350,
      height:300,
    },
    text:{
     fontSize:18,
     textAlign: "center",
    },
    button:{
      alignItems: "center",
      justifyContent: "center",
      paddingVertical:12,
      paddingHorizontal:95,
      backgroundColor:"#7793ed",
      borderRadius:35,
      },
      next:{
         fontSize:20,
      }
  });
  export default SecondOnboarding;
  