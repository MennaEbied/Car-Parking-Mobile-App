import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Alert } from 'react-native';

const ParkingSlots: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const timerDuration = 60; // Set the timer duration in seconds (e.g., 180 seconds = 3 minutes)

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime + 1 >= timerDuration) {
            setIsTimerRunning(false);
            clearInterval(interval);
            Alert.alert('Time is over', 'Your parking time has ended.');
            return timerDuration;
          }
          return prevTime + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
}, [isTimerRunning]);
const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../assets/home.jpg')} style={styles.background}>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.findText}>Find best parking space</Text>
          <Text style={styles.parkingTimeText}>Parking time</Text>
          <Text style={styles.timerText}>{formatTime(time)}</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  welcomeText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  findText: {
    fontSize: 24,
    color: 'white',
    marginTop: 10,
  },
  parkingTimeText: {
    fontSize: 20,
    color: 'white',
    marginTop: 20,
  },
  timerText: {
    fontSize: 48,
    color: 'white',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default ParkingSlots;