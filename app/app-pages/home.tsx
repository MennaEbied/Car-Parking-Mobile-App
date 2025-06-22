/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar"

const Home: React.FC = () => {
  const [userName, setUserName] = useState("User");
  const [activeSession] = useState(true);

  // Parking spots data
  const parkingSpots = [
    { id: '1', name: 'Our Public Parking', spots: 4, price: '90 LE/hr',
      distance: '3 km from Zagazig University ', time: '15 min' },
  ];

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await AsyncStorage.getItem("userName");
        if (name) setUserName(name);
      } catch (error) {
        console.error("Failed to fetch user name:", error);
      }
    };
    fetchUserName();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Overlay */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {userName}</Text>
          <Text style={styles.subtitle}>Find parking near you</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={() => router.push('app-pages/profile')}>
          <Ionicons name="person-circle" size={36} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bottom Parking Sheet */}
      <Animated.View style={styles.sheetContainer}>
        <ScrollView>
          <Text style={styles.sectionTitle}>Parking Details</Text>
          {parkingSpots.map(spot => (
            <TouchableOpacity
              key={spot.id}
              style={styles.parkingCard} 
            >
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.parkingName}>{spot.name}</Text>
                </View>
                <View>
                  <View style={styles.detailItem}>
                    <Ionicons name="location" size={17} color="#777" />
                    <Text style={styles.detailText}>{spot.distance} • {spot.time}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="car" size={17} color="#777" />
                    <Text style={styles.detailText}>{spot.spots} spots</Text>
                  </View>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{spot.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {activeSession && (
          <View style={styles.activeSession}>
            <TouchableOpacity
              style={{width: '100%'}} 
              onPress={() => router.push("pages/slots")}
            >
              <View style={styles.sessionDetails}>
                <Text style={styles.sessionTitle}>Book Now</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
      <StatusBar style="light"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A73E8',
  },
  header: {
    position: 'absolute',
    top: 75,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1, // Ensure header is on top
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: '#e0e0ff',
    marginTop: 8
  },
  profileButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 5,
  },
  sheetContainer: {
    position: 'absolute',
    height: '70%',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20, 
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: '700',
    color: '#1c2c4a',
    marginBottom: 15,
  },
  parkingCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 18,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#eee',
    marginBottom: 15, 
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  parkingName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c2c4a',
    marginLeft: 5,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#777',
    marginLeft: 5,
  },
  priceContainer: {
    marginBottom: 60, 
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8b0000',
    marginRight: 10,
  },
  activeSession: {
    backgroundColor: '#1A73E8',
    borderRadius: 15,
    padding: 18,
    margin: 20,
    marginTop: 'auto', 
  },
  sessionDetails: {
    alignItems: 'center',
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Home;