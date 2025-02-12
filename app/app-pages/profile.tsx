import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useRouter } from "expo-router";
import { Pressable } from "react-native";

const ProfilePage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [imageUri, setImageUri] = useState<string>();
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);

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
  const handleLogout = () => {
    // Add your logout logic here (e.g., clear user session, navigate to login screen)
    Alert.alert("Logged Out", "You have been logged out successfully.");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChooseImage} hitSlop={20}>
        <Image
          source={
            imageUri ? { uri: imageUri } : require("../../assets/image.png")
          }
          style={styles.image}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        returnKeyType="done"
      />
      {/* Change Password Section */}

      <TouchableOpacity
        onPress={() => setShowChangePassword(!showChangePassword)}
        style={styles.option}
      >
        <Entypo name="lock" size={20} color="gray" />
        <Text style={styles.text}>Change Password</Text>
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
          <Button title="Save New Password" onPress={handleChangePassword} />
        </View>
      )}

      <TouchableOpacity
        onPress={() => router.push("pages/privacyPolicy")}
        style={styles.option}
      >
        <AntDesign name="questioncircle" size={20} color="gray" />
        <Text style={styles.text}>Privacy Policy</Text>
      </TouchableOpacity>

      {/* Log Out Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.option}>
        <AntDesign name="adduser" size={20} color="gray" />
        <Text style={styles.text}>Log out</Text>
      </TouchableOpacity>
      <Pressable
        onPress={() => console.log({ name, email, phoneNumber, imageUri })}
      >
        <Text style={styles.button}>Save</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    marginTop: 60,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 17,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius:50,
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 0.5,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  changePasswordSection: {
    width: "100%",
    marginTop: 10,
  },
  passwordSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
    fontSize: 17,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
    fontSize: 20,
    color: "#0070BB",
  },
});

export default ProfilePage;
