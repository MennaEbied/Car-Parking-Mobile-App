import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { db, auth } from '../../firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { router } from 'expo-router';

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
  timestamp: number;
  isRead: boolean;
  bookingId?: string;
  type: 'booking' | 'system';
}

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [hasPermission, setHasPermission] = useState(false);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const checkPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    checkPermission();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, "reservations"), where("userId", "==", userId));
    return onSnapshot(q, snapshot => {
      snapshot.docChanges().forEach(({ type, doc }) => {
        if (type === "added" || type === "modified") {
          handleBookingUpdate(doc.data(), doc.id);
        }
      });
    });
  }, [userId]);

  const handleBookingUpdate = (booking: any, bookingId: string) => {
    const now = new Date();
    const endTime = new Date(booking.endTime);
    
    // Immediate confirmation notification
    addNotification(createNotification(
      bookingId,
      'Booking Confirmed',
      `You booked slot ${booking.slotId}`,
      now.getTime(),
      'booking'
    ));

    // Create expiration notification entry
    addNotification(createNotification(
      bookingId,
      'Parking Expired',
      `Your parking at slot ${booking.slotId} has expired`,
      endTime.getTime(),
      'booking'
    ));
  };

  const createNotification = (
    id: string,
    title: string,
    message: string,
    timestamp: number,
    type: 'booking' | 'system'
  ): NotificationItem => ({
    id: `${type}-${id}-${timestamp}`,
    title,
    message,
    timestamp,
    isRead: false,
    bookingId: id,
    type,
  });

  const addNotification = (notification: NotificationItem) => {
    setNotifications(prev => [
      ...prev.filter(n => n.id !== notification.id),
      notification,
    ].sort((a, b) => b.timestamp - a.timestamp));
  };

  const handlePress = async (item: NotificationItem) => {
    setNotifications(prev => prev.map(n => n.id === item.id ? {...n, isRead: true} : n));

    if (item.type === 'booking' && item.bookingId) {
      router.push(`/booking/${item.bookingId}`);
    } else if (!hasPermission) {
      const { status } = await Notifications.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status === 'granted') Alert.alert('Notifications Enabled');
    }
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = timestamp - now;
    const absoluteDiff = Math.abs(diff);
    const minutes = Math.floor(absoluteDiff / 60000);

    if (diff > 0) { // Future time
      return minutes < 60 ? `in ${minutes}m` : `in ${Math.floor(minutes/60)}h`;
    }
    
    return minutes < 1 ? 'Just now' :
      minutes < 60 ? `${minutes}m ago` :
      minutes < 1440 ? `${Math.floor(minutes/60)}h ago` :
      `${Math.floor(minutes/1440)}d ago`;
  };

  const NotificationCard = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity 
      style={[styles.card, item.isRead && styles.read]}
      onPress={() => handlePress(item)}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        {item.type === 'system' && (
          <Text style={styles.status}>
            {hasPermission ? 'Notifications enabled' : 'Notifications disabled'}
          </Text>
        )}
      </View>
      <Text style={styles.time}>{formatTime(item.timestamp)}</Text>
      {!item.isRead && <View style={styles.dot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
        {!hasPermission && (
          <TouchableOpacity style={styles.button} onPress={() => handlePress({
            id: 'enable', title: 'Enable', message: '', timestamp: 0, isRead: false, type: 'system'
          })}>
            <Text style={styles.buttonText}>Enable</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <FlatList
        data={notifications}
        renderItem={NotificationCard}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<Text style={styles.empty}>No notifications yet</Text>}
      />
    </SafeAreaView>
  );
};

// Reuse the same styles from previous simplified version
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
  button: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  read: {
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  message: {
    color: '#666',
  },
  status: {
    color: '#4CAF50',
    fontStyle: 'italic',
  },
  time: {
    color: '#999',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    position: 'absolute',
    right: 16,
    top: 20,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
});

export default NotificationScreen;