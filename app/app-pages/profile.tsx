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
  SafeAreaView,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebaseConfig";
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";

// A modern color palette for a clean look
const COLORS = {
  primary: "#1A73E8", // A confident blue
  white: "#FFFFFF",
  background: "#F4F6F8", // A very light grey for the background
  card: "#FFFFFF",
  text: "#212529",
  textSecondary: "#6C757D",
  iconContainer: "#E9ECEF",
  danger: "#DC3545",
  dangerLight: "#F8D7DA",
};

const ProfileScreen = () => {
  // --- All your existing state and logic remains unchanged ---
  const [imageUri, setImageUri] = useState<string>();
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const name = await AsyncStorage.getItem("userName");
        const phoneNumber = await AsyncStorage.getItem("userPhoneNumber");
        const email = auth.currentUser?.email || "";

        setUserData({
          name: name || "User",
          email: email,
          phoneNumber: phoneNumber || "Not provided",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

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

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirm password do not match.");
      return;
    }
    const user = auth.currentUser;
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
  // --- End of existing state and logic ---

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Hero Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.avatarContainer} onPress={handleChooseImage}>
          <Image
            source={imageUri ? { uri: imageUri } : require("../../assets/image.png")}
            style={styles.avatar}
          />
          <View style={styles.editIconContainer}>
            <Icon name="edit" size={16} color={COLORS.primary} />
          </View>
        </TouchableOpacity>
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userEmail}>{userData.email}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Account Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Information</Text>
          <View style={styles.cardRow}>
            <View style={styles.rowLeft}>
              <View style={styles.rowIconContainer}><Icon name="phone" size={20} color={COLORS.primary} /></View>
              <Text style={styles.rowTitle}>Phone Number</Text>
            </View>
            <Text style={styles.rowValue}>{userData.phoneNumber}</Text>
          </View>
          <View style={[styles.cardRow, { borderBottomWidth: 0 }]}>
            <View style={styles.rowLeft}>
              <View style={styles.rowIconContainer}><Icon name="lock" size={20} color={COLORS.primary} /></View>
              <Text style={styles.rowTitle}>Password</Text>
            </View>
            <Text style={styles.rowValue}>********</Text>
          </View>
        </View>

        {/* Settings & Actions Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Settings & Actions</Text>
          <TouchableOpacity style={styles.cardRow} onPress={() => setShowChangePassword(!showChangePassword)}>
            <View style={styles.rowLeft}>
              <View style={styles.rowIconContainer}><Icon name="vpn-key" size={20} color={COLORS.primary} /></View>
              <Text style={styles.rowTitle}>Change Password</Text>
            </View>
            <Icon name="chevron-right" size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>

          {/* Collapsible Change Password Form */}
          {showChangePassword && (
            <View style={styles.changePasswordSection}>
              <TextInput style={styles.input} placeholder="Current Password" value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry />
              <TextInput style={styles.input} placeholder="New Password" value={newPassword} onChangeText={setNewPassword} secureTextEntry />
              <TextInput style={styles.input} placeholder="Confirm New Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
              <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
                <Text style={styles.changePasswordButtonText}>Save New Password</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={[styles.cardRow, { borderBottomWidth: 0 }]} onPress={() => router.push("pages/privacyPolicy")}>
            <View style={styles.rowLeft}>
              <View style={styles.rowIconContainer}><Icon name="policy" size={20} color={COLORS.primary} /></View>
              <Text style={styles.rowTitle}>Privacy Policy</Text>
            </View>
            <Icon name="chevron-right" size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <Pressable style={styles.logoutButton} onPress={() => router.push("authentication/SignIn")}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </Pressable>
<StatusBar style="auto"/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 25,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 5,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  userEmail: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.9,
  },
  scrollContent: {
    padding: 15,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: COLORS.iconContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rowTitle: {
    fontSize: 16,
    color: COLORS.text,
  },
  rowValue: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  changePasswordSection: {
    paddingTop: 15,
    paddingBottom: 5,
  },
  input: {
    backgroundColor: COLORS.background,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  changePasswordButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  changePasswordButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: COLORS.dangerLight,
    borderRadius: 16,
    padding: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;