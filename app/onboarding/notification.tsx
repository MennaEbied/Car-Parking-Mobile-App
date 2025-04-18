/* eslint-disable prettier/prettier */
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import Constants from 'expo-constants';
// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Notification = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // Listen for incoming notifications
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // Listen for notification responses (user taps on notification)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);
  const handleAllowNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('You need to enable notifications in your device settings');
      return;
    }
    
    // Get the token
    const token = await registerForPushNotificationsAsync();
    setExpoPushToken(token);
    
    // Send a test notification
    await sendPushNotification(token!);
    
    // Navigate to sign up
    router.push("authentication/SignUp");
  };
  const handleMaybeLater = () => {
    router.push("authentication/SignUp");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/notification.jpg")}
        style={styles.img}
      />
      <Text style={styles.text1}>Enable Notification Access</Text>
      <Text style={styles.text2}>
        Enable notifications to receive real-time updates
      </Text>
      <Pressable
        style={styles.button}
        onPress={handleAllowNotifications}
      >
        <Text style={styles.text3}>Allow Notification</Text>
      </Pressable>
      <Pressable onPress={handleMaybeLater}>
        <Text style={styles.text4}>Maybe Later</Text>
      </Pressable>
    </View>
  );
};
async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas?.projectId,
    })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Notification Enabled',
    body: 'Thank you for enabling notifications!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 170,
    paddingHorizontal: 20,
    //justifyContent:"space-evenly"
  },
  img: {
    width: 130,
    height: 120,
  },
  text1: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  text2: {
    fontSize: 15,
    textAlign: "center",
    color: "#6a6a6a",
    //marginTop: -25,
    //fontSize:17
  },
  button: {
    backgroundColor: "#6081ea",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 60,
  },
  text3: {
    fontSize: 15,
    color: "#f5f5f5",
  },
  text4: {
    fontSize: 15,
    color: "#a9a9a9",
    marginTop: -25,
  },
});

export default Notification;
