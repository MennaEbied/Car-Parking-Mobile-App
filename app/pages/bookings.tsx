/* eslint-disable prettier/prettier */
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { db } from "../../firebaseConfig";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";

const COLORS = {
  primary: "#1A73E8",
  white: "#FFFFFF",
  text: "#212529",
  textSecondary: "#6C757D",
  inputBackground: "rgba(255, 255, 255, 0.9)", 
  border: "#E0E0E0",
};

const ParkingForm = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [plateNumber, setPlateNumber] = useState("");
  const [slotId, setSlotId] = useState("");

  const handleBookNow = async () => {
    if (!plateNumber || !slotId || !startTime || !endTime || !date) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    Alert.alert(
      "Confirm Booking",
      "Are you sure you want to book?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const auth = getAuth();
              const userId = auth.currentUser?.uid;
              if (!userId) {
                Alert.alert("Error", "User not authenticated");
                return;
              }
              const slotRef = doc(db, "slots", slotId);
              const slotDoc = await getDoc(slotRef);
              if (!slotDoc.exists()) {
                Alert.alert("Error", "Slot not found");
                return;
              }
              const slotData = slotDoc.data();
              if (slotData?.status === "reserved" || slotData?.status === "occupied") {
                Alert.alert("Error", "This slot is not available for reservation.");
                return;
              }
              await updateDoc(slotRef, { reservedBy: userId, status: "reserved" });
              const reservationData = {
                plateNumber,
                slotId: Number(slotId),
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                date: date.toISOString(),
                userId,
              };
              await addDoc(collection(db, "reservations"), reservationData);
              Alert.alert("Success", "Your reservation has been made!");
              router.push("pages/payment");
            } catch (error) {
              console.error("Error making reservation:", error);
              try {
                await updateDoc(doc(db, "slots", slotId), { reservedBy: null, status: "available" });
              } catch (rollbackError) {
                console.error("Failed to release slot:", rollbackError);
              }
              Alert.alert("Error", "There was an issue with your reservation. Please try again.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const showStartTimePicker = () => setStartTimePickerVisibility(true);
  const showEndTimePicker = () => setEndTimePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const hideStartTimePicker = () => setStartTimePickerVisibility(false);
  const hideEndTimePicker = () => setEndTimePickerVisibility(false);
  const handleDateConfirm = (selectedDate: Date) => { setDate(selectedDate); hideDatePicker(); };
  const handleStartTimeConfirm = (selectedTime: Date) => { setStartTime(selectedTime); hideStartTimePicker(); };
  const handleEndTimeConfirm = (selectedTime: Date) => { setEndTime(selectedTime); hideEndTimePicker(); };
  const formatDate = (date: Date) => date.toLocaleDateString();
  const formatTime = (time: Date) => time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });


  return (
    <ImageBackground
      source={require("../../assets/parking2.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        
        {/* Floating Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={COLORS.white} />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.overlay}>
            <Text style={styles.header}>Booking Details</Text>

            <Text style={styles.label}>Plate number</Text>
            <View style={styles.inputContainer}>
              <Icon name="car-info" size={20} color={COLORS.textSecondary} style={styles.icon} />
              <TextInput style={styles.input} onChangeText={setPlateNumber} value={plateNumber} placeholder="Enter your plate number" placeholderTextColor={COLORS.textSecondary} />
            </View>

            <Text style={styles.label}>Slot ID</Text>
            <View style={styles.inputContainer}>
              <Icon name="numeric" size={20} color={COLORS.textSecondary} style={styles.icon} />
              <TextInput style={styles.input} onChangeText={setSlotId} value={slotId} placeholder="Enter Slot ID" placeholderTextColor={COLORS.textSecondary} keyboardType="numeric" />
            </View>

            <View style={styles.timeRow}>
              <View style={styles.timeContainer}>
                <Text style={styles.label}>Start Time</Text>
                <TouchableOpacity style={styles.inputContainer} onPress={showStartTimePicker}>
                  <Icon name="clock-start" size={20} color={COLORS.textSecondary} style={styles.icon} />
                  <Text style={styles.pickerText}>{formatTime(startTime)}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.label}>End Time</Text>
                <TouchableOpacity style={styles.inputContainer} onPress={showEndTimePicker}>
                  <Icon name="clock-end" size={20} color={COLORS.textSecondary} style={styles.icon} />
                  <Text style={styles.pickerText}>{formatTime(endTime)}</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity style={styles.inputContainer} onPress={showDatePicker}>
              <Icon name="calendar" size={20} color={COLORS.textSecondary} style={styles.icon} />
              <Text style={styles.pickerText}>{formatDate(date)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleDateConfirm} onCancel={hideDatePicker} />
      <DateTimePickerModal isVisible={isStartTimePickerVisible} mode="time" onConfirm={handleStartTimeConfirm} onCancel={hideStartTimePicker} />
      <DateTimePickerModal isVisible={isEndTimePickerVisible} mode="time" onConfirm={handleEndTimeConfirm} onCancel={hideEndTimePicker} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // Dark overlay for better contrast
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center', 
    padding: 20,
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.9)", 
    padding: 25,
    borderRadius: 20, 
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: "center",
    marginBottom: 25,
    color: COLORS.text,
  },
  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: "500",
    marginBottom: 8,
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  pickerText: {
    fontSize: 16,
    color: COLORS.text,
  },
  timeRow: {
    flexDirection: 'row',
    marginHorizontal: -5, 
  },
  timeContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "bold",
  },
});

export default ParkingForm;