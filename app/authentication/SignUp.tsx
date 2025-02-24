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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { storeUser } from "../../store/authPersistance";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Validate email and password
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return; // Stop if validation fails
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log("User created:", user.email);

      // Store user's name locally
      await AsyncStorage.setItem("userName", name);

      // Store user data if needed
      storeUser(user);

      // Navigate to the home page after successful sign-up
      router.push("app-pages/home");

      // Clear form fields
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Sign-up error:", error);
      setPasswordError("Failed to create an account. Please try again.");
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
        onChangeText={(text) => {
          setEmail(text);
          validateEmail(text); // Validate email on change
        }}
        keyboardType="email-address"
        returnKeyType="done"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          style={styles.passwordInput}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            validatePassword(text); // Validate password on change
          }}
          returnKeyType="done"
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="grey"
            style={styles.eyeIcon}
          />
        </Pressable>
      </View>
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
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
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e9e9e9",
    borderRadius: 30,
    width: 300,
    height: 50,
    marginBottom: 15,
    paddingLeft: 20,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
  },
  eyeIcon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: "#6081ea",
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 115,
    paddingVertical: 10,
    height: 50,
    justifyContent: "center",
    marginBottom: 15,
  },
  text4: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  text2: {
    fontSize: 15,
    textAlign: "center",
  },
  text3: {
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginLeft: 5,
  },
  text: {
    display: "flex",
    flexDirection: "row",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
});

export default SignUp;
