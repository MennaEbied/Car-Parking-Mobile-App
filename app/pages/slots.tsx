import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Adjust the path if needed

interface Slot {
  id: number;
  status: "available" | "occupied" | "reserved";
}

const ParkingSlots: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([]);

  useEffect(() => {
    const q = query(collection(db, "slots"), orderBy("id"));

    // Real-time listener to fetch data from Firestore
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedSlots: Slot[] = snapshot.docs.map((doc) => ({
        id: doc.data().id,
        status: doc.data().status,
      }));
      setSlots(updatedSlots);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Find best parking slot </Text>

      <View style={styles.legendContainer}>
        <View style={[styles.legendItem, styles.available]} />
        <Text style={styles.legendText}>Available</Text>
        <View style={[styles.legendItem, styles.occupied]} />
        <Text style={styles.legendText}>Occupied</Text>
        <View style={[styles.legendItem, styles.reserved]} />
        <Text style={styles.legendText}>Reserved</Text>
      </View>

      <ScrollView contentContainerStyle={styles.slotContainer}>
        {slots.map((slot) => (
          <View
            key={slot.id}
            style={[
              styles.slot,
              slot.status === "available" && styles.available,
              slot.status === "occupied" && styles.occupied,
              slot.status === "reserved" && styles.reserved,
            ]}
          >
            <Text style={styles.slotText}>SLOT-{slot.id}</Text>
          </View>
        ))}

        <View style={styles.buttons}>
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => router.push("app-pages/home")}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome6
                name="angles-left"
                size={18}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.buttontext}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ marginLeft: 120 }}
          onPress={() => router.push("pages/bookings")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.buttontext}>Continue</Text>
            <FontAwesome6
              name="angles-right"
              size={18}
              color="black"
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 60,
  },
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  legendItem: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginRight: 2,
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
    fontSize: 15,
    marginRight: 15,
  },
  slotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  slot: {
    width: "45%",
    height: 90,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginHorizontal: 7,
  },
  slotText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttontext: {
    color: "black",
    fontSize: 18,
    marginRight: 5,
  },
  icon: {
    marginRight: 10,
  },
});

export default ParkingSlots;
