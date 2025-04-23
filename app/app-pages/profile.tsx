/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { auth } from "../../firebaseConfig"; // Import Firebase auth
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";

const ProfileScreen = () => {
  const [imageUri, setImageUri] = useState<string>();
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "********", // Password is masked by default
  });

  // Fetch user data from AsyncStorage and Firebase on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch name from AsyncStorage
        const name = await AsyncStorage.getItem("userName");
        const phoneNumber = await AsyncStorage.getItem("userPhoneNumber");
        // Fetch email from Firebase auth
        const email = auth.currentUser?.email || "";

        setUserData({
          name: name || "User", // Default to "User" if name is not found
          email: email,
          phoneNumber: phoneNumber || "Not provided",
          password: "********", // Password is masked
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const profileSections = [
    { title: "Name", value: userData.name, icon: "person" },
    { title: "Email", value: userData.email, icon: "email" },
    { title: "Phone Number", value: userData.phoneNumber, icon: "phone" },
    { title: "Password", value: userData.password, icon: "lock" }, // Removed phone number
  ];

  const actionButtons = [
    {
      title: "Privacy Policy",
      icon: "policy",
      onPress: () => {
        router.push("pages/privacyPolicy");
      },
    },
    {
      title: "Log Out",
      icon: "logout",
      color: "red",
      onPress: () => {
        router.push("authentication/SignIn");
      },
    },
  ];

  const handleChooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleChangePassword = async() => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirm password do not match.");
      return;
    }
    const user = auth.currentUser;
    if (!user || !user.email) {
      Alert.alert("Error", "No user is currently signed in.");
      return;
    }

    if (!user || !user.email) {
      Alert.alert("Error", "No user is currently signed in.");
      return;
    }
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      Alert.alert("Success", "Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowChangePassword(false);
    } catch (error) {
      console.error("Error changing password:", error);
      Alert.alert("Error", "Failed to change password. Please check your current password and try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleChooseImage} hitSlop={20}>
        <Image
          source={
            imageUri ? { uri: imageUri } : require("../../assets/image.png")
          }
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.section}>
        {profileSections.map((item, index) => (
          <View key={index} style={styles.infoItem}>
            <Icon name={item.icon} size={24} color="#666" style={styles.icon} />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>{item.title}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowChangePassword(!showChangePassword)}
        >
          <Icon name="vpn-key" size={24} color="#666" style={styles.icon} />
          <Text style={styles.buttonText}>Change Password</Text>
          <Icon
            name="chevron-right"
            size={24}
            color="#999"
            style={styles.arrow}
          />
        </TouchableOpacity>
        {showChangePassword && (
          <View style={styles.changePasswordSection}>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.changePasswordButton}
              onPress={handleChangePassword}
            >
              <Text style={styles.changePasswordButtonText}>
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {actionButtons.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={item.onPress}
          >
            <Icon
              name={item.icon}
              size={24}
              color={item.color || "#666"}
              style={styles.icon}
            />
            <Text style={[styles.buttonText, { color: item.color || "#333" }]}>
              {item.title}
            </Text>
            <Icon
              name="chevron-right"
              size={24}
              color="#999"
              style={styles.arrow}
            />
          </TouchableOpacity>
        ))}
        <StatusBar style="dark" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  section: {
    backgroundColor: "#f5f5f5",
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#eee",
  },
  infoText: {
    flex: 1,
    marginLeft: 15,
  },
  infoTitle: {
    color: "#333",
    fontSize: 16,
  },
  infoValue: {
    color: "#999",
    fontSize: 16,
    marginTop: 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#eee",
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
  icon: {
    width: 25,
  },
  arrow: {
    marginLeft: "auto",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 0.5,
    alignSelf: "center",
  },
  changePasswordSection: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  changePasswordButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  changePasswordButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProfileScreen;
