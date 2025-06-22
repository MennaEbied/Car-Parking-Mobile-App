import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity,FlatList
} from 'react-native';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';

const Home: React.FC = () => {
   const [userName, setUserName] = useState("User"); // State to store the user's name
  // Fetch the user's name from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await AsyncStorage.getItem("userName");
        if (name) {
          setUserName(name); // Set the user's name if it exists
        }
      } catch (error) {
        console.error("Failed to fetch user name:", error);
      }
    };
    fetchUserName();
    }, []);
  const [searchQuery] = useState('');
  // Mock parking data
  const parkingData = [
    { id: '1', name: 'Our Car Parking', spots: 10 , price: '90 LE/hr' },
   
  ];

  return (
    <ImageBackground 
      source={require("../../assets/background0.jpg")}
      style={styles.background}
      blurRadius={0}>
        <View >
          <View style={styles.header}>
        <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.name}>{userName}!</Text>
        </View>
        <Text style={styles.subtitle}>Find your perfect parking spot</Text>
      </View>
  
        <View style={styles.listContainer}>
          <FlatList
            data={parkingData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.parkingItem}>
                <View style={styles.itemLeft}>
                  <Ionicons name="car-sport" size={28} color="#00382f" />
                </View>
                <View style={styles.itemCenter}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDetails}>
                   {item.spots} spots available
                  </Text>
                </View>
                <View style={styles.itemRight}>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
              </TouchableOpacity>
              
            )}
          />
           <TouchableOpacity
        style={{ marginLeft: 180 }}
        onPress={() => router.push("pages/slots")}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.buttontext}>Book Now</Text>
          <FontAwesome6
            name="angles-right"
            size={20}
            color="#00003d"
            style={{ marginRight: 10 ,  marginBottom:20}}
          />
        </View>
      </TouchableOpacity>
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: "space-between",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  parkingItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#003551",
  },
  itemLeft: {
    marginRight: 15,
  },
  itemCenter: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00003d',
    marginBottom: 5,
  },
  itemDetails: {
    fontSize: 14,
    color: '#00003d',
    opacity: 0.8,
  },
  itemRight: {},
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: "#b30000",
  },
  header:{
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 110,
  },
  greeting: {
    fontSize: 25,
    fontWeight: "600",
    color: "#00003d",
  },
  name:{
   fontSize: 25,
   fontWeight: "600",
   color: "#6a0400"
  },
  subtitle: {
    fontSize: 19,
    marginBottom: 5,
    fontWeight: "500",
    color: "#00003d",
  },
  buttontext: {
    color: "#00003d",
    fontSize: 20,
    marginRight:5,
    fontWeight: "700",
    marginBottom:20
  },
});
export default Home;