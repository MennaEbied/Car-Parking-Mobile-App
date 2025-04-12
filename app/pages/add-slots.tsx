/* eslint-disable prettier/prettier */
import React from "react";
import { View, Button, Alert } from "react-native";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Adjust the path if needed

const AddSlotsScreen: React.FC = () => {
  const slots = [
    { id: 1, status: "available" },
    { id: 2, status: "available" },
    { id: 3, status: "available" },
    { id: 4, status: "available" },
    { id: 5, status: "available" },
    { id: 6, status: "available" },
    { id: 7, status: "available" },
    { id: 8, status: "available" },
    { id: 9, status: "available" },
    { id: 10, status: "available" },
  ];

  const addSlotsToFirestore = async () => {
    try {
      for (const slot of slots) {
        // Use setDoc with specific slotId as the document ID
        await setDoc(doc(db, "slots", slot.id.toString()), {
          status: slot.status,
          id: slot.id,
        });
      }
      Alert.alert("Success", "Parking slots added to Firestore!");
    } catch (error) {
      console.error("Error adding slots:", error);
      Alert.alert("Error", "Failed to add slots.");
    }
  };

  return (
    <View style={{ marginTop: 100, padding: 20 }}>
      <Button
        title="Add Parking Slots to Firestore"
        onPress={addSlotsToFirestore}
      />
    </View>
  );
};

export default AddSlotsScreen;
