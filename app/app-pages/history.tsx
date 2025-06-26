// app-pages/booking-history.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define booking type
type Booking = {
  id: string;
  parkingName: string;
  date: string;
  startTime: string;
  endTime: string;
  amount: string;
  status: 'Active' | 'Completed' | 'Cancelled';
};

const BookingHistory = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Load booking history from storage
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const storedBookings = await AsyncStorage.getItem('bookingHistory');
        if (storedBookings) {
          const parsedBookings = JSON.parse(storedBookings);
          setBookings(parsedBookings);
        }
      } catch (error) {
        console.error('Failed to load bookings:', error);
        Alert.alert('Error', 'Failed to load booking history');
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  // Render each booking item
  const renderBookingItem = ({ item }: { item: Booking }) => (
    <TouchableOpacity 
      style={styles.bookingCard}
      onPress={() => router.push({
        pathname: 'app-pages/booking-details',
        params: { bookingId: item.id }
      })}
    >
      <View style={styles.bookingHeader}>
        <Ionicons 
          name="location" 
          size={24} 
          color="#1A73E8" 
          style={styles.bookingIcon} 
        />
        <Text style={styles.bookingTitle}>{item.parkingName}</Text>
      </View>
      
      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={16} color="#777" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Ionicons name="time" size={16} color="#777" />
          <Text style={styles.detailText}>
            {item.startTime} - {item.endTime}
          </Text>
        </View>
      </View>
      
      <View style={styles.bookingFooter}>
        <Text style={styles.bookingAmount}>{item.amount}</Text>
        <View style={[
          styles.statusBadge,
          item.status === 'Active' && styles.statusActive,
          item.status === 'Completed' && styles.statusCompleted,
          item.status === 'Cancelled' && styles.statusCancelled
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Booking History</Text>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading history...</Text>
        </View>
      ) : bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="time-outline" size={48} color="#888" />
          <Text style={styles.emptyText}>No bookings yet</Text>
          <Text style={styles.emptySubtext}>Your parking sessions will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={<Text style={styles.sectionTitle}>All Bookings</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  listContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  bookingCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#1A73E8',
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bookingIcon: {
    marginRight: 10,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c2c4a',
  },
  bookingDetails: {
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1c2c4a',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: '#e6f0ff',
  },
  statusCompleted: {
    backgroundColor: '#e6f7ee',
  },
  statusCancelled: {
    backgroundColor: '#fdecea',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A73E8',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
    marginTop: 15,
    fontWeight: '500',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
    textAlign: 'center',
    maxWidth: 300,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookingHistory;