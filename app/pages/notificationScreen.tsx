import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { db, auth } from "../../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { router } from "expo-router";


interface BookingItem {
  id: string;
  slotId: number;
  startTime: string;
  endTime: string;
  date: string;
}

const NotificationScreen = () => {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, "reservations"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedBookings: BookingItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        fetchedBookings.push({
          id: doc.id,
          slotId: data.slotId,
          startTime: data.startTime,
          endTime: data.endTime,
          date: data.date,
        });
      });
      setBookings(fetchedBookings);
    });

    return () => unsubscribe(); // Cleanup listener
  }, [userId]);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const formatTime = (timestamp: string) => {
    const time = new Date(timestamp);
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderBookingItem = ({ item }: { item: BookingItem }) => (
    <TouchableOpacity
      style={styles.bookingItem}
      onPress={() => router.push(`/booking/${item.id}`)}
    >
      <Text style={styles.bookingTitle}>You booked slot {item.slotId}</Text>
      <Text style={styles.bookingDetails}>
        Date: {formatDate(item.date)} | Start: {formatTime(item.startTime)} | End:{" "}
        {formatTime(item.endTime)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingItem}
        ListEmptyComponent={<Text style={styles.empty}>No bookings found.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 17,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingTop:50
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  bookingItem: {
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookingDetails: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
});

export default NotificationScreen;