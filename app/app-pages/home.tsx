import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Modal,
  Button,
} from 'react-native';

const slots = [
  { id: 326, available: true, price: '$5/hour', location: '3-RD Floor' },
  { id: 324, available: true, price: '$4/hour', location: '3-RD Floor' },
  { id: 328, available: true, price: '$6/hour', location: '3-RD Floor' },
  { id: 330, available: false, price: '$6/hour', location: '3-RD Floor' },
  { id: 332, available: true, price: '$5/hour', location: '3-RD Floor' },
];

const Home: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [duration, setDuration] = useState<'30 Min' | '1 Hour'>('1 Hour');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSlotPress = (slotId: number) => {
    setSelectedSlot(slotId);
    setModalVisible(true);
  };

  const selectedSlotDetails = slots.find(slot => slot.id === selectedSlot);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Your Vehicle</Text>
      <Text style={styles.vehicleName}>Porsche 375</Text>

      <Text style={styles.header}>Choose Space!</Text>
      <ScrollView style={styles.slotContainer}>
        {slots.map((slot) => (
          <TouchableOpacity
            key={slot.id}
            onPress={() => handleSlotPress(slot.id)}
            style={[
              styles.slot,
              slot.available ? styles.available : styles.unavailable,
              selectedSlot === slot.id && styles.selected,
            ]}
            disabled={!slot.available}
          >
            <Text style={styles.slotText}>{slot.id}</Text>
            <Text style={styles.statusText}>
              {slot.available ? 'Available' : 'Unavailable'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.durationContainer}>
        <Text style={styles.durationText}>How Long?</Text>
        <TouchableOpacity
          onPress={() => setDuration('30 Min')}
          style={[
            styles.durationButton,
            duration === '30 Min' && styles.selectedDuration,
          ]}
        >
          <Text style={styles.durationButtonText}>30 Min</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDuration('1 Hour')}
          style={[
            styles.durationButton,
            duration === '1 Hour' && styles.selectedDuration,
          ]}
        >
          <Text style={styles.durationButtonText}>1 Hour</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>

      {/* Modal for Slot Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          {selectedSlotDetails && (
            <>
              <Text style={styles.modalTitle}>Slot Details</Text>
              <Text style={styles.modalText}>
                Slot ID: {selectedSlotDetails.id}
              </Text>
              <Text style={styles.modalText}>
                Price: {selectedSlotDetails.price}
              </Text>
              <Text style={styles.modalText}>
                Location: {selectedSlotDetails.location}
              </Text>
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  vehicleName: {
    color: '#f0f0f0',
    fontSize: 20,
    marginBottom: 20,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 10,
    fontWeight: '600',
  },
  slotContainer: {
    marginBottom: 20,
  },
  slot: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'column',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  available: {
    backgroundColor: '#2c2c2c',
  },
  unavailable: {
    backgroundColor: '#4a4a4a',
  },
  selected: {
    borderWidth: 2,
    borderColor: '#00f',
  },
  slotText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  durationText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  durationButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#444',
    width: 100,
    alignItems: 'center',
  },
  selectedDuration: {
    backgroundColor: '#00f',
  },
  durationButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  payButton: {
    padding: 15,
    backgroundColor: '#00f',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
  },
});

export default Home;