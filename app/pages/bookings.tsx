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
} from "react-native";
import { router } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { db } from "../../firebaseConfig"; 
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth"; // To get the user ID

const ParkingForm = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [plateNumber, setPlateNumber] = useState("");
  const [slotId, setSlotId] = useState("");

  // Function to handle booking and saving to Firestore
  const handleBookNow = async () => {
    if (!plateNumber || !slotId || !startTime || !endTime || !date) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
  
    // Show confirmation alert
    Alert.alert(
      "Confirm Booking",
      "Are you sure you want to book?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const auth = getAuth();
              const userId = auth.currentUser?.uid;
              const user = auth.currentUser;
  
              if (user) {
                // Get the user's ID token
                user
                  .getIdToken(true)
                  .then((idToken) => {
                    console.log("User's ID Token:", idToken);
                  })
                  .catch((error) => {
                    console.error("Error getting ID token:", error);
                  });
              } else {
                console.log("No user is signed in.");
              }
  
              // Check if the user is authenticated
              if (!userId) {
                Alert.alert("Error", "User not authenticated");
                return;
              }
  
              // Fetch the slot data to check its status
              const slotRef = doc(db, "slots", slotId);
              const slotDoc = await getDoc(slotRef);
  
              // If the slot doesn't exist or its status is reserved or occupied
              if (!slotDoc.exists()) {
                Alert.alert("Error", "Slot not found");
                return;
              }
  
              const slotData = slotDoc.data();
              if (slotData?.status === "reserved" || slotData?.status === "occupied") {
                Alert.alert("Error", "This slot is not available for reservation.");
                return;
              }
  
              // Reservation data
              const reservationData = {
                plateNumber,
                slotId: Number(slotId),
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                date: date.toISOString(),
              };
  
              // Add reservation to Firestore
              await addDoc(collection(db, "reservations"), reservationData);
  
              // Update the slot to "reserved" and link it to the user
              await updateDoc(slotRef, {
                reservedBy: userId,
                status: "reserved", // Update the slot's status to "reserved"
              });
  
              // Show success alert
              Alert.alert("Success", "Your reservation has been made!");
  
              // Redirect to the payment page
              router.push("pages/payment");
            } catch (error) {
              console.error("Error making reservation:", error);
              Alert.alert("Error", "There was an issue with your reservation.");
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

  const formatDate = (date: Date) => date.toLocaleDateString();
  const formatTime = (time: Date) =>
    time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <ImageBackground
      source={require("../../assets/parking2.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>Parking Form</Text>
        <Text style={styles.label}>Plate number</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPlateNumber}
          value={plateNumber}
          placeholder="Enter your plate number"
          keyboardType="default"
          returnKeyType="done"
        />
        <Text style={styles.label}>Slot Id</Text>
        <TextInput
          style={styles.input}
          onChangeText={setSlotId}
          value={slotId}
          placeholder="Enter Slot Id"
          returnKeyType="done"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Start Time</Text>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={showStartTimePicker}
        >
          <Text style={styles.pickerButtonText}>{formatTime(startTime)}</Text>
        </TouchableOpacity>
        <Text style={styles.label}>End Time</Text>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={showEndTimePicker}
        >
          <Text style={styles.pickerButtonText}>{formatTime(endTime)}</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity style={styles.pickerButton} onPress={showDatePicker}>
          <Text style={styles.pickerButtonText}>{formatDate(date)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>

        {/* Date, Start Time, and End Time pickers */}
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
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  pickerButton: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  pickerButtonText: {
    fontSize: 16,
    color: "#000",
  },
  bookButton: {
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    marginTop: 20,
  },
  bookButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ParkingForm;
