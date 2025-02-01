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

      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.text4}> Sign Up</Text>
      </Pressable>

      <View style={styles.text}>
        <Text style={styles.text2}> Already have an account ?</Text>
        <Text style={styles.text3}> Sign In</Text>
        <Pressable
          style={styles.button1}
          onPress={() => router.push("authentication/SignIn")}
        ></Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 110,
    paddingHorizontal: 25,
  },
  img: {
    width: 200,
    height: 150,
  },
  text1: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#e9e9e9",
    width: 300,
    height: 50,
    borderRadius: 30,
    fontSize: 15,
    paddingLeft: 20,


  },
  button: {
    backgroundColor: "#6081ea",
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 115,
    paddingVertical: 10,
    height: 50,
    justifyContent: "center",
  },
  text4: {
    fontSize: 16,
    textAlign: "center",

  },
  text2: {
    fontSize: 15,
    textAlign: "center",
  },
  text3: {
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  button1: {
    position: "absolute",
    marginTop: 600,
    paddingLeft: 180,
  },
  text: {
    display: "flex",
    flexDirection: "row",
  },
});

export default SignUp;