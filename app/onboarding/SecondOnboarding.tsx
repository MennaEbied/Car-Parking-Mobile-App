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
    justifyContent: "center",
    
  },
  img:{
        width:330,
        height:290,
        marginBottom:30
    },
  text: {
    fontWeight: "500",
    fontSize: 18,
    textAlign: "center",
    color: "#00052d",
    marginTop: 10,
    paddingLeft:40,
    paddingRight:40
  },
  
  button:{
        marginLeft:60,
        marginRight:50,
        paddingLeft:85,
        paddingTop:12,
        paddingBottom:12,
        backgroundColor:"#7793ed",
        borderRadius:35,
        marginTop:70
    },
    next:{
       fontSize:20,
      marginRight:80
       
    }
});
export default SecondOnboarding;
