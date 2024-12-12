import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";
import { CustomImage } from "../../components/CustomImage";
import { CustomButton } from "../../components/CustomButton";

const SecondOnboarding = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <CustomImage
          source={require("../../assets/onboarding1.jpeg")}
          style={{ height: 300, marginTop: 35 }}
        />

        <Text style={styles.text}>
          Reserve your parking space in advance to ensure you don’t miss out !
        </Text>
      </View>
      <CustomButton
        title="Next"
        onPress={() => router.push("onboarding/notification")}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#7793ed",
          marginBottom: 30,
        }}
        textStyle={{ color: "#000", fontSize: 18 }}
        pressedStyle={{
          backgroundColor: "#DAE2FA",
        }}
      />

      {/* <Pressable onPress={()=> router.push("onboarding/notification")} 
           style ={styles.button}>
            <Text style={styles.next}>  Next  </Text>
    </Pressable>*/}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  /* img:{
        width:370,
        height:290,
        marginTop:130,
        marginBottom:50
    },*/
  text: {
    flexWrap: "wrap",
    fontWeight: "500",
    fontSize: 18,
    textAlign: "center",
    color: "#00052d",
    marginTop: 30,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 25,
  },
  /*button:{
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
       
    }*/
});
export default SecondOnboarding;
