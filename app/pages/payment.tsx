/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { router } from "expo-router";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const COLORS = {
  primary: "#1A73E8",
  white: "#FFFFFF",
  text: "#212529",
  textSecondary: "#6C757D",
  inputBackground: "rgba(255, 255, 255, 0.95)",
  border: "#E0E0E0",
  danger: "#DC3545",
};

const PaymentScreen = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setError("");
    if (!cardNumber || !cardholderName || !expiry || !cvc) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus === "granted") {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Payment Successful",
            body: "Your parking payment has been processed successfully.",
            data: { type: "payment_confirmation" },
          },
          trigger: null,
        });
      }
    } catch (notificationError) {
      console.log("Notification error:", notificationError);
    }
    setTimeout(() => {
      setIsLoading(false);
      router.push("pages/done");
      setCardNumber("");
      setCardholderName("");
      setExpiry("");
      setCvc("");
    }, 2000);
  };

  return (
    <ImageBackground
      source={require("../../assets/parking2.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />

        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color={COLORS.white} />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.overlay}>
            <Text style={styles.title}>Confirm Payment</Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Input
              placeholder="Cardholder Name"
              value={cardholderName}
              onChangeText={setCardholderName}
              leftIcon={
                <Icon name="account" size={20} color={COLORS.textSecondary} />
              }
              containerStyle={styles.inputOuterContainer}
              inputContainerStyle={styles.inputInnerContainer}
              inputStyle={styles.inputText}
              placeholderTextColor={COLORS.textSecondary}
              returnKeyType="done"
            />

            <Input
              placeholder="Card Number"
              value={cardNumber}
              onChangeText={(text) => setCardNumber(text.replace(/\D/g, ""))}
              leftIcon={
                <Icon
                  name="credit-card"
                  size={20}
                  color={COLORS.textSecondary}
                />
              }
              keyboardType="numeric"
              maxLength={16}
              containerStyle={styles.inputOuterContainer}
              inputContainerStyle={styles.inputInnerContainer}
              inputStyle={styles.inputText}
              placeholderTextColor={COLORS.textSecondary}
              returnKeyType="done"
            />

            <View style={styles.row}>
              <Input
                placeholder="MM/YY"
                value={expiry}
                onChangeText={setExpiry}
                leftIcon={
                  <Icon
                    name="calendar-month"
                    size={20}
                    color={COLORS.textSecondary}
                  />
                }
                keyboardType="numeric"
                maxLength={4}
                containerStyle={[
                  styles.inputOuterContainer,
                  { flex: 1, marginRight: 10 },
                ]}
                inputContainerStyle={styles.inputInnerContainer}
                inputStyle={styles.inputText}
                placeholderTextColor={COLORS.textSecondary}
                returnKeyType="done"
              />
              <Input
                placeholder="CVC"
                value={cvc}
                onChangeText={(text) => setCvc(text.replace(/\D/g, ""))}
                leftIcon={
                  <Icon name="lock" size={20} color={COLORS.textSecondary} />
                }
                keyboardType="numeric"
                maxLength={4}
                containerStyle={[
                  styles.inputOuterContainer,
                  { flex: 1, marginLeft: 10 },
                ]}
                inputContainerStyle={styles.inputInnerContainer}
                inputStyle={styles.inputText}
                placeholderTextColor={COLORS.textSecondary}
                secureTextEntry
                returnKeyType="done"
              />
            </View>

            <Button
              title={isLoading ? "Processing..." : "Pay Now"}
              buttonStyle={styles.payButton}
              titleStyle={styles.payButtonText}
              onPress={handlePayment}
              disabled={isLoading}
              icon={
                isLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={COLORS.white}
                    style={{ marginRight: 10 }}
                  />
                ) : undefined
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // Dark overlay for better contrast
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 25,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: COLORS.text,
  },
  errorText: {
    color: COLORS.danger,
    textAlign: "center",
    marginBottom: 15,
    fontSize: 14,
  },
  inputOuterContainer: {
    paddingHorizontal: 0,
    marginBottom: 15,
  },
  inputInnerContainer: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
    height: 55,
    borderBottomWidth: 1,
  },
  inputText: {
    fontSize: 16,
    color: COLORS.text,
  },
  // --- End Input Styles ---
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  payButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 12,
  },
  payButtonText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "bold",
  },
});

export default PaymentScreen;
