import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,TouchableOpacity,Alert,
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
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedSlots: Slot[] = snapshot.docs
        .map((doc) => ({
          id: doc.data().id,
          status: doc.data().status,
        }))
        // Filter to get only first 4 slots
        .filter((slot) => slot.id <= 4);
      
      setSlots(updatedSlots);
    });
    return () => unsubscribe();
  }, []);

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

      {/* 2x2 grid container */}
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
            onPress={() => slot.status === "available" && 
              Alert.alert("Slot Selected", `You've selected Slot ${slot.id}`)}
          >
            <Text style={styles.slotText}>SLOT-{slot.id}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={() => router.push("app-pages/home")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome6
              name="angles-left"
              size={18}
              color="#1c2c4a"
              style={styles.icon}
            />
            <Text style={styles.buttontext}>Back</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{ marginLeft: 120 }}
          onPress={() => router.push("pages/bookings")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.buttontext}>Continue</Text>
            <FontAwesome6
              name="angles-right"
              size={18}
              color="#1c2c4a"
              style={styles.icon}
            />
          </View>
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
  },
  title: {
    textAlign:"center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 8,
    color:"#1c2c4a"
  },
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  legendItem: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginRight:2,
     
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
    color:"#1c2c4a"
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 400,
  },
  slot: {
    width: "90%",
    height: 90,
    borderRadius:10,
    justifyContent: "center",
    alignItems: "center",
    margin: 7,
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
    justifyContent: "space-between",
    marginTop: 30,
    width: "100%",
  },
  buttontext: {
    fontSize: 18,
    marginRight:5,
    color:"#1c2c4a"
  },
  icon: {
    marginRight: 8,
  },
});

export default ParkingSlots;