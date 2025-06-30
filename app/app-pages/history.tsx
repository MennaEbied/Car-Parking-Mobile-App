/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from '../../firebaseConfig'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
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
};

// A helper function to format dates and times nicely
const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
  return `${date.toLocaleDateString(undefined, dateOptions)} at ${date.toLocaleTimeString(undefined, timeOptions)}`;
};

const BookingHistory = () => {
  const [currentBookings, setCurrentBookings] = useState<Booking[]>([]);
  const [previousBookings, setPreviousBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch booking history from Firestore for the current user
  useEffect(() => {
    const fetchBookings = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        Alert.alert("Error", "You must be logged in to view your history.");
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, "reservations"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        
        const allBookings: Booking[] = [];
        querySnapshot.forEach((doc) => {
          allBookings.push({ id: doc.id, ...doc.data() } as Booking);
        });

        // Separate bookings into current and previous
        const now = new Date();
        const current: Booking[] = [];
        const previous: Booking[] = [];

        allBookings.forEach(booking => {
          if (new Date(booking.endTime) > now) {
            current.push(booking);
          } else {
            previous.push(booking);
          }
        });

        // Sort bookings by start time, most recent first
        current.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
        previous.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
        
        setCurrentBookings(current);
        setPreviousBookings(previous);

      } catch (error) {
        console.error('Failed to load bookings from Firestore:', error);
        Alert.alert('Error', 'Failed to load booking history.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Render each booking item card
  const renderBookingItem = ({ item, isCurrent }: { item: Booking, isCurrent: boolean }) => (
    <View style={styles.bookingCard}>
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Ionicons name="car-sport" size={24} color={COLORS.primary} style={styles.icon}/>
          <Text style={styles.slotText}>Slot {item.slotId}</Text>
        </View>
        <View style={[styles.statusBadge, isCurrent ? styles.statusActive : styles.statusCompleted]}>
          <Text style={[styles.statusText, isCurrent ? {color: COLORS.active} : {color: COLORS.completed}]}>
            {isCurrent ? 'Active' : 'Completed'}
          </Text>
        </View>
      </View>
      
      <View style={styles.detailRow}>
        <Ionicons name="time-outline" size={16} color={COLORS.textSecondary} style={styles.icon}/>
        <Text style={styles.detailText}>From: {formatDateTime(item.startTime)}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="time" size={16} color={COLORS.textSecondary} style={styles.icon}/>
        <Text style={styles.detailText}>To: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {formatDateTime(item.endTime)}</Text>
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
  if (currentBookings.length === 0 && previousBookings.length === 0) {
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
        data={[...currentBookings, ...previousBookings]}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => {
          const isCurrent = index < currentBookings.length;
          const showCurrentHeader = isCurrent && index === 0;
          const showPreviousHeader = !isCurrent && index === currentBookings.length;

          return (
            <View>
              {showCurrentHeader && <Text style={styles.sectionTitle}>Current Bookings</Text>}
              {showPreviousHeader && <Text style={styles.sectionTitle}>Previous Bookings</Text>}
              {renderBookingItem({ item, isCurrent })}
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
