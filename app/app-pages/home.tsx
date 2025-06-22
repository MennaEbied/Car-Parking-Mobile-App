import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView,Animated
} from 'react-native';
import { Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle" size={36} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Bottom Parking Sheet */}
      <Animated.View 
        style={[
          styles.sheetContainer,
        ]}
      >
        <View  />
        <Text style={styles.sectionTitle}>Parking Details</Text>
        <View >
          {parkingSpots.map(spot => (
            <TouchableOpacity 
              key={spot.id} 
              style={styles.parkingCard}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.parkingName}>{spot.name}</Text>
                </View>
                
                <View >
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
        </View>
        {/* Active Session Banner */}
        {activeSession && (
          <View style={styles.activeSession}>
            <TouchableOpacity 
              onPress={() => router.push("pages/slots")}
            >
            <View >
              <View style={styles.sessionDetails}>
                <Text style={styles.sessionTitle}>Book Now</Text>
              </View>
            </View>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d5bdd',
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
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: '#e0e0ff',
    marginTop:8
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
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: '700',
    color: '#1c2c4a',
    marginBottom: 15,
    marginTop:18
  },
  parkingCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 18,
    padding: 15,
    marginBottom: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#eee',
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
   marginBottom:60,
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8b0000',
    marginRight: 10,
  },
  activeSession: {
    backgroundColor: '#0d5bdd',
    borderRadius: 15,
    padding: 18,
    marginTop: 30,
    alignItems: 'center',
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