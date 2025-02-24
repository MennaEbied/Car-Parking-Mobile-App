/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth function
import { auth } from "../../firebaseConfig"; // Import Firebase auth instance
import { storeUser } from "../../store/authPersistance"; // Import storeUser if needed

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error handling

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      // Create a new user with Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Optionally store user data (e.g., name) in Firebase or your backend
      console.log("User created:", user.email);

      // Store user data locally if needed
      storeUser(user);

      // Navigate to the home page after successful sign-up
      router.push("app-pages/home");

      // Clear form fields
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Sign-up error:", error);
      setError("Failed to create an account. Please try again."); // Display error message
      Alert.alert("Error", "Failed to create an account. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require("../../assets/signup1.jpg")} />
      <Text style={styles.text1}>Create Account</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
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
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.text4}>Sign Up</Text>
      </Pressable>
      <View style={styles.text}>
        <Text style={styles.text2}>Already have an account?</Text>
        <Pressable onPress={() => router.push("authentication/SignIn")}>
          <Text style={styles.text3}>Sign In</Text>
        </Pressable>
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
    marginBottom: 15, // Added margin for better spacing
  },
  button: {
    backgroundColor: "#6081ea",
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 115,
    paddingVertical: 10,
    height: 50,
    justifyContent: "center",
    marginBottom: 15, // Added margin for better spacing
  },
  text4: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff", // Changed text color for better visibility
  },
  text2: {
    fontSize: 15,
    textAlign: "center",
  },
  text3: {
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginLeft: 5, // Added margin for better spacing
  },
  text: {
    display: "flex",
    flexDirection: "row",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default SignUp;
