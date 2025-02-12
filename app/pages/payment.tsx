import React, { useState } from "react";
import {View,Text,StyleSheet,ImageBackground,} from "react-native";
import { Button, Input } from "react-native-elements";
import { router } from "expo-router";

const PaymentScreen = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const handlePayment = () => {
    if (cardNumber && cardholderName && expiry && cvc) {
      router.push("pages/done");
      setCardNumber("");
      setCardholderName("");
      setExpiry("");
      setCvc("");
    } else {
      alert("Please fill in all fields");
    }
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

        <Input
          placeholder="Cardholder Name"
          leftIcon={{ type: "font-awesome", name: "user" }}
          value={cardholderName}
          onChangeText={setCardholderName}
          containerStyle={styles.input}
          returnKeyType="done"
        />
        <Input
          placeholder="Card Number"
          leftIcon={{ type: "font-awesome", name: "credit-card" }}
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
          containerStyle={styles.input}
          maxLength={16}
          returnKeyType="done"
        />
        <View style={styles.row}>
          <Input
            placeholder="MM/YY"
            leftIcon={{ type: "font-awesome", name: "calendar" }}
            value={expiry}
            onChangeText={setExpiry}
            containerStyle={[styles.input, styles.halfInput]}
            maxLength={5}
            returnKeyType="done"
          />
          <Input
            placeholder="CVC"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            keyboardType="numeric"
            value={cvc}
            onChangeText={setCvc}
            containerStyle={[styles.input, styles.halfInput]}
            maxLength={4}
            returnKeyType="done"
          />
        </View>
        <Button
          title={`Pay`}
          buttonStyle={styles.payButton}
          onPress={handlePayment}
          icon={{
            name: "lock",
            type: "font-awesome",
            size: 20,
            color: "white",
          }}
        />
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
});
export default PaymentScreen;
