/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { storeUser } from "../../store/authPersistance";


const GoogleIcon = () => <Text style={styles.googleIcon}>G</Text>;

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
      router.push("app-pages/home"); // Navigate to home on successful sign-in
    } catch (error) {
      console.error(error);
      // Display a generic error for security
      setPasswordError("Invalid email or password. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.innerContainer}>
          {/* Top Icon */}
          <View style={styles.iconWrapper}>
            <Feather name="lock" size={24} color="#4285F4" />
          </View>

          {/* Welcome Text */}
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to your account to continue
          </Text>

          {/* Email Input */}
          <Text style={styles.label}>Email Address</Text>
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
                if (emailError) validateEmail(text);
              }}
              onBlur={() => validateEmail(email)}
            />
          </View>
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          {/* Password Input */}
          <Text style={styles.label}>Password</Text>
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
                if (passwordError) validatePassword(text);
              }}
              onBlur={() => validatePassword(password)}
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

          {/* Sign In Button */}
          <Pressable
            style={({ pressed }) => [
              styles.signInButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleSignIn}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </Pressable>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.line} />
          </View>

          {/* Google Sign In Button */}
          <Pressable
            style={({ pressed }) => [
              styles.googleButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <GoogleIcon />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </Pressable>

          {/* Sign Up Navigation */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Pressable onPress={() => router.push("authentication/SignUp")}>
              <Text style={[styles.footerText, styles.signUpLink]}>
                Sign up
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  keyboardAvoidingContainer: { flex: 1 },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F3F4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "grey",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 5,
    marginBottom: 5,
    fontSize: 14,
    color: "grey",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 15,
    marginBottom: 5, // Reduced margin
    width: "100%",
    height: 55,
  },
  icon: { marginRight: 10 },
  textInput: { flex: 1, fontSize: 16, color: "#000000" },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 5,
    marginBottom: 15,
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: "#4285F4",
    borderRadius: 10,
    width: "100%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signInButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  buttonPressed: { opacity: 0.8 },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 30,
  },
  line: { flex: 1, height: 1, backgroundColor: "#E0E0E0" },
  dividerText: { marginHorizontal: 10, color: "grey" },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: "100%",
    height: 55,
  },
  googleIcon: {
    marginRight: 12,
    fontSize: 20,
    fontWeight: "bold",
    color: "#4285F4",
  },
  googleButtonText: { color: "#000000", fontSize: 16, fontWeight: "500" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 30 },
  footerText: { fontSize: 14, color: "grey" },
  signUpLink: { color: "#4285F4", fontWeight: "bold" },
});
