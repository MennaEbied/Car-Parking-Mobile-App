import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { CustomButton } from "../../components/CustomButton";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (name && email && password) {
      router.push("app-pages/home");
      setName("");
      setEmail("");
      setPassword("");
    } else {
      alert("Please fill in all fields");
    }
  };
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require("../../assets/signup1.jpg")} />

      <Text style={styles.text1}> Create Account </Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      ></TextInput>

      <TextInput
        placeholder="E-mail"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        returnKeyType="done"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        returnKeyType="done"
      />

      {/* <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.text4}> Sign Up</Text>
      </Pressable> */}
      <CustomButton
        title="Sign Up"
        onPress={handleSignUp}
        style={{
          backgroundColor: "#6081ea",
          width: 300,
          height: 50,
        }}
        textStyle={{ color: "#000", fontSize: 20 }}
        pressedStyle={{
          backgroundColor: "#DAE2FA",
        }}
      />
      <View style={styles.btnContainer}>
        <Text style={styles.text2}> Already have an account ?</Text>

        <Pressable
          style={styles.button1}
          onPress={() => router.push("authentication/SignIn")}
        >
          <Text style={styles.text3}> Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 200,
    height: 200,
    /*marginTop: 90,
    marginLeft: 80,
    marginBottom: 10,*/
  },
  text1: {
    /*marginLeft: 88,*/
    marginBottom: 30,
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#e9e9e9",
    width: 300,
    height: 50,
    borderRadius: 30,
    paddingLeft: 8,
    marginBottom: 8,
    /* marginBottom: 27,
    marginLeft: 40,
    marginRight: 42,
   
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20, */
  },
  button: {
    /*backgroundColor: "#6081ea",
    borderRadius: 30,
     marginTop: 15,
    marginBottom: 20,
    marginLeft: 40,
    marginRight: 42,
    
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 95, */
  },
  /*  text4: {
    fontSize: 15,
    
  }, */
  text2: {
    fontSize: 12,
    /*    marginLeft: 55,
    marginTop: 4, */
  },
  text3: {
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  button1: {
    /* marginLeft: 235,
    marginRight: 30,
    position: "absolute", */
  },
  btnContainer: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SignUp;
