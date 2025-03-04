/* eslint-disable prettier/prettier */
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { CustomButton } from "../../components/CustomButton";
import { CustomImage } from "../../components/CustomImage";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { storeUser } from "../../store/authPersistance";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(""); // For email validation errors
  const [passwordError, setPasswordError] = useState(""); // For password validation errors

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

  const handleSignIn = async () => {
    // Validate email and password
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return; // Stop if validation fails
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      storeUser(userCredential.user);
      router.push("app-pages/home");
    } catch (error) {
      console.error(error);
      setPasswordError("Invalid email or password. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <CustomImage
        source={require("../../assets/SignUp.jpg")}
        style={{ height: 300, width: 300 }}
      />
      <View style={styles.inputContainer}>
        <FontAwesome6
          name="envelope"
          size={20}
          color="grey"
          style={styles.icon}
        />
        <TextInput
          placeholder="Enter your email"
          style={styles.textInput}
          returnKeyType="done"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text); // Validate email on change
          }}
        />
      </View>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="grey" style={styles.icon} />
        <TextInput
          placeholder="Enter your password"
          style={styles.textInput}
          secureTextEntry={!showPassword}
          returnKeyType="done"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            validatePassword(text); // Validate password on change
          }}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="grey"
            style={styles.icon}
          />
        </Pressable>
      </View>
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      <CustomButton
        title="Sign In"
        onPress={handleSignIn}
        style={{
          backgroundColor: "#91B3F9",
          width: 300,
          height: 50,
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
    // marginTop:-30
  },
  textInput: {
    fontSize: 16,
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0EEEC",
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: 300,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
});
