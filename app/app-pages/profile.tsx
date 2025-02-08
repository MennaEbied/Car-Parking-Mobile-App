import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ParkingForm = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleBookNow = () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Here you would typically send the data to a backend service
    Alert.alert('Success', 'Booking successful!');
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleDateConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const handleStartTimeConfirm = (selectedTime: Date) => {
    setStartTime(selectedTime);
    hideStartTimePicker();
  };

  const handleEndTimeConfirm = (selectedTime: Date) => {
    setEndTime(selectedTime);
    hideEndTimePicker();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ImageBackground
    source={require('../../assets/parking.jpg')} 
    style={styles.backgroundImage}
    resizeMode="cover"
  >
    <View style={styles.overlay}>
      <Text style={styles.header}>Parking Form</Text>

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        returnKeyType='done'
      />

      <Text style={styles.label}>Start Time</Text>
      <TouchableOpacity style={styles.pickerButton} onPress={showStartTimePicker}>
        <Text style={styles.pickerButtonText}>{formatTime(startTime)}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>End Time</Text>
      <TouchableOpacity style={styles.pickerButton} onPress={showEndTimePicker}>
        <Text style={styles.pickerButtonText}>{formatTime(endTime)}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Date</Text>
      <TouchableOpacity style={styles.pickerButton} onPress={showDatePicker}>
        <Text style={styles.pickerButtonText}>{formatDate(date)}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      <DateTimePickerModal
        isVisible={isStartTimePickerVisible}
        mode="time"
        onConfirm={handleStartTimeConfirm}
        onCancel={hideStartTimePicker}
      />

      <DateTimePickerModal
        isVisible={isEndTimePickerVisible}
        mode="time"
        onConfirm={handleEndTimeConfirm}
        onCancel={hideEndTimePicker}
      />
    </View>
    </ImageBackground>
  );
};

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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight:"500"
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  pickerButton: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#000',
  },
  bookButton: {
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    marginTop: 20,
  },
  bookButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ParkingForm;