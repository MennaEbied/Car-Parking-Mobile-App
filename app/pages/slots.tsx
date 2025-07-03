/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Adjust the path if needed

interface Slot {
  id: number;
  status: "available" | "occupied" | "reserved";
}

const ParkingSlots: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // With the server handling cleanup, the client only needs to
    // listen for real-time changes to the slots collection.
    console.log("Setting up real-time listener for parking slots.");

    const q = query(collection(db, "slots"), orderBy("id"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedSlots: Slot[] = snapshot.docs
        .map((doc) => ({
          id: doc.data().id,
          status: doc.data().status,
        }))
        .filter((slot) => slot.id <= 4);

      setSlots(updatedSlots);
      if (isLoading) setIsLoading(false);
    }, (error) => {
      console.error("Error listening to slot updates:", error);
      setIsLoading(false);
      Alert.alert("Error", "Failed to load slot data.");
    });

    // The returned function will be called when the component unmounts,
    // which cleans up the listener and prevents memory leaks.
    return () => {
      console.log("Unsubscribing from parking slots listener.");
      unsubscribe();
    };
  }, []); // The empty dependency array ensures this effect runs only once.

  const handleSlotPress = (slot: Slot) => {
    if (slot.status === "available") {
      // Navigate to the booking form, passing the slotId as a parameter
      router.push({
        pathname: "pages/bookings",
        params: { slotId: slot.id },
      });
    } else {
      Alert.alert("Slot Unavailable", `This slot is currently ${slot.status}.`);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1c2c4a" />
        <Text style={styles.loadingText}>Loading Slots...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Parking Slot</Text>
      <View style={styles.legendContainer}>
        <View style={[styles.legendItem, styles.available]} />
        <Text style={styles.legendText}>Available</Text>
        <View style={[styles.legendItem, styles.occupied]} />
        <Text style={styles.legendText}>Occupied</Text>
        <View style={[styles.legendItem, styles.reserved]} />
        <Text style={styles.legendText}>Reserved</Text>
      </View>

      <View style={styles.gridContainer}>
        {slots.map((slot) => (
          <TouchableOpacity
            key={slot.id}
            style={[
              styles.slot,
              slot.status === "available" && styles.available,
              slot.status === "occupied" && styles.occupied,
              slot.status === "reserved" && styles.reserved,
            ]}
            onPress={() => handleSlotPress(slot)}
            disabled={slot.status !== "available"}
          >
            <Text style={styles.slotText}>SLOT-{slot.id}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.back()}
        >
          <FontAwesome6 name="angles-left" size={18} color="#1c2c4a" style={styles.icon} />
          <Text style={styles.buttontext}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eef3fd",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#1c2c4a",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1c2c4a",
  },
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  legendItem: {
    width: 15,
    height: 15,
    borderRadius: 8,
    marginRight: 5,
  },
  available: {
    backgroundColor: "#717171",
  },
  occupied: {
    backgroundColor: "#0031c1",
  },
  reserved: {
    backgroundColor: "#fad000",
  },
  legendText: {
    fontSize: 16,
    marginRight: 15,
    color: "#1c2c4a",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: '100%',
  },
  slot: {
    width: "80%",
    maxWidth: 300,
    height: 90,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 15,
  },
  slotText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    width: "100%",
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  buttontext: {
    fontSize: 18,
    color: "#1c2c4a",
    fontWeight: '500',
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default ParkingSlots;
