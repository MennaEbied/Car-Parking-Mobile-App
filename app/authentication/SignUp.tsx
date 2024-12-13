import {StyleSheet,View,Text,Image,TextInput,Pressable,} from "react-native";
import { router } from "expo-router";
import { useState } from "react";

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
      <Image style={styles.img} 
      source={require("../../assets/signup1.jpg")} />

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

      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.text4}> Sign Up</Text>
      </Pressable> 

      
        <Text style={styles.text2}> Already have an account ?</Text>

        <Pressable
          style={styles.button1}
          onPress={() => router.push("authentication/SignIn")}
        >
          <Text style={styles.text3}> Sign In</Text>
        </Pressable>
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    flex: 1,
  },
  img: {
    width: 200,
    height: 150,
    marginTop: 100,
    marginBottom: 10,
    alignItems: "center",
    marginLeft:80
  },
  text1: {
    marginBottom: 30,
    fontSize: 20,
    fontWeight: "bold",
    textAlign:"center"
  },
  input: {
    backgroundColor: "#e9e9e9",
    width: 300,
    height: 50,
    borderRadius: 30,
    marginBottom: 25,
    marginRight: 42,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20, 
    marginLeft:30,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#6081ea",
    borderRadius: 30,
    marginBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 100, 
    paddingRight:115,
    alignItems: "center",
  },
   text4: {
    fontSize: 15,
  }, 
  text2: {
    fontSize: 12,
    marginTop: 4, 
    marginBottom:40,
    paddingLeft:45
  },
  text3: {
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  button1: {
    position: "absolute", 
    marginTop:600,
   marginLeft:230
  },
});

export default SignUp;
