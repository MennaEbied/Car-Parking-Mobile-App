/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../../firebaseConfig';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { router } from 'expo-router';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  bookingId?: string;
  type: 'booking' | 'reminder' | 'payment' | 'system';
  timestamp?: number;
}

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [hasNotificationPermission, setHasNotificationPermission] = useState(false);
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  // Check notification permission
  useEffect(() => {
    const checkNotificationPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      setHasNotificationPermission(status === 'granted');
    };
    checkNotificationPermission();
  }, []);

  // Listen for booking updates and schedule notifications
  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, "reservations"),
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const booking = change.doc.data();
        
        // Handle new bookings
        if (change.type === "added") {
          addBookingNotification({
            ...booking,
            id: change.doc.id,
            type: 'booking'
          });
          scheduleBookingNotifications(booking, change.doc.id);
        }
        
        // Handle booking updates
        if (change.type === "modified") {
          addBookingNotification({
            ...booking,
            id: change.doc.id,
            type: 'booking'
          });
        }
      });
    });

    return () => unsubscribe();
  }, [userId]);

  // Schedule notifications for booking start/end times
  // Modified scheduleBookingNotifications function
  const scheduleBookingNotifications = async (booking: any, bookingId: string) => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') return;

      const now = new Date();
      const endTime = new Date(booking.endTime);
      
      // Only schedule notifications for future events
      if (endTime > now) {
        // Immediate booking confirmation (no scheduling needed)
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Booking Confirmed",
            body: `You booked slot ${booking.slotId}`,
            data: { bookingId, type: 'booking' },
          },
          trigger: null, // Send immediately
        });
        // Schedule expiration notification only if it's in the future
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Parking Expired",
            body: `Your parking at slot ${booking.slotId} has expired`,
            data: { bookingId, type: 'reminder' },
          },
          trigger: { 
            type: 'date',
            date: endTime 
          },
        });
        // Add to local notifications list
        addBookingNotification({
          ...booking,
          id: bookingId,
          type: 'booking'
        });
      }
    } catch (error) {
      console.log("Non-critical notification error:", error);
      // Still add to local notifications even if scheduling fails
      addBookingNotification({
        ...booking,
        id: bookingId,
        type: 'booking'
      });
    }
  };

  // Add booking notification to the list
  const addBookingNotification = (booking: any) => {
    const now = new Date();
    const bookingTime = new Date(booking.startTime);
    const bookingEnd = new Date(booking.endTime);
    const timeLeft = Math.floor((bookingEnd.getTime() - now.getTime()) / (1000 * 60));
    
    const timeString = bookingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = bookingTime.toLocaleDateString();

    const notification: NotificationItem = {
      id: `booking-${booking.id}`,
      title: 'New Booking Confirmed',
      message: `You booked slot ${booking.slotId} from ${timeString} on ${dateString}`,
      time: 'Just now',
      isRead: false,
      bookingId: booking.id,
      type: booking.type || 'booking',
      timestamp: now.getTime()
    };

    setNotifications(prev => [notification, ...prev.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))]);
  };

  // Handle incoming push notifications
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(handlePushNotification);
    return () => subscription.remove();
  }, []);

  const handlePushNotification = (notification: Notifications.Notification) => {
    const newNotification: NotificationItem = {
      id: notification.request.identifier || Date.now().toString(),
      title: notification.request.content.title || 'New Notification',
      message: notification.request.content.body || '',
      time: 'Just now',
      isRead: false,
      type: notification.request.content.data?.type || 'system',
      bookingId: notification.request.content.data?.bookingId,
      timestamp: Date.now()
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  // Handle notification press
  const handleNotificationPress = async (item: NotificationItem) => {
    // Mark as read
    const updatedNotifications = notifications.map(n => 
      n.id === item.id ? { ...n, isRead: true } : n
    );
    setNotifications(updatedNotifications);

    if (item.type === 'booking' && item.bookingId) {
      router.push(`/booking/${item.bookingId}`);
    } else if (item.type === 'system' && !hasNotificationPermission) {
      const { status } = await Notifications.requestPermissionsAsync();
      setHasNotificationPermission(status === 'granted');
      if (status === 'granted') {
        Alert.alert('Notifications Enabled', 'You will now receive updates about your bookings');
      }
    }
  };

  // Format time display
  const formatTime = (timestamp?: number) => {
    if (!timestamp) return 'Just now';
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} hours ago`;
    return `${Math.floor(minutes / 1440)} days ago`;
  };

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity 
      style={[styles.notificationItem, item.isRead ? styles.readItem : styles.unreadItem]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.message}>{item.message}</Text>
          {item.type === 'system' && (
            <Text style={styles.notificationStatus}>
              {hasNotificationPermission ? 'Notifications enabled' : 'Notifications disabled'}
            </Text>
          )}
        </View>
        <Text style={styles.time}>{formatTime(item.timestamp)}</Text>
      </View>
      {!item.isRead && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
        {!hasNotificationPermission && (
          <TouchableOpacity 
            style={styles.enableButton}
            onPress={() => handleNotificationPress({
              id: 'enable-notifications',
              title: 'Enable Notifications',
              message: 'Tap to enable notifications',
              time: '',
              isRead: false,
              type: 'system'
            })}
          >
            <Text style={styles.enableButtonText}>Enable</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <FlatList
        data={notifications.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  enableButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  enableButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
  },
  readItem: {
    backgroundColor: '#fff',
  },
  unreadItem: {
    backgroundColor: '#f8f8f8',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationStatus: {
    fontSize: 12,
    color: '#4CAF50',
    fontStyle: 'italic',
  },
  time: {
    fontSize: 12,
    color: '#999',
    alignSelf: 'flex-start',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    position: 'absolute',
    right: 16,
    top: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

export default NotificationScreen;