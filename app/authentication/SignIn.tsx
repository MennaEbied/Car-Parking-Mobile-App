/* eslint-disable prettier/prettier */
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { CustomButton } from "../../components/CustomButton";
import { CustomImage } from "../../components/CustomImage";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Updated import
import { auth } from "../../firebaseConfig";
import { storeUser } from "../../store/authPersistance";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Added for error handling

  const handleSignIn = async () => {
    try {
      // Use signInWithEmailAndPassword for login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      storeUser(userCredential.user); // Store user data if needed
      router.push("app-pages/home"); // Navigate to home page after successful login
    } catch (error) {
      console.error(error);
      setError("Invalid email or password. Please try again."); // Display error message
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
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="grey" style={styles.icon} />
        <TextInput
          placeholder="Enter your password"
          style={styles.textInput}
          secureTextEntry
          returnKeyType="done"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}{" "}
      {/* Display error message */}
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
  },
});
