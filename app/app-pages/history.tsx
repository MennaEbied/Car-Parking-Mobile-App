/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from '../../firebaseConfig'; 
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'; // Import onSnapshot
import { StatusBar } from 'expo-status-bar';

// Consistent color palette
const COLORS = {
  primary: "#1A73E8",
  white: "#FFFFFF",
  background: "#F4F6F8",
  text: "#212529",
  textSecondary: "#6C757D",
  card: "#FFFFFF",
  active: "#28A745",   // Green for active
  completed: "#6C757D", // Grey for completed
  activeBg: "#EAF7EC",
  completedBg: "#F8F9FA",
};

// Define the structure of a booking document from Firestore
type Booking = {
  id: string; // The document ID from Firestore
  plateNumber: string;
  slotId: number;
  startTime: string; 
  endTime: string;
  status: 'active' | 'completed';
};

// A helper function to format dates and times nicely
const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
  return `${date.toLocaleDateString(undefined, dateOptions)} at ${date.toLocaleTimeString(undefined, timeOptions)}`;
};

const BookingHistory = () => {
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [completedBookings, setCompletedBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch booking history from Firestore for the current user
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      Alert.alert("Error", "You must be logged in to view your history.");
      setLoading(false);
      return;
    }

    // **CHANGE: Use onSnapshot for real-time updates**
    const q = query(
      collection(db, "reservations"), 
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("Booking history updated from Firestore.");
      const allBookings: Booking[] = [];
      querySnapshot.forEach((doc) => {
        allBookings.push({ id: doc.id, ...doc.data() } as Booking);
      });

      const active: Booking[] = [];
      const completed: Booking[] = [];

      allBookings.forEach(booking => {
        if (booking.status === 'active') {
          active.push(booking);
        } else {
          completed.push(booking);
        }
      });
      
      setActiveBookings(active);
      setCompletedBookings(completed);
      
      if (loading) {
        setLoading(false);
      }
    }, (error) => {
      // This will catch errors, including the need for an index
      console.error('Failed to load bookings from Firestore:', error);
      Alert.alert('Error', 'Failed to load booking history. Check console for details.');
      setLoading(false);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [loading]); // The dependency array now includes 'loading'

  // Render each booking item card
  const renderBookingItem = ({ item, isActive }: { item: Booking, isActive: boolean }) => (
    <View style={styles.bookingCard}>
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Ionicons name="car-sport" size={24} color={COLORS.primary} style={styles.icon}/>
          <Text style={styles.slotText}>Slot {item.slotId}</Text>
        </View>
        <View style={[styles.statusBadge, isActive ? styles.statusActive : styles.statusCompleted]}>
          <Text style={[styles.statusText, isActive ? {color: COLORS.active} : {color: COLORS.completed}]}>
            {isActive ? 'Active' : 'Completed'}
          </Text>
        </View>
      </View>
      
      <View style={styles.detailRow}>
        <Ionicons name="time-outline" size={16} color={COLORS.textSecondary} style={styles.icon}/>
        <Text style={styles.detailText}>From: {formatDateTime(item.startTime)}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="time" size={16} color={COLORS.textSecondary} style={styles.icon}/>
        <Text style={styles.detailText}>To:      {formatDateTime(item.endTime)}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="pricetag-outline" size={16} color={COLORS.textSecondary} style={styles.icon}/>
        <Text style={styles.detailText}>Plate: {item.plateNumber}</Text>
      </View>
    </View>
  );

  // Render loading indicator
  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Render "No bookings yet" message
  if (activeBookings.length === 0 && completedBookings.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Booking History</Text>
        </View>
        <View style={styles.centeredContainer}>
          <Ionicons name="file-tray-stacked-outline" size={60} color={COLORS.textSecondary} />
          <Text style={styles.emptyText}>No Bookings Yet</Text>
          <Text style={styles.emptySubtext}>Your active and past parking sessions will appear here.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Render the list of bookings
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Booking History</Text>
      </View>

      <FlatList
        data={[...activeBookings, ...completedBookings]}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => {
          const isActive = item.status === 'active';
          const showActiveHeader = isActive && index === 0;
          const showCompletedHeader = !isActive && index === activeBookings.length;

          return (
            <View>
              {showActiveHeader && <Text style={styles.sectionTitle}>Active Bookings</Text>}
              {showCompletedHeader && <Text style={styles.sectionTitle}>Completed Bookings</Text>}
              {renderBookingItem({ item, isActive })}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop:25
  },
  listContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
    marginTop: 10,
  },
  bookingCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slotText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: COLORS.activeBg,
  },
  statusCompleted: {
    backgroundColor: COLORS.completedBg,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    color: COLORS.text,
    marginTop: 15,
    fontWeight: 'bold',
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 8,
    textAlign: 'center',
    maxWidth: 300,
  },
});

export default BookingHistory;
