import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { router } from "expo-router";
import * as Notifications from "expo-notifications";

// Set up notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const PaymentScreen = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to validate the expiry date
  const isValidExpiryDate = (expiryDate: string) => {
    const [month, year] = expiryDate.split("/").map(Number);
    if (!month || !year) return false;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Last two digits of the year
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed
    return year > currentYear || (year === currentYear && month >= currentMonth);
  };

  // Function to handle payment
  const handlePayment = async () => {
    setError(""); // Clear previous errors
    if (!cardNumber || !cardholderName || !expiry || !cvc) {
      setError("Please fill in all fields");
      return;
    }
    // Simulate payment processing
    setIsLoading(true);

    try {
      // Request notification permissions
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus === "granted") {
        // Schedule a payment confirmation notification
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Payment Successful",
            body: "Your parking payment has been processed successfully.",
            data: { type: "payment_confirmation" },
          },
          trigger: null, // Show immediately
        });
      }
    } catch (notificationError) {
      console.log("Notification error:", notificationError);
    }

    setTimeout(() => {
      setIsLoading(false);
      router.push("pages/done"); // Navigate to success page
      setCardNumber("");
      setCardholderName("");
      setExpiry("");
      setCvc("");
    }, 2000); // Simulate a 2-second delay for payment processing
  };

  return (
    <ImageBackground
      source={require("../../assets/parking2.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Car Parking Payment</Text>
        <Text style={styles.amount}>Total: $15.99</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Input
          placeholder="Cardholder Name"
          leftIcon={{ type: "font-awesome", name: "user", size: 22 }}
          value={cardholderName}
          onChangeText={setCardholderName}
          containerStyle={styles.input}
          returnKeyType="done"
          accessibilityLabel="Cardholder Name"
        />
        <Input
          placeholder="Card Number"
          leftIcon={{ type: "font-awesome", name: "credit-card", size: 20 }}
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={(text) => setCardNumber(text.replace(/\D/g, ""))} // Allow only numbers
          containerStyle={styles.input}
          maxLength={16}
          returnKeyType="done"
          accessibilityLabel="Card Number"
        />
        <View style={styles.row}>
          <Input
            placeholder="MM/YY"
            leftIcon={{ type: "font-awesome", name: "calendar", size: 20 }}
            value={expiry}
            onChangeText={setExpiry}
            containerStyle={[styles.input, styles.halfInput]}
            maxLength={5}
            returnKeyType="done"
            keyboardType="numeric"
            accessibilityLabel="Expiry Date"
          />
          <Input
            placeholder="CVC"
            leftIcon={{ type: "font-awesome", name: "lock", size: 25 }}
            keyboardType="numeric"
            value={cvc}
            onChangeText={(text) => setCvc(text.replace(/\D/g, ""))} // Allow only numbers
            containerStyle={[styles.input, styles.halfInput]}
            maxLength={4}
            returnKeyType="done"
            accessibilityLabel="CVC"
          />
        </View>
        <Button
          title={isLoading ? "Processing..." : "Pay"}
          buttonStyle={styles.payButton}
          onPress={handlePayment}
          icon={{
            name: "lock",
            type: "font-awesome",
            size: 20,
            color: "white",
          }}
          disabled={isLoading}
        />
        {isLoading && (
          <ActivityIndicator size="small" color="#007bff" style={styles.loader} />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  amount: {
    fontSize: 20,
    marginBottom: 30,
    textAlign: "center",
    color: "black",
  },
  input: {
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "45%",
  },
  payButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    marginTop: 10,
    borderRadius: 15,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  loader: {
    marginTop: 10,
  },
});

export default PaymentScreen;