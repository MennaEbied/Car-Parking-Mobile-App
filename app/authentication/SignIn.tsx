import { View, Text, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { CustomButton } from "../../components/CustomButton";
import { CustomImage } from "../../components/CustomImage";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';

export default function SignIn() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <CustomImage
        source={require("../../assets/SignUp.jpg")}
        style={{ height: 300, width: 400 }}
      />
      <View style={styles.inputContainer}>
      <FontAwesome6 name="envelope" size={24} color="grey" style={styles.icon}/>
      <TextInput
        placeholder="Enter your email"
        style={styles.textInput}
        returnKeyType="done"
        keyboardType="email-address"
        
      />
      </View>
      <View style={styles.inputContainer}>
      <Feather name="lock" size={24} color="grey" style={styles.icon} />
      <TextInput
        placeholder="Enter your password"
        style={styles.textInput}
        secureTextEntry
        returnKeyType="done"
      />
      </View>
      <CustomButton
        title="Sign In"
        onPress={() => router.push("app-pages/home")}
        style={{
          backgroundColor: "#91B3F9",
          width: 300,
        }}
        textStyle={{ color: "#000", fontSize: 20 }}
        pressedStyle={{
          backgroundColor: "#DAE2FA",
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
    paddingHorizontal: 20,
   
  },
  textInput: {
    fontSize: 18,
    flex:1
     
  },
  inputContainer:{
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0EEEC",
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: 300,
    height: 60,
    
   
  },
  icon:{
    marginRight: 10,
  }
});
