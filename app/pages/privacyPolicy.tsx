import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";

const PrivacyPolicy: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.text}>
        This Privacy Policy outlines how our app collects, uses, and protects
        your personal information.
      </Text>

      <Text style={styles.sectionTitle}>Information Collection</Text>
      <Text style={styles.text}>
        We collect the following types of personal information:
      </Text>
      <Text style={styles.bulletPoint}>- Name</Text>
      <Text style={styles.bulletPoint}>- Email address</Text>
      <Text style={styles.bulletPoint}>- Phone number</Text>
      <Text style={styles.bulletPoint}>- Payment information</Text>
      <Text style={styles.text}>
        We collect information through forms, cookies, and third-party services.
      </Text>
      <Text style={styles.sectionTitle}>Use of Information</Text>
      <Text style={styles.text}>Your information is used to:</Text>
      <Text style={styles.bulletPoint}>- Provide and improve our services</Text>
      <Text style={styles.bulletPoint}>- Send you notifications</Text>
      <Text style={styles.bulletPoint}>- Respond to your inquiries</Text>
      <Text style={styles.sectionTitle}>Information Sharing</Text>
      <Text style={styles.text}>
        We may share your information with third parties, including service
        providers, under the following circumstances:
      </Text>
      <Text style={styles.bulletPoint}>- To comply with legal obligations</Text>
      <Text style={styles.bulletPoint}>- For business operations</Text>
      <Text style={styles.sectionTitle}>Data Security</Text>
      <Text style={styles.text}>
        We implement security measures to protect your data, including
        encryption and access controls. You are responsible for keeping your
        information secure.
      </Text>
      <Text style={styles.sectionTitle}>Contact Information</Text>
      <Text style={styles.text}>
        If you have any questions about this Privacy Policy, please contact us
        at:
      </Text>
      <Text style={styles.bulletPoint}>- Email: support@example.com</Text>
      <Text style={styles.bulletPoint}>- Phone: 123-456-7890</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    marginLeft: 16,
    marginBottom: 4,
  },
});

export default PrivacyPolicy;
