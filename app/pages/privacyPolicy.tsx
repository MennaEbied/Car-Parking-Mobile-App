/* eslint-disable prettier/prettier */
import React from "react";
import { ScrollView, Text, StyleSheet, View, SafeAreaView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/MaterialIcons";

// Consistent color palette
const COLORS = {
  primary: "#1A73E8",
  white: "#FFFFFF",
  background: "#FFFFFF",
  text: "#212529",
  textSecondary: "#6C757D",
};

const PrivacyPolicy: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.white} />
        </Pressable>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.paragraph}>
          This Privacy Policy outlines how our app collects, uses, and protects your personal information.
        </Text>

        <Text style={styles.sectionTitle}>Information Collection</Text>
        <Text style={styles.paragraph}>
          We collect the following types of personal information:
        </Text>
        <View style={styles.bulletPointContainer}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Name</Text>
        </View>
        <View style={styles.bulletPointContainer}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Email address</Text>
        </View>
        <View style={styles.bulletPointContainer}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Phone number</Text>
        </View>
        <View style={styles.bulletPointContainer}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Payment information</Text>
        </View>
        <Text style={styles.paragraph}>
          We collect information through forms, cookies, and third-party services.
        </Text>

        <Text style={styles.sectionTitle}>Use of Information</Text>
        <Text style={styles.paragraph}>Your information is used to:</Text>
        <View style={styles.bulletPointContainer}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Provide and improve our services</Text>
        </View>
        <View style={styles.bulletPointContainer}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Send you notifications</Text>
        </View>
        <View style={styles.bulletPointContainer}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Respond to your inquiries</Text>
        </View>

        <Text style={styles.sectionTitle}>Information Sharing</Text>
        <Text style={styles.paragraph}>
          We may share your information with third parties, including service providers, under the following circumstances:
        </Text>
        <View style={styles.bulletPointContainer}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>To comply with legal obligations</Text>
        </View>
        <View style={styles.bulletPointContainer}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>For business operations</Text>
        </View>

        <Text style={styles.sectionTitle}>Data Security</Text>
        <Text style={styles.paragraph}>
          We implement security measures to protect your data, including encryption and access controls. You are responsible for keeping your information secure.
        </Text>

        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.paragraph}>
          If you have any questions about this Privacy Policy, please contact us at:
        </Text>
        <View style={styles.bulletPointContainer}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Email: support@example.com</Text>
        </View>
        <View style={styles.bulletPointContainer}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Phone: 123-456-7890</Text>
        </View>
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
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
    marginTop:25
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop:25
  },
  headerSpacer: {
    width: 130, // Balances the width of the back button icon + padding
  },
  contentContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: 15,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 26,
    marginBottom: 10,
  },
  bulletPointContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingLeft: 10,
  },
  bullet: {
    fontSize: 16,
    color: COLORS.primary,
    marginRight: 10,
    lineHeight: 26,
    fontWeight: 'bold',
  },
  bulletText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 26,
  },
});

export default PrivacyPolicy;