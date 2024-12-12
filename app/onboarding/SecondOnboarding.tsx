import { StyleSheet, View ,Text,Image,Pressable} from 'react-native';
import { router } from "expo-router";

const SecondOnboarding = () => {
    return (
        <View style={styles.container}>
           <Image source={require("../../assets/onboarding1.jpeg")}
           style={styles.img}/>

           <Text style={styles.text}> 
            Reserve your parking space in advance to ensure you don’t miss out.
            </Text>

           <Pressable onPress={()=> router.push("onboarding/notification")} 
           style ={styles.button}>
            <Text style={styles.next}>  Next  </Text>
           </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingBottom:500,
        backgroundColor: "#ffff",
      },
    img:{
        width:370,
        height:290,
        marginTop:130,
        marginBottom:50
    },
    text:{
    marginLeft:50,
    marginRight:40,
    marginBottom:55,
    fontWeight:"bold",
    fontSize:16,
    textAlign: "center",
    color:"#00052d",
    
    },
    button:{
        marginLeft:62,
        marginRight:60,
        paddingLeft:82,
        paddingTop:12,
        paddingBottom:12,
        backgroundColor:"#7793ed",
        borderRadius:35,
    },
    next:{
       fontSize:20,
       
    }
})
export default SecondOnboarding;
