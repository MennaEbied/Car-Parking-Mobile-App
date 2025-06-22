/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { storeUser } from "../../store/authPersistance";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";


const GoogleIcon = () => <Text style={styles.googleIcon}>G</Text>;

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Error states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");

  const validateName = (name: string) => {
    if (!name.trim()) {
      setNameError("Full name is required.");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePhoneNumber = (number: string) => {
    // Simple regex for an 11-digit phone number, as in the original code
    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(number)) {
      setPhoneNumberError("Please enter a valid 11-digit phone number.");
      return false;
    }
    setPhoneNumberError("");
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

  const validateConfirmPassword = (pass: string, confirmPass: string) => {
    if (pass !== confirmPass) {
      setConfirmPasswordError("Passwords do not match.");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const validateTerms = (agreed: boolean) => {
    if (!agreed) {
      setTermsError("You must agree to the terms and conditions.");
      return false;
    }
    setTermsError("");
    return true;
  };

  const handleSignUp = async () => {
    // Trigger all validations at once on submit
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhoneNumber(phoneNumber);
    const isPasswordValid = validatePassword(password);
    const doPasswordsMatch = validateConfirmPassword(password, confirmPassword);
    const areTermsAgreed = validateTerms(agreedToTerms);

    if (
      !isNameValid ||
      !isEmailValid ||
      !isPhoneValid ||
      !isPasswordValid ||
      !doPasswordsMatch ||
      !areTermsAgreed
    ) {
      return; // Stop if any validation fails
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log("User created:", user.email);

      // Store additional user info
      await AsyncStorage.setItem("userName", name);
      await AsyncStorage.setItem("userPhoneNumber", phoneNumber);
      storeUser(user);

      router.push("app-pages/home"); // Navigate home
    } catch (error: any) {
      console.error("Sign-up error:", error);
      if (error.code === "auth/email-already-in-use") {
        setEmailError("This email address is already in use.");
      } else {
        Alert.alert("Error", "Failed to create an account. Please try again.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Icon */}
          <View style={styles.iconWrapper}>
            <Feather name="user" size={24} color="#4285F4" />
          </View>

          {/* Welcome Text */}
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join us today and get started in minutes
          </Text>

          {/* Form Inputs */}
          <View style={styles.form}>
            {/* Full Name */}
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputContainer}>
              <Feather name="user" size={20} color="grey" style={styles.icon} />
              <TextInput
                placeholder="Enter your full name"
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                onBlur={() => validateName(name)}
              />
            </View>
            {nameError ? (
              <Text style={styles.errorText}>{nameError}</Text>
            ) : null}

            {/* Email Address */}
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
                value={email}
                onChangeText={setEmail}
                onBlur={() => validateEmail(email)}
                keyboardType="email-address"
              />
            </View>
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}

            {/* Phone Number */}
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputContainer}>
              <Feather
                name="phone"
                size={20}
                color="grey"
                style={styles.icon}
              />
              <TextInput
                placeholder="Enter your phone number"
                style={styles.textInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                onBlur={() => validatePhoneNumber(phoneNumber)}
                keyboardType="phone-pad"
                maxLength={11}
              />
            </View>
            {phoneNumberError ? (
              <Text style={styles.errorText}>{phoneNumberError}</Text>
            ) : null}

            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Feather name="lock" size={20} color="grey" style={styles.icon} />
              <TextInput
                placeholder="Create a password"
                style={styles.textInput}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                onBlur={() => validatePassword(password)}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="grey"
                />
              </Pressable>
            </View>
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

            {/* Confirm Password */}
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputContainer}>
              <Feather name="lock" size={20} color="grey" style={styles.icon} />
              <TextInput
                placeholder="Confirm your password"
                style={styles.textInput}
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onBlur={() =>
                  validateConfirmPassword(password, confirmPassword)
                }
              />
              <Pressable
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Feather
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color="grey"
                />
              </Pressable>
            </View>
            {confirmPasswordError ? (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            ) : null}

            {/* Terms Agreement */}
            <View style={styles.checkboxContainer}>
              <Pressable
                style={styles.checkboxBase}
                onPress={() => setAgreedToTerms(!agreedToTerms)}
              >
                {agreedToTerms && (
                  <Feather name="check" size={18} color="#FFFFFF" />
                )}
              </Pressable>
              <Text style={styles.checkboxLabel}>
                I agree to the{" "}
                <Text style={styles.linkText}>Terms of Service</Text> and{" "}
                <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </View>
            {termsError ? (
              <Text style={styles.errorText}>{termsError}</Text>
            ) : null}
          </View>

          {/* Create Account Button */}
          <Pressable style={styles.createAccountButton} onPress={handleSignUp}>
            <Text style={styles.createAccountButtonText}>Create Account</Text>
          </Pressable>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Or sign up with</Text>
            <View style={styles.line} />
          </View>

          {/* Google Sign In Button */}
          <Pressable style={styles.googleButton}>
            <GoogleIcon />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </Pressable>

          {/* Sign In Navigation */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Pressable onPress={() => router.push("authentication/SignIn")}>
              <Text style={[styles.footerText, styles.signInLink]}>
                Sign in
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 40,
  },
  form: { width: "100%", marginTop: 20 },
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
  subtitle: { fontSize: 16, color: "grey", textAlign: "center" },
  label: {
    alignSelf: "flex-start",
    marginLeft: 5,
    marginBottom: 5,
    fontSize: 14,
    color: "grey",
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 15,
    width: "100%",
    height: 55,
  },
  icon: { marginRight: 10 },
  textInput: { flex: 1, fontSize: 16, color: "#000000" },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 5,
    marginTop: 4,
    fontSize: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#4285F4",
    backgroundColor: "transparent",
    marginRight: 12,
  },
  checkboxLabel: { fontSize: 14, color: "grey", flex: 1 },
  linkText: { color: "#4285F4", textDecorationLine: "underline" },
  createAccountButton: {
    backgroundColor: "#4285F4",
    borderRadius: 10,
    width: "100%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  createAccountButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
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
  signInLink: { color: "#4285F4", fontWeight: "bold" },
});

export default SignUp;
