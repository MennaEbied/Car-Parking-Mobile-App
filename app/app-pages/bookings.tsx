import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert, Text, TouchableOpacity, Platform, ImageBackground } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';

export default function Bookings() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [SlotID, setSlotID] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleBookNow = () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Here you would typically send the data to a backend service
    Alert.alert('Success', 'Booking successful!');
  };

  const onChangeStartTime = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || startTime;
    setShowStartTimePicker(Platform.OS === 'ios'); // Keep the picker open on iOS
    setStartTime(currentDate);
  };

  const onChangeEndTime = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || endTime;
    setShowEndTimePicker(Platform.OS === 'ios'); // Keep the picker open on iOS
    setEndTime(currentDate);
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // Keep the picker open on iOS
    setDate(currentDate);
  };

  return (
    <ImageBackground
      source={require('../../assets/parking.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>Parking Form</Text>

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#999"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          returnKeyType='done'
        />
        <TextInput
          style={styles.input}
          placeholder="Slot ID"
          placeholderTextColor="#999"
          value={SlotID}
          onChangeText={setSlotID}
         keyboardType="default"
          returnKeyType='done'
        />

        <View style={styles.pickerContainer}>
          <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.pickerButton}>
            <Text style={styles.pickerButtonText}>Start Time: {startTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showStartTimePicker && (
            <DateTimePicker
              value={startTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeStartTime}
            />
          )}

          <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.pickerButton}>
            <Text style={styles.pickerButtonText}>End Time: {endTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showEndTimePicker && (
            <DateTimePicker
              value={endTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeEndTime}
            />
          )}

          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.pickerButton}>
            <Text style={styles.pickerButtonText}>Date: {date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>

        <TouchableOpacity onPress={handleBookNow} style={styles.bookNowButton}>
          <Text style={styles.bookNowButtonText}>Book Now</Text>
        </TouchableOpacity>
        <StatusBar style='light'/>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white overlay
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerButton: {
    height: 50,
    justifyContent: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#333',
  },
  bookNowButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#007bff',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bookNowButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});