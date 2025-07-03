/* eslint-disable prettier/prettier */
import { useState, useEffect } from "react";
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
import { router, useLocalSearchParams } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
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
  danger: "#dc3545",
  disabledBackground: "#f0f0f0",
};

const ParkingForm = () => {
  const params = useLocalSearchParams();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [plateNumber, setPlateNumber] = useState("");
  const [slotId, setSlotId] = useState("");

  // Effect to get the slotId from navigation parameters
  useEffect(() => {
    if (params.slotId) {
      setSlotId(params.slotId as string);
    }
  }, [params]);

  const calculateDurationHours = (start: Date, end: Date) => {
    const startDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      start.getHours(),
      start.getMinutes(),
    );
    const endDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      end.getHours(),
      end.getMinutes(),
    );
    const durationMs = endDateTime.getTime() - startDateTime.getTime();
    if (durationMs <= 0) return 0;
    return Math.ceil(durationMs / (1000 * 60 * 60));
  };

  const handleBookNow = async () => {
    if (!plateNumber || !slotId) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const hours = calculateDurationHours(startTime, endTime);
    if (hours <= 0) {
      Alert.alert(
        "Invalid Time",
        "End time must be later than the start time.",
      );
      return;
    }
    const cost = 90 * hours;

    Alert.alert(
      "Confirm Booking",
      `Reserve parking for ${hours} hour${hours !== 1 ? "s" : ""}?\nTotal cost: ${cost} LE`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: async () => {
            try {
              const auth = getAuth();
              const userId = auth.currentUser?.uid;
              if (!userId) {
                Alert.alert(
                  "Authentication Error",
                  "You must be logged in to make a reservation.",
                );
                return;
              }

              const startDateTime = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                startTime.getHours(),
                startTime.getMinutes(),
              );
              const endDateTime = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                endTime.getHours(),
                endTime.getMinutes(),
              );

              const slotRef = doc(db, "slots", slotId);
              const slotDoc = await getDoc(slotRef);

              if (!slotDoc.exists()) {
                Alert.alert("Error", "The selected slot does not exist.");
                return;
              }

              const slotData = slotDoc.data();
              if (slotData?.status !== "available") {
                Alert.alert(
                  "Slot Unavailable",
                  "This slot is currently occupied.",
                );
                return;
              }

              // **CHANGE: Set the status to "occupied" instead of "reserved"**
              await updateDoc(slotRef, {
                reservedBy: userId,
                status: "occupied",
              });

              const reservationData = {
                plateNumber,
                slotId: Number(slotId),
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString(),
                userId,
                hours,
                cost,
                createdAt: serverTimestamp(),
                status: "active",
              };

              await addDoc(collection(db, "reservations"), reservationData);

              router.push({
                pathname: "pages/payment",
                params: { hours, cost },
              });
            } catch (error) {
              console.error("Error making reservation:", error);
              try {
                await updateDoc(doc(db, "slots", slotId), {
                  reservedBy: null,
                  status: "available",
                });
              } catch (rollbackError) {
                console.error(
                  "Fatal: Failed to roll back slot status.",
                  rollbackError,
                );
              }
              Alert.alert(
                "Booking Failed",
                "There was an issue with your reservation. Please try again.",
              );
            }
          },
        },
      ],
      { cancelable: false },
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
  const formatDate = (d: Date) => d.toLocaleDateString();
  const formatTime = (t: Date) =>
    t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const displayHours = calculateDurationHours(startTime, endTime);
  const displayCost = 90 * displayHours;

  return (
    <ImageBackground
      source={require("../../assets/parking2.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />

        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color={COLORS.white} />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.overlay}>
            <Text style={styles.header}>Booking Details</Text>

            <Text style={styles.label}>Slot ID</Text>
            <View style={styles.inputContainer}>
              <Icon
                name="numeric"
                size={20}
                color={COLORS.textSecondary}
                style={styles.icon}
              />
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={slotId}
                placeholder="Select a slot from the previous screen"
                placeholderTextColor={COLORS.textSecondary}
                editable={false}
              />
            </View>

            <Text style={styles.label}>Plate Number</Text>
            <View style={styles.inputContainer}>
              <Icon
                name="car-info"
                size={20}
                color={COLORS.textSecondary}
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                onChangeText={setPlateNumber}
                value={plateNumber}
                placeholder="e.g., ABC-123"
                placeholderTextColor={COLORS.textSecondary}
              />
            </View>

            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={showDatePicker}
            >
              <Icon
                name="calendar"
                size={20}
                color={COLORS.textSecondary}
                style={styles.icon}
              />
              <Text style={styles.pickerText}>{formatDate(date)}</Text>
            </TouchableOpacity>

            <View style={styles.timeRow}>
              <View style={styles.timeContainer}>
                <Text style={styles.label}>Start Time</Text>
                <TouchableOpacity
                  style={styles.inputContainer}
                  onPress={showStartTimePicker}
                >
                  <Icon
                    name="clock-start"
                    size={20}
                    color={COLORS.textSecondary}
                    style={styles.icon}
                  />
                  <Text style={styles.pickerText}>{formatTime(startTime)}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.label}>End Time</Text>
                <TouchableOpacity
                  style={styles.inputContainer}
                  onPress={showEndTimePicker}
                >
                  <Icon
                    name="clock-end"
                    size={20}
                    color={COLORS.textSecondary}
                    style={styles.icon}
                  />
                  <Text style={styles.pickerText}>{formatTime(endTime)}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.summaryContainer(displayHours <= 0)}>
              <Text style={styles.summaryText(displayHours <= 0)}>
                {displayHours > 0
                  ? `Total cost: ${displayCost} LE for ${displayHours} hour(s)`
                  : "End time must be after start time"}
              </Text>
            </View>

            <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  scrollContent: { flexGrow: 1, justifyContent: "center", padding: 20 },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 25,
    borderRadius: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 22,
    color: COLORS.text,
  },
  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: "500",
    marginBottom: 5,
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 12,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: COLORS.text },
  disabledInput: {
    backgroundColor: COLORS.disabledBackground,
  },
  pickerText: { fontSize: 16, color: COLORS.text },
  timeRow: { flexDirection: "row", justifyContent: "space-between" },
  timeContainer: { flex: 1, marginHorizontal: 2 },
  summaryContainer: (isError: boolean) => ({
    backgroundColor: isError
      ? "rgba(220, 53, 69, 0.1)"
      : "rgba(26, 115, 232, 0.1)",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 15,
  }),
  summaryText: (isError: boolean) => ({
    fontSize: 16,
    fontWeight: "500",
    color: isError ? COLORS.danger : COLORS.primary,
    textAlign: "center",
  }),
  bookButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  bookButtonText: { fontSize: 18, color: COLORS.white, fontWeight: "bold" },
});

export default ParkingForm;
