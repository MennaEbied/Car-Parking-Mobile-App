/* eslint-disable prettier/prettier */
import { Stack, Link } from "expo-router";
import { Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="onboarding/FirstOnboarding"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="onboarding/SecondOnboarding"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="authentication/SignIn"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="authentication/SignUp"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="app-pages"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="pages/slots"
        options={{
          animation: "fade",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="pages/bookings"
        options={{
          animation: "fade",
          title: "",
          headerLeft: () => (
            <Link href="pages/slots" asChild>
              <Pressable hitSlop={20} style={{ marginRight: 10 }}>
                <MaterialIcons name="arrow-back" size={24} color="black" />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="pages/payment"
        options={{
          animation: "fade",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="pages/done"
        options={{
          animation: "fade",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="pages/privacyPolicy"
        options={{
          animation: "fade",
          headerShown:false
        }}
      />
    </Stack>
  );
}
