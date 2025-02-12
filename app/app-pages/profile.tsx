import React, { useState } from "react";
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

const ProfileScreen = () => {
  // Dummy user data
  const user = {
    name: "MME",
    email: "mme@gmail.com",
    phone: "+20 123 456 7890",
    password: "********",
  };
  const [imageUri, setImageUri] = useState<string>();
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const profileSections = [
    { title: "Name", value: user.name, icon: "person" },
    { title: "Email", value: user.email, icon: "email" },
    { title: "Phone Number", value: user.phone, icon: "phone" },
    { title: "Password", value: user.password, icon: "lock" },
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
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirm password do not match.");
      return;
    }
    // Add your password change logic here (e.g., API call)
    Alert.alert("Success", "Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowChangePassword(false); // Hide the change password section after success
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
        {/* Change Password Button */}
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
        {/* Change Password Form */}
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
        {/* Other Action Buttons */}
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
    paddingTop: 55,
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
    color: "#999",
    fontSize: 14,
  },
  infoValue: {
    color: "#333",
    fontSize: 16,
    marginTop: 5,
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
    width: 30,
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
