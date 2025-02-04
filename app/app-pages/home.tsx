import React from 'react';
import {View,Text,StyleSheet,ScrollView} from 'react-native';

const slots = [
  { id: 1, status: 'available', plate: 'ABC-123' },
  { id: 2, status: 'available', plate: 'ABC-124' },
  { id: 3, status: 'occupied', plate: 'ABC-125' },
  { id: 4, status: 'available', plate: 'ABC-126' },
  { id: 5, status: 'reserved', plate: 'ABC-127' },
  { id: 6, status: 'occupied', plate: 'ABC-128' },
  { id: 7, status: 'available', plate: 'ABC-129' },
  { id: 8, status: 'available', plate: 'ABC-130' },
  { id: 9, status: 'occupied', plate: 'ABC-131' },
  { id: 10, status: 'reserved', plate: 'ABC-132' },
];

const ParkingSlots: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title1}> Welcome! </Text>
      <Text style={styles.title2}> Find best parking slot </Text>
      <View style={styles.legendContainer}>
      <View style={[styles.legendItem, styles.available]} />
      <Text style={styles.legendText}>Available</Text>
      <View style={[styles.legendItem, styles.occupied]} />
      <Text style={styles.legendText}>Occupied</Text>
      <View style={[styles.legendItem, styles.reserved]} />
      <Text style={styles.legendText}>Reserved</Text>
    </View>
      <ScrollView contentContainerStyle={styles.slotContainer}>
        {slots.map((slot) => (
          <View
          key={slot.id}
          style={[
            styles.slot,
            slot.status === "available" && styles.available,
            slot.status === "occupied" && styles.occupied,
            slot.status === "reserved" && styles.reserved,
          ]}
        >
          <Text style={styles.slotText}>SLOT-{slot.id}</Text>
          <Text style={styles.plateText}>{slot.plate}</Text>
        </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ffffff',
  },
  title1: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:50,
  },
  title2: {
    fontSize: 12,
    marginBottom: 40,
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  legendItem: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginRight: 2, 
  },
  available: {
    backgroundColor: "#449d48",
  },
  occupied: {
    backgroundColor: "#f32c1e",
  },
  reserved: {
    backgroundColor: "#ffe608",
  },
  legendText: {
    fontSize: 15,
    marginRight: 15,
  },
  slotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: "space-between"
  },
  slot: {
    width: '45%',
    height: 90,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal:7
  },
  slotText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  plateText: {
    fontSize: 12,
    color: '#fff',
  },
});

export default ParkingSlots;